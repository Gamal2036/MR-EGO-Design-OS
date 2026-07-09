# Responsive Motion

**Phase:** DP-8 (Interaction & Motion System)
**Design Authority:** DP-4 ([Responsive/](../05-Application-Shell/Responsive/)), DP-6 ([Responsive-UX.md](../06-UX-Architecture/Responsive-UX.md))
**Inherits:** Responsive breakpoints and behaviors from DP-4 and DP-6

---

## Responsive Interaction Philosophy

Interactions adapt to the device's input method, screen size, and usage context. What works on desktop with a mouse may need adaptation for mobile touch, tablet hybrid use, or ultra-wide multi-tasking. Every interaction pattern has a responsive equivalent.

---

## Breakpoint Interaction Summary

| Breakpoint | Device | Primary Input | Motion Focus |
|------------|--------|---------------|--------------|
| <768px | Mobile phone | Touch | Swipe, tap, bottom sheets |
| 768-1023px | Tablet | Touch + Keyboard | Hybrid interactions |
| 1024-1279px | Laptop | Mouse + Keyboard | Standard interactions |
| 1280-1599px | Desktop | Mouse + Keyboard | Full interaction set |
| 1600px+ | Ultra-wide | Mouse + Keyboard | Multi-panel interactions |
| Variable | Foldable | Touch + Stylus | Adaptive layout transitions |

---

## Mobile Interactions (<768px)

### Navigation Motion

| Pattern | Desktop | Mobile |
|---------|---------|--------|
| Primary nav | Sidebar (left) | Bottom tab bar (5 items max) |
| Secondary nav | Top tabs | Horizontal scroll tabs |
| Tertiary nav | Dropdown menus | Bottom sheets |
| Back navigation | Breadcrumb + browser back | Swipe right + back button |
| Command palette | Center overlay | Full-screen overlay |

### Interaction Changes

| Interaction | Desktop | Mobile |
|-------------|---------|--------|
| Hover | Background + elevation | No hover (tap only) |
| Click | Precise click | Tap with expanded hit area |
| Right-click | Context menu | Long-press context menu |
| Drag | Mouse drag | Touch drag (same behavior) |
| Scroll | Precision scroll | Touch scroll with momentum |
| Resize | Drag edge | Pinch to resize (limited) |

### Mobile-Specific Motion

| Pattern | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Bottom tab switch | Icon transition + content cross-fade | 200ms | Ease-Out |
| Swipe back | Page follows finger, snaps at 30% threshold | 300ms | Ease-Out |
| Pull to refresh | Overscroll + spinner + spring back | 300ms | Ease-Spring |
| Bottom sheet open | Sheet slides up from bottom | 300ms | Ease-Out |
| Bottom sheet close | Sheet slides down | 200ms | Ease-In |
| Bottom sheet drag | Follows finger with resistance | Variable | — |
| Mobile drawer open | Slides from left | 300ms | Ease-Out |
| Hamburger to close | Icon morphs | 200ms | Ease-Out |
| Thumb-reach menu | Flies out from bottom-right | 200ms | Ease-Out |

### Mobile Touch Targets

| Element | Minimum Size |
|---------|-------------|
| Navigation tabs | 44x44px |
| Icon buttons | 44x44px |
| Buttons (text) | 44px height |
| Form controls | 44px height |
| Touch drag handles | 44px hit area |
| Bottom sheet handle | 44px width |

### Mobile Motion Rules

1. No hover-dependent interactions — all interactions work with tap
2. Swipe is primary navigation gesture (back, dismiss, reveal)
3. 300ms touch delay is eliminated (touch-action: manipulation)
4. Mobile keyboard appear causes smooth viewport adjustment (no jump)
5. Bottom sheet drag uses velocity-based snap
6. Pull-to-refresh only enabled on scrollable content at scroll position 0
7. Mobile animations are slightly faster (250ms vs 300ms for transitions)

---

## Tablet Interactions (768-1023px)

### Hybrid Input

| Input | Behavior |
|-------|----------|
| Touch | Same gestures as mobile |
| Keyboard | External keyboard support (same as desktop) |
| Stylus | Precision interaction, hover state emulation |
| Mouse/trackpad | Full hover support when connected |

### Navigation Motion

| Pattern | Behavior |
|---------|----------|
| Sidebar | Collapsed by default (64px icon-only), expand on tap |
| Sidebar expand | Width 64px→240px with labels fade in | 200ms |
| Sidebar collapse | Width 240px→64px with labels fade out | 200ms |
| Tabs | Horizontal scroll if overflow, no dropdown |
| Bottom nav | Not used — sidebar replaces |
| Split view | Possible in landscape orientations |

