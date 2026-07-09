# Navigation

**Phase:** DP-2 (Design System)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md), [Brand-Constitution.md](../../01-Constitution/Brand-Constitution.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Elevation-System.md](../../02-Design-Language/Elevation-System.md), [Glass-System.md](../../02-Design-Language/Glass-System.md), [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md), [Layout-Principles.md](../../02-Design-Language/Layout-Principles.md), [Iconography.md](../../02-Design-Language/Iconography.md))

---

## Purpose

Navigation enables users to move between screens, sections, and modules. It provides spatial awareness — the user always knows where they are, where they can go, and how to return.

---

## When to Use

- Primary application navigation between modules and sections
- Page-level context (breadcrumbs, tabs)
- Action selection (dropdowns, context menus)
- Pagination through data sets
- Responsive menu adaptation

## When NOT to Use

- Single-page content without subsections — no navigation needed
- Forms or workflows with linear progression — use wizard pattern
- Actions that belong on buttons — do not hide primary actions in menus

---

## Variants

### Sidebar

Primary persistent navigation for module and section access.

| Property | Desktop | Tablet (collapsed) | Mobile |
|----------|---------|-------------------|--------|
| Position | Left edge | Left edge | Bottom tab bar |
| Width | 240px | 64px | Full width |
| Height | 100vh minus top bar | 100vh minus top bar | 56px (bottom) |
| Background | Surface-2 | Surface-2 | Surface-3 |
| Visibility | Always visible | Collapsible | Always visible |
| Elevation | Layer 0 (flat) | Layer 0 | Layer 3 |
| Transition | Width 200ms Ease-Out | Width 200ms Ease-Out | — |

| Element | Specification |
|---------|---------------|
| App logo | Top, 32px height, 16px padding |
| Module items | Icon (24px) + label (14px/500), 12px padding |
| Active item | Primary-100 background, Primary-600 text, left border (3px) |
| Hover item | Surface-3 background |
| Section labels | Overline (12px/600), uppercase, 8px above, 4px below |
| Spacer | 1px line between sections |
| Settings | Bottom section, separated by spacer |
| Collapse toggle | Bottom of sidebar, chevron icon |

### Top Bar

Secondary navigation for page context and global actions.

| Property | Value |
|----------|-------|
| Height | 56px |
| Position | Fixed top, full width minus sidebar |
| Background | Glass (Surface-1 with 0.72 opacity + 12px blur) |
| z-index | Layer 1 (100) |
| Border bottom | Border-Default |

| Zone | Content |
|------|---------|
| Left | Breadcrumb or page title + back button (mobile) |
| Center | Global search (desktop), page title (mobile) |
| Right | Global actions: notifications, settings, avatar menu |

### Breadcrumb

Hierarchical navigation showing current page context.

| Property | Value |
|----------|-------|
| Separator | Chevron right icon (14px, text-secondary) |
| Current page | Text-Body weight 500 |
| Parent links | Text-Secondary, hover changes to text-body |
| Collapse | Truncated with "..." for deep paths (>4 levels) |
| Home link | Home icon always first |
| Spacing | 4px between items and separators |

### Tabs

Section navigation within a page.

| Variant | Description | Use Case |
|---------|-------------|----------|
| Primary | Underline style, active tab has Primary-500 bottom border (2px) | Page-level section switching |
| Secondary | Background style, active tab has Surface-1 + shadow | Card-like tab container |
| Underline | Minimal, active has text-body + primary underline | Dense content areas |
| Pill | Rounded full, active filled Primary-500 | Filter-style selection |

| Property | Value |
|----------|-------|
| Tab height | 40px (standard), 32px (compact) |
| Tab padding | 16px horizontal |
| Gap between tabs | 4px |
| Active indicator | 2px bottom border (Primary-500) for underline style |
| Overflow | Chevron buttons when tabs exceed container width |
| Animation | Content cross-fade 200ms Ease-In-Out |

| State | Visual |
|-------|--------|
| Default | Text-Secondary, no background |
| Hover | Text-Body, subtle background tint |
| Active | Text-Body, Primary-500 indicator |
| Focus | 2px focus ring |
| Disabled | Text-Disabled, not interactive |

### Segmented Control

Mutually exclusive option selection.

| Property | Value |
|----------|-------|
| Container | Surface-2, radius 8px |
| Segment height | 36px |
| Segment padding | 12px 16px |
| Active segment | Surface-1, Shadow-1 |
| Active text | Text-Body, weight 500 |
| Default text | Text-Secondary |
| Animation | Active segment slides, 200ms Ease-Out |
| Usage | View toggle (list/grid), period selection (7d/30d/90d) |

### Context Menu

Right-click or long-press menu for contextual actions.

| Property | Value |
|----------|-------|
| Trigger | Right-click or long-press (500ms) |
| Width | 200px (min), 280px (max) |
| Elevation | Layer 4 (Shadow-4) |
| Background | Surface-1 |
| Border radius | Radius-Md (8px) |
| Padding | 4px vertical |

