import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { FeatureCard } from '@/components/home/FeatureCard';
import { PreviewPageHero } from '@/components/home/PreviewPageHero';
import { PreviewStatGrid, type PreviewStat } from '@/components/home/PreviewStatGrid';
import { SectionHeading } from '@/components/home/SectionHeading';
import { BRAND_SPOTLIGHTS, INDUSTRY_CATEGORIES } from '@/lib/preview-data';
import { getBrandsMetadata } from '@/lib/seo/metadata';
import { getHomepageData } from '@/lib/db/homepage';

export const revalidate = 3600;

export const metadata: Metadata = getBrandsMetadata();

export default async function BrandsPage() {
  const data = await getHomepageData();
  const stats: PreviewStat[] = [
    {
      key: 'companies',
      label: 'Companies tracked',
      value: data.counts.companies.toLocaleString(),
      caption: 'Listed multinationals, unicorns and high-growth startups.',
      accent: 'red',
    },
    {
      key: 'industries',
      label: 'Industry categories',
      value: INDUSTRY_CATEGORIES.length.toString(),
      caption: 'From technology to quick commerce, all on a single map.',
      accent: 'blue',
    },
    {
      key: 'spotlights',
      label: 'Brand spotlights',
      value: BRAND_SPOTLIGHTS.length.toString(),
      caption: 'Curated profiles with culture, perks and verified ratings.',
      accent: 'green',
    },
    {
      key: 'salaries',
      label: 'Salary records',
      value: data.counts.salaries.toLocaleString(),
      caption: 'Compensation data backing every brand profile.',
      accent: 'amber',
    },
  ];

  return (
    <>
      <PreviewPageHero
        eyebrow="Brands"
        title="Featured employer brands, curated for context"
        description="Profiles of the most-followed companies on TalentDash — culture, headcount, perks, verified ratings, and the salaries that make them tick."
        badges={['Curated profiles', 'Verified ratings', 'Industry-tagged']}
        actions={[
          { label: 'Browse all brands', href: '#brands' },
          { label: 'Claim a profile', href: '/forum', variant: 'secondary' },
        ]}
        meta="Brand profiles are refreshed whenever a new review, salary or offer is verified"
      />
      <PreviewStatGrid stats={stats} />

      <div id="brands" />

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Brand spotlights"
            title="Companies in the spotlight"
            description="A curated set of profiles that the community follows most."
            action={{ label: 'All companies', href: '/companies' }}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BRAND_SPOTLIGHTS.map((brand) => (
              <Link
                key={brand.id}
                href={`/companies/${brand.companySlug}`}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#FF5A5F]/40 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFEFEF] text-base font-bold text-[#FF5A5F]">
                    {brand.company
                      .split(' ')
                      .map((p) => p[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                  <div className="flex min-w-0 flex-col">
                    <span className="text-base font-semibold text-[#222222] group-hover:text-[#FF5A5F]">
                      {brand.company}
                    </span>
                    <span className="text-xs text-[#717171]">
                      {brand.industry} · {brand.headcount} employees
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-6 text-[#484848]">{brand.tagline}</p>
                <div className="flex flex-wrap gap-1.5">
                  {brand.perks.map((perk) => (
                    <span
                      key={perk}
                      className="rounded-full border border-[#EBEBEB] bg-white px-2.5 py-0.5 text-xs text-[#484848]"
                    >
                      {perk}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-[#F2F2F2] pt-3 text-xs font-medium text-[#717171]">
                  <span>Verified rating</span>
                  <span className="text-base font-bold text-[#FF5A5F] tabular-nums">
                    {brand.rating.toFixed(1)} / 5
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </div>

      <div className="border-b border-[#EBEBEB] bg-[#FAFAFA]">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Browse by industry"
            title="Filter brands by the industry you care about"
            description="See which companies dominate each sector and how their comp compares."
            action={{ label: 'Compare industries', href: '/compare' }}
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRY_CATEGORIES.map((industry) => (
              <Link
                key={industry.id}
                href={`/companies?industry=${industry.id}`}
                className="flex items-center justify-between rounded-2xl border border-[#EBEBEB] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#FF5A5F]/40"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={[
                      'flex h-9 w-9 items-center justify-center rounded-lg',
                      industry.accent === 'red' && 'bg-[#FFEFEF] text-[#FF5A5F]',
                      industry.accent === 'blue' && 'bg-[#EEF4FF] text-[#2563EB]',
                      industry.accent === 'green' && 'bg-[#E8F8EC] text-[#008A05]',
                      industry.accent === 'amber' && 'bg-[#FFF5DC] text-[#B26B00]',
                      industry.accent === 'violet' && 'bg-[#F0EBFE] text-[#6D3FD8]',
                      industry.accent === 'slate' && 'bg-[#F2F2F2] text-[#484848]',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M3 21h18" />
                      <path d="M5 21V8l7-5 7 5v13" />
                      <path d="M9 21v-6h6v6" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold text-[#222222]">{industry.label}</span>
                </div>
                <span className="text-xs font-semibold text-[#FF5A5F]">
                  {industry.companies} companies
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </div>

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="What makes a brand profile"
            title="Built for trust, not for fluff"
            description="A TalentDash brand profile is a verified record of compensation, culture and opportunity — not a marketing brochure."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              accent="red"
              title="Verified ratings"
              description="Every rating is rolled up from moderated employee reviews tagged by role, level and tenure."
              meta="Trust baked in"
              icon={
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="m12 3 2.7 5.5L21 9.5l-4.5 4.4L17.8 21 12 17.8 6.2 21l1.3-7.1L3 9.5l6.3-1Z" />
                </svg>
              }
            />
            <FeatureCard
              accent="blue"
              title="Compensation snapshot"
              description="Median base, bonus and equity pulled live from the salary database."
              meta="Live data"
              href="/salaries"
              icon={
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="3" y="6" width="18" height="12" rx="2" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              }
            />
            <FeatureCard
              accent="green"
              title="Culture signals"
              description="Perks, benefits, mission statements and the questions candidates ask the most."
              meta="Signal-rich"
              href="/reviews"
              icon={
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M12 3 4 6v6c0 4.4 3.2 8 8 9 4.8-1 8-4.6 8-9V6Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              }
            />
          </div>
        </Container>
      </div>

      <div className="bg-[#FFF7F4]">
        <Container className="py-12 sm:py-16">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#FF5A5F]/20 bg-white p-6 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-[#222222] sm:text-3xl">
              Building a brand candidates trust?
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-[#484848] sm:text-base">
              Claim your company profile to feature verified salary data, reviews and open roles in
              one place.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/forum"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#FF5A5F] px-5 text-sm font-semibold text-white transition hover:bg-[#e14d52]"
              >
                Claim your profile
              </a>
              <a
                href="/companies"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-[#EBEBEB] bg-white px-5 text-sm font-semibold text-[#222222] transition hover:bg-[#F2F2F2]"
              >
                Browse companies
              </a>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
