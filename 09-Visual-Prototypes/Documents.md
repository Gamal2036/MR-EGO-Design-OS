# Documents — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Version:** 1.0
**Status:** Production Specification
**Inherits:** DP-0 through DP-8, DP-7:Documents, DP-6:IA (Documents)

---

## Purpose

Complete visual prototype for central document management — cover letters, portfolios, uploads, and archived materials. Grid-based browsing with search, preview, and AI-powered organization. Implementation-ready.

---

## Layout Diagram

```
┌──────────┬──────────────────────────────────────────────────────────────┐
│          │  TOPBAR (56px, glass)                                       │
│          │  ← Documents              Search jobs...   ⋮   [+ Upload]  │
│ SIDEBAR  ├──────────────────────────────────────────────────────────────┤
│ (240px)  │  CONTENT AREA (scrollable, padding Space-8)                 │
│ EXPANDED │                                                              │
│          │  PAGE HEADER                                                 │
│          │  "Documents" (Heading-2, 28px)    total: 24 docs   ☐ Select │
│          │                                                              │
│          │  CATEGORY TABS (44px)                                       │
│          │  ┌──────┬──────────────┬──────────┬─────────┬──────────┐   │
│          │  │ All  │ Cover Letters│Portfolios│ Uploads │ Archived │   │
│          │  │ (24) │    (10)      │   (3)    │  (11)   │   (0)    │   │
│          │  └──────┴──────────────┴──────────┴─────────┴──────────┘   │
│          │                                                              │
│          │  SEARCH BAR (optional, 40px)                                │
│          │  ┌────────────────────────────────────────────────────────┐ │
│          │  │ 🔍 Search documents (AI understands natural language)│ │
│          │  └────────────────────────────────────────────────────────┘ │
│          │                                                              │
│          │  DOCUMENT GRID (4-column desktop, gap Space-5)              │
│          │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│          │  │  ┌────┐  │ │  ┌────┐  │ │  ┌────┐  │ │  ┌────┐  │      │
│          │  │  │icon│  │ │  │icon│  │ │  │icon│  │ │  │icon│  │      │
│          │  │  └────┘  │ │  └────┘  │ │  └────┘  │ │  └────┘  │      │
│          │  │  Filename│ │  Filename│ │  Filename│ │  Filename│      │
│          │  │  PDF · 2MB│ │  DOCX    │ │  PDF ·   │ │  Folder  │      │
│          │  │  Jul 5   │ │  Jun 30  │ │  1.1MB   │ │  Jul 4   │      │
│          │  │  ⋮       │ │  ⋮       │ │  ⋮       │ │  ⋮       │      │
│          │  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│          │                                                              │
│          │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│          │  │  ┌────┐  │ │  ┌────┐  │ │  ┌────┐  │ │  ┌────┐  │      │
│          │  │  │icon│  │ │  │icon│  │ │  │icon│  │ │  │+    │  │      │
│          │  │  └────┘  │ │  └────┘  │ │  └────┘  │ │  │Upload│  │      │
│          │  │  ...     │ │  ...     │ │  ...     │ │  │      │  │      │
│          │  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│          │                                                              │
│          │  PAGINATION (if >12 items)                                  │
│          │  [<] [1] [2] [3] [>]                                        │
└──────────┴──────────────────────────────────────────────────────────────┘
```

---

