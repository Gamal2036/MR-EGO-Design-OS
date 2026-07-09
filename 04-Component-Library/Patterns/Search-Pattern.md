# Search-Pattern

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-2 ([Form-Specifications.md](../../03-Design-System/Forms/Form-Specifications.md)), DP-3 ([Composition-Rules.md](../Architecture/Composition-Rules.md))

---

## Purpose

Defines the search interface blueprint for finding entities, documents, messages, and data across MR:EGO. Supports global search (everything), local search (within module), and AI-powered natural language search with categorized results.

---

## Composition

```
SearchPage (Container)
├── SearchInput (top, prominent)
│   ├── SearchIcon (leading)
│   ├── Input (type="search", 300ms debounce)
│   ├── ClearButton (trailing, visible when value present)
│   ├── SearchShortcut ("Ctrl+K" badge)
│   ├── SearchDropdown (autocomplete)
│   │   ├── RecentSearches
│   │   ├── AutocompleteSuggestions
│   │   └── SearchFooter ("Search for {query}")
│   └── FilterToggle (expand/collapse filters)
├── ActiveFiltersBar (when filters active)
│   ├── FilterChip (multiple, removable)
│   ├── ClearAllFilters link
│   └── ResultCount ("N results")
├── FiltersPanel (collapsible sidebar or top bar)
│   ├── FilterGroup (multiple)
│   │   ├── FilterGroupTitle
│   │   ├── CheckboxFilter (multiple options)
│   │   ├── DateRangeFilter (start/end date)
│   │   ├── SelectFilter (single select)
│   │   └── SliderFilter (range/number)
│   └── ApplyFilters / ResetFilters buttons
├── ResultsArea
│   ├── ResultTypeTabs ("All", "Jobs", "Documents", "Profiles", etc.)
│   ├── ResultList (mixed or filtered results)
│   │   ├── ResultCard (multiple)
│   │   │   ├── ResultIcon (type-specific)
│   │   │   ├── ResultTitle (highlighted matches)
│   │   │   ├── ResultSnippet (context with highlighted terms)
│   │   │   ├── ResultMeta (type, date, status)
│   │   │   └── ResultActions (open, preview, share)
│   │   └── ResultCategoryGroup (AI search: grouped by category)
│   │       ├── CategoryTitle ("Jobs", "Documents", etc.)
│   │       └── ResultCard (within category)
│   ├── CategorizedResults (AI search variant)
│   │   ├── CategorySection (multiple)
│   │   │   ├── CategoryLabel + count
│   │   │   └── ResultCard (up to 3 per category, "View all")
│   │   └── AISummary (optional, "Based on your query...")
│   └── NoResults
│       ├── NoResultsIllustration
│       ├── NoResultsMessage
│       └── Suggestions (adjust filters, try different terms)
├── Pagination
│   ├── PageNumbers
│   ├── Prev / Next buttons
│   └── ResultsPerPage selector
└── AIQueryInput (AI search variant)
    ├── PromptInput (natural language query)
    └── AISearchButton (sparkle icon)
```

---

## When to Use

- Global search across all modules and entities
- Local search within a specific module (jobs, documents, profiles)
- AI-powered natural language search with contextual understanding
- Any interface requiring filtering and finding specific data

## When NOT to Use

- Navigational menus (use Sidebar or Tabs)
- Data filtering on a pre-loaded page (use inline Filters instead)
- Simple dropdown with fewer than 10 options (use Select)
- Command execution (use CommandPalette)

---

## Variants

### Global Search (Command Palette)
| Aspect | Specification |
|--------|---------------|
| Trigger | Ctrl+K / Cmd+K or search icon in Topbar |
| Overlay | Full-screen overlay with backdrop |
| Input | Prominent at top, auto-focused |
| Results | Categorized across all modules, keyboard-navigable |
| Actions | Enter to open result; arrows to navigate |
| Best for | Quick access to any entity or action |

