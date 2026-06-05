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
