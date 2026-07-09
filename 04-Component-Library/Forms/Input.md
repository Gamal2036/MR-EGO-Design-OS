# Input

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-2 ([Form-Specifications](../../03-Design-System/Forms/Form-Specifications.md)), DP-1 ([Accessibility](../../02-Design-Language/Accessibility.md), [Typography](../../02-Design-Language/Typography.md))

---

## Purpose

Single-line text entry component for capturing short-form text data from users. Serves as the foundational text input primitive that Password, SearchInput, and other text-based inputs extend.

---

## Responsibilities

- Render a labeled single-line `<input>` element
- Display placeholder text when empty
- Show helper text below the field for contextual guidance
- Display error messages with visual and ARIA association
- Manage focus states and forward ref to the underlying input
- Perform validation on blur (configurable via prop)
- Expose current value via controlled or uncontrolled patterns

---

## Composition

```
FormGroup (optional wrapper)
└── Input
    ├── <label> (rendered by Input or FormGroup)
    ├── <input> (native HTMLInputElement)
    ├── Icon (optional, leading or trailing)
    ├── Button (optional, trailing action)
    ├── ClearButton (optional, trailing clear)
    └── HelperText / ErrorMessage (below input)
```

---

## Hierarchy

| Relation | Component | Description |
|----------|-----------|-------------|
| Parent | FormGroup | Provides label, layout, and validation context |
| Parent | Form | Form-level submission and validation |
| Sibling | HelperText | Additional guidance below input |
| Sibling | ErrorMessage | Validation error below input |
| Child | Icon | Leading or trailing icon slot |
| Child | ClearButton | Trailing clear action |
| Extends | — | Base for Password, SearchInput, CommandInput |

---

## Props Contract