## Category Tabs

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 44px |
| Gap | Space-2 | 4px |
| Padding per tab | Space-3 Space-4 | 8px 12px |
| Font | Body (Inter 400) | 15px |
| Text default | Neutral-600 | #5B6770 |
| Text hover | Neutral-800 | #2D3748 |
| Text active | Primary-600 | #2563EB |
| Indicator active | 2px bottom border | Primary-600 (#2563EB) |
| Count badge bg | Primary-50 | #EFF6FF |
| Count badge text | Primary-600 | #2563EB |
| Count badge radius | radius-full | 9999px |
| Count badge padding | Space-1 Space-2 | 2px 6px |
| Overflow | Scroll horizontal (mobile) | — |

### Tab Labels
All (24) | Cover Letters (10) | Portfolios (3) | Uploads (11) | Archived (0)

### States

| State | Visual |
|-------|--------|
| Default | Neutral-600 text, no indicator |
| Hover | Neutral-800 text, Surface-1 bg tint |
| Active | Primary-600 text, 2px bottom border |
| Focus | 2px Primary-400 ring offset 2px |
| Disabled | Neutral-300 text, cursor not-allowed |

---

## Search Bar

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 40px |
| Radius | radius-md | 8px |
| Background | Surface-1 | #FFFFFF |
| Border | Border-Default | Neutral-200 (#E5E7EB) |
| Border focus | Primary-500 | #3B82F6 |
| Padding left | Space-4 | 12px |
| Margin bottom | Space-5 | 16px |

**Elements:**
- Search icon: 16px magnifier, Neutral-400 (#9CA3AF)
- Input: Body 14px, placeholder "Search documents (AI understands natural language...)"
- Clear button: × icon, 24px, visible on input
- Submit: Enter key or click search icon

### States

| State | Visual |
|-------|--------|
| Default | Border-Default, Neutral-400 placeholder |
| Hover | Border hover (Neutral-300) |
| Focus | Primary-500 border, 2px ring Primary-400/30 |
| Typing | Standard input, clear button visible |
| AI processing | Pulsing sparkle icon right, "AI searching..." |
| Results loaded | Count: "8 results for 'cover letter'" |

---

## Document Grid

| Property | Token | Value |
|----------|-------|-------|
| Column count | — | 4 (desktop) |
| Gap | Space-5 | 16px |
| Padding bottom | Space-7 | 24px |

### Document Card

| Property | Token | Value |
|----------|-------|-------|
| Padding | Space-5 | 16px |
| Radius | radius-md | 8px |
| Background | Surface-1 | #FFFFFF |
| Border | Border-Default | Neutral-200 (#E5E7EB) |
| Shadow | Elevation-1 | Shadow-1 |
| Hover transform | translateY(-2px) | 200ms ease |
| Min height | — | 180px |

### Card Layout

```
┌──────────────────────┐
│       ┌────┐         │
│       │icon│         │
│       │40px│         │
│       └────┘         │
│                      │
│  Filename (Body-     │
│  Small/600, 2 lines  │
│  truncated)           │
│                      │
│  PDF · 2.4 MB        │
│  Updated Jul 5, 2026 │
│                      │
│             ⋮        │
└──────────────────────┘
```

### Card Elements

| Element | Spec |
|---------|------|
| File icon | 40px × 40px, radius-sm, type-colored background tint |
| **Icon colors by type:** | |
| PDF | Danger-100 bg (#FEE2E2), Danger-500 icon (#EF4444) |
| DOCX | Primary-100 bg (#DBEAFE), Primary-500 icon (#3B82F6) |
| Image | Success-100 bg (#D1FAE5), Success-500 icon (#10B981) |
| Text/MD | Neutral-100 bg (#F3F4F6), Neutral-500 icon (#6B7280) |
| Folder | Warning-100 bg (#FEF3C7), Warning-500 icon (#F59E0B) |
| Other | Neutral-100 bg, Neutral-400 icon |
| Filename | Body-Small 14px, weight 600, Text-Primary, 2-line truncation with ellipsis |
| File type | Caption 13px, Text-Secondary — "PDF · 2.4 MB" |
| Date | Caption 13px, Text-Secondary — "Updated Jul 5, 2026" |
| Actions (⋮) | Icon button 24px, triggers dropdown (Elevation-3, Shadow-3) |

### Action Menu Items

| Action | Behavior |
|--------|----------|
| Download | Triggers file download |
| Rename | Inline text edit on filename |
| Delete | Confirmation dialog ("Delete [filename]?" + [Cancel] [Delete]) |
| Share | Share dialog with link generation |
| Move to | Sub-menu with category list |
| AI Analyze | Opens AI analysis panel |

### Card States

| State | Visual |
|-------|--------|
| Default | Surface-1 bg, Border-Default, Shadow-1 |
| Hover | translateY(-2px), Shadow-2, Primary-200 border (#BFDBFE) |
| Focus | 2px Primary-400 ring offset 2px |
| Selected | Primary-50 bg (#EFF6FF), Primary-300 border (#93C5FD) |
| Drag | Shadow-4, opacity 0.85, rotate(-3deg), scale(1.02) |
| Drag over | Primary-100 bg, Primary-400 dashed border |

---

## Upload Zone (Inline)

| Property | Token | Value |
|----------|-------|-------|
| Width | — | 1fr (same as card) |
| Height | — | 180px |
| Border | 2px dashed | Neutral-300 (#D1D5DB) |
| Radius | radius-md | 8px |
| Background | Surface-0 | #F9FAFB |
| Hover bg | Primary-50 | #EFF6FF |
| Hover border | Primary-400 | #93C5FD |

**Elements:**
- Upload icon: 32px, Neutral-400, hover Primary-500
- Label: Body-Small 14px, "Drop files here or click to upload"
- Caption: Caption 13px, "Supports PDF, DOCX, images up to 25MB"

### States

| State | Visual |
|-------|--------|
| Default | Dashed Neutral-300 border, Neutral-400 text |
| Hover | Dashed Primary-400 border, Primary-50 bg |
| Drag over | Solid Primary-500 border, Primary-100 bg, scale(1.02) |
| Uploading | Progress indicator (circular 32px), "Uploading..." |
| Success | Brief green flash, card appears in grid |
| Error | Danger-500 border, "Upload failed" + [Retry] |
| File too large | Danger-500 border, "File exceeds 25MB limit" |

---

## Preview Panel

| Property | Token | Value |
|----------|-------|-------|
| Width (desktop) | — | 640px right panel |
| Width (tablet) | — | 480px right panel |
| Mobile | Full-screen modal | Slide up |
| Background | Surface-1 | #FFFFFF |
| Border left | Border-Default | Neutral-200 |
| Shadow (modal) | Elevation-3 | Shadow-3 |
| Animation | Slide in from right (panel), slide up (modal) | 300ms ease-out |

### Preview Header

| Element | Spec |
|---------|------|
| File name | Body 15px, 600 weight, ellipsis on overflow |
| File type badge | Caption, type-colored bg + text |
| Close button | × icon, 32px hit target |
| Actions row | Download, Delete, Share, ⋮ (icon buttons, 32px) |
| Border bottom | Border-Default |
| Height | 56px |

### Preview Content

| File Type | Renderer |
|-----------|----------|
| PDF | Embedded PDF viewer (iframe or canvas) with page controls |
| DOCX | Rendered HTML conversion |
| Image | Full-size image with zoom controls |
| Text/MD | Syntax-highlighted render with line numbers |
| Unsupported | "Preview not available" + download prompt |

### Preview Footer (if applicable)

| Element | Spec |
|---------|------|
| Page count | Caption, "Page 3 of 12" (PDF) |
| Zoom controls | + / - buttons, zoom % label |
| AI summary | "AI Analysis" button, opens overlay with extracted info |

---

## Empty States (Per Category)

| Category | Illustration | Title | Description | CTA |
|----------|-------------|-------|-------------|-----|
| All | Document/box 140px | "No documents yet" | "Upload your first document to get started" | [+ Upload] |
| Cover Letters | Letter/envelope | "No cover letters" | "Create a cover letter from the AI Workspace" | [Create One] |
| Portfolios | Portfolio/briefcase | "No portfolio items" | "Add projects and work samples to showcase your skills" | [Add Project] |
| Uploads | Upload/cloud 140px | "No uploads" | "Upload files like certificates, transcripts, or references" | [+ Upload] |
| Archived | Archive box | "No archived documents" | "Archive documents you want to keep but don't need active" | — |

---

## Loading State

| Element | Skeleton | Behavior |
|---------|----------|----------|
| Category tabs | 5 pill skeletons, 60px wide | <400ms |
| Grid (initial) | 8 card skeletons, 180px × 180px | stagger 80ms per card |
| Card skeleton | Icon circle 40px, 2 text lines (60%, 40%), caption line (30%) | shimmer 1.5s |
| Preview panel | Full panel skeleton with header bar + page rect | <800ms |
| Search results | Previous results fade (0.5 opacity), new skeletons appear | 300ms crossfade |

---

## Error State

| Scenario | Visual | Action |
|----------|--------|--------|
| Grid load fail | Inline error: icon + "Could not load [category]" + [Retry] | Retry per category |
| Upload fail | Card-level: red banner "Upload failed" + [Retry] [Dismiss] | Retry individual |
| Preview fail | "Preview unavailable" placeholder + [Download instead] | Download fallback |
| Delete fail | Toast: "Could not delete [filename]. Please try again." | Toast dismiss |
| Search fail | "Search failed" state below search bar + [Try Again] | — |

---

## Offline State

| Element | Behavior |
|---------|----------|
| Banner | "Working offline — documents cached from [time]" |
| Grid | Cached documents shown with grey border indicator |
| Upload | Disabled, tooltip "Uploads unavailable offline" |
| Preview | Cached files previewable, new downloads disabled |
| AI search | "AI search unavailable offline" message |
| Actions | Edit/delete disabled, download cached files allowed |

---

## Motion & Animation

### Card Entry
| Property | Value |
|----------|-------|
| Initial | translateY(20px), opacity 0 |
| Active | translateY(0), opacity 1 |
| Duration | 350ms |
| Easing | cubic-bezier(0.16, 1, 0.3, 1) |
| Stagger | 60ms per card (row by row) |

### Card Exit (Delete/Archive)
| Property | Value |
|----------|-------|
| Transform | scale(0.9) + opacity 0 |
| Duration | 200ms |
| Easing | ease-in |

### Upload Progress
| Property | Value |
|----------|-------|
| Zone border | Dashed → solid animation |
| Progress | Circular determinate, 400ms transition per % change |
| Completion | Green flash 300ms, card slides in from zone |

### Preview Entry
| Property | Value |
|----------|-------|
| Desktop | translateX(640px) → 0, 300ms ease-out |
| Modal | translateY(100%) → 0, 350ms ease-out |
| Close | Reverse animation, 250ms |

### Drag and Drop
| Property | Value |
|----------|-------|
| Drag start | Scale 1.02, Shadow-4, 200ms |
| Drag over zone | Primary border glow, 150ms |
| Drop | Scale bounce (1.05 → 1), 300ms spring |
| Reorder | translateY animation, 200ms |

---

## Responsive Behavior

| Element | Mobile (<768px) | Tablet (768–1023px) | Desktop (1280px+) |
|---------|-----------------|---------------------|-------------------|
| Grid columns | 2 columns | 3 columns | 4 columns |
| Card size | Compact (140px h, 36px icon) | Standard (180px h) | Standard (180px h) |
| Card padding | Space-4 (12px) | Space-5 (16px) | Space-5 (16px) |
| Preview | Full-screen modal (slide up) | Side panel 480px | Side panel 640px |
| Category tabs | Horizontal scroll | Full visible | Full visible |
| Search bar | Below tabs, full width | 400px max | 480px max |
| Upload trigger | FAB button bottom-right | Inline card + FAB | Inline card |
| Action menu | Bottom sheet | Dropdown | Dropdown |
| Content padding | Space-5 (16px) | Space-7 (24px) | Space-8 (32px) |
| AI summary | Collapsible section below grid | Right drawer | Inline section |

---

## Visual Hierarchy

1. **Primary Focus:** Category tabs — highest contrast, determines visible content
2. **Secondary Focus:** Document cards — filename + file icon (first scan targets)
3. **Tertiary Focus:** Upload zone — last card slot, dashed border draws attention
4. **Supporting:** Search bar, action menus, pagination

### Eye Movement
```
Category Tabs → [scan horizontally]
    ↓
Search Bar (when visible) → [optional]
    ↓
Grid: Row 1 → Row 2 → Row 3 (left to right, top to bottom)
    ↓
Upload Zone → [last card, peripheral action]
    ↓
Pagination (if present) → [bottom]
```

---

## Accessibility

| Element | Role | ARIA |
|---------|------|------|
| Category tabs | `role="tablist"`, children `role="tab"` | `aria-selected`, `aria-controls`, `aria-label="[category] documents"` |
| Tab panel | `role="tabpanel"` | `aria-labelledby` |
| Document cards | `role="article"` | `aria-label="[filename] [filetype] document"` |
| File icon | `role="img"` | `aria-label="[filetype] file"` |
| Card actions | `role="menu"` | `aria-label="Actions for [filename]"` |
| Search input | `role="searchbox"` | `aria-label="Search documents"` |
| Preview panel | `role="dialog"` (modal) / `role="region"` (panel) | `aria-label="Document preview"` |
| Upload zone | `role="button"` | `aria-label="Upload new document"` |
| Progress indicator | `role="progressbar"` | `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"` |
| Empty state | `role="region"` | `aria-label="No documents in [category]"` |
| Error state | `role="alert"` | `aria-live="assertive"` |
| Item count | `aria-live="polite"` | Announces count changes |
| AI search status | `role="status"` | `aria-live="polite"` |

### Keyboard Navigation Table

| Key | Context | Action |
|-----|---------|--------|
| Tab | Global | Cycle: Tabs → Search → Grid → Pagination → Topbar |
| Shift+Tab | Global | Reverse focus |
| Left/Right | Category tabs | Switch categories |
| Arrow keys | Grid | Navigate cards in 2D grid |
| Tab | Card focused | Card action → ⋮ menu items |
| Enter / Space | Card focused | Open preview |
| Enter | Upload zone | Trigger file picker |
| Delete | Card focused | Delete (with confirmation) |
| Escape | Preview | Close preview |
| Escape | Menu | Close context menu |
| Ctrl/Cmd+F | Global | Focus search bar |
| / | Global | Focus search bar |
| Ctrl/Cmd+K | Global | Command palette |

---

## AI Integration

| Feature | Location | Behavior | Trigger |
|---------|----------|----------|---------|
| Smart categorization | Background | AI suggests category when uploading ("This looks like a cover letter") | On upload |
| Document analysis | Preview | AI extracts key info: skills mentioned, dates, key terms | On preview open |
| Natural language search | Search bar | "show cover letters for tech companies" → filters correctly | On Enter |
| Auto-tagging | Card metadata | AI generates tags: "resume", "frontend", "2026" | On upload |
| Similarity matching | Preview footer | "This document is similar to [other doc]" | On preview |
| Content summary | Preview header | AI-generated 1-paragraph summary of document | On preview |
| Cover letter versioning | Cover Letters tab | AI tracks versions, suggests improvements | Tab visit |
| Duplicate detection | Upload | "This file appears to be a duplicate of [existing]" | On upload |
| Empty state prompt | Empty categories | AI personalized message based on user profile | Empty state render |
| Smart naming | Upload | AI suggests filename "[Company] Cover Letter Jul 2026" | On upload |

### AI State Indicators
| State | Visual |
|-------|--------|
| Processing | Sparkle icon pulse animation, Caption "AI analyzing..." |
| Complete | Sparkle solid, Caption "AI analysis ready" |
| Error | Sparkle ×, Caption "AI unavailable" |
| Offline | Grey sparkle, "AI offline" |

---

## Future Expansion

| Feature | Phase |
|---------|-------|
| Folder/subfolder organization (nested) | Phase 3 |
| Drag-and-drop reorder within categories | Phase 2 |
| Batch selection and operations (multi-select) | Phase 2 |
| Version history with diff view | Phase 4 |
| Document sharing with external links | Phase 3 |
| AI-powered template library | Phase 4 |
| Direct scan from mobile (OCR) | Phase 5 |
| Document expiration reminders (certifications) | Phase 4 |
| Advanced filters (date range, size, type) | Phase 2 |
| Integration with Google Drive / Dropbox | Phase 6 |
| Collaborative document review (feedback) | Phase 5 |

---

*Cross-references: DP-7:Documents, DP-6:IA (Documents), DP-1:All, DP-8:All*
