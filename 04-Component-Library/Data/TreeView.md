# TreeView

## Purpose
Display hierarchical data in an expandable/collapsible tree structure. Enables navigation, selection, and exploration of deeply nested datasets.

## Responsibilities
- Render a recursive tree from a nested data structure
- Expand/collapse nodes with arrow icon indicators
- Support node selection (single, multi with checkboxes)
- Display icons alongside node labels
- Provide lazy loading callback for deep/async trees
- Maintain focus and keyboard navigation within tree
- Manage indeterminate checkbox state for parent nodes
- Emit expand, collapse, select, and check events

## Composition
```
TreeView
├── TreeNode (×N, recursive)
│   ├── ExpandCollapseArrow
│   ├── NodeCheckbox (when checkbox variant)
│   ├── NodeIcon (when with-icons variant)
│   ├── NodeLabel
│   ├── NodeBadge (optional count/suffix)
│   └── TreeNode (children, recursive)
│       └── ...
└── EmptyState (when no nodes)
```

## Hierarchy
- **Parent:** Sidebar, file browser, navigation panel, category selector
- **Children:** Checkbox, Icon, Typography, Badge

## Props Contract (TypeScript)

```typescript
interface TreeViewProps<T extends TreeNodeData> {
  data: T[];
  variant?: 'standard' | 'checkbox' | 'with-icons';
  defaultExpandedIds?: string[];
  defaultSelectedIds?: string[];
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  checkedIds?: string[];
  onCheckChange?: (ids: string[]) => void;
  onExpand?: (nodeId: string) => void;
  onCollapse?: (nodeId: string) => void;
  onNodeClick?: (node: T) => void;
  onNodeDoubleClick?: (node: T) => void;
  lazyLoad?: (nodeId: string) => Promise<T[]>;
  showRoot?: boolean;
  indent?: number;
  nodeHeight?: number;
  filterFn?: (node: T, searchTerm: string) => boolean;
  searchTerm?: string;
  draggable?: boolean;
  onDrop?: (dragId: string, targetId: string, position: 'before' | 'after' | 'inside') => void;
  classNames?: Partial<Record<'tree' | 'node' | 'label' | 'icon', string>>;
}

interface TreeNodeData {
  id: string;
  label: string;
  children?: TreeNodeData[];
  icon?: string;
  disabled?: boolean;
  selectable?: boolean;
  badge?: string | number;
  data?: Record<string, unknown>;
  hasChildren?: boolean; // for lazy-load nodes with unknown children
  isLeaf?: boolean;
}

interface TreeNodeProps<T extends TreeNodeData> {
  node: T;
  depth: number;
  variant: TreeViewProps<T>['variant'];
  expanded: boolean;
  selected: boolean;
  checked: boolean | 'indeterminate';
  indent: number;
  onToggle: () => void;
  onSelect: () => void;
  onCheck: () => void;
  lazyLoad?: (nodeId: string) => Promise<T[]>;
  childrenNodes?: T[];
}
```

## Variants

| Variant | Description |
|---------|-------------|
| **standard** | Single-click selection, expand/collapse via arrow icons |
| **checkbox** | Multi-select via checkboxes; parent checkbox reflects indeterminate state |
| **with-icons** | Each node displays an icon preceding the label; selection via click |

## States

| State | Visual | Behavior |
|-------|--------|----------|
| Collapsed | Arrow points right | Children hidden |
| Expanded | Arrow points down | Children visible |
| Loading (lazy) | Spinner replaces arrow | Fetching children |
| Selected | Background highlight (primary-50) | Stays selected until another is chosen |
| Checked | Checkbox filled | Parent becomes indeterminate if partial |
| Indeterminate (checkbox) | Dash in checkbox | Represents partially checked children |
| Disabled (node) | Reduced opacity | No interaction possible |
| Empty | "No items" message | Tree shows empty state |
| Dragging | Ghost node follows cursor | Drop target highlighted |

## Accessibility

- `role="tree"` on root container; `role="treeitem"` on each node
- `aria-expanded="true|false"` on nodes with children
- `aria-selected` on selected nodes
- `aria-checked="true|false|mixed"` on checkbox variant nodes
- `aria-level` set to node depth (1-indexed)
- `aria-setsize` and `aria-posinset` for sibling context
- `aria-busy="true"` on node during lazy load
- Keyboard navigation: Arrow Up/Down between nodes, Arrow Right/Left expand/collapse, Enter/Space to select/check, Home/End jump to first/last, * on numpad expands all siblings
- Focus is trapped within tree nodes; Tab exits the tree
- Screen reader announces node label, level, expand state, and selection state

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| >768px | Full tree with indentation; horizontal scroll if depth > 6 |
| <768px | Reduced indent (16px → 12px); compact node height |
| <480px | Toggle to flat list with breadcrumb showing current path; drill-down navigation replaces expand/collapse |

## Animation Rules

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Expand children | 200ms | ease-out | Expand toggle |
| Collapse children | 150ms | ease-in | Collapse toggle |
| Node highlight | 100ms | ease | Selection change |
| Slide indent shift | 200ms | ease | Depth change on filter |
| Lazy load shimmer | 800ms loop | ease-in-out | Loading state |

## Future Expansion

- Drag-and-drop reordering between nodes
- Inline rename (double-click label)
- Virtual scrolling for trees with >1000 visible nodes
- Search with highlighted matches and auto-expand to results
- Multi-select via Ctrl/Shift-click with range selection
- Async tree with infinite scroll at each depth level
- Tree-to-list toggle view

## Dependencies

- React 18+
- `@mrego/icons` (chevron-right, chevron-down, folder, file, spinner)
- `@mrego/checkbox`
- `@mrego/theme`
- `react-beautiful-dnd` or `@dnd-kit` (for drag-and-drop)

## Related Components

| Component | Relationship |
|-----------|-------------|
| List | Flat alternative when data is not hierarchical |
| Accordion | Single-level expand/collapse sections, not recursive |
| DataGrid | For tabular data with optional grouping |
| Breadcrumb | Navigation aid for deep tree paths (responsive fallback) |

## Anti-patterns

- **Deeply nested without lazy loading:** Every level beyond 3 should use lazy loading; loading the full tree degrades performance
- **Overriding keyboard events:** Ensure Arrow keys, Home/End are reserved for tree navigation, not consumed by parent containers
- **Missing `isLeaf` flag:** Without it, the tree renders expand arrows for leaf nodes, confusing users
- **Non-recursive markup:** The TreeNode component must call itself; flat-mapped children break the tree pattern
- **Checkbox variant without indeterminate:** Parent nodes must always reflect partial selection of children
- **Using index as node ID:** Stable IDs are required for expand/collapse state persistence

## Performance Notes

- Memoize expanded, selected, and checked state maps as `Set<string>` for O(1) lookups
- Use `React.memo` on TreeNode to avoid re-rendering unchanged subtrees
- Lazy load threshold: any node with >50 children should lazy load
- For trees >5000 nodes, enable virtualization (`@tanstack/react-virtual`)
- filterFn should use a debounced search term (300ms) to avoid re-render on every keystroke
- Avoid inline arrow functions in render for expand/select handlers; use stable callbacks
- Collapse deep nodes before removing from DOM to preserve scroll position
