# LoadingState

## Purpose
A full or partial page-level loading indicator that communicates to the user that an operation is in progress. Consists of a spinner (or animated icon) paired with an optional contextual message. Uses `aria-live="polite"` to announce loading state to assistive technology.

## Responsibilities
- Display a spinner animation (rotating circle or brand-specific loading graphic)
- Show an optional contextual message (e.g., "Loading report...", "Saving changes...")
- Support four placement variants: inline, section, full-page, overlay
- Announce loading state to screen readers via `aria-live="polite"`
- Prevent interaction with underlying content when used as an overlay
- Fade in/out smoothly when loading starts/ends
- Auto-hide children or dim them for overlay variant

## Composition
```
LoadingState
├── LoadingSpinner (rotating circle / brand animation)
├── LoadingMessage (optional text)
└── Backdrop (conditional, overlay variant only)
```

## Hierarchy
```
Pages → Any Loading Region → LoadingState
```

## Props Contract

```typescript
interface LoadingStateProps {
  /** Whether loading is active */
  loading: boolean;
  /** Placement variant */
  variant?: 'inline' | 'section' | 'full-page' | 'overlay';
  /** Loading message */
  message?: string;
  /** More detailed description shown below the message */
  description?: string;
  /** Spinner size */
  spinnerSize?: 'sm' | 'md' | 'lg';
  /** Custom spinner element (replaces default) */
  spinner?: React.ReactNode;
  /** Children — only used for 'overlay' variant (content to overlay) */
  children?: React.ReactNode;
  /** Opacity of the overlay backdrop (default: 0.6) */
  overlayOpacity?: number;
  /** Minimum display duration in ms to prevent flash (default: 300) */
  minDisplayDuration?: number;
  /** Delay before showing to avoid flash for fast loads (default: 150) */
  delay?: number;
  /** Whether to dim children in overlay mode */
  dimContent?: boolean;
  className?: string;
}
```

## Variants
| Variant | Display | Use Case |
|---|---|---|
| inline | Small spinner inline with text, same flow | Button loading state, small component refresh |
| section | Centered spinner + message within a page region | List loading, tab content loading |
| full-page | Centered spinner + message filling viewport | Initial page load, route transition |
| overlay | Spinner overlaid on dimmed content | Data refresh while keeping content visible |

## States
| State | Visual |
|---|---|
| Idle (loading=false) | Hidden — not rendered or visibility hidden |
| Delayed (waiting) | Too early to show — waiting for `delay` ms before appearing |
| Loading | Spinner animating, message visible (if provided) |
| Minimum display | Loading finished but still showing for `minDisplayDuration` to prevent flash |
| Exiting | Fade-out animation in progress |

## Accessibility
- `aria-live="polite"` on the loading container — announces message when loading starts
- `role="status"` on the container — indicates it is a live region for status updates
- Spinner element: `aria-hidden="true"` (decorative, message text conveys meaning)
- When overlay variant is used:
  - `aria-busy="true"` on the content region
  - Inert or `aria-hidden="true"` on the dimmed content below the overlay
  - Focus trap within the loading overlay is not needed (loading state is temporary)
- Focus management: do **not** steal focus when loading state appears; user may be mid-task
- Loading completion: `aria-live="polite"` region should announce "Loading complete" or remove the live region
- `prefers-reduced-motion`: spinner should pause (static icon) or use a non-rotating indicator

## Responsive Rules
| Breakpoint | Behavior |
|---|---|
| ≥ 768px | Full-page: 64px spinner + message; overlay: spinner centered |
| < 768px | Full-page: 48px spinner; message below; overlay spinner positioned at vertical center with 32px margin; section variant uses sm spinner |
| All | Inline variant adapts to font-size of parent |

## Animation Rules
- Spinner rotation: CSS `@keyframes`, 0.8s per rotation, `linear`, infinite
- Fade-in: opacity 0 → 1, 150ms ease-out (after delay completes)
- Fade-out: opacity 1 → 0, 150ms ease-in
- Overlay backdrop: opacity 0 → overlayOpacity, 200ms ease-out
- Minimum display duration: ensures loading indicator is visible for at least `minDisplayDuration` ms to avoid flash
- `prefers-reduced-motion`: spinner becomes static; fade-in/out still apply (reduced motion ≠ no motion)
- Content dimming: pointer-events disabled, opacity reduced, 200ms transition

## Future Expansion
- Progress bar variant within LoadingState (for known-duration operations)
- Loading state with estimated time remaining ("About 30 seconds left")
- Cancellable loading (with "Cancel" button)
- Step loading (multi-step with current step indicator)
- Branded animation (custom animated logo instead of generic spinner)
- Loading state queue (when multiple simultaneous operations)
- Deterministic progress display for full-page loading

## Dependencies
- `Spinner` (internal or from Icon library)
- `Text` (message styling)

## Related Components
- `Skeleton` — content-shaped placeholder vs. generic spinner
- `ProgressBar` — determinate progress vs. indeterminate spinner
- `EmptyState` — shown after loading completes with no data
- `ErrorState` — shown after loading fails
- `Dialog` — loading state can be used inside dialogs for async operations

## Anti-patterns
- ❌ Showing loading state for fast operations (< 300ms) — use `delay` prop to suppress
- ❌ Flash of loading — always use `delay` + `minDisplayDuration` for smooth transitions
- ❌ Placing `aria-live="polite"` on the same element that gets removed when loading ends — mount/unmount breaks live region
- ❌ Using full-page variant for small, non-blocking operations — use inline or section
- ❌ Forgetting to hide loading state on error — always pair with ErrorState
- ❌ Blocking interaction with overlay variant but not providing a way for users to know why the page is unresponsive
- ❌ Spinning animation that causes nausea — use `prefers-reduced-motion` and avoid fast (< 0.5s) rotation

## Performance Notes
- Spinner uses CSS `animation` — GPU composited, no JS overhead
- No re-renders during loading (spinner is pure CSS)
- Delay and minDisplayDuration use `setTimeout` — ensure cleanup on unmount
- overlay variant uses `pointer-events: none` on content (not actual DOM removal) to avoid re-layout
- Loading state should not trigger React's concurrent mode suspension — it's a visual overlay, not a Suspense fallback
- For route transitions, consider using a top-level Suspense boundary instead of manual LoadingState
