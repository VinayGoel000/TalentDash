import { formatCompensation } from '@/lib/formatters';
import type { Currency } from '@/lib/currency-config';
import type { SalaryRecord } from '@/types/salary';

export function isAbsentSalaryValue(value: number | null | undefined): boolean {
  return value == null || Number.isNaN(Number(value)) || Number(value) === 0;
}

export function formatOptionalSalary(value: number | null | undefined, currency: Currency | string): string {
  if (isAbsentSalaryValue(value)) {
    return '—';
  }
  return formatCompensation(value as number, currency);
}

export function resolveDisplayTotalCompensation(record: {
  base_salary: number;
  bonus: number;
  stock: number;
  total_compensation: number;
}): number {
  if (isAbsentSalaryValue(record.bonus) && isAbsentSalaryValue(record.stock)) {
    return record.base_salary;
  }
  return record.total_compensation;
}

export function formatRecordTotalCompensation(
  record: Pick<SalaryRecord, 'base_salary' | 'bonus' | 'stock' | 'total_compensation' | 'currency'>,
  displayCurrency: Currency,
  converted?: {
    base_salary: number;
    bonus: number;
    stock: number;
    total_compensation: number;
  },
): string {
  const amounts = converted ?? {
    base_salary: record.base_salary,
    bonus: record.bonus,
    stock: record.stock,
    total_compensation: record.total_compensation,
  };

  const total = resolveDisplayTotalCompensation(amounts);
  return formatCompensation(total, displayCurrency);
}
