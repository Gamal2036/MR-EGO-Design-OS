# Filters

## Purpose
Provide a flexible, composable filtering system that allows users to narrow down datasets by multiple criteria. Supports various filter types, active filter tag display, and URL synchronization.

## Responsibilities
- Render filter controls by type: text input, select dropdown, date range picker, boolean toggle
- Display active filters as removable tags above the filter bar
- Provide "Clear all" action to reset all filters
- Support Apply/Reset button pattern (manual submission) or auto-apply (instant)
- Synchronize filter state with URL query parameters
- Emit filter change events with current filter values
- Persist filter state across navigation when URL-synced
- Collapse into a compact bar on narrow screens

## Composition
```
Filters
├── FilterBar
│   ├── FilterControl (×N, typed)
│   │   ├── TextFilter (input + debounce)
│   │   ├── SelectFilter (dropdown with multi option)
│   │   ├── DateRangeFilter (start + end pickers)
│   │   ├── BooleanFilter (toggle/switch)
│   │   └── CustomFilter (slot for custom render)
│   ├── FilterActions
│   │   ├── ApplyButton (when mode="manual")
│   │   ├── ResetButton
│   │   └── ClearAllButton
│   └── FilterToggleButton (responsive: expand/collapse bar)
├── ActiveFilterTags
│   ├── FilterTag (×N, removable)
│   │   ├── FilterLabel
│   │   ├── FilterValue
│   │   └── RemoveIcon
│   └── ClearAllTag
└── FilterDrawer (responsive: slides in from bottom on mobile)
```

## Hierarchy
- **Parent:** Data pages, admin dashboards, search results, inventory views
- **Children:** Input, Select, DatePicker, Switch/Toggle, Tag/Badge, Button, Icon

## Props Contract (TypeScript)

```typescript
interface FiltersProps {
  filters: FilterDefinition[];
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  onApply?: () => void;
  onReset?: () => void;
  onClearAll?: () => void;
  mode?: 'auto' | 'manual';
  showTags?: boolean;
  showClearAll?: boolean;
  syncWithUrl?: boolean;
  urlPrefix?: string;
  compact?: boolean;
  loading?: boolean;
  disabled?: boolean;
  applyLabel?: string;
  resetLabel?: string;
  clearAllLabel?: string;
  maxVisibleFilters?: number;
  classNames?: Partial<Record<'filters' | 'bar' | 'control' | 'tag' | 'drawer', string>>;
}

interface FilterDefinition {
  id: string;
  label: string;
  type: 'text' | 'select' | 'date-range' | 'boolean' | 'custom';
  placeholder?: string;
  options?: FilterOption[]; // for select type
  multi?: boolean; // for select type — allow multiple selection
  defaultValue?: unknown;
  customComponent?: React.ComponentType<FilterControlProps>;
  width?: 'full' | 'auto' | number;
  order?: number;
  validation?: (value: unknown) => string | null; // returns error message or null
}

interface FilterOption {
  value: string;
  label: string;
  group?: string;
}

interface FilterValues {
  [filterId: string]: unknown;
}

interface FilterControlProps {
  filter: FilterDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
  disabled?: boolean;
  error?: string | null;
}
```

## Variants

| Variant / Mode | Description |
|----------------|-------------|
| **auto** | Filters apply instantly on change; no Apply/Reset buttons |
| **manual** | User configures filters, then clicks Apply; Reset reverts to initial state |

## Filter Types

| Type | Control | Value |
|------|---------|-------|
| **text** | Text input with debounced onChange (300ms) | string |
| **select** | Dropdown (single or multi-select via `multi`) | string \| string[] |
| **date-range** | Two date inputs with range validation | `{ start: Date \| null, end: Date \| null }` |
| **boolean** | Toggle switch or checkbox | boolean |
| **custom** | User-provided component | any |

## States

| State | Visual | Behavior |
|-------|--------|----------|
| Default | All filter controls rendered, no active tags | Awaiting user input |
| Active (has value) | Control shows value; tag appears in tag bar | Filter value applied |
| Focused (control) | Focus ring on control | — |
| Applied (manual mode) | Apply button active; tags reflect applied values | Values committed |
| Dirty (manual mode) | Apply button highlighted (primary) | Unsaved changes pending |
| Empty (no filters) | Filter bar hidden; "No filters available" message | — |
| Collapsed (responsive) | "Filters" button with active count badge | Drawer opens on click |
| Loading | Disabled controls + skeleton placeholders | Prevent interaction |
| Error (validation) | Red border + error message below control | Tooltip or inline message |

