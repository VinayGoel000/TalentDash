'use client';

import { useMemo, useState } from 'react';
import { Container } from '@/components/ui/container';
import { PreviewPageHero } from '@/components/home/PreviewPageHero';
import { PreviewStatGrid, type PreviewStat } from '@/components/home/PreviewStatGrid';
import { SectionHeading } from '@/components/home/SectionHeading';
import { analyzeOffer } from '@/lib/preview-data';
import { formatCompensation } from '@/lib/formatters';

const LEVELS = [
  { value: 'SDE_I', label: 'SDE-I' },
  { value: 'SDE_II', label: 'SDE-II' },
  { value: 'SDE_III', label: 'SDE-III' },
  { value: 'STAFF', label: 'Staff' },
  { value: 'PRINCIPAL', label: 'Principal' },
  { value: 'L3', label: 'L3' },
  { value: 'L4', label: 'L4' },
  { value: 'L5', label: 'L5' },
  { value: 'L6', label: 'L6' },
  { value: 'L7', label: 'L7' },
  { value: 'M1', label: 'M1' },
  { value: 'M2', label: 'M2' },
];

const LOCATIONS = [
  'Bengaluru',
  'Hyderabad',
  'Mumbai',
  'Delhi NCR',
  'Pune',
  'Chennai',
  'San Francisco',
  'New York',
  'Remote',
];

const STATUS_STYLE: Record<'below' | 'market' | 'above', string> = {
  below: 'bg-[#FFF7F5] text-[#FF5A5F] border-[#FFD1D3]',
  market: 'bg-[#FFF5DC] text-[#B26B00] border-[#FFE4A1]',
  above: 'bg-[#E8F8EC] text-[#008A05] border-[#A7E3B5]',
};

const STATUS_LABEL: Record<'below' | 'market' | 'above', string> = {
  below: 'Below market',
  market: 'In market band',
  above: 'Above market',
};

const VERDICT_STYLE: Record<'strong' | 'market' | 'negotiate', string> = {
  strong: 'bg-[#E8F8EC] text-[#008A05] border-[#A7E3B5]',
  market: 'bg-[#FFF5DC] text-[#B26B00] border-[#FFE4A1]',
  negotiate: 'bg-[#FFF7F5] text-[#FF5A5F] border-[#FFD1D3]',
};

const VERDICT_LABEL: Record<'strong' | 'market' | 'negotiate', string> = {
  strong: 'Strong offer',
  market: 'Market offer',
  negotiate: 'Negotiate',
};

