# ResizeObserver

## Purpose
Tracks element size changes using the ResizeObserver API and provides container dimensions for responsive component behavior.

## Responsibilities
- Observe element size changes
- Provide debounced dimension updates
- Return `width` and `height` of the observed element
- Clean up observer on unmount

## Composition
```
ResizeObserver
└── (children — the element to observe, single child)
```

## Hierarchy
- ResizeObserver wraps the element whose dimensions need tracking.
- It is used by AnalyticsContainer, chart components, and any component that needs container-relative sizing.

## Props Contract (TypeScript)
```typescript
interface ResizeObserverProps {
  children: React.ReactNode;
  onResize?: (dimensions: { width: number; height: number }) => void;
  debounceMs?: number;                   // debounce delay in ms, default 150
  throttleMs?: number;                   // throttle instead of debounce, overrides debounceMs
  enabled?: boolean;                     // enable/disable observer, default true
  box?: 'content-box' | 'border-box';    // default 'border-box'
  as?: keyof JSX.IntrinsicElements;      // wrapper element, default 'div'
  className?: string;
}

// Return type when used as a hook
interface ResizeObserverEntry {
  width: number;
  height: number;
  entry: ResizeObserverEntry;
}
```

Usage as a hook:
```typescript
function useResizeObserver<T extends HTMLElement>(
  ref: React.RefObject<T>,
  options?: { debounceMs?: number; box?: 'content-box' | 'border-box' }
): ResizeObserverEntry | null;
```

## Variants
| Variant | Description |
|---------|-------------|
| Component | Wraps children and calls `onResize` callback with dimensions. |
| Hook | `useResizeObserver` ref-based hook for custom use cases. |

## States
| State | Description |
|-------|-------------|
| Observing | Actively listening for resize events. |
| Idle | Observer not attached (`enabled={false}`). |
| First measure | Initial size captured on mount. |

## Accessibility
- ResizeObserver does not affect accessibility.
- Content must remain accessible regardless of container size.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| All | ResizeObserver reports container dimensions regardless of viewport size. |
| N/A | This utility enables responsive behavior in other components. |

## Animation Rules
- ResizeObserver does not provide animations.

## Future Expansion
- IntersectionObserver integration (lazy rendering based on visibility + size).
- Aspect-ratio-aware resize notifications.
- Element query breakpoints (e.g., `@container` style queries) via callback.
- Breakpoint change events (e.g., "container is now 'sm'").

## Dependencies
- `ResizeObserver` (native browser API) — polyfill for older browsers.

## Related Components
- **AnalyticsContainer** — uses ResizeObserver for responsive chart sizing.
- **Chart components** — use ResizeObserver hook for container-relative dimensions.
- **All responsive components** — potential use for container queries.

## Anti-patterns
- ❌ Do not use ResizeObserver for viewport-level media queries — use CSS media queries instead.
- ❌ Do not set `debounceMs` below 50 — it causes excessive re-renders on rapid resize.
- ❌ Do not use ResizeObserver as a substitute for CSS `max-width`/`min-width`.
- ❌ Do not attach ResizeObserver to elements that don't change size.
- ❌ Do not use ResizeObserver in server-side rendering without checking for the API.

## Performance Notes
- Debounce/throttle prevents excessive re-renders during resize — default 150ms debounce.
- ResizeObserver batches multiple resize events in a single callback.
- Use `React.memo` on children to prevent unnecessary re-renders triggered by dimension changes.
- Prefer CSS container queries (`@container`) over ResizeObserver for styling changes.
- Avoid using ResizeObserver on elements with frequently changing dimensions (animations).
