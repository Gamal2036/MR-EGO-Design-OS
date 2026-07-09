# TimelineCard

## Purpose
Render a single chronological event within a timeline view — enabling users to track the sequence of events, milestones, or state changes over time.

## Responsibilities
- Render a date or timestamp label
- Render a title (bold, single line)
- Render an optional description (multi-line)
- Render an optional icon or node marker for the timeline connector
- Render an optional action link (e.g. "View commit", "Open PR")
- Connect visually to adjacent TimelineCards via a vertical line
- Maintain minimum height 100 px

## Composition
```
TimelineCard
├── TimelineConnector              ← vertical line spanning the gap
│   └── [NodeMarker]               ← circle/dot/icon at the junction
├── ContentCard (shell)
│   ├── DateLabel                  ← "Jun 15, 2026" or "14:30"
│   ├── Title                      ← bold, single line, ellipsis
│   ├── [Description]              ← optional, text-secondary, 3-line max
│   └── [ActionLink]               ← optional, "Learn more →" or "Open"
└── [EdgeConnector]                ← half-connector for start/end items
```

## Hierarchy
- **Container:** Timeline (parent composite) / standalone
- **Parent:** Timeline composite component
- **Children:** Text nodes + optional link (leaf-level in the data-display sense)

## Props Contract (TypeScript)

```typescript
interface TimelineCardProps {
  /** ISO date string for the event */
  date: string;
  /** Event title */
  title: string;
  /** Detailed description of the event */
  description?: string;
  /** Icon name for the node marker (overrides default dot) */
  icon?: string;
  /** URL for the action link */
  actionHref?: string;
  /** Label for the action link, e.g. "View details" */
  actionLabel?: string;
  /** Visual position in the timeline */
  position?: 'first' | 'middle' | 'last' | 'standalone';
  /** Semantic colour for the node marker and connector */
  color?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  /** Whether this event is currently active/selected */
  active?: boolean;
  onClick?: () => void;
}
```

## Variants

| Variant    | Modifiers                                                    |
|------------|--------------------------------------------------------------|
| Default    | Vertical line connector, circle node, full content           |
| IconNode   | Custom icon replaces the default circle node                 |
| Compact    | Smaller padding, no description, date shown as relative time |
| Active     | Node marker filled with accent colour, bold title            |
| Last       | Connector ends with a fade-out gradient or rounded cap       |
| Standalone | No connector lines, card only                                |

## States

| State      | Visual                                                      |
|------------|-------------------------------------------------------------|
| Idle       | Default appearance, node outline                             |
| Hover      | Card elevates, node fills slightly                           |
| Focus      | 2 px ring on the content card                                |
| Active     | Node marker filled solid with accent colour                  |
| Loading    | Skeleton card + circle shimmer                               |
| Collapsed  | Show title + date only, expandable on click                  |

## Accessibility
- Timeline wrapper uses `role="list"`, each TimelineCard uses `role="listitem"`
- `aria-label` on card: "Event on [date]: [title]"
- Date uses `<time>` with `datetime` ISO attribute
- Node marker has `aria-hidden="true"` (decorative)
- Connector line is CSS `::before` / `::after`, `aria-hidden="true"`
- Action link is a standard `<a>` or `<button>` with visible label
- Active state conveyed with `aria-current="true"` or `aria-selected="true"`
- Keyboard navigation: Tab moves between cards, Enter activates click

## Responsive Rules

| Breakpoint | Behaviour                                                    |
|------------|--------------------------------------------------------------|
| ≥ 1024 px  | Left-aligned date column (120 px), right-aligned content     |
| 640–1023   | Date above title, connector line reduced to 2 px width       |
| < 640 px   | Single-column stacked, node marker smaller (8 px), compact variant |
| Overflow   | Horizontal scroll enabled only for the timeline container, not the card |

## Animation Rules
- **Mount:** Cards stagger in with translateY(12 px) + fade, 250 ms, stagger 80 ms
- **Connector draw:** Vertical line animates height from 0 to full over 400 ms
- **Active transition:** Node fill transitions from outline to solid over 200 ms
- **Expand/Collapse:** Height transition 250 ms ease-in-out
- **Reduced motion:** Respect `prefers-reduced-motion` — instant display, no stagger

## Future Expansion
- Branching timelines (multiple parallel tracks)
- Drag-to-reorder for non-chronological layouts
- Zoom in/out (day → week → month grouping)
- Embedded mini-chart or thumbnail in expanded state
- Nested sub-events with collapsible children

## Dependencies
- `Card` shell
- `@mr-ego/theme` (spacing, colour tokens)
- `@mr-ego/icons` (node marker icons)
- `@mr-ego/utils/time` (date formatting)

## Related Components
- **ActivityCard** — recent activity with relative time (not date-oriented)
- **InsightCard** — data insight unrelated to chronology
- **RecommendationCard** — actionable AI suggestion (future-oriented, not historical)

## Anti-patterns
- ❌ Do not use TimelineCard for future-dated events (use Calendar event component instead)
- ❌ Do not truncate description to fewer than 2 lines if meaningful content exists
- ❌ Do not render overlapping connector lines when timeline wraps
- ❌ Do not place buttons inside the title — use the ActionLink slot

## Performance Notes
- Connector lines rendered with CSS pseudo-elements — zero JS cost
- Date formatting pre-computed or memoised
- Virtualise timeline when rendering > 100 events
- Collapsed state removes description from layout (not just hides via opacity)
- Avoid inline event handlers in lists — use event delegation or stable callbacks
