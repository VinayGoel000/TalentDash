import Link from 'next/link';
import type { RoleInsight } from '@/lib/db/insights';
import { formatCompensation } from '@/lib/formatters';

type RoleComparePanelProps = {
  roles: RoleInsight[];
};

export function RoleComparePanel({ roles }: RoleComparePanelProps) {
  if (roles.length === 0) {
    return (
      <div className="min-h-[18rem] rounded-2xl border border-dashed border-[#EBEBEB] bg-white p-12 text-center">
        <h3 className="text-lg font-semibold text-[#222222]">No roles to compare yet</h3>
        <p className="mt-2 text-sm text-[#717171]">
          The role benchmarks will populate as soon as more records are added.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-lg font-semibold text-[#222222]">Compare two roles</h2>
        <p className="text-sm text-[#717171]">
          Pick any two roles to see comp ranges, top levels and top locations side-by-side.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {roles.slice(0, 2).map((role, index) => (
          <div
            key={role.role}
            className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6"
          >
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#FF5A5F]">
              Role {index === 0 ? 'A' : 'B'}
            </div>
            <Link
              href={`/salaries?search=${encodeURIComponent(role.role)}`}
              className="mt-1 text-base font-semibold text-[#222222] hover:text-[#FF5A5F] sm:text-lg"
            >
              {role.role}
            </Link>
            <p className="text-xs text-[#717171]">
              {role.recordCount.toLocaleString()} records · {role.averageExperience} yrs avg experience
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-[#F8FDF9] p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#008A05]">
                  Median TC
                </div>
                <div className="mt-0.5 text-base font-semibold tabular-nums text-[#222222]">
                  {formatCompensation(role.medianTotalCompensation, 'INR')}
                </div>
              </div>
              <div className="rounded-lg bg-[#EEF4FF] p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#2563EB]">
                  Average TC
                </div>
                <div className="mt-0.5 text-base font-semibold tabular-nums text-[#222222]">
                  {formatCompensation(role.averageTotalCompensation, 'INR')}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                Top levels
              </div>
              <ul className="mt-2 space-y-1.5 text-sm text-[#222222]">
                {role.topLevels.map((level) => (
                  <li key={level.level} className="flex items-center justify-between gap-2">
                    <span className="truncate">{level.level}</span>
                    <span className="text-xs font-semibold tabular-nums text-[#717171]">
                      {level.count} rec
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                Top locations
              </div>
              <ul className="mt-2 space-y-1.5 text-sm text-[#222222]">
                {role.topLocations.map((loc) => (
                  <li key={loc.location} className="flex items-center justify-between gap-2">
                    <span className="truncate">{loc.location}</span>
                    <span className="text-xs font-semibold tabular-nums text-[#717171]">
                      {loc.count} rec
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {roles.length > 2 ? (
        <div>
          <h3 className="text-base font-semibold text-[#222222]">Other roles in scope</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {roles.slice(2).map((role) => (
              <Link
                key={role.role}
                href={`/salaries?search=${encodeURIComponent(role.role)}`}
                className="rounded-full border border-[#EBEBEB] bg-white px-3 py-1.5 text-xs font-medium text-[#484848] transition hover:border-[#FF5A5F]/40 hover:text-[#FF5A5F]"
              >
                {role.role}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl border border-[#FF5A5F]/20 bg-[#FFF7F4] p-5 sm:p-6">
        <h3 className="text-base font-semibold text-[#222222]">Want the full breakdown?</h3>
        <p className="mt-2 text-sm text-[#484848]">
          Open the salary explorer to filter by company, location and level for any role.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/salaries"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#FF5A5F] px-4 text-sm font-semibold text-white transition hover:bg-[#e14d52]"
          >
            Open salary explorer
          </Link>
          <Link
            href="/trends"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-[#EBEBEB] bg-white px-4 text-sm font-semibold text-[#222222] transition hover:bg-[#F2F2F2]"
          >
            See trends
          </Link>
        </div>
      </div>
    </div>
  );
}
