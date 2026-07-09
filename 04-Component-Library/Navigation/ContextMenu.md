# ContextMenu

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Accessibility.md](../../02-Design-Language/Accessibility.md), [Responsive-System.md](../../02-Design-Language/Responsive-System.md), [Motion-System.md](../../02-Design-Language/Motion-System.md))

---

## Purpose

Right-click action menu that provides contextual operations for the element under the cursor. Rendered via React Portal to avoid clipping. Supports keyboard navigation (arrows, enter, escape) and four visual variants including danger items.

---

## Responsibilities

- Open on right-click (`contextmenu` event) on the trigger element
- Position at cursor coordinates, flipping to stay within viewport
- Render list of contextual actions
- Support icons, keyboard shortcut hints, and danger styling
- Close on Escape, click outside, or option selection
- Render via Portal to ensure proper stacking
- Manage focus within the menu when open

---

## Composition

```
ContextMenu (Portal)
└── MenuContainer
    ├── MenuItem
    │   ├── Icon
    │   ├── Label
    │   └── ShortcutHint
    ├── MenuDivider
    ├── MenuItem (danger)
    │   ├── Icon
    │   └── Label
    ├── SubMenu
    │   ├── MenuItem
    │   └── MenuItem
    └── ...
```

---

## Hierarchy

| Component | Parent | Children |
|-----------|--------|----------|
| ContextMenu | Document root (Portaled) | MenuItem, MenuDivider |

---

## Props Contract (TypeScript)

```typescript
export interface ContextMenuProps {
  /** Menu items configuration */
  items: ContextMenuItem[];
  /** Controlled open state */
  isOpen?: boolean;
  /** Position override (defaults to cursor position) */
  position?: { x: number; y: number };
  /** Trigger element ref (required for right-click binding) */
  triggerRef: React.RefObject<HTMLElement>;
  /** Open/close callback */
  onOpenChange?: (open: boolean) => void;

  /** Variant */
  variant?: 'standard' | 'with-icons' | 'with-shortcuts' | 'danger';

  /** Close on select */
  closeOnSelect?: boolean;

  /** Max height before scroll */
  maxHeight?: number | string;
  /** Min width */
  minWidth?: number;

  /** Z-index override */
  zIndex?: number;

  /** Accessibility label */
  ariaLabel?: string;

  /** Styling */
  className?: string;
  style?: React.CSSProperties;

  /** Testing */
  dataTestId?: string;
}

export interface ContextMenuItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon */
  icon?: React.ReactNode;
  /** Keyboard shortcut hint display */
  shortcut?: string;
  /** Item is destructive (red styling) */
  isDanger?: boolean;
  /** Item is disabled */
  isDisabled?: boolean;
  /** Hidden (not rendered) */
  isHidden?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Nested sub-menu items */
  children?: ContextMenuItem[];
  /** Custom aria label */
  ariaLabel?: string;
}
```

---

## Variants

| Variant | Description |
|---------|-------------|
| `standard` | Text-only items. Optional dividers. Minimal. |
| `with-icons` | Each item includes an icon before the label. |
| `with-shortcuts` | Items show keyboard shortcut hints aligned right. |
| `danger` | Items with `isDanger: true` show red label + icon. Other items default. |

---

## States

| State | Description |
|-------|-------------|
| Closed | Menu not rendered. Right-click handler registered. |
| Open — positioned | Menu rendered at cursor position, flipped if near edge. |
| Hover | Item background change on mouse hover. |
| Focus | Item highlighted via keyboard (arrows). Distinct from hover. |
| Active (pressed) | Brief active state on click (50ms). |
| Disabled | Dimmed item. Not clickable. Cursor not-allowed. |
| Sub-menu open | Nested menu visible on hover/click. |
| Danger | Red text/icon styling. Warning icon if variant supports it. |

---

## Accessibility

### Landmarks
- `role="menu"` on the menu container

