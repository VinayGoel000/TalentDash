import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/home/SectionHeading';

type HubCard = {
  key: string;
  title: string;
  description: string;
  bullets: string[];
  href: string;
  cta: string;
  accent: 'red' | 'blue' | 'green' | 'amber' | 'violet' | 'slate';
  icon: React.ReactNode;
};

const HUB_CARDS: HubCard[] = [
  {
    key: 'salary-trends',
    title: 'Compensation trends',
    description: 'Year-over-year salary movement across roles, levels and locations.',
    bullets: [
      'Quarterly benchmarks refreshed live',
      'Median, p25 and p90 by experience band',
      'Top-paying roles updated weekly',
    ],
    href: '/trends',
    cta: 'Open trends dashboard',
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
        <path d="M3 17l5-6 4 4 7-9" />
        <path d="M14 6h5v5" />
      </svg>
    ),
  },
  {
    key: 'leaderboard',
    title: 'Top paying companies',
    description: 'Live leaderboard of every employer ranked by verified median total comp.',
    bullets: [
      'Verified records only — no marketing fluff',
      'Median, not average, as the primary signal',
      'Refreshed with every new submission',
    ],
    href: '/leaderboard',
    cta: 'See the leaderboard',
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
        <path d="M8 21h8M12 17v4M5 4h14v8a7 7 0 0 1-14 0Z" />
        <path d="M5 8h14" />
      </svg>
    ),
  },
  {
    key: 'locations',
    title: 'Popular locations',
    description: 'Markets ranked by record count, median comp, top roles and top employers.',
    bullets: [
      'Every city with verified submissions',
      'Remote share per market',
      'Top employers per location',
    ],
    href: '/locations',
    cta: 'Browse locations',
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
    key: 'industries',
    title: 'Industry insights',
    description: 'Cross-sector comp movement, top roles and growth rates.',
    bullets: [
      'Technology, fintech, e-commerce, IT services and more',
      'YoY growth per industry',
      'Top employers per sector',
    ],
    href: '/industries',
    cta: 'Explore industries',
    accent: 'violet',
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
      </svg>
    ),
  },
  {
    key: 'compare',
    title: 'Advanced compare',
    description: 'Side-by-side comparison of records, companies or roles.',
    bullets: [
      'Records: pick any two submissions',
      'Companies: see medians and top roles',
      'Roles: compare comp across functions',
    ],
    href: '/compare',
    cta: 'Open compare',
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
        <path d="M3 6h13M3 12h9M3 18h5" />
        <path d="M19 8v12M14 14h10" />
      </svg>
    ),
  },
  {
    key: 'company-compare',
    title: 'Company comparison',
    description: 'Compare any two employers across median comp, top roles and levels.',
    bullets: [
      'Side-by-side median and average TC',
      'Top roles and top levels per company',
      'Direct links to each company profile',
    ],
    href: '/compare?type=companies',
    cta: 'Compare two companies',
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
        <path d="M9 13h.01M15 13h.01" />
      </svg>
    ),
  },
  {
    key: 'role-compare',
    title: 'Role comparison',
    description: 'See how two roles differ in comp, experience and locations.',
    bullets: [
      'Median and average TC per role',
      'Top levels and top locations per role',
      'Direct links to filtered salary explorer',
    ],
    href: '/compare?type=roles',
    cta: 'Compare two roles',
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
        <circle cx="9" cy="9" r="3" />
        <path d="M3 19c.8-3 3-5 6-5s5.2 2 6 5" />
        <path d="M16 7h5M18.5 4.5v5" />
      </svg>
    ),
  },
  {
    key: 'calculator',
    title: 'Salary calculator',
    description: 'Model base, bonus and equity scenarios in real time.',
    bullets: [
      'See bracket, total comp and 4-year projection',
      'Recommendations tailored to your mix',
      'Bracketed against live market data',
    ],
    href: '/tools/calculator',
    cta: 'Open calculator',
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
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M16 15h0M8 19h8" />
      </svg>
    ),
  },
  {
    key: 'offer-analyzer',
    title: 'Offer analyzer',
    description: 'Drop in your offer details and see how they compare to the market.',
    bullets: [
      'Per-component breakdown vs median and top band',
      'Verdict and suggested uplift',
      'Negotiation guidance baked in',
    ],
    href: '/tools/offer-analyzer',
    cta: 'Analyze your offer',
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
        <path d="M5 4h11l4 4v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
        <path d="M15 4v4h4" />
        <path d="M8 14h8M8 17h5" />
      </svg>
    ),
  },
  {
    key: 'career-path',
    title: 'Career path explorer',
    description: 'Visualize the typical engineering, product, data or design career path.',
    bullets: [
      'Median comp at every level',
      'Responsibilities and skills to invest in',
      'Probability of making the next move',
    ],
    href: '/tools/career-path',
    cta: 'Open career paths',
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
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-6h6v6" />
        <path d="M9 11h6" />
      </svg>
    ),
  },
  {
    key: 'benchmark',
    title: 'Compensation benchmarking',
    description: 'See exactly where your package ranks across company, role, level and location.',
    bullets: [
      'Live percentile band for any combination',
      'Composite median across role and level',
      'Plain-language verdict and summary',
    ],
    href: '/tools/benchmark',
    cta: 'Benchmark yourself',
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
        <path d="M4 20V10M10 20V4M16 20v-6M22 20H2" />
      </svg>
    ),
  },
];

const ACCENT_BG: Record<HubCard['accent'], string> = {
  red: 'bg-[#FFEFEF] text-[#FF5A5F]',
  blue: 'bg-[#EEF4FF] text-[#2563EB]',
  green: 'bg-[#E8F8EC] text-[#008A05]',
  amber: 'bg-[#FFF5DC] text-[#B26B00]',
  violet: 'bg-[#F0EBFE] text-[#6D3FD8]',
  slate: 'bg-[#F2F2F2] text-[#484848]',
};

export function CareerIntelligenceHub() {
  return (
    <section className="border-b border-[#EBEBEB] bg-[#FAFAFA]">
      <Container className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="Career intelligence hub"
          title="Eleven surfaces, one decision-making surface"
          description="Compensation, benchmarking, career paths, and negotiation playbooks — all in one place, all backed by the community."
          action={{ label: 'Open the tools hub', href: '/tools' }}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HUB_CARDS.map((card) => (
            <Link
              key={card.key}
              href={card.href}
              className="group flex h-full flex-col gap-4 rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#FF5A5F]/40 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:p-6"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${ACCENT_BG[card.accent]}`}
                  aria-hidden="true"
                >
                  {card.icon}
                </div>
                <h3 className="text-base font-semibold text-[#222222] sm:text-lg">{card.title}</h3>
              </div>
              <p className="text-sm leading-6 text-[#717171]">{card.description}</p>
              <ul className="mt-1 flex flex-col gap-2 border-t border-[#F2F2F2] pt-3 text-sm text-[#484848]">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5A5F]"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#FF5A5F]">
                {card.cta}
                <svg
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 16 16"
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
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
