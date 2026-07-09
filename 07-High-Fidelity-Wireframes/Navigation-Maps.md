# Navigation Maps — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:Nav, DP-6:IA, DP-4:Navigation

---

## Purpose

Complete navigation architecture for MR:EGO, defining primary, secondary, and contextual navigation across all screens with exact positioning and behavior.

---

## Primary Navigation (Sidebar)

| Property | Value |
|----------|-------|
| Position | Left edge |
| Width | 240px (expanded), 64px (collapsed) |
| Background | Surface-2 |
| Elevation | Elevation-1 |
| z-index | Layer-1 |
| Border right | Border-Default |

### Items (expanded view):

```
┌──────────────────────────────┐
│  Logo / Brand (140x32px)     │  ← 48px top padding
│                              │
│  ▸ Dashboard                 │  ← Icon (20px) + Label, 44px h
│  ▸ AI Workspace              │
│  ▸ CV Manager                │
│  ▸ Jobs                      │  ← Active: Primary-50 bg
│  ▸ Applications              │
│  ▸ Documents                 │
│  ▸ Career Progress           │
│                              │
│  ─── spacer ───              │  ← border-top, Space-3 margin
│                              │
│  ▸ Notifications           ○ │  ← with badge count
│  ▸ Profile                   │
│  ▸ Settings                  │
│  ▸ Help Center               │
│                              │
│  ─── spacer ───              │
│  User avatar (32px) + name   │  ← 44px h, bottom
│  "Alex Chen"                 │
└──────────────────────────────┘
```

### Item Specifications:
| Property | Value |
|----------|-------|
| Icon | 20px x 20px, centered in 44px hit area |
| Label | Body (15px), 500 weight |
| Active state | Primary-50 bg, Primary-600 text, 2px left border Primary-500 |
| Hover state | Surface-1 bg |
| Spacing between | 0px (items are 44px each, touching) |
| Section spacer | 8px margin, border-top |
| Badge | 20px circle, Danger-500, white 12px text |

---

## Collapsed Sidebar (Tablet)

```
┌────────┐
│ Logo   │  ← 32px icon
│        │
│ ▸      │  ← icon only, 48x48px hit area
│ ▸      │
│ ▸      │
│ ▸      │  ← Active: left border + bg
│ ▸      │
│ ▸      │
│ ▸      │
│        │
│ ▸    ○ │
│ ▸      │
│ ▸      │
│ ▸      │
│        │
│  👤    │  ← 32px avatar
└────────┘
```

### Width: 64px, icon-only with tooltip on hover.

---

## Bottom Navigation (Mobile)

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐             │
│  │ Home  │ │  AI  │ │ Jobs │ │ Apps │ │ More │             │
│  │  icon │ │ icon │ │ icon │ │ icon │ │ icon │             │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Height | 56px (safe area: 64px with bottom inset) |
| Background | Glass-BG, backdrop-blur 12px |
| Border top | Glass-Border |
| Items | 5 max (Home, AI, Jobs, Apps, More) |
| Active | Primary-600 icon, label |
| Inactive | Neutral-400 icon, label |
| Safe area | Padding-bottom: env(safe-area-inset-bottom) |

---

## Top Bar (All Authenticated Pages)

