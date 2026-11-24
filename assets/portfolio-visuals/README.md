# TileArray portfolio visuals

Compositions and modular panels for the TileArray project article ([issue #16](https://github.com/MatthewJWhittle/MatthewJWhittle.github.io/issues/16); review via [PR #25](https://github.com/MatthewJWhittle/MatthewJWhittle.github.io/pull/25)).

Wired into `src/content/work/tilearray.mdx` via `TilearrayHero.astro` and `TilearrayGallery.astro`. Titles, captions and attribution live in HTML — not inside the bitmaps.

## What is here

| Path | Role |
| --- | --- |
| `exports/` | Desktop and mobile compositions (no titles/captions/code in the bitmaps) |
| `review/` | Same frames at review display sizes |
| `panels/` | Modular data layers + `geometry.json` |
| `manifest.json` | Provenance, attribution, AOIs, placement |
| `article-outline.md` | Suggested article structure |
| `scripts/compose_stage1.py` | Rebuilds compositions from committed `panels/` |

Published web assets: `public/images/tilearray/*.webp`.

## Figures

1. **fig01 — hero:** NAIP San Francisco / Golden Gate — choose an area, get that display crop as an array (illustrative AOI; default mosaic may follow the tile grid).
2. **fig02 — gallery:** NAIP Sacramento (CV imagery) · EA Helvellyn DTM hillshade · EA Vegetation Object Model.
3. **fig03 — pipeline:** OSM adjacent-tile internals (assets kept; not the article focus). The live article uses the existing HTML `TilearrayFigure` diagram for “How it works”.

## Attribution (required when published)

- USGS / USDA NAIP NaturalColor — US Federal public domain (The National Map Orthoimagery)
- Environment Agency Lidar Composite DTM 1 m (WCS) and Vegetation Object Model (WMS) — Contains public sector information licensed under the Open Government Licence v3.0
- OpenStreetMap XYZ (pipeline demos) — © OpenStreetMap contributors

Do not commit provider keys, tile caches, or raw `.npy` intermediates to this repository.
