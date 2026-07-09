# Sidebar Architecture

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Sidebar.md](../../04-Component-Library/Navigation/Sidebar.md), [SidebarGroup.md](../../04-Component-Library/Navigation/SidebarGroup.md), [SidebarItem.md](../../04-Component-Library/Navigation/SidebarItem.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rules 10, 17)

---

## Purpose

Defines the complete sidebar system — the primary navigation rail that provides persistent access to all major application modules and features.

---

## Sidebar States

### Expanded
Full sidebar with all visible labels.

- Width: 240px (default), 180px (compact variant)
- All navigation items show icon + label
- Section labels are visible
- Groups are expanded or collapsible
- User avatar and name visible at bottom

### Collapsed
Icon-only rail for space-efficient navigation.

- Width: 64px
- Only icons visible, labels hidden
- Tooltip on hover/focus shows label
- Section labels hidden
- User avatar only (no name)

### Auto-Collapse
Automatic transition between expanded and collapsed based on context.

- Triggers when viewport width drops below 1024px
- User preference can override auto-collapse on desktop
- Does not auto-collapse if user has explicitly expanded

### Mobile Drawer
Overlay sidebar that slides in from the left.

- Hidden by default
- Triggered by hamburger icon in header
- Overlay with backdrop (click backdrop to close)
- Focus trapped inside when open
- Width: 280px (more room for touch targets)

---

## Sidebar Sections

### Top Section — Logo/Brand
- Application logo (link to dashboard)
- Workspace switcher (compact dropdown)

### Navigation Section
Primary navigation items organized into groups:

| Group | Items | Behavior |
|-------|-------|----------|
| Core | Dashboard, Jobs, AI Workspace, Documents, CRM, Analytics | Always visible, always at top |
| Modules | Module-registered items | Below core, sorted by registration |
| Favorites | User-pinned items | Below modules, user-defined order |
| Recent | Recently visited items | Below favorites, auto-populated |

### Bottom Section — User Utilities
- Settings icon
- Help/Support icon
- User avatar with expandable menu

---

## Sidebar Groups

| Group Type | Behavior |
|------------|----------|
| Default | Static list of items |
| Collapsible | Click header to expand/collapse, state remembered |
| Pinned Items | User-defined, drag-reorderable |
| Recent Items | Auto-populated, max 5 items, most recent first |

---

## Sidebar Features

### Pinned Items
- User can pin any navigation item to favorites
- Pinned items appear in a "Favorites" group at the top
- Max 10 pinned items
- Drag to reorder pinned items
- Pin/unpin via right-click context menu or drag to favorites group

### Recent Items
- Last 5 visited pages are automatically tracked
- Displayed in a "Recent" group below pinned items
- Click to revisit
- Cleared on explicit "Clear recent" action

### Favorites
- User-defined set of frequently used navigation items
- Appears as a dedicated group
- Items can be dragged into and out of favorites
- Favorites sync across devices (via user preferences)

### Workspace Navigation
- Quick switch between workspaces or views
- Show workspaces as collapsible groups
- Each workspace has its own set of items

---

## Adaptive Mobile Version

On mobile devices (<768px), the sidebar transforms:

| Feature | Desktop | Mobile |
|---------|---------|--------|
| Visibility | Persistent left rail | Hidden, triggered by hamburger |
| Width | 240px (expanded), 64px (collapsed) | 280px (full drawer) |
| Interaction | Hover + click | Touch + swipe |
| Navigation | Sidebar items | Bottom tab bar (5-7 items) |
| Groups | Visible | Collapsed by default |
| Labels | Always visible (expanded) | Always visible |
| Avatar | Bottom section | Top of drawer |
| Backdrop | None | Dark overlay |
| Close method | Toggle button | Swipe, backdrop click, Escape |

---

## Sidebar Animation Rules

| Transition | Duration | Easing |
|------------|----------|--------|
| Expand/collapse width | 250ms | ease-in-out |
| Mobile drawer open | 300ms | ease-out |
| Mobile drawer close | 200ms | ease-in |
| Item hover | 50ms | linear |
| Group expand | 200ms | ease-out |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Navigation/Primary-Navigation.md](../Navigation/Primary-Navigation.md) | Primary navigation model |
| [Navigation/Keyboard-Navigation.md](../Navigation/Keyboard-Navigation.md) | Keyboard navigation for sidebar |
| [Responsive/Mobile.md](../Responsive/Mobile.md) | Mobile sidebar behavior |
| [Accessibility/Focus-Order.md](../Accessibility/Focus-Order.md) | Focus order within sidebar |

---

*The sidebar is the primary navigation surface. It adapts to every device and user preference while maintaining consistent access to all modules.*
