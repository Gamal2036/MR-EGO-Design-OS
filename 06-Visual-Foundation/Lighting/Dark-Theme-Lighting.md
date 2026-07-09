# Dark Theme Lighting

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Shadow-System.md](../../02-Design-Language/Shadow-System.md))

---

## Definition

Dark Theme Lighting defines how the entire light model adapts to dark mode. Dark mode is not an inversion of light mode — it is a complete re-lighting of the interface for low-light environments.

---

## Light Model Adaptation

In dark mode, the ambient light is dimmer, surfaces are more absorbent, and self-illuminated elements (AI glow) become more prominent.

| Property | Light Mode | Dark Mode |
|----------|-----------|-----------|
| Ambient intensity | 100% | 40% |
| Surface reflectivity | 80% (matte white) | 20% (matte dark) |
| Shadow opacity range | 0.03–0.20 | 0.10–0.40 |
| AI glow intensity | 15% | 30% |
| Glass background | rgba(255,255,255,0.72) | rgba(15,23,42,0.72) |
| Glass border | rgba(255,255,255,0.20) | rgba(255,255,255,0.08) |

---

## Surface Lighting in Dark Mode

### Page Background

| Property | Value |
|----------|-------|
| Color | Neutral-50 dark (#0F172A) |
| Light level | Deep, absorbent surface |
| Texture | None (flat) |
| Contributes to | Foundation layer — all surfaces sit on this |

### Card / Surface

| Property | Value |
|----------|-------|
| Color | Neutral-100 dark (#1E293B) |
| Light level | Slightly lighter than page |
| Shadow | Darker, more opaque (compensating for reduced ambient light) |
| Edge definition | Border required (Neutral-300) since shadow alone may not distinguish cards |

### Elevated Surface

| Property | Value |
|----------|-------|
| Color | Neutral-200 dark (#334155) |
| Light level | Lighter than card |
| Shadow | Most opaque in dark mode (0.30–0.40) |
| Border | Same as card border (Neutral-300) |

---

## Glow and Luminescence in Dark Mode

Dark mode is where glow effects become meaningful. In light mode, glow is barely perceptible. In dark mode, glow provides accent.

| Element | Light Mode Glow | Dark Mode Glow | Purpose |
|---------|----------------|----------------|---------|
| AI Thinking | 15-25% | 30-45% | Visible intelligence indicator |
| Focus Ring | 100% primary | 100% primary (unchanged) | Accessibility requirement |
| Primary Button | 0% (solid fill) | 5% luminescence | Subtle distinction on dark |
| Input Cursor | 100% primary | 100% primary | Readability |
| Loading Spinner | 100% primary | 100% primary at 80% | Reduce eye strain |

---

## Dark Theme Lighting Rules

1. **Dark mode surfaces are lighter than the page background**, not darker. Cards rise from the page as lighter elements.
2. **Shadows are more opaque in dark mode** to maintain depth perception (ambient light is lower).
3. **Pure white (#FFFFFF) is never used as a surface color** — it creates too much bloom in dark environments.
4. **Borders become more important in dark mode** since shadows alone may not define card edges.
5. **AI glow doubles in intensity** in dark mode (15% → 30%) to remain perceptible.
6. **Focus ring remains full opacity** in dark mode — accessibility does not dim.
7. **Saturated colors are desaturated slightly** in dark mode to prevent visual bloom.

---

## Transitioning Between Themes

| Property | Duration | Easing |
|----------|----------|--------|
| Background colors | 300ms | Ease-In-Out |
| Shadows | 300ms | Ease-In-Out |
| AI glow | 300ms | Ease-In-Out |
| All surfaces | 300ms | Ease-In-Out |

Theme transitions are smooth, simultaneous across all elements, and complete within 300ms. No flash, no staggered updates, no intermediate state visible.

---

*This Dark Theme Lighting specification is permanent. Dark mode implements a complete re-lighting, not a color inversion. Refer to [Color-System.md](../../02-Design-Language/Color-System.md) for dark theme colors, [Surface-Lighting.md](Surface-Lighting.md) for surface light response, and [AI-Lighting.md](AI-Lighting.md) for AI glow behavior in dark mode.*
