# Dropdown

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Accessibility.md](../../02-Design-Language/Accessibility.md), [Responsive-System.md](../../02-Design-Language/Responsive-System.md), [Motion-System.md](../../02-Design-Language/Motion-System.md))

---

## Purpose

Trigger-based option menu that displays a list of actions or selections on click. Supports three usage variants (menu, select, action). Renders via Portal for proper z-index stacking. Dismisses on Escape, click outside, or trigger click.

---

## Responsibilities

- Render trigger element (button, icon, or custom)
- Open menu panel on trigger click
- Position menu relative to trigger with viewport-aware flipping
- Display list of options or actions
- Close on Escape, click outside, or trigger click
- Manage focus when opening/closing
- Support keyboard navigation within menu
- Render via Portal to avoid overflow clipping

---

## Composition

```
Dropdown
├── Trigger (Button, IconButton, or custom)
└── DropdownMenu (Portal)
    ├── DropdownItem
    │   ├── Icon
    │   ├── Label
    │   └── ShortcutHint
    ├── DropdownDivider
    └── DropdownItem
        ├── Icon
        └── Label
```

---

## Hierarchy

| Component | Parent | Children |
|-----------|--------|----------|
| Dropdown | Any layout | DropdownItem, DropdownDivider |

---

## Props Contract (TypeScript)

```typescript
export interface DropdownProps {
  /** Trigger element */
  trigger: React.ReactNode;
  /** Menu items */
  items: DropdownItem[];

  /** Controlled open state */
  isOpen?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Open/close callback */
  onOpenChange?: (open: boolean) => void;

  /** Variant */
  variant?: 'menu' | 'select' | 'action';

  /** Menu placement relative to trigger */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'bottom' | 'top';

  /** Close on select (defaults to true for menu, false for select) */
  closeOnSelect?: boolean;

  /** Selected value(s) for 'select' variant */
  value?: string | string[];
  /** Selection callback for 'select' variant */
  onSelect?: (value: string) => void;
  /** Allow multiple selection */
  multiSelect?: boolean;

  /** Max height of menu */
  maxHeight?: number | string;
  /** Min width (defaults to trigger width for select variant) */
  minWidth?: number | string;

  /** Offset from trigger */
  offset?: number;

  /** Z-index override */
  zIndex?: number;

  /** Disabled state */
  isDisabled?: boolean;

  /** Accessibility */
  ariaLabel?: string;

  /** Styling */
  className?: string;
  style?: React.CSSProperties;

  /** Testing */
  dataTestId?: string;
}

export interface DropdownItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: React.ReactNode;
  /** Icon before label */
  icon?: React.ReactNode;
  /** Keyboard shortcut hint */
  shortcut?: string;
  /** Click handler */
  onClick?: () => void;

  /** Value (for select variant) */
  value?: string;
  /** Selected state (for select variant) */
  isSelected?: boolean;

  /** Danger styling */
  isDanger?: boolean;
  /** Disabled state */
  isDisabled?: boolean;
  /** Hidden */
  isHidden?: boolean;

  /** Sub-items (nested dropdown) */
  children?: DropdownItem[];
  /** Divider before this item */
  hasDivider?: boolean;

  /** Custom aria label */
  ariaLabel?: string;
}
```

---

## Variants

| Variant | Description |
|---------|-------------|
| `menu` | Action menu. Items execute actions. Close on select. |
| `select` | Selection list. Items are selectable options. Does not close on select (unless `closeOnSelect` is set). Shows checkmark on selected. |
| `action` | Quick action dropdown. Icons prominent. Compact. Often for single-action choices. |

---

## States

| State | Description |
|-------|-------------|
| Closed | Menu hidden. Trigger interactive. |
| Open | Menu visible, positioned relative to trigger. |
| Hover | Item background change on hover. |
| Focus (keyboard) | Item highlighted via keyboard navigation. Distinct visual. |
| Disabled | Trigger or item is not interactive. Dimmed. |
| Selected (select variant) | Checkmark icon on selected item. |
| Loading | Items are in skeleton state (async data). |
| Empty | No items to display. "No options" message. |

---

## Accessibility

### Landmarks
- `role="menu"` (menu variant) or `role="listbox"` (select variant)

