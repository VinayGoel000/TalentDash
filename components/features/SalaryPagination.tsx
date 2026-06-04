/**
 * Salary Pagination Component
 * Handles page navigation and display of pagination info
 */

'use client';

import { useSearchParams } from 'next/navigation';

interface SalaryPaginationProps {
  currentPage: number;
  totalRecords: number;
  recordsPerPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export function SalaryPagination({
  currentPage,
  totalRecords,
  recordsPerPage,
  isFirstPage,
  isLastPage,
}: SalaryPaginationProps) {
  const searchParams = useSearchParams();

  const startRecord = (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, totalRecords);

  // Generate navigation URLs
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-700">
            Showing <span className="font-medium">{startRecord}</span> to <span className="font-medium">{endRecord}</span> of{' '}
            <span className="font-medium">{totalRecords}</span> results
          </p>
        </div>
        <nav className="isolate inline-flex space-x-1 rounded-lg border border-slate-300 shadow-sm" aria-label="Pagination">
          <a
            href={getPageUrl(currentPage - 1)}
            aria-disabled={isFirstPage}
            className={`relative inline-flex items-center px-3 py-2 text-sm font-medium ${
              isFirstPage
                ? 'cursor-not-allowed bg-slate-50 text-slate-400'
                : 'text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50'
            }`}
          >
            Previous
          </a>
          <a
            href={getPageUrl(currentPage + 1)}
            aria-disabled={isLastPage}
            className={`relative inline-flex items-center px-3 py-2 text-sm font-medium ${
              isLastPage
                ? 'cursor-not-allowed bg-slate-50 text-slate-400'
                : 'text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50'
            }`}
          >
            Next
          </a>
        </nav>
      </div>
    </div>
  );
}
