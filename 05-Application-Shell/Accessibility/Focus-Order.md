# Accessibility — Focus Order

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Accessibility.md](../../02-Design-Language/Accessibility.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 7)

---

## Purpose

Defines the focus order across the application shell — ensuring logical, predictable focus movement for keyboard and screen reader users.

---

## Default Focus Order

```
1. Skip Link ("Skip to main content")
2. Header
   2a. Menu toggle (hamburger, mobile/tablet)
   2b. Logo / Home link
   2c. Breadcrumb items
   2d. Search input
   2e. Workspace switcher
   2f. Notifications button
   2g. Theme switch
   2h. Language switch
   2i. AI shortcut button
   2j. Quick action buttons
   2k. User menu (avatar)
3. Sidebar
   3a. Sidebar items (in DOM order)
   3b. Sidebar groups (collapsible headers)
   3c. Sidebar footer (settings, help, user)
4. Primary Content Region (main)
   4a. Page title
   4b. Page actions
   4c. Content sections (in DOM order)
   4d. Pagination
5. Secondary Region (if present)
6. Context Region (if present)
   6a. Region header
   6b. Region content
7. AI Region (if visible)
   7a. AI chat input
   7b. Conversation history
   7c. AI actions
8. Footer
9. Floating panels (if present, in z-order)
```

---

## Focus Order Rules

| Rule | Description |
|------|-------------|
| Visual order | Tab order follows visual layout (left-to-right, top-to-bottom) |
| Skip content | First tab press reveals "Skip to main content" |
| No traps | Focus never gets stuck in any component or region |
| F6 cycling | F6 cycles through: sidebar, header, main content, panels |
| Panel cycling | Ctrl+Shift+] and Ctrl+Shift+[ cycle through panels |
| Region boundaries | Tab navigates within a region. F6 jumps between regions. |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Keyboard-Navigation.md](Keyboard-Navigation.md) | Full keyboard model |
| [Screen-Readers.md](Screen-Readers.md) | Screen reader focus management |

---

*Focus order ensures predictable keyboard navigation. Users always know where focus will go next.*
