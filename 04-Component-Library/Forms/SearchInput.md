# SearchInput

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-2 ([Form-Specifications](../../03-Design-System/Forms/Form-Specifications.md)), DP-1 ([Accessibility](../../02-Design-Language/Accessibility.md), [Motion-System](../../02-Design-Language/Motion-System.md))

---

## Purpose

Text search input component with autocomplete suggestions, 300ms debounce, and recent searches display. Supports global search (full page), local search (within section), and inline search (within component) variants.

---

## Responsibilities

- Render a search input with search icon and clear button
- Debounce input changes at 300ms before firing search
- Display autocomplete suggestions dropdown as user types
- Show recent searches when input is focused and empty
- Store and display recent search history (localStorage)
- Highlight matching text in suggestions
- Support keyboard navigation through suggestions
- Fire `onSearch` callback with debounced value

---

## Composition

```
SearchInput
├── SearchIcon (leading)
├── <input type="search|text">
├── ClearButton (trailing, visible when value present)
├── SearchDropdown (Portal)
│   ├── RecentSearches (when focused + empty)
│   │   ├── RecentSearchHeader ("Recent searches")
│   │   ├── RecentSearchItem (multiple, with clock icon)
│   │   └── ClearHistoryButton
│   ├── AutocompleteList
│   │   ├── AutocompleteItem (multiple)
│   │   │   ├── HighlightedText
│   │   │   └── ResultMeta (optional)
│   │   └── NoSuggestions
│   └── SearchFooter ("Search for {query}" action)
├── SearchShortcut (keyboard shortcut hint, e.g., "Ctrl+K")
└── HelperText / ErrorMessage
```

---

## Hierarchy

| Relation | Component | Description |
|----------|-----------|-------------|
| Parent | FormGroup | Optional wrapper |
| Extends | Input | Inherits Input structure |
| Child | SearchIcon | Leading magnifying glass |
| Child | ClearButton | Trailing clear action |
| Child | SearchDropdown | Suggestions overlay |
| Related | CommandPalette | Global search overlay |

---

## Props Contract

