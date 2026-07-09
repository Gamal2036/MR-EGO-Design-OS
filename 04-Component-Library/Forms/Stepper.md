# Stepper

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-2 ([Form-Specifications](../../03-Design-System/Forms/Form-Specifications.md)), DP-1 ([Accessibility](../../02-Design-Language/Accessibility.md), [Motion-System](../../02-Design-Language/Motion-System.md))

---

## Purpose

Multi-step progress indicator component that guides users through a sequential workflow. Supports horizontal and vertical layouts, numbered or icon steps, and multiple step states (complete, current, upcoming, error).

---

## Responsibilities

- Display a sequence of steps in order
- Indicate the current active step
- Show completed steps with checkmark or numbered indicator
- Mark upcoming steps as not yet reached
- Display error state on specific steps
- Support navigation to completed steps (clickable)
- Animate transitions between step changes
- Show step labels and optional descriptions

---

## Composition

```
Stepper
├── Step (multiple, ordered)
│   ├── StepIndicator
│   │   ├── StepNumber | StepIcon | StepCheckmark
│   │   └── StepConnector (line between steps)
│   ├── StepContent
│   │   ├── StepLabel
│   │   ├── StepDescription (optional)
│   │   └── StepSubContent (vertical variant)
│   └── StepStatusBadge (error, optional)
├── StepperControls (optional prev/next buttons)
└── StepperContent (panel for current step)
```

---

## Hierarchy

| Relation | Component | Description |
|----------|-----------|-------------|
| Parent | FormGroup | Optional wrapper |
| Parent | Wizard | Multi-step form container |
| Child | Step | Individual step item |
| Child | StepIndicator | Number/icon/connector |
| Child | StepperControls | Navigation buttons |

---

## Props Contract

```typescript
/** Step state. */
export type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';

/** A single step definition. */
export interface Step {
  /** Unique step id. */
  id: string;
  /** Step label text. */
  label: string;
  /** Optional description. */
  description?: string;
  /** Optional icon (replaces number when provided). */
  icon?: React.ReactNode;
  /** Optional step status override. */
  status?: StepStatus;
  /** Whether the step is optional. @default false */
  isOptional?: boolean;
  /** Optional label for the step. */
  optionalLabel?: string;
}

/**
 * Props for the Stepper component.
 */
export interface StepperProps {
  // Display
  /** Layout orientation. @default "horizontal" */
  orientation?: 'horizontal' | 'vertical';
  /** Visual variant. @default "numbered" */
  variant?: 'numbered' | 'icon' | 'compact';
  /** Size variant. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the stepper spans full width. @default true */
  fullWidth?: boolean;
  /** Color variant. @default "primary" */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

  // State
  /** Current active step index (0-based). */
  activeStep: number;
  /** Default active step (uncontrolled). @default 0 */
  defaultActiveStep?: number;
  /** Array of step definitions. */
  steps: Step[];
  /** Whether navigation to completed steps is allowed. @default true */
  allowStepNavigation?: boolean;

  // Content
  /** Label for the stepper. */
  label?: string;

  // Events
  /** Called when active step changes. */
  onChange?: (stepIndex: number) => void;
  /** Called when a step indicator is clicked (if navigable). */
  onStepClick?: (stepIndex: number) => void;

  // Accessibility
  /** ARIA label. @default "Progress" */
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
| `numbered` | Circled numbers 1, 2, 3... as indicators | Multi-step forms |
| `icon` | Icons replace numbers as indicators | Onboarding, feature setup |
| `compact` | Minimal indicators, less spacing | Sidebar steps, dense layouts |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Complete** | Filled brand circle with checkmark, solid connector | Step finished, clickable |
| **Current** | Large brand circle with number, pulsing indicator | Active step |
| **Upcoming** | Hollow circle, gray, dimmed text | Not yet reached |
| **Error** | Red circle with exclamation, error badge on label | Step with validation error |
| **Optional** | "Optional" label badge, dashed connector | Non-required step |
| **Clickable (complete)** | Pointer cursor, slight hover bg | Navigable to review |
| **Disabled upcoming** | No pointer events | Cannot skip ahead |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **Role** | `role="navigation"` on stepper container. `aria-label="Progress"`. |
| **Step list** | `role="list"` on steps container. |
| **Current step** | `aria-current="step"` on current step indicator. |
| **Step label** | `aria-label` on each step indicator. |
| **Step state** | `aria-label` includes state: "Step 2: Billing Information (Complete)". |
| **Progress** | `aria-valuenow`, `aria-valuemin`, `aria-valuemax` on hidden progressbar. |
| **Navigation** | Clickable steps have `role="button"` and `tabindex="0"`. |
| **Focus** | Focus ring on step indicators and controls. |
| **Keyboard** | Tab between step indicators (if clickable). Arrow keys in vertical variant. Enter to navigate to step. |
| **Screen reader** | Announce step changes: "Step 2 of 5: Billing Information". State changes: "Step 1 complete". |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | Vertical orientation forced. Full width. Compact indicators. |
| Tablet (768-1023px) | Horizontal if space allows, else vertical. |
| Desktop (1024-1279px) | Horizontal or vertical as specified. |
| Wide (1280-1599px) | Standard behavior. |
| Ultra-wide (1600px+) | Standard behavior. |

---

## Animation Rules

| Element | Trigger | Duration | Easing |
|---------|---------|----------|--------|
| Step transition | Step change | 300ms | Ease-Out |
| Checkmark appear | Status to complete | 200ms | Ease-Out |
| Connector fill | Step completed | 300ms | Ease-Out |
| Current indicator | Step change | 200ms | Ease-Out |
| Error icon appear | Error set | 200ms | Ease-Out |
| Content slide | Step change | 250ms | Ease-Out |

Content transitions slide left/right based on direction of step change.

All animations respect `prefers-reduced-motion`.

---

## Future Expansion

| Extension Point | Description |
|-----------------|-------------|
| `variant="progress"` | Progress bar style instead of step indicators |
| `vertical` with content | Inline step content in vertical layout |
| `linear` / `nonLinear` prop | Linear (must complete in order) vs non-linear |
| `editable` steps | Allow editing completed steps |
| `stepValidation` | Per-step validation callback |
| `collapsible` steps | Expand/collapse step content |

---

## Dependencies

| Dependency | Type | Description |
|------------|------|-------------|
| Icon (Check, Exclamation) | Internal | Step status icons |
| ProgressBar | Internal | Optional progress variant |
| Button | Internal | Prev/next controls |
| FormGroup | Internal | Optional parent wrapper |

---

## Related Components

| Component | Relationship |
|-----------|-------------|
| FormGroup.md | Parent wrapper |
| Wizard-Pattern.md | Pattern using Stepper for multi-step flows |

---

## Anti-patterns

1. **More than 10 steps** — Break into sub-flows or group steps. Stepper maxes at 10.
2. **Skipping required steps** — Unless non-linear, prevent skipping incomplete steps.
3. **No content panel** — Stepper must show content for current step (not just indicators).
4. **Changing step labels dynamically** — Labels should be stable once flow starts.
5. **No error recovery from error state** — Provide clear action to resolve error before proceeding.

---

## Performance Notes

- Steps array should be stable (memoized) to prevent unnecessary re-renders.
- Step transitions use CSS transforms for GPU-accelerated slide animations.
- Only the current step content panel renders — previous/next steps are not in DOM.
- Connector animations use `width` or `height` transitions — CSS only, no JS.
- Use `React.memo` on Step components to prevent re-renders on active step change.
- StepperControls should be stable references to avoid button re-mounts.
