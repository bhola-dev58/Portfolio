---
title: Python Q&A
visibility: public
updated: 2026-10-08
source: manual
---

# Python & FastAPI Q&A

### Q1: How do Python GIL and asyncio work?
Global Interpreter Lock (GIL) permits only one native thread to execute Python bytecode at a time. For I/O-bound tasks, `asyncio` provides cooperative multitasking using an event loop and `async`/`await` primitives without thread context-switching overhead.

### Q2: Why FastAPI over Flask?
FastAPI utilizes Pydantic for data validation, automatic OpenAPI doc generation, and native `async`/`await` support powered by Starlette and Uvicorn.
