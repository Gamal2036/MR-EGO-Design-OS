# FormGroup

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-2 ([Form-Specifications](../../03-Design-System/Forms/Form-Specifications.md)), DP-1 ([Accessibility](../../02-Design-Language/Accessibility.md), [Responsive-System](../../02-Design-Language/Responsive-System.md))

---

## Purpose

Field grouping container component that wraps form controls with a label, helper text, validation messages, and layout management. Supports default, inline, and section variants with column layout support and required field indication.

---

## Responsibilities

- Render a label associated with the child form control
- Display helper text below the field for guidance
- Show validation error messages when validation fails
- Indicate required fields with an asterisk or badge
- Manage column layout for multi-field rows
- Support inline label placement (label beside input)
- Group related fields under a section heading
- Pass through ARIA attributes to the child input

---

## Composition

```
FormGroup
├── FormLabel (rendered label with optional required indicator)
├── FormControl (child — Input, Select, Checkbox, etc.)
├── FormHelperText (below control)
├── FormErrorMessage (below helper text, conditional)
└── FormGroupSection (section variant heading)
```

---

## Hierarchy

| Relation | Component | Description |
|----------|-----------|-------------|
| Parent | Form | Root form container |
| Child | FormLabel | Label with required indicator |
| Child | FormControl | Actual form input/control |
| Child | FormHelperText | Contextual guidance |
| Child | FormErrorMessage | Validation error text |
| Sibling | FormGroup | Peer group in same row/column |
| Child of | Stepper | Step content panel |

---

## Props Contract

```typescript
/**
 * Column layout configuration.
 */
export interface FormGroupColumns {
  /** Number of columns. @default 1 */
  count?: 1 | 2 | 3 | 4;
  /** Column gap. @default "md" */
  gap?: 'sm' | 'md' | 'lg';
}

/**
 * Props for the FormGroup component.
 */
export interface FormGroupProps {
  // Display
  /** Visual variant. @default "default" */
  variant?: 'default' | 'inline' | 'section';
  /** Size variant. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the group spans full container width. @default true */
  fullWidth?: boolean;
  /** Column layout configuration. */
  columns?: FormGroupColumns;
  /** Label position for inline variant. @default "left" */
  labelPosition?: 'left' | 'top';
  /** Label width for inline variant. @default "180px" */
  labelWidth?: string | number;

  // State
  /** Whether the field has a validation error. @default false */
  hasError?: boolean;
  /** Whether the field is required. @default false */
  isRequired?: boolean;
  /** Whether the group is disabled (passes to child). @default false */
  isDisabled?: boolean;
  /** Whether the group is in a loading state. @default false */
  isLoading?: boolean;

  // Content
  /** Label text for the group. */
  label?: string;
  /** Helper text displayed below the field. */
  helperText?: string;
  /** Error message text. */
  errorMessage?: string;
  /** Section heading (section variant). */
  sectionTitle?: string;
  /** Section description (section variant). */
  sectionDescription?: string;
  /** Unique id for the field. Auto-generated if not provided. */
  id?: string;
  /** Name attribute for the child input. */
  name?: string;
  /** The form control child element(s). */
  children?: React.ReactNode;

  // Accessibility
  /** ARIA label for the group. */
  ariaLabel?: string;

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
| `default` | Label above, helper/error below | Standard form layout |
| `inline` | Label beside the input (left or top) | Compact forms, settings |
| `section` | Grouped fields with section heading | Multi-section forms, profiles |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Default** | Label above, helper text below | Ready for input |
| **Focused** | (Delegated to child control) | Child handles focus |
| **Error** | Error message visible in red, `aria-invalid` | Validation failure |
| **Disabled** | 40% opacity on group | Child controls disabled |
| **Loading** | Skeleton placeholder | Async form field |
| **Required** | Red asterisk next to label | Indicates required field |
| **Inline** | Label on left, control on right, inline layout | Side-by-side |
| **Section** | Bold section title with divider | Section grouping |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **Label association** | `<label htmlFor="...">` linking to child input id. |
| **Required indicator** | Asterisk in label text + `aria-required="true"` on child. |
| **Error association** | `aria-describedby` on child pointing to error message id. |
| **Helper text** | `aria-describedby` linking to helper text id. |
| **Group role** | Section variant uses `<fieldset>` with `<legend>`. |
| **Disabled** | `aria-disabled="true"` on group container. |
| **Focus** | Focus management delegated to child component. |
| **Keyboard** | Tab order is: label, then child control, then sibling groups. |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | Single column. Inline variant becomes top-label. Full width. |
| Tablet (768-1023px) | Single column or 2-column depending on columns prop. |
| Desktop (1024-1279px) | Multi-column as specified. Inline label positioned left. |
| Wide (1280-1599px) | Multi-column with comfortable spacing. |
| Ultra-wide (1600px+) | Multi-column with max container width. |

---

## Animation Rules

| Element | Trigger | Duration | Easing |
|---------|---------|----------|--------|
| Error appear | Validation fail | 200ms | Ease-Out |
| Error disappear | Validation pass | 150ms | Ease-In |
| Helper text | Content change | 150ms | Ease-Out |

All animations respect `prefers-reduced-motion`.

---

## Future Expansion

| Extension Point | Description |
|-----------------|-------------|
| `tooltip` prop | Tooltip icon next to label for additional info |
| `optionalLabel` | Custom "Optional" badge text |
| `compact` variant | Dense spacing for data-heavy forms |
| `nested` groups | FormGroup within FormGroup for complex layouts |
| `layout` prop | Grid, flex, or auto layout mode |

---

## Dependencies

| Dependency | Type | Description |
|------------|------|-------------|
| FormLabel | Internal | Label with required indicator |
| FormHelperText | Internal | Guidance text |
| FormErrorMessage | Internal | Error text display |
| Icon (Asterisk) | Internal | Required field icon |

---

## Related Components

| Component | Relationship |
|-----------|-------------|
| Input.md | Common child control |
| All form controls | Every form component is wrapped by FormGroup |
| Validation.md | Consumed for error state and message display |

---

## Anti-patterns

1. **Nesting FormGroup inside FormGroup** — Avoid unless explicitly needed for section layout.
2. **Removing label** — Always provide a label for accessibility.
3. **Error message without color** — Error messages must use red text with appropriate icon.
4. **Helper text as placeholder** — Helper text is persistent; placeholder disappears on input.
5. **Overriding label generation** — Let FormGroup manage label association for consistency.

---

## Performance Notes

- FormGroup is a lightweight wrapper — minimal rendering cost.
- Error message uses conditional rendering (not visibility toggle) to keep DOM clean.
- Label `htmlFor` is auto-generated if no `id` prop is provided.
- Column layout uses CSS grid — no JS calculation for column widths.
- Use `React.memo` for FormGroup when used in repeatable form sections.
