# Workspace Switcher

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Dropdown.md](../../04-Component-Library/Navigation/Dropdown.md)), DP-0 ([Product-Constitution.md](../../01-Constitution/Product-Constitution.md) — Modularity Rules)

---

## Purpose

Defines the workspace switcher — how users switch between modules and workspaces from the header.

---

## Workspace Switcher Behavior

### Module Switcher
A dropdown showing all enabled modules.

```
Current Module: Dashboard
▼
┌─────────────────────────┐
│ Dashboard          ✓    │
│ Jobs                    │
│ AI Workspace            │
│ Documents               │
│ ─────────────────────── │
│ Settings                │
│ Profile                 │
│ ─────────────────────── │
│ Browse Modules...       │
└─────────────────────────┘
```

- Current module is marked with a checkmark
- Modules are grouped: Core, Workspace, Modules
- Hovering a module shows a preview tooltip
- Click switches to the module's default page
- Keyboard: up/down arrows, Enter to select

### Workspace Tabs (Optional)
Tab-based switching for users who prefer visible tabs.

- Rendered in the center section of the header
- Shows the 3-5 most recently used modules as tabs
- Click tab to switch modules
- Tabs are ordered by recency
- "More" dropdown for all modules

---

## Workspace Switcher Rules

| Rule | Description |
|------|-------------|
| Always accessible | Switcher is always visible in the header |
| One active module | Only one module can be active at a time |
| State preservation | Each module preserves its state when switched away |
| Instant switch | Module switching completes within 200ms |
| Recent first | Recent modules sort to the top of the list |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Header-Architecture.md](Header-Architecture.md) | Switcher placement in header |
| [Primary-Navigation.md](../Navigation/Primary-Navigation.md) | Module navigation integration |

---

*The workspace switcher gives users rapid access to all their modules. It enables the modular architecture promised in the Product Constitution.*
