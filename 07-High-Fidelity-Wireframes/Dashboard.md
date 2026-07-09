# Dashboard — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:Screen (Dashboard), DP-6:IA (Dashboard Layout), DP-1:All

---

## Purpose

Daily command center showing summary, recommendations, tasks, and progress. The authenticated home page. Full sidebar, topbar, command palette accessible.

---

## Layout Overview

```
┌──────────┬────────────────────────────────────────────────────┐
│          │  TOPBAR (56px fixed, glass)                        │
│          │  Search Ctrl+K     Notif(3)  Avatar ▸             │
│ SIDEBAR  ├────────────────────────────────────────────────────┤
│ (240px)  │  CONTENT AREA (scrollable, padding Space-8)        │
│ EXPANDED │                                                    │
│          │  GREETING SECTION                                  │
│          │  "Good morning, Alex" + date + AI summary chip     │
│          │                                                    │
│          │  AI SUMMARY CARD                                   │
│          │  "Today's Priority: Interview prep at 2pm"         │
│          │                                                    │
│          │  STAT ROW (4 cards, equal width)                   │
│          │  ┌──────┐┌──────┐┌──────┐┌──────┐               │
│          │  │Apps  ││Views ││Saved ││Score │               │
│          │  └──────┘└──────┘└──────┘└──────┘               │
│          │                                                    │
│          │  WIDGET GRID (3-column)                            │
│          │  ┌───────────┐┌───────────┐┌───────────┐         │
│          │  │Rec Job 1  ││Rec Job 2  ││Tasks      │         │
│          │  ├───────────┤├───────────┤├───────────┤         │
│          │  │CV Score   ││Upcoming   ││Activity   │         │
│          │  │           ││Interviews ││Feed       │         │
│          │  ├───────────┤├───────────┤├───────────┤         │
│          │  │Career     ││Quick      ││AI Insight │         │
│          │  │Progress   ││Actions    ││           │         │
│          │  └───────────┘└───────────┘└───────────┘         │
│          │                                                    │
│          └────────────────────────────────────────────────────┘
├──────────┴────────────────────────────────────────────────────┤
│  [AI Assistant floating button — bottom right, 56px circle]   │
└───────────────────────────────────────────────────────────────┘
```

---

## 1. Greeting Section

| Property | Value |
|----------|-------|
| Position | Top of content area |
| Padding bottom | Space-7 (24px) |

### Elements:

**Greeting row:**
| Element | Type | Details |
|---------|------|---------|
| Greeting | Heading-2 (28px) | "Good morning, Alex" + wave emoji |
| Date | Body, Text-Secondary | "Tuesday, July 7" |
| AI chip | Button-Small, Primary-50 bg | "AI summary ready" with sparkle icon |
| Spacing | Flex, space-between | — |

---

## 2. AI Summary Card

| Property | Value |
|----------|-------|
| Background | Primary-50 tint, 1px Primary-200 border |
| Padding | Space-5 (16px) |
| Radius | radius-md (8px) |
| Margin bottom | Space-7 (24px) |

### Elements:
| Element | Type | Details |
|---------|------|---------|
| AI icon | 20px sparkle | Primary-500 |
| Title | Body, 600 weight | "Today's Priority" |
| Description | Body-Small | "You have an interview prep session at 2pm. Review the job details and your talking points." |
| Action | Text-Link | "View preparation materials ▸" |
| Dismiss | Icon button (X) | Top-right corner |

---

## 3. Stat Row

| Property | Value |
|----------|-------|
| Layout | 4 equal cards, gap Space-5 (16px) |
| Margin bottom | Space-7 (24px) |

