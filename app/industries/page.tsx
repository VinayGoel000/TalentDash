import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { PreviewPageHero } from '@/components/home/PreviewPageHero';
import { PreviewStatGrid, type PreviewStat } from '@/components/home/PreviewStatGrid';
import { SectionHeading } from '@/components/home/SectionHeading';
import { formatCompensation } from '@/lib/formatters';
import { INDUSTRY_INSIGHTS } from '@/lib/preview-data';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { getCompanyInsights } from '@/lib/db/insights';

export const revalidate = 3600;

export const metadata: Metadata = generatePageMetadata({
  title: 'TalentDash Industries | Cross-Sector Compensation Insights',
  description: 'Explore industry insights on TalentDash. Median comp, top roles and YoY growth across technology, fintech, e-commerce, IT services and more.',
  path: '/industries',
});

const ACCENT_BG: Record<(typeof INDUSTRY_INSIGHTS)[number]['accent'], string> = {
  red: 'bg-[#FFEFEF] text-[#FF5A5F]',
  blue: 'bg-[#EEF4FF] text-[#2563EB]',
  green: 'bg-[#E8F8EC] text-[#008A05]',
  amber: 'bg-[#FFF5DC] text-[#B26B00]',
  violet: 'bg-[#F0EBFE] text-[#6D3FD8]',
  slate: 'bg-[#F2F2F2] text-[#484848]',
};

export default async function IndustriesPage() {
  const companies = await getCompanyInsights();
  const companyCount = companies.length;

  const topStats: PreviewStat[] = [
    {
      key: 'industries',
      label: 'Industries tracked',
      value: INDUSTRY_INSIGHTS.length.toString(),
      caption: 'Sectors curated from the TalentDash company index.',
      accent: 'red',
    },
    {
      key: 'companies',
      label: 'Companies in scope',
      value: companyCount.toLocaleString(),
      caption: 'Cross-sector employer base powering the industry insights.',
      accent: 'blue',
    },
    {
      key: 'top-growth',
      label: 'Fastest growing',
      value: (() => {
        const top = [...INDUSTRY_INSIGHTS].sort((a, b) => b.growth - a.growth)[0];
        return top ? `${top.label} · +${top.growth}%` : '—';
      })(),
      caption: 'Industry with the highest YoY median comp growth.',
      accent: 'green',
    },
    {
      key: 'top-tc',
      label: 'Highest median TC',
      value: (() => {
        const top = [...INDUSTRY_INSIGHTS].sort(
          (a, b) => b.medianTotalCompensation - a.medianTotalCompensation
        )[0];
        return top ? formatCompensation(top.medianTotalCompensation, 'INR') : '—';
      })(),
      caption: 'Sector with the highest median total compensation.',
      accent: 'amber',
    },
  ];

  return (
    <>
      <PreviewPageHero
        eyebrow="Industries"
        title="Industry insights, by sector"
        description="Compare sectors by median compensation, top roles and leading employers. See where comp is growing fastest and where the talent wars are hottest."
        badges={['Cross-sector view', 'Top employers', 'YoY growth']}
        actions={[
          { label: 'See all industries', href: '#industries' },
          { label: 'Open companies', href: '/companies', variant: 'secondary' },
        ]}
        meta="Median TC per industry is rolled up from verified records on TalentDash"
      />
      <PreviewStatGrid stats={topStats} />

      <div id="industries" />

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Sectors"
            title="All industries in the index"
            description="Tap an industry to see its leading employers, top roles and median comp breakdown."
            action={{ label: 'Browse companies', href: '/companies' }}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRY_INSIGHTS.map((industry) => (
              <article
                key={industry.id}
                className="flex h-full flex-col gap-4 rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <header className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${ACCENT_BG[industry.accent]}`}
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M3 21h18" />
                        <path d="M5 21V8l7-5 7 5v13" />
                        <path d="M9 21v-6h6v6" />
                      </svg>
                    </span>
                    <h3 className="text-base font-semibold text-[#222222] sm:text-lg">
                      {industry.label}
                    </h3>
                  </div>
                  <span className="rounded-full bg-[#E8F8EC] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#008A05]">
                    +{industry.growth}% YoY
                  </span>
                </header>
                <p className="text-sm leading-6 text-[#717171]">{industry.description}</p>
                <div className="rounded-lg bg-[#FFF7F4] p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#FF5A5F]">
                    Median total comp
                  </div>
                  <div className="mt-1 text-2xl font-bold tabular-nums text-[#222222]">
                    {formatCompensation(industry.medianTotalCompensation, 'INR')}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                    Top roles
                  </div>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {industry.topRoles.map((role) => (
                      <li
                        key={role}
                        className="rounded-full border border-[#EBEBEB] bg-white px-2.5 py-0.5 text-xs text-[#484848]"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto border-t border-[#F2F2F2] pt-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                    Top employers
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {industry.topCompanies.map((company) => (
                      <span
                        key={company}
                        className="rounded-full border border-[#EBEBEB] bg-white px-2.5 py-0.5 text-xs text-[#484848]"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </div>

      <div className="border-b border-[#EBEBEB] bg-[#FAFAFA]">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Cross-industry"
            title="How to read industry data"
            description="A few notes on what each industry row means, and how the median is calculated."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                key: 'median',
                title: 'Median total comp',
                description: 'The middle value of total compensation (base + bonus + stock) across verified records in that industry.',
              },
              {
                key: 'yoy',
                title: 'YoY growth',
                description: 'Year-over-year change in median total compensation, measured against the same industry in the prior cycle.',
              },
              {
                key: 'top-employers',
                title: 'Top employers',
                description: 'Leading employers in the industry, based on record count and median compensation in the TalentDash index.',
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

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Top employers by industry"
            title="See the leading companies behind each sector"
            description="Jump straight into a company profile to explore the full salary, review and interview data."
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {INDUSTRY_INSIGHTS.flatMap((industry) =>
              industry.topCompanies.slice(0, 2).map((company) => (
                <Link
                  key={`${industry.id}-${company}`}
                  href={`/companies/${company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#EBEBEB] bg-white px-3 py-1.5 text-xs font-medium text-[#484848] transition hover:border-[#FF5A5F]/40 hover:text-[#FF5A5F]"
                >
                  {company} <span className="text-[10px] text-[#717171]">· {industry.label}</span>
                </Link>
              ))
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
