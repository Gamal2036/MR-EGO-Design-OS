# Chip

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md), [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md))

---

## Purpose

Chip is a compact interactive element that represents an input, choice, filter, or action. Chips are used for multi-select filters, tag inputs, contact chips (with avatar), and quick action triggers. Unlike Tag, Chip is interactive — it can be selected, dismissed, or clicked.

---

## Responsibilities

- Render a compact, rounded element with optional icon, avatar, label, and dismiss button
- Support selection state (toggled on/off)
- Support dismiss action with a close icon (X)
- Support click action for triggering behaviors
- Display avatar inline for contact/entity representation
- Display icon inline for visual categorization
- Provide hover, focus, active, selected, and disabled states

---

## Composition

```
Chip
├── Avatar (optional, left, sized to chip height)
├── Icon (optional, left)
├── Label (required, text content)
└── DismissButton (optional, right, X icon)
```

Chip uses:
- `Icon` — optional leading icon
- `Avatar` — optional leading avatar (replaces icon)

---

## Hierarchy

**Level:** 1 (Core Primitive)

**Parent:** None (consumed by MultiSelect, Filters, TagInput, and standalone)

**Children:**
- `Icon` (Level 0, optional) — leading icon
- `Avatar` (Level 1, optional) — leading entity image

**Siblings:** `Tag`, `Badge`, `Avatar`, `Tooltip`, `Surface`, `Divider`

---

## Props Contract

```typescript
/**
 * Chip visual variant.
 * - default: Filled background, standard emphasis
 * - outlined: Transparent background with border
 * - with-avatar: Includes Avatar element on left side
 * - with-icon: Includes Icon element on left side
 */
type ChipVariant = 'default' | 'outlined' | 'with-avatar' | 'with-icon';

/**
 * Chip size.
 * - sm: 24px height — compact, inline with text
 * - md: 32px height — default
 */
type ChipSize = 'sm' | 'md';

interface ChipProps {
  /** Visual variant. @default 'default' */
  variant?: ChipVariant;
  /** Size. @default 'md' */
  size?: ChipSize;
  /** Chip label text. Required. */
  children: React.ReactNode;
  /** Icon component (for with-icon variant). */
  icon?: React.ReactNode;
  /** Avatar src (for with-avatar variant). */
  avatarSrc?: string;
  /** Avatar name (for with-avatar variant fallback initials). */
  avatarName?: string;
  /** Whether the chip is selected/toggled. @default false */
  isSelected?: boolean;
  /** Whether the chip is disabled. @default false */
  isDisabled?: boolean;
  /** Whether the chip shows a dismiss (X) button. @default false */
  isDismissible?: boolean;
  /** Whether the chip is in loading state. @default false */
  isLoading?: boolean;
  /** Click handler. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Dismiss handler. Called when dismiss button is clicked. */
  onDismiss?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** ARIA label for the chip. Falls back to children text. */
  ariaLabel?: string;
  /** Additional class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
  /** Data test ID for automated testing. */
  dataTestId?: string;
  /** Ref forwarded to the root button element. */
  ref?: React.Ref<HTMLButtonElement>;
}
```

---

## Variants

### Default
Filled background for standard emphasis.

| Property | Light | Dark |
|----------|-------|------|
| Background | Surface-2 | Surface-2 |
| Border | None | None |
| Text | Text-Body | Text-Body |
| Hover Background | Neutral-200 | Neutral-300 |
| Selected Background | Primary-50 | Primary-900 |
| Selected Text | Primary-600 | Primary-400 |
| Selected Border | Primary-200 (1px) | Primary-700 (1px) |

### Outlined
Transparent with border for lighter emphasis.

| Property | Light | Dark |
|----------|-------|------|
| Background | Transparent | Transparent |
| Border | Border-Default (1px solid) | Border-Default (1px solid) |
| Text | Text-Secondary | Text-Secondary |
| Hover Background | Surface-2 | Surface-2 |
| Selected Background | Primary-50 | Primary-900 |
| Selected Border | Primary-600 | Primary-400 |

### With Avatar
Leading avatar for contact/entity selection.

| Property | Value |
|----------|-------|
| Avatar Size | Matches chip height (24px for sm, 32px for md) |
| Avatar Position | Left, inset 2px from chip edge |
| Padding Left | Reduced to accommodate avatar |
| Content Order | Avatar → Label → Dismiss (if applicable) |

### With Icon
Leading icon for visual categorization.

| Property | Value |
|----------|-------|
| Icon Size | 14px (sm), 16px (md) |
| Icon Color | Text-Secondary |
| Icon Position | Left, 4px from edge |
| Content Order | Icon → Label → Dismiss (if applicable) |

---

## Sizes

