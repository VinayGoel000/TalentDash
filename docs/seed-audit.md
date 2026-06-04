# Seed Script Audit

| Requirement | Current Status | Pass/Fail | Changes Made |
| --- | --- | --- | --- |
| At least 60 salary records | 61 records | Pass | Added 4 new salary records to meet the 60+ requirement. |
| Companies required | All required companies present | Pass | No company additions needed; all required companies are seeded. |
| Level coverage | All levels included | Pass | No changes needed; seed already covered every required level. |
| Locations required | All required locations present | Pass | No changes needed; required locations already exist. |
| Currencies required | INR and USD present | Pass | Converted GBP records to USD and ensured only INR/USD remain. |
| Bonus zero edge case | Missing previously | Fail -> Fixed | Added a salary record with `bonus = 0`. |
| Stock zero edge case | Present | Pass | Existing stock-zero records were already present. |
| Very high equity edge case | Present | Pass | Existing high equity records available and no unrealistic values added. |
| PRINCIPAL records | Present | Pass | Seed already included principal-level records. |
| Normalization demo | Present | Pass | Seed includes `Google India`, `GOOGLE`, and `google` normalized to `google`. |
| Repeatable seed behavior | Present | Pass | Seed script deletes all companies and salaries before seeding, preventing uncontrolled duplicates. |

## Notes

- The seed file now contains 61 salary records and supports all required coverage.
- GBP currency entries were converted to USD to align with the currency requirement.
- The repeatable seed design is preserved and unchanged.
