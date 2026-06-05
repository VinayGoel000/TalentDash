export interface CommunityThread {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  replies: number;
  views: number;
  postedAgo: string;
  authorRole: string;
  authorCompany: string;
}

export interface CommunityContributor {
  id: string;
  name: string;
  title: string;
  company: string;
  discussions: number;
  reputation: number;
}

export interface CommunityTopic {
  id: string;
  label: string;
  threads: number;
  accent: 'red' | 'blue' | 'green' | 'amber' | 'violet' | 'slate';
}

export interface CompanyReview {
  id: string;
  company: string;
  companySlug: string;
  rating: number;
  pros: string;
  cons: string;
  position: string;
  location: string;
  recommend: boolean;
  postedAgo: string;
}

export interface ReviewCategory {
  id: string;
  title: string;
  description: string;
  rating: number;
}

export interface InterviewExperience {
  id: string;
  company: string;
  companySlug: string;
  role: string;
  level: string;
  outcome: 'Offer' | 'Rejected' | 'In progress' | 'Withdrawn';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rounds: number;
  duration: string;
  postedAgo: string;
  excerpt: string;
}

export interface InterviewTopic {
  id: string;
  title: string;
  reports: number;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companySlug: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  type: 'Full-time' | 'Contract' | 'Internship';
  experience: string;
  salaryRange: string;
  postedAgo: string;
  tags: string[];
}

export interface JobCategory {
  id: string;
  title: string;
  openings: number;
  accent: 'red' | 'blue' | 'green' | 'amber' | 'violet' | 'slate';
}

export interface OfferRecord {
  id: string;
  company: string;
  companySlug: string;
  role: string;
  level: string;
  base: string;
  bonus: string;
  stock: string;
  total: string;
  uplift: string;
  outcome: 'Accepted' | 'Negotiated' | 'Counter accepted';
  postedAgo: string;
}

export interface OfferResource {
  id: string;
  title: string;
  description: string;
  readingTime: string;
}

export interface BrandSpotlight {
  id: string;
  company: string;
  companySlug: string;
  tagline: string;
  industry: string;
  headcount: string;
  perks: string[];
  rating: number;
}

export interface IndustryCategory {
  id: string;
  label: string;
  companies: number;
  accent: 'red' | 'blue' | 'green' | 'amber' | 'violet' | 'slate';
}

export const COMMUNITY_THREADS: CommunityThread[] = [
  {
    id: 'thread-amazon-sde-promo',
    title: 'Amazon SDE-II → SDE-III promotion timeline — what really matters',
    category: 'Promotions',
    excerpt:
      'Tactical breakdown of LP-coverage, scope, and the calibration round. Sharing the doc I used for my packet.',
    replies: 142,
    views: 8420,
    postedAgo: '2 days ago',
    authorRole: 'SDE-III',
    authorCompany: 'Amazon',
  },
  {
    id: 'thread-google-l5-comp',
    title: 'Google L5 compensation discussion — 2026 cycle numbers',
    category: 'Salaries',
    excerpt:
      'Posting my refresh + base bump after performance review. Curious what others on L5 are seeing this year.',
    replies: 96,
    views: 6210,
    postedAgo: '3 days ago',
    authorRole: 'Software Engineer L5',
    authorCompany: 'Google',
  },
  {
    id: 'thread-remote-trends',
    title: 'Remote work trends across India — who is still fully remote?',
    category: 'Remote Work',
    excerpt:
      'Compiling a list of mid-stage startups still hiring fully remote SWE/PM roles. Drop your team if you are hiring.',
    replies: 211,
    views: 12940,
    postedAgo: '4 days ago',
    authorRole: 'Engineering Manager',
    authorCompany: 'Razorpay',
  },
  {
    id: 'thread-pm-interview',
    title: 'Product Manager interview prep — the loop I wish I had',
    category: 'Interviews',
    excerpt:
      'Structured 6-week plan covering product sense, execution, analytics, strategy and behavioural rounds.',
    replies: 78,
    views: 5310,
    postedAgo: '5 days ago',
    authorRole: 'Senior PM',
    authorCompany: 'Meta',
  },
  {
    id: 'thread-ai-engineer',
    title: 'AI Engineer salary comparison — applied research vs platform',
    category: 'Salaries',
    excerpt:
      'How comp differs between modelling, infra and product-facing AI teams. Including refresh cadence.',
    replies: 64,
    views: 4720,
    postedAgo: '6 days ago',
    authorRole: 'Applied Scientist',
    authorCompany: 'NVIDIA',
  },
  {
    id: 'thread-pip-recovery',
    title: 'Recovered from a soft-PIP — what I changed in 90 days',
    category: 'Career Growth',
    excerpt:
      'No drama, just the operating system I used: weekly demos, scoped wins, and over-communicating with my skip.',
    replies: 53,
    views: 3980,
    postedAgo: '1 week ago',
    authorRole: 'Backend Engineer',
    authorCompany: 'Flipkart',
  },
];

export const COMMUNITY_TOPICS: CommunityTopic[] = [
  { id: 'topic-salaries', label: 'Salaries', threads: 1248, accent: 'red' },
  { id: 'topic-promotions', label: 'Promotions', threads: 612, accent: 'amber' },
  { id: 'topic-career-growth', label: 'Career Growth', threads: 894, accent: 'green' },
  { id: 'topic-interviews', label: 'Interviews', threads: 1132, accent: 'blue' },
  { id: 'topic-remote-work', label: 'Remote Work', threads: 487, accent: 'violet' },
  { id: 'topic-startups', label: 'Startups', threads: 356, accent: 'slate' },
];