## Active Filter Tags

```
[Category: Electronics ×] [Price: $10 - $100 ×] [In Stock: Yes ×] [Clear All]
```

## URL Sync

When `syncWithUrl` is enabled, filter values are serialized into URL query parameters:
```
/products?category=electronics&price_min=10&price_max=100&in_stock=true
```

- Uses `URLSearchParams` for serialization
- Reads initial state from URL on mount
- Updates URL on filter change (auto) or apply (manual)
- Supports `urlPrefix` for namespaced params (e.g., `filter_category`)

## Accessibility

- Filter bar: `role="search"` or `role="form"` with `aria-label="Filters"`
- Each filter control: `<label>` with `for` pointing to control id
- Active filter tags: `role="list"` with `role="listitem"`, each tag has `aria-label="Remove filter: {label}: {value}"`
- Clear all button: `aria-label="Clear all filters"`
- Filter drawer (responsive): `role="dialog"` with `aria-modal="true"`
- Keyboard: Tab through controls and tags; Backspace/Delete on focused tag removes it
- Screen reader announces filter count: "3 filters active"
- Manual mode: Apply button has `aria-label="Apply filters"`, Reset has `aria-label="Reset filters"`

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| >1024px | Horizontal filter bar with all controls visible; tags below |
| 768-1024px | Filter controls wrap to 2-3 columns; compact mode suggested |
| <768px | Controls stack vertically; bar hides behind "Filters" toggle button; tags shown inline |
| <480px | Collapse to bottom drawer; tags roll up into "Filters" button count badge |

## Animation Rules

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Tag enter | 200ms | ease-out | Filter value added |
| Tag exit | 150ms | ease-in | Filter removed |
| Filter bar slide (responsive) | 250ms | ease-out | Toggle filter visibility |
| Drawer open (mobile) | 300ms | ease-out | Filter button click |
| Apply button pulse | 200ms | ease | Filter applied in manual mode |
| Clear all stagger | 100ms (staggered) | ease | Clear all click |

## Future Expansion

- Saved filter presets (name + save/load/delete)
- Grouped filters (logical AND/OR between groups)
- Filter operator selection (contains, equals, greater than, etc.)
- Date presets ("Last 7 days", "This month", "Custom range")
- Filter count indicator per filter (e.g., "Category (12)")
- Dependent/cascading filters (e.g., Country → City)
- Export/import filter configurations

## Dependencies

- React 18+
- `@mrego/input`
- `@mrego/select`
- `@mrego/date-picker`
- `@mrego/toggle`
- `@mrego/button`
- `@mrego/tag`
- `@mrego/icons` (x-close, filter, chevron-down)
- `@mrego/theme`
- `react-router` or `next/navigation` (for URL sync)
- `use-debounce` (for text filter debounce)

## Related Components

| Component | Relationship |
|-----------|-------------|
| Table | Receives filtered data; filters control which rows are visible |
| DataGrid | Integrated filter bar within DataGrid toolbar |
| Pagination | Pagination state resets when filters change |
| Sorting | Works alongside filters to refine dataset |
| Tag | Used as the active filter tag component |

## Anti-patterns

- **No feedback on zero results:** Show "No results match your filters" with a Clear All action
- **Auto-apply without debounce:** Text input should debounce by 300ms to avoid rapid re-fetches
- **Losing filter state on navigation:** Either sync with URL or persist in a state store; never reset on navigation
- **Over-filtering:** Allow users to see how many results match each filter option (counts)
- **Mixed mode behavior:** Don't show Apply button in auto mode or hide it in manual mode
- **Missing validation feedback:** Date ranges with start > end should show inline validation error
- **Too many visible filters:** Collapse behind "More filters" or use the responsive drawer pattern

## Performance Notes

- Debounce text filter onChange by 300ms before propagating
- Memoize filter definition array to avoid unnecessary re-renders of all controls
- Use `React.memo` on each FilterControl component
- URL sync should use `history.replaceState` (not `pushState`) to avoid polluting browser history
- For large filter option lists in Select, virtualize the dropdown options
- Batch filter changes: if multiple filters update in quick succession, batch the onChange callback
- Avoid re-computing active tags on every render — derive from filter values with a memoized selector
- Filter validation should run only on changed filter, not the entire set
