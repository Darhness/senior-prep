---
name: diagram
description: Use before adding an ASCII diagram to a senior-prep teaching card, and whenever the user asks to draw or show a concept.
---

# Drawing In ASCII

Most subtopics do not need a picture. Draw only when the picture removes work
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
