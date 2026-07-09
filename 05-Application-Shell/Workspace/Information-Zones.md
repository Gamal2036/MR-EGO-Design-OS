# Information Zones

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Data components](../../04-Component-Library/Data/), [Dashboard components](../../04-Component-Library/Dashboard/)), DP-1 ([Layout-Principles.md](../../02-Design-Language/Layout-Principles.md))

---

## Purpose

Defines the zones within the workspace dedicated to displaying data, metrics, and information. Information zones are distinct from content zones in that they display structured data views rather than task-oriented content.

---

## Information Zone Types

### Metric Zone
Key performance indicators and numerical data displayed in card format.

- Contains StatCard, MetricCard, and ProgressCard components
- Arranged in a configurable grid (2-4 columns on desktop, 1-2 on mobile)
- Cards are reorderable by the user
- Supports sparklines and trend indicators
- Loading state shows skeleton cards matching the grid layout

### Data Zone
Structured data displays including tables, lists, and trees.

- Contains Table, DataGrid, List, and TreeView components
- Supports sorting, filtering, pagination, and selection
- Scrolls independently within its section
- Column width is adjustable by the user
- Empty state provides guidance for population

### Chart Zone
Data visualization surfaces.

- Contains LineChart, BarChart, AreaChart, PieChart, and other chart components
- Contains AnalyticsContainer for period selection and export
- Charts are interactive (hover, click, zoom where appropriate)
- Charts resize responsively within their container
- Loading state shows skeleton chart shapes

### Summary Zone
Aggregated information and insights.

- Contains SummaryCard and InsightCard components
- Presents key takeaways from data below
- AI-generated insights are marked with AI indicator
- Always visible at the top of the data it summarizes

### Activity Zone
Timeline-based event display.

- Contains Timeline and ActivityCard components
- Shows chronological activity stream
- Supports filtering by type and date range
- Infinite scroll for large activity sets

---

## Information Zone Rules

| Rule | Description |
|------|-------------|
| Purpose label | Every information zone has a clear label describing its data |
| Empty states | Every zone defines an informative empty state |
| Loading states | Skeletons match the final data layout |
| Refresh control | Each zone provides refresh, or auto-refreshes on a schedule |
| Data source label | Every zone labels its data source (user, AI, imported, external) |
| Data freshness | Timestamp of last update is visible |
| Export | Tabular data zones provide CSV/JSON export |
| Density toggle | Users can switch between comfortable and compact density |

---

## Information Zone Placement

| Zone | Default Region | Layouts |
|------|---------------|---------|
| Metric | Primary — top section | Dashboard, Analytics |
| Data | Primary — middle section | Dashboard, Jobs, Documents |
| Chart | Primary — middle section | Analytics, Dashboard |
| Summary | Primary — top section | All data-heavy layouts |
| Activity | Secondary or Context | Dashboard, Profile |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Content-Zones.md](Content-Zones.md) | Relationship between information and content zones |
| [Panel-Rules.md](Panel-Rules.md) | Panel behavior rules that apply to information zones |
| [Layouts/Dashboard-Layout.md](../Layouts/Dashboard-Layout.md) | Dashboard information zone configuration |

---

*Information zones provide structured data views throughout the workspace. They compose DP-3 Data, Dashboard, and Charts components into meaningful information displays.*
