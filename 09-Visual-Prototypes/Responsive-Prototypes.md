# Responsive Prototypes — Visual Specification

**Phase:** DP-9 (Visual Prototype System)
**Version:** 1.0
**Status:** COMPLETE
**Design Authority:** DP-0 through DP-8
**Inherits:** Constitution, Design Language, Design System, Component Library, Application Shell, Visual Foundation, UX Architecture, High-Fidelity Wireframes, Interaction & Motion

---

## 1. Device Category Definitions

### 1.1 Breakpoint Reference

| Category | Width Range | Grid Columns | Page Margin | Content Max Width |
|----------|-------------|--------------|-------------|-------------------|
| Phone | 360–767px | 4 | 16px | 100% |
| Tablet | 768–1023px | 8 | 24px | 100% |
| Laptop | 1024–1279px | 12 | 32px | 1140px |
| Desktop | 1280–1599px | 12 | 32px | 1200px or 1440px |
| Ultra Wide | 1600px+ | 12 | 48px | 1200px or 100% |
| Foldable | 360–1023px (per screen) | 4 or 8 | 16–24px | hinge-aware |

### 1.2 Typography Scaling by Device

| Type Token | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|------------|-------|--------|--------|---------|------------|
| Display | 36px | 42px | 48px | 48px | 48px |
| Heading-1 | 28px | 32px | 36px | 36px | 36px |
| Heading-2 | 22px | 26px | 28px | 28px | 28px |
| Heading-3 | 18px | 20px | 22px | 22px | 22px |
| Heading-4 | 16px | 17px | 18px | 18px | 18px |
| Body | 14px | 15px | 15px | 15px | 15px |
| Body-Small | 13px | 14px | 14px | 14px | 14px |
| Caption | 12px | 13px | 13px | 13px | 13px |

### 1.3 Spacing Scaling by Device

| Spacing Token | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------------|-------|--------|--------|---------|------------|
| Space-3 (base) | 8px | 8px | 8px | 8px | 8px |
| Space-5 (card pad) | 16px | 16px | 16px | 16px | 16px |
| Space-7 (section pad) | 16px | 20px | 24px | 24px | 24px |
| Space-8 (page margin) | 16px | 24px | 32px | 32px | 48px |
| Space-10 (section gap) | 32px | 40px | 48px | 48px | 56px |
| Space-14 (hero pad) | 64px | 96px | 128px | 128px | 128px |

---

## 2. Phone (360–767px)

### 2.1 Grid System

- **4-column grid** with 16px gutters
- **16px page margins** on both sides
- Content spans full width (4 columns) unless specified
- Cards span full width (4 columns) by default
- Two-up layout possible: 2 columns each (2fr 2fr) for stat pairs

### 2.2 Navigation Pattern

```
┌──────────────────────────────────────┐
│  TOPBAR (48px compact, glass)        │  ← Reduced from 56px
│  [☰] [Logo 20px]  [🔔] [Avatar 28px]│
├──────────────────────────────────────┤
│                                      │
│  CONTENT AREA (scrollable)           │
│  Single column, full-width cards     │
│  Space-5 (16px) section gaps         │
│                                      │
├──────────────────────────────────────┤
│  BOTTOM TAB BAR (56px fixed)         │
│  [◆ Dashboard] [◇ Jobs] [◇ CV]      │
│  [◇ Messages] [◇ Profile]           │
│  5 tabs, 44px min touch targets      │
└──────────────────────────────────────┘
```

### 2.3 Bottom Tab Navigation Specs

| Element | Spec |
|---------|------|
| Height | 56px (includes safe area bottom) |
| Background | Surface-1, top border Neutral-300 |
| Tabs | 5 evenly spaced (20% each) |
| Active tab | Primary-500 icon + label |
| Inactive tab | Neutral-400 icon + label |
| Icon size | 20px × 20px |
| Label size | 11px Caption, 500 weight |
| Spacing | 4px between icon and label |
| Touch target | Minimum 44px each |
| Safe area | Padding-bottom: env(safe-area-inset-bottom) |
| Elevation | Layer 1 (Shadow-1) |
| Label hidden | Label hidden on devices < 400px width, icons only |

### 2.4 Sidebar Behavior

- Sidebar is **hidden by default**
- Accessible via **hamburger drawer** (left slide-in)
- Drawer: 280px width, full height, Level 3 elevation
- Glass backdrop (rgba(0,0,0,0.5), blur 4px)
- Close on: tap backdrop, tap close icon, swipe right-to-left, press Escape
- Open/close animation: 250ms ease-out, slide from left
- Drawer content: nav items (44px height each), user info at top, settings link at bottom

### 2.5 Card Specifications

