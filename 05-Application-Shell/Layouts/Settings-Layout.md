# Settings Layout

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Settings-Pattern.md](../../04-Component-Library/Patterns/Settings-Pattern.md), [Tabs.md](../../04-Component-Library/Navigation/Tabs.md))

---

## Purpose

The Settings Layout provides a configuration environment — organizing user and application settings into a structured, navigable interface.

---

## Layout Blueprint

```
Workspace (variant: with-sidebar)
├── Header (full variant)
├── Sidebar
├── PrimaryRegion (max-width: md — 768px, centered)
│   ├── PageHeader
│   │   ├── PageTitle: "Settings"
│   │   └── PageActions: [Save, Reset to Defaults]
│   ├── SettingsNavigation (Tabs — secondary variant)
│   │   ├── General
│   │   ├── Profile
│   │   ├── Notifications
│   │   ├── Privacy
│   │   ├── Appearance
│   │   ├── Integrations
│   │   └── Advanced
│   └── SettingsContent (tab-dependent)
│       └── Section[]
│           ├── Section.Header (setting group title)
│           └── Section.Body
│               ├── FormGroup (form controls)
│               ├── Switch[]
│               ├── Select[]
│               └── Button[] (save, reset)
└── ModalRegion (for destructive actions)
```

---

## Layout Rules

| Rule | Description |
|------|-------------|
| Narrow content | Settings use narrow max-width for comfortable reading |
| Tab navigation | Settings categories as tabs (left or top) |
| Auto-save | Settings are auto-saved on change (except critical ones) |
| Section grouping | Related settings are grouped into sections |
| Search | Search within settings is available (filters visible settings) |

---

## Responsive Adaptation

| Device | Layout |
|--------|--------|
| Desktop (1280px+) | Tabs on left, content on right |
| Laptop (1024-1279px) | Tabs on left or top, content on right |
| Tablet (768-1023px) | Tabs on top (scrollable), content below |
| Mobile (<768px) | Tabs as dropdown, content below |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Header/Language-Switch.md](../Header/Language-Switch.md) | Language settings integration |
| [Header/Theme-Switch.md](../Header/Theme-Switch.md) | Theme settings integration |

---

*The Settings Layout organizes configuration into a clean, navigable interface. Settings are easy to find and change without confusion.*
