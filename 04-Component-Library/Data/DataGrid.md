# DataGrid

## Purpose
Advanced data table component for complex data interaction. Extends Table with column visibility toggling, row grouping, inline editing, bulk actions, export, and virtual scrolling for large datasets.

## Responsibilities
- Render large tabular datasets with virtual scrolling (10,000+ rows)
- Provide column visibility toggle via dropdown panel
- Support multi-level row grouping with expand/collapse
- Enable inline cell editing (double-click or enter key)
- Expose bulk action toolbar for multi-selected rows
- Export visible or selected data to CSV/Excel
- Persist column order and visibility state
- Emit edit, group, export, and bulk-action events

## Composition
```
DataGrid
├── DataGridToolbar
│   ├── ColumnVisibilityDropdown
│   ├── BulkActionBar (conditional, 1+ selected)
│   │   ├── SelectionCount
│   │   ├── BulkEditButton
│   │   ├── BulkDeleteButton
│   │   └── BulkExportButton
│   └── ExportMenu (CSV | Excel)
├── DataGridHeader (sticky)
│   ├── ColumnHeader (×N)
│   │   └── ColumnVisibilityToggle
│   └── GroupIndicator (when grouped)
├── DataGridBody (virtualized container)
│   ├── GroupRow (×N, when grouping)
│   │   └── ExpandCollapseIcon
│   ├── DataRow (×N, virtualized)
│   │   ├── RowCheckbox
│   │   ├── Cell (×N, inline-editable)
│   │   │   ├── CellDisplay
│   │   │   └── CellEditor (on edit)
│   │   └── RowActions
│   └── EmptyState
└── DataGridPagination (optional, replaces virtual scroll)
```

## Hierarchy
- **Parent:** Full-page data views, admin dashboards, reporting modules
- **Children:** Table, Button, Checkbox, Dropdown, Select, Input, DatePicker (in cell editors), Icon

## Props Contract (TypeScript)

```typescript
interface DataGridProps<T extends Record<string, unknown>> {
  columns: DataGridColumn<T>[];
  data: T[];
  variant?: 'standard' | 'compact';
  selectable?: 'none' | 'single' | 'multi';
  sortable?: boolean;
  filterable?: boolean;
  groupable?: boolean;
  editable?: boolean;
  exportable?: boolean;
  virtualScroll?: boolean;
  rowHeight?: number;
  estimatedRowHeight?: number;
  overscanCount?: number;
  groupBy?: string | ((row: T) => string);
  defaultGroupCollapsed?: boolean;
  columnVisibility?: Record<string, boolean>;
  columnOrder?: string[];
  onColumnVisibilityChange?: (visibility: Record<string, boolean>) => void;
  onColumnOrderChange?: (order: string[]) => void;
  onCellEdit?: (rowId: string, columnId: string, value: unknown) => void;
  onBulkAction?: (action: string, selectedIds: string[]) => void;
  onExport?: (format: 'csv' | 'xlsx', selectedIds?: string[]) => void;
  selectedRowIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  loading?: boolean;
  pagination?: DataGridPaginationConfig;
  rowKey: keyof T | ((row: T) => string);
}

interface DataGridColumn<T> extends TableColumn<T> {
  editable?: boolean;
  editor?: 'text' | 'number' | 'select' | 'date' | 'custom';
  editorOptions?: Record<string, unknown>;
  editorComponent?: React.ComponentType<CellEditorProps<T>>;
  hidden?: boolean;
  groupable?: boolean;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
}

interface DataGridPaginationConfig {
  pageSize: number;
  pageSizeOptions?: number[];
  currentPage?: number;
  total?: number;
}

interface CellEditorProps<T> {
  value: unknown;
  row: T;
  column: DataGridColumn<T>;
  onSave: (value: unknown) => void;
  onCancel: () => void;
}

type ExportFormat = 'csv' | 'xlsx';
```

## Variants

| Variant | Description |
|---------|-------------|
| **standard** | Full-featured with toolbar, column visibility, grouping, virtual scroll |
| **compact** | Reduced padding, smaller font, minimal toolbar (only export + bulk) |
| **embedded** | No toolbar, no pagination, no virtualization — for embedding in cards/dialogs |

## States