| Property | Value |
|----------|-------|
| Width | Full (100%, 4 columns) |
| Padding | 16px (Space-5) |
| Radius | 8px (Radius-Md) |
| Margin bottom | 12px (between cards in a group) |
| Shadow | Layer 1 (Shadow-1) |
| Two-column card grid | 2fr 2fr with 12px gap |

### 2.6 AI Panel Adaptation

- **AI Panel** becomes a **bottom sheet** (not side panel)
- Drag handle: 32px wide, 4px tall, Neutral-300, centered top
- Sheet height: 60% of viewport (expandable to 85%)
- Drag to dismiss: swipe down 80px threshold
- Floating AI button: 48px circle (reduced from 56px), bottom-right, 16px from edge
- AI thinking indicator: placed inline, not in panel

### 2.7 Dialog & Modal Adaptation

- **Modals** become **full-screen sheets** sliding up from bottom
- No glass backdrop (full coverage)
- Close via: tap X (top-right), swipe down, press Back
- Sheet max width: 100%
- Sheet border radius: 16px top-left, 16px top-right only
- Transition: 300ms ease-out, slide up

### 2.8 Search & Command Palette

- **Full-screen overlay** covering entire viewport
- Search bar at top (48px from top safe area)
- Results below, scrollable
- Semi-transparent backdrop (rgba(0,0,0,0.3))
- Dismiss: tap backdrop, press Escape, swipe down

### 2.9 Touch Targets

| Element | Minimum Size | Notes |
|---------|-------------|-------|
| All interactive elements | 44px | Universal minimum on mobile |
| Icon buttons | 44px | 20px icon centered within |
| List items | 44px | Height |
| Bottom tab items | 56px | Includes label |
| Cards (tappable) | 44px minimum per action | |
| Button height | 44px | Body text 14px minimum |
| Input fields | 44px | Height |
| Gap between targets | 8px | Minimum |

### 2.10 AI & Status Indicators (Phone)

| Component | Adaptation |
|-----------|------------|
| AI Floating Button | 48px circle, bottom 16px, right 16px |
| AI Bottom Sheet | 60–85% viewport height, drag handle visible |
| Memory Indicator | Inline chip within card, not hover (tap for tooltip) |
| Thinking Indicator | Inline dots, no label (screen reader only) |
| Agent State | Badge in topbar or inline, not persistent panel |
| Match Score Radial | 48px (reduced from 56px) |
| Confidence Indicator | Inline text badge, no hover explanation |

### 2.11 Phone-Specific Page Behaviors

| Page | Layout Change from Desktop |
|------|---------------------------|
| Dashboard | Single column stack, stat row 2×2 grid, AI summary full width, widget column = 1 |
| AI Workspace | AI context panel hidden (bottom sheet instead), messages full width |
| CV Builder | Toolbar collapses to icon-only, preview pane hidden (tab toggle) |
| CV Analysis | Score radial at top, sections as accordion |
| Job Search | Filters in slide-out drawer, results single column |
| Job Details | Company info collapses, apply button fixed bottom |
| Application Wizard | Full-screen step-by-step, no sidebar progress |
| Application Tracker | List view only (no detail split), timeline condensed |
| Messaging | Thread list full width, no side panel, reply bar fixed bottom |
| Documents | Grid becomes list (1 column), preview full screen |
| Notifications | List only, filter as top chips row |
| Onboarding | Full-screen stepper, larger illustrations |
| Settings | List with drill-down (no side-by-side categories) |
| Profile | Single column, tabs as horizontal scrollable pills |

---

## 3. Tablet (768–1023px)

### 3.1 Grid System

- **8-column grid** with 24px gutters
- **24px page margins** on both sides
- Flexible column spans (2, 4, 6, 8)

### 3.2 Navigation Pattern

```
┌──────────────────────────────────────────────────┐
│  TOPBAR (56px, glass)                             │
│  [Logo] [Breadcrumb]    [🔔] [Avatar 32px]       │
├──────┬───────────────────────────────────────────┤
│      │                                            │
│ ICON │  CONTENT AREA (scrollable)                 │
│ RAIL │  Two-column widget grids                   │
│ 56px │  Space-7 section gaps                     │
│      │                                            │
│ Icons│                                            │
│ only │                                            │
│      │                                            │
├──────┴───────────────────────────────────────────┤
│  FOOTER (optional)                                │
└──────────────────────────────────────────────────┘
```

### 3.3 Sidebar: Icon Rail

| Element | Spec |
|---------|------|
| Width | 56px (collapsed) |
| Background | Surface-2 |
| Border-right | 1px Neutral-300 |
| Icons | 20px each, centered |
| Active | Primary-500 icon + left accent bar (3px) |
| Inactive | Neutral-400 |
| Tooltip | Appears on long-press / hover (Layer 4) |
| Expanded | Tap to expand to 200px (labels appear), 200ms transition |
| Navigation items | Dashboard, Jobs, CV, Messages, Profile, Settings |

