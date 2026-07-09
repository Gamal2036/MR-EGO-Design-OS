# ProgressBar

## Purpose
A visual indicator of task completion progress. Supports determinate mode (percentage known) with smooth fill animation and indeterminate mode (animated marquee effect) for unknown duration tasks. Available in three sizes for different contexts.

## Responsibilities
- Display progress as a filled horizontal bar
- Support determinate mode: bar width corresponds to `value` prop (0–100)
- Support indeterminate mode: animated bar sweep for unknown duration
- Provide three size variants: sm (4px), md (6px), lg (8px)
- Show an optional label above or below the bar with percentage text
- Support colour theming (variant colours: primary, success, error, warning)
- Animate width changes smoothly
- Announce value changes to screen readers

## Composition
```
ProgressBar
├── Label (optional, above or below)
├── Track (background)
│   └── Fill (animated width)
└── PercentageText (optional, e.g., "45%")
```

## Hierarchy
```
Pages → Any / FileCard / UploadZone → ProgressBar
```

## Props Contract

```typescript
interface ProgressBarProps {
  /** Progress value 0–100 (determinate) or undefined/null (indeterminate) */
  value?: number | null;
  /** Bar size */
  size?: 'sm' | 'md' | 'lg';
  /** Colour variant */
  variant?: 'primary' | 'success' | 'error' | 'warning' | 'info';
  /** Label text shown above or below the bar */
  label?: string;
  /** Label position */
  labelPosition?: 'above' | 'below';
  /** Show percentage text next to label */
  showPercentage?: boolean;
  /** Format function for percentage display */
  formatPercent?: (value: number) => string;
  /** Rounded corners */
  rounded?: boolean;
  /** Custom colour override */
  color?: string;
  /** Minimum value change to trigger animation (avoids flutter) */
  minDelta?: number;
  /** Animate width changes (default: true) */
  animated?: boolean;
  /** Buffer/waiting state — shows secondary fill before determinate starts */
  buffer?: boolean;
  className?: string;
}

interface ProgressBarStyleProps {
  /** Bar height in px derived from size */
  height: number;
  /** Fill transition duration in ms */
  transitionDuration: number;
}
```

## Variants
| Variant | Description |
|---|---|
| sm | 4px height — compact, used in tables, file cards, embedded |
| md | 6px height — standard standalone progress indicator |
| lg | 8px height — prominent, used in full-page loading sections |
| Determinate | `value` set to 0–100 — bar fills proportionally |
| Indeterminate | `value` is null/undefined — animated sweeping gradient |
| Buffer | Shows a secondary track (e.g., video buffering) ahead of primary fill |

## States
| State | Visual |
|---|---|
| Idle (0%) | Empty track (light grey), no fill |
| In progress | Fill animates from 0 toward target value |
| Complete (100%) | Full fill with variant colour, subtle completion flash |
| Indeterminate | Animated gradient/barber-pole sweep — no fixed value |
| Error | Fill changes to error colour (if error variant set) |
| Buffer | Secondary lighter fill visible ahead of primary fill |
| Hidden | Zero height / invisible — used when progress is not applicable |

## Accessibility
- `role="progressbar"` on the bar element
- `aria-valuenow` set to `value` (determinate) or omitted (indeterminate)
- `aria-valuemin="0"` and `aria-valuemax="100"`
- `aria-label` or `aria-labelledby` to describe what the progress is for
- `aria-valuetext` for custom announcements (e.g., "45% — Uploading report.pdf")
- Indeterminate: `aria-busy="true"` on the parent region
- Live region: use `aria-live="polite"` on the label/percentage text for value updates
- `prefers-reduced-motion`: disable fill animation and indeterminate sweep

## Responsive Rules
| Breakpoint | Behavior |
|---|---|
| All | Full width of parent container (default), or fixed width via className |
| < 480px | Label moves above bar (if not already), percentage always visible; size defaults to md for readability |
| All | Indeterminate sweep speed is constant across screen sizes |

## Animation Rules
- Determinate fill: CSS `width` transition, `transition: width 300ms ease-out`
- Indeterminate sweep: CSS `@keyframes` — translateX(-100% → 100%) over 1.5s, repeated infinite, `ease-in-out`
- Completion flash: brief overshoot (width 101% → 100%) over 200ms, or green glow
- Buffer fill: tiled stripes moving left, 1s linear infinite
- Colour change: background-color transition 200ms
- Size change: height transition 150ms (for sm/md/lg switches)
- `prefers-reduced-motion`: fill snaps to value, no transition; indeterminate shows static mid-bar

## Future Expansion
- Stacked progress (multiple segments showing sub-task completion)
- Progress with milestones (dots along the bar at checkpoints)
- Animated gradient fill (gradient that sweeps along the bar)
- Throttled progress updates (smooth out erratic value changes)
- Circular progress variant (ProgressRing)
- Progress bar group (parallel tasks with independent bars)

## Dependencies
- None (self-contained — uses primitive div elements with CSS)

## Related Components
- `Skeleton` — used for initial content loading vs. task progress
- `FileCard` — embeds ProgressBar for upload progress
- `LoadingState` — full-page loading with spinner vs. inline progress
- `UploadZone` — uses ProgressBar per file during upload

## Anti-patterns
- ❌ Setting `value` to 100 before the task is actually complete — leads to false completion UX
- ❌ Using indeterminate mode when the task duration is known — always prefer determinate
- ❌ Animating every fraction of a percent — throttle updates to every 100–200ms or 1% increments
- ❌ Making the bar too thin (sm) in a full-page loading context (use md or lg)
- ❌ Hiding the bar at 0% — 0% is a valid starting state; show it
- ❌ Not resetting the bar to 0% between consecutive tasks — causes visual confusion

## Performance Notes
- Extremely lightweight — single div with CSS transitions
- Fill width changes via inline style — minimal DOM impact
- Indeterminate uses CSS `@keyframes` — GPU-composited, no JavaScript overhead
- Throttle `value` updates: minimum 16ms interval (single frame) between changes
- For high-frequency progress (e.g., file upload), batch updates to 30fps
- No state management needed — value is props-driven
- Buffer animation uses `background-image` with pseudo-elements — no extra DOM nodes
