import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { PreviewPageHero } from '@/components/home/PreviewPageHero';
import { PreviewStatGrid, type PreviewStat } from '@/components/home/PreviewStatGrid';
import { SectionHeading } from '@/components/home/SectionHeading';
import { TREND_SERIES } from '@/lib/preview-data';
import { getTrendsMetadata } from '@/lib/seo/metadata';
import { formatCompensation } from '@/lib/formatters';

export const revalidate = 3600;

export const metadata = getTrendsMetadata();

function minMax(points: number[]): { min: number; max: number } {
  if (points.length === 0) return { min: 0, max: 0 };
  return { min: Math.min(...points), max: Math.max(...points) };
}

function Sparkline({
  points,
  color = '#FF5A5F',
}: {
  points: number[];
  color?: string;
}) {
  const { min, max } = minMax(points);
  const range = max - min || 1;
  const width = 220;
  const height = 60;
  const stepX = points.length > 1 ? width / (points.length - 1) : 0;

  const coords = points.map((value, index) => {
    const x = index * stepX;
    const y = height - ((value - min) / range) * height;
    return { x, y };
  });

  const path = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ');
  const area = `${path} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-14 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={area} fill={color} opacity="0.12" />
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {coords.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r="2.5" fill={color} />
      ))}
    </svg>
  );
}

export default function TrendsPage() {
  const totalCount = TREND_SERIES.reduce((sum, series) => sum + series.current.count, 0);
  const avgYoy =
    Math.round(
      (TREND_SERIES.reduce((sum, series) => sum + series.current.yoyDelta, 0) /
        TREND_SERIES.length) *
        10
    ) / 10;
  const avgCagr =
    Math.round(
      (TREND_SERIES.reduce((sum, series) => sum + series.cagr, 0) / TREND_SERIES.length) * 10
    ) / 10;
  const topSeries = [...TREND_SERIES].sort((a, b) => b.current.yoyDelta - a.current.yoyDelta)[0];

  const topStats: PreviewStat[] = [
    {
      key: 'series',
      label: 'Trend series',
      value: TREND_SERIES.length.toString(),
      caption: 'Curated series across role, level and location.',
      accent: 'red',
    },
    {
      key: 'records',
      label: 'Records analysed',
      value: totalCount.toLocaleString(),
      caption: 'Verified submissions driving the trend lines.',
      accent: 'blue',
    },
    {
      key: 'avg-yoy',
      label: 'Average YoY growth',
      value: `+${avgYoy}%`,
      caption: 'Mean year-over-year growth across all series.',
      accent: 'green',
    },
    {
      key: 'avg-cagr',
      label: 'Average CAGR',
      value: `+${avgCagr}%`,
      caption: 'Mean compound annual growth rate over the 4-year window.',
      accent: 'amber',
    },
  ];

  const grouped: Record<string, typeof TREND_SERIES> = {
    role: TREND_SERIES.filter((series) => series.group === 'role'),
    level: TREND_SERIES.filter((series) => series.group === 'level'),
    location: TREND_SERIES.filter((series) => series.group === 'location'),
  };

  return (
    <>
      <PreviewPageHero
        eyebrow="Trends"
        title="Salary trends, year over year"
        description="Live charts tracking median total compensation across roles, levels and locations. See where comp is accelerating and where it is plateauing."
        badges={['YoY deltas', '4-year CAGR', 'Role / level / location']}
        actions={[
          { label: 'See trends', href: '#trends' },
          { label: 'Open salary explorer', href: '/salaries', variant: 'secondary' },
        ]}
        meta={`Top series: ${topSeries.label} at +${topSeries.current.yoyDelta}% YoY`}
      />
      <PreviewStatGrid stats={topStats} />

      <div id="trends" />

      {Object.entries(grouped).map(([groupKey, series]) => (
        <div
          key={groupKey}
          className={`border-b border-[#EBEBEB] ${
            groupKey === 'role' ? 'bg-white' : groupKey === 'level' ? 'bg-[#FAFAFA]' : 'bg-white'
          }`}
        >
          <Container className="py-12 sm:py-16">
            <SectionHeading
              eyebrow={groupKey === 'role' ? 'By role' : groupKey === 'level' ? 'By level' : 'By location'}
              title={
                groupKey === 'role'
                  ? 'Trends by role'
                  : groupKey === 'level'
                    ? 'Trends by level'
                    : 'Trends by location'
              }
              description={
                groupKey === 'role'
                  ? 'Median total comp movement for the most-followed roles on TalentDash.'
                  : groupKey === 'level'
                    ? 'Median total comp movement across standardised engineering levels.'
                    : 'Median total comp movement across the top hiring cities.'
              }
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {series.map((seriesEntry) => (
                <article
                  key={seriesEntry.id}
                  className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6"
                >
                  <header className="flex items-start justify-between gap-3">
                    <div className="flex flex-col">
                      <h3 className="text-base font-semibold text-[#222222] sm:text-lg">
                        {seriesEntry.label}
                      </h3>
                      <p className="text-xs text-[#717171]">
                        {seriesEntry.current.count.toLocaleString()} records
                      </p>
                    </div>
                    <span className="rounded-full bg-[#E8F8EC] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#008A05]">
                      +{seriesEntry.current.yoyDelta}% YoY
                    </span>
                  </header>
                  <div className="mt-3 text-2xl font-bold tabular-nums text-[#222222]">
                    {formatCompensation(seriesEntry.current.median, 'INR')}
                  </div>
                  <div className="text-xs text-[#717171]">Median total comp · 2026</div>
                  <div className="mt-4">
                    <Sparkline
                      points={seriesEntry.history.map((point) => point.median)}
                      color={
                        seriesEntry.group === 'role'
                          ? '#FF5A5F'
                          : seriesEntry.group === 'level'
                            ? '#2563EB'
                            : '#008A05'
                      }
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-[#F2F2F2] pt-3 text-xs text-[#717171]">
                    <span>CAGR</span>
                    <span className="font-semibold text-[#222222] tabular-nums">
                      +{seriesEntry.cagr}%
                    </span>
                  </div>
                  <ol className="mt-3 grid grid-cols-5 gap-1 text-center text-[10px] font-medium text-[#717171]">
                    {seriesEntry.history.map((point) => (
                      <li
                        key={point.year}
                        className="flex flex-col items-center gap-0.5 rounded-md bg-[#FAFAFA] py-1.5"
                      >
                        <span className="font-semibold text-[#484848]">{point.year}</span>
                        <span className="tabular-nums">
                          ₹{(point.median / 100000).toFixed(1)}L
                        </span>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </Container>
        </div>
      ))}
    </>
  );
}
