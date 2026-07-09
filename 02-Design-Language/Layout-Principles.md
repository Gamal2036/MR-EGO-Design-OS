# Layout Principles

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md), [Design-Principles.md](../01-Constitution/Design-Principles.md))

---

## Philosophy

Layout in MR:EGO is structured, predictable, and content-first. Every layout element has a defined role and consistent positioning. Users should never wonder where to find the navigation, where content appears, or how to access actions.

The layout system is built on the grid and spacing systems defined in DP-1. It provides patterns, not rigid templates — accommodating diverse content while maintaining visual consistency.

---

## Navigation Areas

### Global Navigation (Sidebar)

| Property | Desktop | Tablet (collapsed) | Mobile |
|----------|---------|-------------------|--------|
| Position | Left edge | Left edge (icon-only) | Bottom tab bar |
| Width | 240px (expanded) | 64px (collapsed) | Full width |
| Visibility | Always visible | Collapsible | Always visible |
| Elevation | Surface-2 | Surface-2 | Surface-3 |
| Items | 6–8 primary + settings | Icons only | 5 primary only |

### Top Navigation (Header)

| Property | Specification |
|----------|---------------|
| Height | 56px |
| Position | Fixed to top |
| z-index | 100 (Layer-1 with glass) |
| Elements | Breadcrumbs/search left, actions/avatar right |

---

## Content Areas

### Page Layout

```
┌─────────────────────────────────────────────────┐
│  Top Navigation Bar (56px fixed)                  │
├──────────┬──────────────────────────────────────┤
│          │                                       │
│ Sidebar  │  Content Area                          │
│ (240px)  │  (fluid, max 1140px)                   │
│          │                                       │
│          │  ┌─────────────────────────────────┐  │
│          │  │  Page Header (title + actions)   │  │
│          │  ├─────────────────────────────────┤  │
│          │  │                                 │  │
│          │  │  Page Content                    │  │
│          │  │  (grid / list / form / etc.)     │  │
│          │  │                                 │  │
│          │  └─────────────────────────────────┘  │
│          │                                       │
├──────────┴──────────────────────────────────────┤
│  Optional Footer (minimal, rarely used)           │
└─────────────────────────────────────────────────┘
```

### Content Area Padding

| Context | Padding | Token |
|---------|---------|-------|
| Desktop page padding | 32px | Space-8 |
| Tablet page padding | 24px | Space-7 |
| Mobile page padding | 16px | Space-5 |
| Section within page | 0px (spacing from grid) | — |

---

## Cards

| Property | Specification |
|----------|---------------|
| Padding (default) | 24px |
| Padding (compact) | 16px |
| Border radius | 8px |
| Background | Surface-1 |
| Border | Border-Default (1px) |
| Shadow | Shadow-1 |
| Hover shadow | Shadow-2 |
| Min height | None (content determines) |
| Max width | Container column width |

### Card Composition

```
┌─────────────────────────────────────┐
│  Header (optional)                   │
│  ┌──────────────────────────────┐   │
│  │ Icon | Title           Action │   │
│  └──────────────────────────────┘   │
│                                     │
│  Body                               │
│  Content determined by card type    │
│                                     │
│  Footer (optional)                  │
│  ┌──────────────────────────────┐   │
│  │ Metadata              Actions │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## Panels

| Property | Specification |
|----------|---------------|
| Position | Right side (slide-from-right) |
| Width | 400px (default), 480px (wide), 100% (mobile) |
| Background | Surface-1 |
| Shadow | Shadow-3 |
| Animation | Slide right 300ms Ease-Out |
| Header | Title + close button, 16px padding |
| Body | Scrollable, 16px padding |
| Footer | Optional action buttons, 16px padding |

---

## Dialogs

| Property | Specification |
|----------|---------------|
| Max width | 480px (sm), 640px (md), 800px (lg) |
| Padding | 32px |
| Border radius | 12px |
| Background | Surface-1 |
| Shadow | Shadow-3 |
| Backdrop | Glass (see [Glass-System.md](Glass-System.md)) |
| Animation | Scale up (200ms Ease-Out) |
| Close | Esc key + X button + click outside |

---

## Sheets

| Property | Specification |
|----------|---------------|
| Position | Right edge (default), bottom (mobile) |
| Width | 640px (desktop), full (mobile) |
| Height | 100vh |
| Background | Surface-1 |
| Shadow | Shadow-3 |
| Animation | Slide 300ms Ease-Out |
| Close | Esc key + X button |

---

## Drawers

| Property | Specification |
|----------|---------------|
| Position | Bottom (mobile), right (desktop) |
| Width | 360px (desktop), full (mobile) |
| Max height | 85vh (mobile drawer from bottom) |
| Background | Surface-1 |
| Border radius | 12px top corners (bottom drawer) |
| Shadow | Shadow-3 |
| Animation | Slide up (mobile), slide right (desktop) |

---

## Tables

| Property | Specification |
|----------|---------------|
| Cell padding | 12px 16px |
| Header height | 44px |
| Row height | 48px (default), 40px (compact) |
| Border | Row dividers (Border-Default) |
| Hover | Row background change |
| Selection | Primary-50 background |
| Empty | Illustration + message |

---

## Forms

| Property | Specification |
|----------|---------------|
| Label position | Top (stacked), left (inline for compact) |
| Input height | 40px |
| Input padding | 12px |
| Input border | Border-Default |
| Input focus | Border-Focus + ring (2px Primary-200) |
| Error | Border-Danger + error message below |
| Success | Border-Success (optional) |
| Helper text | Caption below input |
| Field spacing | 24px between fields |

---

## Search

| Property | Specification |
|----------|---------------|
| Position | Top navigation or command palette |
| Width | 480px (command palette), full (page search) |
| Animation | Expand from search icon |
| Results | Dropdown below search bar |
| Empty | "No results for [query]" |
| Shortcut | Cmd+K / Ctrl+K |

---

## Layout Rules

1. **One primary layout per page.** Mixing layout patterns (e.g., sidebar + tabs + cards + split pane) creates confusion.
2. **Content determines height.** Avoid fixed-height containers. Content expands to fill available space.
3. **Scrolling is vertical** (primary) and horizontal (data tables only).
4. **Sticky headers remain at the top** of their scroll container. Never center-stick elements.
5. **Negative space is acceptable.** Not every pixel needs content.
6. **Layout adapts to content length.** Empty, single-item, and ten-thousand-item states are all valid.

---

*These Layout Principles are permanent. All pages in DP-5 and modules in DP-6+ follow these layout patterns. Refer to [Grid-System.md](Grid-System.md) for column specifications, [Spacing-System.md](Spacing-System.md) for spacing values, and [Responsive-System.md](Responsive-System.md) for responsive adaptations.*
