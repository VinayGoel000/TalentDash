export const SALARIES_CACHE_CONTROL = 's-maxage=300, stale-while-revalidate=3600';
export const COMPANY_CACHE_CONTROL = 's-maxage=3600, stale-while-revalidate=86400';

export function withSalariesCacheHeaders(init?: ResponseInit): ResponseInit {
  return {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      'Cache-Control': SALARIES_CACHE_CONTROL,
    },
  };
}

export function withCompanyCacheHeaders(init?: ResponseInit): ResponseInit {
  return {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      'Cache-Control': COMPANY_CACHE_CONTROL,
    },
  };
}
