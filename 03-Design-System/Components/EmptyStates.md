# Empty States

**Phase:** DP-2 (Design System)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Illustration-Guidelines.md](../../02-Design-Language/Illustration-Guidelines.md), [Empty-State-System.md](../../02-Design-Language/Empty-State-System.md))

---

## Purpose

Empty states appear when content areas have no data to display. They are not blank spaces — they are opportunities to educate, guide, or encourage the user to take the next step.

---

## When to Use

- Lists, tables, and content areas with zero items
- Search or filter results that return no matches
- First-time user experience (no data yet)
- Feature not yet enabled or available
- After all items have been archived or deleted

## When NOT to Use

- Loading state before content arrives — use skeleton screens
- Error state when data failed to load — use error patterns
- Hidden or permission-restricted content — use access-denied empty state
- Content that should never be empty (configuration required)

---

## Variants

### No Jobs

First-time or cleared career feed.

| Element | Specification |
|---------|---------------|
| Illustration | Briefcase/search illustration (160px) |
| Title | "No jobs yet" |
| Description | "Save jobs to track them here. We'll also suggest roles based on your profile." |
| Primary action | "Browse jobs" |
| Secondary action | "Complete your profile for better matches" |

### No Documents

Empty document library.

| Element | Specification |
|---------|---------------|
| Illustration | Document/file illustration (160px) |
| Title | "No documents yet" |
| Description | "Create your first document — resume, cover letter, or portfolio." |
| Primary action | "Create document" |
| Secondary action | "Import existing document" |

### No AI Results

AI analysis or recommendation with no output.

| Element | Specification |
|---------|---------------|
| Illustration | AI/sparkle illustration (160px) |
| Title | "No AI insights yet" |
| Description | "MR:EGO AI needs data to generate insights. Add your experiences and skills to get started." |
| Primary action | "Add experiences" |
| Secondary action | "Learn about AI features" |

### No Messages

Empty messaging or communication inbox.

| Element | Specification |
|---------|---------------|
| Illustration | Message/chat illustration (160px) |
| Title | "No messages" |
| Description | "Messages from connections and MR:EGO will appear here." |
| Primary action | "Connect with professionals" |
| Secondary action | (none) |

### No Search Results

Search or filter returned zero matches.

| Element | Specification |
|---------|---------------|
| Illustration | Search/magnifying glass illustration (120px) |
| Title | "No results for [query]" |
| Description | "Try adjusting your search terms or filters." |
| Primary action | "Clear filters" |
| Secondary action | "Browse all [content type]" |

### No Notifications

Empty notification panel.

| Element | Specification |
|---------|---------------|
| Illustration | Bell/notification illustration (120px) |
| Title | "All caught up" |
| Description | "You'll see notifications here when there's activity related to your career." |
| Primary action | (none) |
| Secondary action | (none) |

---

## Empty State Anatomy

```
┌──────────────────────────────────────────┐
│                                          │
│              [Illustration]              │
│           120-240px, centered            │
│                                          │
│           ✦ Title (Heading-3)            │
│                                          │
│      Description text (Body, 1-2 lines)  │
│       Text-Secondary color centered        │
│                                          │
│        [Primary Action Button]           │
│                                          │
│          Secondary action (link)         │
│                                          │
└──────────────────────────────────────────┘
```

---

## Sizing

| Element | Value |
|---------|-------|
| Illustration size | 120px-240px (desktop), 80px-120px (mobile) |
| Title font | Heading-3 or Heading-4 |
| Description font | Body (15px), Text-Secondary |
| Max width | 400px (centered) |
| Container | Full available area, vertically centered |

---

## Spacing

| Context | Value | Token |
|---------|-------|-------|
| Illustration bottom margin | 24px | Space-7 |
| Title bottom margin | 8px | Space-3 |
| Description bottom margin | 24px | Space-7 |
| Button to secondary action | 12px | Space-4 |
| Container vertical padding | 64px | Space-11 |
| Container horizontal padding | 24px | Space-7 |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Heading role | `role="heading"` on title, proper heading level |
| Illustration | `aria-hidden="true"` with empty `alt=""` (decorative) |
| Action button | Standard button accessibility ([Buttons.md](Buttons.md)) |
| Region | Empty state is a `region` with `aria-label` describing the content area |
| Screen reader | Announce empty state when content area loads with no data |

---

## Responsive Behavior

| Breakpoint | Change |
|------------|--------|
| Mobile (<768px) | Smaller illustration (80px). Reduced vertical padding (48px). |
| Tablet (768-1023px) | Standard. 120px illustration. |
| Desktop (1024px+) | Full size. 160-240px illustration. |

---

## Future Expansion

- **Feature empty state** — "Enable [Module] to get started" with toggle
- **Permission empty state** — "Ask your admin for access"
- **Onboarding empty state** — First-run experience with setup wizard callout
- **Migration empty state** — "Import data from [other platform]"
- **Progressive empty state** — Shows action history even when no core data exists
- **Contextual empty state** — Changes based on user role, plan, or module

---

## Related Components

- [Buttons.md](Buttons.md) — Empty state primary and secondary actions
- [Cards.md](Cards.md) — Empty cards use empty state pattern
- [Tables.md](Tables.md) — Table empty state
- [Search.md](Search.md) — No search results empty state
- [Dashboard-Components.md](Dashboard-Components.md) — Dashboard widget empty state
- [AI-Components.md](AI-Components.md) — AI results empty state
- [Loading.md](Loading.md) — Loading state before empty state is determined
