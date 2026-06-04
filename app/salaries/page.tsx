import Link from 'next/link';
import { headers } from 'next/headers';
import { Container } from '@/components/ui/Container';
import { FilterBar } from '@/components/ui/FilterBar';
import { CurrencyToggle } from '@/components/ui/CurrencyToggle';
import { SalaryTable, type SalaryTableRow } from '@/components/ui/SalaryTable';

export const dynamic = 'force-dynamic';

type SearchParams = Record<string, string | string[] | undefined>;

async function getSalaries(searchParams: SearchParams) {
  const headersList = await headers();
  const host = headersList.get('host') ?? 'localhost:3000';
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';
  const params = new URLSearchParams();
  params.set('limit', '20');
  if (typeof searchParams.company === 'string') params.set('company', searchParams.company);
  if (typeof searchParams.role === 'string') params.set('role', searchParams.role);
  if (typeof searchParams.location === 'string') params.set('location', searchParams.location);
  if (typeof searchParams.level === 'string') params.set('level', searchParams.level);
  if (typeof searchParams.currency === 'string') params.set('currency', searchParams.currency);
  if (typeof searchParams.search === 'string') params.set('search', searchParams.search);
  params.set('sort', 'submitted_at_desc');
  const response = await fetch(`${protocol}://${host}/api/salaries?${params.toString()}`, { cache: 'no-store' });
  if (!response.ok) return { total: 0, data: [] as SalaryTableRow[] };
  return response.json() as Promise<{ total: number; data: SalaryTableRow[] }>;
}

export default async function SalariesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const salaries = await getSalaries(params);
  const currency = typeof params.currency === 'string' && params.currency === 'USD' ? 'USD' : 'INR';

  return (
    <Container className="py-6">
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">/salaries</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Salary Records</h1>
          </div>
          <CurrencyToggle current={currency} hrefBase="/salaries" />
        </div>

        <form className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_1fr_1fr_160px_1.2fr_auto]">
          <FilterBar
            company={typeof params.company === 'string' ? params.company : ''}
            role={typeof params.role === 'string' ? params.role : ''}
            location={typeof params.location === 'string' ? params.location : ''}
            level={typeof params.level === 'string' ? params.level : ''}
          />
          <input
            name="search"
            defaultValue={typeof params.search === 'string' ? params.search : ''}
            placeholder="Search"
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-600"
          />
          <button className="h-11 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white">Apply</button>
        </form>

        <SalaryTable rows={salaries.data} />

        <div className="flex items-center justify-between text-sm text-slate-500">
          <div>{salaries.total} records</div>
          <Link href="/salaries" className="font-medium text-blue-600">
            View all salaries
          </Link>
        </div>
      </div>
    </Container>
  );
}
