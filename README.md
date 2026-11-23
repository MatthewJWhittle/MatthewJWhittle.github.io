# Matthew Whittle — personal site

Static **Astro** (+ optional React islands) site on GitHub Pages.

## Local development

Requires Node `>= 22.22`.

```bash
npm ci
npm run dev
```

Then open the URL Astro prints (usually `http://localhost:4321`).

```bash
npm run build
npm run preview
```

## Content

The live site is a single long-scroll page (`src/pages/index.astro`). Work and notes can be authored under `src/content/` once approved for public release. **Do not commit private drafts to this repository**: `draft: true` hides a page from the built site, not from the public Git repository or commit history. Keep unapproved material in a private workspace instead.

Work entries use `startedYear` (project history verified against public repositories), not an invented article publication date. Detail routes under `/work/[slug]/` and `/notes/[slug]/` remain available.

## Deploy

`.github/workflows/deploy.yml` builds `dist/` on push to `master`. Set **Settings → Pages → Source: GitHub Actions** once. No extra secrets required.
