# Focus Lighting

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Accessibility.md](../../02-Design-Language/Accessibility.md), [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md))

---

## Definition

Focus lighting defines how elements announce keyboard focus. Focus indicators are the primary mechanism for keyboard navigation and must be visible, consistent, and non-intrusive.

---

## Focus Light Model

Focus is indicated by an outer glow ring that follows the element contour. The ring sits outside the element boundary (offset by 2px) and uses the primary color.

```
┌──────────────────────────┐
│  ╔══════════════════════╗ │  ← Focus ring (2px, primary color)
│  ║                      ║ │
│  ║     Element          ║ │
│  ║                      ║ │
│  ╚══════════════════════╝ │
└──────────────────────────┘
```

---

## Focus Ring Specification

| Property | Value |
|----------|-------|
| Width | 2px |
| Style | Solid |
| Color (Light) | Primary-500 (#3B82F6) |
| Color (Dark) | Primary-400 (#60A5FA) |
| Offset | 2px from element edge |
| Radius | Matches element border-radius + 2px |
| Opacity | 100% |
| Shadow spread | 0px (clean ring, no glow spread) |

---

## Focus Light Response by Element

### Input Fields

| Layer | Effect |
|-------|--------|
| Border | Neutral-300 → Primary-500 |
| Ring | 2px primary ring appears outside border |
| Background | No change (keeps surface color) |
| Label (if floating) | Shifts to primary color |

### Buttons

| Layer | Effect |
|-------|--------|
| Ring | 2px primary ring outside button |
| Shadow | Retains current elevation shadow |
| Background | Retains current state background |

### Cards (when interactive and focusable)

| Layer | Effect |
|-------|--------|
| Ring | 2px primary ring outside card |
| Background | Retains card background |
| Shadow | Retains current elevation shadow |

### Links

| Layer | Effect |
|-------|--------|
| Ring | 2px primary ring around link text |
| Text | Retains link color |

---

## Focus Light Rules

1. **Focus ring is always visible** during keyboard navigation. Never use `:focus-visible` alone without browser support fallback.
2. **Focus never uses outline** (the CSS `outline` property) — always use `box-shadow` or `ring` implementation for consistent border-radius.
3. **Focus ring color is always Primary-500 (light) / Primary-400 (dark).** Never customize focus color per element.
4. **Focus ring offset is always 2px.** Never zero (too tight) and never more than 4px (too disconnected).
5. **Focus ring must meet 3:1 contrast ratio** against the background it sits on.
6. **Focus never triggers on click/tap** — only on keyboard navigation.
7. **Elements inside modals and dialogs maintain the same focus ring** — no treatment change.

---

## Focus vs Hover Lighting

When an element is both hovered and focused:

| Element | Hover Effect | Focus Effect | Combined |
|---------|-------------|--------------|----------|
| Input | Background tint | Border + ring | Both visible |
| Button | Background shift | Ring | Both visible |
| Card | Elevation increase | Ring | Both visible |
| Link | Underline | Ring | Both visible |

Hover and focus effects are additive. Both remain visible simultaneously.

---

## Reduced Motion Focus

When `prefers-reduced-motion: reduce` is enabled:

| Property | Change |
|----------|--------|
| Ring appear | Instant (0ms transition) |
| Ring disappear | Instant (0ms transition) |
| Color transition | Disabled (snap to final color) |
| Visibility | Unchanged (focus must always be visible) |

Focus indicators are never disabled by reduced motion — accessibility requires them.

---

*This Focus Lighting specification is permanent. All keyboard-accessible elements implement this focus model. Refer to [Accessibility.md](../../02-Design-Language/Accessibility.md) for accessibility requirements, [Hover-Lighting.md](Hover-Lighting.md) for hover behavior, and [Interactive-Lighting.md](Interactive-Lighting.md) for interactive state lighting.*
