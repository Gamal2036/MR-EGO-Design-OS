# Inspector Region

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Panel.md](../../04-Component-Library/Layout/Panel.md), [Data components](../../04-Component-Library/Data/))

---

## Purpose

The Inspector Region provides detailed inspection of a selected item — showing all properties, metadata, relationships, and actions available for the selected entity.

---

## Composition

```
InspectorRegion
├── InspectorHeader
│   ├── EntityType (label)
│   ├── EntityName
│   └── InspectorActions (edit, close)
└── InspectorBody
    ├── Properties
    │   ├── Property (label + value)
    │   └── ...
    ├── Metadata
    │   ├── Created, Modified, Source
    │   └── ...
    ├── Relationships
    │   └── Related items list
    └── Activity
        └── Recent activity timeline
```

---

## Behavior

| Behavior | Description |
|----------|-------------|
| Selection-driven | Content follows the currently selected item |
| Auto-update | Updates when selection changes |
| Read-only by default | Properties are view-only. Edit button enables editing. |
| Position | Right panel, stacks with Context and AI regions |
| Width | 320-480px |
| Tabbed | Properties, Relationships, Activity as tabs |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Context-Region.md](Context-Region.md) | Context region — lighter version of inspector |
| [Region-Architecture.md](Region-Architecture.md) | Region system overview |

---

*The Inspector Region provides deep inspection of any selected entity. It reveals the full detail behind every item in the workspace.*
