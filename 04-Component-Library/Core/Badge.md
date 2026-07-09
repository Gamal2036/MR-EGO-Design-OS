# Badge

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md))

---

## Purpose

Badge indicates notification count, status, or attention-requiring information. It is the primary mechanism for drawing user attention to new items, unread counts, system status, and notification states across the MR:EGO platform.

---

## Responsibilities

- Display a notification count, status indicator, or labeled status
- Render as a dot, number, icon, or label depending on variant
- Apply semantic colors to communicate meaning (info, success, warning, danger, neutral)
- Position itself as an overlay on parent elements (e.g., IconButton, Avatar)
- Render standalone or as an inline indicator
- Remain non-interactive (read-only display)

---

## Composition

```
Badge (standalone or overlay)
├── Dot (variant: dot)
├── Count (variant: number)
├── Icon (variant: icon)
└── Label (variant: label)
```

Badge does not use any sub-components. It renders content inline based on the variant.

---

## Hierarchy

**Level:** 1 (Core Primitive)

**Parent:** None (consumed by IconButton, Button, Avatar, Card, SidebarItem, Tabs, and standalone use)

**Children:** None

**Siblings:** `Avatar`, `Chip`, `Tag`, `Tooltip`, `Surface`, `Container`, `Divider`

---

## Props Contract

```typescript
/**
 * Badge visual variant.
 * - dot: Small colored dot. No value. For presence or unread indication.
 * - number: Numeric count. For notification counts, unread items.
 * - icon: Icon with optional label. For status indicators.
 * - label: Text label with colored background. For status tags.
 */
type BadgeVariant = 'dot' | 'number' | 'icon' | 'label';

/**
 * Badge semantic color.
 * - info: Blue (Primary). Informational.
 * - success: Green. Positive confirmation.
 * - warning: Amber. Caution, attention needed.
 * - danger: Red. Error, critical.
 * - neutral: Gray. Default, no semantic meaning.
 */
type BadgeColor = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

/**
 * Badge position when used as an overlay on a parent element.
 */
type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface BadgeProps {
  /** Visual variant. @default 'dot' */
  variant?: BadgeVariant;
  /** Semantic color. @default 'neutral' */
  color?: BadgeColor;
  /** Numeric value for 'number' variant. */
  value?: number;
  /** Maximum value before showing '+' suffix (e.g., 99+). @default 99 */
  maxValue?: number;
  /** Icon element for 'icon' variant. */
  icon?: React.ReactNode;
  /** Label text for 'label' variant, or aria-label for all variants. */
  children?: React.ReactNode;
  /** Whether the badge is an overlay on a parent element. @default false */
  isOverlay?: boolean;
  /** Overlay position. @default 'top-right' */
  overlayPosition?: BadgePosition;
  /** Whether to show the badge. Useful for conditional display without unmounting. @default true */
  isVisible?: boolean;
  /** Whether the badge has a subtle pulse animation on mount. @default false */
  animateOnMount?: boolean;
  /** Additional class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
  /** Data test ID for automated testing. */
  dataTestId?: string;
  /** Ref forwarded to the root element. */
  ref?: React.Ref<HTMLSpanElement>;
}
```

---

## Variants

### Dot
Small colored circle for presence, unread, or active indication.

| Property | Value |
|----------|-------|
| Shape | Circle |
| Size | 8px diameter |
| Border (overlay) | 2px white border when used as overlay |

```
Example: ●
```

### Number
Numeric count for notification badges.

| Property | Value |
|----------|-------|
| Shape | Pill (Radius-Full) |
| Min Width | 20px |
| Height | 20px |
| Padding | 0 6px |
| Font Size | 12px (Overline), 600 weight |
| Text Color | White |
| Max Display | Configurable via `maxValue` (default 99) |

```
Example: [12]  [99+]  [3]
```

### Icon
Icon with optional label for status indicators.

| Property | Value |
|----------|-------|
| Shape | Pill or square (depends on content) |
| Icon Size | 14px |
| Padding | 4px 6px (icon only), 4px 8px (with label) |
| Label Font | 12px (Overline) |

```
Example: [✓ Synced]  [⚠]  [⟳ Pending]
```

### Label
Text label with colored background.

| Property | Value |
|----------|-------|
| Shape | Pill (Radius-Full) |
| Padding | 4px 8px |
| Font | 12px (Overline), 600 weight |
| Text Color | White (info, success, warning, danger) / Text-Body (neutral) |

```
Example: [New]  [Beta]  [In Progress]
```

---

## Semantic Colors

