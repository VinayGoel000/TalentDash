import type { SalaryRecord } from '@/types/salary';

export interface LevelDistribution {
  [level: string]: number;
}

export interface LevelDistributionEntry {
  level: string;
  count: number;
  percent: number;
}

export interface CompanyStats {
  name: string;
  slug: string;
  salaries: SalaryRecord[];
  medianTotalCompensation: number;
  levelDistribution: LevelDistribution;
  averageTotalCompensation: number;
}

export function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) return sorted[mid];
  return Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

export function buildLevelDistribution(records: SalaryRecord[]): LevelDistribution {
  return records.reduce<LevelDistribution>((distribution, record) => {
    const level = record.level_standardized;
    distribution[level] = (distribution[level] ?? 0) + 1;
    return distribution;
  }, {});
}

export function getCompanyStats(records: SalaryRecord[], slug: string): CompanyStats | null {
  const salaries = records.filter((record) => record.company_slug === slug);
  if (salaries.length === 0) return null;

  const totals = salaries.map((record) => record.total_compensation);
  const name = salaries[0].company;

  return {
    name,
    slug,
    salaries,
    medianTotalCompensation: median(totals),
    levelDistribution: buildLevelDistribution(salaries),
    averageTotalCompensation: Math.round(totals.reduce((sum, value) => sum + value, 0) / totals.length),
  };
}

export interface CompanyIndexEntry {
  name: string;
  slug: string;
  recordCount: number;
  primaryLocation: string;
  medianTotalCompensation: number;
}

export function getCompanyIndex(records: SalaryRecord[]): CompanyIndexEntry[] {
  const bySlug = new Map<string, SalaryRecord[]>();

  for (const record of records) {
    const existing = bySlug.get(record.company_slug) ?? [];
    existing.push(record);
    bySlug.set(record.company_slug, existing);
  }

  return Array.from(bySlug.entries())
    .map(([slug, companyRecords]) => {
      const totals = companyRecords.map((record) => record.total_compensation);
      const locationCounts = companyRecords.reduce<Record<string, number>>((counts, record) => {
        counts[record.location] = (counts[record.location] ?? 0) + 1;
        return counts;
      }, {});
      const primaryLocation = Object.entries(locationCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';

      return {
        name: companyRecords[0].company,
        slug,
        recordCount: companyRecords.length,
        primaryLocation,
        medianTotalCompensation: median(totals),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getLevelDistributionEntries(
  distribution: LevelDistribution,
  totalRecords: number,
): LevelDistributionEntry[] {
  if (totalRecords === 0) return [];

  return Object.entries(distribution)
    .map(([level, count]) => ({
      level,
      count,
      percent: Math.round((count / totalRecords) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}
