import { prisma } from '@/app/lib/db';
import { median } from '@/lib/company-stats';
import { mapSalaryWithCompanyToRecord } from '@/lib/db/transform';
import type { SalaryRecord } from '@/types/salary';

export interface LocationInsight {
  location: string;
  recordCount: number;
  medianTotalCompensation: number;
  averageTotalCompensation: number;
  topRoles: { role: string; medianTotalCompensation: number; count: number }[];
  topCompanies: { name: string; slug: string; count: number }[];
  remoteShare: number;
}

export interface RoleInsight {
  role: string;
  recordCount: number;
  medianTotalCompensation: number;
  averageTotalCompensation: number;
  averageExperience: number;
  topLevels: { level: string; count: number }[];
  topLocations: { location: string; count: number }[];
}

export interface CompanyInsight {
  name: string;
  slug: string;
  recordCount: number;
  medianTotalCompensation: number;
  averageTotalCompensation: number;
  primaryLocation: string;
  topRoles: { role: string; medianTotalCompensation: number; count: number }[];
  topLevels: { level: string; count: number }[];
}

export interface LevelInsight {
  level: string;
  recordCount: number;
  medianTotalCompensation: number;
  averageExperience: number;
}

function safeNumber(value: number | null | undefined): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

export async function getLocationInsights(): Promise<LocationInsight[]> {
  const rows = await prisma.salary.findMany({ include: { company: true } });
  if (rows.length === 0) return [];

  const records = rows.map(mapSalaryWithCompanyToRecord);
  const byLocation = new Map<string, SalaryRecord[]>();
  for (const record of records) {
    const list = byLocation.get(record.location) ?? [];
    list.push(record);
    byLocation.set(record.location, list);
  }

  return Array.from(byLocation.entries())
    .map(([location, locationRecords]) => {
      const totals = locationRecords.map((record) => record.total_compensation);
      const byRole = new Map<string, number[]>();
      for (const record of locationRecords) {
        const list = byRole.get(record.role) ?? [];
        list.push(record.total_compensation);
        byRole.set(record.role, list);
      }
      const topRoles = Array.from(byRole.entries())
        .map(([role, roleTotals]) => ({
          role,
          medianTotalCompensation: median(roleTotals),
          count: roleTotals.length,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

      const byCompany = new Map<string, number>();
      for (const record of locationRecords) {
        byCompany.set(record.company_slug, (byCompany.get(record.company_slug) ?? 0) + 1);
      }
      const topCompanies = Array.from(byCompany.entries())
        .map(([slug, count]) => {
          const firstRecord = locationRecords.find((record) => record.company_slug === slug);
          return { name: firstRecord?.company ?? slug, slug, count };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

      const remoteCount = locationRecords.filter((record) =>
        record.location.toLowerCase().includes('remote')
      ).length;

      return {
        location,
        recordCount: locationRecords.length,
        medianTotalCompensation: median(totals),
        averageTotalCompensation: Math.round(
          totals.reduce((sum, value) => sum + value, 0) / totals.length
        ),
        topRoles,
        topCompanies,
        remoteShare: Math.round((remoteCount / locationRecords.length) * 100),
      };
    })
    .sort((a, b) => b.recordCount - a.recordCount);
}

export async function getRoleInsights(): Promise<RoleInsight[]> {
  const rows = await prisma.salary.findMany({ include: { company: true } });
  if (rows.length === 0) return [];

  const records = rows.map(mapSalaryWithCompanyToRecord);
  const byRole = new Map<string, SalaryRecord[]>();
  for (const record of records) {
    const list = byRole.get(record.role) ?? [];
    list.push(record);
    byRole.set(record.role, list);
  }

  return Array.from(byRole.entries())
    .map(([role, roleRecords]) => {
      const totals = roleRecords.map((record) => record.total_compensation);
      const experiences = roleRecords.map((record) => record.experience_years);
      const byLevel = new Map<string, number>();
      for (const record of roleRecords) {
        byLevel.set(record.level_standardized, (byLevel.get(record.level_standardized) ?? 0) + 1);
      }
      const byLocation = new Map<string, number>();
      for (const record of roleRecords) {
        byLocation.set(record.location, (byLocation.get(record.location) ?? 0) + 1);
      }
      return {
        role,
        recordCount: roleRecords.length,
        medianTotalCompensation: median(totals),
        averageTotalCompensation: Math.round(
          totals.reduce((sum, value) => sum + value, 0) / totals.length
        ),
        averageExperience:
          experiences.length > 0
            ? Number(
                (experiences.reduce((sum, value) => sum + value, 0) / experiences.length).toFixed(
                  1
                )
              )
            : 0,
        topLevels: Array.from(byLevel.entries())
          .map(([level, count]) => ({ level, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 4),
        topLocations: Array.from(byLocation.entries())
          .map(([location, count]) => ({ location, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 4),
      };
    })
    .sort((a, b) => b.medianTotalCompensation - a.medianTotalCompensation);
}

export async function getCompanyInsights(): Promise<CompanyInsight[]> {
  const rows = await prisma.salary.findMany({ include: { company: true } });
  if (rows.length === 0) return [];

  const records = rows.map(mapSalaryWithCompanyToRecord);
  const byCompany = new Map<string, SalaryRecord[]>();
  for (const record of records) {
    const list = byCompany.get(record.company_slug) ?? [];
    list.push(record);
    byCompany.set(record.company_slug, list);
  }

  return Array.from(byCompany.entries())
    .map(([slug, companyRecords]) => {
      const totals = companyRecords.map((record) => record.total_compensation);
      const locationCounts = companyRecords.reduce<Record<string, number>>((counts, record) => {
        counts[record.location] = (counts[record.location] ?? 0) + 1;
        return counts;
      }, {});
      const primaryLocation =
        Object.entries(locationCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';

      const byRole = new Map<string, number[]>();
      for (const record of companyRecords) {
        const list = byRole.get(record.role) ?? [];
        list.push(record.total_compensation);
        byRole.set(record.role, list);
      }
      const topRoles = Array.from(byRole.entries())
        .map(([role, roleTotals]) => ({
          role,
          medianTotalCompensation: median(roleTotals),
          count: roleTotals.length,
        }))
        .sort((a, b) => b.medianTotalCompensation - a.medianTotalCompensation)
        .slice(0, 3);

      const byLevel = new Map<string, number>();
      for (const record of companyRecords) {
        byLevel.set(record.level_standardized, (byLevel.get(record.level_standardized) ?? 0) + 1);
      }
      const topLevels = Array.from(byLevel.entries())
        .map(([level, count]) => ({ level, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 4);

      return {
        name: companyRecords[0].company,
        slug,
        recordCount: companyRecords.length,
        medianTotalCompensation: median(totals),
        averageTotalCompensation: Math.round(
          totals.reduce((sum, value) => sum + value, 0) / totals.length
        ),
        primaryLocation,
        topRoles,
        topLevels,
      };
    })
    .sort((a, b) => b.medianTotalCompensation - a.medianTotalCompensation);
}

export async function getLevelInsights(): Promise<LevelInsight[]> {
  const rows = await prisma.salary.findMany({ include: { company: true } });
  if (rows.length === 0) return [];

  const records = rows.map(mapSalaryWithCompanyToRecord);
  const byLevel = new Map<string, SalaryRecord[]>();
  for (const record of records) {
    const list = byLevel.get(record.level_standardized) ?? [];
    list.push(record);
    byLevel.set(record.level_standardized, list);
  }

  return Array.from(byLevel.entries())
    .map(([level, levelRecords]) => {
      const totals = levelRecords.map((record) => record.total_compensation);
      const experiences = levelRecords.map((record) => record.experience_years);
      return {
        level,
        recordCount: levelRecords.length,
        medianTotalCompensation: median(totals),
        averageExperience:
          experiences.length > 0
            ? Number(
                (experiences.reduce((sum, value) => sum + value, 0) / experiences.length).toFixed(
                  1
                )
              )
            : 0,
      };
    })
    .sort((a, b) => b.medianTotalCompensation - a.medianTotalCompensation);
}

export async function getOverallStats() {
  const [salaryCount, companyCount, locationCount, averageRow, maxRow] = await Promise.all([
    prisma.salary.count(),
    prisma.company.count(),
    prisma.salary.findMany({ distinct: ['location'], select: { location: true } }),
    prisma.salary.aggregate({ _avg: { total_compensation: true } }),
    prisma.salary.aggregate({ _max: { total_compensation: true } }),
  ]);

  return {
    salaryCount,
    companyCount,
    locationCount: locationCount.length,
    averageTotalCompensation: safeNumber(
      averageRow._avg.total_compensation ? Number(averageRow._avg.total_compensation) : 0
    ),
    maxTotalCompensation: safeNumber(
      maxRow._max.total_compensation ? Number(maxRow._max.total_compensation) : 0
    ),
  };
}
