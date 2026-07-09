# Password

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-2 ([Form-Specifications](../../03-Design-System/Forms/Form-Specifications.md)), DP-1 ([Accessibility](../../02-Design-Language/Accessibility.md), [Motion-System](../../02-Design-Language/Motion-System.md))

---

## Purpose

Secure text entry component for password capture with visibility toggle, strength indication, and caps lock warning. Extends the Input base component.

---

## Responsibilities

- Render a secure `<input type="password">` element
- Provide a visibility toggle button to show/hide password text
- Display password strength indicator (empty, weak, medium, strong)
- Detect and warn when Caps Lock is active
- Support paste, but prevent copy while password is masked
- Announce visibility state changes to screen readers

---

## Composition

```
Input (base)
└── Password
    ├── <input type="password|text">
    ├── VisibilityToggle (IconButton)
    ├── StrengthIndicator
    │   ├── StrengthBar (animated segments)
    │   └── StrengthLabel (text description)
    └── CapsLockWarning (contextual alert)
```

---

## Hierarchy

| Relation | Component | Description |
|----------|-----------|-------------|
| Parent | FormGroup | Provides label, layout, validation |
| Extends | Input | Inherits all Input props and behavior |
| Sibling | StrengthIndicator | Visual password strength feedback |
| Sibling | CapsLockWarning | Warning when caps lock is on |
| Child | VisibilityToggle | Show/hide password button |

---

## Props Contract

```typescript
/**
 * Props for the Password component.
 */
export interface PasswordProps {
  // Display
  /** Size of the password input. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the input spans full container width. @default false */
  fullWidth?: boolean;
  /** Whether to show the strength indicator. @default true */
  showStrength?: boolean;
  /** Whether to show the caps lock warning. @default true */
  showCapsLock?: boolean;

  // State
  /** Whether the input is disabled. @default false */
  isDisabled?: boolean;
  /** Whether the input is in a loading state. @default false */
  isLoading?: boolean;
  /** Whether the input has a validation error. @default false */
  hasError?: boolean;
  /** Custom error message text. */
  errorMessage?: string;
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

  // Events
  /** Called when the value changes. */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Called when the input loses focus. */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Called when visibility is toggled. */
  onVisibilityToggle?: (isVisible: boolean) => void;

  // Validation
  /** Minimum password length. @default 8 */
  minLength?: number;
  /** Enable common password validation. @default true */
  validateCommonPasswords?: boolean;

  // Strength
  /** Custom strength evaluator function. Overrides default. */
  strengthEvaluator?: (value: string) => PasswordStrength;
  /** Custom strength labels. @default ["Weak", "Medium", "Strong", "Very Strong"] */
  strengthLabels?: string[];

  // Accessibility
  /** ARIA label for the input. */
  ariaLabel?: string;
  /** Custom ID for the input element. */
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

/** Password strength evaluation result. */
export interface PasswordStrength {
  /** Strength score 0-100. */
  score: number;
  /** Level label. */
  level: 'empty' | 'weak' | 'medium' | 'strong' | 'very-strong';
  /** Detailed feedback message. */
  feedback?: string;
}
```

