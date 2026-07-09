# RecommendationPanel

> Container component that groups multiple AI-generated recommendations with sorting, filtering, and ranking controls.

---

## Purpose

Presents a ranked list of AI-generated recommendations in a structured, scannable container. Allows users to sort, filter, and review multiple suggestions before taking action.

## Responsibilities

- Display a panel header with title and count of recommendations
- Provide sort controls (by confidence, by date, by relevance — default: confidence descending)
- Provide filter controls (by confidence level, category, source type)
- Render a ranked list of RecommendationCard components
- Show a "View all N recommendations" toggle when collapsed/list truncated
- Indicate overall panel confidence summary
- Support empty state when no recommendations match filters

## Composition

```
┌──────────────────────────────────────┐
│ Recommendations (12)    [Sort ▼] [Filter ▼] │
│ Panel confidence: High                  │
│ ┌────────────────────────────────────┐ │
│ │ #1 RecommendationCard              │ │
│ │ Confidence: High ████████░░ 85%    │ │
│ │ "Implement just-in-time inventory" │ │
│ │ [Apply] [Details]                  │ │
│ ├────────────────────────────────────┤ │
│ │ #2 RecommendationCard              │ │
│ │ Confidence: Medium ██████░░ 62%   │ │
│ │ "Switch to supplier B"            │ │
│ │ [Apply] [Details]                  │ │
│ ├────────────────────────────────────┤ │
│ │ #3 RecommendationCard              │ │
│ │ Confidence: Low ████░░░░ 38%      │ │
│ │ "Expand warehouse capacity"       │ │
│ │ [Apply] [Details]                  │ │
│ └────────────────────────────────────┘ │
│ [View all 12 recommendations ▾]       │
└──────────────────────────────────────┘
```

## Hierarchy

- **Parent:** `div.recommendation-panel`
- **Children:** PanelHeader, SortDropdown, FilterDropdown, RecommendationList (multiple RecommendationCard), ConfidenceSummary, ToggleButton

## Props Contract (TypeScript)

```typescript
interface RecommendationPanelProps {
  /** Unique identifier */
  id: string;
  /** Array of recommendations to display */
  recommendations: Recommendation[];
  /** Panel title */
  title?: string;
  /** Current sort method */
  sortBy?: "confidence" | "date" | "relevance";
  /** Sort direction */
  sortDirection?: "asc" | "desc";
  /** Active filters */
  filters?: RecommendationFilter;
  /** Maximum recommendations to show before truncation (0 = all) */
  maxVisible?: number;
  /** Whether panel is collapsed */
  collapsed?: boolean;
  /** Callback when sort changes */
  onSortChange?: (sort: string, direction: "asc" | "desc") => void;
  /** Callback when filter changes */
  onFilterChange?: (filter: RecommendationFilter) => void;
  /** Callback when collapsed state toggles */
  onToggle?: (id: string, collapsed: boolean) => void;
  /** Callback when a recommendation action is triggered */
  onAction?: (recommendationId: string, actionId: string) => void;
  /** Custom class name */
  className?: string;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  confidence: number;           // 0–100
  confidenceLevel: "high" | "medium" | "low";
  category?: string;
  sourceTypes?: string[];
  createdAt: string;             // ISO 8601
  actions?: ActionCTA[];
}

interface RecommendationFilter {
  confidenceLevels?: ("high" | "medium" | "low")[];
  categories?: string[];
  sourceTypes?: string[];
  searchQuery?: string;
}

interface ActionCTA {
  id: string;
  label: string;
  icon?: string;
  primary?: boolean;
  disabled?: boolean;
}
```

## Variants

| Variant    | Description                                                      |
|------------|------------------------------------------------------------------|
| `default`  | Full panel with header, controls, ranked list                    |
| `compact`  | No header, no sort/filter, simple ranked list                    |
| `sidebar`  | Narrow layout, icon-only actions, condensed cards                |
| `modal`    | Full-screen overlay with all recommendations and advanced filters|

## States

| State       | Visual                                                          |
|-------------|-----------------------------------------------------------------|
| Populated   | List of recommendations with controls visible                   |
| Empty       | "No recommendations found" illustration, adjust-filters prompt  |
| Loading     | 3–5 skeleton card placeholders with pulsing animation           |
| Filtered    | Active filters shown as removable chips above the list          |
| Error       | "Failed to load recommendations" with retry and fallback message|

## Accessibility

- Header: `role="heading"`, `aria-level="2"`
- List: `role="list"` with `aria-label="Recommendations"`
- Each card: `role="listitem"`
- Sort/Filter: `<select>` or combobox pattern with visible label
- Filter chips: `role="button"`, `aria-label="Remove filter: High confidence"`
- Empty state: `role="status"`
- Loading: `aria-busy="true"` on the list container
- Skip-to-results link if many controls before list

## Responsive Rules

| Breakpoint | Behavior                                                         |
|------------|------------------------------------------------------------------|
| ≥ 1024px   | Full layout, inline sort/filter controls, 3 cards visible above fold |
| 640–1023px | Sort/filter stacked, recommendations full width                  |
| < 640px    | Compact variant, no sort/filter (inline only), maxVisible forced to 3 |

## Animation Rules

| Element              | Trigger            | Duration | Easing     |
|----------------------|--------------------|----------|------------|
| Card list stagger    | Mount/filter       | 300ms    | ease-out   |
| Card reorder         | Sort change        | 400ms    | ease-in-out |
| Filter chips appear  | Filter applied     | 200ms    | ease-out   |
| Panel collapse       | Toggle             | 300ms    | ease-in-out |
| Skeleton pulse       | Loading            | 1.5s     | ease-in-out |

## Future Expansion

- Comparison mode: select 2–3 recommendations side-by-side
- "Explain why not" — show counter-arguments per recommendation
- Batch apply multiple recommendations
- Recommendation history (previously applied/dismissed)
- Export all recommendations as CSV or PDF
- User feedback per recommendation (thumbs per card)

## Dependencies

- [RecommendationCard](./RecommendationCard.md) — each list item
- [ConfidenceBadge](./ConfidenceBadge.md) — displayed per recommendation
- Dropdown/select component for sort and filter
- Chip/tag component for active filters

## Related Components

- [ConfidenceBadge](./ConfidenceBadge.md) — used within each card
- [ReasoningPanel](./ReasoningPanel.md) — linked from individual cards for "why this recommendation"
- [AIMessage](./AIMessage.md) — AI message that may contain inline recommendations

## Anti-patterns

- Do NOT show more than 20 recommendations by default — paginate or "View all"
- Do NOT mix recommendation types without category grouping or labels
- Do NOT hide the confidence indicator on individual cards
- Do NOT auto-apply recommendations without explicit user action
- Do NOT remove sort/filter on mobile — provide a slide-out or bottom sheet instead

## Performance Notes

- Virtualize the recommendation list if more than 20 items are displayed
- Memoize sorted/filtered results to avoid re-computation on unrelated re-renders
- Lazily load recommendation details (description, sources) when card is expanded or scrolled into view
- Debounce search filter input (300ms)
- Sort operations should be O(n log n) or better — pre-sort data if possible
