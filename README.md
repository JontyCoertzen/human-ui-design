# Human UI Design

**A reusable design skill for building websites that look considered, specific, and human—not like generic AI templates.**

Use it for landing pages, product sites, charities, portals, redesigns, and new pages in an existing design system. It is designed for **Claude Code, Codex, and other agents that support the open Agent Skills format**.

The core idea: **strong art direction first, code second, screenshots before sign-off.**

This skill captures a reusable design process—not a specific visual identity, website, or palette. Each project needs its own art direction.

## What it enforces

- A real concept based on the brand's purpose, audience, and story.
- Beautiful, appropriate typography rather than reflexively oversized serif.
- Colours with a reason; no automatic beige/sage/terracotta or purple gradients.
- Honest, emotional imagery with explicit provenance.
- Natural copy, restrained components, distinctive composition.
- Clear conversion journeys and preserved functionality.
- A project-level `DESIGN.md` so approved work does not drift.
- Real rendered desktop/mobile screenshot critique and iteration.
- An **internal quality rubric**. It does not pretend to be an official Awwwards score or claim Taste scripts ran when they did not.

The goal is the same level of *design thinking* across projects—not the same visual style.

## Quick start

### 1. Install the skill

Requires Node.js 22.20+ for the [open Skills CLI](https://github.com/vercel-labs/skills).

For both Claude Code and Codex, available across all projects:

~~~bash
npx skills add JontyCoertzen/human-ui-design --skill human-ui-design -g -a claude-code -a codex -y
~~~

Only for the current project:

~~~bash
npx skills add JontyCoertzen/human-ui-design --skill human-ui-design -a claude-code -a codex -y
~~~

Only Claude Code:

~~~bash
npx skills add JontyCoertzen/human-ui-design --skill human-ui-design -g -a claude-code -y
~~~

Only Codex:

~~~bash
npx skills add JontyCoertzen/human-ui-design --skill human-ui-design -g -a codex -y
~~~

Verify with `npx skills list`. Update with `npx skills update`. The CLI uses each agent's supported skill location. For details, see the [official CLI reference](https://github.com/vercel-labs/skills/blob/main/docs/commands.md).

> ChatGPT's in-app personal Skills directory is separate from the terminal Skills CLI. To use this from the ChatGPT app, add/import the skill through the Skills interface or give the assistant the `SKILL.md` and ask it to follow it. Installing for Claude Code does not automatically install it into ChatGPT.

### 2. Add project-level design instructions

The skill defines *how to design*. A project's `DESIGN.md` defines *what that particular project must look and feel like*.

In the root of your website repository, add:

- **`DESIGN.md`** — fill out the [template](skills/human-ui-design/assets/DESIGN.template.md) with approved typography, colours, imagery, components, layout, screenshots, and design decisions.
- **`AGENTS.md`** — merge the [agent template](skills/human-ui-design/assets/AGENTS.template.md) into your existing repo instructions. This helps Codex and other AGENTS-aware tools enforce the standard.
- **`CLAUDE.md`** — merge the [Claude Code template](skills/human-ui-design/assets/CLAUDE.template.md) if you use Claude Code.

For a new repository on macOS/Linux/WSL, you can download the templates:

~~~bash
curl -fsSL https://raw.githubusercontent.com/JontyCoertzen/human-ui-design/main/skills/human-ui-design/assets/DESIGN.template.md -o DESIGN.md
curl -fsSL https://raw.githubusercontent.com/JontyCoertzen/human-ui-design/main/skills/human-ui-design/assets/AGENTS.template.md -o AGENTS.md
curl -fsSL https://raw.githubusercontent.com/JontyCoertzen/human-ui-design/main/skills/human-ui-design/assets/CLAUDE.template.md -o CLAUDE.md
~~~

**Important:** Those commands overwrite same-named local files. If your project already has an `AGENTS.md`, `CLAUDE.md`, or `DESIGN.md`, download to temporary filenames and merge the relevant sections instead.

Start a new site's discovery with the [creative brief template](skills/human-ui-design/assets/CREATIVE_BRIEF.template.md). Once the direction is approved, update `DESIGN.md` to mark decisions as locked.

### 3. Invoke it in your prompt

Use `$human-ui-design` where supported, or explicitly write “Use the human-ui-design skill” in the request.

For reliable results, include:

1. **What:** the organisation/product and real value proposition.
2. **Who:** audience and their intent.
3. **Feeling:** 3 precise adjectives.
4. **References:** links or screenshots **with what you like** about each.
5. **Anti-references:** things you dislike (e.g. tracked eyebrows, 3-card grids).
6. **Imagery:** actual photos, assets, licensed stock rules.
7. **Action:** primary CTA and working flows.
8. **Scope:** new concept vs existing approved design.

---

## Copy-paste prompts

### A. Discover the right style and vibe (before code)

~~~text
Use $human-ui-design.

I'm building a website for [brand]. We do [plain-language description].
Our visitors are [audience] and should [primary action].

The site must feel [3 specific adjectives], not [3 anti-adjectives].
I like [reference URL/screenshot] because [type, spacing, photography,
composition or emotion]. I dislike [anti-reference] because [reason].

Before writing code, propose 3 genuinely different art directions.
For each, show:
- A creative premise and sample hero headline.
- Typography direction with specific font options.
- Colour palette with hex values and a rationale.
- Photography/art direction and example image subjects.
- Hero composition, page rhythm and CTA approach.
- What makes it distinctive and what AI clichés it avoids.

Recommend one and explain why. Do not generate a generic visual
template or choose beige/olive/terracotta by reflex.
~~~

### B. Build a new website end to end

~~~text
Use $human-ui-design to design and implement this site.
Brand: [name]
Audience: [who]
Purpose: [five-second message]
Primary conversion: [action]
Vibe: [3 adjectives]
Visual references: [links/screenshots and what to borrow conceptually]
Avoid: [patterns and competitors to avoid]
Assets: [real photography, logo, fonts, screenshots]
Stack/repo: [technology and location]

Establish one clear art direction before coding. Build a concise
storytelling-led page with distinctive typography, credible imagery,
natural copy, restrained motion, and a clear conversion journey.
Write/maintain DESIGN.md and follow AGENTS.md.

Visually inspect at 1440/768/390px, critique screenshots using the
skill's review gate, fix failures, and repeat. Verify forms/navigation
without submitting real payments or messages.

Do not claim external Taste/Awwwards scores unless actually obtained.
~~~

### C. Add another page without design drift

~~~text
Use $human-ui-design in EXISTING SITE mode.
Add a [page] to [repo] with [features/content].

First read DESIGN.md, AGENTS.md and existing UI components. Inspect
the current homepage and any approved screenshots. Match the
established typography, colour tokens, spacing, image treatment,
buttons, navigation and motion.

Make this page feel native to the existing site. Do not rebrand, add
new decorative motifs, change global fonts, or rewrite unrelated pages.
Visually compare desktop/mobile screenshots with the approved design.
~~~

### D. Revise a section while preserving the style

~~~text
Use $human-ui-design in REVISION mode.
Change only [section/component] to achieve [specific outcome].

Treat DESIGN.md and the current live page as the approved design
contract. Preserve typography, palette, composition language, and
working integrations. Explain any unavoidable deviation before
implementing it. Test desktop/mobile and list precisely what changed.
~~~

### E. Audit and remove AI slop

~~~text
Use $human-ui-design to AUDIT [site/repo] first. Do not edit yet.

Inspect rendered screenshots at desktop/mobile. Be a tough,
experienced creative director. Identify generic AI patterns:
uppercase eyebrows, numbered chapters, decorative micro-labels,
default palettes, reflexive serif headlines, endless cards/pills,
template rhythm, stock-perfect people and buzzword copy.

Show 5 specific problems with screenshot-based evidence and explain
why they hurt the brand. Suggest a stronger storytelling/art direction.
Score only using your own clearly labelled qualitative rubric.
Do not pretend the score comes from Awwwards or Taste.
~~~

### F. Rework a concept that still feels generic

~~~text
The current site feels like AI slop. Use $human-ui-design to rework
the art direction substantially—not just spacing and colours.

Keep the factual content, required integrations and brand constraints.
Discard the repetitive layout grammar. Develop a fresh concept rooted
in [specific brand truth], with meaningful photography, confident
type, fewer words, more compelling storytelling and a clearer CTA.

Show how this concept differs from the old one, then implement and
visually review desktop/mobile until the problems are actually gone.
~~~

### G. Create a nonprofit landing page

~~~text
Use $human-ui-design. Create a donor-first landing page for [nonprofit]
serving [community/cause]. Its verified purpose is [plain-language
mission]. The primary action is [donate/volunteer/learn more].

Make the mission understandable in five seconds. Use authentic,
consented photography, human language, and a visually distinctive
identity rooted in the organisation—not a generic charity template.
Never present illustrative or AI-generated scenes as real beneficiaries.

Make the primary action simple. Preserve genuine donation and contact
integrations. Show verified impact and transparent organisation details;
do not invent numbers, testimonials or partners. Visually review the
desktop and mobile experience before completion.
~~~

### H. Quick art-direction selector

~~~text
Use $human-ui-design. I'm undecided about the vibe.
The brand is [description] and the audience is [audience].
Compare 3 directions—[e.g. bold civic], [calm documentary],
and [playful contemporary]—using a sample hero, typography,
palette, image treatment and page composition.
Tell me which fits the actual content best and why.
~~~

---

## Working method

| Phase | Deliverable | Do not proceed if… |
| --- | --- | --- |
| Brief | Visitor goal, real story, assets, constraints | Value proposition is unclear |
| Art direction | Ownable concept, type/colour/image plan | It could fit any brand |
| Storyboard | Page narrative and CTA path | Sections repeat the same claim |
| Build | Coherent tokens, pages, functioning flows | It invents claims or breaks existing UI |
| Visual QA | Screenshots at 1440/768/390 + critique | Mobile clips, CTA unclear, generic patterns dominate |
| Approval | Updated DESIGN.md and references | Visual direction is still disputed |

The skill includes a weighted **internal** review gate (art direction, typography, imagery, copy/conversion, accessibility, responsive craft). It targets 85/100 with no hard failures, but **subjective scoring is not an independent design award or automated certification**. The most important gate is looking at the rendered result and responding to real feedback.

## Files

~~~text
skills/human-ui-design/
  SKILL.md                 The reusable agent workflow
  agents/openai.yaml       ChatGPT/Codex skill metadata
  references/
    art-direction.md       Concept and storytelling guidance
    anti-slop.md           Design clichés and alternatives
    review-gate.md         Visual QA and internal scoring
  assets/
    CREATIVE_BRIEF.template.md
    DESIGN.template.md
    AGENTS.template.md
    CLAUDE.template.md
~~~

## Relationship to other skills

This skill complements, but does not bundle, [Taste](https://www.tasteskill.dev/), the [/awwwards skill](https://github.com/tponscr-debug/claude-skill-awwwards), and [Anthropic's frontend-design guidance](https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design). Install those separately if you want their own workflows or scripts. This repo is original guidance based on the **design principles and shortcomings** we identified through real project iterations.

## License

MIT — see [LICENSE](LICENSE).