export const COMMUNITY_CONTRIBUTORS: CommunityContributor[] = [
  {
    id: 'contrib-1',
    name: 'A. Sharma',
    title: 'Staff Engineer',
    company: 'Google',
    discussions: 184,
    reputation: 12480,
  },
  {
    id: 'contrib-2',
    name: 'R. Mehta',
    title: 'Senior PM',
    company: 'Meta',
    discussions: 142,
    reputation: 10210,
  },
  {
    id: 'contrib-3',
    name: 'S. Iyer',
    title: 'Engineering Manager',
    company: 'Razorpay',
    discussions: 121,
    reputation: 9340,
  },
  {
    id: 'contrib-4',
    name: 'P. Banerjee',
    title: 'Applied Scientist',
    company: 'NVIDIA',
    discussions: 109,
    reputation: 8620,
  },
  {
    id: 'contrib-5',
    name: 'K. Nair',
    title: 'Principal Engineer',
    company: 'Amazon',
    discussions: 96,
    reputation: 7890,
  },
  {
    id: 'contrib-6',
    name: 'V. Khanna',
    title: 'Product Lead',
    company: 'Flipkart',
    discussions: 88,
    reputation: 7120,
  },
];

export const REVIEW_CATEGORIES: ReviewCategory[] = [
  {
    id: 'cat-culture',
    title: 'Culture & values',
    description: 'How teams collaborate, communicate and treat each other day-to-day.',
    rating: 4.3,
  },
  {
    id: 'cat-compensation',
    title: 'Compensation & benefits',
    description: 'Base, bonus, stock, refreshers and the perks employees actually use.',
    rating: 4.1,
  },
  {
    id: 'cat-leadership',
    title: 'Senior leadership',
    description: 'Transparency, decision-making cadence and alignment with the mission.',
    rating: 3.9,
  },
  {
    id: 'cat-career',
    title: 'Career growth',
    description: 'Promotion clarity, mentorship and pathways into new roles.',
    rating: 4.0,
  },
  {
    id: 'cat-wlb',
    title: 'Work-life balance',
    description: 'On-call load, meeting hygiene and predictability of working hours.',
    rating: 4.2,
  },
  {
    id: 'cat-dei',
    title: 'Diversity & inclusion',
    description: 'Representation, equity in promotions and the lived experience of underrepresented groups.',
    rating: 4.0,
  },
];

export const COMPANY_REVIEWS: CompanyReview[] = [
  {
    id: 'review-google-1',
    company: 'Google',
    companySlug: 'google',
    rating: 4.4,
    pros: 'World-class peers, clear levelling and meaningful compute budgets for experimentation.',
    cons: 'Decision-making can be slow on cross-org initiatives. Promo packets remain heavy.',
    position: 'Software Engineer · L5',
    location: 'Bengaluru',
    recommend: true,
    postedAgo: '3 days ago',
  },
  {
    id: 'review-amazon-1',
    company: 'Amazon',
    companySlug: 'amazon',
    rating: 3.8,
    pros: 'Ownership is real. You can ship customer-facing changes from week one.',
    cons: 'Frugality shows up in tooling and headcount. On-call rotations can be heavy.',
    position: 'SDE-II · Hyderabad',
    location: 'Hyderabad',
    recommend: true,
    postedAgo: '5 days ago',
  },
  {
    id: 'review-meta-1',
    company: 'Meta',
    companySlug: 'meta',
    rating: 4.2,
    pros: 'Strong engineering culture, fast iteration loops and good internal mobility.',
    cons: 'Reorgs can disrupt long-running projects. Visibility matters more than usual.',
    position: 'Engineering Manager',
    location: 'Bengaluru',
    recommend: true,
    postedAgo: '1 week ago',
  },
  {
    id: 'review-razorpay-1',
    company: 'Razorpay',
    companySlug: 'razorpay',
    rating: 4.3,
    pros: 'Operator-first culture, fast decisions and very high leverage for senior ICs.',
    cons: 'Velocity expectations are intense. Comp lags FAANG at the L6+ band.',
    position: 'Principal Engineer',
    location: 'Bengaluru',
    recommend: true,
    postedAgo: '1 week ago',
  },
  {
    id: 'review-flipkart-1',
    company: 'Flipkart',
    companySlug: 'flipkart',
    rating: 4.0,
    pros: 'Scale problems are first-class. Lots of room to design distributed systems end-to-end.',
    cons: 'Reorg fatigue. Hiring pace fluctuates with the marketplace cycle.',
    position: 'Engineering Manager',
    location: 'Bengaluru',
    recommend: true,
    postedAgo: '2 weeks ago',
  },
  {
    id: 'review-nvidia-1',
    company: 'NVIDIA',
    companySlug: 'nvidia',
    rating: 4.5,
    pros: 'World-class hardware-software co-design problems. Stock has been generational.',
    cons: 'Travel-heavy for some teams. Process can feel rigid coming from a startup.',
    position: 'GPU Software Engineer',
    location: 'San Francisco',
    recommend: true,
    postedAgo: '2 weeks ago',
  },
];

export const INTERVIEW_TOPICS: InterviewTopic[] = [
  { id: 'topic-dsa', title: 'Data structures & algorithms', reports: 1840 },
  { id: 'topic-system-design', title: 'System design', reports: 1320 },
  { id: 'topic-ml-design', title: 'ML system design', reports: 412 },
  { id: 'topic-behavioural', title: 'Behavioural & leadership', reports: 980 },
  { id: 'topic-product-sense', title: 'Product sense & strategy', reports: 624 },
  { id: 'topic-take-home', title: 'Take-home assignments', reports: 318 },
];

