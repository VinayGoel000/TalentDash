/**
 * Salary Table Component
 * Main table display for salary records
 * Uses React Server Components for optimal performance
 */

import Link from 'next/link';
import { LevelBadge } from './LevelBadge';
import { convertSalaryAmount, type Currency } from '@/lib/currency-config';
import { getSortUrl } from '@/lib/salary-query';
import {
  formatOptionalSalary,
  formatRecordTotalCompensation,
} from '@/lib/salary-display';
import type { SalaryRecord } from '@/types/salary';

interface SalaryTableProps {
  records: SalaryRecord[];
  displayCurrency: Currency;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  queryString?: string;
}

function SortableHeader({
  label,
  field,
  sortBy,
  sortOrder,
  queryString,
  align = 'left',
}: {
  label: string;
  field: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  queryString: string;
  align?: 'left' | 'right';
}) {
  const isActive = sortBy === field;
  const alignClass = align === 'right' ? 'text-right' : 'text-left';

  return (
    <th className={`px-6 py-4 ${alignClass}`}>
      <a
        href={getSortUrl(queryString, field, sortBy, sortOrder)}
        className={`inline-flex items-center gap-1 hover:text-slate-900 ${isActive ? 'text-slate-900' : ''}`}
      >
        {label}
        {isActive ? <span className="text-[10px]">{sortOrder === 'asc' ? '▲' : '▼'}</span> : null}
      </a>
    </th>
  );
}

export function SalaryTable({
  records,
  displayCurrency,
  sortBy = 'total_compensation',
  sortOrder = 'desc',
  queryString = '',
}: SalaryTableProps) {
  if (records.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              <SortableHeader label="Company" field="company" sortBy={sortBy} sortOrder={sortOrder} queryString={queryString} />
              <SortableHeader label="Role" field="role" sortBy={sortBy} sortOrder={sortOrder} queryString={queryString} />
              <th className="px-6 py-4 text-left">Level</th>
              <SortableHeader label="Location" field="location" sortBy={sortBy} sortOrder={sortOrder} queryString={queryString} />
              <SortableHeader label="Experience" field="experience_years" sortBy={sortBy} sortOrder={sortOrder} queryString={queryString} />
              <SortableHeader label="Base Salary" field="base_salary" sortBy={sortBy} sortOrder={sortOrder} queryString={queryString} align="right" />
              <th className="px-6 py-4 text-right">Stock</th>
              <SortableHeader label="Total Comp" field="total_compensation" sortBy={sortBy} sortOrder={sortOrder} queryString={queryString} align="right" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {records.map((record) => {
              const converted = {
                base_salary: convertSalaryAmount(record.base_salary, record.currency as Currency, displayCurrency),
                bonus: convertSalaryAmount(record.bonus, record.currency as Currency, displayCurrency),
                stock: convertSalaryAmount(record.stock, record.currency as Currency, displayCurrency),
                total_compensation: convertSalaryAmount(
                  record.total_compensation,
                  record.currency as Currency,
                  displayCurrency,
                ),
              };

              return (
                <tr key={record.id} className="transition-colors hover:bg-slate-50">
                  <td className="max-w-[14rem] px-6 py-4 text-sm font-semibold text-slate-900">
                    <Link
                      href={`/companies/${record.company_slug}`}
                      title={record.company}
                      className="block truncate text-blue-600 hover:underline"
                    >
                      {record.company}
                    </Link>
                  </td>
                  <td className="max-w-[12rem] truncate px-6 py-4 text-sm text-slate-700" title={record.role}>
                    {record.role}
                  </td>
                  <td className="px-6 py-4">
                    <LevelBadge level={record.level_standardized} />
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">{record.location}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{record.experience_years}y</td>
                  <td className="px-6 py-4 text-right text-sm font-medium tabular-nums text-slate-900">
                    {formatOptionalSalary(converted.base_salary, displayCurrency)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium tabular-nums text-slate-900">
                    {formatOptionalSalary(converted.stock, displayCurrency)}
                  </td>
                  <td className="px-6 py-4 text-right text-lg font-bold tabular-nums" style={{ color: '#0369A1' }}>
                    {formatRecordTotalCompensation(record, displayCurrency, converted)}
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
