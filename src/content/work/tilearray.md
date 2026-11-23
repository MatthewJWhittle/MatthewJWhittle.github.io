---
title: tilearray
summary: A Python library for getting imagery and raster data from remote OGC and tile services into arrays you can work with.
startedYear: 2025
tags: [geospatial, python, open-source]
featured: true
draft: false
repositoryUrl: https://github.com/MatthewJWhittle/tilearray
docsUrl: https://matthewjwhittle.github.io/tilearray/
figureId: tilearray
---

## Why I built it

A lot of useful imagery and raster data is available through online services rather than as files you can just download. WMS, WMTS, WCS and XYZ endpoints are everywhere, but getting a particular area into Python as something you can actually analyse can be surprisingly awkward.

I kept running into this on geospatial and computer-vision projects. I knew which data I wanted, but first had to work out how the service was configured, which layers and coordinate systems it used, how its tiles fitted together, and how to deal with requests failing or being limited by the server. I tried existing tools, but often ended up wrestling with OGC configuration and writing more glue code for each service.

After doing that a few times, I decided to pull the common work into a library. The aim was to make the thing I actually wanted to do — **specify a source and an area, then get an array back** — much easier.

## What tilearray does

[tilearray](https://github.com/MatthewJWhittle/tilearray) provides a common way to work with WCS, WMS, WMTS and XYZ services. You configure the source, specify the area you want and call `create_array`. It returns a lazy, Dask-backed **xarray** object that you can use in Python for analysis, visualisation or machine-learning workflows.

The library handles the request planning, fetching, retries, decoding and assembly that would otherwise sit inside each project. You still need to describe a valid source, including details such as a layer or zoom level where the service requires them. The point isn't to make remote services magically simple; it's to put their complexity behind a consistent interface.

The [documentation](https://matthewjwhittle.github.io/tilearray/) has a [quick-start example](https://matthewjwhittle.github.io/tilearray/quickstart.html) and an explanation of [how the pipeline works](https://matthewjwhittle.github.io/tilearray/how-it-works.html).

## Some choices that mattered

**Be careful with the server.** Tile requests need sensible concurrency limits, retries and caching. When a tile still can't be fetched, I'd rather see a clear failure than quietly get a mosaic with missing data.

**Keep the array lazy.** You can plan the request before downloading all the imagery. The result uses Dask, so work can happen when the array is computed.

**Don't hide reprojection.** TileArray keeps the result in the source tile grid's coordinate system. If the analysis needs a different CRS, that's a separate, explicit step using something like [rioxarray](https://corteva.github.io/rioxarray/).

## Where it fits

It's a data-access library, not a replacement for GIS or raster-processing tools. It helps get remote imagery or raster data into Python; you can use other libraries for reprojection, processing and analysis. It's still alpha software, and the API may change.

You can install it with `pip install tilearray` or `uv add tilearray`. The [source code](https://github.com/MatthewJWhittle/tilearray) is public under the Apache 2.0 licence.

## What I learnt

The difficult part wasn't any single tile request. It was the number of small service-specific decisions needed before I could do any actual analysis. Having one place for that logic means I can concentrate on the data instead of solving the same access problem again.
