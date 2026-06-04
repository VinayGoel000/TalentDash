import { Level } from '@prisma/client';
import { prisma } from '@/app/lib/db';

const withinPercent = (base: bigint, comparison: bigint, percent: number) => {
  if (base === 0n) return false;
  const diff = base > comparison ? base - comparison : comparison - base;
  return diff * 100n <= base * BigInt(percent);
};

export async function hasPotentialDuplicate(input: {
  company_id: string;
  role: string;
  level: Level;
  location: string;
  base_salary: bigint;
}) {
  const since = new Date(Date.now() - 48 * 60 * 60 * 1000);
  const recent = await prisma.salary.findMany({
    where: {
      company_id: input.company_id,
      role: input.role,
      level: input.level,
      location: input.location,
      submitted_at: { gte: since },
    },
    select: {
      base_salary: true,
    },
  });

  return recent.some((row) => withinPercent(row.base_salary, input.base_salary, 10));
}
