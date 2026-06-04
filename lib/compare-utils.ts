/**
 * Compare Utils
 * Salary comparison and delta calculations
 */

import { formatSalaryWithCurrency, type Currency } from '@/lib/currency-config';
import type { SalaryRecord } from '@/types/salary';

export interface ComparisonDelta {
  value: number;
  label: string;
  isPositive: boolean;
  isNeutral: boolean;
  formatted: string;
}

/**
 * Calculate delta between two values
 * Positive = Record A is higher
 */
export function calculateDelta(
  recordA: number,
  recordB: number,
  currency: Currency
): ComparisonDelta {
  const delta = recordA - recordB;
  const isPositive = delta > 0;
  const isNeutral = delta === 0;

  return {
    value: delta,
    label: isPositive ? '+' : isNeutral ? '' : '−',
    isPositive,
    isNeutral,
    formatted: formatSalaryWithCurrency(Math.abs(delta), currency),
  };
}

/**
 * Determine which record has higher total compensation
 */
export function getHigherTCRecord(recordA: SalaryRecord, recordB: SalaryRecord): 'A' | 'B' | 'EQUAL' {
  if (recordA.total_compensation > recordB.total_compensation) {
    return 'A';
  } else if (recordB.total_compensation > recordA.total_compensation) {
    return 'B';
  }
  return 'EQUAL';
}

/**
 * Format delta for display
 */
export function formatDelta(delta: ComparisonDelta): string {
  if (delta.isNeutral) {
    return '0';
  }
  return `${delta.label}${delta.formatted}`;
}

/**
 * Get delta styling color
 */
export function getDeltaColor(delta: ComparisonDelta): 'green' | 'red' | 'neutral' {
  if (delta.isNeutral) return 'neutral';
  return delta.isPositive ? 'green' : 'red';
}
