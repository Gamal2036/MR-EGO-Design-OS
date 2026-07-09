# Feedback System

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md))

---

## Philosophy

Feedback communicates the result of user actions. Every action produces feedback — success, failure, or progress. Silent failures are unacceptable. Feedback is **immediate, clear, and actionable.**

---

## Feedback Types

### Toast Notifications

Temporary messages that appear at the top-right (desktop) or top-center (mobile).

| Property | Success | Error | Warning | Info |
|----------|---------|-------|---------|------|
| Icon | Checkmark circle | X circle | Warning triangle | Info circle |
| Color | Success | Danger | Warning | Primary |
| Duration | 4s auto-dismiss | 6s auto-dismiss | 5s auto-dismiss | 4s auto-dismiss |
| Action | Optional undo | Optional retry | Optional dismiss | Optional dismiss |
| Position | Top-right (desktop), top (mobile) | Same | Same | Same |

**Toast Anatomy:**
```
┌──────────────────────────────────────┐
│ [Icon] Message text          [Action] │
└──────────────────────────────────────┘
```

### Inline Feedback

Messages embedded within forms, cards, or content areas.

| Type | Position | Style | Persistence |
|------|----------|-------|-------------|
| Form field error | Below input | Color + text | Until fixed |
| Form field success | Below input (optional) | Color + text | 2s |
| Section success | Top of section | Banner | 4s or until dismissed |
| Section error | Top of section | Banner | Until dismissed |

### Banner Feedback

Prominent messages that appear at the top of a page or section.

| Property | Specification |
|----------|---------------|
| Position | Below page header |
| Width | Full content width |
| Height | Auto (48–64px typical) |
| Icon | Yes |
| Dismiss | Close button (permanent) or auto-dismiss (temporary) |
| Action | Optional CTA button |

### Confirmation Dialogs

Dialogs that require user acknowledgment before proceeding.

| Type | Title | Buttons | Escape |
|------|-------|---------|--------|
| Confirm | "Delete document?" | Cancel, Delete | Cancel |
| Alert | "Could not connect" | OK | OK |
| Discard | "Unsaved changes" | Save, Discard, Cancel | Cancel |

---

## Feedback Timing

| Action | Feedback | Timing |
|--------|----------|--------|
| Click button | Visual press response | <50ms |
| Action started | Loading state on trigger | <100ms |
| Action succeeds | Success feedback | <200ms after complete |
| Action fails | Error feedback | <200ms after failure |
| Background sync | Subtle indicator (no toast) | Silent |
| Long operation (3s+) | Progress bar | After 1s |

---

## Feedback States

Every interactive element supports these feedback states:

| State | Visual | Duration |
|-------|--------|----------|
| Default | Resting appearance | — |
| Hover | Background/shadow change | 100ms |
| Focus | Focus ring | 100ms |
| Active/Pressed | Scale down + darker | 50ms |
| Loading | Spinner replaces/hides content | During operation |
| Disabled | Reduced opacity (0.4) | Instant |
| Error | Red border + message | Until resolved |
| Success | Green indicator | 2–4s |

---

## Notification Types (System)

| Type | Channel | Frequency | User Control |
|------|---------|-----------|--------------|
| Action result | In-app toast | Per action | Notification settings |
| Reminder | In-app + optional email | Configurable | Per-notification type |
| Digest | Email | Daily/weekly | Frequency control |
| Alert | In-app badge + notification | Immediate | Per-event type |

---

## Feedback Rules

1. **Every action has feedback.** Silent failure is never acceptable.
2. **Feedback is proportional to action.** Saving a draft gets a subtle indicator. Deleting data gets a confirmation dialog.
3. **Undo is preferred over "Are you sure?"** When an action is reversible, provide undo instead of confirmation.
4. **Error messages explain cause and solution.** "Could not save (disk full). Free up space and try again." Not just "Error saving."
5. **Success messages are brief.** "Saved" not "Your document has been successfully saved."
6. **Notifications never stack beyond 3 visible toasts.** Older toasts are dismissed or stacked.
7. **Sensitive actions always get confirmation.** Data deletion, financial actions, irreversible changes.

---

*This Feedback System is permanent. All components in DP-2 implement these feedback patterns. Refer to [Loading-System.md](Loading-System.md) for loading state specifications, [Empty-State-System.md](Empty-State-System.md) for empty states, [Error-State-System.md](Error-State-System.md) for error states, and [Interaction-Language.md](Interaction-Language.md) for interaction patterns.*
