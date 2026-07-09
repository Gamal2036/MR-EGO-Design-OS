# Charts

**Phase:** DP-2 (Design System)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Motion-System.md](../../02-Design-Language/Motion-System.md))

---

## Purpose

Charts visualize data to reveal patterns, trends, and comparisons that text alone cannot convey. They transform raw numbers into actionable insights.

---

## When to Use

- Displaying trends over time (line, area charts)
- Comparing values across categories (bar charts)
- Showing composition or proportions (pie, donut charts)
- Visualizing change magnitude (area charts)
- Mapping events chronologically (timeline charts)
- Revealing patterns across two dimensions (heatmaps)

## When NOT to Use

- A single number or simple metric — use stat card
- Tabular data where exact values matter — use data table
- Decorative purposes — charts always communicate data
- More than 5-7 data series in one chart — split or summarize

---

## Rules Only

This document defines the rules and specifications for chart types. No implementation details. Chart implementation is delegated to a charting library in DP-3.

---

## Variants

### Line Chart

Trends and changes over time.

| Rule | Specification |
|------|---------------|
| When to use | Continuous data over time (applications per month, salary trends) |
| Lines | Max 4 lines per chart. Each line a distinct color from the data palette. |
| Line width | 2px |
| Data points | Optional dots on hover (4px radius) |
| Grid | Horizontal grid lines only, Neutral-200, dashed |
| Axis labels | Caption (12px), Text-Secondary |
| X-axis | Time-based (dates, months, years) |
| Y-axis | Value-based, start at 0 |
| Area fill | Optional gradient below line (use for single series emphasis) |
| Animation | Draw line 500ms Ease-Out |
| Tooltip | On hover — shows series name + value + date |

### Bar Chart

Comparison across categories.

| Rule | Specification |
|------|---------------|
| When to use | Comparing values across discrete categories (skills, departments) |
| Bars | Max 12 per chart. More = horizontal bar chart. |
| Bar width | 24px (standard), 16px (compact) |
| Bar gap | 8px between bars, 24px between groups |
| Bar radius | 2px top corners |
| Grouped bars | Side-by-side, max 3 per group |
| Stacked bars | Cumulative, max 5 segments per bar |
| Color | Categories use neutral, stacked segments use semantic colors |
| Baseline | Always 0 |
| Labels | Category label below, value label on bar (optional) |
| Animation | Bars grow from baseline, 300ms Ease-Out, staggered 50ms |

### Pie / Donut Chart

Proportion and composition.

| Rule | Specification |
|------|---------------|
| When to use | Showing parts of a whole (max 7 segments) |
| Max segments | 7. More → group as "Other" |
| Donut hole | 40% of radius (preferred over solid pie for readability) |
| Segment order | Largest to smallest, clockwise from 12 o'clock |
| Min segment | 3% minimum (smaller = group as "Other") |
| Colors | Data palette (distinct, not gradients) |
| Labels | Segment label outside with leader line, or legend below |
| Total | Center of donut: total value (Heading-3) |
| Animation | Arc draw 400ms Ease-Out, staggered |
| Interactive | Click segment to drill down or filter |

### Area Chart

Magnitude of change over time.

| Rule | Specification |
|------|---------------|
| When to use | Emphasizing volume of change (budget spend, headcount) |
| Series | Max 3 overlapping areas |
| Fill | 30% opacity gradient from line color to transparent |
| Line | 2px top line, solid color |
| Baseline | Always 0 |
| Overlap | Lower series rendered first (z-order bottom→top) |
| Animation | Fill reveal 500ms Ease-Out |

### Timeline Chart

Events in chronological sequence.

| Rule | Specification |
|------|---------------|
| When to use | Career milestones, project phases, activity history |
| Orientation | Vertical (preferred) or horizontal |
| Line | 2px solid, Primary-200, running through center |
| Node | Circle 12px, Primary-500 fill |
| Event card | Offset left and right alternately (desktop), single column (mobile) |
| Card content | Title (Body, weight 500), date (Caption), description (Body-Small) |
| Connections | Dashed line for future/predicted events |
| Animation | Nodes appear staggered 50ms, line draws 500ms |

