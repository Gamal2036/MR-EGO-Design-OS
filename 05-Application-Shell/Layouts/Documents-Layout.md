# Documents Layout

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Upload-Pattern.md](../../04-Component-Library/Patterns/Upload-Pattern.md), [Search-Pattern.md](../../04-Component-Library/Patterns/Search-Pattern.md))

---

## Purpose

The Documents Layout provides a complete document management environment — browsing, searching, previewing, uploading, and organizing documents.

---

## Layout Blueprint

```
Workspace (variant: with-sidebar)
├── Header (full variant)
├── Sidebar
├── PrimaryRegion (max-width: full)
│   ├── PageHeader
│   │   ├── PageTitle: "Documents"
│   │   └── PageActions: [Upload, New Folder, Share]
│   ├── SearchSection
│   │   └── SearchInput + Filters
│   ├── ContentSection
│   │   └── SplitView (60/40)
│   │       ├── FileList (DataGrid or List with file cards)
│   │       └── PreviewPane (DocumentPreview / ImagePreview)
│   └── PaginationSection (if needed)
└── ContextRegion (optional — file details on selection)
```

---

## Layout Rules

| Rule | Description |
|------|-------------|
| List + preview | Default view shows file list with preview pane |
| Preview replaces list on mobile | On mobile, preview becomes full screen |
| Search first | Search and filters are always visible at top |
| Drag and drop | Entire layout supports drag-and-drop upload |

---

## Responsive Adaptation

| Device | Layout |
|--------|--------|
| Desktop (1280px+) | List (40%) + Preview (60%) side by side |
| Laptop (1024-1279px) | List (35%) + Preview (65%) |
| Tablet (768-1023px) | List only. Preview opens on click (overlay). |
| Mobile (<768px) | List only. Preview opens full screen. |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Regions/Preview-Region.md](../Regions/Preview-Region.md) | Preview region used in documents layout |

---

*The Documents Layout provides efficient document browsing and management. It adapts from power-user list+preview on desktop to simple file browsing on mobile.*
