import Link from 'next/link';
import { headers } from 'next/headers';
import { Container } from '@/components/ui/container';

export const dynamic = 'force-dynamic';

type SalaryRow = {
  id: string;
  role: string;
  level: string;
  location: string;
  currency: string;
  experience_years: number;
  base_salary: string;
  total_compensation: string;
  confidence_score: string;
  is_verified: boolean;
  submitted_at: string;
  company: {
    name: string;
    slug: string;
  };
};

type SalariesResponse = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: SalaryRow[];
};

type SearchParams = Record<string, string | string[] | undefined>;

const PAGE_SIZE = 20;

const formatSalary = (value: string, currency: string) => {
  const amount = Number(value);
  const formatCompact = (divisor: number, suffix: string) => {
    const scaled = amount / divisor;
    return `${suffix}${scaled.toFixed(2)}${suffix === '₹' ? ' Cr' : 'M'}`;
  };

  if (currency === 'INR') {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  if (currency === 'USD') {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(2)}M`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  if (currency === 'GBP') {
    if (amount >= 1000000) {
      return `£${(amount / 1000000).toFixed(2)}M`;
    }
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  if (currency === 'EUR') {
    if (amount >= 1000000) {
      return `€${(amount / 1000000).toFixed(2)}M`;
    }
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatConfidence = (value: string) => `${Math.round(Number(value) * 100)}%`;

const toQueryString = (params: Record<string, string | number | undefined>) => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === '') continue;
    searchParams.set(key, String(value));
  }

  const query = searchParams.toString();
  return query ? `?${query}` : '';
};

async function getSalaries(searchParams: SearchParams): Promise<SalariesResponse> {
  const headersList = await headers();
  const host = headersList.get('host') ?? 'localhost:3000';
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';
  const page = typeof searchParams.page === 'string' ? searchParams.page : '1';
  const search = typeof searchParams.search === 'string' ? searchParams.search : '';
  const company = typeof searchParams.company === 'string' ? searchParams.company : '';
  const role = typeof searchParams.role === 'string' ? searchParams.role : '';
  const location = typeof searchParams.location === 'string' ? searchParams.location : '';
  const level = typeof searchParams.level === 'string' ? searchParams.level : '';
  const currency = typeof searchParams.currency === 'string' ? searchParams.currency : '';
  const verified = typeof searchParams.verified === 'string' ? searchParams.verified : '';
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'salary_desc';

  const response = await fetch(
    `${protocol}://${host}/api/salaries${toQueryString({
      page,
      limit: PAGE_SIZE,
      search,
      company,
      role,
      location,
      level,
      currency,
      verified,
      sort,
    })}`,
    {
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    return { total: 0, page: 1, limit: PAGE_SIZE, totalPages: 0, data: [] };
  }

  return response.json();
}

function buildHref(searchParams: SearchParams, updates: Record<string, string | number | undefined>) {
  const nextParams: Record<string, string | number | undefined> = {
    search: typeof searchParams.search === 'string' ? searchParams.search : '',
    company: typeof searchParams.company === 'string' ? searchParams.company : '',
    role: typeof searchParams.role === 'string' ? searchParams.role : '',
    location: typeof searchParams.location === 'string' ? searchParams.location : '',
    level: typeof searchParams.level === 'string' ? searchParams.level : '',
    currency: typeof searchParams.currency === 'string' ? searchParams.currency : '',
    verified: typeof searchParams.verified === 'string' ? searchParams.verified : '',
    sort: typeof searchParams.sort === 'string' ? searchParams.sort : 'salary_desc',
    page: typeof searchParams.page === 'string' ? searchParams.page : '1',
    ...updates,
  };

  if (!nextParams.search?.toString().trim()) {
    delete nextParams.search;
  }

  return `/salaries${toQueryString(nextParams)}`;
}

function FieldRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#EBEBEB] bg-white px-4 py-3">
      <div className="text-xs font-medium uppercase tracking-[0.16em] text-[#717171]">{label}</div>
      <div className="mt-1 text-sm font-medium text-[#222222]">{value}</div>
    </div>
  );
}

export default async function SalariesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const resolvedSearchParams = await searchParams;
  const salaries = await getSalaries(resolvedSearchParams);

  const page = salaries.page;
  const totalPages = Math.max(1, salaries.totalPages);
  const currentSearch = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : '';
  const currentCompany = typeof resolvedSearchParams.company === 'string' ? resolvedSearchParams.company : '';
  const currentRole = typeof resolvedSearchParams.role === 'string' ? resolvedSearchParams.role : '';
  const currentLocation = typeof resolvedSearchParams.location === 'string' ? resolvedSearchParams.location : '';
  const currentLevel = typeof resolvedSearchParams.level === 'string' ? resolvedSearchParams.level : '';
  const currentCurrency = typeof resolvedSearchParams.currency === 'string' ? resolvedSearchParams.currency : '';
  const currentVerified = typeof resolvedSearchParams.verified === 'string' ? resolvedSearchParams.verified : '';
  const currentSort = typeof resolvedSearchParams.sort === 'string' ? resolvedSearchParams.sort : 'salary_desc';

  const prevHref = page > 1 ? buildHref(resolvedSearchParams, { page: page - 1 }) : null;
  const nextHref = page < totalPages ? buildHref(resolvedSearchParams, { page: page + 1 }) : null;
  const verifiedRecords = salaries.data.filter((row) => row.is_verified).length;
  const averageCurrency = salaries.data[0]?.currency ?? 'USD';
  const averageCompensation =
    salaries.data.length > 0
      ? salaries.data.reduce((sum, row) => sum + Number(row.total_compensation), 0) / salaries.data.length
      : 0;
  const topLocation =
    salaries.data.length > 0
      ? Object.entries(
          salaries.data.reduce<Record<string, number>>((acc, row) => {
            acc[row.location] = (acc[row.location] ?? 0) + 1;
            return acc;
          }, {}),
        ).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'N/A'
      : 'N/A';

  return (
    <Container className="py-6 sm:py-8 lg:py-10">
      <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)] lg:items-end">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#717171]">
            <span className="rounded-full border border-[#EBEBEB] bg-white px-3 py-1">Salary intelligence</span>
            <span className="rounded-full border border-[#EBEBEB] bg-white px-3 py-1">{salaries.total} salaries</span>
            <span className="rounded-full border border-[#EBEBEB] bg-white px-3 py-1">Updated live</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-[32px] font-bold tracking-tight text-[#222222] sm:text-[36px] sm:leading-[1.1]">
              TalentDash Salaries
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[#484848]">
              Search verified compensation data by company, role, location, and level, then compare base pay,
              total compensation, and confidence at a glance.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <FieldRow label="Total Records" value={String(salaries.total)} />
          <FieldRow label="Verified Records" value={String(verifiedRecords)} />
          <FieldRow label="Average Compensation" value={formatSalary(String(Math.round(averageCompensation)), averageCurrency)} />
          <FieldRow label="Top Location" value={topLocation} />
        </div>
      </div>

      <form className="mb-6 rounded-3xl border border-[#EBEBEB] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:p-5">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="space-y-2">
            <label htmlFor="search" className="text-sm font-medium text-[#222222]">
              Search
            </label>
            <input
              id="search"
              name="search"
              defaultValue={currentSearch}
              placeholder="Company, role, or location"
              className="h-11 w-full rounded-xl border border-[#EBEBEB] bg-white px-4 text-sm text-[#222222] outline-none transition placeholder:text-[#717171] focus:border-[#FF5A5F] lg:col-span-12"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-12 xl:grid-cols-6">
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium text-[#222222]">
                Company
              </label>
              <input
                id="company"
                name="company"
                defaultValue={currentCompany}
                placeholder="Google"
                className="h-11 w-full rounded-xl border border-[#EBEBEB] bg-white px-4 text-sm text-[#222222] outline-none transition placeholder:text-[#717171] focus:border-[#FF5A5F]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium text-[#222222]">
                Role
              </label>
              <input
                id="role"
                name="role"
                defaultValue={currentRole}
                placeholder="Software Engineer"
                className="h-11 w-full rounded-xl border border-[#EBEBEB] bg-white px-4 text-sm text-[#222222] outline-none transition placeholder:text-[#717171] focus:border-[#FF5A5F]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium text-[#222222]">
                Location
              </label>
              <input
                id="location"
                name="location"
                defaultValue={currentLocation}
                placeholder="Bengaluru"
                className="h-11 w-full rounded-xl border border-[#EBEBEB] bg-white px-4 text-sm text-[#222222] outline-none transition placeholder:text-[#717171] focus:border-[#FF5A5F]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="level" className="text-sm font-medium text-[#222222]">
                Level
              </label>
              <select
                id="level"
                name="level"
                defaultValue={currentLevel}
                className="h-11 w-full rounded-xl border border-[#EBEBEB] bg-white px-4 text-sm text-[#222222] outline-none transition focus:border-[#FF5A5F]"
              >
                <option value="">All levels</option>
                <option value="L3">L3</option>
                <option value="L4">L4</option>
                <option value="L5">L5</option>
                <option value="L6">L6</option>
                <option value="SDE_I">SDE_I</option>
                <option value="SDE_II">SDE_II</option>
                <option value="SDE_III">SDE_III</option>
                <option value="STAFF">STAFF</option>
                <option value="PRINCIPAL">PRINCIPAL</option>
                <option value="IC4">IC4</option>
                <option value="IC5">IC5</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="currency" className="text-sm font-medium text-[#222222]">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                defaultValue={currentCurrency}
                className="h-11 w-full rounded-xl border border-[#EBEBEB] bg-white px-4 text-sm text-[#222222] outline-none transition focus:border-[#FF5A5F]"
              >
                <option value="">All currencies</option>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="verified" className="text-sm font-medium text-[#222222]">
                Verified
              </label>
              <select
                id="verified"
                name="verified"
                defaultValue={currentVerified}
                className="h-11 w-full rounded-xl border border-[#EBEBEB] bg-white px-4 text-sm text-[#222222] outline-none transition focus:border-[#FF5A5F]"
              >
                <option value="">All records</option>
                <option value="true">Verified only</option>
                <option value="false">Unverified only</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="sort" className="text-sm font-medium text-[#222222]">
                Sort
              </label>
              <select
                id="sort"
                name="sort"
                defaultValue={currentSort}
                className="h-11 w-full rounded-xl border border-[#EBEBEB] bg-white px-4 text-sm text-[#222222] outline-none transition focus:border-[#FF5A5F]"
              >
                <option value="salary_desc">Highest Salary</option>
                <option value="salary_asc">Lowest Salary</option>
                <option value="newest">Newest</option>
                <option value="confidence_desc">Confidence</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#FF5A5F] px-5 text-sm font-semibold text-white transition hover:bg-[#e14d52]"
          >
            Apply filters
          </button>
          <Link
            href="/salaries"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#EBEBEB] bg-white px-5 text-sm font-semibold text-[#222222] transition hover:bg-[#F2F2F2]"
          >
            Reset
          </Link>
        </div>
      </form>

      <div className="overflow-hidden rounded-3xl border border-[#EBEBEB] bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#EBEBEB] text-left">
            <thead className="sticky top-16 z-20 bg-[#F7F7F7]">
              <tr className="text-xs font-medium uppercase tracking-[0.14em] text-[#717171]">
                <th className="px-4 py-4">Company</th>
                <th className="px-4 py-4">Role</th>
                <th className="px-4 py-4">Location</th>
                <th className="px-4 py-4">Level</th>
                <th className="px-4 py-4">Experience</th>
                <th className="px-4 py-4 text-right">Base Salary</th>
                <th className="px-4 py-4 text-right">Total Compensation</th>
                <th className="px-4 py-4 text-right">Confidence Score</th>
                <th className="px-4 py-4 text-center">Verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEBEB]">
              {salaries.data.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-14 text-center text-sm text-[#717171]">
                    No records found
                  </td>
                </tr>
              ) : (
                salaries.data.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`transition hover:bg-[#F2F2F2] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FCFCFC]'}`}
                  >
                    <td className="px-4 py-4 text-sm font-medium text-[#222222]">
                      <Link href={`/companies/${row.company.slug}`} className="hover:underline">
                        {row.company.name}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#484848]">{row.role}</td>
                    <td className="px-4 py-4 text-sm text-[#484848]">{row.location}</td>
                    <td className="px-4 py-4 text-sm text-[#484848]">{row.level}</td>
                    <td className="px-4 py-4 text-sm text-[#484848]">{row.experience_years} years</td>
                    <td className="px-4 py-4 text-right text-sm font-medium tabular-nums text-[#222222]">
                      {formatSalary(row.base_salary, row.currency)}
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-semibold tabular-nums text-[#222222]">
                      {formatSalary(row.total_compensation, row.currency)}
                    </td>
                    <td className="px-4 py-4 text-right text-sm tabular-nums text-[#484848]">
                      {formatConfidence(row.confidence_score)}
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-[#484848]">
                      <span
                        className={`inline-flex min-w-20 items-center justify-center rounded-full px-3 py-1 font-medium ${
                          row.is_verified
                            ? 'bg-[rgba(0,138,5,0.1)] text-[#008A05]'
                            : 'bg-[rgba(255,180,0,0.12)] text-[#a96d00]'
                        }`}
                      >
                        {row.is_verified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-[#EBEBEB] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#484848]">
          Showing <span className="font-medium text-[#222222]">{salaries.data.length}</span> of{' '}
          <span className="font-medium text-[#222222]">{salaries.total}</span> records
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[#EBEBEB] px-3 py-2 text-sm text-[#717171]">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <Link
              aria-disabled={!prevHref}
              href={prevHref ?? '#'}
              className={`inline-flex h-11 items-center justify-center rounded-xl border px-4 text-sm font-medium transition ${
                prevHref
                  ? 'border-[#EBEBEB] bg-white text-[#222222] hover:bg-[#F2F2F2]'
                  : 'pointer-events-none border-[#EBEBEB] bg-[#F7F7F7] text-[#C2C2C2]'
              }`}
            >
              Previous
            </Link>
            <Link
              aria-disabled={!nextHref}
              href={nextHref ?? '#'}
              className={`inline-flex h-11 items-center justify-center rounded-xl border px-4 text-sm font-medium transition ${
                nextHref
                  ? 'border-[#FF5A5F] bg-[#FF5A5F] text-white hover:bg-[#e14d52]'
                  : 'pointer-events-none border-[#EBEBEB] bg-[#F7F7F7] text-[#C2C2C2]'
              }`}
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
