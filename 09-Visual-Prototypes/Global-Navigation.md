# Global Navigation — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Version:** 1.0
**Status:** Production Specification
**Inherits:** DP-0 through DP-8, DP-4:Application Shell (Topbar, Sidebar, Layouts), DP-5:Glass Navigation, DP-6:Nav Structure, DP-7:Navigation Wireframe, DP-8:Navigation Motion

---

## Purpose

Complete navigation architecture — topbar and sidebar providing persistent orientation, wayfinding, and primary action access across all MR:EGO screens. Supports desktop, tablet, and mobile form factors with collapsible, responsive, and hover-expand behavior.

---

## Part 1: Topbar

### Layout Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  TOPBAR (56px fixed, glass, z-index 100, Elevation-1)                       │
│                                                                              │
│  ┌─────┬──────────────┬─────────────────────────────────────────┬─────────┐ │
│  │  ☰  │  LOGO        │  Breadcrumb: Dashboard / Applications   │ SEARCH  │ │
│  │     │  [MR:EGO]    │                                         │ [🔍]    │ │
│  │     │  140x32px    │  Caption, Text-Secondary                │ Search… │ │
│  │     │              │                                         │ [⌘K]    │ │
│  │  hamburger menu    │                                         │         │ │
│  │  (mobile only)     │                                         │  ✨ AI   │ │
│  │                    │                                         │  [⌘I]   │ │
│  │                    │                                         │         │ │
│  │                    │                                         │  ☀/🌙  │ │
│  │                    │                                         │  🔔 (3)│ │
│  │                    │                                         │  👤     │ │
│  └─────┴──────────────┴─────────────────────────────────────────┴─────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Topbar Specs

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 56px |
| Background | Glass-Navigation | rgba(255,255,255,0.72), backdrop-filter: blur(12px) |
| Border bottom | — | 1px solid Neutral-200 |
| Elevation | Layer 1 | Shadow-1 |
| z-index | — | 100 |
| Padding horizontal | Space-5 | 16px left, Space-7 24px right |
| Transition | — | background 300ms ease |

### Topbar Elements (Left Group)

| Element | Spec |
|---------|------|
| Hamburger menu | 24×24px, Neutral-600, visible only at mobile (<768px), toggles sidebar overlay |
| Logo / Brand | 140×32px, contains wordmark "MR:EGO", click navigates to Dashboard |
| Logo link | `aria-label="Go to dashboard"` |

### Topbar Elements (Center)

| Element | Spec |
|---------|------|
| Breadcrumb | Caption (13px/400), Text-Secondary |
| Separator | "/" Neutral-400, Space-3 padding |
| Active page | Caption (13px/500), Text-Primary |
| Max width | — | Auto, centered in available space |

### Topbar Elements (Right Group)

| Element | Spec |
|---------|------|
| Global Search button | 36px height, Body-Small (14px/400) Text-Secondary |
| Search icon + "Search..." | Left 20px icon + label, hidden on mobile |
| Ctrl+K badge | Caption (11px/500), Neutral-500 bg Neutral-200, 4px radius, px-Space-2 |
| AI Shortcut button | 36px height, sparkle icon 20px Primary-500 |
| AI shortcut label | "AI" Body-Small, hidden on mobile |
| AI shortcut shortcut | "⌘I" caption badge, visible on hover |
| Theme toggle | 20×20px icon, sun/moon, Neutral-600 hover Primary-500 |
| Notification bell | 20×20px icon, Neutral-600 hover Primary-500 |
| Notification badge | 16×16px dot, Danger-500, count 3, white text Caption 10px/700 |
| User avatar | 32×32px, radius-full, border 2px Surface-1 |
| Avatar dropdown | 240px width, Layer 3, positioned right, 12px gap below |

### Topbar States

| State | Visual |
|-------|--------|
| Default | 0.72 glass opacity, no shadow |
| Scrolled | +Shadow-1, glass opacity increases to 0.85, border bottom appears |
| Hover on buttons | Surface-2 bg, cursor pointer |
| Active button | Primary-50 bg, Primary-600 icon |
| Search focused | Focus ring 2px Primary-300 |
| Bell with new | Badge visible, icon Primary-600 |
| Mobile | Hamburger visible, search icon only (no label), AI icon only |

### Dropdown Menu (Avatar)

