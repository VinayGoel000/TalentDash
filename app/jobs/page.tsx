import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { FeatureCard } from '@/components/home/FeatureCard';
import { PreviewPageHero } from '@/components/home/PreviewPageHero';
import { PreviewStatGrid, type PreviewStat } from '@/components/home/PreviewStatGrid';
import { SectionHeading } from '@/components/home/SectionHeading';
import {
  FEATURED_JOBS,
  JOB_CATEGORIES,
  computeCompanyAverage,
} from '@/lib/preview-data';
import { getJobsMetadata } from '@/lib/seo/metadata';
import { getHomepageData } from '@/lib/db/homepage';

export const revalidate = 3600;

export const metadata: Metadata = getJobsMetadata();

const WORKMODE_PALETTE: Record<(typeof FEATURED_JOBS)[number]['workMode'], string> = {
  Remote: 'bg-[#E8F8EC] text-[#008A05]',
  Hybrid: 'bg-[#FFF5DC] text-[#B26B00]',
  'On-site': 'bg-[#EEF4FF] text-[#2563EB]',
};

export default async function JobsPage() {
  const data = await getHomepageData();
  const stats: PreviewStat[] = [
    {
      key: 'openings',
      label: 'Total openings',
      value: JOB_CATEGORIES.reduce((sum, cat) => sum + cat.openings, 0).toLocaleString(),
      caption: 'Active roles across engineering, product, design, data and GTM.',
      accent: 'red',
    },
    {
      key: 'companies',
      label: 'Hiring companies',
      value: data.counts.companies.toLocaleString(),
      caption: 'From listed multinationals to high-growth private startups.',
      accent: 'blue',
    },
    {
      key: 'remote',
      label: 'Remote-friendly',
      value: `${Math.round(
        (FEATURED_JOBS.filter((job) => job.workMode === 'Remote').length /
          FEATURED_JOBS.length) *
          100
      )}%`,
      caption: 'Featured roles that are fully remote today.',
      accent: 'green',
    },
    {
      key: 'avg',
      label: 'Average rating',
      value: `${(computeCompanyAverage([]) || 4.0).toFixed(1)} / 5`,
      caption: 'Average rating of featured employers, based on verified reviews.',
      accent: 'amber',
    },
  ];

  return (
    <>
      <PreviewPageHero
        eyebrow="Jobs"
        title="Featured openings at companies the community trusts"
        description="Curated roles across engineering, product, design, data and GTM. Filter by remote, location and salary band, and apply with confidence."
        badges={['Featured openings', 'Salary disclosed', 'Remote-friendly']}
        actions={[
          { label: 'Browse all jobs', href: '#jobs' },
          { label: 'Post a role', href: '/forum', variant: 'secondary' },
        ]}
        meta="Updated daily · Roles are handpicked by the TalentDash editorial team"
      />
      <PreviewStatGrid stats={stats} />

      <div id="jobs" />

      <div className="border-y border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Featured openings"
            title="Roles hiring right now"
            description="A snapshot of the most attractive openings we are tracking this week."
            action={{ label: 'Open salary explorer', href: '/salaries' }}
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {FEATURED_JOBS.map((job) => (
              <Link
                key={job.id}
                href={`/companies/${job.companySlug}`}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#FF5A5F]/40 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-[#222222] group-hover:text-[#FF5A5F]">
                      {job.title}
                    </span>
                    <span className="text-xs text-[#717171]">
                      {job.company} · {job.location}
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                      WORKMODE_PALETTE[job.workMode]
                    }`}
                  >
                    {job.workMode}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                      Type
                    </div>
                    <div className="mt-0.5 font-semibold text-[#222222]">{job.type}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                      Experience
                    </div>
                    <div className="mt-0.5 font-semibold text-[#222222]">{job.experience}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                      Range
                    </div>
                    <div className="mt-0.5 font-semibold text-[#FF5A5F] tabular-nums">
                      {job.salaryRange}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 border-t border-[#F2F2F2] pt-3 text-xs text-[#717171]">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#EBEBEB] bg-white px-2.5 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-[#717171]">{job.postedAgo}</span>
              </Link>
            ))}
          </div>
        </Container>
      </div>

      <div className="border-b border-[#EBEBEB] bg-[#FAFAFA]">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Browse by function"
            title="Openings grouped by discipline"
            description="Pick a function to see related roles, salary bands and top hiring companies."
            action={{ label: 'Compare salaries', href: '/salaries' }}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {JOB_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-[#222222]">{category.title}</h3>
                  <span
                    className={[
                      'rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider',
                      category.accent === 'red' && 'bg-[#FFEFEF] text-[#FF5A5F]',
                      category.accent === 'blue' && 'bg-[#EEF4FF] text-[#2563EB]',
                      category.accent === 'green' && 'bg-[#E8F8EC] text-[#008A05]',
                      category.accent === 'amber' && 'bg-[#FFF5DC] text-[#B26B00]',
                      category.accent === 'violet' && 'bg-[#F0EBFE] text-[#6D3FD8]',
                      category.accent === 'slate' && 'bg-[#F2F2F2] text-[#484848]',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {category.openings.toLocaleString()} roles
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#717171]">
                  Live openings across {category.title.toLowerCase()} — filter by remote, level and
                  salary band.
                </p>
                <Link
                  href={`/salaries?function=${encodeURIComponent(category.title)}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#FF5A5F] hover:text-[#e14d52]"
                >
                  Explore {category.title.toLowerCase()} roles
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M3 8h10" />
                    <path d="M9 4l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Why list a role here"
            title="Reach candidates already in the loop"
            description="TalentDash candidates are pre-qualified on comp expectations, levelling and culture fit."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              accent="red"
              title="Salary-transparent listings"
              description="Surface roles that disclose pay ranges, helping candidates self-select faster."
              meta="Pay disclosure"
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
              accent="blue"
              title="Skill-matched audience"
              description="Reach engineers, PMs and designers who already follow your company profile."
              meta="Engaged readers"
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
                  <circle cx="9" cy="9" r="3" />
                  <path d="M3 19c.8-3 3-5 6-5s5.2 2 6 5" />
                </svg>
              }
            />
            <FeatureCard
              accent="green"
              title="Trust signals baked in"
              description="Show your company rating, employee reviews and recent offers alongside the role."
              meta="Trust enriched"
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
              Hiring? Reach the right candidates
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-[#484848] sm:text-base">
              Post a featured role on TalentDash and get in front of candidates already comparing
              comp, culture and interview loops.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/forum"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#FF5A5F] px-5 text-sm font-semibold text-white transition hover:bg-[#e14d52]"
              >
                Post a featured role
              </a>
              <a
                href="/companies"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-[#EBEBEB] bg-white px-5 text-sm font-semibold text-[#222222] transition hover:bg-[#F2F2F2]"
              >
                Claim company page
              </a>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
