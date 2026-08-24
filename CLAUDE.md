# CLAUDE.md

## What this project is

A syllabus for a **senior Java software engineer exam / interview**.

`topics/` holds 36 JSON files, one per subject area. Each file is a small tree:

```
topic  →  sections  →  subtopics
```

That is the whole product. Nothing here teaches anything. The files are a **coverage
map** — a checklist of every thing worth being asked about, in an order that makes
sense to learn in.

## How the files get used

The JSONs are pasted into a Claude chat later, one at a time, and worked through
interactively:

1. Claude takes the next subtopic.
2. Claude explains it.
3. The learner asks follow-up questions until it clicks.
4. On to the next subtopic.

Two things follow from that:

- **Coverage is the job.** A missing subtopic is a blind spot on interview day. When in
  doubt, add the subtopic.
- **Order is content.** Put a subtopic after the ones you would want to understand
  first. The reader walks the list top to bottom and does not skip. The same holds for
  the files: they are numbered in learning order, so a new topic goes where its
  prerequisites are already met, not on the end.

## The one hard rule: names only, no content

A subtopic is a **label for something to be discussed**, never the discussion itself.

Allowed — a name, optionally narrowed by a short qualifier:

```
"A1 — Encapsulation"
"C1 — SOLID, with the failure mode of each"
"B4 — Static vs dynamic dispatch — what is decided at compile time"
"D1 — Prefer composition over inheritance — the argument, not the slogan"
```

Not allowed — anything that answers, defines or explains:

- descriptions, definitions, summaries, "i.e." clauses
- code, snippets, signatures, examples
- model answers, hints, notes
- difficulty ratings, time estimates, priorities, links, tags

The test: **if the line teaches the reader something, it does not belong.** A qualifier
that narrows *what to cover* is fine. A phrase that *does the covering* is not.

Also out: stored counts (they are derived), and any top-level key beyond
`id`, `topic`, `sections`.

## Text style

Professional, but easy language. Write for a competent engineer in a hurry.

- **Short.** A noun phrase, not a sentence. No trailing period.
- **Plain words where they are just as exact.** "how it fails", not "failure semantics".
- **Keep the real term of art** when the term is the thing being examined —
  `happens-before`, backpressure, write-behind, bridge methods. The interviewer will use
  those words, so the syllabus must too.
- **No filler.** Drop "understanding of", "introduction to", "a deep dive into",
  "best practices for".
- **No selling.** Nothing is "powerful", "modern" or "essential".
- **American spelling** — it matches the Java API itself (`synchronized`,
  `Serializable`). `topics/` is fully normalized; keep it that way. `initialization`,
  not `initialisation`; `modeling`, `behavior`, `catalog`, `authorization`.

## Naming conventions

| Thing | Shape | Example |
| --- | --- | --- |
| Separator | spaced em dash ` — ` | `A1 — Encapsulation` |
| Section | letter, then name | `A — The four OOP pillars` |
| Subtopic | section letter + number | `A1`, `A2`, `A3` under section `A` |
| Question banks | `Q<n> — ` + the full question, with `?` | `Q1 — How would you debug a memory leak in production?` |
| Conjunction | `&` in a topic title, `and` in a section name | `Memory & Garbage Collection` / `B — Collectors and tuning` |
| Comparison | `vs`, no period | `A4 — Abstract class vs interface` |
| Filename | `NN-kebab-case-title.json` | `13-multithreading-and-concurrency.json` |

Question numbering is stable identity, not position — file 28 opens with `Q5, Q1, Q12`
because the questions were regrouped by theme. Never renumber a `Q` to tidy the order.

Follow whatever the neighboring files already do. Consistency inside `topics/` beats
this table.

## File shape

```json
{
  "id": "01",
  "topic": "OOP & Design Principles",
  "sections": [
    {
      "section": "A — The four OOP pillars",
      "subtopics": ["A1 — Encapsulation", "A2 — Inheritance"]
    }
  ]
}
```

The number in the filename **must** match `id`. Identity and sort order both depend on
it.

## Tooling

TypeScript, run directly on Node 24. No build step, no `node_modules`. Run everything
from the project root.

| | |
| --- | --- |
| `scripts/topic-tree.ts` | Read-only. Lists file → topic → section → subtopic. |
| `scripts/build-index.ts` | The only thing allowed to write `topics/index.json`. |
| `npm run tree` / `index` / `index:check` | Shortcuts for the above. |

**`topics/index.json` is generated. Never hand-edit it.** It holds identity only
(`id`, `topic`, `file`) and can be deleted and rebuilt at any time. Rebuild it after
any change to an `id`, a `topic` title, or a filename.

## Skills

| Skill | Use it for |
| --- | --- |
| **`topics`** (project skill, `.claude/skills/topics/`) | **Anything touching `topics/`** — listing, adding, renaming, reordering, deleting, fixing a stale index. It has the step-by-step procedures and the failure-mode table. Load it before editing, not after something breaks. |
| `init` | Regenerating this file. |
| `update-config` | Permissions and hooks in `.claude/settings.json`. |
| `code-review`, `simplify`, `security-review` | Only relevant to `scripts/`, never to the JSONs. |

Everything else on the global skill list (`design`, `dataviz`, `artifact-*`,
`claude-api`, `schedule`, `loop`, …) is out of scope here.

## Working preferences

- Show script output by **pasting it into the reply**. Terminal output is not reliably
  visible, and a run alone does not count as showing it.
- Plain terminal text. No artifacts, no visual design, no charts for this project.
- Do not spawn subagents unless asked.
