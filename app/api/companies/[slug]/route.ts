import { NextResponse } from 'next/server';
import { getCompanyApiPayload } from '@/lib/db/companies';
import { withCompanyCacheHeaders } from '@/lib/db/cache-headers';

const jsonError = (message: string, status = 400) =>
  NextResponse.json({ error: true, message }, { status });

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const payload = await getCompanyApiPayload(slug);

  if (!payload) {
    return jsonError('Company not found', 404);
  }

  return NextResponse.json(payload, withCompanyCacheHeaders());
}
