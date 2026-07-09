# Pagination

## Purpose
Navigate through pages of data by splitting large datasets into discrete, manageable chunks. Provides users with page-level navigation and page size control.

## Responsibilities
- Display page numbers with current page highlighted
- Provide Previous / Next navigation buttons
- Offer compact mode: "Page X of Y" with only Prev/Next
- Support load-more variant ("Show more" button)
- Render page size selector with configurable options
- Disable Previous on first page, Next on last page
- Emit page change and page size change events
- Show ellipsis for large page ranges
- Persist current page and page size state

## Composition
```
Pagination
├── PreviousButton
├── PageNumberList (standard variant only)
│   ├── PageNumber (×N)
│   ├── PageEllipsis (×N, when pages > threshold)
│   └── CurrentPageIndicator
├── CompactInfo (compact variant: "Page 3 of 12")
├── NextButton
├── PageSizeSelector (optional dropdown)
└── LoadMoreButton (load-more variant)
```

## Hierarchy
- **Parent:** Table, DataGrid, List, search results, any paginated content
- **Children:** Button, Select, Typography

## Props Contract (TypeScript)

```typescript
interface PaginationProps {
  variant?: 'standard' | 'compact' | 'load-more';
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  showTotalItems?: boolean;
  siblingCount?: number; // number of sibling pages to show around current
  boundaryCount?: number; // number of boundary pages at start/end
  disabled?: boolean;
  loading?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onLoadMore?: () => void;
  loadMoreLabel?: string;
  loadingLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  classNames?: Partial<Record<'pagination' | 'button' | 'active' | 'ellipsis', string>>;
  hideOnSinglePage?: boolean;
}

interface PageSizeOption {
  value: number;
  label: string;
}
```

## Variants

| Variant | Description |
|---------|-------------|
| **standard** | Numbered page buttons with Prev/Next, ellipsis for large ranges, current page highlighted |
| **compact** | Prev/Next only with "Page X of Y" label; minimal footprint for tight spaces |
| **load-more** | Single "Show more" button appended below content; appends items rather than replacing page |

## States

| State | Visual | Behavior |
|-------|--------|----------|
| Default | Active page highlighted (primary fill), others outlined | All controls interactive |
| Hover (page) | Background shift (neutral-100) | Indicates clickable |
| Active/Current | Primary background, white text | Current page number |
| Disabled (edge) | Reduced opacity Prev/Next | First/last page reached |
| Loading (load-more) | Button shows spinner | Prevents double-click |
| Empty / single page | Hidden (hideOnSinglePage) | No pagination rendered |
| Focused | Focus ring on current element | Keyboard navigation |

## Page Range Calculation

```
Pages to show: [1, ..., current - sibling, current, current + sibling, ..., last]
Example (current=6, total=20, sibling=1, boundary=1):
[1, ..., 5, 6, 7, ..., 20]
```

## Accessibility

- `nav` element with `aria-label="Pagination"`
- Page buttons use `aria-label` (e.g., "Page 3", "Go to page 3")
- Current page: `aria-current="page"` on active button
- Previous / Next: `aria-label="Go to previous page"` / `aria-label="Go to next page"`
- Disabled buttons: `aria-disabled="true"` (do not remove from DOM)
- Page size selector: `<select>` with `aria-label="Items per page"`
- Load more: `aria-label="Load more items"` with `aria-busy` during loading
- Keyboard: Tab through controls, Enter/Space to activate, Arrow keys when focus is inside button group
- Screen reader announces on page change: "Page 5 of 20" or "Loaded 50 more items"

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| >768px | Standard variant with all page numbers visible |
| 480-768px | Compact variant forced; or standard with reduced sibling count (sibling=0) |
| <480px | Compact variant forced; page size selector moves to top of content |

## Animation Rules

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Page button active switch | 150ms | ease | Page change |
| Content fade in/out | 200ms | ease | Page transition (parent) |
| Load more spinner | 800ms loop | linear | Loading state |
| Page size dropdown open | 150ms | ease-out | Dropdown toggle |

## Future Expansion

- Infinite scroll variant (auto-load on scroll to bottom)
- Jump-to-page input field (direct page number entry)
- Page range display ("Showing 1-20 of 156 results")
- Keyboard shortcut: Left/Right arrows for prev/next page
- Fetch pages on hover (prefetch for performance)
- URL-synced page state

## Dependencies

- React 18+
- `@mrego/theme`
- `@mrego/button`
- `@mrego/select` (for page size selector)
- `@mrego/icons` (chevron-left, chevron-right, spinner)

## Related Components

| Component | Relationship |
|-----------|-------------|
| Table | Uses Pagination for page-based data navigation |
| DataGrid | Optional pagination when virtual scroll is disabled |
| List | Pagination for long lists |
| Filters | Page state should reset when filters change |

## Anti-patterns

- **Hiding on single page without option:** Always provide `hideOnSinglePage` — many apps need to show pagination even with 1 page for consistency
- **Zero-index vs one-index confusion:** Clearly expose whether `currentPage` is 0-indexed or 1-indexed in docs; recommend 1-indexed for UX
- **Page size without persistence:** Remember page size preference across sessions (localStorage)
- **Resetting page on every interaction:** Only reset to page 1 when filters/sort change, not on re-render
- **No loading state on page change:** Show a brief loading indicator to signal data fetch
- **Too many visible pages:** Use ellipsis for >7 pages to avoid visual noise

## Performance Notes

- Avoid re-rendering parent content's pagination controls on every page change — lift state up
- Page size options should be static arrays, not created inline on every render
- For `load-more` variant, accumulate data rather than appending the entire dataset at once
- Debounce page size change if it triggers a data fetch to avoid rapid-fire requests
- Memoize the computed page range array to avoid recalculation on unrelated re-renders
- Use `React.memo` on Pagination component, especially when used inside scrollable containers
