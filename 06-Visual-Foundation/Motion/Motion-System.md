# Motion System (Visual Foundation)

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Brand-Constitution.md](../../01-Constitution/Brand-Constitution.md))
**Inherits:** DP-1 ([Motion-System.md](../../02-Design-Language/Motion-System.md), [Animation-Principles.md](../../02-Design-Language/Animation-Principles.md))

---

## Definition

The Visual Foundation Motion System defines the emotional and experiential quality of motion — beyond the duration and easing values defined in DP-1. This document describes how motion should feel, not just how it should perform.

---

## Motion Personality

MR:EGO's motion personality is:

**Purposeful. Predictable. Deferential. Calm.**

| Trait | Description | Opposite (Avoid) |
|-------|-------------|-----------------|
| Purposeful | Every animation communicates meaning | Decorative, ornamental motion |
| Predictable | Users can anticipate how things move | Surprising, inconsistent motion |
| Deferential | Motion serves content, not the reverse | Motion that demands attention |
| Calm | Gentle speeds, natural easing | Fast, aggressive, startle-inducing |

---

## Motion Emotional Quality

| Motion Type | Emotional Quality | Duration | Easing |
|-------------|------------------|----------|--------|
| Enter | Welcoming, settled | 200-300ms | Ease-Out |
| Exit | Fading, not fleeing | 150-200ms | Ease-In |
| State change | Smooth, continuous | 200ms | Ease-In-Out |
| Hover | Responsive, alive | 100ms | Ease-Out |
| Focus | Clear, helpful | 100ms | Ease-Out |
| Loading | Patient, expected | 1500ms loop | Ease-In-Out |
| AI thinking | Curious, processing | 2000ms loop | Ease-In-Out |
| Navigation | Connected, spatial | 300ms | Ease-In-Out |
| Notification | Informative, not urgent | 300ms | Ease-Out |

---

## Motion Timing Principles

### Interaction Timing

| Interaction | Perceived Timing | Actual Timing | Why |
|------------|-----------------|---------------|-----|
| Visual feedback | Instant | ≤50ms | User must know action registered |
| Hover effect | Immediate | 100ms | Hover is direct manipulation |
| Tooltip appear | Brief delay | 300ms | Prevents tooltip flicker on accidental hover |
| State transition | Smooth | 200ms | Fast enough to feel instant, slow enough to perceive |
| Page transition | Connected | 300ms | Content needs time to reorganize |
| AI streaming | Progressive | variable | Words appear as generated |

### Perception Rules

1. **50ms or less = instant.** Users perceive no delay. Use for feedback.
2. **100-200ms = immediate.** Users perceive a connection but no wait.
3. **200-300ms = smooth.** Users perceive a transition without impatience.
4. **300-500ms = deliberate.** Users notice and process the change.
5. **500ms+ = slow.** Use only for complex transitions or loading states.

---

## Motion Context Rules

### Hover Motion

| Element | Effect | Duration | Notes |
|---------|--------|----------|-------|
| Card | Elevation rise, shadow spread | 200ms | Gentle, consistent |
| Button | Background shift | 100ms | Subtle, immediate |
| Link | Color change + underline | 100ms | Minimal, clear |
| Table row | Background tint | 100ms | Barely perceptible |
| Icon button | Background appear | 100ms | Within icon bounds |

### Focus Motion

Focus rings appear at 100ms — fast enough to feel responsive but slow enough to perceive. Focus never uses instantaneous appearance.

### Navigation Motion

| Navigation Type | Animation | Duration |
|----------------|-----------|----------|
| Tab switch | Content cross-fade | 200ms |
| Page navigation | Cross-fade + slight scale | 300ms |
| Panel slide | Slide from edge (matched to distance) | 300ms |
| Dropdown open | Fade + slide down (8px) | 200ms |
| Breadcrumb update | Fade in new, fade out old | 200ms |

### AI Motion

| AI Action | Animation | Duration |
|-----------|-----------|----------|
| Thinking | Gentle pulse | 2000ms loop |
| Streaming | Word-by-word reveal | Variable |
| Suggestion appear | Fade in beside content | 300ms |
| Suggestion dismiss | Fade out | 150ms |
| Confidence update | Badge opacity transition | 200ms |

### Notification Motion

| Notification Action | Animation | Duration |
|--------------------|-----------|----------|
| Appear | Slide from edge + fade | 300ms |
| Dismiss | Fade out | 200ms |
| Stack adjust | Smooth reposition | 200ms |
| Action taken | Checkmark + compression | 200ms |

### Dialog Motion

| Dialog Action | Animation | Duration |
|---------------|-----------|----------|
| Backdrop appear | Fade in | 200ms |
| Content appear | Scale (1.05 → 1.0) + fade | 200ms |
| Content dismiss | Scale (1.0 → 0.95) + fade | 150ms |
| Backdrop dismiss | Fade out | 150ms |

---

## Performance Budget

| Metric | Budget |
|--------|--------|
| Animation frame rate | 60fps minimum |
| Max concurrent animations | 8 (staggered, not simultaneous) |
| Animation paint time | < 10ms per frame |
| GPU memory for animations | < 5MB |
| Animation startup delay | 0ms (no startup animations) |
| Reduced motion response | All animations → ≤50ms |

---

## Reduced Motion

When `prefers-reduced-motion: reduce` is enabled:

| Motion Type | Behavior |
|-------------|----------|
| Hover effects | 50ms (instant) |
| Focus ring | 0ms (instant) |
| Enter/exit animations | Opacity only, 50ms |
| State transitions | Instant (0ms) |
| AI thinking pulse | Static glow (no pulse) |
| Loading shimmer | Static or disabled |
| Navigation | Instant cross-fade at 50ms |
| Animated icons | Static |

---

*This Motion System (Visual Foundation) is permanent. It defines the feel of motion, not just the mechanics. Refer to [Motion-System.md](../../02-Design-Language/Motion-System.md) for duration and easing values, [Animation-Principles.md](../../02-Design-Language/Animation-Principles.md) for animation philosophy, and [MicroInteractions](../MicroInteractions/) for detailed micro-interaction specifications.*
