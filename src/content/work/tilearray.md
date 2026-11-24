---
title: tilearray
summary: TileArray is a Python library I'm building to make raster data from online mapping services easier to work with. You choose a source and an area; it handles the fetching and assembly, so you can get on with analysing the data instead of building a tile acquisition pipeline.
startedYear: 2025
tags: [geospatial, python, open-source]
featured: true
draft: false
repositoryUrl: https://github.com/MatthewJWhittle/tilearray
docsUrl: https://matthewjwhittle.github.io/tilearray/
figureId: tilearray
---


## I just wanted the imagery

I was working on a computer vision project and needed aerial imagery from a WMTS service. I knew which area I wanted; I just needed the images in Python so I could get on with the machine learning.

The data was available, but getting it wasn't straightforward. I had to work out how the service organised its tiles, which requests covered my area and how to assemble the results in the right place. Then there were failed requests, server limits and all the other things that come with fetching lots of small pieces of data.

Before long, I was maintaining an imagery acquisition system alongside the project it was meant to support.

I'd run into a similar problem when retrieving environmental data from WCS services for habitat suitability modelling. The services were different, but the frustration was the same: I wanted to work with the data, not build another system for getting hold of it.

## Getting data out of map services

A lot of useful geospatial data is available through online services rather than as files you can download. That includes aerial imagery, rendered maps and numerical datasets such as elevation. Public data providers use services including WMS, WMTS and WCS, while XYZ tile services are common elsewhere.

These are useful ways to publish large datasets, but they can be awkward when your goal isn't to *view* a map — it's to analyse the data behind it, or use the imagery in a Python workflow.

You need to know which layer to ask for, where the tiles sit in space, what area each request covers and how to put the responses back together. For a single small area that might be manageable. For a project that needs lots of areas, it quickly becomes a substantial job.

What I kept wanting was much simpler: **point at a data source, choose an area and get an array back**.

## What TileArray lets you do

[TileArray](https://github.com/MatthewJWhittle/tilearray) is a Python library I'm building to take care of that common work. You describe the source and the area you need, and it gives you a georeferenced **xarray** object to use with other Python tools.

A straightforward example uses OpenStreetMap tiles: choose an area around London and assemble the map tiles into an array with spatial coordinates. That's a rendered map, not the aerial photography that prompted the project, but the problem of retrieving a particular area is much the same.

Other services provide different kinds of raster data. The Environment Agency's WCS service can provide numerical elevation values for terrain analysis. A Kartverket WMTS service provides topographic map imagery, while the Environment Agency's WMS service can provide a rendered vegetation layer.

That distinction matters. A WCS elevation array contains values you can measure and analyse. A rendered map layer is imagery — useful for display or image-based work, but it doesn't necessarily preserve the underlying measurements.

Once I've got the result in Python, I can use the usual tools to inspect, plot and process it, or pass it into a machine-learning workflow. The point is to spend less time on data acquisition and more time on the work that needed the data in the first place.

The [documentation](https://matthewjwhittle.github.io/tilearray/) includes [working examples](https://matthewjwhittle.github.io/tilearray/guides/index.html) and a [quick start](https://matthewjwhittle.github.io/tilearray/quickstart.html).

## How it works

TileArray handles several different service types through a common interface. For a tiled source, it works out which requests cover the area and how their results fit together. It then provides a lazy, Dask-backed array; the actual pixel data is fetched and assembled when you compute it.

There are a few decisions behind that workflow that I think are particularly important.

**Be considerate of the server.** Fetching lots of tiles means respecting request limits, retrying failures and using a cache where appropriate. I'd rather see an explicit failure than quietly end up with missing pieces.

**Keep the work lazy.** Planning an area shouldn't mean downloading every pixel immediately. With xarray and Dask, the data can be fetched when it's actually needed.

**Keep coordinate systems explicit.** The mosaic retains its own coordinate system rather than being silently reprojected. If I need to transform it for analysis, I can do that separately using something like [rioxarray](https://corteva.github.io/rioxarray/).

There's a more detailed [walkthrough of the pipeline](https://matthewjwhittle.github.io/tilearray/how-it-works.html) in the documentation.

## Where it fits

TileArray is a data-access library, not a replacement for GIS or raster-processing tools. You still need a valid source configuration, including a layer, coverage or zoom level where the service requires one. And services have their own quirks, so I wouldn't assume every endpoint works without testing it.

It's still alpha software, and the API may change. You can install it with `pip install tilearray` or `uv add tilearray`. The [source code](https://github.com/MatthewJWhittle/tilearray) is public under the Apache 2.0 licence.
