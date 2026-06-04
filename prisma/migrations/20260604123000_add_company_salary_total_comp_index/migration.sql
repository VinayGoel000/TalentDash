-- Add a composite index for company salary lookups ordered by total compensation.
CREATE INDEX IF NOT EXISTS "Salary_company_id_total_compensation_idx" ON "public"."Salary"("company_id", "total_compensation" DESC);
