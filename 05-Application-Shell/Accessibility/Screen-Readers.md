# Accessibility — Screen Readers

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Accessibility.md](../../02-Design-Language/Accessibility.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 6)

---

## Purpose

Defines screen reader requirements specific to the application shell — landmarks, announcements, and live regions.

---

## Landmark Structure

```
banner (Header)
├── navigation (Breadcrumb)
└── search (Global Search)

navigation (Sidebar)

main (Primary Region)

complementary (Context Region — optional)

complementary (AI Region — optional)

contentinfo (Footer)
```

---

## Live Regions

| Region | ARIA Attribute | Trigger |
|--------|---------------|---------|
| Notifications | `aria-live="polite"` | New notification arrives |
| AI response | `aria-live="polite"` | AI streaming or complete |
| Loading state | `aria-live="assertive"` | Page or section loads |
| Error state | `aria-live="assertive"` | Error occurs |
| Status updates | `aria-live="polite"` | Status changes |

---

## Screen Reader Rules

| Rule | Description |
|------|-------------|
| Explicit labels | All interactive elements have explicit, meaningful aria-labels |
| Dynamic content | Content changes are announced via live regions |
| Focus management | Focus changes are announced when modals/panels open/close |
| Skip links | Skip to main content and skip to navigation are available |
| Status announcements | Loading, success, and error states are announced |
| Panel state | Panel open/close and resize are announced |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Keyboard-Navigation.md](Keyboard-Navigation.md) | Keyboard model for screen reader users |
| [Focus-Order.md](Focus-Order.md) | Focus order specification |

---

*Screen reader accessibility ensures the workspace is usable by everyone. All interactions, state changes, and content updates are announced appropriately.*
