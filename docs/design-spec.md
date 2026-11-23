# Field Notebook Portfolio — Design and Build Specification

**Status:** v1 · implementation-ready starting point  
**Audience:** Cursor coding agents and human reviewer  
**Platform:** Static Astro site deployed to GitHub Pages  
**Design concept:** The Working Field Notebook

## 1. Product intent

A personal portfolio for a data scientist / software engineer with experience in ecology, geospatial analysis, analytics and ML. The site should feel like the home of someone who **builds interesting things and explains how they work**, not the landing page of an analytics consultancy.

Audience: curious technical peers, potential collaborators, people who may want to try the projects, and prospective employers. Career opportunities matter, but the site is not primarily a CV or a recruitment landing page.

### Reader outcomes

Within **10 seconds**, a new visitor can tell:
- who the author is;
- what kind of work they do;
- where to find an actual project.

Within **30 seconds**, a visitor can locate a substantive project with a clear problem, contribution and outcome. A technical reviewer should be able to go deeper into decisions, evidence and source code where publicly available.

**Positioning:** technically capable, curious, independent, clear-thinking, practical, quietly creative.

**Avoid:** corporate SaaS landing page; agency portfolio; template-like cards; generic AI branding; fake vintage ephemera; polished-but-empty case studies.

## 2. Artistic direction

### Core aesthetic

Editorial scientific notebook + open-source engineer's website + subtle cartographic language.

The site is **expressive through typography, composition and actual project artefacts**, not through decorative effects. Use spacious layouts, thin rules, precise labels, distinctive figures and unusually good technical writing.

### Reference sources (inspiration, not to reproduce)

- Maggie Appleton — digital garden, editorial character: https://maggieappleton.com/
- Tom MacWright — straightforward independent developer's site: https://macwright.com/
- Simon Willison — substantive technical notes and projects: https://simonwillison.net/
- Tufte CSS — figures, captions, sidenotes and strong reading hierarchy: https://edwardtufte.github.io/tufte-css/
- Bartosz Ciechanowski — technical explanations grounded in interactive demonstrations: https://ciechanow.ski/

Do not copy layouts, illustrations or code from these references without checking licensing.

## 3. Design tokens (fixed)

### Colour palette

| Token | Hex | Role |
|---|---|---|
| `--colour-paper` | `#F5F2E9` | main page background |
| `--colour-ink` | `#252D29` | primary text, strong borders |
| `--colour-moss` | `#506D5A` | links, secondary headings, understated UI |
| `--colour-rust` | `#CA754D` | sparing highlight, markers, points of interest |
| `--colour-blue` | `#A7B9BB` | technical diagrams, secondary surfaces and accents |

CSS may use subtle derived tints and transparencies from these tokens for surfaces, hairlines and hover states. No additional saturated brand colours without approval.

Accessibility note: **do not assume the rust colour passes WCAG AA for small text on paper**. Use it as an accent, large marker or decoration; verify contrast for actual text and interactive states. Ink is the default readable text colour.

### Typography

- Headings: **Newsreader** (serif), with suitable serif fallbacks.
- Body: **Source Sans 3**, with system sans-serif fallback.
- Figure labels, metadata, timestamps and inline technical accents: **IBM Plex Mono**, with monospace fallback.
- Do not use monospace for long prose. Do not use more than these three families without approval.
- If loading fonts remotely, use an efficient, privacy-conscious strategy or self-host optimised subsets if straightforward. Avoid excessive font weights.

### Composition

- Max overall content width: approximately **1,100 px**.
- Comfortable long-form reading measure: approximately **680–740 px**.
- Desktop side gutters: approximately **40–64 px**; mobile gutters: **20–24 px**.
- Use a deliberate, consistent spacing scale; generous vertical rhythm.
- Thin separators and restrained borders; little or no drop shadow.
- Moderate heading scale: expressive serif headings, clear content hierarchy, no oversized corporate hero.
- Corners: small radius (0–8 px) for most elements. Avoid pill-shaped badges and cards as the dominant motif.

### Scientific details

Use when meaningful:
- small figure numbers (`FIG. 01`), project identifiers, timestamps and captioned artefacts;
- fine rules, subtle grids or measurement-like ticks;
- occasional visual data motifs, especially maps/contours when relevant to the work;
- notes and marginalia **only if readable and useful**.

**Do not:** cover the site in contour lines; add decorative graphs with meaningless data; simulate stained paper, torn edges, handwriting or cork-board collage.

### Motion and interactions

- Motion should be subtle, functional and optional: link underline, quiet hover state, minimal menu reveal.
- No parallax, scroll-jacking, animated hero backgrounds, cursor followers or preloader.
- Respect `prefers-reduced-motion`.
- Interactive visualisations are welcome inside real projects when they demonstrate technical work; avoid adding one merely to decorate the homepage.

## 4. Current approved homepage (November 2026)

The homepage is a restrained, semi-personal, semi-professional home for the things Matthew builds and learns. The shared thread is curiosity about useful technology, with roots in ecology and science and experience across data, software, machine learning and leadership. Do not turn it into a specialist SDM site or a job-seeking brochure.

**Order and navigation:** About/introduction → Projects → Experience → Contact. Experience should be easy to find, with a concise timeline and accessible progressive disclosure. Projects come first.

**Current public project selection:** tilearray and Sheffield Bats. Publish other projects, case studies, notes or personal interests only after explicit approval and verification of what is public. Older libraries should not be revived merely to fill space. Project writing may include case studies and shorter notes; no compulsory blog cadence.

