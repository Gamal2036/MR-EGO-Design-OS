# CV Builder — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Status:** Design Specification
**Inherits:** DP-0 through DP-8
**Pages Covered:** CV Manager, CV Upload, CV List, CV Editor, CV Optimization

---

## Purpose

Central hub for managing, creating, and optimizing CVs. Users upload their existing CV, receive AI-powered analysis and scoring, edit sections with real-time suggestions, and produce ATS-optimized output.

---

## Layout Overview

```
┌──────────┬──────────────────────────────────────────────────────────┐
│          │  TOPBAR (56px)                                           │
│          │  [Sidebar toggle]  CV Manager                    User    │
│ SIDEBAR  ├──────────────────────────────────────────────────────────┤
│ (240px)  │  CONTENT AREA                                            │
│          │                                                          │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  PAGE HEADER                                       ┌────────┐  │  │
│  │  CV Manager             [Upload New CV] [AI Optimize]        │  │  │
│  │  Body text describing the CV tool.                   └────────┘  │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  UPLOAD ZONE (480px × 200px, centered)                        │  │
│  │  ┌────────────────────────────────────────────────────────┐   │  │
│  │  │              [Upload Icon 40px]                         │   │  │
│  │  │         Upload your CV (PDF, DOCX)                      │   │  │
│  │  │         Drag & drop or click to browse                 │   │  │
│  │  │              [Browse Files]                             │   │  │
│  │  └────────────────────────────────────────────────────────┘   │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  CV LIST                                                     │  │
│  │  ┌────────────────────────────────────────────────────────┐  │  │
│  │  │ [Icon]  Senior Frontend v2.3    Active    Score: 92   │  │  │
│  │  │         v2.3 — Last modified 2 days ago               │  │  │
│  │  │         [View] [Analyze] [Edit] [Download]            │  │  │
│  │  └────────────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────────────┐  │  │
│  │  │ [Icon]  Senior Frontend v2.2              Score: 78   │  │  │
│  │  │         v2.2 — Last modified 2 weeks ago              │  │  │
│  │  │         [View] [Analyze] [Edit] [Download]            │  │  │
│  │  └────────────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  EMPTY STATE (shown when no CVs exist)                        │  │
│  │  ┌────────────────────────────────────────────────────────┐  │  │
│  │  │              [Empty illustration]                       │  │  │
│  │  │         No CVs yet.                                    │  │  │
│  │  │         Upload your first CV to get started.          │  │  │
│  │  │              [Upload Your First CV]                    │  │  │
│  │  └────────────────────────────────────────────────────────┘  │  │
│  │                                                          │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                          │
└──────────────────────────────────────────────────────────────────────┘
```

---

## CV Editor (Split View) Layout

```
┌──────────┬──────────────────────────────────────────────────────────┐
│          │  TOPBAR: ← Back to CV Manager  |  [Save Draft] [Export]  │
│ SIDEBAR  ├─────────────────────┬────────────────────┬───────────────┤
│          │  ORIGINAL (1/2)     │ OPTIMIZED (1/2)   │ AI SUGGESTIONS │
│          │                     │                    │  (320px)       │
│          │  ┌────────────────┐ │ ┌────────────────┐ │ ┌───────────┐  │
│          │  │ Summary        │ │ │ Summary        │ │ │ SUGGESTION │  │
│          │  │ ─────────────  │ │ │ ─────────────  │ │ │ Confidence │  │
│          │  │ Experienced... │ │ │ Results-driven │ │ │ ┌─────────┐│  │
│          │  │                │ │ │                │ │ │ │ Accept  ││  │
│          │  └────────────────┘ │ └────────────────┘ │ │ │ Modify  ││  │
│          │                     │                    │ │ │ Reject  ││  │
│          │  ┌────────────────┐ │ ┌────────────────┐ │ │ └─────────┘│  │
│          │  │ Experience     │ │ │ Experience     │ │ │           │  │
│          │  │ ┌─ Company A ─┐│ │ │ ┌─ Company A ─┐│ │ │ DIFF HIGHLIGHT │
│          │  │ │ Nov 2020 — ││ │ │ │ Nov 2020 — ││ │ │ ┌─────────┐│  │
│          │  │ │ Present    ││ │ │ │ Present    ││ │ │ │ +added   ││  │
│          │  │ └────────────┘│ │ │ └────────────┘│ │ │ │ -removed ││  │
│          │  └────────────────┘ │ └────────────────┘ │ └───────────┘  │
│          └─────────────────────┴────────────────────┴───────────────┘
```

