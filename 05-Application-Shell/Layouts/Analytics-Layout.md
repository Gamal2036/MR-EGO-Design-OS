# Analytics Layout

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Analytics-Pattern.md](../../04-Component-Library/Patterns/Analytics-Pattern.md), [AnalyticsContainer.md](../../04-Component-Library/Charts/AnalyticsContainer.md))

---

## Purpose

The Analytics Layout provides a data analysis environment — charts, tables, filters, and export capabilities for exploring and understanding data.

---

## Layout Blueprint

```
Workspace (variant: with-context-panel)
├── Header (full variant)
├── Sidebar
├── PrimaryRegion (max-width: full)
│   ├── PageHeader
│   │   ├── PageTitle: "Analytics"
│   │   └── PageActions: [Period Selector, Export, Share, Schedule]
│   ├── MetricGrid (Section)
│   │   └── StatCard[] (4-6 key metrics)
│   ├── ChartGrid (Section)
│   │   └── Grid (2 columns desktop, 1 mobile)
│   │       ├── Chart (LineChart, BarChart, etc.)
│   │       └── Chart
│   ├── DataSection (Section)
│   │   └── DataGrid with filters and sorting
│   └── InsightSection (Section, optional)
│       └── InsightCard[] (AI-generated insights)
├── InspectorRegion (right panel, 360px — chart data inspection)
│   └── (chart data details, drill-down)
└── ContextRegion (optional — selection details)
```

---

## Layout Rules

| Rule | Description |
|------|-------------|
| Metrics first | Key metrics appear above charts |
| Interactive charts | All charts support hover, click, and drill-down |
| Period selector | Global period selector affects all charts |
| Export enabled | Export data and chart images from any view |
| AI insights | AI-generated insights appear below charts |

---

## Responsive Adaptation

| Device | Layout |
|--------|--------|
| Desktop (1280px+) | 2-column chart grid. Inspector panel visible. |
| Laptop (1024-1279px) | 2-column chart grid. Inspector as overlay. |
| Tablet (768-1023px) | 1-column chart grid. Inspector as bottom sheet. |
| Mobile (<768px) | 1-column. Charts stacked. Inspector full screen. |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Workspace/Information-Zones.md](../Workspace/Information-Zones.md) | Chart and data zones |

---

*The Analytics Layout transforms data into actionable insights. It provides flexible, interactive data exploration for all user levels.*
