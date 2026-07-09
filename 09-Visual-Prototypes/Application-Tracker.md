# Application Tracker — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Version:** 1.0
**Status:** Production Specification
**Inherits:** DP-0 through DP-8, DP-7:Application-Tracker, DP-6:Screen (Applications List, Application Detail)

---

## Purpose

Complete visual prototype for tracking job applications across their lifecycle. Covers list view, detail view, timeline, AI insights panel, and all interaction states. Implementation-ready — no design decisions remain.

---

## Layout Diagram

### List View

```
┌──────────┬─────────────────────────────────────────────────────────────┐
│          │  TOPBAR (56px, glass)                                       │
│          │  ← Applications                          [+ New Application]│
│ SIDEBAR  ├─────────────────────────────────────────────────────────────┤
│ (240px)  │  CONTENT AREA (scrollable, padding Space-8)                 │
│ EXPANDED │                                                             │
│          │  PAGE HEADER                                                │
│          │  "My Applications" (Heading-2, 28px)                        │
│          │                                                             │
│          │  STATUS TABS (44px)                                         │
│          │  ┌──────┬────────┬────────┬────────┬──────────┐            │
│          │  │ All  │ Active │Interv. │ Offers │ Rejected │            │
│          │  │ (12) │  (5)   │  (3)   │  (2)   │   (2)    │            │
│          │  └──────┴────────┴────────┴────────┴──────────┘            │
│          │                                                             │
│          │  APPLICATION CARDS (stacked, Space-3 gap)                  │
│          │  ┌──────────────────────────────────────────────────────┐   │
│          │  │ ┌────┐ Acme Corp                   Status ▼     ⋮   │   │
│          │  │ │ 40 │ Senior Frontend Developer                  │   │
│          │  │ └────┘ Applied 2w ago · Updated 3d ago            │   │
│          │  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 60%        │   │
│          │  │ ✨ AI: Next step expected within 5 days  [View]    │   │
│          │  ├──────────────────────────────────────────────────────┤   │
│          │  │ ┌────┐ Beta Inc                     Status ▼     ⋮   │   │
│          │  │ │ 40 │ Full Stack Engineer                         │   │
│          │  │ └────┘ Interview Jul 12 · Updated 1d ago           │   │
│          │  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 80%  │   │
│          │  │ ✨ AI: Prepare for technical interview   [View]    │   │
│          │  └──────────────────────────────────────────────────────┘   │
│          │                                                             │
│          │  AI INSIGHT BAR (collapsible, Primary-50 bg)               │
│          │  ┌──────────────────────────────────────────────────────┐   │
│          │  │ ✨ 2 apps inactive 2+ weeks — consider follow-up  × │   │
│          │  └──────────────────────────────────────────────────────┘   │
└──────────┴─────────────────────────────────────────────────────────────┘
```

### Detail View

