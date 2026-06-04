# F4 — Compare Page Documentation

**Date:** 2026-06-04  
**Status:** ✅ COMPLETE

---

## Executive Summary

F4 Compare Page enables users to select and compare any two salary records side-by-side with delta analysis. The page reuses all existing logic from F2 (SalaryTable, currency formatters, mock data, badges) and maintains design consistency.

---

## URL State Strategy

### Format

```
/compare?s1=<record_id>&s2=<record_id>
```

### Example

```
/compare?s1=google-001&s2=amazon-002
```

### State Preservation

- Page refresh preserves selected records via URL parameters
- Shareable URLs reproduce exact same comparison
- Both records optional until comparison needed

### Implementation

Uses Next.js `useSearchParams()` and `useRouter().push()`:

```typescript
// Get record IDs from URL
const s1 = searchParams.get('s1');
const s2 = searchParams.get('s2');

// Update URL on selection
const handleRecordAChange = useCallback((id: string) => {
  const params = new URLSearchParams(searchParams);
  params.set('s1', id);
  router.push(`?${params.toString()}`);
}, [searchParams, router]);
```

---

## Component Architecture

### CompareSelectors.tsx

**Purpose:** Dropdown selection UI for two salary records

**Props:**
- `recordA: SalaryRecord | null` - Selected record A
- `recordB: SalaryRecord | null` - Selected record B
- `onRecordAChange: (id: string) => void` - Callback for record A selection
- `onRecordBChange: (id: string) => void` - Callback for record B selection

**Features:**
- Dropdown with all mock data records
- Record label format: `Company • Role • Level • Location`
- Quick info display: Currency, experience, total comp
- Clear visual feedback

### ComparisonTable.tsx

**Purpose:** Side-by-side comparison display with delta analysis

**Props:**
- `recordA: SalaryRecord` - First salary record
- `recordB: SalaryRecord` - Second salary record

**Rows:**
1. Company
2. Role
3. Level (uses LevelBadge component)
4. Location
5. Experience
6. Base Salary
7. Bonus
8. Stock
9. Total Compensation (highlighted)