### ARIA
| Attribute | Target | Condition |
|-----------|--------|-----------|
| `aria-haspopup` | Trigger | `"true"` or `"menu"` / `"listbox"` |
| `aria-expanded` | Trigger | `"true"` when menu is open |
| `aria-controls` | Trigger | References menu ID |
| `role="menu"` | Menu container | Menu variant |
| `role="menuitem"` | Item | Menu variant |
| `role="listbox"` | Menu container | Select variant |
| `role="option"` | Item | Select variant |
| `aria-selected` | Item | Select variant — selected items |
| `aria-disabled` | Item | When disabled |
| `role="separator"` | Divider | Always |

### Keyboard
| Key | Action |
|-----|--------|
| Enter/Space | Toggle open/close. On open: trigger opens menu. |
| Escape | Close menu |
| Down Arrow | Next item |
| Up Arrow | Previous item |
| Enter (on item) | Select or execute item |
| Space (on item) | Select or execute item (select variant: toggle selection) |
| Home | First item |
| End | Last item |
| Tab | Close menu, move focus to next element |

### Focus
- Trigger retains focus when menu opens
- First enabled item highlighted on open (visual highlight, not focus)
- Focus remains on trigger — use `aria-activedescendant` for screen reader
- Roving tabindex approach: arrow keys update active descendant
- Focus returns to trigger on close
- Menu does not trap focus (Tab closes menu)

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024px+) | Standard dropdown at trigger position. Flipped as needed. |
| Tablet (768-1023px) | Dropdown behavior preserved. Larger touch targets. |
| Mobile (320-767px) | Dropdown converts to bottom sheet or action sheet for touch ergonomics. |

### Responsive Implementation Notes
- On mobile, full-width bottom sheet replaces floating dropdown for select/action variants
- Menu variant with few items (≤5) may retain dropdown on tablet
- Trigger remains the same — only the menu presentation changes
- Bottom sheet animates from bottom, covers 40-60% of viewport
- Touch targets minimum 44x44px

---

## Animation Rules

| Transition | Duration | Easing | Notes |
|------------|----------|--------|-------|
| Menu appear | 100ms | ease-out | Opacity + translateY(4px→0) |
| Menu disappear | 80ms | ease-in | Opacity |
| Item highlight | 30ms | linear | Background color |
| Bottom sheet slide | 200ms | ease-out | Slide up from bottom |

- Respect `prefers-reduced-motion`: instant appear/disappear
- Translate animation on Y axis only (not scale — avoids sub-pixel issues)

---

## Future Expansion

| Extension | Description | Priority |
|-----------|-------------|----------|
| Searchable dropdown | Filter items by typing (autocomplete-style) | Medium |
| Multi-level nested dropdown | Cascading sub-menus | Low |
| Group labels | Categorized dropdown sections | Medium |
| Async items | Items loaded on menu open | Medium |
| Virtualized items | Virtual list for large option sets | Low |

---

## Dependencies

| Dependency | Type | Reason |
|------------|------|--------|
| Portal | Utility | Render at document root |
| useFloatingPosition | Hook | Viewport-aware positioning |
| useGlobalClick | Hook | Click outside detection |
| useKeyboardNavigation | Hook | Arrow key handling |
| BottomSheet | Component | Mobile fallback |

---

## Related Components

| Component | Relation |
|-----------|----------|
| ContextMenu | Alternative — right-click vs click-triggered |
| CommandPalette | Alternative — keyboard-launched vs click-launched |
| Select | Specialized variant — Dropdown with select behavior |
| BottomSheet | Mobile fallback presence |
| Tooltip | Companion — tooltip on trigger if icon-only |

---

## Anti-patterns

| Anti-pattern | Why |
|--------------|-----|
| Dropdown with >20 items | Too many — use searchable select or grouped dropdown |
| Using dropdown for primary navigation | Dropdowns hide content — use exposed navigation |
| Trigger without visible affordance | Users must know it's clickable (chevron, caret, or button styling) |
| Menu clipped by overflow:hidden parent | Always use Portal to avoid CSS clipping |
| Disabled trigger with no tooltip | Explain why trigger is disabled |
| Selected option not marked in select variant | Users can't tell current selection |
| Opening on hover (desktop) | Accidental opens — use click trigger |
| Dropdown inside dropdown | Nested dropdowns require sub-menu pattern, not nested Dropdown components |

---

## Performance Notes

- Menu renders lazily — only mounts when opened (use `isMounted` + animation state)
- Use `React.memo` on DropdownItem for stable item lists
- Items array should use `useMemo` or be defined outside render
- Portal mount/unmount is cheap — don't keep menu mounted when closed
- Position calculation runs once on open (not on every render)
- Debounce resize listener for repositioning on scroll/resize
