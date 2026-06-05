import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/home/SectionHeading';
import { INTERVIEW_EXPERIENCES, INTERVIEW_TOPICS } from '@/lib/preview-data';

import type { InterviewExperience } from '@/lib/preview-data';

const OUTCOME_PALETTE: Record<InterviewExperience['outcome'], string> = {
  Offer: 'bg-[#E8F8EC] text-[#008A05]',
  'In progress': 'bg-[#EEF4FF] text-[#2563EB]',
  Rejected: 'bg-[#FFF5DC] text-[#B26B00]',
  Withdrawn: 'bg-[#F2F2F2] text-[#484848]',
};

const DIFFICULTY_DOT: Record<InterviewExperience['difficulty'], string> = {
  Easy: 'bg-[#008A05]',
  Medium: 'bg-[#FFB400]',
  Hard: 'bg-[#FF5A5F]',
};

export function InterviewPreview() {
  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Interview experiences"
        title="Real loops, real outcomes, real prep"
        description="Dive into structured candidate reports. See the rounds, difficulty ratings and offer outcomes for top companies."
        action={{ label: 'Browse all experiences', href: '/interviews' }}
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {INTERVIEW_TOPICS.map((topic) => (
          <Link
            key={topic.id}
            href={`/interviews?topic=${topic.id}`}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-[#EBEBEB] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#FF5A5F]/40 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0EBFE] text-[#6D3FD8]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M4 5h16v11H7l-3 3Z" />
                  <path d="M8 10h8M8 13h5" />
                </svg>
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#222222] group-hover:text-[#FF5A5F]">
                  {topic.title}
                </span>
                <span className="text-xs text-[#717171]">
                  {topic.reports.toLocaleString()} reports
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#FF5A5F]">View →</span>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold text-[#222222] sm:text-xl">
          Recent interview reports
        </h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {INTERVIEW_EXPERIENCES.slice(0, 4).map((experience) => (
            <Link
              key={experience.id}
              href={`/interviews/${experience.id}`}
              className="group flex h-full flex-col gap-4 rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#FF5A5F]/40 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#222222] group-hover:text-[#FF5A5F]">
                    {experience.company} · {experience.role}
                  </span>
                  <span className="text-xs text-[#717171]">
                    Level {experience.level} · {experience.rounds} rounds · {experience.duration}
                  </span>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                    OUTCOME_PALETTE[experience.outcome]
                  }`}
                >
                  {experience.outcome}
                </span>
              </div>
              <p className="text-sm leading-6 text-[#484848]">{experience.excerpt}</p>
              <div className="mt-auto flex items-center justify-between border-t border-[#F2F2F2] pt-3 text-xs text-[#717171]">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span
                    aria-hidden="true"
                    className={`inline-block h-1.5 w-1.5 rounded-full ${
                      DIFFICULTY_DOT[experience.difficulty]
                    }`}
                  />
                  {experience.difficulty} difficulty
                </span>
                <span>{experience.postedAgo}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
