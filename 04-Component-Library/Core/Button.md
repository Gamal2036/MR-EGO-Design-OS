# Button

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md), [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md), [Motion-System.md](../../02-Design-Language/Motion-System.md)), DP-2 ([Buttons.md](../../03-Design-System/Components/Buttons.md))

---

## Purpose

Button triggers a single action on user click or tap. It is the primary mechanism for user-initiated operations — submitting forms, saving data, navigating, and executing commands.

---

## Responsibilities

- Render a clickable element that triggers a single action
- Communicate the action's importance through visual variant (primary, secondary, ghost, etc.)
- Support icon, text, or both as content
- Provide loading state that disables interaction and shows a spinner
- Apply disabled state visually and prevent interaction
- Maintain minimum touch target of 44x44px (icon-only variant)
- Support keyboard activation via Enter and Space
- Listen to the parent `form` element's `onSubmit` when `type="submit"` is specified

---

## Composition

```
Button
├── Icon (optional, 16px, left of label)
├── Label (required, text content)
├── Spinner (loading state, replaces icon/label)
├── Badge (optional, notification count)
└── DropdownIndicator (split button only, right side)
```

Button uses:
- `Icon` — for icon slot (16px, 14px for XS)
- `Spinner` — for loading indicator
- `Tooltip` — for icon-only or truncated labels (optional)

---

## Hierarchy

**Level:** 2 (Core Composite)

**Parent:** None (consumed directly by pages, forms, dialogs)

**Children:**
- `Icon` (Level 0) — decorative/action icon
- `Spinner` (Level 0) — loading indicator
- `Badge` (Level 1) — optional notification count
- `Tooltip` (Level 1) — optional tooltip wrapper

**Siblings:** `IconButton`, `SplitButton`, `FloatingButton`

---

## Props Contract

