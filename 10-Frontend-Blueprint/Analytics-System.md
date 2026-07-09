# Analytics System

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-4 ([Layouts/Analytics-Layout.md](../05-Application-Shell/Layouts/Analytics-Layout.md)), DP-6 ([Dashboard-Flow.md](../06-UX-Architecture/Dashboard-Flow.md))

---

## Purpose

Defines the analytics system — event tracking, data visualisation, dashboards, reporting, export, and privacy controls.

---

## Analytics Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  ANALYTICS SYSTEM                         │
├─────────────────────────────────────────────────────────┤
│  Event Tracking Layer                                    │
│  Page views, actions, performance, errors                │
├─────────────────────────────────────────────────────────┤
│  Analytics Engine                                        │
│  Aggregation, filtering, comparison, trends              │
├─────────────────────────────────────────────────────────┤
│  Dashboard Engine                                        │
│  Metric cards, charts, data tables, insights             │
├─────────────────────────────────────────────────────────┤
│  Export Layer                                            │
│  CSV, PDF, image, shareable link                         │
└─────────────────────────────────────────────────────────┘
```

---

## Event Tracking

```typescript
// Pseudocode
interface AnalyticsEvent {
  name: string;
  category: EventCategory;
  properties: Record<string, unknown>;
  timestamp: Date;
  sessionId: string;
  userId: string;
}

enum EventCategory {
  PageView,            // Page viewed
  Navigation,          // Navigation action
  Interaction,         // User interaction (click, hover)
  Form,                // Form interaction
  Search,              // Search query
  AI,                  // AI interaction
  Error,               // Error occurrence
  Performance,         // Performance metric
  Auth,                // Authentication event
  System,              // System event
}

// Auto-tracked events
const autoTrackedEvents = [
  'pageView',           // Every route change
  'navigation',         // Every navigation click
  'search',             // Every search submission
  'error',              // Every caught error
  'performance',        // Core Web Vitals
];

// Manual events (tracked by module developers)
// trackEvent('job_applied', { jobId, company, matchScore });
// trackEvent('cv_uploaded', { fileSize, type });
// trackEvent('ai_conversation_started', { topic });
```

---

## Analytics Dashboard

```typescript
// Pseudocode
interface AnalyticsDashboard {
  overview: MetricCard[];
  charts: ChartDefinition[];
  tables: DataTable[];
  insights: Insight[];
  filters: AnalyticsFilter[];
}

interface MetricCard {
  id: string;
  label: string;
  value: number;
  previousValue: number;
  change: number;              // Percentage change
  trend: 'up' | 'down' | 'flat';
  icon: string;
  format: 'number' | 'currency' | 'percentage' | 'duration';
}

interface ChartDefinition {
  id: string;
  type: 'line' | 'bar' | 'area' | 'pie' | 'heatmap';
  title: string;
  data: ChartData;
  options: ChartOptions;
}

interface Insight {
  id: string;
  type: 'positive' | 'negative' | 'neutral' | 'suggestion';
  title: string;
  description: string;
  metric: string;
  change: number;
  action?: InsightAction;
}
```

---

## Metrics

### User Metrics

| Metric | Source | Update |
|--------|--------|--------|
| Profile completeness | Profile module | On profile change |
| CV count | CV module | On upload |
| CV last updated | CV module | On version |
| Applications sent | Applications module | On submit |
| Interview rate | Applications module | Per status change |
| Offer rate | Applications module | Per offer |
| Saved jobs | Jobs module | On save |
| Job matches | Jobs module | Per search |
| AI interactions | AI module | Per conversation |

### Performance Metrics

| Metric | Source | Budget |
|--------|--------|--------|
| Page load time | Performance observer | < 2s |
| Time to interactive | Performance observer | < 3s |
| API response time | API client | < 200ms p95 |
| Bundle size | Build system | < 150KB initial |
| Error rate | Error boundary | < 0.1% |
| Core Web Vitals | Performance observer | All green |

---

## Data Export

```typescript
// Pseudocode
interface ExportOptions {
  format: 'csv' | 'pdf' | 'image' | 'json';
  data: ExportData;
  filename: string;
  filters?: AnalyticsFilter[];
  dateRange?: DateRange;
}

enum ExportFormat {
  CSV,              // Tabular data
  PDF,              // Report with charts
  Image,            // Single chart/image
  JSON,             // Raw data
}

// Export flow
User clicks export
     ↓
Select format
     ↓
Select date range
     ↓
Preview (optional)
     ↓
Generate file
     ↓
Download
```

---

## Privacy Controls

| Data | Collection | Retention | User Control |
|------|-----------|-----------|--------------|
| Page views | Always | 90 days | Opt-out of detailed tracking |
| Interactions | Always | 90 days | Opt-out of detailed tracking |
| Performance | Always | 30 days | Always on |
| Errors | Always | 30 days | Always on |
| Personal data | Never in analytics | — | Cannot be tracked |
| AI interactions | With consent | Session | Opt-in only |
| Location | Never | — | Blocked |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Dashboard-Architecture.md](Dashboard-Architecture.md) | Dashboard widget data sources |
| [State-Management.md](State-Management.md) | Analytics state slice |
| [Settings-Architecture.md](Settings-Architecture.md) | Privacy controls for analytics |

---

## Validation Notes

1. Event tracking is automatic for standard actions — no manual instrumentation needed.
2. All metrics have a defined source, update frequency, and format.
3. Export supports CSV, PDF, image, and JSON formats.
4. Privacy controls allow users to opt out of detailed tracking.
5. Performance metrics are measured against defined budgets with CI enforcement.
