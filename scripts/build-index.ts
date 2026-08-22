/**
 * build-index — regenerates topics/index.json from the topic files on disk.
 *
 * index.json is a generated artefact. Do not hand-edit it: add or rename a
 * topic file, then run this. It carries identity only (id, topic, file) —
 * no counters, because anything derivable is derived at read time.
 *
 *   node scripts/build-index.ts            rewrite topics/index.json
 *   node scripts/build-index.ts --check    exit 1 if it is stale (for CI)
 *   node scripts/build-index.ts --dir <p>  work on a different directory
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { INDEX_FILE, buildIndex, die, indexStaleness, loadAll, serializeIndex } from "./topics-lib.ts";

const HELP = `build-index — regenerate topics/index.json from the topic files

  node scripts/build-index.ts [options]

  --check        do not write; exit 1 if index.json is stale
  --dir <path>   directory of topic JSONs (default: topics)
  --help         this message
`;

let dir = "topics";
let check = false;

const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  switch (argv[i]) {
    case "--help":
    case "-h":
      process.stdout.write(HELP);
      process.exit(0);
    case "--check":
      check = true;
      break;
    case "--dir":
      dir = argv[++i] ?? dir;
      break;
    default:
      die(`build-index: unknown argument: ${argv[i]}\n\n${HELP}`);
  }
}

const nodes = loadAll(dir);
const stale = indexStaleness(dir, nodes);

if (check) {
  if (stale.length === 0) {
    process.stdout.write(`${INDEX_FILE} is up to date (${nodes.length} topics)\n`);
    process.exit(0);
  }
  process.stderr.write(`${INDEX_FILE} is stale:\n${stale.map((r) => `  ! ${r}`).join("\n")}\n`);
  process.stderr.write(`\nrun: node scripts/build-index.ts\n`);
  process.exit(1);
}

if (stale.length === 0) {
  process.stdout.write(`${INDEX_FILE} already up to date (${nodes.length} topics)\n`);
  process.exit(0);
}

writeFileSync(join(dir, INDEX_FILE), serializeIndex(buildIndex(nodes)), "utf8");
process.stdout.write(`wrote ${join(dir, INDEX_FILE)} (${nodes.length} topics)\n`);
for (const reason of stale) process.stdout.write(`  · ${reason}\n`);
