# Feedback

**Phase:** DP-2 (Design System)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md), [Elevation-System.md](../../02-Design-Language/Elevation-System.md), [Feedback-System.md](../../02-Design-Language/Feedback-System.md), [Motion-System.md](../../02-Design-Language/Motion-System.md), [Iconography.md](../../02-Design-Language/Iconography.md))

---

## Purpose

Feedback components communicate the result of user actions, system events, and important information. Every action produces feedback — success, failure, or progress. Silent failures are never acceptable.

---

## When to Use

- Communicating action results (saved, deleted, failed)
- Displaying system status or state changes
- Alerting users to important information
- Progress indication for ongoing operations
- Confirming destructive actions before they execute

## When NOT to Use

- Permanent on-screen information — use inline text or badges
- Interactive content that needs user input — use dialogs
- Navigation or page-level structure — use layout components
- Marketing or promotional messages — never in feedback components

---

## Variants

### Toast

Temporary notification for action results. Appears at top-right (desktop) or top-center (mobile).

| Property | Success | Error | Warning | Info |
|----------|---------|-------|---------|------|
| Icon | Checkmark circle | X circle | Warning triangle | Info circle |
| Color accent | Success-500 | Danger-500 | Warning-500 | Primary-500 |
| Background | Surface-1 | Surface-1 | Surface-1 | Surface-1 |
| Duration | 4s | 6s | 5s | 4s |
| Action | Undo | Retry | Dismiss | Dismiss |
| Dismiss | Auto + manual close | Manual close | Auto + manual close | Auto + manual close |

| Property | Value |
|----------|-------|
| Position | Top-right (desktop), top-center (mobile) |
| Width | 360px (desktop), full minus margins (mobile) |
| Elevation | Layer 3 (Shadow-3) |
| Border radius | Radius-Md (8px) |
| Padding | 12px 16px |
| Animation appear | Slide in from right 300ms Ease-Out |
| Animation dismiss | Fade out 200ms Ease-In |
| Stacking | Max 3 visible, newest at top |

### Snackbar

Persistent message with optional action, used for undo or retry.

| Property | Value |
|----------|-------|
| Position | Bottom-center |
| Max width | 480px |
| Elevation | Layer 3 (Shadow-3) |
| Border radius | Radius-Md (8px) |
| Padding | 12px 16px |
| Background | Neutral-800 (light), Neutral-200 (dark) |
| Text | White (light), Text-Body (dark) |
| Action | Primary-300 text (light), Primary-400 (dark) |
| Persistence | 6s or until action taken |
| Animation | Slide up 300ms Ease-Out |

### Banner

Prominent, persistent message at the top of a page or section.

| Property | Success | Error | Warning | Info |
|----------|---------|-------|---------|------|
| Background | Success-BG | Danger-BG | Warning-BG | Primary-50 |
| Border | Success-500 left (3px) | Danger-500 left (3px) | Warning-500 left (3px) | Primary-500 left (3px) |
| Icon | Success color | Danger color | Warning color | Primary color |
| Text | Success-700 | Danger-700 | Warning-700 | Primary-700 |
| Action | Optional | Retry | Optional | Optional |
| Dismiss | Yes | Yes | Yes | Yes |

| Property | Value |
|----------|-------|
| Position | Below page header, full content width |
| Padding | 12px 16px |
| Border radius | Radius-Md (8px) |
| Animation | Slide down 300ms Ease-Out |
| Icon size | 20px |

### Notification

System notification for events that require user attention.

| Property | In-App | Digest |
|----------|--------|--------|
| Position | Notification panel (right drawer) | Email |
| Trigger | Real-time event | Daily/weekly summary |
| Icon | Per notification type | Per notification type |
| Time | Relative timestamp ("2 hours ago") | Date |
| Action | Click to navigate | Click to open MR:EGO |
| Grouping | Grouped by module | Grouped by category |
| Unread | Bold title + blue dot indicator | — |
| Max | 50 recent | Configurable |

### Progress

Visual indication of task completion.

| Type | Use Case | Specification |
|------|----------|---------------|
| Determinate bar | Known duration (upload, export) | Width % transition 200ms Ease-Out, 4px height |
| Indeterminate bar | Unknown duration (sync, processing) | Animated stripe or pulse, 4px height |
| Circular determinate | Compact progress (file upload) | 32px circle, arc fill |
| Steps | Multi-step process (wizard) | Step circles + connector lines |

---

## Feedback Anatomy

```
Toast:
┌──────────────────────────────────────────┐
│  [✓] Document saved successfully  [Undo] [✕]  │
└──────────────────────────────────────────┘

Banner:
┌───────────────────────────────────────────────┐
│  [⚠] Your workspace is 90% full.  [Manage] [✕] │
└───────────────────────────────────────────────┘

Notification Item:
┌──────────────────────────────────────────┐
│  ● [Icon] New application match         │
│          "Senior Engineer at Acme"       │
│          2 hours ago                     │
└──────────────────────────────────────────┘
```

---

## Spacing

| Context | Value | Token |
|---------|-------|-------|
| Toast internal padding | 12px 16px | Space-4 Space-5 |
| Toast between toasts | 8px | Space-3 |
| Toast icon to message | 10px | Space-3 |
| Toast message to action | 16px | Space-5 |
| Banner internal padding | 12px 16px | Space-4 Space-5 |
| Banner icon to message | 12px | Space-4 |
| Notification item padding | 12px 16px | Space-4 Space-5 |
| Notification icon to text | 12px | Space-4 |
| Progress bar height | 4px | Space-1 |

---

## States

| Component | States |
|-----------|--------|
| Toast | Entering, Visible, Exiting, Stacked |
| Banner | Visible, Dismissed, Expanded (if collapsible) |
| Notification | Unread, Read, Dismissed |
| Progress | Idle, Active, Complete, Error, Paused |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Live region | Toast: `aria-live="polite"`, Error toast: `aria-live="assertive"` |
| Role | Toast: `role="status"`, Alert: `role="alert"` |
| Focus | Toast does not steal focus |
| Dismiss | Toast close button has `aria-label="Dismiss"` |
| Progress bar | `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| Notification panel | `aria-label="Notifications"` |
| Banner | `role="alert"` for error/warning, `role="status"` for info/success |
| Animation | Respects `prefers-reduced-motion` |

---

## Responsive Behavior

| Breakpoint | Toast | Banner | Notifications |
|------------|-------|--------|---------------|
| Mobile (<768px) | Full-width (16px margin), top-center. Stacked vertically. | Full-width, reduced padding. | Drawer slides up from bottom. |
| Tablet (768-1023px) | Top-right, 360px width. | Standard. | Right drawer. |
| Desktop (1024px+) | Top-right, 360px. Max 3 stacked. | Standard. | Right drawer. |

---

## Future Expansion

- **Notification channels** — Email, push, in-app, SMS preference per type
- **Notification groups** — Collapsible notification groups by module
- **Snooze** — Snooze notifications for later
- **Read receipts** — Mark as read on view
- **Progress with cancel** — Progress bar with cancel button for long operations
- **Multi-step progress** — Progress through sequential tasks with status per step

---

## Related Components

- [Dialogs.md](Dialogs.md) — Confirmation dialogs for critical actions
- [Buttons.md](Buttons.md) — Action buttons within feedback components (Undo, Retry)
- [Loading.md](Loading.md) — Progress bars, loading feedback
- [Navigation.md](Navigation.md) — Notification bell in top bar
