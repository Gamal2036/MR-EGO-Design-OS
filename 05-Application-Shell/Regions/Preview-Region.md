# Preview Region

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([DocumentPreview.md](../../04-Component-Library/Documents/DocumentPreview.md), [ImagePreview.md](../../04-Component-Library/Documents/ImagePreview.md))

---

## Purpose

The Preview Region provides a content preview surface for documents, images, and other viewable content without opening them in full-page view.

---

## Composition

```
PreviewRegion
├── PreviewToolbar
│   ├── Zoom controls
│   ├── Fullscreen toggle
│   └── Download button
└── PreviewBody
    └── (DocumentPreview, ImagePreview, or custom preview)
```

---

## Behavior

| Behavior | Description |
|----------|-------------|
| Hover preview | Hover over a file shows quick preview tooltip |
| Click preview | Clicking a file opens it in the Preview Region |
| Position | Right of Content List (Documents), or overlay |
| Fullscreen | Button to open preview in full-screen mode |
| Responsive | On mobile, preview opens as full-screen overlay |

---

## Preview Formats

| Format | Preview Component | Notes |
|--------|------------------|-------|
| PDF | DocumentPreview | Page-by-page, zoom |
| Image | ImagePreview | Zoom, pan, rotate |
| Document (docx) | DocumentPreview | Text extraction |
| Spreadsheet | DocumentPreview | First sheet preview |
| Code | Syntax-highlighted | Line numbers, copy |
| Markdown | Rendered preview | WYSIWYG |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Layouts/Documents-Layout.md](../Layouts/Documents-Layout.md) | Documents layout uses preview region |

---

*The Preview Region allows users to view content without navigating away from their current context. It supports quick preview and detailed inspection.*
