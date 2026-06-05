import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/home/SectionHeading';
import { COMPANY_REVIEWS, REVIEW_CATEGORIES } from '@/lib/preview-data';

function StarRow({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 ${index < full ? 'fill-[#FFB400] text-[#FFB400]' : 'fill-[#EBEBEB] text-[#EBEBEB]'}`}
        >
          <path d="m12 3 2.7 5.5L21 9.5l-4.5 4.4L17.8 21 12 17.8 6.2 21l1.3-7.1L3 9.5l6.3-1Z" />
        </svg>
      ))}
    </div>
  );
}

function CategoryIcon({ index }: { index: number }) {
  const icons = [
    <path
      key="cat-1"
      d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />,
    <path
      key="cat-2"
      d="M3 17l5-6 4 4 7-9M14 6h5v5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />,
    <path
      key="cat-3"
      d="M12 3 4 6v6c0 4.4 3.2 8 8 9 4.8-1 8-4.6 8-9V6ZM9 12l2 2 4-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />,
    <path
      key="cat-4"
      d="M5 19l4-4 4 3 6-7M14 11h6v6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />,
    <path
      key="cat-5"
      d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />,
    <path
      key="cat-6"
      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.9M16 3.1A4 4 0 0 1 16 11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />,
  ];
  return <svg viewBox="0 0 24 24">{icons[index % icons.length]}</svg>;
}

const CATEGORY_ACCENT: Array<{ bg: string; text: string }> = [
  { bg: 'bg-[#FFEFEF]', text: 'text-[#FF5A5F]' },
  { bg: 'bg-[#EEF4FF]', text: 'text-[#2563EB]' },
  { bg: 'bg-[#E8F8EC]', text: 'text-[#008A05]' },
  { bg: 'bg-[#FFF5DC]', text: 'text-[#B26B00]' },
  { bg: 'bg-[#F0EBFE]', text: 'text-[#6D3FD8]' },
  { bg: 'bg-[#F2F2F2]', text: 'text-[#484848]' },
];

export function ReviewsPreview() {
  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="What employees are saying"
        title="Filter reviews by company, role and location"
        description="Reviews are moderated, structured, and tagged with sentiment to make the signal easy to scan."
        action={{ label: 'Browse all reviews', href: '/reviews' }}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEW_CATEGORIES.map((category, index) => {
          const palette = CATEGORY_ACCENT[index % CATEGORY_ACCENT.length];
          return (
            <div
              key={category.id}
              className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${palette.bg} ${palette.text}`}
                  aria-hidden="true"
                >
                  <span className="h-5 w-5">
                    <CategoryIcon index={index} />
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[#222222]">{category.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#717171]">{category.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-[#F2F2F2] pt-3 text-sm">
                <StarRow rating={category.rating} />
                <span className="font-semibold text-[#222222] tabular-nums">
                  {category.rating.toFixed(1)} / 5
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold text-[#222222] sm:text-xl">Featured company reviews</h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {COMPANY_REVIEWS.slice(0, 4).map((review) => (
            <Link
              key={review.id}
              href={`/companies/${review.companySlug}`}
              className="group flex h-full flex-col gap-4 rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#FF5A5F]/40 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#222222] group-hover:text-[#FF5A5F]">
                    {review.company}
                  </span>
                  <span className="text-xs text-[#717171]">
                    {review.position} · {review.location}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-lg font-bold tabular-nums text-[#222222]">
                    {review.rating.toFixed(1)}
                  </span>
                  <StarRow rating={review.rating} />
                </div>
              </div>
              <div className="grid gap-3 text-sm leading-6 text-[#484848] sm:grid-cols-2">
                <div className="rounded-lg bg-[#F8FDF9] p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#008A05]">
                    Pros
                  </div>
                  <p className="mt-1 text-[#222222]">{review.pros}</p>
                </div>
                <div className="rounded-lg bg-[#FFF7F5] p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#FF5A5F]">
                    Cons
                  </div>
                  <p className="mt-1 text-[#222222]">{review.cons}</p>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-[#F2F2F2] pt-3 text-xs font-medium text-[#717171]">
                <span>
                  {review.recommend ? (
                    <span className="inline-flex items-center gap-1 text-[#008A05]">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#008A05]" />
                      Recommends
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[#FF5A5F]">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF5A5F]" />
                      Does not recommend
                    </span>
                  )}
                </span>
                <span>{review.postedAgo}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
