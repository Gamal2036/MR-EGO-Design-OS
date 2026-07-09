# Select

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-2 ([Form-Specifications](../../03-Design-System/Forms/Form-Specifications.md)), DP-1 ([Accessibility](../../02-Design-Language/Accessibility.md), [Motion-System](../../02-Design-Language/Motion-System.md))

---

## Purpose

Dropdown option picker that allows users to select a single value from a list of predefined options. Supports search filtering, option grouping, and custom option rendering.

---

## Responsibilities

- Render a trigger displaying the currently selected option
- Open a dropdown overlay with available options on click
- Support keyboard navigation through options
- Filter options when searchable variant is used
- Display grouped options with group labels
- Support custom option content rendering
- Close dropdown on selection or Escape
- Manage focus return to trigger on close

---

## Composition

```
Select
├── SelectTrigger
│   ├── SelectedValue (displayed text)
│   ├── Placeholder (when no selection)
│   ├── ChevronIcon (open/close indicator)
│   └── ClearButton (optional)
├── SelectDropdown (Portal-rendered overlay)
│   ├── SearchInput (when searchable)
│   ├── SelectOptionGroup (optional)
│   │   ├── GroupLabel
│   │   └── SelectOption (multiple)
│   ├── SelectOption (individual)
│   │   ├── OptionLabel
│   │   ├── OptionIcon (optional)
│   │   └── CheckIcon (selected indicator)
│   └── NoResults (empty state)
└── HelperText / ErrorMessage
```

---

## Hierarchy

| Relation | Component | Description |
|----------|-----------|-------------|
| Parent | FormGroup | Provides label, layout |
| Sibling | HelperText | Guidance text |
| Sibling | ErrorMessage | Validation error |
| Child | SelectTrigger | Dropdown trigger button |
| Child | SelectDropdown | Options overlay |
| Child | SearchInput | Filter field (searchable variant) |
| Child | SelectOption | Individual option item |
| Child | SelectOptionGroup | Grouped options container |
| Extends | — | Base for MultiSelect |

---

## Props Contract

