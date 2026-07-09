# Opacity Guide

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Glass-System.md](../../02-Design-Language/Glass-System.md), [Color-System.md](../../02-Design-Language/Color-System.md))

---

## Definition

Opacity Guide provides a single reference for all opacity values used across MR:EGO. This ensures every translucent surface, disabled element, and overlay uses consistent opacity values.

---

## Universal Opacity Scale

| Token | Value | Usage |
|-------|-------|-------|
| Opacity-100 | 1.0 | Solid surfaces, text, icons |
| Opacity-85 | 0.85 | Navigation glass |
| Opacity-72 | 0.72 | Standard glass |
| Opacity-60 | 0.60 | Backdrop glass, loading overlay |
| Opacity-50 | 0.50 | Ambient glass |
| Opacity-40 | 0.40 | Disabled elements |
| Opacity-30 | 0.30 | Subtle veil, disabled state background |
| Opacity-20 | 0.20 | Hover background tint |
| Opacity-15 | 0.15 | AI glow (light mode) |
| Opacity-10 | 0.10 | Subtle tint, AI glow accent |
| Opacity-05 | 0.05 | Barely perceptible tint |
| Opacity-00 | 0.00 | Hidden |

---

## Usage by Element

| Element Type | Opacity | Notes |
|-------------|---------|-------|
| Card background | 1.0 | Always solid |
| Page background | 1.0 | Always solid |
| Text | 1.0 | Always solid (never translucent) |
| Icons | 1.0 | Always solid |
| Disabled text | 0.40 | WCAG minimum |
| Disabled background | 0.40 | Element appears faded |
| Glass nav | 0.85 | Near-solid for readability |
| Glass modal backdrop | 0.60 | Shows context beneath |
| Glass overlay | 0.72 | Standard glass |
| Hover state | Color shift, not opacity | Use color system values |
| Loading overlay | 0.60 | Semi-transparent veil |
| AI glow (light) | 0.15 | Subtle luminescence |
| AI glow (dark) | 0.30 | More visible in dark |
| Disabled card content | 0.40 | All inner content fades together |

---

## Opacity Rules

1. **Opacity values are discrete.** Use only the values defined in the scale above. No arbitrary opacities.
2. **Multiplied opacity is avoided.** Stacking two Opacity-50 surfaces creates 0.75 effective opacity — use a single Opacity-60 instead.
3. **Hover states use color value changes, not opacity changes.** A button on hover shifts background one step, not fades to 80%.
4. **Disabled state is the only case where opacity is applied to interactive elements.**
5. **Text opacity is never below 0.40** — WCAG contrast minimum.
6. **Opacity transitions are smooth** — use the Motion System duration and easing values.

---

*This Opacity Guide is permanent. All components and surfaces reference these opacity values. Refer to [Transparency.md](Transparency.md) for transparency philosophy, [Glass-Usage.md](Glass-Usage.md) for glass usage, and [Color-System.md](../../02-Design-Language/Color-System.md) for color value scale.*
