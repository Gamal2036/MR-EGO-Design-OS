# Profile Layout

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Profile-Pattern.md](../../04-Component-Library/Patterns/Profile-Pattern.md))

---

## Purpose

The Profile Layout provides a personal profile view — displaying user information, professional details, and activity in a structured, presentational format.

---

## Layout Blueprint

```
Workspace (variant: with-sidebar)
├── Header (full variant)
├── Sidebar
├── PrimaryRegion (max-width: lg — 1024px)
│   ├── ProfileHero (Section)
│   │   ├── Avatar (large)
│   │   ├── UserName
│   │   ├── UserTitle / Tagline
│   │   ├── UserLocation
│   │   └── ProfileActions [Edit Profile, Share, Export]
│   ├── ProfileNavigation (Tabs — secondary variant)
│   │   ├── Overview
│   │   ├── Experience
│   │   ├── Skills
│   │   ├── Education
│   │   └── Activity
│   └── ProfileContent (tab-dependent)
│       ├── Overview: SummaryCard + Stats + RecentActivity
│       ├── Experience: Timeline
│       ├── Skills: Tag cloud + SkillCard[]
│       ├── Education: Timeline
│       └── Activity: ActivityCard[]
└── ContextRegion (optional — for editing sections)
```

---

## Layout Rules

| Rule | Description |
|------|-------------|
| Hero section | Profile header with avatar and key info is always visible |
| Tab navigation | Profile sections organized as tabs below hero |
| View/Edit toggle | Toggle between view and edit modes |
| Public/Private | Indicates which information is public vs private |

---

## Responsive Adaptation

| Device | Layout |
|--------|--------|
| Desktop (1280px+) | Hero + Tabs. Context panel for editing. |
| Laptop (1024-1279px) | Hero + Tabs. Edit inline or modal. |
| Tablet (768-1023px) | Hero + scrollable tabs. Edit modal. |
| Mobile (<768px) | Compact hero. Tab dropdown. Edit full screen. |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Header/User-Menu.md](../Header/User-Menu.md) | Access profile from user menu |

---

*The Profile Layout presents the user's professional identity. It balances clean presentation with easy editing access.*
