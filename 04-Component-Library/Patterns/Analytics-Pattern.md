# Analytics-Pattern

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Typography.md](../../02-Design-Language/Typography.md)), DP-3 ([Composition-Rules.md](../Architecture/Composition-Rules.md))

---

## Purpose

Defines the data analysis interface for exploring, visualizing, and exporting metrics. Provides a structured layout with period selection, chart containers, data tables, filter controls, and export options for comprehensive data analysis.

---

## Composition

```
AnalyticsPage (Container)
├── Topbar
│   ├── PageTitle ("Analytics")
│   ├── PeriodSelector (Today / This Week / This Month / Quarter / Year / Custom)
│   │   ├── PresetButtons (Today, 7D, 30D, 90D, 1Y)
│   │   └── DateRangePicker (custom range)
│   └── ComparisonToggle ("Compare to previous period")
├── FilterBar
│   ├── FilterGroup (multiple)
│   │   ├── SelectFilter (dimension)
│   │   ├── MultiSelectFilter (segments)
│   │   └── SwitchFilter (boolean toggles)
│   ├── ApplyButton
│   └── ResetButton
├── AnalyticsContainer (main content)
│   ├── MetricsRow (KPI cards at top)
│   │   ├── StatCard (multiple, key metrics)
│   │   │   ├── Label
│   │   │   ├── Value
│   │   │   └── TrendIndicator (comparison to previous period)
│   │   └── MetricCard (rich KPI)
│   │       ├── HeadlineValue
│   │       ├── ComparisonIndicator
│   │       └── Sparkline
│   ├── ChartGrid (2x2 or full-width layout)
│   │   ├── ChartCard (multiple)
│   │   │   ├── Card.Header
│   │   │   │   ├── ChartTitle
│   │   │   │   ├── ChartActions (fullscreen, download, more)
│   │   │   │   └── LegendToggle
│   │   │   ├── ChartContainer
│   │   │   │   ├── LineChart (trend over time)
│   │   │   │   ├── BarChart (comparisons)
│   │   │   │   ├── PieChart (distribution)
│   │   │   │   ├── AreaChart (volume over time)
│   │   │   │   ├── ScatterPlot (correlation)
│   │   │   │   └── HeatMap (density)
│   │   │   └── Card.Footer
│   │   │       ├── ChartSummary (text insight)
│   │   │       └── DataSourceLabel
│   │   └── EmptyChartState (when no data)
│   │       ├── NoDataIllustration
│   │       └── NoDataMessage
│   └── DataGrid (expandable below charts)
│       ├── DataGridToolbar
│       │   ├── SearchInput (filter rows)
│       │   ├── ColumnVisibilityToggle
│       │   └── ExportButton
│       ├── DataGrid (sortable, filterable)
│       │   ├── DataGrid.Header (sortable columns)
│       │   ├── DataGrid.Body
│       │   │   └── DataGrid.Row (multiple)
│       │   └── DataGrid.Footer (summary row)
│       └── Pagination
├── AIInsightBanner (optional)
│   ├── InsightIcon
│   ├── InsightText ("Revenue increased 23% compared to last quarter, driven by...")
│   └── InsightAction ("Explore in AI Workspace")
├── ExportPanel (dropdown or dialog)
│   ├── ExportFormat (CSV, XLSX, PDF, PNG)
│   ├── ExportScope (current view / all data)
│   ├── ExportSchedule (one-time / recurring)
│   └── ExportButton
└── FullScreenChart (overlay, chart-only view)
    ├── Chart (expanded, interactive)
    ├── ZoomControls
    ├── DataPointTooltip (on hover)
    └── CloseButton
```

---

## When to Use

- Data exploration and trend analysis across any metric
- Performance reporting with period-over-period comparisons
- Module-specific analytics (job analytics, document analytics, user analytics)
- Exportable data views for external reporting
- AI-powered insight generation from data patterns

## When NOT to Use

- Real-time operational monitoring (use Dashboard-Pattern instead)
- Simple metric display without analysis (use StatCard directly)
- Data entry or transaction screens
- Non-numerical content management

---

## Variants

### Overview Analytics
| Aspect | Specification |
|--------|---------------|
| Layout | Metrics row + 2x2 chart grid + summary data table |
| Charts | LineChart (revenue), BarChart (comparisons), PieChart (distribution), AreaChart (volume) |
| Period | Default: 30 days |
| Use case | High-level business performance review |

### Detailed Analytics
| Aspect | Specification |
|--------|---------------|
| Layout | Full-width single chart + detailed data grid below |
| Charts | Single large interactive chart with zoom and tooltip |
| Filters | Multiple dimensions and segments |
| Period | Custom date range with granularity selector (day/week/month) |
| Use case | Deep dive exploration of specific metric |

