import { Currency, Level, PrismaClient, Source } from '@prisma/client';
import { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

type SeedCompanyInput = {
  name: string;
  industry?: string;
  headquarters?: string;
  founded_year?: number;
  headcount_range?: string;
};

type SeedSalaryInput = {
  companyName: string;
  role: string;
  level: Level;
  location: string;
  currency: Currency;
  experience_years: number;
  base_salary: bigint;
  bonus?: bigint;
  stock?: bigint;
  source: Source;
  confidence_score: string;
  is_verified?: boolean;
};

const normalizeCompanyName = (value: string) => value.trim().toLowerCase().replace(/\s+/g, ' ');

const canonicalCompanyKey = (value: string) => {
  const normalized = normalizeCompanyName(value);
  if (normalized === 'google india' || normalized === 'google') {
    return 'google';
  }
  return normalized;
};

const slugifyCompanyName = (value: string) =>
  canonicalCompanyKey(value)
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const companies: SeedCompanyInput[] = [
  { name: 'Google', industry: 'Technology', headquarters: 'Mountain View, CA', founded_year: 1998, headcount_range: '10000+' },
  { name: 'Amazon', industry: 'E-commerce', headquarters: 'Seattle, WA', founded_year: 1994, headcount_range: '10000+' },
  { name: 'Meta', industry: 'Technology', headquarters: 'Menlo Park, CA', founded_year: 2004, headcount_range: '10000+' },
  { name: 'Microsoft', industry: 'Technology', headquarters: 'Redmond, WA', founded_year: 1975, headcount_range: '10000+' },
  { name: 'Flipkart', industry: 'E-commerce', headquarters: 'Bengaluru, India', founded_year: 2007, headcount_range: '5001-10000' },
  { name: 'Meesho', industry: 'E-commerce', headquarters: 'Bengaluru, India', founded_year: 2015, headcount_range: '1001-5000' },
  { name: 'NVIDIA', industry: 'Semiconductors', headquarters: 'Santa Clara, CA', founded_year: 1993, headcount_range: '10000+' },
  { name: 'TCS', industry: 'IT Services', headquarters: 'Mumbai, India', founded_year: 1968, headcount_range: '10000+' },
  { name: 'Infosys', industry: 'IT Services', headquarters: 'Bengaluru, India', founded_year: 1981, headcount_range: '10000+' },
  { name: 'Wipro', industry: 'IT Services', headquarters: 'Bengaluru, India', founded_year: 1945, headcount_range: '10000+' },
  { name: 'Razorpay', industry: 'Fintech', headquarters: 'Bengaluru, India', founded_year: 2014, headcount_range: '1001-5000' },
  { name: 'Zepto', industry: 'Quick Commerce', headquarters: 'Bengaluru, India', founded_year: 2021, headcount_range: '1001-5000' },
  { name: 'Google India', industry: 'Technology', headquarters: 'Bengaluru, India', founded_year: 1998, headcount_range: '10000+' },
  { name: 'GOOGLE', industry: 'Technology', headquarters: 'Mountain View, CA', founded_year: 1998, headcount_range: '10000+' },
  { name: 'google', industry: 'Technology', headquarters: 'Mountain View, CA', founded_year: 1998, headcount_range: '10000+' },
];

const salaries: SeedSalaryInput[] = [
  { companyName: 'Google', role: 'Software Engineer', level: Level.L3, location: 'Bengaluru', currency: Currency.INR, experience_years: 2, base_salary: 3200000n, bonus: 250000n, stock: 900000n, source: Source.CONTRIBUTOR, confidence_score: '0.95', is_verified: true },
  { companyName: 'Google', role: 'Software Engineer', level: Level.L4, location: 'Bengaluru', currency: Currency.INR, experience_years: 4, base_salary: 4800000n, bonus: 400000n, stock: 1400000n, source: Source.SCRAPED, confidence_score: '0.88', is_verified: true },
  { companyName: 'Google', role: 'Software Engineer', level: Level.L5, location: 'Bengaluru', currency: Currency.INR, experience_years: 7, base_salary: 7200000n, bonus: 650000n, stock: 2200000n, source: Source.CONTRIBUTOR, confidence_score: '0.97', is_verified: true },
  { companyName: 'Google', role: 'Software Engineer', level: Level.L6, location: 'Bengaluru', currency: Currency.INR, experience_years: 10, base_salary: 11000000n, bonus: 950000n, stock: 4200000n, source: Source.SCRAPED, confidence_score: '0.90', is_verified: true },
  { companyName: 'Google', role: 'Staff Software Engineer', level: Level.STAFF, location: 'San Francisco', currency: Currency.USD, experience_years: 12, base_salary: 235000000n, bonus: 22000000n, stock: 68000000n, source: Source.CONTRIBUTOR, confidence_score: '0.96', is_verified: true },
  { companyName: 'Amazon', role: 'Software Development Engineer', level: Level.SDE_I, location: 'Hyderabad', currency: Currency.INR, experience_years: 1, base_salary: 1800000n, bonus: 120000n, stock: 450000n, source: Source.CONTRIBUTOR, confidence_score: '0.91', is_verified: true },
  { companyName: 'Amazon', role: 'Software Development Engineer', level: Level.SDE_II, location: 'Hyderabad', currency: Currency.INR, experience_years: 3, base_salary: 3200000n, bonus: 250000n, stock: 850000n, source: Source.SCRAPED, confidence_score: '0.86', is_verified: true },
  { companyName: 'Amazon', role: 'Software Development Engineer', level: Level.SDE_III, location: 'Hyderabad', currency: Currency.INR, experience_years: 6, base_salary: 5600000n, bonus: 500000n, stock: 1500000n, source: Source.CONTRIBUTOR, confidence_score: '0.93', is_verified: true },
  { companyName: 'Amazon', role: 'Senior Software Engineer', level: Level.L6, location: 'Seattle', currency: Currency.USD, experience_years: 9, base_salary: 210000000n, bonus: 25000000n, stock: 62000000n, source: Source.SCRAPED, confidence_score: '0.89', is_verified: true },
  { companyName: 'Amazon', role: 'Principal Engineer', level: Level.PRINCIPAL, location: 'Seattle', currency: Currency.USD, experience_years: 16, base_salary: 295000000n, bonus: 32000000n, stock: 98000000n, source: Source.CONTRIBUTOR, confidence_score: '0.98', is_verified: true },
  { companyName: 'Meta', role: 'Software Engineer', level: Level.L4, location: 'Bengaluru', currency: Currency.INR, experience_years: 3, base_salary: 5200000n, bonus: 450000n, stock: 1800000n, source: Source.CONTRIBUTOR, confidence_score: '0.94', is_verified: true },
  { companyName: 'Meta', role: 'Software Engineer', level: Level.L5, location: 'Bengaluru', currency: Currency.INR, experience_years: 6, base_salary: 8200000n, bonus: 700000n, stock: 3200000n, source: Source.SCRAPED, confidence_score: '0.88', is_verified: true },
  { companyName: 'Meta', role: 'Staff Engineer', level: Level.STAFF, location: 'San Francisco', currency: Currency.USD, experience_years: 11, base_salary: 245000000n, bonus: 28000000n, stock: 92000000n, source: Source.CONTRIBUTOR, confidence_score: '0.97', is_verified: true },
  { companyName: 'Microsoft', role: 'Software Engineer', level: Level.L4, location: 'Hyderabad', currency: Currency.INR, experience_years: 3, base_salary: 4100000n, bonus: 300000n, stock: 900000n, source: Source.CONTRIBUTOR, confidence_score: '0.92', is_verified: true },
  { companyName: 'Microsoft', role: 'Software Engineer', level: Level.L5, location: 'Bengaluru', currency: Currency.INR, experience_years: 6, base_salary: 6800000n, bonus: 600000n, stock: 2100000n, source: Source.SCRAPED, confidence_score: '0.89', is_verified: true },
  { companyName: 'Microsoft', role: 'Principal Software Engineer', level: Level.PRINCIPAL, location: 'Seattle', currency: Currency.USD, experience_years: 15, base_salary: 285000000n, bonus: 30000000n, stock: 85000000n, source: Source.CONTRIBUTOR, confidence_score: '0.96', is_verified: true },
  { companyName: 'Flipkart', role: 'Backend Engineer', level: Level.L3, location: 'Bengaluru', currency: Currency.INR, experience_years: 2, base_salary: 2400000n, bonus: 150000n, stock: 300000n, source: Source.CONTRIBUTOR, confidence_score: '0.85', is_verified: true },
  { companyName: 'Flipkart', role: 'Backend Engineer', level: Level.L4, location: 'Bengaluru', currency: Currency.INR, experience_years: 4, base_salary: 3800000n, bonus: 250000n, stock: 650000n, source: Source.SCRAPED, confidence_score: '0.83', is_verified: true },
  { companyName: 'Flipkart', role: 'Engineering Manager', level: Level.L6, location: 'Bengaluru', currency: Currency.INR, experience_years: 11, base_salary: 9700000n, bonus: 900000n, stock: 2800000n, source: Source.CONTRIBUTOR, confidence_score: '0.90', is_verified: true },
  { companyName: 'Meesho', role: 'Software Engineer', level: Level.SDE_I, location: 'Bengaluru', currency: Currency.INR, experience_years: 1, base_salary: 1700000n, bonus: 100000n, stock: 150000n, source: Source.CONTRIBUTOR, confidence_score: '0.82', is_verified: true },
  { companyName: 'Meesho', role: 'Software Engineer', level: Level.SDE_II, location: 'Bengaluru', currency: Currency.INR, experience_years: 4, base_salary: 3200000n, bonus: 200000n, stock: 500000n, source: Source.SCRAPED, confidence_score: '0.84', is_verified: true },
  { companyName: 'Meesho', role: 'Engineering Manager', level: Level.L5, location: 'Bengaluru', currency: Currency.INR, experience_years: 8, base_salary: 6200000n, bonus: 450000n, stock: 1400000n, source: Source.CONTRIBUTOR, confidence_score: '0.88', is_verified: true },
  { companyName: 'NVIDIA', role: 'GPU Software Engineer', level: Level.L4, location: 'San Francisco', currency: Currency.USD, experience_years: 4, base_salary: 185000000n, bonus: 18000000n, stock: 52000000n, source: Source.CONTRIBUTOR, confidence_score: '0.95', is_verified: true },
  { companyName: 'NVIDIA', role: 'GPU Software Engineer', level: Level.L5, location: 'San Francisco', currency: Currency.USD, experience_years: 7, base_salary: 225000000n, bonus: 24000000n, stock: 78000000n, source: Source.SCRAPED, confidence_score: '0.92', is_verified: true },
  { companyName: 'NVIDIA', role: 'Principal Engineer', level: Level.PRINCIPAL, location: 'San Francisco', currency: Currency.USD, experience_years: 17, base_salary: 330000000n, bonus: 35000000n, stock: 125000000n, source: Source.CONTRIBUTOR, confidence_score: '0.99', is_verified: true },
  { companyName: 'TCS', role: 'System Engineer', level: Level.L3, location: 'Pune', currency: Currency.INR, experience_years: 1, base_salary: 850000n, bonus: 50000n, stock: 0n, source: Source.CONTRIBUTOR, confidence_score: '0.78', is_verified: true },
  { companyName: 'TCS', role: 'IT Analyst', level: Level.L4, location: 'Pune', currency: Currency.INR, experience_years: 3, base_salary: 1250000n, bonus: 75000n, stock: 0n, source: Source.SCRAPED, confidence_score: '0.80', is_verified: true },
  { companyName: 'TCS', role: 'Technical Lead', level: Level.L5, location: 'Mumbai', currency: Currency.INR, experience_years: 7, base_salary: 2200000n, bonus: 120000n, stock: 0n, source: Source.CONTRIBUTOR, confidence_score: '0.81', is_verified: true },
  { companyName: 'Infosys', role: 'Systems Engineer', level: Level.L3, location: 'Bengaluru', currency: Currency.INR, experience_years: 1, base_salary: 780000n, bonus: 40000n, stock: 0n, source: Source.CONTRIBUTOR, confidence_score: '0.77', is_verified: true },
  { companyName: 'Infosys', role: 'Senior Systems Engineer', level: Level.L4, location: 'Bengaluru', currency: Currency.INR, experience_years: 3, base_salary: 1180000n, bonus: 70000n, stock: 0n, source: Source.SCRAPED, confidence_score: '0.79', is_verified: true },
  { companyName: 'Infosys', role: 'Technology Lead', level: Level.L5, location: 'Pune', currency: Currency.INR, experience_years: 7, base_salary: 2150000n, bonus: 100000n, stock: 0n, source: Source.CONTRIBUTOR, confidence_score: '0.82', is_verified: true },
  { companyName: 'Wipro', role: 'Project Engineer', level: Level.L3, location: 'Hyderabad', currency: Currency.INR, experience_years: 1, base_salary: 760000n, bonus: 45000n, stock: 0n, source: Source.CONTRIBUTOR, confidence_score: '0.76', is_verified: true },
  { companyName: 'Wipro', role: 'Software Engineer', level: Level.L4, location: 'Bengaluru', currency: Currency.INR, experience_years: 4, base_salary: 1300000n, bonus: 80000n, stock: 0n, source: Source.SCRAPED, confidence_score: '0.78', is_verified: true },
  { companyName: 'Wipro', role: 'Senior Software Engineer', level: Level.L5, location: 'Pune', currency: Currency.INR, experience_years: 8, base_salary: 2100000n, bonus: 130000n, stock: 0n, source: Source.CONTRIBUTOR, confidence_score: '0.80', is_verified: true },
  { companyName: 'Razorpay', role: 'Backend Engineer', level: Level.L4, location: 'Bengaluru', currency: Currency.INR, experience_years: 4, base_salary: 3600000n, bonus: 300000n, stock: 1200000n, source: Source.CONTRIBUTOR, confidence_score: '0.94', is_verified: true },
  { companyName: 'Razorpay', role: 'Backend Engineer', level: Level.L5, location: 'Bengaluru', currency: Currency.INR, experience_years: 6, base_salary: 5600000n, bonus: 500000n, stock: 2200000n, source: Source.SCRAPED, confidence_score: '0.92', is_verified: true },
  { companyName: 'Razorpay', role: 'Principal Engineer', level: Level.PRINCIPAL, location: 'Bengaluru', currency: Currency.INR, experience_years: 14, base_salary: 9800000n, bonus: 950000n, stock: 5200000n, source: Source.CONTRIBUTOR, confidence_score: '0.98', is_verified: true },
  { companyName: 'Zepto', role: 'Software Engineer', level: Level.L3, location: 'Bengaluru', currency: Currency.INR, experience_years: 1, base_salary: 1900000n, bonus: 90000n, stock: 250000n, source: Source.CONTRIBUTOR, confidence_score: '0.84', is_verified: true },
  { companyName: 'Zepto', role: 'Software Engineer', level: Level.L4, location: 'Bengaluru', currency: Currency.INR, experience_years: 3, base_salary: 3100000n, bonus: 180000n, stock: 600000n, source: Source.SCRAPED, confidence_score: '0.85', is_verified: true },
  { companyName: 'Zepto', role: 'Engineering Manager', level: Level.L5, location: 'Mumbai', currency: Currency.INR, experience_years: 8, base_salary: 6400000n, bonus: 420000n, stock: 1400000n, source: Source.CONTRIBUTOR, confidence_score: '0.88', is_verified: true },
  { companyName: 'Google India', role: 'Software Engineer', level: Level.L4, location: 'Bengaluru', currency: Currency.INR, experience_years: 4, base_salary: 4900000n, bonus: 350000n, stock: 1500000n, source: Source.CONTRIBUTOR, confidence_score: '0.96', is_verified: true },
  { companyName: 'GOOGLE', role: 'Software Engineer', level: Level.L5, location: 'Bengaluru', currency: Currency.INR, experience_years: 7, base_salary: 7500000n, bonus: 620000n, stock: 2500000n, source: Source.SCRAPED, confidence_score: '0.95', is_verified: true },
  { companyName: 'google', role: 'Principal Engineer', level: Level.PRINCIPAL, location: 'San Francisco', currency: Currency.USD, experience_years: 18, base_salary: 340000000n, bonus: 36000000n, stock: 130000000n, source: Source.CONTRIBUTOR, confidence_score: '0.99', is_verified: true },
  { companyName: 'Amazon', role: 'Applied Scientist', level: Level.L5, location: 'London', currency: Currency.GBP, experience_years: 6, base_salary: 145000000n, bonus: 12000000n, stock: 28000000n, source: Source.SCRAPED, confidence_score: '0.87', is_verified: true },
  { companyName: 'Microsoft', role: 'Data Scientist', level: Level.L4, location: 'London', currency: Currency.GBP, experience_years: 4, base_salary: 112000000n, bonus: 9000000n, stock: 21000000n, source: Source.CONTRIBUTOR, confidence_score: '0.86', is_verified: true },
  { companyName: 'Meta', role: 'Machine Learning Engineer', level: Level.L6, location: 'London', currency: Currency.GBP, experience_years: 9, base_salary: 176000000n, bonus: 15000000n, stock: 42000000n, source: Source.CONTRIBUTOR, confidence_score: '0.91', is_verified: true },
  { companyName: 'Razorpay', role: 'Software Engineer', level: Level.L4, location: 'Delhi', currency: Currency.INR, experience_years: 3, base_salary: 3400000n, bonus: 220000n, stock: 900000n, source: Source.CONTRIBUTOR, confidence_score: '0.87', is_verified: true },
  { companyName: 'Flipkart', role: 'Data Engineer', level: Level.L5, location: 'Delhi', currency: Currency.INR, experience_years: 7, base_salary: 6100000n, bonus: 460000n, stock: 1500000n, source: Source.SCRAPED, confidence_score: '0.86', is_verified: true },
  { companyName: 'Meesho', role: 'Product Manager', level: Level.L6, location: 'Mumbai', currency: Currency.INR, experience_years: 10, base_salary: 8800000n, bonus: 650000n, stock: 2400000n, source: Source.CONTRIBUTOR, confidence_score: '0.90', is_verified: true },
  { companyName: 'NVIDIA', role: 'Hardware Engineer', level: Level.L5, location: 'San Francisco', currency: Currency.USD, experience_years: 8, base_salary: 228000000n, bonus: 21000000n, stock: 70000000n, source: Source.SCRAPED, confidence_score: '0.93', is_verified: true },
  { companyName: 'TCS', role: 'Solution Architect', level: Level.STAFF, location: 'Mumbai', currency: Currency.INR, experience_years: 13, base_salary: 4800000n, bonus: 250000n, stock: 0n, source: Source.CONTRIBUTOR, confidence_score: '0.83', is_verified: true },
  { companyName: 'Infosys', role: 'Program Manager', level: Level.L6, location: 'Bengaluru', currency: Currency.INR, experience_years: 12, base_salary: 5200000n, bonus: 300000n, stock: 0n, source: Source.CONTRIBUTOR, confidence_score: '0.84', is_verified: true },
  { companyName: 'Wipro', role: 'Delivery Manager', level: Level.STAFF, location: 'Delhi', currency: Currency.INR, experience_years: 14, base_salary: 5400000n, bonus: 320000n, stock: 0n, source: Source.SCRAPED, confidence_score: '0.82', is_verified: true },
  { companyName: 'Zepto', role: 'Principal Engineer', level: Level.PRINCIPAL, location: 'Bengaluru', currency: Currency.INR, experience_years: 15, base_salary: 10400000n, bonus: 850000n, stock: 5200000n, source: Source.CONTRIBUTOR, confidence_score: '0.98', is_verified: true },
  { companyName: 'Google', role: 'Developer Advocate', level: Level.IC4, location: 'London', currency: Currency.GBP, experience_years: 5, base_salary: 98000000n, bonus: 8000000n, stock: 18000000n, source: Source.CONTRIBUTOR, confidence_score: '0.89', is_verified: true },
  { companyName: 'Google', role: 'Site Reliability Engineer', level: Level.IC5, location: 'San Francisco', currency: Currency.USD, experience_years: 9, base_salary: 248000000n, bonus: 23000000n, stock: 76000000n, source: Source.SCRAPED, confidence_score: '0.94', is_verified: true },
  { companyName: 'Amazon', role: 'Product Manager', level: Level.L5, location: 'Mumbai', currency: Currency.INR, experience_years: 6, base_salary: 6900000n, bonus: 500000n, stock: 1800000n, source: Source.CONTRIBUTOR, confidence_score: '0.91', is_verified: true },
];

async function main() {
  await prisma.salary.deleteMany();
  await prisma.company.deleteMany();

  const uniqueCompanies = new Map<string, SeedCompanyInput>();

  for (const company of companies) {
    const key = canonicalCompanyKey(company.name);
    if (!uniqueCompanies.has(key)) {
      uniqueCompanies.set(key, company);
    }
  }

  const createdCompanies = new Map<string, { id: string; slug: string; normalized_name: string }>();

  for (const company of uniqueCompanies.values()) {
    const normalized_name = canonicalCompanyKey(company.name);
    const slug = slugifyCompanyName(company.name);

    const created = await prisma.company.create({
      data: {
        name: company.name,
        slug,
        normalized_name,
        industry: company.industry,
        headquarters: company.headquarters,
        founded_year: company.founded_year,
        headcount_range: company.headcount_range,
      },
    });

    createdCompanies.set(normalized_name, created);
  }

  for (const salary of salaries) {
    const key = canonicalCompanyKey(salary.companyName);
    const company = createdCompanies.get(key);

    if (!company) {
      throw new Error(`Missing company for salary seed: ${salary.companyName}`);
    }

    const total_compensation = salary.base_salary + (salary.bonus ?? 0n) + (salary.stock ?? 0n);

    await prisma.salary.create({
      data: {
        company_id: company.id,
        role: salary.role,
        level: salary.level,
        location: salary.location,
        currency: salary.currency,
        experience_years: salary.experience_years,
        base_salary: salary.base_salary,
        bonus: salary.bonus ?? 0n,
        stock: salary.stock ?? 0n,
        total_compensation,
        source: salary.source,
        confidence_score: new Prisma.Decimal(salary.confidence_score),
        is_verified: salary.is_verified ?? false,
        submitted_at: new Date(),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    await prisma.$disconnect();
    throw error;
  });
