# Empty State System

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md))

---

## Philosophy

Empty states are not blank spaces — they are opportunities. Every empty state in MR:EGO educates, guides, or encourages the user to take the next step. An empty state that just says "No results" is a missed opportunity.

---

## Empty State Anatomy

```
┌──────────────────────────────────────┐
│                                      │
│           [Illustration]             │
│                                      │
│           Title (optional)           │
│                                      │
│       Description text (1-2 lines)   │
│                                      │
│       [Primary Action Button]        │
│                                      │
│       Secondary action (link)        │
│                                      │
└──────────────────────────────────────┘
```

### Elements

| Element | Specification |
|---------|---------------|
| Illustration | 120px–240px, centered |
| Title | Optional, Heading-3 or Heading-4 |
| Description | Body text, 1–2 lines, text-secondary color |
| Primary action | Button that resolves the empty state |
| Secondary action | Link to related content or documentation |

---

## Empty State Types

### No Data (User has not started)

| Property | Specification |
|----------|---------------|
| Illustration | Productive illustration (not empty box) |
| Title | "No [items] yet" |
| Description | "Create your first [item] to get started." |
| Action | "Create [item]" |
| Example | "No projects yet. Create your first project to track your work." |

### No Results (Search/filter returned nothing)

| Property | Specification |
|----------|---------------|
| Illustration | Search illustration (magnifying glass) |
| Title | "No results for [query]" |
| Description | "Try adjusting your search or filters." |
| Action | "Clear filters" or "Search all" |
| Example | "No results for 'senior engineer'. Try a different search term." |

### No Access (User cannot view this content)

| Property | Specification |
|----------|---------------|
| Illustration | Lock / permission illustration |
| Title | "You don't have access" |
| Description | "Contact your workspace admin to request access." |
| Action | "Request access" or "Go back" |
| Example | "This workspace is private. Ask the owner to invite you." |

### No Connection (Offline or service unavailable)

| Property | Specification |
|----------|---------------|
| Illustration | Offline / disconnected illustration |
| Title | "You're offline" |
| Description | "Some features are unavailable. We'll retry automatically." |
| Action | "Try again" |
| Example | "Can't connect to the server. Check your internet connection." |

### Feature Not Enabled

| Property | Specification |
|----------|---------------|
| Illustration | Feature illustration |
| Title | "[Feature] is available" |
| Description | "Enable [feature] to unlock [benefit]." |
| Action | "Enable [feature]" |
| Example | "Career insights are available. Enable AI recommendations to discover opportunities tailored to you." |

---

## Empty State Rules

1. **Every list, table, and content area has an empty state.** Blank pages are never acceptable.
2. **Empty states suggest a clear next action.** If the user can do something, the empty state shows it.
3. **Empty states are not error states.** They are helpful, not apologetic.
4. **Illustrations are optional.** On small screens or compact layouts, text-only empty states are preferred.
5. **Empty states never show technical information.** No error codes, no data structures.
6. **Empty states scale down.** On mobile, illustrations are smaller (80px) or removed.

---

*This Empty State System is permanent. All components in DP-2 implement these empty state patterns. Refer to [Illustration-Guidelines.md](Illustration-Guidelines.md) for illustration specifications, [Typography.md](Typography.md) for text styles, and [Color-System.md](Color-System.md) for color usage.*
