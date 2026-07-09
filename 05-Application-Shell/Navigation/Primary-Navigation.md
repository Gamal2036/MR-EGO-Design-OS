# Primary Navigation

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Sidebar.md](../../04-Component-Library/Navigation/Sidebar.md), [NavigationRail.md](../../04-Component-Library/Navigation/NavigationRail.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rules 10, 16)

---

## Purpose

Defines the primary navigation model — how users move between the major sections and modules of MR:EGO.

---

## Navigation Components

| Component | Role | Device |
|-----------|------|--------|
| Sidebar | Full primary navigation with labels | Desktop, tablet |
| NavigationRail | Compact icon-only navigation | Desktop (focus mode), tablet |
| BottomTabBar | Mobile primary navigation | Mobile |
| CommandPalette | Keyboard-driven navigation | All devices |

---

## Navigation Structure

### Top-Level Items
The primary navigation items that are always present:

| Item | Icon | Module | Keyboard Shortcut |
|------|------|--------|-------------------|
| Dashboard | home | Core | Ctrl+1 |
| Jobs | briefcase | Core | Ctrl+2 |
| AI Workspace | sparkles | Core | Ctrl+3 |
| Documents | file | Core | Ctrl+4 |
| CRM | users | Core | Ctrl+5 |
| Analytics | chart-bar | Core | Ctrl+6 |
| Settings | gear | Core | Ctrl+, |

### Module-Registered Items
Modules register additional primary navigation items:

- Each module registers an item with icon, label, and keyboard shortcut
- Module items appear below core items in the sidebar
- Module items are sorted by registration order (user can reorder)
- Disabled modules do not appear in navigation

### Navigation Groups
Related items are grouped under section labels:

- Core (always visible, always at top)
- Workspace (user's personal sections)
- Modules (registered extensions)
- Admin (enterprise admin — visible only to admins)

---

## Navigation Behavior

| Behavior | Description |
|----------|-------------|
| Active state | Current section is visually indicated (accent bar + highlighted icon) |
| Hover state | Item background changes, tooltip appears (collapsed sidebar) |
| Click navigation | Click navigates to the module's default route |
| Right-click menu | Right-click shows context menu with module options |
| Drag reorder | Users can reorder pinned items (customization) |

---

## Primary Navigation Responsive Behavior

| Device | Navigation Mode |
|--------|----------------|
| Desktop (1280px+) | Expanded sidebar (240px), all labels visible |
| Laptop (1024-1279px) | Expanded sidebar (240px) or collapsed (64px) — user preference |
| Tablet (768-1023px) | Collapsed sidebar (64px), overlay on toggle |
| Mobile (<768px) | Bottom tab bar (5-7 items), hamburger opens drawer for all items |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Secondary-Navigation.md](Secondary-Navigation.md) | Sub-navigation within modules |
| [Context-Navigation.md](Context-Navigation.md) | Context-dependent navigation |
| [Sidebar-Architecture.md](../Sidebar/Sidebar-Architecture.md) | Sidebar component configuration |
| [Command-Navigation.md](Command-Navigation.md) | Keyboard-driven navigation |

---

*Primary navigation is the user's map of the application. It is consistent, predictable, and accessible from every screen.*