export const INTERVIEW_EXPERIENCES: InterviewExperience[] = [
  {
    id: 'interview-google-l5',
    company: 'Google',
    companySlug: 'google',
    role: 'Software Engineer',
    level: 'L5',
    outcome: 'Offer',
    difficulty: 'Hard',
    rounds: 6,
    duration: '5 weeks',
    postedAgo: '4 days ago',
    excerpt: 'Two coding loops, one design, one behavioural, two team-matching. Coding skewed graph + DP.',
  },
  {
    id: 'interview-amazon-sde2',
    company: 'Amazon',
    companySlug: 'amazon',
    role: 'SDE-II',
    level: 'SDE_II',
    outcome: 'Offer',
    difficulty: 'Medium',
    rounds: 5,
    duration: '3 weeks',
    postedAgo: '1 week ago',
    excerpt: 'Heavy on Leadership Principles. Design round focused on a high-throughput event pipeline.',
  },
  {
    id: 'interview-meta-em',
    company: 'Meta',
    companySlug: 'meta',
    role: 'Engineering Manager',
    level: 'M1',
    outcome: 'Offer',
    difficulty: 'Hard',
    rounds: 7,
    duration: '6 weeks',
    postedAgo: '2 weeks ago',
    excerpt: 'People management, technical depth, product execution and culture-fit panels.',
  },
  {
    id: 'interview-nvidia-l5',
    company: 'NVIDIA',
    companySlug: 'nvidia',
    role: 'GPU Software Engineer',
    level: 'L5',
    outcome: 'In progress',
    difficulty: 'Hard',
    rounds: 5,
    duration: 'Active',
    postedAgo: '3 days ago',
    excerpt: 'CUDA fundamentals, profiling and a deep-dive on memory hierarchies.',
  },
  {
    id: 'interview-razorpay-l6',
    company: 'Razorpay',
    companySlug: 'razorpay',
    role: 'Principal Engineer',
    level: 'L6',
    outcome: 'Offer',
    difficulty: 'Hard',
    rounds: 6,
    duration: '4 weeks',
    postedAgo: '2 weeks ago',
    excerpt: 'Payments domain depth, distributed systems and an architecture leadership round.',
  },
  {
    id: 'interview-meesho-em',
    company: 'Meesho',
    companySlug: 'meesho',
    role: 'Engineering Manager',
    level: 'L5',
    outcome: 'Rejected',
    difficulty: 'Medium',
    rounds: 5,
    duration: '3 weeks',
    postedAgo: '3 weeks ago',
    excerpt: 'Strong on technical, lighter on people management evidence — feedback was specific and actionable.',
  },
];

export const JOB_CATEGORIES: JobCategory[] = [
  { id: 'cat-engineering', title: 'Engineering', openings: 1842, accent: 'red' },
  { id: 'cat-product', title: 'Product', openings: 412, accent: 'blue' },
  { id: 'cat-design', title: 'Design', openings: 286, accent: 'violet' },
  { id: 'cat-data', title: 'Data & ML', openings: 538, accent: 'green' },
  { id: 'cat-marketing', title: 'Marketing', openings: 198, accent: 'amber' },
  { id: 'cat-sales', title: 'Sales & GTM', openings: 312, accent: 'slate' },
];

export const FEATURED_JOBS: JobListing[] = [
  {
    id: 'job-google-sre',
    title: 'Site Reliability Engineer · IC5',
    company: 'Google',
    companySlug: 'google',
    location: 'San Francisco',
    workMode: 'Hybrid',
    type: 'Full-time',
    experience: '8+ years',
    salaryRange: '$245k – $345k',
    postedAgo: '2 days ago',
    tags: ['SRE', 'Kubernetes', 'Distributed systems'],
  },
  {
    id: 'job-amazon-sde2',
    title: 'Software Development Engineer II',
    company: 'Amazon',
    companySlug: 'amazon',
    location: 'Hyderabad',
    workMode: 'Hybrid',
    type: 'Full-time',
    experience: '3 – 6 years',
    salaryRange: '₹32 – 48 LPA',
    postedAgo: '3 days ago',
    tags: ['Backend', 'AWS', 'Java'],
  },
  {
    id: 'job-meta-em',
    title: 'Engineering Manager · Ads Platform',
    company: 'Meta',
    companySlug: 'meta',
    location: 'Bengaluru',
    workMode: 'On-site',
    type: 'Full-time',
    experience: '8+ years',
    salaryRange: '₹95 – 130 LPA',
    postedAgo: '4 days ago',
    tags: ['Leadership', 'Ads', 'Python'],
  },
  {
    id: 'job-razorpay-staff',
    title: 'Staff Backend Engineer · Payments',
    company: 'Razorpay',
    companySlug: 'razorpay',
    location: 'Bengaluru',
    workMode: 'Remote',
    type: 'Full-time',
    experience: '7+ years',
    salaryRange: '₹70 – 105 LPA',
    postedAgo: '5 days ago',
    tags: ['Payments', 'Go', 'Postgres'],
  },
  {
    id: 'job-nvidia-gpu',
    title: 'GPU Software Engineer',
    company: 'NVIDIA',
    companySlug: 'nvidia',
    location: 'San Francisco',
    workMode: 'Hybrid',
    type: 'Full-time',
    experience: '4 – 7 years',
    salaryRange: '$210k – $295k',
    postedAgo: '6 days ago',
    tags: ['CUDA', 'C++', 'Performance'],
  },
  {
    id: 'job-flipkart-pm',
    title: 'Senior Product Manager · Marketplace',
    company: 'Flipkart',
    companySlug: 'flipkart',
    location: 'Bengaluru',
    workMode: 'Hybrid',
    type: 'Full-time',
    experience: '6+ years',
    salaryRange: '₹55 – 80 LPA',
    postedAgo: '1 week ago',
    tags: ['Marketplace', 'Growth', 'Analytics'],
  },
];

