# SidebarItem

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Accessibility.md](../../02-Design-Language/Accessibility.md), [Responsive-System.md](../../02-Design-Language/Responsive-System.md), [Motion-System.md](../../02-Design-Language/Motion-System.md))

---

## Purpose

Single navigation entry within a Sidebar or SidebarGroup. Represents a link to a route or action with an icon, label, and optional badge. Provides visual feedback through active, hover, and disabled states with a left border indicator for the active item.

---

## Responsibilities

- Render icon + label for navigation destination
- Display active state with left border accent
- Show hover/focus/active/pressed states
- Support disabled state (not interactive, visually dimmed)
- Render optional badge (count, dot, or text)
- Emit click event for navigation or action
- Support tooltip when sidebar is collapsed (label hidden)
- Handle `aria-current="page"` for active item

---

## Composition

```
SidebarItem
├── Icon
├── LabelText
├── Badge (conditional)
│   ├── BadgeDot
│   ├── BadgeCount
│   └── BadgeText
└── LeftBorder (active indicator)
```

---

## Hierarchy

| Component | Parent | Children |
|-----------|--------|----------|
| SidebarItem | Sidebar, SidebarGroup | — (leaf — no children) |

SidebarItem is a leaf node in the navigation tree and does not contain nested children.

---

## Props Contract (TypeScript)

```typescript
export interface SidebarItemProps {
  /** Item label text */
  label: string;
  /** Route path or URL */
  to?: string;
  /** Click handler (when not a link) */
  onClick?: () => void;
  /** Icon component or element */
  icon?: React.ReactNode;

  /** Active state */
  isActive?: boolean;
  /** Disabled state */
  isDisabled?: boolean;
  /** Loading state */
  isLoading?: boolean;

  /** Badge configuration */
  badge?: {
    type: 'dot' | 'count' | 'text';
    value?: number | string;
    variant?: 'primary' | 'danger' | 'warning' | 'success';
  };

  /** Tooltip content (defaults to label when sidebar collapsed) */
  tooltip?: string;

  /** As a link when `to` is provided, as a button otherwise */
  as?: 'a' | 'button';

  /** Navigation target (opens in new tab) */
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;

  /** Accessibility */
  ariaLabel?: string;
  ariaDescribedBy?: string;

  /** Styling */
  className?: string;
  style?: React.CSSProperties;

  /** Testing */
  dataTestId?: string;
}
```

---

## Variants

| Variant | Description |
|---------|-------------|
| `default` | Standard item with icon + label. Left border on active. |
| `compact` | Reduced padding and font size for dense sidebars |
| `icon-only` | Only icon visible, label shown as tooltip (collapsed sidebar mode) |
| `danger` | Red accent for destructive actions (logout, delete) |

---

## States

| State | Description |
|-------|-------------|
| Default | Neutral background, icon + label visible. |
| Hover | Lighter background tint, cursor pointer. 50ms transition. |
| Focus | 2px ring around item, visible at all times. |
| Active (pressed) | Slightly darker background than hover. 50ms. |
| Active (selected) | Left border accent (3px), bolder label, highlighted icon. `aria-current="page"`. |
| Disabled | Reduced opacity (0.4). No hover/focus/active states. Cursor not-allowed. |
| Loading | Skeleton placeholder replacing icon/text. Not interactive. |
| With badge | Badge dot/count/text displayed after label. Overflow ellipsis on count > 99. |

---

## Accessibility

### Landmarks
- SidebarItem is a list item within the navigation landmark

### ARIA
| Attribute | Target | Condition |
|-----------|--------|-----------|
| `aria-current="page"` | The item element | When `isActive` is true |
| `aria-disabled` | The item element | When `isDisabled` is true |
| `aria-label` | The item element | When icon-only mode (collapsed) or custom label needed |
| `aria-describedby` | The item element | For additional context |
| `aria-busy` | The item element | When `isLoading` is true |
| `role="listitem"` | Container | When parent has `role="list"` |

### Keyboard
| Key | Action |
|-----|--------|
| Tab | Navigate to item |
| Enter | Activate link or button |
| Space | Activate button (not link) |

### Focus
- Visible 2px focus ring
- Focus ring uses `outline` or `box-shadow` (not border — avoid layout shift)
- Focus must move in DOM order
- Focus must be visible even on icon-only items
- Tooltip appears on focus (not only hover) for collapsed sidebar items

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024px+) | Icon + label. Full width. |
| Tablet (768-1023px) | Icon only (collapsed sidebar). Tooltip on hover/focus. |
| Mobile (320-767px) | Icon + label (bottom tab bar style). Compact. |

### Responsive Implementation Notes
- Item switches to icon-only via CSS when parent sidebar enters collapsed mode
- Label uses `display: none` in collapsed mode, not removed from DOM (preserves layout)
- Tooltip is always available for icon-only display
- Touch target minimum 44x44px on all breakpoints

---

## Animation Rules

| Transition | Duration | Easing | Notes |
|------------|----------|--------|-------|
| Hover background | 50ms | linear | Tint change |
| Active press | 50ms | linear | Darker tint |
| Left border | 100ms | ease-out | Width grows from 0 to 3px |
| Badge appear | 100ms | ease-out | Scale 0→1 |
| Label fade (collapse) | 150ms | ease-out | Opacity transition |

- Respect `prefers-reduced-motion`: disable border animation and badge scale
- Left border transitions only on active state change, not on hover

---

## Future Expansion

| Extension | Description | Priority |
|-----------|-------------|----------|
| Secondary text | Small subtitle below label | Low |
| Inline actions | Icon buttons visible on hover (star, pin) | Medium |
| Drag handle | Enable reordering | Low |
| Custom icons | Different icon sizes or positions | Low |
| Keyboard shortcut hint | Show keyboard shortcut text | Medium |

---

## Dependencies

| Dependency | Type | Reason |
|------------|------|--------|
| Tooltip | Component | Icon-only label display |
| Badge | Component | Notification/status indicator |
| SidebarContext | Internal | Collapsed state for tooltip/label visibility |
| Icon | Component | Navigation icon |
| useActiveRoute | Hook | Determine `isActive` from current route |

---

## Related Components

| Component | Relation |
|-----------|----------|
| Sidebar | Parent container |
| SidebarGroup | Parent container (grouped items) |
| Topbar MenuItem | Analogous item in Topbar dropdown |
| Badge | Visual indicator sub-component |
| Tooltip | Hover/focus label when sidebar collapsed |

---

## Anti-patterns

| Anti-pattern | Why |
|--------------|-----|
| Nesting items inside SidebarItem | SidebarItem is a leaf — use SidebarGroup for nesting |
| Using SidebarItem outside Sidebar/NavigationRail | It depends on navigation context |
| Truncating label without ellipsis or tooltip | Users can't distinguish items |
| Missing tooltip in collapsed mode | Icon-only items are ambiguous |
| Using SidebarItem for external links without `target="_blank"` + `rel="noopener"` | Security and UX concern |
| Disabled item with no explanation | Add tooltip explaining why disabled |
| Clipping active border indicator | 3px border must not overflow container |

---

## Performance Notes

- `React.memo` on SidebarItem to prevent re-render on sidebar toggle or route changes
- Avoid inline functions in `onClick` — use memoized callbacks or pass `to` for links
- Badge count > 99 should display "99+" without re-rendering on every change
- Use CSS `content-visibility: auto` for items below the fold in long sidebars
