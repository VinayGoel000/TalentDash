import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { generateCompanySlug, normalizeCompanyName } from '@/lib/company-normalizer';
import { hasPotentialDuplicate } from '@/lib/duplicate-check';
import { validateIngestPayload } from '@/lib/salary-validation';

const jsonError = (field: string, message: string, status = 400) =>
  NextResponse.json({ error: true, field, message }, { status });

type SalaryWithCompany = Prisma.SalaryGetPayload<{
  include: { company: true };
}>;

const serializeSalary = (salary: SalaryWithCompany) => ({
  ...salary,
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

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError('body', 'Invalid JSON payload');
  }

  if (!body || typeof body !== 'object') {
    return jsonError('body', 'Invalid JSON payload');
  }

  const validation = validateIngestPayload(body as Parameters<typeof validateIngestPayload>[0]);
  if (!validation.ok) {
    return jsonError(validation.error.field, validation.error.message);
  }

  const data = validation.data;
  const normalized_name = normalizeCompanyName(data.company);
  const slug = generateCompanySlug(data.company);
  const displayName = data.company.trim();
  const total_compensation = data.base_salary + data.bonus + data.stock;

  const company = await prisma.company.upsert({
    where: { normalized_name },
    update: {
      name: displayName,
      slug,
    },
    create: {
      name: displayName,
      slug,
      normalized_name,
    },
  });

  const duplicate = await hasPotentialDuplicate({
    company_id: company.id,
    role: data.role,
    level: data.level,
    location: data.location,
    base_salary: data.base_salary,
  });

  if (duplicate) {
    return NextResponse.json(
      { error: true, message: 'Potential duplicate salary record detected.' },
      { status: 409 },
    );
  }

  const record = await prisma.salary.create({
    data: {
      company_id: company.id,
      role: data.role,
      level: data.level,
      location: data.location,
      currency: data.currency,
      experience_years: data.experience_years,
      base_salary: data.base_salary,
      bonus: data.bonus,
      stock: data.stock,
      total_compensation,
      source: data.source,
      confidence_score: new Prisma.Decimal(data.confidence_score.toString()),
      is_verified: false,
      submitted_at: new Date(),
    },
    include: {
      company: true,
    },
  });

  return NextResponse.json(
    {
      error: false,
      record: serializeSalary(record),
      total_compensation: total_compensation.toString(),
      company: serializeSalary(record).company,
    },
    { status: 201 },
  );
}
