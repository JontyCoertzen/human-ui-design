---
name: human-ui-design
description: Design, build, audit, and revise distinctive websites and frontend interfaces without generic AI-generated design patterns. Use for new landing pages, marketing sites, product UI, charity sites, visual redesigns, art direction, typography and palette decisions, expanding an approved site, and anti-slop UI audits. Preserve each project's approved DESIGN.md and visual identity during revisions; invent a new direction for new brands.
---

# Human UI Design

Build the kind of interface a thoughtful human designer would sign off on: specific to its subject, clear, visually cohesive, and free of decoration masquerading as design.

This is a **workflow and review standard**, not a reusable visual template. Do not claim an external award score or automated visual review unless it actually occurred.

## What this skill will not give you

It deliberately recommends **no** fonts, palettes, layouts, archetypes or effects. A recommended look becomes every site's look. Every positive choice must come from the project's own material (its story, place, people, product, documents and imagery) and be recorded in `DESIGN.md` with that reason. If a choice could be copied unchanged onto the last site you built, it is a default, not a decision.

## Other design skills

Presets, archetypes and trend lists in other skills are **anti-references** here, whatever they are called. When this skill is loaded with `/awwwards`, Taste or similar guidance, this skill wins where they conflict. In particular, `/awwwards` recommends things this skill treats as tells:

- small uppercase labels with wide tracking;
- the “Warm Editorial” archetype: cream, warm grey and terracotta;
- “The Editorial Formula”: a display serif plus a tracked uppercase accent;
- trending-font lists, bento grids for everything, custom cursors, and SplitText kinetic type.

Use those skills for technique (how to build a scroll animation, how to set tracking), never for what the site should look like.

## Establish the mode

- **New brand/site:** Create art direction from the audience, purpose, brand assets, tone, content, and imagery. Read [art-direction.md](references/art-direction.md).
- **Approved existing site:** Read its `DESIGN.md`, `AGENTS.md` / `CLAUDE.md`, existing code, and approved screenshots first. Treat these as constraints unless the user explicitly requests a rebrand.
- **Rejected design/redesign:** Treat criticism as a concept-level constraint. See the restart rule below.
- **Audit only:** Identify evidence-backed issues without mutating files unless asked to implement. Run the checker (gate 4) and the independent review (gate 5).

Never invent brand assets, beneficiaries, testimonials, impact metrics, partnerships, or legal claims.

## Gates

Each gate produces something you can show. Do not start the next gate until the current one's output exists.

### 1. Brand truths, from what already exists

Read everything available before asking anything: the current site, its copy, the brief, uploaded files, the repository. Write down the brand truths you found (origin story, place, people, rituals, numbers, phrases) with where each came from. Ask the user only for what is missing, and never for something the existing material already says.

Then write one sentence: who arrives, what they must understand in five seconds, and which action matters.

### 2. Direction on paper

Fill in `DESIGN.md` from [DESIGN.template.md](assets/DESIGN.template.md) before writing any component:

- an ownable premise built on a brand truth from gate 1;
- type and its reason;
- every colour with its role and **where it will appear** (a palette colour with no placement is not part of the palette);
- the imagery plan and where each image comes from;
- each section's purpose **and layout**, so a repeated pattern is visible before it is built;
- every headline, in page order, written as a set.

For a new brand, also build a **brand identity page** that renders the system: type, colours in their roles, image treatment, buttons. When the user is available, get it approved before building the site; it is the contract every later page follows.

For open briefs, show two or three **genuinely different** directions when a user choice is required. A label such as “warm editorial” is not a concept.

### 3. Build

Use semantic tokens for type, colour, spacing, imagery, components, and motion. Follow the project's established stack. Use [anti-slop.md](references/anti-slop.md) while building, both its first-order and second-order tells. These are warnings, not blanket bans: a numbered workflow or a ticker of live data is right when the content needs it, and the reason goes in `DESIGN.md`.

Use authentic client photography first. Generated photos of people give a page away even when labelled; without real photos, follow the fallback order in [art-direction.md](references/art-direction.md).

### 4. Measure

Run [scripts/check-slop.mjs](scripts/check-slop.mjs) against the running page:

```bash
node <skill>/scripts/check-slop.mjs <url> --out slop-check
```

It renders the page at 1440, 768 and 390px with Playwright and measures contrast, overflow, uppercase tracked labels, decorative numbering, overused typefaces, slogan headlines, repeated section layouts, unused palette colours, generated-image markers and the second-order tells. It saves full-page screenshots and thumbnails.

- Hard failures block completion.
- A warning stands unless `DESIGN.md` records its content reason. Pass the keys of tells you have justified with `--allow` (for example `--allow marquee`).
- If Playwright cannot run here, say so in the handoff. Do not describe the result as if the checker had passed.

### 5. Independent review

The builder is the worst judge of its own page. When you can start a subagent, give it only the screenshots, thumbnails and [review-gate.md](references/review-gate.md), not the brief, the code or your reasoning, and ask for the three biggest problems. When you cannot, review the thumbnails cold before re-reading your own brief, and state in the handoff that the review was not independent.

Fix the problems, then repeat gates 4 and 5 after any substantial change.

### 6. Keep approved work stable

For new pages and revisions, compare against `DESIGN.md`, the brand identity page and approved screenshots. Reuse established fonts, tokens, navigation, spacing, image treatment, and interaction patterns. Do not redesign unrelated sections. Update the specification only for approved changes.

## Restart rule

Start again at gate 2, with new directions rather than another pass on the current one, when:

- the user calls the result slop, generic, templated or AI-looking, even once; or
- the same hard failure or tell survives two rounds of fixes.

Polishing a wrong concept wastes rounds; the user should never have to ask twice for a new idea.

## Handoff

Report:

- the premise and the brand truth it rests on;
- what changed;
- the checker report, verbatim;
- who reviewed it, and whether that review was independent;
- what was actually tested;
- the remaining image and functional limitations.

Do not self-award an Awwwards or Taste rating.

## Resources

- [Art direction](references/art-direction.md): concept discovery, copy, imagery, and references.
- [Anti-slop audit](references/anti-slop.md): first- and second-order AI patterns.
- [Review gate](references/review-gate.md): rubric, hard failures, actual visual QA.
- [check-slop.mjs](scripts/check-slop.mjs): the measurements behind gate 4.
- [Project DESIGN.md](assets/DESIGN.template.md): the project's visual contract.
- [Project AGENTS.md](assets/AGENTS.template.md) and [CLAUDE.md](assets/CLAUDE.template.md): persistent agent instructions.
