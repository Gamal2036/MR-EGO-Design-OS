# Modal Region

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Dialog.md](../../04-Component-Library/Feedback/Dialog.md), [Portal.md](../../04-Component-Library/Utilities/Portal.md), [FocusTrap.md](../../04-Component-Library/Utilities/FocusTrap.md))

---

## Purpose

The Modal Region manages modal dialogs — focused interaction surfaces that require user attention before returning to the workspace.

---

## Composition

```
ModalRegion (Portal to document root)
├── Backdrop (semi-transparent overlay)
└── ModalContainer
    ├── Dialog
    ├── ConfirmationDialog
    ├── WarningDialog
    └── FullScreenDialog
```

---

## Behavior

| Behavior | Description |
|----------|-------------|
| Blocking | User must interact with modal before returning to workspace |
| Backdrop | Semi-transparent overlay behind the modal |
| Focus trap | Focus is trapped within the modal |
| Escape to close | Escape closes the modal (unless destructive) |
| Stacking | Multiple modals stack (z-order), only top is interactive |
| Portal-based | Rendered at document root via Portal |

---

## Modal Region Rules

| Rule | Description |
|------|-------------|
| One at a time | Only one modal should be shown at a time ideally |
| Stacked max | Maximum 3 stacked modals (deeper nesting indicates UX failure) |
| Escape close | Escape closes the topmost modal |
| Backdrop click | Clicking backdrop closes the modal (unless destructive) |
| Focus restoration | Focus returns to the triggering element on close |
| Scroll lock | Body scroll is locked when a modal is open |
| Animation | Modal enters with scale + fade (200ms), exits with fade (100ms) |

---

## Modal Types

| Type | Size | Use Case |
|------|------|----------|
| Dialog | sm (400px) | Quick confirmations, forms |
| Dialog | md (560px) | Standard dialogs |
| Dialog | lg (720px) | Complex forms, settings |
| FullScreen | 100% | Document editing, detailed views |
| Confirmation | sm (400px) | "Are you sure?" prompts |
| Warning | sm (440px) | Destructive action confirmation |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Floating-Region.md](Floating-Region.md) | Floating panels — non-blocking alternative to modals |
| [Accessibility/Focus-Order.md](../Accessibility/Focus-Order.md) | Focus behavior within modals |

---

*The Modal Region manages all modal interactions consistently. It ensures focus is properly managed and users are never confused about modal state.*
