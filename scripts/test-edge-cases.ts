import { POST as ingestPOST } from '@/app/api/ingest-salary/route';
import { GET as salariesGET } from '@/app/api/salaries/route';
import { GET as companyGET } from '@/app/api/companies/[slug]/route';
import { GET as compareGET } from '@/app/api/compare/route';
import { prisma } from '@/app/lib/db';

const baseUrl = 'http://localhost';

async function jsonResponse(response: Response) {
  const text = await response.text();
  try {
    return { status: response.status, json: JSON.parse(text), text };
  } catch {
    return { status: response.status, json: null, text };
  }
}

async function runTest(name: string, fn: () => Promise<{ pass: boolean; details?: string }>) {
  try {
    const result = await fn();
    console.log(`${result.pass ? 'PASS' : 'FAIL'}: ${name}${result.details ? ` - ${result.details}` : ''}`);
    return { name, pass: result.pass, details: result.details };
  } catch (error) {
    console.log(`ERROR: ${name} - ${error}`);
    return { name, pass: false, details: String(error) };
  }
}

async function testIngestNegativeSalary() {
  const companyName = `EdgeCase Negative Salary ${Date.now()}`;
  const request = new Request(`${baseUrl}/api/ingest-salary`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      company: companyName,
      role: 'Software Engineer',
      level: 'L3',
      location: 'Bengaluru',
      currency: 'INR',
      experience_years: 2,
      base_salary: -100,
      bonus: 0,
      stock: 0,
      source: 'CONTRIBUTOR',
      confidence_score: 0.9,
      total_compensation: -100,
    }),
  });

  const response = await ingestPOST(request);
  const out = await jsonResponse(response as Response);
  const count = await prisma.salary.count({ where: { role: 'Software Engineer', base_salary: BigInt(-100) } });
  return {
    pass: out.status === 400 && out.json?.error === true && count === 0,
    details: `status=${out.status} error=${out.json?.error} count=${count}`,
  };
}

async function testIngestInvalidLevel() {
  const companyName = `EdgeCase Invalid Level ${Date.now()}`;
  const request = new Request(`${baseUrl}/api/ingest-salary`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      company: companyName,
      role: 'Software Engineer',
      level: 'Senior Software Engineer',
      location: 'Bengaluru',
      currency: 'INR',
      experience_years: 2,
      base_salary: 100000,
      bonus: 0,
      stock: 0,
      source: 'CONTRIBUTOR',
      confidence_score: 0.9,
      total_compensation: 100000,
    }),
  });

  const response = await ingestPOST(request);
  const out = await jsonResponse(response as Response);
  return {
    pass: out.status === 400 && out.json?.error === true && out.json?.field === 'level',
    details: `status=${out.status} field=${out.json?.field}`,
  };
}

async function testIngestRecomputeTotal() {
  const companyName = `EdgeCase Recompute Total ${Date.now()}`;
  const request = new Request(`${baseUrl}/api/ingest-salary`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      company: companyName,
      role: 'Software Engineer',
      level: 'L4',
      location: 'Bengaluru',
      currency: 'INR',
      experience_years: 3,
      base_salary: 100000,
      bonus: 50000,
      stock: 50000,
      source: 'CONTRIBUTOR',
      confidence_score: 0.95,
      total_compensation: 999999999,
    }),
  });

  const response = await ingestPOST(request);
  const out = await jsonResponse(response as Response);
  if (out.status !== 201) {
    return { pass: false, details: `status=${out.status} body=${JSON.stringify(out.json)}` };
  }
  const record = out.json?.record;
  const stored = await prisma.salary.findUnique({ where: { id: record?.id } });
  const passed = record?.total_compensation === '200000' && stored?.total_compensation.toString() === '200000';
  return { pass: passed, details: `response=${record?.total_compensation} stored=${stored?.total_compensation}` };
}

async function testSalariesAllFilters() {
  const request = new Request(`${baseUrl}/api/salaries?company=Google&role=Software%20Engineer&level=L4&location=Bengaluru&currency=INR&sort=total_comp_desc&page=1&limit=2`);
  const response = await salariesGET(request);
  const out = await jsonResponse(response as Response);
  const pass = out.status === 200 && out.json?.meta?.limit === 2 && Array.isArray(out.json?.data);
  return {
    pass,
    details: `status=${out.status} limit=${out.json?.meta?.limit} count=${out.json?.data?.length}`,
  };
}

async function testCompanyNotFound() {
  const request = new Request(`${baseUrl}/api/companies/nonexistent-slug`);
  const response = await companyGET(request, { params: Promise.resolve({ slug: 'nonexistent-slug' }) });
  const out = await jsonResponse(response as Response);
  return {
    pass: out.status === 404 && out.json?.error === true && out.json?.message === 'Company not found',
    details: `status=${out.status} message=${out.json?.message}`,
  };
}

async function testCompareSameUuid() {
  const salary = await prisma.salary.findFirst();
  if (!salary) throw new Error('No salary record available for compare test');
  const request = new Request(`${baseUrl}/api/compare?s1=${salary.id}&s2=${salary.id}`);
  const response = await compareGET(request);
  const out = await jsonResponse(response as Response);
  return {
    pass: out.status === 400 && out.json?.error === true && out.json?.message === 'Cannot compare a salary record against itself',
    details: `status=${out.status} message=${out.json?.message}`,
  };
}

async function testSalariesLimitCap() {
  const request = new Request(`${baseUrl}/api/salaries?limit=10000`);
  const response = await salariesGET(request);
  const out = await jsonResponse(response as Response);
  const pass = out.status === 200 && out.json?.meta?.limit === 100 && out.json?.data?.length <= 100;
  return {
    pass,
    details: `status=${out.status} limit=${out.json?.meta?.limit} count=${out.json?.data?.length}`,
  };
}

async function main() {
  const tests = [
    ['POST /api/ingest-salary negative salary', testIngestNegativeSalary],
    ['POST /api/ingest-salary invalid level', testIngestInvalidLevel],
    ['POST /api/ingest-salary recompute total compensation', testIngestRecomputeTotal],
    ['GET /api/salaries all filters', testSalariesAllFilters],
    ['GET /api/companies/nonexistent-slug 404', testCompanyNotFound],
    ['GET /api/compare same UUID', testCompareSameUuid],
    ['GET /api/salaries limit cap at 100', testSalariesLimitCap],
  ];

  const results = [] as Array<{ name: string; pass: boolean; details?: string }>;
  for (const [name, fn] of tests) {
    results.push(await runTest(name, fn));
  }

  const passed = results.filter((r) => r.pass).length;
  console.log(`\n${passed}/${results.length} tests passed`);
  await prisma.$disconnect();
  process.exit(passed === results.length ? 0 : 1);
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
