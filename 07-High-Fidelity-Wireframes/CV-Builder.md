# CV Builder — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:Screen (CV Manager, CV Optimization), DP-6:Nav (CV Journey), DP-1:All

---

## Purpose

Upload, create, manage, and optimize CV documents. Central hub for all CV-related activity including upload, analysis, version management, and AI-powered editing.

---

## Layout Overview

```
┌──────────┬────────────────────────────────────────────────────┐
│          │  TOPBAR (56px)                                     │
│          │  ← CV Manager                    New CV ▸  ⋮      │
│ SIDEBAR  ├────────────────────────────────────────────────────┤
│ (240px)  │  CONTENT AREA                                      │
│          │                                                    │
│          │  PAGE HEADER                                       │
│          │  "CV Manager"      [Upload New CV]  [AI Optimize] │
│          │                                                    │
│          │  UPLOAD ZONE (desktop: 480px wide, centered)       │
│          │  ┌──────────────────────────────────────────────┐  │
│          │  │  📄 Drag & drop your CV here                 │  │
│          │  │  or [Browse Files]  (PDF, DOCX, max 10MB)   │  │
│          │  └──────────────────────────────────────────────┘  │
│          │                                                    │
│          │  CV LIST (below upload zone)                       │
│          │  ┌──────────────────────────────────────────────┐  │
│          │  │ CV Card: Senior Frontend - v2.3              │  │
│          │  │ Active ✓  |  86/100  |  Updated 2d ago       │  │
│          │  │ [View] [Analyze] [Edit] [⋮]                 │  │
│          │  ├──────────────────────────────────────────────┤  │
│          │  │ CV Card: Full Stack - v2.2                   │  │
│          │  │ Draft  |  72/100  |  Updated 2w ago          │  │
│          │  │ [View] [Analyze] [Edit] [⋮]                 │  │
│          │  └──────────────────────────────────────────────┘  │
│          │                                                    │
│          │  AI OPTIMIZATION PANEL (right, optional)           │
│          └────────────────────────────────────────────────────┘
├──────────┴────────────────────────────────────────────────────┤
│  [Floating AI: "Optimize my CV for this job"]                  │
└───────────────────────────────────────────────────────────────┘
```

---

## 1. Page Header

| Property | Value |
|----------|-------|
| Padding bottom | Space-7 (24px) |
| Border bottom | Border-Default |

### Elements:
| Element | Type | Details |
|---------|------|---------|
| Title | Heading-1 (36px) | "CV Manager" |
| Description | Body, Text-Secondary | "Upload, manage, and optimize your CVs" (optional, below title) |
| Actions | Button row | "Upload New CV" (Primary) + "AI Optimize" (Secondary) |

---

## 2. Upload Zone

| Property | Value |
|----------|-------|
| Width | 100% |
| Max width | 480px (centered), full-width on mobile |
| Height | 200px |
| Border | Border-Default (2px dashed), radius-md |
| Background | Surface-1 |
| Hover | Border-Primary, Primary-50 bg tint |
| Dragging | Border-Primary, Primary-50 bg, scale(1.01) |

### Elements (centered):
| Element | Details |
|---------|---------|
| Icon | Upload icon, 40px, Neutral-400 (Primary on drag) |
| Title | "Upload your CV" — Body, 600 weight |
| Description | "PDF or DOCX, up to 10MB" — Caption, Text-Secondary |
| Browse button | Button-Secondary, "Browse Files" |
| Spacing icon→title | Space-3 (8px) |
| Spacing title→desc | Space-1 (2px) |

### States:
| State | Behavior |
|-------|----------|
| Default | Dashed border, neutral colors |
| Hover | Border transitions to Primary-400 |
| Dragging | Border primary, bg tint, slight scale |
| Uploading | Progress bar (4px h, full width) shows below zone |
| Success | Zone replaced by file card with checkmark |
| Error | Zone border turns Danger-500, error text below |
| File too large | Error: "File exceeds 10MB limit" |
| Wrong format | Error: "Please upload PDF or DOCX" |

---

## 3. CV List

| Property | Value |
|----------|-------|
| Margin top | Space-8 (32px) |
| Gap | Space-4 (12px) |

