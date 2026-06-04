import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

type HeroProps = {
  totalRecords: number;
  verifiedCount: number;
  averageCompensation: string;
};

export function Hero({ totalRecords, verifiedCount, averageCompensation }: HeroProps) {
  return (
    <section className="grid gap-6 rounded-[28px] border border-[#EBEBEB] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#717171]">
          <span className="rounded-full border border-[#EBEBEB] bg-white px-3 py-1">Salary Intelligence Platform</span>
          <span className="rounded-full border border-[#EBEBEB] bg-white px-3 py-1">{totalRecords.toLocaleString()}+ records</span>
          <span className="rounded-full border border-[#EBEBEB] bg-white px-3 py-1">{verifiedCount.toLocaleString()} verified</span>
        </div>

        <div className="space-y-4">
          <h1 className="max-w-3xl text-[36px] font-bold leading-[1.08] tracking-tight text-[#222222] sm:text-[44px] lg:text-[56px]">
            Make Better Career Decisions With Compensation Data
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[#484848] sm:text-lg">
            TalentDash gives you a modern, trusted way to compare salaries, understand companies, and evaluate your next move with confidence.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href="/salaries">Browse Salaries</Button>
          <Button href="/companies" variant="secondary">
            Explore Companies
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: 'Companies', value: '12+' },
            { label: 'Salary Records', value: `${Math.max(totalRecords, 57)}+` },
            { label: 'Verified Rate', value: `${totalRecords > 0 ? Math.round((verifiedCount / totalRecords) * 100) : 95}%` },
          ].map((item) => (
            <Card key={item.label} className="p-4">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#717171]">{item.label}</div>
              <div className="mt-2 text-[28px] font-bold tracking-tight text-[#222222]">{item.value}</div>
            </Card>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-[#EBEBEB] bg-[#F7F7F7] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#717171]">Market snapshot</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#222222]">Current salary pulse</h2>
          </div>
          <div className="rounded-full bg-[rgba(0,138,5,0.1)] px-3 py-2 text-xs font-semibold text-[#008A05]">Live data</div>
        </div>

        <Card className="mt-6 p-4">
          <div className="text-sm font-medium text-[#717171]">Featured records</div>
          <div className="mt-2 text-[32px] font-bold tracking-tight text-[#222222]">{averageCompensation}</div>
        </Card>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Card className="p-4">
            <div className="text-xs font-medium uppercase tracking-[0.16em] text-[#717171]">Trust signal</div>
            <div className="mt-2 text-lg font-semibold text-[#222222]">Verified company data</div>
          </Card>
          <Card className="p-4">
            <div className="text-xs font-medium uppercase tracking-[0.16em] text-[#717171]">Primary CTA</div>
            <Link href="/salaries" className="mt-2 inline-flex text-lg font-semibold text-[#FF5A5F] hover:underline">
              Browse salaries
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