---

## Section 1: Page Header

| Property | Value |
|----------|-------|
| Purpose | Title the page, provide primary actions |
| Priority | P0 — always visible |
| Visual weight | Medium |
| Spacing below | Space-8 (32px) |
| Height | 56px |
| Alignment | Left title + right-aligned buttons |
| Sticky | No (scrolls with page) |

### Elements

| Element | Type | Spec |
|---------|------|------|
| Title | Heading-1 | 36px, 700 weight, 1.15 line-height, Text-Primary |
| Description | Body | 15px, 400 weight, Text-Secondary, margin-top Space-3 (8px) |
| Upload New CV | Button (Primary) | Primary-500 bg, 14px/600 text, 8px left/right padding, radius-md |
| AI Optimize | Button (Secondary) | Outline, Primary-500 border, Neutral-0 bg, 14px/600 text, radius-md |

### States

| State | Behavior |
|-------|----------|
| Default | Full header with all elements visible |
| Scroll | No change (not sticky) |
| Mobile | Title shrinks to Heading-3, buttons stack below or become icon-only |
| No CVs | Same header, Upload CTA is primary action |

### Interaction

| Action | Response |
|--------|---------|
| Click Upload New CV | Scroll to upload zone or open file dialog |
| Click AI Optimize | Opens AI panel for optimizing active CV (requires existing CV) |

---

## Section 2: Upload Zone

| Property | Value |
|----------|-------|
| Purpose | Primary CV file upload entry point |
| Priority | P0 |
| Visual weight | Medium — subtle dashed area draws attention without competing |
| Width | 480px (centered) |
| Height | 200px |
| Border | 2px dashed Neutral-300 |
| Border radius | radius-lg (12px) |
| Padding | Space-10 (48px) all sides |
| Background | Neutral-50 |
| Spacing below | Space-8 (32px) |
| Elevation | Layer 0 |

### Elements

| Element | Spec |
|---------|------|
| Icon | Upload icon, 40×40px, Neutral-400 |
| Title | Body (15px/600), Text-Primary, margin-top Space-5 (16px) |
| Description | Caption (13px/400), Text-Secondary, margin-top Space-3 (8px) |
| Browse button | Body-Small (14px/500), Primary-600 text, margin-top Space-5 (16px) |

### States (ordered by transition path)

| State | Visual | Transition |
|-------|--------|------------|
| Default | Dashed border Neutral-300, bg Neutral-50, icon Neutral-400 | — |
| Hover | Dashed border Primary-400, bg Primary-50/30, icon Primary-500 | 200ms ease |
| Drag over | Dashed border Primary-500, bg Primary-50 (tint), icon Primary-600, scale 1.01 | 150ms ease |
| Uploading | Solid border Primary-300, bg Neutral-50, progress bar replaces browse button | Animate-in 300ms |
| Success (file card) | Solid border Success-500, bg Success-50, file icon + name + size + "Uploaded" badge | Card transition 400ms |
| Error | Solid border Error-500, bg Error-50, error icon + message + retry button | Shake animation 300ms |
| Disabled | Opacity 0.5, no-drop cursor | Immediate |
| Offline | "You are offline. CVs will upload when connected." | Immediate |

### Progress Bar (Uploading State)

| Property | Value |
|----------|-------|
| Width | 100% of upload zone |
| Height | 4px |
| Border radius | 2px (full) |
| Background | Neutral-200 |
| Fill | Primary-500 |
| Animation | Smooth linear fill over upload duration |
| Label | "Uploading... 45%" — Caption, Text-Secondary, above bar |

### File Card (Success State)

