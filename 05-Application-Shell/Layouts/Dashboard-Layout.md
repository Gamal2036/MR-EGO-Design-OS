# Dashboard Layout

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Dashboard-Pattern.md](../../04-Component-Library/Patterns/Dashboard-Pattern.md), [Grid.md](../../04-Component-Library/Layout/Grid.md))

---

## Purpose

The Dashboard Layout provides a customizable overview of key metrics, recent activity, and actionable items. It is the default landing page for the workspace.

---

## Layout Blueprint

```
Workspace (variant: with-sidebar)
├── Header (full variant)
├── Sidebar (expanded)
└── PrimaryRegion (max-width: xl — 1280px)
    ├── PageHeader
    │   ├── PageTitle: "Dashboard"
    │   └── PageActions: [Customize, Share, Export]
    ├── MetricGrid (Section)
    │   └── Grid (4 columns desktop, 2 tablet, 1 mobile)
    │       ├── StatCard[] (4-6 cards)
    │       └── MetricCard[] (optional)
    ├── InsightRow (Section)
    │   └── InsightCard[] (2-3 cards, horizontal scroll on mobile)
    ├── ActivitySection (Section)
    │   └── TimelineCard[] / ActivityCard[]
    ├── QuickActions (Section)
    │   └── QuickActionCard[] (4-8 cards, grid)
    └── RecommendationSection (Section, optional)
        └── RecommendationCard[] (2-3 cards)
```

---

## Layout Rules

| Rule | Description |
|------|-------------|
| Customizable | Users can show/hide and reorder dashboard sections |
| Metric first | Metrics appear at the top for immediate overview |
| Progressive | More detailed content appears below metrics |
| Empty state | Setup guide shown when no data exists |

---

## Responsive Adaptation

| Device | Grid Columns | Section Behavior |
|--------|-------------|-----------------|
| Desktop (1280px+) | 4 columns | All sections visible |
| Laptop (1024-1279px) | 3 columns | All sections visible |
| Tablet (768-1023px) | 2 columns | Sections stack |
| Mobile (<768px) | 1 column | Sections stack, horizontal scroll for insights |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Workspace/Information-Zones.md](../Workspace/Information-Zones.md) | Metric and data zones used in dashboard |
| [Workspace/Content-Zones.md](../Workspace/Content-Zones.md) | Content placement within layout |

---

*The Dashboard Layout provides an at-a-glance overview of the user's workspace. It implements UX Constitution Rule 4 — No Dashboard Clutter.*
