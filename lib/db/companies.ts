import { prisma } from '@/app/lib/db';
import {
  getCompanyIndex,
  getCompanyStats,
  type CompanyIndexEntry,
  type CompanyStats,
} from '@/lib/company-stats';
import { mapSalaryWithCompanyToRecord } from '@/lib/db/transform';
import { serializeSalaryForApi } from '@/lib/db/salaries';

export async function getAllCompanySlugs(): Promise<string[]> {
  const companies = await prisma.company.findMany({
    select: { slug: true },
    orderBy: { slug: 'asc' },
  });

  return companies.map((company) => company.slug);
}

export async function getCompanyPageStats(slug: string): Promise<CompanyStats | null> {
  const company = await prisma.company.findUnique({
    where: { slug },
  });

  if (!company) {
    return null;
  }

  const salaries = await prisma.salary.findMany({
    where: { company_id: company.id },
    include: { company: true },
    orderBy: { total_compensation: 'desc' },
  });

  const records = salaries.map(mapSalaryWithCompanyToRecord);
  return getCompanyStats(records, slug);
}

export async function getCompanyIndexFromDb(): Promise<CompanyIndexEntry[]> {
  const salaries = await prisma.salary.findMany({
    include: { company: true },
    orderBy: { total_compensation: 'desc' },
  });

  return getCompanyIndex(salaries.map(mapSalaryWithCompanyToRecord));
}

export async function getCompanyApiPayload(slug: string) {
  const company = await prisma.company.findUnique({ where: { slug } });

  if (!company) {
    return null;
  }

  const salaries = await prisma.salary.findMany({
    where: { company_id: company.id },
    orderBy: { total_compensation: 'desc' },
    include: { company: true },
  });

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

  const distribution = levelValues.reduce<Record<(typeof levelValues)[number], number>>(
    (acc, level) => {
      acc[level] = 0;
      return acc;
    },
    {} as Record<(typeof levelValues)[number], number>,
  );

  for (const salary of salaries) {
    distribution[salary.level] += 1;
  }

  const totals = salaries.map((salary) => salary.total_compensation);
  const medianTotalCompensation = (() => {
    if (totals.length === 0) return 0;
    const sorted = [...totals].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 1) return Number(sorted[mid]);
    return Number(sorted[mid - 1] + sorted[mid]) / 2;
  })();

  return {
    company: {
      ...company,
      created_at: company.created_at.toISOString(),
      updated_at: company.updated_at.toISOString(),
    },
    median_total_compensation: medianTotalCompensation,
    level_distribution: distribution,
    salaries: salaries.map(serializeSalaryForApi),
  };
}
