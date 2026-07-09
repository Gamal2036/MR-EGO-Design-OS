# BarChart

## Purpose
Compares discrete categories or groups using rectangular bars, where bar length encodes the measured value.

## Responsibilities
- Render vertical or horizontal bars for categorical data
- Support stacked and grouped bar layouts
- Apply bar colors from the semantic palette
- Render labeled axes with tick marks

## Contracts (external chart library)

This component contracts with an underlying chart library. The spec defines the expected interface, not the implementation.

## Composition
```
AnalyticsContainer
└── BarChart
    ├── ChartSurface
    ├── GridLines (y for vertical, x for horizontal)
    ├── Axes (category + value labels)
    ├── Bars (×N categories, optionally grouped/stacked)
    └── Tooltip
```

## Props Contract (TypeScript)
```typescript
interface BarChartDatum {
  category: string;
  value: number;
  stack?: string;                        // stack group identifier
}

interface BarChartSeries {
  id: string;
  label: string;
  data: BarChartDatum[];
  color?: string;                        // from semantic palette
}

interface BarChartProps {
  series: BarChartSeries[];
  variant?: 'vertical' | 'horizontal' | 'stacked' | 'grouped';
  xAxisLabel?: string;
  yAxisLabel?: string;
  gridLines?: 'none' | 'x' | 'y' | 'both';
  tooltip?: boolean;                     // default true
  showLegend?: boolean;                  // default true
  barThickness?: number;                 // px, default auto-calculated
  barGap?: number;                       // px between bars in same group, default 2
  groupGap?: number;                     // px between groups, default 16
  maxBars?: number;                      // max categories shown, default 30
  horizontal?: boolean;                  // for horizontal variant
  borderRadius?: number;                 // bar corner radius, default 2
  margin?: { top: number; right: number; bottom: number; left: number };
  height?: number;                       // default 350
  responsive?: boolean;
  onClick?: (seriesId: string, datum: BarChartDatum) => void;
  className?: string;
}
```

## Variants
| Variant | Orientation | Grouping | Use Case |
|---------|------------|----------|----------|
| vertical | Vertical | Single | Simple category comparison |
| horizontal | Horizontal | Single | Long category labels, many categories |
| stacked | Vertical | Cumulative part-to-whole | Revenue breakdown by region |
| grouped | Vertical | Side-by-side | Direct category comparison across groups |

## States
| State | Description |
|-------|-------------|
| Loading | Skeleton placeholder. |
| Empty | Empty state message ("No data for selected period"). |
| Error | Error state with retry. |
| Data | Chart rendered. |
| Highlighted | Bar highlighted on hover. |

## Accessibility
- `role="img"` with `aria-label` describing the chart content.
- Each bar region should have a `<title>` element for tooltip content.
- Keyboard navigation: Tab through bars; Enter/Space to select.
- Data table fallback for screen readers (alongside or togglable).

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| All | Width fills container. |
| <768px | Horizontal bars preferred (auto-switch for >8 categories). Axis font reduced. |
| <480px | Legend below chart. Max categories limited to 10. Tooltip simplified. |

## Animation Rules
- Bar grow animation: 500ms ease-out on mount (from baseline).
- Stacked bar segments: sequential animation 100ms apart.
- Tooltip: 150ms fade-in.
- Re-sort transition: 300ms ease.

## Future Expansion
- Waterfall chart variant.
- Bar with trend line overlay.
- Animated race chart.
- Range bars (min–max).
- Stacked-to-grouped toggle.

## Dependencies
- Chart library (D3 / Recharts / Visx).
- `AnalyticsContainer`.

## Related Components
- **LineChart** — for continuous trends over time.
- **PieChart** — alternative for part-to-whole (use bars for >5 categories).
- **AnalyticsContainer** — controls and chart layout.

## Anti-patterns
- ❌ Do not render more than 30 categories in a single bar chart — use horizontal or truncate.
- ❌ Do not use 3D bar effects — they distort visual perception.
- ❌ Do not stack bars if segments have negative values — use grouped instead.
- ❌ Do not omit zero baseline for bar charts — it misrepresents proportions.
- ❌ Do not use excessive `borderRadius` on bars — it can make bar tops appear shorter.

## Performance Notes
- Limit animated bars to 50 elements — above that, disable mount animation.
- Grouped bar charts require more SVG elements; prefer canvas for >500 bars.
- Use `React.memo` on individual bar elements when updating data.
- Downsample or paginate categories exceeding 30.
