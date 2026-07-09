# Motion System

**Phase:** DP-8 (Interaction & Motion System)
**Design Authority:** DP-1 ([Motion-System.md](../02-Design-Language/Motion-System.md)), DP-5 ([Motion-System.md](../06-Visual-Foundation/Motion/Motion-System.md))
**Inherits:** All duration, easing, and motion values from DP-1 and DP-5

---

## Motion Philosophy

Motion in MR:EGO communicates hierarchy, state change, spatial relationship, and feedback. Every animation has a purpose. Motion that does not communicate is decoration.

---

## Timing Categories

### Category Definitions

| Category | Duration | Perception | Usage |
|----------|----------|------------|-------|
| Ultra Fast | ≤50ms | Instant | Feedback, press, active state |
| Fast | 100ms | Immediate | Hover, focus, micro-interactions |
| Normal | 200ms | Smooth | Standard transitions, state changes |
| Slow | 300-400ms | Deliberate | Page transitions, panel slides |
| Long Running | 500-800ms | Narrative | Complex transitions, celebrations |
| Background | 1000-2000ms | Perpetual | Loading loops, AI thinking |
| AI Processing | variable | Progressive | Streaming, generating, analyzing |
| File Upload | variable | Determinate | Upload progress per file |
| Synchronization | variable | Background | Data sync operations |

### Timing Selection Rules

1. Use the fastest category that provides sufficient communication
2. Never use Slow for micro-interactions
3. Never use Ultra Fast for page transitions
4. Duration scales with distance — a 300px panel slide takes 300ms
5. Duration scales with importance — destructive actions feel weightier at 400ms

---

## Easing System

### Core Curves

| Curve Token | Definition | Feeling |
|-------------|-----------|---------|
| Ease-Out | `cubic-bezier(0.16, 1, 0.3, 1)` | Decelerating, settling, arriving |
| Ease-In | `cubic-bezier(0.4, 0, 0.68, 0.06)` | Accelerating, leaving, exiting |
| Ease-In-Out | `cubic-bezier(0.65, 0, 0.35, 1)` | Symmetrical, state change, transition |
| Ease-Spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Subtle overshoot, confirmation, success |
| Ease-Smooth | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Continuous, data-driven, charts |

### Context-to-Curve Mapping

| Context | Curve | Rationale |
|---------|-------|-----------|
| Element entering view | Ease-Out | Arrives and settles naturally |
| Element leaving view | Ease-In | Departs with purpose |
| State transition | Ease-In-Out | Smooth, continuous change |
| Success confirmation | Ease-Spring | Subtle celebration, not bouncy |
| Data animation | Ease-Smooth | Continuous, neutral, non-distracting |
| Loading indicator | Linear | Continuous rotation requires constant speed |

### Easing Rules

1. Never use linear for human-initiated motion — only for mechanical rotation
2. Never use Ease-Spring for errors, warnings, or dismissals
3. Enter and exit curves must be directional opposites
4. Easing curve selection is contextual, not arbitrary

---

## Duration Reference

| Interaction | Duration | Easing |
|------------|----------|--------|
| Button press | 50ms | Ease-Out |
| Hover state | 100ms | Ease-Out |
| Focus ring | 100ms | Ease-Out |
| State toggle | 200ms | Ease-In-Out |
| Element appear | 200ms | Ease-Out |
| Element disappear | 150ms | Ease-In |
| Dropdown open | 200ms | Ease-Out |
| Dropdown close | 150ms | Ease-In |
| Modal open | 200ms | Ease-Out |
| Modal close | 150ms | Ease-In |
| Panel slide | 300ms | Ease-Out |
| Page transition | 300ms | Ease-In-Out |
| Toast appear | 300ms | Ease-Out |
| Toast dismiss | 200ms | Ease-In |
| Card hover | 200ms | Ease-Out |
| Tooltip appear | 300ms | Ease-Out |
| Skeleton pulse | 1500ms | Ease-In-Out |

---

## Motion Personality by Component Type

