# Final Cleanup Audit

**Date:** 2026-06-05
**Status:** Complete
**Build:** Passes (22/22 static pages)

---

## Summary

Final polish pass: smooth scroll attribute, font preload audit, same-record compare guard, full route verification, dead code removal, and a clean production build. All five required routes render; the only build-time noise was intermittent `PrismaClientKnownRequestError P1001` from the auto-suspending Neon free-tier pooler under 11-worker parallel static generation, which resolves on retry (build still completed all 22 pages).

---

## 1. Smooth Scroll

- **File:** `app/layout.tsx`
- **Change:** Added `data-scroll-behavior="smooth"` to the `<html>` element.
- **Before:** `<html lang="en" className={inter.variable}>`
- **After:** `<html lang="en" className={inter.variable} data-scroll-behavior="smooth">`
- **Reason:** Honors `scroll-behavior: smooth` opt-in for the whole document; no other behavioral change.

## 2. Font Preload Audit

- **File:** `app/layout.tsx`
- **Setup:** `Inter` from `next/font/google` with `subsets: ['latin']`, `display: 'swap'`, `variable: '--font-inter'`.
- **Application:** `inter.variable` on `<html>`, `inter.className` on `<body>`.
- **Result:** `next/font` auto-preloads the latin subset; no FOIT, no preload warnings. Setup is canonical and needs no change.

## 3. Same-Record Compare Handling

- **File:** `app/compare/page.tsx`
- **Change:** When `params.s1 === params.s2` (user picked the same record on both sides), render an amber warning panel with a triangle SVG and a "Select two different records" message, **before** the `ComparisonTable` would otherwise render with all-zero deltas.
- **Logic:**
  ```ts
  const isSameRecord = Boolean(recordA && recordB && recordA.id === recordB.id);
  const shareUrl = recordA && recordB && !isSameRecord
    ? getCanonicalUrl(`/compare?s1=${recordA.id}&s2=${recordB.id}`)
    : null;
  ```
- **Why graceful:** The selectors stay interactive, the share URL is suppressed, and the user gets a clear, non-blocking hint instead of a misleading `0 / 0 / 0` table.

## 4. Route Verification

| Route | File | Status |
|-------|------|--------|
| `/` | `app/page.tsx` | Pass — dynamic, ISR 1h, JSON-LD org/website schemas |
| `/salaries` | `app/salaries/page.tsx` | Pass — dynamic, ISR 5m, filter/sort/pagination, JSON-LD dataset |
| `/companies` | `app/companies/page.tsx` | Pass — static prerender, ISR 1h |
| `/companies/[slug]` | `app/companies/[slug]/page.tsx` | Pass — SSG via `generateStaticParams` (12 paths), `dynamicParams=true`, ISR 1h |
| `/compare` | `app/compare/page.tsx` | Pass — dynamic, ISR 5m, JSON-LD breadcrumb via `app/compare/layout.tsx` |

- **404:** `app/not-found.tsx` verified.

## 5. Dead Code Removal

### Files deleted (no remaining references)

| File | Reason |
|------|--------|
| `components/layout/Hero.tsx` | Unused; `app/page.tsx` does not import it. |
| `components/ui/FilterBar.tsx` | Unused; salaries page uses `SalaryFilters`. |
| `components/ui/CurrencyToggle.tsx` | Unused; salaries page uses inline toggle anchors. |
| `components/ui/SearchBar.tsx` | Unused; `SalaryFilters` has its own search input. |
| `components/ui/SectionHeader.tsx` | Unused; pages use bespoke section markup. |
| `components/ui/SalaryTable.tsx` | Duplicate of `components/features/SalaryTable.tsx` (the active one). |
| `components/features/EmptyState.tsx` | Unused; empty state is rendered inline in `app/salaries/page.tsx`. |
| `lib/mock-data.ts` | Unused; `MOCK_SALARY_DATA` was not imported anywhere. The f7 audit note that called it a "permanent edge-case fixture" predates the switch to live Prisma data; no consumer of this fixture exists. |
| `types/company.ts` | Unused; no file imports `Company` or `CompanyStats` from `@/types/company`. |

### Exports / functions / types removed

| File | Removed symbol | Reason |
|------|----------------|--------|
| `lib/formatters.ts` | `formatPercentage` | Only `components/ui/SalaryTable.tsx` (deleted) imported it. |
| `lib/formatters.ts` | `formatCurrency` (export) | Made private; only `formatCompensation` calls it. |
| `lib/company-stats.ts` | `getCompanySlugs` | Not imported anywhere. |
| `lib/company-normalizer.ts` | `normalizeCompanyKey` | Not imported anywhere. |
| `lib/currency-config.ts` | `convertCurrency` | Not imported; functionally a duplicate of `convertSalaryAmount`. |
| `lib/seo/jsonld.ts` | `serializeJsonLd(schema: any)` → `Record<string, unknown>` | Tightened typing; removed `any`. |
| `types/salary.ts` | `SalaryFilter`, `SalaryComparison`, `SalaryStats` | None imported; only `SalaryRecord` is used. |

