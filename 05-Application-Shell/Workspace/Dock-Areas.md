# Dock Areas

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Panel.md](../../04-Component-Library/Layout/Panel.md), [Dialog.md](../../04-Component-Library/Feedback/Dialog.md))

---

## Purpose

Defines docking behavior — how panels can be attached (docked) to workspace edges, stacked, or detached into floating windows.

---

## Dock Types

### Edge Dock
A panel attached to a workspace edge.

| Edge | Behavior |
|------|----------|
| Left | Sidebar zone. Primary navigation. |
| Right | Context panel, AI panel, inspector. Collapsible to thin tab. |
| Bottom | Status bar, terminal output, logs. Resizable height. |
| Top | Reserved for header. No user-dockable panels. |

### Tab Dock
Multiple panels stacked in tabs at the same dock position.

- Right dock can contain: AI Chat, Context, Inspector (tabbed)
- Bottom dock can contain: Output, Terminal, Problems, Notifications (tabbed)
- User can drag tabs to reorder within a dock
- Active tab is visually indicated

### Floating Dock
A panel that is detached from the workspace edge.

- Dragged out from an edge dock by the user
- Can be repositioned anywhere within the viewport
- Has a title bar with close, minimize, and re-dock buttons
- Re-dock: double-click title bar or drag to edge to snap back
- Floating panels cannot overlap with primary content by default

---

## Dock Rules

| Rule | Description |
|------|-------------|
| Single instance | A panel can only exist in one dock position at a time |
| Tab grouping | Related panels group into tabs at the same dock position |
| Drag to dock | Users can drag panel headers to move between dock positions |
| Double-click to undock | Double-click a tab to float it |
| Max floating panels | Maximum 3 floating panels visible simultaneously |
| Float on mobile | Not available on mobile — all panels dock to bottom |
| Dock persistence | Dock configuration is persisted per layout type |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Panel-Rules.md](Panel-Rules.md) | Panel behavior rules for docked panels |
| [Floating-Region.md](../Regions/Floating-Region.md) | Floating panel behavior |
| [Workspace-Hierarchy.md](Workspace-Hierarchy.md) | Where docks fit in workspace hierarchy |

---

*Dock areas provide flexible panel management. Users arrange their workspace by docking, undocking, and grouping panels as their workflow demands.*
