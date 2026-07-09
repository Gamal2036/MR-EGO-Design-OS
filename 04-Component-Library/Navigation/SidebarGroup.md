# SidebarGroup

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Accessibility.md](../../02-Design-Language/Accessibility.md), [Responsive-System.md](../../02-Design-Language/Responsive-System.md), [Motion-System.md](../../02-Design-Language/Motion-System.md))

---

## Purpose

Collapsible navigation section within the Sidebar that groups related SidebarItems under a titled heading. Provides expansion control to show/hide child items, reducing visual noise when collapsed.

---

## Responsibilities

- Render a group title label
- Provide collapse/expand toggle with visual chevron indicator
- Show/hide child SidebarItems with animated height transition
- Maintain `aria-expanded` state for accessibility
- Support default expanded state (uncontrolled) and controlled expanded state

---

## Composition

```
SidebarGroup
├── GroupTitle
│   ├── ToggleChevron (icon)
│   └── TitleText
└── GroupContent
    ├── SidebarItem
    ├── SidebarItem
    └── ...
```

---

## Hierarchy

| Component | Parent | Children |
|-----------|--------|----------|
| SidebarGroup | Sidebar | SidebarItem |

SidebarGroup sits directly inside Sidebar or another SidebarGroup (nested groups limited to 1 level deep).

---

## Props Contract (TypeScript)

```typescript
export interface SidebarGroupProps {
  /** Group title text */
  title: string;
  /** SidebarItem children */
  children: React.ReactNode;

  /** Controlled expanded state */
  isExpanded?: boolean;
  /** Default expanded state (uncontrolled) */
  defaultExpanded?: boolean;
  /** Expand/collapse callback */
  onToggle?: (expanded: boolean) => void;

  /** Icon before the title */
  icon?: React.ReactNode;

  /** Badge count displayed next to title */
  badge?: number | string;

  /** Whether this group is disabled */
  isDisabled?: boolean;

  /** Accessibility */
  ariaLabel?: string;

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
| `default` | Standard group with chevron toggle, title, and collapsible content |
| `compact` | Reduced padding, smaller font — for dense sidebar layouts |
| `collapsible` (default) | Group can be collapsed/expanded |
| `static` | Group is always expanded, no collapse toggle shown |

---

## States

| State | Description |
|-------|-------------|
| Expanded | Group content visible. Chevron points down. `aria-expanded="true"` |
| Collapsed | Group content hidden. Chevron points right. `aria-expanded="false"` |
| Expanding | Content area animating open |
| Collapsing | Content area animating closed |
| Disabled | Group not interactive, items inside not clickable |
| With badge | Badge count displayed, overflows into ellipsis for large numbers |

---

## Accessibility

### Landmarks
- Group title acts as a section heading (`role="heading"`)
- Content area is a group (`role="group"` or `region` with `aria-labelledby`)

### ARIA
| Attribute | Target | Condition |
|-----------|--------|-----------|
| `aria-expanded` | Toggle button | Always — `"true"` or `"false"` |
| `aria-controls` | Toggle button | References content element ID |
| `role="group"` | Content container | Always |
| `aria-labelledby` | Content container | References title element ID |
| `aria-disabled` | Toggle button | When group is disabled |

### Keyboard
| Key | Action |
|-----|--------|
| Tab | Focus the group toggle button |
| Enter/Space | Toggle expand/collapse |
| Down Arrow | When focused on toggle — move to next item after group |
| Up Arrow | Move to previous item before group |

### Focus
- Toggle button receives keyboard focus, not individual items within
- When group collapses, focus remains on toggle
- Focus must not jump inside content when group expands
- Focus indicator (2px ring) on toggle button

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024px+) | Fully visible. Title, chevron, and items all displayed. |
| Tablet (768-1023px) | Group collapses with sidebar. Hover/focus reveals tooltip. Items hidden. |
| Mobile (320-767px) | Sidebar not rendered. Groups not applicable. |

### Responsive Implementation Notes
- In collapsed sidebar mode, group icon acts as toggle for flyout sub-menu
- Group content height animation uses `max-height` trick or `grid-template-rows`
- On mobile, groups are not rendered (bottom bar pattern replaces sidebar)

---

## Animation Rules

| Transition | Duration | Easing | Notes |
|------------|----------|--------|-------|
| Expand content | 200ms | ease-out | Height animation |
| Collapse content | 150ms | ease-in | Height animation |
| Chevron rotation | 100ms | ease-out | 90-degree rotation |
| Badge appear | 100ms | ease-out | Scale + opacity |

- Use `grid-template-rows: 0fr / 1fr` for height animation (no JS height calculation)
- Respect `prefers-reduced-motion`: instant toggle, no rotation
- Chevron rotation should not animate when reduced motion is preferred

---

## Future Expansion

| Extension | Description | Priority |
|-----------|-------------|----------|
| Nested groups | 2+ levels of nesting | Low |
| Drag-and-drop | Reorder groups and items | Low |
| Pin group | Keep group expanded while others collapse | Medium |
| Group search | Inline filter within group | Medium |
| Custom icons per group | Configurable expand/collapse icon | Low |

---

## Dependencies

| Dependency | Type | Reason |
|------------|------|--------|
| SidebarItem | Child | Items within the group |
| SidebarContext | Internal | Shared collapsed state from Sidebar |
| useHeightAnimation | Hook | Smooth height transition |
| Icon | Component | Chevron toggle icon |

---

## Related Components

| Component | Relation |
|-----------|----------|
| Sidebar | Parent — SidebarGroup lives inside Sidebar |
| SidebarItem | Child — individual navigation entry |
| SectionLabel | Alternative — non-collapsible heading separator |

---

## Anti-patterns

| Anti-pattern | Why |
|--------------|-----|
| Nesting SidebarGroup more than 1 level deep | Confusing hierarchy, poor UX |
| Placing SidebarGroup outside of Sidebar | It has no standalone purpose |
| Removing collapse toggle | Users expect to collapse groups |
| Auto-collapsing other groups on expand | Surprising behavior — groups are independent |
| Group with 0 items | Empty group should not render |
| Long titles without truncation | Truncate/ellipsis at 20ch for expanded, hidden for collapsed |

---

## Performance Notes

- Use CSS-based height animation (avoid `useState` + `useEffect` for measuring height)
- `React.memo` on group content to prevent re-render on sidebar state change
- Badge updates should be batched
- Groups should lazy-mount content — unmounted content when collapsed improves performance for large groups
