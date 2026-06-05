import type { ReactNode } from 'react';
import { Container } from '@/components/ui/container';
import type { HomepageCounts } from '@/lib/db/homepage';

type StatsSectionProps = {
  counts: HomepageCounts;
};

type StatCard = {
  key: keyof HomepageCounts;
  label: string;
  caption: string;
  icon: ReactNode;
  accent: string;
};

const STATS: StatCard[] = [
  {
    key: 'companies',
    label: 'Total Companies',
    caption: 'Employers with verified records on TalentDash',
    accent: 'from-[#EEF4FF] text-[#2563EB]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21V7l8-4 8 4v14" />
        <path d="M9 21v-6h6v6" />
        <path d="M9 11h.01M12 11h.01M15 11h.01" />
      </svg>
    ),
  },
  {
    key: 'salaries',
    label: 'Total Salaries',
    caption: 'Compensation submissions across all roles',
    accent: 'from-[#FFEFEF] text-[#FF5A5F]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20" />
        <path d="M17 6H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6" />
      </svg>
    ),
  },
  {
    key: 'locations',
    label: 'Locations',
    caption: 'Cities represented in the dataset',
    accent: 'from-[#FFF5DC] text-[#B26B00]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    key: 'verified',
    label: 'Verified Records',
    caption: 'Validated through reviewer or partner sources',
    accent: 'from-[#E8F8EC] text-[#008A05]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

function formatCount(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M+`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(value >= 10_000 ? 0 : 1)}k+`;
  return value.toLocaleString();
}

export function StatsSection({ counts }: StatsSectionProps) {
  return (
    <section className="border-b border-[#EBEBEB] bg-white">
      <Container className="py-10 sm:py-14">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STATS.map((stat) => {
            const value = counts[stat.key];
            return (
              <div
                key={stat.key}
                className="rounded-2xl border border-[#EBEBEB] bg-white p-4 transition hover:border-[#FF5A5F]/30 sm:p-5"
              >
                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.accent}`}>
                  <span className="h-5 w-5">{stat.icon}</span>
                </div>
                <div className="text-2xl font-bold tabular-nums tracking-tight text-[#222222] sm:text-3xl">
                  {formatCount(value)}
                </div>
                <div className="mt-1 text-sm font-semibold text-[#222222]">{stat.label}</div>
                <div className="mt-1 text-xs leading-5 text-[#717171] sm:text-sm">{stat.caption}</div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
