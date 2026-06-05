import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { FeatureCard } from '@/components/home/FeatureCard';
import { OffersPreview } from '@/components/home/OffersPreview';
import { PreviewPageHero } from '@/components/home/PreviewPageHero';
import { PreviewStatGrid, type PreviewStat } from '@/components/home/PreviewStatGrid';
import { SectionHeading } from '@/components/home/SectionHeading';
import { OFFER_RESOURCES, RECENT_OFFERS } from '@/lib/preview-data';
import { getOffersMetadata } from '@/lib/seo/metadata';

export const revalidate = 3600;

export const metadata: Metadata = getOffersMetadata();

const NEGOTIATION_RATE = (() => {
  const improved = RECENT_OFFERS.filter((entry) =>
    entry.outcome.includes('Negotiated') || entry.outcome.includes('Counter')
  ).length;
  return Math.round((improved / RECENT_OFFERS.length) * 100);
})();

export default function OffersPage() {
  const stats: PreviewStat[] = [
    {
      key: 'offers',
      label: 'Offers on record',
      value: RECENT_OFFERS.length.toString(),
      caption: 'Anonymised offer letters, refreshed weekly.',
      accent: 'red',
    },
    {
      key: 'uplift',
      label: 'Median uplift',
      value: '+28%',
      caption: 'Median total compensation uplift after negotiation.',
      accent: 'blue',
    },
    {
      key: 'negotiation',
      label: 'Negotiation success',
      value: `${NEGOTIATION_RATE}%`,
      caption: 'Of recent offers that included a counter or negotiation step.',
      accent: 'green',
    },
    {
      key: 'resources',
      label: 'Playbooks',
      value: OFFER_RESOURCES.length.toString(),
      caption: 'Templates and guides for negotiating, anchoring and closing.',
      accent: 'amber',
    },
  ];

  return (
    <>
      <PreviewPageHero
        eyebrow="Offers"
        title="Negotiate your next offer from data, not hope"
        description="Compare real offer letters, base/equity/bonus breakdowns, and counter-offer outcomes. Use the playbooks that have actually worked."
        badges={['Real outcomes', 'Counter scenarios', 'Equity-aware']}
        actions={[
          { label: 'Browse all offers', href: '#offers' },
          { label: 'Submit an offer', href: '/forum', variant: 'secondary' },
        ]}
        meta="Anonymised submissions only — your identity is never shared with recruiters"
      />
      <PreviewStatGrid stats={stats} />

      <div id="offers" />

      <OffersPreview />

      <div className="border-b border-[#EBEBEB] bg-[#FAFAFA]">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Negotiation principles"
            title="What top candidates do differently"
            description="Patterns that show up across every successful negotiation we have on record."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              accent="red"
              title="Anchor with a number"
              description="Open at the top of the band you have researched. The opening number moves the entire negotiation."
              meta="First move wins"
              icon={
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
              }
            />
            <FeatureCard
              accent="blue"
              title="Stack competing offers"
              description="Sequence your interview loops so multiple offers land in the same negotiation window."
              meta="Leverage 101"
              icon={
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
                  <rect x="3" y="3" width="14" height="14" rx="2" />
                  <path d="M7 7h14v14H7" />
                </svg>
              }
            />
            <FeatureCard
              accent="green"
              title="Understand equity"
              description="Decode RSU vesting, top-ups and dilution so you can compare offers on long-term value."
              meta="Equity literacy"
              icon={
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
                  <path d="M12 8v6M9 11h6" />
                </svg>
              }
            />
          </div>
        </Container>
      </div>

      <div className="bg-[#FFF7F4]">
        <Container className="py-12 sm:py-16">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#FF5A5F]/20 bg-white p-6 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-[#222222] sm:text-3xl">
              Have an offer to share?
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-[#484848] sm:text-base">
              Anonymously contribute your offer letter and help the next candidate land a better
              package.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/forum"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#FF5A5F] px-5 text-sm font-semibold text-white transition hover:bg-[#e14d52]"
              >
                Submit an offer
              </a>
              <a
                href="/salaries"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-[#EBEBEB] bg-white px-5 text-sm font-semibold text-[#222222] transition hover:bg-[#F2F2F2]"
              >
                Open salary explorer
              </a>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
