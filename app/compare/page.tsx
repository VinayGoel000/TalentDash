import { Suspense } from 'react';
import { Container } from '@/components/ui/container';
import { CompareControls } from '@/components/features/CompareControls';
import { ComparisonTable } from '@/components/features/ComparisonTable';
import { getSalariesByIds, getSalariesForCompare } from '@/lib/db/salaries';
import { buildCompareRecordOptions } from '@/lib/compare-options';
import { getCanonicalUrl, getCompareMetadata } from '@/lib/seo/metadata';
import { CompareTypeSwitcher } from '@/components/features/CompareTypeSwitcher';
import { CompanyComparePanel } from '@/components/features/CompanyComparePanel';
import { RoleComparePanel } from '@/components/features/RoleComparePanel';
import { getCompanyInsights, getRoleInsights } from '@/lib/db/insights';

export const revalidate = 300;

export const metadata = getCompareMetadata();

type SearchParams = {
  s1?: string;
  s2?: string;
  type?: string;
};

const VALID_TYPES = new Set(['records', 'companies', 'roles']);

function normaliseType(value: string | undefined): 'records' | 'companies' | 'roles' {
  return value && VALID_TYPES.has(value) ? (value as 'records' | 'companies' | 'roles') : 'records';
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function ComparePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const type = normaliseType(params.type);

  const [allRecords, companies, roles] = await Promise.all([
    getSalariesForCompare(),
    getCompanyInsights(),
    getRoleInsights(),
  ]);
  const selectedRecords = await getSalariesByIds(
    [params.s1, params.s2].filter((id): id is string => Boolean(id))
  );

  const recordA = params.s1 ? selectedRecords.find((record) => record.id === params.s1) ?? null : null;
  const recordB = params.s2 ? selectedRecords.find((record) => record.id === params.s2) ?? null : null;
  const recordOptions = buildCompareRecordOptions(allRecords);
  const isSameRecord = Boolean(recordA && recordB && recordA.id === recordB.id);
  const shareUrl =
    recordA && recordB && !isSameRecord
      ? getCanonicalUrl(`/compare?s1=${recordA.id}&s2=${recordB.id}`)
      : null;

  return (
    <div className="bg-[#FAFAFA]">
      <Container className="py-8">
        <div className="space-y-8">
          <header>
            <p className="text-xs font-medium uppercase tracking-wider text-[#FF5A5F]">/compare</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#222222] sm:text-4xl">
              Salary comparison
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-[#484848] sm:text-base">
              Compare any two records, companies or roles side-by-side. Use it for negotiation prep,
              offer reviews or a quick check before you accept.
            </p>
          </header>

          <CompareTypeSwitcher active={type} />

          {type === 'records' ? (
            <>
              <div>
                <h2 className="mb-4 text-lg font-semibold text-[#222222]">Select records</h2>
                <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-slate-200" />}>
                  <CompareControls recordOptions={recordOptions} recordA={recordA} recordB={recordB} />
                </Suspense>
              </div>

              {recordA && recordB && isSameRecord ? (
                <div className="min-h-[18rem] rounded-lg border border-amber-200 bg-amber-50 p-12 text-center">
                  <h3 className="text-lg font-semibold text-slate-900">Select two different records</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    You picked the same salary record for both sides. Choose a different record to
                    see a meaningful comparison.
                  </p>
                </div>
              ) : recordA && recordB ? (
                <div>
                  <h2 className="mb-4 text-lg font-semibold text-[#222222]">Comparison results</h2>
                  <ComparisonTable recordA={recordA} recordB={recordB} />
                  {shareUrl ? (
                    <div className="mt-6 rounded-lg border border-[#EBEBEB] bg-white p-4">
                      <p className="text-sm font-medium text-[#222222]">Share this comparison:</p>
                      <p className="mt-2 break-all font-mono text-xs text-[#717171]">{shareUrl}</p>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="min-h-[18rem] rounded-2xl border border-dashed border-[#EBEBEB] bg-white p-12 text-center">
                  <h3 className="text-lg font-semibold text-[#222222]">Select two records to compare</h3>
                  <p className="mt-2 text-sm text-[#717171]">
                    Choose a salary record from each dropdown to see the side-by-side comparison and
                    delta analysis.
                  </p>
                </div>
              )}
            </>
          ) : null}

          {type === 'companies' ? <CompanyComparePanel companies={companies} /> : null}
          {type === 'roles' ? <RoleComparePanel roles={roles} /> : null}
        </div>
      </Container>
    </div>
  );
}
