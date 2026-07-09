# Sorting

## Purpose
Provide a control for ordering data by one or more columns/fields in ascending or descending direction. Supports both single-column and multi-column sort configurations.

## Responsibilities
- Render sort controls for each sortable field
- Toggle between ascending, descending, and no-sort states (3-state cycle)
- Support single-column and multi-column sort modes
- Display sort indicator arrows (ascending ↑ / descending ↓)
- Show sort order index in multi-column mode (e.g., "1 ↑", "2 ↓")
- Accept default sort configuration from props
- Expose programmatic sort state (controlled or uncontrolled)
- Emit sort change event with current sort configuration
- Reflect sort state in URL when integrated with routing

## Composition
```
Sorting
├── SortControl (standalone, ×N for multi-column)
│   ├── SortFieldLabel
│   ├── SortIndicator
│   │   ├── SortArrowAsc (↑)
│   │   └── SortArrowDesc (↓)
│   └── SortOrderBadge (multi-column: "1", "2", etc.)
└── SortDropdown (compact variant, single dropdown)
    ├── SortFieldSelector
    ├── SortDirectionToggle
    └── CurrentSortIndicator
```

## Hierarchy
- **Parent:** DataGrid header, Table column header, list toolbar, search results header
- **Children:** Button, Icon, Typography, Badge, Select

## Props Contract (TypeScript)

```typescript
interface SortingProps {
  fields: SortField[];
  value: SortConfig | SortConfig[];
  onChange: (config: SortConfig | SortConfig[]) => void;
  mode?: 'single' | 'multi';
  variant?: 'inline' | 'dropdown' | 'menu';
  maxSortFields?: number; // for multi mode (default 3)
  showOrderBadge?: boolean;
  disabled?: boolean;
  loading?: boolean;
  classNames?: Partial<Record<'sorting' | 'control' | 'indicator' | 'badge', string>>;
}

interface SortField {
  id: string;
  label: string;
  defaultDirection?: SortDirection;
  sortable?: boolean;
}

interface SortConfig {
  fieldId: string;
  direction: SortDirection;
  order?: number; // position in multi-column sort
}

type SortDirection = 'asc' | 'desc';

type SortCycleDirection = 'asc' | 'desc' | null;

// 3-state cycle for sortable column headers:
// null → 'asc' → 'desc' → null
```

## Variants

| Variant | Description |
|---------|-------------|
| **inline** | Each sortable field shows its own sort indicator; click to cycle; classic table header pattern |
| **dropdown** | Single dropdown combining field selection + direction toggle; compact for toolbars |
| **menu** | Full sort configuration panel with add/remove fields; for advanced sorting dialogs |

## Modes

| Mode | Description |
|------|-------------|
| **single** | Only one field can be sorted at a time; sorting a new field replaces the previous sort |
| **multi** | Multiple fields can be sorted sequentially; order index shown; limited by `maxSortFields` |

## 3-State Cycle

```
No Sort ──click──→ Ascending (↑) ──click──→ Descending (↓) ──click──→ No Sort
```

## States

| State | Visual | Behavior |
|-------|--------|----------|
| No sort | No indicator visible (or muted arrow) | — |
| Ascending | Arrow up (↑) indicator, active color | Data sorted ascending |
| Descending | Arrow down (↓) indicator, active color | Data sorted descending |
| Multi (primary) | Arrow + "1" badge | Primary sort field |
| Multi (secondary) | Arrow + "2" badge | Secondary sort applied after primary |
| Hover (control) | Background shift (neutral-50) | Cursor pointer |
| Focused | Focus ring | Keyboard activation |
| Disabled | 50% opacity | No interaction |
| Loading | Skeleton indicator | Data being re-sorted |

## Accessibility

