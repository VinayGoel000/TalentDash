import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { FeatureCard } from '@/components/home/FeatureCard';
import { PreviewPageHero } from '@/components/home/PreviewPageHero';
import { PreviewStatGrid, type PreviewStat } from '@/components/home/PreviewStatGrid';
import { SectionHeading } from '@/components/home/SectionHeading';
import {
  COMMUNITY_CONTRIBUTORS,
  COMMUNITY_THREADS,
  COMMUNITY_TOPICS,
} from '@/lib/preview-data';
import { getForumMetadata } from '@/lib/seo/metadata';

export const revalidate = 3600;

export const metadata: Metadata = getForumMetadata();

export default function ForumPage() {
  const stats: PreviewStat[] = [
    {
      key: 'threads',
      label: 'Active threads',
      value: COMMUNITY_THREADS.length.toString(),
      caption: 'Trending threads on the homepage today.',
      accent: 'red',
    },
    {
      key: 'replies',
      label: 'Replies this week',
      value: COMMUNITY_THREADS.reduce((sum, thread) => sum + thread.replies, 0).toLocaleString(),
      caption: 'Members answering each other’s career questions.',
      accent: 'blue',
    },
    {
      key: 'topics',
      label: 'Topic tags',
      value: COMMUNITY_TOPICS.length.toString(),
      caption: 'From salaries to remote work to promotion tactics.',
      accent: 'green',
    },
    {
      key: 'contributors',
      label: 'Active contributors',
      value: COMMUNITY_CONTRIBUTORS.length.toString(),
      caption: 'Members recognised for high-quality contributions.',
      accent: 'amber',
    },
  ];

  return (
    <>
      <PreviewPageHero
        eyebrow="Community"
        title="Ask, answer, and grow with the TalentDash community"
        description="Discuss salaries, promotions, interviews, remote work and career growth. The community is moderated, structured, and free of recruiter spam."
        badges={['Moderated', 'No recruiter spam', 'Anonymous-friendly']}
        actions={[
          { label: 'Browse all threads', href: '#threads' },
          { label: 'Start a discussion', href: '/forum', variant: 'secondary' },
        ]}
        meta="Backed by a moderation team of senior ICs and hiring managers"
      />
      <PreviewStatGrid stats={stats} />

      <div id="threads" />

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Trending threads"
            title="What the community is talking about"
            description="Threads ranked by reply velocity and upvotes over the last seven days."
            action={{ label: 'View all', href: '/forum' }}
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {COMMUNITY_THREADS.map((thread) => (
              <Link
                key={thread.id}
                href={`/forum#${thread.id}`}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#FF5A5F]/40 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-[#FFEFEF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#FF5A5F]">
                    {thread.category}
                  </span>
                  <span className="text-xs text-[#717171]">{thread.postedAgo}</span>
                </div>
                <h3 className="text-base font-semibold text-[#222222] group-hover:text-[#FF5A5F] sm:text-lg">
                  {thread.title}
                </h3>
                <p className="text-sm leading-6 text-[#484848]">{thread.excerpt}</p>
                <div className="mt-auto flex items-center justify-between border-t border-[#F2F2F2] pt-3 text-xs text-[#717171]">
                  <span>
                    {thread.authorRole} at {thread.authorCompany}
                  </span>
                  <span>
                    {thread.replies} replies · {thread.views.toLocaleString()} views
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </div>

      <div className="border-b border-[#EBEBEB] bg-[#FAFAFA]">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Topic tags"
            title="Pick a topic to dive in"
            description="Filter threads by the topic that matches the decision you’re making right now."
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {COMMUNITY_TOPICS.map((topic) => (
              <Link
                key={topic.id}
                href={`/forum?topic=${topic.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#EBEBEB] bg-white px-3 py-1.5 text-sm font-medium text-[#222222] transition hover:border-[#FF5A5F]/40 hover:text-[#FF5A5F]"
              >
                <span aria-hidden="true">#</span>
                {topic.label}
                <span className="rounded-full bg-[#F2F2F2] px-1.5 py-0.5 text-[10px] font-semibold text-[#717171]">
                  {topic.threads.toLocaleString()}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </div>

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Top contributors"
            title="Members shaping the conversation"
            description="Recognition for the contributors with the most impactful answers and posts this week."
            action={{ label: 'See leaderboard', href: '/forum' }}
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {COMMUNITY_CONTRIBUTORS.map((contributor) => (
              <div
                key={contributor.id}
                className="flex items-center gap-3 rounded-2xl border border-[#EBEBEB] bg-white p-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFEFEF] text-sm font-bold text-[#FF5A5F]">
                  {contributor.name
                    .split(' ')
                    .map((p) => p[0])
                    .join('')}
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-semibold text-[#222222]">
                    {contributor.name}
                  </span>
                  <span className="truncate text-xs text-[#717171]">
                    {contributor.title} at {contributor.company}
                  </span>
                </div>
                <div className="text-right text-xs text-[#717171]">
                  <div className="font-semibold text-[#222222] tabular-nums">
                    {contributor.reputation.toLocaleString()}
                  </div>
                  <div>{contributor.discussions} threads</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Community principles"
            title="How we keep the signal high"
            description="A few rules and tools that make the community useful for everyone."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              accent="red"
              title="Moderated by humans"
              description="Every reported post is reviewed by a senior IC or hiring manager. No AI-only moderation."
              meta="24-hour SLA"
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
                  <path d="m9 12 2 2 4-4" />
                </svg>
              }
            />
            <FeatureCard
              accent="blue"
              title="Anonymity by default"
              description="Share salary, offers and reviews under a handle. We never expose your identity to recruiters."
              meta="Privacy first"
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
                  <rect x="4" y="10" width="16" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 1 1 8 0v3" />
                </svg>
              }
            />
            <FeatureCard
              accent="green"
              title="Structured posts"
              description="Templates for offers, salary and interview posts make comparison painless."
              meta="Templates included"
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
                  <path d="M5 4h11l4 4v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
                  <path d="M15 4v4h4" />
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
              Join the conversation
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-[#484848] sm:text-base">
              Sign in to post, follow topics, and track the threads that match your career goals.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/forum"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#FF5A5F] px-5 text-sm font-semibold text-white transition hover:bg-[#e14d52]"
              >
                Start a thread
              </a>
              <a
                href="/salaries"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-[#EBEBEB] bg-white px-5 text-sm font-semibold text-[#222222] transition hover:bg-[#F2F2F2]"
              >
                Compare salaries
              </a>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
