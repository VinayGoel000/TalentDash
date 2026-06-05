import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/home/SectionHeading';
import { OFFER_RESOURCES, RECENT_OFFERS } from '@/lib/preview-data';
import type { OfferRecord } from '@/lib/preview-data';

const OUTCOME_PALETTE: Record<OfferRecord['outcome'], string> = {
  Accepted: 'bg-[#E8F8EC] text-[#008A05]',
  Negotiated: 'bg-[#EEF4FF] text-[#2563EB]',
  'Counter accepted': 'bg-[#F0EBFE] text-[#6D3FD8]',
};

export function OffersPreview() {
  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Offer intelligence"
        title="Negotiate from data, not from hope"
        description="Real offer letters, counter-offer outcomes and total compensation breakdowns. Use them as leverage the next time a recruiter calls."
        action={{ label: 'Explore all offers', href: '/offers' }}
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {RECENT_OFFERS.map((offer) => (
          <div
            key={offer.id}
            className="flex h-full flex-col gap-4 rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-base font-semibold text-[#222222]">
                  {offer.company} · {offer.role}
                </span>
                <span className="text-xs text-[#717171]">Level {offer.level}</span>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                  OUTCOME_PALETTE[offer.outcome]
                }`}
              >
                {offer.outcome}
              </span>
            </div>

            <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              <div className="rounded-lg bg-[#F8FDF9] p-3">
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-[#008A05]">
                  Base
                </dt>
                <dd className="mt-1 text-base font-semibold tabular-nums text-[#222222]">
                  {offer.base}
                </dd>
              </div>
              <div className="rounded-lg bg-[#FFF7F5] p-3">
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-[#FF5A5F]">
                  Bonus
                </dt>
                <dd className="mt-1 text-base font-semibold tabular-nums text-[#222222]">
                  {offer.bonus}
                </dd>
              </div>
              <div className="rounded-lg bg-[#EEF4FF] p-3">
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-[#2563EB]">
                  Stock
                </dt>
                <dd className="mt-1 text-base font-semibold tabular-nums text-[#222222]">
                  {offer.stock}
                </dd>
              </div>
              <div className="rounded-lg bg-[#F0EBFE] p-3">
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-[#6D3FD8]">
                  Total
                </dt>
                <dd className="mt-1 text-base font-semibold tabular-nums text-[#222222]">
                  {offer.total}
                </dd>
              </div>
            </dl>

            <div className="mt-auto flex items-center justify-between border-t border-[#F2F2F2] pt-3 text-xs font-medium text-[#717171]">
              <span className="inline-flex items-center gap-1.5 text-[#008A05]">
                <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-[#008A05]" />
                {offer.uplift}
              </span>
              <span>{offer.postedAgo}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {OFFER_RESOURCES.map((resource) => (
          <div
            key={resource.id}
            className="flex h-full flex-col gap-3 rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6"
          >
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#FFF5DC] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#B26B00]">
              Playbook
            </span>
            <h3 className="text-base font-semibold text-[#222222]">{resource.title}</h3>
            <p className="text-sm leading-6 text-[#717171]">{resource.description}</p>
            <span className="mt-auto border-t border-[#F2F2F2] pt-3 text-xs font-medium text-[#717171]">
              {resource.readingTime}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-[#FF5A5F]/20 bg-[#FFF7F4] p-6 text-center sm:p-8">
        <h3 className="text-lg font-semibold text-[#222222] sm:text-xl">
          Have an offer you can share?
        </h3>
        <p className="max-w-xl text-sm leading-6 text-[#484848]">
          Anonymously contribute your offer letter and help the next negotiator in the community.
        </p>
        <Link
          href="/offers"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-[#FF5A5F] px-5 text-sm font-semibold text-white transition hover:bg-[#e14d52] focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/40"
        >
          Submit an offer
        </Link>
      </div>
    </Container>
  );
}
