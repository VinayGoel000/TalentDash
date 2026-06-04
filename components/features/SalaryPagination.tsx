import { getPageUrl } from '@/lib/salary-query';

interface SalaryPaginationProps {
  currentPage: number;
  totalRecords: number;
  recordsPerPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  queryString: string;
}

export function SalaryPagination({
  currentPage,
  totalRecords,
  recordsPerPage,
  isFirstPage,
  isLastPage,
  queryString,
}: SalaryPaginationProps) {
  const startRecord = totalRecords === 0 ? 0 : (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, totalRecords);

  return (
    <div className="flex min-h-[3.25rem] items-center justify-between border-t border-slate-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-700">
            Showing <span className="font-medium">{startRecord}</span> to <span className="font-medium">{endRecord}</span> of{' '}
            <span className="font-medium">{totalRecords}</span> results
          </p>
        </div>
        <nav className="isolate inline-flex space-x-1 rounded-lg border border-slate-300 shadow-sm" aria-label="Pagination">
          {isFirstPage ? (
            <span
              aria-disabled
              className="relative inline-flex cursor-not-allowed items-center bg-slate-50 px-3 py-2 text-sm font-medium text-slate-400"
            >
              Previous
            </span>
          ) : (
            <a
              href={getPageUrl(queryString, currentPage - 1)}
              className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
            >
              Previous
            </a>
          )}
          {isLastPage ? (
            <span
              aria-disabled
              className="relative inline-flex cursor-not-allowed items-center bg-slate-50 px-3 py-2 text-sm font-medium text-slate-400"
            >
              Next
            </span>
          ) : (
            <a
              href={getPageUrl(queryString, currentPage + 1)}
              className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
            >
              Next
            </a>
          )}
        </nav>
      </div>
    </div>
  );
}
