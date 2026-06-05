import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/home/SectionHeading';

type Category = {
  title: string;
  href: string;
  description: string;
  cta: string;
  accent: string;
  icon: React.ReactNode;
};

const CATEGORIES: Category[] = [
  {
    title: 'Salaries',
    href: '/salaries',
    description: 'Filter verified compensation by company, role, level and location.',
    cta: 'Browse salaries',
    accent: 'bg-[#FFEFEF] text-[#FF5A5F]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M7 12h.01M17 12h.01" />
      </svg>
    ),
  },
  {
    title: 'Reviews',
    href: '/reviews',
    description: 'Read honest reviews about culture, leadership and growth.',
    cta: 'Read reviews',
    accent: 'bg-[#EEF4FF] text-[#2563EB]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="m12 3 2.7 5.5L21 9.5l-4.5 4.4L17.8 21 12 17.8 6.2 21l1.3-7.1L3 9.5l6.3-1Z" />
      </svg>
    ),
  },
  {
    title: 'Interviews',
    href: '/interviews',
    description: 'Real interview loops, questions and outcomes from candidates.',
    cta: 'View interviews',
    accent: 'bg-[#F0EBFE] text-[#6D3FD8]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M4 5h16v11H7l-3 3Z" />
        <path d="M8 10h8M8 13h5" />
      </svg>
    ),
  },
  {
    title: 'Jobs',
    href: '/jobs',
    description: 'Active openings curated from top hiring companies.',
    cta: 'Find jobs',
    accent: 'bg-[#E8F8EC] text-[#008A05]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
      </svg>
    ),
  },
  {
    title: 'Offers',
    href: '/offers',
    description: 'Compare real offer letters across companies and levels.',
    cta: 'Explore offers',
    accent: 'bg-[#FFF5DC] text-[#B26B00]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M5 4h11l4 4v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
        <path d="M15 4v4h4" />
        <path d="M8 14h8M8 17h5" />
      </svg>
    ),
  },
  {
    title: 'Community',
    href: '/forum',
    description: 'Ask, answer and connect with the broader career community.',
    cta: 'Join community',
    accent: 'bg-[#F2F2F2] text-[#484848]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="9" cy="9" r="3" />
        <circle cx="17" cy="11" r="2.5" />
        <path d="M3 19c.8-3 3-5 6-5s5.2 2 6 5" />
        <path d="M15 19c.4-1.6 1.4-2.8 3-3" />
      </svg>
    ),
  },
];

export function ExploreCategoriesSection() {
  return (
    <section className="border-y border-[#EBEBEB] bg-white">
      <Container className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="Explore by category"
          title="Pick the lens that matches your decision"
          description="Whether you’re comparing offers, prepping interviews or evaluating culture — start from the surface that fits."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group flex h-full items-start gap-4 rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#FF5A5F]/40 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${category.accent}`}>
                {category.icon}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <h3 className="text-base font-semibold text-[#222222] sm:text-lg">{category.title}</h3>
                <p className="text-sm leading-6 text-[#717171]">{category.description}</p>
                <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-[#FF5A5F]">
                  {category.cta}
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8h10" />
                    <path d="M9 4l4 4-4 4" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
