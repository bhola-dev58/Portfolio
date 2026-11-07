# PORTFOLIO BRAIN SPEC (for Antigravity IDE)

> Give this file to Antigravity as the first message: "Read PORTFOLIO_BRAIN_SPEC.md fully, then execute Phase 0 to Phase 3. Ask me only what is marked ASK."

Owner: Bhola Yadav
Live site: https://bhola-yadav.vercel.app/
Goal: Create a `brain/` folder in this repo so any future AI session can understand the project and the owner in minutes, without re-scanning the codebase. Later, build an AI assistant agent on top of this brain (LLM + RAG).

---

## 0. HARD RULES (read first, saves credits)

1. NEVER scan, read, or index these: `node_modules/`, `server/node_modules/`, `dist/`, `bun.lockb`, `package-lock.json`, `server/package-lock.json`, `src/components/ui/` (shadcn generated), `src/assets/certificates/*` binaries.
2. Do not open a file unless this spec or `brain/01_project/file-map.md` says it matters for the current task.
3. Everything below marked "PRE-ANALYZED" came from the directory tree. Trust it. Only verify items marked `(verify)`, and verify by reading ONLY the file named.
4. Do not rewrite existing source code in Phase 0 to 2. This job is documentation and structure only.
5. Keep every brain file short, factual, and scannable. Prefer tables and bullets. Max about 150 lines per file. If bigger, split.
6. No marketing language. Write like notes to a smart friend.
7. If a fact is unknown, write `TODO(ASK)` instead of guessing. Never invent experience, dates, or numbers about the owner.
8. After finishing any future task in this repo, update `brain/05_logs/session-log.md` (3 lines max) and any brain file that became wrong.

---

## 1. PRE-ANALYZED PROJECT FACTS (from tree, do not re-discover)

### 1.1 Stack (from files present)
| Layer | What the tree shows |
|---|---|
| Frontend | Vite + React + TypeScript (`vite.config.ts`, `main.tsx`, `App.tsx`) |
| UI | Tailwind (`tailwind.config.ts`, `postcss.config.js`) + shadcn/ui (`components.json`, `src/components/ui/*`) |
| 3D / effects | Three.js (`ThreeBackground.tsx`, `three-vendor` chunk), `AnimatedBackground.tsx`, `CustomCursor.tsx`, `JQueryEffect.tsx` |
| Routing / pages | `src/pages/*` (Home, About, Projects, ProjectDetail, MyWork, Internship, Contact, AdminLogin, AdminDashboard, NotFound) |
| Backend | Node + Express in `server/` (`index.js`, `db.js`, `models.js`, `middleware/auth.js`, `routes/*`, `seed.js`) |
| DB | **MongoDB (confirmed by owner).** Single source of truth. Models in `server/models.js`, connection in `server/db.js` |
| Auth | JWT + bcryptjs likely for admin login `(verify in server/middleware/auth.js)` |
| Leftover | `src/lib/supabase.ts` exists but the owner confirmed the project does NOT use Supabase. Treat as dead code, see Issues |
| Deploy | Vercel (`vercel.json`), plus Docker path (`Dockerfile`, `docker-compose.yml`, `nginx.conf`, `docker-run.sh`, `docker-stop.sh`) |
| Package managers | `package.json` + `package-lock.json` and also `bun.lockb` (two lockfiles, pick one, see Issues) |

### 1.2 App structure
- **Public pages:** Home, About, Projects, ProjectDetail, MyWork, Internship, Contact
- **Admin:** AdminLogin to AdminDashboard (protected by `ProtectedRoute.tsx`)
- **Admin managers (CRUD UI):** Certification, Education, Experience, Message, Profile, Project, Skills
- **Public section components:** Hero, About, Skills, Projects, ProjectCard, Experience, Certifications, Contact, Navbar, Footer, Layout, SEO
- **API client + seed data on frontend:** `src/lib/api.ts`, `src/lib/initialData.ts`
- **Backend routes (one file each):** auth, certifications, education, experiences, messages, profile, projects, skills, upload

### 1.3 Important insight
The portfolio ALREADY has a structured database of the owner's profile, education, experience, skills, projects and certifications (admin CRUD + `server/seed.js` + `src/lib/initialData.ts`). Use these as the SOURCE to auto-generate `brain/02_person/*`. Do not ask the owner to retype data that already exists there.

