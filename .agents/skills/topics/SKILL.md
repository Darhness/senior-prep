---
name: topics
description: Use for senior-prep topic JSON work: listing topic files, adding, renaming, reordering, deleting, editing sections or subtopics, and checking or regenerating topics/index.json.
---

# Working With Topic JSONs

Two scripts own `topics/`:

| Script | Purpose |
| --- | --- |
| `scripts/topic-tree.ts` | Read-only listing of file -> topic -> section -> subtopic |
| `scripts/build-index.ts` | Generates `topics/index.json` from topic files |

Run commands from the repository root. The scripts run directly on Node 24 with
no build step and no `node_modules`.

## Hard Rules

- Never hand-edit `topics/index.json`; run `node scripts/build-index.ts`.
- Never store counts. Counts are derived by `topic-tree`.
- Topic files are the source of truth. The index holds only `id`, `topic`, and
  `file`.
- If a topic file's `id`, `topic`, or filename changes, rebuild the index.
- Do not change `scripts/topics-lib.ts` to silence validation errors. Fix the
  malformed topic file.
- Subtopics are names only. If the line teaches the answer, it does not belong
  in `topics/`.

## List Topics

Choose the depth:

```powershell
node scripts/topic-tree.ts --depth 1 --no-color
node scripts/topic-tree.ts --depth 2 --no-color
node scripts/topic-tree.ts --depth 3 --no-color
```

Use `--format md` for a Markdown listing and `--format json` for machine-readable
output. Paste important output into the reply.

If `topic-tree` reports that `index.json` is stale, fix that before treating the
listing as authoritative.

## Add Or Move A Topic

Topic files are numbered in learning order. Decide where the new file belongs by
listing existing topics first:

```powershell
node scripts/topic-tree.ts --depth 1 --no-counts --no-color
```

If inserting in the middle, rename later files and their `id` fields together.
Use a two-pass rename when filenames would collide.

New files use exactly this shape:

```json
{
  "id": "37",
  "topic": "Human Readable Title",
  "sections": [
    {
      "section": "A — Section name",
      "subtopics": ["A1 — First subtopic"]
    }
  ]
}
```

No extra top-level keys.

After adding, deleting, renaming, or changing identity:

```powershell
node scripts/build-index.ts
node scripts/build-index.ts --check
```

## Edit Sections Or Subtopics

Edit the topic file directly. Keep section letters and subtopic numbers aligned
with position unless the file is a question bank using stable `Q<n>` ids.

After editing:

```powershell
node scripts/topic-tree.ts --depth 3 --no-color
```

Use `Select-String` or `rg` to focus the output when needed.

## Naming Conventions

- Filename: `NN-kebab-case-title.json`.
- JSON `id`: same two-digit number as the filename.
- Section: `A — Section name`.
- Subtopic: `A1 — Name`, `A2 — Name`.
- Question bank item: `Q<n> — Full question?`.
- Use the spaced em dash separator ` — `.
- Use `&` in topic titles and `and` in section names.
- Use `vs`, not `versus`.
- Use American spelling.
