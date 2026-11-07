---
title: Project Conventions
visibility: public
updated: 2026-10-08
source: codebase
---

# Development & Architectural Conventions

## 1. Naming & Formatting
- **React Components:** PascalCase filenames (e.g. `ProjectCard.tsx`, `MyWorkPage.tsx`).
- **Styles:** Tailwind CSS utility classes used in `className` props. External CSS files for custom global utilities.
- **Git Commits:** `<type>: <short description>` (e.g. `feat: add student placement dashboard`, `fix: resolve authentication redirect`).

## 2. Component Structure
- Lazy loading for page-level components using React `lazy` and `Suspense` in `src/App.tsx`.
- Reusable UI primitives isolated in `src/components/ui/` (shadcn/ui based).
- Standalone feature components in `src/components/`.

## 3. Data Fetching & Mutations
- React Query (`@tanstack/react-query`) handles query caching and state synchronization.
- Fetch methods defined in `src/lib/api.ts`.
- Bearer JWT passed in `Authorization` header for protected endpoints.
