# Layer Hierarchy

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Elevation-System.md](../../02-Design-Language/Elevation-System.md))

---

## Definition

Layer Hierarchy defines the complete stack of visual layers in MR:EGO, from the deepest background to the topmost overlay. Every element in the interface belongs to exactly one layer.

---

## Complete Layer Map

```
Layer 5: Overlay ──────────────────────────────────┐
  Command Palette     Full-screen Overlay           │ Z: 500
  Loading Cover                                     │
────────────────────────────────────────────────────┘
Layer 4: Floating ──────────────────────────────────┐
  Tooltip            Popover       Date Picker       │ Z: 400
  Toast              Dropdown (alt)                  │
────────────────────────────────────────────────────┘
Layer 3: Elevated ──────────────────────────────────┐
  Modal Dialog       Sheet/Drawer  AI Chat Panel     │ Z: 300
  Confirmation       Warning Dialog  Notification Ctr│
────────────────────────────────────────────────────┘
Layer 2: Raised ────────────────────────────────────┐
  Dropdown Menu      Context Menu  Hovered Cards     │ Z: 200
  Select Options     Autocomplete                    │
────────────────────────────────────────────────────┘
Layer 1: Flat ──────────────────────────────────────┐
  Cards              Panels        Sidebar           │ Z: 100
  Top Nav (glass)    Form Sections  Data Tables      │
────────────────────────────────────────────────────┘
Layer 0: Base ──────────────────────────────────────┐
  Page Background    Surface-0                       │ Z: 0
────────────────────────────────────────────────────┘
```

---

## Layer Interaction Rules

### Adjacent Layer Visibility

Layers directly adjacent to each other have clear visual separation through shadow. Layers separated by more than one level have proportionally stronger separation.

| Adjacent Layers | Separation Method | Strength |
|----------------|-------------------|----------|
| 0 ↔ 1 | Shadow-1 | Gentle |
| 1 ↔ 2 | Shadow-2 | Noticeable |
| 2 ↔ 3 | Shadow-3 | Clear |
| 3 ↔ 4 | Shadow-4 | Strong |
| 4 ↔ 5 | Shadow-5 | Maximum |

### Same-Layer Elements

Elements at the same layer level do not overlap — they sit beside each other in the flow. When same-layer elements must overlap (e.g., dropdown options), they create a sub-layer using offset positioning and higher shadow within the same z-index range.

### Cross-Layer Interaction

- Elements on Layer 3+ block interaction with layers below (modal behavior)
- Elements on Layer 4 always dismiss when user interacts with Layer 0-3
- Elements on Layer 5 require explicit dismissal action
- Glass backdrops exist between layers (Layer 3 backdrop sits between Layer 2 and Layer 3)

---

## Layer Transition Rules

| Transition | Behavior | Duration |
|-----------|----------|----------|
| Element rises (hover) | Smooth elevation increase | 200ms ease-out |
| Element returns (hover end) | Smooth elevation decrease | 200ms ease-out |
| Modal opens | Backdrop appears → Content scales in | 200ms stagger |
| Modal closes | Content scales out → Backdrop fades | 150ms |
| Tooltip appears | Fade + slide up (8px) | 200ms ease-out |
| Tooltip disappears | Fade out | 150ms ease-in |
| Toast appears | Slide in from edge | 300ms ease-out |
| Toast dismisses | Fade out | 200ms ease-in |

---

## Maximum Visual Depth

The maximum visual depth perceivable at any time is limited to:

```
Visible layers at once: Maximum 3 (e.g., 0 + 2 + 4)
Perceptible depth range: 5 layers (0 through 4 visible with 5 as momentary)
Total available layers: 6 (0 through 5, with 6-9 reserved)
```

Users should never perceive the interface as more than 3 layers deep at any moment. If the architecture requires more, elements should be restructured.

---

*This Layer Hierarchy is permanent. All element placement follows this hierarchy. Refer to [Depth-System.md](Depth-System.md) for the depth system overview, [Elevation-Rules.md](Elevation-Rules.md) for elevation behavior rules, and [Floating-Objects.md](Floating-Objects.md) for floating element depth behavior.*