### 1.4 Known issues to document and propose fixes for (do NOT auto-fix)
1. `server/node_modules/` is inside the repo tree. Confirm it is in `.gitignore`. If tracked by git, propose `git rm -r --cached server/node_modules`.
2. `dist/` is in the repo. Confirm ignored or intentionally committed.
3. Two lockfiles (`bun.lockb`, `package-lock.json`). Pick one package manager and document it.
4. Vercel hosts static frontend well but cannot keep an Express server running. `(verify)` where `server/` is deployed (Render, Railway, VPS, Docker, or Vercel serverless) and what `VITE_API_URL` or equivalent points to. Document in `brain/01_project/deployment.md`.
5. `src/lib/supabase.ts` is a leftover. Owner confirmed data is MongoDB only. Grep for `supabase` imports (`src/` and `package.json`). If unused, propose deleting the file and removing `@supabase/supabase-js` from dependencies. Do not delete without owner approval.
6. Screenshot folder name has spaces (`screenshot of output/`). Suggest renaming to `screenshots/`.

---

## 2. TARGET STRUCTURE

Create exactly this under the project root:

```text
brain/
├── README.md                  # index + how to use this brain (<= 60 lines)
├── 00_AGENT_RULES.md          # rules for ANY AI working in this repo
├── 01_project/                # the codebase, pre-digested
│   ├── overview.md            # what the site is, goals, live URL
│   ├── architecture.md        # diagram (mermaid) + data flow
│   ├── tech-stack.md          # versions pulled from package.json
│   ├── file-map.md            # folder to purpose table (no node_modules)
│   ├── routes-and-api.md      # frontend routes + backend endpoints + auth
│   ├── data-models.md         # Mongo models / schemas (from server/models.js)
│   ├── env-and-config.md      # env var NAMES only, never values
│   ├── deployment.md          # how it is deployed, step by step, rollback
│   ├── conventions.md         # naming, styling, component patterns
│   └── known-issues.md        # section 1.4 above, with status
├── 02_person/                 # who Bhola is (source of truth for the agent)
│   ├── identity.md
│   ├── education.md
│   ├── skills.md              # grouped + proficiency + evidence project
│   ├── experience.md
│   ├── certifications.md
│   ├── career-goals.md
│   ├── current-status.md      # what he is doing now (update monthly)
│   ├── voice-and-style.md     # how he speaks, languages, tone
│   └── projects/
│       ├── _template.md
│       └── <one file per project>.md
├── 03_interview/              # interview prep material
│   ├── self-intro-variants.md # 30s, 60s, 2min
│   ├── star-stories.md        # Situation/Task/Action/Result stories
│   ├── project-deep-dives.md  # per project: problem, design, tradeoffs, metrics
│   ├── system-design/
│   │   ├── framework.md       # step-by-step method to answer any design question
│   │   └── own-systems.md     # design walkthrough of his own projects
│   ├── tech-qna/              # one file per stack: react.md, node.md, mongo.md, python.md, ml-rag.md, sql.md, dsa.md
│   ├── hr-questions.md
│   └── company-prep/_template.md
├── 04_assistant/              # plan + code contracts for the AI agent
│   ├── agent-design.md
│   ├── rag-pipeline.md
│   ├── prompts/
│   │   ├── public-visitor.system.md
│   │   └── private-owner.system.md
│   ├── tools.md               # actions the agent may take
│   └── eval-questions.md      # 30 test questions with expected facts
├── 05_logs/
│   ├── session-log.md         # newest first, 3 lines per session
│   └── decisions.md           # ADR style: date, decision, why
├── knowledge/                 # GENERATED, do not hand edit
│   ├── public.jsonl           # chunks safe for visitors
│   └── private.jsonl          # chunks for owner only
└── scripts/
    └── build-knowledge.mjs    # reads brain/*.md, chunks, writes knowledge/*.jsonl
```

### 2.1 Privacy split (important)
Every `02_person/*` and `03_interview/*` file starts with front matter:

```yaml
---
title: Skills
visibility: public        # public | private
updated: YYYY-MM-DD
source: seed.js | manual | resume
---
```

- `public`: safe for any recruiter or visitor (skills, projects, education, public contact).
- `private`: salary expectations, rejection history, weak areas, personal notes, interview strategy, anything the owner would not put on the website.
- `knowledge/private.jsonl` must NEVER be bundled into the frontend, never committed to a public repo if the repo is public, and only served behind admin auth.
- Add `brain/knowledge/private.jsonl` and `brain/**/*private*` to `.gitignore` if the repo is public. Ask the owner (ASK-1).

