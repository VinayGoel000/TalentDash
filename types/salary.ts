export interface SalaryRecord {
  id: string;
  company: string;
  company_slug: string;
  role: string;
  level_standardized: string;
  location: string;
  currency: string;
  experience_years: number;
  base_salary: number;
  bonus: number;
  stock: number;
  total_compensation: number;
  source: 'CONTRIBUTOR' | 'SURVEY' | 'INTEGRATED_PARTNER';
  confidence_score: number;
  submitted_at: string;
  is_verified: boolean;
}

export interface SalaryFilter {
  company?: string;
  role?: string;
  level?: string;
  location?: string;
  currency?: string;
  minSalary?: number;
  maxSalary?: number;
}

export interface SalaryComparison {
  s1: SalaryRecord;
  s2: SalaryRecord;
  baseDifference: number;
  bonusDifference: number;
  stockDifference: number;
  totalDifference: number;
  percentageDifference: number;
}

export interface SalaryStats {
  count: number;
  averageBase: number;
  medianBase: number;
  averageTotal: number;
  medianTotal: number;
  minTotal: number;
  maxTotal: number;
}
