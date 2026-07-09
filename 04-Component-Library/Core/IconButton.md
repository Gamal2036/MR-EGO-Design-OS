# IconButton

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md), [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md), [Motion-System.md](../../02-Design-Language/Motion-System.md)), DP-2 ([Buttons.md](../../03-Design-System/Components/Buttons.md))

---

## Purpose

IconButton renders a single icon as an action trigger. It is used in toolbars, table row actions, dialog headers, and any compact space where a full text button would be too wide.

---

## Responsibilities

- Render a single actionable icon inside a compact square container
- Provide clear visual feedback on hover, focus, and active states
- Display a tooltip on hover/focus to describe the action
- Enforce a minimum 44x44px touch target (visual size may be smaller with extended click area)
- Support keyboard activation via Enter and Space
- Ensure the action is communicated to screen readers via `aria-label`

---

## Composition

```
IconButton
├── Icon (required, centered, sized per button size)
└── Tooltip (required, appears on hover/focus with 500ms delay)
```

IconButton uses:
- `Icon` — the action indicator (centered)
- `Tooltip` — label displayed on hover/focus (required)

---

## Hierarchy

**Level:** 2 (Core Composite)

**Parent:** None (consumed directly by toolbars, tables, dialogs)

**Children:**
- `Icon` (Level 0) — action icon
- `Tooltip` (Level 1) — action description on hover/focus

**Siblings:** `Button`, `SplitButton`, `FloatingButton`

---

## Props Contract

```typescript
/**
 * IconButton variant determining visual style.
 * - standard: Default icon button, secondary text color
 * - toolbar: Visible border, used in toolbar groups
 * - close: Dedicated close/dismiss button (X icon, darker hover)
 */
type IconButtonVariant = 'standard' | 'toolbar' | 'close';

/**
 * IconButton size in pixels.
 * - sm: 32px button, 16px icon — compact spaces
 * - md: 40px button, 20px icon — default
 * - lg: 48px button, 24px icon — navigation, prominent
 */
type IconButtonSize = 'sm' | 'md' | 'lg';

interface IconButtonProps {
  /** Visual variant. @default 'standard' */
  variant?: IconButtonVariant;
  /** Size of the icon button. @default 'md' */
  size?: IconButtonSize;
  /** Icon component or element to render. Required. */
  icon: React.ReactNode;
  /** Accessible label describing the action. Required for all icon-only buttons. */
  ariaLabel: string;
  /** Tooltip text displayed on hover/focus. If omitted, uses ariaLabel. */
  tooltip?: string;
  /** Tooltip position relative to the button. @default 'bottom' */
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  /** Whether the button is disabled. @default false */
  isDisabled?: boolean;
  /** Whether the button is in loading state. @default false */
  isLoading?: boolean;
  /** Click handler. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Focus handler. */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /** Blur handler. */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /** ARIA expanded attribute. */
  ariaExpanded?: boolean;
  /** ARIA haspopup attribute. */
  ariaHasPopup?: boolean;
  /** ARIA controls attribute. */
  ariaControls?: string;
  /** Additional class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
  /** Data test ID for automated testing. */
  dataTestId?: string;
  /** Ref forwarded to the underlying button element. */
  ref?: React.Ref<HTMLButtonElement>;
}
```

---

## Variants

### Standard
Default icon button for general use.

| Property | Value |
|----------|-------|
| Background | Transparent |
| Icon Color | Text-Secondary |
| Border | None |
| Hover Background | Surface-2 |
| Hover Icon Color | Text-Body |
| Active Background | Neutral-200 (light), Neutral-300 (dark) |
| Focus Ring | Primary-500, 2px solid, 2px offset |
| Border Radius | Radius-Md (8px) |

### Toolbar
Icon button with visible border for toolbar groups.

| Property | Value |
|----------|-------|
| Background | Transparent |
| Icon Color | Text-Secondary |
| Border | Border-Default (1px solid) |
| Hover Background | Surface-2 |
| Active Background | Neutral-200 (light), Neutral-300 (dark) |
| Focus Ring | Primary-500, 2px solid, 2px offset |
| Border Radius | Radius-Md (8px) |

### Close
Dedicated dismiss icon button (X icon). Used in dialogs, modals, popovers.

| Property | Value |
|----------|-------|
| Background | Transparent |
| Icon Color | Text-Secondary |
| Border | None |
| Hover Background | Neutral-200 (light), Neutral-300 (dark) |
| Active Background | Neutral-300 (light), Neutral-400 (dark) |
| Focus Ring | Primary-500, 2px solid, 2px offset |
| Border Radius | Radius-Sm (4px) |

