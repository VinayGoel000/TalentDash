import type { Metadata } from 'next';
import { prisma } from '@/app/lib/db';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { InsightsSection } from '@/components/home/InsightsSection';
import { ExploreCategoriesSection } from '@/components/home/ExploreCategoriesSection';
import { CommunitySection } from '@/components/home/CommunitySection';
import { SalaryInsightsSection } from '@/components/home/SalaryInsightsSection';
import { getHomepageData } from '@/lib/db/homepage';
import { getHomepageMetadata } from '@/lib/seo/metadata';
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  serializeJsonLd,
} from '@/lib/seo/jsonld';

export const metadata: Metadata = getHomepageMetadata();
export const revalidate = 3600;

const FALLBACK_TRENDING = [
  { label: 'Software Engineer', query: 'Software Engineer' },
  { label: 'Data Scientist', query: 'Data Scientist' },
  { label: 'Product Manager', query: 'Product Manager' },
  { label: 'Marketing Manager', query: 'Marketing Manager' },
  { label: 'Remote Jobs', query: 'Remote', destination: '/jobs?location=Remote' },
];

async function loadLocations(): Promise<string[]> {
  const rows = await prisma.salary.findMany({
    distinct: ['location'],
    select: { location: true },
    orderBy: { location: 'asc' },
  });
  return rows.map((row) => row.location);
}

export default async function HomePage() {
  const [data, locations] = await Promise.all([getHomepageData(), loadLocations()]);

  const trending = (() => {
    const map = new Map<string, { label: string; query: string; destination?: string }>();
    for (const role of data.topRoles) {
      map.set(role.role.toLowerCase(), { label: role.role, query: role.role });
      if (map.size >= 4) break;
    }
    for (const fallback of FALLBACK_TRENDING) {
      if (map.size >= 5) break;
      if (!map.has(fallback.label.toLowerCase())) {
        map.set(fallback.label.toLowerCase(), fallback);
      }
    }
    return Array.from(map.values()).slice(0, 5);
  })();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(generateOrganizationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(generateWebsiteSchema()),
        }}
      />

      <HeroSection
        locations={locations}
        trending={trending}
        totals={{
          salaries: data.counts.salaries,
          companies: data.counts.companies,
          locations: data.counts.locations,
        }}
      />

      <StatsSection counts={data.counts} />

      <InsightsSection />

      <ExploreCategoriesSection />

      <CommunitySection
        recentSalaries={data.recentSalaries}
        topCompanies={data.topPayingCompanies}
        topRoles={data.topRoles.map((entry) => ({
          role: entry.role,
          sampleSize: entry.sampleSize,
        }))}
      />

      <SalaryInsightsSection
        topPayingCompanies={data.topPayingCompanies}
        topRoles={data.topRoles}
        experienceBands={data.experienceBands}
        topLocations={data.topLocations}
      />
    </>
  );
}