export const RECENT_OFFERS: OfferRecord[] = [
  {
    id: 'offer-google-l5',
    company: 'Google',
    companySlug: 'google',
    role: 'Software Engineer',
    level: 'L5',
    base: '₹72 L',
    bonus: '₹6.5 L',
    stock: '₹22 L / yr',
    total: '₹1.0 Cr',
    uplift: '+34% on previous',
    outcome: 'Counter accepted',
    postedAgo: '3 days ago',
  },
  {
    id: 'offer-meta-em',
    company: 'Meta',
    companySlug: 'meta',
    role: 'Engineering Manager',
    level: 'M1',
    base: '₹85 L',
    bonus: '₹10 L',
    stock: '₹32 L / yr',
    total: '₹1.27 Cr',
    uplift: '+22% on previous',
    outcome: 'Accepted',
    postedAgo: '6 days ago',
  },
  {
    id: 'offer-razorpay-l6',
    company: 'Razorpay',
    companySlug: 'razorpay',
    role: 'Principal Engineer',
    level: 'L6',
    base: '₹98 L',
    bonus: '₹9.5 L',
    stock: '₹52 L / yr',
    total: '₹1.59 Cr',
    uplift: '+41% on previous',
    outcome: 'Negotiated',
    postedAgo: '1 week ago',
  },
  {
    id: 'offer-amazon-sde3',
    company: 'Amazon',
    companySlug: 'amazon',
    role: 'SDE-III',
    level: 'SDE_III',
    base: '₹56 L',
    bonus: '₹5 L',
    stock: '₹15 L / yr',
    total: '₹76 L',
    uplift: '+28% on previous',
    outcome: 'Negotiated',
    postedAgo: '2 weeks ago',
  },
];

export const OFFER_RESOURCES: OfferResource[] = [
  {
    id: 'resource-anchor',
    title: 'How to anchor your first number',
    description:
      'A simple framework for choosing the opening figure that maximises room without sounding unrealistic.',
    readingTime: '6 min read',
  },
  {
    id: 'resource-leverage',
    title: 'Building leverage with competing offers',
    description:
      'Sequencing your interview loops so that multiple offers land within the same negotiation window.',
    readingTime: '8 min read',
  },
  {
    id: 'resource-equity',
    title: 'Understanding equity vesting & refreshers',
    description:
      'How RSU vesting cliffs, top-ups and dilution change the long-term value of an offer letter.',
    readingTime: '10 min read',
  },
];

export const INDUSTRY_CATEGORIES: IndustryCategory[] = [
  { id: 'industry-tech', label: 'Technology', companies: 412, accent: 'red' },
  { id: 'industry-fintech', label: 'Fintech', companies: 142, accent: 'green' },
  { id: 'industry-ecommerce', label: 'E-commerce', companies: 96, accent: 'amber' },
  { id: 'industry-it-services', label: 'IT Services', companies: 88, accent: 'blue' },
  { id: 'industry-semiconductors', label: 'Semiconductors', companies: 38, accent: 'violet' },
  { id: 'industry-consumer', label: 'Consumer Internet', companies: 74, accent: 'slate' },
];

export const BRAND_SPOTLIGHTS: BrandSpotlight[] = [
  {
    id: 'brand-google',
    company: 'Google',
    companySlug: 'google',
    tagline: 'Solving information at planetary scale.',
    industry: 'Technology',
    headcount: '10,000+',
    perks: ['World-class peers', 'Generous learning budget', 'Strong levelling clarity'],
    rating: 4.4,
  },
  {
    id: 'brand-razorpay',
    company: 'Razorpay',
    companySlug: 'razorpay',
    tagline: 'Payments and banking infrastructure for the new economy.',
    industry: 'Fintech',
    headcount: '1,001 – 5,000',
    perks: ['Operator-first culture', 'High ownership', 'Aggressive comp for senior ICs'],
    rating: 4.3,
  },
  {
    id: 'brand-nvidia',
    company: 'NVIDIA',
    companySlug: 'nvidia',
    tagline: 'Powering the accelerated computing era.',
    industry: 'Semiconductors',
    headcount: '10,000+',
    perks: ['Generational equity', 'Hardware-software co-design', 'World-class research'],
    rating: 4.5,
  },
  {
    id: 'brand-flipkart',
    company: 'Flipkart',
    companySlug: 'flipkart',
    tagline: 'Reimagining commerce for a billion consumers.',
    industry: 'E-commerce',
    headcount: '5,001 – 10,000',
    perks: ['Scale-first problems', 'Strong engineering brand', 'Internal mobility'],
    rating: 4.0,
  },
  {
    id: 'brand-meesho',
    company: 'Meesho',
    companySlug: 'meesho',
    tagline: 'Democratising internet commerce for the next billion users.',
    industry: 'E-commerce',
    headcount: '1,001 – 5,000',
    perks: ['Founder-mode culture', 'High autonomy', 'Direct customer impact'],
    rating: 4.1,
  },
  {
    id: 'brand-zepto',
    company: 'Zepto',
    companySlug: 'zepto',
    tagline: '10-minute commerce, engineered end-to-end.',
    industry: 'Quick Commerce',
    headcount: '1,001 – 5,000',
    perks: ['Hyper-growth stage', 'Real-time logistics problems', 'Equity upside'],
    rating: 4.2,
  },
];

export function computeCompanyAverage(reviews: CompanyReview[]): number {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Number((total / reviews.length).toFixed(1));
}

export function computeReviewRecommendRate(reviews: CompanyReview[]): number {
  if (reviews.length === 0) return 0;
  const recommended = reviews.filter((review) => review.recommend).length;
  return Math.round((recommended / reviews.length) * 100);
}

export interface TrendPoint {
  year: number;
  median: number;
  average: number;
  count: number;
  yoyDelta: number;
}

export interface TrendSeries {
  id: string;
  label: string;
  group: 'role' | 'level' | 'location';
  current: TrendPoint;
  history: TrendPoint[];
  cagr: number;
}

