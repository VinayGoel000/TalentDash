import { Currency, Level, Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

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

const normalizeText = (value: string) => value.trim().toLowerCase();

const serializeSalary = (
  salary: Awaited<ReturnType<typeof prisma.salary.findMany>>[number],
) => ({
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
});

export async function GET(request: Request) {
  const url = new URL(request.url);

  const page = Math.max(1, parseInteger(url.searchParams.get('page'), 1));
  const limit = Math.min(100, Math.max(1, parseInteger(url.searchParams.get('limit'), 20)));
  const company = url.searchParams.get('company');
  const role = url.searchParams.get('role');
  const location = url.searchParams.get('location');
  const level = url.searchParams.get('level');
  const currency = url.searchParams.get('currency');
  const minSalary = parseOptionalNumber(url.searchParams.get('minSalary'));
  const maxSalary = parseOptionalNumber(url.searchParams.get('maxSalary'));
  const verified = url.searchParams.get('verified');
  const sort = url.searchParams.get('sort') ?? 'salary_desc';
  const search = url.searchParams.get('search');

  if (level && !levelValues.has(level as Level)) {
    return jsonError('Invalid level');
  }

  if (currency && !currencyValues.has(currency as Currency)) {
    return jsonError('Invalid currency');
  }

  const where: Prisma.SalaryWhereInput = {
    AND: [],
  };

  if (company) {
    const normalizedCompany = normalizeText(company);
    where.AND?.push({
      company: {
        OR: [
          { normalized_name: normalizedCompany },
          { name: { contains: company, mode: 'insensitive' } },
          { slug: normalizeText(company).replace(/[^a-z0-9]+/g, '-') },
        ],
      },
    });
  }

  if (role) {
    where.AND?.push({
      role: { contains: role, mode: 'insensitive' },
    });
  }

  if (location) {
    where.AND?.push({
      location: { contains: location, mode: 'insensitive' },
    });
  }

  if (level) {
    where.AND?.push({ level: level as Level });
  }

  if (currency) {
    where.AND?.push({ currency: currency as Currency });
  }

  if (verified !== null) {
    if (verified === 'true' || verified === 'false') {
      where.AND?.push({ is_verified: verified === 'true' });
    } else {
      return jsonError('Invalid verified filter');
    }
  }

  if (minSalary !== undefined || maxSalary !== undefined) {
    where.AND?.push({
      total_compensation: {
        gte: minSalary !== undefined ? BigInt(Math.trunc(minSalary)) : undefined,
        lte: maxSalary !== undefined ? BigInt(Math.trunc(maxSalary)) : undefined,
      },
    });
  }

  if (search && search.trim()) {
    const q = search.trim();
    where.AND?.push({
      OR: [
        {
          role: {
            contains: q,
            mode: 'insensitive',
          },
        },
        {
          location: {
            contains: q,
            mode: 'insensitive',
          },
        },
        {
          company: {
            OR: [
              {
                name: {
                  contains: q,
                  mode: 'insensitive',
                },
              },
              {
                normalized_name: normalizeText(q),
              },
              {
                slug: normalizeText(q).replace(/[^a-z0-9]+/g, '-'),
              },
            ],
          },
        },
      ],
    });
  }

  const orderBy =
    sort === 'salary_asc'
      ? { total_compensation: 'asc' as const }
      : sort === 'newest'
        ? { submitted_at: 'desc' as const }
        : sort === 'oldest'
          ? { submitted_at: 'asc' as const }
          : sort === 'confidence_desc'
            ? { confidence_score: 'desc' as const }
            : { total_compensation: 'desc' as const };

  const skip = (page - 1) * limit;

  const [total, rows] = await prisma.$transaction([
    prisma.salary.count({ where }),
    prisma.salary.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        company: true,
      },
    }),
  ]);

  return NextResponse.json({
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    data: rows.map(serializeSalary),
  });
}
