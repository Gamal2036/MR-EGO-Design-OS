# State — Loading

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([LoadingState.md](../../04-Component-Library/Feedback/LoadingState.md), [Skeleton.md](../../04-Component-Library/Feedback/Skeleton.md)), DP-2 ([Loading.md](../../03-Design-System/Components/Loading.md))

---

## Purpose

Defines shell-level loading states — how the workspace appears while content is being fetched, rendered, or processed.

---

## Loading State Types

### Shell Skeleton
The initial loading state when the application first loads.

- Header skeleton (56px bar, no content)
- Sidebar skeleton (240px bar with icon placeholders)
- Content skeleton (card and text line placeholders matching layout)
- No animation (static skeleton) if `prefers-reduced-motion`

### Region Skeleton
Loading state for individual regions when they load independently.

- Primary Region: skeleton matching page layout
- Secondary Region: skeleton list items
- Context Region: skeleton detail panel
- AI Region: skeleton message bubbles

### Inline Loading
Loading indicator within a section or component.

- Spinner for small loading operations
- ProgressBar for determinate operations (uploads, exports)
- SkeletonText for text placeholders

### Full-Page Loading
Loading state for page transitions.

- Skeleton matching the target page layout
- Smooth transition from current page skeleton to next page skeleton
- Sub-300ms transitions show no loading state (instant navigation)
- Cross-fade between page skeletons (200ms)

---

## Loading State Rules

| Rule | Description |
|------|-------------|
| Skeletons not spinners | Use skeleton screens matching content layout. Never blank pages. |
| Animated shimmer | Skeleton shimmer animation (1.5s loop) unless reduced motion |
| Consistent layout | Skeleton dimensions match final content dimensions |
| No layout shift | Skeletons reserve space to prevent layout shift |
| Staggered reveal | Content reveals in order: header → sidebar → primary → panels |
| Timeout state | If loading exceeds 10 seconds, show error state with retry |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Error.md](Error.md) | Error state when loading fails |
| [Empty.md](Empty.md) | Empty state when loading completes with no data |
| [Architecture/Performance.md](../Architecture/Performance.md) | Loading performance budgets |

---

*Loading states ensure the workspace never shows a blank page. Skeletons provide visual continuity while content loads.*
