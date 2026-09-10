# senior-prep

## What This Project Is

This repository is a senior Java software engineer interview syllabus.

`topics/` contains the product: 36 JSON files in learning order. Each file is a
small tree:

```text
topic -> sections -> subtopics
```

The topic files are a coverage map, not teaching material. Subtopics are labels
for things worth discussing later in chat.

`project-instructions.md` governs teaching from the syllabus. This file governs
Codex work on the repository.

## Repository Rules

- `topics/` is names only. Do not add explanations, definitions, answers, code,
  links, tags, priorities, time estimates, or counts to topic JSON files.
- `topics/index.json` is generated. Never hand-edit it.
- If a topic file's `id`, `topic`, or filename changes, run
  `node scripts/build-index.ts` and then `node scripts/build-index.ts --check`.
- Section and subtopic changes do not affect the index, but the topic file must
  still parse and render correctly with `node scripts/topic-tree.ts`.
- Filename numbers must match the JSON `id` field.
- File order is learning order. Insert topics where their prerequisites are
  already covered, not automatically at the end.
- `save.json` is the only persistent resume point. It has exactly `id`,
  `topic`, and `subtopic`.

## Skills

Use the repo-local Codex skills in `.agents/skills/`:

- `topics`: any listing, adding, renaming, reordering, deleting, or index work
  under `topics/`.
- `format`: the teaching-card contract when delivering a subtopic.
- `diagram`: whether and how to draw an ASCII diagram in a card.
- `save`: updating or reading the teaching resume point in `save.json`.

The older `.claude/skills/` folder mirrors the same project concepts for Claude.
Keep it intact unless the user asks to migrate or remove Claude support.

## Tooling

The scripts run directly with Node 24. No build step and no `node_modules` are
required.

Useful commands:

```powershell
node scripts/topic-tree.ts --depth 1 --no-color
node scripts/topic-tree.ts --depth 2 --no-color
node scripts/build-index.ts --check
node scripts/build-index.ts
```

On this Windows machine, plain `npm` in PowerShell may hit the `npm.ps1`
execution-policy block. Use `npm.cmd run ...` or call `node scripts/...`
directly.

## Teaching Mode

When the user asks to learn, resume, continue, or says a shorthand command such
as `next`, switch to the teaching contract in `project-instructions.md`.

At the start of a teaching session:

1. Read `save.json`.
2. Find the saved subtopic in `topics/`.
3. Pick up at the subtopic after it, unless the user redirects.

During teaching, deliver one subtopic per message and then stop. The user
controls pacing.

## ChatGPT Surface

This project is meant to be used from the ChatGPT phone app while Codex runs on
the PC. Optimize teaching output for mobile chat:

- Markdown is the normal rendering surface.
- Use inline code for Java identifiers and fenced code blocks for code.
- Keep code and ASCII diagrams narrow enough for a phone.
- Use web search only when the user asks, when facts are current or unstable, or
  when an answer needs a cited source.
- Use web images, generated images, Mermaid, or richer visuals only when the
  user asks or when the visual genuinely reduces explanation.
- Cite sources briefly whenever web search or external images are used.

## Working Preferences

- Show important script output in the reply; do not assume terminal output is
  visible to the user.
- Prefer plain terminal text for repo work. During teaching, use normal ChatGPT
  Markdown and the smallest visual/tool that helps the current subtopic.
- Do not spawn subagents unless the user asks.
- Keep edits narrow and preserve existing `.claude` behavior unless the current
  task explicitly targets it.
