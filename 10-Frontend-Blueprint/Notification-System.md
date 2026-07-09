# Notification System

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-4 ([Header/Notifications.md](../05-Application-Shell/Header/Notifications.md)), DP-6 ([Notification-Flow.md](../06-UX-Architecture/Notification-Flow.md))

---

## Purpose

Defines the notification system architecture — notification pipeline, types, delivery channels, preferences, centre, and focus mode integration.

---

## Notification Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  NOTIFICATION SYSTEM                      │
├─────────────────────────────────────────────────────────┤
│  Event Sources                                           │
│  Server events, real-time subscriptions, local events    │
├─────────────────────────────────────────────────────────┤
│  Pipeline                                                │
│  Receive → Classify → Route → Display → Store           │
├─────────────────────────────────────────────────────────┤
│  Delivery Channels                                       │
│  Toast, notification centre, push, digest, badge         │
├─────────────────────────────────────────────────────────┤
│  Preference Engine                                       │
│  Channel per type, quiet hours, DND, focus mode          │
├─────────────────────────────────────────────────────────┤
│  Storage                                                 │
│  In-memory (recent), indexedDB (history), server (sync)  │
└─────────────────────────────────────────────────────────┘
```

---

## Notification Types

```typescript
// Pseudocode
enum NotificationType {
  ApplicationUpdate,     // Status change, interview, offer
  JobMatch,              // New matching job
  CVInsight,             // CV analysis complete, suggestion
  Message,               // New message
  Reminder,              // Follow-up reminder
  System,                // Maintenance, update, security
  AIInsight,             // AI-generated insight
  Achievement,           // Milestone reached
  Social,                // Connection, recommendation
  Digest,                // Daily/weekly summary
}

enum NotificationPriority {
  Urgent,      // Requires immediate attention (interview reminder)
  High,        // Important but not urgent (application update)
  Normal,      // Informational (job match)
  Low,         // Can wait (weekly digest)
}
```

---

## Notification Pipeline

```
Event triggered
     ↓
Notification created (type, priority, content, source)
     ↓
Preference engine evaluates:
  - Is this notification type enabled?
  - Are we in quiet hours?
  - Is focus mode active?
  - Has user dismissed similar notifications?
     ↓
┌────────────┐  ┌────────────┐  ┌────────────┐
│ SHOW       │  │ QUEUE      │  │ SUPPRESS   │
│ Immediate  │  │ For digest │  │ Silently   │
└────────────┘  └────────────┘  └────────────┘
     │               │
     ▼               ▼
Display route    Stored for
  (toast,        batch delivery
   badge, push)
```

---

## Notification Definition

```typescript
// Pseudocode
interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  icon: string;
  action?: NotificationAction;
  source: string;           // Module ID
  createdAt: Date;
  readAt?: Date;
  expiresAt?: Date;
  metadata: Record<string, unknown>;
}

interface NotificationAction {
  label: string;
  handler: () => void;
  url?: string;             // Route to navigate to
}

// Example
const notification: Notification = {
  id: 'notif-123',
  type: NotificationType.ApplicationUpdate,
  priority: NotificationPriority.High,
  title: 'Interview Invitation',
  message: 'You have been invited to interview at Acme Corp',
  icon: 'calendar',
  action: {
    label: 'View Details',
    url: '/applications/456',
  },
  source: 'applications',
  createdAt: new Date(),
};
```

---

## Delivery Channels

| Channel | Display | Duration | Max Items | Persistence |
|---------|---------|----------|-----------|-------------|
| Toast | Top-right/toast area | 4-8 seconds | 3 visible | None |
| Notification centre | Full list with filters | — | Last 50 | IndexedDB + server |
| Badge | Bell icon count | Until read | 99+ | Session |
| Push (future) | Device notification | System | System | Server |
| Digest | Email / in-app summary | Daily/weekly | N/A | Server |

### Toast Types

| Type | Colour | Icon | Action |
|------|--------|------|--------|
| Success | Green | Checkmark | Optional undo |
| Warning | Yellow | Warning | Optional action |
| Error | Red | X | Optional retry |
| Info | Blue | Info | Optional action |
| AI | AI colour | Sparkles | View details |

---

## Notification Centre

```
┌─────────────────────────────────────────────────────────┐
│  Notifications                          [Mark all read]  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  All  │  Unread  │  Applications  │  System     │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  Today                                                    │
│  ┌──────────────────────────────────────────────────┐   │
│  │ ● Interview Invitation           2 min ago       │   │
│  │   Acme Corp - Senior Developer         [View]    │   │
│  ├──────────────────────────────────────────────────┤   │
│  │ ● New Job Match                      15 min ago │   │
│  │   React Engineer at TechCo           [View]     │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  Yesterday                                                │
│  ┌──────────────────────────────────────────────────┐   │
│  │ ○ Application Update                Yesterday    │   │
│  │   Your application is now "In Review"  [View]    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Preference Engine

```typescript
// Pseudocode
interface NotificationPreferences {
  channels: {
    toast: boolean;
    centre: boolean;        // Always on
    push: boolean;
    digest: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;          // "22:00"
    end: string;            // "07:00"
    timezone: string;
  };
  doNotDisturb: boolean;
  byType: Record<NotificationType, {
    toast: boolean;
    push: boolean;
    digest: boolean;
  }>;
}
```

### Focus Mode Rules

| State | Toast Behaviour |
|-------|-----------------|
| Normal | Show all toasts |
| Focus mode | Queue all toasts, show none |
| Focus mode + urgent | Show urgent toasts only |
| DND active | Queue all, suppress all |
| Quiet hours | Queue non-urgent, show urgent |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Authentication-Flow.md](Authentication-Flow.md) | Auth-related notifications |
| [Application-Tracker.md](Application-Tracker.md) | Application status notifications |
| [DP-6 Notification Flow](../06-UX-Architecture/Notification-Flow.md) | Source notification UX specification |

---

## Validation Notes

1. Every notification has a defined type, priority, and delivery channel.
2. Preference engine respects user's quiet hours, DND, and focus mode.
3. Toast notifications auto-dismiss with configurable duration.
4. Notification centre persists last 50 items with read/unread tracking.
5. Urgent notifications break through all suppression modes.