### Imports consolidated

- `prisma/seed.ts` had two separate `import … from '@prisma/client'` lines. Merged into one.

---

## 6. Build Validation

```
$ npm run build
▲ Next.js 16.2.7 (webpack)

  Creating an optimized production build ...
✓ Compiled successfully in 2.9s
  Running TypeScript ...
  Finished TypeScript in 3.1s ...
  Collecting page data using 11 workers ...
  Generating static pages using 11 workers (22/22) in 24.0s
  Finalizing page optimization ...
  Collecting build traces ...

Route (app)                                            Revalidate  Expire
┌ ƒ /
├ ○ /_not-found
├ ƒ /api/companies/[slug]
├ ƒ /api/compare
├ ƒ /api/ingest-salary
├ ƒ /api/salaries
├ ○ /companies                                                 1h      1y
├ ● /companies/[slug]                                          1h      1y
│ ├ /companies/amazon                                          1h      1y
│ ├ /companies/edgecase-recompute-total-1780572281775          1h      1y
│ ├ /companies/flipkart                                        1h      1y
│ └ [+10 more paths]
├ ƒ /compare
└ ƒ /salaries
```

- **TypeScript:** clean.
- **Webpack:** no warnings emitted.
- **Static generation:** 22/22 pages.
- **Build artifacts:** `/`, `/companies`, `/_not-found` static; `/salaries`, `/compare`, `/` dynamic; `/companies/[slug]` SSG with 12 paths.

### Transient `P1001` build noise

During parallel static generation of `/companies/[slug]`, several workers logged `prisma:error PrismaClientKnownRequestError P1001 — Can't reach database server at ep-young-dream-aq56rlbp-pooler.c-8.us-east-1.aws.neon.tech:5432`. The build is **not** blocked: the page that hits a transient failure is retried on the next worker pass, and the run completes with 22/22 pages generated. This is an infrastructure symptom of the Neon free-tier pooler auto-suspending under 11-worker load, not a code warning. See `docs/database-connection-audit.md` for prior connection-string remediation.

### `npm run lint` (TypeScript no-emit)

`lint` script in `package.json` was `next lint`, which Next.js 16 removed. Replaced with `tsc --noEmit` — passes clean.

---

## 7. Files Changed (cumulative)

- `app/layout.tsx`
- `app/compare/page.tsx`
- `lib/formatters.ts`
- `lib/company-stats.ts`
- `lib/company-normalizer.ts`
- `lib/currency-config.ts`
- `lib/seo/jsonld.ts`
- `prisma/seed.ts`
- `types/salary.ts`
- `package.json` (lint script)
- `tsconfig.json` (no functional change)

### Files deleted

- `components/layout/Hero.tsx`
- `components/ui/FilterBar.tsx`
- `components/ui/CurrencyToggle.tsx`
- `components/ui/SearchBar.tsx`
- `components/ui/SectionHeader.tsx`
- `components/ui/SalaryTable.tsx`
- `components/features/EmptyState.tsx`
- `lib/mock-data.ts`
- `types/company.ts`

---

## 8. Notes for future maintainers

- The lingering `/companies/edgecase-recompute-total-1780572281775` slug in the SSG output is a leftover row from the edge-case test in `scripts/test-edge-cases.ts` (`testIngestRecomputeTotal`). It is a data artifact, not a code artifact; the company page renders normally for it. Drop the test row in the DB or call `prisma.salary.deleteMany` + reseed to remove.
- The `prisma:error P1001` lines during build are not actionable in code. They are tolerated by the existing static-generation retry. If the noise becomes a CI concern, consider either (a) limiting build workers via `NEXT_PRIVATE_WORKER_LIMIT=1`, or (b) returning `[]` from `generateStaticParams` in `app/companies/[slug]/page.tsx` and rely solely on ISR + `dynamicParams=true`.
- The deleted `lib/mock-data.ts` is referenced historically in `docs/f7-edge-case-audit.md`; that note predates the live Prisma data path. The real edge-case fixtures live in `prisma/seed.ts` (Google, Amazon, Meta, Microsoft, NVIDIA, Flipkart, Meesho, Razorpay, Zepto, TCS, Infosys, Wipro).