### Comparative Analytics
| Aspect | Specification |
|--------|---------------|
| Layout | Side-by-side charts or overlayed series |
| Charts | Overlay comparison (current vs previous period) |
| Features | ComparisonToggle always visible; delta indicators on all metrics |
| Period | Comparison period auto-selected based on current period |
| Use case | Period-over-period, year-over-year, segment comparison |

### AI-Powered Analytics
| Aspect | Specification |
|--------|---------------|
| Layout | Standard analytics + AI InsightBanner + anomaly highlights |
| Charts | Charts with anomaly markers, trend predictions (dashed forecast line) |
| Features | Auto-generated insights, anomaly detection, forecast projections |
| AI | "Ask AI about this data" button opens AI workspace with context |
| Use case | Data analysis with AI-assisted pattern discovery |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Loading** | Skeleton charts (rectangle placeholders with shimmer); skeleton metrics row | No chart interaction |
| **Empty** | EmptyChartState per chart with "No data for selected period" | Suggest changing period or filters |
| **Partial data** | Charts show available data with gaps indicated by dashed line or note | Some metrics may show "Insufficient data" |
| **Error** | ErrorState in AnalyticsContainer; retry button | Data fetch failure |
| **Filtered** | Active filters visible in FilterBar; charts update with transition | Data filtered by selected dimensions |
| **Period changing** | Charts show loading overlay; skeleton briefly shows; previous data visible until new loads | Smooth transition between periods |
| **Comparing** | Comparison charts show overlay series; delta badges on metrics | Comparison mode indicators visible |
| **Exporting** | ExportPanel open; format selected; progress indicator on export | Export in progress |
| **Fullscreen chart** | Chart expands to full viewport with overlay; controls for zoom/pan | Immersive chart exploration |
| **AI analyzing** | AI InsightBanner shows loading skeleton | AI generating data insights |
| **Stale data** | Subtle "Data from {timestamp}" indicator | Data freshness warning |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Charts | All charts require accessible data table fallback or `aria-label` summary |
| Metrics | `role="status"` or `aria-live="polite"` for changing values |
| Period selector | `<select>` or segmented control with visible label |
| Filters | All filters have visible labels; `aria-label` on icon-only controls |
| Data grid | Native `<table>` with `<th>`, `<caption>`, `<thead>`, `<tbody>` |
| Sortable columns | `aria-sort` on column headers |
| Chart images | `role="img"`, `aria-label` describing the chart type and data summary |
| Chart interactions | Hover tooltips also trigger on focus; keyboard-navigable data points |
| Color | Data series distinguished by pattern + color, never color alone |
| Export button | `aria-label="Export data"` |
| Fullscreen chart | `aria-label="Full screen chart view"`; Escape to close |
| Comparison | Delta indicators include `aria-label`: "Increased by 23% compared to previous period" |
| AI insights | Clearly labeled "AI-generated insight" |
| Keyboard | Tab navigates between charts and controls; arrow keys for chart zoom/pan; Escape closes fullscreen |
| Focus management | Focus trapped in fullscreen chart view; returns to chart card on close |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Single column layout. Period selector as dropdown. Filters in bottom sheet. Charts stack vertically (full-width each). Data grid shows first 3 columns only (horizontal scroll with sticky first column). Export as bottom sheet. Fullscreen chart uses whole viewport. Metrics row: 2 columns. |
| Tablet (768-1023px) | 2-column chart grid. Filters collapsible sidebar. Data grid horizontal scroll. Period selector visible. |
| Desktop (1024-1279px) | 2x2 chart grid. Filters in sidebar. Data grid full width. Period selector inline segmented. |
| Wide (1280-1599px) | 2x2 or 3-column chart grid configurable. Filters sidebar pinned. Data grid with optimal column widths. |
| Ultra-wide (1600px+) | 3-4 column chart grid. Content constrained to 1600px max width. Charts show enhanced tooltips. |

---

## Implementation Example

