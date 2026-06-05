import type { Metadata } from 'next';
import { getBenchmarkMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = getBenchmarkMetadata();

export default function BenchmarkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
