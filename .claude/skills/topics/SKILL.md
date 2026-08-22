---
name: topics
description: Use whenever working with the interview-prep topic JSONs in topics/ — listing what each file contains (file → topic → section → subtopic), adding, renaming, reordering or deleting a topic file, editing sections or subtopics, or anything touching topics/index.json. Triggers on "list the topics", "what's in each file", "what topics do we have", "add a topic", "rename topic", "new section", "regenerate the index", "is the index up to date".
---

# Working with the topic JSONs

Two scripts own this directory. Use them; do not do their jobs by hand.

| Script | Purpose |
| --- | --- |
| `scripts/topic-tree.ts` | Read-only. Lists what each topic file contains. Never writes. |
| `scripts/build-index.ts` | Writes `topics/index.json`. The only thing allowed to write it. |

Both run on Node 22.6+ with no build step and no `node_modules`. Run every command
from the project root `e:\Projects\senior-prep`.

## Non-negotiable rules

1. **Never hand-edit `topics/index.json`.** It is generated. Any manual edit is
   overwritten by the next `build-index` run. If you catch yourself opening it in an
   editor, stop and run the generator instead.
2. **Never store counts anywhere.** Section and subtopic totals are derived at read
   time by `topic-tree`. Do not add `sections:` or `subtopics:` count fields back into
   `index.json` or into a topic file.
3. **The topic files are the source of truth.** `index.json` can be deleted at any
   moment and rebuilt from them. Nothing else may be true only in the index.
4. **After any change to a topic file's `id`, `topic`, or filename — rebuild the index.**
   Changes to `sections`/`subtopics` do not affect the index, but rebuilding is harmless.
5. **Do not edit `scripts/topics-lib.ts` to work around a validation error.** The error
   means a topic file is malformed. Fix the topic file.

## Procedure A — list what the files contain

Output is a plain list, one block per file, blank line between blocks:

```
01-oop-and-design-principles.json  —  OOP & Design Principles  [3 sections · 13 subtopics]
- A — The four OOP pillars
  - A1 — Encapsulation
```

Step 1. Decide the depth:
- `--depth 1` — one line per file, no blank lines
- `--depth 2` — plus section names
- `--depth 3` — plus every subtopic (default, 969 lines)

Step 2. Run it:

```bash
node scripts/topic-tree.ts --depth 2
```

Step 3. If the output is for a document or a message rather than the terminal, add
`--format md`. If it is for another program, add `--format json`.

Step 4. Paste the output into the reply. Terminal output is not reliably visible to the
user, so a run alone does not count as showing it.

Step 5. If the run ends with a red `index.json is stale` block, go to Procedure E
before reporting the listing as correct.

## Procedure B — add a new topic

Step 1. Pick the next free two-digit id by looking at the highest existing number:

```bash
node scripts/topic-tree.ts --depth 1 --no-counts
```

Step 2. Create `topics/<id>-<kebab-case-title>.json`. The filename number **must** match
the `id` field — sort order and identity both depend on it. Use exactly this shape:

```json
{
  "id": "31",
  "topic": "Human Readable Title",
  "sections": [
    {
      "section": "A — Section name",
      "subtopics": ["A1 — First subtopic", "A2 — Second subtopic"]
    }
  ]
}
```

Required: `id` (string, zero-padded), `topic` (string), `sections` (array).
Each section needs `section` (string) and `subtopics` (array of strings).
No other top-level keys. No counts.

Step 3. Match the existing prose conventions: em dash `—` as the separator, sections
labelled `A`, `B`, `C`, subtopics labelled `A1`, `A2` under section `A`. Some files use
`Q1 — <question>` for question banks — follow whichever the neighbouring files use.

Step 4. Regenerate the index — this is not optional:

```bash
node scripts/build-index.ts
```

Step 5. Verify the new file appears and nothing else changed:

```bash
node scripts/topic-tree.ts --depth 1 --no-counts
```

## Procedure C — rename a topic or change its title

Step 1. Edit the `topic` field inside the topic file. To rename the file itself, keep the
`NN-` prefix and keep it consistent with the `id` field.

Step 2. Regenerate:

```bash
node scripts/build-index.ts
```

Step 3. Confirm the index picked it up — this must print `up to date`:

```bash
node scripts/build-index.ts --check
```

## Procedure D — add or edit sections and subtopics

Step 1. Edit the topic file directly. Add to the `subtopics` array or push a new object
onto `sections`.

Step 2. Do not touch anything else. Section and subtopic changes do not alter the index,
because the index holds identity only.

Step 3. Confirm the file still parses and the new entries land where you expect:

```bash
node scripts/topic-tree.ts --depth 3 | grep -A5 "<topic name>"
```

## Procedure E — index is stale

Symptom: `topic-tree` prints a red `index.json is stale` block, or
`build-index.ts --check` exits 1.

Step 1. Read the reasons it printed. They name the exact file and disagreement.

Step 2. Decide which side is wrong:
- The topic file is correct → run `node scripts/build-index.ts`. This is the normal case.
- The topic file is wrong (bad title, wrong id) → fix the topic file first, *then* run
  the generator.

Step 3. Never resolve it by editing `index.json`.

Step 4. Confirm clean:

```bash
node scripts/build-index.ts --check
```

## Procedure F — delete a topic

Step 1. Delete the `topics/NN-*.json` file.

Step 2. Run `node scripts/build-index.ts`. The removed entry disappears from the index.

Step 3. Leave the gap in the numbering, or renumber every later file *and* its `id`
field together. Do not renumber a filename without its `id` — they must agree.

## Failure modes

| Message | Meaning | Fix |
| --- | --- | --- |
| `<file>: missing "sections" array` | Top-level `sections` absent or not an array | Add the array to that file |
| `<file>: section[N] has no "section" name` | Section object missing its `section` string | Add the name to that section |
| `cannot parse <file>: ...` | Invalid JSON — usually a trailing comma | Fix the syntax at the reported position |
| `no topic JSONs found in <dir>` | Wrong working directory | Run from project root, or pass `--dir` |
| `--depth must be 1, 2 or 3` | Out-of-range depth | Use 1, 2 or 3 |

## Full flag reference

`scripts/topic-tree.ts`

| Flag | Effect |
| --- | --- |
| `--dir <path>` | Directory of topic JSONs (default `topics`) |
| `--depth <1\|2\|3>` | How deep to descend (default 3) |
| `--format <list\|md\|json>` | Output shape (default `list`) |
| `--no-counts` | Hide the derived tallies |
| `--no-color` | Plain output; also automatic when piped or under `NO_COLOR` |
| `--help` | Usage |

`scripts/build-index.ts`

| Flag | Effect |
| --- | --- |
| `--check` | Do not write; exit 1 if stale. Use in CI or to verify. |
| `--dir <path>` | Directory of topic JSONs (default `topics`) |
| `--help` | Usage |

`package.json` shortcuts: `npm run tree`, `npm run index`, `npm run index:check`.
Pass script flags after `--`, e.g. `npm run tree -- --depth 2`.

## Generated index shape

`topics/index.json` holds identity only. This is the entire schema:

```json
{
  "topics": [
    { "id": "01", "topic": "OOP & Design Principles", "file": "01-oop-and-design-principles.json" }
  ]
}
```

Order follows the filename sort. Two-space indent, trailing newline — produced by the
generator, so never adjust the formatting by hand.
