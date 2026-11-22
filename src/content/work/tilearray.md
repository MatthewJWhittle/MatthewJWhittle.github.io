---
title: tilearray
summary: An open-source Python library I wrote so a tile service can be described once and read back as an xarray.
date: 2025-10-25
status: in-progress
tags: [geospatial, python, open-source]
featured: true
draft: false
repositoryUrl: https://github.com/MatthewJWhittle/tilearray
docsUrl: https://matthewjwhittle.github.io/tilearray/
---

## What was the problem?

A lot of the computer-vision work I have done starts with high-resolution imagery on a tile server, usually WMTS. The model is the part that gets talked about. The part that took the time was getting the pictures.

I kept a client that understood the service configuration, ran on a cloud machine, and stayed inside whatever the host would tolerate that week. Ask for too much and the job was rate-limited. Hit a flaky server and tiles dropped out. The mosaic came back with holes, and the practical fix was to run the whole acquisition again. That code became a large share of the project. It felt like something a library should own.

I had already tried the clients people usually reach for, including OWSLib. They will talk to the service. Planning a large area, keeping the requests polite, retrying the tiles that failed, and handing back one array was still my code.

What I wanted was smaller than that. Specify the service, and get an xarray.

## What did I build?

[tilearray](https://github.com/MatthewJWhittle/tilearray) is that library. It is open source under Apache 2.0, published in alpha, and documented against version 0.3.3. You describe a WCS, WMS, WMTS or XYZ endpoint, pass a bounding box, and call `create_array`. The result is a Dask-backed xarray. Pixels stay on the server until you compute them.

I built it for the job I kept repeating: pull a large area of high-resolution imagery into an analysis or a vision pipeline, without keeping a private downloader alive inside the project. The [documentation](https://matthewjwhittle.github.io/tilearray/) is the best way in. There is a short OpenStreetMap example, and a page on [how the pipeline fits together](https://matthewjwhittle.github.io/tilearray/how-it-works.html).

## How it works

WCS, WMS, WMTS and XYZ share one path. Plan the tiles, fetch them, decode them, and assemble a mosaic.

Planning turns the bounding box into an ordered list of requests. A larger area means more requests, and the same call. Fetching goes out over HTTP behind a concurrency ceiling, so the job does not stampede the host. Requests retry, and pressure from rate limits, server errors or timeouts gets a second pass before the run gives up. If a tile still fails, the mosaic stops. I did not want a missing tile to turn up later as a quiet hole in the imagery.

Decode reads PNG, JPEG and GeoTIFF into a common array. The pieces are placed north-up into one DataArray, with coordinates and a transform. `compute_mosaic` is the call that runs the fetch, with the workers lined up to that ceiling. An optional cache keeps tiles you already have, so a rerun does not have to ask the server again.

## Technical decisions

The mosaic stays in the tile grid's own coordinate system. tilearray does not quietly reproject on the way in. If a later step needs a different CRS, that step should be visible.

The array is lazy. Planning is cheap, and you only pay for the pixels you compute. Known public hosts have fetch presets, so the polite defaults are not rewritten for every caller.

## Where it stands

This is alpha software. The API can still change. Today the four protocols above share `create_array`. The library gets tiles into xarray. It is not a GIS, and it does not build a STAC catalogue or a Cloud Optimised GeoTIFF cube.

The source, the tests and the docs are public. Installation is `pip install tilearray` or `uv add tilearray`, on Python 3.9 or newer.

## What I learnt

The useful move was to give the job a contract. A service config goes in, and an xarray comes out, and a failed tile is allowed to fail the run. Once that was the shape, the awkward service behaviour had a home that was not the middle of a vision codebase.
