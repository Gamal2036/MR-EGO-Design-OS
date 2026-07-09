# Toast

## Purpose
A transient, non-blocking notification that communicates the result of an action (success, error, warning, info). Auto-dismisses after a configurable duration and supports stacking multiple simultaneous toasts.

## Responsibilities
- Display a brief message with a contextual icon (success/error/warning/info)
- Auto-dismiss after configurable duration (default 5 s)
- Provide an optional action button (e.g., "Undo", "View", "Retry")
- Provide a manual dismiss (close) button
- Stack multiple toasts vertically with spacing
- Animate entrance and exit smoothly
- Pause auto-dismiss timer on hover (for accessibility)
- Manage the toast lifecycle (add, remove, update) via a global or context-based queue

## Composition
```
ToastContainer (portal to body)
└── ToastStack
    └── Toast (×n)
        ├── Icon (variant-specific)
        ├── Message
        ├── ActionButton (optional)
        └── DismissButton
```

## Hierarchy
```
App → ToastProvider → ToastContainer → ToastStack → Toast
```

## Props Contract

```typescript
interface ToastProviderProps {
  /** Max visible toasts before queuing (default: 5) */
  maxVisible?: number;
  /** Default duration in ms (default: 5000) */
  defaultDuration?: number;
  /** Positioning */
  placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  /** Gap between stacked toasts (default: 8) */
  gap?: number;
  children: React.ReactNode;
}

interface ToastProps {
  id: string;
  /** Variant determines icon + colour */
  variant: ToastVariant;
  /** Primary message */
  message: string;
  /** Optional detail/description */
  description?: string;
  /** Duration in ms — 0 means no auto-dismiss */
  duration?: number;
  /** Action button config */
  action?: ToastAction;
  /** Callback when toast dismisses (auto or manual) */
  onDismiss?: (id: string) => void;
  /** Paused (hovered) */
  paused?: boolean;
  className?: string;
}

interface ToastAction {
  label: string;
  onClick: () => void;
}

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

// Hook for imperative toast creation
interface ToastAPI {
  toast: (props: Omit<ToastProps, 'id'>) => string;
  success: (message: string, opts?: Partial<ToastProps>) => string;
  error: (message: string, opts?: Partial<ToastProps>) => string;
  warning: (message: string, opts?: Partial<ToastProps>) => string;
  info: (message: string, opts?: Partial<ToastProps>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  update: (id: string, props: Partial<ToastProps>) => void;
}
```

## Variants
| Variant | Icon | Role |
|---|---|---|
| success | Checkmark circle | Operation completed successfully |
| error | X circle | Operation failed |
| warning | Triangle exclamation | Non-critical issue / caution |
| info | Info circle | General information / update |

## States
| State | Visual |
|---|---|
| Default | Toast visible with icon, message, optional action |
| Entering | Slide-in + fade animation from edge |
| Exiting | Slide-out + fade animation toward edge |
| Hovered | Timer paused, subtle background darken, "X" to dismiss remains visible |
| Action Clicked | Action triggers callback, toast may dismiss or remain (action determines) |
| Dismissed | Removed from DOM after exit animation completes |
| Stack overflow | Oldest toast auto-dismissed when maxVisible exceeded |

## Accessibility
- `role="status"` or `role="alert"` depending on variant:
  - `role="status"` for info/success (non-critical)
  - `role="alert"` for error/warning (time-sensitive)
- `aria-live="polite"` on the toast container
- `aria-label` on dismiss button: "Dismiss notification"
- `aria-label` on action button matching its text
- Focus management: if an action button is present, focus moves to it; otherwise focus stays on triggering element
- Pause on hover: important for users who need extra time to read or interact
- Toast container is rendered via portal at the end of `<body>` for correct DOM order
- Keyboard: `Tab` into toast action, `Escape` dismisses focused toast

## Responsive Rules
| Breakpoint | Behavior |
|---|---|
| ≥ 768px | Fixed positioning, 360px max-width per toast, stacked with gap |
| < 768px | Full-width toast (100% - 16px margin), aligned to top-center or bottom-center, reduced padding (12px vs 16px), larger touch targets (≥ 44px) for dismiss/action |
| All | Safe-area-inset respected on notched devices |

## Animation Rules
- Enter: translateY(–20px → 0) + opacity(0 → 1), 250ms ease-out
- Exit: translateY(0 → –20px) + opacity(1 → 0), 200ms ease-in
- Stack shift: translateY transition 200ms ease (when a toast above is removed, lower toasts slide up)
- Timer indicator: optional linear progress bar at the bottom of the toast, 300ms CSS linear, or non-animated
- Hover pause: no visual animation, timer simply stops
- Multiple enters: staggered by 50ms per toast

## Future Expansion
- Toast with rich content (link, inline code, small image)
- Persistent toast (no auto-dismiss, requires manual close)
- Undo action on toast (common pattern — "Item deleted" with "Undo")
- Swipe-to-dismiss on mobile
- Progress toast (upload progress in a toast instead of inline)
- Grouped toasts (collapse multiples of same type)
- Toast history panel ("Recent notifications")

## Dependencies
- `Icon` (variant icons, close icon)
- `Button` (dismiss, action)
- React Portal (`createPortal`)

## Related Components
- `Alert` — persistent sibling for non-transient messages
- `Dialog` — used when blocking confirmation is needed instead of transient feedback
- `ProgressBar` — optional embedded progress in upload toasts

## Anti-patterns
- ❌ Using Toast for critical errors that require user action — use Alert or Dialog instead
- ❌ Showing multiple toasts for the same event (deduplicate by message)
- ❌ Allowing toasts to stack indefinitely — enforce maxVisible
- ❌ Placing toasts inside scrollable containers — always portal to body
- ❌ Setting duration < 3 s — users may not have time to read
- ❌ Not pausing auto-dismiss on hover — WCAG Success Criterion 2.2.1 violation

## Performance Notes
- Toast container is a single portal — avoids z-index / stacking context issues
- Toast stack uses absolute positioning within a fixed container — no layout reflow when toasts enter/exit
- Animations use CSS `transform` + `opacity` only (GPU-composited)
- Toast state managed via a lightweight external store (zustand or similar) — not React context (avoids mass re-renders)
- Each toast is a discrete component — removal unmounts it, no array shift overhead
- Timer uses `setTimeout` + `useRef` — no unnecessary re-renders while counting down
