# TalentDash Tech Stack

## Purpose

This document defines the official TalentDash technology stack.

No technology should be introduced without a valid reason.

---

# Framework

Technology:
Next.js 15

Architecture:
App Router Only

Requirements:

* React Server Components
* generateStaticParams
* Route Handlers
* Metadata API

Not Allowed:

* Pages Router

Reason:

* Static generation
* SEO scalability
* Better performance

---

# Styling

Technology:
Tailwind CSS

Requirements:

* Utility-first styling
* Custom components

Not Allowed:

* ShadCN
* MUI
* Chakra UI
* Radix UI
* Bootstrap

Reason:

* Small bundle size
* Full design control

---

# Rendering Strategy

Primary:

SSG (Static Site Generation)

Secondary:

ISR (Incremental Static Regeneration)

Use Cases:

Homepage → ISR

Company Pages → Static

Salary Pages → Static

Compare Pages → ISR

Search → Dynamic

Admin → SSR

Reason:

Maximum CDN delivery

Minimal runtime compute

---

# Database

Technology:
PostgreSQL

Provider:
Neon

Type:
Serverless PostgreSQL

Reason:

* Structured data
* Full text search
* Prisma support
* Acquisition friendly

---

# ORM

Technology:
Prisma

Requirements:

* Prisma Schema
* Prisma Migrations
* Prisma Seed

Reason:

* Type safety
* Readable schema
* Migration history

---

# Hosting

Technology:
Cloudflare Pages

Reason:

* CDN first
* Low cost
* Global delivery

---

# CDN

Technology:
Cloudflare CDN

Purpose:

* Static asset delivery
* HTML caching
* Edge serving

---

# Storage

Technology:
Cloudflare R2

Used For:

* Logos
* Screenshots
* Reports
* Sitemap exports
* JSON exports

Reason:

No egress fees

---

# Job Queue

Technology:
BullMQ

Provider:
Upstash Redis

Used For:

* Scraping
* Salary processing
* Sitemap generation
* AI jobs

---

# Scraping Layer

Technology:

Python

Tools:

* Playwright
* Scrapy

Purpose:

* Salary extraction
* Company data extraction

Requirements:

* Rate limiting
* Retry logic
* User agent rotation

---

# AI Layer

Providers:

* OpenAI
* Claude
* Gemini

Usage:

* Data normalization
* Summaries
* Metadata generation
* SEO generation

Rules:

AI runs asynchronously.

Never call AI on every page request.

---

# Search

## Phase 1

Technology:

PostgreSQL Full Text Search

Features:

* Company search
* Role search

Reason:

Free and simple

---

## Phase 2

Technology:

Typesense

Features:

* Typo tolerance
* Autocomplete

Only add when PostgreSQL search becomes insufficient.

---

# Authentication

Technology:

Clerk

Alternative:

Auth.js

Used For:

* Admin login
* Contributor accounts
* Moderation

Not required for public pages.

---

# Analytics

Technology:

PostHog

Purpose:

* Product analytics
* SEO analytics
* Conversion tracking

---

# Engineering Rules

1. Static First

Prefer SSG before ISR.

Prefer ISR before SSR.

---

2. Cache Everything

Cache:

* HTML
* APIs
* Images
* Search results

---

3. Minimize Database Reads

Most traffic should be served from CDN.

---

4. Avoid Heavy JavaScript

Keep client-side JavaScript minimal.

---

5. Mobile First

Every page must work on mobile first.

---

6. SEO First

Every page must be indexable.

---

# Trial Stack

For Trial Submission We Will Use

* Next.js 15
* TypeScript
* Tailwind CSS
* PostgreSQL
* Prisma
* Neon
* Vercel (temporary deployment)

Future Production Hosting:

* Cloudflare Pages
* Cloudflare CDN
* Cloudflare R2

---

# Final Principle

User → CDN → Static HTML → Done

Avoid:

User → Server → Database → SSR → Response
