# WarningDialog

## Purpose
A cautionary modal that extends Dialog for high-severity warnings where the user must acknowledge a serious consequence before proceeding. For critical actions, supports a type-to-confirm mechanism that requires the user to type a specific word (e.g., "DELETE") before the confirm button becomes enabled.

## Responsibilities
- Extend Dialog with a cautionary layout including a warning icon
- Display an alert-level warning message
- Provide a "Proceed" (danger-styled) button and a "Cancel" button
- Implement type-to-confirm for critical actions: user must type a specified word to enable the confirm button
- Show clear visual distinction for irreversible actions (e.g., "This action cannot be undone")
- Disable close on backdrop click / Esc while type-to-confirm is active (configurable)
- Provide loading state for async proceed actions

## Composition
```
WarningDialog (extends Dialog)
├── Dialog.Header (inherited)
├── Dialog.Body
│   ├── WarningIcon (large, variant-coloured)
│   ├── WarningTitle
│   ├── WarningMessage
│   ├── ConsequenceMessage (e.g., "This action cannot be undone")
│   └── TypeToConfirm (conditional)
│       ├── InstructionText ("Type DELETE to confirm")
│       └── ConfirmInput
└── Dialog.Footer
    ├── CancelButton
    └── ProceedButton (danger, disabled until type-to-confirm is met)
```

## Hierarchy
```
App → Any Page → Dialog → WarningDialog
```

## Props Contract

```typescript
interface WarningDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Warning title */
  title: string;
  /** Warning message */
  message: string;
  /** Additional consequence description (e.g., "This action cannot be undone.") */
  consequence?: string;
  /** Label for the proceed button (default: "Proceed") */
  proceedLabel?: string;
  /** Label for the cancel button (default: "Cancel") */
  cancelLabel?: string;
  /** When true, requires user to type `confirmText` to enable proceed */
  requireTypeToConfirm?: boolean;
  /** The word the user must type exactly (default: "DELETE") */
  confirmText?: string;
  /** Label shown above the confirm input */
  confirmInputLabel?: string;
  /** Called when user proceeds */
  onProceed: () => void;
  /** Called when user cancels */
  onCancel: () => void;
  /** Whether the proceed action is processing */
  loading?: boolean;
  /** Loading label (default: "Processing...") */
  loadingLabel?: string;
  /** Disable close on overlay/Esc while type-to-confirm is active */
  preventCloseDuringConfirm?: boolean;
  /** Dialog size (default: "sm") */
  size?: 'sm';
  className?: string;
}
```

## Variants
| Variant | Type-to-confirm | Use Case |
|---|---|---|
| Simple | No | "Are you sure? This will sign you out everywhere." |
| Type-to-confirm | Yes (default "DELETE") | "Delete workspace? Type DELETE to confirm." |
| Custom-confirm | Yes (custom word) | "Type 'REMOVE' to confirm removing this team member." |

## States
| State | Visual |
|---|---|
| Open | Warning dialog visible with icon, title, message, consequence |
| Type-to-confirm (idle) | Input field empty, Proceed button disabled, instruction text visible |
| Type-to-confirm (partial) | Input partially matches, Proceed still disabled, partial match may show subtle green tint on matching prefix |
| Type-to-confirm (complete) | Exact match, Proceed button becomes enabled (animates in, pulse or colour transition) |
| Proceed loading | Proceed button shows spinner + loading label; both buttons disabled |
| Error | Optional: inline error message if proceed action fails |
| Closed | Dialog removed from DOM |

## Accessibility
- `role="alertdialog"` — immediate screen reader announcement
- `aria-labelledby` linked to the warning title
- `aria-describedby` linked to the warning message + consequence
- Warning icon: `aria-hidden="true"` (decorative, message text carries meaning)
- Type-to-confirm input:
  - `aria-label="Type {confirmText} to confirm"`
  - `aria-describedby` linking to instruction text
  - `aria-required="true"`
  - `autocomplete="off"` to prevent password managers filling
- Proceed button: `aria-label="Proceed with {action}"` — disabled until confirmed
- Cancel button: `aria-label="Cancel"`
- Focus trap: first focusable element (usually the confirm input or cancel button)
- Esc still calls `onCancel` unless `preventCloseDuringConfirm` is set

## Responsive Rules
| Breakpoint | Behavior |
|---|---|
| ≥ 480px | Standard small dialog with side-by-side buttons |
| < 480px | Full-width dialog, stacked buttons, full-width confirm input |

## Animation Rules
- Inherits all Dialog enter/exit animations
- Warning icon: slow pulse (opacity 0.9 → 1) at 2s interval to draw attention
- Type-to-confirm input: border colour transition (neutral → green) on exact match, 200ms
- Proceed button enable: background colour + opacity transition 200ms, subtle scale 1→1.02 on enable
- Error shake on input mismatch: horizontal shake 3 oscillations, 300ms

## Future Expansion
- Progress step warning (step 1 of 3 — "Before you delete...")
- Countdown before proceed is available (5s cooldown)
- Reason input alongside type-to-confirm ("Please provide a reason for deletion")
- Two-factor confirmation for critical security actions
- Checkbox list of consequences the user must acknowledge individually

## Dependencies
- `Dialog` (base component)
- `Button` (proceed, cancel)
- `Input` / `TextField` (type-to-confirm input)
- `Icon` (warning icon)
- `Spinner` (loading state)

## Related Components
- `ConfirmationDialog` — less severe confirmation with no type-to-confirm
- `Dialog` — base modal
- `Alert` — non-modal alternative for less critical warnings
- `Toast` — feedback after the action completes

## Anti-patterns
- ❌ Using WarningDialog for non-critical actions — reserve for truly destructive/irreversible operations
- ❌ Making the confirm text too long or case-sensitive without indicating that (always use uppercase, indicate case sensitivity)
- ❌ Bypassing type-to-confirm — never programmatically set the input value; user must type
- ❌ Using WarningDialog when ConfirmationDialog suffices — overusing type-to-confirm desensitises users
- ❌ Not showing the consequence clearly — "This action cannot be undone" must be visible, not buried
- ❌ Storing the confirm word in a case-insensitive manner when the instruction says "Type DELETE" — match exactly as instructed

## Performance Notes
- Thin wrapper around Dialog — minimal overhead
- Type-to-confirm input is controlled — simple string comparison, O(n) per keystroke (very fast)
- No re-renders beyond input state change
- Loading spinner is CSS-only
