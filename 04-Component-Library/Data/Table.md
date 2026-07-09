# Table

## Purpose
Display structured row-and-column data in a scannable grid format. Enables users to view, compare, and interact with tabular data efficiently.

## Responsibilities
- Render a grid of rows and columns from a data source
- Support typed column definitions (text, number, date, status, action)
- Provide row selection (single and multi)
- Keep column headers sticky during vertical scroll
- Allow column resize via drag handle
- Reflect sort/filter state visually
- Emit selection-change, sort-change, and column-resize events

## Composition
```
Table
├── TableHeader (sticky)
│   ├── ColumnHeader (×N)
│   │   ├── ResizeHandle
│   │   ├── SortIndicator
│   │   └── FilterIcon
│   └── SelectAllCheckbox (when selectable)
├── TableBody
│   ├── TableRow (×N)
│   │   ├── RowCheckbox (when selectable)
│   │   ├── Cell (×N, typed: text | number | date | status | action)
│   │   └── RowActions (action column)
│   └── EmptyState (when no data)
└── TableFooter (optional, summary row)
```

## Hierarchy
- **Parent:** Page content area, Card, Modal dialog
- **Children:** Button (action cells), Badge (status cells), Checkbox (selection), Icon, Typography

## Props Contract (TypeScript)

```typescript
interface TableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  variant?: 'standard' | 'compact';
  selectable?: 'none' | 'single' | 'multi';
  sortable?: boolean;
  filterable?: boolean;
  stickyHeader?: boolean;
  resizableColumns?: boolean;
  selectedRowIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  onSortChange?: (column: string, direction: SortDirection) => void;
  onColumnResize?: (column: string, width: number) => void;
  emptyMessage?: string;
  rowKey: keyof T | ((row: T) => string);
  loading?: boolean;
  classNames?: Partial<Record<'table' | 'header' | 'row' | 'cell', string>>;
}

interface TableColumn<T> {
  id: string;
  title: string;
  dataIndex: keyof T;
  type: 'text' | 'number' | 'date' | 'status' | 'action';
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  render?: (value: T[keyof T], record: T, index: number) => React.ReactNode;
  sorter?: (a: T, b: T) => number;
  onFilter?: (value: string, record: T) => boolean;
}

type SortDirection = 'asc' | 'desc' | null;
```

## Variants

| Variant | Description |
|---------|-------------|
| **standard** | Default density, 48px row height, comfortable spacing between cells |
| **compact** | Reduced density, 36px row height, tighter cell padding for data-dense views |

## States

| State | Visual | Behavior |
|-------|--------|----------|
| Default | Normal rows, alternating zebra striping optional | All rows visible |
| Hover (row) | Row background shift (neutral-100) | Indicates clickable row |
| Selected (row) | Blue highlight (primary-50) + check indicator | Remains selected until deselected |
| Loading | Skeleton placeholder rows | Table body replaced by shimmer |
| Empty | Centered icon + "No data" message | No interactive rows |
| Error | Red banner above table | Refresh action offered |
| Column resizing | Ghost line overlay during drag | Column width updates on drag end |

## Accessibility

- `role="table"` on the outer container; `role="rowgroup"`, `role="row"`, `role="columnheader"`, `role="cell"` on child elements
- `aria-sort="ascending|descending|none"` on sortable column headers
- `aria-selected` on rows when selectable
- `aria-multiselectable="true"` when `selectable="multi"`
- `tabindex="0"` on sortable headers and action cells
- Keyboard navigation: Arrow keys move focus between cells, Space to toggle selection, Enter to activate action
- Screen reader announces row count, column count, and selection state on mount

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| >1024px | Full table, all columns visible, horizontal scroll only if necessary |
| 768-1024px | Table scrolls horizontally within a container; first column pinned |
| <768px | Card layout: each row renders as a labelled card stack; column headers become labels |
| <480px | Compact variant forced; action cells collapse under a "..." menu |

## Animation Rules

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Row selection highlight | 150ms | ease-out | Selection toggle |
| Column resize | 0ms (instant on end) | — | Resize handle drag |
| Sort indicator arrow | 200ms | ease-in-out | Sort toggle |
| Loading skeleton pulse | 1.5s loop | ease-in-out | Loading state |
| Row enter/exit | 200ms | ease | Filtered rows appearing/disappearing |

## Future Expansion

- Column grouping (multi-level header rows)
- Row reorder via drag-and-drop
- Column pinning (freeze left/right columns)
- Inline row expansion (detail panel per row)
- Excel-like copy/paste of cell ranges
- Row virtualization for large datasets (see DataGrid)

## Dependencies

- React 18+
- `@mrego/icons` (sort arrows, filter, chevrons)
- `@mrego/theme` (color tokens, spacing, typography)
- `@mrego/hooks` (`useResizeObserver`, `useKeyboardNavigation`)
- `react-virtual` (optional, for virtualized rows)

## Related Components

| Component | Relationship |
|-----------|-------------|
| DataGrid | Advanced superset with grouping, inline editing, export |
| Pagination | Pairs with Table for page-based navigation |
| Filters | External filter bar that integrates with filterable columns |
| Sorting | External sort UI that can control sortable columns |
| Badge | Used inside status-typed cells |

## Anti-patterns

- **Overloading action cells:** Keep action count ≤3 per row; overflow to a dropdown menu
- **Nested scrolling:** Avoid placing a scrollable Table inside a scrollable container; use fixed height
- **Missing row keys:** Always provide a stable `rowKey` — using index causes selection/sort bugs
- **Too many columns:** Table with >8 columns on mobile should switch to card layout
- **No loading state:** Always handle `loading=true` to prevent layout shift
- **Deeply nested data:** Table is for flat data; use TreeView for hierarchies

## Performance Notes

- Use `React.memo` on TableRow to prevent re-renders of unchanged rows
- Column `sorter` functions should be memoized with `useMemo`
- For >100 rows, enable row virtualization (`react-virtual`)
- For >500 rows, defer to DataGrid which has built-in virtual scrolling
- Column resize should use `requestAnimationFrame` to throttle paint
- Avoid inline `render` functions that recreate React elements on every render
