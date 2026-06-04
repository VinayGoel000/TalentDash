/**
 * Currency Configuration and Conversion
 * Centralized management of currency conversion rates
 */

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
export function convertCurrency(value: number, fromCurrency: Currency, toCurrency: Currency): number {
  if (fromCurrency === toCurrency) return value;
  
  // Convert to base currency (INR) first
  const valueInINR = value * CURRENCY_CONFIG[fromCurrency].rate;
  
  // Convert from INR to target currency
  return Math.round(valueInINR / CURRENCY_CONFIG[toCurrency].rate);
}

/**
 * Format a salary value with currency symbol
 */
export function formatSalaryWithCurrency(value: number, currency: Currency): string {
  const config = CURRENCY_CONFIG[currency];
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(value);
  return `${config.symbol}${formatted}`;
}
