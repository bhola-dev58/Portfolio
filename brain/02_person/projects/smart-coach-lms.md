---
title: Smart Coach LMS
visibility: public
updated: 2026-10-08
source: seed.js
---

## One line
Production-ready Learning Management System engineered to streamline batch scheduling, live classes via YouTube API, course enrollment, and student management.

## Problem
Coaching institutes faced immense operational friction managing offline & online batches, tracking course expirations manually, and integrating secure payment processing for student enrollments.

## My role
Full Stack Software Engineer.

## Stack
Next.js, React.js, Node.js, Express.js, MongoDB Atlas, Razorpay Payment Gateway, Tailwind CSS, JWT Auth.

## Architecture (3 to 6 bullets)
- Monolithic Node.js REST backend connected to MongoDB Atlas.
- Next.js App Router frontend rendering dynamic dashboard views.
- Razorpay Webhook listener for instant enrollment provisioning.
- Role-based authorization middleware (Admin, Instructor, Student).

## Hard parts and how I solved them
- **Challenge:** Concurrent payment webhooks causing potential race conditions during course seat allotment.
- **Solution:** Implemented MongoDB atomic operations (`findAndModify`) alongside idempotent webhook handlers in Express.js.

## Results / metrics
Processed enrollments for 100+ active students while cutting institute administrative overhead by 60%.

## Links
- Live: `https://gradify.academy/`
- Repo: `https://github.com/bhola-dev58/smart-coach-lms`

## Interview talking points (3 bullets)
- Handled automated course validity tracking and 6-month automated expiration engines.
- Designed idempotent Razorpay payment webhook reconciliation system.
- Optimized database indexing to support fast dynamic analytics dashboards.

## Weak spots an interviewer may probe
- Webhook failure retries under high load.
- Video streaming bandwidth costs and YouTube API quota reliance.
