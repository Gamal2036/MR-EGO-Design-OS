# Elevation System

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Design-Principles.md](../01-Constitution/Design-Principles.md))

---

## Philosophy

Elevation creates spatial hierarchy in MR:EGO's flat design language. Surfaces rise from the page to indicate importance, interactivity, and temporal state. Elevation is expressed through shadows, not through gradients, borders, or 3D transforms.

Elevation is purposeful — every layer has a reason. A card is not elevated to look good; it is elevated because it needs to separate from the background.

---

## Elevation Layers

| Layer | Name | Usage | Shadow Token |
|-------|------|-------|-------------|
| 0 | Base | Page background, unraised surfaces | None |
| 1 | Flat | Cards on page, form sections | Shadow-1 |
| 2 | Raised | Hovered cards, dropdown menus | Shadow-2 |
| 3 | Elevated | Modals, dialogs, sheets | Shadow-3 |
| 4 | Floating | Tooltips, popovers, date pickers | Shadow-4 |
| 5 | Overlay | Full-screen overlays, drawers | Shadow-5 |

---

## Layer Rules

1. **Surfaces rise by at most one layer on hover.** A card on Layer 1 rises to Layer 2. Never skip layers.
2. **Interactive surfaces are at minimum Layer 1.** Clickable elements must be visually distinct from the background.
3. **Modals and dialogs use Layer 3.** They need to be clearly above all page content but below system-level overlays.
4. **Tooltips and popovers use Layer 4.** They are temporary, contextual, and must sit above all modal content.
5. **Full-screen overlays use Layer 5.** These are the highest elevation and cover everything.
6. **Three layers visible maximum.** No more than three distinct elevation layers should be visible in any viewport.
7. **Elevation is additive with glass.** Glass surfaces use the same layer system but add backdrop blur.

*See [Shadow-System.md](Shadow-System.md) for shadow values at each layer.*
*See [Glass-System.md](Glass-System.md) for glass surface elevation behavior.*

---

## When to Use Each Layer

| Element | Layer | Reason |
|---------|-------|--------|
| Page background | 0 | No elevation needed |
| Card (default) | 1 | Slight separation from page |
| Card (hovered) | 2 | Interactive feedback |
| Dropdown menu | 2 | Over content, below modals |
| Context menu | 2 | Same as dropdown |
| Modal dialog | 3 | Above all page content |
| Sheet / Drawer | 3 | Same as modal |
| Tooltip | 4 | Temporary, always visible |
| Popover | 4 | Contextual overlay |
| Date picker | 4 | Temporary overlay |
| Command palette | 5 | Full focus mode |
| Full-screen overlay | 5 | Maximum elevation |

---

## What Elevation Does Not Include

- **No z-index war:** Layers correspond to specific z-index ranges, not arbitrary values. Z-index is always `100 * layer_number`.
- **No gradient backgrounds** for depth. Depth comes from shadows, not gradients.
- **No 3D transforms.** Cards do not tilt, flip, or rotate.
- **No parallax scrolling.** Depth is static and structural, not animated.

---

*This Elevation System is permanent. All components in DP-2 use these layers. Refer to [Shadow-System.md](Shadow-System.md) for shadow specifications, [Glass-System.md](Glass-System.md) for glass elevation behavior, and [Design-Principles.md](../01-Constitution/Design-Principles.md) for the flat-design philosophy foundation.*