Keep the existing palette, fonts, legible article layouts and real project diagrams. Do not add decorative or stock photography. The tone, line-editing examples and approval checks are maintained in [editorial-direction.md](editorial-direction.md), which takes precedence over earlier draft copy examples.

## 5. Page map and content model

Current routes and content:

- `/` — homepage with About, Projects, Experience and Contact sections;
- `/work/` and `/work/[slug]/` — public project index and case studies;
- `/notes/` and `/notes/[slug]/` — optional note infrastructure; do not advertise empty or unapproved content;
- `/404.html` — helpful fallback.

A separate About page is not needed in the current iteration. Do not add routes merely to match an older specification.

Prefer **Astro content collections** for projects and notes. Use Markdown or MDX only where interactive components are genuinely required.

### Project fields (required unless marked optional)

- `title`, `summary`, `startedYear`
- `tags` (small, curated list)
- `featured` (boolean)
- `draft` (boolean)
- `cover` (optional path), `coverAlt` (required when cover is present)
- `repositoryUrl`, `demoUrl` (optional; only if real and publicly accessible)

Work entries use `startedYear` for verified project history rather than presenting a project milestone as an article publication date. A separate article publication date can be added later when known.

### Project detail template

1. What was the problem or curiosity?
2. What did I build? What part did I personally own?
3. How does it work? (diagram, example, code, demo as appropriate)
4. Important technical decisions and trade-offs.
5. Evidence of the result (quantitative when available; otherwise demonstrable qualitative evidence).
6. What I learnt and what I'd improve.
7. Links to public source, demo or related notes, when available.

Use a well-structured, readable essay layout with captioned figures and code blocks. Never imply confidential client work is open source; anonymise or omit sensitive details.

### Note template

- `title`, `description`, `date`, `tags`, `draft`
- short-first structure: observation / experiment → explanation → what changed my thinking;
- author can add charts, code and links without bespoke page implementation.

## 6. Technical implementation

### Preferred stack

- **Astro**, static output, **TypeScript**.
- **Vanilla CSS** with design tokens and scoped component styles; avoid Tailwind or UI component libraries unless an existing repository already relies on them.
- Astro components by default; add client-side JavaScript only for a demonstrated interaction. Do not ship a React application for a mostly static site.
- Content in Astro content collections. A simple data-driven structure should support adding projects without editing layout code.
- **GitHub Pages + GitHub Actions** for deployment; don't assume a particular GitHub account, repo name or custom domain.

### Repository structure (suggested, adapt to existing code)

```text
src/
  components/       # Header, Footer, ProjectPreview, Figure, NotePreview
  content/          # work and notes markdown / MDX
  layouts/          # BaseLayout, ArticleLayout
  pages/            # home, work, notes, about, 404
  styles/           # tokens.css, global.css
  content.config.ts # Astro content collections
public/
  images/           # approved static images and artefacts
.github/workflows/  # deployment after approval
AGENTS.md
docs/
  design-spec.md
  implementation-plan.md
```

### GitHub Pages constraints

- Deployment is **static**; no required server, database, API keys or runtime SSR.
- Configure Astro `site` and (where needed) `base` from the *actual* GitHub Pages deployment URL. Project repositories usually require a `base`; root `username.github.io` sites generally do not.
- Verify all assets and internal links with the configured base path, including direct loading of project pages.
- Do not hard-code a guessed GitHub username/domain or push a deployment until approved.
- Use the **current** Astro docs for the deployment Action and its version; don't copy outdated workflow versions by rote.

Reference: https://docs.astro.build/en/guides/deploy/github/

## 7. Accessibility, metadata and performance

- Semantic HTML, one `h1` per page, meaningful hierarchy, visible keyboard focus, accessible navigation and skip link.
- Meet **WCAG 2.2 AA** for content and controls, including actual colour contrast; do not rely solely on colour to signal status.
- Responsive at 360 px width and above, with no horizontal overflow; images scale and retain captions.
- Proper alt text for meaningful artefacts; decorative images empty alt.
- Respect reduced motion. Avoid auto-playing audio/video.
- Site title, useful meta description, canonical URLs and social previews configured using real deployment URL.
- Target Lighthouse mobile **performance ≥90**, **accessibility ≥95** on representative pages (not a guarantee; measure under reproducible conditions). Aim for CWV LCP <2.5s, CLS <0.1 on representative tests.
- Optimise images and fonts; keep JS minimal.

## 8. Explicit exclusions for v1

- CMS, login, database, comment system, newsletter and analytics tracking.
- Dark mode (can be added later if it serves a user need).
- Complex tag search/filter UI; simple tags and text navigation first.
- Heavy animation, fancy cursor effects or "terminal hacker" hero.
- Fake data visualisations, stock art and fabricated portfolio credentials.

## 9. Definition of design success

A human review of the home and a sample project page should answer **yes** to all of these:

1. Can I identify this as *a real builder's website* without reading the About page?
2. Is the five-colour system coherent and restrained?
3. Are scientific details relevant, rather than decorative wallpaper?
4. Can a hiring manager reach substance within two clicks?
5. Does a project show decisions, evidence and authorship rather than marketing claims?
6. Does it work as well on a narrow phone as on a large desktop?
7. Would the layout still work with five projects and twenty notes?
8. Does it look intentional without feeling like a polished startup landing page?

If not, refine the site rather than adding more effects.

## 10. Decisions left for the owner

- Final name/wordmark and approved introduction copy.
- Which real project is featured, plus approved images and links.
- GitHub username/repository path, optional custom domain and contact details.
- Whether any specific professional/client work can be discussed publicly.

These are content/deployment decisions, **not blockers for building a local design preview**.