| Color | Background (Light) | Background (Dark) | Text | Usage |
|-------|-------------------|-------------------|------|-------|
| Info | Primary-500 | Primary-400 | White | Notifications, information |
| Success | Success-500 | Success-500 | White | Confirmations, sync status |
| Warning | Warning-500 | Warning-500 | White | Warnings, attention needed |
| Danger | Danger-500 | Danger-500 | White | Errors, critical alerts |
| Neutral | Neutral-200 | Neutral-400 | Text-Body (neutral-700) | Default, no semantic meaning |

For the `neutral` label variant, text uses Text-Body color instead of white for readability on light gray backgrounds.

---

## States

| State | Behavior |
|-------|----------|
| Default | Renders with specified variant, color, and value |
| Visible | `isVisible={true}` — badge is displayed |
| Hidden | `isVisible={false}` — badge is hidden (preserves space or not depending on context) |
| Animate on mount | Brief scale-up animation when `animateOnMount` is true |
| Max value | Values exceeding `maxValue` display as `{maxValue}+` |

Badge has no hover, focus, active, or disabled states. It is a non-interactive display element.

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Element | `<span>` element |
| Role | `role="status"` for number/label variants; `aria-hidden="true"` for decorative dot/icon |
| ARIA label | When used overlayed, parent element must include badge information in its aria-label |
| Live region | Number badges may use `aria-live="polite"` for dynamic count updates |
| Color not sole indicator | Label variant includes text; number includes value; icon variant includes icon shape |
| Screen reader | Overlay badges do not receive focus. Badge information is conveyed via parent element's aria-label. |
| Example overlay | IconButton with bell icon: `aria-label="Notifications, 3 unread"` |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Number badges may be smaller (min-width 16px, height 16px, font 10px) on icon buttons for space. Label badges remain same size. |
| Tablet (768-1023px) | Standard sizing. |
| Desktop (1024px+) | Standard sizing. |
| Wide (1280px+) | Standard sizing. |
| Ultra-wide (1600px+) | Standard sizing. |

---

## Animation Rules

| Action | Duration | Easing | Property |
|--------|----------|--------|----------|
| Mount animation (optional) | 200ms | Ease-Spring | transform: scale(0) → scale(1) |
| Value change (number) | 200ms | Ease-Out | opacity, transform |

- Animations only apply when `animateOnMount` is explicitly set to `true`
- Value changes should use opacity fade rather than scale to avoid jarring motion
- All animations respect `prefers-reduced-motion`
- Dot variant has no animation

---

## Future Expansion

- **Pulsing badge** — Subtle breathing animation for attention-critical badges (use with caution)
- **Dismissible badge** — Badge that can be dismissed with X button
- **Count animation** — Animated count increment/decrement
- **Badge with tooltip** — Additional description on hover
- **Progress badge** — Circular progress ring around number badge

---

## Dependencies

| Dependency | Type | Usage |
|------------|------|-------|
| Design Tokens | External (DP-1) | Colors, typography, spacing, border radius |

Badge has zero internal component dependencies.

---

## Related Components

- [Avatar.md](Avatar.md) — Uses Badge for status overlay
- [Button.md](Button.md) — Optional Badge in button
- [IconButton.md](IconButton.md) — Notification badge on icon buttons
- [Tag.md](Tag.md) — Read-only metadata label (similar but for metadata, not status)
- [Chip.md](Chip.md) — Interactive element with optional dismiss
- [SidebarItem.md](../Navigation/SidebarItem.md) — Unread count badge
- [Tabs.md](../Navigation/Tabs.md) — Notification badge on tab labels
- [ConfidenceBadge.md](../AI/ConfidenceBadge.md) — AI-specific badge variant

---

## Anti-patterns

1. **Badge without meaning** — Every Badge must communicate specific information (count, status, label). Do not use as decoration.
2. **Interactive Badge** — Badge is read-only. Do not attach click handlers. Use Chip for interactive indicators.
3. **Overlay without parent context** — When `isOverlay` is true, Badge must be positioned relative to a parent. Do not use overlay absolute positioning outside a parent container.
4. **Multiple badges on one element** — Maximum one badge per parent element. For multiple indicators, use Tag or Chip.
5. **Dot + number on same element** — Choose one. Dot for binary state, number for countable items.
6. **Badge for metadata** — Use Tag for metadata labels. Badge is for notification/status.
7. **Custom colors** — Use only the five defined semantic colors. Custom colors break the semantic system.

---

## Performance Notes

- Single `<span>` DOM element — minimal footprint
- No event listeners, state, or effects — zero runtime overhead
- Conditional `isVisible` uses CSS `display: none` to preserve layout position
- Overlay positioning via CSS absolute positioning — no JavaScript position calculation
- Value clamping (maxValue) is a simple Math.min operation — no string manipulation
- Badge is an ideal candidate for `React.memo` — props change infrequently
- Mount animation uses CSS `@keyframes` — no animation library dependency
