import Link from 'next/link';
import { Container } from '@/components/ui/container';

const stats = [
  { label: 'Companies', value: '12+' },
  { label: 'Salary Records', value: '60+' },
  { label: 'Locations', value: '7' },
];

export default function HomePage() {
  return (
    <Container className="py-8 sm:py-10">
      <section className="space-y-8">
        <div className="rounded-xl bg-red-500 p-8 text-white shadow-lg">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90">Tailwind test</p>
              <h2 className="text-2xl font-bold">Utilities are rendering correctly</h2>
              <p className="max-w-2xl text-sm leading-6 text-white/90">
                This block intentionally uses `bg-red-500`, `p-8`, `rounded-xl`, `grid`, and `flex` to verify the
                styling pipeline.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-full bg-white/15 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-white" />
              <span className="text-sm font-medium">Live Tailwind check</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#717171]">Salary Intelligence Platform</p>
          <h1 className="text-4xl font-bold tracking-tight text-[#222222] sm:text-[36px] sm:leading-[1.1]">
            TalentDash
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[#484848]">
            Explore company compensation data with a clean, fast interface built for trustworthy career research.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-sm">
              <div className="text-sm font-medium text-[#717171]">{stat.label}</div>
              <div className="mt-2 text-3xl font-bold tracking-tight text-[#222222]">{stat.value}</div>
            </div>
          ))}
        </div>

        <div>
          <Link
            href="/salaries"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#FF5A5F] px-5 py-3 text-sm font-medium text-white transition hover:brightness-95"
          >
            Browse Salaries
          </Link>
        </div>
      </section>
    </Container>
  );
}
