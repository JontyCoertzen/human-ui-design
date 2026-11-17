# Frontend design contract

Use the **human-ui-design** skill for all website and UI creation, visual audits, redesigns, and revisions. If the skill is unavailable, read the repo's `DESIGN.md` and apply the same principles; report the missing skill.

## Before work

1. Read `DESIGN.md` completely.
2. Inspect the current site and approved reference screenshots.
3. Understand the requested change, audience, story, and primary conversion.
4. For **new brands**, develop a distinct art direction before implementation.
5. For **revisions/new pages**, retain existing design tokens and visual language unless explicitly instructed otherwise.

## Reject generic AI design

Do not introduce:

- Decorative uppercase eyebrows repeated above headings.
- Numbered chapter headings without a real ordered process.
- Tiny decorative labels and fake metadata.
- Arbitrary “premium” beige/sage/terracotta or purple-gradient palettes.
- Oversized editorial serif headlines by default.
- Repeated three-card grids, gratuitous pill badges, glow/blobs or arrows.
- Placeholder buzzwords, fake testimonials, invented imagery or unsupported impact statistics.
- Generated photos of people, the same layout in every section, or every headline in one slogan cadence.
- Light-grey body text that fails measured contrast on its section's background.
- Their replacements without a content reason: marquees, bento grids, grain overlays, mono micro-labels, giant outlined words, stickers and sparkles, full-width footer wordmarks, pinned scroll reveals.

Functional data labels, numbered steps, and cards are allowed when the content **genuinely needs** them.

## Build and verify

- Prioritise beautiful typography, honest imagery, natural copy, strong composition and clear actions.
- Use real, licensed or client-provided media; disclose illustrative images.
- Preserve working forms, payments, routes, accessibility and legal details.
- Read the existing site and files for brand truths before asking anything; ask only for what is missing.
- Fill in `DESIGN.md` (colour placements, section layouts, headlines) before writing components.
- Run the skill's `scripts/check-slop.mjs` on the running page (1440, 768 and 390px). Hard failures block; warnings need a reason in `DESIGN.md`. Paste the report in the handoff.
- Have the screenshots reviewed by someone who has not seen the brief or code, or say the review was not independent.
- If the owner calls it slop, generic or AI-looking, start again with new directions instead of another pass.
- Do not claim Taste/Awwwards scoring or browser QA unless those tools were actually run.
- Do not change unrelated design decisions or ship an unapproved rebrand.

## Completion

Explain the creative premise, changed areas, tests performed, remaining limitations, and any decisions requiring approval. Update `DESIGN.md` only for accepted changes.