### 3.4 Card Specifications

| Property | Value |
|----------|-------|
| Two-column grid | 2 columns (4fr 4fr) with 20px gap |
| Padding | 20px (between Space-5 and Space-7) |
| Radius | 8px |
| Shadow | Layer 1 |
| Widget width | Variable column spans (4/8, 6/8, 8/8) |

### 3.5 Modal Specifications

- **Centered modal** (not full screen)
- Max width: 560px
- Glass backdrop: rgba(255,255,255,0.72), blur 8px
- Border radius: 12px
- Position: center of viewport
- Close: tap X, tap backdrop, press Escape
- Animation: scale + fade (200ms ease-out)

### 3.6 AI Panel Adaptation

- **AI Panel** as side drawer overlay (not persistent)
- Width: 320px
- Slides from right, Level 3 elevation
- Glass backdrop behind drawer
- Floating AI button: 52px circle
- AI suggestions inline within content

### 3.7 Touch Targets

| Element | Minimum Size |
|---------|-------------|
| Interactive elements | 44px |
| Icon buttons | 44px |
| Button height | 40px |
| Touch target gap | 8px |

### 3.8 Tablet-Specific Page Behaviors

| Page | Layout Change from Desktop |
|------|---------------------------|
| Dashboard | 2-column widget grid, stat row 4×1, AI summary at top |
| AI Workspace | Context panel as slide-over, conversation full width |
| CV Builder | Preview pane toggleable overlay, toolbar visible |
| Job Search | Filters as side drawer, 2-column results |
| Messaging | Split view: list (3 cols) + thread (5 cols) |
| Documents | 2-column grid, overlay preview |
| Settings | Icon rail + content, no third panel |

---

## 4. Laptop (1024–1279px)

### 4.1 Grid System

- **12-column grid** with 24px gutters
- **32px page margins** on both sides
- Content max width: 1140px

### 4.2 Navigation Options

- **Full sidebar (240px)** with labels, or **icon rail (56px)**
- Switchable via user preference or toggle
- Full sidebar: 240px, Surface-2, nav labels 14px
- Topbar: 56px glass, full breadcrumb

### 4.3 Layout Patterns

```
┌─────────────────────────────────────────────────────────────────────┐
│                     TOPBAR (56px, glass)                             │
├──────────┬──────────────────────────────────────────────────────────┤
│          │                                                          │
│ SIDEBAR  │  CONTENT AREA (scrollable)                              │
│ 240px    │  3-column widget grids                                  │
│ or 56px  │  Tri-panel: sidebar + content + side panel              │
│          │  Space-8 section gaps                                   │
│          │                                                          │
└──────────┴──────────────────────────────────────────────────────────┘
```

### 4.4 Card Specifications

| Property | Value |
|----------|-------|
| 3-column grid | 3 columns (4fr 4fr 4fr) with 24px gap |
| Padding | 24px (Space-7) |
| Radius | 8px |

### 4.5 Tri-Panel Layout

| Panel | Width | Content |
|-------|-------|---------|
| Sidebar | 240px or 56px | Primary navigation |
| Content | flex: 1 | Main content, max 720px |
| Side panel | 320px | AI context, details, references |

### 4.6 AI Integration

- AI panel as persistent side panel (320px) or toggleable
- Floating AI button: 56px circle
- Full AI context panel visible alongside content

---

## 5. Desktop (1280–1599px)

### 5.1 Grid System

- **12-column grid** with 24px gutters
- **32px page margins**
- Max content width: 1200px **or** 1440px wide (user preference)

