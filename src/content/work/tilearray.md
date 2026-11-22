---
title: tilearray
summary: A Python library that turns map tile services into Dask-backed xarray arrays.
date: 2025-10-25
status: in-progress
tags: [geospatial, python, open-source]
featured: true
draft: false
repositoryUrl: https://github.com/MatthewJWhittle/tilearray
docsUrl: https://matthewjwhittle.github.io/tilearray/
figureId: tilearray
---

## Why I built it

I kept finding myself writing code to download map tiles and turn them into arrays. Eventually, I decided to make a library for it.

In several computer-vision projects, getting the imagery into a usable form took more work than I expected. I had to work out how each tile service behaved, keep requests within rate limits, retry failures and assemble a mosaic. Other clients helped with parts of the job, but I kept writing the same glue code.

## What it does

[tilearray](https://github.com/MatthewJWhittle/tilearray) is a small, open-source Python library for that workflow. You describe a WCS, WMS, WMTS or XYZ service, choose a bounding box and call `create_array`. It returns a lazy, Dask-backed xarray, so you can define the area before fetching the imagery.

The [documentation](https://matthewjwhittle.github.io/tilearray/) has a quick-start example and a more detailed explanation of [how it works](https://matthewjwhittle.github.io/tilearray/how-it-works.html).

## Decisions that mattered

The basic flow is to plan the requests, fetch tiles, decode the imagery and assemble an array. Requests have concurrency limits and retries, which matter when a job needs thousands of tiles from a service you don't control. If a tile still fails, the library raises an error rather than quietly leaving a gap in the image.

I also chose not to reproject the data automatically. The result stays in the tile grid's coordinate system; if I need a different CRS, I can do that explicitly afterwards with tools such as rioxarray. An optional cache makes repeat runs less painful.

## Where it stands

It's alpha software, so the API may change. It supports WCS, WMS, WMTS and XYZ, and is available under the Apache 2.0 licence. You can install it with `pip install tilearray` or `uv add tilearray`.

## What I learnt

The most useful decision was narrowing the job. You describe a service and an area; you get an array back. Retries, caching and the quirks of individual servers can live in one library instead of being rewritten inside every project.
