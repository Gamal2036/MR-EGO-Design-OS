# State — Maintenance

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Future-Expansion.md](../../01-Constitution/Future-Expansion.md))

---

## Purpose

Defines the maintenance mode behavior — how the workspace responds when the system is undergoing scheduled or unscheduled maintenance.

---

## Maintenance State Types

### Scheduled Maintenance Planned
- Banner below header: "MR:EGO will be offline for maintenance on [date] from [time] to [time]"
- Dismissible banner (user can acknowledge)
- Reappears 24 hours before, then 1 hour before, then 15 minutes before

### Scheduled Maintenance Active
- Full-screen maintenance page
- Logo + maintenance icon (tools/wrench)
- Message: "We're making MR:EGO better"
- Expected duration
- Optional: progress indicator
- Auto-redirect: automatically returns to workspace when maintenance ends

### Unscheduled Maintenance
- Full-screen maintenance page (after unexpected downtime detection)
- Logo + warning icon
- Message: "We're experiencing unexpected downtime"
- "We're working on it — check back soon"
- Status page link
- Auto-retry: checks every 30 seconds, auto-redirects when restored

---

## Maintenance State Rules

| Rule | Description |
|------|-------------|
| Advance notice | Scheduled maintenance is communicated at least 72 hours in advance |
| Grace period | Users have a 5-minute grace period before forced logout |
| State preservation | User's last state is preserved and restored after maintenance |
| Minimal downtime | Scheduled maintenance targets <30 minutes |
| Status page | Link to external status page for real-time updates |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Error.md](Error.md) | Error state during unexpected failures |
| [Offline.md](Offline.md) | Offline state distinction |

---

*Maintenance states communicate system downtime clearly and respectfully. Users are informed in advance and their state is preserved.*
