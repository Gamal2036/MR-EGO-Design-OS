# ErrorState

## Purpose
A full or partial error display that informs the user of an issue, explains what went wrong in accessible language, and provides clear recovery actions (retry, go back, contact support). Adapts its messaging per error type: general, network, permission, not-found, server-error.

## Responsibilities
- Display an error icon or illustration appropriate to the error type
- Show a clear, human-readable error title (not technical error codes)
- Provide a description explaining the error's context and optional recovery guidance
- Offer one or more action buttons: Retry (primary), Go Back (secondary), Contact Support
- Support error type variants with appropriate default messaging and icons
- Log error details to console or monitoring service (non-blocking)
- Avoid exposing sensitive information in error messages

## Composition
```
ErrorState
├── ErrorIcon / Illustration (variant-specific)
├── ErrorTitle
├── ErrorDescription
└── ActionButtons
    ├── RetryButton (primary, optional)
    ├── BackButton (secondary, optional)
    └── ContactSupportLink (text link, optional)
```

## Hierarchy
```
Pages → Content Regions / Document Preview / Data Fetch → ErrorState
```

## Props Contract

```typescript
interface ErrorStateProps {
  /** Predefined error variant */
  variant?: 'general' | 'network' | 'permission' | 'not-found' | 'server-error' | 'custom';
  /** Custom icon (overrides variant default) */
  icon?: React.ReactNode;
  /** Error title (overrides variant default) */
  title?: string;
  /** Error description (overrides variant default) */
  description?: string;
  /** Error code or identifier shown in smaller text (not for screen readers by default) */
  errorCode?: string;
  /** Technical error details (for debug, shown in expandable section) */
  debugInfo?: string;
  /** Callback when user clicks Retry */
  onRetry?: () => void;
  /** Label for retry button (default: "Try again") */
  retryLabel?: string;
  /** Callback when user clicks Go Back */
  onBack?: () => void;
  /** Label for back button (default: "Go back") */
  backLabel?: string;
  /** Contact support href */
  supportHref?: string;
  /** Contact support label (default: "Contact support") */
  supportLabel?: string;
  /** Visual layout */
  layout?: 'vertical' | 'horizontal';
  /** Compact mode for embedding */
  compact?: boolean;
  /** Whether to log the error to console */
  logError?: boolean;
  /** Additional CSS class */
  className?: string;
}
```

## Variant Defaults
| Variant | Icon / Illustration | Default Title | Default Description |
|---|---|---|---|
| general | X-circle / warning | "Something went wrong" | "An unexpected error occurred. Please try again." |
| network | Wifi-off / cloud-off | "No internet connection" | "Please check your connection and try again." |
| permission | Lock / shield | "Access denied" | "You don't have permission to view this content." |
| not-found | Magnifying glass / 404 | "Page not found" | "The page you're looking for doesn't exist or has been moved." |
| server-error | Server / gear | "Server error" | "Our servers are having trouble. Please try again later." |

## States
| State | Visual |
|---|---|
| Default | Error icon + title + description + action buttons |
| Retrying | Retry button shows spinner, other actions disabled, brief 300ms min display before retry fires |
| Compact | Reduced padding, smaller icon, single action (retry), no support link |
| With error code | Small monospace error code below description (e.g., "Error: ERR_NETWORK_FAILED") |
| With debug info | Collapsible "Technical details" section at the bottom showing `debugInfo` |

## Accessibility
- `role="alert"` on the error container — immediate announcement
- `aria-live="assertive"` to ensure priority announcement
- Error icon: `aria-hidden="true"` (decorative)
- Title: semantic heading level (h1/h2/h3) appropriate to page hierarchy
- Retry button: `aria-label="Retry: {context}"` (e.g., "Retry loading documents")
- Back button: `aria-label="Go back to previous page"`
- Error code: `aria-label` prefix if displayed (e.g., "Error code: ERR_403")
- Debug info section: `aria-label="Technical error details"`, collapsed by default
- Focus management: when error state replaces content, focus moves to the error state heading (with `tabindex="-1"`)
- Do not expose sensitive data in `aria-label` or `aria-describedby` attributes

## Responsive Rules
| Breakpoint | Behavior |
|---|---|
| ≥ 768px | Centered layout, 400px max-width, larger illustration (120px), side-by-side actions possible |
| < 768px | Full-width, 16px margins, compact spacing, stacked actions (retry full-width, back as text link below), smaller icon (64px) |

## Animation Rules
- Entrance: fade-in + translateY(10px → 0), 300ms ease-out
- Icon: subtle pulsing on warning variants (opacity 0.85 → 1) at 2s interval, or static
- Retry button → spinner transition: 150ms
- Layout transition (if variant changes live): cross-fade 200ms
- Debug info expand/collapse: height transition 200ms ease-out
- `prefers-reduced-motion`: disable pulse, keep entrance fade

## Future Expansion
- Detailed error resolution steps (multi-step recovery guide)
- Error reporting dialog ("Send error report to team")
- Auto-retry with countdown ("Retrying in 5, 4, 3...")
- Error stack trace viewer (developer mode)
- Offline indicator variant that syncs with Network Information API
- Granular error recovery per error code (custom actions per error code mapping)
- Error state in modals / dialogs (inline error state in Dialog body)

## Dependencies
- `Icon` (error-type icons)
- `Button` (retry, back actions)
- `Spinner` (retry loading state)

## Related Components
- `EmptyState` — shown when there is no data (not an error)
- `LoadingState` — shown before error occurs (loading → error transition)
- `Alert` — inline error message (less prominent than full ErrorState)
- `Dialog` — can contain ErrorState for modal error scenarios
- `Toast` — transient error feedback for non-blocking operations

## Anti-patterns
- ❌ Showing raw error codes or stack traces to end users — use `debugInfo` for developers
- ❌ Using ErrorState for form validation errors — use inline validation messages
- ❌ Providing a Retry button when the error will not resolve on retry (e.g., 404) — show Back or Contact Support instead
- ❌ Hiding the error state automatically without user action — persist until the user dismisses or retries
- ❌ Using overly technical language — "404 Not Found" should become "Page not found"
- ❌ Forgetting to log errors for monitoring — `logError` should be true by default in non-production
- ❌ Exposing sensitive information in error descriptions (user IDs, database details, tokens)

## Performance Notes
- Purely props-driven — no state, no subscriptions
- Renders once and remains static until variant changes
- Icon resolution via memoised map — O(1) lookup
- Debug info section uses conditional rendering — content not in DOM until expanded
- No animation performance concerns — simple CSS transitions
- Error logging (`logError`) is fire-and-forget — does not block rendering
- Compact variant avoids rendering support link DOM node to reduce clutter
