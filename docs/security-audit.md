# Security Audit

## Files Scanned

* `.gitignore`
* `.env`
* `.env.example`
* `README.md`
* `prisma/schema.prisma`
* `prisma/seed.ts`
* `app/lib/db.ts`
* `app/api/ingest-salary/route.ts`
* `app/api/salaries/route.ts`
* `docs/*.md`
* `package.json`

## Secrets Found

* `.env.example` contained a database connection string placeholder that included the literal word `PASSWORD`
* `.env` exists locally and contains a real `DATABASE_URL` credential value, but it is ignored by `.gitignore`
* `prisma/schema.prisma` references `DATABASE_URL` through `env("DATABASE_URL")`, which is expected and not a hardcoded secret
* `README.md` references `DATABASE_URL` as a setup variable, which is expected and not a hardcoded secret

## Actions Taken

* Verified `.gitignore` exists
* Expanded `.gitignore` to include:
  * `.env`
  * `.env.local`
  * `.env.production`
  * `.env.development`
  * `.env.*.local`
* Replaced the hardcoded connection string pattern in `.env.example` with placeholders only
* Updated `NODE_ENV` in `.env.example` to a placeholder value
* Created this security audit report

## Remaining Risks

* `git` is not available in the current execution environment, so I could not run `git status` or verify tracked-file state directly
* A real `.env` file is present locally; it should remain untracked and must not be committed
* If `.env` was previously committed in another environment, it still needs to be removed from Git history or index there
* Application runtime secrets should continue to live only in local environment files and deployment secret stores
