---
title: Agent Architecture & Design
visibility: public
updated: 2026-10-08
source: owner-answers
---

# AI Assistant Agent Design

## Overview
A dual-mode AI assistant agent built into the portfolio. It shares a single core knowledge brain (`brain/`) but enforces strict privacy boundaries between visitor and owner modes.

| Mode | Target User | Data Access | Location | Authentication |
|---|---|---|---|---|
| **Visitor Mode** | Recruiters, clients, visitors | `public.jsonl` only | Floating widget on public layout | None (Rate limited) |
| **Owner Mode** | Bhola Yadav | `public.jsonl` + `private.jsonl` | `/admin/assistant` dashboard page | Admin JWT auth |

## LLM Provider & Infrastructure
- **LLM Provider:** Gemini API (free tier) / OpenAI free tier / Local LLM options.
- **Vector Search Engine:** MongoDB Atlas Vector Search (since database is MongoDB Atlas Cloud).
- **Backend Entrypoint:** Express server routes (`server/routes/assistant.js`).
