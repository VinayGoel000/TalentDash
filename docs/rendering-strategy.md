# TalentDash Rendering Strategy

## Purpose

This document defines how every page should be rendered.

Rendering decisions are based on:

* SEO
* Infrastructure Cost
* Cacheability
* Performance
* Scalability

The default rule is:

Static First

Only use dynamic rendering when absolutely necessary.

---

# Core Principle

Preferred Order

1. Static Generation (SSG)
2. Incremental Static Regeneration (ISR)
3. Dynamic Rendering (RSC)
4. SSR

Always choose the cheapest option that satisfies requirements.

---

# Rendering Decision Table

| Page Type             | Strategy           | Reason                   |
| --------------------- | ------------------ | ------------------------ |
| Homepage              | ISR                | Changes regularly        |
| Company Pages         | Static             | Rarely change            |
| Salary Pages          | Static             | Core SEO asset           |
| Location Salary Pages | Static + ISR       | Large page count         |
| Comparison Pages      | ISR                | Infinite combinations    |
| Search Results        | Dynamic RSC        | Query dependent          |
| Interview Pages       | Static             | Rare updates             |
| Review Pages          | ISR                | New reviews periodically |
| Admin Panel           | SSR                | Auth required            |
| Tools                 | Static + Client JS | Calculation only         |

---

# Homepage

Route

/

Strategy

ISR

Configuration

revalidate: 3600

Reason

Homepage content changes throughout the day.

Examples:

* Trending companies
* Recent salaries
* Featured rankings

Do not fully rebuild application for homepage updates.

---

# Company Pages

Route

/companies/{slug}

Strategy

Static Generation

Method

generateStaticParams()

Reason

Company information changes infrequently.

Examples:

* Amazon
* Google
* Microsoft
* Infosys

Generate during build.

Serve from CDN.

---

# Company Reviews

Route

/companies/{slug}/reviews

Strategy

ISR

Configuration

revalidate: 7200

Reason

Reviews are added periodically.

Does not require real-time updates.

---

# Company Salaries

Route

/companies/{slug}/salaries

Strategy

Static

Reason

Salary data changes slowly.

Perfect SEO candidate.

---

# Company Interviews

Route

/companies/{slug}/interviews

Strategy

Static

Reason

Interview experiences are historical records.

Rarely modified.

---

# Salary Landing Page

Route

/salaries

Strategy

Static

Reason

High SEO value.

Must load instantly.

---

# Salary By Role

Route

/salaries/{role}

Examples

/salaries/software-engineer

/salaries/product-manager

Strategy

Static

Reason

Primary SEO asset.

Must be cached globally.

---

# Salary By Role And Location

Route

/salaries/{role}/{location}

Examples

/salaries/software-engineer/bangalore

/salaries/data-scientist/mumbai

Strategy

Static + ISR

Top Cities

Pre-build:

* Bangalore
* Hyderabad
* Mumbai
* Delhi NCR
* Pune
* Chennai

Other Cities

Generate using ISR.

---

# Salary Heatmap

Route

/salaries/heatmap

Strategy

Static

Reason

Data visualization page.

No user-specific content.

---

# Comparison Pages

Route

/compare/{company1}-vs-{company2}

Examples

/google-vs-meta

/amazon-vs-flipkart

Strategy

ISR

Configuration

revalidate: 86400

Reason

Too many possible combinations.

Generate on first request.

Cache afterwards.

---

# Compare Tool

Route

/compare

Strategy

ISR

Reason

Frequently visited.

Moderately dynamic.

---

# Search

Route

/search

Strategy

Dynamic

Rendering

React Server Components

Reason

Search queries differ for every user.

Cannot be statically generated.

---

# Rules For Search

Use:

Server Components

Avoid:

Client-side fetching

Reason:

Better SEO

Faster first load

---

# Interview Pages

Route

/interviews/{company}

/interviews/{company}/{role}

Strategy

Static

Reason

Interview reports are historical content.

---

# Reviews Pages

Route

/reviews/{company}

Strategy

ISR

Configuration

revalidate: 7200

Reason

Reviews are submitted occasionally.

Not real-time critical.

---

# Community Pages

Route

/community

/community/{topic}

Strategy

ISR

Reason

New discussions appear regularly.

---

# Workplace Index

Route

/workplace-index

/workplace-index/rankings

Strategy

ISR

Configuration

revalidate: 21600

Reason

Rankings change periodically.

---

# Tools

Routes

/tools/*

Strategy

Static Shell

Client Hydration

Reason

UI can be static.

Calculations happen in browser.

Examples

* Salary Calculator
* Hike Calculator
* Offer Comparison
* Equity Calculator

---

# Admin Panel

Route

/admin

Strategy

SSR

Reason

Requires:

* Authentication
* Personalised data
* Dashboard state

Never cache.

---

# API Routes

Strategy

Dynamic

Reason

APIs require fresh data.

Use caching where appropriate.

---

# CDN Strategy

Everything possible should be served from CDN.

Goal:

User
↓
CDN
↓
Static HTML
↓
Done

Avoid:

User
↓
Server
↓
Database
↓
SSR
↓
Response

Whenever possible.

---

# Final Engineering Rule

If a page can be generated before a user requests it,

Generate it.

Do not compute it at request time.
