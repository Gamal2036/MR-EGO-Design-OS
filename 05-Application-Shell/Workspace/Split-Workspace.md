# Split Workspace

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([SplitView.md](../../04-Component-Library/Layout/SplitView.md), [ResizablePanel.md](../../04-Component-Library/Layout/ResizablePanel.md)), DP-1 ([Layout-Principles.md](../../02-Design-Language/Layout-Principles.md))

---

## Purpose

Defines split workspace configurations — layouts where the workspace is divided into multiple independently scrollable, resizable panes for side-by-side work.

---

## Split Configurations

### Side-by-Side
Two panels of equal or configurable width.

```
┌──────────┬──────────┐
│ Primary  │Secondary │
│ Content  │ Content  │
└──────────┴──────────┘
```

- Primary: main task content
- Secondary: related items, references, or supporting data
- Ratio: 50/50, 60/40, or 70/30
- Resizable via center drag handle
- Stacks vertically on tablet and mobile

### Main + Context
Primary content with a narrower context panel.

```
┌─────────────────┬──────┐
│                 │Context│
│   Primary       │Panel │
│   Content       │      │
│                 │      │
└─────────────────┴──────┘
```

- Primary: 65-75% of width
- Context panel: 25-35% of width
- Context panel resizable with min/max constraints
- Context panel collapses to thin tab
- Context panel slides in/out with animation

### Main + AI
Primary content with AI chat panel.

```
┌─────────────────┬──────┐
│                 │ AI   │
│   Primary       │ Chat │
│   Content       │ Panel│
│                 │      │
└─────────────────┴──────┘
```

- AI panel: 360-480px on desktop
- AI panel collapses to thin tab on right
- AI panel can be toggled with Ctrl+I
- AI panel stacks below primary on mobile (full width)

### Three-Column
Three panels for data-dense workflows.

```
┌────────┬──────────┬──────┐
│ List   │  Detail  │Insp. │
│ Panel  │  Panel   │Panel │
└────────┴──────────┴──────┘
```

- List panel: 240-320px (min 200px)
- Detail panel: flexible, minimum 400px
- Inspector panel: 280-480px
- All resizable with drag handles
- Collapses to List + Detail on tablet
- Single column on mobile (user navigates between views)

---

## Split Workspace Rules

| Rule | Description |
|------|-------------|
| Independent scrolling | Each pane scrolls independently |
| Resizable | All split configurations support pane resize |
| Collapsible | Secondary and tertiary panes can collapse |
| Responsive stack | Panes stack vertically below 1024px |
| Focus tracking | Active pane is visually indicated |
| State persistence | Split configuration persists per layout type |
| Keyboard navigation | Ctrl+] / Ctrl+[ to move focus between panes |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Resizable-Areas.md](Resizable-Areas.md) | Resize constraints and behavior |
| [Panel-Rules.md](Panel-Rules.md) | Panel behavior within split configurations |
| [Regions/Region-Architecture.md](../Regions/Region-Architecture.md) | Region definitions that compose split layouts |

---

*Split workspace configurations enable parallel workflows. Users can reference, compare, and edit across multiple panes simultaneously.*
