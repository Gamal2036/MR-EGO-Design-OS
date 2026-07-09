# MetricCard

## Purpose
Display a key performance indicator (KPI) with trend direction and a period-over-period comparison — the primary "headline number" component on dashboards.

## Responsibilities
- Render a KPI value in `heading-2` type scale
- Render a trend percentage with semantic colour (green for positive, red for negative)
- Render a comparison period label (e.g. "vs last week")
- React to KPI direction with colour-coded feedback
- Maintain minimum height 100 px

## Composition
```
MetricCard
├── Card (shell)
├── CardHeader
│   ├── Label                ← metric name, text-secondary
│   └── [InfoTooltip]        ← optional "?" icon explaining metric
├── Value                    ← heading-2 token, large number
├── TrendRow
│   ├── TrendIcon            ← up/down arrow, 16×16
│   ├── TrendPercentage      ← e.g. "+12.3%", colour token semantic
│   └── ComparisonLabel      ← e.g. "vs last week", text-tertiary
└── [Footer]                 ← optional "View details" link
```

## Hierarchy
- **Container:** Card
- **Parent:** Dashboard grid or SummaryCard
- **Children:** Text nodes only (no interactive sub-components except optional InfoTooltip)

## Props Contract (TypeScript)

```typescript
interface MetricCardProps {
  /** KPI name */
  label: string;
  /** Formatted KPI value */
  value: string;
  /** Trend direction and percentage */
  trend: {
    direction: 'up' | 'down' | 'neutral';
    percentage: number;            // e.g. 12.3
    /** Comparison window label, e.g. "vs last week", "vs last month" */
    comparisonLabel: string;
  };
  /** Format of the value (currency, percentage, number) */
  format?: 'number' | 'currency' | 'percentage' | 'decimal';
  /** Semantic base colour */
  color?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Optional tooltip describing how the metric is calculated */
  tooltip?: string;
  /** Applies de-emphasised styling for secondary KPIs */
  subtle?: boolean;
  onClick?: () => void;
}
```

## Variants

| Variant    | Modifiers                                                    |
|------------|--------------------------------------------------------------|
| Default    | Full trend row, neutral colour                               |
| Positive   | Trend colour success, upward arrow                           |
| Negative   | Trend colour danger, downward arrow                          |
| Neutral    | Trend colour tertiary, horizontal dash glyph                 |
| Subtle     | Reduced opacity / smaller font, used in SummaryCard          |

## States

| State      | Visual                                                      |
|------------|-------------------------------------------------------------|
| Idle       | Default appearance                                          |
| Hover      | Card elevation increases, background shift                  |
| Focus      | 2 px ring, `--color-focus`                                  |
| Active     | Scale 0.98, 100 ms                                          |
| Loading    | Skeleton block for value, trend, and label                  |
| Error      | Value shows "—", trend row hidden, inline error icon        |
| Empty      | Value shows "—", trend row shows "No data", reduces vertical space |

## Accessibility
- Value uses `role="text"` with `aria-labelledby` linking to label
- Trend percentage preceded by screen-reader-only text: "Trend:" or "Change:"
- Up/down arrow has `aria-hidden="true"` because the percentage text already conveys direction
- Colour is never the sole indicator — arrow glyph and +/- sign on percentage always present
- InfoTooltip renders as `<button aria-label="About this metric">` with tooltip role
- Comparison label wrapped in `<time>` element if it describes a date range
- Loading skeleton uses `aria-label="Loading metric"`

## Responsive Rules

| Breakpoint | Behaviour                                                    |
|------------|--------------------------------------------------------------|
| ≥ 1024 px  | Full layout, trend row inline                                |
| 640–1023   | Trend percentage moves below comparison label, smaller value |
| < 640 px   | Stacked layout, value at 1.75 rem, trend row wraps           |
| Inside SummaryCard | Subtle variant, value uses heading-3 instead of heading-2 |

## Animation Rules
- **Mount:** Fade in + translateY(8 px), 200 ms, stagger 100 ms per sibling
- **Value change:** Flip animation or cross-fade, 300 ms ease-out
- **Trend change:** Old percentage fades out, new fades in, colour transitions over 250 ms
- **Hover:** Box-shadow transition 150 ms
- **Reduced motion:** Respect `prefers-reduced-motion` — instant transitions only

## Future Expansion
- Inline mini-sparkline below the trend row
- Tap-to-copy KPI value to clipboard
- Configurable decimal precision per metric
- User-defined threshold (coloured banner when outside range)
- Sparkline spark comparison (overlay current vs previous period)

## Dependencies
- `Card` shell
- `@mr-ego/theme` (heading-2 token, colour tokens)
- `@mr-ego/icons` (trend arrows)
- `@mr-ego/utils/format` (number/currency/percentage formatters)

## Related Components
- **StatCard** — simpler single-metric display without comparison
- **ProgressCard** — goal-oriented percentage bar
- **SummaryCard** — aggregates multiple MetricCard values

## Anti-patterns
- ❌ Do not show more than three decimal places in trend percentage
- ❌ Do not use MetricCard for non-numeric KPIs (use StatCard instead)
- ❌ Do not nest MetricCard inside another interactive card
- ❌ Do not show both sparkline and comparison trend simultaneously (information overload)

## Performance Notes
- Formatted value should be pre-computed or memoised; avoid re-formatting on render
- Trend percentage rounding performed server-side or in a pure utility
- Skeletons use CSS-only shimmer (`background-image` gradient animation)
- Avoid re-rendering all MetricCards on periodic refresh — use stable keys and compare by `label`
