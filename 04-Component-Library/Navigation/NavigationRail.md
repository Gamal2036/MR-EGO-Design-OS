# NavigationRail

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Accessibility.md](../../02-Design-Language/Accessibility.md), [Responsive-System.md](../../02-Design-Language/Responsive-System.md), [Motion-System.md](../../02-Design-Language/Motion-System.md))

---

## Purpose

Compact vertical icon navigation rail (64px wide) for focused workspaces where screen real estate is at a premium. Icons-only display with tooltip on hover/focus. Provides quick access to primary sections without the visual weight of a full sidebar. Often used in creative tools, IDEs, and data dashboards.

---

## Responsibilities

- Render vertical strip of icon-only navigation items (64px fixed width)
- Display active state indicator on the selected item
- Show tooltip on hover and keyboard focus for item labels
- Support FAB (floating action button) pinned to bottom of rail
- Adapt to full sidebar on wider viewports (optional)
- Provide compact alternative to Sidebar for focused workspaces

---

## Composition

```
NavigationRail
├── TopSection
│   ├── RailItem (icon)
│   ├── RailItem (icon) — active
│   ├── RailItem (icon)
│   ├── RailDivider
│   └── RailItem (icon)
├── Spacer (flex-grow)
└── BottomSection
    ├── FAB (floating action button, optional)
    └── RailItem (settings)
```

---

## Hierarchy

| Component | Parent | Children |
|-----------|--------|----------|
| NavigationRail | Layout | RailItem, RailDivider, FAB |

NavigationRail is an alternative to Sidebar in the layout shell. Only one primary navigation component is rendered (Sidebar XOR NavigationRail).

---

## Props Contract (TypeScript)

```typescript
export interface NavigationRailProps {
  /** Rail items configuration */
  items: RailItem[];
  /** Active item ID */
  activeId?: string;
  /** Active item change callback */
  onChange?: (id: string) => void;

  /** FAB configuration */
  fab?: {
    icon: React.ReactNode;
    onClick: () => void;
    ariaLabel: string;
    tooltip?: string;
  };

  /** Bottom section items (settings, help, profile) */
  bottomItems?: RailItem[];

  /** Variant */
  variant?: 'top-icons-only' | 'with-fab';

  /** Expand to sidebar on hover */
  expandOnHover?: boolean;
  /** Expanded width when hover-expanded */
  expandedWidth?: number;

  /** Tooltip placement */
  tooltipPlacement?: 'right' | 'left';

  /** Accessibility */
  ariaLabel?: string;

  /** Styling */
  className?: string;
  style?: React.CSSProperties;

  /** Testing */
  dataTestId?: string;
}

export interface RailItem {
  /** Unique identifier */
  id: string;
  /** Icon element */
  icon: React.ReactNode;
  /** Label text (shown in tooltip) */
  label: string;
  /** Click handler */
  onClick?: () => void;
  /** Route path (alternative to onClick) */
  to?: string;
  /** Disabled state */
  isDisabled?: boolean;
  /** Badge notification */
  badge?: { type: 'dot' | 'count'; value?: number };
  /** Hidden */
  isHidden?: boolean;
  /** Custom aria label */
  ariaLabel?: string;
}
```

---

## Variants

| Variant | Description |
|---------|-------------|
| `top-icons-only` | Standard rail. All items in top section. No FAB. Minimal. |
| `with-fab` | Includes a FAB at the bottom of the rail for primary action (e.g., "New file"). |

---

## States

| State | Description |
|-------|-------------|
| Default | Inactive item. Icon at default opacity/color. |
| Active | Selected item. Icon highlighted. Left or top accent bar (3px). `aria-current="page"`. |
| Hover | Background tint. Tooltip shown after 300ms delay. |
| Focus | 2px focus ring. Tooltip shown immediately (not 300ms). |
| Disabled | Opacity 0.4. No hover/focus/active. Cursor not-allowed. |
| Badge | Dot or count badge on icon. |
| Expanded (hover) | Rail width increases to show labels (if `expandOnHover` is true). |

---

## Accessibility

### Landmarks
- `role="navigation"` or `<nav>` with `aria-label="Navigation rail"`

