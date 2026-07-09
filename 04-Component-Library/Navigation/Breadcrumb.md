# Breadcrumb

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Accessibility.md](../../02-Design-Language/Accessibility.md), [Responsive-System.md](../../02-Design-Language/Responsive-System.md), [Motion-System.md](../../02-Design-Language/Motion-System.md))

---

## Purpose

Hierarchical location indicator showing the user's current position within the application. Provides navigable links for parent sections with chevron separators. Home icon represents the root level. Current page is bold and non-interactive.

---

## Responsibilities

- Display breadcrumb trail from root to current page
- Render home icon as first item
- Separate items with chevron icons
- Make intermediate items clickable links
- Render current/last item as bold text (not a link)
- Collapse items when trail exceeds 4 levels
- Show overflow indicator ("...") with dropdown for collapsed items
- Provide `aria-label="Breadcrumb"` for screen readers

---

## Composition

```
Breadcrumb
├── BreadcrumbItem (Home — icon)
│   └── Icon (home)
├── ChevronSeparator
├── BreadcrumbItem (Section)
│   └── Link
├── ChevronSeparator
├── BreadcrumbItem (Sub-section)
│   └── Link
├── ChevronSeparator
└── BreadcrumbItem (Current)
    └── Text (bold)
```

---

## Hierarchy

| Component | Parent | Children |
|-----------|--------|----------|
| Breadcrumb | Topbar, PageHeader | BreadcrumbItem |

---

## Props Contract (TypeScript)

```typescript
export interface BreadcrumbProps {
  /** Ordered array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Max items before collapsing (default 4) */
  maxItems?: number;
  /** Collapse strategy */
  collapseStrategy?: 'none' | 'truncate-start' | 'truncate-middle' | 'truncate-end';
  /** Separator icon override */
  separator?: React.ReactNode;
  /** Home icon override */
  homeIcon?: React.ReactNode;
  /** Whether to show home icon */
  showHome?: boolean;
  /** Accessibility label */
  ariaLabel?: string;
  /** Styling */
  className?: string;
  style?: React.CSSProperties;
  /** Testing */
  dataTestId?: string;
}

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Route path (omit or null for current page) */
  to?: string | null;
  /** Icon before label */
  icon?: React.ReactNode;
  /** Whether this item is disabled */
  isDisabled?: boolean;
  /** Custom onClick */
  onClick?: () => void;
}
```

---

## Variants

| Variant | Description |
|---------|-------------|
| `default` | Standard breadcrumb with chevron separators, home icon, bold current page |
| `with-back` | Includes a back arrow button before home icon (mobile) |
| `small` | Reduced font size (12px/14px) for dense layouts |
| `dropdown` | Items with children show dropdown on hover/click |

---

## States

| State | Description |
|-------|-------------|
| Default | All items visible, separators between them |
| Collapsed | Overflow hidden behind "..." dropdown when > maxItems |
| Hover | Link items change color/underline on hover |
| Current | Bold text, not clickable, different color |
| Disabled | Clickable items with `isDisabled: true` are dimmed, not interactive |

---

## Accessibility

### Landmarks
- `nav` element with `aria-label="Breadcrumb"`

### ARIA
| Attribute | Target | Condition |
|-----------|--------|-----------|
| `aria-label="Breadcrumb"` | `<nav>` | Always |
| `aria-current="page"` | Current breadcrumb item | Always on last item |
| `role="list"` | `<ol>` container | Always |
| `role="listitem"` | Each breadcrumb item | Always |
| `aria-label` | Each link | When label alone is insufficient |

### Keyboard
| Key | Action |
|-----|--------|
| Tab | Navigate through breadcrumb links |
| Enter | Activate breadcrumb link |
| Escape | Close overflow dropdown (if open) |

### Focus
- 2px focus ring on all links
- Focus visible on collapsed items dropdown trigger
- Focus order matches visual order (left to right)

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024px+) | Full breadcrumb trail visible. Up to 4+ items. |
| Tablet (768-1023px) | Max 3-4 items visible. Items collapse into "..." dropdown. |
| Mobile (320-767px) | Max 2-3 items. Often collapsed to just parent + current. Back button shown. |

### Responsive Implementation Notes
- `maxItems` adjusts automatically with container width via ResizeObserver
- On mobile, breadcrumb may be replaced by page title in Topbar
- Truncation shows "..." with tooltip or dropdown of hidden items
- Back button variant appears only on mobile

---

## Animation Rules

| Transition | Duration | Easing | Notes |
|------------|----------|--------|-------|
| Item appear | 100ms | ease-out | Opacity fade in on expand |
| Item disappear | 80ms | ease-in | Opacity fade out on collapse |
| Separator rotation | 100ms | ease-out | In dropdown mode |

- Respect `prefers-reduced-motion`: disable fade animations
- No animations on initial render — only on collapse/expand interactions

---

## Future Expansion

| Extension | Description | Priority |
|-----------|-------------|----------|
| Dropdown per item | Click parent to navigate to sibling pages | Medium |
| Async breadcrumb | Load breadcrumb items from route config or API | Low |
| Custom separator per level | Different separators for different hierarchy levels | Low |
| Breadcrumb for dialogs | Breadcrumb inside modal/page drawer | Low |

---

## Dependencies

| Dependency | Type | Reason |
|------------|------|--------|
| Icon | Component | Home icon, chevron separator |
| Tooltip | Component | Truncated item labels |
| Dropdown | Component | Collapsed items overflow |
| useContainerWidth | Hook | Responsive maxItems |

---

## Related Components

| Component | Relation |
|-----------|----------|
| Topbar | Parent — Breadcrumb lives inside Topbar |
| PageHeader | Alternative — can host Breadcrumb |
| Tabs | Sibling — tabs are horizontal navigation within a section, breadcrumb shows hierarchy |

---

## Anti-patterns

| Anti-pattern | Why |
|--------------|-----|
| Making current page a link | Users expect current page to be non-interactive label |
| Omitting home icon | Users need a clear way to navigate to root |
| Using breadcrumb as primary navigation | Breadcrumb is supplementary — use Sidebar/Tabs for primary nav |
| Over 5 items without collapsing | Breadcrumb becomes unreadable |
| Clicking breadcrumb navigates but user loses form state | Confirm navigation if unsaved changes exist |
| Using breadcrumb for flat pages (no hierarchy) | Breadcrumb implies hierarchy — use page title for flat pages |

---

## Performance Notes

- Breadcrumb is lightweight — no significant performance concerns
- Use `React.memo` to avoid re-render on unrelated state changes
- Collapsed items dropdown should lazy-render
- ResizeObserver for dynamic maxItems should be debounced (200ms)
