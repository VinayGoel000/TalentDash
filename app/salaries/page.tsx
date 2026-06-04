import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SalaryTable } from '@/components/features/SalaryTable';
import { SalaryFilters } from '@/components/features/SalaryFilters';
import { SalaryPagination } from '@/components/features/SalaryPagination';
import { fetchSalariesPage, getSalaryFilterOptions } from '@/lib/db/salaries';
import { getSalariesMetadata } from '@/lib/seo/metadata';
import { generateSalaryDatasetSchema, serializeJsonLd } from '@/lib/seo/jsonld';
import { RECORDS_PER_PAGE, type SalarySearchParams } from '@/lib/salary-query';

export const revalidate = 300;

export const metadata: Metadata = getSalariesMetadata();

export default async function SalariesPage({
  searchParams,
}: {
  searchParams: Promise<SalarySearchParams>;
}) {
  const params = await searchParams;
  const [{ result, totalDatabaseCount, filteredCount }, filterOptions] = await Promise.all([
    fetchSalariesPage(params),
    getSalaryFilterOptions(),
  ]);
  const requestedPage = parseInt(params.page || '1', 10) || 1;

  if (requestedPage > result.totalPages && result.filteredRecords.length > 0) {
    const redirectParams = new URLSearchParams(result.queryString);
    redirectParams.set('page', '1');
    redirect(`/salaries?${redirectParams.toString()}`);
  }

  const currencyParams = new URLSearchParams(result.queryString);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            generateSalaryDatasetSchema(
              totalDatabaseCount,
              new Date().toISOString().split('T')[0],
            ),
          ),
        }}
      />
      <Container className="py-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">/salaries</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Salary Database</h1>
              <p className="mt-2 text-base text-slate-600">
                Explore salary data from {totalDatabaseCount} verified records
              </p>
            </div>

            <div className="flex gap-2">
              <a
                href={`?${new URLSearchParams({ ...Object.fromEntries(currencyParams), currency: 'INR', page: '1' }).toString()}`}
                className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  result.displayCurrency === 'INR'
                    ? 'bg-blue-600 text-white'
                    : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                ₹ INR
              </a>
              <a
                href={`?${new URLSearchParams({ ...Object.fromEntries(currencyParams), currency: 'USD', page: '1' }).toString()}`}
                className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  result.displayCurrency === 'USD'
                    ? 'bg-blue-600 text-white'
                    : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                $ USD
              </a>
            </div>
          </div>

          <Suspense fallback={<div className="h-48 animate-pulse rounded-lg bg-slate-200" />}>
            <SalaryFilters
              allCompanies={filterOptions.companies}
              allRoles={filterOptions.roles}
              allLevels={filterOptions.levels}
              allLocations={filterOptions.locations}
            />
          </Suspense>

          <div className="space-y-4">
            {result.paginatedRecords.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">No records found for these filters</h3>
                <p className="mt-2 text-sm text-slate-600">Try removing a filter to see more results.</p>
                <a
                  href="/salaries"
                  className="mt-4 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none"
                >
                  Clear All Filters
                </a>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <div className="text-sm text-slate-600">
                    Found <span className="font-semibold text-slate-900">{filteredCount}</span> records
                  </div>
                  <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-slate-200" />}>
                    <SalaryTable
                      records={result.paginatedRecords}
                      displayCurrency={result.displayCurrency}
                      sortBy={result.sortBy}
                      sortOrder={result.sortOrder}
                      queryString={result.queryString}
                    />
                  </Suspense>
                </div>

                <SalaryPagination
                  currentPage={result.currentPage}
                  totalRecords={filteredCount}
                  recordsPerPage={RECORDS_PER_PAGE}
                  isFirstPage={result.isFirstPage}
                  isLastPage={result.isLastPage}
                  queryString={result.queryString}
                />
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
