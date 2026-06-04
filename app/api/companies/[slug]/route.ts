import { Prisma, Level } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

const levelValues = [
  'L3',
  'L4',
  'L5',
  'L6',
  'SDE_I',
  'SDE_II',
  'SDE_III',
  'STAFF',
  'PRINCIPAL',
  'IC4',
  'IC5',
] as const;

type SalaryWithCompany = Prisma.SalaryGetPayload<{
  include: {
    company: true;
  };
}>;

type LevelValue = (typeof levelValues)[number];

type LevelDistribution = Record<LevelValue, number>;

const jsonError = (message: string, status = 400) =>
  NextResponse.json({ error: true, message }, { status });

const serializeCompany = (company: NonNullable<SalaryWithCompany['company']>) => ({
  ...company,
  created_at: company.created_at.toISOString(),
  updated_at: company.updated_at.toISOString(),
});

const serializeSalary = (salary: SalaryWithCompany) => ({
  ...salary,
  base_salary: salary.base_salary.toString(),
  bonus: salary.bonus.toString(),
  stock: salary.stock.toString(),
  total_compensation: salary.total_compensation.toString(),
  confidence_score: salary.confidence_score.toString(),
  submitted_at: salary.submitted_at.toISOString(),
  company: serializeCompany(salary.company),
});

const buildLevelDistribution = (salaries: SalaryWithCompany[]): LevelDistribution => {
  return levelValues.reduce((distribution, level) => {
    distribution[level] = 0;
    return distribution;
  }, {} as LevelDistribution);
};

const medianTotalCompensation = (values: bigint[]): number => {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 1) {
    return Number(sorted[mid]);
  }

  return Number(sorted[mid - 1] + sorted[mid]) / 2;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const company = await prisma.company.findUnique({
    where: { slug },
  });

  if (!company) {
    return jsonError('Company not found', 404);
  }

  const salaries = await prisma.salary.findMany({
    where: { company_id: company.id },
    orderBy: { total_compensation: 'desc' },
    include: { company: true },
  });

  const distribution = buildLevelDistribution(salaries);

  for (const salary of salaries) {
    distribution[salary.level] += 1;
  }

  const totalCompensationValues = salaries.map((salary) => salary.total_compensation);

  return NextResponse.json({
    company: {
      ...company,
      created_at: company.created_at.toISOString(),
      updated_at: company.updated_at.toISOString(),
    },
    median_total_compensation: medianTotalCompensation(totalCompensationValues),
    level_distribution: distribution,
    salaries: salaries.map(serializeSalary),
  });
}
