import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { PreviewPageHero } from '@/components/home/PreviewPageHero';
import { PreviewStatGrid, type PreviewStat } from '@/components/home/PreviewStatGrid';
import { SectionHeading } from '@/components/home/SectionHeading';

export const revalidate = 3600;

type ToolLink = {
  href: string;
  title: string;
  description: string;
  accent: 'red' | 'blue' | 'green' | 'amber' | 'violet' | 'slate';
  meta: string;
  icon: React.ReactNode;
};

const TOOLS: ToolLink[] = [
  {
    href: '/tools/calculator',
    title: 'Salary calculator',
    description: 'Model base, bonus and equity scenarios. See how they compare against level bands.',
    accent: 'red',
    meta: 'Interactive',
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
    href: '/tools/offer-analyzer',
    title: 'Offer analyzer',
    description: 'Paste your offer details and see how they compare to the market for your level.',
    accent: 'blue',
    meta: 'Market aware',
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
    href: '/tools/career-path',
    title: 'Career path explorer',
    description: 'Visualize the typical engineering, product, design or data career path and the comp at each level.',
    accent: 'green',
    meta: '4 paths',
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
    href: '/tools/benchmark',
    title: 'Compensation benchmarking',
    description: 'See where your package ranks against peers across company, role, level and location.',
    accent: 'amber',
    meta: 'Live benchmarks',
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

const ACCENT_BG: Record<ToolLink['accent'], string> = {
  red: 'bg-[#FFEFEF] text-[#FF5A5F]',
  blue: 'bg-[#EEF4FF] text-[#2563EB]',
  green: 'bg-[#E8F8EC] text-[#008A05]',
  amber: 'bg-[#FFF5DC] text-[#B26B00]',
  violet: 'bg-[#F0EBFE] text-[#6D3FD8]',
  slate: 'bg-[#F2F2F2] text-[#484848]',
};

export default function ToolsHubPage() {
  const topStats: PreviewStat[] = [
    { key: 'tools', label: 'Tools available', value: TOOLS.length.toString(), accent: 'red', caption: 'Interactive tooling for compensation decisions.' },
    { key: 'live', label: 'Live data', value: '100%', accent: 'blue', caption: 'Tools are powered by verified TalentDash data.' },
    { key: 'roles', label: 'Roles covered', value: '4', accent: 'green', caption: 'Engineering, product, data and design.' },
    { key: 'free', label: 'No sign-up', value: 'Yes', accent: 'amber', caption: 'Use the tools without creating an account.' },
  ];

  return (
    <>
      <PreviewPageHero
        eyebrow="Tools"
        title="Compensation tools for every career decision"
        description="Calculate your offer, benchmark against the market, map your career path, and analyse your offer letter. All powered by real data from the TalentDash community."
        badges={['Interactive', 'No sign-up', 'Live benchmarks']}
        actions={[
          { label: 'Open salary calculator', href: '/tools/calculator' },
          { label: 'See all tools', href: '#tools', variant: 'secondary' },
        ]}
        meta="All tools are private by default — nothing is shared with recruiters"
      />
      <PreviewStatGrid stats={topStats} />

      <div id="tools" />

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="All tools"
            title="Pick a tool to get started"
            description="Each tool is interactive, mobile-friendly, and free to use."
            action={{ label: 'Open salary explorer', href: '/salaries' }}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#FF5A5F]/40 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${ACCENT_BG[tool.accent]}`}
                    aria-hidden="true"
                  >
                    {tool.icon}
                  </span>
                  <h3 className="text-base font-semibold text-[#222222] sm:text-lg">
                    {tool.title}
                  </h3>
                </div>
                <p className="text-sm leading-6 text-[#717171]">{tool.description}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#FF5A5F]">
                  Open {tool.title.toLowerCase()}
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
      </div>

      <div className="border-b border-[#EBEBEB] bg-[#FAFAFA]">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="How tools work"
            title="Powered by the same verified dataset as the rest of TalentDash"
            description="The tools read the same database that powers the salary explorer, the leaderboard and the community signal."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                key: 'inputs',
                title: 'You bring the inputs',
                description: 'Drop in your base, bonus, stock, level, role and location. We never ask for personal identifiers.',
              },
              {
                key: 'math',
                title: 'We do the math',
                description: 'Calculations are run against the same verified data the rest of the site is built on.',
              },
              {
                key: 'outputs',
                title: 'You get the context',
                description: 'See how your number compares to the median, top band and the next level up — instantly.',
              },
            ].map((item) => (
              <div
                key={item.key}
                className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <h3 className="text-base font-semibold text-[#222222]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#717171]">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
