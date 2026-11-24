# TileArray portfolio visuals — stage 1 (first pass)

First-pass compositions for [issue #16](https://github.com/MatthewJWhittle/MatthewJWhittle.github.io/issues/16). **Not integrated into the live article yet** — waiting on visual review before polishing or wiring into `tilearray.md`.

## What is here

| Path | Role |
| --- | --- |
| `exports/` | Desktop and mobile first-pass compositions (no titles/captions/code in the bitmaps) |
| `review/` | Same frames at review display sizes (desktop 1400px; mobile ~390px) |
| `panels/` | Modular data layers for later responsive HTML/CSS arrangement |
| `manifest.json` | Provenance, attribution, AOIs, intended placement |
| `article-outline.md` | Suggested article structure and transitions |
| `scripts/compose_stage1.py` | Rebuilds compositions from committed `panels/` |

## Figures (one sentence each)

1. **fig01 — hero:** Shows the simple job — pick a real area on a map and get that patch into a georeferenced array — using an OpenStreetMap mosaic of the Greenwich Peninsula.
2. **fig02 — gallery:** Shows three kinds of TileArray output side by side: numeric elevation (WCS), a topo mosaic (WMTS), and a rendered vegetation layer (WMS).
3. **fig03 — pipeline:** Shows the engineering path as a spatial metaphor: plan tiles for an AOI → fetch a few at a time → assemble a mosaic → keep a lazy plan until you compute.

## Attribution (required when published)

- OpenStreetMap XYZ — © OpenStreetMap contributors
- Kartverket topo WMTS — © Kartverket (CC BY 4.0)
- Environment Agency Lidar DTM (WCS) and Vegetation Object Model (WMS) — Contains public sector information licensed under the Open Government Licence v3.0

Do not commit provider keys, tile caches, or raw `.npy` intermediates to this repository.
