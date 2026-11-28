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

### Production (GitHub Pages)

`.github/workflows/deploy.yml` builds `dist/` on push to `master`. Set **Settings → Pages → Source: GitHub Actions** once. No extra secrets required. This remains the live production host (`https://matthewjwhittle.github.io`).

### Pull request previews (Cloudflare Pages)

Optional preview hosts for non-`master` branches / pull requests. In-repo hints:

| Setting | Value |
| --- | --- |
| Framework | Astro (static; no adapter) |
| Build command | `npm ci && npm run build` (or the Astro preset’s `npm run build` after install) |
| Build output directory | `dist` |
| Root directory | `/` (repository root) |
| Node.js | `22.22` (see `.nvmrc` and `package.json` `engines`; or set `NODE_VERSION=22.22` in Pages env) |
| `wrangler.toml` | `pages_build_output_dir = "dist"` |

Astro `base` stays `/` (username.github.io root site). `site` uses `CF_PAGES_URL` on Cloudflare builds and otherwise `https://matthewjwhittle.github.io`.

Pull requests are already built in CI by `.github/workflows/validate.yml`. Cloudflare Git integration is the intended preview publisher; no Wrangler deploy token is required in this repository.

#### Cloudflare dashboard steps (one-time)

API project creation / GitHub linking is not done from this PR. In the Cloudflare dashboard as the account that owns the Pages project:

1. Open [Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages) → **Create** → **Pages** → **Connect to Git**.
2. Authorise GitHub if prompted, then select **MatthewJWhittle/MatthewJWhittle.github.io**.
3. Project name suggestion: `matthewjwhittle-github-io` (matches `wrangler.toml`).
4. **Production branch:** `master`.
5. **Build configuration:** Framework preset **Astro**, build command `npm run build` (Pages runs install first), build output directory `dist`, root `/`.
6. **Environment variables** (Production and Preview): `NODE_VERSION` = `22.22` if the build image does not pick up `.nvmrc`.
7. **Preview deployments:** leave enabled (default) so every PR / non-production branch gets a `*.pages.dev` URL and PR comments when GitHub access allows.
8. **Production deployments on Cloudflare:** turn **automatic production deployments off** (or equivalent: do not treat Cloudflare as the live site). Production remains GitHub Pages; Cloudflare is for previews only. Leaving Cloudflare production on would also publish `master` to `*.pages.dev` without changing GitHub Pages — avoid that unless you explicitly want a second production mirror.
9. Save / deploy once if the UI requires an initial build, then confirm a subsequent PR shows a preview URL.
