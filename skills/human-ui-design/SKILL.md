---
name: human-ui-design
description: Design, build, audit, and revise distinctive websites and frontend interfaces without generic AI-generated design patterns. Use for new landing pages, marketing sites, product UI, charity sites, visual redesigns, art direction, typography and palette decisions, expanding an approved site, and anti-slop UI audits. Preserve each project's approved DESIGN.md and visual identity during revisions; invent a new direction for new brands.
---

# Human UI Design

Build the kind of interface a thoughtful human designer would sign off on: specific to its subject, clear, visually cohesive, and free of decoration masquerading as design.

This is a **workflow and review standard**, not a reusable visual template. Build each project's identity from its own brief and approved design system. Do not claim an external award score or automated visual review unless it actually occurred.

## Establish the mode

- **New brand/site:** Create art direction from the audience, purpose, brand assets, tone, content, and imagery. Read [art-direction.md](references/art-direction.md).
- **Approved existing site:** Read its `DESIGN.md`, `AGENTS.md` / `CLAUDE.md`, existing code, and approved screenshots first. Treat these as constraints unless the user explicitly requests a rebrand.
- **Rejected design/redesign:** Treat criticism as a concept-level constraint. Revisit story, imagery, type, palette, and composition; do not merely tweak radii or shadows.
- **Audit only:** Identify evidence-backed issues without mutating files unless asked to implement.

If no project design specification exists, start with [DESIGN.template.md](assets/DESIGN.template.md). Never invent brand assets, beneficiaries, testimonials, impact metrics, partnerships, or legal claims.

## Required sequence

### 1. Understand the visitor

Write one sentence: who arrives, what they must understand in five seconds, and which action matters. Identify the true differentiator. For charities, verify giving models, allocation claims, trust disclosures, and image provenance. For products, show the real product.

### 2. Set art direction before coding

Define:

- An ownable creative premise and an immediately intelligible headline.
- Relevant references and **what to learn** (not clone) from each.
- Type personality, typographic scale, and hierarchy.
- A reasoned colour system rooted in the brand or imagery.
- Photography subjects, sources, framing, and authenticity status.
- Narrative page rhythm; distinct purpose for each section.
- Conversion journey, trust details, and anti-references.

For open briefs, show two or three **genuinely different** directions when a user choice is required; otherwise make a defensible decision and build. A label such as “warm editorial” is not itself a concept. Read [art-direction.md](references/art-direction.md).

### 3. Storyboard the page

Write a progression, not an inventory of cards. Lead with a proposition the visitor understands without a slogan decoder. Each section must add new substance and gets the layout its content needs; name that layout in the storyboard so a repeated pattern is visible before it is built. Write the headlines as a set, not as one slogan formula. Give the primary CTA a clear path. Preserve necessary legal, donation, privacy, eligibility, and accessibility content even when copy is minimal.

Use authentic client photography first. Verify licenses for stock; label generated or illustrative scenes and never portray them as documentary evidence. Generated photos of people give a page away even when labelled; without real photos, follow the fallback order in [art-direction.md](references/art-direction.md).

### 4. Implement a coherent system

Use semantic tokens for type, colour, spacing, imagery, components, and motion. Follow the project's established stack. Prioritise readable copy and meaningful imagery. Use [anti-slop.md](references/anti-slop.md) as a critique lens.

**Do not repeat generic decoration:** tracked-uppercase eyebrows before every heading, arbitrary chapter numbering, micro-labels, stock beige/olive/terracotta, reflexive serif headlines, equal icon-card grids, gradients/blobs, or arrows appended everywhere. These are warnings, not blanket bans: a numbered workflow or small data label is correct when it conveys real meaning. Do not swap them for the **second-order tells** in [anti-slop.md](references/anti-slop.md) (marquees, bento grids, grain, mono labels, giant outlined words, stickers and the rest); those need a content reason too.

### 5. Visually review and iterate

Use an available browser or visual-testing tool to inspect rendered pages at **1440, 768, and 390px** widths (or nearest available sizes). Examine actual screenshots: hero, mid-page composition, conversion flow, footer. Test responsive wraps, image crops, click states, contrast, keyboard focus, reduced motion, and no overflow. Do not substitute source review for visual review.

Read [review-gate.md](references/review-gate.md). Critique and iterate until hard failures are resolved and the visual bar is met. If the user rejects the concept, restart art direction instead of polishing a fundamentally wrong aesthetic. When browser QA is unavailable, disclose the limit and do not invent a score.

### 6. Keep approved work stable

For new pages and revisions, compare against `DESIGN.md` and approved screenshots. Reuse established fonts, tokens, navigation, spacing, image treatment, and interaction patterns. Introduce a new visual pattern only for a justified content/product need. Do not redesign unrelated sections. Update the design specification only for approved changes.

## Handoff

Report the creative premise, what changed, what was **actually** tested, and remaining image/functional limitations. Do not self-award an Awwwards or Taste rating. If third-party Taste tools are installed and appropriate, their real checks may augment—not replace—this review.

## Resources

- [Art direction](references/art-direction.md) — concept discovery, copy, imagery, and references.
- [Anti-slop audit](references/anti-slop.md) — recurring AI patterns and better alternatives.
- [Review gate](references/review-gate.md) — rubric, hard failures, actual visual QA.
- [Project DESIGN.md](assets/DESIGN.template.md) — fill in the project's visual contract.
- [Project AGENTS.md](assets/AGENTS.template.md) — persistent agent instructions.
- [Project CLAUDE.md](assets/CLAUDE.template.md) — Claude Code entry point.