### Each CV Card:
| Property | Value |
|----------|-------|
| Padding | Space-5 (16px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | Border-Default |
| Min height | 72px |

### Elements per card:
```
┌──────────────────────────────────────────────────────────────┐
│  ┌──────┐                                                     │
│  │  PDF  │  Senior Frontend Developer — v2.3          [⋮]    │
│  │  icon │                                                    │
│  │  40px │  Active ✓  ·  86/100 score  ·  Updated 2d ago    │
│  └──────┘                                                    │
│              [View]  [Analyze]  [Edit]  [Download]           │
└──────────────────────────────────────────────────────────────┘
```

| Element | Details |
|---------|---------|
| File icon | 40px x 40px, PDF/DOCX icon |
| Title | Heading-4 (18px), "Senior Frontend Developer" |
| Version | Caption, Text-Secondary, "v2.3" |
| Active badge | Success-500 dot + "Active" — small badge |
| Score | "86/100" — Body-Small, Primary-600 |
| Date | Caption, Text-Secondary |
| Action buttons | Button-Small row: View, Analyze, Edit, Download |
| Menu | ⋮ icon button for more (Duplicate, Delete, Rename) |

### Empty State (No CVs):
| Element | Specification |
|---------|---------------|
| Illustration | Document + upload illustration, 160px |
| Title | "No CVs yet" |
| Description | "Upload your first CV to get AI-powered analysis and optimization" |
| CTA | "Upload Your CV" — Button-Primary |

---

## 4. CV Editor (Optimization View)

| Property | Value |
|----------|-------|
| Layout | Side-by-side (desktop) or stacked (mobile) |
| Trigger | Click "Edit" on CV card or "AI Optimize" action |

### Split View Specification:
| Panel | Width | Content |
|-------|-------|---------|
| Original (left) | 1/2 | Read-only original CV text with section headers |
| Optimized (right) | 1/2 | AI-suggested edits with highlight diffs |
| AI Suggestions (far right) | 320px | Suggestion list with accept/reject per item |

### Suggestion Item:
| Property | Value |
|----------|-------|
| Padding | Space-4 (12px) |
| Radius | radius-sm (6px) |
| Background | Primary-50 (new), Success-50 (applied) |
| Border | Primary-200 |
| Icon | Lightbulb or Edit icon |
| Title | Body-Small, 600 weight, "Stronger action verb" |
| Description | Caption, "Replaced 'Worked on' with 'Led development of'" |
| Actions | [Accept] [Modify] [Dismiss] — Button-Small row |
| Confidence | AI badge: "High confidence" |

### Editor Toolbar:
| Element | Details |
|---------|---------|
| Position | Fixed top of editor panel |
| Height | 44px |
| Items | Font size control, Bold, Italic, List, Undo, Redo, Save |

---

## 5. Loading State

| State | Behavior |
|-------|----------|
| Uploading | Progress bar (100% width, 4px h, Primary fill) |
| Analyzing | Card: "AI is analyzing your CV..." with pulsing animation |
| List loading | 3 skeleton cards (72px h, 100% w, shimmer) |
| Editor loading | Split view skeletons: 2 panels with text lines |

---

## 6. Error States

| Error | Behavior |
|-------|----------|
| Upload fail | Upload zone shows error, file card not created |
| Analysis fail | "Analysis failed — retry" link on CV card |
| Save fail | Toast: "Could not save changes. Auto-saved draft available." |
| Format error | Upload zone: "Unsupported format. Please use PDF or DOCX." |
| Size error | Upload zone: "File exceeds 10MB limit" |

---

## 7. Responsive Behavior

| Element | Mobile (<768px) | Tablet (768-1023px) | Desktop (1024px+) |
|---------|-----------------|---------------------|-------------------|
| Upload zone | Full width, 160px h | 400px centered | 480px centered |
| CV list | Full width cards | Full width | Full width |
| CV card | Compact (actions in menu) | Full actions | Full actions |
| Editor | Stacked (original → optimized) | Side-by-side | Side-by-side + AI panel |
| AI panel | Bottom sheet | Right drawer | Fixed 320px |
| Page header | Title only | Title + description | Full |

---

## 8. Accessibility

| Element | Requirement |
|---------|-------------|
| Upload zone | `role="button"`, keyboard accessible (Enter/Space triggers file dialog) |
| Upload label | `aria-label="Upload CV file. PDF or DOCX, maximum 10MB"` |
| File cards | `role="article"`, `aria-label="[CV name] version [number]"` |
| Active badge | Text + color: "Active" |
| Score | Text: "Score 86 out of 100" |
| Edit actions | `aria-label="Edit [CV name]"` |
| Drop zone | `aria-dropeffect="copy"` during drag |
| Editor | Proper heading hierarchy, focus management between panels |

---

## 9. AI Integration

| Feature | Location | Behavior |
|---------|----------|----------|
| CV analysis trigger | On upload | AI parses CV within 5-10s, shows score |
| Optimization suggestions | Editor | AI suggests per-section improvements |
| Score display | CV card | 86/100 with color visualization |
| ATS compatibility | Future | ATS score alongside quality score |
| Version comparison | Editor | AI highlights changes between versions |
| Role-specific optimization | AI prompt | "Optimize for Senior Frontend roles" |

---

## 10. Future Expansion

| Feature | Phase |
|---------|-------|
| Multi-language CVs | Phase 4 |
| Portfolio builder | Phase 5 |
| CV sharing link (public) | Phase 3 |
| Cover letter paired generation | Phase 3 |
| Video CV integration | Phase 7 |
| Bulk import from LinkedIn/Indeed | Phase 2 |
| Template library (design templates) | Phase 5 |

---

*Cross-references: DP-6:Screen (CV Manager, CV Optimization), DP-6:Nav (CV Journey), DP-6:Pattern (Inline Edit, Auto-Save), DP-1:All*
