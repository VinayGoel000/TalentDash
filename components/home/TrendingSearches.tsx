import Link from 'next/link';

type TrendingSearchesProps = {
  items: { label: string; query: string; destination?: string }[];
};

export function TrendingSearches({ items }: TrendingSearchesProps) {
  if (items.length === 0) return null;

  return (
    <div className="mx-auto mt-6 flex max-w-5xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#717171]">
        <svg
          aria-hidden="true"
          className="h-3.5 w-3.5 text-[#FF5A5F]"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 2.5c1.4 2 3.5 3.4 3.5 6a3.5 3.5 0 1 1-7 0c0-1.5.8-2.6 1.6-3.4.3.7.9 1.2 1.4 1.4-.2-1.4.2-2.7.5-4Z" />
        </svg>
        Trending
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {items.map((item) => {
          const href = item.destination ?? `/salaries?search=${encodeURIComponent(item.query)}`;
          return (
            <Link
              key={item.label}
              href={href}
              className="inline-flex items-center rounded-full border border-[#EBEBEB] bg-white px-3 py-1.5 text-xs font-medium text-[#484848] transition hover:border-[#FF5A5F]/40 hover:bg-[#FFF1F1] hover:text-[#FF5A5F] sm:text-sm"
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
