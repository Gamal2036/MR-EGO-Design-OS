# HeatMap

## Purpose
Visualizes the density or magnitude of values across two dimensions using a color scale, revealing patterns and outliers in matrix data.

## Responsibilities
- Render a matrix of cells colored by value intensity
- Map values to a color scale from the primary palette
- Display cell tooltips with exact values
- Support calendar (day × week) and matrix (category × category) variants
- Render axis labels for rows and columns

## Contracts (external chart library)

This component contracts with an underlying chart library. The spec defines the expected interface, not the implementation.

## Composition
```
AnalyticsContainer
└── HeatMap
    ├── ChartSurface
    ├── RowLabels (left)
    ├── ColumnLabels (top)
    ├── Cell(s) (colored matrix)
    ├── ColorLegend (gradient bar)
    └── Tooltip (on hover)
```

## Props Contract (TypeScript)
```typescript
interface HeatMapCell {
  row: string;
  column: string;
  value: number;
}

interface HeatMapProps {
  data: HeatMapCell[];
  variant?: 'matrix' | 'calendar';
  xLabel?: string;                       // column axis label
  yLabel?: string;                       // row axis label
  colorScheme?: 'sequential' | 'diverging' | 'categorical'; // default 'sequential'
  colorScale?: string[];                 // array of hex colors, auto from palette if omitted
  minValue?: number;                     // for color scale bounds, auto if omitted
  maxValue?: number;                     // for color scale bounds, auto if omitted
  showValues?: boolean;                  // show value text in cells, default false (dense)
  showTooltip?: boolean;                 // default true
  cellSize?: number;                     // px, default auto
  cellGap?: number;                      // px between cells, default 2
  cellBorderRadius?: number;             // default 2
  sortRows?: 'none' | 'value' | 'label';  // default 'none'
  sortColumns?: 'none' | 'value' | 'label';
  height?: number;                       // default auto
  responsive?: boolean;
  onClick?: (cell: HeatMapCell) => void;
  className?: string;
}

// Calendar-specific props (when variant = 'calendar')
interface HeatMapCalendarProps extends HeatMapProps {
  variant: 'calendar';
  year?: number;                         // default current year
  weekStartsOn?: 0 | 1;                  // 0=Sunday, 1=Monday, default 0
}
```

## Variants
| Variant | Axes | Use Case |
|---------|------|----------|
| `matrix` | Category × Category | Correlation matrix, feature comparison |
| `calendar` | Day × Week (month layout) | GitHub-style contribution graph, activity tracking |

## States
| State | Description |
|-------|-------------|
| Loading | Skeleton grid placeholder. |
| Empty | "No data available." |
| Error | Error state with retry. |
| Sparse | >80% empty cells — show warning about data density. |
| Data | Heatmap rendered. |

## Accessibility
- `role="img"` with `aria-label` summarizing the heatmap scope.
- Each cell is `<rect>` with `<title>` for screen reader value.
- Provide a data table below the chart for screen reader access.
- Color scale must use a perceptually uniform palette (e.g., Viridis, not Rainbow).
- Include text labels for color scale legend intervals.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| All | Cells are square; grid fills container width. |
| <768px | Row/column labels rotated or truncated. Cell tooltip replaces value text. |
| <480px | Reduce cell gap to 1px. Hide axis labels. Show only tooltip. |

## Animation Rules
- Cell color transition: 400ms ease on data update.
- Cell hover: 150ms scale 1.1 with subtle shadow.
- Tooltip: 150ms fade-in.
- Calendar variant month transition: 300ms slide.

## Future Expansion
- Clustered heatmap (reorder rows/columns by similarity).
- Drill-down (click cell to see detail breakdown).
- Animated heatmap over time (play/pause time slider).
- Rectangular cells with variable aspect ratio (for time-based calendars).
- Brushing for region selection.

## Dependencies
- Chart library (D3 / Recharts / Visx).
- `AnalyticsContainer`.

## Related Components
- **AnalyticsContainer** — controls, export.
- **Tooltip** — shared tooltip.
- **BarChart** — alternative for single-dimension comparison.

## Anti-patterns
- ❌ Do not use heatmaps for data with fewer than 10 cells — use a table instead.
- ❌ Do not use rainbow / jet color scales — they are not perceptually uniform.
- ❌ Do not render heatmaps with >500 cells without cell virtualization.
- ❌ Do not show numeric values in cells when cells are small (<24px) — text is unreadable.
- ❌ Do not omit a color legend — the scale is meaningless without it.

## Performance Notes
- SVG heatmaps perform well up to ~500 cells; beyond that, use Canvas2D.
- Cell color computation should be memoized — map value → hex once per data change.
- Calendar variant calculates day-of-week positions once per year change.
- Tooltip position debounced to avoid layout thrashing when moving across cells.
