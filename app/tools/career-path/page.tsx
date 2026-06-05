import { Container } from '@/components/ui/container';
import { PreviewPageHero } from '@/components/home/PreviewPageHero';
import { PreviewStatGrid, type PreviewStat } from '@/components/home/PreviewStatGrid';
import { SectionHeading } from '@/components/home/SectionHeading';
import { CareerPathExplorer } from '@/components/tools/CareerPathExplorer';
import { CAREER_PATHS } from '@/lib/preview-data';
import { getCareerPathMetadata } from '@/lib/seo/metadata';

export const revalidate = 3600;

export const metadata = getCareerPathMetadata();

const ACCENT_BG: Record<'engineering' | 'product' | 'data' | 'design', string> = {
  engineering: 'bg-[#FFEFEF] text-[#FF5A5F]',
  product: 'bg-[#EEF4FF] text-[#2563EB]',
  data: 'bg-[#E8F8EC] text-[#008A05]',
  design: 'bg-[#F0EBFE] text-[#6D3FD8]',
};

export default function CareerPathPage() {
  const totalNodes = CAREER_PATHS.reduce((sum, path) => sum + path.nodes.length, 0);
  const topComp = Math.max(
    ...CAREER_PATHS.flatMap((path) => path.nodes.map((node) => node.medianTotalCompensation))
  );

  const topStats: PreviewStat[] = [
    { key: 'paths', label: 'Career paths', value: CAREER_PATHS.length.toString(), accent: 'red', caption: 'Curated engineering, product, data and design tracks.' },
    { key: 'levels', label: 'Levels covered', value: totalNodes.toString(), accent: 'blue', caption: 'From entry to principal / executive band.' },
    { key: 'top', label: 'Top median TC', value: `₹${(topComp / 10000000).toFixed(2)} Cr`, accent: 'green', caption: 'Highest median comp across all paths.' },
    { key: 'roles', label: 'Functions', value: '4', accent: 'amber', caption: 'Engineering, product, data and design.' },
  ];

  return (
    <>
      <PreviewPageHero
        eyebrow="Tools"
        title="Career path explorer"
        description="Visualise the typical engineering, product, data and design career paths. See responsibilities, skills and median total comp at each level."
        badges={['4 paths', 'Median TC per level', 'Skills & responsibilities']}
        actions={[
          { label: 'See paths', href: '#paths' },
          { label: 'Open benchmarking', href: '/tools/benchmark', variant: 'secondary' },
        ]}
        meta="Median TC per level is rolled up from verified records on TalentDash"
      />
      <PreviewStatGrid stats={topStats} />

      <div id="paths" />

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Pick a path"
            title="Career paths in the index"
            description="Each card previews the function. The interactive explorer below lets you walk through the levels and comp bands."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CAREER_PATHS.map((path) => (
              <div
                key={path.id}
                className="flex h-full flex-col gap-3 rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${ACCENT_BG[path.icon]}`}
                  aria-hidden="true"
                >
                  <svg
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
                </span>
                <h3 className="text-base font-semibold text-[#222222] sm:text-lg">{path.role}</h3>
                <p className="text-sm leading-6 text-[#717171]">{path.description}</p>
                <p className="mt-auto text-xs text-[#717171]">
                  {path.nodes.length} levels ·{' '}
                  {path.nodes[0].medianTotalCompensation.toLocaleString()} →{' '}
                  {path.nodes[path.nodes.length - 1].medianTotalCompensation.toLocaleString()} median TC
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div className="border-b border-[#EBEBEB] bg-[#FAFAFA]">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Interactive"
            title="Walk through any path"
            description="Select a function and a starting level. See the responsibilities, skills and median comp you'll likely target next."
          />
          <div className="mt-8">
            <CareerPathExplorer />
          </div>
        </Container>
      </div>
    </>
  );
}
