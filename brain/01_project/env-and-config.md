---
title: Environment Variables & Configurations
visibility: public
updated: 2026-10-08
source: .env files & Dockerfile
---

# Environment Variables & Configuration

> **Note:** Never commit secret values into documentation.

## Frontend Environment Variables (`.env`)
- `VITE_API_URL`: Base API endpoint URL used by `src/lib/api.ts` (e.g. `http://localhost:5000/api` or production URL).

## Backend Environment Variables (`server/.env`)
- `MONGODB_URI`: Connection string for MongoDB Atlas database.
- `JWT_SECRET`: Secret key used for signing & verifying admin session JWTs.
- `PORT`: Server port (default: 5000).
- `ADMIN_EMAIL`: Default admin email address used during database seed.
- `ADMIN_PASSWORD`: Default admin password used during database seed.

## Build & Docker Configurations
- `Dockerfile`: Multi-stage build (Node 20 Alpine -> Nginx Alpine). Accepts `VITE_API_URL` build argument.
- `docker-compose.yml`: Launches `backend` (Express) on port 5000 and `frontend` (Nginx) on port 8082.
- `vercel.json`: Single Page Application (SPA) rewrite rule routing all paths to `/index.html`.
