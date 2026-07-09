# Quick Actions

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([IconButton.md](../../04-Component-Library/Core/IconButton.md), [QuickActionCard.md](../../04-Component-Library/Dashboard/QuickActionCard.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 2)

---

## Purpose

Defines the quick action system — one-click action triggers available from the header and throughout the workspace.

---

## Quick Action Types

### Header Quick Actions
Icon buttons in the header's right section for frequent actions.

| Action | Icon | Behavior |
|--------|------|----------|
| New Document | plus | Opens create document dialog |
| Upload File | upload | Opens file upload dialog |
| Share | share | Opens share dialog for current context |
| Bookmark | bookmark | Bookmarks current page |
| Export | download | Exports current view |
| Print | print | Opens print dialog |

### Contextual Quick Actions
Actions that appear based on the current module or content.

- Module-defined quick actions
- Appear only when the module is active
- Replaced when the user navigates to a different module
- Max 3 contextual actions visible at once

### FAB Quick Action
A floating action button for the primary action on the current page.

- Visible in the bottom-right corner
- Action is context-dependent (e.g., "New Job Application" in Jobs)
- Hidden during focus mode and full-screen modes
- Can be customized by the user

---

## Quick Action Rules

| Rule | Description |
|------|-------------|
| Max 5 | No more than 5 quick actions in the header at once |
| Most frequent | Actions are ranked by frequency of use |
| User customizable | Users can pin, hide, and reorder quick actions |
| Context-aware | Actions adapt to the current module and page |
| Tooltip | Every quick action has a tooltip explaining what it does |
| Keyboard shortcut | Most frequent quick actions have keyboard shortcuts |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Header-Architecture.md](Header-Architecture.md) | Where quick actions appear in the header |
| [Workspace/Content-Zones.md](../Workspace/Content-Zones.md) | Toolbar zone for in-page quick actions |

---

*Quick actions provide one-click access to the most common tasks. They reduce friction by placing frequently used actions in easy reach.*
