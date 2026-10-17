# Matthew Whittle — field notebook portfolio

Static **Astro** site with the **Working Field Notebook** aesthetic (see project store field-notebook spec). Content collections for work and notes; GitHub Pages via Actions.

## Local development

Requires Node `>= 22.22`.

```bash
npm ci
npm run dev
```

```bash
npm run build
npm run preview
```

## Adding content

1. Copy `src/content/work/_template.example.md` or `src/content/notes/_template.example.md`.
2. Rename (drop `_template` / set a slug filename), set `draft: false`.
3. Fill frontmatter and Markdown body — indexes and detail pages update automatically.

Draft items (`draft: true`) are excluded from production pages.

## Deploy

`.github/workflows/deploy.yml` builds `dist/` on push to `master`. Set **Settings → Pages → Source: GitHub Actions** once. No extra secrets required.

## Design tokens

Exact palette in `src/styles/tokens.css`: paper, ink, moss, rust, blue. Fonts: Newsreader, Source Sans 3, IBM Plex Mono.
