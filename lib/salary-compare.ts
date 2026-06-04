import { Prisma } from '@prisma/client';

export type SalaryWithCompany = Prisma.SalaryGetPayload<{
  include: {
    company: true;
  };
}>;

export const serializeCompany = (company: SalaryWithCompany['company']) => ({
  ...company,
  created_at: company.created_at.toISOString(),
  updated_at: company.updated_at.toISOString(),
});

export const serializeSalary = (salary: SalaryWithCompany) => ({
  ...salary,
  base_salary: salary.base_salary.toString(),
  bonus: salary.bonus.toString(),
  stock: salary.stock.toString(),
  total_compensation: salary.total_compensation.toString(),
  confidence_score: salary.confidence_score.toString(),
  submitted_at: salary.submitted_at.toISOString(),
  company: serializeCompany(salary.company),
});

export const getSalaryDelta = (
  record1: SalaryWithCompany,
  record2: SalaryWithCompany,
) => ({
  base_delta: Number(record1.base_salary - record2.base_salary),
  bonus_delta: Number(record1.bonus - record2.bonus),
  stock_delta: Number(record1.stock - record2.stock),
  tc_delta: Number(record1.total_compensation - record2.total_compensation),
  experience_delta: record1.experience_years - record2.experience_years,
});
