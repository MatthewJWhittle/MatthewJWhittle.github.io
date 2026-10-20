---
title: Book Chain EUDR risk API
summary: FastAPI service for publishing-industry deforestation-risk due diligence — geospatial validation, risk screening and cloud deployment.
date: 2025-08-01
status: shipped
tags: [API, FastAPI, Azure]
featured: false
draft: true
figureId: api
---

## What was the problem?

Publishing supply chains needed geolocation and deforestation-risk checks for EUDR-style due diligence, with a path into an existing Book Chain platform.

## What did I build?

I led design and implementation of the risk API: requirements workshops and sprint planning, plus direct Python engineering (FastAPI, PostgreSQL/Alembic, Docker, Azure Container Apps, authenticated endpoints, GeoJSON validation, Global Forest Watch Pro–style risk screening integration, asynchronous processing, CI/CD). Around **170 automated tests** were reported by November 2025. Other engineers and domain experts contributed.

## How it works

Clients submit authenticated geospatial payloads; the service validates geometry, runs risk screening and returns structured results suitable for platform integration. Async processing keeps large checks off the request path.

## Technical decisions

- API-first integration rather than a one-off GIS script.
- Containerised Azure deploy with automated tests as a gate.
- Keep human due diligence in the product story — the API supports review, it does not replace it.

## Evidence and boundaries

Discovery/proposal in 2024; alpha/beta through mid-2025; platform integration reported from August 2025. **Wider production adoption and release status are still being verified** — this case study describes delivered engineering, not market uptake.

## What I learnt

Regulatory products need clear boundaries between what the software asserts and what a human must still decide.