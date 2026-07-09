# Job Details — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Status:** Design Specification
**Inherits:** DP-0 through DP-8
**Pages Covered:** Job Detail View, Match Analysis, AI Side Panel, Similar Jobs, Mobile Sticky Bar

---

## Purpose

Comprehensive job detail view showing full posting, AI-powered match analysis, skill gap assessment, salary benchmarking, and cover letter generation. Users decide at a glance whether to apply and how to optimize their candidacy.

---

## Layout Overview

```
┌──────────┬───────────────────────────────────────────────────┬────────────┐
│          │  TOPBAR (56px)                                    │            │
│          │  ← Job Search > Senior Frontend Engineer          │            │
│ SIDEBAR  ├───────────────────────────────────────────────────┤ AI PANEL   │
│ (240px)  │  CONTENT                                           │ (360px)    │
│          │                                                    │            │
│  ┌────────────────────────────────────────────────────────┐  │ ┌────────┐ │
│  │  JOB HEADER CARD                                       │  │ │ MATCH  │ │
│  │  [Logo 64px] Senior Frontend Engineer                  │  │ │ ┌────┐ │ │
│  │  Acme Corp · San Francisco, CA · Full-time             │  │ │ │92% │ │ │
│  │  $150,000 - $180,000                                   │  │ │ └────┘ │ │
│  │  [Apply Now] [Save] [Share] [More ▾]                   │  │ │        │ │
│  └────────────────────────────────────────────────────────┘  │ │SKILLS │ │
│                                                              │ │██ 82% │ │
│  ┌────────────────────────────────────────────────────────┐  │ │EXP    │ │
│  │  MATCH SCORE CARD (Primary-50 bg)                      │  │ │██ 74% │ │
│  │  ┌──────┐  Skills: 92%   ✓ React, ✗ GraphQL          │  │ │LOC    │ │
│  │  │ 92%  │  Experience: 78%  5yr vs req 5yr           │  │ │██ 100%│ │
│  │  │ rung │  Location: 100%  San Francisco              │  │ └────────┘ │
│  │  └──────┘                                             │  │ ┌────────┐ │
│  └────────────────────────────────────────────────────────┘  │ │SKILLS  │ │
│                                                              │ │ GAP    │ │
│  ┌────────────────────────────────────────────────────────┐  │ │✓ React │ │
│  │  JOB DESCRIPTION                                        │  │ │✓ TS    │ │
│  │  ┌────────────────────────────────────────────────┐    │  │ │✗ GraphQL│ │
│  │  │ About the Role                                 │    │  │ │✗ AWS   │ │
│  │  │ Body text with full description...             │    │  │ └────────┘ │
│  │  └────────────────────────────────────────────────┘    │  │ ┌────────┐ │
│  │  ┌────────────────────────────────────────────────┐    │  │ │COVER   │ │
│  │  │ Requirements                                   │    │  │ │LETTER  │ │
│  │  │ • 5+ years React experience                    │    │  │ │[Generate]│
│  │  │ • TypeScript proficiency                       │    │  │ └────────┘ │
│  │  │ • Experience with state management             │    │  │ ┌────────┐ │
│  │  └────────────────────────────────────────────────┘    │  │ │SALARY  │ │
│  │  ┌────────────────────────────────────────────────┐    │  │ │INSIGHT │ │
│  │  │ About Acme Corp                                │    │  │ │$160-195K│ │
│  │  │ Description of the company...                  │    │  │ │market avg│ │
│  │  └────────────────────────────────────────────────┘    │  │ └────────┘ │
│  └────────────────────────────────────────────────────────┘  │            │
│                                                              │            │
│  ┌────────────────────────────────────────────────────────┐  │            │
│  │  SIMILAR JOBS (horizontal scroll)                      │  │            │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐               │  │            │
│  │  │ Sr Front │ │ Lead     │ │ Staff    │               │  │            │
│  │  │ @ Corp A │ │ @ Corp B │ │ @ Corp C │               │  │            │
│  │  │ 88% match│ │ 82% match│ │ 76% match│               │  │            │
│  │  └──────────┘ └──────────┘ └──────────┘               │  │            │
│  └────────────────────────────────────────────────────────┘  │            │
│                                                              │            │
│  MOBILE: STICKY BOTTOM BAR (64px glass)                     │            │
│  [Save] [▼ Salary]                    [Apply Now ▸]         │            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Section 1: Breadcrumb + Job Header Card

### Breadcrumb

| Property | Value |
|----------|-------|
| Purpose | Show navigation context from Job Search to this detail |
| Priority | P0 |
| Height | 24px |
| Spacing below | Space-5 (16px) |

| Element | Spec |
|---------|------|
| Back link | "← Job Search" — Body-Small (14px/500), Primary-600, left arrow 16px |
| Separator | ">" — Caption, Text-Secondary, margin Space-3 |
| Current | Job title truncated — Caption, Text-Primary |

### Job Header Card

| Property | Value |
|----------|-------|
| Purpose | Hero section: key job info + primary actions |
| Priority | P0 |
| Visual weight | High |
| Padding | Space-7 (24px) |
| Background | Surface-1 |
| Border | 1px solid Neutral-200 |
| Border radius | radius-lg (12px) |
| Elevation | Layer 1 |
| Spacing below | Space-5 (16px) |

### Elements

| Element | Spec |
|---------|------|
| Company logo | 64×64px, radius-md, Neutral-100 fallback bg |
| Title | Heading-2 (28px/650), Text-Primary |
| Company | Body (15px/500), Text-Primary, Primary-600 hover (link to company profile) |
| Location | Body (15px/400), Text-Secondary, map pin icon |
| Work type badge | "Full-time" — Caption/600, Neutral-100 bg, radius-sm |
| Salary | Heading-4 (18px/600), Success-700 |
| Apply Now | Primary-500, 40px height, Body-Small (14px/600), radius-md |
| Save | Outline, Neutral-0, 40px, bookmark icon, Body-Small |
| Share | Icon-only, 40px, Neutral-100 bg, share icon |
| More | Icon-only, 40px, Neutral-100 bg, "..." icon, dropdown (Report, Copy Link, Print) |

### States

| State | Visual |
|-------|--------|
| Default | Full card with all elements |
| Saved | Bookmark icon filled Primary-500, subtle "Saved!" toast |
| Shared | Toast "Link copied to clipboard" |
| Focus | 2px Primary-400 ring on action buttons |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | region |
| aria-label | "Job details header" |
| aria-label on buttons | "Save job", "Share job", "More options" |

---

## Section 2: Match Score Card

| Property | Value |
|----------|-------|
| Purpose | Quick visual assessment of candidate-job fit |
| Priority | P0 |
| Visual weight | Medium |
| Padding | Space-5 (16px) |
| Background | Primary-50 |
| Border radius | radius-md (8px) |
| Spacing below | Space-5 (16px) |

### Left Column: Radial Score

| Property | Value |
|----------|-------|
| Size | 56px × 56px |
| Score number | Heading-3 (22px/700), Primary-600, centered |
| Label | Caption (13px/400), Primary-600/50, centered below |
| Ring | SVG circle, 56px, Primary-500/20 track, Primary-500 fill, 6px stroke |

### Right Column: Breakdown

| Row | Spec |
|-----|------|
| Height | 24px per row |
| Label | Caption (13px/400), Text-Primary, 100px width |
| Bar | 4px height, Neutral-200/50 track, Primary-500 fill, radius-full |
| Percentage | Caption (13px/600), Primary-600, 36px width |
| Details | Caption (12px/400), Text-Secondary, italic |

### States

| State | Visual |
|-------|--------|
| Default | Full data |
| Loading | Skeleton: 56px circle shimmer + 3 bar shimmers |
| Error | "Unable to calculate match" with recalculation button |

### Accessibility

| Attribute | Value |
|-----------|-------|
| aria-label | "Match score 92 percent. Skills 92 percent, Experience 78 percent, Location 100 percent." |

---

## Section 3: AI Side Panel (360px)

| Property | Value |
|----------|-------|
| Purpose | Persistent side panel with AI-powered insights for the job |
| Priority | P1 (optional, toggleable) |
| Width | 360px (fixed) |
| Background | Surface-1 |
| Border left | 1px solid Neutral-200 |
| Padding | Space-7 (24px) |
| Scroll | Independent vertical scroll |
| Elevation | Layer 0 |

### Match Breakdown

| Element | Spec |
|---------|------|
| Section title | Body-Small (14px/600), Text-Primary, margin-bottom Space-3 |
| Bar row | Same as Match Score Card breakdown |
| Overall bar | 8px height (larger), Primary-500 fill |
| Dimension bars | 6px height, Primary-400 fill |

### Skills Gap

| Element | Spec |
|---------|------|
| Section title | Body-Small (14px/600), Text-Primary, margin-top Space-7 |
| Matched skills | "✓ React" — Caption (13px/400), Success-600, check icon, 28px height per row |
| Missing skills | "✗ GraphQL" — Caption (13px/400), Error-600, X icon, 28px height per row |
| Progress | "5 of 8 skills matched" — Caption (13px/400), Text-Secondary, margin-top Space-3 |

### Cover Letter Generator

| Element | Spec |
|---------|------|
| Section title | Body-Small (14px/600), Text-Primary, margin-top Space-7 |
| Generate button | Primary-500, full width, 36px height, Body-Small/600 |
| Generated preview | Card inside panel, Body (14px/400), Text-Primary, padding Space-3, bg Neutral-50, radius-sm |
| Edit link | "Open in editor" — Caption (13px/500), Primary-600, margin-top Space-3 |
| Tone selector | Compact radio: Professional / Friendly / Enthusiastic |

### Salary Insight

| Element | Spec |
|---------|------|
| Section title | Body-Small (14px/600), Text-Primary, margin-top Space-7 |
| Market range | Body (15px/600), Success-700, "$160,000 - $195,000" |
| Label | Caption (13px/400), Text-Secondary "Market average for this role" |
| Percentile bar | 6px height, Neutral-200 track, Primary-500 fill at 65% width |
| Your CV estimate | Caption (13px/500), Primary-600, "Your CV suggests $175,000" |
| Confidence | "Based on 1,247 similar roles" — Caption (12px/400), Text-Secondary |

### States

| State | Visual |
|-------|--------|
| Default | All sections populated |
| Loading | Skeleton bars per section |
| Generating (CL) | Spinner on generate button, shimmer on preview area |
| Complete | Preview shows full generated cover letter |
| Error | Error in section with retry link |
| Empty | "Complete your CV for personalized insights" |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | complementary (sidebar) |
| aria-label | "AI insights panel" |
| aria-live="polite" | Dynamic content updates |

---

## Section 4: Job Description

| Property | Value |
|----------|-------|
| Purpose | Full job posting content |
| Priority | P0 |
| Padding | Space-5 (16px) |
| Background | Surface-1 |
| Border radius | radius-md (8px) |
| Border | 1px solid Neutral-200 |
| Elevation | Layer 1 |

### Section Format

| Property | Value |
|----------|-------|
| Section heading | Heading-4 (18px/600), Text-Primary, margin-top Space-5 (first section no top margin) |
| Body text | Body (15px/400), Text-Primary, line-height 1.6, margin-top Space-3 |
| List items | Body (15px/400), Text-Primary, bullet, margin-top Space-3, padding-left Space-5 |

### Standard Sections

| Section | Content Type |
|---------|-------------|
| About the Role | Paragraph body text |
| Responsibilities | Bullet list |
| Requirements | Bullet list with minimum/ preferred |
| Benefits | Bullet list |
| About [Company] | Paragraph body text |
| Equal Opportunity | Caption (13px/400), Text-Secondary, italic |

### Spacing

| Usage | Token | Value |
|-------|-------|-------|
| Between sections | Space-5 | 16px |
| Heading to body | Space-3 | 8px |
| List item padding left | Space-5 | 16px |
| Section padding | Space-5 | 16px |

### States

| State | Visual |
|-------|--------|
| Default | All content visible |
| Loading | Skeleton: heading + 4 shimmer lines per section |
| Collapsed | "Show more" truncation after 600px (optional) |

---

## Section 5: Similar Jobs

| Property | Value |
|----------|-------|
| Purpose | Keep user engaged with alternative opportunities |
| Priority | P1 |
| Layout | Horizontal scroll container |
| Padding top | Space-8 (32px) |
| Overflow | scroll-x, hide scrollbar (CSS `scrollbar-width: none`) |
| Gap between cards | Space-5 (16px) |

### Section Header

| Element | Spec |
|---------|------|
| Title | Heading-3 (22px/600), Text-Primary |
| Subtitle | Body-Small (14px/400), Text-Secondary |
| Scroll arrows | 32px circles, Neutral-0 bg, Layer 2, left/right edges, hidden on desktop |

### Card Spec

| Property | Value |
|----------|-------|
| Width | 280px (fixed) |
| Min height | 200px |
| Padding | Space-5 (16px) |
| Background | Surface-1 |
| Border | 1px solid Neutral-200 |
| Border radius | radius-md (8px) |
| Elevation | Layer 1 |
| Hover elevation | Layer 2 |
| cursor | pointer |

### Card Elements

| Element | Spec |
|---------|------|
| Logo | 40×40px, radius-sm |
| Title | Body (15px/600), Text-Primary, margin-top Space-3 |
| Company | Caption (13px/400), Text-Secondary |
| Salary | Body-Small (14px/600), Success-700, margin-top Space-3 |
| Match badge | "88% Match" — Caption (12px/600), Primary-600 text, Primary-50 bg, radius-sm |
| Location | Caption (13px/400), Text-Secondary, margin-top Space-3 |

### States

| State | Visual |
|-------|--------|
| Default | Row of 3-5 cards |
| Hover (card) | Layer 2, subtle scale 1.02 |
| Scroll | Scroll arrows appear on container hover |
| Empty | Section hidden entirely |
| Loading | 3 skeleton cards (280px × 200px) |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | region |
| aria-label | "Similar jobs" |
| role="list" | Card container |
| tabindex="0" | Scrollable container for arrow key navigation |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Arrow Left/Right | Scroll container horizontally |
| Tab | Move between cards |
| Enter | Navigate to job detail |

---

## Section 6: States

### Loading State (Skeleton)

| Region | Elements |
|--------|----------|
| Header card | Logo 64px + title line 60% + body lines 3 × 50% |
| Match card | Circle 56px + 3 bars |
| Description | Heading 40% + 5 body lines per section (2 sections) |
| Similar jobs | 3 cards 280px × 200px each |

### Job Not Found (Error)

| Property | Value |
|----------|-------|
| Layout | Centered column, 400px max-width |
| Title | Heading-2 (28px), Text-Primary, "Job not found" |
| Description | Body (15px/400), Text-Secondary, "This posting may have expired or been removed." |
| Actions | "← Back to search" — Primary-600, Body-Small |
| Icon | 64×64px, Neutral-300, document with question mark |

### Sticky Bottom Bar (Mobile)

| Property | Value |
|----------|-------|
| Height | 64px |
| Background | Glass Navigation (opacity 0.85, backdrop-filter blur 12px) |
| Border top | 1px solid Neutral-200/50 |
| Padding | Space-5 (16px) |
| Elevation | Layer 5 |
| z-index | 100 |

| Element | Spec |
|---------|------|
| Save button | Icon + "Save", outline, 36px |
| Salary indicator | Body-Small (14px/500), Success-700, dropdown chevron |
| Apply Now | Primary-500, flex 1, Body-Small/600, left margin Space-3 |

### Offline State

| Banner | "You are viewing cached data. Some features require internet." — Warning-50 bg, Warning-700 text, 40px height |

---

## Responsive Behavior

| Breakpoint | Layout | Changes |
|------------|--------|---------|
| >1400px | Full 3-column | Sidebar + content + AI panel |
| 1100-1400px | 3-column | All visible |
| 800-1100px | 2-column | AI panel moved to overlay (toggle) |
| 600-800px | Stacked | Full-width content, AI panel drawer, sticky bar |
| <600px | Single column | Full details, floating bottom bar |

### Tablet (<900px)

| Element | Change |
|---------|--------|
| Sidebar | Collapsed to icon drawer |
| AI panel | Hidden, toggle button in topbar opens as overlay |
| Header card | Logo 48px, title Heading-3 |
| Similar jobs | 2 cards visible, scroll arrows |
| Action buttons | "More" menu contains Save + Share |

### Mobile (<600px)

| Element | Change |
|---------|--------|
| All padding | Space-5 → Space-3 (16px → 8px) |
| Logo | 48px |
| Title | Heading-3 (22px) |
| Salary | Heading-4 (18px) |
| Match score | 48px radial gauge, Caption labels |
| AI panel | Full-screen overlay with close button |
| Similar jobs | Single card visible, swipeable |
| Description | No side padding |
| Actions | Sticky bottom bar always visible |

---

## Color Tokens Reference

| Element | Light Token | Dark Token |
|---------|-------------|------------|
| Header card bg | Surface-1 | Neutral-100 |
| Header card border | Neutral-200 | Neutral-700 |
| Salary text | Success-700 | Success-400 |
| Match card bg | Primary-50 | Primary-950 |
| Match gauge track | Primary-500/20 | Primary-400/20 |
| Match gauge fill | Primary-500 | Primary-400 |
| AI panel border | Neutral-200 | Neutral-700 |
| AI panel bg | Surface-1 | Neutral-100 |
| Matched skill | Success-600 | Success-400 |
| Missing skill | Error-600 | Error-400 |
| Similar card border | Neutral-200 | Neutral-700 |
| Similar card hover border | Primary-100 | Primary-900 |
| Sticky bar bg | Glass Nav 0.85 | Glass Nav Dark |
| Job not found icon | Neutral-300 | Neutral-600 |

---

## Typography Reference

| Element | Token | Size | Weight |
|---------|-------|------|--------|
| Job title | Heading-2 | 28px | 650 |
| Salary in header | Heading-4 | 18px | 600 |
| Company name | Body | 15px | 500 |
| Location | Body | 15px | 400 |
| Match score | Heading-3 | 22px | 700 |
| Section title (description) | Heading-4 | 18px | 600 |
| Description body | Body | 15px | 400 |
| Similar job title | Body | 15px | 600 |
| Similar job salary | Body-Small | 14px | 600 |
| Similar job match | Caption | 12px | 600 |
| AI panel section | Body-Small | 14px | 600 |
| Skills gap item | Caption | 13px | 400 |
| Cover letter preview | Body | 14px | 400 |
| Market salary | Body | 15px | 600 |
| Breakdown detail | Caption | 12px | 400 |

---

## Spacing Reference

| Usage | Token | Value |
|-------|-------|-------|
| Header card padding | Space-7 | 24px |
| Breadcrumb bottom | Space-5 | 16px |
| Between major sections | Space-5 | 16px |
| Description sections | Space-5 | 16px |
| AI panel padding | Space-7 | 24px |
| Similar jobs top | Space-8 | 32px |
| Similar card padding | Space-5 | 16px |
| Card gap | Space-5 | 16px |
| Match card padding | Space-5 | 16px |
| Icon to text | Space-3 | 8px |

---

## Future Expansion Items

| Item | Description | Priority |
|------|-------------|----------|
| Company intelligence | Embed Crunchbase, Glassdoor, funding data | P2 |
| Interview questions | AI-generated likely Q&A for this role | P2 |
| Networking | "See who you know at this company" | P2 |
| Application deadline | Countdown timer for time-sensitive postings | P1 |
| Salary negotiation guide | Data-backed negotiation script for role | P2 |
| Equity calculator | Convert salary+equity to total comp | P2 |
| Job alert for similar | "Notify me when similar roles open" | P1 |
| Quiz/assessment | Inline skills challenge for immediate qualification | P3 |
| Video company pitch | Embedded company intro video | P3 |
| Remote workspace info | Timezone overlap, async expectations | P2 |
| Role comparison | Side-by-side compare of 2-3 jobs | P2 |