```
┌──────────┬─────────────────────────────────────────────┬────────────────┐
│          │  TOPBAR (56px, glass)                       │                │
│          │  ← Applications / Acme Corp                 │                │
│ SIDEBAR  ├─────────────────────────────────────────────┤ AI SIDE PANEL │
│ (240px)  │  CONTENT                                    │ (360px)       │
│          │                                             │                │
│          │  STATUS CARD                                │  TIMELINE      │
│          │  ┌─────────────────────────────────────┐   │  ESTIMATE      │
│          │  │ Current: Applied (60% progress)      │   │                │
│          │  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 60%   │   │  Expected next │
│          │  │ [Withdraw Application]               │   │  update: 5d   │
│          │  └─────────────────────────────────────┘   │                │
│          │                                             │  NEXT STEPS    │
│          │  TIMELINE                                   │                │
│          │  ●━━━━ Submitted        Jul 5, 2026        │  ☐ Prepare     │
│          │  ●━━━━ Under Review     Jul 10, 2026       │  ☐ Research    │
│          │  ○ - - - Interview      Pending             │  ☐ Follow up   │
│          │  ○ - - - Offer          —                  │                │
│          │  ○ - - - Decision       —                  │  SKILLS GAP    │
│          │                                             │                │
│          │  JOB DETAIL REFERENCE                       │  GraphQL      │
│          │  Senior Frontend · Acme Corp               │  needed        │
│          │  SF Hybrid · $120-150k                     │                │
│          │  [View Job Posting]                        │  APP SCORE     │
│          │                                             │                │
│          │  COMPANY INFO                               │  85/100       │
│          │  [View Company Profile]                     │  Strong match  │
│          └─────────────────────────────────────────────┘                │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Status Tabs

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 44px |
| Gap | Space-2 | 4px |
| Padding per tab | Space-3 Space-4 | 8px 12px |
| Font | Body (Inter 400) | 15px |
| Text default | Neutral-600 | #5B6770 |
| Text hover | Neutral-800 | #2D3748 |
| Text active | Primary-600 | #2563EB |
| Indicator active | 2px bottom border | Primary-600 (#2563EB) |
| Count badge bg | Primary-50 | #EFF6FF |
| Count badge text | Primary-600 | #2563EB |
| Count badge radius | radius-full | 9999px |
| Count badge padding | Space-1 Space-2 | 2px 6px |

### States

| State | Visual |
|-------|--------|
| Default | Neutral-600 text, no indicator |
| Hover | Neutral-800 text, Surface-1 bg tint |
| Active/Focus | Primary-600 text, 2px Primary-600 bottom border |
| Focus ring | 2px Primary-400 ring offset 2px |
| Disabled | Neutral-300 text, no interaction |

### Tabs (5 total)

All (12) | Active (5) | Interview (3) | Offers (2) | Rejected (2)

---

## Application Cards — List View

| Property | Token | Value |
|----------|-------|-------|
| Padding | Space-5 | 16px |
| Radius | radius-md | 8px |
| Background | Surface-1 | #FFFFFF |
| Border | Border-Default | Neutral-200 (#E5E7EB) |
| Shadow | Elevation-1 | Shadow-1 |
| Margin bottom | Space-3 | 8px |
| Min height | — | 120px |

### Card Layout (inner)

```
┌─[left: logo + text]─────────────────────[right: status + actions]──┐
│  ┌──────┐  Company Name (Body/600, 15px)     ┌────────┐           │
│  │ 40px │  Job Title (Body-Small, 14px)      │ Status ▼│   ⋮     │
│  │ icon │  Applied 2w · Updated 3d           └────────┘           │
│  └──────┘                                                         │
│           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 60%              │
│           ✨ AI: Next step expected within 5 days     [View]       │
└────────────────────────────────────────────────────────────────────┘
```

### Elements

| Element | Spec |
|---------|------|
| Company logo | 40px × 40px, radius-sm (6px), Surface-2 bg #F3F4F6 placeholder |
| Company name | Body 15px, weight 600, Text-Primary (#1A202C) |
| Job title | Body-Small 14px, weight 400, Text-Secondary (#5B6770) |
| Applied date | Caption 13px, Text-Secondary |
| Last updated | Caption 13px, Text-Secondary |
| Status dropdown | Body 14px, colored dot + label, chevron icon |
| Progress bar | 4px height, radius-full (2px), bg Neutral-200, fill Primary-500 |
| Progress label | Caption 13px, 600 weight, aligned right |
| AI insight line | Body-Small 14px, Primary-600 text, sparkle icon (16px) |
| View action | Body-Small 14px, Primary-600, weight 500, text link |
| Context menu | ⋮ icon, 24px hit target, triggers dropdown (Elevation-3) |

### Status Visual Mapping

| Status | Dot Color | Hex | Progress % | Progress Fill |
|--------|-----------|-----|------------|---------------|
| Saved | Neutral-400 | #9CA3AF | 10% | Neutral-400 |
| Applied | Primary-500 | #3B82F6 | 25% | Primary-500 |
| Screening | Primary-500 | #3B82F6 | 40% | Primary-500 |
| Interview | Warning-500 | #F59E0B | 60% | Warning-500 |
| Offer | Success-500 | #10B981 | 85% | Success-500 |
| Accepted | Success-500 | #10B981 | 100% | Success-500 |
| Rejected | Danger-500 | #EF4444 | 100% | Danger-500 |
| Withdrawn | Neutral-400 | #9CA3AF | 100% | Neutral-400 |

### Card States

| State | Visual |
|-------|--------|
| Default | Surface-1 bg, Border-Default, Shadow-1 |
| Hover | Shadow-2, Primary-200 border (#BFDBFE), cursor pointer |
| Active/Focus | Focus ring: 2px Primary-400, offset 2px |
| Pressed | Scale 0.99, Shadow-1 |
| Drag | Shadow-4, opacity 0.9, rotate -2deg |

---

## Detail View

### Status Card

| Property | Token | Value |
|----------|-------|-------|
| Padding | Space-5 | 16px |
| Radius | radius-md | 8px |
| Background | Surface-1 | #FFFFFF |
| Border | Border-Default | Neutral-200 |
| Shadow | Elevation-1 | Shadow-1 |
| Margin bottom | Space-5 | 16px |

**Elements:**
- Status label: Body 15px, 600 weight, with color dot
- Progress bar: 4px, radius-full, Primary-500 fill
- Progress percentage: Body-Small 14px, 600 weight
- Withdraw button: Button-Ghost, Danger-500 text, Body 14px

### Timeline Component

| Property | Token | Value |
|----------|-------|-------|
| Padding | Space-5 | 16px |
| Radius | radius-md | 8px |
| Background | Surface-1 | #FFFFFF |
| Border | Border-Default | Neutral-200 |
| Margin bottom | Space-7 | 24px |

**Circle specs:**
| State | Visual | Size |
|-------|--------|------|
| Completed | Filled circle, status color, white check icon | 24px |
| Current | Outline circle, Primary-500 stroke, pulsing animation | 24px |
| Upcoming | Dotted circle, Neutral-300 (#D1D5DB) | 24px |

**Connector:** 2px solid vertical line between circles
**Spacing:** Space-7 (24px) between steps

**Step content:**
- Label: Body-Small 14px, 600 weight, Text-Primary
- Date: Caption 13px, Text-Secondary
- Description (optional): Caption 13px, Text-Secondary, italic

### Job Detail Reference

| Property | Token | Value |
|----------|-------|-------|
| Padding | Space-5 | 16px |
| Radius | radius-md | 8px |
| Background | Surface-1 | #FFFFFF |
| Border | Border-Default | Neutral-200 |

**Elements:**
- Role: Body 15px, 600 weight
- Company: Body-Small 14px, Text-Secondary
- Location: Body-Small 14px, Text-Secondary
- Salary: Body-Small 14px, 600 weight, Success-500 text
- [View Job Posting]: Text link, Primary-600

### Company Info

Same card spec. Content: company description, website, industry. [View Company Profile] link.

---

## AI Side Panel (Detail View)

| Property | Token | Value |
|----------|-------|-------|
| Width | — | 360px |
| Background | Surface-1 | #FFFFFF |
| Border left | Border-Default | Neutral-200 |
| Padding | Space-5 | 16px |
| Overflow | Scroll | auto |

### AI Panel Sections

**Timeline Estimate:**
| Element | Spec |
|---------|------|
| Header | "Timeline Estimate" — Label 14px, 600 weight |
| Card | Primary-50 bg #EFF6FF, radius-md 8px, padding Space-5 |
| Estimate | Body 15px, "Expected next update within 5 days" |
| Confidence | Caption 13px, "AI confidence: High" |
| Updated | Caption, "Based on 12 similar applications" |

**Next Steps:**
| Element | Spec |
|---------|------|
| Header | "Next Steps" with sparkle icon |
| Items | Checkbox list (16px checkbox), Body-Small 14px |
| Items | 3-5 actionable steps with AI priority ordering |
| CTA | Button-Small-Primary for primary action |

**Skills Gap:**
| Element | Spec |
|---------|------|
| Header | "Skills Gap Analysis" |
| Missing | Label + "Learn" link per skill |
| Match % | Caption, "8/12 skills match" with progress indicator |

**Application Score:**
| Element | Spec |
|---------|------|
| Header | "Application Score" |
| Score circle | 64px diameter, semi-gauge, Primary-500 to value |
| Breakdown | Category scores (4) with bars |

---

## AI Insight Bar (List View)

| Property | Token | Value |
|----------|-------|-------|
| Background | Primary-50 | #EFF6FF |
| Border | Primary-200 | #BFDBFE |
| Padding | Space-4 Space-5 | 12px 16px |
| Radius | radius-md | 8px |
| Margin bottom | Space-5 | 16px |
| Animation | Slide in from top | 300ms ease-out |

**Elements:**
- Sparkle icon: 20px, Primary-500
- Text: Body-Small 14px, Text-Primary
- Dismiss: × button, 24px hit target

---

## Empty State

| Element | Spec |
|---------|------|
| Layout | Centered, padding Space-14 128px |
| Illustration | Document/search illustration, 140px × 140px |
| Title | "No applications yet" — Heading-3 (22px), Text-Primary |
| Description | "Start by finding jobs that match your skills and interests" — Body 15px, Text-Secondary |
| CTA | "Browse Jobs" — Button-Primary (40px height) |
| Spacing | Illustration to title: Space-5 (16px), title to desc: Space-3 (8px), desc to CTA: Space-7 (24px) |

### Per-Tab Empty Variants

| Tab | Title | Description |
|-----|-------|-------------|
| Active | "No active applications" | Applications in progress will appear here |
| Interview | "No interviews scheduled" | Interview invitations from your applications will appear here |
| Offers | "No offers yet" | Job offers will be listed here when received |
| Rejected | "No rejected applications" | You have no rejected applications yet |

---

## Loading State

| Element | Skeleton | Duration |
|---------|----------|----------|
| Status tabs | 5 pill skeletons, 60px wide each | <400ms |
| Card (×4) | 120px height, shimmer animation | stagger 100ms per card |
| Company logo | 40px circle skeleton | — |
| Text lines | 3 lines: 70%, 50%, 90% width | — |
| Progress bar | 4px skeleton bar at 40% width | — |
| AI insight | 14px line with sparkle placeholder | <800ms |
| Detail view | Status skeleton + 5 timeline steps | <1s |

**Skeleton spec:** Surface-2 bg (#F3F4F6), radius-md, shimmer animation 1.5s infinite, gradient sweep #F3F4F6 → #E5E7EB → #F3F4F6.

---

## Error State

| Scenario | Visual | Action |
|----------|--------|--------|
| List load fail | Error card: icon + "Could not load applications" + [Retry] | Retry refetches |
| Detail load fail | Partial data + "Could not update. Last synced [time]" banner | Banner retry |
| Status update fail | Toast bottom: "Could not update status" + revert | Auto-dismiss 5s |
| Network timeout | "Request timed out" in place of cards + [Try Again] | — |
| Server error | "Something went wrong (500)" + [Contact Support] | — |

---

## Offline State

| Element | Behavior |
|---------|----------|
| Topbar indicator | Orange dot + "Working offline" label |
| Cached cards | Displayed from last fetch, grey border indicating cached |
| Status changes | Disabled (tooltip: "Unavailable offline") |
| AI insights | "AI insights unavailable offline" skeleton replacement |
| New applications | "+ New Application" button disabled |
| Last synced | Text: "Last synced: [time]" at top of list |

---

## Motion & Animation

### Card Entry (List)
| Property | Value |
|----------|-------|
| Initial | translateY(16px), opacity 0 |
| Active | translateY(0), opacity 1 |
| Duration | 300ms |
| Easing | ease-out (cubic-bezier(0.16, 1, 0.3, 1)) |
| Stagger | 50ms between cards |

### Card Exit
| Property | Value |
|----------|-------|
| Transform | translateX(-100%) |
| Opacity | 0 |
| Duration | 250ms |
| Easing | ease-in |

### Status Change
| Property | Value |
|----------|-------|
| Progress bar | Width animates 400ms ease-out |
| Status dot | Scale pop 200ms (1 → 1.2 → 1) |
| Card highlight | Flash Primary-50 bg 600ms then fade |

### Timeline Update
| Property | Value |
|----------|-------|
| New step | Scale in from 0 to 24px, 300ms spring |
| Connector | Grow from top, 200ms per step |
| Current pulse | Scale 1↔1.1, 1.5s infinite, opacity 0.8↔1 |

### AI Panel
| Property | Value |
|----------|-------|
| Slide in | translateX(360px) → 0, 350ms ease-out |
| Content enter | Stagger children 80ms apart, opacity fade+slide |

---

## Responsive Behavior

| Element | Mobile (<768px) | Tablet (768–1023px) | Desktop (1280px+) |
|---------|-----------------|---------------------|-------------------|
| Layout | Bottom nav, single column | Icon sidebar rail, single col | Expanded sidebar, full content |
| Cards | Full-width, compact (12px padding) | Full-width | Full-width |
| Status tabs | Horizontal scroll, hide badges | Full visible | Full visible |
| Progress bar | 3px height | 4px height | 4px height |
| AI insight bar | Hidden (moved to detail) | Collapsible | Persistent |
| Detail layout | Single column stack | Content + overlay AI (drawer) | Content + fixed 360px AI panel |
| Timeline | Compact circles (20px), tight spacing | Standard | Standard with descriptions |
| AI panel | Bottom sheet (drag handle) | Right drawer 320px | Persistent 360px |
| Card actions | Swipe for actions | ⋮ menu | ⋮ menu + inline [View] |
| Content padding | Space-5 (16px) | Space-7 (24px) | Space-8 (32px) |

---

## Visual Hierarchy

1. **Primary Focus:** Status tabs — top filter, highest contrast w/ Primary-600 active
2. **Secondary Focus:** Application cards — company name + status dropdown (first scan target)
3. **Tertiary Focus:** Progress bar + AI insight — quick status assessment per card
4. **Supporting:** AI insight bar — contextual awareness, Peripheral

### Eye Movement (List)
```
Status Tabs → [scan horizontally]
    ↓
