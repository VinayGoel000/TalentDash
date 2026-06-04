# F7 — Frontend Edge Case Audit

**Date:** 2026-06-04  
**Status:** Complete

---

## Summary

All seven edge cases were verified and hardened on the frontend. No backend APIs, Prisma schema, or UI redesign were changed. Shared helpers in `lib/salary-display.ts` and `lib/formatters.ts` centralize display rules.

---

## Edge Case Results

| # | Edge Case | Result | Notes |
|---|-----------|--------|-------|
| 1 | All filters active simultaneously | **PASS** | `lib/salary-query.ts` applies company, role, level, location, search, currency, sort, and page in one pipeline. Filter handlers preserve existing `URLSearchParams`. Currency toggles and out-of-range pagination redirect keep all params. Sortable table headers update `sort` / `sortOrder` without clearing filters. |
| 2 | Empty results | **PASS** | Zero matches render “No records found for these filters.” with **Clear All Filters** (`/salaries`). Table and pagination are not rendered. |
| 3 | Company with one record (level distribution) | **PASS** | `getLevelDistributionEntries()` computes `percent = round(count / total * 100)`. Single-level company (`iasel`) shows **100%** bar width. No divide-by-zero (`totalRecords === 0` returns `[]`). |
| 4 | No bonus + no stock | **PASS** | `formatOptionalSalary()` shows **—** for `0`, `null`, `undefined`, and `NaN`. `resolveDisplayTotalCompensation()` uses base salary when bonus and stock are absent. Compare and company tables use shared helpers. Fixture: `iasel-001`. |
| 5 | Very long company names | **PASS** | Salary and compare tables use `truncate`, `max-w-*`, and `title` tooltips. Company page header uses `truncate` + `title`. `table-fixed` prevents layout blowout. Fixture: IASEL long name record. |
| 6 | Very large salary values | **PASS** | `formatSalaryWithCurrency` delegates to `formatCompensation()` (₹L / ₹Cr Indian grouping). `40000000` → **₹4 Cr**. No scientific notation; `Number.isFinite` guard returns **—** for invalid values. |
| 7 | Company page routing | **PASS** | Valid slugs render static/ISR company pages. Invalid slug calls `notFound()` → `app/not-found.tsx`. `dynamicParams = true` allows runtime 404 for unknown slugs. |

---

## Test Data

| Record ID | Purpose | Status |
|-----------|---------|--------|
| `iasel-001` | Long company name, single-record company, no bonus/stock, ₹4 Cr TC | **Kept** in `lib/mock-data.ts` as a permanent edge-case fixture (required for reproducible validation) |

---

## Files Changed

- `lib/salary-display.ts` — optional salary formatting, TC resolution
- `lib/salary-query.ts` — sort allowlist, `getSortUrl`, preserved redirect params
- `lib/company-stats.ts` — `getLevelDistributionEntries` with percentages
- `lib/currency-config.ts` — INR formatting via `formatCompensation`
- `lib/formatters.ts` — finite-number guard
- `lib/mock-data.ts` — IASEL edge fixture
- `components/features/SalaryTable.tsx` — truncate, sort links, shared formatters
- `components/features/ComparisonTable.tsx` — truncate, shared formatters
- `components/features/SalaryFilters.tsx` — Clear All Filters label
- `app/salaries/page.tsx` — pagination redirect preserves filters, query string to table
- `app/companies/[slug]/page.tsx` — level bars with %, truncate header
- `app/not-found.tsx` — 404 UI

---

## Build Validation

```bash
npm run build
```

Expected: TypeScript clean, no runtime errors on static generation for all company slugs including `iasel`.

---

## Remaining Notes

- Salary table has no Bonus column (stock only); bonus **—** rules apply on `/compare` and in shared formatters for any future bonus display.
- Empty-state copy uses sentence case in heading; button uses **Clear All Filters** per spec.
