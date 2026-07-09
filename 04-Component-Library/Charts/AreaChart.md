# AreaChart

## Purpose
Visualizes volume or magnitude over time with filled areas beneath trend lines, emphasizing the scale of change.

## Responsibilities
- Render filled areas below line curves with configurable opacity (0.1–0.3)
- Support stacked and overlapping area series
- Optionally render the line border on top of the fill
- Display axes, grid lines, and tooltips

## Contracts (external chart library)

This component contracts with an underlying chart library. The spec defines the expected interface, not the implementation.

## Composition
```
AnalyticsContainer
└── AreaChart
    ├── ChartSurface
    ├── GridLines
    ├── Axes
    ├── Area(s) (filled region(s))
    ├── Line(s) (optional, border of area)
    └── Tooltip
```

## Props Contract (TypeScript)
```typescript
interface AreaChartDatum {
  x: number | string | Date;
  y: number;
  y0?: number;                           // baseline for stacked charts
}

interface AreaChartSeries {
  id: string;
  label: string;
  data: AreaChartDatum[];
  color?: string;                        // from semantic palette
  fillOpacity?: number;                  // 0.1–0.3, default 0.2
}

interface AreaChartProps {
  series: AreaChartSeries[];
  variant?: 'stacked' | 'overlapping' | 'with-line';
  xAxisLabel?: string;
  yAxisLabel?: string;
  gridLines?: 'none' | 'x' | 'y' | 'both';
  tooltip?: boolean;                     // default true
  showLegend?: boolean;                  // default true
  showLine?: boolean;                    // default true for 'with-line', false otherwise
  curveType?: 'monotone' | 'linear' | 'step';
  xScale?: 'linear' | 'time' | 'point';
  yScale?: 'linear' | 'log';
  stackOffset?: 'none' | 'expand' | 'wiggle'; // default 'none'
  margin?: { top: number; right: number; bottom: number; left: number };
  height?: number;                       // default 300
  responsive?: boolean;
  onClick?: (seriesId: string, datum: AreaChartDatum) => void;
  className?: string;
}
```

## Variants
| Variant | Stacking | Line | Fill Opacity | Use Case |
|---------|----------|------|-------------|----------|
| stacked | Yes | No | 0.2 each | Part-to-whole over time (e.g., revenue by product) |
| overlapping | No | No | 0.15 each | Compare magnitudes of multiple series |
| with-line | Configurable | Yes | 0.1 | Emphasize trend direction with fill as secondary |

## States
| State | Description |
|-------|-------------|
| Loading | Skeleton placeholder. |
| Empty | Empty state message. |
| Error | Error state with retry. |
| Data | Chart rendered. |
| Highlighted | Series highlighted on hover. |

## Accessibility
- `role="img"` with descriptive `aria-label` summarizing the chart content.
- Tooltip keyboard accessible.
- For stacked charts, provide a data table fallback for screen readers.
- Use patterns or labels (not just color) to distinguish overlapping areas.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| All | Width fills container via SVG `viewBox`. |
| <768px | Legend below chart. Axis label font reduced. |
| <480px | Tooltip simplified. |

## Animation Rules
- Area fill animation: 800ms ease-in-out on mount (grow from baseline).
- Line stroke animation (if `showLine`): 800ms ease-in-out.
- Tooltip: 150ms fade-in.
- Legend interaction (show/hide series): 300ms transition.

## Future Expansion
- Streamgraph (wiggle offset).
- Percentage area chart (expand offset).
- Horizon chart (reduced height with mirrored areas).
- Area selection for zoom.

## Dependencies
- Chart library (D3 / Recharts / Visx).
- `AnalyticsContainer`.

## Related Components
- **LineChart** — without fill; use when magnitude is secondary to trend.
- **BarChart** — alternative for discrete time periods.
- **AnalyticsContainer** — provides controls, legend, export.

## Anti-patterns
- ❌ Do not use more than 5 series in overlapping mode — areas occlude each other.
- ❌ Do not use fill opacity > 0.3 — areas become opaque and hide lower series.
- ❌ Do not use area charts for non-sequential data — use BarChart.
- ❌ Do not stack series with negative values without setting `y0` baseline.
- ❌ Do not render stacked charts without a zero baseline — they lose visual integrity.

## Performance Notes
- Stacked areas require cumulative data transformation — memoize series computation.
- Downsample series exceeding 5,000 points.
- SVG for area charts is performant up to 6 series × 1,000 points.
- Use CSS `will-change: transform` on chart container if animated.