---

## Sizes

| Size | Button Size | Icon Size | Touch Target | Border Radius |
|------|-------------|-----------|--------------|---------------|
| SM (32px) | 32x32px | 16px | 44x44px (extended via pseudo-element) | Radius-Md (8px) |
| MD (40px) | 40x40px | 20px | 44x44px | Radius-Md (8px) |
| LG (48px) | 48x48px | 24px | 48x48px | Radius-Md (8px) |

Small sizes (sm) extend their click target to 44x44px via a pseudo-element to meet touch accessibility requirements while maintaining visual compactness.

---

## States

| State | Trigger | Visual Change | Duration |
|-------|---------|--------------|----------|
| Default | — | Transparent background, secondary icon color | — |
| Hover | Mouse enter | Surface-2 background, body icon color, cursor `pointer` | 100ms |
| Focus | Tab key | 2px Primary-500 focus ring | 100ms |
| Active | Mouse down | Darker background (Neutral-200/Neutral-300) | 50ms |
| Disabled | `isDisabled` prop | Opacity 0.4, cursor `not-allowed` | Instant |
| Loading | `isLoading` prop | Spinner replaces icon | 100ms |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Element | `<button>` element |
| Role | Implicit `role="button"` |
| ARIA label | Required `ariaLabel` prop — describes the action |
| Tooltip | Tooltip appears on hover/focus for sighted users |
| Focus indicator | 2px solid ring, Primary-500, 2px offset |
| Keyboard activation | Enter or Space |
| Disabled state | `aria-disabled="true"`, `tabIndex={-1}` |
| Touch target | Minimum 44x44px (sm uses pseudo-element extension) |
| Icon | `aria-hidden="true"` on the icon element |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | MD size minimum for touch targets. Tooltip hidden (touch has no hover). |
| Tablet (768-1023px) | Standard sizing. Tooltip visible on hover. |
| Desktop (1024px+) | Standard sizing. Tooltip visible on hover. |
| Wide (1280px+) | Standard sizing. |
| Ultra-wide (1600px+) | LG size for navigation icon buttons. |

On mobile, tooltips are suppressed (touch has no hover state). The `ariaLabel` prop is the sole action descriptor for screen readers.

---

## Animation Rules

| Action | Duration | Easing | Property |
|--------|----------|--------|----------|
| Hover background | 100ms | Ease-Out | background-color |
| Focus ring | 100ms | Ease-Out | box-shadow |
| Active | 50ms | Ease-Out | background-color |
| Loading transition | 100ms | Ease-Out | opacity |

- All animations respect `prefers-reduced-motion`
- Animation only applies to `background-color` transitions — no transform or position changes

---

## Future Expansion

- **Toggle IconButton** — Persistent active state for view toggles
- **Badge overlay** — Notification dot or count on the icon button (e.g., notifications bell)
- **Keyboard shortcut hint** — Small text indicator inside tooltip
- **Group behavior** — Toolbar group where buttons are visually connected

---

## Dependencies

| Dependency | Type | Usage |
|------------|------|-------|
| Icon | Internal (Level 0) | Action icon |
| Tooltip | Internal (Level 1) | Action description on hover/focus |
| Design Tokens | External (DP-1) | All visual properties |

---

## Related Components

- [Button.md](Button.md) — Full-size labeled button
- [Tooltip.md](Tooltip.md) — Hover/focus information reveal
- [SplitButton.md](SplitButton.md) — Button with dropdown
- [Dropdown.md](../Navigation/Dropdown.md) — IconButton acts as trigger for dropdown menus

---

## Anti-patterns

1. **Omitting `ariaLabel`** — Every IconButton must have an accessible label. Unlabeled icon buttons are inaccessible.
2. **Using IconButton for navigation** — Use navigation link components for page changes.
3. **Removing tooltip** — Tooltip is required except on mobile where hover is unavailable.
4. **Multiple close buttons** — Only one close button per dialog/sheet.
5. **Overriding icon size** — Icon size is fixed per button size variant. Do not override.
6. **Using with text** — IconButton is icon-only. Use Button with icon when text is needed.
7. **Customizing click area** — Do not manually adjust click target. The built-in pseudo-element handles touch targets.

---

## Performance Notes

- Single `<button>` DOM node — no wrapper elements
- Tooltip is lazy-mounted (rendered on first hover/focus), not pre-rendered
- Conditional tooltip suppression on touch devices avoids unnecessary rendering
- Icon rendering uses direct child node — no extra Fragment wrapping
- Variant styles use static CSS class maps — no runtime style object generation
- Touch target extension via CSS pseudo-element — no JS resize calculations
