---
name: save
description: Write the resume point to save.json — topic id, topic title, and the subtopic just finished. Fires on every move from one subtopic to the next, on `next` and `skip`, and at the end of a session.
---

# Saving the resume point

Progress is the one thing here that cannot be derived. Counts, the index,
what comes next — all of it is read back out of `topics/`. Where I stopped
is not, so it gets written down.

## When this fires

Every move from one subtopic to the next — `next`, `skip`, or anything else
that ends a subtopic. Once per move, and at the end of a session so the last
card delivered is recorded. Also on `save`, which writes without moving on.

## What gets written

The subtopic **just finished**, not the one about to be delivered. The save
is a resume point: the next session starts at the one after it.

Three fields, and no others:

```json
{
  "id": "14",
  "topic": "Memory & Garbage Collection",
  "subtopic": "D4 — ClassLoader leaks — the redeploy classic"
}
```

`id` and `topic` are copied from the topic file. `subtopic` is copied
verbatim from its `subtopics` array — the same rule as the card title, so it
stays greppable.

`"subtopic": null` means the topic file is open but nothing in it is
finished yet.

Two-space indent, trailing newline, matching `topics/index.json`.

## Where it goes

Overwrite `save.json` in the project root, using the **Write tool**. A resume
point, not a log — the previous contents are not kept.

The Write tool matters: `.claude/settings.json` allows exactly that path, so the
write lands silently. Shelling out to a heredoc instead falls under the Bash
rules and puts the permission prompt back in front of every card.

Then confirm in **one line**, before the card:

    saved · 14 · D4 — ClassLoader leaks — the redeploy classic

One line, never the JSON block. The file is the record; the line only shows
that the write happened. Six lines of JSON in front of every card would eat
half the screen this is read on.

If there is ever no file to write — a plain chat with no tools — emit the JSON
block itself instead, ready to paste.

## Resuming from it

Read `save.json` and deliver the subtopic **after** the one it names. Do not
re-teach the saved subtopic, and do not recap what came before it.

## What is not in it

No timestamp, no history, no counts, no skipped list, no percentage. One
resume point, overwritten every time. Anything that can be worked out from
`topics/` plus these three fields does not belong in this file.
