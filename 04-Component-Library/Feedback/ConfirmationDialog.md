# ConfirmationDialog

## Purpose
An action confirmation modal that extends Dialog. Presents a clear title, message, and two actions — confirm (primary) and cancel — to prevent accidental destructive or irreversible operations. Supports a destructive variant that styles the confirm button with danger colours.

## Responsibilities
- Extend Dialog with a pre-built confirmation layout
- Display a confirmation title and descriptive message
- Render a primary confirm button and a secondary cancel button
- Support a "destructive" variant that uses danger-styled confirm button
- Disable confirm button while the action is processing (loading state)
- Prevent Dialog close while processing (disable Esc/backdrop close)
- Call `onConfirm` when user clicks confirm
- Call `onCancel` when user clicks cancel (or dismisses via Esc/backdrop)
- Provide a loading state for async confirmations (e.g., "Deleting...")
- Support custom confirm/cancel button labels

## Composition
```
ConfirmationDialog (extends Dialog)
├── Dialog.Header (inherited)
├── Dialog.Body
│   ├── Icon (optional, variant-specific: warning icon for destructive)
│   ├── ConfirmTitle
│   └── ConfirmMessage
└── Dialog.Footer
    ├── CancelButton
    └── ConfirmButton (primary / danger variant)
```

## Hierarchy
```
App → Any Page → Dialog → ConfirmationDialog
```

## Props Contract

```typescript
interface ConfirmationDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Dialog title */
  title: string;
  /** Confirmation message body */
  message: string;
  /** Optional detailed description */
  description?: string;
  /** Confirmation variant */
  variant?: 'default' | 'destructive';
  /** Label for the confirm button (default: "Confirm") */
  confirmLabel?: string;
  /** Label for the cancel button (default: "Cancel") */
  cancelLabel?: string;
  /** Icon to show in the body (default: none for 'default', warning icon for 'destructive') */
  icon?: React.ReactNode;
  /** Show the icon */
  showIcon?: boolean;
  /** Called when user confirms */
  onConfirm: () => void;
  /** Called when user cancels or dismisses */
  onCancel: () => void;
  /** Whether the confirm action is processing (shows loading state) */
  loading?: boolean;
  /** Disable confirm button (even when not loading) */
  confirmDisabled?: boolean;
  /** Disable cancel button */
  cancelDisabled?: boolean;
  /** Label shown on confirm button while loading (default: "Processing...") */
  loadingLabel?: string;
  /** Prevent dialog close during loading */
  closeOnLoadingDisabled?: boolean;
  /** Confirm button props forwarded to Button */
  confirmButtonProps?: Partial<ButtonProps>;
  /** Cancel button props forwarded to Button */
  cancelButtonProps?: Partial<ButtonProps>;
  /** Dialog size (default: "sm") */
  size?: 'sm' | 'md';
  className?: string;
}
```

## Variants
| Variant | Icon | Confirm Button Style | Use Case |
|---|---|---|---|
| default | None (or optional info icon) | Primary (brand) | "Save changes?", "Discard draft?" |
| destructive | Warning triangle / X circle | Danger (red) | "Delete document?", "Remove member?" |

## States
| State | Visual |
|---|---|
| Open | Dialog visible with title, message, two buttons |
| Loading | Confirm button shows spinner + "Processing..." label; both buttons disabled; Esc/backdrop close disabled |
| Confirm disabled | Confirm button greyed out (disabled prop), with explanation tooltip |
| Error | Optional: inline error message above buttons (e.g., "Failed to delete. Try again.") |

## Accessibility
- `role="alertdialog"` (more specific than Dialog's `role="dialog"`)
- `aria-labelledby` linked to the title
- `aria-describedby` linked to the message
- Confirm button: `aria-label` reflects the action (e.g., "Delete document 'Q3 Report'")
- Cancel button: `aria-label="Cancel"`
- Focus trap: first focusable button receives focus on open (usually Cancel to prevent accidental confirm)
- Loading state: `aria-live="polite"` on the button area announces processing state
- Esc still calls `onCancel` unless `loading` is true and `closeOnLoadingDisabled` is set
- `prefers-reduced-motion`: respect

## Responsive Rules
| Breakpoint | Behavior |
|---|---|
| ≥ 480px | Side-by-side buttons (Cancel | Confirm), small dialog |
| < 480px | Stacked buttons (Confirm full-width on top, Cancel below); full-width dialog |

## Animation Rules
- Inherits all Dialog enter/exit animations
- Icon entrance (if present): subtle scale-up 200ms
- Loading spinner on button: CSS animation, 1s infinite linear

## Future Expansion
- "Don't ask again" checkbox (with persistent preference storage)
- Three-button variant (Confirm / Cancel / Apply to All)
- Countdown auto-confirm (for dangerous actions — 5s delay before confirm is enabled)
- Destructive confirmation with type-to-confirm (delegated to WarningDialog)

## Dependencies
- `Dialog` (base component — extends its props and behaviour)
- `Button` (confirm, cancel)
- `Spinner` (loading state)
- `Icon` (variant icons)

## Related Components
- `Dialog` — base modal container
- `WarningDialog` — more severe sibling with type-to-confirm
- `Toast` — shown after confirmation completes (e.g., "Document deleted")
- `ErrorState` — displayed if the confirm action fails

## Anti-patterns
- ❌ Using ConfirmationDialog for non-actions (e.g., just showing info) — use Dialog or Alert
- ❌ Placing the confirm button on the left — consistent with platform conventions, confirm should be on the right (or top on mobile)
- ❌ Not disabling close during async operations — user may accidentally dismiss mid-operation
- ❌ Using destructive variant for non-destructive actions — dilutes the meaning of red danger styling
- ❌ Making the confirm button say "Yes" and cancel say "No" — use verb-based labels ("Delete", "Cancel")
- ❌ Not showing a loading state for async operations — user may click confirm multiple times

## Performance Notes
- Extremely lightweight — thin wrapper around Dialog
- No special performance concerns beyond Dialog implementation
- Opening/closing is infrequent — no memoisation needed
- Loading spinner uses CSS animation only — no runtime overhead
