# Panel Rules

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Panel.md](../../04-Component-Library/Layout/Panel.md), [Surface.md](../../04-Component-Library/Layout/Surface.md))

---

## Purpose

Defines the universal rules governing panel placement, behavior, stacking, and interaction within the workspace.

---

## Panel Types

| Type | Description | Example |
|------|-------------|---------|
| Sidebar | Primary navigation panel | Module navigation |
| Context | Selection-dependent info panel | Item details |
| AI | AI interaction surface | Chat, reasoning |
| Inspector | Detailed data inspection | Record details |
| Preview | Content preview | Document, image |
| Output | System output display | Logs, results |
| Status | System status indicators | Connection, sync |
| Tool | Quick-access tool panel | Search, filters |

---

## Panel Rules

### Placement Rules
| Rule | Description |
|------|-------------|
| Predefined positions | Panels have defined positions within the workspace grid |
| No overlap | Panels do not overlap by default (except floating panels) |
| Edge attachment | Sidebar attaches to left edge, context/AI to right edge |
| Bottom bar | Status and output panels attach to bottom edge |

### Visibility Rules
| Rule | Description |
|------|-------------|
| Role-based visibility | Panel visibility is determined by current layout and task |
| User override | Users can show, hide, or auto-hide any panel |
| Context-auto | Context panel auto-shows when an item is selected |
| Auto-hide | AI panel auto-hides after 30 seconds of inactivity |
| Min state | Panels can collapse to a minimal representation (tab, icon, thin bar) |

### Stacking Rules
| Rule | Description |
|------|-------------|
| Tab stacking | Multiple panels at the same position stack as tabs |
| Z-order | Active tab renders on top of inactive tabs |
| Tab hover | Hovering an inactive tab shows a tooltip with the panel name |
| Tab reorder | Users can drag tabs to reorder them within a stack |

### Interaction Rules
| Rule | Description |
|------|-------------|
| Panel header click | Clicking a panel header collapses/expands it (in stacked mode) |
| Drag to move | Dragging a panel header moves it within valid dock positions |
| Right-click menu | Right-clicking a panel header shows context menu with options |
| Keyboard toggle | Each panel has a keyboard shortcut to toggle visibility |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Dock-Areas.md](Dock-Areas.md) | Where panels dock within the workspace |
| [Resizable-Areas.md](Resizable-Areas.md) | Panel resize constraints |
| [Panel-Architecture.md](../Panels/Panel-Architecture.md) | Panel system architecture |

---

*Panel Rules govern every panel in the workspace. They ensure consistent, predictable behavior regardless of the panel's content or purpose.*