export const TREND_SERIES: TrendSeries[] = [
  {
    id: 'trend-swe',
    label: 'Software Engineer',
    group: 'role',
    current: { year: 2026, median: 5800000, average: 6200000, count: 412, yoyDelta: 12 },
    history: [
      { year: 2022, median: 3800000, average: 4100000, count: 218, yoyDelta: 0 },
      { year: 2023, median: 4200000, average: 4500000, count: 286, yoyDelta: 11 },
      { year: 2024, median: 4800000, average: 5100000, count: 332, yoyDelta: 14 },
      { year: 2025, median: 5300000, average: 5600000, count: 380, yoyDelta: 10 },
      { year: 2026, median: 5800000, average: 6200000, count: 412, yoyDelta: 12 },
    ],
    cagr: 11.1,
  },
  {
    id: 'trend-pm',
    label: 'Product Manager',
    group: 'role',
    current: { year: 2026, median: 6400000, average: 6800000, count: 198, yoyDelta: 9 },
    history: [
      { year: 2022, median: 4400000, average: 4700000, count: 102, yoyDelta: 0 },
      { year: 2023, median: 4900000, average: 5200000, count: 132, yoyDelta: 11 },
      { year: 2024, median: 5500000, average: 5800000, count: 168, yoyDelta: 12 },
      { year: 2025, median: 5900000, average: 6300000, count: 184, yoyDelta: 7 },
      { year: 2026, median: 6400000, average: 6800000, count: 198, yoyDelta: 9 },
    ],
    cagr: 9.8,
  },
  {
    id: 'trend-ds',
    label: 'Data Scientist',
    group: 'role',
    current: { year: 2026, median: 5200000, average: 5500000, count: 162, yoyDelta: 7 },
    history: [
      { year: 2022, median: 3600000, average: 3900000, count: 88, yoyDelta: 0 },
      { year: 2023, median: 4000000, average: 4200000, count: 112, yoyDelta: 11 },
      { year: 2024, median: 4500000, average: 4800000, count: 138, yoyDelta: 12 },
      { year: 2025, median: 4900000, average: 5200000, count: 152, yoyDelta: 9 },
      { year: 2026, median: 5200000, average: 5500000, count: 162, yoyDelta: 7 },
    ],
    cagr: 9.6,
  },
  {
    id: 'trend-sdetest',
    label: 'SDE-I',
    group: 'level',
    current: { year: 2026, median: 2600000, average: 2800000, count: 184, yoyDelta: 8 },
    history: [
      { year: 2022, median: 1700000, average: 1900000, count: 102, yoyDelta: 0 },
      { year: 2023, median: 1900000, average: 2100000, count: 132, yoyDelta: 12 },
      { year: 2024, median: 2200000, average: 2400000, count: 154, yoyDelta: 16 },
      { year: 2025, median: 2400000, average: 2600000, count: 172, yoyDelta: 9 },
      { year: 2026, median: 2600000, average: 2800000, count: 184, yoyDelta: 8 },
    ],
    cagr: 11.2,
  },
  {
    id: 'trend-l5',
    label: 'L5 / Senior',
    group: 'level',
    current: { year: 2026, median: 5800000, average: 6100000, count: 232, yoyDelta: 11 },
    history: [
      { year: 2022, median: 3800000, average: 4100000, count: 124, yoyDelta: 0 },
      { year: 2023, median: 4200000, average: 4500000, count: 168, yoyDelta: 11 },
      { year: 2024, median: 4800000, average: 5100000, count: 196, yoyDelta: 14 },
      { year: 2025, median: 5200000, average: 5500000, count: 218, yoyDelta: 8 },
      { year: 2026, median: 5800000, average: 6100000, count: 232, yoyDelta: 11 },
    ],
    cagr: 11.1,
  },
  {
    id: 'trend-staff',
    label: 'Staff / L6',
    group: 'level',
    current: { year: 2026, median: 11400000, average: 12200000, count: 96, yoyDelta: 14 },
    history: [
      { year: 2022, median: 6800000, average: 7200000, count: 38, yoyDelta: 0 },
      { year: 2023, median: 7800000, average: 8200000, count: 56, yoyDelta: 15 },
      { year: 2024, median: 9200000, average: 9800000, count: 74, yoyDelta: 18 },
      { year: 2025, median: 10000000, average: 10600000, count: 86, yoyDelta: 9 },
      { year: 2026, median: 11400000, average: 12200000, count: 96, yoyDelta: 14 },
    ],
    cagr: 13.7,
  },
  {
    id: 'trend-bangalore',
    label: 'Bengaluru',
    group: 'location',
    current: { year: 2026, median: 5200000, average: 5500000, count: 312, yoyDelta: 10 },
    history: [
      { year: 2022, median: 3400000, average: 3600000, count: 168, yoyDelta: 0 },
      { year: 2023, median: 3800000, average: 4000000, count: 218, yoyDelta: 12 },
      { year: 2024, median: 4400000, average: 4700000, count: 256, yoyDelta: 16 },
      { year: 2025, median: 4700000, average: 5000000, count: 286, yoyDelta: 7 },
      { year: 2026, median: 5200000, average: 5500000, count: 312, yoyDelta: 10 },
    ],
    cagr: 11.2,
  },
  {
    id: 'trend-hyderabad',
    label: 'Hyderabad',
    group: 'location',
    current: { year: 2026, median: 4200000, average: 4400000, count: 168, yoyDelta: 8 },
    history: [
      { year: 2022, median: 2800000, average: 3000000, count: 88, yoyDelta: 0 },
      { year: 2023, median: 3100000, average: 3300000, count: 112, yoyDelta: 11 },
      { year: 2024, median: 3500000, average: 3700000, count: 138, yoyDelta: 13 },
      { year: 2025, median: 3900000, average: 4100000, count: 156, yoyDelta: 11 },
      { year: 2026, median: 4200000, average: 4400000, count: 168, yoyDelta: 8 },
    ],
    cagr: 10.7,
  },
];

