# Architecture — Command Palette

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([CommandPalette.md](../../04-Component-Library/Navigation/CommandPalette.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 16)

---

## Purpose

Defines the command palette architecture — the Ctrl+K / Cmd+K interface for rapid navigation, actions, AI commands, and feature discovery.

---

## Command Registry

### Core Commands
Registered at application boot by the shell.

| Category | Commands | Registration |
|----------|----------|-------------|
| Navigation | All routes | Route registry |
| Actions | Create, Export, Share, Settings | Core action registry |
| AI | Ask AI, Summarize, Explain | AI command registry |
| Settings | All settings pages | Settings registry |

### Module Commands
Registered when a module is enabled.

- Module registers commands in its `onMount` lifecycle
- Commands include: navigate to module pages, module-specific actions
- Module commands are prefixed with the module name for disambiguation
- Commands are deregistered when a module is disabled

### Plugin Commands (Future)
Registered via plugin API.

- Plugins register commands through a sandboxed registration API
- Commands are validated before registration
- Plugin commands are prefixed with the plugin name

---

## Command Search

| Feature | Behavior |
|---------|----------|
| Fuzzy matching | Matches partial terms, typos, and abbreviations |
| Keyword indexing | Each command has keywords for improved matching |
| Category grouping | Results are grouped by category |
| Result limiting | Max 5 results per category, 20 total |
| Recent bias | Recently used commands appear first within categories |
| Frequent bias | Frequently used commands are promoted |

---

## Command History

| Feature | Behavior |
|---------|----------|
| Recent commands | Last 10 commands tracked per session |
| Frequent commands | Most used commands promoted (past 30 days) |
| Pinned commands | User can pin up to 5 commands (persisted) |
| Clear history | User can clear history at any time |

---

## Future Plugin System

| Feature | Description |
|---------|-------------|
| Plugin registration | Plugins register commands via registry API |
| Command scoping | Plugin commands are scoped to prevent conflicts |
| Permission check | Plugins can only register commands they have permission for |
| Versioning | Command API is versioned for backward compatibility |
| Discovery | Users can browse available plugin commands |

---

## Command Palette UI

| Element | Behavior |
|---------|----------|
| Trigger | Ctrl+K / Cmd+K (global) |
| Overlay | Semi-transparent backdrop |
| Input | Auto-focused on open |
| Results | Categorized list with icons |
| Active item | Highlighted with keyboard indicator |
| Footer | Keyboard shortcut hints |
| Close | Escape or click outside |

---

## Responsive Behavior

| Device | Palette Layout |
|--------|---------------|
| Desktop | Centered modal, 640px width, 480px max height |
| Tablet | Centered modal, 90vw width, 70vh max height |
| Mobile | Full-screen overlay, input at top, results fill viewport |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Navigation/Command-Navigation.md](../Navigation/Command-Navigation.md) | Command navigation model |
| [Navigation/Keyboard-Navigation.md](../Navigation/Keyboard-Navigation.md) | Keyboard shortcuts |

---

*The Command Palette is the fastest way to navigate and execute actions. It implements UX Constitution Rule 16 — Search and Discoverability.*
