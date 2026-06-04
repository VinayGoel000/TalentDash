# Route Audit

**Date:** 2026-06-04  
**Project:** TalentDash internship task

---

## App Router Inventory

| Route | File | Type |
|-------|------|------|
| `/` | `app/page.tsx` | Dynamic (ISR, API fetch) |
| `/salaries` | `app/salaries/page.tsx` | Dynamic (searchParams) |
| `/salaries` (loading) | `app/salaries/loading.tsx` | Loading UI |
| `/companies` | `app/companies/page.tsx` | Static (ISR `revalidate: 3600`) |
| `/companies/[slug]` | `app/companies/[slug]/page.tsx` | SSG + ISR (`generateStaticParams`) |
| `/companies/[slug]` (loading) | `app/companies/[slug]/loading.tsx` | Loading UI |
| `/compare` | `app/compare/page.tsx` | Dynamic (searchParams) |
| `/compare` (layout) | `app/compare/layout.tsx` | Layout + metadata |
| `/compare` (loading) | `app/compare/loading.tsx` | Loading UI |
| Global 404 | `app/not-found.tsx` | Not found UI |
| Root layout | `app/layout.tsx` | Root layout |

### API Routes (not user-facing pages)

| Route | File |
|-------|------|
| `GET/POST /api/salaries` | `app/api/salaries/route.ts` |
| `GET /api/companies/[slug]` | `app/api/companies/[slug]/route.ts` |
| `GET /api/compare` | `app/api/compare/route.ts` |
| `POST /api/ingest-salary` | `app/api/ingest-salary/route.ts` |

### Routes Not Implemented (by design)

| Route | Reason |
|-------|--------|
| `/tools` | Future roadmap only; not in trial requirements. Navbar link removed. |
| `/tools/*` | Not in scope |

### Router Conflicts

- **Pages Router:** None (`pages/` directory absent).
- **Duplicate routes:** None detected.

---

## Frontend Route Status

| Route | Exists? | Linked from Navbar? | Working? | Notes |
|-------|---------|---------------------|----------|-------|
| `/` | Yes | Yes (logo) | Yes | Homepage; ISR API fetch |
| `/salaries` | Yes | Yes | Yes | F2 salary table + filters |
| `/companies` | Yes | Yes | Yes | **Added** company directory (`app/companies/page.tsx`) |
| `/companies/[slug]` | Yes | Via directory + table links | Yes | F3 company page; invalid slug → 404 |
| `/compare` | Yes | Yes | Yes | F4 compare page |
| `/tools` | No | No (removed) | N/A | Was navbar-only 404; link removed |

---

## Navigation Link Audit

| Source | Target | Status |
|--------|--------|--------|
| Navbar | `/`, `/companies`, `/salaries`, `/compare` | OK |
| Navbar CTA | `/salaries` | OK |
| Homepage hero CTA | `/salaries`, `/companies` | OK |
| Homepage featured companies | `/companies/[slug]` | **Fixed** (was `/salaries`) |
| Homepage latest salaries company | `/companies/[slug]` | **Fixed** (plain text → link) |
| Salary table company cell | `/companies/[slug]` | OK |
| Company page breadcrumb (JSON-LD) | `/companies` | OK (page now exists) |
| Company page CTA | `/salaries?company=...` | OK |
| Footer | No route links | OK |
| `Hero.tsx` (unused) | `/companies` | Dead component; no runtime impact |

---

## Manual Verification Checklist

- [x] `/` loads
- [x] `/salaries` loads
- [x] `/companies` loads
- [x] `/companies/google` loads
- [x] `/compare` loads
- [x] `/companies/invalid-slug` → 404 via `notFound()`
- [x] Navbar has no links to missing routes
