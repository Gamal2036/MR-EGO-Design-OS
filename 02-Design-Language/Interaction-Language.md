# Interaction Language

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md), [Design-Principles.md](../01-Constitution/Design-Principles.md))

---

## Philosophy

Interaction is how the user communicates intent to MR:EGO and receives feedback. Every interaction should feel **natural, predictable, and responsive.** The interaction language defines the patterns that govern all user actions across the platform.

---

## Click / Tap

| Element | Visual Response | Duration | Haptic (Mobile) |
|---------|----------------|----------|-----------------|
| Button | Background darken + subtle scale to 0.97 | 50ms | Light tap |
| Card / Row | Background tint change | 100ms | None |
| Link | Color change + underline | 100ms | None |
| Icon button | Background tint (20% opacity) | 50ms | Light tap |
| List item | Background tint | 100ms | None |

---

## Hover

| Element | Response | Duration |
|---------|----------|----------|
| Button | Background shade shift (1 step lighter/darker) | 100ms |
| Card | Elevation increase (Layer 1 → Layer 2) | 200ms |
| Link | Color change | 100ms |
| Icon button | Background tint appear | 100ms |
| Table row | Row background tint | 100ms |
| Tooltip trigger | Tooltip appears with 300ms delay | 300ms |

---

## Focus

| Element | Response | Duration |
|---------|----------|----------|
| Input | Border color change + 2px ring | 100ms |
| Button | Focus ring appears | 100ms |
| Link | Focus ring appears | 100ms |
| Any interactive | Visible focus indicator | 100ms |

---

## Drag

| Element | Response | Details |
|---------|----------|---------|
| Draggable item | Slight scale (1.02) + shadow increase | Ease-Out, 100ms |
| Drop target | Highlight border | Ease-Out, 100ms |
| Item placed | Scale back + snap animation | Ease-Spring, 200ms |

---

## Swipe

| Element | Response | Platform |
|---------|----------|----------|
| List item | Reveal action behind item | Mobile only |
| Panel / Sheet | Drag to dismiss | Mobile only |
| Carousel | Horizontal scroll with snapping | All touch devices |

---

## Long Press

| Element | Response | Duration |
|---------|----------|----------|
| Any element | Context menu appears | 500ms hold |

---

## State Transitions

All state transitions follow consistent patterns:

| Transition | Animation | Duration |
|------------|-----------|----------|
| Visible → Hidden | Opacity 1 → 0 (Ease-In) | 150ms |
| Hidden → Visible | Opacity 0 → 1 (Ease-Out) | 200ms |
| Disabled → Enabled | No animation (instant) | 0ms |
| Enabled → Disabled | Opacity 1 → 0.4 (Ease-Out) | 100ms |
| Loading → Loaded | Content cross-fade | 200ms |
| Error → Normal | No animation (instant) | 0ms |

---

## Interaction Rules

1. **Visual feedback within 50ms.** Every user action produces a visible response within 50ms.
2. **No dead clicks.** Every clickable element provides feedback. Even disabled buttons show a cursor change.
3. **One interaction mode per element.** An element is clickable, draggable, or swipeable — never multiple.
4. **Touch targets are minimum 44x44px** on all touch devices.
5. **No hover-only interactions.** Any action revealed on hover must also be accessible via click/focus.
6. **Gestures are optional.** Every swipe action has a button alternative.
7. **Disabled states explain why.** Tooltip or adjacent text explains why an element is disabled.

---

## Cursor Rules

| Element | Cursor |
|---------|--------|
| Button, link, interactive | `pointer` |
| Text input, textarea | `text` |
| Disabled element | `not-allowed` |
| Draggable | `grab` (default), `grabbing` (active) |
| Resizable | `ns-resize`, `ew-resize`, etc. |
| Default (non-interactive) | `default` |

---

*This Interaction Language is permanent. All components in DP-2 implement these interaction patterns. Refer to [Feedback-System.md](Feedback-System.md) for feedback states, [Motion-System.md](Motion-System.md) for animation specifications, and [Accessibility.md](Accessibility.md) for keyboard and screen reader interaction requirements.*