```
┌──────────────────────────────────────────────────────────────┐
│  ← Back (or hamburger on mobile)      Page Title    Search  │
│                                              Ctrl+K         │
│                                      Notif ○  Avatar ▸     │
└──────────────────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Height | 56px |
| Position | Fixed top |
| Background | Glass-BG, backdrop-blur 12px |
| Border bottom | Glass-Border |
| z-index | Elevation-1 |
| Padding | 0 Space-5 (16px) |

### Elements:
| Element | Position | Size | Behavior |
|---------|----------|------|----------|
| Back/Hamburger | Left | 36x36px icon | Back on detail pages, hamburger on home |
| Page title | Left (after back) | Body, 600 weight | Dynamic per page |
| Search | Right (or center on search pages) | Icon or bar | Ctrl+K opens command palette |
| Notifications | Right | Icon + badge | Dropdown on click (desktop), full screen (mobile) |
| Avatar | Right | 32x32px, radius-full | User menu dropdown |

---

## Secondary Navigation (Tabs)

Used for in-page section switching.

| Screen | Tabs |
|--------|------|
| Dashboard | Overview, Tasks, Progress |
| CV Manager | All CVs, Analysis, Versions |
| Applications | All, Active, Interview, Offers, Rejected |
| Profile | About, Experience, Skills, Documents, Activity |
| Settings | Account, Notifications, Privacy, Appearance, AI, Security |

### Tab Specification:
| Property | Value |
|----------|-------|
| Height | 44px |
| Active | Primary-600 text, 2px Primary-500 bottom border |
| Inactive | Text-Secondary, no border |
| Hover | Surface-1 bg |
| Gap | Space-2 (4px) |

---

## Breadcrumbs

| Property | Value |
|----------|-------|
| Position | Below topbar, above page header |
| Height | 24px |
| Padding | 0 Space-3 (8px) vertical |
| Separator | "/" — Caption, Text-Tertiary |
| Current page | Caption, Text-Primary, 600 weight |

### Usage: Depth 2+ pages (Job Detail, Application Detail, CV Analysis, Settings sections)

---

## Command Palette

| Property | Value |
|----------|-------|
| Trigger | Ctrl+K / Cmd+K |
| Width | 560px (desktop), 90% (mobile) |
| Max height | 480px |
| Position | Centered, 20% from top |
| Background | Surface-1 |
| Border | Border-Default |
| Radius | radius-md (8px) |
| Shadow | Shadow-4 (Elevation-4) |
| Backdrop | Glass-BG overlay |

### Elements:
| Element | Details |
|---------|---------|
| Input | 48px height, "Search pages, actions, settings..." |
| Results | Category headers (Caption, Text-Secondary) + items (Body, 44px h) |
| Active item | Primary-50 bg |
| Shortcut hint | Caption, Text-Tertiary (right) |
| Footer | Caption, "↑↓ navigate · enter select · esc close" |

---

## Contextual Navigation Map

| Screen | Back goes to | Forward goes to | Opening action |
|--------|-------------|-----------------|----------------|
| Landing | — | Authentication | "Start Your Journey" |
| Login | Landing | Dashboard | Sign in |
| Register | Landing | Onboarding / Welcome | Create account |
| Welcome | — | Onboarding | "Begin Setup" |
| Onboarding (n) | Onboarding (n-1) | Onboarding (n+1) or Dashboard | Continue / Complete |
| Dashboard | — | Various (cards) | Widget clicks |
| Job Search | Dashboard | Job Detail | Click card |
| Job Detail | Job Search | Application Wizard | "Apply Now" |
| Application Wizard | Job Detail | Application Detail | Submit |
| Application Tracker | Dashboard | Application Detail | Click card |
| CV Manager | Dashboard | CV Analysis | Upload / Select |
| CV Analysis | CV Manager | — | View |
| AI Workspace | Dashboard | — | Direct or from any page |
| Profile | Dashboard | (edit inline) | Click edit |
| Settings | Dashboard | (section switch) | Section nav |
| Notifications | Any | Relevant page | Click notification |

---

## Modal Navigation

| Modal | Trigger | Close Behavior |
|-------|---------|----------------|
| Confirmation dialog | Destructive action | Escape, X, Cancel button |
| AI reasoning panel | "Why?" on suggestion | Escape, "Hide" |
| Quick apply modal | Search "Quick Apply" | Escape, X, Cancel |
| Image preview | Document click | Escape, X, click outside |
| Session expiry | Any page (timeout) | Re-authenticate or close |
| Filter sheet (mobile) | Filter button | Swipe down, X, Apply |

---

## Navigation Rules

1. **One primary navigation per viewport** — never sidebar + tabs simultaneously
2. **Context is preserved** — back navigation retains scroll position, filters, state
3. **Modal depth ≤ 2** — a modal should never open another modal
4. **Loading never blocks navigation** — sidebar and topbar remain interactive
5. **Navigation state is persistent** — active tab, sidebar state remembered

---

*Cross-references: DP-6:Nav, DP-6:IA, DP-4:Navigation, DP-1:All*