### ARIA
| Attribute | Target | Condition |
|-----------|--------|-----------|
| `role="menu"` | Menu container | Always |
| `role="menuitem"` | Each item | Always |
| `role="separator"` | Divider | Always |
| `aria-disabled` | Menu item | When `isDisabled` is true |
| `aria-haspopup="true"` | Menu item | When item has sub-menu |
| `aria-expanded` | Menu item with sub-menu | When sub-menu is open |
| `aria-label` | Menu | Always — `"Context menu"` |
| `aria-orientation="vertical"` | Menu | Always |

### Keyboard
| Key | Action |
|-----|--------|
| Escape | Close menu |
| Down Arrow | Next item |
| Up Arrow | Previous item |
| Enter | Select highlighted item |
| Space | Select highlighted item |
| Right Arrow | Open sub-menu (if exists) |
| Left Arrow | Close sub-menu, return to parent |
| Home | First item |
| End | Last item |
| Tab | Close menu and move focus to next element |

### Focus
- First enabled item receives focus on open
- Roving tabindex: only highlighted item is tabbable (`tabindex="0"`)
- Focus is trapped within menu while open
- Focus returns to trigger element on close
- Sub-menu focuses its first item when opened

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024px+) | Standard context menu at cursor position. Flipped if near edge. |
| Tablet (768-1023px) | Context menu supported but touch users see long-press alternative. |
| Mobile (320-767px) | Context menu not triggered by default. Use bottom sheet or long-press fallback. |

### Responsive Implementation Notes
- On mobile, right-click is not available — provide long-press or explicit action menu button
- Use `touchstart` + timer for long-press detection (500ms)
- Fall back to bottom sheet on mobile instead of floating menu
- Minimum 44x44px touch targets on mobile touch fallback

---

## Animation Rules

| Transition | Duration | Easing | Notes |
|------------|----------|--------|-------|
| Menu appear | 100ms | ease-out | Opacity + slight translateY |
| Menu disappear | 80ms | ease-in | Opacity |
| Sub-menu appear | 100ms | ease-out | Slide right |
| Item highlight | 30ms | linear | Background color |

- Respect `prefers-reduced-motion`: instant appear/disappear, no slide
- Avoid scale animation (may cause positioning issues at edges)

---

## Future Expansion

| Extension | Description | Priority |
|-----------|-------------|----------|
| Group labels | Non-interactive heading within menu | Medium |
| Checkable items | Menu items with checkbox/radio state | Low |
| Icons only mode | Icon-only context menu for dense UIs | Low |
| Async items | Items that load sub-actions asynchronously | Medium |
| Custom render | Slot for custom item rendering | Low |

---

## Dependencies

| Dependency | Type | Reason |
|------------|------|--------|
| Portal | Utility | Render at document root |
| useTrapFocus | Hook | Trap focus within menu |
| useFloatingPosition | Hook | Flip/position calculation |
| useGlobalClick | Hook | Click outside detection |
| Divider | Component | Menu item separator |

---

## Related Components

| Component | Relation |
|-----------|----------|
| Dropdown | Alternative — click-triggered vs right-click-triggered |
| CommandPalette | Alternative — keyboard-launched vs right-click-launched |
| BottomSheet | Mobile fallback for context menu |

---

## Anti-patterns

| Anti-pattern | Why |
|--------------|-----|
| Context menu as only way to access actions | Not discoverable — always provide visible button alternatives |
| >15 items in one menu | Too long — group into sub-menus or reconsider architecture |
| Nesting sub-menus more than 2 levels deep | Hard to navigate, easy to lose position |
| Missing viewport boundary detection | Menu clips off-screen |
| Disabled items without explanation | Add title/tooltip explaining why disabled |
| Using context menu on mobile without fallback | Right-click doesn't exist on touch devices |
| Prevent default context menu without adding custom | Always prevent default on trigger when custom menu is shown |

---

## Performance Notes

- Portal rendering — menu is appended to document body, not nested in DOM tree
- Lazy initialization — only bind right-click handler when menu component is mounted
- Items array should be stable reference (useCallback or memoized)
- Menu unmounts on close (not just hidden) to free memory
- Use `position: fixed` for portal container to avoid layout recalculations
