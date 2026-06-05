import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { PreviewPageHero } from '@/components/home/PreviewPageHero';
import { PreviewStatGrid, type PreviewStat } from '@/components/home/PreviewStatGrid';
import { SectionHeading } from '@/components/home/SectionHeading';
import { formatCompensation } from '@/lib/formatters';
import { BenchmarkClient } from '@/components/tools/BenchmarkClient';
import {
  getCompanyInsights,
  getLevelInsights,
  getLocationInsights,
  getOverallStats,
  getRoleInsights,
} from '@/lib/db/insights';
import { getBenchmarkMetadata } from '@/lib/seo/metadata';

export const revalidate = 3600;

export const metadata = getBenchmarkMetadata();

export default async function BenchmarkPage() {
  const [companies, roles, locations, levels, overall] = await Promise.all([
    getCompanyInsights(),
    getRoleInsights(),
    getLocationInsights(),
    getLevelInsights(),
    getOverallStats(),
  ]);

  const topStats: PreviewStat[] = [
    { key: 'companies', label: 'Companies in scope', value: companies.length.toLocaleString(), accent: 'red', caption: 'Bench against any tracked employer.' },
    { key: 'roles', label: 'Roles in scope', value: roles.length.toLocaleString(), accent: 'blue', caption: 'From entry ICs to principal / staff.' },
    { key: 'records', label: 'Records analysed', value: overall.salaryCount.toLocaleString(), accent: 'green', caption: 'Verified records backing every benchmark.' },
    { key: 'locations', label: 'Locations', value: locations.length.toLocaleString(), accent: 'amber', caption: 'Cities, metros and remote-first regions.' },
  ];

  return (
    <>
      <PreviewPageHero
        eyebrow="Tools"
        title="Compensation benchmarking"
        description="See exactly where your package ranks against peers across company, role, level and location. Use it before a negotiation, refresh cycle or promotion."
        badges={['Live data', 'Percentile view', 'No sign-up']}
        actions={[
          { label: 'See benchmarks', href: '#benchmarks' },
          { label: 'Open offer analyzer', href: '/tools/offer-analyzer', variant: 'secondary' },
        ]}
        meta="Percentile ranges are derived from the same verified dataset that powers the rest of TalentDash"
      />
      <PreviewStatGrid stats={topStats} />

      <div id="benchmarks" />

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Interactive"
            title="Benchmark your package"
            description="Drop in your comp details and the dimensions you care about. We compute the percentile range in real time."
          />
          <div className="mt-8">
            <BenchmarkClient
              companies={companies.map((entry) => ({ slug: entry.slug, name: entry.name }))}
              roles={roles.map((entry) => entry.role)}
              locations={locations.map((entry) => entry.location)}
              levels={levels.map((entry) => entry.level)}
            />
          </div>
        </Container>
      </div>

      <div className="border-b border-[#EBEBEB] bg-[#FAFAFA]">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Reference data"
            title="How each level pays today"
            description="Median total compensation by standardised level. Use it to anchor your next negotiation."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {levels.slice(0, 6).map((entry) => (
              <div
                key={entry.level}
                className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-[#717171]">
                  {entry.level}
                </div>
                <div className="mt-2 text-2xl font-bold tabular-nums text-[#222222]">
                  {formatCompensation(entry.medianTotalCompensation, 'INR')}
                </div>
                <p className="mt-1 text-xs text-[#717171]">
                  {entry.recordCount.toLocaleString()} records ·{' '}
                  {entry.averageExperience} yrs avg experience
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Top markets"
            title="Best-paying markets right now"
            description="Quick links to the location pages, role leaderboard and offers data."
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {locations.slice(0, 8).map((entry) => (
              <Link
                key={entry.location}
                href={`/locations#markets`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#EBEBEB] bg-white px-3 py-1.5 text-xs font-medium text-[#484848] transition hover:border-[#FF5A5F]/40 hover:text-[#FF5A5F]"
              >
                {entry.location}{' '}
                <span className="text-[10px] text-[#717171]">
                  · {formatCompensation(entry.medianTotalCompensation, 'INR')}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
