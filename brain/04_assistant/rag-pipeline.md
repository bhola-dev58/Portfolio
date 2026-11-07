---
title: RAG Pipeline Design
visibility: public
updated: 2026-10-08
source: owner-answers
---

# RAG Pipeline Architecture

## 1. Chunking & Compilation
- Script: `npm run brain:build` (`brain/scripts/build-knowledge.mjs`).
- Parses markdown files by `##` headings into 300-500 token chunks.
- Outputs `knowledge/public.jsonl` and `knowledge/private.jsonl`.

## 2. Embedding & Vector Search
- **Embedding Provider:** Gemini text-embedding-004 / OpenAI `text-embedding-3-small`.
- **Vector Database:** MongoDB Atlas Vector Search index on a dedicated `knowledge_chunks` collection.
- **Filtering:** In Visitor mode, queries filter out any documents with `visibility: 'private'` BEFORE performing vector search.

## 3. Retrieval Flow
1. User sends message -> `POST /api/assistant/chat`.
2. Generate embedding for query vector.
3. Perform cosine similarity vector search in MongoDB Atlas Vector Search (Top 5 chunks).
4. Inject retrieved context chunks into system prompt with source file citations.
5. Stream completion back to client interface.
