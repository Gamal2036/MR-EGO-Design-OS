# Motion System

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Brand-Constitution.md](../01-Constitution/Brand-Constitution.md), [UX-Constitution.md](../01-Constitution/UX-Constitution.md))

---

## Philosophy

Motion in MR:EGO is **purposeful and restrained.** Every animation communicates something — hierarchy, state change, spatial relationship, or feedback. Motion that does not communicate is decoration, and decoration does not belong in MR:EGO.

The system defines a limited set of durations, easing curves, and motion patterns. Using more creates inconsistency and cognitive load.

---

## Duration Scale

All durations use milliseconds (ms). The scale is intentionally small — more durations create inconsistency.

| Token | Duration | Usage |
|-------|----------|-------|
| Duration-Instant | 50ms | Visual feedback on touch, button press |
| Duration-Fast | 100ms | Hover states, focus rings, micro-interactions |
| Duration-Normal | 200ms | Standard transitions, element show/hide |
| Duration-Slow | 300ms | Page transitions, panel slides |
| Duration-XSlow | 500ms | Complex transitions, staggered animations |
| Duration-XXSlow | 800ms | Loading sequences, brand moments |

---

## Easing Curves

MR:EGO never uses linear animations. Every easing curve has a reason.

| Token | Curve | Usage |
|-------|-------|-------|
| Ease-Out | `cubic-bezier(0.16, 1, 0.3, 1)` | Elements entering, appearing — decelerate naturally |
| Ease-In | `cubic-bezier(0.4, 0, 0.68, 0.06)` | Elements leaving, disappearing — accelerate out |
| Ease-In-Out | `cubic-bezier(0.65, 0, 0.35, 1)` | Elements changing state, moving between positions |
| Ease-Spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Subtle bounce for confirmation, success states |

### Easing Rules

1. **Entering elements:** Ease-Out — elements arrive quickly and decelerate to rest.
2. **Exiting elements:** Ease-In — elements accelerate out and disappear.
3. **State transitions:** Ease-In-Out — smooth transition between states.
4. **Celebratory feedback:** Ease-Spring — used only for positive confirmation (checkmarks, success). Never for errors.
5. **Never use linear.** It feels robotic and unnatural.
6. **Never use custom keyframes** beyond these curves. The defined set covers all needs.

---

## Motion by Context

### Micro-Interactions (50–100ms)

| Action | Duration | Easing | Effect |
|--------|----------|--------|--------|
| Button hover | 100ms | Ease-Out | Background color shift |
| Button press | 50ms | Ease-Out | Scale to 0.97 |
| Link hover | 100ms | Ease-Out | Color transition |
| Input focus | 100ms | Ease-Out | Border color + ring |
| Card hover | 200ms | Ease-Out | Shadow intensity + slight lift |

### Transitions (200–300ms)

| Action | Duration | Easing | Effect |
|--------|----------|--------|--------|
| Tab switch | 200ms | Ease-In-Out | Content cross-fade |
| Panel slide | 300ms | Ease-Out | Slide from edge |
| Modal open | 200ms | Ease-Out | Scale up + fade in |
| Modal close | 150ms | Ease-In | Scale down + fade out |
| Dropdown open | 200ms | Ease-Out | Fade + slide down |
| Dropdown close | 150ms | Ease-In | Fade + slide up |
| Page transition | 300ms | Ease-In-Out | Cross-fade |
| Toast appear | 300ms | Ease-Out | Slide + fade |
| Toast dismiss | 200ms | Ease-In | Fade out |

### Loading (300–800ms)

| Action | Duration | Easing | Effect |
|--------|----------|--------|--------|
| Skeleton pulse | 1500ms | Ease-In-Out | Loop — opacity pulse |
| Spinner rotation | 1000ms | Linear | Continuous rotation |
| Content reveal | 300ms | Ease-Out | Staggered fade in |
| Progress bar | 200ms | Ease-Out | Width transition |

---

## Motion Accessibility

All motion respects user accessibility preferences:

1. **`prefers-reduced-motion`:** When enabled, all animations are reduced to 50ms instant transitions or disabled entirely.
2. **No auto-playing motion.** Any motion that triggers automatically must respect reduced-motion preferences.
3. **No flashing or strobing.** No animation exceeds 3 flashes per second.
4. **No motion that triggers vestibular disorders.** No parallax, no perspective shifts, no simulated 3D motion.
5. **Motion reduction is not binary.** When reduced motion is preferred:
   - Opacity transitions remain (0ms → target, no animation)
   - Transform transitions are disabled
   - Micro-interactions (hover, focus) remain but at 50ms
   - Loading animations continue (they indicate progress)
6. **User can disable all motion** in accessibility settings.

*See [Accessibility.md](Accessibility.md) for complete accessibility specifications.*
*See [Animation-Principles.md](Animation-Principles.md) for detailed animation guidance.*

---

## Motion Rules

1. **One animation at a time per element.** Elements do not animate two properties simultaneously unless orchestrated.
2. **Staggered animations use 50ms delay** between each element, maximum 8 elements.
3. **Enter and exit animations are symmetric.** If an element enters left-to-right, it exits right-to-left.
4. **Motion duration scales with distance.** A panel sliding 300px uses 300ms. A tooltip appearing 8px above its trigger uses 100ms.
5. **No infinite animations except loading indicators.** Spinners and skeleton pulses loop. Nothing else loops.
6. **Animations never block interaction.** All animations are `pointer-events: none` during animation.

---

*This Motion System is permanent. All components in DP-2 implement these motion specifications. Refer to [Animation-Principles.md](Animation-Principles.md) for deeper animation guidance, [Accessibility.md](Accessibility.md) for reduced motion, and [Interaction-Language.md](Interaction-Language.md) for interaction patterns.*
