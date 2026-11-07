---
title: Project Deep Dives
visibility: public
updated: 2026-10-08
source: manual
---

# Project Technical Deep Dives

## 1. Smart Coach LMS
- **Q1: Why monorepo/monolith over microservices?**
  - *Answer:* For an initial user base of ~100-1000 students, a monolithic Express server with clear modular routes reduces operational complexity and deployment overhead significantly.
- **Q2: How do you handle payment webhook security?**
  - *Answer:* Razorpay webhook signatures are verified using HMAC SHA256 signature verification before updating the MongoDB enrollment document.

## 2. CareMate-AI
- **Q1: How do you prevent medical hallucinations?**
  - *Answer:* Custom system prompts explicitly restrict the model to non-diagnostic informational summaries and append mandatory medical disclaimer footers.
- **Q2: How does the caching layer work?**
  - *Answer:* Normalized query text is hashed and checked against local memory/SQLite cache before initiating Gemini API requests.

## 3. JLiveChats
- **Q1: How does TCP socket multi-threading handle scale?**
  - *Answer:* A fixed thread pool manages client connections to prevent thread exhaustion under high concurrent connection spikes.
