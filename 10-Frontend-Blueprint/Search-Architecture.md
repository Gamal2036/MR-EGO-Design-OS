# Search Architecture

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-4 ([Header/Global-Search.md](../05-Application-Shell/Header/Global-Search.md)), DP-6 ([Job-Flow.md](../06-UX-Architecture/Job-Flow.md))

---

## Purpose

Defines the search architecture — global search, module-specific search, filtering system, indexing strategy, result presentation, and performance budget.

---

## Search Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    SEARCH SYSTEM                          │
├─────────────────────────────────────────────────────────┤
│  Global Search                                            │
│  Cross-module, Ctrl+Shift+F, categorized results         │
├─────────────────────────────────────────────────────────┤
│  Module Search                                            │
│  Module-specific, embedded in module pages               │
├─────────────────────────────────────────────────────────┤
│  Filter Engine                                            │
│  Faceted filters, range filters, toggle filters          │
├─────────────────────────────────────────────────────────┤
│  Index Layer                                              │
│  Client-side index (static), server search (dynamic)     │
├─────────────────────────────────────────────────────────┤
│  Result Presentation                                      │
│  Category groups, highlights, preview, quick actions     │
└─────────────────────────────────────────────────────────┘
```

---

## Search Types

| Type | Scope | Trigger | Debounce |
|------|-------|---------|----------|
| Global | All modules | Ctrl+Shift+F or search icon | 300ms |
| Job search | Jobs module | /jobs page search input | 200ms |
| Document search | Documents module | /documents page | 300ms |
| Filter search | Current list | Filter panel inputs | 400ms |
| Command palette | Commands | Ctrl+K | 100ms |
| Quick find | Current page | Ctrl+F | 200ms |

---

## Global Search

```typescript
// Pseudocode
interface GlobalSearchResult {
  query: string;
  results: CategorizedResults;
  total: number;
  took: number;            // ms
}

interface CategorizedResults {
  jobs: SearchItem[];
  documents: SearchItem[];
  cv: SearchItem[];
  applications: SearchItem[];
  profile: SearchItem[];
  settings: SearchItem[];
  help: SearchItem[];
}

interface SearchItem {
  id: string;
  title: string;
  description: string;
  url: string;
  module: string;
  icon: string;
  highlights: HighlightRange[];
  matchType: 'exact' | 'partial' | 'fuzzy';
}
```

---

## Filter Engine

### Filter Types

```typescript
// Pseudocode
interface FilterDefinition {
  id: string;
  label: string;
  type: FilterType;
  source: FilterSource;
  options?: SelectOption[];      // For select/multi-select
  range?: RangeConfig;           // For range sliders
  defaultValue: FilterValue;
}

enum FilterType {
  Text,           // Free text input
  Select,         // Single select dropdown
  MultiSelect,    // Multi-select dropdown
  Range,          // Numeric range slider
  DateRange,      // Date range picker
  Toggle,         // Boolean toggle
  Checkbox,       // Multi-checkbox group
  Radio,          // Single select radio group
}

// Example: Job search filters
const jobFilters: FilterDefinition[] = [
  { id: 'keyword', type: Text, label: 'Keyword' },
  { id: 'location', type: Text, label: 'Location' },
  { id: 'remote', type: Toggle, label: 'Remote Only' },
  { id: 'salaryMin', type: Range, label: 'Salary Range', range: { min: 0, max: 300000, step: 10000 } },
  { id: 'jobType', type: MultiSelect, label: 'Job Type', options: ['Full-time', 'Part-time', 'Contract'] },
  { id: 'experience', type: Select, label: 'Experience Level', options: ['Entry', 'Mid', 'Senior', 'Lead'] },
];
```

### Filter State

```typescript
// Pseudocode
interface FilterState {
  active: Record<string, FilterValue>;
  saved: SavedFilter[];
  recent: RecentFilter[];
}

interface SavedFilter {
  id: string;
  name: string;
  filters: Record<string, FilterValue>;
  createdAt: Date;
}

// Filter state persistence
FilterState saved to:
  - localStorage (session filters)
  - Server (saved filters, cross-device)
  - URL params (shareable search)
```

---

## Indexing Strategy

| Data | Index | Location | Update |
|------|-------|----------|--------|
| Jobs | Server-side | API | Real-time |
| Documents | Server + client | API + local | On access + sync |
| CV | Server-side | API | On upload |
| Settings | Client-side | Local | Static |
| Help articles | Client-side | Bundled | Per build |
| Navigation | Client-side | Local | Static |
| User data | Server-side | API | Real-time |

---

## Search Performance Budget

| Metric | Target |
|--------|--------|
| Search response | < 200ms (p95) |
| Filter apply | < 100ms |
| Result render | < 50ms |
| Global search response | < 500ms |
| Client-side filter | < 50ms |
| Typeahead suggestions | < 100ms |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Command-Palette.md](Command-Palette.md) | Command palette search |
| [Navigation-Architecture.md](Navigation-Architecture.md) | Search as navigation entry point |
| [DP-4 Global Search](../05-Application-Shell/Header/Global-Search.md) | Source global search specification |

---

## Validation Notes

1. Search is debounced per type — no excessive API calls on keystroke.
2. Filters are shareable via URL parameters.
3. Saved filters persist across sessions and devices.
4. Client-side index handles static data (navigation, help, settings).
5. Search results are categorised and highlighted for scannability.
