/**
 * Shared loading logic for the topic JSONs.
 *
 * topics/index.json is a generated artefact — never hand-edited. It is derived
 * from the files on disk by scripts/build-index.ts, so the files are the single
 * source of truth and the index can always be thrown away and rebuilt.
 */

import { readdirSync, readFileSync } from "node:fs";
import { join, basename } from "node:path";

// ---------------------------------------------------------------- shapes

export interface Section {
  section: string;
  subtopics: string[];
}

export interface TopicFile {
  id: string;
  topic: string;
  sections: Section[];
}

/** One row of the generated index — identity only, no counters. */
export interface IndexEntry {
  id: string;
  topic: string;
  file: string;
}

export interface TopicIndex {
  topics: IndexEntry[];
}

/** A loaded topic file, with counts derived on the fly (never stored). */
export interface TopicNode {
  file: string;
  id: string;
  topic: string;
  sections: Section[];
  sectionCount: number;
  subtopicCount: number;
}

export const INDEX_FILE = "index.json";

export function die(msg: string): never {
  process.stderr.write(`${msg}\n`);
  process.exit(1);
}

// ---------------------------------------------------------------- loading

function readJson(path: string): unknown {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (err) {
    die(`cannot parse ${path}: ${(err as Error).message}`);
  }
}

/** Topic files are named 01-…, 02-… so a plain lexical sort is the intended order. */
export function topicFiles(dir: string): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    die(`cannot read directory: ${dir}`);
  }
  return entries
    .filter((f) => f.endsWith(".json") && f !== INDEX_FILE)
    .sort()
    .map((f) => join(dir, f));
}

export function loadTopic(path: string): TopicNode {
  const raw = readJson(path) as Partial<TopicFile>;
  const file = basename(path);
  if (!Array.isArray(raw.sections)) die(`${file}: missing "sections" array`);

  const sections = raw.sections.map((s, i) => {
    if (typeof s?.section !== "string") die(`${file}: section[${i}] has no "section" name`);
    return { section: s.section, subtopics: Array.isArray(s.subtopics) ? s.subtopics : [] };
  });

  return {
    file,
    id: raw.id ?? "??",
    topic: raw.topic ?? file,
    sections,
    sectionCount: sections.length,
    subtopicCount: sections.reduce((n, s) => n + s.subtopics.length, 0),
  };
}

export function loadAll(dir: string): TopicNode[] {
  const nodes = topicFiles(dir).map(loadTopic);
  if (nodes.length === 0) die(`no topic JSONs found in ${dir}`);
  return nodes;
}

// ---------------------------------------------------------------- index

/** Derive the index from what is actually on disk. */
export function buildIndex(nodes: TopicNode[]): TopicIndex {
  return { topics: nodes.map(({ id, topic, file }) => ({ id, topic, file })) };
}

export function serializeIndex(index: TopicIndex): string {
  return `${JSON.stringify(index, null, 2)}\n`;
}

export function readIndex(dir: string): TopicIndex | null {
  try {
    readFileSync(join(dir, INDEX_FILE));
  } catch {
    return null; // not generated yet
  }
  const raw = readJson(join(dir, INDEX_FILE)) as Partial<TopicIndex>;
  return { topics: Array.isArray(raw.topics) ? raw.topics : [] };
}

/**
 * Compare the committed index against a freshly derived one.
 * Returns human-readable reasons it is stale; empty means up to date.
 */
export function indexStaleness(dir: string, nodes: TopicNode[]): string[] {
  const current = readIndex(dir);
  if (current === null) return [`${INDEX_FILE} does not exist yet`];

  const fresh = buildIndex(nodes).topics;
  if (serializeIndex({ topics: current.topics }) === serializeIndex({ topics: fresh })) return [];

  const reasons: string[] = [];
  const byFile = new Map(current.topics.map((e) => [e.file, e]));

  fresh.forEach((entry, i) => {
    const existing = byFile.get(entry.file);
    if (!existing) {
      reasons.push(`${entry.file} is missing from ${INDEX_FILE}`);
      return;
    }
    byFile.delete(entry.file);
    if (existing.topic !== entry.topic)
      reasons.push(`${entry.file}: index says "${existing.topic}", file says "${entry.topic}"`);
    if (existing.id !== entry.id) reasons.push(`${entry.file}: index says id ${existing.id}, file says ${entry.id}`);
    if (current.topics[i]?.file !== entry.file) reasons.push(`${entry.file} is out of order in ${INDEX_FILE}`);
  });

  for (const stale of byFile.keys()) reasons.push(`${stale} is listed in ${INDEX_FILE} but has no file`);

  // Formatting-only differences (whitespace, key order) still count as stale.
  return reasons.length > 0 ? reasons : [`${INDEX_FILE} differs from generated output`];
}
