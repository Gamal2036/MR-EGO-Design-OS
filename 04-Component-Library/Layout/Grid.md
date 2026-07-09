# Grid

## Purpose
Provides a column-based layout system for arranging content horizontally. Enforces consistent alignment and spacing across the UI using a 12-column grid.

## Responsibilities
- Define a 12-column grid with configurable column spans (1–12)
- Control horizontal and vertical gap between grid items
- Support nested grid layouts
- Switch between fixed-width, fluid, and responsive modes

## Composition
```
Grid
├── Grid.Item (×N, each with column span)
│   └── (child content)
└── Grid (nested, optional)
    └── Grid.Item (×N)
```

## Hierarchy
- Grid is a direct child of any block-level container.
- Grid.Item is always a direct child of Grid.
- Nested grids are children of parent Grid.Items.

## Props Contract (TypeScript)
```typescript
interface GridProps {
  columns?: 12;                          // always 12
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // default 'md'
  rowGap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  columnGap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'fixed' | 'fluid' | 'responsive'; // default 'responsive'
  maxWidth?: string;                     // e.g. '1200px', used in fixed variant
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  as?: keyof JSX.IntrinsicElements;      // default 'div'
  children: React.ReactNode;
}

interface GridItemProps {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // default 12
  spanSm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // mobile
  spanMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // tablet
  spanLg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // desktop
  offset?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  order?: number;                       // flex order override
  children: React.ReactNode;
}
```

## Variants
| Variant      | Description |
|-------------|-------------|
| `fixed`     | Grid is constrained to `maxWidth`, centered horizontally. |
| `fluid`     | Grid fills 100% of parent width. |
| `responsive`| Fixed on large screens, fluid on small screens. |

## States
Grid is stateless. Grid.Item is stateless.

## Accessibility
- Grid items are focusable only if they contain interactive content.
- Use `role="list"` and `role="listitem"` when the grid conveys a list relationship.
- Avoid `role="grid"`/`role="gridcell"` — this component is a layout tool, not a data table.

## Responsive Rules
| Breakpoint | Columns | Behavior |
|-----------|---------|----------|
| ≥1024px (lg) | 12 | Standard layout, `spanLg` applies |
| 768–1023px (md) | 12 | `spanMd` applies, falls back to `span` |
| <768px (sm) | 12 → stacks | `spanSm` applies, falls back to `spanMd` → `span`; items default to full width |
| Variable | gap | Gaps scale down on smaller viewports |

## Animation Rules
- No animations on grid layout. Layout changes (e.g., column span changes) happen instantly.

## Future Expansion
- Sub-grid support (CSS `subgrid`).
- Configurable column count (e.g., 8, 16 columns).
- Drag-to-resize column spans.

## Dependencies
- None — implemented with CSS Grid (`display: grid`).

## Related Components
- **Stack** — simpler 1D arrangement (use Stack for linear layouts, Grid for 2D).
- **Section** — uses Grid internally for section header + content layout.
- **ContentArea** — ContentArea contains the Grid as a direct child.

## Anti-patterns
- ❌ Do not use Grid for single-row layouts — use Stack instead.
- ❌ Do not nest grids deeper than 3 levels — layout complexity increases maintenance cost.
- ❌ Do not use Grid as a table replacement — use `<table>` for tabular data.
- ❌ Do not override `display` on `Grid` or `Grid.Item`.

## Performance Notes
- CSS Grid is highly performant; avoid `gap` changes that trigger layout thrashing.
- Keep nested grids to a maximum depth of 3.
- Use `spanSm`/`spanMd`/`spanLg` instead of media-query overrides in parent components.
