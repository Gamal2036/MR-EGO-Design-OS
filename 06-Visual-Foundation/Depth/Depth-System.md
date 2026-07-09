# Depth System

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Elevation-System.md](../../02-Design-Language/Elevation-System.md), [Shadow-System.md](../../02-Design-Language/Shadow-System.md))

---

## Philosophy

Depth in MR:EGO is visual, not physical. It communicates hierarchy through elevation, shadow, and layer placement — not through 3D transforms, perspective, or parallax. The interface is flat by nature and deep by necessity.

---

## Layer Hierarchy

```
Z-Axis (top view)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Level 5: Overlay     Command palette, full-screen overlays
  Level 4: Floating    Tooltips, popovers, date pickers
  Level 3: Elevated    Modals, dialogs, sheets, drawers
  Level 2: Raised      Hovered cards, dropdown menus
  Level 1: Flat        Default cards, form sections
  Level 0: Base        Page background
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Each level is exactly one step above the previous. No level skipping. No intermediate levels.

---

## Visual Depth Properties

Each depth level defines four visual properties:

| Level | Layer Name | Z-Index | Shadow Token | Glass Treatment |
|-------|-----------|---------|-------------|-----------------|
| 0 | Base | 0 | None | None |
| 1 | Flat | 100 | Shadow-1 | Optional (sticky nav) |
| 2 | Raised | 200 | Shadow-2 | None |
| 3 | Elevated | 300 | Shadow-3 | Optional (modal backdrop) |
| 4 | Floating | 400 | Shadow-4 | None |
| 5 | Overlay | 500 | Shadow-5 | Optional (command palette) |

---

## Element Depth Assignment

| Element | Default Level | Hover Level | Rationale |
|---------|--------------|-------------|-----------|
| Page background | 0 | — | Foundation layer |
| Card | 1 | 2 | Content container |
| Sidebar | 1 | — | Persistent navigation |
| Top navigation | 1 | — | Glass surface, sits above content |
| Dropdown menu | 2 | — | Over page, above cards |
| Context menu | 2 | — | Same as dropdown |
| Modal dialog | 3 | — | Above all page content |
| Sheet / Drawer | 3 | — | Same as modal |
| Tooltip | 4 | — | Temporary contextual info |
| Popover | 4 | — | Contextual action container |
| Date picker | 4 | — | Temporary overlay |
| Command palette | 5 | — | Full focus mode |
| Full-screen overlay | 5 | — | Maximum elevation |
| AI chat panel | 3 | — | Floating utility panel |
| Notification toast | 4 | — | Temporary notification |

---

## Depth Rules

1. **Maximum 3 elevation layers visible at any time.** More than 3 creates visual confusion.
2. **Elements rise by exactly one level on hover.** Never skip levels (1→2, not 1→3).
3. **Modals lock the page behind them** — interaction is blocked, but content is visible.
4. **Floating elements (Level 4) are always temporary** — they dismiss on click-outside or Escape.
5. **Overlay elements (Level 5) are modal** — they require explicit action to dismiss.
6. **Surfaces at the same level do not overlap** without additional nesting rules.
7. **Depth perception relies on shadow, not z-index awareness** — users should never need to know about layers.

---

## Depth Anti-Patterns

| Anti-Pattern | Why |
|-------------|-----|
| More than 3 layers visible | Confusing hierarchy, spatial disorientation |
| Level skipping on hover | Breaks mental model of incremental elevation |
| Element at Level 3 with Shadow-5 | Visual inconsistency, misleading depth cue |
| Two modals open simultaneously | Unclear which is active, focus management nightmare |
| Glass on Glass surfaces | Blur overlap creates visual artifacts |
| Persistent floating elements | Distracting, creates visual noise |

---

## Future Depth Expansion

The layer system supports up to 10 levels (0–9) without redesign. Future modules requiring additional depth layers use:
- Level 6: Reserved for system-level alerts
- Level 7: Reserved for emergency/security overlays
- Level 8: Reserved for OS-level integration (future feature)
- Level 9: Maximum — reserved for unanticipated needs

---

*This Depth System is permanent. All components and layouts use these depth specifications. Refer to [Elevation-System.md](../../02-Design-Language/Elevation-System.md) for elevation definitions, [Shadow-System.md](../../02-Design-Language/Shadow-System.md) for shadow values, and [Layer-Hierarchy.md](Layer-Hierarchy.md) for detailed layer definitions.*
