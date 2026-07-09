# Context Navigation

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Dropdown.md](../../04-Component-Library/Navigation/Dropdown.md), [ContextMenu.md](../../04-Component-Library/Navigation/ContextMenu.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 14)

---

## Purpose

Defines context-dependent navigation — actions and links that appear based on the user's current selection, cursor position, or interaction context.

---

## Context Navigation Types

### Context Menu
Right-click menu with actions relevant to the current element.

- Triggered by right-click on any interactive element
- Contains actions specific to the element type
- Positioned at cursor location
- Dismissed on click outside, Escape, or action execution
- Keyboard: Shift+F10 or Context Menu key opens context menu for focused element

### Selection-Based Navigation
Navigation options that appear when content is selected.

- Selecting a row in a table shows action toolbar
- Selecting text shows mini toolbar (copy, AI explain, search)
- Selecting a file shows preview and action options
- Toolbar slides in from bottom or appears as floating bar

### Inline Links
Navigation links embedded within content.

- Follow the standard link pattern (underlined, distinct color)
- Open in the same context (not new tab) for intra-app navigation
- External links are indicated with an icon and open in new tab
- AI-generated inline links are visually distinct

---

## Context Navigation Rules

| Rule | Description |
|------|-------------|
| Relevant only | Context navigation options are strictly relevant to the current context |
| Max 8 actions | Context menus show at most 8 actions (overflow into submenu) |
| No scrolling | Context menus do not scroll — they submenu or truncate |
| Keyboard operable | All context navigation is keyboard accessible |
| Dismissible | Easy dismiss (Escape, click outside, action execution) |
| Mobile adaptation | Context menu becomes a bottom sheet on mobile |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Primary-Navigation.md](Primary-Navigation.md) | Top-level navigation |
| [Secondary-Navigation.md](Secondary-Navigation.md) | Module-level navigation |
| [Keyboard-Navigation.md](Keyboard-Navigation.md) | Keyboard shortcuts for context navigation |

---

*Context navigation surfaces the right actions at the right time. It reduces clutter by showing options only when they are relevant.*