---

## 3. EXECUTION PLAN

### Phase 0: Setup (cheap, do first)
- [ ] Check `.gitignore` covers `node_modules`, `dist`, `.env*`, `brain/knowledge/private.jsonl`. Add missing lines.
- [ ] Create the full `brain/` skeleton from section 2 (empty files with front matter + headings only).
- [ ] Write `brain/README.md` and `brain/00_AGENT_RULES.md` (content in section 5 and section 0 of this spec).

### Phase 1: Project brain (`01_project/`)
Read ONLY these files, nothing else:
`package.json`, `server/package.json`, `vite.config.ts`, `vercel.json`, `Dockerfile`, `server/Dockerfile`, `docker-compose.yml`, `nginx.conf`, `server/index.js`, `server/db.js`, `server/models.js`, `server/middleware/auth.js`, `server/routes/*.js` (skim for endpoints), `src/App.tsx`, `src/main.tsx`, `src/lib/api.ts`, `DEPLOYMENT_GUIDE.md`, `README.md`. For Supabase, only run a text search for `supabase` to confirm it is unused. Do not read the file.

Then fill all `01_project/*` files. Rules:
- `tech-stack.md`: exact versions from package.json in a table.
- `routes-and-api.md`: table of `METHOD /path | auth? | purpose | file`.
- `data-models.md`: each collection with fields and types.
- `env-and-config.md`: variable NAMES found in code (`process.env.X`, `import.meta.env.X`), purpose, where set (Vercel / Docker / local). No values.
- `architecture.md`: one mermaid diagram (browser, Vercel, API server, DB, storage) + 5 line request flow for "load Projects page" and "admin adds project".
- `known-issues.md`: section 1.4 with `status: open|fixed|wontfix`.

### Phase 2: Person brain (`02_person/`)
1. Read `server/seed.js` and `src/lib/initialData.ts` (the existing data). Generate `education.md`, `skills.md`, `experience.md`, `certifications.md`, and one `projects/<name>.md` per project from them.
2. Read `src/assets/certificates/README.md` and the filenames in that folder for `certifications.md` (do not open the PDFs).
3. Resume: parse `src/assets/resume/My_Resume.pdf` once (text only) to cross-check dates and wording. Report mismatches between resume and seed data in `brain/05_logs/decisions.md`.
4. Pre-filled seed facts (use as-is, mark `source: owner`):
   - Name: Bhola Yadav
   - Final-year CSE student, CMR Institute of Technology (CMRIT), Bengaluru (VTU), graduating 2027
   - Focus: full-stack (MERN) + AI/ML (Python, FastAPI, LangChain, RAG, TensorFlow, generative AI)
   - Works independently on client projects under the name Ozeonix Infinity (not a registered company), clients in Nepal and Bengaluru, plus Upwork freelance
   - Based between Bengaluru (studies) and Bhairahawa, Nepal (home)
   - Languages: English, Hindi, Nepali
   - Contact: bhola.dev58@gmail.com, WhatsApp +91-9198709984 (confirm these are OK as `public`, ASK-2)
5. For every project file use `projects/_template.md`:
   ```markdown
   ---
   title:
   visibility: public
   updated:
   source:
   ---
   ## One line
   ## Problem
   ## My role
   ## Stack
   ## Architecture (3 to 6 bullets)
   ## Hard parts and how I solved them
   ## Results / metrics (only real numbers, else TODO(ASK))
   ## Links (live, repo)
   ## Interview talking points (3 bullets)
   ## Weak spots an interviewer may probe
   ```
6. Collect every `TODO(ASK)` into one list in `brain/05_logs/open-questions.md` and ask the owner ONCE, in one message, at the end of the phase. Do not ask question by question.

### Phase 3: Interview brain (`03_interview/`)
Generate from the person brain (no new facts):
- `self-intro-variants.md`: 30s, 60s, 2 min, for internship and for full-time.
- `star-stories.md`: 6 stories from real projects. Mark any missing metric as `TODO(ASK)`.
- `project-deep-dives.md`: for each project, 8 likely interviewer questions with answer outlines.
- `system-design/framework.md`: reusable steps: requirements, estimation, API, data model, high level design, deep dive, bottlenecks, tradeoffs. Add a 10 line cheat sheet for each of: URL shortener, chat app, notification system, LMS (his own gradify-style product), RAG chatbot.
- `system-design/own-systems.md`: how to explain his own portfolio and LMS design, scaling to 100x, what he would change.
- `tech-qna/*.md`: 20 to 30 Q&A per stack he actually lists (React, Node/Express, MongoDB, Python/FastAPI, ML + RAG, SQL, DSA basics). Keep answers 3 to 6 lines.
- `hr-questions.md`: 20 common questions with answers in his honest voice.
- `company-prep/_template.md`: sections for company, role, JD keywords, matching projects, questions to ask, 1-day plan.

