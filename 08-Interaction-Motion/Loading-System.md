# Loading System

**Phase:** DP-8 (Interaction & Motion System)
**Design Authority:** DP-1 ([Loading-System.md](../02-Design-Language/Loading-System.md)), DP-2 ([Components/Loading.md](../03-Design-System/Components/Loading.md))
**Inherits:** All loading patterns, timing, and rules from DP-1 and DP-2

---

## Loading Philosophy

Loading states communicate that work is happening. They keep the user informed and assured that the system is responsive. MR:EGO uses skeleton screens as the primary loading pattern — they show content structure before content arrives, reducing perceived wait time.

---

## Loading Pattern Decision Tree

```
User action triggers load
        │
        ├── <100ms expected → No loading state needed
        │
        ├── 100ms–1s expected → Skeleton screen (content-replacing)
        │
        ├── 1s–5s expected → Skeleton + progress indication
        │
        ├── 5s+ expected → Progress bar + cancel option
        │
        ├── Background operation → Subtle indicator (no skeleton)
        │
        ├── AI operation → Thinking animation + streaming
        │
        └── Upload/Download → Determinate progress bar
```

---

## Smart Loading

### Progressive Loading Order

```
1. Shell layout (sidebar, topbar, regions) — <500ms
2. Skeleton placeholders for content — <800ms
3. Critical data (text, numbers, titles) — <2s
4. Visual enhancements (charts, trends) — <3s
5. AI insights (recommendations, analysis) — 3-10s
```

### Priority-Based Loading

| Priority | Content Type | Loading Pattern | Target |
|----------|-------------|-----------------|--------|
| P0 | Page title, navigation | Instant (no loading) | <100ms |
| P1 | Primary content, text | Skeleton → content | <2s |
| P2 | Secondary content, lists | Skeleton → stagger in | <3s |
| P3 | Charts, visualizations | Chart skeleton → animate in | <4s |
| P4 | AI recommendations | Thinking → stream in | 3-10s |

### Context-Aware Loading

Different loading patterns for different contexts:

| Context | Pattern | Rationale |
|---------|---------|-----------|
| Initial page load | Full skeleton screen | User hasn't seen content yet |
| Tab switch | Content cross-fade | Quick switch, no skeleton needed |
| Filter/refresh | Content overlay skeleton | User knows existing content |
| Pagination | Spinner at load point | User is at bottom, no layout shift |
| Background sync | Subtle icon indicator | Silent, non-blocking |
| Form submission | Button spinner + disable | Inline, action-specific |

---

## Lazy Loading

| Pattern | Behavior | Visual |
|---------|----------|--------|
| Below-fold content | Loads when scrolled near | Content appears with stagger |
| Image loading | Placeholder → fade in | Blur placeholder → image |
| Infinite scroll | Loads on scroll near bottom | Spinner at list end |
| Tab content | Loads on tab activation | Content cross-fade |
| Section expand | Loads on expand trigger | Section skeleton → content |
| Modal content | Loads on modal open | Skeleton inside modal |

### Lazy Loading Rules

1. Lazy-loaded content shows a skeleton matching its final layout
2. Images use a low-resolution blur-up placeholder before full image
3. Below-fold content never triggers full-page loading
4. Lazy-loaded content loads within 500ms of entering viewport
5. Offscreen content is not loaded until needed

---

## Background Tasks

| Task Type | Visual | Progress | Cancel |
|-----------|--------|----------|--------|
| Data sync | Subtle icon in top bar | Indeterminate | No |
| Export | Progress bar in notification | Determinate | Yes |
| Import | Progress dialog | Determinate | Yes |
| AI processing | AI indicator pulse | Indeterminate | Yes |
| Batch operation | Batch progress counter | Determinate | Per-item |
| Cache rebuild | No visual | Background | No |

### Background Task Rules

1. Background tasks never block the user interface
2. Non-critical background tasks show no visual indicator
3. Background task completion triggers a toast notification
4. Background task failure triggers an error notification
5. Multiple background tasks appear in a single status indicator

---

## Streaming Results

| Pattern | Behavior | Duration |
|---------|----------|----------|
| AI text generation | Words appear progressively | Variable |
| Search results | Results appear as typed (debounced) | 300ms debounce |
| Data load with pagination | First page shows immediately, rest streams | Variable |
| Real-time updates | Data points append without transition | Instant |

### Streaming Rules

1. Streaming content is readable as it appears (no flicker or jump)
2. Streaming AI content includes a cursor/blinking indicator
3. Streaming can be interrupted by user action
4. Completed streaming shows a completion indicator
5. Failed streaming shows partial content with error state

---

## Optimistic UI

| Action | Optimistic Pattern | Error Fallback |
|--------|-------------------|----------------|
| Toggle switch | State changes immediately | Revert to previous state |
| Save draft | "Saved" indicator shows | "Save failed" with retry |
| Delete item | Item removed from list | Item reappears with error |
| Send message | Message appears in conversation | Error badge on message |
| Reorder items | Items reorder immediately | Revert to original order |
| Add item | Item appears with loading state | Remove with error toast |

### Optimistic Update Rules

1. Optimistic updates show the final state before confirmation
2. Failed optimistic updates revert with a smooth reverse animation
3. Undo is available for 5 seconds after optimistic delete
4. Optimistic creates show a loading indicator until confirmed
5. Error rollback includes a clear explanation toast

---

## Retry Flow

| Phase | Behavior | Duration |
|-------|----------|----------|
| Initial failure | Error state with retry button | Immediate |
| Auto-retry | 3 attempts with exponential backoff | 1s, 2s, 4s |
| Retry triggered | Loading state re-appears | 100ms |
| Retry success | Content replaces error state | 200ms transition |
| Retry exhausted | Persistent error with alternative actions | — |

---

## Loading Timing by Action

| Action | Loading Pattern | Expected Duration |
|--------|----------------|-------------------|
| Page navigation | Skeleton → content | 300ms transition + 2s data |
| Tab switch | Cross-fade | 200ms |
| Search | Debounce → gradual results | 300ms debounce |
| Filter | Content overlay | 200ms |
| Save | Optimistic + brief indicator | 100ms optimistic |
| Upload | Progress bar | File-size dependent |
| Download | Progress indicator | File-size dependent |
| Export | Progress bar | Data-size dependent |
| AI analysis | Thinking → streaming | 3-10s |
| Dashboard load | Skeleton → stagger in | 2s total |

---

## Loading State Accessibility

| Element | ARIA Attribute | Announcement |
|---------|---------------|--------------|
| Skeleton | `aria-hidden="true"` | Not announced |
| Spinner | `role="status"` + `aria-label="Loading"` | "Loading" |
| Progress bar | `role="progressbar"` + `aria-valuenow/min/max` | "45% complete" |
| Page loading | `aria-busy="true"` on main region | "Page loading" |
| Background task | `aria-live="polite"` | "Sync complete" |
| Error loading | `role="alert"` | "Failed to load" |

---

*This Loading System defines all loading experiences. Refer to [Skeleton-System.md](Skeleton-System.md) for skeleton specifications, [Feedback-System.md](Feedback-System.md) for feedback animations, and [AI-Interactions.md](AI-Interactions.md) for AI-specific loading.*
