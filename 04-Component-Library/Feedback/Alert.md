# Alert

## Purpose
A persistent, non-dismissing notification that communicates important information requiring user attention. Unlike Toast, Alert remains visible until the user explicitly dismisses it or the condition resolves. Uses `role="alert"` for immediate screen reader announcement.

## Responsibilities
- Display contextual message with variant icon (success, error, warning, info)
- Persist until manually dismissed or condition resolves (no auto-dismiss)
- Provide optional dismiss (close) button
- Provide optional action button (e.g., "View details", "Fix issue")
- Broadcast immediately to screen readers via `role="alert"`
- Support inline variant (within page flow) and banner variant (fixed top)

## Composition
```
Alert
├── Icon (variant-specific)
├── Content
│   ├── Title (optional)
│   └── Message / Description
├── ActionButton (optional)
└── DismissButton (optional)
```

## Hierarchy
```
Pages → Layout / Form / Section → Alert
```

## Props Contract

```typescript
interface AlertProps {
  /** Visual variant */
  variant: AlertVariant;
  /** Brief title (bold, optional) */
  title?: string;
  /** Main alert message */
  message: string;
  /** Optional detailed description */
  description?: string;
  /** Show dismiss button */
  dismissible?: boolean;
  /** Callback on dismiss */
  onDismiss?: () => void;
  /** Action button config */
  action?: AlertAction;
  /** Inline (in page flow) or banner (fixed top of viewport) */
  placement?: 'inline' | 'banner';
  /** Compact mode — reduced padding */
  compact?: boolean;
  className?: string;
}

interface AlertAction {
  label: string;
  onClick: () => void;
  /** Link variant */
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

type AlertVariant = 'success' | 'error' | 'warning' | 'info';
```

## Variants
| Variant | Icon | Use Case |
|---|---|---|
| success | Checkmark circle | Positive confirmation (e.g., "Changes saved") |
| error | X circle | Failure or blocking issue (e.g., "Connection lost") |
| warning | Triangle exclamation | Non-blocking caution (e.g., "Storage almost full") |
| info | Info circle | General information (e.g., "New features available") |

## States
| State | Visual |
|---|---|
| Default | Alert displayed with variant colours (background tint, icon, border left accent) |
| Dismissed | Alert removed from DOM after exit animation, `onDismiss` called |
| Banner | Full-width, fixed/sticky at top of viewport or section, no border-left — uses background colour |
| Compact | Reduced padding (8px vs 16px), no title, smaller icon |

## Accessibility
- `role="alert"` — immediately announced by screen readers on mount
- `aria-live="assertive"` on the alert container as a fallback
- Dismiss button: `aria-label="Dismiss alert"`
- Action button: descriptive text (e.g., not just "Learn More" — use "Learn more about storage limits")
- Focus management: when alert appears, focus is _not_ automatically moved (would disrupt flow); if action is critical, use Dialog instead
- Colour is not the only indicator — each variant has a distinct icon and text label
- Banner placement must respect `prefers-reduced-motion` for entrance animation

## Responsive Rules
| Breakpoint | Behavior |
|---|---|
| ≥ 768px | Horizontal layout: icon | content | actions |
| < 768px | Vertical stack: icon + title on one line, message below, actions full-width below; compact variant recommended to save vertical space |
| Banner (all) | Full viewport width, 0 padding on sides, may be sticky with `position: sticky; top: 0` |

## Animation Rules
- Enter (inline): slide-down 200ms + fade-in 200ms, from 0 to full height
- Enter (banner): slide-down from above viewport 250ms ease-out
- Exit: slide-up + fade-out 150ms ease-in
- Dismiss: background colour fade to transparent 150ms, then collapse height 200ms
- Banner entrance should respect safe-area tops (notched devices)

## Future Expansion
- Collapsible alert (show/hide details)
- Stacked alerts (multiple alerts in the same space)
- Alert with embedded link
- Countdown / auto-dismiss variant (hybrid with Toast)
- Action confirmation via secondary action ("Ignore" + "Act now")

## Dependencies
- `Icon` (variant icons, close icon)
- `Button` (dismiss, action)

## Related Components
- `Toast` — transient sibling for non-critical feedback
- `Dialog` — used when the alert requires a blocking action
- `ErrorState` — full-page error display vs. inline alert

## Anti-patterns
- ❌ Using Alert for transient, low-importance messages — use Toast instead
- ❌ Stacking multiple alerts without grouping or collapsing — can overwhelm the user
- ❌ Using `role="alert"` on toasts — toasts should use `role="status"` or `role="alert"` depending on criticality, but Alert _always_ uses `role="alert"`
- ❌ Auto-dismissing an alert — it should persist until dismissed or resolved
- ❌ Placing alerts in the same visual hierarchy as form validation — use inline validation messages instead
- ❌ Using banner placement for non-critical messages (banner is high-visibility, reserve for important system status)

## Performance Notes
- Lightweight component — renders once, no re-renders unless content changes
- Dismiss animation uses CSS `height` + `opacity` transition — OK for occasional use; avoid for list of alerts
- Banner alert uses `position: sticky` rather than `position: fixed` to avoid document reflow
- No external state management needed — alert state is owned by the parent page or a simple context
