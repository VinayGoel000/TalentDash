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
    canonical: canonicalUrl,
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