```typescript
/** A single option in the select. */
export interface SelectOption {
  /** Unique value. */
  value: string;
  /** Display label. */
  label: string;
  /** Optional icon. */
  icon?: React.ReactNode;
  /** Whether this option is disabled. @default false */
  isDisabled?: boolean;
  /** Additional metadata. */
  metadata?: Record<string, unknown>;
}

/** A group of options. */
export interface SelectOptionGroup {
  /** Group label. */
  label: string;
  /** Options in this group. */
  options: SelectOption[];
}

/**
 * Props for the Select component.
 */
export interface SelectProps {
  // Display
  /** Visual variant. @default "standard" */
  variant?: 'standard' | 'searchable' | 'grouped';
  /** Size variant. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the select spans full container width. @default false */
  fullWidth?: boolean;
  /** Placeholder text when nothing is selected. */
  placeholder?: string;
  /** Whether the dropdown renders above the trigger. @default false */
  dropUp?: boolean;

  // State
  /** Currently selected value. */
  value?: string;
  /** Default value for uncontrolled usage. */
  defaultValue?: string;
  /** Whether the select is disabled. @default false */
  isDisabled?: boolean;
  /** Whether the select is loading options. @default false */
  isLoading?: boolean;
  /** Whether the select has a validation error. @default false */
  hasError?: boolean;
  /** Error message text. */
  errorMessage?: string;
  /** Whether the select is required. @default false */
  isRequired?: boolean;
  /** Whether the dropdown is open (controlled). */
  isOpen?: boolean;
  /** Whether the select is clearable. @default false */
  isClearable?: boolean;

  // Content
  /** Label text above the select. */
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
  onChange?: (value: string | null, option: SelectOption | null) => void;
  /** Called when dropdown opens. */
  onOpen?: () => void;
  /** Called when dropdown closes. */
  onClose?: () => void;
  /** Called when search input changes (searchable variant). */
  onSearch?: (query: string) => void;

  // Accessibility
  /** ARIA label. */
  ariaLabel?: string;
  /** Custom ID. */
  id?: string;

  // Styling
  /** Max height of the dropdown in px. @default 300 */
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
| `standard` | Click to open, scrollable list of options | Short fixed lists (< 20 items) |
| `searchable` | Includes a filter input at top of dropdown | Long lists (20+ items) |
| `grouped` | Options displayed under category headers | Categorized options |
| `searchable+grouped` | Searchable with grouped options | Large categorized datasets |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Default** | Trigger with placeholder or selected value, chevron down | Ready for interaction |
| **Hover** | Border darkens, bg shifts | Interactive indication |
| **Focus** | 2px focus ring on trigger | Keyboard focus ready |
| **Active** | Press state on trigger | Mouse interaction |
| **Open** | Dropdown visible, chevron rotated up | Options displayed |
| **Disabled** | 40% opacity, no interaction | Cannot open |
| **Loading** | Skeleton in dropdown, spinner in trigger | Options loading |
| **Error** | Error border + message | Validation failure |
| **Empty** | "No options" or "No results" in dropdown | Filtered empty state |
| **Option hover** | Highlighted background on option | Keyboard/mouse navigation |
| **Option selected** | Checkmark icon on option | Currently selected |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **Role** | `combobox` role on trigger, `listbox` role on dropdown, `option` role on items. |
| **Expanded state** | `aria-expanded="true"` / `"false"` on trigger. |
| **Selected option** | `aria-selected="true"` on active option. |
| **Active descendant** | `aria-activedescendant` pointing to focused option id. |
| **Label** | `aria-label` or `aria-labelledby` on trigger. |
| **Error** | `aria-invalid="true"`, `aria-describedby`. |
| **Disabled** | `aria-disabled="true"`. |
| **Required** | `aria-required="true"`. |
| **Focus** | Focus ring on trigger. Focus moves to dropdown when opened. |
| **Keyboard** | Enter/Space to open. Arrow keys to navigate. Enter to select. Escape to close. Home/End for first/last. Tab closes and moves to next field. |
| **Screen reader** | Announce label, selected value, option count, position within options. |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | Full width. Dropdown renders as bottom sheet or full-screen list. Touch target 44x44px. |
| Tablet (768-1023px) | Full width or fixed. Dropdown as overlay. |
| Desktop (1024-1279px) | Fixed width up to 400px. Dropdown overlays below. |
| Wide (1280-1599px) | Fixed width up to 480px. |
| Ultra-wide (1600px+) | Max width 480px. |

---

## Animation Rules

| Element | Trigger | Duration | Easing |
|---------|---------|----------|--------|
| Dropdown appear | Open | 200ms | Ease-Out |
| Dropdown disappear | Close | 150ms | Ease-In |
| Chevron rotation | Open/close | 150ms | Ease-Out |
| Option highlight | Hover/keyboard | 50ms | Instant |
| Focus ring | Focus | 150ms | Ease-Out |
| Scroll within dropdown | User scroll | — | Native |

All animations respect `prefers-reduced-motion`.

---

## Future Expansion

| Extension Point | Description |
|-----------------|-------------|
| `variant="async"` | Load options on search/demand |
| `virtualization` prop | Virtual list for 1000+ options |
| `createable` prop | Allow user to add new options |
| `groups` as nested | Multi-level grouped options |
| `loadingMessage` prop | Custom loading text |
| `noOptionsMessage` prop | Custom empty state text |

---

## Dependencies

| Dependency | Type | Description |
|------------|------|-------------|
| Portal | Internal | Dropdown rendering outside overflow |
| ClickOutside | Internal | Close on outside click |
| SearchInput | Internal | Filter field for searchable variant |
| Icon (Chevron, Check) | Internal | Dropdown and selection indicators |
| FormGroup | Internal | Optional parent wrapper |

---

## Related Components

| Component | Relationship |
|-----------|-------------|
| MultiSelect.md | Extends Select for multiple selections |
| SearchInput.md | Used as filter input in searchable variant |
| FormGroup.md | Parent wrapper |

---

## Anti-patterns

1. **Using Select for < 3 options** — Use Radio for better visibility.
2. **Using Select for > 50 options without search** — Always use searchable variant for long lists.
3. **Custom scroll containers** — Let the dropdown manage its own scrolling.
4. **Nesting Select inside scrolling container** — Use Portal to avoid clipping.
5. **Modifying option DOM directly** — Use `renderOption` for custom content.
6. **Removing keyboard navigation** — Arrow keys, Enter, and Escape must work.

---

## Performance Notes

- Options array should be stable (use `useMemo` for derived options).
- Searchable variant filters options on every keypress — debounce at 150ms for async filtering.
- Portal rendering prevents dropdown from being clipped by overflow containers.
- Virtualization recommended for 200+ options (virtualized list).
- Avoid re-creating options array on every render — memoize.
- Dropdown position calculation uses `useLayoutEffect` to prevent flicker.
