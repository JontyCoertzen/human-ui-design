# Internal design review gate

This is an **internal qualitative rubric**, not an Awwwards score or Taste certification. A score is a critique aid, not proof of design quality.

## Hard failures

Resolve these before declaring completion:

- Visitor cannot identify purpose and primary action quickly.
- Primary navigation, payment, enquiry, booking, form, or other required flow is broken.
- Clipped headings, horizontal overflow, unusable touch targets, or keyboard traps.
- Text contrast below WCAG AA, measured on the real background: 4.5:1 for body text, 3:1 for large text and controls. Check every coloured section, not only the main background.
- Generated photos of people in the hero or presented as proof.
- An approved existing site drifts without permission.
- Invented testimonials, impact figures, customer logos, product claims, or fictional people presented as real.
- Material legal/trust content missing.
- Generic repeated motifs dominate despite a supposedly distinct brief, including two or more second-order tells from [anti-slop.md](anti-slop.md) with no content reason.

## Weighted critique (0–5 each)

| Dimension | Weight | 5/5 evidence |
| --- | ---: | --- |
| Brand-specific art direction | 25 | Recognisably its own idea, not a template |
| Typography and hierarchy | 20 | Readable, confident, deliberate scale and rhythm |
| Images and visual storytelling | 20 | Credible, purposeful, emotionally and contextually right |
| Copy and conversion | 15 | Plain promise, minimal filler, obvious next action |
| Usability and accessibility | 10 | Good keyboard, contrast, mobile and interaction states |
| Consistency and responsive craft | 10 | Cohesive system with intentional variation |

Calculate `sum(weight × score / 5)`. Aim for **85/100**, with no dimension below 3/5, while acknowledging this is subjective. Any hard failure blocks completion regardless of total.

## Actual QA sequence

1. Render running page at 1440, 768 and 390px widths where tooling permits.
2. Inspect real screenshots of hero, a transition, conversion area, and footer.
3. Check image crops, text wraps, content order, CTA visibility and overflow.
4. Check focus, semantics, alt text, reduced motion, and forms. Measure the contrast of body text in every section.
5. Look at the full-page screenshot as a small thumbnail. If the sections read as copies of one layout, rework at least one before polishing anything else.
6. List every headline in page order and read them aloud. Rewrite any run that shares one cadence.
7. Ask of each photo: would a stranger guess it was generated? If yes, replace it or follow the no-photography fallback in [art-direction.md](art-direction.md).
8. Test local interactions without submitting real payments or messages.
9. For revisions, compare screenshots against approved reference and `DESIGN.md`.
10. Identify three concrete flaws; fix the highest-impact ones; repeat the visual review after substantive changes.

Use third-party Taste/Playwright checks if available and actually installed. Do not claim they ran when they did not.

## Reporting

State: concept, screen sizes checked, interactions tested, three concrete observations, and outstanding limitations. If browser QA was unavailable, state **“Visual review not completed”** and do not provide a made-up numeric score.
