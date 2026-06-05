/**
 * Currency Configuration and Conversion
 * Centralized management of currency conversion rates
 */

import { formatCompensation } from '@/lib/formatters';
import { isAbsentSalaryValue } from '@/lib/salary-display';

export const CURRENCY_CONFIG = {
  INR: {
    symbol: '₹',
    label: 'INR',
    rate: 1, // Base currency
  },
  USD: {
    symbol: '$',
    label: 'USD',
    rate: 83, // INR per USD (approximate)
  },
} as const;

export type Currency = keyof typeof CURRENCY_CONFIG;

/**
 * Convert a salary value from one currency to another
 */
export function convertSalaryAmount(value: number, fromCurrency: Currency, toCurrency: Currency): number {
  if (fromCurrency === toCurrency) return value;

  const rate = CURRENCY_CONFIG.USD.rate;
  if (fromCurrency === 'INR' && toCurrency === 'USD') {
    return Math.round(value / rate);
  }
  if (fromCurrency === 'USD' && toCurrency === 'INR') {
    return Math.round(value * rate);
  }
  return value;
}

/**
 * Format a salary value with currency symbol (Indian numbering for INR)
 */
export function formatSalaryWithCurrency(value: number, currency: Currency): string {
  if (isAbsentSalaryValue(value)) {
    return '—';
  }
  return formatCompensation(value, currency);
}
