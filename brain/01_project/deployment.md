---
title: Deployment Strategy & Operations
visibility: public
updated: 2026-10-08
source: owner-answers
---

# Deployment & Operations

## 1. Frontend & Backend Deployment (Vercel)
- **Host Platform:** Vercel
- **Frontend Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Backend API Deployment:** Express API deployed on Vercel Serverless Functions / Node environment connected to MongoDB Atlas.
- **Routing:** Configured via `vercel.json` SPA rewrite rules (`/(.*)` -> `/index.html`).
- **Domain & DNS:** Custom domain `bhola-yadav.com.np` configured via Vercel Nameservers (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`).

## 2. Database Hosting
- **Database:** MongoDB Atlas (Cloud Cluster).
- **RAG Capability:** MongoDB Atlas Vector Search supported for Phase 4 AI Assistant embeddings.
