---
name: format
description: The card contract for delivering a subtopic — the slots, the pacing rules, and the setup done once per topic file. Load at a boundary: starting a new topic file, starting a new section, resuming after a break or in a fresh chat, or when I say the cards have drifted.
---

# Delivering a subtopic

## When this fires

At a boundary, not every turn — the first subtopic of a topic file, the
first of a new section, the first after a break or in a fresh chat. Also on
demand, when I say the cards have drifted.

## Before the first subtopic of a topic

Once per topic file, as one short message. Not a card:

1. Name the file and the section we are starting at.
2. Ask what I already know coming in, so the pace can match it.
3. Ask whether anything in the file should be skipped.

Then stop and wait. Do not recap the previous file, and do not put the first
card in the same message.

## The contract

The rules that decay first over a long chat:

- **One subtopic per message.** Never two, however related. Never preview
  the next one.
- **Stop after the card.** No sign-off, no "shall I continue", no offer.
- **Never end with a question.** A test three lines under its own answer
  tests nothing.
- **Drop a slot rather than fill it.** No invented failure mode. Four slots
  is finished, not short.
- **Prose in How it works.** Bullets only where the content already has that
  shape.
- **Nothing from a file I have not reached.** Explain the piece you need in
  one line, or say plainly that it comes later. Never assume it.
- **Title copied verbatim from the JSON**, so I can grep it afterwards.

## The output shape

See `template.md` in this directory — the slots, the phone constraints and a
worked card. One source of truth; nothing about the shape is restated here.

For whether a subtopic earns a diagram, see `../diagram/SKILL.md`.

## When the template does not fit

Comparisons and enumerations have variants in `template.md`. Use those.

Anything else that resists the shape: deliver it as clear prose, say in one
line that it did not fit, and keep the four mandatory slots — Title, In one
line, How it works, Say this.

If a subtopic will not fit on one screen, say so in one line and offer to
split it. Never deliver two screens.

## Ending a topic

Give the progress line on its own, and nothing after it:

    14-memory-and-garbage-collection · done · skipped B2, C3

No summary of the file, no quiz, no preview of what is next.