| State | Visual | Behavior |
|-------|--------|----------|
| Default | Standard grid with alternating row stripes | All features idle |
| Loading | Skeleton rows in virtual window | Scroll disabled, skeleton pulse animation |
| Empty | "No data" illustration + "Add data" CTA | Toolbar actions disabled |
| Editing (cell) | Cell transforms to input/editor | Save on Enter/ blur, cancel on Escape |
| Selected (row) | Highlighted row | Bulk action bar appears in toolbar |
| Grouped | Group header rows with count badge | Rows collapse/expand per group |
| Exporting | Progress indicator in toolbar | Download triggers on completion |
| Virtual scrolling | Partial DOM with spacer elements | Smooth scroll, rows mount/unmount on fly |

## Accessibility

- `role="grid"` on root, `role="rowgroup"`, `role="row"`, `role="gridcell"`, `role="columnheader"`
- `aria-multiselectable` when multi-select enabled
- `aria-expanded` / `aria-controls` on group rows
- `aria-colcount` and `aria-rowcount` for virtual grids
- `aria-rowindex` for each row to maintain context during virtual scroll
- Inline editors get `role="textbox"` with `aria-label` matching column name
- Keyboard: Tab moves between editable cells, Enter starts editing, Escape cancels, Arrow keys navigate cells
- Focus is trapped inside editor until save/cancel
- Screen reader announces row/column position when focused (e.g., "Row 5 of 150, Column 3 of 8")

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| >1200px | Full grid with all columns, toolbar expanded |
| 768-1200px | Column visibility dropdown shown; bulk actions collapse to "..." menu |
| <768px | Grouped view forced; toolbar becomes bottom sheet; virtual scroll disabled |
| <480px | Display as searchable card list; edit/export actions promoted to bottom bar |

## Animation Rules

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Row mount/unmount (virtual) | 100ms | ease | Virtual scroll window change |
| Group expand/collapse | 250ms | ease-in-out | Group header click |
| Cell edit transition | 150ms | ease | Edit start/end |
| Column reorder | 200ms | ease-out | Drag column header |
| Bulk action bar slide in | 200ms | ease-out | Selection count > 0 |
| Export progress | 800ms loop | linear | Export active |

## Future Expansion

- Aggregate row (sum/count/avg per group or column)
- Column filtering within DataGrid (per-column filter input)
- Real-time data push (WebSocket connection)
- Data change history / undo stack
- Pivot mode (dynamic row/column swapping)
- Chart integration (inline sparklines in cells)
- Server-side sorting, filtering, pagination with infinite scroll

## Dependencies

- React 18+
- `@tanstack/react-virtual` (virtual scrolling)
- `@mrego/table` (base Table component)
- `@mrego/icons` (chevrons, visibility, export, edit)
- `@mrego/theme`
- `@mrego/button`, `@mrego/checkbox`, `@mrego/dropdown`, `@mrego/input`, `@mrego/select`
- `papaparse` (CSV export)
- `exceljs` or `xlsx` (Excel export)

## Related Components

| Component | Relationship |
|-----------|-------------|
| Table | Base component; DataGrid is a composable extension |
| Pagination | Used when `virtualScroll` is false |
| Filters | Advanced filter bar that integrates with DataGrid columns |
| Sorting | Manages multi-column sort state externally |
| Accordion | Alternative for grouped data in responsive views |

## Anti-patterns

- **Enabling all features on small data:** For <50 rows, use Table instead; DataGrid overhead is unnecessary
- **Missing row key:** Breaks virtual scroll, editing, and selection — always provide stable `rowKey`
- **Bulk actions on single selection:** Keep bulk bar visible only when ≥2 rows selected
- **Overwriting cell value on blur:** Require explicit save (Enter or click away) with dirty state indicator
- **Deeply nested groupBy keys:** Max 2 levels of grouping; beyond that, flatten data or use TreeView
- **No export progress feedback:** Large exports (>10K rows) must show progress to prevent double-click

## Performance Notes

- Virtual scroll renders only visible rows + overscan (default overscan=20)
- Row height must be fixed or `estimatedRowHeight` provided for smooth scrolling
- Column render functions must be stable references (memoized) to avoid re-render cascades
- Filter large datasets client-side via `useDeferredValue` to keep UI responsive
- Export should stream data in chunks for datasets >50K rows
- Avoid putting DataGrid inside a flex-grow container without explicit height; virtual scroll requires a container height
- Use `columnVisibility` as a controlled prop to avoid recalculations on every render
- Batch cell edits: defer `onCellEdit` callback with a debounce of 300ms
