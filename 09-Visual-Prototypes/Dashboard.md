# Dashboard — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Screen:** Dashboard — Daily Command Center
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
│          │  ┌─ GREETING ───────────────────────────────────────┐ │
│ Surface-2│  │ "Good morning, Alex" · Tue Jul 7 · [AI Chip]    │ │
│          │  └──────────────────────────────────────────────────┘ │
│ Nav items│  ┌─ AI SUMMARY ────────────────────────────────────┐ │
│ (14px    │  │ ⚡ Today's Priority: Apply to Lead Engineer     │ │
│  400/    │  │ at Cruise · [View Details →]              [×]  │ │
│  600)    │  └──────────────────────────────────────────────────┘ │
│          │                                                       │
│ Active   │  ┌─ [12] ──┐ ┌─ [48] ───┐ ┌─ [8] ────┐ ┌─ [86] ──┐ │
│ indicator│  │Apps     │ │Prof Views│ │Save Jobs │ │CV Score │ │
│ ───────  │  └─────────┘ └──────────┘ └──────────┘ └──────────┘ │
│          │                                                       │
│          │  ┌─ RECOMMENDED ─┐ ┌─ TASK LIST ──┐ ┌─ CV ───────┐ │
│          │  │ JOBS (320px)  │ │ (320px)      │ │ STRENGTH   │ │
│          │  │ Sr. Frontend  │ │ ☐ Update CV  │ │ (200px)    │ │
│          │  │ 92% match     │ │ ☐ Apply SDE  │ │ 86/100     │ │
│          │  │               │ │ ⬡ 4/8 done  │ │ [gauge]    │ │
│          │  ├───────────────┤ ├──────────────┤ ├────────────┤ │
│          │  │ UPCOMING      │ │ ACTIVITY     │ │ CAREER     │ │
│          │  │ INTERVIEWS    │ │ FEED         │ │ PROGRESS   │ │
│          │  │ (200px)       │ │ (260px)      │ │ (260px)    │ │
│          │  │ Today 3pm     │ │ John viewed  │ │ ▓▓▓░░ 70% │ │
│          │  │                │ │ your profile │ │ ▓░░░░ 30% │ │
│          │  ├───────────────┤ ├──────────────┤ ├────────────┤ │
│          │  │ QUICK ACTIONS │ │ AI INSIGHT   │ │            │ │
│          │  │ (200px)       │ │ (200px)      │ │            │ │
│          │  │ [✏️] [📄]     │ │ 💡 "Your CV  │ │            │ │
│          │  │ [🎯] [🤖]     │ │ ranks top    │ │            │ │
│          │  └───────────────┘ └──────────────┘ └────────────┘ │
│          │                                                       │
│          │                               [⚡ AI] ← fixed btn   │
│          │                                                       │
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
| Content max width | — | 1140px (centered) |
| Content padding | Space-8 | 32px horizontal |
| Content gap vertical | Space-10 | 48px between sections |
| Widget gap | Space-5 | 16px |
| Widget columns | — | 3 equal cols (1fr 1fr 1fr) |

### 1.2 Elevation Map

| Layer | Element | Shadow Token |
|-------|---------|-------------|
| 0 | Page content area | Shadow-0 |
| 0 | Sidebar | Shadow-0 |
| 1 | Topbar (glass) | Shadow-1 |
| 1 | Widget cards (default) | Shadow-1 |
| 2 | Widget cards (hover) | Shadow-2 |
| 3 | AI Floating Button | Shadow-3 |
| 5 | Modal overlays | Shadow-5 |

---

## 2. Section Walkthrough

### 2.1 Greeting Section

**Position:** Top of content area, first element below topbar.

```
┌──────────────────────────────────────────────────────────────────┐
│ Heading-2: "Good morning, Alex"                                  │
│ Body: "Tuesday, July 7, 2026"  ·  [AI Chip: "Optimized"]       │
│────────────────────────────────────────────────────────────────  │
│ Padding bottom: Space-7 (24px)                                   │
└──────────────────────────────────────────────────────────────────┘
```

**Element Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Greeting text | Heading-2 | 28px, weight 650, line-height 1.2, Text-Primary |
| Date text | Body | 15px, weight 400, line-height 1.6, Text-Secondary |
| AI Chip | Surface-2 + Primary-600 text | 13px Caption, radius-sm (4px), 6px padding x/y |
| Section padding bottom | Space-7 | 24px |
| Container | — | Flex, space-between, align center |

