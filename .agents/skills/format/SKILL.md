---
name: format
description: Use when teaching a senior-prep subtopic card, resuming a teaching session, starting a new topic file or section, or when the user says the card format has drifted.
---

# Delivering A Subtopic

This skill supports `project-instructions.md`. Read `template.md` in this
directory before delivering a card at a boundary: a fresh chat, a resume, a new
topic file, a new section, or a format correction.

## Silent Transitions

When the user sends `n`, `N`, or `next`, deliver the next card directly. Do not
state that progress was saved, announce the next subtopic, recap, or add setup
text. This remains true when the move crosses a section or topic-file boundary.

## The Contract

- One subtopic per message. Never preview the next one.
- Stop after the card's compact phone control strip.
- Never end a card with a question.
- About 100 words by default.
- Give the concrete meaning first. Expand acronyms and other short named terms
  before explaining the idea they represent.
- Keep **How it works** to one or two short paragraphs unless the user asks for
  depth.
- Prefer only the three mandatory slots. Add **Where it bites** or **The fix**
  only when the failure or remedy is central to understanding the subtopic.
- Cover the core interview idea, not every useful qualification or edge case.
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

Do not emit a topic-complete line when another topic remains. A move into the
next topic is silent and the next card is the whole response. Report completion
only when the entire syllabus is finished or the user explicitly asks.
