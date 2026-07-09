# Uploads

**Phase:** DP-2 (Design System)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md), [Elevation-System.md](../../02-Design-Language/Elevation-System.md), [Motion-System.md](../../02-Design-Language/Motion-System.md), [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md))

---

## Purpose

Upload components handle file intake — from selection through transfer to confirmation. They provide clear feedback at every stage and handle errors gracefully with retry options.

---

## When to Use

- Uploading documents (resumes, cover letters, portfolios)
- Adding images (profile photos, document previews)
- Importing data files (CSV, JSON exports from other platforms)
- Attaching files to messages or records
- Bulk document upload

## When NOT to Use

- Simple text input — use text input
- File selection only (no upload) — use native file input
- Linking to external files — use link or attachment component
- Generated documents (saved automatically) — use confirmation feedback

---

## Variants

### Upload Zone

Full drop target area for file upload.

| Property | Value |
|----------|-------|
| Min height | 180px |
| Border | Dashed border, Border-Default (2px) |
| Border radius | Radius-Md (8px) |
| Background | Surface-1 |
| Padding | 32px |
| Layout | Centered content (icon + label + hint) |

| State | Visual |
|-------|--------|
| Default | Dashed border, upload icon (24px), "Drop files here or click to upload" |
| Hover/Drag over | Border becomes Primary-500 solid, background Primary-50, "Drop to upload" |
| Active drag | Same as hover + slight scale (1.01) |
| Disabled | 0.4 opacity, not-allowed cursor |
| Has files | File previews appear within zone |
| Error | Border-Danger, error message below |

### Drag Drop

Inline drag-drop support on any surface.

| Property | Value |
|----------|-------|
| Scope | Entire page, specific container, or upload zone |
| Visual feedback | Dashed overlay appears when file is dragged over valid area |
| Overlay | Semi-transparent primary tint, upload icon centered |
| File types | Declared accepted types (e.g., .pdf, .docx, .png) |
| Max files | Configurable (default: unlimited for documents, 10 for images) |
| Max size | Configurable (default: 25MB per file) |
| Combined max | Configurable (default: 100MB total) |

### Document Preview

Thumbnail or icon representation of uploaded file.

| Type | Preview |
|------|---------|
| PDF | Page thumbnail (first page rendered as image, 140x180px) |
| DOCX/DOC | Document icon (Primary-500, 40x48px) + filename |
| Image | Image thumbnail (cropped to 140x140px square) |
| Spreadsheet | Spreadsheet icon (Success-500, 40x48px) + filename |
| CSV | CSV icon (Warning-500 icon) + filename |
| Other | Generic file icon + extension label |

| Property | Value |
|----------|-------|
| Container | 140x140px (square) or 140x180px (document) |
| Background | Neutral-100 |
| Border radius | Radius-Sm (4px) |
| File name | Caption (13px), truncated, below preview |
| File size | Caption (12px), Text-Secondary, below filename |
| Remove button | X icon, top-right corner |
| Status overlay | Progress bar or checkmark overlay during upload |

### Image Preview

Large image preview for photos and graphics.

| Property | Value |
|----------|-------|
| Max width | 100% of container |
| Max height | 400px |
| Aspect ratio | Maintained (object-fit contain) |
| Border radius | Radius-Md (8px) |
| Background | Neutral-100 (for transparent images) |
| Zoom | Click to view full size in modal |
| Actions | Replace, Remove, Download |

### Upload Progress

Per-file and total upload progress indication.

| Element | Specification |
|---------|---------------|
| Progress bar | Determinate, 4px height, Primary-500 fill |
| Percentage | "45%" text beside or above bar |
| File name | Current file being uploaded |
| Speed | Optional "2.4 MB/s" |
| Remaining | Optional "About 30 seconds remaining" |
| Cancel | X button to cancel individual file |
| Complete | Checkmark icon, green |

### Upload Errors

Clear error states with recovery actions.

