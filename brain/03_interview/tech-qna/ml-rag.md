---
title: ML & RAG Q&A
visibility: public
updated: 2026-10-08
source: manual
---

# ML & RAG Q&A

### Q1: What is Retrieval-Augmented Generation (RAG)?
RAG enhances LLM responses by retrieving relevant external context chunks from a vector database using semantic similarity search (cosine distance / HNSW) and injecting them into the LLM system prompt.

### Q2: How do vector embeddings work?
Embedding models map text chunks into high-dimensional vector spaces where semantically similar text passages have smaller angular distances (higher cosine similarity).
