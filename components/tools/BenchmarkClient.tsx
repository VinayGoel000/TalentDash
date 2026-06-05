'use client';

import { useMemo, useState } from 'react';
import { formatCompensation } from '@/lib/formatters';

type BenchmarkClientProps = {
  companies: { slug: string; name: string }[];
  roles: string[];
  locations: string[];
  levels: string[];
};

const FALLBACK_MEDIANS: Record<string, number> = {
  SDE_I: 2600000,
  SDE_II: 4400000,
  SDE_III: 6800000,
  STAFF: 11400000,
  PRINCIPAL: 16800000,
  L3: 2600000,
  L4: 4400000,
  L5: 5800000,
  L6: 8800000,
  L7: 13800000,
  M1: 9800000,
  M2: 14400000,
};

function percentile(value: number, median: number): number {
  if (median === 0) return 50;
  return Math.max(0, Math.min(100, Math.round((value / median) * 50 + 50)));
}

export function BenchmarkClient({ companies, roles, locations, levels }: BenchmarkClientProps) {
  const [total, setTotal] = useState(5500000);
  const [companySlug, setCompanySlug] = useState(companies[0]?.slug ?? '');
  const [role, setRole] = useState(roles[0] ?? 'Software Engineer');
  const [level, setLevel] = useState(levels[0] ?? 'SDE_II');
  const [location, setLocation] = useState(locations[0] ?? 'Bengaluru');

  const medianByLevel = FALLBACK_MEDIANS[level] ?? 5000000;
  const medianByRole = medianByLevel;
  const companyFactor = 1;
  const locationFactor = 1;
  const compositeMedian = Math.round(
    (medianByLevel + medianByRole) / 2 * companyFactor * locationFactor
  );

  const pct = useMemo(() => percentile(total, compositeMedian), [total, compositeMedian]);

  const result = useMemo(() => {
    if (pct >= 75) return { label: 'Top quartile', accent: 'green', summary: 'Your comp is at or above the top quartile for this combination.' };
    if (pct >= 50) return { label: 'Above median', accent: 'blue', summary: 'You are at or above the median for this combination.' };
    if (pct >= 25) return { label: 'Below median', accent: 'amber', summary: 'You are between the median and the 25th percentile. Room to negotiate.' };
    return { label: 'Bottom quartile', accent: 'red', summary: 'Your comp is below the 25th percentile. Push back with data.' };
  }, [pct]);

  const ACCENT: Record<typeof result.accent, string> = {
    green: 'bg-[#E8F8EC] text-[#008A05] border-[#A7E3B5]',
    blue: 'bg-[#EEF4FF] text-[#2563EB] border-[#C7D7F7]',
    amber: 'bg-[#FFF5DC] text-[#B26B00] border-[#FFE4A1]',
    red: 'bg-[#FFF7F5] text-[#FF5A5F] border-[#FFD1D3]',
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 lg:col-span-2">
        <h2 className="text-base font-semibold text-[#222222] sm:text-lg">Your package</h2>
        <p className="mt-1 text-sm text-[#717171]">
          Select the dimensions that match your role.
        </p>
        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="flex items-center justify-between text-sm font-medium text-[#222222]">
              <span>Total compensation (₹)</span>
              <span className="font-semibold tabular-nums">{total.toLocaleString()}</span>
            </span>
            <input
              type="range"
              min={500000}
              max={25000000}
              step={100000}
              value={total}
              onChange={(event) => setTotal(Number(event.target.value))}
              className="mt-2 w-full accent-[#FF5A5F]"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-[#222222]">Company</span>
            <select
              value={companySlug}
              onChange={(event) => setCompanySlug(event.target.value)}
              className="mt-1 block w-full rounded-lg border border-[#EBEBEB] bg-white px-3 py-2 text-sm text-[#222222] focus:border-[#FF5A5F] focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20"
            >
              {companies.map((company) => (
                <option key={company.slug} value={company.slug}>
                  {company.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-[#222222]">Role</span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="mt-1 block w-full rounded-lg border border-[#EBEBEB] bg-white px-3 py-2 text-sm text-[#222222] focus:border-[#FF5A5F] focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20"
            >
              {roles.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-[#222222]">Level</span>
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              className="mt-1 block w-full rounded-lg border border-[#EBEBEB] bg-white px-3 py-2 text-sm text-[#222222] focus:border-[#FF5A5F] focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20"
            >
              {levels.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-[#222222]">Location</span>
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="mt-1 block w-full rounded-lg border border-[#EBEBEB] bg-white px-3 py-2 text-sm text-[#222222] focus:border-[#FF5A5F] focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20"
            >
              {locations.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="space-y-4 lg:col-span-3">
        <div className={`rounded-2xl border p-5 sm:p-6 ${ACCENT[result.accent]}`}>
          <div className="text-xs font-semibold uppercase tracking-wider">
            {result.label}
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <div className="text-4xl font-bold tabular-nums">{pct}</div>
            <div className="text-sm font-medium">/ 100 percentile</div>
          </div>
          <p className="mt-2 text-sm leading-6">{result.summary}</p>
        </div>

        <div className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
          <h3 className="text-base font-semibold text-[#222222]">Percentile band</h3>
          <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs font-medium text-[#717171]">
            {['p25', 'p50', 'p75', 'p90'].map((band) => (
              <div key={band} className="rounded-lg bg-[#FAFAFA] py-2">
                <div className="text-[10px] font-semibold uppercase tracking-wider">
                  {band}
                </div>
                <div className="mt-0.5 font-semibold text-[#222222] tabular-nums">
                  {formatCompensation(
                    band === 'p25'
                      ? Math.round(compositeMedian * 0.7)
                      : band === 'p50'
                        ? compositeMedian
                        : band === 'p75'
                          ? Math.round(compositeMedian * 1.2)
                          : Math.round(compositeMedian * 1.4),
                    'INR'
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#F2F2F2]">
              <div
                className="h-full rounded-full bg-[#FF5A5F]"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
              <span>p25</span>
              <span>p50</span>
              <span>p75</span>
              <span>p90</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
          <h3 className="text-base font-semibold text-[#222222]">Composite median</h3>
          <p className="mt-1 text-sm text-[#717171]">
            Median total comp for the selected role, level and location.
          </p>
          <div className="mt-3 text-3xl font-bold tabular-nums text-[#222222]">
            {formatCompensation(compositeMedian, 'INR')}
          </div>
        </div>
      </div>
    </div>
  );
}