### Local Search (In-Page)
| Aspect | Specification |
|--------|---------------|
| Position | Top of module content area |
| Width | 400px-600px (or full-width on mobile) |
| Filters | Context-relevant filter groups |
| Results | Module-specific entity results in list/table |
| Debounce | 300ms |
| Best for | Finding entities within a specific module |

### AI Search (Natural Language)
| Aspect | Specification |
|--------|---------------|
| Input | Textarea with placeholder "Ask MR:EGO to find..." |
| Processing | AI interprets query, returns categorized results with summary |
| Results | Grouped by category with AI-generated explanation |
| Fallback | Falls back to keyword search if AI unavailable |
| Best for | Complex queries across multiple data sources |

### Inline Search
| Aspect | Specification |
|--------|---------------|
| Position | Within a component (e.g., table filter bar) |
| Width | Compact, 200-300px |
| Variant | `inline` SearchInput |
| Results | Filtered component data (no separate results page) |
| Best for | Quick filtering within a table, list, or dropdown |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Idle** | SearchInput with placeholder; results show if previous query exists | Ready for input |
| **Typing** | Clear button appears; debounce timer running | Input being entered |
| **Searching** | Spinner replaces search icon in SearchInput; results area shows skeleton | Query in progress |
| **Results found** | Result count displayed; categorized result list; highlight matches | Interactive results |
| **No results** | NoResults illustration with suggestions | Empty search state |
| **Filtered** | ActiveFiltersBar visible; FilterChips shown; results filtered | Active filters applied |
| **Error** | ErrorState in results area; retry button | Search API failure |
| **Empty query** | Recent searches shown (if any) or placeholder | No search term entered |
| **AI searching** | AI-specific loading state; "Analyzing your query..." message | Natural language processing |
| **AI results** | Categorized results with AI summary; confidence indicator | AI-powered results |
| **AI unavailable** | Fallback to keyword search; "AI search unavailable" notice | Graceful degradation |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Search input | `role="combobox"`, `aria-expanded` when suggestions visible, `aria-autocomplete="list"` |
| Suggestions list | `role="listbox"`, `aria-label="Search suggestions"` |
| Suggestion items | `role="option"`, `aria-selected` for active suggestion |
| Active descendant | `aria-activedescendant` on input pointing to focused suggestion |
| Clear button | `aria-label="Clear search"` |
| Filters toggle | `aria-expanded` on filter panel toggle |
| Filter chips | `role="button"`, `aria-label="Remove filter: {filter name}"` |
| Results region | `role="region"`, `aria-label="Search results"`, `aria-live="polite"` |
| Result items | `role="article"` or listitem with `aria-label` |
| Result count | `role="status"`, announces "{count} results found" |
| No results | `role="status"`, "No results found for {query}" |
| Pagination | `aria-label="Pagination"`, `aria-current="page"` |
| Highlighted matches | Use `<mark>` element for semantic highlighting |
| AI search attribution | "AI-powered search" label with confidence indicator |
| Keyboard | Down arrow opens suggestions; arrows navigate; Enter selects; Escape closes; Tab to next section |
| Focus management | Focus stays in input while navigating suggestions; focus moves to first result after search completes |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Global search: full-screen overlay. Local search: full-width input. Filters: bottom sheet. Results: single column cards. Pagination: infinite scroll or "Load more". AI search: compact input. |
| Tablet (768-1023px) | Search input: 400px width. Filters: collapsible sidebar. Results: 2-column layout for cards. Pagination: numbered with "Prev/Next". |
| Desktop (1024-1279px) | Search input: 600px (global), 400px (local). Filters: persistent sidebar. Results: list view with type icons. Pagination: fully numbered. |
| Wide (1280-1599px) | Search input: 720px (global), 480px (local). Filters: sidebar with expanded groups. Results: mixed card/list layout. |
| Ultra-wide (1600px+) | Search input: 800px max. Content constrained to 1400px. Results show more metadata per item. |

---

## Implementation Example