| Property | Token | Value |
|----------|-------|-------|
| Width | — | 240px |
| Background | Surface-1 | #FFFFFF / Neutral-100 |
| Border radius | radius-lg | 12px |
| Elevation | Layer 3 | Shadow-3 |
| Border | — | 1px solid Neutral-200 |
| Items | 5+ | Profile, Settings, Help Center (divider) Sign Out |
| Item height | — | 40px |
| Item padding | Space-3 Space-5 | 8px 16px |
| Icon | 16px | Neutral-500 |

### Topbar Scroll Behavior

| Scroll position | Change |
|-----------------|--------|
| 0px | Glass 0.72 opacity, no shadow, no border |
| >4px | Glass 0.85 opacity, Shadow-1, 1px Neutral-200 border |
| >100px | Glass 0.90 opacity, Shadow-2 |

---

## Part 2: Sidebar

### Layout Diagram (Expanded)

```
┌──────────────────────────────────────────────────────────────────┐
│ SIDEBAR (240px, Surface-2, Elevation-2, z-index 200)            │
│                                                                  │
│ ┌─ USER INFO CARD ────────────────────────────────────────────┐ │
│ │  ┌────┐                                                      │ │
│ │  │ 👤 │  Alex Chen                                           │ │
│ │  │ 40 │  Senior Software Engineer                            │ │
│ │  └────┘                                                      │ │
│ └──────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ ─── Primary ──────────────────────────────────────────────────── │
│                                                                  │
│ │ ■  Dashboard                                          [grid] │ │
│ │ □  CV Manager                                         [doc]  │ │
│ │ □  Job Search                                         [mag]  │ │
│ │ □  Applications                                       [file] │ │
│ │ □  Messages                                           [msg]  │ │
│ │ □  Documents                                          [fld]  │ │
│ │ □  Career Progress                                    [chrt] │ │
│ │ □  AI Workspace                                       [spkl] │ │
│                                                                  │
│ ─── Secondary ────────────────────────────────────────────────── │
│                                                                  │
│ │ □  Profile                                            [user] │ │
│ │ □  Settings                                           [gear] │ │
│ │ □  Help Center                                        [help] │ │
│                                                                  │
│ ──────────────────────────────────────────────────────────────── │
│                                                                  │
│ │ ◀ Collapse                                            [icon] │ │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Layout Diagram (Collapsed / Icon Rail)

```
┌──────────────────────────────────────────────────────────────────┐
│ SIDEBAR COLLAPSED (56px, Surface-2)                             │
│                                                                  │
│ ┌─ USER ─┐                                                      │
│ │   👤   │                                                      │
│ └────────┘                                                      │
│                                                                  │
│ ─── Primary ──────────────────────────────────────────────────── │
│                                                                  │
│ ■  [grid]                                                       │
│ □  [doc]                                                        │
│ □  [mag]                                                        │
│ □  [file]                                                       │
│ □  [msg]                                                        │
│ □  [fld]                                                        │
│ □  [chrt]                                                       │
│ □  [spkl]                                                       │
│                                                                  │
│ ─── Secondary ────────────────────────────────────────────────── │
│                                                                  │
│ □  [user]                                                       │
│ □  [gear]                                                       │
│ □  [help]                                                       │
│                                                                  │
│ ──────────────────────────────────────────────────────────────── │
│                                                                  │
│ ▶  [expand]                                                     │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Sidebar Specs

| Property | Token | Value |
|----------|-------|-------|
| Width (expanded) | — | 240px |
| Width (collapsed) | — | 56px |
| Background | Surface-2 | Neutral-100 (light) / Neutral-800 (dark) |
| Elevation | Layer 2 | Shadow-0 (no shadow on desktop), Shadow-3 on mobile |
| z-index | — | 200 |
| Border right | — | 1px solid Neutral-200 |
| Transition | — | width 250ms ease-out |

### User Info Card (Expanded)

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 72px |
| Padding | Space-5 Space-5 | 16px |
| Avatar | 40×40px | radius-full |
| Name | Body (15px/600) | Text-Primary |
| Role | Caption (13px/400) | Text-Secondary, 2px below name |

### User Info Card (Collapsed)

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 56px |
| Padding | Space-3 | 8px centered |
| Avatar | 24×24px | radius-full |

