---
title: MongoDB Q&A
visibility: public
updated: 2026-10-08
source: manual
---

# MongoDB Q&A

### Q1: What is MongoDB Aggregation Pipeline?
A framework for data processing consisting of multi-stage operations (e.g. `$match`, `$group`, `$sort`, `$lookup`, `$project`). Documents enter a multi-stage pipeline that transforms them into aggregated results.

### Q2: Why use Mongoose schema validation?
Mongoose enforces structured schemas over schemaless MongoDB collections, providing type casting, default values, custom validators, pre/post middleware hooks, and model population references.