### Tablet-Specific Motion

| Pattern | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Sidebar peek | Hover on edge reveals sidebar briefly | 200ms | Ease-Out |
| Split keyboard | Keyboard splits, viewport adjusts | 200ms | Ease-Out |
| Stylus hover | Emulated hover effect near tip | 100ms | Ease-Out |
| Rotation | Content reflows smoothly | 300ms | Ease-In-Out |
| Enter split view | App splits to side | 300ms | Ease-Out |

---

## Laptop Interactions (1024-1279px)

| Pattern | Behavior |
|---------|----------|
| Full sidebar | 240px, always visible |
| Full hover | All hover effects active |
| Right-click | Full context menu support |
| Keyboard shortcuts | All shortcuts active |
| Windowed mode | Content reflows for non-maximized windows |

---

## Desktop Interactions (1280-1599px)

| Pattern | Behavior |
|---------|----------|
| Full sidebar | 240px, always visible |
| Additional panels | AI panel, context panel can be docked |
| Multi-window | Full multi-tasking support |
| Drag and drop | Cross-window drag supported |

---

## Ultra-Wide Interactions (1600px+)

| Pattern | Behavior |
|---------|----------|
| Multi-column | 3+ column content layouts |
| Dual panels | Two panels side by side within content area |
| Sidebar + dual panels | Full secondary sidebar, content, info panel |
| Full-width views | Content can expand to fill available width |

### Ultra-Wide Motion

| Pattern | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Panel resize | Smooth width adjustment | During drag | — |
| Content expand | Content width transitions | 300ms | Ease-Out |
| Multi-column reflow | Columns adjust without animation | Instant | — |

---

## Foldable Interactions

| Pattern | Behavior |
|---------|----------|
| Fold closed | Single screen (phone mode) — bottom nav |
| Fold open | Dual screen (tablet mode) — sidebar + content |
| Hinge | Content avoids hinge area, no animation across hinge |
| Seamless transition | Content reflows when fold state changes |
| Continuity | Active task continues across fold state change |

### Foldable Motion

| Pattern | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Fold to unfold | Layout transitions from phone to tablet | 400ms | Ease-In-Out |
| Unfold to fold | Layout transitions from tablet to phone | 400ms | Ease-In-Out |
| Screen span | App spans both screens | 500ms | Ease-In-Out |
| Hinge awareness | Layout adapts to hinge position | 300ms | Ease-Out |

---

## Responsive Motion Rules

1. **Interaction patterns adapt to primary input** — Touch devices skip hover, show visual feedback on tap
2. **Motion duration is slightly faster on mobile** (250ms vs 300ms for transitions)
3. **Complex animations are disabled on mobile** — no staggered reveals, no chart animations
4. **Layout transitions during resize/reflow are smooth but fast** — ≤200ms
5. **Orientation changes trigger smooth reflow** — 300ms transition
6. **Fold devices animate layout changes** — 400ms transition
7. **Touch feedback is instant** — 50ms haptic + visual for every tap
8. **Responsive changes never trigger full page transitions** — only content reflow

---

## Cross-Device Consistency

| Element | Phone | Tablet | Laptop | Desktop | Ultra-wide |
|---------|-------|--------|--------|---------|-----------|
| Button press | Scale 0.97 + haptic | Scale 0.97 | Scale 0.97 | Scale 0.97 | Scale 0.97 |
| Card hover | Tap only | Tap/hover | Hover + elevate | Hover + elevate | Hover + elevate |
| Page transition | Slide 250ms | Slide 300ms | Cross-fade 300ms | Cross-fade 300ms | Cross-fade 300ms |
| Skeleton | Pulse 1500ms | Pulse 1500ms | Pulse 1500ms | Pulse 1500ms | Pulse 1500ms |
| Focus ring | Tap: no ring | Tap: no ring | Visible ring | Visible ring | Visible ring |
| Dialog | Full screen | Centered | Centered | Centered | Centered |

---

*This Responsive Motion document defines interaction differences across devices. Refer to [Gesture-System.md](Gesture-System.md) for touch gestures, [Keyboard-Interactions.md](Keyboard-Interactions.md) for keyboard interactions, and [Accessibility-Motion.md](Accessibility-Motion.md) for accessibility requirements.*
