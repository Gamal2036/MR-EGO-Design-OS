# Workspace Hierarchy

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Workspace.md](../../04-Component-Library/Layout/Workspace.md)), DP-1 ([Layout-Principles.md](../../02-Design-Language/Layout-Principles.md))

---

## Purpose

Defines the structural levels of workspace nesting from application shell down to individual component slots.

---

## Hierarchy Levels

### Level 0: Application Shell
The outermost container. Instantiates the application, manages global state, provides theme and locale context.

```
Application
├── ThemeProvider
├── LocaleProvider
├── CommandPalette (global)
├── ToastContainer (global)
├── ModalLayer (global)
└── Workspace
```

### Level 1: Workspace
The shell per screen. Composes Header, Sidebar, and Region System.

```
Workspace
├── Header
├── Sidebar
├── RegionSystem
│   ├── PrimaryRegion
│   ├── SecondaryRegion (optional)
│   ├── ContextRegion (optional)
│   ├── AIRegion (optional)
│   ├── InspectorRegion (optional)
│   ├── PreviewRegion (optional)
│   └── ...
└── Footer (optional)
```

### Level 2: Regions
Named content areas within the workspace. Each region has a defined role and behavior.

```
PrimaryRegion
├── ContentArea
│   ├── Section (page header)
│   ├── Section (toolbar)
│   └── Section (main content)
│       ├── Grid
│       ├── Stack
│       └── ...
```

### Level 3: Sections
Composable content blocks within a region. Sections group related content and actions.

```
Section
├── Section.Header (title, actions)
├── Section.Body (content)
└── Section.Footer (optional metadata, actions)
```

### Level 4: Components
Individual UI components placed within sections. These are the DP-3 component instances.

```
Section.Body
├── StatCard[]
├── Chart[]
└── Table[]
```

---

## Nesting Rules

| Rule | Description |
|------|-------------|
| Max workspace depth | 5 levels (Application → Workspace → Region → Section → Component) |
| No workspace nesting | A Workspace must never contain another Workspace |
| Region order | PrimaryRegion is always present and rendered first |
| Region grouping | Secondary and Context regions are optional and appear only when content demands them |
| Section independence | Sections within a region do not depend on each other |
| Component placement | Components are children of sections, never direct children of regions |

---

## Workspace Variants by Layout

| Layout | Workspace Variant | Regions Active |
|--------|------------------|----------------|
| Dashboard | `with-sidebar` | Primary only (full width) |
| Workspace | `with-context-panel` | Primary + Context + optional AI |
| Documents | `with-sidebar` | Primary + optional Preview |
| Jobs | `with-sidebar` | Primary + Secondary |
| Analytics | `with-context-panel` | Primary + Inspector |
| Settings | `with-sidebar` | Primary only (narrow) |
| Profile | `with-sidebar` | Primary only |
| Wizard | `full` | Primary only (centered) |
| Authentication | `full` | Primary only (centered, no sidebar) |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Workspace-Philosophy.md](Workspace-Philosophy.md) | Governing workspace beliefs |
| [Content-Zones.md](Content-Zones.md) | Content placement within hierarchy levels |
| [Region-Architecture.md](../Regions/Region-Architecture.md) | Region definitions and roles |
| [Layouts/](../Layouts/) | Concrete layout templates that implement this hierarchy |

---

*This hierarchy governs all workspace compositions. Every page template in the Layouts/ directory follows this structural model.*
