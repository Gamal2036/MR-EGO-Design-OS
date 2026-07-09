# TimelineChart

## Purpose
Visualizes events, tasks, or milestones over time in a Gantt-like horizontal bar layout, showing duration and sequencing.

## Responsibilities
- Render horizontal bars positioned by date ranges
- Display milestone markers as diamond/flag icons
- Apply category-based coloring to bars
- Render time-axis labels (days, weeks, months)
- Show tooltips on hover with event details

## Contracts (external chart library)

This component contracts with an underlying chart library. The spec defines the expected interface, not the implementation.

## Composition
```
AnalyticsContainer
└── TimelineChart
    ├── ChartSurface
    ├── TimeAxis (top or bottom)
    ├── CategoryAxis (left, event labels)
    ├── Bar(s) (horizontal, positioned by date range)
    ├── Milestone(s) (markers on the timeline)
    ├── TodayLine (optional, vertical reference line)
    └── Tooltip
```

## Props Contract (TypeScript)
```typescript
interface TimelineEvent {
  id: string;
  label: string;                         // displayed on left axis
  startDate: Date | string;
  endDate?: Date | string;               // if absent, treated as milestone
  category?: string;                     // for color grouping
  color?: string;                        // from semantic palette, overrides category
  progress?: number;                     // 0–100, for progress bars
  description?: string;                  // for tooltip
}

interface TimelineCategory {
  id: string;
  label: string;
  color: string;
}

interface TimelineChartProps {
  events: TimelineEvent[];
  categories?: TimelineCategory[];
  variant?: 'gantt' | 'milestone' | 'combined';
  startDate?: Date | string;             // viewport start, auto if omitted
  endDate?: Date | string;               // viewport end, auto if omitted
  showToday?: boolean;                   // show vertical today line, default true
  showProgress?: boolean;                // show progress fill inside bars, default false
  barHeight?: number;                    // px, default 24
  barBorderRadius?: number;              // default 4
  rowHeight?: number;                    // px, default 40
  timeUnit?: 'day' | 'week' | 'month';   // default 'week' for <90 days, 'month' otherwise
  dateFormat?: string;                   // display format for dates
  showAxisLabels?: boolean;              // default true
  showTooltip?: boolean;                 // default true
  height?: number;                       // default auto (events × rowHeight)
  responsive?: boolean;
  onClick?: (event: TimelineEvent) => void;
  className?: string;
}
```

## Variants
| Variant | Bars | Milestones | Use Case |
|---------|------|------------|----------|
| gantt | Yes (with duration) | No | Project scheduling, task durations |
| milestone | No | Yes (diamond/flag markers) | Key dates, releases, checkpoints |
| combined | Yes (with duration) | Yes (as markers on bars) | Full project timeline with milestones |

## States
| State | Description |
|-------|-------------|
| Loading | Skeleton placeholder. |
| Empty | "No timeline events scheduled." |
| Error | Error state with retry. |
| Data | Chart rendered with events. |
| Overloaded | >100 events — show warning, suggest filtering. |

## Accessibility
- `role="img"` with `aria-label` summarizing timeline scope and key events.
- Each bar is a focusable element with `aria-label` containing event name, start, and end dates.
- Keyboard: Arrow keys to navigate between events; Enter to select.
- Data table fallback sorted by start date.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| ≥1024px | Standard timeline with labels + bars. |
| 768–1023px | Category labels truncated to 15 chars. Time unit auto-switches to 'month'. |
| <768px | Horizontal scroll container with sticky left labels. Height reduced. |
| <480px | Only show milestone markers, hide duration bars. |

## Animation Rules
- Bar grow animation: 400ms ease-out from start date position.
- Milestone marker pop-in: 300ms spring animation.
- Today line pulse: slow 2s opacity pulse (0.4–0.8).
- Tooltip: 150ms fade-in.
- Scroll sync between label column and time grid: instant.

## Future Expansion
- Drag-to-reschedule events (interactive Gantt).
- Dependency arrows between events (finish-to-start, etc.).
- Timeline zoom (day/week/month/quarter toggle).
- Resource loading overlay.
- Export to PNG/SVG.

## Dependencies
- Chart library (D3 / vis-timeline / Recharts).
- `AnalyticsContainer`.

## Related Components
- **BarChart** — for non-time-based categorical comparisons.
- **AnalyticsContainer** — controls, export, legend.
- **Tooltip** — shared tooltip component.

## Anti-patterns
- ❌ Do not use TimelineChart for more than 200 events without grouping/filtering.
- ❌ Do not overlap bars on the same row — each event gets its own row.
- ❌ Do not show progress on milestones (duration = 0).
- ❌ Do not use ambiguous date formats — always show month + day.
- ❌ Do not omit `endDate` for events that have duration — use `endDate` or treat as milestone.

## Performance Notes
- Virtualize rows when event count > 50 to reduce DOM nodes.
- Use canvas rendering for >100 events.
- Date axis tick calculation is memoized per time unit.
- Bar position calculations use cached date-to-pixel mappings — recompute only on data or viewport change.