```typescript
/**
 * Button variant determining visual style and emphasis.
 * - primary: Highest emphasis, single main action per view
 * - secondary: Alternative action, medium emphasis
 * - ghost: Minimal emphasis, non-critical actions
 * - danger: Destructive/irreversible action
 * - outline: Bordered variant for distinction without fill
 * - outline-danger: Lower-weight destructive action
 * - success: Confirmation of positive outcome
 * - ai-action: AI-specific operations (generate, summarize, analyze)
 */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'outline-danger' | 'success' | 'ai-action';

/**
 * Button size dimensions.
 * - xs: 28px height, dense UI (tables)
 * - sm: 32px height, compact toolbars
 * - md: 40px height, default
 * - lg: 48px height, hero/primary CTA
 */
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * HTML button type attribute.
 */
type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
  /** Visual variant of the button. @default 'primary' */
  variant?: ButtonVariant;
  /** Size of the button. @default 'md' */
  size?: ButtonSize;
  /** HTML button type. @default 'button' */
  type?: ButtonType;
  /** Button label text. Required for accessibility when icon-only. */
  children: React.ReactNode;
  /** Icon component or element rendered left of label. 16px (14px for xs). */
  icon?: React.ReactNode;
  /** Icon position relative to label. @default 'left' */
  iconPosition?: 'left' | 'right';
  /** Whether the button is disabled. Disables interaction and reduces opacity. @default false */
  isDisabled?: boolean;
  /** Whether the button is in a loading state. Shows spinner, disables interaction. @default false */
  isLoading?: boolean;
  /** Loading label text for screen readers. @default 'Loading' */
  loadingLabel?: string;
  /** Whether the button takes full width of its container. @default false */
  fullWidth?: boolean;
  /** Click handler. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Focus handler. */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /** Blur handler. */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /** ARIA label for accessibility. Required for icon-only buttons. */
  ariaLabel?: string;
  /** ARIA describedby for additional context. */
  ariaDescribedBy?: string;
  /** ARIA controls attribute. */
  ariaControls?: string;
  /** ARIA expanded attribute. */
  ariaExpanded?: boolean;
  /** ARIA haspopup attribute. @default false */
  ariaHasPopup?: boolean;
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

### Primary
Single most important action per view. Highest visual weight.

| Property | Light | Dark |
|----------|-------|------|
| Background | Primary-600 | Primary-500 |
| Text | White | White |
| Border | None | None |
| Hover Background | Primary-700 | Primary-600 |
| Active Background | Primary-800 | Primary-700 |

### Secondary
Alternative actions equal in importance but lower visual weight.

| Property | Light | Dark |
|----------|-------|------|
| Background | Surface-1 | Surface-1 |
| Text | Text-Body | Text-Body |
| Border | Border-Default (1px solid) | Border-Default (1px solid) |
| Hover Background | Surface-2 | Surface-2 |
| Active Background | Neutral-200 | Neutral-300 |

### Ghost
Minimal-weight actions for non-critical operations.

| Property | Light | Dark |
|----------|-------|------|
| Background | Transparent | Transparent |
| Text | Text-Body | Text-Body |
| Border | None | None |
| Hover Background | Surface-2 | Surface-2 |
| Active Background | Neutral-200 | Neutral-300 |

### Danger
Destructive actions — delete, remove, irreversible operations.

| Property | Light | Dark |
|----------|-------|------|
| Background | Danger-500 | Danger-500 |
| Text | White | White |
| Border | None | None |
| Hover Background | Danger-600 | Danger-600 |
| Active Background | Danger-700 | Danger-700 |

### Outline
Standard bordered button for distinction without full fill.

| Property | Light | Dark |
|----------|-------|------|
| Background | Transparent | Transparent |
| Text | Primary-600 | Primary-400 |
| Border | Primary-600 (1px solid) | Primary-400 (1px solid) |
| Hover Background | Primary-50 | Primary-900 |
| Active Background | Primary-100 | Primary-800 |

### Outline Danger
Lower-weight destructive action.

| Property | Light | Dark |
|----------|-------|------|
| Background | Transparent | Transparent |
| Text | Danger-500 | Danger-400 |
| Border | Danger-500 (1px solid) | Danger-400 (1px solid) |
| Hover Background | Danger-BG | Danger-900 (opacity 20%) |
| Active Background | Danger-500 (20% opacity) | Danger-500 (30% opacity) |

### Success
Confirmation of positive actions — save complete, publish, approve.

| Property | Light | Dark |
|----------|-------|------|
| Background | Success-500 | Success-500 |
| Text | White | White |
| Border | None | None |
| Hover Background | Success-600 | Success-600 |
| Active Background | Success-600 darkened | Success-600 darkened |

### AI Action
Trigger AI-specific operations — generate, summarize, analyze, suggest.

| Property | Light | Dark |
|----------|-------|------|
| Background | Primary-50 | Primary-900 |
| Text | Primary-600 | Primary-400 |
| Border | Primary-200 (1px solid) | Primary-700 (1px solid) |
| Hover Background | Primary-100 | Primary-800 |
| Active Background | Primary-200 | Primary-700 |
| Icon | Sparkle/star icon (left side) | Sparkle/star icon (left side) |

---

## Sizes

| Token | Height | Padding H | Padding V | Font Size | Icon Size | Border Radius |
|-------|--------|-----------|-----------|-----------|-----------|---------------|
| XS | 28px | Space-4 (12px) | Space-2 (4px) | 13px (Caption) | 14px | Radius-Sm (4px) |
| SM | 32px | Space-5 (16px) | Space-2 (4px) | 13px (Caption) | 14px | Radius-Md (8px) |
| MD | 40px | Space-5 (16px) | Space-3 (8px) | 14px (Button) | 16px | Radius-Md (8px) |
| LG | 48px | Space-6 (20px) | Space-4 (12px) | 15px | 18px | Radius-Md (8px) |

---

## States

| State | Trigger | Visual Change | Duration |
|-------|---------|--------------|----------|
| Default | — | Resting appearance per variant | — |
| Hover | Mouse enter | Background shifts one step, cursor `pointer` | 100ms (Duration-Fast) |
| Focus | Tab key or click | 2px solid focus ring (Primary-500), 2px offset | 100ms (Duration-Fast) |
| Active | Mouse down | Scale to 0.97, darker background | 50ms (Duration-Instant) |
| Disabled | `isDisabled` prop | Opacity 0.4, cursor `not-allowed`, no hover/focus styles | Instant |
| Loading | `isLoading` prop | Spinner replaces icon or content, interaction disabled | 100ms (Duration-Fast) |

### Disabled Details
- All variants reduce to 0.4 opacity
- Cursor set to `not-allowed`
- No hover, focus, or active effects
- `aria-disabled="true"`
- Focus not reachable via Tab (`tabIndex={-1}`)

### Loading Details
- Spinner (16px, 14px for XS) replaces icon or label
- Button dimensions remain unchanged to prevent layout shift
- Interaction disabled (`pointer-events: none`)
- `aria-label` appends "Loading" to current label
- `aria-live="polite"` region announces loading state to screen readers

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Element | `<button>` element (never `<div>`, never `<a>` unless navigation) |
| Role | Implicit `role="button"` |
| Focus indicator | 2px solid ring, Primary-500, 2px offset, Radius-Md |
| Keyboard activation | Enter or Space keys |
| Disabled state | `aria-disabled="true"`, `tabIndex={-1}` |
| Loading state | `aria-label` includes "Loading", `aria-live="polite"` |
| Icon-only buttons | Required `ariaLabel` prop describing the action |
| Color not sole indicator | Text label or icon always present alongside color |
| Touch target | Minimum 44x44px for all interactive sizes |
| Contrast | All text meets WCAG AA 4.5:1 minimum |
| Focus visible | Focus ring always visible, never removed via `outline: none` without replacement |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Buttons go full-width in forms. Floating button visible. Sizes remain same. |
| Tablet (768-1023px) | Standard sizing. Button groups may wrap to 2 rows. |
| Desktop (1024-1279px) | Standard sizing. Inline button groups. |
| Wide (1280-1599px) | Standard sizing. No changes. |
| Ultra-wide (1600px+) | LG size recommended for primary CTAs in hero sections. |

`fullWidth` prop forces 100% width at any breakpoint for layout flexibility.

---

## Animation Rules

| Action | Duration | Easing | Property |
|--------|----------|--------|----------|
| Hover background | 100ms | Ease-Out | background-color |
| Focus ring | 100ms | Ease-Out | box-shadow, outline |
| Active press | 50ms | Ease-Out | transform: scale(0.97) |
| Active release | 100ms | Ease-Out | transform: scale(1) |
| Loading transition | 100ms | Ease-Out | opacity |

- All animations respect `prefers-reduced-motion` (disable transform scaling, instant transitions)
- Scale transform only between 0.97 and 1.0 — no other scale values
- Color transitions use `background-color` only, not `box-shadow` or layered effects

---

## Future Expansion

- **ButtonGroup** — Toolbar groups for related actions with consistent spacing
- **ToggleButton** — Persistent active state for view toggles (list/grid)
- **MenuButton** — Button that opens menu on click (standardizes split button pattern)
- **ShareButton** — OS-level share sheet trigger on mobile
- **AI action streaming** — Enhanced with confidence indicator, streaming text state
- **Destructive confirmation** — Two-step confirmation for critical destructive actions
- **Keyboard shortcut indicator** — Display keyboard shortcut hint in label

---

## Dependencies

| Dependency | Type | Usage |
|------------|------|-------|
| Icon | Internal (Level 0) | Icon slot |
| Spinner | Internal (Level 0) | Loading indicator |
| Tooltip | Internal (Level 1, optional) | Icon-only button tooltip |
| Badge | Internal (Level 1, optional) | Notification count |
| Design Tokens | External (DP-1) | All visual properties (color, spacing, typography, radius) |

---

## Related Components

- [IconButton.md](IconButton.md) — Icon-only action for compact spaces
- [SplitButton.md](SplitButton.md) — Primary action with dropdown alternatives
- [FloatingButton.md](FloatingButton.md) — Mobile-fixed primary action
- [Card.md](Card.md) — Card footer actions use Button
- [Dialog.md](../Feedback/Dialog.md) — Dialog footer actions use Button
- [Dropdown.md](../Navigation/Dropdown.md) — SplitButton dropdown trigger
- [Tooltip.md](Tooltip.md) — Wraps icon-only buttons for label
- [Spinner.md](../Utilities/Spinner.md) — Loading indicator

---

## Anti-patterns

1. **Using Button for navigation** — Use `<a>` links or navigation components for page-to-page navigation.
2. **Multiple primary buttons per view** — Only one primary action per screen per UX Rule 2.
3. **Removing focus outline** — Never set `outline: none` without providing a visible focus replacement.
4. **Changing button semantics** — Never use a `<div>` or `<span>` with click handler as a button.
5. **Mixed variants in button groups** — All buttons in a group should share the same variant (except primary/secondary distinction).
6. **Putting icons on the right by default** — Icons go left (right only for dropdown indicators or specific RTL layouts).
7. **Loading state without disabled** — Loading must also disable the button to prevent double submission.
8. **Overriding internal layout** — Do not target internal Button DOM elements via className or style.

---

## Performance Notes

- Button uses a single DOM node (`<button>`) — no wrapping divs
- Loading spinner replaces content rather than overlaying — prevents layout shift
- Variant styles use CSS custom properties — only changed properties re-render
- Avoid inline `style` objects in render loops — prefer static class maps
- Disabled state avoids unnecessary event handlers by setting `pointer-events: none`
- Icon rendering uses conditional rendering, not CSS display toggle
- Button dimensions are fixed per size variant — ensures consistent layout
- Preferred pattern for variant/style maps: use a static `Record<Variant, Styles>` outside component to prevent recreation on each render
