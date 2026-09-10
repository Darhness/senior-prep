---
name: diagram
description: Use before adding any visual to a senior-prep teaching card: ASCII diagrams, Mermaid by request, web image references, or generated conceptual images.
---

# Visuals In ChatGPT

Most subtopics do not need a picture. Use the smallest visual that removes work
from the prose.

Use this test:

> Would my hand move if I were saying this at a whiteboard?

If no, write a sentence instead.

## Worth Drawing

- Where things sit: heap regions, object references, runtime areas.
- Order across more than one actor: threads, clients and servers, transactions.
- Who talks to whom: services, adapters, queues, proxies.
- A chain or path: request latency, GC roots, message flow.
- A surprising branch where the branch is the lesson.

## Not Worth Drawing

- Lists wearing boxes.
- Ordinary comparisons.
- Definitions and policies.
- Anything that needs a legend.

## Vocabulary

| Mark | Meaning |
| --- | --- |
| `+----+` | A thing that exists |
| `-->` | A call, reference, or data movement |
| `..>` | Async, optional, or weak edge |
| `===` | Costly boundary: network, process, thread, transaction |
| Down page | Time |
| Left to right | Pipeline |
| `xN` | Many of these |
| `<-- ...` | The important point |

## Rules

- Plain ASCII only.
- Keep diagrams under about 40 characters wide.
- Always use a fenced `text` block.
- Label every box.
- Say what the diagram simplified in one line under it.
- One diagram per card at most.
- Use Mermaid only if the user asks for Mermaid.

## Visual Ladder

Use this order unless the user asks for a specific medium:

1. ASCII in the card.
2. Mermaid, only by request.
3. Web image/reference when the real artifact matters, such as an official tool
   screenshot, vendor architecture diagram, UI, chart, or current external fact.
4. Generated image only for a conceptual illustration where there is no real
   source to cite.

When using a web image or web search, cite the source briefly. Do not use images
as decoration.