### Each stat card:
| Property | Value |
|----------|-------|
| Width | 1fr |
| Padding | Space-5 (16px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | Border-Default |
| Icon | 24px, semantic color icon |
| Value | Heading-2 (28px), 650 weight |
| Label | Caption (13px), Text-Secondary |
| Trend | Optional: Body-Small green/red % change |

### Stat Cards:
| Card | Icon | Value | Label | Color |
|------|------|-------|-------|-------|
| Applications | File | 12 | Active applications | Primary-500 |
| Profile Views | Eye | 48 | Views this week | Success-500 |
| Saved Jobs | Bookmark | 8 | Saved positions | Primary-500 |
| CV Score | Document | 86 | Score | Primary-500 |

---

## 4. Widget Grid

| Property | Value |
|----------|-------|
| Layout | 3-column grid |
| Gap | Space-5 (16px) |
| Auto-rows | Min 200px (content determines) |

### Widget: Recommended Jobs

| Property | Value |
|----------|-------|
| Column span | 1 |
| Height | 320px |
| Padding | Space-5 (16px) |

**Content:**
| Element | Details |
|---------|---------|
| Header | "Recommended for you" + "View All" link |
| Job item (2) | Company logo (32x32), Title (Heading-4), Company (Caption), Match % badge (Body-Small, Primary-600) |
| Match badge | Primary-50 bg, Primary-600 text, 4px padding, radius-sm |
| Spacing per item | Space-4 (12px) bottom |

### Widget: Task List

| Property | Value |
|----------|-------|
| Column span | 1 |
| Height | 320px |

**Content:**
| Element | Details |
|---------|---------|
| Header | "Today's Tasks" + progress circle (3/7) |
| Progress circle | 36px, 3px stroke, Primary stroke |
| Task item (5 max) | Checkbox (16px) + Body text + Priority dot |
| Completed task | Strikethrough, Text-Secondary opacity 0.6 |
| "View all" | Link at bottom |

### Widget: CV Strength Score

| Property | Value |
|----------|-------|
| Column span | 1 |
| Height | 200px |

**Content:**
| Element | Details |
|---------|---------|
| Header | "CV Strength" |
| Score circle | 80px diameter, semi-circle gauge, Primary-500 fill to 86% |
| Score label | "86/100" — Heading-2 |
| Suggestion | Body-Small: "Add 2 more skills to reach 90+" |
| Link | "View full analysis ▸" |

### Widget: Upcoming Interviews

| Property | Value |
|----------|-------|
| Column span | 1 |
| Height | 200px |

**Content:**
| Element | Details |
|---------|---------|
| Header | "Upcoming" |
| Item (2-3) | Company + role (Heading-4), Date/time (Caption), "Prepare" link |
| Empty | "No upcoming interviews" + Body-Small |

### Widget: Activity Feed

| Property | Value |
|----------|-------|
| Column span | 1 |
| Height | 260px |

**Content:**
| Element | Details |
|---------|---------|
| Header | "Recent Activity" |
| Item (4) | Icon (16px) + text (Body-Small) + timestamp (Caption) |
| Icon per type | Application: File, View: Eye, Save: Bookmark |

### Widget: Career Progress

| Property | Value |
|----------|-------|
| Column span | 1 |
| Height | 260px |

**Content:**
| Element | Details |
|---------|---------|
| Header | "Career Goal Progress" + "Edit" |
| Goal bar (2) | Label + progress bar (4px h, rounded) + percentage |
| Bar fill | Primary-500 |
| Link | "View full timeline ▸" |

### Widget: Quick Actions

| Property | Value |
|----------|-------|
| Column span | 1 |
| Height | 200px |

**Content:**
| Element | Details |
|---------|---------|
| Header | "Quick Actions" |
| Action buttons (4) | 2x2 grid, 48px h, icon + label, Button-Secondary equivalent |
| Actions | "Search Jobs", "Upload CV", "Write Letter", "View Analytics" |

### Widget: AI Insight

| Property | Value |
|----------|-------|
| Column span | 1 |
| Height | 200px |
| Background | Primary-50 tint |

**Content:**
| Element | Details |
|---------|---------|
| AI icon | Sparkle, 20px |
| Insight text | Body-Small: "Your profile matches 3 new Senior Frontend roles. Want to see them?" |
| Actions | "View Jobs" + "Dismiss" + "Why?" link |

---

## 5. AI Assistant Floating Button

| Property | Value |
|----------|-------|
| Position | Fixed bottom-right, 32px from edge |
| Size | 56px x 56px |
| Radius | Full (28px) |
| Background | Primary-600 |
| Shadow | Shadow-3 |
| Icon | Sparkle/AI icon, 24px, white |
| Badge | Unread count (optional red dot) |
| Click action | Opens AI Chat Panel (right drawer, 400px) |
| z-index | Elevation-5 |

---

## 6. Empty State (New User)

| Property | Value |
|----------|-------|
| When | No applications, no CV, no activity |
| Layout | Welcome card replaces stat row |
| Illustration | 160px illustration |
| Title | "Welcome to MR:EGO" — Heading-2 |
| Description | "Start by uploading your CV or exploring jobs" |
| Actions | "Upload CV" + "Explore Jobs" (2 Primary buttons, side by side) |
| Widget grid | Shows only: Quick Actions, CV upload prompt, Job search prompt |

---

## 7. Loading State

| Phase | Skeleton | Timing |
|-------|----------|--------|
| 1. Greeting | Title bar (60% width) | <500ms |
| 2. AI card | Card rect with 3 text lines | <800ms |
| 3. Stat row | 4 card skeletons, equal width | <1s |
| 4. Widget grid | 6 widget skeletons (3-col) | <2s |
| AI content | Delayed load with shimmer | <3-5s |

### Skeleton Details:
| Element | Skeleton |
|---------|----------|
| Stat card | 3 lines: icon circle, title bar (40%), number bar (60%) |
| Widget | Header bar (50%), content lines (2-4 lines of varying width) |
| AI card | Tinted skeleton (lighter than standard) |

---

## 8. Error State

| Error | Behavior |
|-------|----------|
| Widget fails | That widget shows error state inline (not full page) |
| Full page fails | Error state with retry, sidebar/topbar still functional |
| Widget error | Icon + "Could not load" + "Retry" link |

---

## 9. Offline State

| Element | Behavior |
|---------|----------|
| Banner | "Working offline — showing cached data from [time]" |
| Widgets | Cached data shown, non-cached show offline state |
| AI | "AI unavailable offline" badge on floating button |
| Interactions | Read-only mode, no save operations |

---

## 10. Responsive Behavior

| Element | Mobile (<768px) | Tablet (768-1023px) | Desktop (1280px+) |
|---------|-----------------|---------------------|-------------------|
| Layout | Bottom tabs, single column | Icon rail, 2-col grid | Sidebar, 3-col grid |
| Stat row | 2x2 grid (4 cards) | 4 horizontal | 4 horizontal |
| Widgets | 1-column stack | 2 columns | 3 columns |
| Content padding | Space-5 (16px) | Space-7 (24px) | Space-8 (32px) |
| AI Summary | Full width | Full width | Full width |
| Floating AI | 48px circle | 56px circle | 56px circle |
| Greeting | Compact (no date) | Full | Full |

---

## 11. Accessibility

| Element | Requirement |
|---------|-------------|
| Landmarks | `<main>`, `<header>`, `<nav>`, `<section per widget>` with `aria-label` |
| Widgets | `aria-label="[Widget name] widget"` |
| Stat cards | `role="article"`, `aria-label="[value] [label]"` |
| AI summary | `aria-live="polite"` for content updates |
| Task checkboxes | `<input type="checkbox">` with `<label>` |
| Widget grid | Tab order: stat row → widgets left-to-right, top-to-bottom |
| Quick actions | `aria-label` matching visible text |
| Floating AI | `aria-label="Open AI Assistant"` |
| Focus management | Skip link: "Skip to dashboard content" |

---

## 12. Visual Hierarchy

1. **Primary Focus:** AI Summary Card — highest visual weight, blue tint
2. **Secondary Focus:** Stat row — large numbers draw scanning eye
3. **Tertiary Focus:** Widget grid — scanned left-to-right, top-to-bottom
4. **Supporting:** Greeting + floating AI

### Eye Movement:
```
Good morning → [glance right] AI chip
    ↓
AI Summary → [scan number] Stat row
    ↓
Left-to-right widget scan (3 columns)
    ↓
Floating AI button (peripheral)
```

---

## 13. AI Integration

| Feature | Location | Behavior |
|---------|----------|----------|
| Daily summary | AI Summary Card | Context-aware priority for the day |
| Job recommendations | Jobs widget | AI matches profile to recent listings |
| CV insights | CV widget | Real-time score and improvement suggestions |
| Task prioritization | Task widget | AI reorders by urgency and profile gaps |
| Insight card | Bottom-right widget | Contextual opportunities detected |
| Floating button | Bottom-right | Opens full AI conversation panel |
| Predictive analytics | Future | Career trajectory predictions |

---

## 14. Keyboard Navigation

| Key | Action |
|-----|--------|
| Ctrl+K | Command palette |
| Ctrl+I | Toggle AI panel |
| Tab | Greeting → AI card → Stat row → Widget grid → Sidebar → Topbar |
| F6 | Cycle through main regions (sidebar, content, topbar) |
| 1-4 | Quick navigate to stat cards (when focused on stat row) |

---

## 15. Future Expansion

| Feature | Phase |
|---------|-------|
| Customizable widget grid (drag to reorder) | Phase 2 |
| Predictive career timeline preview | Phase 4 |
| Weekly AI review summary | Phase 3 |
| Calendar integration widget | Phase 4 |
| Team/workspace collaboration widgets | Phase 6 |
| Advanced analytics panel | Phase 5 |

---

*Cross-references: DP-6:Screen (Dashboard), DP-6:IA, DP-6:Nav (Daily Dashboard), DP-1:All, DP-6:AI*
