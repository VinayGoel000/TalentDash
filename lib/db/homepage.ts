import { prisma } from '@/app/lib/db';
import {
  getCompanyIndex,
  median,
  type CompanyIndexEntry,
} from '@/lib/company-stats';
import { mapSalaryWithCompanyToRecord } from '@/lib/db/transform';
import type { SalaryRecord } from '@/types/salary';

export interface HomepageCounts {
  companies: number;
  salaries: number;
  locations: number;
  verified: number;
}

export interface RoleInsight {
  role: string;
  medianTotalCompensation: number;
  sampleSize: number;
}

export interface ExperienceInsight {
  bucket: string;
  medianTotalCompensation: number;
  sampleSize: number;
}

export interface LocationInsight {
  location: string;
  medianTotalCompensation: number;
  sampleSize: number;
}

export interface HomepageData {
  counts: HomepageCounts;
  topPayingCompanies: CompanyIndexEntry[];
  topRoles: RoleInsight[];
  experienceBands: ExperienceInsight[];
  topLocations: LocationInsight[];
  recentSalaries: SalaryRecord[];
}

const EXPERIENCE_BANDS = [
  { label: '0–2 yrs', min: 0, max: 2 },
  { label: '3–5 yrs', min: 3, max: 5 },
  { label: '6–9 yrs', min: 6, max: 9 },
  { label: '10+ yrs', min: 10, max: Number.POSITIVE_INFINITY },
] as const;

function bucketForYears(years: number): string | null {
  const band = EXPERIENCE_BANDS.find((entry) => years >= entry.min && years <= entry.max);
  return band ? band.label : null;
}

export async function getHomepageData(): Promise<HomepageData> {
  const [companyCount, salaryCount, verifiedCount, distinctLocations, salaryRows, recentRows] =
    await prisma.$transaction([
      prisma.company.count(),
      prisma.salary.count(),
      prisma.salary.count({ where: { is_verified: true } }),
      prisma.salary.findMany({ distinct: ['location'], select: { location: true } }),
      prisma.salary.findMany({
        include: { company: true },
        orderBy: { total_compensation: 'desc' },
      }),
      prisma.salary.findMany({
        include: { company: true },
        orderBy: { submitted_at: 'desc' },
        take: 6,
      }),
    ]);

  const records = salaryRows.map(mapSalaryWithCompanyToRecord);
  const recentSalaries = recentRows.map(mapSalaryWithCompanyToRecord);

  const topPayingCompanies = [...getCompanyIndex(records)]
    .sort((a, b) => b.medianTotalCompensation - a.medianTotalCompensation)
    .slice(0, 6);

  const roleTotals = new Map<string, number[]>();
  for (const record of records) {
    const list = roleTotals.get(record.role) ?? [];
    list.push(record.total_compensation);
    roleTotals.set(record.role, list);
  }
  const topRoles: RoleInsight[] = Array.from(roleTotals.entries())
    .map(([role, totals]) => ({
      role,
      medianTotalCompensation: median(totals),
      sampleSize: totals.length,
    }))
    .sort((a, b) => b.medianTotalCompensation - a.medianTotalCompensation)
    .slice(0, 6);

  const bucketTotals = new Map<string, number[]>();
  for (const record of records) {
    const bucket = bucketForYears(record.experience_years);
    if (!bucket) continue;
    const list = bucketTotals.get(bucket) ?? [];
    list.push(record.total_compensation);
    bucketTotals.set(bucket, list);
  }
  const experienceBands: ExperienceInsight[] = EXPERIENCE_BANDS.map(({ label }) => {
    const totals = bucketTotals.get(label) ?? [];
    return {
      bucket: label,
      medianTotalCompensation: totals.length === 0 ? 0 : median(totals),
      sampleSize: totals.length,
    };
  });

  const locationTotals = new Map<string, number[]>();
  for (const record of records) {
    const list = locationTotals.get(record.location) ?? [];
    list.push(record.total_compensation);
    locationTotals.set(record.location, list);
  }
  const topLocations: LocationInsight[] = Array.from(locationTotals.entries())
    .map(([location, totals]) => ({
      location,
      medianTotalCompensation: median(totals),
      sampleSize: totals.length,
    }))
    .sort((a, b) => b.sampleSize - a.sampleSize)
    .slice(0, 8);

  return {
    counts: {
      companies: companyCount,
      salaries: salaryCount,
      locations: distinctLocations.length,
      verified: verifiedCount,
    },
    topPayingCompanies,
    topRoles,
    experienceBands,
    topLocations,
    recentSalaries,
  };
}
