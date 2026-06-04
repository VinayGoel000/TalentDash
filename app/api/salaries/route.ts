import { Currency, Level } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { withSalariesCacheHeaders } from '@/lib/db/cache-headers';
import {
  buildSalaryOrderBy,
  buildSalaryWhereInput,
  serializeSalaryForApi,
} from '@/lib/db/salaries';
import type { SalarySearchParams } from '@/lib/salary-query';

const levelValues = new Set(Object.values(Level));
const currencyValues = new Set(Object.values(Currency));

const jsonError = (message: string, status = 400) =>
  NextResponse.json({ error: true, message }, { status });

const parseInteger = (value: string | null, fallback: number) => {
  if (value === null || value.trim() === '') return fallback;
  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : fallback;
};

const parseOptionalNumber = (value: string | null) => {
  if (value === null || value.trim() === '') return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const mapApiSortToPageSort = (sort: string) => {
  switch (sort) {
    case 'total_comp_asc':
    case 'salary_asc':
      return { sort: 'total_compensation', sortOrder: 'asc' as const };
    case 'total_comp_desc':
    case 'salary_desc':
      return { sort: 'total_compensation', sortOrder: 'desc' as const };
    case 'date_asc':
    case 'oldest':
      return { sort: 'submitted_at', sortOrder: 'asc' as const };
    default:
      return { sort: 'total_compensation', sortOrder: 'desc' as const };
  }
};

export async function GET(request: Request) {
  const url = new URL(request.url);

  const page = Math.max(1, parseInteger(url.searchParams.get('page'), 1));
  const limit = Math.min(100, Math.max(1, parseInteger(url.searchParams.get('limit'), 25)));
  const level = url.searchParams.get('level');
  const currency = url.searchParams.get('currency');
  const minSalary = parseOptionalNumber(url.searchParams.get('minSalary'));
  const maxSalary = parseOptionalNumber(url.searchParams.get('maxSalary'));
  const verified = url.searchParams.get('verified');
  const apiSort = url.searchParams.get('sort') ?? 'date_desc';
  const mappedSort = mapApiSortToPageSort(apiSort);

  if (level && !levelValues.has(level as Level)) {
    return jsonError('Invalid level');
  }

  if (currency && !currencyValues.has(currency as Currency)) {
    return jsonError('Invalid currency');
  }

  const searchParams: SalarySearchParams = {
    company: url.searchParams.get('company') ?? undefined,
    role: url.searchParams.get('role') ?? undefined,
    location: url.searchParams.get('location') ?? undefined,
    level: level ?? undefined,
    currency: currency ?? undefined,
    search: url.searchParams.get('search') ?? undefined,
    sort: mappedSort.sort,
    sortOrder: mappedSort.sortOrder,
    page: String(page),
  };

  const where = buildSalaryWhereInput(searchParams);
  const andConditions = Array.isArray(where.AND) ? [...where.AND] : where.AND ? [where.AND] : [];

  if (verified !== null) {
    if (verified === 'true' || verified === 'false') {
      andConditions.push({ is_verified: verified === 'true' });
    } else {
      return jsonError('Invalid verified filter');
    }
  }

  if (minSalary !== undefined || maxSalary !== undefined) {
    andConditions.push({
      total_compensation: {
        gte: minSalary !== undefined ? BigInt(Math.trunc(minSalary)) : undefined,
        lte: maxSalary !== undefined ? BigInt(Math.trunc(maxSalary)) : undefined,
      },
    });
  }

  const finalWhere = andConditions.length > 0 ? { AND: andConditions } : {};
  const orderBy =
    apiSort === 'date_desc' || apiSort === 'newest' || apiSort === 'confidence_desc'
      ? apiSort === 'confidence_desc'
        ? { confidence_score: 'desc' as const }
        : { submitted_at: 'desc' as const }
      : apiSort === 'date_asc' || apiSort === 'oldest'
        ? { submitted_at: 'asc' as const }
        : buildSalaryOrderBy(mappedSort.sort, mappedSort.sortOrder);

  const skip = (page - 1) * limit;

  const [total, rows] = await prisma.$transaction([
    prisma.salary.count({ where: finalWhere }),
    prisma.salary.findMany({
      where: finalWhere,
      orderBy,
      skip,
      take: limit,
      include: { company: true },
    }),
  ]);

  return NextResponse.json(
    {
      data: rows.map(serializeSalaryForApi),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    },
    withSalariesCacheHeaders(),
  );
}
