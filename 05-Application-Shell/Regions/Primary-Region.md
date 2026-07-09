# Primary Region

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([ContentArea.md](../../04-Component-Library/Layout/ContentArea.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 2)

---

## Purpose

The Primary Region is the main content area where the user's primary task takes place. It is the only region that is always present in every layout.

---

## Composition

```
PrimaryRegion
├── PageHeader
│   ├── PageTitle
│   ├── PageDescription (optional)
│   └── PageActions (toolbar)
├── PageBody
│   ├── Section[]
│   │   ├── Section.Header
│   │   ├── Section.Body (Grid, Stack, Components)
│   │   └── Section.Footer
│   └── ...
└── PageFooter (optional)
    ├── Metadata
    └── Pagination
```

---

## Sizing

| Layout Variant | Max Width | Padding |
|---------------|-----------|---------|
| sm | 640px | 16px |
| md | 768px | 24px |
| lg | 1024px | 32px |
| xl | 1280px | 32px |
| full | 100% | 32px |

---

## Behavior

| Behavior | Description |
|----------|-------------|
| Scroll | Primary scroll container for the page |
| Focus target | Skip link targets this region |
| Loading state | Skeleton screens matching content layout |
| Empty state | Page-appropriate empty state with action |
| Error state | Error message with recovery options |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Secondary-Region.md](Secondary-Region.md) | Supporting region alongside primary |
| [Workspace/Content-Zones.md](../Workspace/Content-Zones.md) | Content zones within primary region |
| [Workspace/Scrolling-Rules.md](../Workspace/Scrolling-Rules.md) | Scroll behavior |

---

*The Primary Region is where the user's work happens. It is always present and always focused on the primary task.*
