# CV Analysis — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:Screen (CV Analysis), DP-6:Nav (CV Journey), DP-1:All

---

## Purpose

Display AI-powered analysis of a CV with detailed scoring, section-by-section breakdown, improvement opportunities, and ATS compatibility assessment.

---

## Layout Overview

```
┌──────────┬────────────────────────────────────────────────────┐
│          │  TOPBAR (56px)                                     │
│          │  ← CV Manager  /  CV Analysis — Senior Frontend   │
│ SIDEBAR  ├────────────────────────────────────────────────────┤
│ (240px)  │  CONTENT AREA                                      │
│          │                                                    │
│  PAGE HEADER                                                  │
│  "CV Analysis"  Senior Frontend v2.3              [Apply AI] │
│                                                    [New Ana] │
│  OVERALL SCORE CARD (2-column split)                         │
│  ┌──────────────────────┐  ┌──────────────────────────────┐  │
│  │ SCORE RADIAL (120px)  │  │ BREAKDOWN                    │  │
│  │       86/100          │  │ Skills:         92% ████░░  │  │
│  │       B+              │  │ Experience:     78% ████░░  │  │
│  │                       │  │ Education:      85% ████░░  │  │
│  │                       │  │ Formatting:     95% ████░░  │  │
│  │                       │  │ ATS Compat:     70% ███░    │  │
│  └──────────────────────┘  └──────────────────────────────┘  │
│                                                    │
│  STRENGTHS & WEAKNESSES                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Strength 1   │  │ Opportunity 1│  │ Warning 1    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                    │
│  SECTION ANALYSIS (accordion)                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ▾ Professional Summary                  86/100  ▲    │  │
│  │ "Strong opening but lacks metrics..."                │  │
│  │ Original: "Experienced developer with 5+ years..."  │  │
│  │ Suggestion: "Results-driven developer who..."       │  │
│  │ [Apply Suggestion]  [Dismiss]                        │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ ▸ Work Experience                       78/100       │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ ▸ Skills                               92/100       │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ ▸ Education                            85/100       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                    │
│  IMPROVEMENT PRIORITIES                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 1. Add metrics to experience descriptions   [Apply] │  │
│  │ 2. Include more industry keywords           [Apply] │  │
│  │ 3. Strengthen professional summary          [Apply] │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

---

## 1. Page Header

| Property | Value |
|----------|-------|
| Breadcrumb | "CV Manager > CV Analysis > Senior Frontend v2.3" — Caption, Text-Secondary |
| Title | "CV Analysis" — Heading-2 (28px) |
| Subtitle | "Senior Frontend Developer v2.3" — Body, Text-Secondary |
| Actions | "Apply AI Suggestions" (Primary) + "New Analysis" (Secondary) |

---

## 2. Overall Score Card

| Property | Value |
|----------|-------|
| Layout | 2-column (score | breakdown) |
| Padding | Space-7 (24px) |
| Background | Surface-1 |
| Radius | radius-md (8px) |
| Border | Border-Default |
| Shadow | Shadow-1 |
| Margin bottom | Space-5 (16px) |

### Left: Score Radial
| Property | Value |
|----------|-------|
| Diameter | 120px |
| Style | Semi-circle gauge or full circle |
| Fill | Primary-500, stroke 6px |
| Track | Neutral-200, stroke 6px |
| Score text | "86" — Heading-1 (36px), Primary-600 |
| Label | "/100" — Body, Text-Secondary |
| Grade | "B+" — Body, Success-500 |

### Right: Breakdown Bars
| Property | Value |
|----------|-------|
| Each bar | Label (Body-Small, 600) + percentage + bar |
| Bar height | 8px |
| Bar radius | 4px |
| Bar track | Neutral-200 |
| Bar fill | Primary-500 (or semantic color based on score) |
| Gap between bars | Space-3 (8px) |

### Categories:
| Category | Score | Color |
|----------|-------|-------|
| Skills | 92% | Success-500 |
| Experience | 78% | Primary-500 |
| Education | 85% | Success-500 |
| Formatting | 95% | Success-500 |
| ATS Compatibility | 70% | Warning-500 |

---

## 3. Strengths & Opportunities Row

| Property | Value |
|----------|-------|
| Layout | 3 equal cards, gap Space-4 (12px) |
| Margin bottom | Space-5 (16px) |

### Card Types:
| Card | Icon | Title | Description |
|------|------|-------|-------------|
| Strength | Checkmark circle (Success) | "Strong Technical Skills" | "Your skills section is comprehensive and well-organized" |
| Opportunity | Lightbulb (Primary) | "Add Metrics" | "Quantify achievements to increase impact" |
| Warning | Warning triangle (Warning) | "ATS Keywords Missing" | "Add 3-5 more industry keywords for better ATS matching" |

---

## 4. Section Analysis (Accordion)

| Property | Value |
|----------|-------|
| Margin bottom | Space-5 (16px) |

### Accordion Item:
| Property | Value |
|----------|-------|
| Header height | 52px |
| Padding | Space-5 (16px) |
| Border | Border-Default bottom |
| Background | Surface-1 |
| Radius top | radius-md (first item) |
| Expanded bg | Surface-1 |

### Header:
| Element | Details |
|---------|---------|
| Expand arrow | ▸ / ▾ toggle, 16px |
| Section name | "Professional Summary" — Label (14px, 500 weight) |
| Score | "86/100" — Body-Small, score-colored |
| Priority | ▲ (high priority improvement) |

### Expanded content:
| Element | Details |
|---------|---------|
| Original text | Body-Small, Neutral-400, blockquote style |
| Suggested text | Body-Small, Primary-600, left border Primary |
| Action buttons | "Apply Suggestion" + "Dismiss" — Button-Small |
| Confidence | AI badge: "High confidence" |

---

## 5. Improvement Priorities

| Property | Value |
|----------|-------|
| Padding | Space-7 (24px) |
| Background | Surface-1 |
| Radius | radius-md (8px) |
| Border | Border-Default |

### Header:
| Element | Details |
|---------|---------|
| Title | "Improvement Priorities" — Heading-4 (18px) |
| Description | "Ordered by impact on your overall score" — Body-Small, Text-Secondary |
| Spacing bottom | Space-5 (16px) |

### Priority Items (numbered):
| Property | Value |
|----------|-------|
| Number | 24px circle, Primary-600 bg, white text, radius-full |
| Title | Body, 600 weight |
| Impact | "High" / "Medium" / "Low" badge |
| Description | Body-Small, Text-Secondary |
| Apply button | Button-Small-Primary |
| Gap between items | Space-4 (12px) |

---

## 6. Empty/Loading/Error States

| State | Behavior |
|-------|----------|
| Analysis loading | Full skeleton: score circle + 5 bars + accordion skeletons |
| Analysis failed | "Could not analyze CV. [Retry]" with explanation |
| No CV selected | Redirect to CV Manager |
| Offline | Cached analysis shown with "Last updated [date]" banner |

---

## 7. Responsive Behavior

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Score card | Stacked (score top, bars below) | Side-by-side | Side-by-side |
| Strengths row | 1-column stack | 3 equal | 3 equal |
| Accordion | Full width | Full width | Full width |
| Score radial | 80px dia | 100px | 120px |
| Priorities | Single column | Single column | Single column |

---

## 8. AI Integration

| Feature | Behavior |
|---------|----------|
| Score calculation | AI evaluates 5 dimensions from parsed CV |
| Section suggestions | Per-section AI provides specific rewrites |
| Keyword analysis | AI compares against target industry terms |
| ATS scoring | AI simulates ATS parser compatibility |
| Quality scoring | AI evaluates writing quality, impact, clarity |
| Trend tracking | Future: score change over time across versions |

---

*Cross-references: DP-6:Screen (CV Analysis), DP-6:Nav (CV Journey), DP-6:AI, DP-1:All*
