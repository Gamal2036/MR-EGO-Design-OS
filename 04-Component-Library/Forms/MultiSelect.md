# MultiSelect

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-2 ([Form-Specifications](../../03-Design-System/Forms/Form-Specifications.md)), DP-1 ([Accessibility](../../02-Design-Language/Accessibility.md), [Motion-System](../../02-Design-Language/Motion-System.md))

---

## Purpose

Multiple option selection component that displays selected items as removable chips. Supports search filtering of available options, select all / clear all actions, and custom option rendering.

---

## Responsibilities

- Render a trigger showing selected items as chips (with remove buttons)
- Open a dropdown overlay listing all available options with checkboxes
- Support searching/filtering options within the dropdown
- Provide Select All and Clear All controls
- Toggle individual options on click
- Manage chip overflow with "+N more" indicator
- Support keyboard navigation and removal of chips

---

## Composition

```
MultiSelect
├── MultiSelectTrigger
│   ├── SelectedChips (multiple)
│   │   └── Chip (with remove button)
│   ├── OverflowIndicator ("+3 more")
│   ├── Placeholder (when nothing selected)
│   └── ChevronIcon
├── MultiSelectDropdown (Portal)
│   ├── SearchInput (filter)
│   ├── SelectAllToggle
│   ├── SelectOptionGroup (optional)
│   │   ├── GroupLabel
│   │   └── SelectOption (with Checkbox)
│   ├── SelectOption (with Checkbox)
│   └── NoResults
└── HelperText / ErrorMessage
```

---

## Hierarchy

| Relation | Component | Description |
|----------|-----------|-------------|
| Parent | FormGroup | Provides label, layout |
| Extends | Select | Inherits Select structure for dropdown |
| Child | Chip | Selected item display with remove |
| Child | SearchInput | Option filter input |
| Child | SelectAllToggle | Select/clear all control |

---

## Props Contract

```typescript
/**
 * Props for the MultiSelect component.
 */
export interface MultiSelectProps {
  // Display
  /** Visual variant. @default "standard" */
  variant?: 'standard' | 'searchable' | 'grouped';
  /** Size variant. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the select spans full container width. @default false */
  fullWidth?: boolean;
  /** Placeholder text when nothing is selected. */
  placeholder?: string;
  /** Max number of chips to show before "+N more". @default 3 */
  maxChips?: number;

  // State
  /** Currently selected values. */
  value?: string[];
  /** Default values for uncontrolled usage. @default [] */
  defaultValue?: string[];
  /** Whether the select is disabled. @default false */
  isDisabled?: boolean;
  /** Whether options are loading. @default false */
  isLoading?: boolean;
  /** Whether the select has a validation error. @default false */
  hasError?: boolean;
  /** Error message text. */
  errorMessage?: string;
  /** Whether the select is required. @default false */
  isRequired?: boolean;
  /** Whether the dropdown is open (controlled). */
  isOpen?: boolean;

  // Content
  /** Label text above. */
  label?: string;
  /** Helper text below. */
  helperText?: string;
  /** Name attribute. */
  name?: string;
  /** Array of options or option groups. */
  options: SelectOption[] | SelectOptionGroup[];
  /** Custom option render function. */
  renderOption?: (option: SelectOption, isSelected: boolean) => React.ReactNode;

  // Events
  /** Called when selection changes. */
  onChange?: (values: string[], options: SelectOption[]) => void;
  /** Called when dropdown opens. */
  onOpen?: () => void;
  /** Called when dropdown closes. */
  onClose?: () => void;
  /** Called on search input change. */
  onSearch?: (query: string) => void;

  // Accessibility
  /** ARIA label. */
  ariaLabel?: string;
  /** Custom ID. */
  id?: string;

  // Styling
  /** Max height of dropdown in px. @default 300 */
  dropdownMaxHeight?: number;
  /** Additional CSS class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;

  // Testing
  /** Test identifier. */
  dataTestId?: string;
}
```

