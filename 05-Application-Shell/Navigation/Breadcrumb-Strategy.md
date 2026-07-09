# Breadcrumb Strategy

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Breadcrumb.md](../../04-Component-Library/Navigation/Breadcrumb.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 10)

---

## Purpose

Defines the breadcrumb strategy — how hierarchical location is communicated to the user throughout the workspace.

---

## Breadcrumb Structure

### Hierarchy
```
Home > Module > Section > Sub-section > Current Page
```

| Level | Example |
|-------|---------|
| Home | Dashboard (icon) |
| Module | Jobs |
| Section | Applications |
| Sub-section | Applied |
| Current page | Senior Developer Application |

### Maximum Depth
- Desktop: up to 5 levels before collapsing
- Tablet: up to 4 levels before collapsing
- Mobile: up to 2 levels (parent + current) with back button

### Collapse Behavior
- When the trail exceeds the maximum, middle items collapse into a "..." dropdown
- The first (Home) and last (Current) items are always visible
- The dropdown shows all collapsed items with hover preview

---

## Breadcrumb Integration

| Context | Breadcrumb Source | Variant |
|---------|------------------|---------|
| Standard pages | Route hierarchy | default |
| Dashboard | Home only | small |
| Document viewer | Folder path + document name | with-back |
| Wizard | Step progress | default (replaced by Stepper) |
| Settings | Section name | default |
| Profile | Profile section | default |

---

## Breadcrumb Rules

| Rule | Description |
|------|-------------|
| Always visible | Breadcrumb is visible on every page below the top level |
| Home link | First item is always the Dashboard/Home link |
| Current bold | Current page is rendered as bold text (not a link) |
| Clickable parents | All parent items are clickable links |
| Arrow separators | Chevron characters separate each level |
| Back button | Mobile shows a back button before the breadcrumb |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Primary-Navigation.md](Primary-Navigation.md) | Breadcrumb syncs with primary navigation |
| [Secondary-Navigation.md](Secondary-Navigation.md) | Breadcrumb syncs with secondary navigation |
| [Header-Architecture.md](../Header/Header-Architecture.md) | Breadcrumb lives in the header |

---

*The breadcrumb strategy ensures users always know where they are and how to return to higher levels. It implements UX Constitution Rule 10.*
