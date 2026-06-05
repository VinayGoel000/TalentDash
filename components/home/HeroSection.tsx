import { Container } from '@/components/ui/container';
import { SearchPanel } from '@/components/home/SearchPanel';
import { TrendingSearches } from '@/components/home/TrendingSearches';

type HeroSectionProps = {
  locations: string[];
  trending: { label: string; query: string; destination?: string }[];
  totals: {
    salaries: number;
    companies: number;
    locations: number;
  };
};

export function HeroSection({ locations, trending, totals }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#EBEBEB] bg-[#FFF7F4]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at top right, rgba(255,90,95,0.18), transparent 55%), radial-gradient(circle at bottom left, rgba(255,180,0,0.10), transparent 50%)',
        }}
      />
      <Container className="relative py-14 sm:py-20 lg:py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FFD1D3] bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#FF5A5F] shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF5A5F]" />
            Career intelligence platform
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-[#222222] sm:text-5xl lg:text-6xl">
            Explore. Compare. Grow.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#484848] sm:text-lg">
            Real salary data, verified company reviews, structured interview experiences and an
            engaged community — everything you need to make confident career decisions, in one
            place.
          </p>

          <dl className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-[#717171] sm:text-sm">
            <div className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#008A05]" />
              <dt className="sr-only">Salary records</dt>
              <dd>
                <span className="font-semibold text-[#222222] tabular-nums">{totals.salaries.toLocaleString()}</span> verified salaries
              </dd>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
              <dt className="sr-only">Companies</dt>
              <dd>
                <span className="font-semibold text-[#222222] tabular-nums">{totals.companies.toLocaleString()}</span> companies tracked
              </dd>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FFB400]" />
              <dt className="sr-only">Locations</dt>
              <dd>
                <span className="font-semibold text-[#222222] tabular-nums">{totals.locations.toLocaleString()}</span> locations covered
              </dd>
            </div>
          </dl>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <SearchPanel locations={locations} />
        </div>

        <TrendingSearches items={trending} />
      </Container>
    </section>
  );
}
