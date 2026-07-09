# User Menu

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Avatar.md](../../04-Component-Library/Core/Avatar.md), [Dropdown.md](../../04-Component-Library/Navigation/Dropdown.md))

---

## Purpose

Defines the user menu — the dropdown accessed from the header that provides access to profile, settings, and account management.

---

## User Menu Composition

```
Avatar (image or initials)
▼
┌─────────────────────────┐
│ Avatar                  │
│ User Name               │
│ user@email.com          │
│ ─────────────────────── │
│ View Profile      icon  │
│ Settings           icon │
│ Preferences       icon  │
│ ─────────────────────── │
│ Account              →  │ (submenu)
│ ├── Security            │
│ ├── Billing             │
│ └── Data & Privacy      │
│ ─────────────────────── │
│ Help & Support    icon  │
│ Keyboard Shortcuts icon │
│ ─────────────────────── │
│ Sign Out          icon  │
└─────────────────────────┘
```

---

## User Menu Elements

| Element | Source | Behavior |
|---------|--------|----------|
| Avatar | User profile image or initials | Shows current user avatar |
| User Name | User profile | Display only |
| Email | User profile | Display only |
| View Profile | Profile module | Navigate to /profile |
| Settings | Settings module | Navigate to /settings |
| Preferences | Settings → Preferences | Navigate to /settings/preferences |
| Security | Settings → Security | Navigate to /settings/security |
| Billing | Settings → Billing | Navigate to /settings/billing |
| Data & Privacy | Settings → Privacy | Navigate to /settings/privacy |
| Help & Support | External | Open help center or support chat |
| Keyboard Shortcuts | Help overlay | Open keyboard shortcuts dialog |
| Sign Out | Authentication | Confirm → sign out |

---

## User Menu Rules

| Rule | Description |
|------|-------------|
| Always visible | User menu is always available in the header |
| Avatar priority | Show user image if available, otherwise initials |
| Single click | Click avatar opens dropdown |
| Escape to close | Escape closes the dropdown |
| Click outside | Click outside closes the dropdown |
| Responsive | On mobile, the dropdown becomes a full-screen overlay |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Header-Architecture.md](Header-Architecture.md) | User menu placement in header |
| [Layouts/Profile-Layout.md](../Layouts/Profile-Layout.md) | Profile page accessible from user menu |
| [Layouts/Settings-Layout.md](../Layouts/Settings-Layout.md) | Settings page accessible from user menu |

---

*The user menu provides quick access to account management. It's the central point for profile, settings, and authentication actions.*
