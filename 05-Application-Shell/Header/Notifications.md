# Notifications

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Toast.md](../../04-Component-Library/Feedback/Toast.md), [Badge.md](../../04-Component-Library/Core/Badge.md)), DP-0 ([Brand-Constitution.md](../../01-Constitution/Brand-Constitution.md) — Calm Experience)

---

## Purpose

Defines the notification system — how notifications are delivered, displayed, and managed within the workspace.

---

## Notification Types

### Toast Notifications
Transient notifications that appear in the bottom-right corner.

| Type | Duration | Behavior |
|------|----------|----------|
| Success | 4 seconds | Green, auto-dismiss |
| Error | 8 seconds | Red, requires dismiss |
| Warning | 6 seconds | Yellow, auto-dismiss |
| Info | 4 seconds | Blue, auto-dismiss |
| AI Insight | 6 seconds | Purple, auto-dismiss |

### Notification Center
A persistent list of all notifications accessible from the header.

- Triggered by clicking the bell icon in the header
- Opens as a dropdown panel from the right
- Shows the last 50 notifications
- Grouped by date (Today, Yesterday, This Week, Older)
- Each notification has: icon, title, description, timestamp, action button
- Mark as read / Mark all as read
- Clear all (with confirmation)

### In-App Alerts
Persistent alerts within the content area.

- Used for critical system notifications
- Appears as a banner below the header
- Dismissible
- Supports action buttons
- Used for: maintenance warnings, permission changes, data import completion

---

## Notification Rules

| Rule | Description |
|------|-------------|
| Calm by default | Non-critical notifications are silent and non-intrusive |
| Meaningful only | Every notification has a clear purpose and action |
| Batch mode | Multiple notifications from the same source are batched |
| Do not disturb | User can enable DND mode (notifications queue silently) |
| Notification preferences | Users control which notification types they receive per module |
| Focus suppression | Notifications are suppressed during focus mode |
| Persistence | Notifications persist across sessions until read or dismissed |

---

## Notification Badge Rules

| Indicator | Meaning |
|-----------|---------|
| Dot (no number) | Unread non-critical notifications exist |
| Number | Count of unread actionable notifications |
| Red dot | Critical notification (security, data, account) |
| No badge | All notifications read or cleared |

- Maximum display count: 99+ (above 99 shows "99+")
- Badge is visible on the bell icon in the header

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Header-Architecture.md](Header-Architecture.md) | Bell icon and badge in header |
| [States/Error.md](../States/Error.md) | Error notification behavior |
| [States/Success.md](../States/Success.md) | Success notification behavior |

---

*Notifications keep users informed without demanding attention. They follow the Calm Experience principle from the Brand Constitution.*
