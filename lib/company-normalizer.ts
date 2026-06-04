export function normalizeCompanyName(value: string) {
  return value.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').replace(/\s+/g, ' ').trim();
}

export function normalizeCompanyKey(value: string) {
  return normalizeCompanyName(value).replace(/\s+/g, '');
}

export function generateCompanySlug(value: string) {
  return normalizeCompanyName(value)
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
