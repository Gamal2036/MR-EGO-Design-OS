# QuickActionCard

## Purpose
Provide a one-click shortcut to a common task — acting as a launcher within the dashboard. Designed for grid layout with 3-6 items per section.

## Responsibilities
- Render a 24 px icon
- Render a short label (single line, bold)
- Render an optional description (secondary, single line)
- Change icon colour to primary on hover
- Navigate or trigger action on click
- Fit within a grid of 3-6 items
- Maintain minimum height 100 px

## Composition
```
QuickActionCard
├── Card (shell, square-ish aspect)
├── IconArea
│   └── ActionIcon                ← 24×24 SVG icon, colour text-secondary (→ primary on hover)
├── LabelArea
│   ├── Label                     ← bold, single line, text-primary
│   └── [Description]             ← optional, single line, text-tertiary
└── [KeyboardHint]                ← optional "⌘N" type hint in corner
```

## Hierarchy
- **Container:** Card
- **Parent:** QuickActionGrid (3-6 columns)
- **Children:** Icon + text nodes (leaf-level)

## Props Contract (TypeScript)

```typescript
interface QuickActionCardProps {
  /** Unique identifier */
  id: string;
  /** Icon name from @mr-ego/icons */
  icon: string;
  /** Action label */
  label: string;
  /** Optional description */
  description?: string;
  /** Routing target */
  href?: string;
  /** Click handler */
  onClick?: () => void;
  /** Keyboard shortcut hint to display */
  shortcut?: string;
  /** Whether the action is currently unavailable */
  disabled?: boolean;
  /** Tooltip text (useful when label is truncated) */
  tooltip?: string;
}
```

## Variants

| Variant       | Modifiers                                                |
|---------------|----------------------------------------------------------|
| Default       | Icon + label, optional description                       |
| WithShortcut  | Keyboard shortcut hint in bottom-right corner            |
| Disabled      | Reduced opacity, no hover effect, pointer not-allowed    |
| Description   | Extra line explaining the action                         |
| IconOnly      | No label, used in compact toolbars (future use)          |

## States

| State      | Visual                                                     |
|------------|------------------------------------------------------------|
| Idle       | Default, icon colour text-secondary                        |
| Hover      | Icon becomes primary colour, card background shifts, shadow increases |
| Focus      | 2 px ring using `--color-focus`                            |
| Active     | Scale 0.96, 100 ms                                         |
| Disabled   | Opacity 40 %, no hover effect, cursor not-allowed             |
| Loading    | Skeleton block with icon placeholder + line                |
| Visited    | Subtle visited-state mark (if href-based)                  |

## Accessibility
- Card is a `<button>` or `<a>` with `aria-label` built from label + description
- Icon has `aria-hidden="true"` (decorative)
- Keyboard shortcut displayed as `<kbd>` element with `aria-label` (e.g. "Keyboard shortcut: Control N")
- Disabled state uses `aria-disabled="true"` (not `disabled` attribute for `<a>`)
- Tooltip rendered via `title` attribute or custom tooltip with `role="tooltip"`
- Focus visible indicator required for keyboard navigation
- Description linked to label via `aria-describedby`

## Responsive Rules

| Breakpoint  | Behaviour                                                   |
|-------------|-------------------------------------------------------------|
| ≥ 1024 px   | 4-6 column grid, full description visible                   |
| 640–1023    | 3 column grid, description hidden, icon 22 px               |
| < 640 px    | 2 column grid, no description, icon 20 px                   |
| Very narrow | Single column, horizontal scrolling row                     |

## Animation Rules
- **Mount:** Cards scale in from 0.95 + fade, 200 ms, stagger 50 ms
- **Hover:** Icon colour transitions 150 ms, card background 150 ms
- **Active:** Scale 0.96 transition 100 ms
- **Disabled → Enabled:** Opacity transition 200 ms
- **Reduced motion:** Respect `prefers-reduced-motion` — instant colour, no stagger

## Future Expansion
- Drag-to-reorder in the grid
- User-customisable shortcuts (pin/unpin from settings)
- Badge notifications on specific QuickActionCards
- Right-click context menu with secondary actions
- Recent actions recency indicator

## Dependencies
- `Card` shell
- `@mr-ego/theme` (colour tokens, spacing)
- `@mr-ego/icons` (24 px SVG icons)
- `@mr-ego/components/Grid` (QuickActionGrid parent)

## Related Components
- **ActivityCard** — historical record, not a shortcut
- **RecommendationCard** — AI-suggested action (not user-initiated)
- **SummaryCard** — overview, not action-oriented

## Anti-patterns
- ❌ Do not exceed 6 QuickActionCards in a single grid — use pagination or grouping
- ❌ Do not use icons larger than 24 px
- ❌ Do not use QuickActionCard for destructive actions without confirmation
- ❌ Do not show description longer than a single line
- ❌ Do not stack QuickActionCards vertically — always use a grid layout
- ❌ Do not change the label on hover — icon colour change is the hover affordance

## Performance Notes
- Icons are pre-loaded SVG sprites — no network request on hover
- Grid layout uses CSS Grid (`grid-template-columns: repeat(auto-fill, minmax(X, 1fr))`)
- No JS layout calculations needed for the grid
- Hover colour change is pure CSS (no JS event listeners)
- Disabled state is declarative — no dynamic class toggling beyond prop change
- Avoid wrapping QuickActionCard in additional DOM nodes — keep the grid flat
