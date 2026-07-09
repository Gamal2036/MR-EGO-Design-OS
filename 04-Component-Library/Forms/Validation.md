# Validation

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-2 ([Form-Specifications](../../03-Design-System/Forms/Form-Specifications.md)), DP-1 ([Accessibility](../../02-Design-Language/Accessibility.md))

---

## Purpose

Validation system contract that defines the rules engine, validation strategies, error message templates, and dependency validation for all form components. This is a specification-only contract describing how validation behaves across form controls — not a component itself.

---

## Responsibilities

- Define the validation rules engine interface and rule schema
- Specify validation trigger strategies (inline, on-blur, on-submit)
- Provide error message template contract and localization patterns
- Support synchronous and asynchronous validation rules
- Define cross-field dependency validation
- Specify validation state management across form groups
- Define the validation result contract

---

## Composition

```
Form (root)
├── FormGroup (field wrapper)
│   ├── FormControl (Input, Select, etc.)
│   └── Validation
│       ├── RuleEngine (evaluates rules)
│       ├── ErrorMessage (display)
│       └── ValidationState (internal)
└── FormSubmission
    └── ValidationSummary (optional, top-of-form errors)
```

---

## Hierarchy

| Relation | Component | Description |
|----------|-----------|-------------|
| Parent | Form | Root validation orchestration |
| Parent | FormGroup | Field-level validation container |
| Child | RuleEngine | Evaluates validation rules |
| Child | ErrorMessage | Displays validation errors |
| Child | ValidationState | Tracks field validity |

---

## Props Contract

