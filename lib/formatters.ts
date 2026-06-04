const CURRENCY_DISPLAY: Record<string, string> = {
  INR: 'en-IN',
  USD: 'en-US',
  GBP: 'en-GB',
  EUR: 'en-GB',
};

export function formatCurrency(value: string | number | bigint, currency: string) {
  const amount = typeof value === 'bigint' ? Number(value) : Number(value);
  if (!Number.isFinite(amount)) {
    return '—';
  }
  const locale = CURRENCY_DISPLAY[currency] ?? 'en-US';

  if (currency === 'INR') {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(amount >= 100000000 ? 0 : 2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(amount >= 10000000 ? 0 : 2)} L`;
    return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  }

  if (currency === 'USD') {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(amount >= 10000000 ? 0 : 2)}M`;
    return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  }

  if (currency === 'GBP') {
    if (amount >= 1000000) return `£${(amount / 1000000).toFixed(amount >= 10000000 ? 0 : 2)}M`;
    return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  }

  if (currency === 'EUR') {
    if (amount >= 1000000) return `€${(amount / 1000000).toFixed(amount >= 10000000 ? 0 : 2)}M`;
    return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  }

  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
}

export function formatCompensation(value: string | number | bigint, currency: string) {
  return formatCurrency(value, currency);
}

export function formatPercentage(value: string | number) {
  return `${Math.round(Number(value) * 100)}%`;
}