---

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `standard` | Dropdown with checkboxes, chip display | 5-20 options |
| `searchable` | Dropdown with filter input | 20+ options |
| `grouped` | Categorized options with group headers | Hierarchical options |
| `inline` | Inline chip addition without dropdown | Tag/token input |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Default** | Trigger with placeholder, chevron down | No selection yet |
| **Selected** | Chips displayed in trigger, chevron down | Items chosen |
| **Focused** | Focus ring on trigger | Keyboard ready |
| **Open** | Dropdown visible, checkboxes shown | Options visible |
| **Disabled** | 40% opacity, no interaction | Cannot interact |
| **Loading** | Spinner in dropdown | Options loading |
| **Error** | Error border + message | Validation failure |
| **Empty filtered** | "No results" in dropdown | No match for search |
| **All selected** | Select All shows "Deselect All" | All options chosen |
| **Chip overflow** | "+2 more" text replaces extra chips | More than maxChips selected |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **Role** | `combobox` on trigger, `listbox` with `aria-multiselectable="true"`. |
| **Expanded state** | `aria-expanded` on trigger. |
| **Selected options** | `aria-selected="true"` on each selected option. |
| **Chip removal** | Each chip has `aria-label="Remove {label}"` button. |
| **Select All** | `aria-label="Select all options"` / "Deselect all options". |
| **Error** | `aria-invalid`, `aria-describedby`. |
| **Disabled** | `aria-disabled="true"`. |
| **Focus** | Focus ring on trigger. Focus moves to search when dropdown opens. |
| **Keyboard** | Enter/Space to open. Arrow keys to navigate. Enter to toggle option. Escape to close. Backspace on empty trigger removes last chip. |
| **Screen reader** | Announce selection count ("3 of 10 selected"). Announce chip additions/removals. |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | Full width. Chips wrap to next line. Dropdown as bottom sheet. |
| Tablet (768-1023px) | Full width or fixed. Chips wrap. |
| Desktop (1024-1279px) | Fixed width up to 400px. Chips inline. |
| Wide (1280-1599px) | Fixed width up to 480px. |
| Ultra-wide (1600px+) | Max width 560px. |

---

## Animation Rules

| Element | Trigger | Duration | Easing |
|---------|---------|----------|--------|
| Chip appear | Selected | 150ms | Ease-Out |
| Chip remove | Deselected | 100ms | Ease-In |
| Dropdown appear | Open | 200ms | Ease-Out |
| Dropdown disappear | Close | 150ms | Ease-In |
| Checkbox check | Toggle | 100ms | Ease-Out |

All animations respect `prefers-reduced-motion`.

---

## Future Expansion

| Extension Point | Description |
|-----------------|-------------|
| `variant="async"` | Load options on demand |
| `createable` prop | Create new options inline |
| `maxSelections` prop | Limit number of selections |
| `sortSelected` prop | Show selected options at top |
| `renderChip` prop | Custom chip rendering |
| `virtualization` prop | Virtual list for large option sets |

---

## Dependencies

| Dependency | Type | Description |
|------------|------|-------------|
| Portal | Internal | Dropdown overlay rendering |
| ClickOutside | Internal | Outside click detection |
| Chip | Internal | Selected item display |
| SearchInput | Internal | Filter input |
| Icon (Chevron, Check, Close) | Internal | UI icons |
| FormGroup | Internal | Optional parent wrapper |

---

## Related Components

| Component | Relationship |
|-----------|-------------|
| Select.md | Base component for single-select |
| Chip.md | Used for selected item display |
| SearchInput.md | Used as filter input |
| FormGroup.md | Parent wrapper |

---

## Anti-patterns

1. **Using MultiSelect for single selection** — Use Select for single choice.
2. **No Select All for large lists** — Provide select all/clear all when 10+ options.
3. **Hiding all chips without indicator** — Always show "+N more" when chips are truncated.
4. **Not providing search for 20+ options** — Searchable variant is required for large datasets.
5. **Removing chip without confirmation** — Single click remove is fine; no confirmation needed unless destructive.

---

## Performance Notes

- Option filtering happens on every search keystroke — debounce if async.
- Chips use stable keys to prevent remount on reorder.
- Overflow calculation uses `useLayoutEffect` for accurate chip measurements.
- Virtualize dropdown list for 500+ options.
- Context menu selections should batch `onChange` calls (not per-item).
