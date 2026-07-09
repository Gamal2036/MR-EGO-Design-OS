# LineChart

## Purpose
Renders trend lines over a continuous x-axis (typically time) to visualize data series and their trajectories.

## Responsibilities
- Plot x,y data pairs on a cartesian coordinate system
- Support single and multi-series rendering
- Render axis labels, grid lines, and tooltips
- Optionally render data point markers and smoothed curves

## Contracts (external chart library)

This component contracts with an underlying chart library (e.g., D3, Chart.js, Recharts, Visx). The spec defines the expected interface, not the implementation.

## Composition
```
AnalyticsContainer
└── LineChart
    ├── ChartSurface
    ├── GridLines (x + y)
    ├── Axes (x + y labels)
    ├── Line(s) (1 or more series)
    ├── DataPoints (optional)
    └── Tooltip (on hover)
```

## Props Contract (TypeScript)
```typescript
interface LineChartDatum {
  x: number | string | Date;
  y: number;
}

interface LineChartSeries {
  id: string;
  label: string;
  data: LineChartDatum[];
  color?: string;                        // from semantic palette
  dashed?: boolean;                      // default false
  dashedPattern?: number[];              // e.g. [5, 5]
}

interface LineChartProps {
  series: LineChartSeries | LineChartSeries[];
  variant?: 'single-line' | 'multi-line' | 'with-points' | 'smoothed';
  xAxisLabel?: string;
  yAxisLabel?: string;
  gridLines?: 'none' | 'x' | 'y' | 'both'; // default 'both'
  tooltip?: boolean;                      // default true
  showLegend?: boolean;                   // default true
  showPoints?: boolean;                   // default false unless variant = 'with-points'
  smooth?: boolean;                       // default false unless variant = 'smoothed'
  curveType?: 'monotone' | 'linear' | 'step'; // default 'monotone'
  xScale?: 'linear' | 'time' | 'point';   // default 'time'
  yScale?: 'linear' | 'log';              // default 'linear'
  margin?: { top: number; right: number; bottom: number; left: number };
  height?: number;                        // default 300
  responsive?: boolean;                   // default true
  onClick?: (seriesId: string, datum: LineChartDatum) => void;
  className?: string;
}
```

## Variants
| Variant | Points | Curve | Use Case |
|---------|--------|-------|----------|
| single-line | No | Monotone | Single trend |
| multi-line | No | Monotone | Multiple series comparison |
| with-points | Yes | Monotone | Highlight individual values |
| smoothed | No | Smooth cubic | Aesthetic trend visualization |

## States
| State | Description |
|-------|-------------|
| Loading | Skeleton placeholder. |
| Empty | Empty state message ("No data available"). |
| Error | Error state with retry action. |
| Data | Chart rendered with data. |
| Highlighted | Specific series or point highlighted on hover. |

## Accessibility
- Chart must have `role="img"` with `aria-label` describing the chart content.
- Tooltip values must be accessible via keyboard (`focus` on data points).
- Data series must have descriptive labels for screen reader fallback (data table).
- Color is not the only differentiator for lines — use dashed patterns or markers in addition.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| All | Chart width fills container via SVG `viewBox`. |
| <768px | Legend moves below chart. Axis labels font size reduced. Fewer grid lines. |
| <480px | Tooltip simplified (x and y only, no series color indicator). |

## Animation Rules
- Line draw animation: stroke-dashoffset 800ms ease-in-out on mount.
- Tooltip fade-in: 150ms.
- Transition between data updates: 300ms ease (CSS transition on `d` attribute via library).
- No animation on resize.

## Future Expansion
- Confidence interval bands (area fill around line).
- Annotations (vertical/horizontal markers).
- Zoom and pan support.
- Brush selection for range filtering.
- Real-time data streaming updates.

## Dependencies
- Chart library (D3 / Recharts / Visx) — external contract.
- `AnalyticsContainer` — wrapping container with controls.

## Related Components
- **AreaChart** — line chart with filled area under the curve.
- **BarChart** — alternative for categorical data.
- **AnalyticsContainer** — provides controls and layout for the chart.
- **Tooltip** — shared chart tooltip component.
- **Spinner** — loading state indicator.

## Anti-patterns
- ❌ Do not render more than 8 series in a single chart — use faceted charts instead.
- ❌ Do not use smoothed curves for discrete data — use `curveType="step"` or `"linear"`.
- ❌ Do not omit axis labels — charts without context are misleading.
- ❌ Do not use line charts for categorical comparisons — use BarChart.
- ❌ Do not format tooltip values without units.

## Performance Notes
- Series data should be downsampled for datasets exceeding 10,000 points (e.g., LTTB algorithm).
- Use `shouldComponentUpdate` or `React.memo` on chart to prevent re-renders on unrelated state changes.
- SVG rendering with >500 points should use canvas fallback.
- Tooltip position calculation should be debounced.
