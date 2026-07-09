# AnalyticsContainer

## Purpose
Provides the standard wrapper shell for all chart components, offering controls for period selection, refresh, fullscreen, export, and legend management.

## Responsibilities
- Render chart title and description
- Provide period selector (date range picker / preset buttons)
- Render refresh button with loading indicator
- Provide fullscreen toggle
- Handle chart export (PNG, SVG, CSV)
- Manage legend visibility and series toggling
- Implement empty, loading, and error states
- Coordinate responsive chart sizing

## Composition
```
AnalyticsContainer
├── AnalyticsContainer.Header
│   ├── AnalyticsContainer.Title
│   ├── AnalyticsContainer.Description (optional)
│   └── AnalyticsContainer.Controls
│       ├── PeriodSelector
│       ├── RefreshButton
│       ├── FullscreenToggle
│       └── ExportMenu
│           ├── Export PNG
│           ├── Export SVG
│           └── Export CSV
├── AnalyticsContainer.Legend (optional)
│   └── LegendItem (×N, togglable series)
├── AnalyticsContainer.ChartArea
│   ├── LoadingState (Spinner)
│   ├── EmptyState (illustration + message)
│   ├── ErrorState (message + retry button)
│   └── (chart component — LineChart, BarChart, etc.)
└── AnalyticsContainer.Footer (optional)
    └── (data summary, last updated timestamp)
```

## Props Contract (TypeScript)
```typescript
type PeriodPreset = '7d' | '30d' | '90d' | '1y' | 'custom';

interface ExportFormat {
  png?: boolean;                         // default true
  svg?: boolean;                         // default true
  csv?: boolean;                         // default true
}

interface AnalyticsContainerProps {
  title: string;
  description?: string;
  period?: PeriodPreset;
  periodOptions?: PeriodPreset[];
  onPeriodChange?: (period: PeriodPreset, customRange?: [Date, Date]) => void;
  onRefresh?: () => Promise<void>;
  onExport?: (format: 'png' | 'svg' | 'csv') => void;
  loading?: boolean;
  error?: Error | null;
  empty?: boolean;
  emptyMessage?: string;                 // default 'No data available for this period.'
  exportFormats?: ExportFormat;
  showLegend?: boolean;                  // default true
  legendItems?: { id: string; label: string; color: string; active: boolean }[];
  onLegendToggle?: (id: string) => void;
  fullscreen?: boolean;
  onFullscreenToggle?: () => void;
  fullscreenEnabled?: boolean;           // default true
  height?: number | string;              // default '400px'
  chartRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;             // chart component
  className?: string;
}
```

## Variants
| Variant | Use Case |
|---------|----------|
| Default | Standard chart with title, period, export. |
| Fullscreen | Expanded to viewport, overlay with close button. |
| Compact | Reduced padding for dashboards with multiple charts. |

## States
| State | Description |
|-------|-------------|
| Loading | Skeleton with pulsing animation in ChartArea. Controls disabled except cancel. |
| Empty | Illustration, empty message, optional "View all data" link. |
| Error | Error message, retry button, optional error details. |
| Data | Chart rendered normally. |
| Refreshing | Overlay spinner on chart area; controls dropdowns frozen. |
| Fullscreen | Container fills viewport; exit button in header. |

## Accessibility
- Header controls are a `toolbar` role with `aria-label="Chart controls"`.
- Period selector is a `group` of radio buttons with `aria-label="Select period"`.
- Refresh button has `aria-label="Refresh chart data"`.
- Export menu is a button with `aria-haspopup="menu"`.
- Legend items are toggle buttons with `aria-pressed`.
- Fullscreen toggle has `aria-label="Toggle fullscreen"`.
- Live region (`aria-live="polite"`) announces data updates.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| ≥1024px | Full controls in header row. Legend to right or bottom. |
| 768–1023px | Controls collapse into "..." overflow menu. Legend below chart. |
| <768px | Period selector reduces to dropdown. Export hidden (use context menu). 1px grid on chart. |
| <480px | Title only. All controls hidden except period dropdown. Compact chart. |

## Animation Rules
- Loading skeleton pulse: 1.5s ease-in-out infinite.
- Content fade-in on data load: 200ms.
- Fullscreen transition: 300ms ease-in-out.
- Legend toggle (show/hide series): chart updates with 300ms transition.
- Error/empty state crossfade: 200ms.

## Future Expansion
- Chart comparison mode (overlay two periods).
- Annotations overlay.
- Scheduled auto-refresh with interval config.
- Dashboard-level filter sync.
- Chart template saving.

## Dependencies
- `Button` component.
- `Spinner` component.
- `Icon` component.
- `Portal` component (fullscreen mode).
- `Menu` / `Dropdown` component (export menu).
- `DatePicker` component (custom period).

## Related Components
- **LineChart** — wrapped by AnalyticsContainer.
- **BarChart** — wrapped by AnalyticsContainer.
- **AreaChart** — wrapped by AnalyticsContainer.
- **PieChart** — wrapped by AnalyticsContainer.
- **TimelineChart** — wrapped by AnalyticsContainer.
- **HeatMap** — wrapped by AnalyticsContainer.
- **Spinner** — loading state indicator.
- **Portal** — fullscreen rendering.

## Anti-patterns
- ❌ Do not render AnalyticsContainer without a chart `children`.
- ❌ Do not use AnalyticsContainer for non-chart content — use Section instead.
- ❌ Do not place multiple AnalyticsContainers in a fullscreen state simultaneously.
- ❌ Do not hide the refresh button when loading — users must be able to cancel.
- ❌ Do not make period selector a required field — default to '30d'.

## Performance Notes
- Controls are wrapped in `React.memo` to prevent re-render on chart data changes.
- Export (PNG/SVG) uses `html2canvas` or native SVG serialization — offload to Web Worker for large charts.
- Fullscreen mode uses the Fullscreen API when available; falls back to Portal + fixed positioning.
- Refresh debounce: minimum 500ms between refresh calls to prevent API spam.
- Legend toggle updates should be debounced when toggling multiple items rapidly.
