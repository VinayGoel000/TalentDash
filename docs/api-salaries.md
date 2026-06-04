# GET /api/salaries

## Supported query parameters

- `company` — case-insensitive partial match on company name.
- `role` — case-insensitive partial match on role.
- `level` — exact enum match. Valid values: `L3`, `L4`, `L5`, `L6`, `SDE_I`, `SDE_II`, `SDE_III`, `STAFF`, `PRINCIPAL`, `IC4`, `IC5`.
- `location` — case-insensitive partial match.
- `currency` — exact enum match. Valid values: `INR`, `USD`, `GBP`, `EUR`.
- `sort` — supported values: `total_comp_desc`, `total_comp_asc`, `date_desc`.
- `page` — page number, default `1`.
- `limit` — page size, default `25`, maximum `100`.

## Filter examples

- `GET /api/salaries?company=google`
- `GET /api/salaries?role=engineer`
- `GET /api/salaries?level=L5`
- `GET /api/salaries?location=remote`
- `GET /api/salaries?currency=USD`
- `GET /api/salaries?company=google&role=engineer&location=san%20francisco`

## Pagination examples

- `GET /api/salaries?page=1&limit=25`
- `GET /api/salaries?page=2&limit=50`
- `GET /api/salaries?limit=200` — limit is capped at `100`.

## Sort examples

- `GET /api/salaries?sort=total_comp_desc`
- `GET /api/salaries?sort=total_comp_asc`
- `GET /api/salaries?sort=date_desc`
- no `sort` param defaults to `date_desc`

## Response example

```json
{
  "data": [
    {
      "id": "...",
      "company_id": "...",
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
  ],
  "meta": {
    "total": 312,
    "page": 1,
    "limit": 25,
    "totalPages": 13
  }
}
```
