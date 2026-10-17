# Agent instructions — Field Notebook Portfolio

You are building and maintaining a personal portfolio for an independent data scientist and software engineer. This site should feel like a **working scientific field notebook**: curious, credible, technically excellent, visually expressive but understated.

## Read first

Before proposing or implementing changes, read:
1. `docs/design-spec.md` — source of truth for design, content and technical decisions.
2. `docs/implementation-plan.md` — implementation phases, quality gates and definition of done.

If an existing repository conflicts with the specification, inspect it and explain the conflict before making destructive changes. Follow established working patterns where possible.

## Non-negotiables

- Keep the exact five-colour palette specified in the design spec. Use semantic CSS variables, not scattered hex codes.
- Prioritise working software, legibility and genuine technical content over superficial polish.
- Use a restrained scientific visual language: figures, captions, annotations, maps and project artefacts where relevant. Do not turn the site into a faux vintage notebook.
- Never invent projects, job claims, employers, metrics, testimonials, GitHub URLs or demo links. Any sample content must be clearly marked and excluded from production.
- Prefer small, comprehensible solutions. Avoid frameworks, heavy dependencies and complex animations unless justified by a real need.
- Make it accessible, responsive, fast and keyboard navigable. Respect reduced-motion preferences.
- Do not overwrite user-written content or unrelated files. Do not push, publish, or configure live external services without explicit approval.
- Use British English in copy, comments and documentation.

## Working method

1. Inspect the repo and report what exists, plus any assumptions or gaps.
2. Work on one phase from `docs/implementation-plan.md` at a time. Do not jump ahead to publishing.
3. Implement in small, reviewable changes.
4. Run the specified checks. Where browser tooling exists, capture desktop and mobile screenshots, inspect them visually, fix layout issues and repeat.
5. Report: files changed; design decisions; checks run and results; outstanding questions; suggested next step.

If a detail is unspecified, choose the simplest solution consistent with the design. If a decision is hard to reverse or public-facing, flag it explicitly.