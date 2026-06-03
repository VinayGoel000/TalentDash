# TalentDash Design System & Visual Identity

## Design Philosophy

TalentDash is a data-first career intelligence platform.

The UI should feel:

* Professional
* Trustworthy
* Analytical
* Fast
* Dense without clutter
* Mobile-first
* SEO-first

Every element must earn its place.

Avoid:

* Decorative graphics
* Excessive gradients
* Fancy animations
* Large empty spaces
* Dashboard clutter

Users visit TalentDash to make career decisions.

The interface must prioritize clarity over aesthetics.

---

# Visual Language

Reference Product:

Airbnb

Study:

* Search inputs
* Card layouts
* Information hierarchy
* Trust signals
* Mobile responsiveness
* Spacing discipline

Important:

Do NOT copy Airbnb colors.

Copy the discipline.

---

# Color System

## Primary Accent

Color:
#FF5A5F

Usage:

* Primary buttons
* Active filters
* Active navigation
* Important CTA
* Salary highlights

Class Name:

primary

---

## Deep Text

Color:
#222222

Usage:

* Headings
* Company names
* Salary figures
* Primary content

Class Name:

deep-text

---

## Body Text

Color:
#484848

Usage:

* Paragraphs
* Review content
* Salary metadata

Class Name:

body-text

---

## Muted Text

Color:
#717171

Usage:

* Labels
* Timestamps
* Helper text
* Secondary information

Class Name:

muted-text

---

## Surface Background

Color:
#FFFFFF

Usage:

* Cards
* Tables
* Modals
* Inputs

Class Name:

surface

---

## App Background

Color:
#F7F7F7

Usage:

* Main page background

Class Name:

app-bg

---

## Border Color

Color:
#EBEBEB

Usage:

* Dividers
* Card borders
* Table borders

Class Name:

border

---

## Success Green

Color:
#008A05

Usage:

* Positive salary delta
* Positive indicators
* Growth metrics

Class Name:

success

---

## Warning Orange

Color:
#FFB400

Usage:

* Market warnings
* Alerts

Class Name:

warning

---

## Error Red

Color:
#D93025

Usage:

* Validation errors
* Failed states
* Risk indicators

Class Name:

error

---

## Hover Surface

Color:
#F2F2F2

Usage:

* Table row hover
* Card hover

Class Name:

hover

---

# Typography

## Font Family

Primary:

Inter

Fallback:

system-ui

sans-serif

---

## H1

Size:
36px

Weight:
700

Line Height:
1.1

Usage:

* Page titles

Example:

Software Engineer Salaries in India

---

## H2

Size:
28px

Weight:
700

Usage:

* Section headings

---

## H3

Size:
22px

Weight:
600

Usage:

* Card titles
* Company names

---

## Salary Figures

Size:
32px – 40px

Weight:
700

Usage:

* Total Compensation
* Salary Highlights

Always use tabular numbers.

---

## Body Text

Size:
16px

Weight:
400

Line Height:
1.6

---

## Small Labels

Size:
13px

Weight:
500

Usage:

* Badges
* Filters
* Metadata labels

---

## Metadata

Size:
12px

Weight:
400

Usage:

* Dates
* Sources
* Secondary information

---

# Layout Rules

Maximum Content Width:

1280px

Container Padding:

Desktop:
24px

Tablet:
20px

Mobile:
16px

---

# Cards

Background:
White

Border:
1px solid #EBEBEB

Border Radius:
16px

Shadow:
Very subtle

Never use heavy shadows.

---

# Tables

Must be:

* Readable
* Dense
* Fast to scan

Row Hover:

#F2F2F2

Text Alignment:

Text = Left

Salary Values = Right

---

# Buttons

Primary Button:

Background:
#FF5A5F

Text:
White

Radius:
12px

Hover:
Slight darkening

---

Secondary Button:

White background

Border:
#EBEBEB

Text:
#222222

---

# Forms

Input Height:

44px minimum

Border:
#EBEBEB

Focus:

Primary Accent Border

No glowing shadows.

---

# Search Experience

Search is a primary product feature.

Requirements:

* Clear placeholder
* Fast feedback
* Mobile friendly
* Large click targets

---

# Trust Signals

Every important page should display:

* Number of salaries
* Number of reviews
* Number of companies
* Last updated date

Trust is critical.

---

# Accessibility

Minimum contrast:

WCAG AA

Keyboard navigation:

Required

Focus states:

Visible

Interactive targets:

Minimum 44px

---

# Responsive Design

Design Mobile First.

Breakpoints:

Mobile:
0-639px

Tablet:
640px-1023px

Desktop:
1024px+

Large Desktop:
1280px+

---

# Animation Rules

Keep animations minimal.

Allowed:

* Hover transitions
* Fade transitions

Avoid:

* Large motion
* Bounce effects
* Decorative animation

---

# Component Library Rules

Allowed:

* Tailwind CSS

Not Allowed:

* ShadCN
* Material UI
* Chakra UI
* Ant Design
* Bootstrap

All components must be custom built.

---

# Final Principle

Users should feel:

"I trust this data."

Not:

"This UI looks fancy."
    