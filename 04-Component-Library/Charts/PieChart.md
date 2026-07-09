# PieChart

## Purpose
Displays proportional relationships between categories as circular sectors, useful for part-to-whole comparisons.

## Responsibilities
- Render circular sectors proportional to category values
- Support pie and donut variants
- Display a center label (donut) with total or category value
- Limit to 8 segments — group remainder as "Other"
- Handle exploded (pulled-out) segments for emphasis

## Contracts (external chart library)

This component contracts with an underlying chart library. The spec defines the expected interface, not the implementation.

## Composition
```
AnalyticsContainer
└── PieChart
    ├── ChartSurface
    ├── Arc(s) (≤8 segments)
    ├── CenterLabel (donut variant, optional)
    ├── Legend (color + label + value/percentage)
    └── Tooltip (on hover)
```

## Props Contract (TypeScript)
```typescript
interface PieChartDatum {
  id: string;
  label: string;
  value: number;
  color?: string;                        // from semantic palette, auto-assigned if omitted
}

interface PieChartProps {
  data: PieChartDatum[];                 // max 8 segments
  variant?: 'pie' | 'donut' | 'with-center-label' | 'exploded';
  donutHoleSize?: number;                // percentage of radius, 0–80, default 60 for donut
  centerLabel?: string;                  // shown in donut hole
  showCenterValue?: boolean;             // default true for donut
  centerLabelFormatter?: (total: number) => string;
  showLegend?: boolean;                  // default true
  legendPosition?: 'right' | 'bottom';   // default 'right'
  showPercentages?: boolean;             // default true
  showValues?: boolean;                  // default false
  maxSegments?: number;                  // default 8
  otherLabel?: string;                   // default 'Other'
  explodeSegment?: string | null;        // id of segment to explode
  explodeOffset?: number;                // px offset for exploded segment, default 10
  innerRadius?: number;                  // for donut, overrides donutHoleSize
  outerRadius?: number;                  // percentage of container, default 80
  padAngle?: number;                     // radians between arcs, default 0.02
  sortBy?: 'value' | 'label' | 'none';   // default 'value'
  margin?: { top: number; right: number; bottom: number; left: number };
  height?: number;                       // default 300
  responsive?: boolean;
  onClick?: (datum: PieChartDatum) => void;
  className?: string;
}
```

## Variants
| Variant | Center Hole | Label | Exploded | Use Case |
|---------|-------------|-------|----------|----------|
| pie | No | None | No | Simple proportions |
| donut | Yes (60%) | Total | No | Proportion with total emphasis |
| with-center-label | Yes (60%) | Custom/Total | No | Dashboard summary |
| exploded | No | None | Yes (1 segment) | Highlight a specific segment |

## States
| State | Description |
|-------|-------------|
| Loading | Skeleton placeholder (circle). |
| Empty | Empty state ("No data"). |
| Error | Error state with retry. |
| Data | Chart rendered. |
| Single segment | Full circle with single value. |

## Accessibility
- `role="img"` with `aria-label` listing category names and percentages (e.g., "Pie chart: Sales 45%, Marketing 30%, Engineering 25%").
- Each arc has a `<title>` element with exact value.
- Keyboard navigation: Tab through arcs; Enter to select.
- Screen reader data table fallback required.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| All | SVG `viewBox` keeps chart proportional. |
| <768px | Legend below chart instead of right side. |
| <480px | Donut center label hidden. Max segments reduced to 5. |

## Animation Rules
- Arc sweep animation: 600ms ease-out on mount (arcs grow from 0 to target angle).
- Exploded segment: 200ms spring animation on toggle.
- Tooltip: 150ms fade-in.
- Arc hover: scale 1.05 with 150ms transition.

## Future Expansion
- Semi-circle / gauge variant.
- Nested donut (sunburst).
- Radial bar chart.
- Interactive reordering (drag arcs to rearrange).
- Animated transition between data sets.

## Dependencies
- Chart library (D3 / Recharts / Visx).
- `AnalyticsContainer`.

## Related Components
- **BarChart** — use bar chart instead of pie when >8 categories or when precise comparison is needed.
- **AnalyticsContainer** — provides chart controls.
- **Legend** — shared legend component.

## Anti-patterns
- ❌ Do not use pie charts for more than 8 categories — group into "Other".
- ❌ Do not use pie charts for comparing similar-sized segments — human eyes cannot distinguish 1–2% differences.
- ❌ Do not use 3D or tilted pie charts — they distort perception.
- ❌ Do not use pie charts when order matters — use a sorted bar chart.
- ❌ Do not render a pie chart for a single data point — show a full-circle label instead.

## Performance Notes
- SVG `<path>` arcs are performant up to 8 segments.
- Arc path calculations use memoized `d` attributes — compute only on data change.
- Animation uses CSS transitions on SVG `<path>` when possible; fall back to JS for arc interpolations.
- Limit `padAngle` to ≤0.05 radians to avoid visible gaps.
