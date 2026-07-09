# Dashboard Architecture

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-4 ([Layouts/Dashboard-Layout.md](../05-Application-Shell/Layouts/Dashboard-Layout.md)), DP-6 ([Dashboard-Flow.md](../06-UX-Architecture/Dashboard-Flow.md))

---

## Purpose

Defines the dashboard engine — widget registry, grid system, personalisation, data fetching, and state management for the main landing page.

---

## Dashboard Engine

```
┌─────────────────────────────────────────────────────────┐
│                   DASHBOARD ENGINE                        │
│  Widget registry, grid layout, data orchestration        │
├─────────────────────────────────────────────────────────┤
│                    WIDGET REGISTRY                        │
│  Core widgets, module widgets, user-custom widgets       │
├─────────────────────────────────────────────────────────┤
│                    GRID SYSTEM                            │
│  Responsive grid, drag-to-reorder, resize, persist       │
├─────────────────────────────────────────────────────────┤
│                    DATA ORCHESTRATOR                      │
│  Parallel data fetching, caching, refresh policies       │
├─────────────────────────────────────────────────────────┤
│                    AI LAYER                               │
│  AI summary, recommendations, insights                   │
└─────────────────────────────────────────────────────────┘
```

---

## Widget System

### Widget Definition

```typescript
// Pseudocode
interface WidgetDefinition {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  component: ComponentType;
  defaultSize: WidgetSize;
  minSize: WidgetSize;
  maxSize: WidgetSize;
  dataSource: DataSource;
  refreshPolicy: RefreshPolicy;
  permissions: string[];
  contexts: WidgetContext[];
  settings: WidgetSetting[];
}

interface WidgetSize {
  width: 1 | 2 | 3 | 4;     // Grid columns
  height: 1 | 2 | 3;         // Grid rows
}

enum RefreshPolicy {
  OnMount,           // Fetch once on mount
  OnInterval,        // Refresh every N seconds
  OnFocus,           // Refresh on tab focus
  OnAction,          // Refresh on user action
  Manual             // Refresh on demand only
}

enum WidgetContext {
  Overview,
  Tasks,
  Progress,
  Analytics
}
```

### Core Widgets

| Widget | Default Size | Refresh | Data Source |
|--------|-------------|---------|-------------|
| AI Summary | 4x1 | OnMount | AI service |
| Application Status | 2x2 | OnInterval (60s) | Applications API |
| Recommended Jobs | 2x2 | OnMount | Jobs API |
| CV Strength | 1x1 | OnMount | CV API |
| Upcoming Interviews | 2x1 | OnInterval (120s) | Applications API |
| Recent Activity | 2x2 | OnFocus | Activity API |
| Career Progress | 2x1 | OnMount | Career API |
| Quick Actions | 1x1 | Manual | Static |

### Module Widget Registration

Modules register widgets during their `onMount` lifecycle:

```typescript
// Pseudocode
Module.onMount = (registry) => {
  registry.registerWidget({
    id: 'module-jobs-stats',
    title: 'Job Statistics',
    component: JobStatsWidget,
    defaultSize: { width: 2, height: 1 },
    dataSource: { endpoint: '/jobs/stats' },
    moduleId: 'jobs'
  });
};
```

---

## Dashboard Grid

### Grid Definition

```
Desktop (1280+):    4-column grid
Laptop (1024-1279): 3-column grid
Tablet (768-1023):  2-column grid
Mobile (<768):      1-column grid (stacked)
```

### Grid Behaviour

| Feature | Behaviour |
|---------|-----------|
| Widget placement | Left-to-right, top-to-bottom auto-layout |
| Drag reorder | User can drag widgets to new positions |
| Widget resize | User can resize via bottom-right handle |
| Widget remove | User can remove widgets (can re-add from settings) |
| Widget add | User can add widgets from widget catalogue |
| Layout persist | Grid layout persisted per user (localStorage + server) |
| Layout reset | User can reset to default layout |

### Grid Layout Algorithm

```typescript
// Pseudocode
interface GridLayout {
  columns: number;          // Responsive: 4, 3, 2, 1
  rowHeight: number;        // px
  gap: number;              // px
  widgets: GridWidget[];
}

interface GridWidget {
  widgetId: string;
  x: number;                // Column start (0-indexed)
  y: number;                // Row start (0-indexed)
  width: number;            // Column span
  height: number;           // Row span
  isVisible: boolean;
}

// Collision resolution
GridLayout.placeWidget(widget) → {
  // Find first available position
  // Move down if collision
  // Return { x, y }
}
```

---

## Dashboard Contexts

The dashboard has three sub-contexts accessible via tabs or scroll sections:

| Context | Purpose | Primary Widgets |
|---------|---------|-----------------|
| Overview | Daily summary | AI Summary, Application Status, Quick Actions |
| Tasks | Action items | Task list, Progress, Upcoming Interviews |
| Progress | Career metrics | Goal Progress, Skill Map, Timeline |

User can set a default context in settings.

---

## AI Summary Widget

The AI Summary widget sits at the top of the dashboard.

### Data Flow

```
Dashboard mounts
     ↓
AI Summary calls /api/ai/dashboard/summary
     ↓
Returns: greeting, priority items, insights, confidence
     ↓
Widget renders with streaming text effect
     ↓
User can dismiss, refresh, or request detailed reasoning
```

### AI Summary States

| State | Display |
|-------|---------|
| Loading | Skeleton card with pulsing animation |
| Loaded | "Good morning, [name]. Here's today's priority." |
| Empty | "Welcome! Let's get started with your profile." |
| Error | "Unable to load AI summary. [Dismiss]" |
| Dismissed | Hidden (can be re-enabled in widget settings) |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Workspace-Architecture.md](Workspace-Architecture.md) | Dashboard as workspace layout |
| [Page-Hierarchy.md](Page-Hierarchy.md) | Dashboard page in page tree |
| [AI-Integration-Layer.md](AI-Integration-Layer.md) | AI summary data source |

---

## Validation Notes

1. Widget registry ensures zero coupling between dashboard and individual widgets.
2. Grid system adapts to all device classes without separate layouts.
3. All widget data fetching is parallelised — no waterfall requests.
4. User customisations persist across sessions and devices.
5. Module widgets integrate without dashboard code changes.
