# Career Progress — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Screen:** Career Progress — Timeline, Goals, Skill Map
**Version:** 1.0
**Status:** COMPLETE
**Design Authority:** DP-0 through DP-8
**Inherits:** Constitution, Design Language, Design System, Component Library, Application Shell, Visual Foundation, UX Architecture, High-Fidelity Wireframes, Interaction & Motion

---

## 1. Layout Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        TOPBAR (56px)                             │
│  Glass layer (0.85 opacity, 12px blur)                          │
│  [Logo 24px] [Search] [Breadcrumb] [Icons] [Avatar 32px]        │
├──────────┬───────────────────────────────────────────────────────┤
│          │                                                       │
│ SIDEBAR  │              CONTENT AREA (scrollable)               │
│ (240px)  │                                                       │
│          │  ┌─ PAGE HEADER ────────────────────────────────────┐ │
│ Surface-2│  │ Heading-2: "Career Progress"     [Edit Goals]   │ │
│          │  │ Body: "Track your career milestones and growth"  │ │
│ Nav items│  └──────────────────────────────────────────────────┘ │
│ (14px    │                                                       │
│  400/    │  ┌─ [Goal Card 1] ──┐ ┌─ [Goal Card 2] ──┐ ┌─ [GC3]┐ │
│  600)    │  │ H4 "Senior Title"│ │ H4 "Leadership"  │ │ ...  │ │
│          │  │ ▓▓▓▓▓░░░░ 65%   │ │ ▓▓░░░░░░ 25%    │ │       │ │
│ Active   │  │ 3/5 milestones   │ │ 1/4 milestones  │ │       │ │
│ indicator│  │ Target: Dec 2026 │ │ Target: Jun 2027│ │       │ │
│ ───────  │  │ [Edit icon]      │ │ [Edit icon]     │ │       │ │
│          │  └──────────────────┘ └──────────────────┘ └───────┘ │
│          │                                                       │
│          │  ┌─ CAREER TIMELINE ────────────────────────────────┐ │
│          │  │ Surface-1 card, radius-md, padding Space-5       │ │
│          │  │                                                   │ │
│          │  │ Heading-3 "2026" (Primary-600)                   │ │
│          │  │                                                   │ │
│          │  │ ● [dot filled] H4 "Senior Frontend Engineer"     │ │
│          │  │ │               Body-Small "Cruise - Mar 2026"  │ │
│          │  │ │               ✓ Led 12-person team             │ │
│          │  │ │               ✓ Shipped 3 major features       │ │
│          │  │ │               ○ Upcoming: Promotion review     │ │
│          │  │                                                   │ │
│          │  │ 2px Primary-200 vertical connector               │ │
│          │  │                                                   │ │
│          │  │ ○ [dot outline] H4 "Staff Engineer"              │ │
│          │  │ │               Body-Small "Target: 2027"       │ │
│          │  │ │               ○ Complete system design cert    │ │
│          │  │ │               ○ Lead 20+ engineers            │ │
│          │  │                                                   │ │
│          │  │ Heading-3 "2027" (Primary-600)                   │ │
│          │  │                                                   │ │
│          │  │ ⬡ [dashed] H4 "Engineering Director"            │ │
│          │  │               Body-Small "Target: 2028"         │ │
│          │  │               ⬡ Executive presence training      │ │
│          │  └───────────────────────────────────────────────────┘ │
│          │                                                       │
│          │  ┌─ SKILL MAP ──────────────────────────────────────┐ │
│          │  │ Surface-1 card, radius-md, height 320px          │ │
│          │  │                                                   │ │
│          │  │          Technical (80)                           │ │
│          │  │             ╱╲                                    │ │
│          │  │            ╱  ╲                                   │ │
│          │  │  Problem   ╱    ╲  Leadership (60)                │ │
│          │  │  Solving  ╱  ▓▓  ╲                               │ │
│          │  │   (90)   ╱  ▓▓▓▓  ╲                              │ │
│          │  │         ╱   ▓▓▓▓   ╲                             │ │
│          │  │        ╱    ▓▓▓▓    ╲                            │ │
│          │  │       ╱     ▓▓▓▓     ╲                           │ │
│          │  │      ╱______▓▓▓▓______╲                          │ │
│          │  │  Strategy     ▓▓▓▓    Communication              │ │
│          │  │   (50)        ▓▓▓▓     (75)                      │ │
│          │  │               ▓▓▓▓                                │ │
│          │  │ Legend: ▓ Current (Primary-500 fill 20%          │ │
│          │  │         - - Target (Primary-600 dashed)          │ │
│          │  └───────────────────────────────────────────────────┘ │
│          │                                                       │
│          │  [⚡ AI Insight Bar] — bottom of content              │ │
│          │                                                       │ │
├──────────┴───────────────────────────────────────────────────────┤
│                       FOOTER (optional)                          │
└──────────────────────────────────────────────────────────────────┘
```

### 1.1 Layout Tokens

| Element | Token | Value |
|---------|-------|-------|
| Sidebar width | — | 240px |
| Sidebar background | Surface-2 | Neutral-100 |
| Topbar height | — | 56px |
| Topbar background | Glass-Navigation | rgba(255,255,255,0.72), blur 12px |
| Topbar border-bottom | Border-Default | Neutral-300 |
| Content max width | — | 1024px (centered) |
| Content padding | Space-8 | 32px horizontal |
| Content gap vertical | Space-10 | 48px between sections |
| Card gap horizontal | Space-5 | 16px between goal cards |
| Goal card width | — | 1fr (min 240px) |
| Timeline card padding | Space-5 | 16px |
| Timeline card max-width | — | 100% |
| Skill map height | — | 320px |

### 1.2 Elevation Map

| Layer | Element | Shadow Token |
|-------|---------|-------------|
| 0 | Page content area | Shadow-0 |
| 0 | Sidebar | Shadow-0 |
| 1 | Topbar (glass) | Shadow-1 |
| 1 | Goal cards (default) | Shadow-1 |
| 2 | Goal cards (hover) | Shadow-2 |
| 1 | Timeline card | Shadow-1 |
| 1 | Skill map card | Shadow-1 |
| 3 | AI Insight Bar | Shadow-3 |
| 5 | Modal overlays | Shadow-5 |

---

## 2. Section Walkthrough

### 2.1 Page Header

```
┌──────────────────────────────────────────────────────────────────┐
│ Heading-2: "Career Progress"                        [Edit Goals] │
│ Body: "Track your career milestones and skill growth"           │
│────────────────────────────────────────────────────────────────  │
│ Padding bottom: Space-5 (16px)                                   │
└──────────────────────────────────────────────────────────────────┘
```

**Element Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Page title | Heading-2 | 28px, weight 650, line-height 1.2, Text-Primary |
| Page description | Body | 15px, weight 400, line-height 1.6, Text-Secondary |
| Edit Goals button | Button-Primary | 14px, 36px height, radius-md, Primary-600 bg, white text |
| Container | — | Flex row, justify-content space-between, align-items flex-start |

**Purpose:** Introduce page. **Priority:** High — first visual anchor. **Weight:** Moderate.

**States:**

| State | Behavior |
|-------|----------|
| Default | Title + description + Edit Goals button visible |
| No goals | "Career Progress" title remains. Description: "Set your first career goal to start tracking" |
| Edit mode | Button text changes to "Done Editing". Background shifts to Primary-50. |

### 2.2 Goal Progress Cards

```
┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────┐
│ ┌─────────────────────┐ │ │ ┌─────────────────────┐ │ │ ┌─────────┐  │
│ │ H4 "Senior Engineer"│ │ │ │ H4 "Leadership Role"│ │ │ │ H4      │  │
│ │                     │ │ │ │                     │ │ │ │ "Mentor"│  │
│ │ ▓▓▓▓▓░░░░░░ 65%    │ │ │ │ ▓▓░░░░░░░░ 25%     │ │ │ │ ▓░░░░░  │  │
│ │ 8px height bar      │ │ │ │ 8px height bar      │ │ │ │ 15%    │  │
│ │                     │ │ │ │                     │ │ │ │         │  │
│ │ 3/5 milestones      │ │ │ │ 1/4 milestones      │ │ │ │ 1/6     │  │
│ │ Target: Dec 2026    │ │ │ │ Target: Jun 2027   │ │ │ │ milestones│ │
│ │                     │ │ │ │                     │ │ │ │ Target:  │  │
│ │ [Edit icon] top-right│ │ │ │ [Edit icon]         │ │ │ │ Mar 2028│  │
│ └─────────────────────┘ │ │ └─────────────────────┘ │ │ └─────────┘  │
│ Surface-1, radius-md    │ │ Surface-1, radius-md    │ │ Surface-1    │
│ Shadow-1, padding S-5   │ │ Shadow-1, padding S-5   │ │ Shadow-1     │
└─────────────────────────┘ └─────────────────────────┘ └─────────────┘
```

**Element Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Card background | Surface-1 | #FFFFFF |
| Card radius | Radius-Md | 8px |
| Card padding | Space-5 | 16px |
| Card shadow | Shadow-1 | Layer 1 |
| Card gap | Space-5 | 16px |
| Card min-width | — | 240px |
| Card flex | — | 1fr |
| Goal heading | Heading-4 | 18px, weight 600, line-height 1.3, Text-Primary |
| Progress bar height | — | 8px |
| Progress bar radius | Radius-Sm | 4px |
| Progress bar track | Neutral-200 | #E2E8F0 |
| Progress bar fill | Primary-500 | #3B82F6 |
| Progress percentage | Body | 15px, weight 600, Primary-600 |
| Milestone count | Caption | 13px, weight 400, Text-Secondary |
| Target date | Caption | 13px, weight 400, Text-Secondary |
| Edit icon | — | 20px × 20px, Neutral-400, hover Primary-500 |
| Edit icon position | — | Absolute, top: Space-3 (8px), right: Space-3 |

**Purpose:** Quick goal status overview. **Priority:** High — primary engagement. **Weight:** High — colored progress bars draw eye.

**States:**

| State | Behavior |
|-------|----------|
| Default | Shows goal name, progress bar, count, target date |
| Hover (card) | Shadow-2, slight -1px translateY, 200ms ease-out |
| Hover (edit icon) | Color shifts Neutral-400 → Primary-500 |
| Progress 100% | Fill color shifts Primary-500 → Success-500. Check icon appears next to percentage. Confetti micro-animation. |
| Overdue target date | Date text shifts to Danger-500. Warning icon (12px) prepended. |
| Loading | Skeleton: 240px × 120px per card, pulse 1500ms |
| Empty (no goals) | See Section 3 |
| Error per card | Card shows ⚠ "Unable to load goal" with [Retry] inline |

### 2.3 Career Timeline

```
┌──────────────────────────────────────────────────────────────────┐
│                    CAREER TIMELINE                                │
│ Surface-1 card, radius-md, border Neutral-300, padding Space-5   │
│                                                                  │
│  Heading-3 "2026" (Primary-600)                                 │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  ● (16px dot, Primary filled, white check)                │  │
│  │  │                                                         │  │
│  │  H4 "Senior Frontend Engineer"                             │  │
│  │  Body-Small "Cruise — Mar 2026"                            │  │
│  │                                                             │  │
│  │  ✓ Led 12-person frontend team                             │  │
│  │  ✓ Shipped 3 major features                                │  │
│  │  ✓ Established design system                               │  │
│  │  ○ Upcoming: Promotion review cycle                        │  │
│  │                                                             │  │
│  │  2px Primary-200 vertical connector                        │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  ○ (16px dot, Primary outline)                             │  │
│  │  │                                                         │  │
│  │  H4 "Staff Engineer"                                       │  │
│  │  Body-Small "Target: 2027"                                 │  │
│  │                                                             │  │
│  │  ○ Complete system design certification                    │  │
│  │  ○ Lead organization of 20+ engineers                      │  │
│  │  ○ Drive technical roadmap                                 │  │
│  │                                                             │  │
│  │  2px Primary-200 vertical connector                        │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Heading-3 "2027" (Primary-600)                                 │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  ⬡ (16px dot, dashed Neutral-300)                         │  │
│  │                                                             │  │
│  │  H4 "Engineering Director"                                 │  │
│  │  Body-Small "Target: 2028"                                 │  │
│  │                                                             │  │
│  │  ⬡ Executive presence training                             │  │
│  │  ⬡ Board-level presentation skills                         │  │
│  │                                                             │  │
│  │  (no connector after last item)                             │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  [+ Add Milestone] — ghost button at bottom                     │
└──────────────────────────────────────────────────────────────────┘
```

**Element Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Card background | Surface-1 | #FFFFFF |
| Card border | Border-Default | 1px Neutral-300 |
| Card radius | Radius-Md | 8px |
| Card padding | Space-5 | 16px |
| Card shadow | Shadow-1 | Layer 1 |
| Year heading | Heading-3 | 22px, weight 600, line-height 1.25, Primary-600 |
| Year heading margin | Space-5 | 16px top, Space-3 bottom |
| Timeline item padding | Space-4 | 12px left (for dot), Space-3 vertical |
| Timeline dot size | — | 16px × 16px |
| Timeline dot completed | — | Primary-500 fill, white check (10px) centered |
| Timeline dot current | — | Primary-500 outline 2px, transparent center |
| Timeline dot future | — | Neutral-300 dashed border 2px (border-style dashed), transparent center |
| Vertical connector | — | 2px width, Primary-200, left-aligned with dot center |
| Item label | Heading-4 | 18px, weight 600, line-height 1.3, Text-Primary |
| Item description | Body-Small | 14px, weight 400, line-height 1.5, Text-Secondary |
| Milestone list item | Body-Small | 14px, weight 400, line-height 1.5, Text-Body |
| Completed milestone | — | ✓ check icon (12px), Success-500 |
| Incomplete milestone | — | ○ circle icon (12px), Neutral-400 |
| Add Milestone button | Ghost | 14px, 32px height, Primary-600 text |

**Purpose:** Visual career journey with past/present/future states. **Priority:** High. **Weight:** High — largest section, color-coded dots create strong visual rhythm.

**States:**

| State | Behavior |
|-------|----------|
| Default | Full timeline with year groups, dots, labels, milestones |
| Hover (item) | Background shifts to Surface-2, radius-sm, 100ms ease-out |
| Hover (dot completed) | Scale 1.15, 100ms ease-out |
| Hover (add milestone) | Primary-100 bg, cursor pointer |
| Loading | Skeleton: 3 timeline rows, each 80px height, pulse 1500ms |
| Empty (no timeline) | See Section 3 |
| Editing milestone | Inline text input replaces label + description. Save/Cancel buttons appear. |

### 2.4 Skill Map / Radar Chart

```
┌──────────────────────────────────────────────────────────────────┐
│                    SKILL MAP (320px height)                      │
│ Surface-1 card, radius-md                                        │
│                                                                  │
│               Technical (80)                                     │
│                  ╱╲                                              │
│                 ╱  ╲                                             │
│     Problem     ╱    ╲     Leadership (60)                       │
│     Solving    ╱  ▓▓  ╲                                          │
│      (90)     ╱  ▓▓▓▓  ╲                                         │
│              ╱   ▓▓▓▓   ╲                                        │
│             ╱    ▓▓▓▓    ╲                                       │
│            ╱     ▓▓▓▓     ╲                                      │
│           ╱______▓▓▓▓______╲                                     │
│  Strategy  ▓▓▓▓             Communication                         │
│   (50)     ▓▓▓▓              (75)                                 │
│            ▓▓▓▓                                                   │
│                                                                  │
│  Legend:                                                         │
│  ┌────────────┐  ┌──────────────────┐                           │
│  │ ▓▓ Current │  │ - - Target       │                           │
│  │ Primary-500│  │ Primary-600      │                           │
│  │ fill 20%   │  │ dashed line      │                           │
│  └────────────┘  └──────────────────┘                           │
│                                                                  │
│  5 axes: Technical, Leadership, Communication, Strategy,         │
│  Problem-Solving. Values 0-100.                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Element Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Card background | Surface-1 | #FFFFFF |
| Card radius | Radius-Md | 8px |
| Card height | — | 320px |
| Card shadow | Shadow-1 | Layer 1 |
| Chart height | — | 260px (within card, after label) |
| Axis label | Caption | 13px, weight 500, Text-Primary |
| Axis value | Caption | 13px, weight 600, Text-Secondary |
| Current level fill | Primary-500 | #3B82F6, opacity 20% |
| Current level line | Primary-500 | #3B82F6, 2px stroke |
| Target level line | Primary-600 | #2563EB, 2px dashed |
| Legend dot current | — | 8px circle, Primary-500 |
| Legend dot target | — | 8px circle, Primary-600, dashed border |
| Legend text | Caption | 13px, weight 400, Text-Secondary |

**Purpose:** Visual skill self-assessment vs. target. **Priority:** Medium. **Weight:** Moderate — secondary content below timeline.

**States:**

| State | Behavior |
|-------|----------|
| Default | 5-axis radar with current + target overlay |
| Loading | Skeleton circle (260px), pulse 1500ms |
| Empty (no skills assessed) | Radar shows only axis labels (all 0). "Take skill assessment" CTA button below chart |
| Hover axis label | Axis label shifts to Primary-600, tooltip shows value + gap to target |
| Hover legend item | Corresponding chart line highlights (increased opacity/stroke width) |

### 2.5 AI Insight Bar

```
┌──────────────────────────────────────────────────────────────────┐
│ [⚡] "Based on your activity: You're on track for Senior role by │
│  Dec 2026. Consider adding a Leadership milestone."  [Dismiss]   │
│ Primary-50 bg, padding Space-4, radius-sm                         │
│ Position: Between timeline and skill map, full width              │
└──────────────────────────────────────────────────────────────────┘
```

**Element Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Background | Primary-50 | #EFF6FF |
| Padding | Space-4 | 12px vertical, Space-5 horizontal |
| Radius | Radius-Sm | 4px |
| Sparkle icon | — | 16px × 16px, Primary-500 |
| Text | Body-Small | 14px, weight 400, line-height 1.5, Text-Body |
| Dismiss | — | 16px icon, Neutral-400, hover Neutral-600 |

**States:**

| State | Behavior |
|-------|----------|
| Default | Shows most relevant AI insight |
| Dismissed | Slides up (200ms ease-in), stored in localStorage |
| Loading | Skeleton: full width × 32px, pulse |
| No insight | Hidden entirely |
| Multiple insights | Rotates every 30s (cross-fade 200ms) |

---

## 3. Empty State (New User — No Goals or Timeline)

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                                                             │  │
│  │              🎯 (Target icon, 80px)                        │  │
│  │              Neutral-200, opacity 60%                       │  │
│  │                                                             │  │
│  │  Heading-2: "Set your first career goal"                    │  │
│  │  Body: "Define where you want to be in 1, 3, or 5 years.   │  │
│  │  We'll help you build a plan to get there."                 │  │
│  │                                                             │  │
│  │  [Set a Goal]  [Explore Templates]                          │  │
│  │  Primary-600 button    Ghost button                         │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─ EMPTY TIMELINE ───────────────────────────────────────────┐  │
│  │                                                             │  │
│  │  Heading-4: "Add past experience"                           │  │
│  │  Body: "Import your work history from your CV to build      │  │
│  │  your career timeline."                                     │  │
│  │                                                             │  │
│  │  [Import from CV]  [Add Manually]                           │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─ EMPTY SKILL MAP ──────────────────────────────────────────┐  │
│  │                                                             │  │
│  │  Heading-4: "Add skills to see your radar"                  │  │
│  │  Body: "Rate your current skills and set target levels.     │  │
│  │  We'll suggest areas to focus."                              │  │
│  │                                                             │  │
│  │  [Take Skill Assessment]  [Add Skills Manually]             │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Empty state specs:**

| Element | Token | Value |
|---------|-------|-------|
| Empty icon | — | 80px × 80px, Neutral-200, 60% opacity (SVG) |
| Empty heading | Heading-2 | 28px, weight 650, Text-Primary |
| Empty body | Body | 15px, weight 400, Text-Secondary, max-width 480px centered |
| CTA button | Button-Primary | 14px, 36px height, radius-md, Primary-600 |
| Ghost button | Button-Ghost | 14px, 36px height, Primary-600 text |
| Empty card gap | Space-10 | 48px between empty sections |

---

## 4. Loading State

```
┌──────────────────────────────────────────────────────────────────┐
│  PAGE HEADER SKELETON: Two lines (200px + 120px), 16px height   │
│                                                                  │
│  GOAL CARDS: 3 skeletons, 240px × 120px each, gap Space-5       │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │
│  │ ▓▓▓▓▓▓▓▓▓▓  │ │ ▓▓▓▓▓▓▓▓▓▓  │ │ ▓▓▓▓▓▓▓▓▓▓  │             │
│  │ ▓▓▓▓         │ │ ▓▓▓▓         │ │ ▓▓▓▓         │             │
│  │ ▓▓           │ │ ▓▓           │ │ ▓▓           │             │
│  └──────────────┘ └──────────────┘ └──────────────┘             │
│                                                                  │
│  TIMELINE SKELETON: 3 rows, each 80px height                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ ● ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓        │  │
│  │ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                          │  │
│  │ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                           │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  SKILL MAP SKELETON: 260px circle skeleton                      │
│                                                                  │
│  Skeleton spec: Surface-2 bg, radius-md, opacity 0.5 base,       │
│  0.8 peak, pulse 1500ms ease-in-out                             │
│                                                                  │
│  Sequence: Header (0ms) → Goals (100ms) → Timeline (200ms)      │
│  → Skill Map (300ms)                                            │
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. Error State

```
┌──────────────────────────────────────────────────────────────────┐
│  INLINE ERROR PER SECTION:                                       │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  GOAL CARDS ERROR                                           │  │
│  │  ⚠ "Unable to load goals"                                  │  │
│  │  [Retry]  [Dismiss]                                        │  │
│  │  Warning-50 bg, Warning-500 left border 3px, radius-md     │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  TIMELINE ERROR                                             │  │
│  │  ⚠ "Timeline unavailable. Your data is safe."              │  │
│  │  [Retry]                                                    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  SKILL MAP ERROR                                            │  │
│  │  ⚠ "Unable to load skill data"                             │  │
│  │  [Retry]                                                    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Per-section granularity. Each section retains its dimensions    │
│  to prevent layout shift.                                        │
│                                                                  │
│  Full-page error (rare): centered error card with app logo +     │
│  "Something went wrong" + [Retry] + [Contact Support]            │
└──────────────────────────────────────────────────────────────────┘
```

---

## 6. Offline State

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  OFFLINE BANNER (below topbar, above content):             │  │
│  │  📡 "You're offline. Showing cached data from [time]."    │  │
│  │  Surface-2 bg, Warning-500 left border (3px)               │  │
│  │  Caption text. Auto-dismisses on reconnect.                │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Section behavior:                                               │
│  - Goal cards: show last cached progress with "(cached)" tag    │
│  - Timeline: fully visible from cache, edit disabled            │
│  - Skill map: cached data, interaction disabled                  │
│  - AI Insight Bar: hidden (requires connectivity)               │
│  - Edit/Add buttons disabled: tooltip "Available when online"   │
│  - Offline indicator in topbar (icon only, 20px)                │
└──────────────────────────────────────────────────────────────────┘
```

---

## 7. Visual Hierarchy

```
Priority 1 (Highest) ─────────────────────────────────────► Goal Progress Cards
                           (progress bars = strongest color on page)

Priority 2 ──────────────────────────────────────────────► Career Timeline
                           (dot system + color-coded year headers)

Priority 3 ──────────────────────────────────────────────► Skill Map / Radar
                           (visual chart, secondary focus)

Priority 4 ──────────────────────────────────────────────► AI Insight Bar
                           (subtle tint, supplemental insight)

Priority 5 ──────────────────────────────────────────────► Page Header + Navigation
                           (structural, not content-driven)
```

**Hierarchy mechanisms:**
- Goal progress bars use Primary-500 fill (highest color saturation on page)
- Timeline dots use filled/outline/dashed system for visual state differentiation
- Year headings use Primary-600 (brand color) for strong section separation
- Skill map uses lower opacity fill (20%) to stay visually secondary
- AI Insight Bar uses Primary-50 tint — visible but not competing

---

## 8. Motion Specifications

| Element | Trigger | Animation | Duration | Easing | Delay |
|---------|---------|-----------|----------|--------|-------|
| Page header | Page load | Fade in + slide down 8px | 300ms | Ease-Out | 0ms |
| Goal cards | Page load | Staggered slide up 12px + fade | 400ms | Ease-Out | 100ms (80ms stagger) |
| Progress bar fill | Page load | Width animate 0 → target | 800ms | Ease-Out | 400ms |
| Timeline items | Page load | Staggered slide up 8px + fade | 300ms | Ease-Out | 200ms (100ms stagger) |
| Timeline dot (completed) | Page load | Scale 0 → 1, bounce | 400ms | Ease-Spring | 300ms per item |
| Skill map | Page load | Fade in + scale 0.95 → 1 | 500ms | Ease-Out | 400ms |
| Chart fill animate | Page load | Polygon points animate 0 → target | 800ms | Ease-Out | 500ms |
| AI Insight Bar | Page load | Slide down 8px + fade | 300ms | Ease-Out | 600ms |
| Card hover | Mouse enter | Shadow shift to Shadow-2, -1px Y | 200ms | Ease-Out | 0ms |
| Goal progress update | Data change | Bar width transition | 500ms | Ease-Out | 0ms |
| Dot completed anim | Status change | Check icon scale 0 → 1 | 200ms | Ease-Spring | 0ms |
| Timeline item add | User action | Slide down + fade in | 300ms | Ease-Out | 0ms |
| Timeline item delete | User action | Slide up + fade out | 200ms | Ease-In | 0ms |
| Empty → data transition | First goal set | Section cross-fade | 300ms | Ease-Out | 0ms |
| AI Insight dismiss | Click | Slide up + fade out | 200ms | Ease-In | 0ms |
| Skeleton pulse | Loading | Opacity 0.5 → 0.8 → 0.5 | 1500ms loop | Ease-In-Out | Staggered |

**Stagger table (page load):**

| Element | Delay |
|---------|-------|
| Page header | 0ms |
| Goal card 1 | 100ms |
| Goal card 2 | 180ms |
| Goal card 3 | 260ms |
| Progress bar fill | 400ms |
| Timeline year 2026 | 200ms |
| Timeline item 1 | 300ms |
| Timeline item 2 | 400ms |
| Timeline year 2027 | 500ms |
| Timeline item 3 | 600ms |
| Skill map card | 400ms |
| Skill chart animate | 500ms |
| AI Insight Bar | 600ms |

---

## 9. Accessibility

| Requirement | Implementation |
|-------------|---------------|
| Page landmark | `role="region"` with `aria-label="Career progress page"` |
| Goal cards | `role="region"` per card, `aria-labelledby` pointing to goal heading |
| Progress bars | `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-label` including goal name |
| Timeline | `role="list"` with `aria-label="Career timeline"` |
| Timeline items | `role="listitem"`, `aria-label` including role, company, year |
| Timeline dots | `aria-label` per dot: "Completed: Senior Frontend Engineer", "Current target: Staff Engineer", "Future goal: Engineering Director" |
| Skill map | `role="img"` with `aria-label="Skill radar chart showing 5 axes"` |
| Chart data | Hidden table alternative for screen readers with axis, current, target values |
| AI Insight Bar | `aria-live="polite"` for dynamic content updates |
| Interactive elements | All buttons have `aria-label` if icon-only |
| Skip link | "Skip to content" link as first focusable element |
| Focus order | Topbar → Sidebar → Goal cards (LTR) → Timeline → Skill map → AI Insight |
| Focus indicator | 2px Primary-500 ring, 2px offset, radius-md |
| Keyboard navigation | Tab through sections, Enter/Space to activate, Arrow keys within scrollable areas |
| Reduced motion | `prefers-reduced-motion`: all animations reduced to 50ms instant |
| Color contrast | All text meets WCAG AA (4.5:1), body text meets AAA (7:1) |
| Error announcements | `aria-live="assertive"` for inline errors |

---

## 10. Keyboard Navigation

| Key | Context | Action |
|-----|---------|--------|
| Tab | Any | Navigate forward through all focusable elements |
| Shift+Tab | Any | Navigate backward |
| Enter/Space | Button/Link | Activate |
| Escape | Any | Close menu / dismiss error / cancel edit |
| Tab (goal card) | Goal section | Tab through goal cards, Enter to expand/edit |
| Arrow Right | Timeline | Move focus to next timeline item |
| Arrow Left | Timeline | Move focus to previous timeline item |
| Enter | Timeline item | Expand timeline item details |
| Tab (skill map) | Skill map | Tab into legend items, Enter to toggle view |
| / | Global | Focus global search |
| ? | Any | Show keyboard shortcuts modal |

**Focus Order:**
1. Topbar (Skip link → Logo → Search → Icons → Avatar)
2. Sidebar (Nav items top-to-bottom)
3. Page Header (Heading → Edit Goals button)
4. Goal Cards (Card 1 → Card 2 → Card 3)
5. Career Timeline (Year headings → Items → Add Milestone)
6. Skill Map (Chart → Legend → Assessment button)
7. AI Insight Bar (Text → Dismiss)

---

## 11. Responsive Behavior

### Mobile (<768px) — Single Column

| Element | Adaptation |
|---------|-----------|
| Sidebar | Hidden. Replaced by bottom tab bar (5 items, 56px height) |
| Topbar | Reduced: hamburger menu (24px) + title + notification bell |
| Content | Single column, padding Space-5 (16px) |
| Goal cards | Single column, full width |
| Timeline | Full width, reduced padding Space-4 |
| Skill map | Full width 320px height maintained |
| AI Insight Bar | Full width, dismiss always visible |
| Section order | AI Insight → Goal Cards → Timeline → Skill Map |

### Tablet (768px–1023px) — 2-Column

| Element | Adaptation |
|---------|-----------|
| Sidebar | Icon rail (64px collapsed), expand on tap to 240px overlay |
| Topbar | Full (search visible, icon-only nav items) |
| Content | 2-column goal cards (2 cards per row), padding Space-7 |
| Timeline | Full width |
| Skill map | Full width |
| AI Insight Bar | Full width, below skill map |
| Section order | Goal Cards → AI Insight → Timeline → Skill Map |

### Desktop (1024px+) — Full Layout

Full layout as specified above.

### Responsive Breakpoint Reference

| Property | Mobile | Tablet | Desktop | Ultra-Wide |
|----------|--------|--------|---------|------------|
| Sidebar | Bottom tabs | Icon rail (64px) | Full (240px) | Full (240px) |
| Goal card columns | 1 | 2 | 3 | 3 |
| Page padding | Space-5 | Space-7 | Space-8 | Space-10 |
| Card gap | Space-4 | Space-5 | Space-5 | Space-6 |
| Section gap | Space-7 | Space-8 | Space-10 | Space-10 |
| Skill map height | 260px | 300px | 320px | 360px |
| Typography scale | Mobile | Mobile | Desktop | Desktop |

---

## 12. AI Integration Features

| Feature | Behavior |
|---------|----------|
| Goal suggestions | AI analyzes CV + job market trends. Suggests 3 career goals with projected timelines. Rendered as chip cards below empty state. Each card: goal title + confidence % + [Add to My Goals] |
| Timeline gap detection | AI flags gaps > 6 months between timeline entries. Visual indicator: ⚡ badge on gap area + "Consider adding experience from this period" tooltip |
| Skill recommendations | AI compares current skill levels vs. target roles. Suggests 2-3 skills to develop. Shows as chips in skill map legend area with "+Add" action |
| Trend analysis | AI detects skill growth/decline over time. Shown as trend arrows (↑↓) next to each axis in radar chart. Positive trends in Success-500, negative in Warning-500 |
| AI Insight Bar | Real-time contextual suggestions based on user activity. Rotates through insights every 30s. Dismissible per session. |
| Smart milestone suggestions | AI reads job descriptions from saved jobs and suggests relevant milestones. Shows as "+ Add suggested milestone" below timeline |
| Career path projection | AI extrapolates current trajectory. Shows "On track for X by Y" in AI Insight Bar with confidence percentage |

---

## 13. Future Expansion Items

| Item | Priority | Notes |
|------|----------|-------|
| Goal templates library | Medium | Pre-built career paths: "Engineer → Staff → Principal", "IC → Manager → Director" |
| Skill assessment quiz | High | Interactive 5-minute assessment per skill area, auto-populates radar |
| Mentorship network | Low | Connect with mentors who've achieved similar goals |
| Company progression maps | Medium | Show typical promotion timelines at target companies |
| Goal sharing | Low | Share goal progress with mentor/manager with read-only link |
| Timeline auto-populate | Medium | Import from LinkedIn, CV parser, past applications |
| Skill benchmark comparison | Low | Compare your radar to anonymized peers at similar career stage |
| Achievement badges | Low | Milestone completion badges (3 levels: Bronze/Silver/Gold) |
| Goal dependency graph | Medium | Show how goals depend on each other (e.g., cert → promotion) |
| Salary projection | Low | AI estimates salary impact of each goal achievement |
| Recurring goal reviews | Medium | Quarterly "check-in" prompts to review and adjust goals |
| Public profile embed | Future | Embeddable career timeline widget for personal website/LinkedIn |

---

## 14. Token Reference Summary

### Color Tokens Used

| Token | Value (Light) | Elements |
|-------|---------------|----------|
| Surface-0 | Neutral-50 | Page area |
| Surface-1 | #FFFFFF | Timeline card, skill map card, goal cards |
| Surface-2 | Neutral-100 | Sidebar, skeleton |
| Primary-50 | #EFF6FF | AI Insight Bar |
| Primary-200 | #BFDBFE | Timeline vertical connector |
| Primary-500 | #3B82F6 | Progress bar fill, skill fill, completed dot |
| Primary-600 | #2563EB | Year headings, target line, edit button |
| Text-Primary | Neutral-900 | Headings, page title |
| Text-Body | Neutral-800 | Descriptions, milestone list items |
| Text-Secondary | Neutral-600 | Milestone count, target dates, labels |
| Text-Tertiary | Neutral-500 | Timestamps, placeholders |
| Border-Default | Neutral-300 | Card borders, dividers |
| Success-500 | #10B981 | Completed milestones, full progress |
| Warning-500 | #F59E0B | Overdue dates, errors |
| Danger-500 | #EF4444 | Critical alerts, delete actions |

### Typography Tokens Used

| Token | Size | Weight | Line Height | Elements |
|-------|------|--------|-------------|----------|
| Heading-2 | 28px | 650 | 1.2 | Page title, empty state heading |
| Heading-3 | 22px | 600 | 1.25 | Year group headings |
| Heading-4 | 18px | 600 | 1.3 | Goal card titles, timeline item labels |
| Body | 15px | 400 | 1.6 | Descriptions, empty state body |
| Body-Small | 14px | 400 | 1.5 | Timeline descriptions, milestone items |
| Caption | 13px | 400 | 1.4 | Milestone counts, target dates, legend labels |

### Spacing Tokens Used

| Token | Value | Usage |
|-------|-------|-------|
| Space-3 | 8px | Dot spacing, compact padding |
| Space-4 | 12px | Timeline item padding, AI Bar padding |
| Space-5 | 16px | Card padding, section gaps |
| Space-7 | 24px | Section vertical spacing |
| Space-8 | 32px | Page margins |
| Space-10 | 48px | Large section gaps |

### Elevation Tokens Used

| Token | Usage |
|-------|-------|
| Layer 0 | Page, sidebar |
| Layer 1 | Goal cards, timeline card, skill map card, topbar glass |
| Layer 2 | Card hover states |
| Layer 3 | AI Insight Bar |
| Layer 5 | Modal overlays |

---

*End of Career-Progress.md — Visual Prototype Specification for MR:EGO Design OS DP-9.*
