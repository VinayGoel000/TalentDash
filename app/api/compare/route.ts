import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { getSalaryDelta, serializeSalary, SalaryWithCompany } from '@/lib/salary-compare';

const jsonError = (message: string, status = 400) =>
  NextResponse.json({ error: true, message }, { status });

export async function GET(request: Request) {
  const url = new URL(request.url);
  const s1 = url.searchParams.get('s1');
  const s2 = url.searchParams.get('s2');

  if (!s1 || !s2) {
    return jsonError('Both salary record IDs are required', 400);
  }

  if (s1 === s2) {
    return jsonError('Cannot compare a salary record against itself', 400);
  }

  const salaries = await prisma.salary.findMany({
    where: {
      id: {
        in: [s1, s2],
      },
    },
    include: {
      company: true,
    },
  });

  if (salaries.length !== 2) {
    return jsonError('Salary record not found', 404);
  }

  const record1 = salaries.find((salary) => salary.id === s1) as SalaryWithCompany;
  const record2 = salaries.find((salary) => salary.id === s2) as SalaryWithCompany;

  return NextResponse.json({
    record_1: serializeSalary(record1),
    record_2: serializeSalary(record2),
    delta: getSalaryDelta(record1, record2),
  });
}
