# ActivityCard

## Purpose
Display a single recent activity item in a feed or list — enabling users to quickly scan what has changed and navigate to the underlying item.

## Responsibilities
- Render an icon or avatar identifying the activity type or actor
- Render a title line (bold, single line, ellipsis overflow)
- Render a description line (secondary, up to 2 lines, ellipsis)
- Render a relative timestamp (e.g. "5m ago", "Yesterday")
- Support click-to-navigate behaviour
- Maintain minimum height 100 px

## Composition
```
ActivityCard
├── Card (shell)                         ← full-width row, card-like container
├── IconArea
│   ├── [Avatar]                         ← 40×40 circular image or initials
│   └── ActivityIcon                     ← fallback icon when no avatar
├── ContentArea
│   ├── Title                            ← bold, single line, text-overflow ellipsis
│   ├── Description                      ← secondary colour, 2-line clamp
│   └── Timestamp                        ← relative time, text-tertiary
└── [ChevronRight]                       ← optional affordance, 16×16 icon
```

## Hierarchy
- **Container:** Card (row variant)
- **Parent:** ActivityFeed composite component (future)
- **Children:** None (leaf node)

## Props Contract (TypeScript)

```typescript
interface ActivityCardProps {
  /** Unique identifier for the activity */
  id: string;
  /** Primary text — the action title */
  title: string;
  /** Secondary text — details about the action */
  description?: string;
  /** Relative or absolute ISO timestamp */
  timestamp: string;
  /** Activity icon name (from @mr-ego/icons) */
  icon?: string;
  /** Avatar override — takes precedence over icon */
  avatar?: {
    src: string;
    alt: string;
  };
  /** Routing target when clicked */
  href?: string;
  /** Click handler (if not using href) */
  onClick?: () => void;
  /** Mark as unread with a blue dot */
  unread?: boolean;
  /** Activity type for colour-coding the icon area background */
  type?: 'update' | 'create' | 'delete' | 'comment' | 'system' | 'mention';
}
```

## Variants

| Variant    | Modifiers                                                   |
|------------|-------------------------------------------------------------|
| Default    | Icon + content + timestamp                                  |
| Avatar     | Avatar replaces icon                                        |
| Unread     | Blue dot indicator (4 px) left of icon, bold title          |
| Compact    | Smaller padding, no description, used in notifications panel |
| System     | Grey icon background, italic description                    |

## States

| State      | Visual                                                      |
|------------|-------------------------------------------------------------|
| Idle       | Default appearance                                          |
| Hover      | Card background shifts, subtle shadow rise                  |
| Focus      | 2 px focus ring                                             |
| Active     | Background slightly darker, 100 ms                          |
| Loading    | Skeleton row — 40×40 circle, two shimmer lines              |
| Read       | Unread dot removed, title weight normal (transition from Unread) |
| Deleted    | Sliding collapse animation, item removed from list          |

## Accessibility
- Entire card is a `<button>` or `<a>` with `role="listitem"` inside a `role="feed"` list
- `aria-label` built from title + description + relative time (e.g. "John updated the design document, 5 minutes ago")
- Avatar has `alt` text describing the actor, not "user avatar"
- Relative timestamp uses `<time>` with `datetime` ISO attribute
- Unread dot: `aria-current="true"` on the card, or `aria-label="Unread"`
- ChevronRight icon is `aria-hidden="true"`
- Cannot rely on colour alone — icon + text differentiate activity types

## Responsive Rules

| Breakpoint | Behaviour                                                    |
|------------|--------------------------------------------------------------|
| ≥ 1024 px  | Full layout, description at 2 lines                          |
| 640–1023   | Description at 1 line, smaller icon (32 px)                  |
| < 640 px   | Compact variant, icon 28 px, timestamp on new line           |
| In ActivityFeed | Stretch to full width of the feed container             |

## Animation Rules
- **Mount:** Fade in + translateX(-8 px), 200 ms, stagger 30 ms per sibling
- **Unread → Read:** Dot fades out over 300 ms, title weight transitions 200 ms
- **Hover:** Background colour transitions 150 ms
- **Delete:** Height collapses to 0 over 300 ms, opacity fades, then DOM removal
- **Reduced motion:** Respect `prefers-reduced-motion` — instant transitions, no stagger

## Future Expansion
- Swipe-to-dismiss on touch devices
- Inline action buttons ("Approve", "Reply")
- Read receipt indicators for team activities
- Grouping by time window ("Today", "Yesterday", "Earlier")
- Push-to-refresh with new-item insertion animation

## Dependencies
- `Card` shell (row variant)
- `@mr-ego/theme` (colour tokens, spacing)
- `@mr-ego/icons` (activity type icons, chevron)
- `@mr-ego/utils/time` (relative time formatter, e.g. `formatRelativeTime`)

## Related Components
- **TimelineCard** — chronological event in a timeline (date-oriented, not relative)
- **InsightCard** — data insight, not a raw activity
- **QuickActionCard** — action trigger, not a historical record

## Anti-patterns
- ❌ Do not truncate title in the middle — use end ellipsis
- ❌ Do not show absolute timestamp in place of relative (use title attribute for full date)
- ❌ Do not wrap ActivityCard inside an `<a>` tag when `onClick` is the navigation handler
- ❌ Do not use ActivityCard for future or scheduled activities (use TimelineCard)

## Performance Notes
- Relative timestamps computed once on mount or via a shared interval (not per-card re-render)
- Description clamp achieved with pure CSS (`-webkit-line-clamp: 2`), no JS truncation
- Virtualise ActivityFeed if rendering > 50 ActivityCards
- Avatar images use lazy loading (`loading="lazy"`)
- Avoid re-rendering entire feed when a single card's unread state changes — key by `id`
