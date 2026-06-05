import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { PreviewPageHero } from '@/components/home/PreviewPageHero';
import { PreviewStatGrid, type PreviewStat } from '@/components/home/PreviewStatGrid';
import { SectionHeading } from '@/components/home/SectionHeading';
import { formatCompensation } from '@/lib/formatters';
import { getLocationInsights, getOverallStats } from '@/lib/db/insights';
import { getLocationsMetadata } from '@/lib/seo/metadata';

export const revalidate = 3600;

export const metadata = getLocationsMetadata();

export default async function LocationsPage() {
  const [locations, stats] = await Promise.all([getLocationInsights(), getOverallStats()]);

  const topStats: PreviewStat[] = [
    {
      key: 'locations',
      label: 'Locations covered',
      value: locations.length.toLocaleString(),
      caption: 'Cities, metros and remote-first regions with verified data.',
      accent: 'red',
    },
    {
      key: 'records',
      label: 'Records mapped',
      value: stats.salaryCount.toLocaleString(),
      caption: 'Every verified record is pinned to a location.',
      accent: 'blue',
    },
    {
      key: 'top',
      label: 'Top market',
      value: locations[0]?.location ?? '—',
      caption: 'The location with the most verified submissions.',
      accent: 'green',
    },
    {
      key: 'remote',
      label: 'Remote-friendly',
      value: `${Math.round(
        (locations.reduce((sum, loc) => sum + loc.remoteShare, 0) / Math.max(1, locations.length)) *
          100
      )}%`,
      caption: 'Average share of remote-friendly roles across the top markets.',
      accent: 'amber',
    },
  ];

  return (
    <>
      <PreviewPageHero
        eyebrow="Locations"
        title="Popular locations, ranked by verified data"
        description="Browse salary intelligence by city or remote region. See median total comp, top roles and top employers in each market."
        badges={['Median comp', 'Top roles', 'Top employers']}
        actions={[
          { label: 'See markets', href: '#markets' },
          { label: 'Open salary explorer', href: '/salaries', variant: 'secondary' },
        ]}
        meta="Each market rolls up verified submissions tagged with that location"
      />
      <PreviewStatGrid stats={topStats} />

      <div id="markets" />

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Markets"
            title="Most active hiring locations"
            description="Markets are sorted by record count, with median comp and top employers per city."
            action={{ label: 'Filter by location', href: '/salaries' }}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc) => (
              <article
                key={loc.location}
                className="flex h-full flex-col gap-4 rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <header className="flex items-start justify-between gap-3">
                  <div className="flex flex-col">
                    <h3 className="text-base font-semibold text-[#222222] sm:text-lg">
                      {loc.location}
                    </h3>
                    <p className="text-xs text-[#717171]">
                      {loc.recordCount.toLocaleString()} records
                    </p>
                  </div>
                  <span className="rounded-full bg-[#FFEFEF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#FF5A5F]">
                    {loc.remoteShare}% remote
                  </span>
                </header>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-[#F8FDF9] p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[#008A05]">
                      Median TC
                    </div>
                    <div className="mt-1 text-base font-semibold tabular-nums text-[#222222]">
                      {formatCompensation(loc.medianTotalCompensation, 'INR')}
                    </div>
                  </div>
                  <div className="rounded-lg bg-[#EEF4FF] p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[#2563EB]">
                      Average TC
                    </div>
                    <div className="mt-1 text-base font-semibold tabular-nums text-[#222222]">
                      {formatCompensation(loc.averageTotalCompensation, 'INR')}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                    Top roles
                  </div>
                  <ul className="mt-2 space-y-1.5 text-sm text-[#222222]">
                    {loc.topRoles.map((role) => (
                      <li
                        key={role.role}
                        className="flex items-center justify-between gap-2"
                      >
                        <span className="truncate">{role.role}</span>
                        <span className="text-xs font-semibold tabular-nums text-[#717171]">
                          {role.count} rec
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto border-t border-[#F2F2F2] pt-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                    Top employers
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {loc.topCompanies.map((company) => (
                      <Link
                        key={company.slug}
                        href={`/companies/${company.slug}`}
                        className="rounded-full border border-[#EBEBEB] bg-white px-2.5 py-0.5 text-xs text-[#484848] transition hover:border-[#FF5A5F]/40 hover:text-[#FF5A5F]"
                      >
                        {company.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))}
            {locations.length === 0 ? (
              <p className="col-span-full rounded-2xl border border-dashed border-[#EBEBEB] bg-white p-12 text-center text-sm text-[#717171]">
                No location data yet. The first verified submissions will appear here.
              </p>
            ) : null}
          </div>
        </Container>
      </div>
    </>
  );
}
