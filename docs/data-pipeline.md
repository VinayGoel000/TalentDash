# TalentDash Data Pipeline

## Purpose

This document explains how data moves through the TalentDash ecosystem.

Every engineer must understand this flow.

The frontend displays it.

The backend validates it.

The AI normalizes it.

The scraper collects it.

The database stores it.

The rendering engine publishes it.

---

# High Level Flow

Public Web

↓

Scraper

↓

Raw Data

↓

AI Normalization

↓

Validation

↓

Deduplication

↓

API Ingestion

↓

Database

↓

ISR Revalidation

↓

Static Pages

↓

Users

---

# Stage 1 — Discover

## Purpose

Locate salary data across public sources.

## Sources

* AmbitionBox
* Glassdoor
* LinkedIn
* Public Compensation Sources

## Technologies

Python

Playwright

Scrapy

---

## Playwright

Use For:

* JavaScript-heavy pages
* Dynamic content
* Infinite scrolling

---

## Scrapy

Use For:

* HTML pages
* Fast crawling
* Bulk extraction

---

## Rate Limiting Rules

Maximum:

1 request

every

2 seconds

per domain

Never aggressively crawl.

Never risk IP bans.

---

# Stage 2 — Extract Raw Data

## Purpose

Capture salary information exactly as found.

Raw Examples:

Company:

Google India

google pvt ltd

GOOGLE

---

Salary:

₹18–22 LPA

₹24L

₹31,00,000

---

Experience:

5+ years

6 yrs

5–8 years

---

Role:

Senior Software Engineer

Software Engineer II

SWE L5

---

Rules

Store raw values temporarily.

Do not trust them.

Do not insert directly.

---

# Stage 3 — AI Normalization

## Purpose

Convert messy data into structured data.

---

## Providers

Claude

GPT-4o-mini

Gemini

---

## Batch Size

10 records per request

Maximum

Avoid massive prompts.

---

## Responsibilities

Normalize company names.

Normalize levels.

Normalize salary ranges.

Normalize experience.

Generate confidence score.

---

## Examples

Input:

Senior Software Engineer

Output:

L5

---

Input:

Google India

Output:

google

---

Input:

₹18–22 LPA

Output:

base_min = 1800000

base_max = 2200000

base_midpoint = 2000000

---

# Stage 4 — Validation

## Purpose

Reject invalid AI output.

Never trust LLM responses.

---

## Technology

Pydantic

---

## Validation Rules

Required fields must exist.

Enums must be valid.

Numbers must be valid.

Confidence score must be:

0.0

to

1.0

---

## Invalid Records

Reject

Log

Store reason

Never silently drop.

---

# Stage 5 — Deduplication

## Purpose

Prevent duplicate salary records.

---

## Duplicate Definition

Same:

Company

*

Role

*

Level

*

Location

*

Salary

within 10%

---

## Time Window

48 hours

---

## Example

Google

SDE-II

Bengaluru

₹24L

Already exists

↓

Skip insert

---

# Stage 6 — API Ingestion

## Endpoint

POST

/api/ingest-salary

---

## Responsibilities

Validate payload

Normalize payload

Recompute totals

Assign source

Store record

---

## Server Side Rules

Never trust:

total_compensation

from client

---

Always compute:

total_compensation

=

base_salary

*

bonus

*

stock

---

## Source Assignment

SCRAPED

for scraped data

CONTRIBUTOR

for user submissions

AI_INFERRED

for AI-generated estimates

---

## Confidence Rules

Scraped records

minimum

0.5

---

Below:

0.4

↓

Human review queue

---

# Stage 7 — Database Storage

## Destination

PostgreSQL

via

Prisma

---

## Stored Data

Companies

Salary Records

Locations

Roles

Metadata

Confidence Scores

Verification Status

---

# Stage 8 — ISR Revalidation

## Purpose

Refresh static pages after new data arrives.

---

## Trigger

New salary records inserted.

---

## Pages Affected

Company Page

Role Page

Location Page

Salary Page

Comparison Page

---

## Process

New Data

↓

Background Job

↓

Cache Purge

↓

ISR Trigger

↓

Fresh Static Page

↓

User Sees Updated Data

---

# Cache Strategy

Users should not hit the database directly.

Preferred Flow

User

↓

CDN

↓

Static HTML

↓

Done

Avoid

User

↓

Server

↓

Database

↓

Rendered Response

---

# Engineering Rules

Rule 1

Never trust scraped data.

---

Rule 2

Never trust AI output.

---

Rule 3

Validate everything.

---

Rule 4

Deduplicate before insert.

---

Rule 5

Recompute totals server-side.

---

Rule 6

Use ISR instead of rebuilding entire site.

---

Rule 7

Serve pages from CDN whenever possible.

---

# Final Principle

Raw Data

↓

Normalized Data

↓

Validated Data

↓

Stored Data

↓

Static Page

↓

User

Every stage must improve data quality.

No stage should reduce trust.
