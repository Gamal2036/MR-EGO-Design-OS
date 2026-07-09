# SummaryCard

## Purpose
Provide an aggregated overview of multiple related metrics or progress items in a compact space — acts as a "parent" card that composes StatCard and ProgressCard as mini-entries.

## Responsibilities
- Render a section title (e.g. "Project Health", "Weekly Summary")
- Render multiple stat lines (mini StatCards) or progress entries (mini ProgressCards)
- Render an optional footer action link (e.g. "View full report")
- Compose and layout child stat/progress entries
- Maintain minimum height 100 px

## Composition
```
SummaryCard
├── Card (shell)
├── Header
│   ├── Title                      ← section heading, bold, heading-4
│   └── [HeaderAction]             ← optional "View all" link at top-right
├── Body
│   ├── StatLine                   ← mini StatCard (compact variant)
│   │   ├── MiniLabel
│   │   ├── MiniValue
│   │   └── [MiniTrend]
│   ├── StatLine                   ← repeatable
│   ├── [ProgressEntry]            ← mini ProgressCard (compact variant)
│   │   ├── MiniLabel
│   │   ├── MiniBar
│   │   └── MiniValues
│   └── [Divider]                  ← optional 1 px separator between groups
└── Footer
    └── FooterActionLink           ← e.g. "View full report →", centred or right-aligned
```

## Hierarchy
- **Container:** Card
- **Parent:** Dashboard grid section
- **Children:** StatCard (compact), ProgressCard (compact), link

## Props Contract (TypeScript)

```typescript
interface SummaryCardProps {
  /** Section title */
  title: string;
  /** Stat lines to display */
  stats?: Array<{
    label: string;
    value: string;
    unit?: string;
    trend?: {
      direction: 'up' | 'down' | 'neutral';
      label: string;
    };
  }>;
  /** Progress entries to display */
  progressItems?: Array<{
    label: string;
    current: number;
    target: number;
    color?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    timeRemaining?: string;
  }>;
  /** Layout direction for body items */
  layout?: 'vertical' | 'horizontal-grid';
  /** Footer action */
  footerAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  /** Header action (top-right) */
  headerAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  /** Compact all children */
  compact?: boolean;
}
```

## Variants

| Variant        | Modifiers                                                  |
|----------------|------------------------------------------------------------|
| StatsOnly      | Only stat lines, no progress bars                          |
| ProgressOnly   | Only progress entries, no stat lines                       |
| Combined       | Mix of stats and progress, separated by divider            |
| WithHeaderLink | Top-right "View all" link                                  |
| WithFooterLink | Bottom-centred action link                                 |
| HorizontalGrid | Stats arranged in 2×2 or 3×2 grid within the body          |

## States

| State      | Visual                                                      |
|------------|-------------------------------------------------------------|
| Idle       | Default appearance                                          |
| Hover      | Entire card elevates (when clickable) or individual items highlight |
| Focus      | 2 px ring on the card                                       |
| Loading    | Skeleton — title line, 3-4 stat lines, footer               |
| Empty      | "No data available" message, ghost icon                     |
| Error      | "Failed to load summary" with retry button                  |

## Accessibility
- Card has `role="region"` and `aria-labelledby` pointing to the title
- Each stat line inherits accessibility from StatCard compact variant
- Each progress entry inherits accessibility from ProgressCard compact variant
- Footer link is a standard `<a>` or `<button>`
- Divider is `role="separator"` or purely decorative (`aria-hidden="true"`)
- Loading skeleton uses `aria-label="Loading summary"`
- Empty state text uses `aria-live="polite"` to announce to screen readers

## Responsive Rules

| Breakpoint | Behaviour                                                    |
|------------|--------------------------------------------------------------|
| ≥ 1024 px  | Horizontal-grid layout for stats, 2 columns                  |
| 640–1023   | Vertical layout, stat lines full width                       |
| < 640 px   | Compact forced, progress bars at 6 px, stat values smaller   |
| Inside Dashboard | Width determined by grid column (min 280 px, max 1 fr) |

## Animation Rules
- **Mount:** Fade in, 200 ms, entire card as a unit (no stagger)
- **Stat value change:** Cross-fade 200 ms (delegated to child StatCard)
- **Progress bar fill:** Delegated to child ProgressCard
- **Footer link hover:** Underline animation 150 ms
- **Reduced motion:** Respect `prefers-reduced-motion` — no internal animations

## Future Expansion
- Expandable body to reveal full detail
- Customisable stat layout order (drag to reorder)
- "Pin to top" toggle for favourite summaries
- Real-time update indicator (pulsing dot when data refreshes)
- Export summary as PDF or image

## Dependencies
- `Card` shell
- `StatCard` (compact variant) — for each stat line
- `ProgressCard` (compact variant) — for each progress entry
- `@mr-ego/theme` (spacing, heading-4 token, colour tokens)
- `@mr-ego/components/Divider` (optional)

## Related Components
- **StatCard** — child component, atomic metric
- **ProgressCard** — child component, goal progress
- **MetricCard** — alternative for single headline KPI
- **QuickActionCard** — action launcher, not a summary

## Anti-patterns
- ❌ Do not nest more than 6 child items in a single SummaryCard — split into multiple
- ❌ Do not mix StatCard and ProgressCard without a visual divider
- ❌ Do not use SummaryCard for a single stat (use StatCard directly)
- ❌ Do not include interactive children that require full card height (use separate cards)
- ❌ Do not use SummaryCard as a container for unrelated metrics — keep theme-consistent

## Performance Notes
- Child components (StatCard, ProgressCard) use compact variants with minimal DOM
- SummaryCard is a layout wrapper — no complex JS beyond mapping over arrays
- Use `React.memo` on stat/progress item renderers to prevent unnecessary re-renders
- Empty and error states share the same layout shell to minimise layout shift
- Avoid inline function creation for footer/header action handlers — use stable references
- When `horizontal-grid` layout is used, CSS Grid handles the columns — no JS measurement
