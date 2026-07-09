# Skeleton

## Purpose
A content-loading placeholder that matches the dimensions and layout of the final content. Communicates to the user that content is being fetched while reducing perceived latency. Uses a shimmer animation (left-to-right wave) to indicate active loading.

## Responsibilities
- Display placeholder shapes (lines, circles, rectangles) matching final content layout
- Support multiple predefined shapes: text line, card, avatar, table-row, chart
- Use a shimmer animation (translating gradient highlight) for active loading indication
- Match the dimensions of the content being loaded (via props or layout identifiers)
- Fade out smoothly when loading completes
- Support nested skeleton compositions for complex layouts
- Respect `prefers-reduced-motion`

## Composition
```
Skeleton
└── SkeletonShape (×n, depending on variant)
    ├── SkeletonLine (rectangular bar, variable width %)
    ├── SkeletonAvatar (circle or rounded square)
    ├── SkeletonCard (rectangle with rounded corners)
    ├── SkeletonTableRow (row of line segments)
    └── SkeletonChart (bar chart / line chart silhouette)
```

## Hierarchy
```
Pages → Any Loading Region → Skeleton
```

## Props Contract

```typescript
interface SkeletonProps {
  /** Shape variant */
  variant?: 'text' | 'card' | 'avatar' | 'table-row' | 'chart' | 'custom';
  /** Width */
  width?: string | number;
  /** Height */
  height?: string | number;
  /** Border radius override */
  borderRadius?: string | number;
  /** Number of skeleton items to render (for 'text': number of lines) */
  count?: number;
  /** For 'text' variant — width of each line as percentage array */
  lineWidths?: (string | number)[];
  /** For 'avatar' variant — shape */
  avatarShape?: 'circle' | 'square';
  /** Animation type */
  animation?: 'shimmer' | 'pulse' | 'none';
  /** Shimmer colour (light/dark theme aware) */
  baseColor?: string;
  /** Highlight colour for shimmer */
  highlightColor?: string;
  /** Whether the skeleton is visible (useful for fade-out) */
  visible?: boolean;
  /** Fade duration on hide in ms */
  fadeDuration?: number;
  /** For 'table-row' — number of columns */
  columns?: number;
  /** For 'chart' — bar count */
  barCount?: number;
  /** Custom children for 'custom' variant */
  children?: React.ReactNode;
  className?: string;
}
```

## Variants
| Variant | Visual | Typical Use |
|---|---|---|
| text | Horizontal bars of varying widths (default 3 lines) | Paragraph, description, list item |
| card | Rectangle with rounded corners, inner layout of image + text lines | Content card, document preview card |
| avatar | Circle or rounded square | User avatar, file type icon placeholder |
| table-row | Row of rectangular cells | Table loading state |
| chart | Vertical bars (bar chart silhouette) or line with peaks | Analytics chart loading |
| custom | User-provided skeleton children | Complex custom layouts |

## States
| State | Visual |
|---|---|
| Loading (visible) | Skeleton shapes shown with shimmer animation |
| Loading (hidden) | Skeleton hidden (opacity 0, pointer-events: none) — waiting to show content |
| Transitioning | Skeleton fading out as content fades in (opacity cross-fade) |
| Complete | Skeleton removed from DOM |

## Accessibility
- `aria-hidden="true"` on all skeleton elements — screen readers should not announce placeholders
- `role="presentation"` on the skeleton container
- Parent container should use `aria-busy="true"` while loading
- Once content is ready, set `aria-busy="false"` and remove skeleton
- Use `aria-live="polite"` on the content region to announce when content loads
- `prefers-reduced-motion`: disable shimmer animation — show static grey shapes
- Ensure sufficient colour contrast between skeleton base colour and page background (minimum 3:1 for visual perception)

## Responsive Rules
| Breakpoint | Behavior |
|---|---|
| All | Skeleton dimensions respond to parent container width (percentage-based) |
| All | On mobile, text skeleton may use fewer lines (count: 2 vs 3) |
| All | Chart skeleton bars should reflow based on available width |

## Animation Rules
- Shimmer: linear-gradient highlight sweeping left-to-right over 1.5s, infinite, `ease-in-out`
  - `@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }`
  - Achieved via `background-size: 200% 100%` + `background-position` animation
- Pulse (alternative): opacity oscillates 0.4 → 0.8 → 0.4 over 1.5s, infinite
- Fade-out: opacity 1 → 0 over `fadeDuration` ms (default 300ms), then `display: none`
- Content fade-in: opacity 0 → 1 over 200ms (separate from skeleton)
- `prefers-reduced-motion`: no shimmer/pulse — only static grey shapes; fade-out still applies
- Stagger: when `count > 1`, each skeleton line appears with a 50ms delay (total animation starts staggered)

## Future Expansion
- Themed skeleton (auto-dark/light detection for base/highlight colours)
- Skeleton composition helper (combine multiple skeletons into a page template)
- Animated skeleton transitions reusing FLIP technique (skeleton → content morphing)
- Data-aware skeleton (match skeleton height to approximate content height from data shape)
- Skeleton for images with aspect-ratio preservation

## Dependencies
- None (pure CSS + divs)

## Related Components
- `LoadingState` — full-page spinner vs. content-matched skeleton
- `ProgressBar` — determinate progress for known-duration tasks vs. indeterminate skeleton
- `EmptyState` — shown after skeleton when no data is returned
- `ErrorState` — shown after skeleton when data fetch fails

## Anti-patterns
- ❌ Using skeleton without `aria-hidden="true"` — causes screen reader noise
- ❌ Making skeleton wildly different from final content dimensions — causes layout jump
- ❌ Keeping skeleton visible after content has loaded — remove or fade out within 300ms
- ❌ Using skeleton for very fast loads (< 300ms) — show nothing or show content immediately
- ❌ Using shimmer animation without `prefers-reduced-motion` support
- ❌ Placing skeleton inside a container with `overflow: hidden` that clips the shimmer effect
- ❌ Using text skeleton with 100% width lines — real text rarely fills full width; use varying widths (60%, 80%, 45% for typical 3-line pattern)

## Performance Notes
- Pure CSS — no JavaScript animation overhead
- Shimmer uses `background-position` animation — GPU-composited, no layout/paint thrashing
- Skeleton elements are cheap — single divs with border-radius
- For lists with many skeleton items, batch remove and replace in a single render pass
- Use `will-change: background-position` for shimmer to hint GPU acceleration
- Fade-out uses `opacity` + `pointer-events` — no expensive layout recalculations
- No context subscriptions — purely props-driven
