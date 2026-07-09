# Dashboard-Pattern

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Responsive-System.md](../../02-Design-Language/Responsive-System.md), [Color-System.md](../../02-Design-Language/Color-System.md)), DP-3 ([Composition-Rules.md](../Architecture/Composition-Rules.md))

---

## Purpose

Defines the standard dashboard layout and composition for presenting key metrics, AI recommendations, recent activity, and quick actions in a customizable grid. Serves as the primary landing view for authenticated users.

---

## Composition

```
DashboardPage (Container)
├── Topbar
│   ├── PageTitle ("Dashboard")
│   ├── PeriodSelector (Today / This Week / This Month / Custom)
│   └── QuickActionButtons
├── DashboardGrid (ResponsiveSystem grid)
│   ├── StatCard (multiple)
│   │   ├── Card (shell)
│   │   ├── Label
│   │   ├── Value
│   │   ├── TrendIndicator (optional)
│   │   └── Sparkline (optional)
│   ├── MetricCard (multiple)
│   │   ├── Card (shell)
│   │   ├── HeadlineValue
│   │   ├── ComparisonIndicator (vs. previous period)
│   │   └── MiniChart (optional)
│   ├── SummaryCard (composes multiple StatCards)
│   │   ├── Card.Header
│   │   └── Card.Body (grid of StatCards)
│   ├── ProgressCard
│   │   ├── Card.Header
│   │   ├── ProgressBar
│   │   ├── Percentage
│   │   └── GoalLabel
│   └── InsightCard
│       ├── Card (insight variant)
│       ├── InsightIcon (accent)
│       ├── InsightTitle
│       ├── InsightDescription
│       └── InsightAction (link/button)
├── WidgetAreas (configurable sections)
│   ├── ActivityFeed
│   │   └── ActivityCard (multiple)
│   │       ├── Avatar
│   │       ├── ActivityText
│   │       ├── Timestamp
│   │       └── ActivityIcon
│   ├── RecommendationsWidget
│   │   └── RecommendationCard (multiple)
│   │       ├── RecommendationTitle
│   │       ├── ConfidenceBadge
│   │       └── ActionButtons (Apply, Dismiss)
│   ├── TimelineWidget
│   │   └── TimelineCard (multiple)
│   │       ├── TimelineDot
│   │       ├── TimelineContent
│   │       └── TimelineDate
│   └── QuickActionsWidget
│       └── QuickActionCard (multiple)
│           ├── ActionIcon
│           ├── ActionLabel
│           └── ActionDescription
├── CustomizationPanel (optional, edit mode)
│   ├── WidgetList (available widgets)
│   ├── GridLayout (drag-to-reorder)
│   └── SaveLayout / ResetLayout buttons
└── AISummaryBanner (optional)
    ├── AIIcon
    ├── SummaryText
    └── ActionLink ("View insights")
```

---

## When to Use

- Primary landing page after authentication
- Overview of key performance metrics across a module
- User-facing analytics summary with trend data
- Any view requiring at-a-glance status of multiple data dimensions
- AI-powered insights and recommendations surface

## When NOT to Use

- Deep analytical drill-down (use Analytics-Pattern.md)
- Single-metric focused views (use a dedicated page instead)
- Data entry or transaction processing screens
- Settings or configuration interfaces

---

## Variants

### Executive Dashboard
| Aspect | Specification |
|--------|---------------|
| Focus | High-level KPIs, revenue, growth, strategic metrics |
| Grid | 4-column StatCards at top, full-width charts below |
| Widgets | Revenue chart, user growth, top customers, AI strategic recommendations |
| Period | Default: This Quarter |

### Operational Dashboard
| Aspect | Specification |
|--------|---------------|
| Focus | Real-time operational metrics, alerts, task queues |
| Grid | 3-column mixed cards, activity feed, pending actions |
| Widgets | Active processes, queue depth, error rates, recent activity |
| Period | Default: Today |

### Module Dashboard
| Aspect | Specification |
|--------|---------------|
| Focus | Module-specific KPIs (e.g., Jobs: postings, applications, hires) |
| Grid | Module-specific card composition, 2-3 columns |
| Widgets | Module-specific data, recent module activity, quick module actions |
| Period | Default: This Week |

