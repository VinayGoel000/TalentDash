/**
 * SEO Metadata Helpers
 * Centralized metadata generation for all pages
 */

import type { Metadata } from 'next';

const SITE_NAME = 'TalentDash';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://talentdash.com';
const TWITTER_HANDLE = '@talentdash';

export interface MetadataParams {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
}

/**
 * Generate metadata for a page
 */
export function generatePageMetadata(params: MetadataParams): Metadata {
  const canonicalUrl = `${SITE_URL}${params.path}`;
  const fullTitle = params.title.includes(SITE_NAME) ? params.title : `${params.title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description: params.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: params.title,
      description: params.description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: params.ogType || 'website',
      images: params.ogImage
        ? [
            {
              url: params.ogImage,
              width: 1200,
              height: 630,
              alt: params.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: params.title,
      description: params.description,
      creator: TWITTER_HANDLE,
      images: params.ogImage ? [params.ogImage] : undefined,
    },
    robots: params.noindex ? 'noindex, nofollow' : 'index, follow',
  };
}

/**
 * Homepage metadata
 */
export function getHomepageMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Compensation Intelligence Platform',
    description: 'Explore verified salary data from 1000+ companies. Compare compensation, find career insights, and make informed decisions.',
    path: '/',
  });
}

/**
 * Salaries page metadata
 */
export function getSalariesMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Salary Database | Filter by Company, Role & Level',
    description: 'Browse verified salary records across tech companies. Filter by company, role, level, and location. See base salary, bonus, stock, and total compensation.',
    path: '/salaries',
  });
}

/**
 * Company page metadata (dynamic)
 */
export function getCompanyMetadata(company: {
  name: string;
  slug: string;
  totalSalaries?: number;
  averageTC?: number;
}): Metadata {
  const salarySuffix = company.totalSalaries ? ` (${company.totalSalaries} records)` : '';
  const description = `Explore salary data at ${company.name}${salarySuffix}. View compensation by role, level, and experience. Compare packages and find market-rate insights.`;

  return generatePageMetadata({
    title: `Salary Data at ${company.name}${salarySuffix}`,
    description,
    path: `/companies/${company.slug}`,
  });
}

/**
 * Companies directory metadata
 */
export function getCompaniesIndexMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Companies | Explore Salary Data by Employer',
    description: 'Browse technology companies with verified salary records. Open a company page to see compensation by role and level.',
    path: '/companies',
  });
}

/**
 * Compare page metadata
 */
export function getCompareMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Compare Salary Packages | Side-by-Side Analysis',
    description: 'Compare any two salary records side-by-side. See delta analysis, compensation breakdown, and determine which package offers better value.',
    path: '/compare',
  });
}

/**
 * Reviews page metadata
 */
export function getReviewsMetadata(): Metadata {
  return generatePageMetadata({
    title: 'TalentDash Reviews | Company Culture & Workplace Insights',
    description: 'Read honest employee reviews about culture, leadership, compensation and growth at top companies. Filter ratings by role, location and tenure.',
    path: '/reviews',
  });
}

/**
 * Interviews page metadata
 */
export function getInterviewsMetadata(): Metadata {
  return generatePageMetadata({
    title: 'TalentDash Interviews | Real Interview Experiences & Questions',
    description: 'Browse structured interview experiences from candidates across top companies. See loops, difficulty levels, questions and offer outcomes.',
    path: '/interviews',
  });
}

/**
 * Jobs page metadata
 */
export function getJobsMetadata(): Metadata {
  return generatePageMetadata({
    title: 'TalentDash Jobs | Featured Roles at Top Companies',
    description: 'Discover featured openings across engineering, product, design, data and GTM at the companies the TalentDash community trusts.',
    path: '/jobs',
  });
}

/**
 * Forum page metadata
 */
export function getForumMetadata(): Metadata {
  return generatePageMetadata({
    title: 'TalentDash Community | Trending Career Discussions',
    description: 'Join trending discussions on salaries, promotions, interviews, remote work and career growth with the TalentDash community.',
    path: '/forum',
  });
}

/**
 * Offers page metadata
 */
export function getOffersMetadata(): Metadata {
  return generatePageMetadata({
    title: 'TalentDash Offers | Negotiation Outcomes & Compensation Letters',
    description: 'Compare real offer letters, signing bonuses and counter-offer outcomes. Use proven negotiation playbooks to maximise your next package.',
    path: '/offers',
  });
}

/**
 * Brands page metadata
 */
export function getBrandsMetadata(): Metadata {
  return generatePageMetadata({
    title: 'TalentDash Brands | Featured Employer Profiles & Industry Insights',
    description: 'Explore featured employer brands across technology, fintech, e-commerce and more. See culture, headcount, perks and verified ratings.',
    path: '/brands',
  });
}

/**
 * Leaderboard page metadata
 */
export function getLeaderboardMetadata(): Metadata {
  return generatePageMetadata({
    title: 'TalentDash Leaderboard | Top Paying Companies Ranked',
    description: 'Live leaderboard of the top paying companies on TalentDash, ranked by verified median total compensation.',
    path: '/leaderboard',
  });
}

/**
 * Locations page metadata
 */
export function getLocationsMetadata(): Metadata {
  return generatePageMetadata({
    title: 'TalentDash Locations | Popular Markets & Salary by City',
    description: 'Explore the most popular hiring locations on TalentDash. Median comp, top roles and top employers in every market.',
    path: '/locations',
  });
}

/**
 * Trends page metadata
 */
export function getTrendsMetadata(): Metadata {
  return generatePageMetadata({
    title: 'TalentDash Salary Trends | Year-over-Year Comp Movement',
    description: 'Live salary trends across roles, levels and locations. Year-over-year deltas, 4-year CAGR and median total comp per series.',
    path: '/trends',
  });
}

/**
 * Tools hub metadata
 */
export function getToolsHubMetadata(): Metadata {
  return generatePageMetadata({
    title: 'TalentDash Tools | Salary Calculator, Offer Analyzer, Career Path, Benchmarking',
    description: 'Interactive compensation tools for every career decision. Salary calculator, offer analyzer, career path explorer and benchmarking.',
    path: '/tools',
  });
}

/**
 * Calculator metadata
 */
export function getCalculatorMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Salary Calculator | TalentDash',
    description: 'Model base, bonus and equity scenarios. See your bracket, total comp and recommendations in real time.',
    path: '/tools/calculator',
  });
}

/**
 * Offer analyzer metadata
 */
export function getOfferAnalyzerMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Offer Analyzer | TalentDash',
    description: 'Drop in your offer details and see how the package compares to the market for your level.',
    path: '/tools/offer-analyzer',
  });
}

/**
 * Career path metadata
 */
export function getCareerPathMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Career Path Explorer | TalentDash',
    description: 'Visualise the typical engineering, product, data and design career paths. Median comp, responsibilities and skills at each level.',
    path: '/tools/career-path',
  });
}

/**
 * Benchmark metadata
 */
export function getBenchmarkMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Compensation Benchmarking | TalentDash',
    description: 'See exactly where your package ranks against peers across company, role, level and location.',
    path: '/tools/benchmark',
  });
}

/**
 * Build canonical URL
 */
export function getCanonicalUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

/**
 * Get full site URL
 */
export function getSiteUrl(): string {
  return SITE_URL;
}
