/**
 * Comparison Table Component
 * Side-by-side salary comparison with delta analysis
 */

import { LevelBadge } from './LevelBadge';
import { formatSalaryWithCurrency, type Currency } from '@/lib/currency-config';
import { calculateDelta, formatDelta, getDeltaColor, getHigherTCRecord } from '@/lib/compare-utils';
import type { SalaryRecord } from '@/types/salary';

interface ComparisonTableProps {
  recordA: SalaryRecord;
  recordB: SalaryRecord;
}

function getSalaryInCurrency(salary: number, originalCurrency: Currency, displayCurrency: Currency): number {
  if (originalCurrency === displayCurrency) return salary;
  const rate = 83;
  if (originalCurrency === 'INR' && displayCurrency === 'USD') {
    return Math.round(salary / rate);
  } else if (originalCurrency === 'USD' && displayCurrency === 'INR') {
    return Math.round(salary * rate);
  }
  return salary;
}

function getDeltaColorClass(color: 'green' | 'red' | 'neutral'): string {
  switch (color) {
    case 'green':
      return 'text-green-700';
    case 'red':
      return 'text-red-700';
    default:
      return 'text-slate-700';
  }
}

export function ComparisonTable({ recordA, recordB }: ComparisonTableProps) {
  // Use first record's currency for display
  const displayCurrency: Currency = recordA.currency as Currency;

  // Convert record B to display currency if different
  const recordBInDisplayCurrency: SalaryRecord = {
    ...recordB,
    base_salary: getSalaryInCurrency(recordB.base_salary, recordB.currency as Currency, displayCurrency),
    bonus: getSalaryInCurrency(recordB.bonus, recordB.currency as Currency, displayCurrency),
    stock: getSalaryInCurrency(recordB.stock, recordB.currency as Currency, displayCurrency),
    total_compensation: getSalaryInCurrency(recordB.total_compensation, recordB.currency as Currency, displayCurrency),
  };

  // Determine TC winner
  const tcWinner = getHigherTCRecord(recordA, recordBInDisplayCurrency);

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              <th className="px-4 py-3 text-left">Field</th>
              <th className="px-4 py-3 text-left">Record A</th>
              <th className="px-4 py-3 text-left">Record B</th>
              <th className="px-4 py-3 text-left">Delta</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {/* Company */}
            <tr>
              <td className="px-4 py-3 text-sm font-medium text-slate-700">Company</td>
              <td className="px-4 py-3 text-sm text-slate-900 font-semibold">{recordA.company}</td>
              <td className="px-4 py-3 text-sm text-slate-900 font-semibold">{recordB.company}</td>
              <td className="px-4 py-3 text-sm text-slate-600">—</td>
            </tr>

            {/* Role */}
            <tr>
              <td className="px-4 py-3 text-sm font-medium text-slate-700">Role</td>
              <td className="px-4 py-3 text-sm text-slate-900">{recordA.role}</td>
              <td className="px-4 py-3 text-sm text-slate-900">{recordB.role}</td>
              <td className="px-4 py-3 text-sm text-slate-600">—</td>
            </tr>

            {/* Level */}
            <tr>
              <td className="px-4 py-3 text-sm font-medium text-slate-700">Level</td>
              <td className="px-4 py-3">
                <LevelBadge level={recordA.level_standardized} />
              </td>
              <td className="px-4 py-3">
                <LevelBadge level={recordB.level_standardized} />
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">—</td>
            </tr>

            {/* Location */}
            <tr>
              <td className="px-4 py-3 text-sm font-medium text-slate-700">Location</td>
              <td className="px-4 py-3 text-sm text-slate-900">{recordA.location}</td>
              <td className="px-4 py-3 text-sm text-slate-900">{recordB.location}</td>
              <td className="px-4 py-3 text-sm text-slate-600">—</td>
            </tr>

            {/* Experience */}
            <tr>
              <td className="px-4 py-3 text-sm font-medium text-slate-700">Experience</td>
              <td className="px-4 py-3 text-sm text-slate-900">{recordA.experience_years}y</td>
              <td className="px-4 py-3 text-sm text-slate-900">{recordBInDisplayCurrency.experience_years}y</td>
              <td className="px-4 py-3 text-sm text-slate-600">
                {recordA.experience_years - recordBInDisplayCurrency.experience_years === 0
                  ? '0'
                  : `${recordA.experience_years > recordBInDisplayCurrency.experience_years ? '+' : ''}${recordA.experience_years - recordBInDisplayCurrency.experience_years}y`}
              </td>
            </tr>

            {/* Base Salary */}
            <tr>
              <td className="px-4 py-3 text-sm font-medium text-slate-700">Base Salary</td>
              <td className="px-4 py-3 text-sm font-medium text-slate-900">
                {formatSalaryWithCurrency(recordA.base_salary, displayCurrency)}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-slate-900">
                {formatSalaryWithCurrency(recordBInDisplayCurrency.base_salary, displayCurrency)}
              </td>
              <td className="px-4 py-3 text-sm font-medium">
                {(() => {
                  const delta = calculateDelta(recordA.base_salary, recordBInDisplayCurrency.base_salary, displayCurrency);
                  const color = getDeltaColor(delta);
                  return <span className={getDeltaColorClass(color)}>{formatDelta(delta)}</span>;
                })()}
              </td>
            </tr>

            {/* Bonus */}
            <tr>
              <td className="px-4 py-3 text-sm font-medium text-slate-700">Bonus</td>
              <td className="px-4 py-3 text-sm font-medium text-slate-900">
                {recordA.bonus === 0 ? '—' : formatSalaryWithCurrency(recordA.bonus, displayCurrency)}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-slate-900">
                {recordBInDisplayCurrency.bonus === 0 ? '—' : formatSalaryWithCurrency(recordBInDisplayCurrency.bonus, displayCurrency)}
              </td>
              <td className="px-4 py-3 text-sm font-medium">
                {(() => {
                  const delta = calculateDelta(recordA.bonus, recordBInDisplayCurrency.bonus, displayCurrency);
                  const color = getDeltaColor(delta);
                  return <span className={getDeltaColorClass(color)}>{formatDelta(delta)}</span>;
                })()}
              </td>
            </tr>

            {/* Stock */}
            <tr>
              <td className="px-4 py-3 text-sm font-medium text-slate-700">Stock</td>
              <td className="px-4 py-3 text-sm font-medium text-slate-900">
                {recordA.stock === 0 ? '—' : formatSalaryWithCurrency(recordA.stock, displayCurrency)}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-slate-900">
                {recordBInDisplayCurrency.stock === 0 ? '—' : formatSalaryWithCurrency(recordBInDisplayCurrency.stock, displayCurrency)}
              </td>
              <td className="px-4 py-3 text-sm font-medium">
                {(() => {
                  const delta = calculateDelta(recordA.stock, recordBInDisplayCurrency.stock, displayCurrency);
                  const color = getDeltaColor(delta);
                  return <span className={getDeltaColorClass(color)}>{formatDelta(delta)}</span>;
                })()}
              </td>
            </tr>

            {/* Total Compensation */}
            <tr className="bg-slate-50">
              <td className="px-4 py-3 text-sm font-bold text-slate-900">Total Compensation</td>
              <td className="px-4 py-3 text-base font-bold" style={{ color: '#0369A1' }}>
                {formatSalaryWithCurrency(recordA.total_compensation, displayCurrency)}
                {tcWinner === 'A' && (
                  <div className="mt-1 inline-block rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                    Higher TC
                  </div>
                )}
              </td>
              <td className="px-4 py-3 text-base font-bold" style={{ color: '#0369A1' }}>
                {formatSalaryWithCurrency(recordBInDisplayCurrency.total_compensation, displayCurrency)}
                {tcWinner === 'B' && (
                  <div className="mt-1 inline-block rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                    Higher TC
                  </div>
                )}
              </td>
              <td className="px-4 py-3 text-sm font-bold">
                {(() => {
                  const delta = calculateDelta(recordA.total_compensation, recordBInDisplayCurrency.total_compensation, displayCurrency);
                  const color = getDeltaColor(delta);
                  return <span className={getDeltaColorClass(color)}>{formatDelta(delta)}</span>;
                })()}
              </td>
            </tr>

            {/* Equal TC Message */}
            {tcWinner === 'EQUAL' && (
              <tr>
                <td colSpan={4} className="px-4 py-3 text-center text-sm font-medium text-slate-700">
                  Equal Compensation
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