### AI-Enhanced Dashboard
| Aspect | Specification |
|--------|---------------|
| Focus | AI-generated insights, recommendations, predictive metrics |
| Grid | Mixed: InsightCards, RecommendationCards, standard StatCards |
| Widgets | AI recommendation panel, predictive trends, anomaly alerts |
| Period | Auto-selected based on AI context |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Loading** | Skeleton grid matching card layout (3-8 skeleton cards) | No widget interaction until loaded |
| **Empty** | Welcome card "Welcome to your dashboard" with setup checklist | First-time user onboarding |
| **Partial error** | Individual cards show ErrorState inline; other cards function | Retry per-card on error |
| **Full error** | Full-page ErrorState with retry | All data failed to load |
| **Customizing** | Widgets show drag handles; CustomizationPanel visible; "Done" button | Grid reorderable, add/remove widgets |
| **Period change** | Cards show loading overlay during data refresh | Previous data visible until new data loads |
| **AI generating** | InsightCards and RecommendationCards show ThinkingCard or skeleton | Cards populate progressively |
| **Stale data** | Subtle "Data from 2h ago" timestamp on cards | Indicates data freshness |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Grid navigation | Tab navigates between cards in reading order (top-to-bottom, left-to-right) |
| Card roles | StatCard: `article`; interactive cards: `button` with `aria-label` |
| Metrics | Values use `role="status"` or `aria-live="polite"` for live updates |
| Trends | Trend arrows include `aria-label` (e.g., "Increased by 12.3%") |
| Sparklines | `role="img"`, `aria-label` describing the trend shape |
| Widget areas | `<section>` with `aria-label` per widget area |
| Customization | Drag-and-drop has keyboard alternative (Move Up/Move Down buttons) |
| Period selector | `<select>` or segmented control with visible label |
| AI insights | Attribution label: "AI-generated insight" with confidence indicator |
| Charts | Charts provide data table fallback or `aria-label` summary |
| Focus management | Customization mode traps focus within panel; Escape exits |
| Color | Metrics never conveyed by color alone — icons and text present |
| Motion | All animations respect `prefers-reduced-motion` |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Single column stack. StatCards compact (value 1.5rem, no sparkline). Widgets collapsed. Quick actions as floating button. Period selector as dropdown. Customization disabled. |
| Tablet (768-1023px) | 2-column grid. StatCards with trends. Widgets in right column. Customization available via bottom sheet. |
| Desktop (1024-1279px) | 3-column grid. Full StatCards with sparklines. Widget areas in sidebar layout. Full customization. |
| Wide (1280-1599px) | 4-column grid. Multi-row widget areas. Split layout for primary/secondary metrics. |
| Ultra-wide (1600px+) | 4-6 column grid. Optional collapsible side panel for AI insights. Max content width 1600px centered. |

Dashboard uses [ResponsiveSystem grid](../../02-Design-Language/Responsive-System.md) for column management.

---

## Implementation Example

```typescript
<DashboardPage period={period} onPeriodChange={setPeriod}>
  <Topbar title="Dashboard">
    <PeriodSelector value={period} onChange={setPeriod} />
  </Topbar>
  <DashboardGrid columns={{ mobile: 1, tablet: 2, desktop: 3, wide: 4 }}>
    <StatCard label="Active Users" value="12,847" trend={{ direction: 'up', label: '+12.3%' }} />
    <StatCard label="Revenue" value="$847K" trend={{ direction: 'up', label: '+8.1%' }} sparklineData={[30, 45, 42, 58, 62, 71, 85]} />
    <StatCard label="Open Jobs" value="147" trend={{ direction: 'down', label: '-3.2%' }} />
    <StatCard label="Time to Hire" value="18d" trend={{ direction: 'neutral', label: '0%' }} />
  </DashboardGrid>
  <WidgetAreas>
    <ActivityFeed>
      <ActivityCard avatar={<Avatar />} text="John posted a new job" timestamp="2m ago" />
      <ActivityCard avatar={<Avatar />} text="Sarah updated candidate status" timestamp="15m ago" />
    </ActivityFeed>
    <RecommendationsWidget>
      <RecommendationCard
        title="Optimize inventory levels"
        confidence={85}
        onApply={handleApply}
        onDismiss={handleDismiss}
      />
    </RecommendationsWidget>
  </WidgetAreas>
</DashboardPage>
```

---

## Related Patterns

| Pattern | Relationship |
|---------|-------------|
| [Analytics-Pattern.md](Analytics-Pattern.md) | Analytics charts embedded in dashboard widgets; click-through to full analytics |
| [AI-Workspace-Pattern.md](AI-Workspace-Pattern.md) | AI insights and recommendations integrated; click opens AI workspace |
| [CRUD-Pattern.md](CRUD-Pattern.md) | Quick actions link to CRUD pages for entity management |
| [Search-Pattern.md](Search-Pattern.md) | Global search accessible from dashboard topbar |

## Dependencies

| Component | Usage |
|-----------|-------|
| [StatCard](../Dashboard/StatCard.md) | Single metric display |
| [MetricCard](../Dashboard/MetricCard.md) | KPI with comparison |
| [SummaryCard](../Dashboard/SummaryCard.md) | Composed metric group |
| [ProgressCard](../Dashboard/ProgressCard.md) | Goal progress |
| [InsightCard](../Dashboard/InsightCard.md) | AI-generated insight |
| [ActivityCard](../Dashboard/ActivityCard.md) | Activity feed items |
| [RecommendationCard](../Dashboard/RecommendationCard.md) | AI recommendations |
| [QuickActionCard](../Dashboard/QuickActionCard.md) | Action shortcuts |
| [TimelineCard](../Dashboard/TimelineCard.md) | Timeline events |
| [Card](../Core/Card.md) | Base card container |
| [Grid](../Layout/Grid.md) | Responsive grid layout |
| [Topbar](../Navigation/Topbar.md) | Page header |
| [Button](../Core/Button.md) | Quick actions |
| [Skeleton](../Feedback/Skeleton.md) | Loading placeholders |
| [EmptyState](../Feedback/EmptyState.md) | Empty dashboard |
| [ErrorState](../Feedback/ErrorState.md) | Error state |

## Anti-patterns

1. **More than 8 StatCards** — Too many metrics reduce each one's impact. Prioritize top 4-8.
2. **No data refresh indicator** — Always show when data was last updated.
3. **Auto-scrolling carousels** — Never auto-rotate widgets or recommendations.
4. **Non-customizable layout** — Users must be able to configure their dashboard.
5. **Real-time updates without user consent** — Live updates must be opt-in with indicator.
6. **Charts without data tables** — Every chart must have an accessible data table fallback.
7. **Ignoring widget loading order** — Critical metrics load first; recommendations load progressively.
8. **No empty state guidance** — Empty dashboard must show setup onboarding, not blank space.
9. **Hiding AI attribution** — AI-generated content must be clearly labeled as such.
