import type { Metadata } from 'next';
import { getToolsHubMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = getToolsHubMetadata();

export default function ToolsHubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