```typescript
// ============================================================================
// Rule Definitions
// ============================================================================

/** Validation rule severity. */
export type ValidationSeverity = 'error' | 'warning' | 'info';

/** Base validation rule. */
export interface ValidationRule {
  /** Unique rule id. */
  id: string;
  /** Severity level. @default "error" */
  severity?: ValidationSeverity;
  /** Error message template or function. */
  message: string | ((params: Record<string, unknown>) => string);
  /** Whether to stop evaluation on first failure. @default true */
  stopOnFailure?: boolean;
}

/** Required field rule. */
export interface RequiredRule extends ValidationRule {
  type: 'required';
  /** Whether to trim whitespace before checking. @default true */
  trim?: boolean;
}

/** Min/max length rule. */
export interface LengthRule extends ValidationRule {
  type: 'length';
  /** Minimum length. */
  min?: number;
  /** Maximum length. */
  max?: number;
}

/** Pattern/regex rule. */
export interface PatternRule extends ValidationRule {
  type: 'pattern';
  /** Regex pattern to test. */
  pattern: RegExp;
}

/** Custom validation function rule. */
export interface CustomRule extends ValidationRule {
  type: 'custom';
  /** Validation function. Returns null if valid, error string if invalid. */
  validate: (value: unknown, formValues: Record<string, unknown>) => string | null | Promise<string | null>;
}

/** Cross-field dependency validation rule. */
export interface DependencyRule extends ValidationRule {
  type: 'dependency';
  /** Field name this depends on. */
  dependsOn: string;
  /** Custom dependency validation function. */
  validate: (value: unknown, dependentValue: unknown, formValues: Record<string, unknown>) => string | null;
}

/** Async validation rule. */
export interface AsyncRule extends ValidationRule {
  type: 'async';
  /** Async validation function. Must return a promise. */
  validate: (value: unknown, formValues: Record<string, unknown>) => Promise<string | null>;
  /** Debounce delay in ms. @default 300 */
  debounceMs?: number;
}

/** Union of all rule types. */
export type ValidationRuleDefinition =
  | RequiredRule
  | LengthRule
  | PatternRule
  | CustomRule
  | DependencyRule
  | AsyncRule;

// ============================================================================
// Field Validation Schema
// ============================================================================

/** Validation configuration for a single field. */
export interface FieldValidationSchema {
  /** Field name (matches the form field name). */
  field: string;
  /** Array of validation rules. */
  rules: ValidationRuleDefinition[];
  /** Validation trigger strategy. @default "on-blur" */
  strategy?: 'inline' | 'on-blur' | 'on-submit';
  /** Whether to validate on mount. @default false */
  validateOnMount?: boolean;
}

// ============================================================================
// Form Validation Schema
// ============================================================================

/** Complete validation schema for a form. */
export interface FormValidationSchema {
  /** Array of field validation schemas. */
  fields: FieldValidationSchema[];
  /** Whether to validate all fields on mount. @default false */
  validateOnMount?: boolean;
  /** Default strategy for fields without explicit strategy. @default "on-submit" */
  defaultStrategy?: 'inline' | 'on-blur' | 'on-submit';
}

// ============================================================================
// Validation Results
// ============================================================================

/** Single validation error. */
export interface ValidationError {
  /** Field name. */
  field: string;
  /** Rule id that failed. */
  ruleId: string;
  /** Error message. */
  message: string;
  /** Severity. */
  severity: ValidationSeverity;
}

/** Validation result for a single field. */
export interface FieldValidationResult {
  /** Field name. */
  field: string;
  /** Whether the field is valid. */
  isValid: boolean;
  /** Array of errors (only when invalid). */
  errors: ValidationError[];
  /** Whether validation is pending (async). */
  isPending: boolean;
}

/** Complete form validation result. */
export interface FormValidationResult {
  /** Whether the entire form is valid. */
  isValid: boolean;
  /** Field-level results. */
  fields: Record<string, FieldValidationResult>;
  /** Number of fields with errors. */
  errorCount: number;
  /** Number of fields with warnings. */
  warningCount: number;
}

// ============================================================================
// Validation Context
// ============================================================================

/** Validation context provided to child form controls. */
export interface ValidationContextValue {
  /** Register a field with validation rules. */
  registerField: (schema: FieldValidationSchema) => void;
  /** Unregister a field on unmount. */
  unregisterField: (fieldName: string) => void;
  /** Validate a specific field. */
  validateField: (fieldName: string) => Promise<FieldValidationResult>;
  /** Validate all fields. */
  validateAll: () => Promise<FormValidationResult>;
  /** Get a field's validation result. */
  getFieldResult: (fieldName: string) => FieldValidationResult | undefined;
  /** Set a field's value (triggers validation based on strategy). */
  setFieldValue: (fieldName: string, value: unknown) => void;
  /** Current form validation state. */
  formResult: FormValidationResult;
}

// ============================================================================
// Props
// ============================================================================

/**
 * Props for the Validation provider component.
 */
export interface ValidationProviderProps {
  /** Validation schema for the form. */
  schema: FormValidationSchema;
  /** Current form values. */
  values: Record<string, unknown>;
  /** Called when validation state changes. */
  onValidationChange?: (result: FormValidationResult) => void;
  /** Locale for error message templates. @default "en" */
  locale?: string;
  /** Custom error message templates. */
  messages?: Record<string, string | ((params: Record<string, unknown>) => string)>;

  /** Child form components. */
  children?: React.ReactNode;

  /** Test identifier. */
  dataTestId?: string;
}
```

---

## Strategies

| Strategy | Trigger | Use Case |
|----------|---------|----------|
| **inline** | On every value change | Real-time validation, character counters |
| **on-blur** | When field loses focus | Standard form validation, password fields |
| **on-submit** | On form submission only | Multi-step forms, large forms |

---

## Error Message Templates

```typescript
/** Default error message templates. */
const defaultMessages: Record<string, string | ((params: Record<string, unknown>) => string)> = {
  required: '{label} is required',
  minLength: '{label} must be at least {min} characters',
  maxLength: '{label} must be at most {max} characters',
  pattern: '{label} format is invalid',
  min: '{label} must be at least {min}',
  max: '{label} must be at most {max}',
  email: 'Please enter a valid email address',
  url: 'Please enter a valid URL',
  match: '{label} does not match',
  async: 'Validating...',
  asyncError: '{label} validation failed',
  custom: '{label} is invalid',
};

/** Template variable pattern: {variableName} */
```

