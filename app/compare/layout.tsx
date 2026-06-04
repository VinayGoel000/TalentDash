import type { Metadata } from 'next';
import { getCompareMetadata } from '@/lib/seo/metadata';
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
              { name: 'Home', path: '/' },
              { name: 'Compare', path: '/compare' },
            ])
          ),
        }}
      />
      {children}
    </>
  );
}
