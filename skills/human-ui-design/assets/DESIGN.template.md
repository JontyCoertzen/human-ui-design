# [Project name] — Design specification

> Status: Draft / Approved | Owner: [name] | Updated: [date]
>
> **This document is the visual source of truth.** Once approved, revisions and additional pages should extend it, not reinterpret it.

## Brand truths

Found in the existing material before anything was asked.

| Truth | Where it came from |
| --- | --- |
| [origin story, place, ritual, number, phrase] | [page, file or conversation] |

## The idea

- **What this is:** [one sentence describing the organisation/product]
- **Audience:** [who, where, familiarity, concerns]
- **Five-second message:** [what visitors must understand]
- **Primary action:** [one main CTA and destination]
- **Emotional goal:** [e.g. optimistic, trustworthy, energetic—not merely “premium”]
- **Creative premise:** [distinctive concept, not a genre label, resting on one of the brand truths above]
- **Voice:** [three adjectives and a short example sentence]

## References and anti-references

| Link or screenshot | Use this principle | Do not copy |
| --- | --- | --- |
| [approved page or reference] | [specific observation] | [literal composition/brand element] |

**Avoid:** [specific disliked patterns, e.g. chapter numbers, uppercase eyebrows, gradients]

## Typography

| Role | Font / weight | Desktop size / line height | Mobile size / line height | Notes |
| --- | --- | --- | --- | --- |
| Display | [family, weight] | [px or clamp / ratio] | [px or clamp / ratio] | [tracking, max width] |
| Heading | [family, weight] | [...] | [...] | [...] |
| Body | [family, weight] | [...] | [...] | [readable line length] |
| Functional UI | [family, weight] | [...] | [...] | [buttons, inputs] |

- Source/license for fonts: [...]
- Text case rules: [...]
- Minimum readable size: [...]

## Colour

| Token | Hex | Role and rationale | Where it appears |
| --- | --- | --- | --- |
| Background | [#...] | [...] | [sections, surfaces] |
| Text | [#...] | [...] | [...] |
| Primary action | [#...] | [...] | [buttons, selected states] |
| Supporting surface | [#...] | [...] | [...] |
| Border / muted | [#...] | [...] | [...] |

Every colour needs at least one placement. A colour with none is not part of the palette: place it or remove it.

Check text/interactive contrast against the actual backgrounds. Never assume a colour is accessible because it looks good in a mockup.

## Composition and storytelling

1. **Hero:** [headline, image relationship, crop, CTA position]
2. **Narrative:** [which distinct questions each section answers; avoid generic card inventory]
3. **Conversion:** [placement, steps, forms, trust/eligibility/legal information]
4. **Footer:** [required useful information]

### Section plan

No more than two sections in a row share a layout, and at least one breaks the dominant pattern.

| # | Section | What it adds | Layout | Headline |
| --- | --- | --- | --- | --- |
| 1 | Hero | [...] | [e.g. type left, photo bleeding right] | [...] |
| 2 | [...] | [...] | [...] | [...] |

Read the headline column top to bottom: it should not be one slogan formula repeated.

### Tells used on purpose

Anything from [anti-slop.md](../references/anti-slop.md) this site uses, with the content reason. The checker's `--allow` keys come from here.

| Tell | Checker key | Content reason |
| --- | --- | --- |
| [e.g. ticker] | [marquee] | [shows the real live fixture list] |

### Spacing and geometry

- Maximum content width: [...]
- Standard horizontal gutters: desktop [...] / mobile [...]
- Section density/rhythm: [...]
- Buttons: [geometry and states]
- Cards: [only where functionally justified]
- Image treatment: [crop, aspect ratio, captions/credits]

## Imagery

- **Preferred sources:** [approved media library, photographer, licensed site]
- **Subjects:** [people, environment, product, rituals]
- **Framing and lighting:** [...]
- **Authenticity policy:** [client photographs vs. stock vs. illustration; do not misrepresent]
- **Credits and rights:** [...]

## Motion and interaction

- Allowed animation: [...]
- Timing/easing: [...]
- Reduced-motion behavior: [...]
- Navigation and focus conventions: [...]
- Forms and validation: [...]

## Responsive behavior

- **1440px:** [hero composition, column relationships]
- **768px:** [layout shift priorities]
- **390px:** [headline wrapping, image crop, CTA/order, forms]
- No horizontal overflow; no clipped headline; real 44px+ touch targets where feasible.

## Approved reference and change control

- Desktop screenshot: [path/link]
- Mobile screenshot: [path/link]
- Source revision / commit: [sha or version]
- **Locked:** [components or decisions that may not drift]
- **Allowed variation:** [what can change on new pages]
- **Requires approval:** [rebrand, typography, palette, main hero, new visual motif]

## Verification log

| Date | Pages / widths | Functional checks | Visual issues fixed | Approved by |
| --- | --- | --- | --- | --- |
| [date] | [1440 / 768 / 390] | [...] | [...] | [...] |
