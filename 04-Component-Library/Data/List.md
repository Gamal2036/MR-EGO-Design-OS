# List

## Purpose
Display a vertical collection of items in a consistent, scannable layout. Supports avatars, icons, badges, actions, and checkable items with configurable density.

## Responsibilities
- Render a homogeneous list of items with consistent spacing
- Support multiple item layouts: basic, with-avatar, with-icon, with-badge, with-actions, checkable
- Provide three density tiers: compact (40px), standard (48px), comfortable (56px)
- Handle empty, loading, and error states
- Emit item click, action click, and check change events
- Support keyboard navigation between items

## Composition
```
List
├── ListItem (×N)
│   ├── ListItemCheckbox (when checkable)
│   ├── ListItemAvatar (with-avatar variant)
│   ├── ListItemIcon (with-icon variant)
│   ├── ListItemContent
│   │   ├── ListItemTitle
│   │   └── ListItemDescription (optional)
│   ├── ListItemBadge (with-badge variant)
│   └── ListItemActions (with-actions variant)
│       ├── ActionButton (×N, ≤3)
│       └── OverflowMenu (when >3 actions)
├── ListEmptyState
├── ListLoadingSkeleton
└── ListDivider (optional, between items)
```

## Hierarchy
- **Parent:** Sidebar, settings panel, notification drawer, dropdown menu
- **Children:** Button, Checkbox, Avatar, Icon, Badge, Typography

## Props Contract (TypeScript)

```typescript
interface ListProps<T extends ListItemData> {
  data: T[];
  variant?: 'basic' | 'with-avatar' | 'with-icon' | 'with-badge' | 'with-actions' | 'checkable';
  density?: 'compact' | 'standard' | 'comfortable';
  dividers?: boolean;
  loading?: boolean;
  skeletonCount?: number;
  emptyMessage?: string;
  emptyAction?: { label: string; onClick: () => void };
  selectedId?: string;
  onItemClick?: (item: T) => void;
  onItemDoubleClick?: (item: T) => void;
  onCheckChange?: (checkedIds: string[]) => void;
  checkedIds?: string[];
  checkPosition?: 'left' | 'right';
  maxActions?: number;
  classNames?: Partial<Record<'list' | 'item' | 'content' | 'title' | 'description', string>>;
}

interface ListItemData {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  avatar?: string;
  badge?: string | number;
  badgeVariant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  actions?: ListAction[];
  disabled?: boolean;
  selected?: boolean;
  data?: Record<string, unknown>;
}

interface ListAction {
  id: string;
  label: string;
  icon?: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}
```

## Item Height Map

| Density | Item Height | Font Size | Padding |
|---------|-------------|-----------|---------|
| compact | 40px | 14px | 8px 12px |
| standard | 48px | 16px | 12px 16px |
| comfortable | 56px | 16px | 16px 20px |

## Variants

| Variant | Description |
|---------|-------------|
| **basic** | Title only (with optional description) |
| **with-avatar** | Circular avatar left of content |
| **with-icon** | Icon left of content |
| **with-badge** | Badge/count right-aligned in content area |
| **with-actions** | Action buttons + overflow menu on right |
| **checkable** | Checkbox on left (or right via `checkPosition`) |

## States

| State | Visual | Behavior |
|-------|--------|----------|
| Default | Normal background | All items interactive |
| Hover (item) | Background shift (neutral-50) | Cursor pointer |
| Active/Click | Brief press effect (neutral-100) | onItemClick fires |
| Selected | Primary-50 background + left border accent | Remains selected |
| Checked | Checkbox filled | Visual check indicator |
| Disabled (item) | 50% opacity | No hover or click |
| Loading | Skeleton blocks (3-5) | Skeleton pulse animation |
| Empty | Centered icon + description + optional CTA | — |
| Focused | Focus ring on item | Keyboard navigation |

## Accessibility

- `role="list"` on container; `role="listitem"` on each item
- `aria-selected` on selected items
- `aria-checked` on checkable items
- `aria-disabled` on disabled items
- Items with actions use `role="group"` with `aria-label`
- `tabindex="0"` on interactive items; `tabindex="-1"` on non-interactive
- Keyboard: Arrow Up/Down to navigate, Enter/Space to activate, Tab to move to action buttons within item
- Screen reader announces position (e.g., "Item 3 of 12") and item state

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| >768px | Full variant as specified; actions visible |
| <768px | Actions collapse to overflow menu; avatars and icons reduced to 32px |
| <480px | Force `compact` density; hide descriptions; actions become swipe-to-reveal |

## Animation Rules

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Item enter/exit | 200ms | ease | Add/remove items |
| Item reorder | 250ms | ease-in-out | Drag reorder |
| Checkbox toggle | 150ms | ease | Check change |
| Hover highlight | 100ms | ease | Mouse enter/leave |
| Skeleton pulse | 1.5s loop | ease-in-out | Loading state |

## Future Expansion

- Drag-and-drop reordering
- Swipe-to-reveal actions (touch devices)
- Multi-select with Shift+click range selection
- Virtual scrolling for long lists (>500 items)
- Nested list items (with expand/collapse, subtle distinction from TreeView)
- Pull-to-refresh for mobile lists

## Dependencies

- React 18+
- `@mrego/icons`
- `@mrego/theme`
- `@mrego/checkbox`
- `@mrego/avatar`
- `@mrego/badge`

## Related Components

| Component | Relationship |
|-----------|-------------|
| TreeView | For hierarchical data — nested lists with expand/collapse |
| Table | Tabular data with multiple columns per row |
| Dropdown | Uses List internally for menu items |
| Select | Uses List variant for options display |
| Accordion | Expandable sections, alternative for grouped items |
| Pagination | Used with List for page-based browsing |

## Anti-patterns

- **Too many actions visible:** Limit to 3 visible actions per item; overflow to "..." menu
- **Mixed variants in one list:** All items in a List should share the same variant for visual consistency
- **ListItem without id:** Stable keys required for selection, reorder, and diffing
- **Long titles without truncation:** Title and description must truncate with ellipsis at one line
- **Nested interactive elements:** Avoid Button inside clickable ListItem — use actions variant instead
- **Missing overflow state:** Items with actions must handle overflow gracefully on narrow screens

## Performance Notes

- Use `React.memo` on ListItem with a custom comparator based on item data
- For dynamic lists, provide stable `key` props — never use array index
- For >200 items, consider pagination or virtual scrolling
- Avoid re-creating action callback arrays on every render; use `useCallback` or stable refs
- Skeleton count should match expected item count (default 5) to avoid layout bounce
- Debounce onItemClick if it triggers expensive operations to prevent double-fire