| Property | Value |
|----------|-------|
| Layout | Horizontal row: [file icon 40px] + [name, size] + [badge] |
| Name | Body (15px/600), Text-Primary |
| Size | Caption (13px/400), Text-Secondary |
| Badge | "Uploaded" — Success-500 text, Success-50 bg, Caption |
| Close button | X icon, 24×24px, Text-Secondary hover → Text-Primary |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | button (entire zone) |
| aria-label | "Upload CV area. Drag and drop or click to browse files." |
| tabindex | 0 |
| onKeyDown | Enter/Space triggers file dialog |
| aria-describedby | Links to description text |
| aria-dropeffect | "copy" |
| aria-busy | true when uploading |
| role="progressbar" | On progress bar element |
| aria-valuenow | Dynamic percentage |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Focus upload zone |
| Enter/Space | Open file dialog |
| Escape | Cancel upload (if uploading) |

---

## Section 3: CV List

| Property | Value |
|----------|-------|
| Purpose | Display all user CVs with actions |
| Priority | P0 |
| Visual weight | High — primary content area |
| Layout | Stacked card list |
| Max items | Unlimited (paginated at 20) |
| Spacing between cards | Space-5 (16px) |

### Card Layout

```
┌──────────────────────────────────────────────────────────────┐
│ [Icon 40px]  Senior Frontend v2.3           Active    Score  │
│              Version 2.3 — Last modified 2 days ago    92    │
│              [View] [Analyze] [Edit] [Download]              │
└──────────────────────────────────────────────────────────────┘
```

### Card Spec

| Property | Value |
|----------|-------|
| Padding | Space-5 (16px) |
| Background | Neutral-0 |
| Border | 1px solid Neutral-200 |
| Border radius | radius-md (8px) |
| Elevation | Layer 1 |
| Hover elevation | Layer 2 (200ms ease) |

### Elements

| Element | Spec |
|---------|------|
| File icon | Document icon, 40×40px, Primary-500 |
| Title | Heading-4 (18px/600) Text-Primary |
| Version | Caption (13px/400) Text-Secondary, inline after title |
| Active badge | "Active" — Success-500 text on Success-50 bg, 6px left/right padding, 2px top/bottom, Caption (13px/600), radius-sm |
| Score | Body (15px/700) Primary-600, right-aligned |
| Date | Caption (13px/400) Text-Secondary |
| Action buttons | Body-Small (14px/500), Primary-600 text, separated by Neutral-300 vertical dividers |

### States

| State | Visual |
|-------|--------|
| Default | Layer 1 elevation, Neutral-200 border |
| Hover | Layer 2 elevation, Primary-100 border 1px |
| Focus-within | Layer 2 elevation, Primary-400 ring 2px |
| Active CV | Primary-100 left border 3px inset |
| Disabled (action) | Opacity 0.4, cursor not-allowed |

### Action Buttons

| Button | Icon | Behavior |
|--------|------|----------|
| View | Eye | Opens read-only preview (no edit) |
| Analyze | Chart | Navigate to CV Analysis report |
| Edit | Pencil | Open CV Editor (split view) |
| Download | Download | Download as PDF/DOCX (drop-down for format) |
| Delete | Trash | Confirm dialog → delete (requires confirmation modal) |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | list for container, listitem per card |
| aria-label | "CV list" |
| aria-sort | On sort controls |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move between cards |
| Enter | Open card for editing |
| Arrow keys | Navigate within card actions |
| Delete | Quick delete with confirmation |

---

## Section 4: CV Editor (Split View)

| Property | Value |
|----------|-------|
| Purpose | Side-by-side original vs optimized editing with AI overlay |
| Priority | P0 |
| Layout | 3-column: Original(1/2) + Optimized(1/2) + AI Panel(320px) |
| Max width | Full content area |
| Min height | 100vh |
| Background | Surface-0 |
| Elevation | Layer 0 |

### Column Specs

| Column | Width | Scroll | Background |
|--------|-------|--------|------------|
| Original | flex 1 (50%) | Independent scroll | Surface-1 |
| Optimized | flex 1 (50%) | Independent scroll | Surface-1 with Primary-50 top border |
| AI Panel | 320px fixed | Independent scroll | Surface-1, left divider Neutral-200 |

### Section Structure (within each editor column)

| Element | Spec |
|---------|------|
| Section header | Body-Small (14px/600), Text-Secondary, uppercase, padding Space-5, sticky top |
| Section content | Body (15px/400), Text-Primary, padding Space-5, line-height 1.6 |
| Divider | 1px solid Neutral-100 between sections |

