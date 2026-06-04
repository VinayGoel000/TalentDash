/**
 * Salary Table Component
 * Main table display for salary records
 * Uses React Server Components for optimal performance
 */

import Link from 'next/link';
import { LevelBadge } from './LevelBadge';
import { formatSalaryWithCurrency, type Currency } from '@/lib/currency-config';
import type { SalaryRecord } from '@/types/salary';

interface SalaryTableProps {
  records: SalaryRecord[];
  displayCurrency: Currency;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Convert salary to display currency if needed
function getSalaryInCurrency(salary: number, originalCurrency: Currency, displayCurrency: Currency): number {
  if (originalCurrency === displayCurrency) return salary;
  
  // Simple conversion: 1 USD = 83 INR
  const rate = 83;
  if (originalCurrency === 'INR' && displayCurrency === 'USD') {
    return Math.round(salary / rate);
  } else if (originalCurrency === 'USD' && displayCurrency === 'INR') {
    return Math.round(salary * rate);
  }
  return salary;
}

// Format salary or show dash if zero
function formatSalaryCell(value: number, currency: Currency): string {
  if (value === 0 || !value) {
    return '—';
  }
  return formatSalaryWithCurrency(value, currency);
}

export function SalaryTable({ records, displayCurrency }: SalaryTableProps) {
  if (records.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              <th className="px-6 py-4 text-left">Company</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Level</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-left">Experience</th>
              <th className="px-6 py-4 text-right">Base Salary</th>
              <th className="px-6 py-4 text-right">Stock</th>
              <th className="px-6 py-4 text-right font-bold">Total Comp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {records.map((record) => {
              const baseSalaryInDisplay = getSalaryInCurrency(record.base_salary, record.currency as Currency, displayCurrency);
              const stockInDisplay = getSalaryInCurrency(record.stock, record.currency as Currency, displayCurrency);
              const totalCompInDisplay = getSalaryInCurrency(record.total_compensation, record.currency as Currency, displayCurrency);

              return (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                    <Link href={`/companies/${record.company_slug}`} className="hover:underline text-blue-600">
                      {record.company}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">{record.role}</td>
                  <td className="px-6 py-4">
                    <LevelBadge level={record.level_standardized} />
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">{record.location}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{record.experience_years}y</td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-slate-900 tabular-nums">
                    {formatSalaryCell(baseSalaryInDisplay, displayCurrency)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-slate-900 tabular-nums">
                    {formatSalaryCell(stockInDisplay, displayCurrency)}
                  </td>
                  <td className="px-6 py-4 text-right text-lg font-bold text-center tabular-nums" style={{ color: '#0369A1' }}>
                    {formatSalaryWithCurrency(totalCompInDisplay, displayCurrency)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
