# Animation System

**Phase:** DP-8 (Interaction & Motion System)
**Design Authority:** DP-1 ([Animation-Principles.md](../02-Design-Language/Animation-Principles.md)), DP-5 ([Motion-System.md](../06-Visual-Foundation/Motion/Motion-System.md))
**Inherits:** All animation principles from DP-1

---

## Animation Philosophy

Animation in MR:EGO is purposeful, performant, predictable, continuous, deferential, and respectful. Every animation communicates meaning. No animation exists for decoration.

---

## Animation Classification

### By Purpose

| Class | Purpose | Duration | Examples |
|-------|---------|----------|----------|
| Feedback | Acknowledge action | ≤50ms | Press, toggle |
| Micro-Interaction | Confirm intent | 50-100ms | Hover, focus |
| State Transition | Show state change | 150-200ms | Toggle, select |
| Element Transition | Show enter/exit | 200-300ms | Panel, dropdown |
| Navigation | Show spatial change | 300ms | Page transition |
| Content Reveal | Show new content | 300-500ms | Staggered list |
| Loading | Show progress | 800-1500ms | Skeleton, spinner |
| Narrative | Show achievement | 500-800ms | Success, welcome |

### By Technical Approach

| Approach | Use Case | Properties |
|----------|----------|------------|
| CSS Transition | Simple state changes | transform, opacity |
| CSS Animation | Looping, keyframes | Loading, shimmer |
| FLIP | Layout animations | transform (position) |
| Staggered | List reveals | transform, opacity |
| Shared Element | Page transitions | transform, opacity |
| Streaming | AI responses | Appending content |

---

## Animation Property Rules

### Permitted Properties

| Property | Performance | Use Case |
|----------|-------------|----------|
| `transform` | GPU-accelerated | Position, scale, rotate |
| `opacity` | GPU-accelerated | Fade in, fade out |
| `filter` | GPU-accelerated | Blur, brightness |

### Forbidden Properties

| Property | Reason |
|----------|--------|
| `width` | Triggers layout recalculation |
| `height` | Triggers layout recalculation |
| `top` | Triggers layout recalculation |
| `left` | Triggers layout recalculation |
| `right` | Triggers layout recalculation |
| `bottom` | Triggers layout recalculation |
| `margin` | Triggers layout recalculation |
| `padding` | Triggers layout recalculation |
| `border` | Triggers layout recalculation |
| `box-shadow` | Expensive to paint (use filter: drop-shadow instead) |

### Exception Rules

1. `width` / `height` may animate only when absolutely necessary and when the element uses `transform: translateZ(0)` to promote to its own layer
2. `box-shadow` transitions are permitted at ≤200ms with `will-change: box-shadow`
3. Progress bars may animate `width` since they are isolated on their own layer

---

## Orchestration Patterns

### Single Element

```
Element enters view:
  1. transform: scale(0.95) + opacity: 0 → transform: scale(1) + opacity: 1
  2. Duration: 200ms
  3. Easing: Ease-Out
```

### Staggered List

```
List of items appears:
  1. Each item: transform: translateY(8px) + opacity: 0 → translateY(0) + opacity: 1
  2. Duration per item: 200ms
  3. Delay between items: 50ms
  4. Maximum staggered items: 8
  5. Total duration cap: 600ms
  6. Easing: Ease-Out
```

### Shared Element

```
Element transitions between views:
  1. Capture start position (getBoundingClientRect)
  2. Apply FLIP transform to maintain visual position
  3. Animate to final position
  4. Duration: 300ms
  5. Easing: Ease-In-Out
```

### Parent-Child

```
Parent enters:
  1. Parent container: opacity 0→1 (100ms)
  2. Children stagger in after parent opacity completes
  3. Each child: 50ms delay, 200ms duration
  4. Total maximum: 500ms
```

### Sequential

```
Chain of animations:
  1. Element A animates (200ms)
  2. Element B animates (200ms, starts after A)
  3. Element C animates (200ms, starts after B)
  4. Each element: transform + opacity
```

---

## Animation Lifecycle

### Enter Animation Lifecycle

1. **Prepare** — Element is added to DOM with initial state (opacity: 0, transform)
2. **Play** — Element transitions to final state (opacity: 1, transform: none)
3. **Complete** — Element is fully visible, animation cleanup runs
4. **Idle** — Element is static until next interaction

### Exit Animation Lifecycle

1. **Trigger** — User action initiates removal
2. **Play** — Element transitions to exit state (opacity: 0, transform)
3. **Complete** — Animation finishes
4. **Remove** — Element is removed from DOM

---

## Animation Rule Reference

| Rule | Description |
|------|-------------|
| No infinite animations | Except loading indicators |
| No layout animations | transform and opacity only |
| 60fps minimum | All animations must maintain 60fps |
| Max 8 simultaneous | Per viewport region |
| No animation on scroll | Content animates on appear, not scroll |
| No parallax | Never used |
| No startup animations | Animations trigger on interaction only |
| No auto-play | Content never animates without user action |
| Reduced motion respected | All animations have reduced-motion alternative |
| Symmetric enter/exit | Enter animation is reverse of exit |

---

## Keyframe Definitions

### Skeleton Pulse

```
0% { opacity: 1 }
50% { opacity: 0.5 }
100% { opacity: 1 }
Duration: 1500ms loop
```

### Spinner Rotation

```
0% { transform: rotate(0deg) }
100% { transform: rotate(360deg) }
Duration: 1000ms linear loop
```

### Shimmer Sweep

```
0% { transform: translateX(-100%) }
100% { transform: translateX(100%) }
Duration: 1500ms loop
```

### Success Checkmark

```
Circle: scale(0) → scale(1) — 150ms, Ease-Out
Checkmark: draw path — 150ms, Ease-Out
Total: 300ms
```

### AI Thinking Pulse

```
0% { opacity: 0.6; transform: scale(1) }
50% { opacity: 1; transform: scale(1.05) }
100% { opacity: 0.6; transform: scale(1) }
Duration: 2000ms loop
```

### Progress Bar Fill

```
width: 0% → target%
Duration: 200ms per segment
Easing: Ease-Out
```

---

*This Animation System defines the complete animation framework. Refer to [Motion-System.md](Motion-System.md) for timing and easing, [Micro-Interactions.md](Micro-Interactions.md) for component-level animations, and [Accessibility-Motion.md](Accessibility-Motion.md) for reduced motion alternatives.*
