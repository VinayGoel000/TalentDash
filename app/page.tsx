import Link from 'next/link';
import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCompensation } from '@/lib/formatters';
import { getHomepageMetadata } from '@/lib/seo/metadata';
import { generateOrganizationSchema, generateWebsiteSchema, serializeJsonLd } from '@/lib/seo/jsonld';

export const metadata: Metadata = getHomepageMetadata();
export const revalidate = 3600;

type HomeSalaryRow = {
  id: string;
  role: string;
  location: string;
  currency: string;
  total_compensation: string;
  company: { name: string; slug: string };
};

async function loadHomeData() {
  const headersList = await headers();
  const host = headersList.get('host') ?? 'localhost:3000';
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';
  const response = await fetch(`${protocol}://${host}/api/salaries?limit=5&sort=submitted_at_desc`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) return { total: 0, data: [] as HomeSalaryRow[] };
  return response.json() as Promise<{ total: number; data: HomeSalaryRow[] }>;
}

export default async function HomePage() {
  const salaries = await loadHomeData();
  const companies = new Map<string, { name: string; slug: string; location: string; count: number }>();
  const locations = new Set<string>();

  for (const row of salaries.data) {
    locations.add(row.location);
    const current = companies.get(row.company.slug);
    companies.set(row.company.slug, current ? { ...current, count: current.count + 1 } : { ...row.company, location: row.location, count: 1 });
  }

  const featuredCompanies = Array.from(companies.values()).slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(generateOrganizationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(generateWebsiteSchema()),
        }}
      />
      <Container className="py-6">
        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="max-w-3xl space-y-3">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Compensation Intelligence for Modern Careers</h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                Compare salaries, understand market value, and make better career decisions with verified compensation data.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/salaries">Browse Salaries</Button>
              <Button href="/companies" variant="secondary">
                View Companies
              </Button>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4"><div className="text-sm text-slate-500">Companies</div><div className="mt-2 text-2xl font-semibold text-slate-900">{featuredCompanies.length}</div></Card>
            <Card className="p-4"><div className="text-sm text-slate-500">Salary Records</div><div className="mt-2 text-2xl font-semibold text-slate-900">{salaries.total}</div></Card>
            <Card className="p-4"><div className="text-sm text-slate-500">Locations</div><div className="mt-2 text-2xl font-semibold text-slate-900">{locations.size}</div></Card>
            <Card className="p-4"><div className="text-sm text-slate-500">Verified Records</div><div className="mt-2 text-2xl font-semibold text-slate-900">{salaries.data.length}</div></Card>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Featured Companies</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredCompanies.map((company) => (
                <Link key={company.slug} href={`/companies/${company.slug}`} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium text-slate-900">{company.name}</div>
                      <div className="mt-1 text-sm text-slate-500">{company.location}</div>
                    </div>
                    <Badge tone="blue">{`${company.count} records`}</Badge>
                  </div>
                  <div className="mt-4 text-sm font-medium text-blue-600">View Details</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Latest Salaries</h2>
              <Link href="/salaries" className="text-sm font-medium text-blue-600">View All Salaries</Link>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50 text-xs uppercase tracking-[0.14em] text-slate-500">
                  <tr>
                    <th className="px-4 py-3 text-left">Company</th>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">Location</th>
                    <th className="px-4 py-3 text-right">Compensation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {salaries.data.map((row) => (
                    <tr key={row.id}>
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">
                        <Link href={`/companies/${row.company.slug}`} className="hover:underline">
                          {row.company.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{row.role}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{row.location}</td>
                      <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">{formatCompensation(row.total_compensation, row.currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
