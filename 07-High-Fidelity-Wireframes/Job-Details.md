# Job Details — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:Screen (Job Detail), DP-6:Nav (Application Flow), DP-1:All

---

## Purpose

Evaluate a specific job opportunity with full description, AI-powered match analysis, skill gap assessment, and application actions.

---

## Layout Overview

```
┌──────────┬────────────────────────────────────────┬───────────┐
│          │  TOPBAR (56px)                          │           │
│          │  ← Jobs  /  Senior Frontend Developer  │           │
│ SIDEBAR  ├────────────────────────────────────────┤ AI SIDE   │
│ (240px)  │  CONTENT (scrollable)                  │ PANEL     │
│          │                                        │ (360px)   │
│          │  JOB HEADER CARD                       │           │
│          │  ┌──────────────────────────────────┐  │ MATCH     │
│          │  │ Logo + Title + Company + Meta    │  │ SCORE     │
│          │  │ [Apply Now] [Save] [Share] [⋮]  │  │           │
│          │  └──────────────────────────────────┘  │ 92% match │
│          │                                        │ ●●●●○    │
│          │  MATCH SCORE BREAKDOWN                  │           │
│          │  ┌──────────────────────────────────┐  │ SKILLS    │
│          │  │ Overall: 92%                     │  │ GAP       │
│          │  │ Skills: 89%  Exp: 95%  Loc: 100%│  │           │
│          │  └──────────────────────────────────┘  │ Missing:  │
│          │                                        │ GraphQL  │
│          │  JOB DESCRIPTION                       │           │
│          │  ┌──────────────────────────────────┐  │           │
│          │  │ About the role...                │  │ COVER     │
│          │  │ Responsibilities...              │  │ LETTER    │
│          │  │ Requirements...                  │  │           │
│          │  └──────────────────────────────────┘  │ [Generate]│
│          │                                        │           │
│          │  SIMILAR JOBS (horizontal scroll)      │ SALARY    │
│          │  ┌─────┐ ┌─────┐ ┌─────┐             │ INSIGHT   │
│          │  │Card1│ │Card2│ │Card3│             │           │
│          │  └─────┘ └─────┘ └─────┘             │ $120-150k │
│          │                                        │ Market:   │
│          │                                        │ $115-160k │
│          └────────────────────────────────────────┘           │
├──────────┴────────────────────────────────────────────────────┤
│  STICKY BOTTOM BAR (mobile: [Apply Now] [Save])               │
└───────────────────────────────────────────────────────────────┘
```

---

## 1. Breadcrumb

| Property | Value |
|----------|-------|
| Padding | Space-3 (8px) 0 |
| Text | Caption: "Jobs > Senior Frontend Developer" |
| Color | Text-Secondary |

---

## 2. Job Header Card

