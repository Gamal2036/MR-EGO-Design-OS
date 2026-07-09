# Floating Region

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Portal.md](../../04-Component-Library/Utilities/Portal.md), [Dialog.md](../../04-Component-Library/Feedback/Dialog.md))

---

## Purpose

The Floating Region manages floating windows and panels — detachable surfaces that can be positioned anywhere within the viewport, independent of the workspace grid.

---

## Composition

```
FloatingRegion (Portal-based)
└── FloatingPanel[]
    ├── FloatingPanel.Header
    │   ├── Title
    │   ├── Minimize
    │   ├── Maximize
    │   └── Close
    ├── FloatingPanel.Body
    │   └── (content)
    └── FloatingPanel.Footer (optional)
```

---

## Behavior

| Behavior | Description |
|----------|-------------|
| Detachable | Panels can be detached from docks into floating mode |
| Repositionable | Drag title bar to move anywhere within viewport |
| Resizable | Drag edges/corners to resize |
| Snap to edge | Drag near edge to snap back to dock |
| Stacking | Floating panels stack in z-order |
| Max visible | Maximum 3 floating panels at once |
| On close | Panel re-docks or closes entirely |

---

## Floating Region Rules

| Rule | Description |
|------|-------------|
| No overlap with primary | Floating panels should not cover primary content by default |
| Title bar always visible | Title bar shows controls and provides drag handle |
| Z-order management | Clicking a floating panel brings it to front |
| Keyboard accessible | Ctrl+` cycles between floating panels |
| Snap to dock | Double-click title bar to dock back to workspace |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Modal-Region.md](Modal-Region.md) | Modal overlay — distinct from floating |
| [Workspace/Dock-Areas.md](../Workspace/Dock-Areas.md) | Docking floating panels back into workspace |

---

*The Floating Region provides flexible, detachable surfaces for multitasking and reference while working.*
