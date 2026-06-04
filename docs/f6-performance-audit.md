# F6 — Performance Audit

**Date:** 2026-06-04  
**Status:** Complete

---

## Executive Summary

F6 reduces client JavaScript, stabilizes layout during loading, centralizes server-side data work, and prefers static/ISR rendering. The salary table remains a React Server Component. Compare interactivity is isolated to small client islands.

---

## Server Components Used

| Area | Components / Pages |
|------|-------------------|
| `/salaries` | `app/salaries/page.tsx` (async RSC, ISR `revalidate: 3600`) |
| Salary table | `components/features/SalaryTable.tsx` (no `"use client"`) |
| Comparison results | `components/features/ComparisonTable.tsx` |
| Pagination | `components/features/SalaryPagination.tsx` (converted from client) |
| `/compare` | `app/compare/page.tsx` (async RSC; reads URL state on server) |
| `/companies/[slug]` | `app/companies/[slug]/page.tsx` (static params + ISR) |
| Layout chrome | `Navbar`, `Footer`, `LevelBadge`, `Container`, `Button` |
| Homepage | `app/page.tsx` (ISR fetch, `revalidate: 3600`) |

---

## Client Components Used (Required)

| Component | Reason kept |
|-----------|-------------|
| `SalaryFilters` | Debounced search, dropdown/checkbox URL updates |
| `CompareControls` | Dropdown selection + `router.push` for `s1`/`s2` |
| `CompareSelectors` | Native `<select>` change handlers (child of `CompareControls`) |

**Removed client boundary:** `SalaryPagination` — pagination links are built on the server via `queryString`.

**Removed client boundary:** `app/compare/page.tsx` — page is now a server component; only controls ship client JS.

---

## Image Optimizations

| Item | Implementation |
|------|----------------|
| `CompanyLogo` | `next/image` with fixed `width`, `height`, `sizes`, and `alt` |
| Placeholder asset | `public/logos/default.svg` (reserved 48×48 box, no CLS) |
| Plain `<img>` | None in app/components after audit |

---

## CLS Protections

| Location | Technique |
|----------|-----------|
| `app/salaries/loading.tsx` | Table/filter skeletons match final column layout and heights |
| `app/companies/[slug]/loading.tsx` | Fixed logo, stat cards, and table placeholders |
| `app/compare/loading.tsx` | Fixed selector + empty-state regions |
| `CompareSelectors` | `min-h` on summary lines under dropdowns |
| Compare share block | `min-h-[5.5rem]` reserved before URL renders |
| Compare empty state | `min-h-[18rem]` |
| Company stat cards | `min-h-[2rem]` on metric values |
| `SalaryPagination` | `min-h-[3.25rem]` bar |
| Fonts | `next/font` Inter with `display: 'swap'` on `<html>` / `<body>` |

---

## Server-Side Data Computation

| Module | Responsibility |
|--------|----------------|
| `lib/salary-query.ts` | Single-pass filter → sort → paginate; precomputed `SALARY_FILTER_OPTIONS` |
| `lib/company-stats.ts` | Median TC, average TC, level distribution per company slug |
| `lib/compare-options.ts` | Lightweight `{ id, label }` list for compare dropdowns (avoids shipping full mock array shape to client logic twice) |
| `lib/currency-config.ts` | Shared `convertSalaryAmount` (deduped from table components) |

---

## Static Rendering / ISR

| Route | Strategy |
|-------|----------|
| `/salaries` | ISR (`revalidate: 3600`) |
| `/compare` | ISR (`revalidate: 3600`) |
| `/companies/[slug]` | `generateStaticParams()` + ISR |
| `/` | ISR (`revalidate: 3600`, cached API fetch) |

---

## Bundle Reductions

- Removed `MOCK_SALARY_DATA` import from `CompareSelectors` (options passed from server page).
- Converted full compare page from client → server + `CompareControls` island.
- Converted `SalaryPagination` to server component.
- Replaced debounce timeout `useState` with `useRef` in `SalaryFilters`.
- Deduplicated currency conversion helpers into `convertSalaryAmount`.
- Centralized salary pipeline in `lib/salary-query.ts` (no repeated filter/sort in page).

---

## Loading States

| File | Notes |
|------|-------|
| `app/salaries/loading.tsx` | Updated to match salaries table column layout (slate tokens) |
| `app/companies/[slug]/loading.tsx` | New — mirrors company header/stats/table |
| `app/compare/loading.tsx` | New — mirrors compare layout |

---

## Build Validation

```bash
npm run build
```

Resolved pre-existing TypeScript error in `app/compare/layout.tsx` (breadcrumb schema `url` + `position`).

---

## Remaining Risks

| Risk | Mitigation / follow-up |
|------|------------------------|
| `SalaryFilters` still requires client JS for debounced search | Could move search to native `<form method="GET">` in a future pass |
| Root layout + page-level `Container` | Double horizontal padding on some routes; unchanged to avoid UI drift |
| Homepage still fetches API at build/request time | Depends on DB availability during ISR; mock salaries page unaffected |
| Generic company logo placeholder | Per-company SVG assets would improve branding without layout change |
| `searchParams` on `/salaries` | Keeps page dynamic per request; table body still server-rendered |
| Large `CompareControls` option list | Acceptable for mock dataset; virtualize if record count grows |

---

## F2–F5 Compatibility

- Salary table: still server-rendered with same columns and currency behavior.
- Compare URL contract (`?s1=&s2=`): unchanged.
- SEO metadata/JSON-LD: preserved; company page adds planned static SEO surface.
- Backend APIs / Prisma: not modified.
- UI structure: no redesign; spacing tokens aligned only in loading skeletons.
