# TalentDash Trial Requirements

## Allowed

* Claude
* GPT-4
* Cursor
* GitHub Copilot

Evaluation is based on:

* System design
* Data integrity
* Working product
* Engineering decisions

---

# Mandatory Tech Stack

Framework:
Next.js 15 App Router

Styling:
Tailwind CSS

Database:
PostgreSQL (Neon)

ORM:
Prisma

---

# Not Allowed

* Pages Router
* ShadCN
* MUI
* Chakra UI
* Kubernetes

---

# No Authentication

Do NOT build:

* Login
* Signup
* JWT
* Sessions
* RBAC

Trial scope intentionally excludes auth.

---

# Priority Order

1. Working Deployment
2. Data Integrity
3. API Validation
4. Salary Table
5. Company Page
6. Compare Page
7. SEO

---

# Must Deliver

## Backend

* Prisma Schema
* Migrations
* Seed Script
* POST /api/ingest-salary
* GET /api/salaries
* GET /api/companies/[slug]
* GET /api/compare

## Frontend

* Salary Table
* Filters
* Pagination
* Company Page
* Compare Page

## Deployment

* Live URL
* Public Access

---

# Evaluation Checklist

## Critical

* Live URL works
* Real database connected
* No mocked frontend data
* APIs functional

## Data Integrity

* Invalid level rejected
* Negative salary rejected
* Duplicate records rejected
* total_compensation always recomputed

## Performance

* Pagination required
* No unbounded queries
* Static pages where possible

---

# README Requirements

Must Include:

* Architecture Overview
* Installation Steps
* Environment Variables
* Database Setup
* Seed Command
* Start Command
* Live URL
* Trade-Off Decisions

---

# Architecture Decisions Section

Explain:

* Static vs ISR vs Dynamic
* Pagination approach
* Scope cuts
* Future improvements

---

# What Will Fail Review

* Mock data frontend
* No deployment
* No README
* No filters
* No pagination
* Client-controlled total_compensation
* Invalid level storage
* Treating Google and google as different companies

---

# Full Stack Success Definition

Database
↓

API

↓

React Server Components

↓

HTML

↓

User

Real end-to-end flow.

No shortcuts.
