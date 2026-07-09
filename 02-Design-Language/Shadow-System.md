# Shadow System

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Design-Principles.md](../01-Constitution/Design-Principles.md))

---

## Philosophy

Shadows in MR:EGO communicate elevation, not decoration. Every shadow has a defined purpose and corresponds to an elevation layer. Shadows are **soft, subtle, and directional** — they suggest light from above, creating a natural hierarchy.

---

## Shadow Values

All shadows use `rgba(0, 0, 0, opacity)` with the specified opacity. Dark theme shadows use reduced opacity to avoid harsh contrast on dark surfaces.

### Light Theme

| Layer | Token | Shadow Value | Usage |
|-------|-------|--------------|-------|
| 0 | Shadow-0 | None | No elevation |
| 1 | Shadow-1 | `0 1px 2px rgba(0,0,0,0.05), 0 1px 1px rgba(0,0,0,0.03)` | Default card state |
| 2 | Shadow-2 | `0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)` | Hovered card, dropdown |
| 3 | Shadow-3 | `0 10px 15px rgba(0,0,0,0.10), 0 4px 6px rgba(0,0,0,0.05)` | Modal, dialog, sheet |
| 4 | Shadow-4 | `0 16px 24px rgba(0,0,0,0.14), 0 6px 12px rgba(0,0,0,0.06)` | Tooltip, popover |
| 5 | Shadow-5 | `0 24px 48px rgba(0,0,0,0.20), 0 12px 24px rgba(0,0,0,0.10)` | Full-screen overlay, command palette |

### Dark Theme

| Layer | Token | Shadow Value |
|-------|-------|--------------|
| 0 | Shadow-0 | None |
| 1 | Shadow-1 | `0 1px 2px rgba(0,0,0,0.15), 0 1px 1px rgba(0,0,0,0.10)` |
| 2 | Shadow-2 | `0 4px 6px rgba(0,0,0,0.20), 0 2px 4px rgba(0,0,0,0.12)` |
| 3 | Shadow-3 | `0 10px 15px rgba(0,0,0,0.30), 0 4px 6px rgba(0,0,0,0.15)` |
| 4 | Shadow-4 | `0 16px 24px rgba(0,0,0,0.35), 0 6px 12px rgba(0,0,0,0.20)` |
| 5 | Shadow-5 | `0 24px 48px rgba(0,0,0,0.40), 0 12px 24px rgba(0,0,0,0.25)` |

---

## Shadow Rules

1. **Shadows correspond directly to elevation layers.** Never use Shadow-3 on a Layer-1 element.
2. **Two-part shadows** (ambient + direct light) create natural-looking depth. They are applied together as a single composite.
3. **Shadow opacity never exceeds 0.40** (light) or 0.25 (dark). Darker shadows look artificial.
4. **No inset shadows** except for form input focus states and pressed button states.
5. **No colored shadows.** Shadows are always black with opacity modulation.
6. **No shadow transitions on initial mount.** Elements appear with their target shadow, they do not animate into it.
7. **Shadow distance (y-offset) increases with elevation.** Higher layers cast longer shadows.

---

## Shadow and Motion

When elements animate between elevation states (e.g., card hover), the shadow transitions smoothly:

- **Duration:** 200ms
- **Easing:** ease-out
- **Only one layer transition at a time:** Layer-1 to Layer-2, not Layer-1 to Layer-4.

*See [Motion-System.md](Motion-System.md) for animation specifications.*
*See [Elevation-System.md](Elevation-System.md) for elevation layer definitions.*

---

## What Shadows Do Not Include

- **No blur-only shadows** (those are for glass, see [Glass-System.md](Glass-System.md)).
- **No multiple colored shadow layers.** Only two shadow layers per elevation (ambient + direct).
- **No text shadows.** Text readability is achieved through contrast, not depth.
- **No shadow on icons.** Icons are flat by design.

---

*This Shadow System is permanent. All components in DP-2 use these shadow values. Refer to [Elevation-System.md](Elevation-System.md) for the layer system, [Glass-System.md](Glass-System.md) for glass shadow behavior, and [Motion-System.md](Motion-System.md) for shadow transitions.*
