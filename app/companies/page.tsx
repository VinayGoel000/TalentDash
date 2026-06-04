import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { CompanyLogo } from '@/components/ui/CompanyLogo';
import { Badge } from '@/components/ui/Badge';
import { getCompanyIndexFromDb } from '@/lib/db/companies';
import { formatCompensation } from '@/lib/formatters';
import { getCompaniesIndexMetadata } from '@/lib/seo/metadata';

export const revalidate = 3600;

export const metadata: Metadata = getCompaniesIndexMetadata();

export default async function CompaniesPage() {
  const companies = await getCompanyIndexFromDb();

  return (
    <Container className="py-8">
      <div className="space-y-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">/companies</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Companies</h1>
          <p className="mt-2 text-base text-slate-600">
            Browse {companies.length} employers with verified salary records.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <Link
              key={company.slug}
              href={`/companies/${company.slug}`}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                <CompanyLogo name={company.name} size={40} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-slate-900" title={company.name}>
                    {company.name}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">{company.primaryLocation}</div>
                  <div className="mt-2 text-sm font-medium tabular-nums text-slate-700">
                    Median TC: {formatCompensation(company.medianTotalCompensation, 'INR')}
                  </div>
                </div>
                <Badge tone="blue">{`${company.recordCount} records`}</Badge>
              </div>
              <div className="mt-4 text-sm font-medium text-blue-600">View company page</div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