Card 1: Logo → Company → Status → Progress → AI insight → [View]
    ↓
Card 2: (same pattern)
    ↓
AI Insight Bar → [bottom peripheral]
```

### Eye Movement (Detail)
```
Status Card → [progress assessment]
    ↓
Timeline → [scroll from top to bottom]
    ↓
Job Reference → [context]
    ↓
AI Panel (right): Timeline estimate → Next Steps → Skills Gap → Score
```

---

## Accessibility

| Element | Role | ARIA |
|---------|------|------|
| Status tabs | `role="tablist"`, children `role="tab"` | `aria-selected`, `aria-controls`, `aria-label="Show [tab] applications"` |
| Tab panel | `role="tabpanel"` | `aria-labelledby` matching tab |
| Application cards | `role="article"` | `aria-label="[Job Title] at [Company Name]"` |
| Progress bar | `role="progressbar"` | `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"` |
| Status dropdown | `role="combobox"` | `aria-label="Change status for [job]"` |
| Context menu | `role="menu"` | `aria-label="Card actions"` |
| Timeline | `<ol>` with list semantics | `aria-label="Application timeline"` |
| Timeline step | `role="listitem"` | `aria-current="step"` on current |
| AI insight | `role="status"` | `aria-live="polite"` |
| AI panel | `role="complementary"` | `aria-label="AI application insights"` |
| Withdraw button | `role="button"` | `aria-label="Withdraw application from [company]"` |
| Empty state | `role="region"` | `aria-label="No applications"` |
| Error state | `role="alert"` | `aria-live="assertive"` |

