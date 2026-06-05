import type { ReactNode } from 'react';
import { Container } from '@/components/ui/container';

export type PreviewStat = {
  key: string;
  label: string;
  value: string;
  caption?: string;
  icon?: ReactNode;
  accent?: 'red' | 'blue' | 'green' | 'amber' | 'violet' | 'slate';
};

type PreviewStatGridProps = {
  stats: PreviewStat[];
};

const ACCENT_BG: Record<NonNullable<PreviewStat['accent']>, string> = {
  red: 'bg-[#FFEFEF] text-[#FF5A5F]',
  blue: 'bg-[#EEF4FF] text-[#2563EB]',
  green: 'bg-[#E8F8EC] text-[#008A05]',
  amber: 'bg-[#FFF5DC] text-[#B26B00]',
  violet: 'bg-[#F0EBFE] text-[#6D3FD8]',
  slate: 'bg-[#F2F2F2] text-[#484848]',
};

export function PreviewStatGrid({ stats }: PreviewStatGridProps) {
  return (
    <section className="border-b border-[#EBEBEB] bg-white">
      <Container className="py-8 sm:py-10">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.key}
              className="rounded-2xl border border-[#EBEBEB] bg-white p-4 transition hover:border-[#FF5A5F]/30 sm:p-5"
            >
              {stat.icon ? (
                <div
                  className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${
                    ACCENT_BG[stat.accent ?? 'slate']
                  }`}
                  aria-hidden="true"
                >
                  <span className="h-5 w-5">{stat.icon}</span>
                </div>
              ) : null}
              <div className="text-2xl font-bold tabular-nums tracking-tight text-[#222222] sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-[#222222]">{stat.label}</div>
              {stat.caption ? (
                <div className="mt-1 text-xs leading-5 text-[#717171] sm:text-sm">{stat.caption}</div>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
