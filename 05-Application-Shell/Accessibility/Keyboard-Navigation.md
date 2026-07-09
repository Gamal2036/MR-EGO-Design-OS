# Accessibility — Keyboard Navigation

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 7), DP-1 ([Accessibility.md](../../02-Design-Language/Accessibility.md))

---

## Purpose

Defines the keyboard accessibility requirements specific to the application shell.

---

## Shell Keyboard Model

| Key | Context | Action |
|-----|---------|--------|
| Tab | Global | Navigate forward through elements in DOM order |
| Shift+Tab | Global | Navigate backward through elements |
| Enter/Space | Interactive | Activate focused element |
| Escape | Modal/Dropdown | Close current modal, dropdown, or panel |
| Arrow keys | List/Menu | Navigate between items |
| Ctrl+K / Cmd+K | Global | Open command palette |
| Ctrl+I | Global | Toggle AI panel |
| Ctrl+B | Global | Toggle sidebar |
| Ctrl+Shift+F | Global | Focus global search |
| Ctrl+, | Global | Navigate to Settings |
| Ctrl+1-9 | Global | Navigate to primary nav items 1-9 |
| Ctrl+Shift+] | Global | Focus next panel/region |
| Ctrl+Shift+[ | Global | Focus previous panel/region |
| F6 | Global | Cycle through main regions (sidebar, header, content, panels) |

---

## Landmark Navigation

Users should be able to jump between landmarks using standard screen reader shortcuts:

| Landmark | Role |
|----------|------|
| Header | `banner` |
| Sidebar | `navigation` |
| Main content | `main` |
| Context panel | `complementary` |
| AI panel | `complementary` |
| Search | `search` |
| Footer | `contentinfo` |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Navigation/Keyboard-Navigation.md](../Navigation/Keyboard-Navigation.md) | Full keyboard navigation model |
| [Focus-Order.md](Focus-Order.md) | Detailed focus order specification |

---

*Keyboard navigation is a first-class interaction model. The shell implements every keyboard shortcut and navigation pattern defined in UX Constitution Rule 7.*
