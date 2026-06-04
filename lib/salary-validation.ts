import { Currency, Level, Source } from '@prisma/client';

export const allowedLevels = Object.values(Level);
export const allowedCurrencies = Object.values(Currency);
export const allowedSources = Object.values(Source);

export type IngestSalaryPayload = {
  company?: unknown;
  role?: unknown;
  level?: unknown;
  location?: unknown;
  currency?: unknown;
  experience_years?: unknown;
  base_salary?: unknown;
  bonus?: unknown;
  stock?: unknown;
  source?: unknown;
  confidence_score?: unknown;
  total_compensation?: unknown;
};

type ValidationError = { field: string; message: string };

const isPresent = (value: unknown) => value !== undefined && value !== null && !(typeof value === 'string' && value.trim() === '');

const asString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
const asNumber = (value: unknown) => (typeof value === 'number' ? value : typeof value === 'string' && value.trim() !== '' ? Number(value) : NaN);
const asBigInt = (value: unknown) => {
  if (typeof value === 'bigint') return value;
  if (typeof value === 'number' && Number.isFinite(value)) return BigInt(Math.trunc(value));
  if (typeof value === 'string' && value.trim() !== '') return BigInt(value.trim());
  throw new Error('invalid');
};

export function validateIngestPayload(body: IngestSalaryPayload): { ok: true; data: {
  company: string;
  role: string;
  level: Level;
  location: string;
  currency: Currency;
  experience_years: number;
  base_salary: bigint;
  bonus: bigint;
  stock: bigint;
  source: Source;
  confidence_score: number;
}; } | { ok: false; error: ValidationError } {
  const requiredFields: Array<keyof IngestSalaryPayload> = ['company', 'role', 'level', 'location', 'currency', 'experience_years', 'base_salary', 'source', 'confidence_score'];
  for (const field of requiredFields) {
    if (!isPresent(body[field])) {
      return { ok: false, error: { field, message: `${String(field)} is required` } };
    }
  }

  const company = asString(body.company);
  if (!company) return { ok: false, error: { field: 'company', message: 'Company is required' } };
  const role = asString(body.role);
  if (!role) return { ok: false, error: { field: 'role', message: 'Role is required' } };
  const location = asString(body.location);
  if (!location) return { ok: false, error: { field: 'location', message: 'Location is required' } };

  if (typeof body.level !== 'string') return { ok: false, error: { field: 'level', message: `Level must be one of: ${allowedLevels.join(', ')}` } };
  if (!allowedLevels.includes(body.level as Level)) return { ok: false, error: { field: 'level', message: `Level must be one of: ${allowedLevels.join(', ')}` } };

  if (typeof body.currency !== 'string') return { ok: false, error: { field: 'currency', message: `Currency must be one of: ${allowedCurrencies.join(', ')}` } };
  if (!allowedCurrencies.includes(body.currency as Currency)) return { ok: false, error: { field: 'currency', message: `Currency must be one of: ${allowedCurrencies.join(', ')}` } };

  if (typeof body.source !== 'string') return { ok: false, error: { field: 'source', message: `Source must be one of: ${allowedSources.join(', ')}` } };
  if (!allowedSources.includes(body.source as Source)) return { ok: false, error: { field: 'source', message: `Source must be one of: ${allowedSources.join(', ')}` } };

  const experience_years = asNumber(body.experience_years);
  if (!Number.isInteger(experience_years)) return { ok: false, error: { field: 'experience_years', message: 'Experience years must be a valid integer' } };
  if (experience_years <= 0 || experience_years >= 51) return { ok: false, error: { field: 'experience_years', message: 'Experience years must be greater than 0 and less than 51' } };

  let base_salary: bigint;
  let bonus: bigint = 0n;
  let stock: bigint = 0n;
  try {
    base_salary = asBigInt(body.base_salary);
  } catch {
    return { ok: false, error: { field: 'base_salary', message: 'Base salary must be a valid amount' } };
  }
  if (base_salary <= 0n) return { ok: false, error: { field: 'base_salary', message: 'Base salary must be greater than zero' } };

  try {
    if (isPresent(body.bonus)) bonus = asBigInt(body.bonus);
    if (isPresent(body.stock)) stock = asBigInt(body.stock);
  } catch {
    return { ok: false, error: { field: 'bonus', message: 'Bonus and stock must be valid amounts' } };
  }

  const confidence_score = asNumber(body.confidence_score);
  if (Number.isNaN(confidence_score)) return { ok: false, error: { field: 'confidence_score', message: 'Confidence score must be a valid number' } };
  if (confidence_score < 0 || confidence_score > 1) return { ok: false, error: { field: 'confidence_score', message: 'Confidence score must be between 0.0 and 1.0' } };

  return {
    ok: true,
    data: {
      company,
      role,
      level: body.level as Level,
      location,
      currency: body.currency as Currency,
      experience_years,
      base_salary,
      bonus,
      stock,
      source: body.source as Source,
      confidence_score,
    },
  };
}
