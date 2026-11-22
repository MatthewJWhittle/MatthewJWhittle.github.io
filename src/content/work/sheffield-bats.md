---
title: Sheffield Bats
summary: An interactive map of predicted bat habitat suitability in South Yorkshire, backed by a reusable modelling pipeline.
date: 2024-04-28
status: in-progress
tags: [ecology, geospatial, open-source]
featured: true
draft: false
repositoryUrl: https://github.com/MatthewJWhittle/shefflied-bats
demoUrl: https://matthewjwhittle.shinyapps.io/sybg-hsm/
---

## Why I worked on it

I worked with South Yorkshire Bat Group on a familiar problem in ecology: lots of species records, but no straightforward way to explore what they might tell us about habitat across a wider area. Records show where bats have been observed. They don't tell the whole story about where suitable habitat might be.

We wanted a repeatable way to produce habitat suitability maps, and something people could use to explore the results without running the modelling code themselves.

## What I built

There are two parts to the public project.

The [modelling pipeline](https://github.com/MatthewJWhittle/shefflied-bats) is written in Python. It prepares environmental data, fits habitat suitability models and exports prediction rasters. It started as a South Yorkshire study and has since developed into a more reusable command-line tool.

The [map application](https://github.com/MatthewJWhittle/sybg-hsm-app) is built with Python Shiny. It lets people choose a bat species and explore predicted suitability across South Yorkshire, including different activity types where available. There's also a [hosted version](https://matthewjwhittle.shinyapps.io/sybg-hsm/), although its availability depends on the third-party host.

## A few technical choices

The modelling uses a Maximum Entropy approach through [elapid](https://earth-chris.github.io/elapid/), combining records with environmental layers such as climate, terrain and land cover. I filtered out records that were too imprecise for the modelling, rather than treating every point as equally informative.

Keeping the modelling pipeline separate from the map app was important. It means the analysis can be worked on independently, while the results are available to explore without running Python or downloading the underlying datasets.

## What the maps can and can't tell you

These are predictions of **relative habitat suitability**, not evidence that bats are present or absent. Recording effort varies, and some records aren't precise enough to use in training. The maps are useful for exploring patterns and asking better questions, but they don't replace a survey or a formal records search.

## What I took from it

For me, the interesting part was connecting the modelling work to something people could actually use. Producing a raster is one thing; making it understandable and accessible through a map is another.

## Links

- [Explore the hosted map](https://matthewjwhittle.shinyapps.io/sybg-hsm/) (when available)
- [Modelling pipeline source](https://github.com/MatthewJWhittle/shefflied-bats)
- [Map application source](https://github.com/MatthewJWhittle/sybg-hsm-app)
- [South Yorkshire Bat Group](https://www.sybatgroup.org.uk/)
