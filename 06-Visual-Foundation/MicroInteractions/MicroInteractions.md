# Micro Interactions

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Interaction-Language.md](../../02-Design-Language/Interaction-Language.md), [Motion-System.md](../../02-Design-Language/Motion-System.md))

---

## Philosophy

Micro-interactions are the small moments of feedback that tell the user their action was received and understood. They are the difference between a system that feels alive and one that feels mechanical. Every micro-interaction in MR:EGO serves a purpose — none is decorative.

---

## Hover

### Card Hover

| Property | Value |
|----------|-------|
| Trigger | Pointer enters card boundary |
| Effect | Elevation Layer 1 → 2, shadow spread |
| Background | Surface-1 + 2% primary tint |
| Duration | 200ms ease-out |
| Cursor | pointer |
| Exit | Reverse animation, 200ms ease-out |

### Button Hover

| Property | Primary | Secondary | Ghost | Danger |
|----------|---------|-----------|-------|--------|
| Background | One step darker | One step darker | Neutral-100 tint | One step darker |
| Shadow | Shadow-1 → Shadow-2 | Same | None | Same |
| Duration | 100ms ease-out | 100ms | 100ms | 100ms |

### Link Hover

| Property | Value |
|----------|-------|
| Effect | Color changes to Primary-500, underline appears |
| Duration | 100ms ease-out |
| Cursor | pointer |

### Table Row Hover

| Property | Value |
|----------|-------|
| Effect | Background tints to Neutral-100 (light) / Neutral-200 (dark) |
| Duration | 100ms ease-out |
| Cursor | default (unless cell is interactive) |

---

## Press

### Button Press

| Property | Value |
|----------|-------|
| Effect | Scale to 0.97, inset shadow |
| Duration | 50ms instant |
| Release | Scale to 1.0, shadow returns to default |
| Release duration | 100ms ease-out |

### Card/Tile Press

| Property | Value |
|----------|-------|
| Effect | No scale change (cards do not compress). Background darkens slightly. |
| Duration | 50ms |

### Keyboard Enter

| Property | Value |
|----------|-------|
| Effect | Same as click press |
| Duration | 50ms |
| Focus | Focus ring remains visible after action |

---

## Loading

### Skeleton Loading

| Property | Value |
|----------|-------|
| Shape | Matches final content layout |
| Color | Neutral-200 (light) / Neutral-300 (dark) |
| Animation | Shimmer sweep (1500ms loop) |
| Shimmer color | Neutral-100 (light) / Neutral-200 (dark) |
| Exit | Content cross-fade (200ms) |

### Spinner Loading

| Property | Value |
|----------|-------|
| Type | Circular (stroke, not filled) |
| Stroke | 2px |
| Size | 16-24px (inline), 32-48px (standalone) |
| Color | Primary-500 |
| Animation | Continuous rotation (1000ms, linear) |
| Accessibility | aria-label="Loading" |

### Progress Bar

| Property | Value |
|----------|-------|
| Shape | Full-width horizontal bar |
| Height | 4px |
| Track | Neutral-200 |
| Fill | Primary-500 |
| Animation | Width transition (200ms ease-out per segment) |
| Indeterminate | Animated stripe pattern (deterministic preferred) |

---

## Success

### Checkmark Animation

| Property | Value |
|----------|-------|
| Trigger | Action completed successfully |
| Effect | Circle expands → Checkmark draws |
| Duration | 300ms total |
| Easing | Ease-Spring (subtle bounce) |
| Color | Success-500 |
| Size | 16-24px (inline confirmation) |
| Use case | Inline save, action confirmation |

---

## Delete

| Property | Value |
|----------|-------|
| Trigger | Delete action initiated |
| User confirmation | Required (confirmation dialog) |
| Deletion animation | Element fades out (200ms) + compresses (200ms) |
| Surrounding elements | Reposition smoothly (200ms) |
| Color | Danger-500 for delete button |
| Undo window | 5 seconds (toast with undo action) |

---

## Upload

| Property | Value |
|----------|-------|
| Start | File appears in upload queue with progress bar |
| Progress | Real-time progress bar (200ms width updates) |
| Completion | Checkmark appears + file card highlights |
| Error | Red border on file card + error message |
| Drag over zone | Border highlights (Primary-500, dashed → solid) |
| Drag leave zone | Border returns to default |

---

## Search

| Property | Value |
|----------|-------|
| Input focus | Border shifts to Primary-500, cursor appears |
| Typing | Debounced 300ms, results update smoothly |
| Results appear | Staggered fade in (50ms delay per item, max 8) |
| Results update | Cross-fade (200ms) |
| Empty results | Empty state with suggestion |
| Clear | Results fade out (150ms), input clears |

---

## Drag and Drop

| Property | Value |
|----------|-------|
| Drag start | Element scales 1.02, shadow increases |
| Drag start duration | 100ms ease-out |
| During drag | Element follows cursor, original position shows placeholder |
| Drop target hover | Target highlights (border or background tint) |
| Drop | Element snaps to position with spring animation (200ms) |
| Drag cancel | Element returns to original position (200ms ease-out) |
| Drag end (success) | Element settles in new position (200ms ease-out) |

---

## Expand and Collapse

| Property | Value |
|----------|-------|
| Expand trigger | Click on expand control (chevron, header) |
| Expand animation | Content height reveals + fades in (200ms ease-out) |
| Chevron rotation | 180° over 200ms ease-out |
| Collapse animation | Content height hides + fades out (150ms ease-in) |
| Chevron rotation | 180° back over 150ms ease-in |
| Content | Smooth, no jump |

---

## Focus

| Property | Value |
|----------|-------|
| Trigger | Keyboard Tab navigation |
| Effect | 2px ring in Primary-500 (light) / Primary-400 (dark) |
| Offset | 2px from element |
| Radius | Matches element border-radius + 2px |
| Appear duration | 100ms ease-out |
| Disappear duration | 100ms ease-out |
| Trigger on blur | Ring disappears when focus leaves |
| Click behavior | Focus ring not shown on mouse click |

---

## Micro-Interaction Rules

1. **Every interactive element has hover, focus, active, and disabled states.**
2. **No micro-interaction lasts longer than 300ms** (excluding loading).
3. **Micro-interactions never block user input** — `pointer-events: none` during animation.
4. **All micro-interactions respect reduced-motion** — maximum 50ms when enabled.
5. **No micro-interaction should be the same for different actions** — press and hover feel different.
6. **Feedback is always proportional to action importance.** Saving a file gets a stronger success signal than adding a tag.
7. **Micro-interactions are GPU-accelerated** — transform and opacity only.

---

*These Micro Interaction specifications are permanent. Every interaction in MR:EGO implements these patterns. Refer to [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md) for interaction patterns, [Motion-System.md](../../02-Design-Language/Motion-System.md) for motion values, and [Animation-Principles.md](../../02-Design-Language/Animation-Principles.md) for animation philosophy.*