### 5.2 Layout Architecture

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                            TOPBAR (56px, glass)                                │
├──────────┬──────────────────────────────────────────────┬─────────────────────┤
│          │                                              │                     │
│ SIDEBAR  │          CONTENT AREA                        │   AI PANEL          │
│ 240px    │  3–4 column widget grids                     │   320px             │
│          │  Space-8 to Space-10 section gaps           │   (optional)        │
│          │                                               │                     │
└──────────┴──────────────────────────────────────────────┴─────────────────────┘
```

### 5.3 Widget Grid Options

| Columns | Span | Gap | Use Case |
|---------|------|-----|----------|
| 3 | 4fr 4fr 4fr | 24px | Dashboard |
| 4 | 3fr 3fr 3fr 3fr | 24px | Analytics |
| 2+1 | 6fr 6fr, then 12fr | 24px | Content with detail |

### 5.4 AI Panel

- Persistent AI panel: 320px, right side
- Surface-1 background, left border Neutral-300
- Scrollable independently
- Contains: memory, context, suggestions, sources

---

## 6. Ultra Wide (1600px+)

### 6.1 Grid System

- **12-column grid** with 24px gutters
- **48px page margins** on both sides
- **Two layout modes:**
  - **Mode A:** Content max 1200px centered (familiar reading width)
  - **Mode B:** 100% utilization with generous whitespace

### 6.2 Spacing Increase

| Token | Value | Change from Desktop |
|-------|-------|-------------------|
| Card padding | 32px | +8px |
| Section gap (vertical) | 56–64px (Space-10 to Space-12) | Wider |
| Page margins | 48px | +16px |
| Widget gap (horizontal) | 32px | +8px |

### 6.3 Layout Expansion

- **4-column widget grids** standard (can go to 6 for dense data)
- Sidebar (240px) + Topbar (56px) + Content + AI Panel (320px) all visible
- Additional whitespace distributed evenly
- Text max-width: 720px for reading content
- Data displays can utilize full width

---

## 7. Foldables (Dual-Screen)

### 7.1 Design Principles

| Principle | Implementation |
|-----------|---------------|
| Hinge awareness | No content, interactive elements, or critical information in hinge area |
| Safe area per panel | 360px minimum safe width per screen panel |
| Navigation flexibility | Nav can span hinge or stay in safe zone |
| Content split | Content splits across screens for multi-tasking |
| Smooth transitions | Layout animates between folded/unfolded states (300ms) |

### 7.2 Folded State (Single Screen)

- Behaves as **Phone** category (360–767px)
- Single column, bottom tabs, full-screen sheets
- AI panel as bottom sheet

### 7.3 Unfolded State (Dual Screen)

```
┌─────────────────────┐ ┌─────────────────────┐
│     HINGE           │                       │
│  SCREEN 1 (360+)    │ │  SCREEN 2 (360+)    │
│                      │ │                      │
│  [Content or Nav]   │ │  [Content or Panel]  │
│                      │ │                      │
│  Bottom tabs (opt)   │ │  [AI Panel or Chat] │
└─────────────────────┘ └─────────────────────┘
    5–7mm gap             5–7mm gap
    (hinge zone)          (hinge zone)