---

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `standard` | Password input with visibility toggle | Login forms, registration |
| `with-strength` | Standard + strength indicator below input | Registration, password change |
| `with-confirm` | Two password fields for confirmation | Registration flows |
| `minimal` | Toggle only, no strength or caps lock | Quick auth dialogs |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Default** | Input with password dots, eye icon visible | Masked by default |
| **Hover** | Border darkens, eye icon slightly highlights | Indicates interactivity |
| **Focus** | 2px brand ring, clear focus indicator | Keyboard focus |
| **Active** | User typing, dots appearing | Content entry |
| **Disabled** | 40% opacity, no interaction | Cannot interact |
| **Loading** | Spinner replaces eye icon | Async validation |
| **Error** | Error border + message, `aria-invalid` | Validation failure |
| **Visible** | Eye icon toggled to eye-off, plain text shown | User viewing password |
| **Caps Lock on** | Warning text appears below input | Prevent accidental caps |
| **Strength weak** | Red bar, "Weak" label | Password too short/simple |
| **Strength medium** | Yellow/amber bar, "Medium" label | Acceptable but improvable |
| **Strength strong** | Green bar, "Strong" label | Meets complexity standards |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **Label** | `<label htmlFor="...">` or `aria-label`. Always present. |
| **Visibility toggle** | `aria-label="Show password"` / `aria-label="Hide password"`. `aria-pressed` to indicate state. |
| **Caps Lock warning** | `role="alert"` on warning message. Announced immediately. |
| **Strength indicator** | `aria-live="polite"` for score changes. `role="progressbar"` with `aria-valuenow`. |
| **Error association** | `aria-invalid` + `aria-describedby` linking to error message. |
| **Disabled state** | `disabled` + `aria-disabled="true"`. |
| **Focus** | Visible ring. Toggle button is keyboard-reachable. |
| **Keyboard** | Tab to input, Tab to toggle. Enter/Space to toggle visibility. Escape to clear. |
| **Screen reader** | Announce "Password hidden" / "Password shown" on toggle. Announce strength level changes. |
| **Copy protection** | While masked, browser's context menu copy is disabled programmatically. |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | Full width. Strength indicator stacked below. |
| Tablet (768-1023px) | Full width or fixed width. |
| Desktop (1024-1279px) | Fixed width up to 400px. |
| Wide (1280-1599px) | Fixed width up to 480px. |
| Ultra-wide (1600px+) | Max width 560px. |

---

## Animation Rules

| Element | Trigger | Duration | Easing |
|---------|---------|----------|--------|
| Visibility toggle icon | Click | 100ms | Ease-Out |
| Input type switch | Toggle | 0ms (instant) | — |
| Strength bar fill | Value change | 200ms | Ease-Out |
| Strength bar color | Level change | 200ms | Ease-Out |
| Caps lock warning | Keydown detection | 150ms | Ease-Out |
| Focus ring | Focus | 150ms | Ease-Out |

All animations respect `prefers-reduced-motion`.

---

## Future Expansion

| Extension Point | Description |
|-----------------|-------------|
| `variant="with-confirm"` | Dual-password confirmation with match validation |
| `generatePassword` prop | Password generation button with strength target |
| `showPwStrengthHistory` | Visual history of strength changes during typing |
| `biometric` prop | Biometric (fingerprint/face) toggle support |
| `autoComplete` mapping | `new-password`, `current-password` attribute support |
| `passwordRules` prop | Custom rule display for password requirements |

---

## Dependencies

| Dependency | Type | Description |
|------------|------|-------------|
| Input | Internal | Base text input component |
| IconButton | Internal | Visibility toggle trigger |
| Icon (Eye, EyeOff) | Internal | Toggle icons |
| StrengthIndicator | Internal | Strength bar sub-component |
| CapsLockWarning | Internal | Caps lock alert sub-component |
| ProgressBar | Internal | Strength bar visual |
| FormGroup | Internal | Optional parent wrapper |

---

## Related Components

| Component | Relationship |
|-----------|-------------|
| Input.md | Base component, Password extends all Input props |
| FormGroup.md | Parent wrapper for label and layout |
| Validation.md | Consumed for password rule validation |

---

## Anti-patterns

1. **Copying password values** — Never allow programmatic copy of password value while masked.
2. **Showing password by default** — Always start masked. Visibility must be opt-in.
3. **Removing visibility toggle** — Users must be able to verify what they typed.
4. **Storing plain-text values** — Password component never stores or logs values.
5. **Using Input for passwords** — Always use Password for security features (toggle, caps lock).
6. **Weak strength enforcement only** — Use both client-side strength check AND server-side validation.

---

## Performance Notes

- Strength evaluation runs on every keystroke. Debounce at 150ms for complex evaluators.
- Caps lock detection uses `KeyboardEvent.getModifierState('CapsLock')` — no DOM queries needed.
- Strength bar uses CSS transitions only — no JS animation.
- Visibility toggle is instant (0ms) for security responsiveness.
- Store strength evaluator logic externally when used across multiple forms to avoid recalculation.
