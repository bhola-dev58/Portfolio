---
title: System Design of Own Systems
visibility: public
updated: 2026-10-08
source: manual
---

# Design Walkthrough of Own Systems

## 1. Portfolio CMS Architecture
- **Client:** React Single Page Application served via Vercel CDN.
- **Server:** Node.js Express API with JWT authorization.
- **Database:** MongoDB Atlas with Mongoose schema validation.
- **Media Storage:** Static file serving under `/uploads` or Cloudinary/S3 integration.
- **Scaling to 100x:** Move uploads to AWS S3 + CloudFront CDN, add Redis caching for `/api/projects` endpoint.

## 2. Smart Coach LMS Architecture
- **Client:** Next.js App Router for dynamic SSR & client dashboard components.
- **Server:** Express API handling course validity engines, Razorpay payment webhooks, and YouTube live streaming API integration.
- **Database:** MongoDB Atlas collections (Users, Courses, Enrollments, Payments).
- **Scaling to 100x:** Implement RabbitMQ / SQS queue for asynchronous webhook processing and student notification dispatches.
