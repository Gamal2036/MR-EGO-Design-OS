# Accessibility — Motion

**Phase:** DP-8 (Interaction & Motion System)
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md) — Rule 6), DP-1 ([Accessibility.md](../02-Design-Language/Accessibility.md), [Motion-System.md](../02-Design-Language/Motion-System.md))
**Inherits:** All reduced motion specifications from DP-1, DP-4, DP-5

---

## Reduced Motion Philosophy

Motion accessibility is not an afterthought — it is a core requirement. Every animation in MR:EGO has a reduced-motion alternative. Users with vestibular disorders, motion sensitivity, or attention disorders can disable or reduce all motion.

---

## Reduced Motion Levels

### Level 1: Reduce (prefers-reduced-motion: reduce)

| Motion Type | Behavior |
|-------------|----------|
| Hover effects | Instant (0ms) — color/background changes without transition |
| Focus ring | Instant (0ms) |
| Enter animations | Opacity only, 50ms |
| Exit animations | Opacity only, 50ms |
| State transitions | Instant (0ms) |
| Navigation transitions | Instant cross-fade, 50ms |
| Micro-interactions | All ≤50ms |
| Skeleton shimmer | Static — no pulse animation |
| Loading spinner | Rotation continues (essential — indicates progress) |
| Progress bar | Width fill instant (0ms) |
| AI thinking pulse | Static glow — no pulse |
| AI streaming | Text appears all at once (no word-by-word) |
| Charts | Data renders instantly (no draw animation) |
| Toast | Instant appear/dismiss |
| Dialog | Instant appear/dismiss |
| Animated icons | Static |

### Level 2: Disable (prefers-reduced-motion: reduce + user setting)

| Motion Type | Behavior |
|-------------|----------|
| All transitions | Removed entirely |
| All animations | Removed entirely |
| Loading spinner | Static icon (no rotation) |
| Skeleton | Static placeholder (no pulse) |
| Progress bar | Static percentage display |
| AI thinking | Static icon (no indicator) |

---

## Settings-Based Motion Control

| Setting | Effect | Default |
|---------|--------|---------|
| Reduce motion | Follows OS `prefers-reduced-motion` | On |
| Disable all motion | Removes all animations and transitions | Off |
| Reduce AI motion | AI static displays instead of animated | Off |
| Allow essential motion | Loading indicators permitted | On |

### Settings Priority

```
1. System prefers-reduced-motion (OS-level)
2. In-app "Reduce motion" setting
3. In-app "Disable all motion" setting (overrides all)
4. Component-level reduced-motion prop (for custom overrides)
```

---

## Reduced Motion by Component

| Component | Normal | Reduced (Level 1) | Disabled (Level 2) |
|-----------|--------|-------------------|---------------------|
| Button press | Scale 0.97, 50ms | Opacity change, 0ms | No change |
| Card hover | Elevate + shadow, 200ms | Background tint, 0ms | No change |
| Dialog open | Scale + fade, 200ms | Opacity only, 50ms | Instant show |
| Page transition | Slide + fade, 300ms | Cross-fade, 50ms | Instant swap |
| Skeleton | Shimmer pulse, 1500ms | Static placeholder | Hidden |
| Spinner | Rotation, 1000ms loop | Rotation continues | Static icon |
| Toast | Slide + fade, 300ms | Opacity, 50ms | Instant |
| Tooltip | Fade, 200ms | Instant show | No show |
| AI thinking | Pulse, 2000ms loop | Static glow | Hidden |
| Chart draw | Animate in, 600ms | Instant render | Instant render |
| List stagger | 50ms per item, 200ms each | All at once, 50ms | Instant |
| Tab indicator | Slide, 200ms | Instant | Instant |

---

## Screen Reader Motion

