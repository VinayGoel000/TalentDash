import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { CompanyLogo } from '@/components/ui/CompanyLogo';
import { LevelBadge } from '@/components/features/LevelBadge';
import { getAllCompanySlugs, getCompanyPageStats } from '@/lib/db/companies';
import { getLevelDistributionEntries } from '@/lib/company-stats';
import { formatCompensation } from '@/lib/formatters';
import { formatRecordTotalCompensation } from '@/lib/salary-display';
import { generateBreadcrumbSchema, generateCompanyDatasetSchema, serializeJsonLd } from '@/lib/seo/jsonld';
import { getCanonicalUrl, getCompanyMetadata, getSiteUrl } from '@/lib/seo/metadata';

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllCompanySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const stats = await getCompanyPageStats(slug);
  if (!stats) {
    return { title: 'Company Not Found | TalentDash' };
  }

  return getCompanyMetadata({
    name: stats.name,
    slug: stats.slug,
    totalSalaries: stats.salaries.length,
    averageTC: stats.medianTotalCompensation,
  });
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stats = await getCompanyPageStats(slug);

  if (!stats) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const levelEntries = getLevelDistributionEntries(stats.levelDistribution, stats.salaries.length);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            generateCompanyDatasetSchema({
              name: stats.name,
              slug: stats.slug,
              totalSalaries: stats.salaries.length,
              averageTC: stats.medianTotalCompensation,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            generateBreadcrumbSchema([
              { name: 'Home', url: `${siteUrl}/`, position: 1 },
              { name: 'Companies', url: `${siteUrl}/companies`, position: 2 },
              { name: stats.name, url: getCanonicalUrl(`/companies/${stats.slug}`), position: 3 },
            ]),
          ),
        }}
      />
      <Container className="py-8">
        <div className="space-y-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <CompanyLogo name={stats.name} />
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">/companies/{stats.slug}</p>
                <h1
                  className="mt-2 truncate text-3xl font-bold tracking-tight text-slate-900 sm:max-w-2xl"
                  title={stats.name}
                >
                  {stats.name}
                </h1>
                <p className="mt-2 text-base text-slate-600">
                  {stats.salaries.length} verified salary records
                </p>
              </div>
            </div>
            <Link
              href={`/salaries?company=${encodeURIComponent(stats.name)}`}
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              View in salary table
            </Link>
          </header>

          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Median total compensation</p>
              <p className="mt-2 min-h-[2rem] text-2xl font-semibold tabular-nums text-slate-900">
                {formatCompensation(stats.medianTotalCompensation, 'INR')}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Average total compensation</p>
              <p className="mt-2 min-h-[2rem] text-2xl font-semibold tabular-nums text-slate-900">
                {formatCompensation(stats.averageTotalCompensation, 'INR')}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Level coverage</p>
              <p className="mt-2 min-h-[2rem] text-2xl font-semibold text-slate-900">{levelEntries.length}</p>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Level distribution</h2>
            <ul className="mt-4 space-y-4">
              {levelEntries.map((entry) => (
                <li key={entry.level} className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <LevelBadge level={entry.level} />
                    <span className="min-w-[3rem] text-right text-sm font-medium tabular-nums text-slate-700">
                      {entry.percent}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all"
                      style={{ width: `${entry.percent}%` }}
                      role="presentation"
                    />
                  </div>
                  <p className="text-xs text-slate-500">{entry.count} record{entry.count === 1 ? '' : 's'}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Salary records</h2>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      <th className="px-6 py-4 text-left">Role</th>
                      <th className="px-6 py-4 text-left">Level</th>
                      <th className="px-6 py-4 text-left">Location</th>
                      <th className="px-6 py-4 text-right">Total comp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {stats.salaries.map((record) => (
                      <tr key={record.id} className="hover:bg-slate-50">
                        <td className="max-w-[14rem] truncate px-6 py-4 text-sm text-slate-700" title={record.role}>
                          {record.role}
                        </td>
                        <td className="px-6 py-4">
                          <LevelBadge level={record.level_standardized} />
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">{record.location}</td>
                        <td className="px-6 py-4 text-right text-sm font-semibold tabular-nums text-slate-900">
                          {formatRecordTotalCompensation(record, record.currency as 'INR' | 'USD')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
