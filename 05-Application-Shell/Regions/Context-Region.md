# Context Region

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Panel.md](../../04-Component-Library/Layout/Panel.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 12)

---

## Purpose

The Context Region displays information and actions relevant to the user's current selection or focus. It appears and updates dynamically based on context.

---

## Composition

```
ContextRegion
├── RegionHeader
│   ├── ContextTitle (derived from selection)
│   └── RegionActions (pin, close)
└── RegionBody
    └── (context-dependent components)
```

---

## Behavior

| Behavior | Description |
|----------|-------------|
| Auto-show | Appears when an item is selected or focused |
| Auto-update | Content updates when selection changes |
| Auto-hide | Collapses when nothing is selected |
| Position | Right panel (desktop), bottom sheet (mobile) |
| Width | 320-480px |
| Pin | User can pin context region to keep it open |
| Stack | Stacks with AI Region in the right panel |

---

## Context Sources

| Source | Content Displayed |
|--------|------------------|
| Row selection | Row details, actions |
| File selection | File preview, metadata |
| Text selection | AI explain, copy, search |
| Notification click | Notification details |
| Search result | Result preview |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [AI-Region.md](AI-Region.md) | AI region that stacks near context |
| [Inspector-Region.md](Inspector-Region.md) | Detailed inspection region |

---

*The Context Region is the workspace's context-aware information surface. It shows what the user needs based on what they are doing.*
