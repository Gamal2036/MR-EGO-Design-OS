# Tabs

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Accessibility.md](../../02-Design-Language/Accessibility.md), [Responsive-System.md](../../02-Design-Language/Responsive-System.md), [Motion-System.md](../../02-Design-Language/Motion-System.md))

---

## Purpose

Section-level navigation that switches between related content panels. Provides horizontal tab bar with four visual variants. Supports overflow scrolling when tabs exceed container width. Paired with TabPanel for accessible tab content management.

---

## Responsibilities

- Render horizontal list of tab labels
- Indicate active tab with variant-specific visual treatment
- Support scrollable overflow when tabs exceed container width
- Manage tab selection state (controlled and uncontrolled)
- Lazy-load TabPanel content (only render active panel)
- Provide full ARIA tab pattern (`role="tablist"`, `role="tab"`, `role="tabpanel"`)

---

## Composition

```
Tabs
├── TabList (role="tablist")
│   ├── Tab (role="tab") — active
│   ├── Tab (role="tab")
│   ├── Tab (role="tab")
│   ├── ScrollLeftButton (overflow)
│   └── ScrollRightButton (overflow)
└── TabPanel (role="tabpanel")
    └── Content
```

---

## Hierarchy

| Component | Parent | Children |
|-----------|--------|----------|
| Tabs | Page section | TabPanel |
| TabPanel | Tabs | Any content |

---

## Props Contract (TypeScript)

```typescript
export interface TabsProps {
  /** Array of tab definitions */
  tabs: TabItem[];
  /** Controlled active tab value */
  value?: string;
  /** Default active tab value (uncontrolled) */
  defaultValue?: string;
  /** Tab change callback */
  onChange?: (value: string) => void;

  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'underline' | 'pill';

  /** Tab size */
  size?: 'sm' | 'md' | 'lg';

  /** Orientation */
  orientation?: 'horizontal' | 'vertical';

  /** Enable scrollable overflow */
  scrollable?: boolean;
  /** Auto-collapse to dropdown on overflow */
  collapseOnOverflow?: boolean;

  /** Lazy load tab panels */
  lazy?: boolean;
  /** Keep destroyed tabs mounted (for caching) */
  keepAlive?: boolean;

  /** Render tab panel content */
  renderPanel: (tab: TabItem, isActive: boolean) => React.ReactNode;

  /** Accessibility */
  ariaLabel?: string;

  /** Styling */
  className?: string;
  style?: React.CSSProperties;

  /** Testing */
  dataTestId?: string;
}

export interface TabItem {
  /** Tab identifier (must be unique) */
  value: string;
  /** Display label */
  label: React.ReactNode;
  /** Icon before label */
  icon?: React.ReactNode;
  /** Badge/text to display */
  badge?: string | number;
  /** Disabled state */
  isDisabled?: boolean;
  /** Hidden (not rendered) */
  isHidden?: boolean;
  /** Additional aria label */
  ariaLabel?: string;
}
```

---

## Variants

| Variant | Description |
|---------|-------------|
| `primary` | Active tab has bottom underline accent. Clean, minimal. |
| `secondary` | Active tab has filled background with rounded corners. |
| `underline` | Only active tab has bottom border. Minimal style. No background. |
| `pill` | Active tab has fully rounded pill background. Tabs look like toggle buttons. |

---

## States

| State | Description |
|-------|-------------|
| Default | Inactive tab, neutral styling. |
| Active | Tab is selected. Visual treatment depends on variant. `aria-selected="true"`. |
| Hover | Background tint change on non-active tabs. 50ms. |
| Focus | 2px focus ring on tab. Visible at all times. |
| Disabled | Tab is dimmed, not interactive. `aria-disabled="true"`. |
| Scroll overflow | Left/right scroll buttons visible when tabs overflow container. |
| Overflow dropdown | "More" dropdown for overflow items (when `collapseOnOverflow` is true). |

---

## Accessibility

### Landmarks
- Tab list has `role="tablist"` — not a navigation landmark