**Delta Column Features:**
- Automatic currency conversion (uses record A's currency as display currency)
- Color-coded: Green (A higher), Red (B higher), Neutral (equal)
- Formatted with ₹ or $ symbol
- Shows ± prefix for deltas

**Winner Badge:**
- Displays on higher Total Compensation row
- Label: "Higher TC"
- Style: Blue badge (#0369A1 accent color)
- Only one winner shown
- If equal, shows "Equal Compensation" message

---

## Delta Calculation Logic

### File: lib/compare-utils.ts

#### calculateDelta()

```typescript
function calculateDelta(
  recordA: number,
  recordB: number,
  currency: Currency
): ComparisonDelta
```

**Logic:**
```
delta = recordA - recordB

isPositive = delta > 0
isNeutral = delta === 0
formatted = formatSalaryWithCurrency(Math.abs(delta), currency)
label = isPositive ? '+' : isNeutral ? '' : '−'
```

**Example:**
- Record A Base: ₹2,200,000
- Record B Base: ₹2,000,000
- Delta: +₹200,000 (green, Record A higher)

#### getHigherTCRecord()

```typescript
function getHigherTCRecord(
  recordA: SalaryRecord,
  recordB: SalaryRecord
): 'A' | 'B' | 'EQUAL'
```

**Logic:**
```
if recordA.total_compensation > recordB.total_compensation → 'A'
else if recordB.total_compensation > recordA.total_compensation → 'B'
else → 'EQUAL'
```

**Usage:** Determines winner badge placement

#### Currency Conversion

When records have different currencies:
1. Display uses Record A's currency
2. Record B converted to Record A's currency
3. Conversion rate: 1 USD = 83 INR

**Example:**
- Record A: ₹2,200,000 (INR)
- Record B: $30,000 (USD) → ₹24,90,000 (converted)
- Delta: +₹17,10,000 (A higher)

---

## Data Source

**Source:** `lib/mock-data.ts`

**Records Available:** 42+ salary records

**Fields Used:**
- id
- company
- role
- level_standardized
- location
- experience_years
- base_salary
- bonus
- stock
- total_compensation
- currency

**No Backend:**
- No API calls
- No database queries
- All data client-side

---

## Reused Components & Logic

### From F2 (Salary Table)

- **SalaryRecord type** - Used directly
- **formatSalaryWithCurrency()** - Currency formatting
- **convertCurrency()** - Multi-currency conversion
- **LevelBadge** - Level display with colors
- **Mock data** - All salary records

### From Design System

- **Colors**: Slate palette, Blue accent (#0369A1)
- **Spacing**: 4px/8px/16px grid
- **Typography**: Inter, 16px body, 28px headings
- **Cards**: Rounded borders, subtle shadows
- **Badges**: Colored backgrounds with borders

### Utilities

- **formatSalaryWithCurrency()** - Not duplicated
- **Currency conversion** - Shared via currency-config.ts
- **Number formatting** - Reused from F2

---

## Design Consistency

### Matches F2/F3

✅ Typography (same fonts, sizes, weights)  
✅ Spacing (same padding, gaps)  
✅ Cards (rounded borders, shadows)  
✅ Colors (slate palette, blue accent)  
✅ Badges (LevelBadge component)  
✅ Table styling  
✅ Responsive design  

### Layout Sections

1. **Header** - Path, title, description
2. **Select Records** - CompareSelectors component
3. **Comparison Results** - ComparisonTable component
4. **Share URL** - Quick copy helper
5. **Empty State** - When records not selected

---

## Responsive Behavior

### Desktop (≥1024px)

- Full 4-column table (Field | A | B | Delta)
- Side-by-side dropdowns
- All content visible

### Tablet (640px–1024px)

- Dropdowns stack vertically
- Table scrolls horizontally if needed
- Badges on separate lines if space constrained

### Mobile (<640px)

- Dropdowns full width
- Table horizontal scroll enabled
- Compact padding
- All information accessible

---

## URL Sharing Example

**User Scenario:**

1. User navigates to `/compare`
2. Selects: Google L5 (id: `google-003`) and Amazon L4 (id: `amazon-002`)
3. Comparison table generates
4. Page URL updates to: `/compare?s1=google-003&s2=amazon-002`
5. User copies URL and shares with colleague
6. Colleague opens link → same comparison loads instantly
7. Page refresh → state preserved

---

## Integration with F2 and F3

### No Conflicts

- F2 (/salaries) - Unmodified, uses own page logic
- F3 (/companies) - Unmodified, uses own page logic
- F4 (/compare) - New independent page

### Shared Resources (Safely Reused)

- lib/mock-data.ts - Read-only source
- lib/currency-config.ts - No new dependencies
- types/salary.ts - Type definitions
- components/features/LevelBadge.tsx - Reused directly
- components/ui/* - Reused Container, Button, Card

### No Duplication

- Formatters shared via lib/
- Currency logic centralized
- Types imported from existing
- Components imported, not copied

---

## Success Criteria Met

✅ User selects two salary records  
✅ URL updates with record IDs (?s1=id&s2=id)  
✅ Page refresh preserves state  
✅ Delta calculations correct (± currency, green/red)  
✅ Higher TC badge appears correctly  
✅ Formatting consistent with F2/F3  
✅ No API calls or backend changes  
✅ No Prisma modifications  
✅ F2 and F3 remain unmodified  
✅ URL shareable and reproducible  

---

## Technical Stack

- **Framework:** Next.js 15 (App Router, Client Component)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State:** URL parameters (no useState)
- **Data:** Mock data (static)
- **Components:** React functional components

---

## Files Created

- `app/compare/page.tsx` - Main compare page
- `components/features/CompareSelectors.tsx` - Record selection UI
- `components/features/ComparisonTable.tsx` - Comparison display
- `lib/compare-utils.ts` - Delta calculations
- `docs/f4-compare-page.md` - This file

---

## Files Unmodified

- `app/salaries/page.tsx` - F2, untouched
- `app/companies/[slug]/page.tsx` - F3, untouched
- All F2 components - Reused, not modified
- All F3 logic - Untouched
- Database/Prisma - No changes
- Backend APIs - No changes
