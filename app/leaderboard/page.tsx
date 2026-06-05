import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { PreviewPageHero } from '@/components/home/PreviewPageHero';
import { PreviewStatGrid, type PreviewStat } from '@/components/home/PreviewStatGrid';
import { SectionHeading } from '@/components/home/SectionHeading';
import { formatCompensation } from '@/lib/formatters';
import { getCompanyInsights, getOverallStats } from '@/lib/db/insights';
import { getLeaderboardMetadata } from '@/lib/seo/metadata';

export const revalidate = 3600;

export const metadata = getLeaderboardMetadata();

function formatNumber(value: number): string {
  if (value >= 10000000) return `${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `${(value / 100000).toFixed(1)} L`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)} K`;
  return value.toLocaleString();
}

export default async function LeaderboardPage() {
  const [companies, stats] = await Promise.all([getCompanyInsights(), getOverallStats()]);

  const topStats: PreviewStat[] = [
    {
      key: 'companies',
      label: 'Companies ranked',
      value: companies.length.toLocaleString(),
      caption: 'Each ranked by verified median total compensation.',
      accent: 'red',
    },
    {
      key: 'records',
      label: 'Records analysed',
      value: stats.salaryCount.toLocaleString(),
      caption: 'All verified submissions contribute to these rankings.',
      accent: 'blue',
    },
    {
      key: 'top-tc',
      label: 'Top median TC',
      value:
        companies.length > 0
          ? formatCompensation(companies[0].medianTotalCompensation, 'INR')
          : '—',
      caption: 'Highest median total compensation in the leaderboard.',
      accent: 'green',
    },
    {
      key: 'avg-tc',
      label: 'Average median TC',
      value:
        companies.length > 0
          ? formatCompensation(
              Math.round(
                companies.reduce((sum, c) => sum + c.medianTotalCompensation, 0) /
                  companies.length
              ),
              'INR'
            )
          : '—',
      caption: 'Mean of median total compensation across the leaderboard.',
      accent: 'amber',
    },
  ];

  return (
    <>
      <PreviewPageHero
        eyebrow="Leaderboard"
        title="Top paying companies, ranked by verified comp"
        description="The TalentDash leaderboard ranks every company in our database by median total compensation, drawing on real submissions from the community."
        badges={['Median total comp', 'Verified only', 'Sorted by payouts']}
        actions={[
          { label: 'See top companies', href: '#rankings' },
          { label: 'Compare two', href: '/compare?type=companies', variant: 'secondary' },
        ]}
        meta="Refreshed whenever a new verified salary lands in the database"
      />
      <PreviewStatGrid stats={topStats} />

      <div id="rankings" />

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Rankings"
            title="Top paying companies"
            description="Click any company to see the full salary breakdown, levels and trends."
            action={{ label: 'Open salary explorer', href: '/salaries' }}
          />
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#EBEBEB]">
            <div className="hidden grid-cols-12 gap-3 border-b border-[#EBEBEB] bg-[#FAFAFA] px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#717171] sm:grid">
              <div className="col-span-1">Rank</div>
              <div className="col-span-4">Company</div>
              <div className="col-span-3">Primary location</div>
              <div className="col-span-2 text-right">Median TC</div>
              <div className="col-span-2 text-right">Records</div>
            </div>
            <ul>
              {companies.map((company, index) => (
                <li
                  key={company.slug}
                  className="border-b border-[#F2F2F2] last:border-b-0 hover:bg-[#FFF7F7]"
                >
                  <Link
                    href={`/companies/${company.slug}`}
                    className="grid grid-cols-12 items-center gap-3 px-5 py-4"
                  >
                    <div className="col-span-2 sm:col-span-1">
                      <span
                        className={[
                          'inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold',
                          index === 0 && 'bg-[#FF5A5F] text-white',
                          index === 1 && 'bg-[#FFB400] text-white',
                          index === 2 && 'bg-[#FFB8BB] text-[#7A1F22]',
                          index > 2 && 'bg-[#F2F2F2] text-[#484848]',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {index + 1}
                      </span>
                    </div>
                    <div className="col-span-10 sm:col-span-4">
                      <div className="text-sm font-semibold text-[#222222] sm:text-base">
                        {company.name}
                      </div>
                      <div className="text-xs text-[#717171]">
                        {company.topRoles[0]?.role ?? 'Multiple roles'}
                      </div>
                    </div>
                    <div className="col-span-6 text-xs text-[#484848] sm:col-span-3 sm:text-sm">
                      {company.primaryLocation || 'Distributed'}
                    </div>
                    <div className="col-span-3 text-right text-sm font-semibold tabular-nums text-[#222222] sm:col-span-2">
                      {formatCompensation(company.medianTotalCompensation, 'INR')}
                    </div>
                    <div className="col-span-3 text-right text-xs text-[#717171] sm:col-span-2 sm:text-sm">
                      {formatNumber(company.recordCount)} records
                    </div>
                  </Link>
                </li>
              ))}
              {companies.length === 0 ? (
                <li className="px-5 py-12 text-center text-sm text-[#717171]">
                  No verified salaries yet — the leaderboard will appear as soon as the first
                  record is published.
                </li>
              ) : null}
            </ul>
          </div>
        </Container>
      </div>

      <div className="border-b border-[#EBEBEB] bg-[#FAFAFA]">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="How we rank"
            title="Methodology"
            description="Every company is ranked by median total compensation across all verified salary records in our database."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                key: 'verified',
                title: 'Verified only',
                description: 'We rank by median across verified records. Unverified submissions are excluded.',
              },
              {
                key: 'median',
                title: 'Median, not average',
                description: 'Median is more robust to outliers. We use it as the primary ranking metric.',
              },
              {
                key: 'refresh',
                title: 'Refreshed live',
                description: 'Each new record updates the leaderboard as soon as it is verified.',
              },
            ].map((item) => (
              <div
                key={item.key}
                className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <h3 className="text-base font-semibold text-[#222222]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#717171]">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
