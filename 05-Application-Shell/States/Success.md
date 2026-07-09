# State — Success

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 18)

---

## Purpose

Defines success states at the shell level — how the workspace confirms that an action has been completed successfully.

---

## Success State Types

### Toast Confirmation
Transient confirmation after an action.

- Success toast (green, bottom-right)
- Duration: 4 seconds (auto-dismiss)
- Message: "[Action] completed successfully"
- Optional undo action (within 5 seconds)
- Stacked: multiple toasts stack

### Inline Confirmation
Success indicator within the content area.

- Checkmark animation (green) on the affected element
- Brief text: "Saved" or "Updated"
- Auto-fades after 2 seconds
- Used for: save, update, small actions

### Page-Level Success
Success state that replaces or overlays the page content.

- Used for: onboarding completion, setup completion
- Hero checkmark (animated)
- Title: "You're all set!"
- Message: "What would you like to do next?"
- Actions: "Go to Dashboard", "Explore [next step]"

### Banner Confirmation
Persistent success banner below the header.

- Used for: data import completion, batch operations
- Shows item count and summary
- Action to view results
- Dismissible

---

## Success State Rules

| Rule | Description |
|------|-------------|
| Immediate feedback | Success state appears within 100ms of action completion |
| Non-intrusive | Toast and inline confirmations don't block the user |
| Undo available | Reversible actions include an undo option for 5 seconds |
| Specific | Message states exactly what was completed |
| Measured tone | Success communication is measured, not overly celebratory |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Loading.md](Loading.md) | Transition from loading to success state |
| [Error.md](Error.md) | Contrast with error state feedback |

---

*Success states provide closure for completed actions. They implement UX Constitution Rule 18 — every action provides closure.*
