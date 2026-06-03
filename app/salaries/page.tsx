import Link from 'next/link';
import { headers } from 'next/headers';
import { Container } from '@/components/ui/container';

export const dynamic = 'force-dynamic';

type SalaryRow = {
  id: string;
  company_id: string;
  role: string;
  level: string;
  location: string;
  total_compensation: string;
  is_verified: boolean;
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

async function getSalaries(): Promise<SalariesResponse> {
  const headersList = await headers();
  const host = headersList.get('host') ?? 'localhost:3000';
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';
  const response = await fetch(`${protocol}://${host}/api/salaries`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    return { total: 0, page: 1, limit: 20, totalPages: 0, data: [] };
  }

  return response.json();
}

export default async function SalariesPage() {
  const salaries = await getSalaries();

  return (
    <Container className="py-8 sm:py-10">
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-[#222222] sm:text-[36px] sm:leading-[1.1]">Salaries</h1>
        <p className="text-base leading-7 text-[#484848]">Browse compensation records across companies and locations.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#EBEBEB] bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#EBEBEB] text-left">
            <thead className="bg-[#F7F7F7]">
              <tr className="text-sm font-medium text-[#717171]">
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Level</th>
                <th className="px-4 py-3 text-right">Total Compensation</th>
                <th className="px-4 py-3 text-center">Verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEBEB]">
              {salaries.data.map((row) => (
                <tr key={row.id} className="transition hover:bg-[#F2F2F2]">
                  <td className="px-4 py-4 font-medium text-[#222222]">
                    <Link href={`/companies/${row.company.slug}`} className="hover:underline">
                      {row.company.name}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-[#484848]">{row.role}</td>
                  <td className="px-4 py-4 text-[#484848]">{row.location}</td>
                  <td className="px-4 py-4 text-[#484848]">{row.level}</td>
                  <td className="px-4 py-4 text-right font-medium tabular-nums text-[#222222]">
                    {row.total_compensation}
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-[#484848]">{row.is_verified ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
