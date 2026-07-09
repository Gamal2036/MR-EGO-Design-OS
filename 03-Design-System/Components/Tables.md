# Tables

**Phase:** DP-2 (Design System)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md), [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md), [Layout-Principles.md](../../02-Design-Language/Layout-Principles.md))

---

## Purpose

Tables present structured data in rows and columns for efficient scanning, comparison, and analysis. They are the primary pattern for data-dense interfaces — job listings, documents, contacts, audit logs, and analytics.

---

## When to Use

- Displaying structured data with multiple attributes per record
- Comparing values across rows and columns
- Data that benefits from sorting, filtering, and column visibility control
- Administrative interfaces and data management views
- Exportable and printable data sets

## When NOT to Use

- Simple lists with 1-3 attributes — use card lists or simple lists
- Visual content (profiles, previews) — use card layouts
- Hierarchical data — use tree view or nested list
- Small data sets (under 5 items) — use list or card layout

---

## Variants

### Standard Data Table

Full-featured table for enterprise data management.

| Property | Value |
|----------|-------|
| Header height | 44px |
| Row height | 48px (default), 40px (compact) |
| Cell padding | 12px 16px |
| Border | Row dividers (Border-Default, 1px) |
| Header background | Surface-2 |
| Header text | Label token (14px/500), Text-Secondary |
| Body text | Body (15px), Text-Body |
| Hover | Neutral-50 background |
| Selected | Primary-50 background |
| Border radius | 0px (max density) |
| Container | Full width, horizontal scroll for overflow |

### Compact Table

Higher density for data-heavy views.

| Property | Value |
|----------|-------|
| Row height | 36px |
| Cell padding | 8px 12px |
| Font size | Body-Small (14px) |
| Header height | 36px |
| Usage | Dense dashboards, admin panels, logs |

### Sortable Table

Interactive sorting by column.

| Element | Specification |
|---------|---------------|
| Sort trigger | Click column header |
| Indicator | Chevron up/down icon in header |
| Active sort | Primary-500 text on sorted column header |
| Multi-sort | Shift+click adds secondary sort (indicated by number 1, 2) |
| Reset | Click active sorted column to cycle asc/desc/none |

### Filterable Table

Column-level and global filtering.

| Element | Specification |
|---------|---------------|
| Global filter | Text input above table (local search) |
| Column filter | Dropdown or input in header row |
| Active filter | Filter icon + chip showing active filters |
| Clear filters | "Clear filters" link when any filter is active |
| Filtered rows | Only matching rows visible, count updated |

### Selectable Table

Row selection for batch operations.

| Element | Specification |
|---------|---------------|
| Selection column | Checkbox column, first or last |
| Select all | Header checkbox selects/deselects all visible rows |
| Select range | Shift+click to select range of rows |
| Bulk action bar | Appears when rows selected, shows count + actions |
| Selected visual | Primary-50 background, checkmark in checkbox |

### Bulk Actions

Operations on multiple selected rows.

| Element | Specification |
|---------|---------------|
| Trigger | 1+ rows selected |
| Position | Floating bar above table (below header) or below selection count |
| Actions | Delete, Archive, Export, Tag, Assign |
| Count | "3 selected" text |
| Clear | "Clear selection" link or Esc |
| Animation | Slide down 200ms Ease-Out |

---

## Table Anatomy

```
┌─────────────────────────────────────────────────────┐
│  [Global Search]                        [Column options] │
├─────────────────────────────────────────────────────┤
│  ☐  Name         Role        Status    Actions       │
├─────────────────────────────────────────────────────┤
│  ☐  Jane Smith   Designer    Active    [✎] [🗑]       │
│  ☐  John Doe     Engineer    Active    [✎] [🗑]       │
│  ☐  Alice Wu     PM          Inactive  [✎] [🗑]       │
├─────────────────────────────────────────────────────┤
│  1-3 of 12                     [<] [1] [2] [...] [>] │
└─────────────────────────────────────────────────────┘
```

---

## Spacing

