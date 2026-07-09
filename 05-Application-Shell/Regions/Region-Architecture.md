# Region Architecture

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Workspace.md](../../04-Component-Library/Layout/Workspace.md), [Section.md](../../04-Component-Library/Layout/Section.md)), DP-1 ([Layout-Principles.md](../../02-Design-Language/Layout-Principles.md))

---

## Purpose

Defines the region system — the named content areas within the workspace that host all page content. Regions are the primary organizational unit of every layout.

---

## Region Types

| Region | Role | Always Present | Primary Content |
|--------|------|---------------|-----------------|
| Primary | Main task content | Yes | Page content |
| Secondary | Supporting content | No | Lists, related items |
| Context | Selection-dependent info | No | Item details |
| AI | AI interaction surface | No | Chat, reasoning |
| Inspector | Detailed inspection | No | Record details |
| Preview | Content preview | No | Documents, images |
| Floating | Detachable windows | No | Detached panels |
| Modal | Overlay dialogs | No | Dialogs, confirmations |

---

## Region Layout

```
┌─────────────────────────────────────────────────┐
│ Header                                           │
├──────┬────────────────────────────────┬──────────┤
│      │                                │          │
│Side  │    Primary Region              │ Context  │
│bar   │    (main content)              │ Region   │
│      │                                │ (opt.)   │
│      │                                │          │
│      │                                ├──────────┤
│      │                                │ AI       │
│      │                                │ Region   │
│      │                                │ (opt.)   │
├──────┴────────────────────────────────┴──────────┤
│ Footer / Status Area                              │
└─────────────────────────────────────────────────┘
```

---

## Region Rules

| Rule | Description |
|------|-------------|
| Primary always | The Primary Region exists in every layout |
| Region order | Primary → Secondary → Context (left to right) |
| No overlap | Regions do not overlap (except Floating and Modal) |
| Independent scroll | Each region scrolls independently |
| Responsive stack | On mobile, regions stack vertically |
| Region identity | Each region has a unique id and aria-label |
| Region visibility | Secondary and Context regions can be hidden |

---

## Region Responsive Behavior

| Device | Region Configuration |
|--------|---------------------|
| Desktop (1280px+) | All active regions visible side by side |
| Laptop (1024-1279px) | Primary + one secondary region visible |
| Tablet (768-1023px) | Primary + collapsible context |
| Mobile (<768px) | Primary only. Other regions accessible via tabs or navigation. |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Primary-Region.md](Primary-Region.md) | Primary region specification |
| [Secondary-Region.md](Secondary-Region.md) | Secondary region specification |
| [Context-Region.md](Context-Region.md) | Context region specification |
| [AI-Region.md](AI-Region.md) | AI region specification |
| [Inspector-Region.md](Inspector-Region.md) | Inspector region specification |
| [Preview-Region.md](Preview-Region.md) | Preview region specification |
| [Floating-Region.md](Floating-Region.md) | Floating region specification |
| [Modal-Region.md](Modal-Region.md) | Modal region specification |
| [Layouts/](../Layouts/) | Layout templates use region configurations |

---

*The region system is the structural backbone of every layout. All page content lives within these defined regions.*