| Type | Personality | Speed | Curve |
|------|-------------|-------|-------|
| Buttons | Responsive, tactile | Fast | Ease-Out |
| Cards | Subtle, spatial | Normal | Ease-Out |
| Dialogs | Purposeful, weighty | Normal | Ease-Out |
| Panels | Flowing, connected | Slow | Ease-Out |
| Navigation | Clear, directional | Normal | Ease-In-Out |
| Toasts | Informative, brief | Normal | Ease-Out |
| Tooltips | Precise, helpful | Fast | Ease-Out |
| Loading | Patient, expected | Background | Ease-In-Out |
| AI | Curious, processing | Background | Ease-In-Out |
| Gestures | Physical, natural | Variable | Ease-Out |
| Dashboard | Calm, informative | Normal | Ease-Smooth |

---

## Motion Hierarchy

### Layer-Based Motion

| Layer | Default Motion | Interaction Motion |
|-------|---------------|-------------------|
| Layer 0 (Base) | Static | No hover elevation |
| Layer 1 (Surface) | Static | Hover: Layer 2, 200ms |
| Layer 2 (Raised) | Static | Hover: shadow deepen, 200ms |
| Layer 3 (Elevated) | Enter 200ms | No hover change |
| Layer 4 (Floating) | Enter 300ms | No hover change |

### Z-Index Motion Behavior

| Z-Index Range | Motion Pattern |
|---------------|----------------|
| 0-9 (Base content) | No animation on appear, only state changes |
| 10-99 (Interactive) | Hover, focus, active animations |
| 100-199 (Sticky) | No motion, pinned |
| 200-299 (Temporary) | Enter/exit animations always |
| 300-399 (Overlay) | Backdrop + content animation |
| 400-499 (Modal) | Scale + fade with backdrop |
| 500+ (Toast/Tooltip) | Slide + fade from edge |

---

## Motion Rules

1. **One animation at a time per element** — No two properties animate simultaneously on the same element unless orchestrated
2. **Staggered animations use 50ms delay** between each element, maximum 8 elements
3. **Enter and exit animations are reversible** — If an element enters left-to-right, it exits right-to-left
4. **Motion duration scales with distance** — A panel sliding 300px uses 300ms, a tooltip appearing 8px uses 100ms
5. **No infinite animations except loading indicators** — Spinners and skeleton pulses loop exclusively
6. **Animations never block interaction** — All animations use `pointer-events: none` during animation
7. **Elements animate transform and opacity only** — Never width, height, top, left, margin, or padding
8. **All animations run at 60fps minimum** — GPU-accelerated properties only
9. **Maximum 3 simultaneous animations per viewport region**
10. **Animation delay is never used for timing logic** — Use a JS-based scheduler for sequencing

---

## Motion Permission System

| Permission | Allowed Elements | Duration Limit |
|------------|-----------------|----------------|
| Instant | Feedback, press, active | ≤50ms |
| Micro | Hover, focus, toggle | ≤100ms |
| Standard | Appear, disappear, state | ≤200ms |
| Transitional | Panel, modal, page | ≤400ms |
| Narrative | Success, welcome, celebration | ≤800ms |
| Background | Loading, AI, sync | ≤2000ms loop |

---

## Reduced Motion Support

See [Accessibility-Motion.md](Accessibility-Motion.md) for complete reduced motion specifications.

All animations in this system honor `prefers-reduced-motion: reduce` and the in-app motion reduction setting.

---

## Performance Budget

| Metric | Budget |
|--------|--------|
| Animation frame rate | 60fps minimum |
| Max concurrent animations | 8 (staggered) |
| Animation paint time | <10ms per frame |
| GPU memory for animations | <5MB |
| Animation startup delay | 0ms |
| Reduced motion response | All animations ≤50ms |

---

*This Motion System expands DP-1 and DP-5 motion specifications into a complete motion framework. Refer to [Interaction-System.md](Interaction-System.md) for interaction rules, [Animation-System.md](Animation-System.md) for animation orchestration, and [Accessibility-Motion.md](Accessibility-Motion.md) for reduced motion.*
