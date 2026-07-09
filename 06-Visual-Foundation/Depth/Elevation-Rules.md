# Elevation Rules

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Elevation-System.md](../../02-Design-Language/Elevation-System.md), [Shadow-System.md](../../02-Design-Language/Shadow-System.md))

---

## Definition

Elevation Rules define how and when elements change their depth position. These rules govern all elevation transitions and stacking behavior.

---

## Core Elevation Rules

### Rule 1: One Level Per Purpose

Every element occupies exactly one elevation level in its default state. No element exists between levels.

### Rule 2: Hover Elevates by One

Interactive elements rise by exactly one level on hover:
- Layer 0 → Layer 1 (cards becoming clickable)
- Layer 1 → Layer 2 (default card hover)
- Layer 2 → Not applicable (elements at this level are already temporary)

### Rule 3: Active States Sink

Pressed/active states use inset shadow to simulate returning to or below the original elevation. Active state never elevates.

### Rule 4: Modals Lock Stack

When a modal opens at Level 3, all layers below (0-2) become non-interactive. A backdrop at Level 2.5 prevents interaction.

### Rule 5: Floating Is Temporary

Elements at Level 4 (floating) must include a clear dismiss mechanism. No floating element persists without user action to maintain it.

### Rule 6: Three Layer Maximum

No viewport should display more than 3 distinct elevation layers at any time. If required by content, restructure rather than add layers.

### Rule 7: Glass Is Its Own Layer

Glass surfaces do not require shadow to communicate depth. The blur effect provides sufficient elevation cue. Glass uses the same layer numbering.

---

## Elevation Violations

| Violation | Example | Correction |
|-----------|---------|------------|
| Skip-level hover | Card jumps 1→3 on hover | Limit to 1→2 |
| Missing hover state | Button has no elevation change | Add Shadow-1 on hover |
| Persistent floating | Tooltip stays without timeout | Add auto-dismiss |
| Stack overflow | Three modals open | Enforce single modal |
| Shadow mismatch | Modal uses Shadow-2 instead of Shadow-3 | Match shadow to layer |
| Glass with shadow | Glass surface has drop shadow | Remove shadow from glass |

---

## Special Elevation Cases

### AI Chat Panel

The AI chat panel sits at Layer 3 (Elevated) when docked as a side panel. It does not block interaction with the main workspace. When undocked to floating, it rises to Layer 4.

### Notification Toast

Toast notifications sit at Layer 4 (Floating). They auto-dismiss after 5 seconds. They do not require user action to dismiss but can be dismissed manually.

### Drag State

Dragged elements temporarily rise by 2 levels to indicate they are in a special interaction state:
- Card Layer 1 → Drag Layer 3
- List item Layer 1 → Drag Layer 3
- Panel header → Drag Layer 4 (panel is heavier)

Dragged elements return to their original level on drop.

---

*These Elevation Rules are permanent. All depth-related behavior in components and layouts follows these rules. Refer to [Depth-System.md](Depth-System.md) for depth system overview, [Layer-Hierarchy.md](Layer-Hierarchy.md) for layer definitions, and [Floating-Objects.md](Floating-Objects.md) for floating element rules.*
