# Transparency

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Glass-System.md](../../02-Design-Language/Glass-System.md))

---

## Definition

Transparency in MR:EGO is used exclusively for glass surfaces. Transparency is never used for solid surfaces, overlays, or decorative effects. Every transparent surface has a defined opacity value and a clear functional reason.

---

## Transparency Levels

| Level | Opacity | Usage |
|-------|---------|-------|
| Solid | 1.0 (100%) | Cards, panels, buttons, inputs — all content surfaces |
| Near-solid | 0.85 (85%) | Navigation glass — readability priority |
| Standard glass | 0.72 (72%) | Standard glass surfaces |
| Backdrop | 0.60 (60%) | Modal/drawer backdrops |
| Ambient | 0.50 (50%) | Subtle context separation |
| Subtle | 0.30 (30%) | Disabled overlay, loading veil |
| Minimal | 0.15 (15%) | AI glow, hover tint |
| Fade | 0.00 (0%) | Hidden elements |

---

## Transparency Rules

1. **No element uses opacity to create a "lighter version" of itself.** Use the color system's value scale instead.
2. **Opacity is never used for decorative layering.** No translucent colored overlays on images or backgrounds.
3. **Disabled elements use 40% opacity** consistently (matching Color System specification).
4. **Transitions involving opacity should be smooth** — no sudden appearance/disappearance.
5. **prefers-reduced-transparency** is respected — glass surfaces use solid backgrounds when enabled.
6. **Text on semi-transparent backgrounds must still meet WCAG AA contrast.** If it fails, add a solid background behind the text.

---

## Transparency Anti-Patterns

| Anti-Pattern | Why |
|-------------|-----|
| 50% opacity color overlay on images | Reduces readability, adds visual noise |
| Translucent card backgrounds | Breaks reading consistency |
| Opacity-based hover states | Use color shift instead of opacity fade |
| Multiple stacked transparent surfaces | Cumulative opacity creates muddy appearance |
| Semi-transparent borders | Use solid borders with color, not opacity |

---

*This Transparency specification is permanent. All surface transparency values are defined here. Refer to [Glass-Usage.md](Glass-Usage.md) for glass usage patterns, [Blur-Rules.md](Blur-Rules.md) for blur specifications, and [Color-System.md](../../02-Design-Language/Color-System.md) for color token opacity usage.*
