---
title: Node.js Q&A
visibility: public
updated: 2026-10-08
source: manual
---

# Node.js & Express Q&A

### Q1: How does Node.js Event Loop work?
Node.js uses a single-threaded non-blocking I/O model powered by Libuv. The event loop offloads async operations (fs, network) to OS kernel or worker thread pool, executing callbacks in phases: Timers, Pending I/O, Poll, Check (setImmediate), and Close callbacks.

### Q2: What is Middleware in Express?
Middleware functions access the request object (`req`), response object (`res`), and next function (`next`). They execute code, modify request/response objects, end request-response cycles, or invoke `next()` to pass control.