export interface CareerNode {
  id: string;
  level: string;
  yearsExperience: string;
  medianTotalCompensation: number;
  responsibilities: string[];
  skills: string[];
  nextMoveProbability: number;
}

export interface CareerPath {
  id: string;
  role: string;
  description: string;
  nodes: CareerNode[];
  icon: 'engineering' | 'product' | 'data' | 'design';
}

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'path-swe',
    role: 'Software Engineer',
    description: 'Individual contributor path from junior IC to Distinguished Engineer.',
    icon: 'engineering',
    nodes: [
      {
        id: 'swe-1',
        level: 'SDE-I / L3',
        yearsExperience: '0 – 2 yrs',
        medianTotalCompensation: 2600000,
        responsibilities: ['Ship small features', 'Pair with senior engineers', 'Learn the codebase'],
        skills: ['One language', 'Basic data structures', 'Git & CI/CD'],
        nextMoveProbability: 78,
      },
      {
        id: 'swe-2',
        level: 'SDE-II / L4',
        yearsExperience: '2 – 5 yrs',
        medianTotalCompensation: 4400000,
        responsibilities: ['Own medium-sized projects', 'Mentor interns', 'Drive design reviews'],
        skills: ['Distributed systems basics', 'Production observability', 'On-call'],
        nextMoveProbability: 64,
      },
      {
        id: 'swe-3',
        level: 'SDE-III / L5',
        yearsExperience: '5 – 8 yrs',
        medianTotalCompensation: 6800000,
        responsibilities: ['Lead cross-team projects', 'Set technical direction', 'Coach mid-level ICs'],
        skills: ['System design', 'Cross-org communication', 'Mentorship'],
        nextMoveProbability: 52,
      },
      {
        id: 'swe-4',
        level: 'Staff / L6',
        yearsExperience: '8 – 12 yrs',
        medianTotalCompensation: 11400000,
        responsibilities: ['Architect org-wide systems', 'Set company-wide strategy', 'Hire & grow teams'],
        skills: ['Org-wide influence', 'Strategic planning', 'Technical leadership'],
        nextMoveProbability: 38,
      },
      {
        id: 'swe-5',
        level: 'Principal / L7',
        yearsExperience: '12+ yrs',
        medianTotalCompensation: 16800000,
        responsibilities: ['Define technical vision', 'Influence industry direction', 'Advise executives'],
        skills: ['Industry presence', 'Long-range planning', 'Org design'],
        nextMoveProbability: 22,
      },
    ],
  },
  {
    id: 'path-pm',
    role: 'Product Manager',
    description: 'From Associate PM to Group PM, with optional transition to CPO.',
    icon: 'product',
    nodes: [
      {
        id: 'pm-1',
        level: 'APM',
        yearsExperience: '0 – 2 yrs',
        medianTotalCompensation: 3200000,
        responsibilities: ['Run a small surface area', 'Write PRDs', 'Partner with engineering leads'],
        skills: ['Analytics', 'User research', 'Prioritisation'],
        nextMoveProbability: 72,
      },
      {
        id: 'pm-2',
        level: 'PM',
        yearsExperience: '2 – 5 yrs',
        medianTotalCompensation: 5400000,
        responsibilities: ['Own a product area', 'Set quarterly OKRs', 'Drive launches'],
        skills: ['Strategy', 'Stakeholder management', 'Experimentation'],
        nextMoveProbability: 58,
      },
      {
        id: 'pm-3',
        level: 'Senior PM',
        yearsExperience: '5 – 8 yrs',
        medianTotalCompensation: 8200000,
        responsibilities: ['Lead multi-team initiatives', 'Set multi-year strategy', 'Mentor PMs'],
        skills: ['Cross-org alignment', 'Org strategy', 'Coaching'],
        nextMoveProbability: 46,
      },
      {
        id: 'pm-4',
        level: 'Group PM / Director',
        yearsExperience: '8 – 12 yrs',
        medianTotalCompensation: 12800000,
        responsibilities: ['Own a portfolio of products', 'Hire and grow PM teams', 'Influence company strategy'],
        skills: ['Portfolio strategy', 'Hiring & org design', 'Executive communication'],
        nextMoveProbability: 32,
      },
      {
        id: 'pm-5',
        level: 'CPO / VP Product',
        yearsExperience: '12+ yrs',
        medianTotalCompensation: 18400000,
        responsibilities: ['Own product org vision', 'Partner with CEO on company direction', 'Set culture'],
        skills: ['Executive leadership', 'Investor narrative', 'Market shaping'],
        nextMoveProbability: 18,
      },
    ],
  },
  {
    id: 'path-data',
    role: 'Data / ML',
    description: 'Analyst → Data Scientist → Applied Scientist → ML leadership.',
    icon: 'data',
    nodes: [
      {
        id: 'ds-1',
        level: 'Data Analyst',
        yearsExperience: '0 – 2 yrs',
        medianTotalCompensation: 2200000,
        responsibilities: ['Build dashboards', 'Run ad-hoc analyses', 'Support teams with data'],
        skills: ['SQL', 'Tableau / Looker', 'Basic statistics'],
        nextMoveProbability: 64,
      },
      {
        id: 'ds-2',
        level: 'Data Scientist',
        yearsExperience: '2 – 5 yrs',
        medianTotalCompensation: 4200000,
        responsibilities: ['Own metric definitions', 'Run experiments', 'Partner with PMs on goals'],
        skills: ['A/B testing', 'Causal inference', 'Python / R'],
        nextMoveProbability: 52,
      },
      {
        id: 'ds-3',
        level: 'Senior / Applied Scientist',
        yearsExperience: '5 – 8 yrs',
        medianTotalCompensation: 7600000,
        responsibilities: ['Lead modeling workstreams', 'Set methodology standards', 'Publish internally'],
        skills: ['ML modeling', 'Causal & Bayesian methods', 'Productionisation'],
        nextMoveProbability: 42,
      },
      {
        id: 'ds-4',
        level: 'Staff / Lead',
        yearsExperience: '8 – 12 yrs',
        medianTotalCompensation: 12600000,
        responsibilities: ['Set ML direction', 'Own platform investments', 'Hire & grow teams'],
        skills: ['Org-wide ML strategy', 'Platform thinking', 'Hiring & coaching'],
        nextMoveProbability: 28,
      },
      {
        id: 'ds-5',
        level: 'Head of Data / ML',
        yearsExperience: '12+ yrs',
        medianTotalCompensation: 19600000,
        responsibilities: ['Own ML org vision', 'Partner with C-suite', 'Drive measurable business impact'],
        skills: ['Executive leadership', 'Org design', 'Capital allocation'],
        nextMoveProbability: 16,
      },
    ],
  },
  {
    id: 'path-design',
    role: 'Product Designer',
    description: 'From Junior Designer to Head of Design.',
    icon: 'design',
    nodes: [
      {
        id: 'des-1',
        level: 'Junior Designer',
        yearsExperience: '0 – 2 yrs',
        medianTotalCompensation: 2000000,
        responsibilities: ['Own small flows', 'Run usability tests', 'Maintain design system'],
        skills: ['Figma', 'Interaction design', 'Research basics'],
        nextMoveProbability: 70,
      },
      {
        id: 'des-2',
        level: 'Designer',
        yearsExperience: '2 – 5 yrs',
        medianTotalCompensation: 3600000,
        responsibilities: ['Own end-to-end product areas', 'Set visual standards', 'Partner with research'],
        skills: ['Visual design', 'Information architecture', 'Prototyping'],
        nextMoveProbability: 56,
      },
      {
        id: 'des-3',
        level: 'Senior Designer',
        yearsExperience: '5 – 8 yrs',
        medianTotalCompensation: 6200000,
        responsibilities: ['Lead design for major surfaces', 'Mentor designers', 'Set craft bar'],
        skills: ['Systems thinking', 'Storytelling', 'Cross-functional leadership'],
        nextMoveProbability: 44,
      },
      {
        id: 'des-4',
        level: 'Staff / Principal Designer',
        yearsExperience: '8 – 12 yrs',
        medianTotalCompensation: 10200000,
        responsibilities: ['Set design strategy', 'Influence product strategy', 'Define design org direction'],
        skills: ['Org-wide strategy', 'Design ops', 'Executive communication'],
        nextMoveProbability: 30,
      },
      {
        id: 'des-5',
        level: 'Head of Design',
        yearsExperience: '12+ yrs',
        medianTotalCompensation: 15800000,
        responsibilities: ['Own design org vision', 'Hire & grow leaders', 'Shape product direction'],
        skills: ['Executive leadership', 'Org design', 'Brand & product integration'],
        nextMoveProbability: 18,
      },
    ],
  },
];

