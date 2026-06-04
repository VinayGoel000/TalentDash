'use client';

/**
 * Compare Page
 * Salary comparison tool allowing side-by-side analysis
 */

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { CompareSelectors } from '@/components/features/CompareSelectors';
import { ComparisonTable } from '@/components/features/ComparisonTable';
import { MOCK_SALARY_DATA } from '@/lib/mock-data';
import type { SalaryRecord } from '@/types/salary';

export default function ComparePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get record IDs from URL
  const s1 = searchParams.get('s1');
  const s2 = searchParams.get('s2');

  // Find records
  const recordA = useMemo(() => {
    return s1 ? MOCK_SALARY_DATA.find((r) => r.id === s1) : null;
  }, [s1]);

  const recordB = useMemo(() => {
    return s2 ? MOCK_SALARY_DATA.find((r) => r.id === s2) : null;
  }, [s2]);

  // Handle record selection
  const handleRecordAChange = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams);
      if (id) {
        params.set('s1', id);
      } else {
        params.delete('s1');
      }
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const handleRecordBChange = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams);
      if (id) {
        params.set('s2', id);
      } else {
        params.delete('s2');
      }
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  return (
    <Container className="py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">/compare</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Salary Comparison</h1>
          <p className="mt-2 text-base text-slate-600">
            Compare any two salary records side-by-side to analyze compensation packages.
          </p>
        </div>

        {/* Compare Controls */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Select Records</h2>
          <CompareSelectors
            recordA={recordA || null}
            recordB={recordB || null}
            onRecordAChange={handleRecordAChange}
            onRecordBChange={handleRecordBChange}
          />
        </div>

        {/* Comparison Results */}
        {recordA && recordB ? (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Comparison Results</h2>
            <ComparisonTable recordA={recordA} recordB={recordB} />

            {/* Copy URL Helper */}
            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">Share this comparison:</p>
              <p className="mt-2 break-all font-mono text-xs text-slate-600">
                {typeof window !== 'undefined' ? `${window.location.origin}/compare?s1=${recordA.id}&s2=${recordB.id}` : ''}
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Select two records to compare</h3>
            <p className="mt-2 text-sm text-slate-600">Choose a salary record from each dropdown to see the side-by-side comparison and delta analysis.</p>
          </div>
        )}
      </div>
    </Container>
  );
}
