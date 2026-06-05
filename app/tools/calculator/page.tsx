'use client';

import { useMemo, useState } from 'react';
import { Container } from '@/components/ui/container';
import { PreviewPageHero } from '@/components/home/PreviewPageHero';
import { PreviewStatGrid, type PreviewStat } from '@/components/home/PreviewStatGrid';
import { SectionHeading } from '@/components/home/SectionHeading';
import { calculateCompensation } from '@/lib/preview-data';

export default function SalaryCalculatorPage() {
  const [base, setBase] = useState(3600000);
  const [bonusPercent, setBonusPercent] = useState(15);
  const [stockAnnual, setStockAnnual] = useState(1500000);
  const [years, setYears] = useState(5);

  const result = useMemo(
    () => calculateCompensation({ base, bonusPercent, stockAnnual, years }),
    [base, bonusPercent, stockAnnual, years]
  );

  const topStats: PreviewStat[] = [
    { key: 'annual', label: 'Annual total comp', value: `₹${(result.totalAnnual / 100000).toFixed(1)} L`, accent: 'red', caption: 'Base + bonus + stock per year.' },
    { key: 'four', label: '4-year total', value: `₹${(result.totalFourYear / 10000000).toFixed(2)} Cr`, accent: 'blue', caption: 'Total comp across 4 years, pre-tax.' },
    { key: 'bracket', label: 'Comp bracket', value: result.bracket, accent: 'green', caption: 'Bracket inferred from total comp.' },
    { key: 'base', label: 'Base share', value: `${result.baseToTotalRatio}%`, accent: 'amber', caption: 'How much of total comp is base salary.' },
  ];

  return (
    <>
      <PreviewPageHero
        eyebrow="Tools"
        title="Salary calculator"
        description="Model base, bonus and equity scenarios. See your bracket, total comp and recommendations in real time."
        badges={['Interactive', 'Live math', 'Recommendations']}
        actions={[
          { label: 'Open offer analyzer', href: '/tools/offer-analyzer' },
          { label: 'Open benchmarking', href: '/tools/benchmark', variant: 'secondary' },
        ]}
        meta="No data leaves your browser"
      />
      <PreviewStatGrid stats={topStats} />

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6 lg:col-span-2">
              <h2 className="text-base font-semibold text-[#222222] sm:text-lg">Your inputs</h2>
              <p className="mt-1 text-sm text-[#717171]">
                Adjust the numbers to see your total comp update live.
              </p>
              <div className="mt-6 space-y-5">
                <label className="block">
                  <span className="flex items-center justify-between text-sm font-medium text-[#222222]">
                    <span>Base salary (₹)</span>
                    <span className="font-semibold tabular-nums">{base.toLocaleString()}</span>
                  </span>
                  <input
                    type="range"
                    min={500000}
                    max={12000000}
                    step={100000}
                    value={base}
                    onChange={(event) => setBase(Number(event.target.value))}
                    className="mt-2 w-full accent-[#FF5A5F]"
                  />
                </label>
                <label className="block">
                  <span className="flex items-center justify-between text-sm font-medium text-[#222222]">
                    <span>Bonus % of base</span>
                    <span className="font-semibold tabular-nums">{bonusPercent}%</span>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    step={1}
                    value={bonusPercent}
                    onChange={(event) => setBonusPercent(Number(event.target.value))}
                    className="mt-2 w-full accent-[#FF5A5F]"
                  />
                </label>
                <label className="block">
                  <span className="flex items-center justify-between text-sm font-medium text-[#222222]">
                    <span>Stock / year (₹)</span>
                    <span className="font-semibold tabular-nums">{stockAnnual.toLocaleString()}</span>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={10000000}
                    step={100000}
                    value={stockAnnual}
                    onChange={(event) => setStockAnnual(Number(event.target.value))}
                    className="mt-2 w-full accent-[#FF5A5F]"
                  />
                </label>
                <label className="block">
                  <span className="flex items-center justify-between text-sm font-medium text-[#222222]">
                    <span>Years of experience</span>
                    <span className="font-semibold tabular-nums">{years}</span>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={20}
                    step={1}
                    value={years}
                    onChange={(event) => setYears(Number(event.target.value))}
                    className="mt-2 w-full accent-[#FF5A5F]"
                  />
                </label>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'base', label: 'Base', value: result.baseToTotalRatio, color: '#FF5A5F' },
                  { key: 'bonus', label: 'Bonus', value: 100 - result.baseToTotalRatio - result.stockToTotalRatio, color: '#FFB400' },
                  { key: 'stock', label: 'Stock', value: result.stockToTotalRatio, color: '#2563EB' },
                ].map((row) => (
                  <div
                    key={row.key}
                    className="rounded-2xl border border-[#EBEBEB] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#222222]">{row.label}</span>
                      <span className="text-sm font-semibold tabular-nums text-[#222222]">
                        {row.value}%
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#F2F2F2]">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${Math.max(0, row.value)}%`, backgroundColor: row.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-[#EBEBEB] bg-[#FFF7F4] p-5 sm:p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#FF5A5F]">
                  Total annual comp
                </div>
                <div className="mt-2 text-3xl font-bold tabular-nums text-[#222222] sm:text-4xl">
                  ₹{result.totalAnnual.toLocaleString()}
                </div>
                <div className="mt-1 text-sm text-[#484848]">
                  ₹{result.totalFourYear.toLocaleString()} over 4 years (pre-tax)
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                      Bracket
                    </div>
                    <div className="mt-0.5 font-semibold text-[#222222]">{result.bracket}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                      Bonus
                    </div>
                    <div className="mt-0.5 font-semibold text-[#222222] tabular-nums">
                      ₹{result.bonusAmount.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[#717171]">
                      Stock share
                    </div>
                    <div className="mt-0.5 font-semibold text-[#222222] tabular-nums">
                      {result.stockToTotalRatio}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
                <h3 className="text-base font-semibold text-[#222222]">Recommendations</h3>
                <ul className="mt-3 space-y-2 text-sm text-[#484848]">
                  {result.recommendations.map((recommendation) => (
                    <li key={recommendation} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5A5F]"
                      />
                      <span>{recommendation}</span>
                    </li>
                  ))}
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
            title="What to do with this number"
            description="Once you have a target total comp, plug it into the rest of the TalentDash tools."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: '/tools/offer-analyzer', title: 'Analyse an offer', description: 'Compare a real offer to your model and see what to push back on.' },
              { href: '/tools/benchmark', title: 'Benchmark yourself', description: 'See where your package ranks against peers in the TalentDash database.' },
              { href: '/tools/career-path', title: 'Map your path', description: 'See the comp at your next level so you can plan a counter-offer.' },
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