```

### 7.4 Layout Patterns

| Pattern | Screen 1 | Screen 2 |
|---------|----------|----------|
| Canvas + Tools | Canvas/Content | Toolbar/References |
| List + Detail | List/Results | Detail/Preview |
| Content + AI | Main content | AI Panel/Chat |
| Multi-task | Dashboard | Job Search |

### 7.5 Navigation in Unfolded State

- Sidebar: can span across hinge or live entirely on Screen 1
- Bottom tabs: hide in unfolded, show sidebar instead
- Topbar: spans both screens (content-safe zones on each side of hinge)

### 7.6 Transition Behavior

| Transition | Animation | Duration |
|------------|-----------|----------|
| Fold → Unfold | Content splits, nav transitions to sidebar | 300ms ease-out |
| Unfold → Fold | Content collapses, bottom tabs appear | 300ms ease-out |
| Hinge orientation change | Layout reflow | 200ms ease-out |

---

## 8. Per-Page Responsive Tables

### 8.1 Landing Page

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Nav | Logo + hamburger | Logo + Sign In + CTA | Full nav bar | Full nav bar | Full nav bar |
| Hero layout | Stacked centered | Stacked centered | Side-by-side | Side-by-side | Side-by-side |
| Hero heading | 36px Display | 42px Display | 48px Display | 48px Display | 48px Display |
| Feature grid | 1 col | 2 col | 3 col | 4 col | 4 col |
| Testimonial | 1 card | 2 cards | 3 cards | 3 cards | 3 cards + padding |
| CTA section | Full width | Full width | Max 720px | Max 720px | Max 720px |
| Footer | Stacked | 2-col | 4-col | 4-col | 4-col |
| Page margins | 16px | 24px | 32px | 32px | 48px |

### 8.2 Authentication (Login / Register / Forgot Password)

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Layout | Full screen | Centered card | Centered card | Centered card | Centered card |
| Card width | 100% | 400px | 440px | 440px | 480px |
| Card padding | 24px | 32px | 40px | 40px | 48px |
| Side image | Hidden | Hidden | Visible 50% | Visible 50% | Visible 50% |
| Social buttons | Stacked | Side-by-side | Side-by-side | Side-by-side | Side-by-side |
| Background | Solid | Ambient gradient | Ambient gradient | Ambient gradient | Ambient gradient |

### 8.3 Onboarding

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Layout | Full screen | Centered | Centered | Centered | Centered |
| Step indicator | Dots (top) | Numbered (side) | Numbered (side) | Numbered (side) | Numbered (side) |
| Illustration | 200px max | 280px max | 320px max | 360px max | 400px max |
| Content width | 100% | 560px | 640px | 640px | 720px |
| Actions | Full width buttons | Inline | Inline | Inline | Inline |
| Skip button | Always visible | Top-right | Top-right | Top-right | Top-right |

### 8.4 Dashboard

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Navigation | Bottom tabs + drawer | Icon rail | Full sidebar | Full sidebar | Full sidebar |
| Widget columns | 1 | 2 | 3 | 3–4 | 4 |
| Stat cards | 2×2 grid | 4 in row | 4 in row | 4 in row | 4 in row |
| AI Summary | Full width, top | Full width, top | Full width, top | 4-col span | 4-col span |
| Recommended Jobs | 1 col (4/4) | 4/8 | 4/12 | 4/12 | 3/12 |
| Task List | Below jobs | 4/8 | 4/12 | 4/12 | 3/12 |
| Activity Feed | Hidden (tab) | 4/8 | 4/12 | 4/12 | 3/12 |
| Career Progress | Bottom | 8/8 | 8/12 | 8/12 | 6/12 |
| AI Panel | Bottom sheet | Slide-over | Side panel 320px | Side panel 320px | Side panel 320px |
| Section gap | Space-5 (16px) | Space-7 (24px) | Space-8 (32px) | Space-10 (48px) | Space-10 (48px) |
| Card padding | 16px | 20px | 24px | 24px | 32px |
| Floating AI btn | 48px | 52px | 56px | 56px | 56px |

### 8.5 AI Workspace

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Layout | Full chat | Chat + drawer | Tri-panel | Tri-panel | Tri-panel + wider |
| Sidebar | Drawer | Icon rail | 240px | 240px | 240px |
| Context panel | Bottom sheet | Slide-over | 320px side | 320px side | 360px side |
| Message width | 100% | 100% | 720px max | 720px max | 720px max |
| Input bar | Fixed bottom | Fixed bottom | Fixed bottom | Fixed bottom | Fixed bottom |
| Suggested questions | 2 visible | 3 visible | 4 visible | 4 visible | 4–5 visible |
| Thinking indicator | Inline | Inline | Inline | Inline | Inline |
| Reasoning panel | Expandable | Expandable | Expandable | Expandable | Expandable |
| Memory panel | Bottom sheet | Side panel | Side panel | Side panel | Side panel |
| Message font | Body 14px | Body 15px | Body 15px | Body 15px | Body 15px |

### 8.6 CV Builder

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Navigation | Bottom tabs | Icon rail | Full sidebar | Full sidebar | Full sidebar |
| Layout | Single column | Sidebar + editor | Sidebar + editor + preview | Sidebar + editor + preview | Sidebar + editor + preview |
| Preview pane | Tab toggle | Toggleable overlay | Side panel (360px) | Side panel (400px) | Side panel (440px) |
| Toolbar | Collapsed (icon-only) | Icons + labels | Full | Full | Full |
| Section list | Full width | 280px side list | 280px side list | 280px side list | 320px side list |
| AI suggestions | Inline | Inline + side | Side panel | Side panel | Side panel |
| Bullet editor | Full width | Full width | Split with tips | Split with tips | Split with tips |

### 8.7 CV Analysis

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Score radial | 48px, centered top | 56px, left sidebar | 56px, left sidebar | 56px, left sidebar | 64px, left sidebar |
| Score breakdown | Full width column | 2-col grid | 2-col grid | 3-col grid | 3-col grid |
| Section list | Accordion | Accordion | Side-by-side | Side-by-side | Side-by-side |
| Suggestion cards | Full width | 2-col | 2-col | 2–3 col | 3-col |
| Comparison data | Hidden (tab) | Tab panel | Side panel | Side panel | Side panel |

### 8.8 Job Search

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Search bar | Full width, top | Full width, top | Full width, top | Full width, top | Full width, top |
| Filters | Drawer overlay | Drawer overlay | Side panel 280px | Side panel 280px | Side panel 320px |
| Results | Single column | 2-column grid | 2–3 column grid | 3-column grid | 3–4 column grid |
| Result card | Full width | 4/8 | 4/12 | 4/12 | 3/12 |
| Map view | Hidden | Tab toggle | Side panel | Side panel | Side panel |
| Save search | Inline chip | Inline chip | Top bar | Top bar | Top bar |
| Pagination | Infinite scroll | Infinite scroll | Numbered | Numbered | Numbered |
| AI match badge | Inline, card | Inline, card | Inline, card | Inline, card | Inline, card |

### 8.9 Job Details

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Layout | Single col scroll | 2-col (desc + sidebar) | 2-col (desc + sidebar) | 2-col | 2-col + wider |
| Apply button | Fixed bottom bar | Header + sidebar | Header + sidebar | Header + sidebar | Header + sidebar |
| Company info | Condensed | Expanded | Full | Full | Full |
| Match analysis | Collapsible section | Side panel | Side panel | Side panel | Side panel |
| Related jobs | 1 card | 2 cards | 3 cards | 3 cards | 4 cards |
| AI insights | Inline suggestion | Side panel | Side panel | Side panel | Side panel |

### 8.10 Application Wizard

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Layout | Full screen stepper | Centered stepper | Centered stepper | Centered stepper | Centered stepper |
| Step progress | Top dots | Left sidebar | Left sidebar | Left sidebar | Left sidebar |
| Form width | 100% | 560px | 640px | 640px | 720px |
| Cover letter | Bottom sheet | Side panel | Side panel | Side panel | Side panel |
| AI assist | Bottom sheet | Side panel | Side panel | Side panel | Side panel |
| Actions | Full width stacked | Inline right | Inline right | Inline right | Inline right |

### 8.11 Application Tracker

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Navigation | Bottom tabs | Icon rail | Full sidebar | Full sidebar | Full sidebar |
| Layout | List only | List + detail split | List + detail split | List + detail split | List + detail split |
| List items | Full, condensed | 3/8 | 4/12 | 4/12 | 3/12 |
| Detail view | Full screen (tap) | 5/8 | 8/12 | 8/12 | 9/12 |
| Timeline | Condensed | Normal | Full | Full | Full + wider |
| Kanban board | Hidden | Tab toggle | Tab toggle | Side-by-side | Side-by-side |
| Stats header | 2×2 grid | 4 in row | 4 in row | 4 in row | 4 in row |

### 8.12 Documents

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Layout | List only | Grid 2-col | Grid 3-col | Grid 4-col | Grid 4-col + margin |
| Preview | Full screen overlay | Overlay side | Side panel | Side panel | Side panel |
| Search | Full width top | Full width top | Inline filter | Inline filter | Inline filter |
| Folder nav | Drawer | Side panel | Side panel | Side panel | Side panel |
| Upload area | Full width card | Full width card | Inline drop zone | Inline drop zone | Inline drop zone |
| AI analysis | Bottom sheet | Side panel | Side panel | Side panel | Side panel |

### 8.13 Messaging

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Layout | Thread only | Split (list + thread) | Split + side | Split + side | Split + wider |
| Thread list | Drawer (tap back) | 3/8 | 3/12 | 3/12 | 3/12 |
| Message area | Full width | 5/8 | 6/12 | 6/12 | 6/12 |
| AI panel | Bottom sheet | Slide-over | 3/12 | 3/12 | 3/12 |
| Reply bar | Fixed bottom | Fixed bottom | Fixed bottom | Fixed bottom | Fixed bottom |
| Attachments | Inline preview | Inline preview | Thumbnails | Thumbnails | Thumbnails |
| AI reply | Inline suggestion | Inline suggestion | Side panel | Side panel | Side panel |

### 8.14 Notifications

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Layout | Full list | Full list + detail | Split view | Split view | Split view |
| Filter chips | Horizontal scroll | Wrapped | Inline pills | Inline pills | Inline pills |
| Notification cards | Full width | Full width | Full width | Full width | Full width + padding |
| Group headers | Stickied | Stickied | Stickied | Stickied | Stickied |
| Mark all read | Icon top-right | Text button | Text button | Text button | Text button |
| Detail view | Full screen tap | Right panel | Right panel | Right panel | Right panel |

### 8.15 Profile

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Navigation | Bottom tabs | Icon rail | Full sidebar | Full sidebar | Full sidebar |
| Layout | Single column | 2-col tabs | 2-col tabs + side | 2-col tabs + side | 3-col |
| Profile header | Compact | Standard | Full | Full | Full + padding |
| Avatar | 64px | 80px | 96px | 96px | 96px |
| Tabs | Pills (scrollable) | Tabs row | Side list 200px | Side list 240px | Side list 240px |
| Content area | Full width | 6/8 | 8/12 | 8/12 | 7/12 |
| AI insights | Bottom sheet | Right 2/8 | Right 3/12 | Right 3/12 | Right 3/12 |

### 8.16 Settings

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Navigation | Back + title | Icon rail | Full sidebar | Full sidebar | Full sidebar |
| Layout | Drill-down list | 2-col (nav + content) | 2-col (nav + content) | 2-col (nav + content) | 3-col |
| Category nav | Full width list | 3/8 sidebar | 240px sidebar | 240px sidebar | 240px sidebar |
| Content | Full width | 5/8 | flex: 1 | flex: 1 | flex: 1 |
| Sections | Accordion | Accordion | Grouped fields | Grouped fields | Grouped fields |
| Danger zone | Bottom, red card | Bottom, red card | Bottom, red card | Bottom, red card | Bottom, red card |

### 8.17 Help Center

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Search | Hero position | Hero position | Top bar | Top bar | Top bar |
| Categories | 2-col grid | 3-col grid | 3-col grid | 4-col grid | 4-col grid |
| Articles | Full width list | Split (list + content) | Split | Split | Split + wider |
| FAQ | Accordion | Accordion | Accordion | Accordion | Accordion |
| AI search | Bottom sheet | Slide-over | Side panel | Side panel | Side panel |

### 8.18 Search Overlay

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Layout | Full screen overlay | Full screen overlay | Centered overlay | Centered overlay | Centered overlay |
| Search bar | Top, 48px | Top, 56px | Top, 56px | Top, 56px | Top, 56px |
| Overlay width | 100% | 100% | 640px | 720px | 800px |
| Results max | 5 visible | 8 visible | 10 visible | 10 visible | 12 visible |
| Categories | Inline pills | Side list | Side list | Side list | Side list |
| Keyboard shortcuts | Hidden | Shown | Shown | Shown | Shown |
| Backdrop | rgba(0,0,0,0.3) | rgba(0,0,0,0.4) | rgba(0,0,0,0.5) | rgba(0,0,0,0.5) | rgba(0,0,0,0.5) |

### 8.19 Command Palette

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Layout | Full screen | Centered overlay | Centered overlay | Centered overlay | Centered overlay |
| Palette width | 100% | 520px | 560px | 600px | 640px |
| Input | 44px height | 48px height | 48px height | 48px height | 48px height |
| Max visible items | 5 | 7 | 8 | 8 | 10 |
| Mode indicator | Hidden | Badge | Badge | Badge | Badge |
| Shortcuts | Hidden | Displayed | Displayed | Displayed | Displayed |

### 8.20 Global Navigation (Topbar / Sidebar)

| Element | Phone | Tablet | Laptop | Desktop | Ultra Wide |
|---------|-------|--------|--------|---------|------------|
| Topbar height | 48px | 56px | 56px | 56px | 56px |
| Topbar logo | 20px | 24px | 24px | 24px | 24px |
| Topbar avatar | 28px | 32px | 32px | 32px | 32px |
| Topbar search | Icon only | Icon + short text | Full search | Full search | Full search |
| Sidebar mode | Drawer | Icon rail | Full 240px | Full 240px | Full 240px |
| Sidebar width | 280px (drawer) | 56px (rail) | 240px | 240px | 240px |
| Nav labels | Hidden | Hidden (tooltip) | Visible 14px | Visible 14px | Visible 14px |
| Nav icons | 20px | 20px | 20px | 20px | 20px |
| Nav items height | 44px | 44px | 40px | 40px | 40px |
| Bottom tabs | Visible | Hidden | Hidden | Hidden | Hidden |
| Breadcrumb | Hidden | Hidden | Visible | Visible | Visible |

---

## 9. Future Devices

### 9.1 Smart Glasses

| Principle | Implementation |
|-----------|---------------|
| Interaction | Voice-first with minimal UI overlay |
| Display | Monochrome/limited color, high contrast |
| Layout | Single column, large text (min 24px) |
| Navigation | Voice commands + gaze detection |
| Content | Glanceable snippets only |
| AI | Voice-activated, audio responses |
| Notifications | 3-line max, auto-dismiss 5s |
| Input | Speech-to-text, no keyboard |
| Density | Comfortable only (no compact mode) |
| Accessibility | Audio descriptions, haptic feedback |

### 9.2 AR / VR

| Principle | Implementation |
|-----------|---------------|
| Interaction | Spatial UI with depth layers (z-space) |
| Layout | Floating panels at fixed depths (-1, 0, +1 meters) |
| Navigation | Gaze + pinch gesture |
| Content | 3D cards, curved panels, spatial audio |
| AI | Spatial AI avatar (optional), voice conversations |
| Depth layer 0 | Primary content panel (1m distance) |
| Depth layer -1 | Background ambient panel (3m distance) |
| Depth layer +1 | Notification / alert layer (0.5m distance) |
| Panel size | 800×600px equivalent in space |
| Typography | Min 18px for readability at distance |
| Contrast | High contrast edges for depth perception |
| Comfort | 20-minute session limit reminder |

### 9.3 Voice Assistants

| Principle | Implementation |
|-----------|---------------|
| Interaction | Audio-only navigation |
| Visual | None (or minimal companion screen) |
| Navigation | Voice commands + wake word |
| AI | Natural conversation, context-aware |
| Feedback | Audio tones (confirmation, error, thinking) |
| State | "Listening" tone, "Thinking" tone, "Complete" tone |
| Speed | 1.5x default playback option |
| Privacy | Local processing where possible, clear data policies |
| Accessibility | Transcription available on companion device |

### 9.4 Wearables (Smartwatch)

| Principle | Implementation |
|-----------|---------------|
| Display | Glanceable notifications only |
| Screen | 40–45mm round or rectangular |
| Layout | Single card per screen |
| Type | 16px minimum, high contrast |
| Navigation | Swipe (up/down/left/right) + crown |
| Notifications | 3 lines max, action buttons (2 max) |
| AI | Quick replies generated by AI (3 options) |
| Data | Minimal: match count, message count, upcoming interview |
| Action | Tap to open on phone |
| Battery | Dark background, minimal animations |
| Complications | 4 corners: apps, messages, interviews, CV score |

---

## 10. Touch vs Keyboard Behavior

### 10.1 Touch-Optimized (Phone, Tablet)

| Interaction | Behavior |
|-------------|----------|
| Tap | Primary action |
| Long-press | Context menu, drag handle for reorder |
| Swipe left | Delete, archive |
| Swipe right | Mark as read, pin |
| Swipe down (top) | Refresh |
| Swipe down (sheet) | Dismiss |
| Pinch | Zoom in/out (documents, images) |
| Two-finger tap | Secondary action (like right-click) |
| Haptic feedback | Light on tap, medium on long-press, heavy on destructive |
| Scroll | Momentum scrolling |
| Pull to refresh | Loading indicator, spinner |

### 10.2 Keyboard-Optimized (Laptop, Desktop, Ultra Wide)

| Interaction | Shortcut |
|-------------|----------|
| Command Palette | `Cmd+K` or `Ctrl+K` |
| Global Search | `Cmd+Shift+F` or `Ctrl+Shift+F` |
| AI Workspace | `Cmd+I` or `Ctrl+I` |
| Notifications | `Cmd+Shift+N` or `Ctrl+Shift+N` |
| Navigate back | `Escape` |
| Submit (forms) | `Cmd+Enter` or `Ctrl+Enter` |
| Save | `Cmd+S` or `Ctrl+S` |
| New document | `Cmd+N` or `Ctrl+N` |
| Switch sidebar | `Cmd+B` or `Ctrl+B` |
| Focus search | `/` (anywhere) |
| Focus AI input | `>` (anywhere) |
| Tab navigation | Through interactive elements |
| Arrow keys | Navigate lists, grids, suggestions |
| Enter | Confirm selection |
| Space | Toggle / scroll down |

### 10.3 Hybrid (All Devices)

| Behavior | Implementation |
|----------|---------------|
| Tooltips | Hover (desktop), long-press (mobile) |
| Dropdowns | Click (desktop), tap (mobile) |
| Drag-and-drop | Mouse drag (desktop), long-press drag (mobile) |
| Right-click | Context menu (desktop), long-press context menu (mobile) |
| Multi-select | Shift+click (desktop), long-press + tap (mobile) |
| Hover states | Show on hover (desktop), show on tap (mobile, 500ms persist) |

---

## 11. Responsive States Matrix

### 11.1 Sidebar Visibility by Device

| Device | Default | Toggle Method |
|--------|---------|---------------|
| Phone | Hidden (drawer) | Hamburger icon → slide drawer |
| Tablet | Icon rail | Tap → expand to 200px; or switch to full |
| Laptop | Full 240px | Collapse via toggle (→ icon rail 56px) |
| Desktop | Full 240px | Collapse via toggle; auto-expand on hover |
| Ultra Wide | Full 240px | Collapse optional; auto-expand on hover |

### 11.2 AI Panel Visibility by Device

| Device | Default | Access Method |
|--------|---------|---------------|
| Phone | Hidden | Floating button → bottom sheet |
| Tablet | Hidden | Floating button → slide-over panel |
| Laptop | Toggleable | Side panel 320px or floating button |
| Desktop | Optional persistent | Side panel 320px |
| Ultra Wide | Persistent | Side panel 320–360px |

### 11.3 Content Density by Device

| Device | Default Density | User Switchable |
|--------|----------------|-----------------|
| Phone | Comfortable | No |
| Tablet | Comfortable | Yes (Comfortable/Compact) |
| Laptop | Comfortable | Yes (Comfortable/Compact/Dense) |
| Desktop | Comfortable | Yes (Comfortable/Compact/Dense) |
| Ultra Wide | Comfortable | Yes (Comfortable/Compact/Dense) |

### 11.4 Animation Durations by Device

| Animation | Phone | Tablet | Laptop/Desktop | Ultra Wide |
|-----------|-------|--------|----------------|------------|
| Page transition | 200ms | 250ms | 300ms | 300ms |
| Sheet/modal | 250ms | 300ms | 300ms | 300ms |
| Sidebar toggle | 200ms | 200ms | 200ms | 200ms |
| AI thinking loop | 2000ms | 2000ms | 2000ms | 2000ms |
| Hover → tooltip | N/A | 200ms | 200ms | 200ms |
| Scroll behavior | Smooth | Smooth | Smooth | Smooth |

---

*End of Responsive Prototypes specification. All responsive behaviors inherit from DP-1 Grid, DP-4 Application Shell, and DP-7 High-Fidelity Wireframes.*
