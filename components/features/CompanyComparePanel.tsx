import Link from 'next/link';
import type { CompanyInsight } from '@/lib/db/insights';
import { formatCompensation } from '@/lib/formatters';

type CompanyComparePanelProps = {
  companies: CompanyInsight[];
};

export function CompanyComparePanel({ companies }: CompanyComparePanelProps) {
  if (companies.length === 0) {
    return (
      <div className="min-h-[18rem] rounded-2xl border border-dashed border-[#EBEBEB] bg-white p-12 text-center">
        <h3 className="text-lg font-semibold text-[#222222]">No companies to compare yet</h3>
        <p className="mt-2 text-sm text-[#717171]">
          The leaderboard will populate as soon as more companies are added to the database.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-lg font-semibold text-[#222222]">Compare two companies</h2>
        <p className="text-sm text-[#717171]">
          Pick any two companies from the leaderboard to see them side-by-side.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {companies.slice(0, 2).map((company, index) => (
          <div
            key={company.slug}
            className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6"
          >
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#FF5A5F]">
              Company {index === 0 ? 'A' : 'B'}
            </div>
            <Link
              href={`/companies/${company.slug}`}
              className="mt-1 text-base font-semibold text-[#222222] hover:text-[#FF5A5F] sm:text-lg"
            >
              {company.name}
            </Link>
            <p className="text-xs text-[#717171]">
              {company.primaryLocation || 'Distributed'} · {company.recordCount.toLocaleString()} records
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-[#F8FDF9] p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#008A05]">
                  Median TC
                </div>
                <div className="mt-0.5 text-base font-semibold tabular-nums text-[#222222]">
                  {formatCompensation(company.medianTotalCompensation, 'INR')}
                </div>
              </div>
              <div className="rounded-lg bg-[#EEF4FF] p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#2563EB]">
                  Average TC
                </div>
                <div className="mt-0.5 text-base font-semibold tabular-nums text-[#222222]">
                  {formatCompensation(company.averageTotalCompensation, 'INR')}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                Top roles
              </div>
              <ul className="mt-2 space-y-1.5 text-sm text-[#222222]">
                {company.topRoles.map((role) => (
                  <li key={role.role} className="flex items-center justify-between gap-2">
                    <span className="truncate">{role.role}</span>
                    <span className="text-xs font-semibold tabular-nums text-[#717171]">
                      {formatCompensation(role.medianTotalCompensation, 'INR')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                Top levels
              </div>
              <ul className="mt-2 space-y-1.5 text-sm text-[#222222]">
                {company.topLevels.map((level) => (
                  <li key={level.level} className="flex items-center justify-between gap-2">
                    <span className="truncate">{level.level}</span>
                    <span className="text-xs font-semibold tabular-nums text-[#717171]">
                      {level.count} rec
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {companies.length > 2 ? (
        <div>
          <h3 className="text-base font-semibold text-[#222222]">Other companies in scope</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {companies.slice(2).map((company) => (
              <Link
                key={company.slug}
                href={`/companies/${company.slug}`}
                className="rounded-full border border-[#EBEBEB] bg-white px-3 py-1.5 text-xs font-medium text-[#484848] transition hover:border-[#FF5A5F]/40 hover:text-[#FF5A5F]"
              >
                {company.name}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl border border-[#FF5A5F]/20 bg-[#FFF7F4] p-5 sm:p-6">
        <h3 className="text-base font-semibold text-[#222222]">Want a deeper comparison?</h3>
        <p className="mt-2 text-sm text-[#484848]">
          Open any company profile to see the full salary curve, level distribution and recent
          submissions.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/leaderboard"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#FF5A5F] px-4 text-sm font-semibold text-white transition hover:bg-[#e14d52]"
          >
            Open leaderboard
          </Link>
          <Link
            href="/salaries"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-[#EBEBEB] bg-white px-4 text-sm font-semibold text-[#222222] transition hover:bg-[#F2F2F2]"
          >
            Open salary explorer
          </Link>
        </div>
      </div>
    </div>
  );
}
