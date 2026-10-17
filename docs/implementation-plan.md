# Field Notebook Portfolio — Cursor Implementation Plan

Use `AGENTS.md` and `docs/design-spec.md` as the governing instructions. Work phase-by-phase. **Do not publish a live site without the owner's explicit approval.**

## Phase 0 — Repository audit and technical plan

Tasks:
1. Inspect the repository, current framework, content and assets. Do not replace working code blindly.
2. Check whether there are existing authentic projects/notes and identify what is approved for public display.
3. Confirm build scripts, package manager and GitHub Pages deployment configuration (if any).
4. Produce a concise proposed file tree, list of dependencies and any conflicts with the spec.

Acceptance: clear plan based on the *actual* repo, with no destructive edits.

## Phase 1 — Visual foundation and homepage prototype

Tasks:
1. Create design tokens for the five specified colours, type system, spacing and layout widths.
2. Build BaseLayout, Header, Footer, Figure and reusable project-preview elements.
3. Implement a responsive homepage with hero, featured work, selected work, recent notes and footer.
4. Make links, focus states and keyboard navigation functional.
5. Use genuine repository content when available; otherwise create clearly marked **development-only** mock content not included in production.
6. Capture screenshots at **1440 × 900** and **390 × 844** where browser tools are available. Review visual hierarchy, line length, spacing, project artefacts and mobile overflow; iterate once or more.

Acceptance:
- Design is recognisably the Field Notebook concept, not a generic portfolio template.
- Exact palette and specified fonts/fallbacks are applied.
- Clear first-screen introduction and obvious link to work.
- Mobile design does not just shrink desktop; text and navigation remain usable.
- No nonsense decoration, fabricated claims or production-facing sample projects.
- Dev server and `npm run build` (or repo-equivalent) work.

**Review gate:** share desktop/mobile screenshots and a brief explanation of design choices. Ask for approval before a major layout redesign or moving to the next phase.

## Phase 2 — Real content architecture and project detail pages

Tasks:
1. Implement typed Astro content collections for work and notes.
2. Add `/work`, `/work/[slug]`, `/notes`, `/notes/[slug]`, `/about` and 404.
3. Add project and note templates, draft filtering, useful metadata and figure support.
4. Provide one *blank/example* Markdown/MDX authoring template for each collection. Examples must not be treated as published real projects.
5. Document how to add a project or note in under 10 minutes, without touching layout code.

Acceptance:
- Adding a real Markdown project creates index and detail pages automatically.
- Draft items are excluded from production pages and metadata.
- Missing optional images/links do not produce broken UI.
- Project page includes sections for personal contribution, technical choices and evidence.
- Content is easy to maintain without a CMS.

## Phase 3 — Quality, deployment readiness and documentation

Tasks:
1. Test keyboard-only navigation, focus, contrast, alt text, responsive layout and reduced motion.
2. Validate internal links and assets, including base-path behaviour for GitHub Pages.
3. Add correct site metadata, canonical URLs, robots/sitemap as appropriate.
4. Configure GitHub Actions deployment using current official Astro guidance, using actual repo and site values rather than guessed ones.
5. Test representative pages with Lighthouse and fix material issues. Report scores with context.
6. Add concise README for local development, content authoring and release process.

Acceptance:
- Production build passes; no broken internal navigation.
- Screenshots at 1440 × 900, 390 × 844 and a narrow 360 px check reviewed.
- WCAG 2.2 AA issues actively checked and resolved where found.
- Representative Lighthouse mobile score targets: performance ≥90, accessibility ≥95.
- No secrets; no unapproved analytics; no fictional work published.
- Deployment config ready for review; **no push/publish unless approved**.

## Agent completion report for every phase

Include:
- **Changed:** files and components created/edited.
- **Decisions:** choices made within scope of the spec.
- **Verification:** exact commands and checks run, with pass/fail results.
- **Visual QA:** screenshots reviewed, issues found and fixes made (if tooling available).
- **Remaining:** known gaps and items requiring real content/approval.
- **Next:** one recommended next action.

## Initial Cursor prompt (copy/paste)

> Read `AGENTS.md`, `docs/design-spec.md` and `docs/implementation-plan.md`. Start with Phase 0, inspect the existing repository and make a concise technical plan. Then implement **Phase 1 only**. Preserve any existing content and dependencies where reasonable. Use the exact design tokens and approved Field Notebook aesthetic. Do not invent portfolio projects or publish the site. If real content is unavailable, use clearly marked local-only design fixtures. Run the build, inspect 1440×900 and 390×844 screenshots if browser tools are available, and iterate on layout problems. Finish with a short report of files changed, tests run, visual decisions, known gaps and what needs my review.