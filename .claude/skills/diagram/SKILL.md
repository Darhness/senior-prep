---
name: diagram
description: Whether a subtopic is worth drawing, and the ASCII vocabulary to draw it in. Load before putting any diagram into a card, and whenever I type `draw` or `show me`.
---

# Drawing it in ASCII

Most subtopics do not need a picture. This file is mostly about not drawing one.

## Is a diagram worth it here

One test, answered in a single pass:

> **Would my hand move if I were saying this at a whiteboard?**

If the answer is no, write the sentence. A drawing of something that was
already a list costs more attention than it returns — it looks like content
and carries none.

Then one more gate before drawing: **the picture has to take work off the
prose.** If **How it works** still has to spell out everything the boxes
show, the boxes are decoration. Draw it, then delete the sentences it
replaced. If nothing can be deleted, delete the diagram instead.

### Worth drawing

**Where things sit.** `14-A2 — The runtime data areas`, `14-A6 — Eden, the
survivor spaces and tenuring`, `02-G2 — The implicit outer reference`.

**Order across more than one actor.** `13-A2 — happens-before`,
`21-C1 — The handshake — what each round trip buys`, `25-E2 — Transactional
outbox`. One actor doing three things in order is a numbered list, not a
diagram. Two actors is a diagram.

**Who talks to whom.** `33-B1 — The shape of the hexagon`, `21-G2 — Reverse
proxies, sidecars and hop-by-hop headers`, `25-A1 — Queue vs topic vs log`.

**A chain or a path.** `14-E4 — Following a GC root chain to the culprit`,
`21-F1 — Where the time went — DNS, connect, TLS, first byte, transfer`.

**A branch that surprises people.** `13-C5 — The queue decides the pool —
why maxPoolSize often never applies`. The whole subtopic is the branch, so
the branch is the lesson.

### Not worth drawing

**Lists wearing boxes.** `01-C1 — SOLID, with the failure mode of each`,
`14-C1 — The GC logging flags worth setting in production`. Five boxes in a
row is five bullet points with extra steps.

**Comparisons.** `13-B4 — Fair vs unfair locks`, `05-C1 — ArrayList vs
LinkedList`. `template.md` already routes these to a table or to bold
labels. A comparison only earns a drawing when the *shape itself* is the
answer — contiguous cells against scattered nodes, say — and then draw the
shape, not the comparison.

**Definitions and policies.** `33-F2 — Architecture decision records`,
`13-D2 — Interruption policy — who owns the thread`. Nothing is anywhere.

**Anything that needs a legend.** If the picture cannot be read without a
key, it is not simpler than the sentence.

## Vocabulary

Same mark means the same thing in file 5 and in file 30, or every diagram
costs a re-parse.

| Element | Means |
| --- | --- |
| `+----+` box | A thing that exists — object, service, region of memory |
| `-->` | Something that happens — a call, a reference, data moving |
| `..>` | A weaker edge — async, optional, or a reference that does not keep the target alive |
| `===` | A boundary that costs something to cross — process, network, thread, transaction |
| Down the page | Time, for anything with an order |
| Left to right | A pipeline, when nothing about it is sequential in time |
| `xN` | Many of these |
| `<-- ...` | Points at the thing the card is actually about, when context shares the picture |

## ASCII conventions

**Plain ASCII only.** No box-drawing characters. They look better on a
desktop and misalign on a phone, and one vocabulary that always works beats
two that sometimes do.

**Under 40 characters wide**, same limit as code. Anything wider scrolls
sideways on a phone, and anything that scrolls sideways does not get read.

**Always a fenced block**, tagged ` ```text `. Never loose in a paragraph —
proportional fonts destroy the alignment.

**Label every box.** No single letters explained only in the sentence
underneath; the diagram sits inside the card and has to survive being read
on its own.

**Say what you simplified.** One line under the block, in prose. A picture
that quietly lies is worse than no picture.

**One diagram per card, at most.** Two means the subtopic was too big.

## Render ladder

| Target | Use when |
| --- | --- |
| ASCII in the card | Always. This is the default and almost always the answer |
| Mermaid | Only when I ask for it by name |
| An artifact | Never — it leaves the chat, and the card has to stay scrollable next to everything else |

## Does it survive

The diagram lives inside **How it works**, so it is part of the card and
gets reread with it. Two consequences:

- It must be readable with the surrounding prose covered up.
- **Never redraw it.** If a later subtopic needs the same picture, name the
  earlier subtopic instead — `the Eden diagram in 14-A6`. Redrawing it burns
  a screen on something already learned.

## Worked examples

### 14-A6 — Eden, the survivor spaces and tenuring

Where things sit, plus time going down the page.

```text
 allocation
     |
     v
 +--------+   minor GC   +--------+
 |  Eden  |------------->|   S0   |
 +--------+              +--------+
                              |
                       each later GC:
                       copy, age + 1
                              v
                         +--------+
                         |   S1   |
                         +--------+
                              |
                     age > threshold
                              v
                         +--------+
                         |  Old   |
                         +--------+
```

Simplified: `S0` and `S1` swap roles at every collection rather than feeding
one into the other.

### 13-A2 — happens-before — the whole model in one relation

Two actors, so the order is the lesson. The `hb` edge is the entire point of
the subtopic, and it is one character wide in prose.

```text
 Thread A          Thread B
    |                 |
  x = 42              |
    |                 |
  flag = true         |
  (volatile)          |
    |                 |
    +----- hb ------->|
    |                 |
    |            reads flag
    |                 |
    |            sees x = 42
    v                 v
```

### 13-F1 — The four Coffman conditions — tempting, but no

Four named conditions is a list, and `template.md` already sends
enumerations to a numbered list. Four boxes teach nothing the four names do
not.

The nuance: *circular wait* on its own is a shape, and a three-thread cycle
is worth two lines of ASCII. Apply the test to the thing being explained,
not to the subtopic title.
