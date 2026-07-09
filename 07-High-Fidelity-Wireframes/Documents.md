# Documents — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:IA (Documents), DP-1:All

---

## Purpose

Central document management for cover letters, portfolios, reference files, and uploaded materials. Grid and list views with folder organization, search, and preview.

---

## Layout Overview

```
┌──────────┬────────────────────────────────────────────────────┐
│          │  TOPBAR (56px)                                     │
│          │  ← Documents                       Search  ⋮     │
│ SIDEBAR  ├────────────────────────────────────────────────────┤
│ (240px)  │  CONTENT                                           │
│          │                                                    │
│  PAGE HEADER                                                  │
│  "Documents"                                [+ Upload]       │
│                                                    │
│  FOLDER TABS OR SIDEBAR                                      │
│  ┌──────────┬──────────┬──────────┬──────────┐              │
│  │ All Docs │  Cover   │ Portfolio│  Uploads │              │
│  │   (24)   │ Letters  │   (3)    │   (11)   │              │
│  │          │   (10)   │          │          │              │
│  └──────────┴──────────┴──────────┴──────────┘              │
│                                                    │
│  DOCUMENT GRID (4-column desktop)                          │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐              │
│  │ Doc 1  │ │ Doc 2  │ │ Doc 3  │ │ Doc 4  │              │
│  │ icon   │ │ icon   │ │ icon   │ │ icon   │              │
│  │ Title  │ │ Title  │ │ Title  │ │ Title  │              │
│  │ meta   │ │ meta   │ │ meta   │ │ meta   │              │
│  └────────┘ └────────┘ └────────┘ └────────┘              │
│                                                    │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐              │
│  │ Doc 5  │ │ Doc 6  │ │ Doc 7  │ │ Doc 8  │              │
│  └────────┘ └────────┘ └────────┘ └────────┘              │
└──────────────────────────────────────────────────────────────┘
```

---

## 1. Category Tabs

| Property | Value |
|----------|-------|
| Layout | Horizontal scroll tabs |
| Height | 44px |
| Active | Primary-600 text + bottom border |
| Tab padding | Space-3 (8px) Space-4 (12px) |

### Categories: All Documents, Cover Letters, Portfolios, Uploads, Archived

---

## 2. Document Cards (Grid)

| Property | Value |
|----------|-------|
| Card width | 1/4 of container (4 columns) |
| Padding | Space-5 (16px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | Border-Default |
| Hover | Shadow-2, border-hover |

### Card Elements:
| Element | Details |
|---------|---------|
| File icon | 40px x 40px, type-colored (PDF=red, DOCX=blue) |
| File name | Body-Small, 600 weight, truncated to 2 lines |
| File type | Caption, Text-Secondary, "PDF · 2.4 MB" |
| Date | Caption, Text-Secondary, "Updated Jul 5" |
| Actions | ⋮ menu (Download, Rename, Delete, Share) |

---

## 3. Upload Zone (Inline)

| Property | Value |
|----------|-------|
| Trigger | Click "+ Upload" button |
| Zone | Dashed border, 200px x 200px |
| Match theme | Same as CV Builder upload zone |

---

## 4. Document Preview (Modal/Side Panel)

| Property | Value |
|----------|-------|
| Trigger | Click document card |
| Type | Full-size preview panel (right side, 640px) or modal |
| Content | Embedded PDF viewer or text render |
| Header | File name + actions (Download, Delete, Share) |
| Created info | Caption, "Created Jul 5, 2026 · Last modified Jul 7" |

---

## 5. Empty State

| Section | State |
|---------|-------|
| All empty | "No documents yet. Upload your first document." |
| Cover letters | "No cover letters. Create one from the AI Workspace." |
| Portfolio empty | "Add portfolio items to showcase your work." |
| Uploads empty | "Upload files to keep them organized." |

---

## 6. Loading State

| State | Behavior |
|-------|----------|
| Grid loading | 8 skeleton cards (200px h each, shimmer) |
| Preview loading | Skeleton PDF viewer + header bar |

---

## 7. Responsive Behavior

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Document grid | 2 columns | 3 columns | 4 columns |
| Card size | Compact (smaller icon) | Standard | Standard |
| Preview | Full-screen modal | Side panel 480px | Side panel 640px |
| Categories | Horizontal scroll | Full tabs | Full tabs |

---

## 8. AI Integration

| Feature | Behavior |
|---------|----------|
| Smart organization | AI suggests folder categorization |
| Document analysis | AI extracts key info from uploaded docs |
| Cover letter library | AI tracks templates and suggests improvements |
| Search | AI understands natural language: "show cover letters for tech companies" |

---

*Cross-references: DP-6:IA (Documents), DP-6:Pattern, DP-1:All*
