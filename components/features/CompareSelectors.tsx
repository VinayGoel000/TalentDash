'use client';

/**
 * Compare Selectors Component
 * Dropdown selectors to choose two salary records for comparison
 */

import { useRouter, useSearchParams } from 'next/navigation';
import { MOCK_SALARY_DATA } from '@/lib/mock-data';
import type { SalaryRecord } from '@/types/salary';

interface CompareSelectorsProps {
  recordA: SalaryRecord | null;
  recordB: SalaryRecord | null;
  onRecordAChange: (id: string) => void;
  onRecordBChange: (id: string) => void;
}

function formatRecordLabel(record: SalaryRecord): string {
  return `${record.company} • ${record.role} • ${record.level_standardized} • ${record.location}`;
}

export function CompareSelectors({
  recordA,
  recordB,
  onRecordAChange,
  onRecordBChange,
}: CompareSelectorsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-2">
      {/* Record A Selector */}
      <div>
        <label htmlFor="record-a" className="block text-sm font-medium text-slate-700">
          Record A
        </label>
        <select
          id="record-a"
          value={recordA?.id || ''}
          onChange={(e) => onRecordAChange(e.target.value)}
          className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 sm:text-sm"
        >
          <option value="">Select a record...</option>
          {MOCK_SALARY_DATA.map((record) => (
            <option key={record.id} value={record.id}>
              {formatRecordLabel(record)}
            </option>
          ))}
        </select>
        {recordA && (
          <p className="mt-2 text-xs text-slate-500">
            {recordA.currency} • {recordA.experience_years}y exp • TC: ₹{recordA.total_compensation.toLocaleString('en-IN')}
          </p>
        )}
      </div>

      {/* Record B Selector */}
      <div>
        <label htmlFor="record-b" className="block text-sm font-medium text-slate-700">
          Record B
        </label>
        <select
          id="record-b"
          value={recordB?.id || ''}
          onChange={(e) => onRecordBChange(e.target.value)}
          className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 sm:text-sm"
        >
          <option value="">Select a record...</option>
          {MOCK_SALARY_DATA.map((record) => (
            <option key={record.id} value={record.id}>
              {formatRecordLabel(record)}
            </option>
          ))}
        </select>
        {recordB && (
          <p className="mt-2 text-xs text-slate-500">
            {recordB.currency} • {recordB.experience_years}y exp • TC: ₹{recordB.total_compensation.toLocaleString('en-IN')}
          </p>
        )}
      </div>
    </div>
  );
}
