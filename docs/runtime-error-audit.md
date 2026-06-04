# Runtime Error Audit

**Date:** 2026-06-04  
**Status:** Resolved

---

## Issue 1

**Issue:** `GET /companies` returned 404.

**Root Cause:** Navbar, homepage “View Companies” button, and company-page breadcrumb JSON-LD referenced `/companies`, but only `app/companies/[slug]/page.tsx` existed.

**Files Affected:** `components/layout/Navbar.tsx`, `app/page.tsx`, `app/companies/[slug]/page.tsx` (breadcrumb URL)

**Fix Applied:**
- Added `app/companies/page.tsx` (server-rendered company directory from `MOCK_SALARY_DATA`).
- Added `getCompanyIndex()` in `lib/company-stats.ts`.
- Added `getCompaniesIndexMetadata()` in `lib/seo/metadata.ts`.

**Verification Result:** `/companies` builds as static ISR route; directory lists all employers with links to `/companies/[slug]`.

---

## Issue 2

**Issue:** `GET /tools` returned 404.

**Root Cause:** Navbar included a `/tools` link; no `app/tools/page.tsx` and tools are not in trial requirements (future roadmap only).

**Files Affected:** `components/layout/Navbar.tsx`

**Fix Applied:** Removed `/tools` from `navLinks` (no placeholder page created).

**Verification Result:** Navbar no longer navigates to a missing route.

---

## Issue 3

**Issue:** Homepage “View Details” on featured companies navigated to `/salaries` instead of company pages.

**Root Cause:** `app/page.tsx` hardcoded `href="/salaries"` on featured company cards.

**Files Affected:** `app/page.tsx`

**Fix Applied:** Updated links to `href={/companies/${company.slug}}`.

**Verification Result:** Featured company cards route to correct F3 company pages.

---

## Issue 4

**Issue:** Homepage latest-salaries table company names were not linked.

**Root Cause:** Company column rendered plain text only.

**Files Affected:** `app/page.tsx`

**Fix Applied:** Wrapped company name in `Link` to `/companies/${row.company.slug}`.

**Verification Result:** Consistent navigation with salary table company links.

---

## Issue 5

**Issue:** Dead import in `lib/seo/jsonld.ts`.

**Root Cause:** Unused `SalaryRecord` type import (no runtime failure, TypeScript clean).

**Files Affected:** `lib/seo/jsonld.ts`

**Fix Applied:** Removed unused import.

**Verification Result:** TypeScript build passes.

---

## Import Audit Summary

| Finding | Action |
|---------|--------|
| All `@/` imports resolve | No broken aliases |
| `components/ui/SalaryTable.tsx` | Unused duplicate (API-shaped rows); not imported by app routes — documented, not deleted |
| `components/layout/Hero.tsx` | Unused — documented, not deleted |
| `components/features/EmptyState.tsx` | Unused — documented, not deleted |
| `components/ui/FilterBar.tsx`, `SearchBar.tsx` | Unused — documented, not deleted |

No broken imports found in active route tree.

---

## App Router Audit

| Check | Result |
|-------|--------|
| App Router only | Pass |
| No `pages/` directory | Pass |
| No duplicate route definitions | Pass |
| `notFound()` for invalid company slug | Pass |
| `app/not-found.tsx` present | Pass |

---

## F2 / F3 / F4 Validation

| Page | Result |
|------|--------|
| `/salaries` | Pass — filters, table (RSC), pagination unchanged |
| `/companies/google` | Pass — static company page renders |
| `/compare` | Pass — server page + client selectors |

---

## Build Validation

```bash
npm run build
```

**Result:** Pass (TypeScript clean, static generation for all company slugs + `/companies` index).

---

## Remaining Non-Blocking Items

- Unused UI components (`Hero`, `EmptyState`, `FilterBar`, `SearchBar`, `ui/SalaryTable`) remain for potential future use; they do not affect routing or runtime.
- Homepage company list uses API data when DB is available; `/companies` index uses mock data (consistent with `/salaries` and F3 pages).