```typescript
/**
 * A single autocomplete suggestion item.
 */
export interface SearchSuggestion {
  /** Unique id. */
  id: string;
  /** Display label. */
  label: string;
  /** Description text. */
  description?: string;
  /** Category for grouping. */
  category?: string;
  /** Icon to display. */
  icon?: React.ReactNode;
  /** Value to search on selection. */
  value?: string;
}

/**
 * Props for the SearchInput component.
 */
export interface SearchInputProps {
  // Display
  /** Visual variant. @default "local" */
  variant?: 'global' | 'local' | 'inline';
  /** Size variant. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the input spans full width. @default true */
  fullWidth?: boolean;
  /** Placeholder text. @default "Search..." */
  placeholder?: string;
  /** Whether to show recent searches. @default true */
  showRecentSearches?: boolean;
  /** Maximum number of recent searches to store. @default 5 */
  maxRecentSearches?: number;

  // State
  /** Current search value. */
  value?: string;
  /** Default value (uncontrolled). */
  defaultValue?: string;
  /** Whether the input is disabled. @default false */
  isDisabled?: boolean;
  /** Whether a search is in progress. @default false */
  isLoading?: boolean;
  /** Whether the input has an error. @default false */
  hasError?: boolean;
  /** Whether the dropdown is open (controlled). */
  isOpen?: boolean;

  // Content
  /** Label text. */
  label?: string;
  /** Helper text. */
  helperText?: string;
  /** Error message. */
  errorMessage?: string;
  /** Name attribute. */
  name?: string;
  /** Array of autocomplete suggestions. */
  suggestions?: SearchSuggestion[];
  /** Recent search key for localStorage. Auto-managed if provided. */
  recentSearchKey?: string;

  // Events
  /** Called with debounced search value. */
  onSearch?: (value: string) => void;
  /** Called immediately on every input change. */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Called when a suggestion is selected. */
  onSelect?: (suggestion: SearchSuggestion) => void;
  /** Called when the input is cleared. */
  onClear?: () => void;
  /** Called when the input gains focus. */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Called on blur. */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  // Debounce
  /** Debounce delay in ms. @default 300 */
  debounceMs?: number;

  // Accessibility
  /** ARIA label. */
  ariaLabel?: string;
  /** Custom ID. */
  id?: string;

  // Styling
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
| `global` | Full-width search with large suggestions dropdown | Page-level search, command palette |
| `local` | Standard search with dropdown suggestions | Table filters, section search |
| `inline` | Compact search without dropdown, inline in content | Quick find within component |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Default** | Search icon, placeholder text | Ready for input |
| **Focused** | Focus ring, cursor active | Keyboard ready |
| **Typing** | Clear button appears, debounce timer running | User entering query |
| **Loading** | Spinner replaces search icon | Search in progress |
| **Results** | Suggestions dropdown visible | Autocomplete displayed |
| **No results** | "No results found" in dropdown | Empty suggestion state |
| **Recent searches** | List of recent queries below input | Input focused + empty |
| **Disabled** | 40% opacity | Cannot interact |
| **Filled** | Value present, clear button visible | Query entered |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **Role** | `combobox` on input with `aria-expanded`, `listbox` on suggestions. |
| **Autocomplete** | `aria-autocomplete="list"` on input. |
| **Active descendant** | `aria-activedescendant` pointing to focused suggestion id. |
| **Label** | `aria-label` or visible label. |
| **Clear button** | `aria-label="Clear search"`. |
| **Recent searches** | `aria-label="Recent searches"` on section. |
| **Results** | `aria-live="polite"` for result count. |
| **Error** | `aria-invalid`, `aria-describedby`. |
| **Focus** | Focus ring on input. Focus stays in input while navigating suggestions. |
| **Keyboard** | Down arrow opens suggestions. Arrow keys navigate. Enter selects. Escape closes suggestions and clears focus. Tab moves to next element. |
| **Screen reader** | Announce suggestion count, active suggestion text, search in progress. |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | Full width. Global variant opens as overlay. Suggestions full-width. |
| Tablet (768-1023px) | Full width or fixed. Standard dropdown. |
| Desktop (1024-1279px) | Fixed width up to 400px (local), 600px (global). |
| Wide (1280-1599px) | Fixed width up to 480px (local), 720px (global). |
| Ultra-wide (1600px+) | Max width 560px (local), 800px (global). |

---

## Animation Rules

| Element | Trigger | Duration | Easing |
|---------|---------|----------|--------|
| Dropdown appear | Open | 200ms | Ease-Out |
| Dropdown disappear | Close | 150ms | Ease-In |
| Clear button fade | Value present | 100ms | Ease-Out |
| Spinner appear | Loading | 150ms | Ease-Out |
| Suggestion highlight | Hover/keyboard | 50ms | Instant |

All animations respect `prefers-reduced-motion`.

---

## Future Expansion

| Extension Point | Description |
|-----------------|-------------|
| `variant="command"` | Slash-command style (see CommandInput.md) |
| `filters` prop | Faceted search filters within dropdown |
| `grouped` suggestions | Category-grouped suggestions |
| `searchHistory` custom storage | Custom recent search storage adapter |
| `highlightMatches` prop | Control match highlighting |
| `minChars` prop | Minimum characters before search fires |
| `onSearch` with cancel | AbortController for in-flight search cancellation |

---

## Dependencies

| Dependency | Type | Description |
|------------|------|-------------|
| Input | Internal | Base input component |
| Icon (Search, Close, Clock, Spinner) | Internal | UI icons |
| Portal | Internal | Dropdown overlay rendering |
| ClickOutside | Internal | Close dropdown on outside click |
| FormGroup | Internal | Optional parent wrapper |

---

## Related Components

| Component | Relationship |
|-----------|-------------|
| Input.md | Base component extended by SearchInput |
| CommandInput.md | Sibling for slash-command input pattern |
| CommandPalette.md | Global search overlay (uses SearchInput) |

---

## Anti-patterns

1. **No debounce on search** — Debounce at 300ms is required to avoid excessive search calls.
2. **Showing suggestions without input** — Recent searches okay, but suggestions require 2+ chars.
3. **No clear button** — Always provide clear button when value is present.
4. **Using for password/secure fields** — SearchInput is not for sensitive data entry.
5. **Overriding debounce below 150ms** — Minimum 150ms to avoid performance issues.
6. **No keyboard support for suggestions** — Arrow keys and Enter must work.

---

## Performance Notes

- Debounce uses `setTimeout`/`clearTimeout` pattern — cancel on unmount.
- Suggestions array should be memoized to prevent unnecessary re-renders.
- Recent searches stored in `localStorage` with size limit (5 entries default, max 20KB).
- Search value highlighted in suggestions using simple substring match — avoid RegExp for large lists.
- Use `useRef` for debounce timer to avoid stale closures.
- Portal renders dropdown to avoid z-index and overflow issues.
- Empty the suggestions array between searches to avoid showing stale results.
