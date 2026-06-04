export interface Company {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  industry?: string;
  founded_year?: number;
  headquarters?: string;
  employee_count?: number;
  logo_url?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyStats {
  name: string;
  slug: string;
  total_salaries: number;
  unique_roles: number;
  unique_levels: number;
  salary_count_by_level: Record<string, number>;
  average_total_compensation: number;
  median_total_compensation: number;
  location_distribution: Record<string, number>;
  currency_distribution: Record<string, number>;
}
