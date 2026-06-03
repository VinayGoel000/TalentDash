# TalentDash Internship Task Memory

Last Updated: Day 1

---

# Project Goal

Build a production-quality TalentDash MVP for the Full Stack Engineer Trial.

Focus:

* Data Integrity
* Static Architecture
* SEO
* Performance
* Real Database Integration

---

# Tech Stack

Framework:
Next.js 15 (App Router)

Language:
TypeScript

Styling:
Tailwind CSS

Database:
PostgreSQL (Neon)

ORM:
Prisma

Deployment:
Vercel (Trial)

Production Target:
Cloudflare Pages

---

# Design Philosophy

Reference:
Airbnb

Copy:

* Information hierarchy
* Card density
* Trust signals
* Search UX

Do NOT copy:

* Colors
* Branding

---

# Official Color System

Primary:
#FF5A5F

Deep Text:
#222222

Body Text:
#484848

Muted:
#717171

Surface:
#FFFFFF

App Background:
#F7F7F7

Border:
#EBEBEB

Success:
#008A05

Warning:
#FFB400

Error:
#D93025

Hover:
#F2F2F2

---

# Typography

Font:
Inter

H1:
36px / 700

H2:
28px / 700

H3:
22px / 600

Body:
16px / 400

Labels:
13px / 500

Metadata:
12px / 400

Salary Figures:
32-40px / 700

---

# Product Areas

## Phase 1 (Build)

* Salaries
* Companies
* Compare

## Future

* Reviews
* Interviews
* Community
* Tools
* Workplace Index

---

# Rendering Strategy

Homepage:
ISR

Company Pages:
Static

Salary Pages:
Static

Compare:
ISR

Search:
Dynamic

Admin:
SSR

Tools:
Static + Client Hydration

---

# Data Rules

Company:

Normalize

Example:

Google
GOOGLE
google

↓

google

---

Total Compensation

Always:

base_salary
+
bonus
+
stock

Never trust client value.

---

Allowed Levels

L3
L4
L5
L6

SDE_I
SDE_II
SDE_III

STAFF
PRINCIPAL

IC4
IC5

---

Currencies

INR
USD
GBP
EUR

---

# API Requirements

POST

/api/ingest-salary

GET

/api/salaries

GET

/api/companies/[slug]

GET

/api/compare

---

# Backend Requirements

Company Model

Salary Model

Prisma Enums

Validation

Duplicate Detection

Pagination

Indexes

Seed Script

---

# Frontend Requirements

Salary Table

Filters

Sorting

Pagination

Company Page

Compare Page

SEO Metadata

Responsive Design

---

# Seed Data

Minimum:

60+

Companies:

Google
Amazon
Meta
Microsoft
Flipkart
Meesho
NVIDIA
TCS
Infosys
Wipro
Razorpay
Zepto

---

# Edge Cases

Negative Salary

↓

Reject

Invalid Level

↓

Reject

Duplicate Salary

↓

409 Conflict

Same Compare IDs

↓

400

Unknown Company

↓

404

---

# README Must Contain

Architecture Overview

Installation

Env Variables

Database Setup

Seed Command

Start Command

Live URL

Architecture Decisions

Trade-Off Decisions

---

# Files Created

✅ docs/design-system.md

✅ docs/product-roadmap.md

✅ docs/tech-stack.md

✅ docs/rendering-strategy.md

✅ docs/data-contract.md

✅ docs/data-pipeline.md

✅ docs/trial-requirements.md

---

# Files Remaining

🔲 docs/database-schema.md

🔲 prisma/schema.prisma

🔲 prisma/seed.ts

🔲 app/api/ingest-salary

🔲 app/api/salaries

🔲 app/api/companies/[slug]

🔲 app/api/compare

🔲 Salary Table UI

🔲 Company Page UI

🔲 Compare Page UI

🔲 Deployment

🔲 README.md

---

# Current Status

Documentation Phase:
90% Complete

Database Design:
Not Started

Backend:
Not Started

Frontend:
Not Started

Deployment:
Not Started

---

# Next Task

Create:

docs/database-schema.md

Then:

prisma/schema.prisma

Then:

Database Migration

Then:

Seed Data