export default function OfferAnalyzerPage() {
  const [base, setBase] = useState(4500000);
  const [bonus, setBonus] = useState(500000);
  const [stock, setStock] = useState(2000000);
  const [level, setLevel] = useState('SDE_II');
  const [role, setRole] = useState('Software Engineer');
  const [location, setLocation] = useState('Bengaluru');

  const analysis = useMemo(
    () => analyzeOffer({ base, bonus, stock, total: base + bonus + stock, level, role, location }),
    [base, bonus, stock, level, role, location]
  );

  const topStats: PreviewStat[] = [
    {
      key: 'total',
      label: 'Total comp',
      value: formatCompensation(base + bonus + stock, 'INR'),
      accent: 'red',
      caption: 'Base + bonus + stock on the offer.',
    },
    {
      key: 'verdict',
      label: 'Verdict',
      value: VERDICT_LABEL[analysis.verdict],
      accent: analysis.verdict === 'strong' ? 'green' : analysis.verdict === 'market' ? 'amber' : 'red',
      caption: 'How your offer stacks up.',
    },
    {
      key: 'uplift',
      label: 'Suggested uplift',
      value: analysis.upliftSuggestion > 0 ? `+${formatCompensation(analysis.upliftSuggestion, 'INR')}` : '—',
      accent: 'blue',
      caption: 'How much closer to the median we recommend pushing.',
    },
    {
      key: 'base',
      label: 'Base share',
      value: `${Math.round((base / Math.max(1, base + bonus + stock)) * 100)}%`,
      accent: 'amber',
      caption: 'Share of total comp delivered as base.',
    },
  ];

  return (
    <>
      <PreviewPageHero
        eyebrow="Tools"
        title="Offer analyzer"
        description="Drop in your offer details and see how the package compares to the market for your level. Get a verdict and a suggested uplift in seconds."
        badges={['Market aware', 'Verdict + uplift', 'No sign-up']}
        actions={[
          { label: 'Open calculator', href: '/tools/calculator' },
          { label: 'Open benchmarking', href: '/tools/benchmark', variant: 'secondary' },
        ]}
        meta="No offer data is stored or sent to a server — analysis runs in your browser"
      />
      <PreviewStatGrid stats={topStats} />

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 lg:col-span-2">
              <h2 className="text-base font-semibold text-[#222222] sm:text-lg">Your offer</h2>
              <p className="mt-1 text-sm text-[#717171]">
                Numbers can be edited; analysis updates live.
              </p>
              <div className="mt-6 space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-[#222222]">Role</span>
                  <input
                    type="text"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    className="mt-1 block w-full rounded-lg border border-[#EBEBEB] bg-white px-3 py-2 text-sm text-[#222222] focus:border-[#FF5A5F] focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-[#222222]">Level</span>
                  <select
                    value={level}
                    onChange={(event) => setLevel(event.target.value)}
                    className="mt-1 block w-full rounded-lg border border-[#EBEBEB] bg-white px-3 py-2 text-sm text-[#222222] focus:border-[#FF5A5F] focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20"
                  >
                    {LEVELS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
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
                    {LOCATIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="flex items-center justify-between text-sm font-medium text-[#222222]">
                    <span>Base (₹)</span>
                    <span className="font-semibold tabular-nums">{base.toLocaleString()}</span>
                  </span>
                  <input
                    type="range"
                    min={500000}
                    max={15000000}
                    step={100000}
                    value={base}
                    onChange={(event) => setBase(Number(event.target.value))}
                    className="mt-2 w-full accent-[#FF5A5F]"
                  />
                </label>
                <label className="block">
                  <span className="flex items-center justify-between text-sm font-medium text-[#222222]">
                    <span>Bonus (₹)</span>
                    <span className="font-semibold tabular-nums">{bonus.toLocaleString()}</span>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={5000000}
                    step={50000}
                    value={bonus}
                    onChange={(event) => setBonus(Number(event.target.value))}
                    className="mt-2 w-full accent-[#FF5A5F]"
                  />
                </label>
                <label className="block">
                  <span className="flex items-center justify-between text-sm font-medium text-[#222222]">
                    <span>Stock / year (₹)</span>
                    <span className="font-semibold tabular-nums">{stock.toLocaleString()}</span>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={10000000}
                    step={100000}
                    value={stock}
                    onChange={(event) => setStock(Number(event.target.value))}
                    className="mt-2 w-full accent-[#FF5A5F]"
                  />
                </label>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-3">
              <div
                className={`rounded-2xl border p-5 sm:p-6 ${VERDICT_STYLE[analysis.verdict]}`}
              >
                <div className="text-xs font-semibold uppercase tracking-wider">
                  Verdict
                </div>
                <div className="mt-2 text-2xl font-bold sm:text-3xl">
                  {VERDICT_LABEL[analysis.verdict]}
                </div>
                <p className="mt-2 text-sm leading-6">{analysis.summary}</p>
                {analysis.upliftSuggestion > 0 ? (
                  <p className="mt-3 text-sm font-medium">
                    Suggested uplift: {formatCompensation(analysis.upliftSuggestion, 'INR')}
                  </p>
                ) : null}
              </div>

              <div className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
                <h3 className="text-base font-semibold text-[#222222]">Component breakdown</h3>
                <ul className="mt-4 space-y-3">
                  {analysis.metrics.map((metric) => {
                    const width = Math.min(100, Math.round((metric.yourValue / Math.max(1, metric.marketTop)) * 100));
                    return (
                      <li key={metric.key} className="rounded-xl border border-[#F2F2F2] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-[#222222]">
                            {metric.label}
                          </span>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                              STATUS_STYLE[metric.status]
                            }`}
                          >
                            {STATUS_LABEL[metric.status]}
                          </span>
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                              You
                            </div>
                            <div className="mt-0.5 font-semibold tabular-nums text-[#222222]">
                              {formatCompensation(metric.yourValue, 'INR')}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                              Median
                            </div>
                            <div className="mt-0.5 font-semibold tabular-nums text-[#222222]">
                              {formatCompensation(metric.marketMedian, 'INR')}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                              Top
                            </div>
                            <div className="mt-0.5 font-semibold tabular-nums text-[#222222]">
                              {formatCompensation(metric.marketTop, 'INR')}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#F2F2F2]">
                          <div
                            className="h-full rounded-full bg-[#FF5A5F]"
                            style={{ width: `${Math.max(4, width)}%` }}
                          />
                        </div>
                        <p className="mt-2 text-xs text-[#717171]">{metric.hint}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="border-b border-[#EBEBEB] bg-[#FAFAFA]">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Next steps"
            title="Plan your negotiation"
            description="Use the rest of TalentDash to walk into the recruiter call with leverage."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: '/offers', title: 'See real offers', description: 'Browse anonymised offer letters and counter-offer outcomes.' },
              { href: '/tools/calculator', title: 'Model a counter', description: 'Use the calculator to model what your counter looks like.' },
              { href: '/leaderboard', title: 'Top paying companies', description: 'See if your target employer ranks where you think it does.' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#FF5A5F]/40"
              >
                <h3 className="text-base font-semibold text-[#222222]">{link.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#717171]">{link.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#FF5A5F]">
                  Open
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8h10" />
                    <path d="M9 4l4 4-4 4" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
