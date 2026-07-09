# Element Depth Map

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Elevation-System.md](../../02-Design-Language/Elevation-System.md))

---

## Definition

Element Depth Map catalogs every major surface type in MR:EGO with its default, hover, active, and special-state depth level. This is the definitive reference for where every element sits in the layer stack.

---

## Shell Elements

| Element | Default | Hover | Active | Special |
|---------|---------|-------|--------|---------|
| Page background | 0 | — | — | — |
| Workspace background | 0 | — | — | — |
| Sidebar | 1 | — | — | Collapsed: 1 |
| Top navigation | 1 | — | — | Glass treatment |
| Bottom tab bar | 1 | — | — | Mobile only |
| Footer | 0 | — | — | — |

## Surface Elements

| Element | Default | Hover | Active | Special |
|---------|---------|-------|--------|---------|
| Card | 1 | 2 | 1 | Selected: 1 + tint |
| Panel | 1 | — | — | Collapsed: 1 |
| Section | 0 | — | — | Nested: 1 |
| Divider | 0 | — | — | — |

## Navigation Elements

| Element | Default | Hover | Active | Special |
|---------|---------|-------|--------|---------|
| Nav item | 1 | 2 | 1 + indicator | Selected: 1 + accent |
| Breadcrumb | 0 | 0 | 0 | — |
| Tab | 0 | 0 + underline | 0 + accent | Selected: accent |
| Command palette | 5 | — | — | Modal backdrop |

## Dialog Elements

| Element | Default | Hover | Active | Special |
|---------|---------|-------|--------|---------|
| Modal | 3 | — | — | Backdrop at 2.5 |
| Sheet / Drawer | 3 | — | — | Slides from edge |
| Confirmation | 3 | — | — | Emphasis on destructive |
| Warning dialog | 3 | — | — | Warning icon + color |

## Floating Elements

| Element | Default | Hover | Active | Special |
|---------|---------|-------|--------|---------|
| Tooltip | 4 | — | — | 300ms delay |
| Popover | 4 | — | — | Flip to stay in view |
| Dropdown | 2 | — | — | Auto-width |
| Date picker | 4 | — | — | Controlled by input |
| Toast | 4 | — | — | Auto-dismiss |
| Context menu | 2 | — | — | Right-click trigger |

## AI Elements

| Element | Default | Hover | Active | Special |
|---------|---------|-------|--------|---------|
| AI chat panel | 3 | — | — | Ctrl+I toggle |
| AI suggestion | 1 | 2 | 1 | Left accent bar |
| AI thinking | 1 | — | — | Pulse glow |
| AI badge | 1 | — | — | Subtle glow |

---

## Depth Congestion Rules

When multiple elements claim the same depth level:

| Conflict | Resolution |
|----------|-----------|
| Two modals cannot open simultaneously | Enforce single modal; queue second |
| Dropdown above modal | Dropdown renders at modal's level + sub-level |
| Toast during modal | Toast at Level 4 (modal is 3) — no conflict |
| Tooltip on floating element | Tooltip renders at Level 5 (above floating) |
| Context menu on modal | Context menu at Level 4 (above modal) |

---

*This Element Depth Map is the authoritative reference for every element's depth position. All components and layouts reference this map. Refer to [Depth-System.md](Depth-System.md) for depth philosophy, [Layer-Hierarchy.md](Layer-Hierarchy.md) for layer definitions, and [Elevation-Rules.md](Elevation-Rules.md) for elevation behavior rules.*
