# Checkbox

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-2 ([Form-Specifications](../../03-Design-System/Forms/Form-Specifications.md)), DP-1 ([Accessibility](../../02-Design-Language/Accessibility.md))

---

## Purpose

Binary selection control that allows users to toggle an option on or off. Supports checked, unchecked, and indeterminate states. Label is interactive and triggers the checkbox toggle.

---

## Responsibilities

- Render a styled checkbox input with a visible checkmark
- Toggle between checked and unchecked on click/label click
- Support indeterminate state for partial selection (tri-state)
- Display label text that is clickable and associated with input
- Show helper text and error messages when wrapped in FormGroup
- Support controlled and uncontrolled usage

---

## Composition

```
FormGroup (optional wrapper)
└── Checkbox
    ├── <input type="checkbox"> (visually hidden, semantically present)
    ├── CheckboxVisual (custom styled box with check/indeterminate icon)
    └── <label> (clickable label text)
```

---

## Hierarchy

| Relation | Component | Description |
|----------|-----------|-------------|
| Parent | FormGroup | Provides layout, validation |
| Parent | CheckboxGroup | Manages group of checkboxes |
| Sibling | Label | Clickable text (rendered inline) |
| Sibling | HelperText | Additional context |
| Sibling | ErrorMessage | Validation error |

---

## Props Contract

```typescript
/**
 * Props for the Checkbox component.
 */
export interface CheckboxProps {
  // Display
  /** Size of the checkbox. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant. @default "primary" */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  /** Whether the label appears to the right (default) or left. @default "right" */
  labelPosition?: 'left' | 'right';

  // State
  /** Whether the checkbox is checked. @default false */
  isChecked?: boolean;
  /** Default checked state for uncontrolled usage. @default false */
  defaultChecked?: boolean;
  /** Whether the checkbox is in indeterminate state. @default false */
  isIndeterminate?: boolean;
  /** Whether the checkbox is disabled. @default false */
  isDisabled?: boolean;
  /** Whether the checkbox has a validation error. @default false */
  hasError?: boolean;
  /** Whether the checkbox is required. @default false */
  isRequired?: boolean;

  // Content
  /** Label text displayed next to the checkbox. */
  label?: string;
  /** Helper text displayed below the checkbox. */
  helperText?: string;
  /** Error message text. */
  errorMessage?: string;
  /** Value attribute for form submission. */
  value?: string;
  /** Name attribute for form submission. */
  name?: string;

  // Events
  /** Called when checked state changes. */
  onChange?: (isChecked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Called when the checkbox loses focus. */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  // Accessibility
  /** ARIA label. Defaults to label text. */
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
```

---

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `standard` | Square box with checkmark, label on right | Generic selections |
| `switch` | Pill-shaped toggle (see Switch.md) | Settings, toggles |
| `card` | Checkbox embedded in a card container | Selection cards, plans |
| `button` | Checkbox styled as a toggle button | Button groups, toolbars |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Unchecked** | Empty square, neutral border | Not selected |
| **Checked** | Filled brand color, white checkmark | Selected |
| **Indeterminate** | Brand color fill with dash/minus icon | Partial selection in group |
| **Hover** | Border darkens, subtle bg change | Indicates interactivity |
| **Focus** | Focus ring around checkbox | Keyboard focus |
| **Active** | Press state, scale 0.97 | Mouse down |
| **Disabled unchecked** | 40% opacity, muted border | Cannot interact |
| **Disabled checked** | 40% opacity, muted fill | Cannot interact |
| **Error** | Red border, error message below | Validation failure |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **Label** | `<label>` wrapping or `htmlFor` associated with input. Clickable to toggle. |
| **Indeterminate** | `aria-checked="mixed"` when indeterminate. |
| **Error association** | `aria-invalid="true"`, `aria-describedby`. |
| **Disabled state** | `disabled` + `aria-disabled="true"`. |
| **Required** | `aria-required="true"`. |
| **Focus** | Visible 2px focus ring. Tab reaches checkbox. |
| **Keyboard** | Space to toggle checked state. Tab to move focus. Arrow keys when in group. |
| **Screen reader** | Announce "checked" / "unchecked" / "mixed" state. Announce label. |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | Touch target min 44x44px. Label wraps below if needed. |
| Tablet (768-1023px) | Standard sizing. Inline in groups. |
| Desktop (1024-1279px) | Horizontal checkboxes in groups. |
| Wide (1280-1599px) | Standard appearance. |
| Ultra-wide (1600px+) | Standard appearance. |

---

## Animation Rules

| Element | Trigger | Duration | Easing |
|---------|---------|----------|--------|
| Checkmark appear | Checked | 100ms | Ease-Out |
| Indeterminate icon | State change | 100ms | Ease-Out |
| Border color | Hover | 100ms | Linear |
| Focus ring | Focus | 150ms | Ease-Out |
| Press scale | Active | 50ms | Ease-Out |

All animations respect `prefers-reduced-motion`.

---

## Future Expansion

| Extension Point | Description |
|-----------------|-------------|
| `variant="card"` | Card-style checkbox with rich content |
| `variant="button"` | Toggle button checkbox |
| `description` prop | Additional description below label |
| `icon` prop | Custom checkmark icon |
| `group` behavior | Built-in CheckboxGroup for managing multiple |

---

## Dependencies

| Dependency | Type | Description |
|------------|------|-------------|
| Icon (Check, Minus) | Internal | Checkmark and indeterminate icons |
| FormGroup | Internal | Optional parent wrapper |

---

## Related Components

| Component | Relationship |
|-----------|-------------|
| Radio.md | Single-selection sibling for mutually exclusive options |
| Switch.md | Binary toggle variant (pill-shaped) |
| FormGroup.md | Parent wrapper for label and layout |

---

## Anti-patterns

1. **Using Checkbox for mutually exclusive options** — Use Radio for single-selection groups.
2. **Making label not clickable** — Label must always toggle the checkbox.
3. **Hiding the native input** — Keep `<input type="checkbox">` in DOM for form submission and accessibility.
4. **Custom indeterminate without JS** — Indeterminate is a DOM property, not an HTML attribute; set via script.
5. **Too many checkboxes without grouping** — Group related checkboxes under a legend.

---

## Performance Notes

- Checkbox is a lightweight component — minimal re-render impact.
- Indeterminate state should be set via ref (`inputRef.current.indeterminate = true`), not as attribute.
- Use `defaultChecked` for uncontrolled groups to reduce renders.
- Grouped checkboxes should share a single `onChange` handler when possible.
