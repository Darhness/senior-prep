---
name: format
description: Use when teaching a senior-prep subtopic card, resuming a teaching session, starting a new topic file or section, or when the user says the card format has drifted.
---

# Delivering A Subtopic

This skill supports `project-instructions.md`. Read `template.md` in this
directory before delivering a card at a boundary: a fresh chat, a resume, a new
topic file, a new section, or a format correction.

## Before The First Subtopic Of A Topic

Send one short setup message:

1. Name the topic file and section being started.
2. Ask what the user already knows.
3. Ask whether anything in the file should be skipped.

Then stop. Do not include the first card in that message.

## The Contract

- One subtopic per message. Never preview the next one.
- Stop after the card's compact phone control strip.
- Never end a card with a question.
- About 200 words by default.
- Keep **How it works** to two or three short paragraphs unless the user asks for
  depth.
- Drop optional slots when they do not apply.
- Title must be copied verbatim from the JSON.
- Do not rely on topics from files the user has not reached. Explain the needed
  piece in one line, or say that it comes later.
- Use ChatGPT Markdown deliberately: bold slot labels, inline code, fenced
  blocks, tiny tables, and short numbered lists when the content calls for them.
- Search the web only when the user asks, when facts are current or unstable, or
  when the answer needs citation. Cite briefly when search was used.
- Use images or richer visuals only when the user asks or when they reduce the
  explanation enough to justify leaving the compact card shape.
- End every subtopic card with the exact control strip from `template.md`. Do
  not describe it as native buttons or add another closing line.

For diagrams, use the `diagram` skill before drawing.

## Ending A Topic

Give the progress line on its own and nothing after it:

```text
14-memory-and-garbage-collection · done · skipped B2, C3
```
