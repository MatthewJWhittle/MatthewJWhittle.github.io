# Data visualisation & diagram style guide

**Status:** v1 · for figures, maps and technical diagrams on this site  
**Audience:** anyone producing assets for articles or project pages  
**Companion docs:** [design-spec.md](design-spec.md) (site tokens), [editorial-direction.md](editorial-direction.md) (voice and publication boundaries)

## Design notes

### Purpose

Site chrome and page layout follow the design spec. **This guide covers the artefacts inside articles** — maps, process diagrams, charts and annotated figures — so they read as designed scientific communication rather than default GIS or notebook exports.

Aim for **contemporary scientific atlas + data-journalism quality**: calm, precise, one clear message per figure.

### Exemplars

Stage 1 Yorkshire bat atlas concepts (review drafts, not finals):

- [`assets/bat-atlas-visuals-stage1/fig01-records-vs-suitability.png`](../assets/bat-atlas-visuals-stage1/fig01-records-vs-suitability.png) — paired maps, distinct treatments for density vs suitability
- [`assets/bat-atlas-visuals-stage1/fig02-recording-bias.png`](../assets/bat-atlas-visuals-stage1/fig02-recording-bias.png) — three-stage method diagram grounded in real methodology
- [`assets/bat-atlas-visuals-stage1/fig03-yorkshire-atlas-showcase.png`](../assets/bat-atlas-visuals-stage1/fig03-yorkshire-atlas-showcase.png) — shared canvas / extent / palette for a species switcher

Use these as visual references for hierarchy, colour roles and captioning — not as frozen layout templates.

---

## 1. Five-second test

Before export, cover the caption and ask:

1. What is the single claim of this figure?
2. Can a technical peer get that claim in about five seconds?
3. Does anything decorative compete with that claim?

If the answer to (2) is no, simplify. One job per figure; one primary visual hierarchy.

---

## 2. Palette for figures

Stay inside the site’s five colours ([design-spec.md](design-spec.md) §3). For **continuous map fills**, derive restrained ramps from those hues — do not invent a sixth brand colour.

| Role | Token / hex | Use in figures |
| --- | --- | --- |
| Paper | `--colour-paper` `#F5F2E9` (figures may use a near warm white such as `#F7F4EC`) | Figure background, map voids outside study area |
| Ink | `--colour-ink` `#252D29` | Titles, boundaries, scale bar, primary labels |
| Muted ink | mix ink ~60% on paper | Subtitles, footnotes, axis secondary text |
| Moss / forest | `--colour-moss` `#506D5A` and deeper greens toward `#2A3F34` | **Suitability / continuous model surfaces** |
| Blue-grey | `--colour-blue` `#A7B9BB` | Secondary diagram fills, technical panels, soft rules |
| Ochre (restrained) | derived warm mid-tone ~`#C08A4F` | **Density, effort, counts** — keep distinct from suitability |
| Rust | `--colour-rust` `#CA754D` | Sparse markers / sample points only — never a full choropleth |

### Ramp rules

- **Suitability / probability-like fields:** light paper → blue-grey or soft green → forest green. Mid-tone heavy; bright yellow/lime highlights are out.
- **Counts / intensity / effort:** light paper → warm grey → ochre → deep brown. Must not be confusable with the suitability ramp at a glance.
- **Categorical:** prefer ink, moss, blue-grey, ochre — max four strong categories before hatching or small multiples.
- **Diverging:** only when the data are truly bipolar; centre on paper/grey, not white-hot.

### Avoid

- Rainbow, jet, hsv, default viridis-on-white “notebook dump”, multi-hue spectral legends for sequential data
- Neon accents, glow, heavy drop shadows, glassmorphism
- Using rust as a map fill
- Assuming rust text on paper meets WCAG AA — ink for readable type

---

## 3. Typography in figures

Match the site families where the asset embeds in an article:

| Role | Family | Notes |
| --- | --- | --- |
| Figure title | Newsreader (serif) | Short; `FIG. 01`-style numbering welcome |
| Panel labels & body in-figure | Source Sans 3 | Prefer labels outside the data ink when possible |
| Provenance, IDs, timestamps | IBM Plex Mono | Small; one quiet footer line is enough |

Hierarchy: **title → one-line intent → map/diagram → caption → provenance footer**. Do not put a second competing headline inside the plot area.

Web-sized exports: titles ~14–16 px equivalent at final display width; panel labels ~11–12; footnotes ~7–8. Prefer SVG (or SVG+PNG hybrid) when type must stay crisp; PNG is fine for continuous rasters.

---

## 4. Map & atlas conventions

### Geography first

