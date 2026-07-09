# SplitButton

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md), [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md), [Motion-System.md](../../02-Design-Language/Motion-System.md)), DP-2 ([Buttons.md](../../03-Design-System/Components/Buttons.md))

---

## Purpose

SplitButton presents a primary action alongside a dropdown of related alternative actions. The left segment triggers the default action immediately; the right segment opens a dropdown menu listing alternatives. This pattern is used for actions like "Save + Save As", "Send + Schedule Send", or "Approve + Approve with Note".

---

## Responsibilities

- Render two visually connected segments: primary action (left) and dropdown trigger (right)
- Execute the primary action on left-segment click
- Open a dropdown menu on right-segment click showing alternative actions
- Highlight the entire button on hover, distinguish segments on active/focus
- Prevent the dropdown from opening when the component is disabled
- Support keyboard navigation: Enter on primary, ArrowDown/Enter on dropdown trigger
- Close dropdown on outside click, Escape, or selection of an item

---

## Composition

```
SplitButton
├── Button (left segment, primary action)
│   ├── Icon (optional)
│   └── Label
├── Divider (1px vertical separator between segments)
└── DropdownTrigger (right segment, chevron icon)
    └── Dropdown (opens on click)
        ├── DropdownItem (alternative actions)
        └── DropdownItem
```

SplitButton uses:
- `Button` — left segment (primary action)
- `Icon` — chevron icon on right segment
- `Dropdown` — menu of alternative actions (optional dependency)

---

## Hierarchy

**Level:** 2 (Core Composite)

**Parent:** None (consumed directly by forms, dialogs, toolbars)

**Children:**
- `Button` (Level 2) — primary action segment
- `Icon` (Level 0) — chevron indicator
- `Dropdown` (Level 4, optional) — alternative actions menu

**Siblings:** `Button`, `IconButton`, `FloatingButton`

---

## Props Contract

```typescript
/**
 * Item in the split button dropdown menu.
 */
interface SplitButtonDropdownItem {
  /** Unique key for the item. */
  key: string;
  /** Display label. */
  label: string;
  /** Optional icon rendered before label. */
  icon?: React.ReactNode;
  /** Click handler for this item. */
  onClick: () => void;
  /** Whether this item is disabled. @default false */
  isDisabled?: boolean;
  /** Whether this item represents a danger action. @default false */
  isDanger?: boolean;
  /** Optional divider before this item. @default false */
  hasDivider?: boolean;
}

interface SplitButtonProps {
  /** Label for the primary action segment. */
  children: React.ReactNode;
  /** Icon for the primary action segment. */
  icon?: React.ReactNode;
  /** Dropdown menu items. */
  items: SplitButtonDropdownItem[];
  /** Visual variant matching Button variants. @default 'primary' */
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  /** Size matching Button sizes. @default 'md' */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Whether the entire split button is disabled. @default false */
  isDisabled?: boolean;
  /** Whether the primary action is in loading state. @default false */
  isLoading?: boolean;
  /** Label for loading state on primary segment. @default 'Loading' */
  loadingLabel?: string;
  /** Click handler for the primary action segment. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback when dropdown opens. */
  onDropdownOpen?: () => void;
  /** Callback when dropdown closes. */
  onDropdownClose?: () => void;
  /** ARIA label for the dropdown trigger segment. @default 'More options' */
  dropdownAriaLabel?: string;
  /** Additional class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
  /** Data test ID for automated testing. */
  dataTestId?: string;
  /** Ref forwarded to the primary action button element. */
  ref?: React.Ref<HTMLButtonElement>;
}
```

---

## Variants

SplitButton supports a subset of Button variants. Both segments share the same variant.

| Variant | Left Segment | Right Segment | Divider Color |
|---------|-------------|---------------|---------------|
| Primary | Primary button style | Primary button, narrower width | Primary-700 (light), Primary-600 (dark) |
| Secondary | Secondary button style | Secondary button, narrower width | Border-Default |
| Outline | Outline button style | Outline button, narrower width | Border-Default |
| Danger | Danger button style | Danger button, narrower width | Danger-600 |

---

## Sizes

| Size | Height | Left Padding | Right Segment Width | Font Size | Icon Size |
|------|--------|-------------|-------------------|-----------|-----------|
| XS | 28px | Space-4 (12px) | 24px | 13px | 14px |
| SM | 32px | Space-5 (16px) | 28px | 13px | 14px |
| MD | 40px | Space-5 (16px) | 32px | 14px | 16px |
| LG | 48px | Space-6 (20px) | 36px | 15px | 18px |

---

## States

