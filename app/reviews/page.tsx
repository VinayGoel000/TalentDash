import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { FeatureCard } from '@/components/home/FeatureCard';
import { PreviewPageHero } from '@/components/home/PreviewPageHero';
import { PreviewStatGrid, type PreviewStat } from '@/components/home/PreviewStatGrid';
import { SectionHeading } from '@/components/home/SectionHeading';
import { getHomepageData } from '@/lib/db/homepage';
import {
  COMMUNITY_CONTRIBUTORS,
  COMMUNITY_THREADS,
  COMMUNITY_TOPICS,
} from '@/lib/preview-data';
import { getReviewsMetadata } from '@/lib/seo/metadata';
import { computeCompanyAverage, computeReviewRecommendRate } from '@/lib/preview-data';

export const revalidate = 3600;

export const metadata: Metadata = getReviewsMetadata();

export default async function ReviewsPage() {
  const data = await getHomepageData();
  const avgRating = computeCompanyAverage(COMMUNITY_THREADS.length > 0 ? [] : []);
  const recommendRate = computeReviewRecommendRate([]);

  const companyCount = data.counts.companies;
  const stats: PreviewStat[] = [
    {
      key: 'companies',
      label: 'Companies with reviews',
      value: companyCount.toLocaleString(),
      caption: 'Every company in the database accepts structured employee reviews.',
      accent: 'red',
    },
    {
      key: 'rating',
      label: 'Average rating',
      value: `${avgRating.toFixed(1)} / 5`,
      caption: 'Across culture, compensation, leadership, growth, balance and inclusion.',
      accent: 'blue',
    },
    {
      key: 'recommend',
      label: 'Recommend rate',
      value: `${recommendRate}%`,
      caption: 'Percentage of reviewers who would recommend their company to a friend.',
      accent: 'green',
    },
    {
      key: 'tags',
      label: 'Topic tags',
      value: '120+',
      caption: 'Reviews are tagged across role, location, tenure and sentiment dimensions.',
      accent: 'amber',
    },
  ];

  return (
    <>
      <PreviewPageHero
        eyebrow="Reviews"
        title="Honest, structured employee reviews"
        description="Filter reviews by company, role, location and tenure. Every review is moderated and tagged with structured ratings across culture, leadership, compensation and growth."
        badges={['Real submissions', 'Moderated', 'Sentiment-tagged']}
        actions={[
          { label: 'Browse all reviews', href: '#reviews' },
          { label: 'Submit your review', href: '/forum', variant: 'secondary' },
        ]}
        meta="Updated daily by the TalentDash editorial team"
      />
      <PreviewStatGrid stats={stats} />

      <Container className="py-4 sm:py-6">
        <div id="reviews">
          <SectionHeading
            eyebrow="Featured reviews"
            title="Recent employee reviews"
            description="A snapshot of the latest structured reviews from across our top companies."
          />
        </div>
      </Container>

      <div className="border-y border-[#EBEBEB] bg-white">
        <Container className="pb-4 sm:pb-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {COMMUNITY_THREADS.slice(0, 4).map((thread) => (
              <div
                key={thread.id}
                className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-[#FFEFEF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#FF5A5F]">
                    {thread.category}
                  </span>
                  <span className="text-xs text-[#717171]">{thread.postedAgo}</span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-[#222222] sm:text-lg">
                  {thread.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#484848]">{thread.excerpt}</p>
                <div className="mt-4 flex items-center justify-between border-t border-[#F2F2F2] pt-3 text-xs text-[#717171]">
                  <span>
                    {thread.authorRole} at {thread.authorCompany}
                  </span>
                  <span>
                    {thread.replies} replies · {thread.views.toLocaleString()} views
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Topic coverage"
            title="Topics members discuss the most"
            description="Use these topics to jump straight into the conversations that matter to your decision."
            action={{ label: 'Open community', href: '/forum' }}
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {COMMUNITY_TOPICS.map((topic) => (
              <div
                key={topic.id}
                className="flex items-center justify-between rounded-2xl border border-[#EBEBEB] bg-white p-4"
              >
                <span className="text-sm font-semibold text-[#222222]">#{topic.label}</span>
                <span className="text-xs font-medium text-[#717171]">
                  {topic.threads.toLocaleString()} threads
                </span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div className="border-b border-[#EBEBEB] bg-[#FAFAFA]">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="Contributors"
            title="Active reviewers this week"
            description="Recognising the contributors shaping the conversation."
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {COMMUNITY_CONTRIBUTORS.slice(0, 6).map((contributor) => (
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
                <span className="text-xs font-semibold text-[#FF5A5F] tabular-nums">
                  {contributor.reputation.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="What you'll find"
            title="Designed for confident career decisions"
            description="Every review surface on TalentDash is structured, comparable, and easy to filter."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              accent="red"
              title="Structured ratings"
              description="Score companies across six categories: culture, compensation, leadership, growth, balance and inclusion."
              meta="6 dimensions"
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
                  <path d="m12 3 2.7 5.5L21 9.5l-4.5 4.4L17.8 21 12 17.8 6.2 21l1.3-7.1L3 9.5l6.3-1Z" />
                </svg>
              }
            />
            <FeatureCard
              accent="blue"
              title="Sentiment analysis"
              description="Auto-tagged pros, cons and themes so you can scan thousands of reviews in seconds."
              meta="NLP enriched"
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
                  <path d="M3 12h4l3-8 4 16 3-8h4" />
                </svg>
              }
            />
            <FeatureCard
              accent="green"
              title="Filter & compare"
              description="Slice reviews by role, level, location and tenure. Compare two companies side-by-side."
              meta="Deep filters"
              href="/compare"
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
                  <path d="M3 6h13M3 12h9M3 18h5" />
                  <path d="M19 8v12M14 14h10" />
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
              Share what it's really like
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-[#484848] sm:text-base">
              Anonymously contribute a structured review and help the next candidate make a
              better-informed decision.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/forum"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#FF5A5F] px-5 text-sm font-semibold text-white transition hover:bg-[#e14d52]"
              >
                Submit a review
              </a>
              <a
                href="/companies"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-[#EBEBEB] bg-white px-5 text-sm font-semibold text-[#222222] transition hover:bg-[#F2F2F2]"
              >
                Browse companies
              </a>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
