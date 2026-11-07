---
title: Known Issues & Technical Debt
visibility: public
updated: 2026-10-08
source: SPEC 1.4
---

# Known Issues & Technical Debt

| Issue | Status | Action / Recommendation |
|---|---|---|
| `server/node_modules/` location | `open` | Verify `.gitignore` entry. Ensure it is not committed to git repository. |
| `dist/` directory in repo | `open` | Ensure `dist/` is listed in `.gitignore` to prevent committing build artifacts. |
| Multiple lockfiles (`bun.lockb` & `package-lock.json`) | `open` | Standardize package manager to `npm` (`package-lock.json`). |
| Vercel backend hosting limitation | `open` | Vercel serves static frontend; Express backend requires node server host (Render, Railway, VPS, Docker). |
| `src/lib/supabase.ts` dead code | `open` | MongoDB is the sole database. `src/lib/supabase.ts` and `@supabase/supabase-js` can be removed after owner approval. |
| Folder name with space (`screenshot of output/`) | `open` | Propose renaming folder to `screenshots/` for clean CLI handling. |
