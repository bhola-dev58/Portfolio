---
title: Routes and API Endpoints
visibility: public
updated: 2026-10-08
source: App.tsx & server/routes/
---

# Routes & API Endpoints

## Frontend Routes (`src/App.tsx`)

| Path | Access | Purpose |
|---|---|---|
| `/` | Public | Home landing page (Hero, About, Skills, Projects, Experience, Contact) |
| `/about` | Public | About page |
| `/internship` | Public | Internship history & experience details |
| `/projects` | Public | Legacy projects overview page |
| `/my-work` | Public | Dynamic CMS-driven project portfolio page |
| `/my-work/:slug` | Public | Dynamic case study detail page |
| `/contact` | Public | Contact form page |
| `/admin/login` | Public | Admin authentication page |
| `/admin/dashboard` | Protected (JWT) | Admin CMS control panel |

## Backend API Endpoints (`server/routes/`)

| Method / Path | Auth? | Purpose | File |
|---|---|---|---|
| `POST /api/auth/login` | Public | Authenticate admin & return JWT | `server/routes/auth.js` |
| `GET /api/auth/session` | Bearer Token | Verify JWT session validity | `server/routes/auth.js` |
| `GET /api/projects` | Public | Get all published projects | `server/routes/projects.js` |
| `GET /api/projects/:slug` | Public | Get single project by slug | `server/routes/projects.js` |
| `GET /api/projects/admin/all` | Admin JWT | Get all projects (Draft/Published/Archived) | `server/routes/projects.js` |
| `POST /api/projects` | Admin JWT | Create new project | `server/routes/projects.js` |
| `PUT /api/projects/:id` | Admin JWT | Update existing project | `server/routes/projects.js` |
| `DELETE /api/projects/:id` | Admin JWT | Delete project by ID | `server/routes/projects.js` |
| `PATCH /api/projects/:id/publish` | Admin JWT | Toggle publication status | `server/routes/projects.js` |
| `PATCH /api/projects/:id/featured` | Admin JWT | Toggle featured status | `server/routes/projects.js` |
| `POST /api/projects/reorder` | Admin JWT | Reorder projects array | `server/routes/projects.js` |
| `POST /api/upload` | Admin JWT | Upload image (returns URL) | `server/routes/upload.js` |
| `GET /api/profile` | Public | Fetch profile information | `server/routes/profile.js` |
| `PUT /api/profile/:id` | Admin JWT | Update profile details | `server/routes/profile.js` |
| `GET /api/skills` | Public | Fetch skills categories | `server/routes/skills.js` |
| `POST/PUT/DELETE /api/skills` | Admin JWT | Manage skills | `server/routes/skills.js` |
| `GET /api/experiences` | Public | Fetch work experience records | `server/routes/experiences.js` |
| `POST/PUT/DELETE /api/experiences` | Admin JWT | Manage experience records | `server/routes/experiences.js` |
| `GET /api/certifications` | Public | Fetch certifications | `server/routes/certifications.js` |
| `POST/PUT/DELETE /api/certifications` | Admin JWT | Manage certifications | `server/routes/certifications.js` |
| `GET /api/education` | Public | Fetch education records | `server/routes/education.js` |
| `POST/PUT/DELETE /api/education` | Admin JWT | Manage education records | `server/routes/education.js` |
| `POST /api/messages` | Public | Submit contact form message | `server/routes/messages.js` |
| `GET/DELETE /api/messages` | Admin JWT | View/delete contact messages | `server/routes/messages.js` |