| Property | Value |
|----------|-------|
| Padding | Space-7 (24px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | Border-Default |
| Shadow | Shadow-1 |
| Margin bottom | Space-5 (16px) |

### Elements:
| Element | Size | Details |
|---------|------|---------|
| Company logo | 64px x 64px, radius-md | Right-aligned |
| Job title | Heading-2 (28px) | "Senior Frontend Developer" |
| Company name | Body-Large (16px) | "Acme Corporation" |
| Location | Body, Text-Secondary | "San Francisco, CA (Hybrid)" |
| Salary range | Heading-4 (18px), 600 weight | "$120,000 - $150,000" |
| Job type | Body-Small, badge | "Full-time" — Neutral-200 bg |
| Posted date | Caption, Text-Secondary | "Posted 2 days ago" |
| Applicants | Caption, Text-Secondary | "45 applicants" |

### Action buttons:
| Button | Type | Details |
|--------|------|---------|
| Apply Now | Button-Primary | 160px x 44px, "Apply Now" |
| Save Job | Button-Secondary | Icon + "Save", bookmark icon |
| Share | Icon button | Share icon |
| More | Icon button | ⋮ menu |

---

## 3. Match Score Card

| Property | Value |
|----------|-------|
| Padding | Space-5 (16px) |
| Radius | radius-md (8px) |
| Background | Primary-50 |
| Border | Primary-200 |
| Margin bottom | Space-5 (16px) |

### Overall match:
| Element | Details |
|---------|---------|
| Score radial | 56px circle, Primary stroke, "92%" center |
| Label | "Match Score" — Body, 600 weight |
| Description | "Strong match for this role" — Body-Small, Text-Secondary |
| Breakdown | Skills: 89% · Experience: 95% · Location: 100% |

---

## 4. AI Side Panel (Right)

| Property | Value |
|----------|-------|
| Width | 360px |
| Background | Surface-1 |
| Border left | Border-Default |
| Padding | Space-5 (16px) |
| Overflow | Scroll |

### Sections:

**Match breakdown:**
| Element | Details |
|---------|---------|
| Title | "Match Analysis" — Label |
| Bar per dimension | Skills: 89% (bar), Experience: 95%, Education: 80%, Location: 100% |
| Bar specs | 6px height, rounded, Primary fill |
| Gap | Space-3 (8px) |

**Skills gap analysis:**
| Element | Details |
|---------|---------|
| Title | "Skills Gap" — Label |
| Matched | Body-Small, Success icon: "React, TypeScript, Node.js, CSS" |
| Missing | Body-Small, Warning icon: "GraphQL, AWS" |
| Recommendation | Caption, "These skills appear in 70% of similar roles" |

**Cover letter generator:**
| Element | Details |
|---------|---------|
| Title | "Cover Letter" |
| Action | [Generate Cover Letter] — Button-Secondary, full width |
| Note | Caption, "AI will tailor this to the job description" |

**Salary insight:**
| Element | Details |
|---------|---------|
| Title | "Salary Insight" |
| Listed | "$120k - $150k" |
| Market range | "$115k - $160k" (gray bar showing position) |
| Confidence | AI badge: "Based on 240 similar roles" |

---

## 5. Job Description

| Property | Value |
|----------|-------|
| Padding | Space-7 (24px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | Border-Default |
| Margin bottom | Space-5 (16px) |

### Sections (typography):
| Element | Type | Details |
|---------|------|---------|
| Section heading | Heading-4 (18px) | "About the Role", "Requirements", "Responsibilities" |
| Body text | Body (15px), Text-Body | Standard paragraph formatting |
| List items | Body, Bullet | 8px gap between items |
| Spacing between sections | Space-5 (16px) | — |

---

## 6. Similar Jobs

| Property | Value |
|----------|-------|
| Margin bottom | Space-7 (24px) |

### Header:
| Element | Details |
|---------|---------|
| Title | "Similar Positions" — Heading-4 |
| Link | "View All" |

### Cards (horizontal scroll):
| Property | Value |
|----------|-------|
| Card width | 280px |
| Card height | 160px |
| Padding | Space-5 (16px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | Border-Default |
| Gap | Space-4 (12px) |
| Scroll behavior | Snap scroll, no scrollbar on desktop |

### Each card:
| Element | Details |
|---------|---------|
| Title | Body, 600 weight, truncated to 2 lines |
| Company | Body-Small, Text-Secondary |
| Salary | Body-Small, 600 weight |
| Match | Small badge: "87% match" |

---

## 7. Loading State

| Phase | Skeleton |
|-------|----------|
| Header card | Logo circle (64px) + 3 text lines + 2 button skeletons |
| Match score | Circle gauge skeleton + 3 bar skeletons |
| Description | 6 text lines of varying width |
| Side panel | 4 section skeletons with lines |
| Similar jobs | 3 card skeletons (280px x 160px) |

---

## 8. Error States

| Error | Behavior |
|-------|----------|
| Job not found | Full error state: "This job is no longer available" + similar suggestions |
| Load failure | Retry button on header card, cached data if previously viewed |
| Apply link fails | Toast: "Application couldn't be opened. Try again." |

---

## 9. Responsive Behavior

| Element | Mobile (<768px) | Tablet (768-1023px) | Desktop (1280px+) |
|---------|-----------------|---------------------|-------------------|
| Layout | Single column | Content + side panel | Full tri-panel |
| Side panel | Hidden (button to open as sheet) | Right drawer overlay | Persistent 360px |
| Match score | Inline after header | Card form | Card form |
| Similar jobs | 1 card visible + scroll arrows | 2 visible | 3 visible |
| Apply button | Sticky bottom bar | In header | In header |
| Description | Full width | Full width | Full width |

---

## 10. AI Integration

| Feature | Location | Behavior |
|---------|----------|----------|
| Match score | Header + side panel | Full breakdown with confidence |
| Skills gap | Side panel | What you have vs what's needed |
| Cover letter | Side panel | AI generates tailored draft |
| Salary insight | Side panel | Market comparison with data sources |
| Similar jobs | Bottom section | AI recommends based on profile |
| Interview prep | Side panel (future) | AI generates questions and talking points |

---

## 11. Accessibility

| Element | Requirement |
|---------|-------------|
| Job title | `<h1>` — single per page |
| Match score | Text: "92 percent match" — never color only |
| Salary | Text with full range visible |
| Side panel | `role="complementary"`, `aria-label="Job analysis"` |
| Similar jobs | `aria-label="Similar positions"`, `role="list"` |
| Apply button | `aria-label="Apply for [Job Title]"` |
| Company logo | `alt="[Company] logo"` or `aria-hidden="true"` if decorative |

---

## 12. Visual Hierarchy

1. **Primary Focus:** Job title + company (top, large type)
2. **Secondary Focus:** Match score — colored card draws eye
3. **Tertiary Focus:** "Apply Now" button — primary accent
4. **Supporting:** Description, similar jobs, side panel details

---

## 13. Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Header → Match → Description → Similar Jobs → Side panel |
| Enter | Apply, Save, Share actions |
| Escape | Close side panel overlay (tablet/mobile) |
| Arrow Right | Scroll similar jobs |

---

## 14. Future Expansion

| Feature | Phase |
|---------|-------|
| Company culture insights | Phase 4 |
| Salary negotiation data | Phase 4 |
| Interview questions preview | Phase 4 |
| Company reviews integration | Phase 5 |
| "People also viewed" section | Phase 3 |
| Application deadline countdown | Phase 2 |

---

*Cross-references: DP-6:Screen (Job Detail), DP-6:Nav (Application Flow), DP-6:AI, DP-1:All*
