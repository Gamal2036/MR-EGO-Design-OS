# Notification Flow

**Phase:** DP-6 (UX Architecture)
**Design Authority:** DP-0 ([Brand-Constitution.md](../01-Constitution/Brand-Constitution.md) — Calm Experience), DP-4 ([Header/Notifications.md](../05-Application-Shell/Header/Notifications.md))

---

## Purpose

Deliver timely, meaningful notifications that inform the user without interrupting their focus.

---

## User Goal

"Stay informed about important career events without being overwhelmed."

---

## Notification Architecture

```
                    ┌─────────────────────────────────────────────────────┐
                    │                  NOTIFICATION PIPELINE               │
                    └─────────────────────────────────────────────────────┘
                                                                          
  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
  │   TRIGGER    │───▶│   ROUTE      │───▶│  DELIVER     │───▶│  DISPLAY     │
  │   (Event)    │    │   (Channel)  │    │  (Timing)    │    │  (Surface)   │
  └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

---

## Notification Types

| Type | Priority | Example | In-App | Push | Email | Digest |
|------|----------|---------|--------|------|-------|--------|
| Application Status Change | High | "Your application moved to Interview" | Yes | Yes | Yes | Yes |
| Interview Reminder | High | "Interview tomorrow at 2pm" | Yes | Yes | Yes | — |
| Offer Received | High | "You received an offer!" | Yes | Yes | Yes | Yes |
| New Job Match | Medium | "3 new jobs match your profile" | Yes | Optional | Optional | Yes |
| CV Analysis Complete | Medium | "Your CV analysis is ready" | Yes | Optional | — | — |
| Profile Incomplete | Low | "Your profile is 60% complete" | Subtle | No | — | Yes |
| Weekly Report | Low | "Your weekly career summary" | — | No | Yes | — |
| AI Insight | Low | "AI noticed a skill gap" | Yes | No | — | Yes |
| System/Feature | Low | "New feature: Salary insights" | One-time | Optional | Optional | — |

---

## Delivery Channels

| Channel | Description | User Control |
|---------|-------------|--------------|
| In-App Toast | Slide-in notification (auto-dismiss 5s) | Per-type toggle, quiet hours |
| Notification Center | Permanent history (30 days) | Always available |
| Push Notification | Mobile/desktop push (system) | Per-type toggle |
| Email | Transactional or digest | Frequency, per-type toggle |
| Digest | Weekly/monthly summary | On/off, frequency |

---

## Notification Center

| Aspect | Value |
|--------|-------|
| **Entry** | Topbar bell icon or keyboard shortcut |
| **Content** | Notification list grouped by date (Today, This Week, Earlier) |
| **Actions** | Click → navigate to relevant page, Mark as read, Dismiss |
| **States** | Loading (skeleton list), Empty ("No notifications"), List loaded, Error |
| **Badge** | Unread count on bell icon (max shown: 9+) |
| **Persistence** | 30-day retention, auto-cleanup of read/dismissed after 7 days |

---

## Calm Experience Rules

1. **No notification for non-critical events** — Profile views, AI training updates, background processing
2. **Batching** — Similar notifications within 1 hour are grouped into one
3. **Quiet hours** — User-defined window where only high-priority notifications show
4. **No red dots for non-critical** — Badges reserved for unread actionable notifications
5. **Notification preference inherited per type** — Never default to all-on
6. **Focus mode** — All notifications suppressed when user is in focus mode
7. **Rate limiting** — Maximum 1 notification per 5 minutes per type

---

## In-App Toast Behavior

| Type | Duration | Action | Dismiss |
|------|----------|--------|---------|
| Success | 3s | Optional link | Auto + manual close |
| Info (high priority) | 5s | Required action | Auto + manual |
| Info (low priority) | — | Not shown as toast | Shown only in center |
| Warning | Persistent until dismissed | View action | Manual only |
| Error | Persistent until resolved | Retry action | Manual only |

---

## Notification Payload

Each notification contains:
- **Title** (max 60 chars)
- **Body** (max 140 chars)
- **Icon** (type-specific)
- **Action URL** (deep link to relevant page)
- **Action label** (e.g., "View Application")
- **Type** (for filtering and display)
- **Priority** (high/medium/low)
- **Timestamp**
- **Read status**

---

## State Matrix

| State | Visual | Behavior |
|-------|--------|----------|
| No notifications | Empty state (bell icon + "No notifications yet") | No badge on bell |
| Unread notifications | Badge count on bell + bold items in center | Tap to read/mark read |
| All read | No badge + normal items | No attention needed |
| New notification (in-app) | Toast slides in from top-right | Auto-dismiss or action |
| Notification clicked | Navigate to relevant page | Mark as read |
| Error loading | ErrorState in center | Retry |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Toast | `role="alert"`, `aria-live="assertive"` |
| Notification center | `role="region"`, `aria-label="Notifications"` |
| Notification list | `role="list"`, each item `aria-label` with action |
| Badge count | `aria-label="N unread notifications"` |
| Dismiss action | `aria-label="Dismiss notification"` |
| Sound (optional) | Respects system sound settings |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Toast: top banner (full width). Center: full-screen overlay, swipe to dismiss. |
| Tablet (768-1023px) | Toast: top-right. Center: drawer from right. |
| Desktop (1024-1279px) | Toast: top-right. Center: dropdown from bell icon. |
| Ultra-wide (1600px+) | Toast: top-right. Center: wide dropdown with grouped notifications. |

---

## AI Interaction

| Surface | AI Role |
|---------|---------|
| Notification prioritization | AI reorders by importance based on user behavior |
| Smart batching | AI groups related notifications intelligently |
| Digest generation | AI creates weekly summary of career activity |
| Quiet hours suggestion | AI suggests optimal quiet hours based on usage |
| Notification opt-out | AI detects ignored notification types and suggests disabling |

---

## Future Expansion

| Feature | Phase |
|---------|-------|
| Voice notification playback | Phase 14 |
| Cross-device sync | Phase 5 |
| Enterprise alert routing | Phase 11 |
| Custom notification rules | Phase 12 |
| AI sentiment analysis on feedback | Phase 2 |

---

*Notifications respect the user's attention. Every notification must justify itself. Refer to [Settings-Flow.md](Settings-Flow.md) for notification configuration and [AI-Experience.md](AI-Experience.md) for AI-driven notification features.*