- **North up**, always. Fix orientation via CRS / affine / northing when reading GeoTIFFs. Never “correct” a south-up raster by flipping the PNG.
- Shared **extent, projection and canvas** across panels meant for comparison or a switcher (see FIG. 03).
- Draw the study boundary as a thin ink line; avoid thick administrative clutter unless the story is administrative.
- Scale bar in real units; north indicator only if the crop could confuse orientation.
- Prefer British National Grid (EPSG:27700) or Web Mercator consistently within a figure set; state CRS in provenance if non-obvious.

### Data treatments

| Data kind | Treatment |
| --- | --- |
| Continuous suitability | Smooth ramp; bilinear display OK; power/gamma stretch allowed if documented in working notes |
| Density / effort | Visually distinct ramp; aggregation cells or wash — not raw occurrence dots |
| Binary / threshold | Two clear states + explicit “no prediction” void |
| Missing prediction / EV nodata | Mask cleanly; label “no prediction” rather than leaving a raw white rectangle |

### Basemaps

Default: **no basemap** for atlas strips (data is the subject). If context is needed, use a whisper of terrain or settlement — low contrast, never a satellite hero under a rainbow overlay.

### Comparison layouts

- Side-by-side beats spaghetti overlays.
- Same legend geometry across a switcher set; remind readers that **relative scores are not comparable across models/species** when that applies.
- Dual-panel “records vs model” figures must make the left/right jobs unmistakable in under five seconds.

---

## 5. Diagrams (process, architecture, method)

- Prefer **3±1 stages** for method stories (see FIG. 02). Label stages `1 · …`, `2 · …`.
- Ground diagrams in **actual project methodology** (config values, sampling rules), not generic ML cartoons.
- Arrows and connectors: thin ink or muted rules; no 3D or skeuomorphic flowchart chrome.
- When showing samples or points for illustration, use a **subsample** and say so in the footer.

---

## 6. Privacy, sensitivity & provenance

### Privacy

- No precise roost coordinates, nest sites or other sensitive locations in public figures.
- Occurrence evidence → **aggregated** surfaces (e.g. ≥1 km cells) or effort proxies derived from all-species density.
- Captions should say when points are background samples, not presence records.

### Provenance footer (quiet, required for model maps)

One line is enough, for example:

`Concept / export · <fleet or date> · <extent> · no occurrence points`

Prefer reviewed or clearly published model packages over unnamed experimental folders. Record git SHA / package id / cutoff rule in the working proposal or commit message when the figure is tied to a model release.

### Honest limits

- Presence-only models do not prove absence.
- Do not imply survey-grade certainty from a continuous suitability wash.
- Flag thin samples (low `n_presence`) in caption language, not only in a CSV elsewhere.

---

## 7. Export & technical quality

| Topic | Rule |
| --- | --- |
| Display size | Design for article width (~680–960 px content); supply 1.5–2× raster if PNG |
| Colour space | sRGB; check on both light UI and projected slides if used in talks |
| File naming | `kebab-case`, figure role clear (`fig01-…`), avoid spaces |
| Placement | Prefer `public/images/…` or `assets/…` with the article; don’t bury finals only in scratch folders |
| Alt text | Write real alt text that states the claim, not “image of a map” |
| Caption | Plain British English; figure number; what is shown; what is *not* shown |

---

## 8. What not to ship

- Default Matplotlib / seaborn / QGIS layout chrome (viridis dump, oversized colourbar, filename-as-title)
- Rainbow sequential scales; red–green only encodings
- Cards, pill clusters, stat strips or dashboard chrome inside a figure meant for an article
- Decorative gradients that are not the data
- Upside-down geography “fixed” in an image editor
- Sensitive point locations “because the model already has them”
- Unlabelled nodata holes that look like cartographic features

---

## 9. Pre-publish checklist

- [ ] One sentence claim; passes the five-second test
- [ ] Palette roles correct (suitability ≠ density; rust only as markers)
- [ ] North-up via CRS/affine; shared extent if comparative
- [ ] Distinct visual treatment for different data kinds
- [ ] Privacy-safe aggregation; no sensitive coordinates
- [ ] Caption + alt text drafted; provenance footer present
- [ ] Nodata / “no prediction” handled deliberately
- [ ] Scientific caveats stated where a reader could over-interpret
- [ ] Asset committed or linked where reviewers can open the full-resolution file
- [ ] Owner approval before treating a concept as a final public figure

---

## 10. Relationship to other docs

| Doc | Owns |
| --- | --- |
| [design-spec.md](design-spec.md) | Site-wide tokens, page composition, motion |
| [editorial-direction.md](editorial-direction.md) | Voice, what may be published, draft ≠ private |
| **This guide** | Figures, maps, diagrams inside content |

When tokens and figure guidance conflict, **site tokens win for UI**; figure ramps may deepen moss/ochre for perceptual range but must remain recognisably of the same family.
