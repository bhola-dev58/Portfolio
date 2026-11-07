---
title: System Design Framework
visibility: public
updated: 2026-10-08
source: manual
---

# System Design Framework & Cheat Sheets

## 8-Step System Design Approach
1. **Requirements Clarification:** Functional & Non-functional requirements (throughput, latency, availability).
2. **Back-of-the-Envelope Estimation:** Storage, bandwidth, read/write QPS.
3. **API Definition:** REST / gRPC contract design.
4. **Data Model & Storage:** SQL vs NoSQL selection.
5. **High-Level Design:** Client -> CDN -> Load Balancer -> Service -> DB.
6. **Deep Dive:** Bottlenecks, caching, queues.
7. **Resilience & Scaling:** Partitioning, replication, rate limiting.
8. **Tradeoff Analysis:** CAP theorem choices & cost optimization.

## Quick Cheat Sheets

### 1. LMS System (Smart Coach Style)
- **Key Modules:** User Auth, Course Catalog, Video API, Payment Gateway, Enrollment Engine.
- **Scaling:** CDN for video delivery, read-replicas for course catalog queries.

### 2. URL Shortener
- **Key Modules:** Base62 Encoding, Key Generation Service (KGS), Redis Cache.
- **Scaling:** High read-to-write ratio (100:1), aggressive Redis caching.

### 3. Real-Time Chat App
- **Key Modules:** WebSocket Gateway, Session Manager, Push Notification Service.
- **Scaling:** Stateful WebSocket connections managed by Redis Pub/Sub.

### 4. RAG Chatbot
- **Key Modules:** Document Ingestion, Chunker, Embedding Model, Vector DB, LLM Generator.
- **Scaling:** Asynchronous ingestion pipelines, vector similarity index tuning.