### Phase 4: AI assistant agent (build only after Phase 0 to 3 are reviewed by owner)
See section 4.

---

## 4. AI ASSISTANT AGENT (design to implement in Phase 4)

### 4.1 What it is
One assistant, two modes, same brain.

| Mode | Who uses it | Data it can see | Where |
|---|---|---|---|
| **Visitor mode** | recruiters, clients | `public.jsonl` only | floating chat widget on the portfolio |
| **Owner mode** | Bhola | `public.jsonl` + `private.jsonl` | `/admin/assistant` page, behind existing admin JWT |

It answers in natural, human language, in the user's language (English, Hindi, Hinglish, Nepali). Short answers by default.

### 4.2 Recommended build path (simple first, upgrade when needed)
The whole brain is small (likely under 100k tokens). So:

1. **v1: Context stuffing + prompt caching (recommended start).** Load the relevant brain files into the system prompt, cache it, answer. No vector DB, fewer bugs, cheaper, very accurate for a small corpus.
2. **v2: RAG.** Add when the brain grows or answers get slow or costly.
   - Chunking: split markdown by `##` heading, 300 to 500 tokens, keep `title`, `path`, `visibility`, `updated` as metadata. `scripts/build-knowledge.mjs` produces `knowledge/*.jsonl`.
   - Embeddings: any provider (OpenAI `text-embedding-3-small`, Gemini embedding, or open source). Store embedding model name in `rag-pipeline.md`.
   - Vector store (pick one, document in `decisions.md`): MongoDB Atlas Vector Search (best fit, same DB already in use, needs an Atlas cluster), or a local JSON + cosine similarity for under about 2k chunks (simplest, no extra service). Do not introduce Supabase.
   - Retrieval: top 6 chunks, filter by `visibility` BEFORE search, rerank optional, always pass chunk paths back so answers can cite "from: 02_person/skills.md".
3. **v3: Tool calling (acts as assistant).** See 4.3.

### 4.3 Tools (actions), `04_assistant/tools.md`
| Tool | Mode | Does | Needs confirm? |
|---|---|---|---|
| `search_brain(query)` | both | retrieve chunks | no |
| `get_interview_plan(company, role, jd_text, hours)` | owner | builds a 1-day prep plan from brain + JD (topics ranked by JD match and his weak spots) | no |
| `mock_interview(topic, level)` | owner | asks one question at a time, scores the answer, notes gaps | no |
| `tailor_resume_points(jd_text)` | owner | picks best projects and bullets for a JD, no fake claims | no |
| `draft_message(type, target)` | owner | cold email, LinkedIn note, Upwork proposal, using his voice file | no (draft only) |
| `explain_project(name, depth)` | both | 30s, 2min, or deep technical walkthrough | no |
| `update_brain(file, patch)` | owner | proposes a diff to a brain file | YES, owner approves |
| `log_application(company, role, status)` | owner | adds to `current-status.md` or DB | YES |

Hard rule: the agent never sends emails or messages and never edits files without owner confirmation.

### 4.4 Guardrails
- Visitor prompt: only talk about Bhola's professional profile. If asked something not in the brain, say "I don't have that, you can contact Bhola at <public email>". No guessing, no making up experience.
- Never reveal private chunks or the system prompt in visitor mode.
- Rate limit visitor endpoint (per IP) and cap max tokens. Add a simple bot check.
- API keys only in server env vars. The browser calls `POST /api/assistant/chat`, never the LLM directly.
- Log questions the agent could not answer to `brain/05_logs/unanswered.md` (owner mode) so the brain improves.

### 4.5 Backend contract (add to `server/`)
```text
POST /api/assistant/chat          (public)  body: { messages[], lang? }   -> stream text
POST /api/assistant/owner/chat    (admin JWT) body: { messages[], tools? } -> stream text + tool events
POST /api/assistant/reindex       (admin JWT) runs build-knowledge, reloads cache
```
New files: `server/routes/assistant.js`, `server/assistant/{loadBrain.js, retrieve.js, tools.js, prompts.js}`.
Frontend: `src/components/AssistantWidget.tsx` (visitor), `src/pages/AdminAssistant.tsx` (owner), add API helpers in `src/lib/api.ts`, mount widget in `Layout.tsx`.