| Requirement | Specification |
|-------------|---------------|
| Loading state | `role="status"` + `aria-live="polite"` |
| Content loaded | Announce content change via `aria-live` |
| Progress bar | `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| Skeleton | `aria-hidden="true"` (not announced) |
| AI streaming | `aria-live="polite"` on output region |
| Toast notification | `role="alert"` + `aria-live="assertive"` |
| Dialog open | Focus moved to dialog, `aria-modal="true"` |
| Page transition | Announce page title on completion |
| Error state | `role="alert"` |
| Success state | Announce via `aria-live` |
| Drag and drop | Announce position changes via `aria-live` |

### Screen Reader Rules

1. Motion-based information is always duplicated in text or ARIA
2. Screen readers receive state change announcements regardless of animation state
3. Loading state announcements use `aria-live="polite"` (not assertive)
4. Error notifications use `aria-live="assertive"`
5. Page changes use `aria-live="polite"` to announce new page title
6. Animations never interfere with screen reader focus or announcements

---

## Keyboard-Only Motion

| Element | Focus Behavior | Motion |
|---------|---------------|--------|
| All interactive | Visible focus ring | 100ms ring appear |
| Tab navigation | Tab stops in logical order | Focus ring follows tab |
| Skip link | First focusable element | Appears on first Tab press |
| Focus trap (modals) | Focus cycles within modal | No animation needed |
| Focus management | Programmatic focus after action | Instant focus move |

---

## High Contrast Motion

| Element | Behavior |
|---------|----------|
| Focus ring | Maintains 2px ring regardless of contrast mode |
| Hover states | Background change must meet contrast minimum |
| Active states | Visual change must be visible in high contrast |
| Loading indicator | Spinner remains visible in high contrast |
| Animations | Same reduced-motion behavior applies |

---

## Vestibular Disorder Safety

| Motion Type | Risk | Alternative |
|-------------|------|-------------|
| Scale animation | Low (minor) | Opacity-only |
| Slide animation | Low (minor) | Opacity-only |
| Parallax | High (never used) | Not applicable |
| Perspective shift | High (never used) | Not applicable |
| Rapid scale changes | Medium (avoid) | Smooth, slow transitions |
| Flashing | High (never used) | Not applicable |
| 3D transforms | Medium (avoid) | Not applicable |
| Strobing | High (never used) | Not applicable |

### Vestibular Safety Rules

1. Never use parallax, perspective shifts, or simulated 3D motion
2. Never use animations exceeding 3 flashes per second
3. Scale animations limited to ±5% maximum
4. Slide distances limited to viewport width/height
5. All animations respect `prefers-reduced-motion` automatically

---

## Touch Accessibility Motion

| Element | Touch Behavior | Haptic |
|---------|---------------|--------|
| Button | Scale 0.97 on press | Light tap (optional) |
| Card | Background tint | None |
| Toggle | Knob slides | Light tap |
| Swipe | Action reveal | Light haptic at threshold |
| Long press | Context menu | Heavy haptic on trigger |

---

## Voice Control Motion

| Requirement | Specification |
|-------------|---------------|
| Motion does not interfere | Voice commands work during animations |
| No animation-dependent actions | All actions available without animation |
| Focus remains visible | Focus indicator persists during motion |
| Reduced motion applies | Voice Control users benefit from reduced motion |

---

## Large Text Motion

| Scenario | Behavior |
|----------|----------|
| Text scales up | Animations scale proportionally |
| Text overflows | No animation of overflow content |
| Text size changes | Smooth text reflow (no animation of layout) |
| Animations with text | Text remains readable during and after motion |

---

## Testing Requirements

| Test | Criteria |
|------|----------|
| Reduced motion toggle | All animations reduce to ≤50ms or disable |
| No motion mode | Zero animations play |
| Screen reader | All states announced correctly during animation |
| Keyboard navigation | Focus remains visible during and after animation |
| High contrast | All interactive states visible |
| Vestibular | No animation triggers discomfort |
| Touch | Touch targets remain functional during animation |

---

*This Accessibility Motion document defines all motion accessibility requirements. Refer to [Motion-System.md](Motion-System.md) for core motion rules, [Animation-System.md](Animation-System.md) for animation patterns, and [Keyboard-Interactions.md](Keyboard-Interactions.md) for keyboard interaction details.*
