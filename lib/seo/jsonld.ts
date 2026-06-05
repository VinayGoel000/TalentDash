/**
 * JSON-LD Structured Data Helpers
 * Generate valid schema.org structured data for search engines
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://talentdash.com';

/**
 * Organization schema for homepage
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TalentDash',
    url: SITE_URL,
    description: 'Compensation Intelligence Platform',
    logo: `${SITE_URL}/logo.svg`,
    sameAs: ['https://twitter.com/talentdash'],
  };
}

/**
 * WebSite schema for homepage with search action
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TalentDash',
    url: SITE_URL,
    description: 'Compensation Intelligence Platform',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/salaries?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Dataset schema for salary data
 */
export function generateSalaryDatasetSchema(recordCount: number, dateModified: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Salary Database',
    description: 'Verified salary records from technology companies',
    url: `${SITE_URL}/salaries`,
    datePublished: '2026-01-01',
    dateModified,
    recordCount,
    creator: {
      '@type': 'Organization',
      name: 'TalentDash',
    },
    isAccessibleForFree: true,
    spatialCoverage: 'India, United States',
    includedInDataCatalog: {
      '@type': 'DataCatalog',
      name: 'TalentDash',
    },
  };
}

/**
 * BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string; position: number }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Company page dataset schema
 */
export function generateCompanyDatasetSchema(company: {
  name: string;
  slug: string;
  totalSalaries: number;
  averageTC?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `Salary Data at ${company.name}`,
    description: `Verified salary records from employees at ${company.name}`,
    url: `${SITE_URL}/companies/${company.slug}`,
    creator: {
      '@type': 'Organization',
      name: company.name,
    },
    recordCount: company.totalSalaries,
    isAccessibleForFree: true,
    datePublished: '2026-01-01',
    dateModified: new Date().toISOString().split('T')[0],
  };
}

/**
 * FAQPage schema helper
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Serialize JSON-LD for embedding in HTML
 */
export function serializeJsonLd(schema: Record<string, unknown>): string {
  return JSON.stringify(schema);
}
