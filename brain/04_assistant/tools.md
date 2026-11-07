---
title: Assistant Tools Definition
visibility: public
updated: 2026-10-08
source: manual
---

# Agent Tool Actions

| Tool | Mode | Description | Requires Confirmation? |
|---|---|---|---|
| `search_brain(query)` | Both | Perform semantic vector search over brain chunks | No |
| `get_interview_plan(company, role, jd_text, hours)` | Owner | Generate tailored 1-day interview schedule and gap analysis | No |
| `mock_interview(topic, difficulty)` | Owner | Conduct dynamic question-by-question technical drill | No |
| `tailor_resume_points(jd_text)` | Owner | Select best project achievements for a target JD | No |
| `draft_message(type, recipient)` | Owner | Draft outreach email, LinkedIn message, or Upwork proposal | No (Drafting only) |
| `explain_project(name, depth)` | Both | Produce 30s summary or deep technical walkthrough | No |
| `update_brain(file, patch)` | Owner | Propose edits to brain markdown files | **YES** |
| `log_application(company, role, status)` | Owner | Add job application entry to status logs | **YES** |