```typescript
<SearchPage>
  <SearchInput
    variant="global"
    value={query}
    onChange={handleQueryChange}
    onSearch={handleSearch}
    suggestions={autocompleteResults}
    recentSearchKey="global-search"
    placeholder="Search jobs, documents, profiles..."
  />
  <ActiveFiltersBar>
    {activeFilters.map(f => (
      <FilterChip key={f.id} label={f.label} onRemove={() => removeFilter(f)} />
    ))}
    <span>{totalResults} results</span>
    {activeFilters.length > 0 && <Button variant="ghost" onClick={clearFilters}>Clear all</Button>}
  </ActiveFiltersBar>
  <FiltersPanel collapsed={filtersCollapsed}>
    <FilterGroup title="Type">
      <CheckboxFilter options={entityTypes} value={filters.types} onChange={setTypes} />
    </FilterGroup>
    <FilterGroup title="Date">
      <DateRangeFilter start={dateStart} end={dateEnd} onChange={setDateRange} />
    </FilterGroup>
    <FilterGroup title="Status">
      <SelectFilter options={statusOptions} value={filters.status} onChange={setStatus} />
    </FilterGroup>
  </FiltersPanel>
  <ResultsArea>
    <ResultTypeTabs tabs={resultTabs} active={activeTab} onChange={setActiveTab} />
    {results.length > 0 ? (
      <ResultList>
        {results.map(result => (
          <ResultCard key={result.id} {...result} onClick={() => openResult(result)} />
        ))}
      </ResultList>
    ) : (
      <NoResults query={query} suggestions={suggestedQueries} />
    )}
    <Pagination page={page} total={totalPages} onChange={setPage} />
  </ResultsArea>
</SearchPage>
```

---

## Related Patterns

| Pattern | Relationship |
|---------|-------------|
| [CRUD-Pattern.md](CRUD-Pattern.md) | Search results can be entities managed via CRUD |
| [AI-Workspace-Pattern.md](AI-Workspace-Pattern.md) | AI search variant delegates to AI workspace for complex queries |
| [Dashboard-Pattern.md](Dashboard-Pattern.md) | Global search accessible from dashboard topbar |
| [Upload-Pattern.md](Upload-Pattern.md) | Search finds uploaded documents and files |

## Dependencies

| Component | Usage |
|-----------|-------|
| [SearchInput](../Forms/SearchInput.md) | Search entry point |
| [CommandPalette](../Navigation/CommandPalette.md) | Global search overlay |
| [Input](../Forms/Input.md) | Search text input |
| [Select](../Forms/Select.md) | Filter dropdowns |
| [DatePicker](../Forms/DatePicker.md) | Date range filters |
| [Checkbox](../Forms/Checkbox.md) | Multi-select filters |
| [Slider](../Forms/Slider.md) | Range filters |
| [Chip](../Core/Chip.md) | Filter chips |
| [Tag](../Core/Tag.md) | Result type tags |
| [Badge](../Core/Badge.md) | Result counts |
| [Pagination](../Navigation/Pagination.md) | Page navigation |
| [Card](../Core/Card.md) | Result cards |
| [List](../Data/List.md) | Result list |
| [EmptyState](../Feedback/EmptyState.md) | No results |
| [ErrorState](../Feedback/ErrorState.md) | Error state |
| [Skeleton](../Feedback/Skeleton.md) | Loading results |
| [Divider](../Core/Divider.md) | Result category separators |

## Anti-patterns

1. **No debounce** — Always debounce search at 300ms minimum.
2. **Search without loading indicator** — Show spinner during search.
3. **No empty state guidance** — Empty results must show suggestions.
4. **Hiding clear button** — Clear button must always be present when input has value.
5. **No filter feedback** — Active filters must be visible and individually removable.
6. **Search on every keystroke without debounce** — Debounce is mandatory.
7. **No keyboard navigation** — Results must be navigable via arrow keys.
8. **No recent searches** — Recent searches improve discoverability and speed.
9. **Highlighting without `<mark>`** — Use semantic `<mark>` for match highlighting.
10. **No result categorization** — Mixed-type results must be categorized or have type tabs.