| Size | Height | Padding H | Font Size | Icon Size | Dismiss Size | Border Radius |
|------|--------|-----------|-----------|-----------|--------------|---------------|
| SM | 24px | 8px (Space-3) | 12px (Overline) | 14px | 12px | Radius-Full |
| MD | 32px | 12px (Space-4) | 13px (Caption) | 16px | 14px | Radius-Full |

---

## States

| State | Trigger | Visual Change | Duration |
|-------|---------|--------------|----------|
| Default | — | Resting per variant | — |
| Hover | Mouse enter | Background shift, cursor `pointer` | 100ms |
| Focus | Tab key | 2px Primary-500 focus ring, 2px offset | 100ms |
| Active | Mouse down | Scale 0.97, darker background | 50ms |
| Selected | `isSelected` prop | Background tint, border highlight | 100ms |
| Disabled | `isDisabled` prop | Opacity 0.4, cursor `not-allowed` | Instant |
| Loading | `isLoading` prop | Spinner replaces icon/avatar | 100ms |
| Dismiss hover | Hover on X button | Dismiss icon darkens | 100ms |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Element | `<button>` element |
| Role | Implicit `role="button"`, or `role="option"` when in a selection group |
| Selected | `aria-pressed="true"` when `isSelected` is true |
| Disabled | `aria-disabled="true"`, `tabIndex={-1}` |
| Dismiss | Dismiss button has `aria-label="Remove {chip label}"` |
| Group | Chips in a group should be wrapped in `role="group"` or `role="listbox"` with `aria-label` |
| Focus management | Tab navigates between chips in a group |
| Keyboard activation | Enter or Space to toggle/activate |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Chips wrap to next line. MD size for touch targets (32px minimum height). Use sm size only in non-touch contexts. |
| Tablet (768-1023px) | Standard sizing. Wrapping in filter bars. |
| Desktop (1024px+) | Standard sizing. Inline flow. |
| Wide (1280px+) | Standard sizing. |
| Ultra-wide (1600px+) | Standard sizing. |

On mobile, chip groups should allow horizontal scroll if they exceed viewport width, with a "Show all" expand option for filter bars.

---

## Animation Rules

| Action | Duration | Easing | Property |
|--------|----------|--------|----------|
| Hover background | 100ms | Ease-Out | background-color |
| Focus ring | 100ms | Ease-Out | box-shadow |
| Active press | 50ms | Ease-Out | transform: scale(0.97) |
| Selected transition | 100ms | Ease-Out | background-color, border-color |
| Dismiss removal | 200ms | Ease-Out | opacity, transform (scale down) |

- All animations respect `prefers-reduced-motion`
- Dismiss animation should animate out before actual DOM removal

---

## Future Expansion

- **Chip group** — Built-in chip group component with wrapping and selection management
- **Input chip** — Editable chip for tag input (combine with input field)
- **Draggable chip** — Reorderable chips in a list
- **Chip with tooltip** — Truncated chip label with full text in tooltip
- **Colored chip** — Semantic color variants for category indication

---

## Dependencies

| Dependency | Type | Usage |
|------------|------|-------|
| Icon | Internal (Level 0, optional) | Leading icon, dismiss icon |
| Avatar | Internal (Level 1, optional) | Leading avatar image |
| Design Tokens | External (DP-1) | Colors, typography, spacing, border radius |

---

## Related Components

- [Tag.md](Tag.md) — Read-only metadata label (non-interactive version of Chip)
- [Badge.md](Badge.md) — Notification/status indicator
- [Avatar.md](Avatar.md) — Avatar used in with-avatar variant
- [MultiSelect.md](../Forms/MultiSelect.md) — Uses Chip for selected options
- [Filters.md](../Data/Filters.md) — Uses Chip for active filter display

---

## Anti-patterns

1. **Using Chip for read-only metadata** — Use Tag for non-interactive metadata labels.
2. **Chip without label** — Chip must always have a text label for accessibility.
3. **Avatar + Icon together** — Choose one. Do not use both avatar and icon in the same chip.
4. **Dismiss without handler** — If `isDismissible` is true, `onDismiss` must be provided.
5. **Overflow text** — Chip label should be concise (1-3 words). Truncate with ellipsis if longer.
6. **Multiple interactions** — Chip supports click OR dismiss, not both simultaneously in a meaningful way (click on chip body = action, click on X = dismiss).
7. **Chip for navigation** — Chips are for selection and filtering, not page navigation.

---

## Performance Notes

- Single `<button>` DOM element with optional child elements
- Conditional rendering for icon/avatar/dismiss — no empty wrappers
- Avatar inside chip is sized to match chip height — avoid image resize recalculation
- Dismiss button is a small `<button>` nested inside the chip — ensure proper event propagation stop
- Selected state uses CSS class toggle, not inline style
- Chip is suitable for `React.memo` when props are stable
- Dismiss animation uses CSS transition, then calls onDismiss after animation completes
- Avoid re-creating onClick/onDismiss handlers inline in render loops