---

## Dependency Validation

| Pattern | Description | Example |
|---------|-------------|---------|
| **Cross-field** | Field A validates based on Field B's value | Password confirm must match password |
| **Conditional** | Field A is required only if Field B has a value | State required if country is "US" |
| **Group validation** | Group of fields validated together | Address block (street+city+zip) |
| **Async dependency** | Field A validation waits for async check of Field B | Username availability on email change |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Idle** | No indicator | Not yet validated |
| **Validating** | Spinner or subtle indicator | Async check in progress |
| **Valid** | Green checkmark or none (success optional) | Passed all rules |
| **Error** | Red border, error message visible | One or more rules failed |
| **Warning** | Yellow/orange border, warning text | Non-blocking rule failed |
| **Info** | Blue indicator, informational text | Informational validation |
| **Pending async** | Delayed indicator | Debounce timer active |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **Error association** | `aria-invalid="true"` on input. `aria-describedby` linking to error element id. |
| **Live region** | `aria-live="polite"` on error container for dynamic errors. |
| **Required** | `aria-required="true"` on required fields. |
| **Validation summary** | `role="alert"` on top-of-form error summary. Announce form error count. |
| **Async state** | `aria-busy="true"` on field during async validation. |
| **Focus on error** | Focus moves to first errored field on form submission. |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | Error messages full width below field. Validation summary stacks. |
| Tablet (768-1023px) | Standard inline error placement. |
| Desktop (1024-1279px) | Error messages inline or below. Summary sidebar optional. |
| Wide (1280-1599px) | Standard behavior. |
| Ultra-wide (1600px+) | Standard behavior. |

---

## Animation Rules

| Element | Trigger | Duration | Easing |
|---------|---------|----------|--------|
| Error appear | Validation fail | 200ms | Ease-Out |
| Error disappear | Validation pass | 150ms | Ease-In |
| Spinner appear | Async start | 100ms | Ease-Out |
| Success icon | Valid | 150ms | Ease-Out |

All animations respect `prefers-reduced-motion`.

---

## Future Expansion

| Extension Point | Description |
|-----------------|-------------|
| `i18n` support | Full localization of error templates |
| `compose` rules | Rule composition (AND/OR logic) |
| `schema` import | Import validation from JSON schema (JSON Schema, Zod, Yup) |
| `async` batch | Batch async validations for performance |
| `debounce` per-rule | Configurable debounce per async rule |
| `abortController` | Cancel in-flight async validations |

---

## Dependencies

| Dependency | Type | Description |
|------------|------|-------------|
| ValidationContext | Internal | React context for validation state |
| RuleEngine | Internal | Evaluates rules against values |
| ErrorMessage | Internal | Displays error text |
| Spinner | Internal | Async validation indicator |

---

## Related Components

| Component | Relationship |
|-----------|-------------|
| Input.md | Consumes validation for inline errors |
| Password.md | Consumes validation with custom strength rules |
| Textarea.md | Consumes validation with length rules |
| FormGroup.md | Renders error messages from validation state |

---

## Anti-patterns

1. **Client-only validation** — Always validate on server too. Client validation is UX only.
2. **No debounce on async** — Always debounce async validation (300ms minimum).
3. **Over-validating on every keystroke** — Use on-blur for complex validation; inline for simple rules only.
4. **Not clearing errors on change** — Clear error when user starts fixing the field.
5. **Blocking form submission during async** — Allow submission; handle server response.
6. **Showing all errors at once on untouched fields** — Validate on blur or submit only for untouched fields.

---

## Performance Notes

- Rule evaluation should be synchronous where possible; async only for server calls.
- Debounce async validation at 300ms minimum to reduce server load.
- Validation state uses immutable updates — use `useReducer` for complex forms.
- Large forms (20+ fields) should use field-level validation, not form-level on every change.
- Rule functions should be pure and memoized to prevent re-creation on each render.
- Error message template compilation should happen once, not per evaluation.
- Validation context uses stable references to prevent cascading re-renders.