| Element | Specification |
|---------|---------------|
| Menu item | 12px padding horizontal, 8px vertical, icon + label |
| Danger item | Danger-500 text color |
| Divider | 1px Border-Default, 4px margin vertical |
| Disabled item | 0.4 opacity |
| Shortcut hint | Text-Secondary, right-aligned |

| State | Visual |
|-------|--------|
| Default | Text-Body |
| Hover | Primary-50 background |
| Focus | Primary-50 background + ring |
| Active | Primary-100 background |

### Dropdown

Action or option selection from a trigger element.

| Property | Value |
|----------|-------|
| Trigger | Button, icon, or link with chevron |
| Width | Matches trigger width (min 180px) |
| Elevation | Layer 2 (Shadow-2) |
| Animation | Fade + slide down 200ms Ease-Out |
| Dismiss | Esc, click outside, click trigger |

### Pagination

Navigation through pages of content.

| Variant | Description | Use Case |
|---------|-------------|----------|
| Standard | Page numbers + prev/next buttons | Tables, search results |
| Compact | Prev/next only + "Page X of Y" | Minimal pagination |
| Load more | "Show more" button at list bottom | Infinite-feed style |
| Infinite scroll | Auto-load on scroll near bottom | Social-style feeds |

| Property | Standard | Compact |
|----------|----------|---------|
| Item size | 36x36px | — |
| Gap | 4px | — |
| Prev/next | Icon buttons | Icon buttons |
| Page numbers | 5 visible + ellipsis | Hidden |
| Active page | Primary-600, white text | — |

---

## Navigation Anatomy

```
Sidebar (expanded):
┌──────────────────────┐
│  [Logo] MR:EGO       │
├──────────────────────┤
│  🏠 Home             │
│  📊 Dashboard        │
│  💼 Career           │
│  📝 Documents        │
│  🤖 AI Workspace     │
├──────────────────────┤
│  ⚙️ Settings         │
│  ❓ Help             │
└──────────────────────┘
```

```
Breadcrumb:
🏠  ›  Career  ›  Applications  ›  Senior Engineer at Acme
```

```
Tabs (Primary):
┌──────────┬──────────┬──────────┐
│  Overview │ Details  │ Activity │
└──────────┴──────────┴──────────┘
```

---

## Spacing

| Context | Value | Token |
|---------|-------|-------|
| Sidebar item padding | 12px 16px | Space-4 Space-5 |
| Sidebar section gap | 8px | Space-3 |
| Top bar horizontal padding | 16px | Space-5 |
| Tab padding | 0 16px | 0 Space-5 |
| Tab gap | 4px | Space-2 |
| Breadcrumb gap | 4px | Space-2 |
| Pagination item gap | 4px | Space-2 |
| Context menu item padding | 8px 12px | Space-3 Space-4 |
| Dropdown menu padding (inner) | 4px vertical | Space-2 |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Landmarks | `nav` role for sidebar, top bar, breadcrumb |
| Current page | `aria-current="page"` on active navigation item |
| Mobile menu | `aria-expanded` on hamburger toggle |
| Breadcrumb | `aria-label="Breadcrumb"`, `aria-current="page"` on last item |
| Tabs | `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls` |
| Tab panels | `role="tabpanel"` with `aria-labelledby` |
| Dropdown | `aria-haspopup="true"`, `aria-expanded` |
| Context menu | `aria-haspopup="menu"` on trigger |
| Menu items | `role="menuitem"` within `role="menu"` |
| Pagination | `aria-label="Pagination"`, `aria-current="page"` |
| Skip link | "Skip to content" first focusable element |
| Focus management | Tab panel focus stays within panel content |

---

## Responsive Behavior

| Breakpoint | Change |
|------------|--------|
| Mobile (<768px) | Sidebar becomes bottom tab bar (5 items max). Tabs collapse to horizontal scroll or dropdown. Breadcrumb truncated to 2 levels. |
| Tablet (768-1023px) | Sidebar collapses to icon-only (64px). Top bar shows breadcrumb. Tabs standard. |
| Desktop (1024px+) | Full sidebar (240px). Standard all navigation. |
| Ultra-wide (1600px+) | Full sidebar. Optional secondary sidebar for multi-level modules. |

---

## Future Expansion

- **Secondary sidebar** — Contextual sub-navigation within a module
- **Navigation groups** — Collapsible module groups in sidebar
- **Pinned items** — User-pinned navigation shortcuts
- **Recent items** — Recently accessed items in sidebar section
- **Module registry** — Dynamic sidebar population from module registration
- **Keyboard shortcuts** — Customizable keyboard navigation
- **Nested dropdowns** — Multi-level cascade menus
- **Breadcrumb dropdown** — Each breadcrumb segment can show siblings

---

## Related Components

- [Search.md](Search.md) — Command palette, global search in top bar
- [Cards.md](Cards.md) — Tab card content
- [Tables.md](Tables.md) — Table with pagination
- [Dialogs.md](Dialogs.md) — Navigation drawers
- [Feedback.md](Feedback.md) — Notification badge in top bar
- [Dashboard-Components.md](Dashboard-Components.md) — Dashboard widget navigation
