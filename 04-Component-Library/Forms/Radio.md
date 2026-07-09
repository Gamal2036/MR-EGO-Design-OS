# Radio

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-2 ([Form-Specifications](../../03-Design-System/Forms/Form-Specifications.md)), DP-1 ([Accessibility](../../02-Design-Language/Accessibility.md))

---

## Purpose

Mutually exclusive option selection control. Users select exactly one option from a set. Supports standard and card-style visual variants.

---

## Responsibilities

- Render a styled radio input with a circular indicator
- Enforce single selection within a group
- Manage group state via RadioGroup wrapper
- Display label that is clickable and associated with input
- Support disabled individual options within a group
- Support keyboard navigation between options (arrow keys)

---

## Composition

```
RadioGroup (wrapper — manages state)
├── Radio
│   ├── <input type="radio"> (visually hidden)
│   ├── RadioVisual (styled circle with fill dot)
│   └── <label> (clickable label text)
└── Radio (another option)
```

---

## Hierarchy

| Relation | Component | Description |
|----------|-----------|-------------|
| Parent | RadioGroup | Manages value, name, onChange |
| Parent | FormGroup | Provides label and layout |
| Sibling | Radio | Peer option in same group |
| Sibling | Label | Clickable label text |
| Sibling | HelperText | Per-option context |

---

## Props Contract

```typescript
/**
 * Props for the Radio component (individual option).
 */
export interface RadioProps {
  // Display
  /** Size of the radio. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant. @default "standard" */
  variant?: 'standard' | 'card';
  /** Color variant. @default "primary" */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  /** Label position. @default "right" */
  labelPosition?: 'left' | 'right';

  // State
  /** Whether this radio is selected. Managed by RadioGroup. */
  isChecked?: boolean;
  /** Whether the radio is disabled. @default false */
  isDisabled?: boolean;
  /** Whether the radio has an error. @default false */
  hasError?: boolean;

  // Content
  /** Label text. */
  label?: string;
  /** Additional description text (card variant). */
  description?: string;
  /** The value associated with this option. */
  value: string;
  /** Name attribute. Managed by RadioGroup. */
  name?: string;

  // Events
  /** Called when selected. */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;

  // Accessibility
  /** ARIA label. */
  ariaLabel?: string;
  /** Custom ID. */
  id?: string;

  // Styling
  /** Additional CSS class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;

  // Testing
  /** Test identifier. */
  dataTestId?: string;
}

/**
 * Props for the RadioGroup wrapper component.
 */
export interface RadioGroupProps {
  /** The currently selected value. */
  value?: string;
  /** Default value for uncontrolled usage. */
  defaultValue?: string;
  /** Name attribute shared by all child radios. */
  name: string;
  /** Orientation of the radio group. @default "vertical" */
  orientation?: 'vertical' | 'horizontal';
  /** Label for the group (rendered as legend). */
  label?: string;
  /** Helper text for the group. */
  helperText?: string;
  /** Error message for the group. */
  errorMessage?: string;
  /** Whether the group has an error. @default false */
  hasError?: boolean;
  /** Whether all radios in group are disabled. @default false */
  isDisabled?: boolean;
  /** Whether a selection is required. @default false */
  isRequired?: boolean;
  /** Called when selection changes. */
  onChange?: (value: string) => void;

  /** Child Radio components. */
  children?: React.ReactNode;

  /** Additional CSS class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;

  /** Test identifier. */
  dataTestId?: string;
}
```

---

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `standard` | Circular dot indicator, label on right | Generic option selection |
| `card` | Radio embedded in a bordered card with description | Plan selection, feature picks |
| `button` | Radio styled as segment/tab button | Segmented control, view toggle |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Unselected** | Empty circle, neutral border | Not chosen |
| **Selected** | Filled dot inside circle, brand ring | Currently chosen |
| **Hover** | Border darkens, subtle bg | Interactive indication |
| **Focus** | Focus ring around circle | Keyboard focus |
| **Active** | Press state | Mouse interaction |
| **Disabled unselected** | 40% opacity, muted | Cannot select |
| **Disabled selected** | 40% opacity, muted | Cannot change |
| **Error** | Red border | Group validation failure |
| **Card selected** | Card border brand color, radio selected | Visual emphasis on choice |
| **Card hover** | Card border light brand | Interactive card indication |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **Group label** | `<fieldset>` with `<legend>` for RadioGroup. |
| **Individual label** | `<label>` associated with each radio input. |
| **Selected state** | `aria-checked="true"` on selected, `"false"` on others. |
| **Error association** | `aria-invalid` on group, `aria-describedby` to error. |
| **Disabled state** | `disabled` attribute, `aria-disabled="true"`. |
| **Required** | `aria-required="true"` on group. |
| **Focus** | Visible focus ring. Tab reaches selected radio or first radio in group. |
| **Keyboard** | Arrow keys to navigate between options. Tab moves focus into/out of group. Space to select. |
| **Screen reader** | Announce group label, position (2 of 5), selected state. |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | Vertical orientation forced. Card variant stacks full width. Touch target 44x44px. |
| Tablet (768-1023px) | Vertical or 2-column horizontal. |
| Desktop (1024-1279px) | As defined by orientation prop. |
| Wide (1280-1599px) | Standard behavior. |
| Ultra-wide (1600px+) | Standard behavior. |

---

## Animation Rules

| Element | Trigger | Duration | Easing |
|---------|---------|----------|--------|
| Dot fill | Selected | 100ms | Ease-Out |
| Ring color | Hover | 100ms | Linear |
| Focus ring | Focus | 150ms | Ease-Out |
| Card border | Selected | 200ms | Ease-Out |
| Card shadow | Hover | 150ms | Ease-Out |

All animations respect `prefers-reduced-motion`.

---

## Future Expansion

| Extension Point | Description |
|-----------------|-------------|
| `variant="card"` with `image` | Visual/image card options |
| `variant="button"` | Segmented control style |
| `description` prop | Currently in card variant; extend to standard |
| `columns` prop on RadioGroup | Grid layout for options |
| `optionLayout` | Icon + label + description arrangement |

---

## Dependencies

| Dependency | Type | Description |
|------------|------|-------------|
| RadioGroup | Internal | State management wrapper |
| FormGroup | Internal | Optional parent wrapper |

---

## Related Components

| Component | Relationship |
|-----------|-------------|
| Checkbox.md | Multi-selection sibling |
| Select.md | Dropdown alternative for many options |
| FormGroup.md | Parent wrapper for layout |

---

## Anti-patterns

1. **Using Radio for multi-selection** — Use Checkbox for multiple selections.
2. **More than 6 options in Radio group** — Use Select dropdown for many options.
3. **Label not clickable** — Label must toggle the associated radio.
4. **No default selection** — Always provide a default or "None" option if required.
5. **Hiding the native input** — Keep `<input type="radio">` in DOM for accessibility and form submission.
6. **Custom keyboard handling** — Use native radio keyboard behavior (arrow keys).

---

## Performance Notes

- Radio is a lightweight component. Group re-renders only the changed option on selection.
- RadioGroup uses context to manage state — stable reference to avoid unnecessary child re-renders.
- Use `defaultValue` for uncontrolled usage when form does not need programmatic value access.
- Avoid inline arrow functions in Radio `onChange` when radios are in lists.
