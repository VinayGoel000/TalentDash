/**
 * Salaries Page
 * Main salary table experience at /salaries route
 * Uses React Server Components and static rendering with mock data
 */

import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SalaryTable } from '@/components/features/SalaryTable';
import { SalaryFilters } from '@/components/features/SalaryFilters';
import { SalaryPagination } from '@/components/features/SalaryPagination';
import { MOCK_SALARY_DATA } from '@/lib/mock-data';
import type { SalaryRecord } from '@/types/salary';
import type { Currency } from '@/lib/currency-config';
import { getSalariesMetadata } from '@/lib/seo/metadata';
import { generateSalaryDatasetSchema, serializeJsonLd } from '@/lib/seo/jsonld';

// Static rendering at build time
export const revalidate = 3600; // Revalidate every hour (ISR)

export const metadata: Metadata = getSalariesMetadata();

interface SearchParams {
  company?: string;
  role?: string;
  level?: string;
  location?: string;
  currency?: string;
  sort?: string;
  sortOrder?: string;
  page?: string;
  search?: string;
}

// Extract unique values for filter dropdowns
function getUniqueValues(records: SalaryRecord[], field: keyof SalaryRecord): string[] {
  return Array.from(new Set(records.map((r) => String(r[field])))).sort();
}

// Apply filters to salary records
function filterRecords(
  records: SalaryRecord[],
  params: SearchParams
): SalaryRecord[] {
  let filtered = [...records];

  // Company filter
  if (params.company) {
    filtered = filtered.filter(
      (r) => r.company.toLowerCase() === params.company!.toLowerCase()
    );
  }

  // Role filter
  if (params.role) {
    filtered = filtered.filter(
      (r) => r.role.toLowerCase() === params.role!.toLowerCase()
    );
  }

  // Level multi-select filter
  if (params.level) {
    const levels = params.level.split(',').map((l) => l.trim());
    filtered = filtered.filter((r) => levels.includes(r.level_standardized));
  }

  // Location filter
  if (params.location) {
    filtered = filtered.filter(
      (r) => r.location.toLowerCase() === params.location!.toLowerCase()
    );
  }

  // Search filter (searches company name)
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.company.toLowerCase().includes(searchTerm) ||
        r.role.toLowerCase().includes(searchTerm)
    );
  }

  return filtered;
}

// Sort records
function sortRecords(
  records: SalaryRecord[],
  sortBy: string = 'total_compensation',
  sortOrder: 'asc' | 'desc' = 'desc'
): SalaryRecord[] {
  const sorted = [...records];

  sorted.sort((a, b) => {
    let aValue: any = a[sortBy as keyof SalaryRecord];
    let bValue: any = b[sortBy as keyof SalaryRecord];

    // Handle string comparisons
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
}

export default async function SalariesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  // Get display currency
  const displayCurrency: Currency = (params.currency as Currency) || 'INR';

  // Filter data
  const filteredRecords = filterRecords(MOCK_SALARY_DATA, params);

  // Sort data (default: total_compensation descending)
  const sortBy = params.sort || 'total_compensation';
  const sortOrder = (params.sortOrder as 'asc' | 'desc') || 'desc';
  const sortedRecords = sortRecords(filteredRecords, sortBy, sortOrder);

  // Pagination
  const recordsPerPage = 25;
  const currentPage = parseInt(params.page || '1', 10);
  const totalPages = Math.ceil(sortedRecords.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedRecords = sortedRecords.slice(startIndex, endIndex);

  // Get unique values for filters
  const allCompanies = getUniqueValues(MOCK_SALARY_DATA, 'company');
  const allRoles = getUniqueValues(MOCK_SALARY_DATA, 'role');
  const allLevels = getUniqueValues(MOCK_SALARY_DATA, 'level_standardized').sort();
  const allLocations = getUniqueValues(MOCK_SALARY_DATA, 'location');

  // Check if page is out of range
  if (currentPage > totalPages && totalPages > 0) {
    redirect('?page=1');
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(generateSalaryDatasetSchema(MOCK_SALARY_DATA.length, new Date().toISOString().split('T')[0])),
        }}
      />
      <Container className="py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">/salaries</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Salary Database</h1>
            <p className="mt-2 text-base text-slate-600">
              Explore salary data from {MOCK_SALARY_DATA.length} verified records
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="flex gap-2">
            <a
              href={`?${new URLSearchParams({
                ...params,
                currency: 'INR',
                page: '1',
              }).toString()}`}
              className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                displayCurrency === 'INR'
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              ₹ INR
            </a>
            <a
              href={`?${new URLSearchParams({
                ...params,
                currency: 'USD',
                page: '1',
              }).toString()}`}
              className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                displayCurrency === 'USD'
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              $ USD
            </a>
          </div>
        </div>

        {/* Filters */}
        <Suspense fallback={<div className="h-48 animate-pulse rounded-lg bg-slate-200" />}>
          <SalaryFilters
            allCompanies={allCompanies}
            allRoles={allRoles}
            allLevels={allLevels}
            allLocations={allLocations}
          />
        </Suspense>

        {/* Results */}
        <div className="space-y-4">
          {filteredRecords.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">No records found for these filters</h3>
              <p className="mt-2 text-sm text-slate-600">Try removing a filter to see more results.</p>
              <a
                href="/salaries"
                className="mt-4 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none"
              >
                Clear all filters
              </a>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="space-y-2">
                <div className="text-sm text-slate-600">
                  Found <span className="font-semibold text-slate-900">{filteredRecords.length}</span> records
                </div>
                <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-slate-200" />}>
                  <SalaryTable
                    records={paginatedRecords}
                    displayCurrency={displayCurrency}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                  />
                </Suspense>
              </div>

              {/* Pagination */}
              <SalaryPagination
                currentPage={currentPage}
                totalRecords={filteredRecords.length}
                recordsPerPage={recordsPerPage}
                isFirstPage={isFirstPage}
                isLastPage={isLastPage}
              />
            </>
          )}
        </div>
      </div>
      </Container>
    </>
  );
}
