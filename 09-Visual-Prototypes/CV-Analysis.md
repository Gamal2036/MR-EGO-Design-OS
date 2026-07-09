# CV Analysis — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Status:** Design Specification
**Inherits:** DP-0 through DP-8
**Pages Covered:** CV Analysis Report, Score Overview, Strengths & Opportunities, Section Analysis, Improvement Priorities

---

## Purpose

AI-powered diagnostic report that scores every dimension of a CV (content quality, keyword density, ATS compatibility, formatting, experience depth) and delivers actionable section-level rewrites. Users understand exactly what to improve and why.

---

## Layout Overview

```
┌──────────┬──────────────────────────────────────────────────────────────┐
│          │  TOPBAR (56px)                                               │
│          │  [Sidebar toggle]  CV Manager > CV Analysis > Senior ...     │
│ SIDEBAR  ├──────────────────────────────────────────────────────────────┤
│ (240px)  │  CONTENT AREA (max-width 960px, centered)                    │
│          │                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  OVERALL SCORE CARD (Elevation 1)                                 │  │
│  │  ┌──────────┬──────────────────────────────────────────────────┐  │  │
│  │  │          │  Skills       ████████████████████░  92%        │  │  │
│  │  │   86     │  Experience   ████████████████░░░░  78%        │  │  │
│  │  │   B+     │  Education    █████████████████░░░░  85%        │  │  │
│  │  │          │  Formatting   █████████████████████░  95%        │  │  │
│  │  │          │  ATS          ██████████████░░░░░░  70%        │  │  │
│  │  └──────────┴──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  STRENGTHS & OPPORTUNITIES ROW (3 equal cards)                   │  │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │  │
│  │  │ ✅ Strengths  │ │ 🎯 Opportunities │ │ ⚠️ Warnings │             │  │
│  │  │ - Quant...   │ │ - ATS...     │ │ - Missing... │             │  │
│  │  │ - Clear...   │ │ - Skills...  │ │ - Format...  │             │  │
│  │  └──────────────┘ └──────────────┘ └──────────────┘             │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  SECTION ANALYSIS (Accordion)                                     │  │
│  │  ┌────────────────────────────────────────────────────────────┐  │  │
│  │  │ ▾ Professional Summary                    Confidence 92%   │  │  │
│  │  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │  │ ORIGINAL:  Experienced software engineer with 5...  │  │  │
│  │  │  │ SUGGESTED: Results-driven frontend engineer with... │  │  │
│  │  │  │                    [Apply] [Dismiss]               │  │  │
│  │  │  └──────────────────────────────────────────────────────┘  │  │
│  │  └────────────────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────────────────┐  │  │
│  │  │ ▸ Experience                               Confidence 85%  │  │  │
│  │  └────────────────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────────────────┐  │  │
│  │  │ ▸ Skills                                     Confidence 78%│  │  │
│  │  └────────────────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────────────────┐  │  │
│  │  │ ▸ Education                                  Confidence 96%│  │  │
│  │  └────────────────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  IMPROVEMENT PRIORITIES (numbered list)                          │  │
│  │  ┌────────────────────────────────────────────────────────────┐  │  │
│  │  │ ① Optimize summary for ATS keywords         Impact: High   │  │  │
│  │  │    Add 5+ relevant keywords from target roles.             │  │  │
│  │  └────────────────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────────────────┐  │  │
│  │  │ ② Add measurable outcomes to experience     Impact: High   │  │  │
│  │  └────────────────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────────────────┐  │  │
│  │  │ ③ Include missing technical skills           Impact: Medium │  │  │
│  │  └────────────────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Section 1: Breadcrumb

| Property | Value |
|----------|-------|
| Purpose | Show navigation context and current location within CV tools |
| Priority | P0 — always visible |
| Visual weight | Low — subtle, text-heavy |
| Height | 24px |
| Spacing below | Space-5 (16px) |

### Elements

| Element | Spec |
|---------|------|
| Separator | ">" — Caption (13px), Text-Secondary, margin left/right Space-3 (8px) |
| Links | Caption (13px/500), Primary-600, underlined on hover |
| Current page | Caption (13px/400), Text-Primary, no underline |

### States

| State | Visual |
|-------|--------|
| Default | All links clickable, current page muted |
| Hover (link) | Primary-600 underline |
| Focus | 2px Primary-400 ring |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | navigation |
| aria-label | "Breadcrumb navigation" |
| aria-current="page" | On last breadcrumb item |

---

## Section 2: Overall Score Card

| Property | Value |
|----------|-------|
| Purpose | Instantly communicate CV quality and dimension breakdown |
| Priority | P0 |
| Visual weight | High — largest, most prominent element on page |
| Layout | 2-column: 120px radial gauge (left) + 5 stacked bars (right) |
| Card width | 100% (within 960px max) |
| Padding | Space-7 (24px) |
| Background | Neutral-0 |
| Border | 1px solid Neutral-200 |
| Border radius | radius-lg (12px) |
| Elevation | Layer 1 |
| Spacing below | Space-8 (32px) |

### Left Column: Radial Gauge

| Property | Value |
|----------|-------|
| Width | 120px |
| Height | 120px |
| Score number | Heading-1 (36px/700), Text-Primary, centered |
| Grade | Body (15px/600), Success-500, centered below score |
| Ring | SVG circle, stroke-width 8px, bg Neutral-200, fill Primary-500 |

### Right Column: Breakdown Bars

| Property | Value |
|----------|-------|
| Each row height | 32px |
| Gap between rows | Space-3 (8px) |
| Label | Body-Small (14px/500), Text-Primary, 100px width |
| Percentage | Body-Small (14px/600), Primary-600, right-aligned, 40px width |
| Bar track | 8px height, Neutral-200 bg, radius-full |
| Bar fill | Primary-500, radius-full, animated width on load |

### States

| State | Visual |
|-------|--------|
| Default | Full card with all data |
| Loading | Skeleton: circular shimmer for gauge, shimmer bars for each row |
| Error | Card with Error-500 border, "Unable to calculate score" message, retry button |
| Offline | Card with offline indicator, shows last cached score |

### Animation

| Element | Animation | Duration |
|---------|-----------|----------|
| Radial gauge | Counter animation from 0 to score | 1000ms ease-out |
| Grade | Fade in after counter completes | 300ms ease |
| Bars | Width animation from 0 to target | 800ms ease-out, 100ms stagger per bar |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | region |
| aria-label | "Overall CV score: 86 out of 100, grade B plus" |
| role="img" | On radial gauge with aria-valuenow="86" aria-valuemin="0" aria-valuemax="100" |

---

## Section 3: Strengths & Opportunities Row

| Property | Value |
|----------|-------|
| Purpose | Quick-glance summary of top strengths, growth areas, and blocking issues |
| Priority | P0 |
| Visual weight | Medium |
| Layout | 3 equal-width cards in a row |
| Gap between cards | Space-5 (16px) |
| Spacing below | Space-8 (32px) |

### Card Spec

| Property | Value |
|----------|-------|
| Width | 1/3 of container |
| Padding | Space-5 (16px) |
| Background | Neutral-0 |
| Border radius | radius-md (8px) |
| Elevation | Layer 1 |

### Card Types

| Type | Icon | Header Color | Border |
|------|------|--------------|--------|
| Strengths | ✅ Check Circle | Success-500 | Success-200 1px |
| Opportunities | 🎯 Target | Primary-500 | Primary-200 1px |
| Warnings | ⚠️ Warning | Warning-500 | Warning-200 1px |

### Content per Card

| Element | Spec |
|---------|------|
| Icon | 24×24px, top-left |
| Title | Body-Small (14px/600), Text-Primary, margin-top Space-3 |
| Items | List, Caption (13px/400), Text-Secondary, margin-top Space-3, bulleted |
| Count badge | Corner top-right, Neutral-100 bg, Caption/600 |

### States

| State | Visual |
|-------|--------|
| Default | Cards at Layer 1 |
| Hover | Layer 2, subtle scale 1.01 |
| Empty | Hide row entirely (no strengths/opportunities/warnings) |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | list |
| aria-label | "Strengths" / "Opportunities" / "Warnings" per card |

---

## Section 4: Section Analysis (Accordion)

| Property | Value |
|----------|-------|
| Purpose | Deep-dive per-section rewrite suggestions with original/suggested comparison |
| Priority | P0 |
| Visual weight | High — primary interaction area |
| Layout | Stacked accordion items |
| Gap between items | Space-3 (8px) |
| Spacing below | Space-8 (32px) |

### Accordion Item (Collapsed)

| Property | Value |
|----------|-------|
| Height | 48px |
| Padding horizontal | Space-5 (16px) |
| Background | Neutral-0 |
| Border | 1px solid Neutral-200 |
| Border radius | radius-md (8px) |
| Hover bg | Neutral-50 |
| Title | Body (15px/500), Text-Primary |
| Confidence badge | Caption (13px/600), Primary-500 text, Primary-50 bg, radius-sm, 4px left/right padding |
| Chevron | 20×20px, Text-Secondary, rotates on expand |

### Accordion Item (Expanded)

| Property | Value |
|----------|-------|
| Padding | Space-5 (16px) |
| Border | 1px solid Primary-200 |
| Border radius bottom | radius-md |

### Comparison Area

| Element | Spec |
|---------|------|
| Original label | Body-Small (14px/600), Neutral-600, margin-bottom Space-3 |
| Original text | Body (15px/400), Text-Secondary, bg Neutral-50, padding Space-3, radius-sm |
| Suggested label | Body-Small (14px/600), Primary-600, margin-top Space-5 |
| Suggested text | Body (15px/400), Text-Primary, bg Primary-50, padding Space-3, radius-sm |
| Action buttons | Body-Small (14px/500), margin-top Space-3 |
| Apply button | Primary-500 bg, Neutral-0 text |
| Dismiss button | Neutral-0 bg, Neutral-600 text, Neutral-300 border |

### Confidence Badge Levels

| Level | Color | Range |
|-------|-------|-------|
| High | Primary-500 | ≥85% |
| Medium | Primary-400 | 70-84% |
| Low | Warning-500 | <70% |

### States

| State | Visual |
|-------|--------|
| Collapsed | 48px height, Neutral-200 border |
| Expanded | Full content, Primary-200 border |
| Hover (collapsed) | Neutral-50 bg |
| Focus | 2px Primary-400 ring |
| Loading | Skeleton: 48px shimmer bars × number of sections |
| Empty | "No suggestions available for this section" |
| Applied | Suggested text merges into original view, "Applied" checkmark replaces buttons |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | button (accordion header) |
| aria-expanded | true/false |
| aria-controls | Links to panel id |
| role="region" | Expanded content panel |
| aria-labelledby | Links back to header |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move between accordion headers |
| Enter/Space | Toggle expand/collapse |
| Down arrow | Move to next accordion item |
| Up arrow | Move to previous accordion item |
| Home | First accordion item |
| End | Last accordion item |

---

## Section 5: Improvement Priorities

| Property | Value |
|----------|-------|
| Purpose | Ranked list of actions ordered by impact on score |
| Priority | P0 |
| Visual weight | Medium |
| Layout | Numbered list with 24px circle numbers |
| Spacing below | Space-8 (32px) |

### Item Spec

| Property | Value |
|----------|-------|
| Padding | Space-5 (16px) |
| Background | Neutral-0 |
| Border | 1px solid Neutral-200 |
| Border radius | radius-md (8px) |
| Margin bottom | Space-3 (8px) |
| Elevation | Layer 1 |

### Elements

| Element | Spec |
|---------|------|
| Number circle | 24×24px, Primary-500 bg, Neutral-0 text, Body-Small/700, radius-full |
| Title | Body (15px/600), Text-Primary, margin-left Space-3 |
| Description | Caption (13px/400), Text-Secondary, margin-left Space-3 |
| Impact badge | "High" / "Medium" / "Low" — Caption/600 |
| High impact | Error-500 text, Error-50 bg |
| Medium impact | Warning-500 text, Warning-50 bg |
| Low impact | Neutral-500 text, Neutral-100 bg |

### States

| State | Visual |
|-------|--------|
| Default | All items collapsed |
| Hover | Layer 2 elevation |
| Completed | Number circle becomes Success-500 bg with checkmark, item opacity 0.7 |

---

## Section 6: Loading State (Skeleton)

| Property | Value |
|----------|-------|
| Purpose | Show content structure while AI analysis is in progress |
| Priority | P0 |
| Animation | Shimmer gradient sweep (Neutral-100 → Neutral-200 → Neutral-100) |

### Skeleton Specs

| Element | Width | Height | Shape |
|---------|-------|--------|-------|
| Score gauge | 120px | 120px | Circle |
| Breakdown bars | 80% / 60% / 70% / 90% / 50% | 8px | Pill |
| Strength card 1 | 33% | 160px | Rectangle, radius-md |
| Strength card 2 | 33% | 160px | Rectangle, radius-md |
| Strength card 3 | 33% | 160px | Rectangle, radius-md |
| Accordion items | 100% | 48px | Rectangle, radius-md |
| Priority items | 100% | 56px | Rectangle, radius-md |

### Animation Timing

| Element | Stagger | Duration |
|---------|---------|----------|
| Score gauge | 0ms | 1500ms |
| Breakdown bars | 100ms each | 1200ms |
| Strength cards | 200ms each | 1000ms |
| Accordion items | 150ms each | 1000ms |
| Priority items | 100ms each | 1000ms |

---

## Section 7: AI Integration

| Feature | Description | Priority |
|---------|-------------|----------|
| Score calculation | Multi-factor algorithm: content, keywords, ATS, formatting, experience | P0 |
| Per-section rewrites | NLP-generated suggestions for each CV section | P0 |
| Keyword analysis | Extracts keywords, frequency, gaps against target roles | P0 |
| ATS simulation | Parses CV as an ATS would, flags issues | P0 |
| Impact scoring | Each suggestion tagged with expected score impact (±points) | P1 |
| Job fit analysis | Compare CV against specific job descriptions | P1 |
| Industry benchmarking | Score percentile vs industry peers | P2 |
| Trend tracking | Score changes over time with version history | P2 |

### AI States

| State | Visual |
|-------|--------|
| Idle | Page not yet loaded |
| Analyzing | Full skeleton page with shimmer animation |
| Enhancing | Partial results visible, pulsing dot "Enhancing analysis..." |
| Complete | Full results, no AI indicator |
| Error | "Analysis failed" banner + retry button |
| Offline | "AI analysis requires internet connection" banner |

---

## States Matrix

| State | Score Card | Strengths Row | Accordion | Priorities |
|-------|------------|---------------|-----------|------------|
| Default | Full data, animated | 3 cards with content | Collapsed items | Numbered list |
| Hover | Gauge subtle pulse | Card elevation lift | Header bg change | Item elevation lift |
| Focus | — | — | 2px Primary-400 ring | 2px Primary-400 ring |
| Loading | Skeleton gauge + bars | 3 skeleton cards | 5 skeleton bars | 5 skeleton rows |
| Empty | N/A (always has score) | Row hidden | "No suggestions" | "No priorities" |
| Error | Error state card | Row hidden | Error inline each item | Error inline |
| Offline | Cached score | Cached data | Cached suggestions | Cached priorities |

---

## Responsive Behavior

| Breakpoint | Layout | Changes |
|------------|--------|---------|
| >1200px | Full 2-column (gauge + bars) | 3-card row, full accordion |
| 900-1200px | Full width | Same layout, slightly smaller gauge (100px) |
| 600-900px | Stacked | Score card: row stacks (gauge above bars). Strengths: 3 cards in vertical stack |
| <600px | Single column | Score: gauge and bars full width stacked. Strengths: single card. Accordion: full width |

### Tablet (<900px)

| Element | Change |
|---------|--------|
| Radial gauge | 100px (down from 120px) |
| Strengths row | Vertical stack |
| Score card | Full width, no left/right split |

### Mobile (<600px)

| Element | Change |
|---------|--------|
| Radial gauge | 80px |
| Score number | Heading-2 (28px) |
| Grade | Body (14px) |
| Strengths cards | Single column |
| Accordion | Full width, no side padding |
| Priorities | Full width |

---

## Color Tokens Reference

| Element | Light Token | Dark Token |
|---------|-------------|------------|
| Score card bg | Neutral-0 | Neutral-100 |
| Score card border | Neutral-200 | Neutral-700 |
| Gauge track | Neutral-200 | Neutral-700 |
| Gauge fill | Primary-500 | Primary-400 |
| Grade (B+) | Success-500 | Success-400 |
| Bar track | Neutral-200 | Neutral-700 |
| Bar fill | Primary-500 | Primary-400 |
| Strength card border | Success-200 | Success-800 |
| Opportunity card border | Primary-200 | Primary-800 |
| Warning card border | Warning-200 | Warning-800 |
| Accordion border | Neutral-200 | Neutral-700 |
| Accordion expanded border | Primary-200 | Primary-800 |
| Apply button | Primary-500 bg | Primary-600 bg |
| Dismiss button | Neutral-0 bg | Neutral-100 bg |
| High impact | Error-500 text | Error-400 text |
| Medium impact | Warning-500 text | Warning-400 text |
| Low impact | Neutral-500 text | Neutral-400 text |

---

## Typography Reference

| Element | Token | Size | Weight |
|---------|-------|------|--------|
| Score number | Heading-1 | 36px | 700 |
| Grade | Body | 15px | 600 |
| Bar label | Body-Small | 14px | 500 |
| Bar percentage | Body-Small | 14px | 600 |
| Section titles | Body | 15px | 500 |
| Accordion header | Body | 15px | 500 |
| Original/suggested label | Body-Small | 14px | 600 |
| Original text | Body | 15px | 400 |
| Suggested text | Body | 15px | 400 |
| Priority title | Body | 15px | 600 |
| Priority description | Caption | 13px | 400 |
| Breadcrumb | Caption | 13px | 400/500 |
| Impact badge | Caption | 13px | 600 |

---

## Spacing Reference

| Usage | Token | Value |
|-------|-------|-------|
| Score card padding | Space-7 | 24px |
| Between major sections | Space-8 | 32px |
| Gap in strengths row | Space-5 | 16px |
| Card padding | Space-5 | 16px |
| Accordion item gap | Space-3 | 8px |
| Original-to-suggested gap | Space-5 | 16px |
| Breadcrumb bottom | Space-5 | 16px |
| Icon to title | Space-3 | 8px |
| Collapsed accordion padding | Space-5 | 16px |
| Priority item margin bottom | Space-3 | 8px |

---

## Future Expansion Items

| Item | Description | Priority |
|------|-------------|----------|
| Video analysis | AI review of video CV or interview clip | P3 |
| Peer comparison | Anonymous percentile vs industry/role peers | P2 |
| Historical tracking | Score trend chart across CV versions | P2 |
| Export report | PDF report with full analysis and suggested CV | P1 |
| Multi-language analysis | Score and rewrite in 10+ languages | P2 |
| Tone analysis | Communication style audit (confident/passive) | P2 |
| Gap analysis by job | Compare CV against a specific job description | P1 |
| Action plan generator | Custom 30-day CV improvement plan | P2 |
| Certification scanner | Auto-detect certs and flag expired ones | P2 |
| Network analysis | Cross-reference CV connections for referrals | P3 |
