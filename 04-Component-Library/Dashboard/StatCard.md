# StatCard

## Purpose
Display a single quantitative metric at a glance — the smallest atomic data-visualisation component in the Dashboard domain.

## Responsibilities
- Render a human-readable label (e.g. "Active Users")
- Render a numeric value (e.g. "12,847")
- Render an optional unit suffix (e.g. "kWh", "ms", "users")
- Render an optional trend indicator (up / down / neutral arrow)
- Render an optional inline sparkline chart (52 × 20 px)
- Maintain a minimum height of 100 px

## Composition
```
StatCard
├── Card (shell)           ← shared wrapper, border-radius 12 px
├── CardHeader
│   ├── Label              ← <span> or <p>, colour token text-secondary
│   └── [TrendIndicator]   ← <span> with ↑↓– glyph; colour based on direction
├── Value                  ← <h2>/<span> with number formatting
├── [Unit]                 ← <small> after value
└── [Sparkline]            ← inline SVG, 52×20 viewBox
```

## Hierarchy
- **Container:** Card (Dashboard domain)
- **Parent:** Dashboard grid or a SummaryCard body
- **Children:** none (leaf node)

## Props Contract (TypeScript)

```typescript
interface StatCardProps {
  /** Human-readable metric label */
  label: string;
  /** Formatted numeric value (pre-formatted string for i18n) */
  value: string;
  /** Optional unit of measurement */
  unit?: string;
  /** Trend direction and formatted delta */
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    /** e.g. "+12.3 %" */
    label: string;
  };
  /** Base64 or raw SVG string for sparkline */
  sparklineData?: number[];
  /** Semantic colour overrides */
  color?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Click handler (optional — cards are not always interactive) */
  onClick?: () => void;
}
```

## Variants

| Variant    | Modifiers                                              |
|------------|--------------------------------------------------------|
| Default    | Neutral colour, no sparkline                           |
| Trend      | Trend indicator visible, colour matched to direction   |
| Sparkline  | Inline mini-chart below the value                      |
| Full       | Trend + sparkline                                      |
| Compact    | Smaller padding, used inside SummaryCard               |

## States

| State      | Visual                                                                 |
|------------|------------------------------------------------------------------------|
| Idle       | Default appearance                                                    |
| Hover      | Card elevation raises 1 level, subtle background shift (#0A0A0A → #121212 in dark mode) |
| Focus      | 2 px ring using `--color-focus`                                       |
| Active     | Scale 0.98 for 100 ms                                                 |
| Loading    | Skeleton placeholder — 3 shimmer lines (label/value/trend)            |
| Error      | Value replaced by "—" (em-dash), label italicised, icon warning       |

## Accessibility
- Label is a `<label>` or `aria-label` on the container
- Value rendered as `<output>` element or `role="status"` for live region
- Trend indicator includes `aria-label` (e.g. "Increased by 12.3 percent")
- Sparkline has `role="img"` and `aria-label` describing the trend shape
- Colour alone never conveys direction — arrow glyph always present
- Focusable via keyboard when `onClick` is provided
- All text contrast ≥ 4.5:1 against card background

## Responsive Rules
| Breakpoint | Behaviour                                      |
|------------|------------------------------------------------|
| ≥ 1024 px  | Default layout, inline trend + sparkline       |
| 640–1023   | Sparkline hidden, trend moved below value      |
| < 640 px   | Compact variant, value at 1.5 rem, full width  |
| Inside SummaryCard | Inherits parent responsiveness, sparkline always hidden |

## Animation Rules
- **Mount:** Fade in + translateY(8 px) over 200 ms, stagger 50 ms per sibling
- **Value change:** Cross-fade old→new value over 300 ms ease-out
- **Sparkline draw:** Stroke-dashoffset animation over 500 ms on mount
- **Hover:** Box-shadow transition 150 ms
- **Reduced motion:** Respect `prefers-reduced-motion` — disable all animations, instant display

## Future Expansion
- Micro-chart type variants (bar, donut gauge) via `chartType` prop
- Drill-down modal on value click
- User-defined threshold colour bands
- Internationalisation for unit abbreviations via `@mr-ego/i18n`

## Dependencies
- `Card` shell component
- `@mr-ego/theme` (colour tokens, spacing scale)
- `@mr-ego/icons` (trend arrow glyph)
- Optional: `@mr-ego/charts` (Sparkline sub-component)

## Related Components
- **MetricCard** — richer KPI with comparison and headline value
- **ProgressCard** — bar-based percentage instead of raw number
- **SummaryCard** — composes multiple StatCard instances

## Anti-patterns
- ❌ Do not truncate value — use font-size scaling or scientific notation
- ❌ Do not place more than one sparkline per card
- ❌ Do not use animated counting in non-critical contexts (keep accessible)
- ❌ Do not stack more than 6 StatCards in a single row

## Performance Notes
- Sparkline renders as raw SVG, not a canvas (DOM cost < 200 nodes)
- Value formatting happens server-side or in a memoised utility
- Avoid re-rendering all StatCards in a grid when one updates — key by `label`
- Skeleton uses CSS only (pseudo-elements + `@keyframes`), no JS layout shift
