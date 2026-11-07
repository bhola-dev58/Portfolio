---
title: CareMate-AI
visibility: public
updated: 2026-10-08
source: seed.js
---

## One line
AI healthcare assistant powered by Google Gemini API providing real-time response to medical queries with caching and voice support.

## Problem
Patients and users frequently struggle to obtain quick, reliable clarification on medical terminology or preliminary symptom information without navigating complex medical search engines.

## My role
AI & Full Stack Engineer.

## Stack
Python, Google Gemini API, Streamlit, SpeechRecognition, SQLite, REST APIs.

## Architecture (3 to 6 bullets)
- Streamlit interactive frontend with dynamic state management.
- In-memory query hash map caching layer to minimize LLM token consumption.
- Google Generative AI SDK connection with custom prompt engineering.
- Audio input recognition module using SpeechRecognition.

## Hard parts and how I solved them
- **Challenge:** Managing API rate limits and reducing latency for repetitive general health queries.
- **Solution:** Developed a local query hash caching system storing previous non-personalized medical guidance answers, reducing API calls by 30%.

## Results / metrics
Reduced repetitive LLM API latency by 30% and improved chat user engagement by 40%.

## Links
- Live: `TODO(ASK)`
- Repo: `https://github.com/bhola-dev58/CareMate-AI`

## Interview talking points (3 bullets)
- Prompt engineering guardrails enforcing mandatory medical disclaimers.
- In-memory caching hash table for frequent LLM queries.
- Voice-to-text integration for accessible user interactions.

## Weak spots an interviewer may probe
- Medical accuracy risks & hallucination prevention.
- Streamlit scalability limitations for concurrent web users.