```typescript
/**
 * Props for the Input component.
 */
export interface InputProps {
  // Display
  /** Visual variant of the input. @default "standard" */
  variant?: 'standard' | 'with-icon' | 'with-button' | 'with-clear';
  /** Size of the input. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the input spans full container width. @default false */
  fullWidth?: boolean;

  // State
  /** Whether the input is disabled. @default false */
  isDisabled?: boolean;
  /** Whether the input is in a loading state. @default false */
  isLoading?: boolean;
  /** Whether the input has a validation error. @default false */
  hasError?: boolean;
  /** Custom error message text. */
  errorMessage?: string;
  /** Whether the input is read-only. @default false */
  isReadOnly?: boolean;
  /** Whether the input is required. @default false */
  isRequired?: boolean;

  // Content
  /** Label text displayed above the input. */
  label?: string;
  /** Placeholder text displayed when input is empty. */
  placeholder?: string;
  /** Helper text displayed below the input. */
  helperText?: string;
  /** Current value of the input. */
  value?: string;
  /** Default value for uncontrolled usage. */
  defaultValue?: string;
  /** Name attribute for form submission. */
  name?: string;
  /** Leading icon component or element. */
  leadingIcon?: React.ReactNode;
  /** Trailing icon component or element. */
  trailingIcon?: React.ReactNode;
  /** Trailing action button content. */
  trailingButton?: React.ReactNode;
  /** HTML input type. @default "text" */
  type?: 'text' | 'email' | 'url' | 'tel' | 'number' | 'search';

  // Events
  /** Called when the value changes. */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Called when the input loses focus. */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Called when the input gains focus. */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Called on key down. */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Called when the clear button is clicked. */
  onClear?: () => void;

  // Validation
  /** Validation callback triggered on blur. Returns error message or null. */
  validate?: (value: string) => string | null | Promise<string | null>;
  /** Validation mode. @default "on-blur" */
  validationMode?: 'on-blur' | 'on-change' | 'on-submit';

  // Accessibility
  /** ARIA label for the input. Defaults to label text. */
  ariaLabel?: string;
  /** ID of element describing this input. */
  ariaDescribedBy?: string;
  /** Custom ID for the input element. Auto-generated if not provided. */
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
| `standard` | Default input with label, optional helper text | Generic text entry |
| `with-icon` | Input with a leading or trailing icon | Search, email, URL fields |
| `with-button` | Input with a trailing action button | Subscribe forms, invite fields |
| `with-clear` | Input with a trailing clear (X) button | Search fields, filter inputs |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Default** | 1px border, neutral background, label above | Ready for user input |
| **Hover** | Border darkens 1 shade, subtle background shift | Indicates interactivity |
| **Focus** | 2px ring in brand color, border matches ring | Clear keyboard focus indication |
| **Active** | Same as focus while user is typing | Content being entered |
| **Disabled** | 40% opacity, no pointer events, muted label | Not interactive |
| **Loading** | Spinner replaces trailing icon or appears in place | Async operation in progress |
| **Error** | 2px ring in error color, error message below, `aria-invalid="true"` | Validation failure |
| **Success** | Green border/ring, success indicator icon | Validation passed (optional) |
| **Filled** | Standard appearance with content present | User has entered text |
| **Read-only** | Muted background, no border change, no pointer cursor | Display-only value |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **Label** | `<label>` element with `htmlFor` matching input `id`. Auto-generated if no label. `aria-label` as fallback. |
| **Error association** | `aria-invalid="true"` on input. `aria-describedby` pointing to error message element `id`. |
| **Helper text** | `aria-describedby` linking input to helper text element. |
| **Required indicator** | Asterisk in label, `aria-required="true"` on input. |
| **Disabled state** | `disabled` attribute on input, `aria-disabled="true"`. |
| **Focus** | Visible 2px focus ring. Programmatic focus via `ref.focus()`. |
| **Keyboard** | Enter/Space activate trailing button. Escape clears input when clear variant. Tab navigates to/from. |
| **Screen reader** | Value changes announced via `aria-live="polite"` when using validation on blur. Loading state announced. |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | Full width (`fullWidth` forced). Label above input. 16px font minimum. |
| Tablet (768-1023px) | Full width or fixed width depending on container. Standard sizing. |
| Desktop (1024-1279px) | Fixed width up to 400px. Multi-column layout support via FormGroup. |
| Wide (1280-1599px) | Fixed width up to 480px. Comfortable spacing. |
| Ultra-wide (1600px+) | Max width 560px for single inputs. Grid layouts via FormGroup. |

---

## Animation Rules

| Element | Trigger | Duration | Easing |
|---------|---------|----------|--------|
| Border color | Hover | 100ms | Linear |
| Focus ring | Focus | 150ms | Ease-Out |
| Error state | Validation | 200ms | Ease-Out |
| Loading spinner | Start/stop | 200ms | Ease-Out |
| Clear button appear | Value present | 150ms | Ease-Out |

All animations respect `prefers-reduced-motion` (instant transitions).

---

## Future Expansion

| Extension Point | Description |
|-----------------|-------------|
| `variant="password"` | Inline password visibility toggle (see Password.md) |
| `variant="with-tags"` | Inline tag/chip entry within input |
| `mask` prop | Input mask for formatted values (phone, SSN, date) |
| `prefix` / `suffix` | Static text prepended/appended (currency, units) |
| `maxLength` | Character limit with counter |
| `autoComplete` | Autocomplete attribute mapping |
| `inputMode` | Touch keyboard mode override |

---

## Dependencies

| Dependency | Type | Description |
|------------|------|-------------|
| Icon | Internal | Leading/trailing icon rendering |
| Button | Internal | Trailing action button |
| ClearButton | Internal | Clear action sub-component |
| HelperText | Internal | Contextual help text |
| ErrorMessage | Internal | Validation error display |
| FormGroup | Internal | Parent wrapper (optional) |

---

## Related Components

| Component | Relationship |
|-----------|-------------|
| Password.md | Extends Input with visibility toggle and strength meter |
| SearchInput.md | Extends Input with debounce, autocomplete, recent searches |
| CommandInput.md | Extends Input with slash-commands and shortcut display |
| Textarea.md | Multi-line sibling for longer text entry |
| FormGroup.md | Parent wrapper providing label, layout, validation |
| Validation.md | Consumed for inline validation rules |

---

## Anti-patterns

1. **Using Input for passwords** — Use Password component which provides visibility toggle and security indicators.
2. **Using Input for multi-line text** — Use Textarea for content exceeding one line.
3. **Removing the label** — Always provide a visible label or `aria-label` for accessibility.
4. **Custom validation UI** — Use the `validate` prop and `errorMessage` to keep consistent error presentation.
5. **Nesting Input inside other interactive elements** — Input must not be nested inside Button, Select, or other form controls.
6. **Modifying internal input styles** — Do not target `.mr-input__input` or internal classes.

---

## Performance Notes

- Input is a controlled component by default. Use `defaultValue` for uncontrolled mode to reduce re-renders.
- Validation on blur is preferred over on-change to avoid excessive validation calls.
- Debounce heavy validation (async) at 300ms minimum.
- Leading/trailing icons should be pre-imported and stable references to prevent re-mounts.
- Use `React.memo` wrapping when Input is used in lists or repeatable form rows.
