# Header Architecture

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Topbar.md](../../04-Component-Library/Navigation/Topbar.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rules 1, 10, 16)

---

## Purpose

Defines the complete header system — the fixed top bar that provides context, navigation, search, and user controls across the entire workspace.

---

## Header Composition

```
Header
├── Left Section
│   ├── MenuToggle (hamburger, mobile/tablet)
│   ├── Logo (desktop, collapsed mobile)
│   └── Breadcrumb / PageTitle
│
├── Center Section
│   ├── GlobalSearch (desktop/laptop)
│   ├── WorkspaceSwitcher (contextual)
│   └── AI QuickAction
│
├── Right Section
│   ├── ThemeSwitch
│   ├── LanguageSwitch
│   ├── AI Shortcut Button
│   ├── Notifications (bell + badge)
│   ├── QuickActions (icon buttons)
│   └── UserMenu (avatar + dropdown)
│
└── Status Bar (optional, bottom of header)
    ├── Connection status
    ├── Sync status
    └── Environment indicator
```

---

## Header Variants

| Variant | Sections Visible | Use Case |
|---------|-----------------|----------|
| `full` | Left + Center + Right | Desktop/laptop, standard pages |
| `compact` | Left + Right (minimal center) | Desktop/laptop, data-dense layouts |
| `minimal` | Left only (breadcrumb + close) | Focus mode, full-screen editors |
| `transparent` | All, transparent bg | Landing pages, profiles |
| `mobile` | Left + Right (no center) | Mobile devices |

---

## Header Behavior

| Behavior | Description |
|----------|-------------|
| Fixed position | Header is fixed at the top of the viewport |
| Height | 56px on all devices |
| Glass background | `backdrop-filter: blur(12px)` with semi-transparent background |
| Scroll behavior | Background opacity increases on scroll (transparent variant) |
| Responsive collapse | Center section hides on mobile, moves to overflow menu |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Global-Search.md](Global-Search.md) | Search component within header |
| [Notifications.md](Notifications.md) | Notification center accessible from header |
| [User-Menu.md](User-Menu.md) | User profile and settings menu |
| [Navigation/Breadcrumb-Strategy.md](../Navigation/Breadcrumb-Strategy.md) | Breadcrumb displayed in header |

---

*The header is the user's constant companion across the workspace. It provides context, controls, and access to every part of the application.*
