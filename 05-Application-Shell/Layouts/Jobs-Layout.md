# Jobs Layout

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([CRUD-Pattern.md](../../04-Component-Library/Patterns/CRUD-Pattern.md), [Search-Pattern.md](../../04-Component-Library/Patterns/Search-Pattern.md))

---

## Purpose

The Jobs Layout provides a job discovery and application tracking environment — searching, browsing, managing applications, and tracking progress.

---

## Layout Blueprint

```
Workspace (variant: with-sidebar)
├── Header (full variant)
├── Sidebar
├── PrimaryRegion (max-width: full)
│   ├── PageHeader
│   │   ├── PageTitle: "Jobs"
│   │   └── PageActions: [New Application, Import, Export]
│   ├── SearchAndFilterSection
│   │   ├── SearchInput
│   │   └── Filters (status, date, company, etc.)
│   ├── SecondaryNavigation (Tabs)
│   │   ├── Discover
│   │   ├── Applications
│   │   ├── Saved
│   │   └── Archived
│   └── ContentSection
│       └── (tab-dependent content)
│           ├── Discover: DataGrid + StatCards
│           ├── Applications: Kanban board or List view
│           ├── Saved: List with cards
│           └── Archived: DataGrid
├── ContextRegion (optional — job details on selection)
│   └── JobDetailPanel
└── ModalRegion (for Create/Edit Job dialogs)
```

---

## Layout Rules

| Rule | Description |
|------|-------------|
| Tab-based navigation | Sub-sections as tabs within the Jobs module |
| List/board toggle | Applications view can switch between list and kanban |
| Search + filter always visible | Search and filters persist across tab switches |
| Quick entry | "New Application" is always accessible from header |

---

## Responsive Adaptation

| Device | Layout |
|--------|--------|
| Desktop (1280px+) | Tabs visible. Context panel on selection. |
| Laptop (1024-1279px) | Tabs visible. Context panel overlay. |
| Tablet (768-1023px) | Scrollable tabs. Context as bottom sheet. |
| Mobile (<768px) | Tab overflow menu. Context full screen. |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Workspace/Content-Zones.md](../Workspace/Content-Zones.md) | Content zones for search and list views |

---

*The Jobs Layout combines search, tracking, and management into a single cohesive view. It supports the full job application lifecycle.*
