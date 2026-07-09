# Application Tracker — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:Screen (Applications List, Application Detail), DP-6:Nav, DP-1:All

---

## Purpose

View and manage all job applications across their lifecycle. Track status changes, view timelines, and access AI-powered insights per application.

---

## List View Layout

```
┌──────────┬────────────────────────────────────────────────────┐
│          │  TOPBAR (56px)                                     │
│          │  ← Applications                                    │
│ SIDEBAR  ├────────────────────────────────────────────────────┤
│ (240px)  │  CONTENT                                           │
│          │                                                    │
│  PAGE HEADER                                                  │
│  "My Applications"                               [+ New App] │
│                                                    │
│  STATUS TABS                                                    │
│  ┌────────┬──────────┬──────────┬──────────┬─────────┐       │
│  │  All   │  Active  │Interview │  Offers  │Rejected │       │
│  │  (12)  │   (5)    │   (3)    │   (2)    │   (2)   │       │
│  └────────┴──────────┴──────────┴──────────┴─────────┘       │
│                                                    │
│  APPLICATION CARDS (within active tab)                       │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Acme Corp                              Status ▼  ⋮   │  │
│  │  Senior Frontend Developer                            │  │
│  │  Applied 2w ago  ·  Updated 3d ago                    │  │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 60%          │  │
│  │  AI: Next step expected within 5 days  [View]        │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │  Beta Inc                               Status ▼  ⋮   │  │
│  │  Full Stack Engineer                                 │  │
│  │  Interview scheduled: Jul 12, 2026                   │  │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 80%    │  │
│  │  AI: Prepare for technical interview     [View]      │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                    │
│  AI INSIGHT BAR (collapsible)                                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  💡 AI Insight: 2 applications haven't had updates in │  │
│  │  over 2 weeks. Consider a follow-up.       [Dismiss]  │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 1. Status Tabs

| Property | Value |
|----------|-------|
| Height | 44px |
| Gap | Space-2 (4px) |
| Active tab | Primary-600 text, bottom border 2px Primary-600 |
| Tab padding | Space-3 (8px) Space-4 (12px) |
| Tab count badge | Caption, Primary-50 bg, radius-full |

### Tab labels: All (12), Active (5), Interview (3), Offers (2), Rejected (2)

---

## 2. Application Cards (List View)

| Property | Value |
|----------|-------|
| Padding | Space-5 (16px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | Border-Default |
| Shadow | Shadow-1 |
| Margin bottom | Space-3 (8px) |

### Card Elements:
| Element | Details |
|---------|---------|
| Company logo | 40px x 40px, radius-sm |
| Company name | Body, 600 weight |
| Job title | Body-Small, Text-Secondary |
| Status dropdown | Current status (colored dot + label) + menu |
| Applied date | Caption, Text-Secondary |
| Last updated | Caption, Text-Secondary |
| Progress bar | 4px height, rounded, Primary-500 fill % |
| AI insight line | Body-Small, Primary tint, sparkle icon |
| View action | "View" link |

### Status Visual Mapping:
| Status | Color | Progress % |
|--------|-------|------------|
| Saved | Neutral-400 | 10% |
| Applied | Primary-500 | 25% |
| Screening | Primary-500 | 40% |
| Interview | Warning-500 | 60% |
| Offer | Success-500 | 85% |
| Accepted | Success-500 | 100% |
| Rejected | Danger-500 | 100% |
| Withdrawn | Neutral-400 | 100% |

---

## 3. Detail View (Application Detail)

```
┌──────────┬────────────────────────────────────────┬───────────┐
│          │  ← Applications  /  Acme Corp          │           │
│ SIDEBAR  ├────────────────────────────────────────┤ AI PANEL  │
│          │  STATUS CARD                           │ (360px)   │
│          │  ┌──────────────────────────────────┐  │           │
│          │  │ Current: Applied · 60% progress  │  │ TIMELINE  │
│          │  │ [Withdraw Application]           │  │ ESTIMATE  │
│          │  └──────────────────────────────────┘  │           │
│          │                                        │ Expected  │
│          │  TIMELINE                              │ next: 5d  │
│          │  ● Submitted    Jul 5, 2026           │           │
│          │  ● Under Review Jul 10, 2026          │ NEXT      │
│          │  ○ Interview    Pending               │ STEPS     │
│          │  ○ Offer        —                     │           │
│          │  ○ Decision     —                     │ [Prepare  │
│          │                                        │ for       │
│          │  JOB DETAIL REFERENCE                  │ Interview]│
│          │  Title: Senior Frontend               │           │
│          │  Company: Acme Corp                   │ SKILLS    │
│          │  Location: San Francisco (Hybrid)     │ GAP       │
│          │  Salary: $120-150k                    │           │
│          │                                        │ GraphQL  │
│          │  COMPANY INFO                         │ needed    │
│          │  [View Job Posting]                    │           │
│          └────────────────────────────────────────┘           │
└──────────────────────────────────────────────────────────────┘
```

### Timeline Component:
| Property | Value |
|----------|-------|
| Padding | Space-5 (16px) |
| Icon for each | 24px circle, color by status |
| Completed | Filled circle, status color, white check |
| Current | Pulsing outline circle |
| Upcoming | Dotted circle, Neutral-300 |
| Connector | 2px vertical line between steps |
| Date | Caption, right-aligned |
| Label | Body-Small, Text-Primary |
| Description | Caption, Text-Secondary (optional per step) |

### Status Card:
| Property | Value |
|----------|-------|
| Background | Surface-1 |
| Border | Border-Default |
| Radius | radius-md |
| Padding | Space-5 (16px) |
| Progress | Percentage + bar (4px) |

---

## 4. Empty State (No Applications)

| Element | Specification |
|---------|---------------|
| Illustration | Search/document illustration, 140px |
| Title | "No applications yet" |
| Description | "Start by finding jobs that match your skills and interests" |
| CTA | "Browse Jobs" — Button-Primary |

---

## 5. Loading State

| State | Behavior |
|-------|----------|
| List loading | 4 skeleton cards (140px h, shimmer) |
| Detail loading | Status skeleton + timeline skeleton (5 steps) |
| AI insights | Text skeleton with sparkle icon placeholder |

---

## 6. Error States

| Error | Behavior |
|-------|----------|
| List fails | Error card + retry |
| Detail fails | Cached data + "Could not update. Last synced [time]" |
| Status update fails | Toast + revert to previous status |

---

## 7. Responsive Behavior

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| List | Full-width cards, compact | Full-width | Full-width |
| Tabs | Horizontal scroll | Full visible | Full visible |
| Detail | Single column, AI as bottom sheet | Content + side overlay | Content + 360px AI panel |
| Timeline | Vertical, compact | Vertical | Vertical with more detail |

---

## 8. AI Integration

| Feature | Location | Behavior |
|---------|----------|----------|
| Timeline estimate | Detail side panel | "Expected next update within 5 days" |
| Next steps | Detail side panel | "Prepare for technical interview" with prep resources |
| Insight bar | List top | "2 applications inactive for 2+ weeks — consider follow-up" |
| Skills gap | Detail side panel | "This role requires GraphQL — consider learning" |
| Application score | Card | AI match score to role |

---

## 9. Accessibility

| Element | Requirement |
|---------|-------------|
| Status tabs | `role="tablist"`, `role="tab"`, `aria-selected` |
| Application cards | `role="article"`, `aria-label="[Job] at [Company]"` |
| Status changes | `aria-live="polite"` announcement |
| Timeline | `<ol>` with list semantics |
| Progress bar | `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| Withdraw | Confirmation dialog, keyboard accessible |

---

## 10. Visual Hierarchy

1. **Primary Focus:** Status tabs — scanning filter
2. **Secondary Focus:** Application cards — company + status
3. **Tertiary Focus:** Progress bar + AI insight — quick assessment
4. **Supporting:** AI insight bar — context awareness

---

## 11. Future Expansion

| Feature | Phase |
|---------|-------|
| Kanban board view | Phase 3 |
| Bulk actions (archive, withdraw) | Phase 2 |
| Email integration (track replies) | Phase 5 |
| Offer comparison tool | Phase 4 |
| Application statistics/analytics | Phase 4 |
| Follow-up reminders | Phase 2 |

---

*Cross-references: DP-6:Screen (Applications List, Application Detail), DP-6:Nav, DP-6:Pattern (Status Timeline), DP-6:AI, DP-1:All*
