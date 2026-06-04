# Seed Data Summary

## Total records

- `61` salary records after seed.

## Companies included

- Google
- Amazon
- Meta
- Microsoft
- Flipkart
- Meesho
- NVIDIA
- TCS
- Infosys
- Wipro
- Razorpay
- Zepto

## Locations included

- Bengaluru
- Mumbai
- Hyderabad
- Pune
- Delhi
- San Francisco
- London
- Seattle

## Levels included

- L3
- L4
- L5
- L6
- SDE_I
- SDE_II
- SDE_III
- STAFF
- PRINCIPAL
- IC4
- IC5

## Currencies included

- INR
- USD

## Edge cases

- One record has `bonus = 0`.
- Multiple records have `stock = 0`.
- One record includes very high equity compensation.
- Multiple `PRINCIPAL` records are present.

## Normalization examples

The seed includes company names that intentionally normalize to the same canonical company:

- `Google India`
- `GOOGLE`
- `google`

All of these resolve to the same normalized company key and slug:

- `slug = google`
- `normalized_name = google`

This demonstrates repeatable normalization across variations of the same brand.

## Repeatable seed behavior

The seed script uses `prisma.company.deleteMany()` and `prisma.salary.deleteMany()` before recreating data. Re-running `npx prisma db seed` will recreate the seeded state without uncontrolled duplicates.
