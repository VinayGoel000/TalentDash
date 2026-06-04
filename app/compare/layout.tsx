import type { Metadata } from 'next';
import { getCompareMetadata, getSiteUrl } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, serializeJsonLd } from '@/lib/seo/jsonld';

export const metadata: Metadata = getCompareMetadata();

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            generateBreadcrumbSchema([
              { name: 'Home', url: `${getSiteUrl()}/`, position: 1 },
              { name: 'Compare', url: `${getSiteUrl()}/compare`, position: 2 },
            ])
          ),
        }}
      />
      {children}
    </>
  );
}
