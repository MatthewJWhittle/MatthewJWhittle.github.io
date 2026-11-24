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

I was working on a computer vision project and needed aerial imagery for a particular area. The imagery was available through a WMTS service, but getting it into Python was turning into a project of its own.

Before I could do anything with the images, I had to figure out how the service organised its tiles, which requests covered my area and how to put the results back together in the right place. I also needed to deal with failed requests and avoid overwhelming the server. I'd ended up building and maintaining an imagery acquisition system when what I really wanted to do was get on with the machine learning.

It wasn't the first time I'd encountered this. I'd also needed environmental data from WCS services for habitat suitability modelling. Different services, similar problem: I knew which data I wanted, but getting it into a usable form took more work than it should.

## The problem with getting data from map services

A lot of useful geospatial data is published through online services. That includes imagery, rendered maps and numerical datasets such as elevation. Government data providers use services like WMS, WMTS and WCS, while XYZ tiles are common elsewhere.

They're useful ways to share large datasets, but using them for analysis is different from viewing a map. If you want the data for a particular area, you may need to understand the service's layers, coordinate systems, tile grids and request limits. Then you have to fetch and assemble the pieces while keeping their spatial information intact.

Sometimes a downloadable file is the easiest answer. But when the data you need is served this way, I don't think you should have to build a new download system just to start using it.

## What TileArray lets you do

[TileArray](https://github.com/MatthewJWhittle/tilearray) is a Python library I'm building to handle that work. You configure a source, specify an area and get back a georeferenced **xarray** object that you can use with the rest of the Python ecosystem.

For example, you could retrieve numerical elevation data from an Environment Agency WCS service for terrain analysis. Or you could assemble imagery from a WMTS or XYZ service to plot, inspect or use in a computer vision workflow. A WMS service can provide rendered map layers too, although those image pixels aren't the same thing as the underlying numerical measurements.

The important part for me is being able to move from *this is the area and dataset I need* to *here's the data in Python*. From there I can use familiar tools for visualisation, processing and modelling.

There are [working examples in the documentation](https://matthewjwhittle.github.io/tilearray/guides/index.html), along with a [quick start](https://matthewjwhittle.github.io/tilearray/quickstart.html) if you want to try it.

## How it works

Underneath that interface there's still quite a bit going on. TileArray works out which requests are needed for an area, fetches the pieces, decodes the responses and assembles them into an array with coordinates and spatial metadata. The same general workflow supports WCS, WMS, WMTS and XYZ, even though the services work differently.

A few design decisions have been particularly important.

**Don't overwhelm the server.** Fetching hundreds of tiles isn't the same as requesting one image. The library limits concurrent requests and handles retries and caching. If it still can't retrieve something, I generally want a clear error rather than an apparently complete dataset with unnoticed gaps.

**Don't download everything before you need it.** The result is a lazy, Dask-backed xarray object. TileArray can plan how the pieces fit together, then fetch and assemble the pixel values when you compute the result.

**Keep spatial transformations explicit.** The array retains the coordinate system of the resulting mosaic; TileArray doesn't quietly reproject it. If I want to transform or analyse the raster further, I can use tools such as [rioxarray](https://corteva.github.io/rioxarray/).

The [technical walkthrough](https://matthewjwhittle.github.io/tilearray/how-it-works.html) explains the pipeline in more detail.

## Where it fits

TileArray is a way of *accessing* remote raster data, not a replacement for GIS or raster-processing libraries. You still have to provide a valid service configuration, including a layer, coverage or zoom level where it's needed. And not every service behaves the same way, so compatibility needs testing rather than assuming any endpoint will work.

It's still alpha software, and the API may change. If you'd like to try it, you can install it with `pip install tilearray` or `uv add tilearray`. The [source code](https://github.com/MatthewJWhittle/tilearray) is available under the Apache 2.0 licence.
