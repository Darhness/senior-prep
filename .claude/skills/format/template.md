# Subtopic template

Every subtopic is delivered as a card with the same labelled slots in the same
order. Not decoration — it is the enforcement mechanism. Prose rules decay
quietly over a long chat; a missing slot is visible on sight.

## Where this gets read

Claude Chat, on a phone. That is a hard constraint, not a preference:

- **Nothing monospace goes past ~40 characters wide.** Code blocks and ASCII
  diagrams scroll sideways otherwise, and anything that scrolls sideways on a
  phone does not get read.
- **Tables only when every cell is a few words.** A short lookup table reads
  fine on a phone. A table whose cells are sentences squashes or scrolls — that
  content becomes bold labels on their own lines instead.
- **A card should be takeable in without scrolling back.** If it needs two
  screens, the subtopic was too big and should have been split.

Slot labels are bold on their own line rather than headings partly for this
reason — headings burn vertical space a phone does not have.

(Tables are fine *in this file*. It is a spec I read, not a card you read.)

## The slots

| Slot | Always? | Holds |
| --- | --- | --- |
| Title | yes | The subtopic label copied verbatim from the JSON, so it is greppable later |
| **In one line** | yes | The compressed version. If only one sentence survives, this is it |
| **How it works** | yes | The mechanism. The body of the lesson |
| **Where it bites** | when there is one | The failure mode — what breaks, in production, for real |
| **The fix** | when there is one | What to do instead. Omit when the subtopic has no trap |
| **Say this** | yes | The spoken answer, in quotes. Shorter than the explanation, no hedging |

Four are mandatory: **Title, In one line, How it works, Say this.** The rest
appear only when the subtopic actually has one. A card that pads *Where it
bites* with something invented is worse than a card without the slot.

Code and diagrams are not slots. They go inside **How it works** when the
mechanism is the point — see `../diagram/SKILL.md` for when a drawing earns
its place.

## The shape

```markdown
### <id> — <subtopic label, verbatim>

**In one line**
<one sentence>

**How it works**
<the mechanism>

**Where it bites**
<the failure mode>

**The fix**
<what to do instead>

**Say this**
"<the spoken answer>"
```

Slot labels are bold on their own line, content underneath. Not headings —
headings at this depth make the chat unreadable when several cards stack up.

## Formatting

Use real markdown when the content genuinely has that shape. Never as
decoration.

- **Code goes in a fenced block with a language tag** — ` ```java `, ` ```sql `,
  ` ```bash `. Never a bare fence, never indented code. Syntax highlighting is
  free and it is the one formatting tool that always pays.
- **Identifiers go in inline code** — `volatile`, `HashMap`, `this$0`,
  `@Transactional`, `shutdownNow()`. Every time, including mid-sentence.
- **Tables when every cell is a few words.** Otherwise bold labels on their own
  lines.
- **Numbered lists for real sequences** — a lifecycle, an ordering, "the four
  kinds". Not for three loosely related points.
- **Bold for slot labels and for a term at the moment it is introduced.** Not
  for emphasis.
- **Blockquote for the spoken answer** in *Say this*, and nothing else.

The failure mode is everything turning into bullet points. Most of **How it
works** is prose, because most explanation is prose. Reach for structure only
when the content already has structure — and if a paragraph would say it
better, write the paragraph.

## Worked example

### 02-G2 — The implicit outer reference — the inner-class leak

**In one line**
A non-static inner class secretly holds its enclosing instance alive.

**How it works**
javac adds a synthetic `this$0` field to every non-static inner class,
pointing at the instance that created it. Anonymous and local classes get one
too. You never wrote that field, and it does not appear in the source.

**Where it bites**
Register a listener from an inner class into a long-lived registry and the
enclosing object can never be collected — however large it is. This is the
mechanism behind a whole family of leaks in caches, event buses and anything
holding callbacks.

**The fix**
Declare the nested class `static` and pass what it needs explicitly. The
synthetic field disappears.

**Say this**
"Inner classes capture the enclosing instance, so retaining one retains the
outer object. I default to static nested classes and pass in what they need."

## Variants

Some subtopics do not fit the default shape. Two that come up often:

**Comparisons** — `05-C1 — ArrayList vs LinkedList`, `01-D4 — Abstract class
vs interface`. **How it works** becomes one line per axis that actually
differs, and **The fix** becomes *Which to pick*.

If the axes reduce to a couple of words each, use a table:

| | ArrayList | LinkedList |
| --- | --- | --- |
| Random access | O(1) | O(n) |
| Insert at head | O(n) | O(1) |

If they do not — `01-D4` is mostly judgement, not numbers — use bold labels
instead, because those cells would be sentences.

**Enumerations** — `13-F1 — The four Coffman conditions`, `09-A3 — Method
references — the four kinds`. **How it works** is a numbered list. There is
usually no *Where it bites*, so the slot is dropped.

Anything else that resists the shape: deliver it as clear prose and say so in
one line. Do not distort a subtopic to fit a form.

## No questions back

A card never ends by testing you. Retrieval only works with a delay, and a
question asked three lines under its own answer tests nothing.

If you want to be tested, ask.
