import { Currency, Level, Prisma, Source } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

const levelValues = new Set(Object.values(Level));
const currencyValues = new Set(Object.values(Currency));

type IngestSalaryBody = {
  company?: string;
  role?: string;
  level?: Level;
  location?: string;
  currency?: Currency;
  experience_years?: number;
  base_salary?: number | string;
  bonus?: number | string;
  stock?: number | string;
  source?: Source;
  confidence_score?: number | string;
  is_verified?: boolean;
};

const jsonError = (field: string, message: string, status = 400) =>
  NextResponse.json({ error: true, field, message }, { status });

const normalizeCompanyName = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, ' ');

const canonicalCompanyName = (value: string) => {
  const normalized = normalizeCompanyName(value);
  if (normalized === 'google india' || normalized === 'google') {
    return 'google';
  }
  return normalized;
};

const slugifyCompanyName = (value: string) =>
  canonicalCompanyName(value)
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const toBigIntAmount = (value: number | string | undefined, fallback = 0n) => {
  if (value === undefined || value === null || value === '') return fallback;
  if (typeof value === 'string' && value.trim() === '') return fallback;
  return BigInt(value);
};

const toNumber = (value: number | string | undefined) =>
  typeof value === 'string' ? Number(value) : value;

type SalaryWithCompany = Prisma.SalaryGetPayload<{
  include: {
    company: true;
  };
}>;

const serializeSalary = (salary: SalaryWithCompany) => ({
  ...salary,
  id: salary.id,
  company_id: salary.company_id,
  base_salary: salary.base_salary.toString(),
  bonus: salary.bonus.toString(),
  stock: salary.stock.toString(),
  total_compensation: salary.total_compensation.toString(),
  confidence_score: salary.confidence_score.toString(),
  company: {
    ...salary.company,
    created_at: salary.company.created_at.toISOString(),
    updated_at: salary.company.updated_at.toISOString(),
  },
  submitted_at: salary.submitted_at.toISOString(),
});

const isWithinPercent = (a: bigint, b: bigint, percent: number) => {
  const max = a > b ? a : b;
  const min = a > b ? b : a;
  if (max === 0n) return true;
  const diff = max - min;
  return Number(diff * 10000n / max) <= percent * 100;
};

export async function POST(request: Request) {
  let body: IngestSalaryBody;

  try {
    body = (await request.json()) as IngestSalaryBody;
  } catch {
    return jsonError('body', 'Invalid JSON payload');
  }

  if (!body.company || typeof body.company !== 'string' || !body.company.trim()) {
    return jsonError('company', 'Company is required');
  }

  if (!body.role || typeof body.role !== 'string' || !body.role.trim()) {
    return jsonError('role', 'Role is required');
  }

  if (!body.level || !levelValues.has(body.level)) {
    return jsonError('level', 'Invalid level');
  }

  if (!body.location || typeof body.location !== 'string' || !body.location.trim()) {
    return jsonError('location', 'Location is required');
  }

  if (!body.currency || !currencyValues.has(body.currency)) {
    return jsonError('currency', 'Invalid currency');
  }

  const experienceYears = toNumber(body.experience_years);
  if (experienceYears === undefined || Number.isNaN(experienceYears)) {
    return jsonError('experience_years', 'Experience years is required');
  }
  if (experienceYears < 1 || experienceYears > 50) {
    return jsonError('experience_years', 'Experience years must be between 1 and 50');
  }

  let baseSalary: bigint;
  try {
    baseSalary = toBigIntAmount(body.base_salary);
  } catch {
    return jsonError('base_salary', 'Base salary must be a valid amount');
  }
  if (baseSalary <= 0n) {
    return jsonError('base_salary', 'Base salary must be greater than zero');
  }

  let bonus: bigint;
  let stock: bigint;
  try {
    bonus = toBigIntAmount(body.bonus, 0n);
    stock = toBigIntAmount(body.stock, 0n);
  } catch {
    return jsonError('bonus', 'Bonus and stock must be valid amounts');
  }

  const confidenceScore = toNumber(body.confidence_score);
  if (confidenceScore === undefined || Number.isNaN(confidenceScore)) {
    return jsonError('confidence_score', 'Confidence score is required');
  }
  if (confidenceScore < 0 || confidenceScore > 1) {
    return jsonError('confidence_score', 'Confidence score must be between 0.0 and 1.0');
  }

  if (!body.source || !Object.values(Source).includes(body.source)) {
    return jsonError('source', 'Invalid source');
  }

  const normalized_name = canonicalCompanyName(body.company);
  const slug = slugifyCompanyName(body.company);
  const now = new Date();
  const total_compensation = baseSalary + bonus + stock;
  const role = body.role.trim();
  const location = body.location.trim();
  const confidenceScoreValue = body.confidence_score as number | string;

  const company =
    (await prisma.company.findFirst({
      where: {
        OR: [
          { normalized_name },
          { slug },
        ],
      },
    })) ??
    (await prisma.company.create({
      data: {
        name: body.company.trim(),
        slug,
        normalized_name,
      },
    }));

  const duplicateWindowStart = new Date(now.getTime() - 48 * 60 * 60 * 1000);
  const recentSalaries = await prisma.salary.findMany({
    where: {
      company_id: company.id,
      role,
      level: body.level,
      location,
      submitted_at: {
        gte: duplicateWindowStart,
      },
    },
    select: {
      id: true,
      total_compensation: true,
    },
  });

  const duplicate = recentSalaries.find((salary) =>
    isWithinPercent(salary.total_compensation, total_compensation, 10),
  );

  if (duplicate) {
    return jsonError('duplicate', 'Similar salary already exists within the last 48 hours', 409);
  }

  const record = await prisma.salary.create({
    data: {
      company_id: company.id,
      role,
      level: body.level,
      location,
      currency: body.currency,
      experience_years: experienceYears,
      base_salary: baseSalary,
      bonus,
      stock,
      total_compensation,
      source: body.source,
      confidence_score: new Prisma.Decimal(confidenceScoreValue.toString()),
      is_verified: body.is_verified ?? false,
      submitted_at: now,
    },
    include: {
      company: true,
    },
  });

  return NextResponse.json(serializeSalary(record), { status: 201 });
}
