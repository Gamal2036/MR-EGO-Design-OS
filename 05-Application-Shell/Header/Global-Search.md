# Global Search

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([SearchInput.md](../../04-Component-Library/Forms/SearchInput.md), [Search-Pattern.md](../../04-Component-Library/Patterns/Search-Pattern.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 16)

---

## Purpose

Defines the global search surface accessible from the header — universal search across all modules, content, and actions.

---

## Search Scope

| Scope | Content Searched | Access |
|-------|-----------------|--------|
| All | Everything the user has access to | Default search |
| Current module | Current module's content | Tab or filter |
| People | Users, contacts, team members | Tab or filter |
| Documents | All documents | Tab or filter |
| AI | AI-suggested content and insights | Tab or filter |

---

## Search Behavior

| Behavior | Description |
|----------|-------------|
| Trigger | Ctrl+Shift+F focuses search input. Click opens expanded search. |
| Input | Text input with placeholder: "Search everything..." |
| Debounce | 300ms debounce before executing search |
| Results | Dropdown overlay showing categorized results |
| Categories | Modules, Pages, People, Documents, Recent, AI suggestions |
| Keyboard | Arrow keys to navigate results, Enter to select, Escape to dismiss |
| Empty state | "No results found" with suggestions for broader terms |
| Recent searches | Last 5 searches shown when input is empty and focused |

---

## Search Responsive Behavior

| Device | Behavior |
|--------|----------|
| Desktop (1280px+) | Full search input visible in header center |
| Laptop (1024-1279px) | Search input visible, slightly narrower |
| Tablet (768-1023px) | Search icon only, expands to full overlay on click |
| Mobile (<768px) | Search icon opens full-screen search overlay |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Header-Architecture.md](Header-Architecture.md) | Where search lives in the header |
| [Architecture/Command-Palette.md](../Architecture/Command-Palette.md) | Command palette — alternative access to search |
| [Navigation/Command-Navigation.md](../Navigation/Command-Navigation.md) | Command-based search |

---

*Global search is the universal find tool. It implements UX Constitution Rule 16 — users can find what they need without knowing where it is.*