**States:**
- **Morning (5–12):** "Good morning, Alex"
- **Afternoon (12–17):** "Good afternoon, Alex"
- **Evening (17–5):** "Good evening, Alex"
- **New user (no name):** "Good morning" (no name displayed)
- **AI Chip variants:** "Optimized", "Synced", "New suggestions", hidden if offline

### 2.2 AI Summary Card

```
┌──────────────────────────────────────────────────────────────────┐
│ ⚡  [Primary-50 bg, Primary-200 border, radius-md]              │
│                                                                  │
│  Sparkle icon (20px)  Heading-4 "Today's Priority"         [×]  │
│  Body: "Your CV ranks in the top 10% for Lead Engineer at       │
│  Cruise. We recommend applying before Friday for priority        │
│  consideration."                                                 │
│                                                                  │
│  [ View Details → ]  (Text-Link, Primary-600)                    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Element Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Card background | Primary-50 | #EFF6FF |
| Card border | Primary-200 | #BFDBFE, 1px |
| Card radius | Radius-Md | 8px |
| Card shadow | Shadow-1 | Layer 1 |
| Card padding | Space-7 | 24px (all sides) |
| Sparkle icon | — | 20px × 20px, Primary-500 |
| Title | Heading-4 | 18px, weight 600, line-height 1.3, Text-Primary |
| Description | Body | 15px, weight 400, line-height 1.6, Text-Body |
| Action link | Text-Link | Primary-600, 15px Body, underline on hover |
| Dismiss button | — | 20px × 20px, Icon only, Neutral-400, hover Neutral-600 |
| Bottom margin after card | Space-7 | 24px |

**States:**

| State | Behavior |
|-------|----------|
| Default | Shows highest-priority AI recommendation |
| Dismissed | Slides up (200ms ease-out), stored in localStorage, shown again next day |
| Empty (new user) | Hidden entirely — first-time users see onboarding CTA instead |
| Loading | Skeleton: 100% width × 100px height, pulse 1500ms |
| Error | Falls back to "Unable to load recommendations. [Retry]" |
| Multiple priorities | Carousel dots (3 dots max), auto-rotate every 8s |

### 2.3 Stat Row

```
┌────────────────┬────────────────┬────────────────┬────────────────┐
│  ┌──────────┐  │  ┌──────────┐  │  ┌──────────┐  │  ┌──────────┐  │
│  │ 📋 12    │  │  │ 👁 48    │  │  │ 🔖 8     │  │  │ 📊 86    │  │
│  │Applications│  │Profl Views│  │  │Saved Jobs │  │  │ CV Score │  │
│  │ +3 today  │  │ +12 today │  │  │ +1 today  │  │  │ +2 pts   │  │
│  └──────────┘  │  └──────────┘  │  └──────────┘  │  └──────────┘  │
│  Icon 24px     │  Icon 24px     │  Icon 24px     │  Icon 24px     │
│  H2 "12"       │  H2 "48"       │  H2 "8"        │  H2 "86"       │
│  Caption label │  Caption label │  Caption label │  Caption label │
│  Trend tag     │  Trend tag     │  Trend tag     │  Trend tag     │
└────────────────┴────────────────┴────────────────┴────────────────┘
│  Typography: H2 value (28px/650), Caption label (13px/400)       │
│  Cards: Surface-1, radius-md, padding Space-5, shadow-1          │
│  Gap: Space-5 (16px) between cards                              │
│  Trend: Success-500 text, ↑ icon, Caption                        │
└──────────────────────────────────────────────────────────────────┘
```

**Element Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Card background | Surface-1 | #FFFFFF |
| Card radius | Radius-Md | 8px |
| Card padding | Space-5 | 16px |
| Card shadow | Shadow-1 | Layer 1 |
| Card gap | Space-5 | 16px |
| Card min-width | — | 180px (flex: 1) |
| Stat icon | — | 24px × 24px, Primary-500 |
| Stat value | Heading-2 | 28px, weight 650, line-height 1.2, Text-Primary |
| Stat label | Caption | 13px, weight 400, line-height 1.4, Text-Secondary |
| Trend indicator | Caption | 13px, weight 500, Success-500 (or Warning-500), ↑/↓ icon |
| Stat count animation | Duration-XXSlow | 800ms count-up, Ease-Out |

**Stat Definitions:**

| Stat | Icon | Default Value | Trend | Formatting |
|------|------|---------------|-------|------------|
| Applications | Briefcase (24px) | 12 | +3 today | Number, comma-separated for >999 |
| Profile Views | Eye (24px) | 48 | +12 today | Number |
| Saved Jobs | Bookmark (24px) | 8 | +1 today | Number |
| CV Score | Gauge (24px) | 86 | +2 pts | Number 0–100, color-coded |

**CV Score Color Coding:**

| Range | Color Token | Visual |
|-------|-------------|--------|
| 0–49 | Danger-500 | Red text + icon |
| 50–74 | Warning-500 | Amber text + icon |
| 75–89 | Primary-500 | Blue text + icon |
| 90–100 | Success-500 | Green text + icon |

**States:**

| State | Behavior |
|-------|----------|
| Empty | All stats show "—" instead of 0. Icon retains color. Label dimmed to Text-Tertiary. |
| Loading | Skeleton: 80px × 80px per card, rounded-md, pulse 1500ms loop |
| Error per stat | Single card shows "—" with error tooltip on icon hover. Other stats remain. |
| Offline | Values from last cache. Trend shows ⚠ icon + "cached" label. |

### 2.4 Widget Grid

3-column grid, gap Space-5 (16px). Each widget card: Surface-1, radius-md, shadow-1, padding Space-5.

```
┌───────────────────┬───────────────────┬───────────────────┐
│  Recommended Jobs │  Task List        │  CV Strength      │
│  (320px height)   │  (320px height)   │  (200px height)   │
│                   │                   │                   │
│  ┌─────────────┐  │  ☐ Update CV     │  ╭─────╮         │
│  │ Sr. Frontend│  │  ☐ Apply to SDE  │  │ 86  │         │
│  │ Cruise      │  │  ☐ Network prep  │  │/100 │         │
│  │ 92% match   │  │  ☐ Skill audit   │  ╰─────╯         │
│  │ [Save] [App]│  │                   │  Radial gauge    │
│  ├─────────────┤  │  ⬡ 4/8 completed │  ring 86%        │
│  │ ML Engineer │  │  [Add Task]       │  filled Primary  │
│  │ Waymo       │  │                   │  -500            │
│  │ 87% match   │  │  Progress circle  │                   │
│  │ [Save] [App]│  │  (32px) top-right │                   │
│  └─────────────┘  │  checked = 50%    │                   │
│                   │  opacity          │                   │
│  [View All →]     │                   │                   │
├───────────────────┼───────────────────┼───────────────────┤
│  Upcoming         │  Activity Feed    │  Career Progress  │
│  Interviews       │  (260px height)   │  (260px height)   │
│  (200px height)   │                   │                   │
│                   │  ● John D. viewed │  Skill Growth     │
│  Today 3:00 PM    │    your profile   │  ▓▓▓▓▓▓▓░░░ 70%  │
│  Lead Engineer    │    · 2h ago       │                   │
│  @ Cruise         │  ● New job match  │  Apps Submitted   │
│  [Join] [Resched] │    Sr. Frontend   │  ▓▓▓░░░░░░░ 30%  │
│                   │    · 4h ago       │                   │
│  Tomorrow         │  ● CV score       │  Interviews       │
│  10:00 AM         │    improved +2    │  ▓▓░░░░░░░░ 20%  │
│  SDE @ Google     │    · 1d ago       │                   │
│  [Join] [Resched] │                   │  Goal bars:       │
│                   │  [View All →]     │  12px height      │
│                   │                   │  radius-sm        │
├───────────────────┼───────────────────┼───────────────────┤
│  Quick Actions    │  AI Insight       │                   │
│  (200px height)   │  (200px height)   │                   │
│                   │                   │                   │
│  ┌────┬────┐      │  ┌──────────────┐ │                   │
│  │ ✏️ │ 📄 │      │  │ 💡           │ │                   │
│  │Edit │CV  │      │  │ Primary-50   │ │                   │
│  │ CV  │Upld │      │  │ tint         │ │                   │
│  ├────┼────┤      │  │ "Your CV     │ │                   │
│  │ 🎯 │ 🤖 │      │  │ ranks top    │ │                   │
│  │Job  │AI   │      │  │ 10% for AI  │ │                   │
│  │Srch │Chat │      │  │ roles"      │ │                   │
│  └────┴────┘      │  └──────────────┘ │                   │
│                   │                   │                   │
│  2×2 grid         │  No border        │                   │
│  Icon + label     │  sparkle icon     │                   │
└───────────────────┴───────────────────┴───────────────────┘
```

#### 2.4.1 Recommended Jobs Widget

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 320px (fixed, scroll inner) |
| Job item padding | Space-5 | 16px |
| Job item border-bottom | Border-Default | 1px Neutral-300 |
| Job title | Body | 15px, weight 600, Text-Primary |
| Company | Body-Small | 14px, weight 400, Text-Secondary |
| Match badge | — | 13px Caption, radius-sm (4px), Success-50 bg, Success-600 text |
| Match badge (high) | — | 90%+: Success-50 bg, 75–89%: Primary-50 bg, <75%: Warning-50 bg |
| Action buttons | Button-Small | 14px, 32px height, radius-md |
| "View All" link | Text-Link | Primary-600, right-aligned, padding-top Space-3 |
| Inner scroll | — | Custom thin scrollbar, Neutral-200 track |

**States:**

| State | Behavior |
|-------|----------|
| Empty | Illustration (briefcase + stars, 80px) + "No recommendations yet" + "Complete your CV to get started" CTA |
| Loading | 3 skeleton job items (full width × 60px each), pulse |
| Error | Card shows error state inline: "Unable to load jobs" + [Retry] button |
| More than 2 | Inner scroll. "View All" shows count: "View All (12)" |

#### 2.4.2 Task List Widget

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 320px (fixed, scroll inner) |
| Task item | — | Flex row, checkbox + label + optional due date |
| Checkbox | — | 20px × 20px, radius-sm, border Neutral-400, checked Primary-500 bg |
| Task label | Body | 15px, weight 400, Text-Body (checked: Text-Tertiary, strikethrough) |
| Due date | Caption | 13px, weight 400, text-Secondary |
| Progress circle | — | 32px × 32px, circular progress, Primary-500 stroke |
| Progress text | Caption | 13px, weight 600, Primary-600 |
| "Add Task" button | — | Ghost button, Brief text + "+" icon, 14px |

**States:**

| State | Behavior |
|-------|----------|
| Empty | "No tasks yet" + "Add your first task" ghost button + illustration (clipboard, 64px) |
| Loading | 4 skeleton rows (full width × 24px each), pulse |
| All checked | Confetti micro-animation (ease-spring 500ms), progress circle shows 100%, message "All done! 🎉" |
| Overdue tasks | Due date shows Danger-500 text + warning icon |

#### 2.4.3 CV Strength Widget

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 200px (fixed) |
| Gauge type | — | Radial (circular) progress |
| Gauge size | — | 120px diameter |
| Gauge stroke width | — | 12px |
| Gauge track color | Neutral-200 | #E2E8F0 |
| Gauge fill color | Primary-500 | #3B82F6 |
| Gauge value text | Heading-2 | 28px, weight 650, Text-Primary |
| Gauge label | Caption | 13px, weight 400, Text-Secondary |
| Improvement text | Body-Small | 14px, weight 400, Text-Secondary (below gauge) |

**States:**

| State | Behavior |
|-------|----------|
| Empty (no CV) | Gauge shows 0, stroke Neutral-200, "Upload your CV to get started" CTA |
| Loading | Skeleton circle (120px), pulse |
| Low score (<50) | Fill color Danger-500, improvement text: "Needs improvement — 5 suggestions" |
| Medium (50–74) | Fill color Warning-500, improvement text: "Room for growth — 3 suggestions" |
| Good (75–89) | Fill color Primary-500, improvement text: "Looking good — 2 suggestions" |
| Excellent (90+) | Fill color Success-500, improvement text: "Excellent! Top 5% of candidates" |

#### 2.4.4 Upcoming Interviews Widget

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 200px (fixed) |
| Interview item padding | Space-3 | 8px top/bottom |
| Interview item border-left | Primary-500 | 3px solid (color-coded) |
| Time | Body-Small | 14px, weight 600, Text-Primary |
| Title | Body | 15px, weight 500, Text-Body |
| Company | Caption | 13px, weight 400, Text-Secondary |
| Action buttons | Button-Small | 14px, ghost style, Primary-600 |
| Empty state | — | "No upcoming interviews" + Calendar icon (48px) + "Browse jobs to get started" |

#### 2.4.5 Activity Feed Widget

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 260px (fixed, scroll inner) |
| Activity dot | — | 8px circle, Primary-500 (unread) or Neutral-300 (read) |
| Activity text | Body-Small | 14px, weight 400, Text-Body |
| Timestamp | Caption | 13px, weight 400, Text-Tertiary |
| Empty state | — | "No recent activity" + activity illustration (64px) |

#### 2.4.6 Career Progress Widget

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 260px (fixed) |
| Goal bar height | — | 12px |
| Goal bar radius | Radius-Sm | 4px |
| Goal bar track | Neutral-200 | #E2E8F0 |
| Goal bar fill | Primary-500 | #3B82F6 |
| Goal label | Body-Small | 14px, weight 500, Text-Primary |
| Goal percentage | Caption | 13px, weight 600, Text-Secondary |

#### 2.4.7 Quick Actions Widget

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 200px (fixed) |
| Button grid | — | 2 × 2, gap Space-3 |
| Action button | — | Surface-1 bg, border Neutral-300, radius-md, 40px height |
| Button hover | — | Surface-2 bg, Shadow-2 transition 200ms |
| Button icon | — | 20px × 20px, Primary-500 |
| Button label | Caption | 13px, weight 500, Text-Secondary |
| Actions defined | — | Edit CV, Upload Doc, Job Search, AI Chat |

#### 2.4.8 AI Insight Widget

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 200px (fixed) |
| Card background | Primary-50 | #EFF6FF |
| Card border | none | — |
| Sparkle icon | — | 20px × 20px, Primary-500 |
| Insight text | Body-Small | 14px, weight 400, Text-Body |
| Dismiss button | — | 16px × 16px, Neutral-400 |

### 2.5 AI Assistant Floating Button

```
┌──────────────────────────────────────────────────────────────────┐
│                                                    ┌──────────┐ │
│                                                    │  ⚡      │ │
│                                                    │  Primary │ │
│                                                    │  -600    │ │
│                                                    │  56px    │ │
│                                                    │  circle  │ │
│                                                    └──────────┘ │
│                              Position: fixed bottom-right       │
│                              Offset: Space-8 (32px) from edges │
│                              Shadow-3, z-overlay               │
└──────────────────────────────────────────────────────────────────┘
```

| Property | Token | Value |
|----------|-------|-------|
| Size | — | 56px × 56px |
| Shape | Radius-Full | 9999px (circle) |
| Background | Primary-600 | #2563EB |
| Icon color | White | #FFFFFF |
| Icon size | — | 24px × 24px |
| Shadow | Shadow-3 | Layer 3 |
| Position | — | Fixed, bottom: Space-8, right: Space-8 |
| z-index | z-overlay | Layer 5 |
| Hover | — | Scale 1.05, 200ms ease-out, Shadow-4 |
| Active/Press | — | Scale 0.97, 50ms ease-out |

**States:**

| State | Behavior |
|-------|----------|
| Default | Primary-600 bg, sparkle icon |
| Hover | Scale 1.05, Shadow-4, cursor pointer |
| Active | Scale 0.97, Primary-700 bg |
| Has notification | Red dot (8px, Danger-500) top-right of button |
| Pulse (first visit) | Subtle pulse animation (scale 1 → 1.05, 2000ms loop, 3 cycles then stops) |

---

## 3. Empty State (New User)

```
┌──────────────────────────────────────────────────────────────────┐
│                        DASHBOARD — EMPTY STATE                   │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Heading-2: "Welcome to MR:EGO, Alex"                      │  │
│  │  Body: "Let's build your career toolkit. Start by adding   │  │
│  │  your CV or exploring job recommendations."                │  │
│  │  [Upload CV] [Browse Jobs]                      [Dismiss]  │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Stat row shows "—" for all values.                              │
│                                                                  │
│  Widget grid replaced with 2-column "Getting Started" grid:      │
│  ┌────────────────────┐  ┌────────────────────┐                  │
│  │ 1. Upload Your CV  │  │ 2. Set Preferences │                  │
│  │ [Progress 0/5]     │  │ [Progress 0/5]     │                  │
│  └────────────────────┘  └────────────────────┘                  │
│  ┌────────────────────┐  ┌────────────────────┐                  │
│  │ 3. Take Skill Quiz │  │ 4. Explore Jobs    │                  │
│  │ [Progress 0/5]     │  │ [Progress 0/5]     │                  │
│  └────────────────────┘  └────────────────────┘                  │
│                                                                  │
│  Getting Started cards: Surface-1, radius-md, padding Space-5   │
│  Progress: 4-step checklist with checkmarks                      │
│  AI button: present but shows tooltip "Ask me anything"          │
└──────────────────────────────────────────────────────────────────┘
```

---

## 4. Loading State

```
┌──────────────────────────────────────────────────────────────────┐
│  GREETING SKELETON: Two lines (200px + 120px), 16px height       │
│                                                                  │
│  AI SUMMARY SKELETON: Full-width block, 100px height             │
│                                                                  │
│  STAT ROW: 4 skeletons, 80px × 80px each, gap Space-5           │
│                                                                  │
│  WIDGET GRID: 6 skeletons (3 per row × 2 rows):                 │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │ │
│  │ ▓▓▓▓              │ │ ▓▓▓▓              │ │ ▓▓▓▓              │ │
│  │ ▓▓▓▓              │ │ ▓▓▓▓              │ │ ▓▓▓▓              │ │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘ │
│                                                                  │
│  Skeleton spec: Surface-2 bg, radius-md, opacity 0.5 base,       │
│  0.8 peak, pulse 1500ms ease-in-out                             │
│                                                                  │
│  Sequence: Greeting (0ms) → AI Summary (100ms) → Stats (200ms)  │
│  → Widget row 1 (300ms) → Widget row 2 (400ms)                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. Error State

