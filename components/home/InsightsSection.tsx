import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/home/SectionHeading';
import { FeatureCard } from '@/components/home/FeatureCard';

const ICONS = {
  compensation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M3 17V5l6 6 4-4 8 8" />
      <path d="M14 15h7v-7" />
    </svg>
  ),
  reviews: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M21 12a8 8 0 0 1-12.4 6.7L3 21l1.5-4.5A8 8 0 1 1 21 12Z" />
    </svg>
  ),
  interviews: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4 21c1.6-3.6 4.6-6 8-6s6.4 2.4 8 6" />
    </svg>
  ),
  offers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M21 11.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7" />
      <path d="m16 17 3 3 5-5" />
      <path d="M7 8h10M7 12h6" />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <circle cx="9" cy="9" r="3" />
      <circle cx="17" cy="11" r="2.5" />
      <path d="M3 19c.8-3 3-5 6-5s5.2 2 6 5" />
      <path d="M15 19c.4-1.6 1.4-2.8 3-3" />
    </svg>
  ),
};

const CARDS = [
  {
    title: 'Compensation Intelligence',
    description:
      'Median pay, level distribution and total compensation breakdown across base, bonus and stock — all verified.',
    href: '/salaries',
    meta: 'Updated continuously',
    accent: 'red',
    icon: ICONS.compensation,
  },
  {
    title: 'Company Reviews & Culture',
    description:
      'Read what employees actually say about leadership, work-life balance and growth — without the marketing spin.',
    href: '/reviews',
    meta: 'Coming soon',
    accent: 'blue',
    icon: ICONS.reviews,
  },
  {
    title: 'Interview Experiences',
    description:
      'Structured loops, real questions and offer outcomes shared by candidates who interviewed at top employers.',
    href: '/interviews',
    meta: 'Coming soon',
    accent: 'violet',
    icon: ICONS.interviews,
  },
  {
    title: 'Offers & Negotiation',
    description:
      'See actual offer letters, signing bonuses and counter-offer outcomes to negotiate your next package with confidence.',
    href: '/offers',
    meta: 'Coming soon',
    accent: 'amber',
    icon: ICONS.offers,
  },
  {
    title: 'Community Discussions',
    description:
      'Talk shop with senior engineers, recruiters and operators. Get answers to the questions you can’t Google.',
    href: '/forum',
    meta: 'Join the conversation',
    accent: 'green',
    icon: ICONS.community,
  },
] as const;

export function InsightsSection() {
  return (
    <section className="bg-[#F7F7F7]">
      <Container className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="Career intelligence"
          title="Everything you need to make better career decisions"
          description="Five connected products built on the same verified data layer — compensation, culture, interviews, offers and community."
          action={{ label: 'See all products', href: '/tools' }}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <FeatureCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
              href={card.href}
              meta={card.meta}
              accent={card.accent}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