| State | Left Segment | Right Segment | Duration |
|-------|-------------|---------------|----------|
| Default | Normal per variant | Chevron icon, matching variant style | — |
| Hover (anywhere) | Both segments show hover background | Both segments show hover background | 100ms |
| Focus (left) | Focus ring on left segment | No focus ring | 100ms |
| Focus (right) | No focus ring | Focus ring on right segment | 100ms |
| Active (left) | Scale 0.97, darker background | No change | 50ms |
| Active (right) | No change | Scale 0.97, darker background | 50ms |
| Disabled | Opacity 0.4, no interaction | Opacity 0.4, dropdown blocked | Instant |
| Loading (left) | Spinner replaces content | Still interactive for dropdown | 100ms |
| Dropdown open | Default | Chevron rotates 180deg | 200ms |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Element | Two `<button>` elements inside a container `role="group"` |
| Role (container) | `role="group"` with `aria-label` describing the group |
| Left segment | `aria-label` includes the action label |
| Right segment | `aria-label` default "More options", `aria-expanded` when open, `aria-haspopup="true"` |
| Dropdown items | `role="menuitem"`, or `role="option"` |
| Focus management | Tab focuses left segment, Tab again focuses right segment |
| Keyboard (left) | Enter or Space triggers primary action |
| Keyboard (right) | Enter or Space toggles dropdown; ArrowDown/ArrowUp navigate items |
| Keyboard (dropdown) | Escape closes dropdown, focus returns to right segment |
| Disabled | `aria-disabled="true"` on both segments |
| Focus indicator | 2px Primary-500 ring, 2px offset, applied independently per segment |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Full-width if in form. Dropdown occupies full screen or bottom sheet. |
| Tablet (768-1023px) | Standard sizing. Dropdown as menu. |
| Desktop (1024px+) | Standard sizing. Dropdown as menu. |
| Wide (1280px+) | Standard sizing. |
| Ultra-wide (1600px+) | Standard sizing. |

On mobile, the dropdown should render as a bottom sheet or action sheet for easier thumb reachability.

---

## Animation Rules

| Action | Duration | Easing | Property |
|--------|----------|--------|----------|
| Hover background | 100ms | Ease-Out | background-color |
| Active press | 50ms | Ease-Out | transform: scale(0.97) |
| Focus ring | 100ms | Ease-Out | box-shadow |
| Dropdown open | 200ms | Ease-Out | opacity, transform (translateY) |
| Dropdown close | 150ms | Ease-In | opacity, transform (translateY) |
| Chevron rotation | 200ms | Ease-Out | transform: rotate |

- All animations respect `prefers-reduced-motion`
- Chevron rotates 180deg when dropdown opens, returns to 0deg on close

---

## Future Expansion

- **SplitButton with confirmation** — Primary action requires second click confirmation
- **Nested dropdown** — Dropdown items with sub-menus for deeply nested alternatives
- **Recently used** — Dropdown dynamically shows recently used alternative at top
- **AI variant** — Primary action is "Generate", dropdown lists "Generate Summary", "Generate Action Items", etc.

---

## Dependencies

| Dependency | Type | Usage |
|------------|------|-------|
| Button | Internal (Level 2) | Left and right segments |
| Icon | Internal (Level 0) | Chevron icon |
| Dropdown | Internal (Level 4, optional) | Alternative actions menu |
| Design Tokens | External (DP-1) | All visual properties |

---

## Related Components

- [Button.md](Button.md) — Individual action button
- [Dropdown.md](../Navigation/Dropdown.md) — Menu of alternative actions
- [IconButton.md](IconButton.md) — Icon-only actions
- [FloatingButton.md](FloatingButton.md) — Mobile primary action

---

## Anti-patterns

1. **More than 10 dropdown items** — Alternatives should be limited to 3-7 items. More indicates a design problem.
2. **Using SplitButton when alternatives are unrelated** — All items must be variations of the same action category.
3. **Primary action disabled while dropdown is available** — If the primary action is disabled, the entire SplitButton should be disabled or the dropdown should still function only if alternatives are usable.
4. **No primary action default** — The primary action must always be a sensible default. If there is no default, use a Dropdown component instead.
5. **Inconsistent variant across segments** — Both segments must share the same variant.
6. **Removing the visual divider** — The 1px vertical divider between segments is required for affordance.
7. **Custom chevron icon** — Always use the standard chevron-down icon for the dropdown trigger.

---

## Performance Notes

- Two `<button>` nodes inside a container `div` — three DOM nodes total
- Dropdown is lazy-mounted on first click (not pre-rendered)
- Chevron rotation uses CSS `transform` — GPU-accelerated, no layout trigger
- Items array is iterated only when dropdown is open
- Use `useMemo` and `useCallback` for items array and click handlers if items are defined inline
- Static variant maps prevent re-creation of style objects on each render