```
┌──────────────────────────────────────────────────────────────────┐
│  INLINE WIDGET ERRORS (per-widget granularity):                  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Widget header + error body                                │  │
│  │  ⚠ "Unable to load recommendations"                       │  │
│  │  [Retry] button (Button-Small, Primary-600)               │  │
│  │                                                            │  │
│  │  Widget retains its header and dimensions to prevent       │  │
│  │  layout shift. Error state replaces only the body content. │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Dashboard-level error:                                         │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Central banner at top of content:                         │  │
│  │  ⚠ "Some widgets failed to load" + [Dismiss] [Retry All]  │  │
│  │  Warning-50 bg, Warning-500 border, radius-md              │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  No full-page error unless entire data layer fails.             │
│  In that case: centered error card with app logo + message      │
│  + [Retry] + [Contact Support]                                  │
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
│  │  Caption text, warning icon. Auto-dismisses on reconnect.  │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Widget behavior:                                               │  │
│  - All widgets show cached data with "(cached)" label           │  │
│  - Interactive features disabled (Apply, Save, etc.)            │  │
│  - Tooltips: "Available when online"                            │  │
│  - AI button disabled, grayscale 50% opacity                    │  │
│  - Stat trends show "cached" instead of "+3 today"              │  │
│  - Offline indicator in topbar (icon only, 20px)                │  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 7. Visual Hierarchy

```
Priority 1 (Highest) ─────────────────────────────────────► AI Summary Card
                           (color tint + actionable insight)