| Context | Value | Token |
|---------|-------|-------|
| Cell horizontal padding | 16px | Space-5 |
| Cell vertical padding (standard) | 12px | Space-4 |
| Cell vertical padding (compact) | 8px | Space-3 |
| Between columns | 0px (padding handles spacing) | — |
| Header to first row | 0px (adjacent) | — |
| Table to pagination | 16px | Space-5 |
| Bulk action bar padding | 12px 16px | Space-4 Space-5 |

---

## States

| State | Visual |
|-------|--------|
| Default row | Surface-1 background |
| Hover row | Neutral-50 background |
| Selected row | Primary-50 background |
| Active cell | Neutral-100 background (inline edit) |
| Sorted column header | Primary-500 text, visible sort icon |
| Filtered column header | Filter icon visible |
| Disabled row | 0.4 opacity, muted text |
| Empty table | Empty state with illustration and action |

---

## Responsive Behavior

| Breakpoint | Change |
|------------|--------|
| Mobile (<768px) | Table collapses to card list. Each row becomes a card showing key fields. Actions always visible. |
| Tablet (768-1023px) | Horizontal scroll for wide tables. 4-5 most important columns visible. |
| Desktop (1024px+) | Full table. Column hiding available via column menu. |
| Ultra-wide (1600px+) | More columns visible by default. Comfortable density. |

### Card List (Mobile Alternative)

On mobile, each data row becomes a compact card:

```
┌──────────────────────────────────┐
│  Jane Smith                      │
│  Designer  ●  Active             │
│  [✎] [🗑]                         │
└──────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Card padding | 12px 16px |
| Key field | Heading-4 |
| Supporting fields | Body-Small, Text-Secondary |
| Spacing between cards | 8px |
| Horizontal rule between fields | 4px |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Table role | `<table>` with `<caption>` or `aria-label` |
| Header association | `<th>` with `scope="col"` or `scope="row"` |
| Sortable headers | `aria-sort="ascending"` / `descending` / `none"` |
| Selected rows | `aria-selected="true"` on `<tr>` |
| Bulk actions | `aria-live="polite"` for selection count updates |
| Sort button | `role="button"` on sortable header with `tabindex="0"` |
| Expandable row | `aria-expanded`, `aria-controls` |
| Pagination | `aria-label="Pagination"`, `aria-current="page"` |
| Scrollable | `tabindex="0"` on scrollable container |
| Cell association | Headers remain visible or use `aria-describedby` on scroll |

---

## Pagination

| Property | Standard | Compact |
|----------|----------|---------|
| Position | Below table | Below table |
| Items | Page numbers (5 visible + ellipsis) | Prev/Next + "Page X of Y" |
| Page size | Selectable (10/25/50/100) | Fixed |
| Total count | "1-10 of 247" | "Page 3 of 25" |
| Responsive | Compact on mobile | Same across sizes |

---

## Column Types

| Type | Alignment | Format | Example |
|------|-----------|--------|---------|
| Text | Left | Plain or with icon | Name, Description |
| Number | Right | Numeric with formatting | Salary, Count |
| Date | Left | Date format per locale | "Jan 15, 2026" |
| Currency | Right | $X,XXX.XX format | $84,500 |
| Status | Center | Badge + text | Active, Inactive |
| Actions | Right | Icon buttons | Edit, Delete |
| Avatar | Left | Circle avatar + text | Avatar + name |

---

## Future Expansion

- **Inline editing** — Click cell to edit, save on blur or Enter
- **Column reordering** — Drag column headers to reorder
- **Column pinning** — Pin first N columns to left on horizontal scroll
- **Tree table** — Hierarchical rows with expand/collapse
- **Row grouping** — Group rows by column value with summary
- **Export** — Download visible rows or all rows as CSV/Excel
- **Column presets** — Saved column visibility and ordering configurations
- **Server-side pagination** — Loading indicator on page change
- **Row details panel** — Click row to open detail drawer

---

## Related Components

- [Navigation.md](Navigation.md) — Pagination, column sorting
- [Search.md](Search.md) — Global table filter
- [Forms.md](Forms.md) — Column filters, inline editing
- [Cards.md](Cards.md) — Mobile card list pattern
- [Dialogs.md](Dialogs.md) — Row action confirmation dialogs
- [Loading.md](Loading.md) — Table skeleton loading
- [EmptyStates.md](EmptyStates.md) — Table empty state
