# Panel Architecture

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Panel.md](../../04-Component-Library/Layout/Panel.md), [ResizablePanel.md](../../04-Component-Library/Layout/ResizablePanel.md)), DP-1 ([Layout-Principles.md](../../02-Design-Language/Layout-Principles.md))

---

## Purpose

Defines the complete panel system — the container architecture for secondary, context, and supporting content within the workspace.

---

## Panel Types

### Side Panel
Vertical panel attached to the left or right edge of the workspace.

| Property | Value |
|----------|-------|
| Position | Left (navigation) or Right (context/AI/inspector) |
| Width range | 240-480px (right), 64-320px (left) |
| Collapse target | 64px (icon tab) or 0px (hidden) |
| Scroll | Independent vertical scroll |

### Bottom Panel
Horizontal panel attached to the bottom edge.

| Property | Value |
|----------|-------|
| Position | Bottom, above footer |
| Height range | 100-400px |
| Collapse target | 32px (tab strip) or 0px (hidden) |
| Scroll | Independent vertical scroll |

### Floating Panel
Detached panel that can be positioned anywhere.

| Property | Value |
|----------|-------|
| Position | User-defined, within viewport |
| Size range | 280-640px width, 200-480px height |
| Stacking | Floating panels stack (newest on top) |
| Max visible | 3 floating panels simultaneously |
| Close | Title bar close button |

---

## Panel Composition

```
Panel
├── Panel.Header
│   ├── PanelIcon (optional)
│   ├── PanelTitle
│   ├── PanelActions (minimize, resize, close)
│   └── DragHandle (for repositioning)
├── Panel.Body
│   └── (content — components, sections, etc.)
└── Panel.Footer (optional)
    └── (metadata, actions, status)
```

---

## Panel Behavior Rules

| Rule | Description |
|------|-------------|
| Single purpose | Each panel has a single, clearly defined purpose |
| Independent scroll | Each panel scrolls independently of other panels |
| Resizable | Right/bottom panels are resizable via drag handle |
| Collapsible | All panels can collapse to a minimal state |
| Tab grouping | Related panels can be grouped into tabs at the same position |
| Drag to reposition | Side panel can be moved to opposite side |
| Persist state | Panel configuration (size, collapsed, position) persists |
| Keyboard toggle | Each panel has a Ctrl+Shift+<key> shortcut |

---

## Panel Slot Rules

| Slot | Rules |
|------|-------|
| Header | Always visible (even when collapsed). Contains controls. |
| Body | Scrolls independently. Contains main content. |
| Footer | Optional. Contains metadata and secondary actions. |

---

## Panel Responsive Behavior

| Device | Panel Behavior |
|--------|---------------|
| Desktop (1280px+) | Side panels visible, resizable. Bottom panels visible. |
| Laptop (1024-1279px) | Right panel resizable. Bottom panel visible. |
| Tablet (768-1023px) | Right panel stacks below or becomes bottom sheet. |
| Mobile (<768px) | All panels become bottom sheets or are accessible via tabs. |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Workspace/Panel-Rules.md](../Workspace/Panel-Rules.md) | Universal panel behavior rules |
| [Workspace/Dock-Areas.md](../Workspace/Dock-Areas.md) | Where panels dock in the workspace |
| [Workspace/Resizable-Areas.md](../Workspace/Resizable-Areas.md) | Panel resize constraints |
| [Regions/](../Regions/) | Region specifications that host panels |

---

*The panel system provides flexible, user-adjustable surfaces for supporting content throughout the workspace.*
