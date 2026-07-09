# Depth Rules

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Elevation-System.md](../../02-Design-Language/Elevation-System.md))

---

## Definition

Background Depth Rules define how background layers interact to create visual hierarchy without relying on textures or images.

---

## Background Depth Model

```
Depth Layer 0 (Page Background)
  ── Flat, solid color, no shadow ──
  
Depth Layer 1 (Surface Background)
  ── Sits on Layer 0, Shadow-1 defines separation ──
  
Depth Layer 2 (Elevated Surface)
  ── Sits on Layer 1, Shadow-2 defines separation ──
```

Depth between backgrounds is created entirely through:
1. **Color value difference** between layers
2. **Shadow** between layers (for Layer 1 and above)
3. **Border** (for surfaces without shadow, like sidebars)

---

## Background Depth Values

| Layer | Light Color | Dark Color | Separation From Below |
|-------|-----------|-----------|----------------------|
| 0 (Page) | Neutral-50 | Neutral-50 dark | None (base) |
| 1 (Surface) | White (#FFFFFF) | Neutral-100 dark | Shadow-1 or 1px border |
| 2 (Elevated) | Neutral-100 | Neutral-200 dark | Shadow-2 |

---

## Depth Through Color

The primary depth cue for backgrounds is color value contrast:

| Adjacent Layers | Light Difference | Dark Difference |
|----------------|-----------------|-----------------|
| Layer 0 → 1 | #F8FAFC → #FFFFFF (Δ = 7) | #0F172A → #1E293B (Δ = 17) |
| Layer 1 → 2 | #FFFFFF → #F1F5F9 (Δ = 8) | #1E293B → #334155 (Δ = 18) |

In dark mode, the color difference between layers is larger to compensate for reduced ambient light perception.

---

## Background Depth Rules

1. **Backgrounds deeper than 2 levels from page must use shadow** (not just color difference).
2. **Border-only separation** (sidebar) uses Neutral-200 (light) / Neutral-200 dark (dark).
3. **Never use more than 3 background depth layers in any viewport.**
4. **Background depth does not animate** — depth changes only on navigation.
5. **Cards and panels at the same depth level use identical background colors.**

---

*These Background Depth Rules are permanent. Backgrounds create hierarchy through color and shadow, not texture or image. Refer to [Background-System.md](Background-System.md) for background specifications, [Elevation-System.md](../../02-Design-Language/Elevation-System.md) for elevation definitions, and [Shadow-System.md](../../02-Design-Language/Shadow-System.md) for shadow values.*
