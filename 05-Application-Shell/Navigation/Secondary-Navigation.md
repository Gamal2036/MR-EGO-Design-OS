# Secondary Navigation

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Tabs.md](../../04-Component-Library/Navigation/Tabs.md), [SidebarGroup.md](../../04-Component-Library/Navigation/SidebarGroup.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 10)

---

## Purpose

Defines secondary navigation — how users navigate within a module or section after arriving via primary navigation.

---

## Secondary Navigation Types

### Module Tabs
Top-level tabs within a module that define its sub-sections.

```
[Dashboard] [Activity] [Reports] [Settings]
```

- Rendered below the header, above content
- Uses the Tabs component (Primary variant)
- Each tab represents a sub-section of the current module
- Active tab is visually indicated with underline or filled style

### Sidebar Groups
Collapsible groups within the sidebar that organize sub-items.

```
▼ Dashboard
  ├── Overview
  ├── Activity Feed
  └── Reports

▼ Jobs
  ├── Discover
  ├── Applications
  └── Saved
```

- Uses SidebarGroup component
- Groups are collapsible (click to expand/collapse)
- Active group is expanded by default
- Sub-items are indented below the group label

### Sub-Navigation Rail
A secondary rail within the content area for sub-navigation.

- Used in data-dense modules (Documents, Analytics)
- Appears as a narrow vertical strip on the left of the content area
- Contains sub-section icons or compact labels
- Collapsible to save space

---

## Secondary Navigation Rules

| Rule | Description |
|------|-------------|
| One level deep | Secondary navigation has at most one level of nesting |
| Module consistency | Each module uses the same secondary navigation pattern throughout |
| No orphan sections | Every section has a secondary navigation entry when there are 3+ sub-sections |
| Active indication | Current sub-section is always visually indicated |
| Breadcrumb sync | Secondary navigation selection syncs with breadcrumb |
| Mobile adaptation | Tabs become scrollable or collapse to dropdown on mobile |

---

## Secondary Navigation Responsive Behavior

| Device | Behavior |
|--------|----------|
| Desktop | Full tab bar or sidebar groups visible |
| Laptop | Full tab bar. Sidebar groups visible if sidebar is expanded. |
| Tablet | Tabs: scrollable without overflow menu. Groups: accessible via overlay. |
| Mobile | Tabs: overflow menu. Groups: accessible via hamburger drawer. |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Primary-Navigation.md](Primary-Navigation.md) | Parent navigation level |
| [Context-Navigation.md](Context-Navigation.md) | Navigation within content |
| [Breadcrumb-Strategy.md](Breadcrumb-Strategy.md) | Location indicator synced with navigation |

---

*Secondary navigation provides structure within modules. It is consistent across the platform while allowing module-specific organization.*