### Primary Navigation Items

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 40px |
| Padding | Space-3 Space-5 | 8px 16px (expanded), centered (collapsed) |
| Border radius | radius-md | 8px on hover/active |
| Icon | 20×20px | Neutral-500 (default), Primary-500 (active) |
| Label | Body (14px/500) | Text-Primary, left 12px from icon |
| Gap between items | Space-1 | 2px |

### Active Item State

| Property | Token | Value |
|----------|-------|-------|
| Background | Primary-50 | rgba(59,130,246,0.08) |
| Left border | — | 3px solid Primary-600 |
| Icon color | Primary-600 | #2563EB |
| Label color | Primary-600 | #2563EB |
| Font weight | — | 600 |

### Navigation Item States

| State | Visual |
|-------|--------|
| Default | No bg, Neutral-500 icon, Text-Primary label |
| Hover | Surface-1 bg (Neutral-50), icon → Neutral-600 |
| Active | Primary-50 bg, Primary-600 icon/text, left border |
| Focus (keyboard) | Ring 2px Primary-300, offset 2px |
| Disabled | Neutral-300 icon, Neutral-400 text, cursor not-allowed |

### Section Labels

| Property | Token | Value |
|----------|-------|-------|
| Label | Caption (11px/600) | Text-Secondary |
| Text transform | — | Uppercase |
| Letter spacing | — | 0.8px |
| Padding | Space-5 Space-5 Space-2 | 16px 16px 4px |
| Divider above | — | 1px solid Neutral-200, mx-Space-5 |

### Collapse / Expand Toggle

| Property | Token | Value |
|----------|-------|-------|
| Position | — | Fixed at bottom of sidebar |
| Height | — | 44px |
| Width | — | 100% |
| Icon | 20×20px | Neutral-500, rotates 180° when collapsed |
| Hover | — | Surface-1 bg |
| Label | Body-Small (14px/400) | "Collapse" expanded, hidden collapsed |
| Tooltip | — | "Expand sidebar" when collapsed |

### Tooltip (Collapsed Mode)

| Property | Token | Value |
|----------|-------|-------|
| Trigger | — | Hover on icon for 500ms |
| Content | — | Item label + shortcut if applicable |
| Position | — | Right of sidebar, 8px gap |
| Background | Surface-1 | #FFFFFF / Neutral-100 |
| Elevation | Layer 4 | Shadow-4 |
| Border radius | radius-md | 8px |
| Padding | Space-3 Space-5 | 8px 16px |
| Arrow | — | 6px CSS triangle pointing left |

---

## Part 3: Sidebar States

| State | Visual | Trigger |
|-------|--------|---------|
| Default (expanded) | 240px width, full labels visible | Desktop default |
| Collapsed (icon rail) | 56px width, icons only, no labels | Toggle button click |
| Hover-expand | Temporarily expands to 240px, overlay | Hover on collapsed rail |
| Overlay (mobile) | Slides in from left, 280px width, backdrop | Hamburger menu tap |

### Hover-Expand Behavior

| Property | Value |
|----------|-------|
| Trigger | Hover on collapsed sidebar edge zone (8px) |
| Delay | 300ms before expanding |
| Content | Full sidebar with labels |
| Backdrop | None (desktop) |
| Auto-collapse | 300ms after mouse leaves sidebar |
| Animation | width 200ms ease-out |

### Mobile Overlay Sidebar

| Property | Token | Value |
|----------|-------|-------|
| Width | — | 280px |
| Backdrop | Glass-Backdrop | rgba(15,23,42,0.72), blur 4px |
| Position | — | Fixed left, below topbar |
| z-index | — | 300 (above topbar) |
| Close on tap | — | Tap backdrop closes sidebar |
| Swipe to close | — | Swipe left 30% threshold |

---

## Part 4: Responsive Adaptation

| Breakpoint | Topbar | Sidebar | Navigation |
|------------|--------|---------|------------|
| Desktop (>1024px) | Full with labels, breadcrumb | 240px expanded | Horizontal + vertical |
| Tablet (768-1024px) | Icon buttons, condensed | 56px icon rail | Icon rail + tooltips |
| Mobile (<768px) | Minimal, hamburger visible | Hidden (overlay on tap) | Bottom tab bar |

### Bottom Tab Bar (Mobile)

