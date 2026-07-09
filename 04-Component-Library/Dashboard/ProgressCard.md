# ProgressCard

## Purpose
Visualise progress toward a goal or task completion using a percentage bar, target/current values, and optional time-remaining indicator.

## Responsibilities
- Render a human-readable label describing the goal
- Render a progress bar (percentage fill) with animated width
- Display current and target numeric values
- Show optional time remaining ("2 days left")
- Emit events when progress reaches 100 %
- Maintain minimum height 100 px

## Composition
```
ProgressCard
├── Card (shell)
├── CardHeader
│   ├── Label              ← goal description, text-secondary
│   └── [TimeRemaining]    ← optional "X days/hours left" badge
├── ProgressBar
│   ├── Track              ← 8 px height, rounded, neutral background
│   ├── Fill               ← width = percentage, colour semantic
│   └── [Stripes/Animated] ← optional active animation
├── ValueRow
│   ├── CurrentValue       ← e.g. "750"
│   ├── Separator          ← "of" or "/"
│   └── TargetValue        ← e.g. "1,000"
└── [PercentageLabel]      ← e.g. "75 %" (only shown if space permits)
```

## Hierarchy
- **Container:** Card
- **Parent:** Dashboard grid or SummaryCard
- **Children:** Text and visual bar only (no nested interactive components)

## Props Contract (TypeScript)

```typescript
interface ProgressCardProps {
  /** Goal/task description */
  label: string;
  /** Current numeric progress */
  current: number;
  /** Target numeric value */
  target: number;
  /** Optional human-readable time remaining string */
  timeRemaining?: string;
  /** Semantic colour of the bar fill */
  color?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Format display type */
  format?: 'number' | 'currency' | 'percentage' | 'decimal';
  /** Show percentage label next to the bar */
  showPercentage?: boolean;
  /** Compact mode for embedding in SummaryCard */
  compact?: boolean;
  /** Callback when progress reaches target */
  onComplete?: () => void;
  onClick?: () => void;
}
```

## Variants

| Variant    | Modifiers                                                     |
|------------|---------------------------------------------------------------|
| Default    | Solid fill, current/target values shown                       |
| Indeterminate | For unknown total — animated stripes across full bar      |
| Compact    | Reduced padding, no percentage label, used in SummaryCard     |
| OverGoal   | Bar fill at 100 %, colour success, optional "Goal reached" badge |
| AtRisk     | Fill < 30 % of target, colour danger, subtle pulse animation |

## States

| State      | Visual                                                       |
|------------|--------------------------------------------------------------|
| Idle       | Default appearance, bar static                               |
| Hover      | Card elevation increases, bar slightly brighter              |
| Focus      | 2 px ring using `--color-focus`                              |
| Active     | Scale 0.98, 100 ms                                           |
| Loading    | Skeleton bar + label + value row                             |
| Complete   | Fill reaches 100 %, green colour, checkmark icon appears     |
| Zero       | Bar hidden or 0-width fill, "Not started" label shown        |
| Error      | "Unable to load progress" message, retry link                |

## Accessibility
- Progress bar uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Label linked via `aria-labelledby`
- Current/target values available in `aria-valuetext` (e.g. "750 of 1000 units")
- Bar fill colour accompanied by text percentage
- Animated stripes have `prefers-reduced-motion` check — disabled when user requests reduced motion
- Time remaining rendered as `<time>` element with `datetime` attribute
- `onComplete` announced via `aria-live="polite"` region

## Responsive Rules

| Breakpoint | Behaviour                                                    |
|------------|--------------------------------------------------------------|
| ≥ 1024 px  | Full layout, percentage label inline after bar               |
| 640–1023   | Percentage label moved below value row                       |
| < 640 px   | Compact variant, bar height 6 px, values stacked             |
| Inside SummaryCard | Compact forced, no time remaining, bar height 6 px       |

## Animation Rules
- **Bar fill on mount:** Width transitions from 0 to target % over 600 ms ease-out
- **Bar update:** Old width transitions to new width over 400 ms
- **Complete:** Checkmark scales in with bounce spring at 100 %, 450 ms
- **Stripes (indeterminate):** Slide animation 1.5 s linear infinite
- **AtRisk pulse:** Subtle glow animation on bar 2 s ease-in-out infinite
- **Reduced motion:** Respect `prefers-reduced-motion` — instant bar width, no stripes/glow

## Future Expansion
- Multi-segment stacked progress (milestones within a goal)
- Goal date picker with countdown
- Burndown/burnup chart overlay
- Sub-goal expansion with nested ProgressCards
- ETA recalculation based on velocity

## Dependencies
- `Card` shell
- `@mr-ego/theme` (spacing, colour tokens)
- `@mr-ego/utils/math` (clamp, percentage calculation)
- Optional: `@mr-ego/animations` (spring, stripe keyframes)

## Related Components
- **StatCard** — static number without a target
- **MetricCard** — KPI with trend comparison
- **SummaryCard** — aggregates progress summaries

## Anti-patterns
- ❌ Do not show decimals for percentage label (round to integer)
- ❌ Do not animate bar on every prop update — diff the `current` value
- ❌ Do not place interactive elements inside the bar track
- ❌ Do not use ProgressCard when current > target without an over-goal variant

## Performance Notes
- Bar width set via CSS `inline-style` (percentage from props); no JS layout thrashing
- Skeleton uses CSS-only shimmer
- Completion callback fires once via `useEffect` dependency on `current >= target`
- Avoid unnecessary re-renders by memoising bar colour and percentage calculation
