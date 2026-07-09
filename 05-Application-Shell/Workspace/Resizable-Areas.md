# Resizable Areas

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([ResizablePanel.md](../../04-Component-Library/Layout/ResizablePanel.md)), DP-3 ([SplitView.md](../../04-Component-Library/Layout/SplitView.md))

---

## Purpose

Defines the areas of the workspace that users can resize, the rules governing resize behavior, and the constraints that prevent layout breakage.

---

## Resizable Areas

### Sidebar Width
- Expanded: 200-320px (configurable per layout)
- Drag handle appears on the right edge of the sidebar
- Min width: 180px (ensures item labels are readable)
- Max width: 400px (prevents excessive sidebar占用)
- Collapsed: 64px (icon rail, not resizable)
- Persisted per user across sessions

### Context Panel Width
- The right-side panel in `with-context-panel` layouts
- Min width: 280px
- Max width: 560px
- Drag handle on the left edge
- Can be collapsed to 0px (hidden)
- Restore from edge drag or keyboard shortcut

### AI Chat Panel Width
- Min width: 320px
- Max width: 640px
- Default width: 400px
- Can be collapsed to a thin tab (16px) on the right edge
- Height is full workspace (minus header)

### Secondary Region Height
- In stacked (mobile/tablet) layouts, secondary region is vertically resizable
- Min height: 120px
- Max height: 70% of viewport
- Drag handle on top edge

### Split View Ratio
- Primary/Secondary horizontal splits in workspace layouts
- Configurable ratios: 50/50, 60/40, 70/30
- Resizable via drag handle between panels
- Min panel width: 240px

---

## Resize Rules

| Rule | Description |
|------|-------------|
| Visual handle | Every resizable area has a visible drag handle with hover state |
| Cursor change | Cursor changes to `col-resize` or `row-resize` over handles |
| Keyboard support | Arrow keys resize when handle is focused |
| Persistence | Panel sizes are persisted in localStorage per layout type |
| Responsive reset | On breakpoint change, stacked layouts reset to defaults |
| Min/max enforced | Users cannot resize below minimum or above maximum |
| Snap to edge | Dragging to edge collapses the panel |
| Double-click collapse | Double-clicking the handle collapses the panel |
| Animation | Resize transitions are instant during drag, animated on collapse/expand (250ms) |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Split-Workspace.md](Split-Workspace.md) | Split workspace configurations with resizable panes |
| [Panel-Rules.md](Panel-Rules.md) | Panel behavior rules for resizable panels |
| [Region-Architecture.md](../Regions/Region-Architecture.md) | Region definitions that support resize |

---

*Resizable areas give users control over their workspace layout. Every resize operation is smooth, constrained, and persisted.*
