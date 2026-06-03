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

## Project Architecture

- `app/`: Next.js App Router route handlers and shared server utilities
- `prisma/schema.prisma`: PostgreSQL schema, enums, models, and indexes
- `prisma/seed.ts`: Repeatable seed data for companies and salaries
- `docs/`: Product, data, and architecture source-of-truth documents

## Deployment

The project is Vercel-ready with:

- `npm run build`
- `npm run start`
- Prisma environment configuration via `DATABASE_URL`

Do not commit secrets. Keep real credentials in `.env`, which is ignored by Git.
