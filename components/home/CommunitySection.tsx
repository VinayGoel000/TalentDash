import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/home/SectionHeading';
import { formatCompensation } from '@/lib/formatters';
import type { CompanyIndexEntry } from '@/lib/company-stats';
import type { SalaryRecord } from '@/types/salary';

type CommunitySectionProps = {
  recentSalaries: SalaryRecord[];
  topCompanies: CompanyIndexEntry[];
  topRoles: { role: string; sampleSize: number }[];
};

function timeAgo(iso: string) {
  const submitted = new Date(iso).getTime();
  if (Number.isNaN(submitted)) return 'recent';
  const diff = Date.now() - submitted;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return 'today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months === 1) return '1 month ago';
  if (months < 12) return `${months} months ago`;
  const years = Math.floor(months / 12);
  return years === 1 ? '1 year ago' : `${years} years ago`;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function CommunitySection({ recentSalaries, topCompanies, topRoles }: CommunitySectionProps) {
  const discussions = recentSalaries.slice(0, 5);
  const topics = topCompanies.slice(0, 8);
  const contributors = topCompanies.slice(0, 6);

  return (
    <section className="bg-[#F7F7F7]">
      <Container className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="Community"
          title="Built by candidates, contributors and operators"
          description="Every salary, review and interview comes from the people who lived it. Browse what the community is talking about right now."
          action={{ label: 'Visit the forum', href: '/forum' }}
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="flex flex-col rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
            <header className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#222222] sm:text-lg">Trending discussions</h3>
              <Link href="/forum" className="text-xs font-semibold text-[#FF5A5F] hover:text-[#e14d52]">
                View all
              </Link>
            </header>
            <ul className="mt-4 divide-y divide-[#F2F2F2]">
              {discussions.length === 0 ? (
                <li className="py-4 text-sm text-[#717171]">
                  Submissions will appear here once your community starts contributing.
                </li>
              ) : (
                discussions.map((entry) => (
                  <li key={entry.id} className="py-3 first:pt-0 last:pb-0">
                    <Link
                      href={`/companies/${entry.company_slug}`}
                      className="group block"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-sm font-semibold text-[#222222] group-hover:text-[#FF5A5F]">
                          {entry.role} @ {entry.company}
                        </p>
                        <span className="shrink-0 text-xs font-medium text-[#717171]">
                          {timeAgo(entry.submitted_at)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#717171]">
                        {entry.location} · {entry.level_standardized.replace(/_/g, ' ')} ·{' '}
                        <span className="font-semibold tabular-nums text-[#484848]">
                          {formatCompensation(entry.total_compensation, entry.currency)}
                        </span>
                      </p>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </article>

          <article className="flex flex-col rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
            <header className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#222222] sm:text-lg">Popular topics</h3>
              <Link href="/companies" className="text-xs font-semibold text-[#FF5A5F] hover:text-[#e14d52]">
                Browse all
              </Link>
            </header>
            <p className="mt-1 text-xs text-[#717171]">
              The companies and roles members are exploring most this week.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {topics.map((company) => (
                <Link
                  key={company.slug}
                  href={`/companies/${company.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#EBEBEB] bg-[#F7F7F7] px-3 py-1.5 text-xs font-medium text-[#484848] transition hover:border-[#FF5A5F]/40 hover:bg-[#FFF1F1] hover:text-[#FF5A5F]"
                >
                  <span className="font-semibold text-[#222222]">{company.name}</span>
                  <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-[#717171]">
                    {company.recordCount}
                  </span>
                </Link>
              ))}
              {topRoles.map((entry) => (
                <Link
                  key={entry.role}
                  href={`/salaries?search=${encodeURIComponent(entry.role)}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#EBEBEB] bg-white px-3 py-1.5 text-xs font-medium text-[#484848] transition hover:border-[#FF5A5F]/40 hover:bg-[#FFF1F1] hover:text-[#FF5A5F]"
                >
                  <span className="text-[#FF5A5F]">#</span>
                  {entry.role}
                </Link>
              ))}
            </div>
          </article>

          <article className="flex flex-col rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
            <header className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#222222] sm:text-lg">Top contributors</h3>
              <Link href="/companies" className="text-xs font-semibold text-[#FF5A5F] hover:text-[#e14d52]">
                See all
              </Link>
            </header>
            <p className="mt-1 text-xs text-[#717171]">
              Communities driving the most data submissions on TalentDash.
            </p>
            <ul className="mt-4 space-y-3">
              {contributors.map((company, index) => (
                <li key={company.slug}>
                  <Link
                    href={`/companies/${company.slug}`}
                    className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-[#F7F7F7]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F2F2F2] text-xs font-bold tracking-wider text-[#484848]">
                      {initials(company.name)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#222222] group-hover:text-[#FF5A5F]">
                        {company.name}
                      </p>
                      <p className="text-xs text-[#717171]">
                        {company.primaryLocation || 'Distributed'} · {company.recordCount} submissions
                      </p>
                    </div>
                    <span className="shrink-0 text-xs font-semibold tabular-nums text-[#717171]">
                      #{index + 1}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Container>
    </section>
  );
}
