# Subtopic Template

Every taught subtopic is a compact card. The target is a phone screen.

## Constraints

- Code and ASCII diagrams stay under about 40 characters wide.
- Tables are only for tiny cells.
- A card is about 200 words.
- If one subtopic needs two screens, say it should be split instead of delivering
  two screens.

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

## Variants

For comparisons, make **How it works** one line per axis. If every cell is only a
few words, a table is fine. Otherwise use bold labels.

For enumerations, make **How it works** a numbered list. There is often no real
**Where it bites**, so omit it.
