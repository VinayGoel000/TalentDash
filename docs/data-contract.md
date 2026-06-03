# TalentDash Data Contract

## Purpose

This document defines the canonical salary record schema.

Every layer depends on this schema:

* Database
* API
* Frontend
* Scrapers
* AI Normalizers
* Analytics

Any change here affects the entire system.

---

# Core Rule

Never trust client submitted data.

All critical fields must be validated and normalized server-side.

---

# Salary Record Schema

## company

Type:
string

Required:
Yes

Validation:

* Trim whitespace
* Convert to lowercase
* Normalize before storage

Examples:

Google
GOOGLE
google

Stored As:

google

Reason:

Prevent duplicate company records.

---

## company_slug

Type:
string

Required:
Yes

Generated:
Server Side

Examples:

google

tata-consultancy-services

microsoft

Purpose:

Used for SEO routes.

Examples:

/companies/google

/companies/microsoft

---

## role

Type:
string

Required:
Yes

Examples:

Software Engineer

Product Manager

Data Analyst

Rules:

Preserve original value.

Do not normalize.

---

## level_standardized

Type:
enum

Required:
Yes

Allowed Values:

L3
L4
L5
L6

SDE-I
SDE-II
SDE-III

Staff
Principal

IC4
IC5

Rules:

Reject arbitrary values.

Examples Rejected:

Senior Engineer

Tech Lead

Lead Developer

Examples Accepted:

SDE-II

L5

Principal

Normalization handled by AI layer.

---

## location

Type:
string

Required:
Yes

Examples:

Bengaluru

Mumbai

Pune

San Francisco

Remote

Rules:

Store city only.

Do not append country.

---

## currency

Type:
enum

Required:
Yes

Allowed Values:

INR
USD
GBP
EUR

Purpose:

Formatting
Conversion
Comparison

---

## experience_years

Type:
integer

Required:
Yes

Validation:

Minimum:
0

Maximum:
50

Examples:

2

5

12

Range Handling:

5-8 years

Stored As:

6

(midpoint)

---

## base_salary

Type:
number

Required:
Yes

Validation:

Must be greater than zero.

Storage:

Smallest currency unit.

Examples:

INR -> Paise

USD -> Cents

---

## bonus

Type:
number

Required:
No

Default:

0

Rules:

Never store null.

---

## stock

Type:
number

Required:
No

Default:

0

Rules:

Never store null.

---

# Most Important Field

## total_compensation

Type:
number

Computed:
Server Side Only

Required:
Never from Client

Formula:

base_salary
+
bonus
+
stock

Example:

Base:
2000000

Bonus:
200000

Stock:
300000

Total Compensation:
2500000

Rules:

Never trust client value.

Always recompute.

Always overwrite submitted value.

---

## source

Type:
enum

Required:
Yes

Allowed Values:

CONTRIBUTOR

SCRAPED

AI_INFERRED

Purpose:

Data provenance.

---

## confidence_score

Type:
float

Required:
Yes

Range:

0.0
to
1.0

Examples:

Contributor Complete:
0.95

Contributor Partial:
0.80

Scraped Partial:
0.55

AI Inferred:
0.40

Purpose:

Quality ranking

Weighted median calculations

Filtering

---

## submitted_at

Type:
timestamp

Generated:
Server Side

Required:
Automatic

Rules:

Never trust client timestamps.

---

## is_verified

Type:
boolean

Default:

false

Purpose:

Moderation status.

Examples:

true

false

---

# Backend Validation Rules

1.

company must be normalized.

---

2.

company_slug must be generated server-side.

---

3.

level_standardized must be valid enum.

---

4.

experience_years must be between 0 and 50.

---

5.

base_salary must be positive.

---

6.

bonus defaults to 0.

---

7.

stock defaults to 0.

---

8.

submitted_at generated server-side.

---

9.

total_compensation always recomputed.

---

10.

confidence_score must be between 0 and 1.

---

# Frontend Rules

Frontend should:

* Display formatted company names
* Display formatted salary values
* Never compute total compensation
* Never trust incoming raw values

Frontend consumes validated data only.

---

# AI Layer Rules

AI may:

* Normalize companies
* Normalize levels
* Infer missing metadata

AI may NOT:

* Override verified data
* Directly write to production tables

---

# Database Rules

Single source of truth:

PostgreSQL

Canonical salary record follows this contract.

No exceptions.

---

# Golden Rule

total_compensation

=

base_salary
+
bonus
+
stock

Always computed server-side.

Never trusted from client input.
