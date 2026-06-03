# TalentDash Product Roadmap

## Purpose

This document defines all major product areas of TalentDash and their implementation priority.

---

# Phase 1 — Trial Submission Scope (Must Build)

These are the features required for the engineering trial.

## 1. Salaries

Primary product of TalentDash.

Purpose:

* Compensation discovery
* Salary benchmarking
* Offer evaluation

Pages:

/salaries
/salaries/{role}
/salaries/{role}/{location}
/salaries/{company}/{role}
/salaries/heatmap

Status:
MUST BUILD

---

## 2. Companies

Company intelligence pages.

Purpose:

* Employer research
* Compensation overview
* Company insights

Pages:

/companies/{slug}
/companies/{slug}/reviews
/companies/{slug}/salaries
/companies/{slug}/interviews

Status:
MUST BUILD

---

## 3. Compare

Side-by-side comparisons.

Purpose:

* Offer comparison
* Company comparison
* Compensation comparison

Pages:

/compare
/compare/{company1}-vs-{company2}

Status:
MUST BUILD

---

# Phase 2 — Core Platform Expansion

## 4. Reviews

Purpose:

* Employee reviews
* Workplace insights
* Culture evaluation

Pages:

/reviews
/reviews/{company}
/reviews/{company}/{role}

Status:
Future Phase

---

## 5. Interviews

Purpose:

* Interview preparation
* Experience sharing
* Question banks

Pages:

/interviews
/interviews/{company}
/interviews/{company}/{role}
/profiles/{role}/interview-questions

Status:
Future Phase

---

# Phase 3 — Growth Features

## 6. Community

Purpose:

* Anonymous discussions
* Company communities
* Career conversations

Pages:

/community
/community/{company}
/community/{topic}

Status:
Future Phase

---

## 7. Tools

Purpose:

* Career decision making
* Compensation calculations

Pages:

/tools/salary-calculator
/tools/hike-calculator
/tools/equity-calculator
/tools/offer-comparison

Status:
Future Phase

---

# Phase 4 — Advanced Intelligence Layer

## 8. Workplace Index

Purpose:

* Company rankings
* Compensation fairness scoring
* Culture ranking

Pages:

/workplace-index
/workplace-index/{industry}
/workplace-index/rankings

Status:
Future Phase

---

# Current Engineering Focus

Only focus on:

1. Salaries
2. Companies
3. Compare

Everything else is roadmap and should not block trial delivery.

---

# Success Criteria

Trial submission is considered successful if:

* Salary pages work
* Company pages work
* Compare page works
* Database integration works
* APIs work
* Project is deployed

Everything else is secondary.
