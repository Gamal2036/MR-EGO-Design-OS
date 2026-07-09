# Dialog

## Purpose
A modal overlay container that interrupts the user's current task to present critical information or prompt an action. Traps focus within the dialog, provides a scrim backdrop, and supports keyboard dismissal via Escape.

## Responsibilities
- Render an overlay backdrop (semi-transparent scrim)
- Trap keyboard focus within the dialog while open
- Close on Escape key press
- Close on backdrop click (optional, configurable)
- Provide three structural slots: header, body, footer
- Support four size variants: small (400px), medium (560px), large (720px), fullscreen
- Manage open/close lifecycle with enter/exit animations
- Prevent background page scroll while open (lock body scroll)
- Restore focus to the triggering element on close
- Return focus to a specified element if provided

## Composition
```
Dialog
├── Backdrop (scrim overlay)
└── DialogPanel
    ├── DialogHeader
    │   ├── DialogTitle
    │   └── CloseButton
    ├── DialogBody (flex-grow, scrollable)
    │   └── children
    └── DialogFooter (action buttons)
```

## Hierarchy
```
App → Any Page → Dialog (portal to body)
```

## Props Contract

```typescript
interface DialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when dialog requests close (Esc, backdrop click, close btn) */
  onClose: () => void;
  /** Dialog size variant */
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  /** Dialog title (rendered in header) */
  title?: string;
  /** Content rendered in the body */
  children: React.ReactNode;
  /** Content rendered in the footer */
  footer?: React.ReactNode;
  /** Close on backdrop click (default: true) */
  closeOnOverlayClick?: boolean;
  /** Close on Escape (default: true) */
  closeOnEsc?: boolean;
  /** Show close button in header (default: true) */
  showCloseButton?: boolean;
  /** Prevent body scroll while open (default: true) */
  lockBodyScroll?: boolean;
  /** Element ID to restore focus to on close (defaults to trigger) */
  restoreFocusRef?: React.RefObject<HTMLElement>;
  /** Initial focus element ref (defaults to first focusable element) */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /** z-index override */
  zIndex?: number;
  className?: string;
  /** Header className override */
  headerClassName?: string;
  /** Body className override */
  bodyClassName?: string;
  /** Footer className override */
  footerClassName?: string;
}
```

## Variants
| Variant | Width | Use Case |
|---|---|---|
| sm (small) | 400px | Confirmation dialogs, short prompts |
| md (medium) | 560px | Most dialogs — forms, detail views |
| lg (large) | 720px | Complex forms, multi-step wizards |
| fullscreen | 100vw × 100vh | Rich content, previews, long forms |
| *Responsive* | 100% – 32px on < 480px | Mobile overrides |

## States
| State | Visual |
|---|---|
| Closed (default) | Dialog not rendered or rendered but hidden |
| Opening | Backdrop fades in, dialog panel scales up + fades in |
| Open | Dialog visible, focus trapped, body scroll locked |
| Closing | Backdrop fades out, dialog panel scales down + fades out |
| Fullscreen | No border radius, no shadow, fills entire viewport |

## Accessibility
- `role="dialog"` with `aria-modal="true"` on the dialog panel
- `aria-labelledby` linked to the title element
- `aria-describedby` linked to the body content (optional, for screen reader description)
- Focus trap: Tab/Shift+Tab cycles through all focusable elements inside the dialog; focus does not leave the dialog
- First focusable element receives focus on open (or element specified in `initialFocusRef`)
- Escape key closes the dialog (unless `closeOnEsc === false`)
- Backdrop click closes (unless `closeOnOverlayClick === false`)
- On close: focus returns to the element that triggered the dialog
- `aria-hidden="true"` on all sibling elements when dialog is open (or use `inert` attribute)
- Body scroll is locked via `overflow: hidden` on `<body>` (with padding compensation for scrollbar width)
- Fullscreen dialogs should use `role="document"` for long-form content

## Responsive Rules
| Breakpoint | Behavior |
|---|---|
| ≥ 768px | Sizing follows the `size` prop (sm: 400px, md: 560px, lg: 720px); centered both axis |
| 480–767px | Dialog takes 90% of viewport width (max 560px), vertical centering maintained |
| < 480px | Full-width dialog (100% – 32px margin), top-aligned with 16px top margin, fills almost full viewport minus margins; small/medium distinction collapses |
| Fullscreen (all) | Always fills viewport, no border-radius, no margin |

## Animation Rules
- Backdrop: opacity 0 → 0.5, 200ms ease-out (open); reverse 150ms (close)
- Panel: `transform: scale(0.95)` + `opacity: 0` → `transform: scale(1)` + `opacity: 1`, 200ms ease-out (open); reverse 150ms (close)
- Fullscreen: scale animation skipped — only backdrop fade
- Content inside panel (if any): no default animations
- `prefers-reduced-motion`: respect — skip scale animation, only fade

## Future Expansion
- Draggable dialog (drag by header)
- Resizable dialog
- Nested dialog support (dialog within dialog — rare but needed for e.g. file picker)
- Slide-in panel variant (from right edge)
- `alertdialog` role integration (auto-wired for ConfirmationDialog / WarningDialog)
- Async dialog: `dialog.showModal()` promise-based API

## Dependencies
- `Icon` (close icon)
- `Button` / `IconButton` (close button)
- `FocusTrap` (utility component or hook)
- `ScrollLock` (utility hook)
- Portal (`createPortal`)

## Related Components
- `ConfirmationDialog` — extends Dialog for action confirmations
- `WarningDialog` — extends Dialog for cautionary alerts
- `Toast` / `Alert` — non-modal alternatives
- `Drawer` — side panel sibling (not modal in same sense)

## Anti-patterns
- ❌ Nesting dialogs (dialog on top of dialog) — confusing, hard to manage focus; avoid except in very rare, well-justified cases
- ❌ Using Dialog for non-blocking information — use Toast or Alert instead
- ❌ Making the body scroll independently of the page without enough padding — causes content to hide behind footer
- ❌ Not compensating for scrollbar width when locking body scroll (causes layout shift)
- ❌ Opening a dialog on page load without user action — bad UX, accessibility violation
- ❌ Placing too many actions in the footer — 1–3 actions max (primary + secondary + cancel)
- ❌ Setting `closeOnOverlayClick={false}` without providing another obvious dismiss method

## Performance Notes
- Dialog is lazily rendered (only mounts when `open` becomes true) or uses CSS visibility to avoid mount/unmount cost
- Portal renders at document body — prevents z-index conflicts with parent stacking contexts
- Focus trap: efficient querySelectorAll for focusable elements — cache the list on open, re-query on DOM change
- Body scroll lock: store original `overflow` + `paddingRight` values, restore on close; handle multiple dialogs with a counter
- No unnecessary re-renders — Dialog is a thin shell; content re-renders are the child's responsibility
- Fullscreen on mobile should use `dvh` (dynamic viewport height) instead of `vh` to account for browser chrome