- Sortable headers/controls use `role="button"` with `tabindex="0"`
- `aria-sort="ascending|descending|none"` on sortable column headers
- Buttons include `aria-label` (e.g., "Sort by Name ascending", "Sort by Date descending")
- Multi-column sort: `aria-description` conveys sort order index (e.g., "First sort key")
- Current sort state announced when changed: "Sorted by Name, ascending"
- Keyboard: Enter/Space to toggle sort on focused control; Tab to navigate between sort controls
- Focus remains on the sort control after activation; does not shift

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| >768px | Inline or dropdown variant as configured |
| <768px | Collapse to dropdown variant; hide order badges |
| <480px | Force dropdown variant with compact styling; show only active sort |

## Animation Rules

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Arrow direction flip | 200ms | ease | Sort toggle |
| Sort order badge enter | 150ms | ease-out | Multi-column sort added |
| Indicator fade in/out | 150ms | ease | Sort activation/deactivation |
| Dropdown open | 150ms | ease-out | Dropdown toggle |
| Badge number transition | 200ms | ease | Order index change |

## Default Sort Configuration

```typescript
// Example default: sort by "createdAt" descending, then by "name" ascending
const defaultSort: SortConfig[] = [
  { fieldId: 'createdAt', direction: 'desc', order: 1 },
  { fieldId: 'name', direction: 'asc', order: 2 },
];
```

## Programmatic Sort State

```typescript
// Controlled usage
const [sortConfig, setSortConfig] = useState<SortConfig[]>([
  { fieldId: 'createdAt', direction: 'desc', order: 1 }
]);

<Sorting
  fields={sortFields}
  value={sortConfig}
  onChange={setSortConfig}
  mode="multi"
/>

// Uncontrolled usage with default
<Sorting
  fields={sortFields}
  value={[{ fieldId: 'name', direction: 'asc', order: 1 }]}
  onChange={(config) => applySort(config)}
  mode="single"
/>
```

## Future Expansion

- Drag-and-drop sort field reordering (multi-column mode)
- Saved sort presets
- Sort by aggregation (sum, count, average for grouped data)
- Natural sort for text fields (vs. alphabetical)
- Server-side sort indicator with loading state
- Sort animation on data rows (items visually move to new position)
- Combined sort + filter URL sync

## Dependencies

- React 18+
- `@mrego/icons` (arrow-up, arrow-down, arrows-up-down)
- `@mrego/theme`
- `@mrego/button`
- `@mrego/select` (dropdown variant)
- `@mrego/badge` (multi-column order indicator)

## Related Components

| Component | Relationship |
|-----------|-------------|
| Table | Integrates sorting into column headers via `sortable` prop |
| DataGrid | Multi-column sort with visual indicators in column headers |
| Filters | Sorting and filtering work together to refine data |
| DataGridColumn | Each column declares its sortability and sort function |

## Anti-patterns

- **No default sort:** Always define a sensible default sort; never show unsorted data without communicating it
- **Inconsistent direction cycle:** Not all contexts use the 3-state cycle; some use 2-state (asc ↔ desc). Support both
- **Sorting on non-indexed server fields:** Only mark fields as sortable if the backend supports sorting on them
- **Losing sort on data refresh:** Preserve sort state across data refreshes unless explicitly reset
- **No visual difference between sorted and unsorted:** The active sort column must be visually distinct from unsorted columns
- **Multi-column without clear order indication:** Always show the order badge (1, 2, 3) so users understand the precedence
- **Ignoring case sensitivity:** Text sort should default to case-insensitive; provide option for case-sensitive

## Performance Notes

- Client-side sort should use a memoized comparator to avoid re-sorting on every render
- For multi-column sort, chain comparator functions with priority based on `order` field
- Avoid mutating the original data array when sorting — return a new sorted copy
- For large datasets (>1000 rows), defer sorting to the server side
- Sort indicator animations should use CSS transitions, not JS animations
- Memoize sort field definitions to prevent unnecessary re-renders of sort controls
- When in `single` mode, the onChange fires immediately; in `multi` mode, batch updates until the user finishes configuring
- Use `useMemo` with the sort config as dependency to compute sorted data only when sort changes
