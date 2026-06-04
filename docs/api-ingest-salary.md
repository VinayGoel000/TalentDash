# POST /api/ingest-salary

TalentDash ingestion endpoint for verified or contributor salary records.

## Request Body

Required fields:

- `company`
- `role`
- `level`
- `location`
- `currency`
- `experience_years`
- `base_salary`
- `source`
- `confidence_score`

Optional fields:

- `bonus`
- `stock`

Ignored field:

- `total_compensation`

## Validation Flow

Validation runs in this order:

1. Required fields present
2. Correct data types
3. `level` is a valid enum
4. `experience_years` is greater than `0` and less than `51`
5. `base_salary` is greater than `0`
6. `confidence_score` is between `0.0` and `1.0`

Every validation failure returns HTTP `400` with:

```json
{
  "error": true,
  "field": "level",
  "message": "Level must be one of: L3, L4, L5, L6, SDE_I, SDE_II, SDE_III, STAFF, PRINCIPAL, IC4, IC5"
}
```

## Normalization Flow

Company names are normalized before lookup and persistence:

- `trim()`
- lowercase
- punctuation removed
- repeated whitespace collapsed

Examples:

- ` Google `
- `GOOGLE`
- `google.`

All resolve to `google`.

The server uses `normalized_name` as the lookup key and generates `slug` server-side.

## Duplicate Flow

Before insert, the endpoint checks salary rows that match:

- same company
- same role
- same level
- same location
- submitted in the last 48 hours

Then it checks whether `base_salary` is within `±10%`.

If a duplicate is found, the API returns HTTP `409`:

```json
{
  "error": true,
  "message": "Potential duplicate salary record detected."
}
```

## Success Response

HTTP `201 Created`

```json
{
  "error": false,
  "record": {
    "id": "uuid",
    "company_id": "uuid",
    "role": "Software Engineer",
    "level": "L5",
    "location": "Bengaluru",
    "currency": "INR",
    "experience_years": 7,
    "base_salary": "7500000",
    "bonus": "620000",
    "stock": "2500000",
    "total_compensation": "10620000",
    "source": "SCRAPED",
    "confidence_score": "0.95",
    "is_verified": false,
    "submitted_at": "2026-06-04T00:00:00.000Z",
    "company": {
      "id": "uuid",
      "name": "Google",
      "slug": "google",
      "normalized_name": "google"
    }
  },
  "total_compensation": "10620000",
  "company": {
    "id": "uuid",
    "name": "Google",
    "slug": "google",
    "normalized_name": "google"
  }
}
```

## Error Examples

### Negative base salary

```json
{
  "error": true,
  "field": "base_salary",
  "message": "Base salary must be greater than zero"
}
```

### Invalid level

```json
{
  "error": true,
  "field": "level",
  "message": "Level must be one of: L3, L4, L5, L6, SDE_I, SDE_II, SDE_III, STAFF, PRINCIPAL, IC4, IC5"
}
```

### Confidence above 1

```json
{
  "error": true,
  "field": "confidence_score",
  "message": "Confidence score must be between 0.0 and 1.0"
}
```

### Confidence below 0

```json
{
  "error": true,
  "field": "confidence_score",
  "message": "Confidence score must be between 0.0 and 1.0"
}
```

### Duplicate record

```json
{
  "error": true,
  "message": "Potential duplicate salary record detected."
}
```
