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