### ARIA
| Attribute | Target | Condition |
|-----------|--------|-----------|
| `aria-label` | `<nav>` | `"Navigation rail"` |
| `aria-current="page"` | Rail item | When item is active |
| `aria-disabled` | Rail item | When `isDisabled` is true |
| `aria-label` | Each item | When icon-only (supplements tooltip) |
| `aria-haspopup` | FAB | If FAB opens a menu/dialog |
| `aria-expanded` | FAB | If FAB toggles content |

### Keyboard
| Key | Action |
|-----|--------|
| Tab | Navigate into rail, then to next item, then out |
| Down Arrow | Next item in rail |
| Up Arrow | Previous item in rail |
| Enter/Space | Activate focused item |
| Home | First item |
| End | Last item |

### Focus
- First item receives focus when Tab enters the rail
- Roving tabindex: only focused item is tabbable
- Focus ring visible (2px) on all items
- Tooltip appears on focus (keyboard users)
- Focus moves out of rail via Tab (to next landmark/page content)

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024px+) | Full vertical rail, 64px wide. Sticky left. |
| Tablet (768-1023px) | Rail collapses further (48px) or converts to icon row at top. |
| Mobile (320-767px) | NavigationRail not used. Falls back to bottom tab bar or Sidebar. |

### Responsive Implementation Notes
- On tablet, consider reducing rail to 48px width
- `expandOnHover` works on desktop only — disabled on touch devices
- On very narrow viewports, rail adds `position: absolute` or shifts to bottom
- Tooltips should not overflow viewport on tablet

---

## Animation Rules

| Transition | Duration | Easing | Notes |
|------------|----------|--------|-------|
| Hover background | 50ms | linear | Background tint |
| Active indicator | 100ms | ease-out | Accent bar opacity/position |
| Tooltip appear | 200ms | ease-out | Opacity (300ms delay on hover) |
| Tooltip disappear | 80ms | ease-in | Opacity |
| Expand on hover | 150ms | ease-out | Width transition (expandOnHover) |
| FAB appear | 200ms | ease-out | Scale + opacity |

- Respect `prefers-reduced-motion`: disable hover expansion, instant tooltip
- Tooltip delay on hover (300ms) prevents flickering during mouse movement
- Tooltip has NO delay for keyboard focus (immediate)

---

## Future Expansion

| Extension | Description | Priority |
|-----------|-------------|----------|
| Multi-line labels | Labels below icons (wider rail variant) | Low |
| Section dividers with labels | Non-interactive section headings within rail | Low |
| Drag reorder | Reorder rail items | Low |
| Mini sidebar expansion | Rail expands to mini sidebar with labels on hover | Medium |
| Custom icon sizes | Toggle between default and small icons | Low |

---

## Dependencies

| Dependency | Type | Reason |
|------------|------|--------|
| Tooltip | Component | Hover/focus label display |
| Badge | Component | Notification indicator |
| RailItem | Internal | Individual rail entry |
| RailDivider | Internal | Visual separator between sections |
| FAB | Component | Floating action button |
| useRovingTabIndex | Hook | Keyboard navigation |

---

## Related Components

| Component | Relation |
|-----------|----------|
| Sidebar | Alternative — full-width sidebar vs compact rail |
| Topbar | Sibling — Topbar + NavigationRail form layout shell |
| BottomTabBar | Mobile fallback |
| RailItem | Child — individual navigation icon |
| FAB | Child — floating action button variant |

---

## Anti-patterns

| Anti-pattern | Why |
|--------------|-----|
| Using NavigationRail alongside Sidebar | Choose one primary navigation pattern |
| More than 8 items in rail | Too many icons become indistinguishable — group or use Sidebar |
| Icon-only without tooltip | Icons are ambiguous without labels |
| Missing active indicator | Users can't tell which section they're in |
| Using NavigationRail as only navigation on mobile | Not touch-friendly — use bottom tab bar |
| Disabled items without explanation | Tooltip should explain why disabled |
| expandOnHover on touch devices | Hover doesn't exist on touch — use tap to expand |

---

## Performance Notes

- Lightweight component — minimal DOM nodes
- Tooltip should lazy-initialize (mount only when hovered/focused)
- Badge count updates should batche
- Use `React.memo` on RailItem to prevent re-renders on routing changes
- `expandOnHover` uses CSS transitions (avoid JS-driven width changes)
- FAB should have `will-change: transform` for smooth scale animation
