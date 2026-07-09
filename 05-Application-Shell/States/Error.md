# State — Error

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([ErrorState.md](../../04-Component-Library/Feedback/ErrorState.md)), DP-2 ([Feedback.md](../../03-Design-System/Components/Feedback.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 15)

---

## Purpose

Defines shell-level error states — how the workspace responds to errors that affect the entire application or major regions.

---

## Error State Types

### Fatal Error
A critical error that prevents the workspace from loading.

- Full-screen error state
- Logo + error icon (red)
- Error message: "We couldn't load your workspace" (human-readable)
- Sub-message: Brief explanation (generic for security)
- Action button: "Try Again" (retry load)
- Secondary action: "Contact Support"
- Auto-retry: Attempts to reload after 30 seconds (3 max attempts)

### Region Error
An error that prevents a specific region from loading.

- Region shows error state within its boundaries
- Error message specific to the region's purpose
- Retry button within the region
- Other regions remain functional

### Transient Error
A temporary error that resolves without user action.

- Toast notification (error variant, 8-second duration)
- Auto-retry with progress indicator (if applicable)
- Recovery is indicated by a success toast

### Authentication Error
Session expiration or authentication failure.

- Session expired banner below header
- "Sign in again" action button
- Modals close, unsaved work is preserved
- After re-auth, user returns to their previous state

---

## Error State Rules

| Rule | Description |
|------|-------------|
| Human-readable | Error messages are clear, specific, and solution-oriented |
| No error codes | Raw error codes are never shown to users |
| Recovery action | Every error state includes an action to resolve or retry |
| Non-blocking | Region errors don't block other regions |
| Apologetic tone | Error messages apologize, explain, and solve |
| Technical details | Technical details are available in expandable section (if useful for support) |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Loading.md](Loading.md) | Loading timeouts transition to error state |
| [Offline.md](Offline.md) | Offline state vs error state distinction |
| [Header/Notifications.md](../Header/Notifications.md) | Error notifications |

---

*Error states turn failures into opportunities to help. Every error message guides the user toward resolution.*