### AI Suggestion Item

```
┌─────────────────────────────────────┐
│  SUGGESTION                    92%  │  ← Confidence badge
│                                     │
│  Rewrite summary paragraph to       │
│  highlight quantifiable results.    │
│                                     │
│  ┌────────┐ ┌────────┐ ┌────────┐  │
│  │ Accept │ │ Modify │ │ Reject │  │
│  └────────┘ └────────┘ └────────┘  │
└─────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Padding | Space-5 (16px) |
| Border bottom | 1px solid Neutral-100 |
| Hover bg | Neutral-50 |
| Confidence | Badge in Primary-50 bg, Primary-600 text, Caption/600, radius-sm |

### Diff Highlighting

| Type | Color | Style |
|------|-------|-------|
| Added | Success-50 bg | Green left border 3px |
| Removed | Error-50 bg | Red left border 3px, strikethrough text |
| Modified | Warning-50 bg | Amber left border 3px |

### Actions

| Action | Behavior |
|--------|----------|
| Accept | Replace original section with suggestion, animate checkmark, add to change log |
| Modify | Open inline editor pre-filled with suggestion text |
| Reject | Dismiss suggestion, animate slide-out right |
| Save Draft | Save current editor state, toast "Draft saved" |
| Export | Dropdown: PDF / DOCX / TXT / Plain, success toast |

### Accessibility

| Attribute | Value |
|-----------|-------|
| role="region" | Each editor column |
| aria-label | "Original CV" / "Optimized CV" / "AI Suggestions" |
| aria-live="polite" | AI suggestion panel for updates |
| role="tablist" | Section navigation tabs |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move between editor sections |
| Ctrl+S | Save draft |
| A | Accept highlighted suggestion |
| R | Reject highlighted suggestion |
| M | Modify highlighted suggestion |

---

## Section 5: Empty State

| Property | Value |
|----------|-------|
| Purpose | Guide user when no CVs exist |
| Priority | P0 (shown on first visit) |
| Visual weight | High — centered, attention-grabbing |
| Layout | Centered column, 400px max-width |
| Padding top | Space-14 (128px) |
| Spacing below | Space-10 (48px) |

### Elements

| Element | Spec |
|---------|------|
| Illustration | Custom empty-state illustration, 200×160px, centered |
| Title | Heading-3 (22px/600), Text-Primary, margin-top Space-7 (24px) |
| Description | Body (15px/400), Text-Secondary, margin-top Space-3 (8px) |
| CTA Button | Primary-500, "Upload Your First CV", margin-top Space-7 (24px) |
| Secondary link | "Learn about AI optimization" — Primary-600, Caption, margin-top Space-5 (16px) |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | region |
| aria-label | "No CVs yet. Upload your first CV." |

---

## Section 6: AI Integration

| Feature | Description | Priority |
|---------|-------------|----------|
| Analysis on upload | Automatic scan on file drop, returns score + suggestions | P0 |
| Per-section suggestions | Each section gets 3-5 improvement suggestions | P0 |
| Overall score | 0-100 algorithm based on content, keywords, formatting | P0 |
| ATS compatibility | Simulates ATS parsing, flags formatting issues | P1 |
| Keyword gap analysis | Matches CV keywords against target job descriptions | P1 |
| Auto-formatting | Reformat dates, bullet style, section order | P2 |
| Multi-language | Detect language, suggest localization | P2 |

### AI States

| State | Visual |
|-------|--------|
| Idle | No AI indicator visible |
| Analyzing | Skeleton shimmer on analysis panel, pulsing dot in topbar |
| Complete | Results fade in with 400ms stagger |
| Error | Error toast "Analysis failed. Please try again." + retry button |
| Offline | Toast "AI features require an internet connection." |

---

## States Matrix

| State | Upload Zone | CV List | CV Editor | AI Panel |
|-------|-------------|---------|-----------|----------|
| Default | Dashed border, centered | Card list | Split view | Suggestions ready |
| Hover | Primary-400 border | Layer 2 elevation | Section hover bg | Item hover bg |
| Focus | Ring 2px Primary-400 | Ring 2px Primary-400 | Inline editor focused | — |
| Loading | Skeleton zone | Skeleton cards | Skeleton columns | Shimmer lines |
| Empty | Visible upload zone | Empty state shown | N/A (no CV selected) | N/A |
| Error | Error state card | — | Error banner | Error toast |
| Disabled | Opacity 0.5 | Action opacity 0.4 | Read-only mode | Locked |
| Offline | Offline message | Cached CVs only | Cached edit only | Unavailable |
| Uploading | Progress bar | Add card (ghost) | N/A | N/A |

---

## Responsive Behavior

| Breakpoint | Layout | Changes |
|------------|--------|---------|
| >1200px | Full 3-column | Sidebar + content + optional AI panel |
| 900-1200px | 2-column | Sidebar + content, AI panel as overlay |
| 600-900px | Stacked | Sidebar collapsed, editor stacks vertically |
| <600px | Single column | Full-width cards, upload zone 100%, editor full-width with tabs to switch Original/Optimized/AI |
| Mobile | Stacked | CV List becomes swipeable cards, action buttons in bottom sheet |

### Tablet (<900px)

| Element | Change |
|---------|--------|
| Sidebar | Collapsed to icon-only drawer |
| Upload zone | 100% width, reduced height to 160px |
| CV List | 2-column grid of cards |
| CV Editor | Top/bottom split instead of left/right |
| AI Panel | Slide-in drawer from right |

### Mobile (<600px)

| Element | Change |
|---------|--------|
| Topbar | Title centered, all actions in overflow menu |
| Upload zone | 100% width, 140px height, smaller icon 32px |
| CV List | Single column, action buttons hidden behind "..." menu |
| CV Editor | Tab bar to switch between Original/Optimized/AI Suggestions views |
| Page Header | Buttons collapse to icon-only or menu |

---

## Color Tokens Reference

| Element | Light Token | Dark Token |
|---------|-------------|------------|
| Upload zone border (default) | Neutral-300 | Neutral-700 |
| Upload zone border (hover) | Primary-400 | Primary-400 |
| Upload zone border (drag) | Primary-500 | Primary-500 |
| Upload zone bg (drag) | Primary-50 | Primary-950 |
| Upload success border | Success-500 | Success-400 |
| Upload error border | Error-500 | Error-400 |
| Active badge bg | Success-50 | Success-950 |
| Active badge text | Success-500 | Success-400 |
| Score text | Primary-600 | Primary-400 |
| Card border | Neutral-200 | Neutral-700 |
| Card bg | Neutral-0 | Neutral-100 |
| Empty state illustration | Neutral-300 | Neutral-600 |

---

## Typography Reference

| Element | Token | Size | Weight |
|---------|-------|------|--------|
| Page title | Heading-1 | 36px | 700 |
| Card title | Heading-4 | 18px | 600 |
| Description text | Body | 15px | 400 |
| Section labels | Body-Small | 14px | 600 |
| Version/date | Caption | 13px | 400 |
| Action buttons | Body-Small | 14px | 500 |
| Upload title | Body | 15px | 600 |
| Upload description | Caption | 13px | 400 |

---

## Spacing Reference

| Usage | Token | Value |
|-------|-------|-------|
| Page header bottom | Space-8 | 32px |
| Between sections | Space-8 | 32px |
| Card padding | Space-5 | 16px |
| Upload zone padding | Space-10 | 48px |
| Between cards | Space-5 | 16px |
| Icon to text | Space-3 | 8px |
| Action button gap | Space-3 | 8px |
| Empty state top padding | Space-14 | 128px |
| Section bottom in editor | Space-5 | 16px |

---

## Future Expansion Items

| Item | Description | Priority |
|------|-------------|----------|
| Multi-CV comparison | Side-by-side compare of up to 3 CVs | P2 |
| CV version history | Timeline view with diffs between versions | P2 |
| Template library | 10+ design templates with live preview | P1 |
| Export to all formats | Indeed, LinkedIn, Workday, custom export | P1 |
| Batch upload | Drag & drop multiple files at once | P2 |
| CV sharing | Generate public link with expiry | P2 |
| Team collaboration | Shared CV folders for recruitment teams | P3 |
| Language localization | Full RTL support, multi-language CV | P2 |
| Voice input | Dictate CV sections via speech-to-text | P3 |
| Block-based editor | Drag-and-drop reorderable section blocks | P2 |