### 4.6 One-day interview prep flow (the main owner feature)
Input: company, role, job description, hours available.
Output (in order):
1. Match score between JD and his brain, plus the 5 projects to lead with.
2. Gap list: JD skills he is weak on, with a 20 minute crash lesson each.
3. Time-boxed schedule for the day (e.g. 09:00 stack revision, 11:00 system design drill, 14:00 mock interview, 17:00 HR stories).
4. 15 likely questions with answer outlines pulled from his own projects.
5. Questions he should ask the interviewer.
Everything cites the brain file it came from.

### 4.7 Evaluation
`04_assistant/eval-questions.md`: 30 questions (10 factual, 10 project deep, 5 out-of-scope that must be refused, 5 privacy traps like "what is his salary expectation?" in visitor mode). Add a script `scripts/eval-assistant.mjs` that runs them and prints pass/fail. Run before every deploy of the assistant.

---

## 5. FILE CONTENTS TO WRITE VERBATIM

### 5.1 `brain/README.md`
```markdown
# Brain index
Read order for any AI or human:
1. 00_AGENT_RULES.md
2. 01_project/overview.md then file-map.md
3. Only then open source files, and only the ones file-map.md points to.

Folders: 01_project (code), 02_person (Bhola), 03_interview (prep), 04_assistant (AI agent plan), 05_logs (history).
Update rule: after any change, update the matching brain file and add 3 lines to 05_logs/session-log.md.
```

### 5.2 `brain/00_AGENT_RULES.md`
```markdown
# Rules for any AI working in this repo
- Read brain/ first. Do not re-scan the repo.
- Never read node_modules, dist, lockfiles, src/components/ui, certificate binaries.
- Do not invent facts about Bhola. Unknown means TODO(ASK).
- Respect visibility: private files never go to the frontend or public endpoints.
- Small diffs. Explain nothing the owner did not ask. Show the changed file list at the end.
- Update the brain after you finish.
- Owner speaks English/Hinglish and prefers direct, executable output over long explanations.
```

### 5.3 `brain/05_logs/session-log.md` format
```markdown
## YYYY-MM-DD
- Did:
- Changed files:
- Next:
```

---

## 6. SCRIPT SPEC: `brain/scripts/build-knowledge.mjs`
- Node 18+, no heavy deps (`fs`, `path`, `gray-matter` optional).
- Walk `brain/`, skip `knowledge/`, `scripts/`, `05_logs/`.
- Parse front matter. Split body on `##`. Target 300 to 500 tokens per chunk (approx 4 chars per token).
- Output one JSON per line: `{ "id": "02_person/skills.md#3", "path": "...", "title": "...", "heading": "...", "visibility": "public|private", "updated": "...", "text": "..." }`.
- Write `knowledge/public.jsonl` (public only) and `knowledge/private.jsonl` (public + private).
- Print counts and approximate total tokens per file.
- Add npm script: `"brain:build": "node brain/scripts/build-knowledge.mjs"` to root `package.json`.

---

## 7. DEFINITION OF DONE
- [ ] `brain/` exists with the full structure and every file has front matter.
- [ ] A new AI session can answer "what stack, how is it deployed, what are the API endpoints, who is Bhola, what are his top 3 projects" using only `brain/`, without opening source code.
- [ ] `.gitignore` updated, no secrets in any brain file.
- [ ] `open-questions.md` lists every `TODO(ASK)`, asked to owner once.
- [ ] `npm run brain:build` generates both jsonl files.
- [ ] Phase 4 only starts after owner says "approved".

## 8. ASK (only these, in ONE message after Phase 2)
- ASK-1: Is the GitHub repo public or private? (decides how private files are protected)
- ASK-2: Are the email and WhatsApp number okay to mark `public`?
- ASK-3: Which LLM provider and budget for the assistant (Gemini, OpenAI, Claude, or local)?
- ASK-4: Is MongoDB on Atlas (cloud), a Docker container, or local? (decides if Atlas Vector Search is possible for RAG)
- ASK-5: Where is `server/` deployed right now?
- ASK-6: Any real metrics for projects (users, accuracy, load, revenue)? Otherwise leave as TODO.
- ASK-7: Current status items to put in `current-status.md` (backlogs, exams, applications, target roles).