| Error | Message | Action |
|-------|---------|--------|
| File too large | "[filename] exceeds the maximum file size (25MB)." | "Choose smaller file" |
| Wrong type | "[filename] is not a supported file type. Accepted: PDF, DOCX, PNG" | "Choose different file" |
| Network error | "Upload failed due to network error." | "Retry" |
| Virus detected | "[filename] was blocked for security reasons." | (none, contact support) |
| Duplicate file | "[filename] has already been uploaded." | "Replace" or "Skip" |
| Server error | "Upload failed. Please try again." | "Retry" |

### Retry

Recovery action for failed uploads.

| Element | Specification |
|---------|---------------|
| Visual | Red error indicator on failed file |
| Action | "Retry" button (icon button, refresh icon) |
| Batch retry | "Retry all" for multiple failed files |
| Dismiss | Remove failed file from queue |
| Order | Retry maintains original file order |

---

## Upload Anatomy

```
Upload Zone (default):
┌──────────────────────────────────────────┐
│                                          │
│          ☁️ Upload files                  │
│     Drop files here or click to upload   │
│         PDF, DOCX, PNG — Max 25MB        │
│                                          │
└──────────────────────────────────────────┘

Files in Queue:
┌──────────────────────────────────────────┐
│  [📄] resume.pdf             [✕]         │
│  ████████████████░░░░░░  72%            │
├──────────────────────────────────────────┤
│  [📄] cover-letter.docx     [✕]  ✓      │
│  ████████████████████████  100%         │
├──────────────────────────────────────────┤
│  [🖼] headshot.png          [✕]         │
│  ❌ File exceeds 25MB limit              │
│  [Choose smaller file]                   │
└──────────────────────────────────────────┘
```

---

## Spacing

| Context | Value | Token |
|---------|-------|-------|
| Upload zone padding | 32px | Space-8 |
| Upload zone icon to text | 16px | Space-5 |
| Upload zone text to hints | 8px | Space-3 |
| Between file items | 8px | Space-3 |
| File item padding | 12px 16px | Space-4 Space-5 |
| File icon to name | 12px | Space-4 |
| File name to size | 4px | Space-2 |
| Progress bar height | 4px | Space-1 |
| Preview item gap | 16px | Space-5 |
| Remove button margin | 4px | Space-2 |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Upload zone | `role="button"`, keyboard activatable (Enter/Space) |
| Drag overlay | `aria-hidden="true"` (decorative overlay) |
| File name | File name read by screen reader |
| Progress | `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| Error message | `aria-live="polite"` for upload errors |
| Complete | `aria-live="polite"` "Upload complete" |
| Cancel button | `aria-label="Cancel upload [filename]"` |
| Retry button | `aria-label="Retry upload [filename]"` |
| File type validation | Announced when file is rejected |
| Drop zone | Accepts keyboard file selection through file dialog |

---

## Responsive Behavior

| Breakpoint | Change |
|------------|--------|
| Mobile (<768px) | Upload zone full-width. Reduced height (140px). Dragging not supported — tap to select only. |
| Tablet (768-1023px) | Standard upload zone. Both drag and tap. |
| Desktop (1024px+) | Full drag-drop support. Side-by-side file previews. |

---

## Future Expansion

- **Bulk upload** — Multi-folder selection, entire directory upload
- **Upload from URL** — Import files by pasting a URL
- **Camera capture** — Mobile camera integration for photos
- **Image editor** — Crop, rotate, resize before upload
- **OCR processing** — Text extraction from uploaded images or scanned PDFs
- **Version management** — Upload new version, keep version history
- **Large file upload** — Chunked upload with resume capability

---

## Related Components

- [Forms.md](Forms.md) — File input integration with form fields
- [Loading.md](Loading.md) — Upload progress bar, file processing spinner
- [Cards.md](Cards.md) — Document preview cards
- [Dialogs.md](Dialogs.md) — Image preview modal
- [Feedback.md](Feedback.md) — Upload complete toast, error toast
