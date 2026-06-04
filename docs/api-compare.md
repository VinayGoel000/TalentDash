# GET /api/compare

## Endpoint

`GET /api/compare?s1={salaryUuid}&s2={salaryUuid}`

## Query parameters

- `s1` — first salary record UUID.
- `s2` — second salary record UUID.

## Success example

```json
{
  "record_1": {
    "id": "uuid1",
    "company_id": "companyUuid",
    "role": "Senior Software Engineer",
    "level": "L5",
    "location": "San Francisco, CA",
    "currency": "USD",
    "experience_years": 5,
    "base_salary": "180000",
    "bonus": "20000",
    "stock": "80000",
    "total_compensation": "280000",
    "source": "CONTRIBUTOR",
    "confidence_score": "0.95",
    "is_verified": true,
    "submitted_at": "2026-06-04T00:00:00.000Z",
    "company": {
      "id": "companyUuid",
      "name": "Google",
      "slug": "google",
      "normalized_name": "google",
      "industry": "Technology",
      "headquarters": "Mountain View, CA",
      "founded_year": 1998,
      "headcount_range": "10000+",
      "created_at": "2026-06-01T00:00:00.000Z",
      "updated_at": "2026-06-01T00:00:00.000Z"
    }
  },
  "record_2": {
    "id": "uuid2",
    "company_id": "companyUuid",
    "role": "Software Engineer",
    "level": "L4",
    "location": "San Francisco, CA",
    "currency": "USD",
    "experience_years": 3,
    "base_salary": "150000",
    "bonus": "15000",
    "stock": "60000",
    "total_compensation": "225000",
    "source": "CONTRIBUTOR",
    "confidence_score": "0.90",
    "is_verified": true,
    "submitted_at": "2026-06-03T00:00:00.000Z",
    "company": {
      "id": "companyUuid",
      "name": "Google",
      "slug": "google",
      "normalized_name": "google",
      "industry": "Technology",
      "headquarters": "Mountain View, CA",
      "founded_year": 1998,
      "headcount_range": "10000+",
      "created_at": "2026-06-01T00:00:00.000Z",
      "updated_at": "2026-06-01T00:00:00.000Z"
    }
  },
  "delta": {
    "base_delta": 30000,
    "bonus_delta": 5000,
    "stock_delta": 20000,
    "tc_delta": 55000,
    "experience_delta": 2
  }
}
```

## 400 example

Missing IDs:

```json
{
  "error": true,
  "message": "Both salary record IDs are required"
}
```

Same UUIDs:

```json
{
  "error": true,
  "message": "Cannot compare a salary record against itself"
}
```

## 404 example

```json
{
  "error": true,
  "message": "Salary record not found"
}
```

## Delta explanation

- `base_delta` = `record_1.base_salary - record_2.base_salary`
- `bonus_delta` = `record_1.bonus - record_2.bonus`
- `stock_delta` = `record_1.stock - record_2.stock`
- `tc_delta` = `record_1.total_compensation - record_2.total_compensation`
- `experience_delta` = `record_1.experience_years - record_2.experience_years`

Positive values mean `record_1` is higher. Negative values mean `record_2` is higher. Zero means the values match.