export interface IndustryInsightRow {
  id: string;
  label: string;
  description: string;
  medianTotalCompensation: number;
  topRoles: string[];
  topCompanies: string[];
  growth: number;
  accent: 'red' | 'blue' | 'green' | 'amber' | 'violet' | 'slate';
}

export const INDUSTRY_INSIGHTS: IndustryInsightRow[] = [
  {
    id: 'industry-tech',
    label: 'Technology',
    description: 'Listed multinationals and high-growth software platforms.',
    medianTotalCompensation: 6200000,
    topRoles: ['Software Engineer', 'Engineering Manager', 'Product Manager'],
    topCompanies: ['Google', 'Amazon', 'Meta', 'Microsoft'],
    growth: 12,
    accent: 'red',
  },
  {
    id: 'industry-fintech',
    label: 'Fintech',
    description: 'Payments, banking, insurance and risk platforms.',
    medianTotalCompensation: 5800000,
    topRoles: ['Software Engineer', 'Risk Analyst', 'Compliance Lead'],
    topCompanies: ['Razorpay', 'PhonePe', 'CRED', 'Paytm'],
    growth: 14,
    accent: 'green',
  },
  {
    id: 'industry-ecommerce',
    label: 'E-commerce',
    description: 'Marketplaces, logistics and last-mile platforms.',
    medianTotalCompensation: 4600000,
    topRoles: ['Engineering Manager', 'Product Manager', 'Data Scientist'],
    topCompanies: ['Flipkart', 'Meesho', 'Myntra', 'Nykaa'],
    growth: 10,
    accent: 'amber',
  },
  {
    id: 'industry-it-services',
    label: 'IT Services',
    description: 'Global capability centres and large service integrators.',
    medianTotalCompensation: 3400000,
    topRoles: ['Senior Engineer', 'Architect', 'Delivery Manager'],
    topCompanies: ['TCS', 'Infosys', 'Wipro', 'HCL'],
    growth: 7,
    accent: 'blue',
  },
  {
    id: 'industry-semiconductors',
    label: 'Semiconductors',
    description: 'Chip design, verification and embedded systems.',
    medianTotalCompensation: 7200000,
    topRoles: ['GPU Software Engineer', 'Verification Engineer', 'RTL Design'],
    topCompanies: ['NVIDIA', 'AMD', 'Qualcomm', 'Intel'],
    growth: 18,
    accent: 'violet',
  },
  {
    id: 'industry-consumer',
    label: 'Consumer Internet',
    description: 'Apps, content, social and community platforms.',
    medianTotalCompensation: 5000000,
    topRoles: ['Product Manager', 'Growth Marketer', 'ML Engineer'],
    topCompanies: ['Zepto', 'Swiggy', 'ShareChat', 'Loco'],
    growth: 11,
    accent: 'slate',
  },
];