### Keyboard Navigation Table

| Key | Context | Action |
|-----|---------|--------|
| Tab | Global | Move through: Tabs → Cards → Actions → AI panel |
| Shift+Tab | Global | Reverse focus |
| Left/Right | Status tabs | Switch between tabs |
| Up/Down | Card list | Navigate between application cards |
| Space | Card focused | Open card/select |
| Enter | Card focused | Navigate to detail view |
| Enter | Status dropdown | Open status menu |
| Escape | Any dropdown/menu | Close current dropdown |
| Escape | Detail view | Return to list view |
| Delete | Card focused | Quick delete (with confirmation) |
| / | Global | Focus search (when available) |
| Ctrl/Cmd+K | Global | Command palette |
| F6 | Detail view | Cycle: Content → AI panel → Topbar → Sidebar |

---

## AI Integration

| Feature | Location | Behavior | Trigger |
|---------|----------|----------|---------|
| Timeline estimate | Detail AI panel | AI predicts next status date from historical data | On detail load |
| Next steps | Detail AI panel | 3-5 actionable steps based on current stage | On detail load, updates on status change |
| Skills gap | Detail AI panel | Missing skills vs job requirements with learn links | On detail load |
| Application score | Detail AI panel | 0-100 match score with category breakdown | On detail load |
| Insight bar | List top | Aggregate insight (e.g. "2 apps inactive") | On list load, periodic |
| Per-card insight | Card footer | Stage-specific advice | On card render |
| Status prediction | Detail tooltip | "Based on this industry, next step typically takes 3-7 days" | Hover on progress |
| Follow-up reminders | Insight bar | "You haven't followed up with Acme Corp in 2 weeks" | Scheduled check |
| Smart sorting | List (future) | AI-ordered by predicted response likelihood | Toggle in sort |

### AI Confidence Indicators
| Level | Visual | Usage |
|-------|--------|-------|
| High | Primary-500 solid, no label | >80% confidence |
| Medium | Warning-500, "Estimated" prefix | 50-80% confidence |
| Low | Neutral-400, "AI suggestion" prefix | <50% confidence |

---

## Future Expansion

| Feature | Phase |
|---------|-------|
| Kanban board view (drag-drop columns) | Phase 3 |
| Bulk operations (archive, withdraw, status change) | Phase 2 |
| Email integration (automatic reply tracking) | Phase 5 |
| Offer comparison tool (side-by-side offers) | Phase 4 |
| Application analytics (conversion funnel, time metrics) | Phase 4 |
| Follow-up automation (auto-send check-ins) | Phase 3 |
| Salary negotiation coach (AI-powered per offer) | Phase 5 |
| Company research panel (integrated in detail) | Phase 4 |
| Application template (save & apply to similar roles) | Phase 3 |
| Pipeline export (CSV/PDF of all applications) | Phase 2 |

---

*Cross-references: DP-7:Application-Tracker, DP-6:Screen (Applications List, Application Detail), DP-6:Nav, DP-6:AI, DP-1:All, DP-8:All*