```typescript
<AnalyticsPage>
  <Topbar title="Job Analytics">
    <PeriodSelector value={period} onChange={setPeriod} presets={['7D', '30D', '90D']} />
    <ComparisonToggle checked={compare} onChange={setCompare} />
  </Topbar>
  <FilterBar>
    <SelectFilter label="Department" options={departments} value={filters.dept} onChange={setDept} />
    <MultiSelectFilter label="Job Type" options={jobTypes} value={filters.types} onChange={setTypes} />
    <Button variant="ghost" onClick={resetFilters}>Reset</Button>
  </FilterBar>
  <AnalyticsContainer>
    <MetricsRow>
      <StatCard label="Total Applications" value="12,847" trend={{ direction: 'up', label: '+12%' }} />
      <StatCard label="Avg. Time to Hire" value="18d" trend={{ direction: 'down', label: '-3d' }} />
      <StatCard label="Offer Acceptance" value="86%" trend={{ direction: 'up', label: '+5%' }} />
      <MetricCard label="Revenue per Hire" value="$4,200" comparison={{ value: '$3,800', direction: 'up', label: '+10.5%' }} />
    </MetricsRow>
    <ChartGrid columns={2}>
      <ChartCard title="Applications Over Time" actions={<ChartActions onFullscreen={...} onDownload={...} />}>
        <LineChart data={applicationsTrend} xKey="date" yKey="count" />
      </ChartCard>
      <ChartCard title="Applications by Source" actions={<ChartActions ... />}>
        <PieChart data={applicationsBySource} />
      </ChartCard>
      <ChartCard title="Time to Hire by Department">
        <BarChart data={timeToHire} xKey="department" yKey="days" />
      </ChartCard>
      <ChartCard title="Offer Acceptance Rate">
        <AreaChart data={acceptanceRate} xKey="month" yKey="rate" />
      </ChartCard>
    </ChartGrid>
    <DataGrid>
      <DataGrid.Toolbar>
        <SearchInput value={search} onChange={setSearch} variant="inline" />
        <ExportButton onClick={openExportPanel} />
      </DataGrid.Toolbar>
      <DataGrid data={analyticsData} columns={columns} sortable paginated />
    </DataGrid>
  </AnalyticsContainer>
  <ExportPanel open={exportOpen} onExport={handleExport} format="csv" />
</AnalyticsPage>
```

---

## Related Patterns

| Pattern | Relationship |
|---------|-------------|
| [Dashboard-Pattern.md](Dashboard-Pattern.md) | Dashboard embeds analytics widgets; click-through to full analytics |
| [AI-Workspace-Pattern.md](AI-Workspace-Pattern.md) | "Ask AI about this data" opens AI workspace with analytics context |
| [Search-Pattern.md](Search-Pattern.md) | Search within analytics data grid |
| [CRUD-Pattern.md](CRUD-Pattern.md) | Analytics on CRUD entities (e.g., job analytics) |

## Dependencies

| Component | Usage |
|-----------|-------|
| [LineChart](../Charts/LineChart.md) | Trend visualization |
| [BarChart](../Charts/BarChart.md) | Comparison visualization |
| [PieChart](../Charts/PieChart.md) | Distribution visualization |
| [AreaChart](../Charts/AreaChart.md) | Volume visualization |
| [AnalyticsContainer](../Charts/AnalyticsContainer.md) | Chart wrapper with controls |
| [HeatMap](../Charts/HeatMap.md) | Density visualization |
| [DataGrid](../Data/DataGrid.md) | Tabular data view |
| [StatCard](../Dashboard/StatCard.md) | KPI metric display |
| [MetricCard](../Dashboard/MetricCard.md) | Rich KPI display |
| [Card](../Core/Card.md) | Chart card containers |
| [Select](../Forms/Select.md) | Filter controls |
| [MultiSelect](../Forms/MultiSelect.md) | Multi-dimension filters |
| [DatePicker](../Forms/DatePicker.md) | Custom date ranges |
| [Button](../Core/Button.md) | Action buttons |
| [SearchInput](../Forms/SearchInput.md) | Data grid search |
| [Pagination](../Navigation/Pagination.md) | Data grid pagination |
| [Skeleton](../Feedback/Skeleton.md) | Loading state |
| [EmptyState](../Feedback/EmptyState.md) | No data state |
| [ErrorState](../Feedback/ErrorState.md) | Error state |
| [Tooltip](../Core/Tooltip.md) | Chart data point tooltips |

## Anti-patterns

1. **More than 6 charts per view** — Prioritize 4 key charts; use tabs for additional views.
2. **No accessible data table** — Every chart must have a corresponding data table or summary.
3. **Color-only data distinction** — Use patterns, labels, and legends alongside color.
4. **No period comparison** — Always provide comparison context (previous period, YoY).
5. **Misleading axis scales** — Always start Y-axis at 0 for bar charts; label axis clearly.
6. **Auto-refreshing without user consent** — Live data refresh must be opt-in.
7. **No export option** — Users must be able to export data as CSV or XLSX.
8. **Overloaded tooltips** — Chart tooltips show key data points only, not all dimensions.
9. **No empty state for filters** — Filtering to zero results must show clear message.
10. **Hiding data granularity** — Always show data granularity (daily, weekly, monthly).
