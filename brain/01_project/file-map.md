---
title: File Map
visibility: public
updated: 2026-10-08
source: codebase
---

# File Map

| Path | Purpose |
|---|---|
| `src/App.tsx` | Main application routes and page lazy loading setup |
| `src/main.tsx` | Entrypoint mounting React root |
| `src/pages/Home.tsx` | Home landing page combining portfolio sections |
| `src/pages/MyWorkPage.tsx` | Public dynamic "My Work" CMS grid page |
| `src/pages/ProjectDetailPage.tsx` | Reusable dynamic case study page (`/my-work/:slug`) |
| `src/pages/AdminDashboard.tsx` | Protected Admin dashboard tabs |
| `src/pages/AdminLogin.tsx` | Admin login page |
| `src/components/ProjectCard.tsx` | Reusable project card (vertical mobile, horizontal desktop) |
| `src/components/Navbar.tsx` | Top navigation bar with active section highlighting |
| `src/components/SEO.tsx` | Head metadata, OpenGraph, and JSON-LD structured data |
| `src/components/admin/ProjectManager.tsx` | Multi-tab Admin CMS editor for projects |
| `src/lib/api.ts` | API client methods and React Query hooks |
| `src/lib/initialData.ts` | Fallback data definitions and TypeScript interfaces |
| `server/index.js` | Express server entrypoint & static upload mounting |
| `server/db.js` | MongoDB Mongoose connection handler |
| `server/models.js` | Mongoose schemas (Admin, Profile, Project, Experience, Skill, etc.) |
| `server/seed.js` | Database seed script for default portfolio content |
| `server/middleware/auth.js` | JWT authorization middleware |
| `server/routes/projects.js` | Public & protected CRUD endpoints for Projects |
| `server/routes/upload.js` | Base64 file upload endpoint |
| `server/routes/auth.js` | Login & session verification endpoints |
| `server/routes/*.js` | Endpoints for profile, skills, education, experiences, messages, certifications |
