---
title: Intelligent UK Habitat Mapping
summary: End-to-end Vision Transformer habitat mapping from aerial imagery — from proof of concept to live site use across nine upland sites, with ecologist QA.
date: 2024-09-01
status: shipped
tags: [geospatial, computer-vision, Azure ML]
featured: true
draft: true
figureId: habitat
---

## What was the problem?

Environmental assessments need UKHab-aligned habitat baselines. Manual mapping is slow; fully automated maps are not trusted without specialist review. The goal was a **semi-automated** pipeline that proposes habitat patches from aerial imagery and height models for ecologists to correct.

## What did I build?

At SLR I designed and built the Intelligent UK Habitat Mapping capability: imagery acquisition and tiling, training-data preparation (including dbt cleaning/tests), PyTorch segmentation (early U-Net exploration, later Vision Transformer / Mask2Former-related work), Azure Machine Learning experiments and GPU jobs, tiled inference, mosaicking and polygon vectorisation for GIS QA.

I started hands-on and later combined implementation with architecture and technical leadership of two developers. Fine-tuning data traced to **4,000+ hectares**. Live site use from September 2024 across **nine** upland/afforestation sites covering **over 2,000 hectares**, with ecologist QA. Automated tests approached **~480** in Azure DevOps by late 2025.

## How it works

1. Acquire high-resolution aerial imagery and height models under rate limits.
2. Curate and test labelled training data.
3. Train / fine-tune a segmentation model in Azure ML.
4. Run tiled raster inference, mosaic and vectorise outputs.
5. Hand polygons to GIS / ecology QA — the model proposes; specialists decide.

## Technical decisions

- Prefer cloud ML jobs and reproducible pipelines over ad-hoc notebooks for repeated project delivery.
- Keep specialist verification in the loop; do not claim a mature self-serve product.
- Invest in automated tests around the mapping project so changes stay reviewable.

## Evidence and boundaries

Proof of concept November 2023; live use from September 2024. Working semi-automated capability — **not** a finished self-serve product. No independently verified “90% time saving” claim is published here for the current architecture. Geographic variability and specialist QA remain part of the workflow.

## What I learnt

Shipping geospatial ML for consultants means treating QA, deployment and training data hygiene as first-class — not afterthoughts to the model.