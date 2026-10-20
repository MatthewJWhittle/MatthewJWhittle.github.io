---
title: Camera-trap video triage
summary: SpeciesNet-assisted triage that shortlisted wildlife footage for expert review across a large camera study.
date: 2025-06-01
status: shipped
tags: [computer-vision, ecology]
featured: false
draft: true
figureId: triage
---

## What was the problem?

Large camera-trap deployments produce more video than specialists can watch. Experts need to spend time on clips that are likely to contain animals of interest.

## What did I build?

I led initial pipeline/prototype work and technical delivery for a SpeciesNet-based triage workflow: video/frame processing, cloud ML workflows and expert verification loops. Shared implementation with colleagues.

## How it works

Clips are scored for likely animal presence; a threshold routes a shortlist to specialists. Species-level identification stays with experts — the system is triage, not an ID oracle.

## Evidence and boundaries

Client study: **60 cameras** across about **260 km²**. Reviewed **8,924 videos**; shortlisted approximately **1,600** for expert attention (reports also identify primate-positive counts). This measures triage performance, **not** reliable automated species identification.

## What I learnt

For ecological ML, the useful product boundary is often “which footage deserves a human”, not “replace the human”.