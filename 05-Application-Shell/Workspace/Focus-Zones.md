# Focus Zones

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rules 2, 3, 5), DP-1 ([Layout-Principles.md](../../02-Design-Language/Layout-Principles.md))

---

## Purpose

Defines how the workspace manages user attention — isolating focus, reducing distractions, and creating environments for concentrated work.

---

## Focus Zone Types

### Primary Focus Zone
The region containing the user's current task. All other zones are secondary to this one.

- Always the Primary Region
- Receives keyboard focus by default on page load
- Skip link targets this zone
- Other zones do not interrupt this zone with notifications or animations

### Focus Mode
An optional state where all non-essential chrome is hidden.

- Header reduces to minimal (breadcrumb + close button)
- Sidebar collapses to icon rail or hides entirely
- Secondary and Context regions hide
- AI chat panel hides (accessible via shortcut)
- Status area hides
- Only Primary Region remains at full width
- A "Exit focus mode" button appears in the minimal header
- Triggered by: user action, entering a document editor, data entry wizard

### Notification-Free Zone
A region where notifications are suppressed.

- Active during focus mode
- Active when user is in data entry (form focus detected)
- Active during presentation or screen sharing
- Notifications queue and are delivered after the zone exits
- Critical notifications (security, data loss) override the suppression

---

## Focus Zone Rules

| Rule | Description |
|------|-------------|
| One focus zone | Only one zone can be the focus zone at a time |
| Explicit entry | Focus mode is entered by user action, never automatically for critical work |
| Visible state | The focus zone is visually indicated (subtle border or background tint) |
| Quick exit | Focus mode is exited with Escape or a single click |
| State preservation | Panels return to their pre-focus positions when focus mode exits |
| No animation during focus | All non-essential animations are suspended in focus mode |
| AI remains available | AI is accessible via keyboard shortcut even in focus mode |

---

## Focus Zone Responsive Behavior

| Breakpoint | Focus Mode Behavior |
|------------|-------------------|
| Desktop | Full content width. All chrome hidden. |
| Laptop | Full content width. Minimal chrome. |
| Tablet | Full content width. Header minimal. Sidebar hidden. |
| Mobile | Full viewport. Header collapsed to back/close button only. |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Workspace-Philosophy.md](Workspace-Philosophy.md) | Core belief in isolation when focused |
| [AI-Zones.md](AI-Zones.md) | AI zone behavior during focus mode |
| [Accessibility/Reduced-Motion.md](../Accessibility/Reduced-Motion.md) | Motion suspension during focus |

---

*Focus zones implement UX Constitution Rule 5 (Progressive Disclosure) at the workspace level. They ensure the user can concentrate without distraction when performing complex tasks.*
