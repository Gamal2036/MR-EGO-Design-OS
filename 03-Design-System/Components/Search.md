# Search

**Phase:** DP-2 (Design System)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md), [Motion-System.md](../../02-Design-Language/Motion-System.md), [Layout-Principles.md](../../02-Design-Language/Layout-Principles.md))

---

## Purpose

Search enables users to find content, features, and actions across MR:EGO without navigating through menus. It ranges from simple text filtering to AI-powered natural language discovery.

---

## When to Use

- Global content discovery across all modules
- Local filtering within a list, table, or section
- Command-based navigation and action execution
- AI-powered natural language queries
- Filter and suggestion-driven exploration

## When NOT to Use

- Navigating between 2-3 well-known pages — use navigation components
- Selecting from a small set of options — use select or dropdown
- Displaying all available content — users should browse, not always search

---

## Variants

### Global Search

Primary search entry point available from every screen.

| Property | Value |
|----------|-------|
| Position | Top navigation bar, prominent |
| Trigger | Search icon + keyboard shortcut Cmd+K / Ctrl+K |
| Expanded width | 480px (desktop), full-width minus margins (mobile) |
| Input height | 40px |
| Shortcut hint | "Cmd+K" displayed inside input |

| State | Behavior |
|-------|----------|
| Default | Placeholder text "Search jobs, documents, people..." |
| Focus | Expands, shows recent searches |
| Typing | Results appear after 200ms debounce |
| Results | Categorized dropdown below input |
| Empty | "No results for [query]. Try different terms." |

### Local Search

In-page search for filtering content within a specific section.

| Property | Value |
|----------|-------|
| Position | Above list or table, left-aligned |
| Width | 280px (default), 360px (wide) |
| Icon | Search icon, left |
| Clear | X icon appears when input has value |
| Behavior | Filters results in real-time (100ms debounce for lists, 300ms for APIs) |

### AI Search

Natural language search that interprets intent rather than matching keywords.

| Property | Value |
|----------|-------|
| Input | Same as search input but with AI sparkle icon |
| Placeholder | "Ask MR:EGO anything..." or "What are you looking for?" |
| Processing | Thinking indicator during analysis |
| Results | AI-generated summary + matched results below |
| Confidence | High/Medium/Low badge on results |
| Feedback | Thumbs up/down on each AI result |
| Source | "Based on your profile" or "From your documents" |

### Filters

Structured refinement of search results.

| Component | Specification |
|-----------|---------------|
| Filter bar | Row of filter chips + "Clear all" link |
| Filter chip | Removable chip showing active filter value |
| Filter dropdown | Select or multi-select per filter category |
| Date range | Date picker pair (from/to) |
| Sort | Dropdown with sort options |
| Results count | "47 results" text next to filters |
| Responsive | Filters collapse to "Filters" button on mobile |

### Suggestions

Predictive suggestions as the user types.

| Property | Value |
|----------|-------|
| Trigger | After 2 characters typed (200ms debounce) |
| Position | Dropdown below search input |
| Categories | Recent searches, trending, people, documents |
| Suggestion style | Text with matching characters highlighted |
| Max suggestions | 8 (total across all categories) |
| Keyboard | Arrow keys navigate, Enter selects |

### Command Search

Action-oriented search (command palette) triggered by Cmd+K.

| Property | Value |
|----------|-------|
| Trigger | Cmd+K / Ctrl+K from anywhere |
| Overlay | Full-screen glass overlay (Layer 5) |
| Input | Centered, 600px width |
| Categories | Actions, Pages, People, Settings |
| Action items | Icon + label + shortcut hint |
| Select | Executes action or navigates to page |
| Dismiss | Esc, click outside, or Cmd+K toggle |

---

## Search Anatomy

```
Global Search:
┌──────────────────────────────────────────────┐
│  [Search Icon]  Search placeholder...  [Cmd+K]  │
└──────────────────────────────────────────────┘
            ↓ (on focus)
┌──────────────────────────────────────────────┐
│  [Search Icon]  user query           [Clear]  │
├──────────────────────────────────────────────┤
│  Recent Searches                              │
│  ┌────────────────────────────────────────┐  │
│  │ 🕐 data analyst                        │  │
│  │ 🕐 senior engineer                     │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Results (42)                                │
│  ┌────────────────────────────────────────┐  │
│  │ 📄 Senior Data Analyst - Acme Corp     │  │
│  │ 📄 Data Scientist - Beta Inc          │  │
│  │ 👤 Jane Smith - Data Analytics Lead   │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  [View all results →]                        │
└──────────────────────────────────────────────┘
```

---

## Spacing

| Context | Value | Token |
|---------|-------|-------|
| Search input to results | 4px | Space-2 |
| Result item padding | 10px 12px | Space-3 Space-4 |
| Between result items | 2px | Space-1 |
| Between categories | 8px | Space-3 |
| Category label margin | 8px above, 4px below | Space-3, Space-2 |
| Filter chip spacing | 8px | Space-3 |
| Suggestions item padding | 8px 12px | Space-3 Space-4 |

---

## States

| State | Visual |
|-------|--------|
| Default | Border-Default, placeholder text |
| Focus | Border-Focus, 2px ring, results dropdown |
| Typing | Debounced, results updating |
| Loading | Skeleton results (3-4 lines) |
| Results | Categorized list with counts |
| Empty | "No results" state with suggestion |
| Error | "Search unavailable" with retry |
| Disabled | 0.4 opacity (rare — search is always available) |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Search role | `combobox` with `aria-expanded` for autocomplete |
| Results role | `listbox` with `aria-activedescendant` for selection |
| Input label | `aria-label="Search"` (if no visible label) |
| Clear button | `aria-label="Clear search"` |
| Keyboard | Arrow keys navigate results, Enter selects, Esc closes |
| Focus trap | Command palette traps focus, Esc returns to origin |
| Live region | Results count announced with `aria-live="polite"` |
| Dismiss | Always available via Esc or click outside |

---

## Responsive Behavior

| Breakpoint | Change |
|------------|--------|
| Mobile (<768px) | Search becomes full-width below top bar. Filters collapse to button. Command palette full-screen. |
| Tablet (768-1023px) | Global search in top bar. Filter bar wraps. |
| Desktop (1024px+) | Standard experience. Full filter bar visible. |
| Command palette | Centered overlay on all sizes. Full-screen on mobile. |

---

## Future Expansion

- **Voice search** — Microphone icon for speech-to-text query
- **Semantic search** — AI interprets meaning beyond keyword matching
- **Cross-module search** — Results unified across all enabled modules
- **Saved searches** — Persist frequently used search queries
- **Search analytics** — Show trending searches and popular results
- **Natural language filters** — "Jobs posted last week in San Francisco"

---

## Related Components

- [Navigation.md](Navigation.md) — Command palette as navigation feature
- [Forms.md](Forms.md) — Search input extends text input patterns
- [Cards.md](Cards.md) — Search results may display as cards
- [Tables.md](Tables.md) — Local search + filter for table data
- [AI-Components.md](AI-Components.md) — AI search results with confidence badges
- [EmptyStates.md](EmptyStates.md) — No search results empty state
- [Feedback.md](Feedback.md) — Search error state toast