Priority 2 ───────────────────────────────────────────────► Stat Numbers
                           (large Heading-2 values, visual weight)

Priority 3 ───────────────────────────────────────────────► Widget Grid
                           (information dense, secondary focus)

Priority 4 ───────────────────────────────────────────────► AI Floating Button
                           (persistent, always available)

Priority 5 ───────────────────────────────────────────────► Topbar + Sidebar
                           (navigation infrastructure)
```

**Hierarchy mechanisms:**
- AI Summary uses Primary-50 color tint (highest color saturation on page)
- Stat values use Heading-2 (largest text in content area)
- Widgets have consistent Surface-1 treatment (equal visual weight)
- Floating button uses Primary-600 (most saturated brand color) + Shadow-3

---

## 8. Motion Specifications

| Element | Trigger | Animation | Duration | Easing | Delay |
|---------|---------|-----------|----------|--------|-------|
| Greeting | Page load | Fade in + slide down 8px | 300ms | Ease-Out | 0ms |
| AI Summary | Page load | Fade in + slide down 8px | 300ms | Ease-Out | 50ms |
| Stat row | Page load | Fade in, values count up | 800ms | Ease-Out | 100ms |
| Widget row 1 | Page load | Staggered fade in + slide up 8px | 300ms | Ease-Out | 150ms (100ms stagger) |
| Widget row 2 | Page load | Staggered fade in + slide up 8px | 300ms | Ease-Out | 350ms (100ms stagger) |
| Stat count-up | When visible | Number increment animation | 800ms | Ease-Out | 200ms per stat |
| Card hover | Mouse enter | Shadow shift to Shadow-2, slight -1px Y | 200ms | Ease-Out | 0ms |
| AI button pulse | First visit | Scale 1→1.05 (3 cycles) | 2000ms loop | Ease-In-Out | 5s after load |
| Stat value change | Data update | Cross-fade old→new number | 200ms | Ease-In-Out | 0ms |
| Widget content update | Data refresh | Cross-fade | 200ms | Ease-Out | 0ms |
| Dismiss AI card | Click | Slide up + fade out | 200ms | Ease-In | 0ms |
| Skeleton pulse | Loading | Opacity 0.5 → 0.8 → 0.5 | 1500ms loop | Ease-In-Out | Staggered |

**Stagger table (page load):**

| Element | Delay |
|---------|-------|
| Greeting | 0ms |
| AI Summary | 50ms |
| Stat 1 | 150ms |
| Stat 2 | 200ms |
| Stat 3 | 250ms |
| Stat 4 | 300ms |
| Widget 1 | 400ms |
| Widget 2 | 500ms |
| Widget 3 | 600ms |
| Widget 4 | 700ms |
| Widget 5 | 800ms |
| Widget 6 | 900ms |
| Widget 7 | 1000ms |
| Widget 8 | 1100ms |
| AI Floating Button | 2000ms |

---

## 9. Accessibility

| Requirement | Implementation |
|-------------|---------------|
| ARIA landmarks | `role="region"` per widget, `aria-label` describing widget purpose (e.g., "Recommended jobs widget") |
| AI Summary | `aria-live="polite"` for dynamic content updates |
| Stat values | `aria-label` includes stat name + value + trend (e.g., "Applications: 12, up 3 today") |
| Widget roles | `role="region"`, `aria-labelledby` pointing to widget heading |
| Interactive elements | All buttons/links have `aria-label` if icon-only |
| Skip link | "Skip to content" link as first focusable element |
| Focus order | Topbar → Sidebar → Content widgets (left-to-right, top-to-bottom) → Floating button |
| Focus indicator | 2px Primary-500 ring, 2px offset, radius-md |
| Keyboard navigation | Tab through widgets, Enter/Space to activate, Arrow keys within scrollable widgets |
| Reduced motion | `prefers-reduced-motion`: all animations reduced to 50ms instant |
| Color contrast | All text meets WCAG AA (4.5:1), body text meets AAA (7:1) |
| Screen reader | Stat values announced with context. Widget content announced on focus. |
| AI button | `aria-label="Open AI Assistant"`, Enter/Space to activate |
| Dismiss actions | Focus moves to next focusable element after dismiss |
| Error announcements | `aria-live="assertive"` for inline widget errors |

---

## 10. Responsive Behavior

### Mobile (<768px) — Single Column

| Element | Adaptation |
|---------|-----------|
| Sidebar | Hidden. Replaced by bottom tab bar (5 items, 56px height) |
| Topbar | Reduced: hamburger menu (24px) + title + notification bell |
| Content | Single column, padding Space-5 (16px) |
| Stat row | Horizontal scroll (snap), or 2×2 grid |
| Widget grid | Single column, full width |
| AI Floating Button | 48px (smaller), offset Space-5 |
| Widget ordering | AI Summary → Stat Row → Quick Actions → Task List → Recommended Jobs → Activity Feed → CV Strength → Upcoming Interviews → Career Progress → AI Insight |

### Tablet (768px–1023px) — 2-Column

| Element | Adaptation |
|---------|-----------|
| Sidebar | Icon rail (64px collapsed), expand on tap to 240px overlay |
| Topbar | Full (search visible, icon-only nav items) |
| Content | 2-column widget grid, padding Space-7 (24px) |
| Stat row | 2×2 grid (2 per row) |
| AI Floating Button | 52px, offset Space-7 |
| Widget ordering | AI Summary spans full width → Stats 2×2 → Widgets 2-col left-heavy |

### Desktop (1024px–1279px) — 3-Column

Full layout as specified above.

### Ultra-Wide (1600px+)

| Element | Adaptation |
|---------|-----------|
| Content max width | 1440px (centered) |
| Widget columns | 4-column grid (1fr 1fr 1fr 1fr) |
| Stat row | 4 cards with extra padding Space-7 |
| Widget heights | Increase by 10% for larger screens |

### Responsive Breakpoint Reference

| Property | Mobile | Tablet | Desktop | Ultra-Wide |
|----------|--------|--------|---------|------------|
| Sidebar | Bottom tabs | Icon rail (64px) | Full (240px) | Full (240px) |
| Grid columns | 1 | 2 | 3 | 4 |
| Page padding | Space-5 | Space-7 | Space-8 | Space-10 |
| Widget gap | Space-4 | Space-5 | Space-5 | Space-6 |
| Stat layout | Scroll row | 2×2 grid | 4 row | 4 row |
| Topbar height | 48px | 56px | 56px | 56px |
| AI button size | 48px | 52px | 56px | 56px |
| Typography scale | Mobile | Mobile | Desktop | Desktop |

---

## 11. Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Navigate forward through all focusable elements |
| Shift+Tab | Navigate backward |
| Enter/Space | Activate button/link |
| Arrow Down | Scroll within widget (if scrollable) / move to next widget |
| Arrow Up | Scroll within widget (if scrollable) / move to previous widget |
| Tab (in widget grid) | Tab through widget chrome, not inner content. Enter to enter widget. |
| Escape | Close any open menu/dropdown. Dismiss focused tooltip. |
| / | Focus global search |
| ? | Show keyboard shortcuts modal |

**Widget Tab Sequence:**
1. Topbar (Skip link → Logo → Search → Icons → Avatar)
2. Sidebar (Nav items top-to-bottom)
3. AI Summary Card (Title → Description → Action link → Dismiss)
4. Stat Row (Stat 1 → Stat 2 → Stat 3 → Stat 4)
5. Widget Grid (left-to-right, top-to-bottom per widget)
6. AI Floating Button

---

## 12. Future Expansion Items

| Item | Priority | Notes |
|------|----------|-------|
| Custom widget layout (drag & drop) | Medium | Persist widget positions + visibility per user |
| Widget library | Medium | Users can add/remove widgets from 12+ widget types |
| Dashboard presets | Low | "Job Seeker", "Student", "Career Changer" layouts |
| Real-time collaboration indicators | Low | Avatar bumps showing other users viewing same dashboard |
| Widget minimize/collapse | Low | Save vertical space, show only header |
| Dashboard tabs | Medium | "Overview", "Applications", "Networking" tabbed views |
| Personal widget creation | Future | Users build custom widgets from data APIs |
| Mobile widget swipe actions | Medium | Swipe to refresh, swipe to dismiss |
| Widget refresh intervals | Low | Per-widget auto-refresh (30s, 60s, 5min) |
| Dashboard sharing | Future | Share read-only dashboard link externally |
| Focus mode | Low | Hide all widgets except AI Summary + Task List |
| Dark mode toggle animation | Low | Smooth transition between themes |
| Push-to-talk AI button | Future | Hold AI button for voice input |
| Widget data export | Low | Per-widget CSV/PDF export |

---

## 13. Token Reference Summary

### Color Tokens Used

| Token | Value (Light) | Elements |
|-------|---------------|----------|
| Surface-0 | Neutral-50 | Page area |
| Surface-1 | #FFFFFF | Widget cards, stat cards |
| Surface-2 | Neutral-100 | Sidebar, skeleton |
| Primary-50 | #EFF6FF | AI Summary, AI Insight |
| Primary-200 | #BFDBFE | AI Summary border |
| Primary-500 | #3B82F6 | Stat icons, CV gauge fill, progress |
| Primary-600 | #2563EB | AI button, links, action text |
| Text-Primary | Neutral-900 | Greeting, stat values, headings |
| Text-Body | Neutral-800 | Descriptions, widget content |
| Text-Secondary | Neutral-600 | Labels, metadata |
| Text-Tertiary | Neutral-500 | Timestamps, placeholders |
| Text-Link | Primary-600 | Action links |
| Border-Default | Neutral-300 | Card borders, dividers |
| Success-500 | #10B981 | Positive trends |
| Warning-500 | #F59E0B | Medium CV score, offline |
| Danger-500 | #EF4444 | Low CV score, errors |

### Typography Tokens Used

| Token | Size | Weight | Line Height | Elements |
|-------|------|--------|-------------|----------|
| Heading-2 | 28px | 650 | 1.2 | Greeting, stat values |
| Heading-3 | 22px | 600 | 1.25 | Widget section titles |
| Heading-4 | 18px | 600 | 1.3 | AI Summary title |
| Body | 15px | 400 | 1.6 | Descriptions, widget items |
| Body-Small | 14px | 400 | 1.5 | Activity, companies, sub-labels |
| Caption | 13px | 400 | 1.4 | Stat labels, trends, AI Chip |

### Spacing Tokens Used

| Token | Value | Usage |
|-------|-------|-------|
| Space-3 | 8px | Compact padding, button gaps |
| Space-4 | 12px | Nested padding |
| Space-5 | 16px | Card padding, widget gap |
| Space-7 | 24px | Section padding, greeting bottom |
| Space-8 | 32px | Page margins |
| Space-10 | 48px | Section vertical gaps |

### Elevation Tokens Used

| Token | Usage |
|-------|-------|
| Layer 0 | Page, sidebar |
| Layer 1 | Widgets, stat cards, topbar glass |
| Layer 2 | Widget hover |
| Layer 3 | AI floating button |
| Layer 5 | Modal overlays |

---

*End of Dashboard.md — Visual Prototype Specification for MR:EGO Design OS DP-9.*
