import type { SalaryRecord } from '@/types/salary';

export interface CompareRecordOption {
  id: string;
  label: string;
}

export function buildCompareRecordOptions(records: SalaryRecord[]): CompareRecordOption[] {
  return records.map((record) => ({
    id: record.id,
    label: `${record.company} • ${record.role} • ${record.level_standardized} • ${record.location}`,
  }));
}
