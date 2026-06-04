import type { SalaryRecord } from '@/types/salary';
import type { Currency } from '@/lib/currency-config';

export const RECORDS_PER_PAGE = 25;

const SORTABLE_FIELDS = new Set([
  'total_compensation',
  'base_salary',
  'company',
  'role',
  'location',
  'experience_years',
  'level_standardized',
]);

export interface SalarySearchParams {
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

export interface SalaryQueryResult {
  displayCurrency: Currency;
  filteredRecords: SalaryRecord[];
  sortedRecords: SalaryRecord[];
  paginatedRecords: SalaryRecord[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  queryString: string;
}

export function buildQueryString(params: SalarySearchParams): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, value);
  }
  return query.toString();
}

export function getPageUrl(queryString: string, page: number): string {
  const params = new URLSearchParams(queryString);
  params.set('page', String(page));
  return `?${params.toString()}`;
}

export function getSortUrl(
  queryString: string,
  field: string,
  currentSort: string,
  currentOrder: 'asc' | 'desc',
): string {
  const params = new URLSearchParams(queryString);
  const nextOrder: 'asc' | 'desc' =
    currentSort === field && currentOrder === 'desc' ? 'asc' : 'desc';
  params.set('sort', field);
  params.set('sortOrder', nextOrder);
  params.set('page', '1');
  return `?${params.toString()}`;
}

export function resolveSortField(sort?: string): string {
  return sort && SORTABLE_FIELDS.has(sort) ? sort : 'total_compensation';
}