### Heatmap

Two-dimensional intensity visualization.

| Rule | Specification |
|------|---------------|
| When to use | Pattern detection across two dimensions (activity by hour/day, skill matrix) |
| Cell size | 20x20px minimum |
| Color scale | Single hue intensity (Primary-50 → Primary-600) |
| Labels | Row and column headers, Caption size |
| Value display | Numeric value inside cell or tooltip on hover |
| Empty cells | Neutral-100, no fill |
| Hover | Cell border highlight, tooltip with exact value |

---

## Chart States

| State | Behavior |
|-------|----------|
| Loading | Skeleton with chart outline shape |
| Empty | "No data available" message centered |
| Error | "Could not load chart" with retry |
| Partial | Show available data with note about missing periods |
| No data for filter | "No data matches your filter" |

---

## Chart Colors

| Usage | Light Theme | Dark Theme |
|-------|-------------|------------|
| Line/Bar Series 1 | Primary-500 | Primary-400 |
| Line/Bar Series 2 | Success-500 | Success-400 |
| Line/Bar Series 3 | Warning-500 | Warning-400 |
| Line/Bar Series 4 | Primary-300 | Primary-500 |
| Area fill | Primary-500 at 15% | Primary-400 at 20% |
| Grid lines | Neutral-200 | Neutral-300 |
| Axis text | Text-Secondary | Text-Secondary |
| Tooltip background | Surface-1 | Surface-1 |
| Tooltip border | Border-Default | Border-Default |

---

## Spacing

| Context | Value | Token |
|---------|-------|-------|
| Chart top margin | 16px | Space-5 |
| Chart bottom margin | 8px | Space-3 |
| Chart left margin (y-axis) | 8px | Space-3 |
| Chart right margin | 8px | Space-3 |
| Between chart and legend | 12px | Space-4 |
| Legend item gap | 16px | Space-5 |
| Legend dot to label | 6px | Space-2 |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Data table fallback | Tabular data provided alongside chart for screen readers |
| ARIA role | `role="img"` with `aria-label` describing the chart |
| Interactive points | Keyboard navigable with arrow keys |
| Tooltip | Keyboard accessible via focus |
| Color not sole indicator | Patterns or labels alongside color for differentiation |
| Motion | Chart animations respect `prefers-reduced-motion` |
| Screen reader | Live region announces data point on selection |

---

## Responsive Behavior

| Breakpoint | Change |
|------------|--------|
| Mobile (<768px) | Simplified chart (fewer data points). Legend moves below. Touch-optimized tooltip. |
| Tablet (768-1023px) | Standard chart. Reduced axis labels. |
| Desktop (1024px+) | Full chart with all features. |
| Ultra-wide | Extended chart width. More data points visible. |

---

## Future Expansion

- **Combo chart** — Line + bar overlay (e.g., revenue as bar, growth rate as line)
- **Funnel chart** — Drop-off visualization for conversion funnels
- **Radar chart** — Multi-dimensional comparison (skills assessment)
- **Bubble chart** — Three dimensions (x, y, bubble size)
- **Waterfall chart** — Sequential contribution to total
- **Gantt chart** — Project timeline with task dependencies
- **Geographic map** — Data overlaid on geographic regions
- **Real-time chart** — Live-updating data stream
- **Chart annotations** — Notes and markers on specific data points

---

## Related Components

- [Cards.md](Cards.md) — Charts within Analytics Cards
- [Dashboard-Components.md](Dashboard-Components.md) — Dashboard chart widgets
- [Tables.md](Tables.md) — Tabular data as chart alternative
- [Loading.md](Loading.md) — Chart skeleton loading
- [EmptyStates.md](EmptyStates.md) — No chart data empty state
