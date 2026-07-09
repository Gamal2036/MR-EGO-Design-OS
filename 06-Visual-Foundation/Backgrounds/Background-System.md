# Background System

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md))

---

## Philosophy

Backgrounds in MR:EGO are the foundation of visual hierarchy. They provide the neutral canvas upon which all content sits. Backgrounds are quiet, consistent, and never compete with content.

---

## Background Types

### Main Page Background

| Property | Light Mode | Dark Mode |
|----------|-----------|-----------|
| Color | Neutral-50 (#F8FAFC) | Neutral-50 dark (#0F172A) |
| Texture | None (flat) | None (flat) |
| Gradient | None | None |
| Pattern | None | None |
| Treatment | Solid color, full viewport | Solid color, full viewport |

The page background is the lowest visual layer (Layer 0). It is always flat, solid, and neutral.

### Surface Background (Cards, Panels)

| Property | Light Mode | Dark Mode |
|----------|-----------|-----------|
| Color | White (#FFFFFF) | Neutral-100 dark (#1E293B) |
| Texture | None | None |
| Elevation | Layer 1 (Shadow-1) | Layer 1 (Shadow-1 dark) |

### Sidebar Background

| Property | Light Mode | Dark Mode |
|----------|-----------|-----------|
| Color | Neutral-100 (#F1F5F9) | Neutral-100 dark (#1E293B) |
| Border | Right border Neutral-200 | Right border Neutral-200 dark |
| Treatment | Solid, slightly darker than page | Solid, slightly lighter than page |

---

## Workspace Background

The workspace (main content area) uses the same page background with no special treatment. Content inside the workspace provides its own backgrounds (cards, panels, etc.).

| Property | Value |
|----------|-------|
| Color | Same as page background |
| Texture | None |
| Gradient | None |
| Pattern | None |
| Intent | Zero visual weight — content is the focus |

---

## Dashboard Background

The dashboard uses the standard page background. Dashboard cards, widgets, and charts provide their own surface backgrounds.

| Property | Value |
|----------|-------|
| Color | Same as page background |
| Special treatment | None |
| Grid | Optional subtle grid lines for alignment |

---

## AI Workspace Background

The AI workspace region (chat panel, reasoning panel) uses a standard panel background with the addition of:

| Property | Light Mode | Dark Mode |
|----------|-----------|-----------|
| Background | Surface-1 | Surface-1 dark |
| Top ambient glow | Primary-50 gradient (0→100%) | Primary-900 gradient (0→100%) |
| Glow intensity | 5% at top | 8% at top |

The AI workspace is visually distinguished by a subtle top-to-bottom ambient glow, not by a different background color.

---

## Modal Background

| Property | Value |
|----------|-------|
| Modal content | Surface-1 (solid, no glass) |
| Backdrop | Glass (60% opacity, 8px blur) |
| Backdrop click | Dismisses modal (except confirmation dialogs) |

---

## Background Rules

1. **All backgrounds are flat and solid.** No gradients, patterns, textures, or images as backgrounds.
2. **The page background is the only true background.** All other surfaces are "surfaces" sitting on the page.
3. **Backgrounds never contain decorative elements.** No watermark, no pattern, no faded logo.
4. **Backgrounds never animate.** No moving backgrounds, no parallax, no video backgrounds.
5. **Dark mode background is pure color, not inverted light.** #0F172A is not an inversion of #F8FAFC.
6. **Maximum 3 background layers visible** (page + surface + elevated surface).
7. **Backgrounds meet WCAG AA contrast** with text sitting on them.

---

*This Background System is permanent. All backgrounds follow these specifications. Refer to [Color-System.md](../../02-Design-Language/Color-System.md) for color values, [Noise-and-Texture.md](Noise-and-Texture.md) for texture guidelines, and [Gradient-Rules.md](Gradient-Rules.md) for gradient usage.*
