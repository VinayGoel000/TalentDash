import type { Prisma, Source } from '@prisma/client';
import type { SalaryRecord } from '@/types/salary';

export type SalaryWithCompany = Prisma.SalaryGetPayload<{
  include: { company: true };
}>;

const SOURCE_MAP: Record<Source, SalaryRecord['source']> = {
  CONTRIBUTOR: 'CONTRIBUTOR',
  SCRAPED: 'CONTRIBUTOR',
  AI_INFERRED: 'CONTRIBUTOR',
};

export function mapSalaryWithCompanyToRecord(salary: SalaryWithCompany): SalaryRecord {
  return {
    id: salary.id,
    company: salary.company.name,
    company_slug: salary.company.slug,
    role: salary.role,
    level_standardized: salary.level,
    location: salary.location,
    currency: salary.currency,
    experience_years: salary.experience_years,
    base_salary: Number(salary.base_salary),
    bonus: Number(salary.bonus),
    stock: Number(salary.stock),
    total_compensation: Number(salary.total_compensation),
    source: SOURCE_MAP[salary.source],
    confidence_score: Number(salary.confidence_score),
    submitted_at: salary.submitted_at.toISOString(),
    is_verified: salary.is_verified,
  };
}
