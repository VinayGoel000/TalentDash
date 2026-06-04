import { revalidatePath, revalidateTag } from 'next/cache';

export const CACHE_TAGS = {
  salaries: 'salaries',
  companies: 'companies',
} as const;

export function revalidateAfterIngest(companySlug: string) {
  revalidateTag(CACHE_TAGS.salaries, 'max');
  revalidateTag(CACHE_TAGS.companies, 'max');
  revalidatePath('/salaries', 'page');
  revalidatePath('/companies', 'page');
  revalidatePath(`/companies/${companySlug}`, 'page');
  revalidatePath('/compare', 'page');
}
