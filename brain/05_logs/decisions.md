---
title: Architectural Decision Records (ADR)
visibility: public
updated: 2026-10-08
source: manual
---

# Architecture Decision Records (ADR)

## ADR-001: Sole Database Choice (MongoDB Atlas)
- **Date:** 2026-10-08
- **Decision:** Use MongoDB Atlas as the single source of truth for all dynamic portfolio data.
- **Why:** Supabase file `src/lib/supabase.ts` was confirmed unused by owner; MongoDB Mongoose models manage all entity collections.

## ADR-002: Knowledge Base Ingestion
- **Date:** 2026-10-08
- **Decision:** Built `brain/scripts/build-knowledge.mjs` script to parse markdown front matter and headings into `public.jsonl` and `private.jsonl`.
- **Why:** Enables simple context stuffing or lightweight vector ingestion for Phase 4 AI Assistant.

## ADR-003: LLM & Vector Search Infrastructure
- **Date:** 2026-10-08
- **Decision:** Use Gemini API / OpenAI free tier for LLM completions and MongoDB Atlas Vector Search on the cloud cluster for vector embeddings.
- **Why:** Confirmed by owner answers; leverages existing MongoDB Atlas infrastructure without adding third-party database overhead.
