import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/home/SectionHeading';
import {
  COMMUNITY_CONTRIBUTORS,
  COMMUNITY_THREADS,
  COMMUNITY_TOPICS,
} from '@/lib/preview-data';

const AVATAR_PALETTE: Array<{ bg: string; text: string }> = [
  { bg: 'bg-[#FFEFEF]', text: 'text-[#FF5A5F]' },
  { bg: 'bg-[#EEF4FF]', text: 'text-[#2563EB]' },
  { bg: 'bg-[#E8F8EC]', text: 'text-[#008A05]' },
  { bg: 'bg-[#FFF5DC]', text: 'text-[#B26B00]' },
  { bg: 'bg-[#F0EBFE]', text: 'text-[#6D3FD8]' },
];

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function safeNumber(value: number | null | undefined): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

export function CommunityPreview() {
  return (
    <section className="border-b border-[#EBEBEB] bg-white">
      <Container className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="Community"
          title="Trending discussions, popular topics and top contributors"
          description="The most active signals from the TalentDash community this week."
          action={{ label: 'Open the community', href: '/forum' }}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#222222]">Trending discussions</h3>
              <span className="rounded-full bg-[#FFEFEF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#FF5A5F]">
                Live
              </span>
            </div>
            <ul className="mt-4 flex flex-col divide-y divide-[#F2F2F2]">
              {COMMUNITY_THREADS.slice(0, 5).map((thread) => (
                <li key={thread.id} className="py-3 first:pt-0 last:pb-0">
                  <Link
                    href={`/forum#${thread.id}`}
                    className="group flex items-start gap-3 text-sm font-medium text-[#222222] hover:text-[#FF5A5F]"
                  >
                    <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#FFEFEF] text-[10px] font-bold uppercase tracking-wider text-[#FF5A5F]">
                      {thread.category.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate group-hover:text-[#FF5A5F]">{thread.title}</span>
                      <span className="mt-0.5 text-xs font-normal text-[#717171]">
                        {thread.authorRole} at {thread.authorCompany} ·{' '}
                        {safeNumber(thread.replies)} replies · {thread.postedAgo}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#222222]">Popular topics</h3>
              <Link
                href="/forum"
                className="text-xs font-semibold text-[#FF5A5F] hover:text-[#e14d52]"
              >
                View all
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {COMMUNITY_TOPICS.map((topic) => (
                <Link
                  key={topic.id}
                  href={`/forum?topic=${topic.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#EBEBEB] bg-white px-3 py-1.5 text-xs font-medium text-[#484848] transition hover:border-[#FF5A5F]/40 hover:text-[#FF5A5F]"
                >
                  <span aria-hidden="true">#</span>
                  {topic.label}
                  <span className="rounded-full bg-[#F2F2F2] px-1.5 py-0.5 text-[10px] font-semibold text-[#717171]">
                    {safeNumber(topic.threads).toLocaleString()}
                  </span>
                </Link>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-[#717171]">
              Topics are ranked by reply velocity and upvotes over the last 7 days.
            </p>
          </div>

          <div className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#222222]">Top contributors</h3>
              <span className="text-xs font-medium text-[#717171]">This week</span>
            </div>
            <ul className="mt-4 flex flex-col divide-y divide-[#F2F2F2]">
              {COMMUNITY_CONTRIBUTORS.map((contributor, index) => {
                const palette = AVATAR_PALETTE[index % AVATAR_PALETTE.length];
                return (
                  <li
                    key={contributor.name}
                    className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${palette.bg} ${palette.text}`}
                      aria-hidden="true"
                    >
                      {initials(contributor.name)}
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm font-semibold text-[#222222]">
                        {contributor.name}
                      </span>
                      <span className="truncate text-xs text-[#717171]">{contributor.title}</span>
                    </div>
                    <div className="text-right text-xs text-[#717171]">
                      <div className="font-semibold text-[#222222] tabular-nums">
                        {safeNumber(contributor.reputation).toLocaleString()}
                      </div>
                      <div>points</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
