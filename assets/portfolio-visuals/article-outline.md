# Suggested TileArray article outline (stage 1 draft)

Voice: first person, direct, conversational British English. Keep genuine nuance: `create_array` is lazy by default; `compute_mosaic` fetches pixels; no silent reprojection.

## 1. Why I built it

I needed aerial imagery for a computer-vision project. Getting a particular area out of a WMTS (and later WCS elevation and other services) turned into its own acquisition problem — capabilities, layers, tile grids, retries — before I could do any analysis.

Keep this short. Point at the irritation, not a protocol lecture.

## 2. What I wanted to do

Identify a source, choose an area, get data into Python.

**Place fig01 (hero) here.**

Suggested transition: “The job I kept wanting was simpler than the plumbing: pick an area and work with the pixels.”

Optional small tested snippet *under* the figure (not baked into the image):

```python
from tilearray import create_array, compute_mosaic

da = create_array(config, bbox, bbox_crs=...)  # lazy Dask-backed xarray
arr = compute_mosaic(da)                       # fetch + assemble when needed
```

## 3. What it lets you work with

Tangible examples — elevation you can analyse, map or imagery mosaics, rendered layers — without a long acronym dump.

**Place fig02 (gallery) here.** Panel captions outside the image, e.g.:

- Elevation for terrain analysis (WCS; hillshade is a derived view)
- Topo mosaic assembled from WMTS tiles
- Vegetation layer from WMS as an array (rendered imagery)

One short note that WMS/XYZ pixels are usually rendered map/image values, not preserved scientific measurements.

## 4. How it works, for the curious

One concise explanation. Key decisions only where interesting: polite fetching, laziness, georeferencing, explicit reprojection.

**Place fig03 (pipeline) here** — candidate to replace the current `TilearrayFigure.astro` diagram rather than sit beside it.

Suggested transition: “Under the hood it’s still tiles and HTTP; the useful part is planning the area, fetching politely, and only computing when you need values.”

## 5. Limitations and links

- Alpha status; API may change
- You still need a valid source configuration
- Data-access tool, not a GIS-processing replacement
- No automatic reprojection — warp explicitly (e.g. rioxarray) when needed
- Links to docs, source, licence (Apache 2.0)

Remove repeated conclusions. End once.