```
┌──────────────────────────────────────────────────────────────────┐
│  BOTTOM TAB BAR (56px, Surface-1, Elevation-2)                  │
│                                                                  │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐             │
│  │ ■    │  │ 📄   │  │ 🔍   │  │ 💬   │  │ ✨   │             │
│  │Dshbrd│  │ CV   │  │ Jobs │  │ Msgs │  │ AI   │             │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘             │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Bottom Tab Bar Specs (Mobile)

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 56px |
| Background | Surface-1 | #FFFFFF / Neutral-100 |
| Border top | — | 1px solid Neutral-200 |
| Elevation | Layer 2 | Shadow-2 |
| z-index | — | 100 |
| Items | — | 5 tabs (Dashboard, CV, Jobs, Messages, AI) |
| Tab icon | 20×20px | Neutral-500 |
| Tab label | Caption (11px/500) | Neutral-600 |
| Tab active | Primary-600 text | Primary-500 icon |
| Safe area | — | Padding-bottom safe-area for notched devices |

---

## Part 5: Motion Specification

| Element | Animation | Timing | Easing |
|---------|-----------|--------|--------|
| Sidebar expand | width 240px→56px (and reverse) | 250ms | cubic-bezier(0.16,1,0.3,1) |
| Sidebar items slide in | translateX(-8px)→0 | 200ms | ease-out |
| Item stagger delay | — | 20ms per item | — |
| Collapse icon rotate | 0→180° | 200ms | ease |
| Topbar glass change | opacity transition | 300ms | ease |
| Mobile sidebar slide | translateX(-100%)→0 | 250ms | ease-out |
| Backdrop fade | opacity 0→1 | 200ms | ease |
| Bottom tab appear | translateY(56px)→0 | 250ms | ease-out (page load) |
| Tooltip appear | opacity 0→1, translateY(2px) | 150ms | ease |
| Reduces motion | Respects prefers-reduced-motion | — | All transitions disabled |

---

## Part 6: Accessibility

| Requirement | Implementation |
|-------------|---------------|
| Topbar role | `role="banner"` or `<header>` landmark |
| Sidebar role | `role="navigation"` or `<nav>` landmark |
| Sidebar label | `aria-label="Main navigation"` |
| Active item | `aria-current="page"` |
| Collapse toggle | `aria-label="Collapse sidebar"` / `aria-expanded` |
| Hamburger menu | `aria-label="Open menu"` / `aria-expanded` |
| Mobile menu | `aria-hidden="true"` on backdrop |
| Skip link | "Skip to content" link as first focusable element |
| Focus management | Focus moves to first nav item when sidebar opens on mobile |
| Notification badge | `aria-label="3 unread notifications"` |
| Breadcrumb nav | `aria-label="Breadcrumb"` with `aria-current="page"` on active |
| Avatar dropdown | `aria-haspopup="true"` `aria-expanded` |
| Tab order | Sidebar items → Topbar right group → Content |
| Reduced motion | Respects `prefers-reduced-motion: reduce` |

---

## Part 7: Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Navigate through topbar items → content → sidebar |
| Shift+Tab | Reverse tab order |
| Ctrl+K | Open search overlay |
| Ctrl+I | Open AI workspace |
| Escape | Close mobile sidebar overlay |
| ← (collapsed) | Expand sidebar |
| → (expanded) | Focus first nav item |

---

## Part 8: AI Features in Navigation

| Feature | Location | Behavior |
|---------|----------|----------|
| AI Workspace nav item | Primary nav | Sparkle icon, last position |
| AI Shortcut button | Topbar right | Ctrl+I, opens AI workspace from any screen |
| AI badge | Nav item | Optional badge: "3 insights" for AI Workspace |
| AI notification | Bell dropdown | AI-generated notifications marked with sparkle |

---

## Future Expansion

| Feature | Category | Notes |
|---------|----------|-------|
| Custom nav sections | Sidebar | User-defined groups and reordering |
| Workspace switching | Topbar | Multiple workspace profiles |
| Nav item badges | Sidebar | Per-item notification counts |
| Collapsed sub-nav | Sidebar | Accordion expanders in expanded mode |
| Quick nav search | Sidebar | Inline search when pressing Ctrl+F in sidebar |
| Avatar status indicator | User card | Online/away/busy dot |
| Reading progress | Topbar | Article reading progress bar below topbar |
| Multi-level breadcrumbs | Topbar | Deeper navigation paths |
| Custom logo upload | Brand | Enterprise branding support |
| Dynamic nav ordering | AI | AI suggests nav item order based on usage |
