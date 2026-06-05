import { Suspense } from 'react';
import { Container } from '@/components/ui/Container';
import { CompareControls } from '@/components/features/CompareControls';
import { ComparisonTable } from '@/components/features/ComparisonTable';
import { getSalariesByIds, getSalariesForCompare } from '@/lib/db/salaries';
import { buildCompareRecordOptions } from '@/lib/compare-options';
import { getCanonicalUrl } from '@/lib/seo/metadata';

export const revalidate = 300;

interface SearchParams {
  s1?: string;
  s2?: string;
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const [allRecords, selectedRecords] = await Promise.all([
    getSalariesForCompare(),
    getSalariesByIds([params.s1, params.s2].filter((id): id is string => Boolean(id))),
  ]);

  const recordA = params.s1 ? selectedRecords.find((record) => record.id === params.s1) ?? null : null;
  const recordB = params.s2 ? selectedRecords.find((record) => record.id === params.s2) ?? null : null;
  const recordOptions = buildCompareRecordOptions(allRecords);
  const isSameRecord = Boolean(recordA && recordB && recordA.id === recordB.id);
  const shareUrl =
    recordA && recordB && !isSameRecord
      ? getCanonicalUrl(`/compare?s1=${recordA.id}&s2=${recordB.id}`)
      : null;

  return (
    <Container className="py-8">
      <div className="space-y-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">/compare</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Salary Comparison</h1>
          <p className="mt-2 text-base text-slate-600">
            Compare any two salary records side-by-side to analyze compensation packages.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Select Records</h2>
          <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-slate-200" />}>
            <CompareControls recordOptions={recordOptions} recordA={recordA} recordB={recordB} />
          </Suspense>
        </div>

        {recordA && recordB && isSameRecord ? (
          <div className="min-h-[18rem] rounded-lg border border-amber-200 bg-amber-50 p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Select two different records</h3>
            <p className="mt-2 text-sm text-slate-600">
              You picked the same salary record for both sides. Choose a different record for Record A or Record B to see a meaningful comparison.
            </p>
          </div>
        ) : recordA && recordB ? (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Comparison Results</h2>
            <ComparisonTable recordA={recordA} recordB={recordB} />

            <div className="mt-6 min-h-[5.5rem] rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">Share this comparison:</p>
              <p className="mt-2 break-all font-mono text-xs text-slate-600">{shareUrl}</p>
            </div>
          </div>
        ) : (
          <div className="min-h-[18rem] rounded-lg border border-slate-200 bg-slate-50 p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Select two records to compare</h3>
            <p className="mt-2 text-sm text-slate-600">
              Choose a salary record from each dropdown to see the side-by-side comparison and delta analysis.
            </p>
          </div>
        )}
      </div>
    </Container>
  );
}
