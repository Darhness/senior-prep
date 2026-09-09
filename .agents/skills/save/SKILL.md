---
name: save
description: Use to read or update senior-prep progress in save.json: resume point, next subtopic, next/skip movement, and explicit save commands.
---

# Saving Progress

`save.json` records the subtopic just finished, not the subtopic about to be
delivered. The next teaching session resumes at the subtopic after it.

## Shape

The file has exactly three fields:

```json
{
  "id": "14",
  "topic": "Memory & Garbage Collection",
  "subtopic": "D4 — ClassLoader leaks — the redeploy classic"
}
```

`id` and `topic` are copied from the topic file. `subtopic` is copied verbatim
from that file's `subtopics` array. `"subtopic": null` means the topic is open
but no subtopic in it has been finished.

No timestamp, history, skipped list, counts, or percentage.

## When To Write

Write on every move from one subtopic to the next: `next`, `skip`, the end of a
session, or an explicit `save`.

In Codex, update `save.json` with the normal file-editing path, preferably
`apply_patch` for manual edits.

After writing, confirm in one line before the next card:

```text
saved · 14 · D4 — ClassLoader leaks — the redeploy classic
```

Do not show the JSON block unless there is no file access.

## Resuming

Read `save.json`, find the saved subtopic in `topics/`, and deliver the next
subtopic unless the user redirects. Do not reteach the saved subtopic and do not
recap what came before it.
