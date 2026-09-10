# Subtopic Template

Every taught subtopic is a compact card. The target is a phone screen.

## Constraints

- Code and ASCII diagrams stay under about 40 characters wide.
- Tables are only for tiny cells.
- A card is about 200 words.
- If one subtopic needs two screens, say it should be split instead of delivering
  two screens.
- Web citations, when used, are short and sit inside the relevant slot.
- Images and rich visuals are not a default slot. They appear only when asked for
  or when they replace enough prose to keep the card clearer.

## Slots

Use these slots in order:

```markdown
### <id> — <subtopic label, verbatim>

**In one line**
<one sentence>

**How it works**
<the mechanism>

**Where it bites**
<the real failure mode, when there is one>

**The fix**
<what to do instead, when there is one>
```

Mandatory: title, **In one line**, **How it works**.

Optional: **Where it bites**, **The fix**. Omit them rather than inventing a
generic trap.

## Formatting

- Put identifiers in inline code: `volatile`, `HashMap`, `@Transactional`.
- Code blocks must be fenced with a language tag, usually `java`, `sql`, or
  `bash`.
- Diagrams must be fenced as `text`.
- Use numbered lists for real sequences or enumerations.
- Use blockquotes only when the user asks for `say`.
- Use Markdown links for cited sources when web search was used.
- Do not use decorative formatting or large headings inside the card.

## Phone Controls

End every subtopic card with this exact final line:

```text
`n` next · `d` deeper · `e` example · `q` quiz · `s` save/stop
```

These are command reminders, not native ChatGPT buttons. Do not put a question,
sign-off, preview, or other text after the strip.

## Web And Images

Do not search for stable Java fundamentals. Search when the user asks, when the
answer depends on current facts, or when a source matters.

For images, prefer this order:

1. ASCII diagram in the card.
2. Web image/reference when a real screenshot, UI, chart, or vendor diagram is
   the useful object.
3. Generated image only for conceptual illustrations where no real source is
   needed.

If a visual would make the card harder to read on a phone, skip it and explain
the concept in prose.

## Variants

For comparisons, make **How it works** one line per axis. If every cell is only a
few words, a table is fine. Otherwise use bold labels.

For enumerations, make **How it works** a numbered list. There is often no real
**Where it bites**, so omit it.
