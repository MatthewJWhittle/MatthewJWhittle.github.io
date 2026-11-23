---
title: Modelling bat habitat suitability across Yorkshire
summary: Finding useful ecological patterns in decades of bat records, rather than treating them as isolated points on a map.
startedYear: 2023
tags: [ecology, geospatial, machine-learning]
featured: true
draft: false
repositoryUrl: https://github.com/MatthewJWhittle/shefflied-bats
demoUrl: https://hsm-dashboard-dev.web.app/
demoLabel: Development dashboard
---

## Beyond dots on a map

When I worked as an ecologist, I'd often read desk studies containing lists and maps of species records: a bat recorded in a field five years ago, or a roost found in a building nearby. Those observations matter, particularly when a protected roost is involved. But I kept wondering what they actually told us about the wider landscape. Why should a record from five years ago make one place more important than another? And what could we say about somewhere nobody had looked?

Bat groups and records centres have spent decades building up these datasets, much of it through volunteer effort. Yet the records are often used fairly simply: find what's nearby, put it on a map and describe it. I always felt we were missing something.

I've been interested for years in how to get more meaningful insight out of this kind of data. Individually, records can be difficult to interpret. Collectively, they ought to contain information about the environments species use and where similar habitat might exist elsewhere. Extracting that signal takes environmental data, modelling skills and a careful understanding of how the records were collected.

**I think this should become a more routine part of ecological consultancy**, rather than something reserved for occasional specialist studies. This project is one attempt to explore what that could look like, starting with bats.

## Starting in South Yorkshire

There was already a foundation to build on. In 2020, Rob Bell and South Yorkshire Bat Group developed habitat suitability models for Sheffield using dedicated surveys.

In 2023, Greg Slack and I began exploring a different question: could we use the bat group's existing records to predict habitat suitability across South Yorkshire, without having to run an entirely new survey programme?

Greg led much of the work reviewing records and distinguishing roosting from in-flight observations. We selected environmental variables and reviewed the results together, while I developed the modelling workflow in Python.

By 2024 we'd produced predictions for nine bat species, separating roosting and in-flight activity where there were enough observations. I also built an interactive map so the bat group and local ecologists could explore the outputs without running the models themselves. That [original South Yorkshire application](https://matthewjwhittle.shinyapps.io/sybg-hsm/) remains an earlier snapshot of the work.

## The difficulty with presence-only data

Bat records aren't a systematic survey of the landscape. Some places have been visited repeatedly, while others have barely been surveyed. Records tend to cluster around accessible locations, known roosts and the places where active volunteers live or work.

So if a model sees a lot of records near a town, is it learning that the town has good habitat, or just that people have looked there more often?

We use Maximum Entropy (MaxEnt) modelling, implemented in Python with [elapid](https://earth-chris.github.io/elapid/). It can work with observations of presence and a set of background locations, rather than needing reliable records of absence.

But the choice of background locations matters. I developed an approach that uses the distribution of bat records across species as an approximate measure of recording effort, so the model's comparisons better reflect where people are likely to have looked. It's not a complete solution to survey bias, and it doesn't tell us where a species is absent. It does help us ask a more useful question about the relationship between the records and the habitat.

## Extending the modelling across Yorkshire

Towards the end of 2024, we started working with neighbouring bat groups and records centres. The 2025 expansion brought together records from South, West, North and East Yorkshire Bat Groups and the North and East Yorkshire Ecological Data Centre.

That meant bringing independently maintained datasets into a common format, checking locations and species identifications, and being selective about which records were precise enough to use. We also assembled a much larger set of environmental variables covering land cover, water, buildings, vegetation structure, climate and terrain, aligned to a 100-metre grid.

The modelling became more automated as well. I built an optimisation process to test different sets of predictors and model parameters, balancing predictive performance with complexity and consistency across geographic validation areas.

The automated part only gets us so far. A model can score well while learning a relationship that doesn't make much ecological sense. Greg and I have spent a lot of time looking at response curves and spatial predictions, trying to understand unexpected patterns and deciding when a statistically useful variable might just be a proxy for something else.

## What the models show

The models produce maps of **relative habitat suitability** for individual species and, where the data supports it, for roosting and in-flight activity separately.

These two examples come from the model set exported on 2 November 2026. They illustrate the different spatial patterns the models identify; they're not maps of observed bats. Suitability scores are specific to each model, so values shouldn't be compared directly between species.

<figure class="hsm-map">
  <a href="/images/hsm/yorkshire-daubentons-in-flight-2026.png" target="_blank" rel="noopener noreferrer" aria-label="Open the full-size Daubenton's bat suitability map">
    <img src="/images/hsm/yorkshire-daubentons-in-flight-2026.png" alt="Continuous predicted suitability for Daubenton's bats in flight across Yorkshire, with higher values concentrated along waterways and some valley corridors." loading="lazy" decoding="async" width="960" height="835" />
  </a>
  <figcaption>Daubenton's bat, in flight. A dated prediction from the November 2026 model set; no individual occurrence locations are shown.</figcaption>
</figure>

<figure class="hsm-map">
  <a href="/images/hsm/yorkshire-noctule-roost-2026.png" target="_blank" rel="noopener noreferrer" aria-label="Open the full-size noctule roost suitability map">
    <img src="/images/hsm/yorkshire-noctule-roost-2026.png" alt="Continuous predicted noctule roost habitat suitability across Yorkshire, showing a different and more widespread pattern of higher suitability." loading="lazy" decoding="async" width="960" height="835" />
  </a>
  <figcaption>Noctule, roosting suitability. The same dated model export, showing a different pattern across the region. The maps are illustrative model outputs, not confirmation of bat presence.</figcaption>
</figure>

The work could provide wider landscape context for ecological assessments, help explore potentially important habitats and suggest where additional survey effort might be useful. It's not a substitute for field surveys, ecological judgement or a formal records search. The results depend on the records and environmental datasets we have, and some species have too few reliable observations for confident interpretation.

Greg and I presented the Yorkshire work at the **North of England Bat Conference in March 2026**, in a talk called *From bat records to predictive maps*. The modelling and ecological review have continued since then.

## Making the results easier to explore

I've been working on a new interface for the Yorkshire models. The [Yorkshire HSM dashboard (development version)](https://hsm-dashboard-dev.web.app/) is the current place to explore that work. It's a development build rather than a finished public release, so features and results may change.

What interests me most isn't simply putting a raster on a map. It's making the predictions easier to interrogate: what environmental conditions are associated with higher suitability here, how does that vary between species, and where is the evidence still weak?

There's still plenty to work through, including ecological review of the newer models and how best to combine predictions across species. But the underlying idea hasn't changed. We put an enormous amount of effort into collecting ecological records. I think we should be doing much more with what they can tell us.

## Links

- [Yorkshire HSM dashboard — development version](https://hsm-dashboard-dev.web.app/)
- [Modelling code](https://github.com/MatthewJWhittle/shefflied-bats)
- [Original South Yorkshire map](https://matthewjwhittle.shinyapps.io/sybg-hsm/)
- [South Yorkshire Bat Group](https://www.sybatgroup.org.uk/)
