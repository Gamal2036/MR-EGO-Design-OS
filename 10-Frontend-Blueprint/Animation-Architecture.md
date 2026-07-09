# Animation Architecture

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-1 ([Motion-System.md](../02-Design-Language/Motion-System.md)), DP-8 ([Animation-System.md](../08-Interaction-Motion/Animation-System.md)), DP-8 ([Motion-System.md](../08-Interaction-Motion/Motion-System.md))

---

## Purpose

Defines the animation architecture — animation engine, orchestration layer, page transitions, micro-interactions, loading animations, reduced motion, and performance budgeting.

---

## Animation Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   ANIMATION ENGINE                        │
├─────────────────────────────────────────────────────────┤
│  Motion Tokens                                           │
│  Duration, easing, stagger, delay values                 │
├─────────────────────────────────────────────────────────┤
│  Animation Primitives                                    │
│  Fade, slide, scale, rotate, path, spring                │
├─────────────────────────────────────────────────────────┤
│  Orchestration Layer                                     │
│  Sequence, parallel, stagger, timeline, transition       │
├─────────────────────────────────────────────────────────┤
│  Page Transitions                                        │
│  Route change, element morph, shared layout              │
├─────────────────────────────────────────────────────────┤
│  Micro-Interactions                                      │
│  Hover, click, focus, state change, feedback             │
├─────────────────────────────────────────────────────────┤
│  Motion Controller                                       │
│  Reduced motion, performance, preference detection       │
└─────────────────────────────────────────────────────────┘
```

---

## Motion Tokens

### Duration Tokens

| Token | Value | Usage |
|-------|-------|-------|
| instant | 50ms | Feedback, hover |
| fast | 100ms | Micro-interactions, state changes |
| normal | 200ms | Panel open/close, drawer |
| slow | 300ms | Page transitions, theme switch |
| xslow | 500ms | Hero animations, onboarding |
| loop | 1500ms | Skeleton shimmer, loading |

### Easing Tokens

| Token | Curve | Usage |
|-------|-------|-------|
| ease-out | cubic-bezier(0.16, 1, 0.3, 1) | Enter animations |
| ease-in | cubic-bezier(0.4, 0, 1, 1) | Exit animations |
| ease-in-out | cubic-bezier(0.65, 0, 0.35, 1) | Continuous animations |
| spring | spring(1, 100, 10) | Elastic interactions |
| bounce | cubic-bezier(0.34, 1.56, 0.64, 1) | Celebratory animations |

---

## Animation Primitives

```typescript
// Pseudocode
interface AnimationPrimitive {
  type: 'fade' | 'slide' | 'scale' | 'rotate' | 'path';
  duration: number;
  easing: string;
  delay: number;
  from: Record<string, number | string>;
  to: Record<string, number | string>;
}

// Fade
fadeIn: { type: 'fade', from: { opacity: 0 }, to: { opacity: 1 } }
fadeOut: { type: 'fade', from: { opacity: 1 }, to: { opacity: 0 } }

// Slide
slideUp: { type: 'slide', from: { y: 20 }, to: { y: 0 } }
slideDown: { type: 'slide', from: { y: -20 }, to: { y: 0 } }
slideLeft: { type: 'slide', from: { x: 20 }, to: { x: 0 } }
slideRight: { type: 'slide', from: { x: -20 }, to: { x: 0 } }

// Scale
scaleIn: { type: 'scale', from: { scale: 0.95 }, to: { scale: 1 } }
scaleOut: { type: 'scale', from: { scale: 1 }, to: { scale: 0.95 } }
```

---

## Orchestration

### Sequence

Animations play one after another.

```typescript
// Pseudocode
sequence([
  { animation: fadeIn, target: '.header', duration: 200 },
  { animation: slideUp, target: '.content', duration: 300 },
  { animation: fadeIn, target: '.footer', duration: 200 },
]);
// Total duration: 700ms
```

### Parallel

Animations play simultaneously.

```typescript
// Pseudocode
parallel([
  { animation: slideLeft, target: '.sidebar', duration: 250 },
  { animation: fadeIn, target: '.main', duration: 250 },
]);
// Total duration: 250ms
```

### Stagger

Children animate with an offset between each.

```typescript
// Pseudocode
stagger({
  target: '.list-item',
  animation: slideUp,
  duration: 200,
  staggerDelay: 50,     // 50ms between each item
  staggerFrom: 'start'  // start | end | center
});
```

---

## Page Transitions

### Transition Types

| Type | Direction | Duration | Animation |
|------|-----------|----------|-----------|
| Forward | Next page | 300ms | Slide left (content), fade (chrome) |
| Back | Previous page | 250ms | Slide right (content), fade (chrome) |
| Tab switch | Sibling | 150ms | Fade in/out |
| Modal open | — | 200ms | Scale + fade |
| Modal close | — | 150ms | Scale + fade (reverse) |

### Layout Animation

Shared elements between pages animate their position and size.

```typescript
// Pseudocode
// Element with same `layoutId` on different pages
// automatically animates between positions
function JobCard({ job }) {
  return (
    <motion.div layoutId={`job-${job.id}`}>
      <Card>
        <Card.Title>{job.title}</Card.Title>
      </Card>
    </motion.div>
  );
}
```

---

## Loading Animations

| State | Animation | Duration |
|-------|-----------|----------|
| Skeleton | Shimmer (gradient sweep) | 1500ms loop |
| Spinner | Rotate | 1000ms loop |
| Progress bar | Animate width | Based on progress |
| Page load | Skeleton stagger reveal | 50ms stagger |
| Image load | Blur to clear | 300ms |
| AI thinking | Pulse dot | 2000ms loop |

---

## Performance Rules

| Rule | Constraint |
|------|-----------|
| Animated properties only | transform, opacity |
| GPU acceleration | Always use `will-change` for animated elements |
| Concurrent animations | Maximum 8 simultaneous |
| Frame budget | 60fps minimum (16.67ms per frame) |
| Layout thrashing | Zero forced reflows during animation |
| Memory | No retained animation frame handlers after unmount |
| JS thread | Animations on compositor thread only |

---

## Motion Controller

```typescript
// Pseudocode
function MotionController() {
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const inAppReduced = useAppSetting('reducedMotion');
  const isLowPower = useMediaQuery('(prefers-reduced-transparency)');
  
  const reduceMotion = prefersReduced || inAppReduced || isLowPower;
  
  if (reduceMotion) {
    return {
      duration: Math.min(duration, 50),
      easing: 'ease-out',
      type: 'tween',       // No spring animations
    };
  }
  
  return { duration, easing, type };
}
```

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Accessibility-Architecture.md](Accessibility-Architecture.md) | Reduced motion requirements |
| [Responsive-Engine.md](Responsive-Engine.md) | Device-specific animation adjustments |
| [DP-8 Animation System](../08-Interaction-Motion/Animation-System.md) | Source animation specifications |

---

## Validation Notes

1. All animated properties are limited to `transform` and `opacity` — no layout-triggering animations.
2. Maximum 8 concurrent animations ensures consistent 60fps.
3. Reduced motion reduces all animations to ≤50ms or removes them entirely.
4. Page transitions preserve context through layout animations.
5. Animation performance is monitored in CI — regression blocks merge.
