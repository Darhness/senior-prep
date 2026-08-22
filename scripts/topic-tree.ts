/**
 * topic-tree — lists what every topic JSON contains:
 *
 *   file  ->  topic  ->  section  ->  subtopic
 *
 * One block per file, blank line between blocks:
 *
 *   01-oop-and-design-principles.json  —  OOP & Design Principles  [3 sections · 13 subtopics]
 *   - A — The four OOP pillars
 *     - A1 — Encapsulation
 *
 * Reads the topic files directly, never index.json, so it always reflects
 * what is on disk. It does warn when the generated index has drifted.
 *
 * Runs on Node 22.6+ (type stripping, no build step):
 *   node scripts/topic-tree.ts
 *
 * Flags:
 *   --dir <path>     directory holding the topic JSONs   (default: topics)
 *   --depth <1|2|3>  1 = files, 2 = + sections, 3 = + subtopics (default: 3)
 *   --format <fmt>   list | md | json                    (default: list)
 *   --no-counts      hide the derived section/subtopic tallies
 *   --no-color       plain output (also honours NO_COLOR / non-TTY)
 *   --help
 */

import { die, indexStaleness, loadAll, type TopicNode } from "./topics-lib.ts";

type Format = "list" | "md" | "json";

interface Options {
  dir: string;
  depth: number;
  format: Format;
  counts: boolean;
  color: boolean;
}

const HELP = `topic-tree — list what each topic JSON contains

  node scripts/topic-tree.ts [options]

  --dir <path>     directory of topic JSONs (default: topics)
  --depth <1|2|3>  1 = files, 2 = + sections, 3 = + subtopics (default: 3)
  --format <fmt>   list | md | json (default: list)
  --no-counts      hide derived section/subtopic tallies
  --no-color       disable ANSI colour
  --help           this message
`;

function parseArgs(argv: string[]): Options {
  const opts: Options = {
    dir: "topics",
    depth: 3,
    format: "list",
    counts: true,
    color: process.stdout.isTTY === true && !process.env.NO_COLOR,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
      case "--help":
      case "-h":
        process.stdout.write(HELP);
        process.exit(0);
      case "--dir":
        opts.dir = argv[++i] ?? opts.dir;
        break;
      case "--depth": {
        const n = Number(argv[++i]);
        if (!Number.isInteger(n) || n < 1 || n > 3) die(`topic-tree: --depth must be 1, 2 or 3`);
        opts.depth = n;
        break;
      }
      case "--format": {
        const f = argv[++i];
        if (f !== "list" && f !== "md" && f !== "json") die(`topic-tree: --format must be list, md or json`);
        opts.format = f;
        break;
      }
      case "--no-counts":
        opts.counts = false;
        break;
      case "--no-color":
        opts.color = false;
        break;
      default:
        die(`topic-tree: unknown argument: ${arg}\n\n${HELP}`);
    }
  }
  return opts;
}

const opts = parseArgs(process.argv.slice(2));

// ---------------------------------------------------------------- colour

const ESC = "";
const paint = (code: string) => (s: string) => (opts.color ? `${ESC}[${code}m${s}${ESC}[0m` : s);
const bold = paint("1");
const dim = paint("2");
const cyan = paint("36");
const yellow = paint("33");
const red = paint("31");

// ---------------------------------------------------------------- render

function tally(node: TopicNode): string {
  return opts.counts ? `  [${node.sectionCount} sections · ${node.subtopicCount} subtopics]` : "";
}

/** One block per file. Sections at one dash, subtopics indented under them. */
function renderList(nodes: TopicNode[]): string {
  const blocks = nodes.map((node) => {
    const lines = [bold(cyan(node.file)) + dim(`  —  ${node.topic}${tally(node)}`)];

    if (opts.depth >= 2) {
      for (const section of node.sections) {
        lines.push(`${dim("-")} ${yellow(section.section)}`);
        if (opts.depth < 3) continue;
        for (const sub of section.subtopics) lines.push(`  ${dim("-")} ${sub}`);
      }
    }
    return lines.join("\n");
  });

  // A blank line only separates real blocks; at depth 1 every file is one line.
  return blocks.join(opts.depth >= 2 ? "\n\n" : "\n");
}

function renderMarkdown(nodes: TopicNode[]): string {
  const out: string[] = [];
  for (const node of nodes) {
    const counts = opts.counts ? ` (${node.sectionCount} sections, ${node.subtopicCount} subtopics)` : "";
    out.push(`- **${node.topic}** — \`${node.file}\`${counts}`);
    if (opts.depth < 2) continue;
    for (const section of node.sections) {
      out.push(`  - ${section.section}`);
      if (opts.depth < 3) continue;
      for (const sub of section.subtopics) out.push(`    - ${sub}`);
    }
  }
  return out.join("\n");
}

function renderJson(nodes: TopicNode[]): string {
  return JSON.stringify(
    nodes.map((node) => ({
      file: node.file,
      id: node.id,
      topic: node.topic,
      ...(opts.counts ? { sectionCount: node.sectionCount, subtopicCount: node.subtopicCount } : {}),
      ...(opts.depth >= 2
        ? {
            sections: node.sections.map((s) => ({
              section: s.section,
              ...(opts.counts ? { subtopicCount: s.subtopics.length } : {}),
              ...(opts.depth >= 3 ? { subtopics: s.subtopics } : {}),
            })),
          }
        : {}),
    })),
    null,
    2,
  );
}

// ---------------------------------------------------------------- main

const nodes = loadAll(opts.dir);

if (opts.format === "json") {
  process.stdout.write(`${renderJson(nodes)}\n`);
} else {
  process.stdout.write(`${opts.format === "md" ? renderMarkdown(nodes) : renderList(nodes)}\n`);

  if (opts.counts) {
    const sections = nodes.reduce((n, t) => n + t.sectionCount, 0);
    const subtopics = nodes.reduce((n, t) => n + t.subtopicCount, 0);
    const summary = `${nodes.length} files · ${sections} sections · ${subtopics} subtopics`;
    process.stdout.write(`\n${opts.format === "md" ? `_${summary}_` : dim(summary)}\n`);
  }

  const stale = indexStaleness(opts.dir, nodes);
  if (stale.length > 0) {
    process.stdout.write(
      `\n${red("index.json is stale — run: node scripts/build-index.ts")}\n${stale.map((r) => `  ! ${r}`).join("\n")}\n`,
    );
  }
}
