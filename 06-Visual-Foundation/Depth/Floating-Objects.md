# Floating Objects

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Elevation-System.md](../../02-Design-Language/Elevation-System.md), [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md))

---

## Definition

Floating objects are temporary UI elements that sit above the main content layer. They appear in response to user action and dismiss when their purpose is served. Floating objects include tooltips, popovers, dropdowns, date pickers, and toasts.

---

## Floating Object Types

### Tooltips (Layer 4)

| Property | Value |
|----------|-------|
| Trigger | Hover (300ms delay), Focus |
| Content | Brief text (1-3 words, one line max) |
| Placement | Above or below trigger (8px gap) |
| Dismiss | Hover end, focus loss, or 3s timeout |
| Animation | Fade + slide 8px (200ms ease-out) |
| Shadow | Shadow-4 |
| Background | Neutral-800 (light) / Neutral-700 (dark) |
| Text color | White (light) / Neutral-900 (dark) |

### Popovers (Layer 4)

| Property | Value |
|----------|-------|
| Trigger | Click on interactive element |
| Content | Rich content (actions, filters, selections) |
| Placement | Near trigger, avoids viewport edges |
| Dismiss | Click outside, Escape, or action completion |
| Animation | Fade + scale (200ms ease-out) |
| Shadow | Shadow-4 |
| Background | Surface-1 |
| Min width | 160px |
| Max width | 360px |

### Dropdowns / Select Menus (Layer 2)

| Property | Value |
|----------|-------|
| Trigger | Click on select control |
| Content | List of options |
| Placement | Below trigger, full width match |
| Dismiss | Selection, click outside, Escape |
| Animation | Fade + slide down (200ms ease-out) |
| Shadow | Shadow-2 |
| Max height | 320px (with scroll beyond) |

### Date Pickers (Layer 4)

| Property | Value |
|----------|-------|
| Trigger | Click on date input |
| Content | Calendar grid, month/year navigation |
| Placement | Below or above input |
| Dismiss | Date selection, click outside, Escape |
| Animation | Fade (200ms ease-out) |
| Shadow | Shadow-4 |

### Toasts (Layer 4)

| Property | Value |
|----------|-------|
| Trigger | System event (success, error, info) |
| Content | Icon + message + optional action |
| Placement | Top-right (desktop), bottom-center (mobile) |
| Dismiss | Auto (5s), manual close, or action taken |
| Animation | Slide in (300ms ease-out), fade out (200ms ease-in) |
| Shadow | Shadow-4 |
| Stack | Maximum 3 toasts visible |

---

## Floating Object Rules

1. **Every floating object has a clear trigger and dismiss mechanism.**
2. **No floating object persists without user action to maintain it** (exception: toasts auto-dismiss).
3. **Maximum 3 floating objects visible at any time** (stacked toast queue counts as 1).
4. **Floating objects never overlap critical UI** — placement checks viewport edges.
5. **Floating objects respect reduced-motion** — appear instantly (0ms) when enabled.
6. **No floating object blocks access to underlying content permanently** — all are dismissable.
7. **Floating objects maintain 8px minimum distance** from viewport edges.

---

## Floating Object Placement Priority

| Position | Priority | When |
|----------|----------|------|
| Below | 1st | Default position |
| Above | 2nd | Insufficient space below |
| Right | 3rd | Insufficient vertical space |
| Left | 4th | Insufficient space on either side |
| Centered (modal) | 5th | When all edge positions fail |

---

*These Floating Objects specifications are permanent. All temporary UI elements follow these placement, behavior, and dismissal rules. Refer to [Layer-Hierarchy.md](Layer-Hierarchy.md) for layer positioning, [Elevation-Rules.md](Elevation-Rules.md) for elevation change rules, and [Motion-System.md](../../02-Design-Language/Motion-System.md) for animation specifications.*