### ARIA
| Attribute | Target | Condition |
|-----------|--------|-----------|
| `role="tablist"` | Tab container | Always |
| `role="tab"` | Each tab button | Always |
| `role="tabpanel"` | Content panel | Always |
| `aria-selected` | Tab | `"true"` on active tab, `"false"` on others |
| `aria-controls` | Tab | References the tabpanel ID |
| `aria-labelledby` | TabPanel | References the tab ID |
| `aria-orientation` | TabList | `"horizontal"` (default) or `"vertical"` |
| `aria-disabled` | Tab | When `isDisabled` is true |
| `aria-label` | TabList | When additional context needed |

### Keyboard
| Key | Action |
|-----|--------|
| Tab | Move focus into tablist, then to next focusable element after tablist |
| Left Arrow | Move focus to previous tab (horizontal) |
| Right Arrow | Move focus to next tab (horizontal) |
| Up Arrow | Move focus to previous tab (vertical) |
| Down Arrow | Move focus to next tab (vertical) |
| Home | Move focus to first tab |
| End | Move focus to last tab |
| Enter/Space | Activate focused tab |

### Focus
- Tabs use roving tabindex: only active tab is tabbable (`tabindex="0"`), others are `tabindex="-1"`
- Focus moves with arrow keys within the tablist
- Focus stays on tab when switching (does not move to panel)
- TabPanel receives focus only when programmatically required

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024px+) | All tabs visible. Scrollable overflow if needed. |
| Tablet (768-1023px) | Tabs scrollable. Left/right scroll buttons visible. |
| Mobile (320-767px) | Tabs scrollable. Swipe to scroll. Active tab centered on select. |

### Responsive Implementation Notes
- `scrollable` defaults to `true` on tablet and mobile
- Scroll buttons appear when container overflows (use `IntersectionObserver` on last tab)
- On mobile, tabs should be swipeable with momentum scrolling
- Active tab auto-centers in scrollable container on selection

---

## Animation Rules

| Transition | Duration | Easing | Notes |
|------------|----------|--------|-------|
| Active indicator (primary) | 200ms | ease-out | Underline slides to new position |
| Background fill (secondary) | 150ms | ease-out | Background color transition |
| Tab content fade | 150ms | ease-out | TabPanel content cross-fade |
| Scroll button appear | 100ms | ease-out | Opacity |

- Respect `prefers-reduced-motion`: disable indicator slide, instant content switch
- Indicator animation uses `transform: translateX()` for performance

---

## Future Expansion

| Extension | Description | Priority |
|-----------|-------------|----------|
| Draggable tabs | Reorder tabs by drag | Low |
| Closable tabs | X button on each tab (browser-style) | Medium |
| Tab context menu | Right-click on tab for options | Low |
| Add tab button | Dynamic tab creation | Low |
| Vertical tabs on sidebar | Vertical orientation for sidebar use | Medium |

---

## Dependencies

| Dependency | Type | Reason |
|------------|------|--------|
| TabPanel | Internal | Content panel component |
| Icon | Component | Scroll arrows, tab icons |
| Badge | Component | Tab badge display |
| useRovingTabIndex | Hook | Keyboard navigation pattern |
| useOverflowDetection | Hook | Scroll button visibility |

---

## Related Components

| Component | Relation |
|-----------|----------|
| Sidebar | Alternative — global nav vs section nav |
| Breadcrumb | Complementary — shows hierarchy while Tabs show siblings |
| Dropdown | Overflow collapse — "More" dropdown for hidden tabs |

---

## Anti-patterns

| Anti-pattern | Why |
|--------------|-----|
| Nesting Tabs inside TabPanel | Deep tab nesting confuses users — max 1 level |
| Using Tabs for primary navigation | Tabs are for section-level nav, not global nav |
| Too many tabs (>10) | Consider grouping or sidebar navigation |
| Disabled tab with no explanation | Add tooltip explaining why tab is disabled |
| Changing tab content without transition | Jarring — use at least 150ms cross-fade |
| Mixing variants within same TabList | All tabs must use the same variant |
| Tab content broken on initial load when lazy | Always render active tab content eagerly |

---

## Performance Notes

- Use `lazy` prop to defer non-active tab rendering
- `keepAlive` with `display: none` for cached but hidden panels instead of unmounting
- Roving tabindex eliminates re-renders on focus changes
- Scroll overflow detection uses `IntersectionObserver` (not resize handlers)
- Tab panel content should avoid heavy computations until active
