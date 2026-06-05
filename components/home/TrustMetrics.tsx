import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/home/SectionHeading';

type TrustMetricsProps = {
  totals: {
    salaries: number;
    companies: number;
    locations: number;
  };
};

type Metric = {
  key: string;
  label: string;
  value: string;
  caption: string;
  accent: 'red' | 'blue' | 'green' | 'amber' | 'violet' | 'slate';
  icon: React.ReactNode;
};

function buildMetrics(totals: TrustMetricsProps['totals']): Metric[] {
  return [
    {
      key: 'salaries',
      label: 'Verified salaries',
      value: totals.salaries.toLocaleString(),
      caption: 'Crowd-sourced records, validated against tax and offer documents.',
      accent: 'red',
      icon: (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="12" cy="12" r="2.5" />
          <path d="M7 12h.01M17 12h.01" />
        </svg>
      ),
    },
    {
      key: 'companies',
      label: 'Companies tracked',
      value: totals.companies.toLocaleString(),
      caption: 'From listed multinationals to high-growth private startups.',
      accent: 'blue',
      icon: (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M3 21h18" />
          <path d="M5 21V8l7-5 7 5v13" />
          <path d="M9 21v-6h6v6" />
          <path d="M9 12h.01M15 12h.01" />
        </svg>
      ),
    },
    {
      key: 'locations',
      label: 'Locations covered',
      value: totals.locations.toLocaleString(),
      caption: 'Country, city and remote-first cost-of-life intelligence.',
      accent: 'green',
      icon: (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12Z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      ),
    },
    {
      key: 'trust',
      label: 'Curated by domain experts',
      value: '100%',
      caption: 'Manual review pipeline for every salary, review and interview.',
      accent: 'amber',
      icon: (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M12 3 4 6v6c0 4.4 3.2 8 8 9 4.8-1 8-4.6 8-9V6Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
  ];
}

export function TrustMetrics({ totals }: TrustMetricsProps) {
  const metrics = buildMetrics(totals);

  return (
    <section className="border-b border-[#EBEBEB] bg-white">
      <Container className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="Why teams trust TalentDash"
          title="Real signals, verified by humans"
          description="Every number on this homepage is sourced from a community contribution, then validated against secondary signals before going live."
        />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.key}
              className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#FF5A5F]/30 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
            >
              <div
                className={[
                  'mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl',
                  metric.accent === 'red' && 'bg-[#FFEFEF] text-[#FF5A5F]',
                  metric.accent === 'blue' && 'bg-[#EEF4FF] text-[#2563EB]',
                  metric.accent === 'green' && 'bg-[#E8F8EC] text-[#008A05]',
                  metric.accent === 'amber' && 'bg-[#FFF5DC] text-[#B26B00]',
                  metric.accent === 'violet' && 'bg-[#F0EBFE] text-[#6D3FD8]',
                  metric.accent === 'slate' && 'bg-[#F2F2F2] text-[#484848]',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-hidden="true"
              >
                {metric.icon}
              </div>
              <div className="text-2xl font-bold tabular-nums tracking-tight text-[#222222] sm:text-3xl">
                {metric.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-[#222222]">{metric.label}</div>
              <p className="mt-1 text-xs leading-5 text-[#717171] sm:text-sm">{metric.caption}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
