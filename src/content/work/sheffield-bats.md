---
title: Sheffield Bats
summary: Habitat suitability modelling for South Yorkshire bats, plus a public map app to explore the results.
date: 2024-04-28
status: in-progress
tags: [ecology, geospatial, open-source]
featured: true
draft: false
repositoryUrl: https://github.com/MatthewJWhittle/shefflied-bats
demoUrl: https://matthewjwhittle.shinyapps.io/sybg-hsm/
---

## The problem

South Yorkshire Bat Group holds a large records database. Turning those records into maps that are useful for conservation planning and impact assessment is hard: the records vary in quality, the landscape layers come from several public sources, and a one-off notebook does not survive the next data refresh.

The work needed a repeatable modelling path, and a way for people to look at the predicted suitability without installing the toolchain.

## What was built

There are two public pieces.

The modelling side lives in [`shefflied-bats`](https://github.com/MatthewJWhittle/shefflied-bats) (the repository name keeps an early spelling). It is a habitat suitability modelling pipeline driven by an `sdm` command-line interface: build environmental layers from public sources, train MaxEnt-style models with [`elapid`](https://earth-chris.github.io/elapid/), produce prediction rasters, and package the results so another tool can read them. The Sheffield bats study is the reference run; the same path is meant to work for other species and areas.

The visualisation side is a Python Shiny dashboard in [`sybg-hsm-app`](https://github.com/MatthewJWhittle/sybg-hsm-app). It was built with South Yorkshire Bat Group so people can explore predicted roosting and in-flight suitability across the county. A hosted copy is on [shinyapps.io](https://matthewjwhittle.shinyapps.io/sybg-hsm/). That host can change; the source for the app is the durable reference.

## Approach

Records from the bat group were filtered to those with a grid-reference accuracy of 100 m or better. Environmental layers drew on WorldClim climate data, Environment Agency LiDAR, OS VectorMap District, and CEH land cover, among other public inputs documented in the toolchain. Models were fitted with a Maximum Entropy approach via `elapid`, close to the familiar MaxEnt package.

The pipeline grew from a study-specific path into a versioned CLI: separate steps for data rebuild, training, prediction and export, plus optional tracking of runs. Cross-validation methods and background-point sampling are configurable rather than hard-coded for one notebook.

The app shows relative suitability for nine of the ten bat species present in South Yorkshire, with roosting and in-flight surfaces where the modelling supported that split. The public about text is clear that the maps are model predictions, not a substitute for surveys or a formal records search.

## What worked

Having one contract between the modelling package and the visualiser made it possible to refresh layers and models without rewriting the map UI. Publishing the toolchain and the app separately kept the heavy data work offline while still giving the bat group something people could click through.

## Limits

The maps predict relative suitability. They do not confirm presence or absence. Areas of low suitability can still hold bats; high suitability is not a guarantee of occupancy. Many database records were too coarse or not species-specific enough to use in training, so gaps in the maps can reflect gaps in recording as much as habitat. The hosted app depends on a third-party Shiny host, so availability is not something I can promise from this site alone.

## Links

- Modelling toolchain: [github.com/MatthewJWhittle/shefflied-bats](https://github.com/MatthewJWhittle/shefflied-bats)
- Map app source: [github.com/MatthewJWhittle/sybg-hsm-app](https://github.com/MatthewJWhittle/sybg-hsm-app)
- Hosted map (when available): [matthewjwhittle.shinyapps.io/sybg-hsm](https://matthewjwhittle.shinyapps.io/sybg-hsm/)
- South Yorkshire Bat Group: [sybatgroup.org.uk](https://www.sybatgroup.org.uk/)
