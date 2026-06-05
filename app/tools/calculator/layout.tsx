import type { Metadata } from 'next';
import { getCalculatorMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = getCalculatorMetadata();

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
