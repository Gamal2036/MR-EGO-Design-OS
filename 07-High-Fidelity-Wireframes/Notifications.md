# Notifications — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:Screen (Notifications), DP-6:Nav (Notification Flow), DP-1:All

---

## Purpose

Central notification center for all system, application, and AI-generated notifications. Grouped by type with read/unread states and action capabilities.

---

## Layout Overview

```
┌──────────┬────────────────────────────────────────────────────┐
│          │  TOPBAR (56px)                                     │
│          │  ← Notifications                  Mark Read  ⋮   │
│ SIDEBAR  ├────────────────────────────────────────────────────┤
│ (240px)  │  CONTENT                                           │
│          │                                                    │
│  PAGE HEADER                                                  │
│  "Notifications"                             [⚙ Settings]   │
│                                                    │
│  FILTER TABS                                                   │
│  ┌──────────┬──────────┬──────────┬──────────┐              │
│  │   All    │  Unread  │Applications│ System  │              │
│  │   (24)   │   (5)    │   (12)    │   (7)   │              │
│  └──────────┴──────────┴──────────┴──────────┘              │
│                                                    │
│  TODAY SECTION                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ ● Application status update — Acme Corp               │  │
│  │   Your application moved to "Interview" stage          │  │
│  │   2h ago                                    [View]    │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │ ● AI Insight: New matching job found                  │  │
│  │   Senior React role at TechCorp matches your profile  │  │
│  │   4h ago                           [View] [Dismiss]   │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                    │
│  YESTERDAY SECTION                                           │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ ○ CV Analysis complete — Score: 86/100                │  │
│  │   Your CV analysis is ready for review                 │  │
│  │   1d ago                                     [View]    │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                    │
│  THIS WEEK SECTION (if items exist)                        │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ ○ Weekly digest: 3 applications active                │  │
│  │   Summary of your week in career progress              │  │
│  │   3d ago                                     [View]    │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 1. Filter Tabs

| Property | Value |
|----------|-------|
| Height | 44px |
| Active | Primary-600 text + bottom border |
| Tab padding | Space-3 (8px) Space-4 (12px) |

### Tabs: All, Unread (5), Applications (12), System (7), Archived

---

## 2. Notification Groups (Time-based)

| Group | Label |
|-------|-------|
| Today | "Today" — Label, Text-Secondary |
| Yesterday | "Yesterday" |
| This Week | "This Week" |
| Earlier | "Earlier" |
| Spacing between groups | Space-5 (16px) |

---

## 3. Notification Item

| Property | Value |
|----------|-------|
| Padding | Space-5 (16px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | Border-Default |
| Min height | 64px |
| Unread bg | Primary-50 background (instead of Surface-1) |
| Hover | Surface-2 |

### Elements:
| Element | Details |
|---------|---------|
| Unread dot | 8px circle, Primary-500, left edge (unread only) |
| Icon | 20px, type-specific (Application: File, AI: Sparkle, System: Bell) |
| Title | Body, 600 weight (unread) or 400 weight (read) |
| Description | Body-Small, Text-Secondary, 1-2 lines |
| Timestamp | Caption, Text-Secondary |
| Actions | [View] [Dismiss] [Snooze] — links |

### Notification Types:
| Type | Icon | Color |
|------|------|-------|
| Application status | File | Primary-500 |
| AI insight | Sparkle | Primary-500 |
| CV analysis | Document | Success-500 |
| Interview reminder | Calendar | Warning-500 |
| Offer received | Gift | Success-500 |
| System | Bell | Neutral-500 |
| Message | Message | Primary-500 |

---

## 4. Empty State

| Element | Specification |
|---------|---------------|
| Illustration | Bell/notification illustration, 120px |
| Title | "All caught up!" |
| Description | "You have no unread notifications" (unread tab) or "No notifications yet" (all tab) |

---

## 5. Loading State

| State | Behavior |
|-------|----------|
| List loading | 5 skeleton items (64px h, shimmer, with dot placeholder) |

---

## 6. Error State

| Error | Behavior |
|-------|----------|
| Load fail | Cached list with "Could not refresh" banner |
| Action fail | Toast: "Could not [action]" |

---

## 7. AI Integration

| Feature | Behavior |
|---------|----------|
| Smart batching | AI groups related notifications |
| Digest generation | Weekly AI summary of activity |
| Priority sorting | AI moves urgent notifications to top |
| Snooze suggestions | AI suggests optimal notification timing |

---

## 8. Accessibility

| Element | Requirement |
|---------|-------------|
| Item | `role="listitem"`, `aria-label="[type] notification: [title]"` |
| Unread status | Text + dot: "Unread: Application status update" |
| Actions | `aria-label` per action button |
| Live region | New notifications announced via `aria-live="polite"` |

---

## 9. Future Expansion

| Feature | Phase |
|---------|-------|
| Push notification configuration | Phase 2 |
| Custom notification rules | Phase 4 |
| Email digest preferences | Phase 2 |
| Notification scheduling (quiet hours) | Phase 3 |

---

*Cross-references: DP-6:Screen, DP-6:Nav, DP-1:All*
