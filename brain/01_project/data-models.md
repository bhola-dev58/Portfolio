---
title: Data Models
visibility: public
updated: 2026-10-08
source: server/models.js
---

# Data Models (MongoDB Mongoose Schemas)

## 1. Project (`Project`)
- `title`: String (required)
- `slug`: String (required, unique)
- `shortDescription`: String
- `description`: String
- `category`: String (default: 'Full Stack')
- `projectType`: String
- `role`: String
- `status`: String ('Draft' | 'Published' | 'Archived', default: 'Published')
- `featured`: Boolean (default: false)
- `displayOrder`: Number (default: 0)
- `startDate`: String, `endDate`: String
- `technologies`: [String]
- `tags`: [String]
- `image`: String
- `images`: [String]
- `architectureImage`: String
- `problem`: String, `approach`: String, `architecture`: String
- `keyFeatures`: [String], `challenges`: String, `solutions`: String
- `results`: String, `learnings`: String
- `deployed_url`: String, `github_url`: String, `docsUrl`: String
- `timestamps`: createdAt, updatedAt, publishedAt

## 2. Admin (`Admin`)
- `email`: String (required, unique)
- `password`: String (required, hashed with bcrypt)
- `timestamps`: createdAt, updatedAt

## 3. Profile (`Profile`)
- `email_personal`: String, `email_college`: String
- `phone_in`: String, `phone_np`: String
- `address_temp`: String, `address_perm`: String
- `github`: String, `linkedin`: String, `leetcode`: String
- `status_text`: String, `open_for`: String

## 4. Skill (`Skill`)
- `category`: String (required)
- `items`: [{ `name`: String, `level`: Number, `icon`: String }]

## 5. Experience (`Experience`)
- `company`: String, `role`: String, `period`: String
- `location`: String, `description`: [String], `technologies`: [String]

## 6. Certification (`Certification`)
- `title`: String, `issuer`: String, `issueDate`: String
- `credentialId`: String, `credentialUrl`: String, `image`: String

## 7. Education (`Education`)
- `institution`: String, `degree`: String, `fieldOfStudy`: String
- `startYear`: String, `endYear`: String, `grade`: String
