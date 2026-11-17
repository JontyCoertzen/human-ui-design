# Design workflow

Read and follow `AGENTS.md` and `DESIGN.md` before frontend work.

Use the installed `human-ui-design` skill for art direction, anti-slop review, and visual QA. Treat the project's approved screenshots and design specification as the source of truth.

For new sites, establish a distinctive concept before coding. For revisions, preserve the existing identity unless a redesign is explicitly requested.

After each major UI change, run the skill's `scripts/check-slop.mjs` on the running page and look at its screenshots, then have a subagent that sees only the screenshots and the review gate name the three biggest problems. State honestly when the checker, visual QA or an independent review could not run. Do not claim quality from source inspection alone.
