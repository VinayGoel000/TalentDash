import type { Metadata } from 'next';
import { getOfferAnalyzerMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = getOfferAnalyzerMetadata();

export default function OfferAnalyzerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
