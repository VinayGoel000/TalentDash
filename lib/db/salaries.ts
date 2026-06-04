import { Currency, Level, Prisma } from '@prisma/client';
import { prisma } from '@/app/lib/db';
import {
  RECORDS_PER_PAGE,
  buildQueryString,
  resolveSortField,
  type SalaryQueryResult,
  type SalarySearchParams,
} from '@/lib/salary-query';
import type { SalaryRecord } from '@/types/salary';
import type { Currency as DisplayCurrency } from '@/lib/currency-config';
import { mapSalaryWithCompanyToRecord, type SalaryWithCompany } from '@/lib/db/transform';

const levelValues = new Set(Object.values(Level));
const currencyValues = new Set(Object.values(Currency));

const normalizeText = (value: string) => value.trim().toLowerCase();

export function buildSalaryWhereInput(params: SalarySearchParams): Prisma.SalaryWhereInput {
  const andConditions: Prisma.SalaryWhereInput[] = [];

  if (params.company) {
    const company = params.company;
    const normalizedCompany = normalizeText(company);
    andConditions.push({
      company: {
        OR: [
          { normalized_name: normalizedCompany },
          { name: { equals: company, mode: 'insensitive' } },
          { slug: normalizedCompany.replace(/[^a-z0-9]+/g, '-') },
        ],
      },
    });
  }

  if (params.role) {
    andConditions.push({ role: { equals: params.role, mode: 'insensitive' } });
  }

  if (params.location) {
    andConditions.push({ location: { equals: params.location, mode: 'insensitive' } });
  }

  if (params.level) {
    const levels = params.level
      .split(',')
      .map((value) => value.trim())
      .filter((value) => levelValues.has(value as Level)) as Level[];

    if (levels.length === 1) {
      andConditions.push({ level: levels[0] });
    } else if (levels.length > 1) {
      andConditions.push({ level: { in: levels } });
    }
  }

  if (params.currency && currencyValues.has(params.currency as Currency)) {
    andConditions.push({ currency: params.currency as Currency });
  }

  if (params.search?.trim()) {
    const q = params.search.trim();
    andConditions.push({
      OR: [
        { role: { contains: q, mode: 'insensitive' } },
        { location: { contains: q, mode: 'insensitive' } },
        {
          company: {
            OR: [
              { name: { contains: q, mode: 'insensitive' } },
              { normalized_name: normalizeText(q) },
              { slug: normalizeText(q).replace(/[^a-z0-9]+/g, '-') },
            ],
          },
        },
      ],
    });
  }

  return andConditions.length > 0 ? { AND: andConditions } : {};
}

export function buildSalaryOrderBy(
  sort?: string,
  sortOrder?: string,
): Prisma.SalaryOrderByWithRelationInput | Prisma.SalaryOrderByWithRelationInput[] {
  const direction: Prisma.SortOrder = sortOrder === 'asc' ? 'asc' : 'desc';

  switch (sort) {
    case 'base_salary':
      return { base_salary: direction };
    case 'company':
      return { company: { name: direction } };
    case 'role':
      return { role: direction };
    case 'location':
      return { location: direction };
    case 'experience_years':
      return { experience_years: direction };
    case 'level_standardized':
      return { level: direction };
    default:
      return { total_compensation: direction };
  }
}

export async function countSalaries(where: Prisma.SalaryWhereInput = {}) {
  return prisma.salary.count({ where });
}

export async function getSalaryFilterOptions() {
  const [companies, roles, locations, levels] = await Promise.all([
    prisma.company.findMany({ select: { name: true }, orderBy: { name: 'asc' } }),
    prisma.salary.findMany({ distinct: ['role'], select: { role: true }, orderBy: { role: 'asc' } }),
    prisma.salary.findMany({ distinct: ['location'], select: { location: true }, orderBy: { location: 'asc' } }),
    prisma.salary.findMany({ distinct: ['level'], select: { level: true }, orderBy: { level: 'asc' } }),
  ]);

  return {
    companies: companies.map((company) => company.name),
    roles: roles.map((row) => row.role),
    levels: levels.map((row) => row.level).sort(),
    locations: locations.map((row) => row.location),
  };
}

export async function fetchSalariesPage(params: SalarySearchParams): Promise<{
  result: SalaryQueryResult;
  totalDatabaseCount: number;
  filteredCount: number;
}> {
  const displayCurrency: DisplayCurrency = (params.currency as DisplayCurrency) || 'INR';
  const sortBy = resolveSortField(params.sort);
  const sortOrder: 'asc' | 'desc' = params.sortOrder === 'asc' ? 'asc' : 'desc';
  const requestedPage = Math.max(1, parseInt(params.page || '1', 10) || 1);
  const where = buildSalaryWhereInput(params);
  const orderBy = buildSalaryOrderBy(sortBy, sortOrder);

  const [totalDatabaseCount, filteredCount] = await prisma.$transaction([
    prisma.salary.count(),
    prisma.salary.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredCount / RECORDS_PER_PAGE));
  const safePage = filteredCount === 0 ? 1 : Math.min(requestedPage, totalPages);

  const rows = await prisma.salary.findMany({
    where,
    orderBy,
    skip: (safePage - 1) * RECORDS_PER_PAGE,
    take: RECORDS_PER_PAGE,
    include: { company: true },
  });

  const filteredRecords = rows.map(mapSalaryWithCompanyToRecord);

  const result: SalaryQueryResult = {
    displayCurrency,
    filteredRecords,
    sortedRecords: filteredRecords,
    paginatedRecords: filteredRecords,
    sortBy,
    sortOrder,
    currentPage: safePage,
    totalPages,
    isFirstPage: safePage === 1,
    isLastPage: safePage >= totalPages || filteredCount === 0,
    queryString: buildQueryString({ ...params, page: String(safePage) }),
  };

  return { result, totalDatabaseCount, filteredCount };
}

export async function getSalariesForCompare(): Promise<SalaryRecord[]> {
  const rows = await prisma.salary.findMany({
    include: { company: true },
    orderBy: [{ company: { name: 'asc' } }, { total_compensation: 'desc' }],
  });

  return rows.map(mapSalaryWithCompanyToRecord);
}

export async function getSalariesByIds(ids: string[]): Promise<SalaryRecord[]> {
  if (ids.length === 0) return [];

  const rows = await prisma.salary.findMany({
    where: { id: { in: ids } },
    include: { company: true },
  });

  return rows.map(mapSalaryWithCompanyToRecord);
}

export function serializeSalaryForApi(salary: SalaryWithCompany) {
  return {
    ...salary,
    base_salary: salary.base_salary.toString(),
    bonus: salary.bonus.toString(),
    stock: salary.stock.toString(),
    total_compensation: salary.total_compensation.toString(),
    confidence_score: salary.confidence_score.toString(),
    submitted_at: salary.submitted_at.toISOString(),
    company: {
      ...salary.company,
      created_at: salary.company.created_at.toISOString(),
      updated_at: salary.company.updated_at.toISOString(),
    },
  };
}
