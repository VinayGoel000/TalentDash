import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/home/SectionHeading';
import { formatCompensation } from '@/lib/formatters';
import type {
  ExperienceInsight,
  LocationInsight,
  RoleInsight,
} from '@/lib/db/homepage';
import type { CompanyIndexEntry } from '@/lib/company-stats';

type SalaryInsightsSectionProps = {
  topPayingCompanies: CompanyIndexEntry[];
  topRoles: RoleInsight[];
  experienceBands: ExperienceInsight[];
  topLocations: LocationInsight[];
};

function maxOf<T>(items: T[], pick: (item: T) => number) {
  return items.reduce((acc, item) => Math.max(acc, pick(item)), 0);
}

export function SalaryInsightsSection({
  topPayingCompanies,
  topRoles,
  experienceBands,
  topLocations,
}: SalaryInsightsSectionProps) {
  const maxCompanyTc = maxOf(topPayingCompanies, (item) => item.medianTotalCompensation);
  const maxRoleTc = maxOf(topRoles, (item) => item.medianTotalCompensation);
  const maxBandTc = maxOf(experienceBands, (item) => item.medianTotalCompensation);

  return (
    <section className="border-y border-[#EBEBEB] bg-white">
      <Container className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="Salary insights"
          title="Benchmarks pulled live from the salary database"
          description="Every number on this page is derived from verified submissions in the TalentDash dataset."
          action={{ label: 'Open salary explorer', href: '/salaries' }}
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
            <header className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#222222] sm:text-lg">Top paying companies</h3>
              <Link href="/companies" className="text-xs font-semibold text-[#FF5A5F] hover:text-[#e14d52]">
                All companies
              </Link>
            </header>
            <ul className="mt-4 space-y-3">
              {topPayingCompanies.length === 0 ? (
                <li className="text-sm text-[#717171]">No salary data available yet.</li>
              ) : (
                topPayingCompanies.map((company, index) => {
                  const ratio = maxCompanyTc === 0 ? 0 : company.medianTotalCompensation / maxCompanyTc;
                  return (
                    <li key={company.slug}>
                      <Link
                        href={`/companies/${company.slug}`}
                        className="group block rounded-xl border border-transparent px-3 py-2 transition hover:border-[#FF5A5F]/30 hover:bg-[#FFF7F7]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F2F2F2] text-xs font-bold text-[#484848]">
                              {index + 1}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-[#222222] group-hover:text-[#FF5A5F]">
                                {company.name}
                              </p>
                              <p className="text-xs text-[#717171]">
                                {company.primaryLocation || 'Distributed'} · {company.recordCount} records
                              </p>
                            </div>
                          </div>
                          <span className="shrink-0 text-sm font-semibold tabular-nums text-[#222222]">
                            {formatCompensation(company.medianTotalCompensation, 'INR')}
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#F2F2F2]">
                          <span
                            className="block h-full rounded-full bg-[#FF5A5F]"
                            style={{ width: `${Math.max(6, Math.round(ratio * 100))}%` }}
                          />
                        </div>
                      </Link>
                    </li>
                  );
                })
              )}
            </ul>
          </article>

          <article className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
            <header className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#222222] sm:text-lg">Salary by role</h3>
              <Link href="/salaries" className="text-xs font-semibold text-[#FF5A5F] hover:text-[#e14d52]">
                Explore roles
              </Link>
            </header>
            <ul className="mt-4 space-y-3">
              {topRoles.length === 0 ? (
                <li className="text-sm text-[#717171]">Add salary records to see role benchmarks.</li>
              ) : (
                topRoles.map((entry) => {
                  const ratio = maxRoleTc === 0 ? 0 : entry.medianTotalCompensation / maxRoleTc;
                  return (
                    <li key={entry.role}>
                      <Link
                        href={`/salaries?search=${encodeURIComponent(entry.role)}`}
                        className="group block rounded-xl border border-transparent px-3 py-2 transition hover:border-[#FF5A5F]/30 hover:bg-[#FFF7F7]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="truncate text-sm font-semibold text-[#222222] group-hover:text-[#FF5A5F]">
                            {entry.role}
                          </p>
                          <span className="shrink-0 text-sm font-semibold tabular-nums text-[#222222]">
                            {formatCompensation(entry.medianTotalCompensation, 'INR')}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F2F2F2]">
                            <span
                              className="block h-full rounded-full bg-[#2563EB]"
                              style={{ width: `${Math.max(6, Math.round(ratio * 100))}%` }}
                            />
                          </div>
                          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                            {entry.sampleSize} records
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })
              )}
            </ul>
          </article>

          <article className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
            <header className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#222222] sm:text-lg">Salary by experience</h3>
              <Link href="/salaries" className="text-xs font-semibold text-[#FF5A5F] hover:text-[#e14d52]">
                Filter by level
              </Link>
            </header>
            <ul className="mt-4 space-y-3">
              {experienceBands.map((band) => {
                const ratio = maxBandTc === 0 ? 0 : band.medianTotalCompensation / maxBandTc;
                return (
                  <li key={band.bucket} className="rounded-xl border border-[#F2F2F2] bg-[#FAFAFA] px-3 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-[#222222]">{band.bucket}</p>
                      <span className="text-sm font-semibold tabular-nums text-[#222222]">
                        {band.sampleSize === 0 ? '—' : formatCompensation(band.medianTotalCompensation, 'INR')}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EBEBEB]">
                        <span
                          className="block h-full rounded-full bg-[#008A05]"
                          style={{ width: `${Math.max(6, Math.round(ratio * 100))}%` }}
                        />
                      </div>
                      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                        {band.sampleSize} records
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </article>

          <article className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
            <header className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#222222] sm:text-lg">Global compensation heatmap</h3>
              <span className="rounded-full bg-[#F0EBFE] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#6D3FD8]">
                Coming soon
              </span>
            </header>
            <p className="mt-1 text-xs text-[#717171]">
              An interactive choropleth of median total compensation across countries and metros.
            </p>

            <div
              className="mt-4 flex h-44 items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#FFB8BB] bg-[#FFF7F5]"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 320 160"
                className="h-full w-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="heatmap-fade" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#FFEFEF" />
                    <stop offset="100%" stopColor="#FF5A5F" />
                  </linearGradient>
                </defs>
                <g fill="url(#heatmap-fade)" opacity="0.45">
                  <circle cx="60" cy="60" r="14" />
                  <circle cx="100" cy="80" r="20" />
                  <circle cx="160" cy="50" r="26" />
                  <circle cx="200" cy="90" r="18" />
                  <circle cx="240" cy="60" r="22" />
                  <circle cx="120" cy="120" r="12" />
                  <circle cx="180" cy="130" r="16" />
                  <circle cx="260" cy="120" r="14" />
                </g>
                <g stroke="#FF5A5F" strokeOpacity="0.35" fill="none" strokeWidth="1.2">
                  <path d="M0 100 Q 80 60 160 90 T 320 70" />
                  <path d="M0 130 Q 90 100 170 120 T 320 110" />
                </g>
              </svg>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
              <span>{topLocations.length} metros covered</span>
              <Link
                href="/salaries"
                className="inline-flex items-center gap-1 text-[#FF5A5F] hover:text-[#e14d52]"
              >
                Explore locations
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3"
                >
                  <path d="M3 8h10" />
                  <path d="M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
