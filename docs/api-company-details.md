# GET /api/companies/[slug]

## Route

`GET /api/companies/{slug}`

## Description

Returns company metadata, all salary records for that company, the true median of `total_compensation`, and a level distribution count.

## Response shape

```json
{
  "company": {
    "id": "...",
    "name": "Google",
    "slug": "google",
    "normalized_name": "google",
    "industry": "Technology",
    "headquarters": "Mountain View, CA",
    "founded_year": 1998,
    "headcount_range": "10000+",
    "created_at": "2026-06-01T00:00:00.000Z",
    "updated_at": "2026-06-01T00:00:00.000Z"
  },
  "median_total_compensation": 280000,
  "level_distribution": {
    "L3": 0,
    "L4": 5,
    "L5": 12,
    "L6": 4,
    "SDE_I": 3,
    "SDE_II": 1,
    "SDE_III": 0,
    "STAFF": 0,
    "PRINCIPAL": 0,
    "IC4": 0,
    "IC5": 0
  },
  "salaries": [
    {
      "id": "...",
      "company_id": "...",
      "role": "Staff Software Engineer",
      "level": "L6",
      "location": "Seattle, WA",
      "currency": "USD",
      "experience_years": 8,
      "base_salary": "210000",
      "bonus": "30000",
      "stock": "120000",
      "total_compensation": "360000",
      "source": "CONTRIBUTOR",
      "confidence_score": "0.96",
      "is_verified": true,
      "submitted_at": "2026-06-04T00:00:00.000Z",
      "company": {
        "id": "...",
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
    }
  ]
}
```

## Median calculation examples

- Odd count: `[100, 200, 300]` → median = `200`
- Even count: `[100, 200, 300, 400]` → median = `(200 + 300) / 2 = 250`

## Level distribution example

```json
{
  "L3": 0,
  "L4": 5,
  "L5": 12,
  "L6": 4,
  "SDE_I": 3,
  "SDE_II": 1,
  "SDE_III": 0,
  "STAFF": 0,
  "PRINCIPAL": 0,
  "IC4": 0,
  "IC5": 0
}
```

## 404 example

```json
{
  "error": true,
  "message": "Company not found"
}
```
