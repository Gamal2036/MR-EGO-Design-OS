# State — Empty

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([EmptyState.md](../../04-Component-Library/Feedback/EmptyState.md)), DP-2 ([EmptyStates.md](../../03-Design-System/Components/EmptyStates.md))

---

## Purpose

Defines shell-level and region-level empty states — how the workspace appears when a section, list, or view has no data to display.

---

## Empty State Types

### First-Use Empty State
When the user has no data at all (new user).

- Illustration or icon (friendly, inviting)
- Title: "Welcome to [Module Name]"
- Message: "Get started by creating your first item"
- Primary action: "Create First Item"
- Secondary action: "Learn More" (link to documentation)
- Optional: Import data action

### Module Empty State
When a module has no content yet.

- Module-specific icon
- Title: "No [items] yet"
- Message: "When you add [items], they'll appear here"
- Primary action: "Add [Item]"
- Secondary: "Browse examples" or "Import"

### Search/Filter Empty State
When a search or filter returns no results.

- Search icon
- Title: "No results found"
- Message: "Try adjusting your search or filters"
- Actions: "Clear filters" | "Search everything"
- Suggestions: Show popular searches or alternatives

### Region Empty State
When a specific region has no content.

- Compact empty state within region boundaries
- Brief message: "No [content type]"
- No action (region context) or "Add" action

---

## Empty State Rules

| Rule | Description |
|------|-------------|
| Informative | Empty states explain what belongs in that space |
| Actionable | Empty states provide at least one action to populate |
| Friendly tone | Language is encouraging, not apologetic |
| No blank spaces | Every surface has a designed empty state |
| Module-specific | Each module defines its own empty state copy |
| Dismissible | Users can dismiss actionable empty states (once acknowledged) |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Loading.md](Loading.md) | Transition from loading to empty state |
| [Error.md](Error.md) | Transition from error to empty state (after recovery) |

---

*Empty states transform blank surfaces into opportunities. They guide new users, help searchers refine queries, and ensure no surface is ever truly empty.*
