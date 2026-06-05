import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { FeatureCard } from '@/components/home/FeatureCard';
import { InterviewPreview } from '@/components/home/InterviewPreview';
import { PreviewPageHero } from '@/components/home/PreviewPageHero';
import { PreviewStatGrid, type PreviewStat } from '@/components/home/PreviewStatGrid';
import { SectionHeading } from '@/components/home/SectionHeading';
import { INTERVIEW_EXPERIENCES, INTERVIEW_TOPICS } from '@/lib/preview-data';
import { getInterviewsMetadata } from '@/lib/seo/metadata';

export const revalidate = 3600;

export const metadata: Metadata = getInterviewsMetadata();

const OFFER_RATE = (() => {
  const offered = INTERVIEW_EXPERIENCES.filter((entry) => entry.outcome === 'Offer').length;
  return Math.round((offered / INTERVIEW_EXPERIENCES.length) * 100);
})();

export default function InterviewsPage() {
  const stats: PreviewStat[] = [
    {
      key: 'reports',
      label: 'Reports published',
      value: INTERVIEW_TOPICS.reduce((sum, topic) => sum + topic.reports, 0).toLocaleString(),
      caption: 'Structured candidate reports across all major companies and roles.',
      accent: 'red',
    },
    {
      key: 'topics',
      label: 'Topic coverage',
      value: INTERVIEW_TOPICS.length.toString(),
      caption: 'DSA, system design, ML design, behavioural, product sense, take-homes.',
      accent: 'blue',
    },
    {
      key: 'offer-rate',
      label: 'Offer rate',
      value: `${OFFER_RATE}%`,
      caption: 'Percentage of recent reports that ended in a written offer.',
      accent: 'green',
    },
    {
      key: 'avg-rounds',
      label: 'Average rounds',
      value: (() => {
        const avg =
          INTERVIEW_EXPERIENCES.reduce((sum, entry) => sum + entry.rounds, 0) /
          INTERVIEW_EXPERIENCES.length;
        return avg.toFixed(1);
      })(),
      caption: 'Across all on-site, virtual and hybrid loops on record.',
      accent: 'amber',
    },
  ];

  return (
    <>
      <PreviewPageHero
        eyebrow="Interviews"
        title="Real interview loops, real outcomes"
        description="Browse structured candidate reports covering rounds, difficulty, questions and offer outcomes across the top companies. Use the playbooks that have actually worked."
        badges={['Difficulty rated', 'Outcome tracked', 'Question banks']}
        actions={[
          { label: 'Browse all reports', href: '#reports' },
          { label: 'Share your loop', href: '/forum', variant: 'secondary' },
        ]}
        meta="Refreshed weekly from anonymised candidate submissions"
      />
      <PreviewStatGrid stats={stats} />

      <div id="reports" />

      <InterviewPreview />

      <div className="border-b border-[#EBEBEB] bg-white">
        <Container className="py-12 sm:py-16">
          <SectionHeading
            eyebrow="What you'll find"
            title="Everything you need to prep, in one surface"
            description="Filter by company, role, level, and difficulty. Track your prep against the most-asked questions."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              accent="red"
              title="Loop breakdowns"
              description="Number of rounds, who you meet, what each round evaluates, and how long the loop runs."
              meta="Per round"
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
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              }
            />
            <FeatureCard
              accent="blue"
              title="Question banks"
              description="Most-asked coding, system design and behavioural questions, sorted by company and recency."
              meta="500+ questions"
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
                  <path d="M4 5h16v11H7l-3 3Z" />
                  <path d="M8 10h8M8 13h5" />
                </svg>
              }
            />
            <FeatureCard
              accent="violet"
              title="Outcome tracking"
              description="See how the same company interviews differ by role, level, and recruiter — and the offer rates."
              meta="Outcome data"
              href="/salaries"
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
                  <path d="M3 17l5-6 4 4 7-9" />
                  <path d="M14 6h5v5" />
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
              Prep smarter with real reports
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-[#484848] sm:text-base">
              Sign in to save reports, build prep plans, and follow companies that match your
              target loop.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/forum"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#FF5A5F] px-5 text-sm font-semibold text-white transition hover:bg-[#e14d52]"
              >
                Share your interview
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
