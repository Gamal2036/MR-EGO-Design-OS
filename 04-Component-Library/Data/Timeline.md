# Timeline

## Purpose
Present a chronological series of events in a linear, visual format. Enables users to quickly grasp sequence, duration, and status of events over time.

## Responsibilities
- Render events in chronological order with a connector line
- Support three layout orientations: vertical, horizontal, alternating
- Provide three node types: dot (default), icon, number
- Draw connector line between nodes with active/inactive styling
- Support future events rendered with dashed connector lines
- Emit event click events
- Handle empty, single-item, and loading states

## Composition
```
Timeline
├── TimelineConnector (vertical line / horizontal track)
├── TimelineItem (×N)
│   ├── TimelineNode
│   │   ├── NodeDot (or NodeIcon or NodeNumber)
│   │   └── NodeWrapper
│   ├── TimelineConnectorSegment (between nodes)
│   │   └── (solid or dashed based on status)
│   └── TimelineContent
│       ├── TimelineTimestamp
│       ├── TimelineTitle
│       ├── TimelineDescription (optional)
│       └── TimelineActions (optional, e.g. view detail link)
└── TimelineEmptyState
```

## Hierarchy
- **Parent:** Activity feeds, order tracking, audit logs, project roadmaps
- **Children:** Icon, Typography, Badge, Button (optional actions)

## Props Contract (TypeScript)

```typescript
interface TimelineProps {
  events: TimelineEvent[];
  variant?: 'vertical' | 'horizontal' | 'alternating';
  nodeType?: 'dot' | 'icon' | 'number';
  connectorColor?: string;
  connectorWidth?: number;
  nodeSize?: 'small' | 'medium' | 'large';
  sortOrder?: 'asc' | 'desc';
  maxDisplayItems?: number; // collapse excess with "Show more"
  showAll?: boolean;
  onEventClick?: (event: TimelineEvent) => void;
  onShowMore?: () => void;
  loading?: boolean;
  classNames?: Partial<Record<'timeline' | 'item' | 'node' | 'content' | 'connector', string>>;
}

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: string | Date;
  status?: 'completed' | 'active' | 'pending' | 'error' | 'future';
  type?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  icon?: string;
  nodeColor?: string;
  actions?: TimelineAction[];
  data?: Record<string, unknown>;
}

interface TimelineAction {
  label: string;
  onClick: () => void;
  href?: string;
}
```

## Status-Based Styling

| Status | Node Color | Connector |
|--------|------------|-----------|
| completed | primary-500 | Solid, primary-500 |
| active | primary-500 (pulsing) | Solid, primary-500 |
| pending | neutral-300 | Solid, neutral-300 |
| error | danger-500 | Solid, danger-500 |
| future | neutral-300 (outline) | Dashed, neutral-300 |

## Variants

| Variant | Description |
|---------|-------------|
| **vertical** | Items stack top-to-bottom with line on left; standard layout |
| **horizontal** | Items arranged left-to-right with horizontal connector line; best for 4-7 items |
| **alternating** | Items alternate left/right of center vertical line; creates wider layout for richer content |

## States

| State | Visual | Behavior |
|-------|--------|----------|
| Default | All events rendered with proper connector lines | — |
| Active (event) | Pulsing node animation | Indicates current/in-progress event |
| Hover (event content) | Background shift (neutral-50) | onEventClick available |
| Selected (event) | Highlighted content area | Explicit selection state |
| Future (event) | Dashed connector, lighter opacity | Not interactive by default |
| Loading | Skeleton timeline with 3-4 placeholder items | Skeleton pulse animation |
| Collapsed | "Show N more" button at bottom | Click to expand remaining items |
| Empty | "No timeline events" message | — |
| Single item | Connector shortened (truncated at top/bottom) | No unnecessary empty space |

## Accessibility

- `role="list"` on timeline container
- `aria-label` describing the timeline (e.g., "Project milestone timeline")
- Each event: `role="listitem"` with `aria-posinset` and `aria-setsize`
- Node status communicated via `aria-current="step"` for active event
- Future events: `aria-disabled="true"` with description "[event] — future event"
- `tabindex="0"` on clickable event content
- Keyboard: Tab through events, Enter to select, Escape to deselect
- Screen reader announces event title, timestamp, and status (e.g., "Sprint Review — completed — March 15, 2026")

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| >1024px | All variants available natively |
| 768-1024px | Horizontal variant collapses to vertical; alternating becomes vertical |
| <768px | Force vertical variant; reduce node size to small; compact content padding |
| <480px | Minimal timeline: node + title only (description hidden); timestamp as tooltip |

## Animation Rules

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Active node pulse | 2s loop | ease-in-out | active status |
| Connector draw | 400ms | ease-out | Initial mount |
| Item enter | 300ms | ease-out | New event added |
| Item exit | 200ms | ease-in | Event removed |
| Node color transition | 200ms | ease | Status change |
| "Show more" expand | 300ms | ease-out | Show more click |

## Future Expansion

- Zoomable timeline (day/week/month granularity)
- Interactive drag to reorder events (admin mode)
- Branching timeline (parallel tracks for multiple streams)
- Event grouping (auto-group by day/week/month)
- Interactive date range filter
- Export timeline as image (PNG/SVG)
- Timeline with progress bars for duration events

## Dependencies

- React 18+
- `@mrego/icons`
- `@mrego/theme`
- `@mrego/badge` (for status badges)
- `date-fns` or `dayjs` (timestamp formatting)

## Related Components

| Component | Relationship |
|-----------|-------------|
| List | Non-chronological vertical item display |
| Steps | Sequential step indicator (wizard/progress) — Timeline is for historical events, Steps is for upcoming steps |
| Accordion | Expandable sections that could contain timeline items |
| Pagination | Paging through large timelines |
| Filters | Filter timeline events by status, date range, or type |

## Anti-patterns

- **Too many items without collapsing:** >10 events should be collapsed with "Show N more"; >50 should use pagination
- **Horizontal timeline with >7 items:** Horizontal becomes unreadable beyond 7 items — force vertical at breakpoint
- **Missing status differentiation:** All events must have a status; default to "completed" or "pending"
- **Overloading content area:** Keep description ≤3 lines; excess should truncate or link to detail view
- **Inconsistent timestamps:** Normalize all timestamps to a single format before rendering
- **Non-chronological default order:** Always default to descending (most recent first) unless context demands ascending

## Performance Notes

- For timelines >100 events, virtualize visible items
- Use `Intl.DateTimeFormat` for locale-aware date rendering; memoize formatter
- Connector lines should be rendered as CSS borders or SVG paths, not as canvas elements
- "Show more" should add items incrementally (e.g., 10 at a time) rather than all at once
- Active pulse animation should use CSS `@keyframes` not JS intervals
- Avoid re-rendering all items on status change — only update the affected TimelineItem
- Memoize timeline item content to prevent unnecessary re-renders on scroll
