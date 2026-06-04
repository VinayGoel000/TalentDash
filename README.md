# TalentDash Internship Task

TalentDash is a salary intelligence platform built with Next.js 15, Prisma, and PostgreSQL.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env
```

3. Set `DATABASE_URL` in `.env` to your PostgreSQL connection string.

4. Run Prisma migrations:

```bash
npx prisma migrate dev
```

5. Seed the database:

```bash
npx prisma db seed
```

6. Start development server:

```bash
npm run dev
```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string used by Prisma
- `NEXT_PUBLIC_SITE_URL`: Optional canonical site URL for SEO metadata
- `NODE_ENV`: Optional runtime mode for local development

## Prisma Commands

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npx prisma studio
```

## Seed Command

```bash
npx prisma db seed
```

After seeding, frontend pages read from Neon/PostgreSQL via Prisma — not from `lib/mock-data.ts`.

## Project Architecture

- `app/`: Next.js App Router pages and API route handlers
- `lib/db/`: Reusable Prisma data access (`salaries.ts`, `companies.ts`, `transform.ts`)
- `prisma/schema.prisma`: PostgreSQL schema, enums, models, and indexes
- `prisma/seed.ts`: Repeatable seed data for companies and salaries
- `docs/`: Product, data, and architecture source-of-truth documents

## Data Flow

```
Neon Database → Prisma → lib/db helpers → React Server Components → HTML
```

API routes use the same Prisma helpers where possible and expose JSON for external clients.

## Caching Strategy

### GET /api/salaries

`Cache-Control: s-maxage=300, stale-while-revalidate=3600`

- **300s (5 min) CDN cache:** Salary listings change more often (new ingests, filters). Short TTL keeps data fresh without hammering the database.
- **3600s stale-while-revalidate:** After expiry, the CDN may serve slightly stale JSON while fetching an updated response in the background — good UX under load.

The `/salaries` page uses **ISR with `revalidate = 300`** to align with this TTL.

### GET /api/companies/[slug]

`Cache-Control: s-maxage=3600, stale-while-revalidate=86400`

- **3600s (1 hour) CDN cache:** Company profiles and aggregates change slowly; longer cache is safe and cheap.
- **86400s stale-while-revalidate:** Allows a full day of background refresh tolerance for rarely updated company pages.

Company routes use **static generation** (`generateStaticParams` from DB slugs) with **`revalidate = 3600`**.

### After POST /api/ingest-salary

`revalidatePath` and `revalidateTag` bust cached pages for `/salaries`, `/companies`, `/companies/[slug]`, and `/compare` so new records appear without a manual rebuild.

## Deployment

The project is Vercel-ready with:

- `npm run build`
- `npm run start`
- Prisma environment configuration via `DATABASE_URL`

Do not commit secrets. Keep real credentials in `.env`, which is ignored by Git.
