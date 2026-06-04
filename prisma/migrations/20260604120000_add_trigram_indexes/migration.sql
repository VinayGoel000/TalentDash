-- Add trigram indexes to support case-insensitive partial search filters on salaries and company names.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS "Company_name_trgm_idx" ON "public"."Company" USING gin ("name" gin_trgm_ops);
CREATE INDEX IF NOT EXISTS "Salary_role_trgm_idx" ON "public"."Salary" USING gin ("role" gin_trgm_ops);
CREATE INDEX IF NOT EXISTS "Salary_location_trgm_idx" ON "public"."Salary" USING gin ("location" gin_trgm_ops);