export interface OfferAnalysisMetric {
  key: string;
  label: string;
  yourValue: number;
  marketMedian: number;
  marketTop: number;
  status: 'below' | 'market' | 'above';
  hint: string;
}

export interface OfferAnalysisInput {
  base: number;
  bonus: number;
  stock: number;
  total: number;
  level: string;
  role: string;
  location: string;
}

export interface OfferAnalysis {
  metrics: OfferAnalysisMetric[];
  verdict: 'strong' | 'market' | 'negotiate';
  upliftSuggestion: number;
  summary: string;
}

export function analyzeOffer(input: OfferAnalysisInput): OfferAnalysis {
  const base = Math.max(0, input.base);
  const bonus = Math.max(0, input.bonus);
  const stock = Math.max(0, input.stock);
  const total = base + bonus + stock;

  const medianByLevel: Record<string, number> = {
    SDE_I: 2600000,
    SDE_II: 4400000,
    SDE_III: 6800000,
    STAFF: 11400000,
    PRINCIPAL: 16800000,
    L3: 2600000,
    L4: 4400000,
    L5: 5800000,
    L6: 8800000,
    L7: 13800000,
    M1: 9800000,
    M2: 14400000,
  };

  const marketMedian = medianByLevel[input.level] ?? 5000000;
  const marketTop = Math.round(marketMedian * 1.4);

  const metrics: OfferAnalysisMetric[] = [
    {
      key: 'base',
      label: 'Base salary',
      yourValue: base,
      marketMedian: Math.round(marketMedian * 0.6),
      marketTop: Math.round(marketTop * 0.6),
      status: base >= Math.round(marketTop * 0.6) ? 'above' : base >= Math.round(marketMedian * 0.6) ? 'market' : 'below',
      hint: 'Anchors the rest of the offer and your future refreshes.',
    },
    {
      key: 'bonus',
      label: 'Annual bonus',
      yourValue: bonus,
      marketMedian: Math.round(marketMedian * 0.1),
      marketTop: Math.round(marketTop * 0.15),
      status: bonus >= Math.round(marketTop * 0.15) ? 'above' : bonus >= Math.round(marketMedian * 0.1) ? 'market' : 'below',
      hint: 'Tied to performance — verify the target %, payout history and cap.',
    },
    {
      key: 'stock',
      label: 'Equity / year',
      yourValue: stock,
      marketMedian: Math.round(marketMedian * 0.3),
      marketTop: Math.round(marketTop * 0.45),
      status: stock >= Math.round(marketTop * 0.45) ? 'above' : stock >= Math.round(marketMedian * 0.3) ? 'market' : 'below',
      hint: 'Check vesting schedule, refresh cadence and dilution assumptions.',
    },
  ];

  const totalRatio = total / marketMedian;
  let verdict: 'strong' | 'market' | 'negotiate';
  let summary: string;
  if (totalRatio >= 1.15) {
    verdict = 'strong';
    summary = 'Your offer is at or above the top of the band for this level. Hold your number or accept confidently.';
  } else if (totalRatio >= 0.95) {
    verdict = 'market';
    summary = 'Your offer is in the market band. Worth negotiating on signing bonus and equity refresh cadence.';
  } else {
    verdict = 'negotiate';
    summary = 'Your offer is below the median for this level. Push back with data and a competing offer if you can.';
  }

  const upliftSuggestion = Math.max(0, Math.round(marketMedian - total));

  return { metrics, verdict, upliftSuggestion, summary };
}

export interface CalculatorInput {
  base: number;
  bonusPercent: number;
  stockAnnual: number;
  years: number;
}

export interface CalculatorResult {
  totalAnnual: number;
  totalFourYear: number;
  baseToTotalRatio: number;
  bonusAmount: number;
  stockToTotalRatio: number;
  bracket: 'Entry' | 'Mid' | 'Senior' | 'Staff' | 'Principal';
  recommendations: string[];
}

export function calculateCompensation(input: CalculatorInput): CalculatorResult {
  const base = Math.max(0, input.base);
  const bonusPercent = Math.max(0, Math.min(100, input.bonusPercent));
  const stockAnnual = Math.max(0, input.stockAnnual);
  const years = Math.max(0, input.years);

  const bonusAmount = Math.round((base * bonusPercent) / 100);
  const totalAnnual = base + bonusAmount + stockAnnual;
  const totalFourYear = totalAnnual * 4;

  const baseToTotalRatio = totalAnnual === 0 ? 0 : Math.round((base / totalAnnual) * 100);
  const stockToTotalRatio = totalAnnual === 0 ? 0 : Math.round((stockAnnual / totalAnnual) * 100);

  let bracket: CalculatorResult['bracket'] = 'Entry';
  if (totalAnnual >= 14000000) bracket = 'Principal';
  else if (totalAnnual >= 9000000) bracket = 'Staff';
  else if (totalAnnual >= 5000000) bracket = 'Senior';
  else if (totalAnnual >= 2500000) bracket = 'Mid';

  const recommendations: string[] = [];
  if (baseToTotalRatio < 55) {
    recommendations.push('Base is below 55% of total comp — consider negotiating a higher base to anchor refreshes.');
  }
  if (stockToTotalRatio > 50) {
    recommendations.push('Equity is more than 50% of your offer — model vesting scenarios and dilution before signing.');
  }
  if (bonusAmount === 0) {
    recommendations.push('No bonus disclosed — ask for the target %, payout history and whether it counts toward your base for benefits.');
  }
  if (years < 2) {
    recommendations.push('For offers under 2 years of experience, push for a sign-on bonus to offset a low equity grant.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Compensation mix is healthy. Consider negotiating on non-cash perks: WFH stipend, learning budget, equity refresh cadence.');
  }

  return {
    totalAnnual,
    totalFourYear,
    baseToTotalRatio,
    bonusAmount,
    stockToTotalRatio,
    bracket,
    recommendations,
  };
}
