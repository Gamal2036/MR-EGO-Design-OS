# Secondary Region

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([SplitView.md](../../04-Component-Library/Layout/SplitView.md)), DP-1 ([Layout-Principles.md](../../02-Design-Language/Layout-Principles.md))

---

## Purpose

The Secondary Region provides supporting content alongside the Primary Region. It is optional and appears only when the layout requires it.

---

## Composition

```
SecondaryRegion
├── RegionHeader
│   ├── RegionTitle
│   └── RegionActions (collapse, resize)
└── RegionBody
    └── (components — list, related items, etc.)
```

---

## Behavior

| Behavior | Description |
|----------|-------------|
| Position | Right of Primary Region (desktop), below (mobile) |
| Width | 280-480px (desktop), 100% (mobile stacked) |
| Resizable | Width adjustable via left-edge drag handle |
| Collapsible | Can collapse to thin tab or close entirely |
| Independent scroll | Scrolls independently of Primary Region |
| Visibility | Hidden when empty |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Primary-Region.md](Primary-Region.md) | Primary counterpart |
| [Workspace/Split-Workspace.md](../Workspace/Split-Workspace.md) | Split workspace configurations |

---

*The Secondary Region supports the primary task with related information. It adapts responsively and collapses when not needed.*
