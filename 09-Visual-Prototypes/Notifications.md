# Notifications — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Version:** 1.0
**Status:** Production Specification
**Inherits:** DP-0 through DP-8, DP-7:Notifications, DP-6:Screen (Notifications), DP-6:Nav (Notification Flow)

---

## Purpose

Complete visual prototype for the notification center — all system, application, AI, and message notifications. Filtered tabs, time-based grouping, read/unread states, and action capabilities. Implementation-ready.

---

## Layout Diagram

```
┌──────────┬──────────────────────────────────────────────────────────────┐
│          │  TOPBAR (56px, glass)                                       │
│          │  ← Notifications                Mark All Read  ⋮  [⚙]     │
│ SIDEBAR  ├──────────────────────────────────────────────────────────────┤
│ (240px)  │  CONTENT AREA (scrollable, padding Space-8)                 │
│ EXPANDED │                                                              │
│          │  PAGE HEADER                                                 │
│          │  "Notifications" (Heading-2, 28px)  unread: 5               │
│          │                                                              │
│          │  FILTER TABS (44px)                                         │
│          │  ┌─────┬─────────┬─────────────┬─────────┬──────────┐     │
│          │  │ All │ Unread  │Applications │ System  │ Archived │     │
│          │  │ (24)│  (5)    │    (12)     │   (7)   │   (0)    │     │
│          │  └─────┴─────────┴─────────────┴─────────┴──────────┘     │
│          │                                                              │
│          │  TODAY                                                       │
│          │  ┌────────────────────────────────────────────────────────┐ │
│          │  │ ● ┌────┐ Application Update — Acme Corp               │ │
│          │  │   │icon│ Your application moved to "Interview"        │ │
│          │  │   └────┘ 2 hours ago                    [View] [×]    │ │
│          │  ├────────────────────────────────────────────────────────┤ │
│          │  │ ● ┌────┐ AI Insight — New Job Match                   │ │
│          │  │   │ ✨ │ Senior React role at TechCorp matches you   │ │
│          │  │   └────┘ 4 hours ago            [View] [Dismiss] [🔔]│ │
│          │  └────────────────────────────────────────────────────────┘ │
│          │                                                              │
│          │  YESTERDAY                                                   │
│          │  ┌────────────────────────────────────────────────────────┐ │
│          │  │ ○ ┌────┐ CV Analysis Complete — Score: 86            │ │
│          │  │   │ 📄 │ Your CV analysis is ready for review        │ │
│          │  │   └────┘ Yesterday at 3:45 PM           [View] [×]    │ │
│          │  ├────────────────────────────────────────────────────────┤ │
│          │  │ ○ ┌────┐ Interview Reminder — Beta Inc               │ │
│          │  │   │ 📅 │ Interview scheduled for Jul 12 at 2:00 PM   │ │
│          │  │   └────┘ Yesterday at 10:00 AM     [View] [Snooze] [×]│ │
│          │  └────────────────────────────────────────────────────────┘ │
│          │                                                              │
│          │  THIS WEEK                                                   │
│          │  ┌────────────────────────────────────────────────────────┐ │
│          │  │ ○ ┌────┐ Weekly Digest — 3 apps active                │ │
│          │  │   │ 📊 │ Summary of your week in career progress      │ │
│          │  │   └────┘ 3 days ago                      [View] [×]    │ │
│          │  └────────────────────────────────────────────────────────┘ │
│          │                                                              │
│          │  EARLIER (collapsible)                                       │
│          │  ┌────────────────────────────────────────────────────────┐ │
│          │  │ ▸ Earlier (12 notifications)                  [Expand] │ │
│          │  └────────────────────────────────────────────────────────┘ │
│          │                                                              │
│          │  LOAD MORE (if >30 items)                                   │
│          │  [Load more notifications]                                   │
└──────────┴──────────────────────────────────────────────────────────────┘
```

---

## Filter Tabs

| Property | Token | Value |
|----------|-------|-------|
| Height | — | 44px |
| Gap | Space-2 | 4px |
| Padding per tab | Space-3 Space-4 | 8px 12px |
| Font | Body (Inter 400) | 15px |
| Text default | Neutral-600 | #5B6770 |
| Text hover | Neutral-800 | #2D3748 |
| Text active | Primary-600 | #2563EB |
| Indicator active | 2px bottom border | Primary-600 (#2563EB) |
| Count badge bg | Primary-50 | #EFF6FF |
| Count badge text | Primary-600 | #2563EB |
| Count badge radius | radius-full | 9999px |
| Overflow | Scroll horizontal (mobile) | — |
| Margin bottom | Space-7 | 24px |

### Tab Labels

All (24) | Unread (5) | Applications (12) | System (7) | Archived (0)

### States

| State | Visual |
|-------|--------|
| Default | Neutral-600 text, no indicator |
| Hover | Neutral-800 text, Surface-1 tint |
| Active | Primary-600 text, 2px Primary-600 bottom border |
| Focus | 2px Primary-400 ring offset 2px |
| Disabled | Neutral-300 text, cursor not-allowed |

---

## Time-Based Group Headers

| Property | Token | Value |
|----------|-------|-------|
| Label | — | "Today", "Yesterday", "This Week", "Earlier" |
| Font | Label | 14px, weight 600 |
| Color | Text-Secondary | #5B6770 |
| Margin top | Space-7 | 24px |
| Margin bottom | Space-5 | 16px |
| First group | No top margin | — |

### Earlier Group (Collapsible)

| Property | Value |
|----------|-------|
| Chevron | ▸ collapsed, ▾ expanded |
| Label | "Earlier (12 notifications)" |
| Font | Body-Small 14px, 600 weight |
| Color | Text-Secondary |
| Behavior | Click to expand/collapse, smooth 300ms height |
| Show count | Collapsed: "Earlier (12)" badge |

---

## Notification Item

| Property | Token | Value |
|----------|-------|-------|
| Min height | — | 64px |
| Padding | Space-5 | 16px |
| Radius | radius-md | 8px |
| Background (read) | Surface-1 | #FFFFFF |
| Background (unread) | Primary-50 | #EFF6FF |
| Border | Border-Default | 1px solid Neutral-200 (#E5E7EB) |
| Margin bottom | Space-2 | 4px |
| Hover bg | Surface-2 | Neutral-100 (#F3F4F6) |
| Transition | background-color | 200ms ease |

### Item Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ ● ┌────┐  Title (Body, unread=600 / read=400)                   │
│   │icon│  Description (Body-Small, Text-Secondary, 1-2 lines)   │
│   └────┘  Timestamp · Type label               [View] [×] [🔔] │
└──────────────────────────────────────────────────────────────────┘
```

### Elements

| Element | Spec |
|---------|------|
| Unread dot | 8px diameter, Primary-500 (#3B82F6), radius-full, left edge. Hidden when read. |
| Type icon | 20px × 20px, color-coded per type (see table below) |
| Title | Body 15px, Text-Primary. Unread: weight 600. Read: weight 400. |
| Description | Body-Small 14px, Text-Secondary (#5B6770), max 2 lines with ellipsis |
| Timestamp | Caption 13px, Text-Secondary, relative time ("2h ago") or absolute ("Yesterday at 3:45 PM") |
| Type label | Caption 13px, Text-Secondary, "Application" / "AI" / "System" |
| [View] | Text link, Body-Small 14px, Primary-600, navigates to relevant screen |
| [Dismiss] | × icon, 24px hit target, Neutral-400, removes item from list |
| [Snooze] | 🔔 icon, 24px hit target, opens snooze picker (1h, 3h, 1d, 3d, 1w) |

### Notification Types

| Type | Icon | Icon Color | Hex | Badge Color |
|------|------|------------|-----|-------------|
| Application status | File (📄) | Primary-500 | #3B82F6 | Primary-100 (#DBEAFE) |
| AI insight | Sparkle (✨) | Primary-500 | #3B82F6 | Primary-100 |
| CV analysis | Document | Success-500 | #10B981 | Success-100 (#D1FAE5) |
| Interview reminder | Calendar (📅) | Warning-500 | #F59E0B | Warning-100 (#FEF3C7) |
| Offer received | Gift | Success-500 | #10B981 | Success-100 |
| System | Bell (🔔) | Neutral-500 | #6B7280 | Neutral-100 (#F3F4F6) |
| Message | Message | Primary-500 | #3B82F6 | Primary-100 |
| Job match | Sparkle + Target | Primary-500 | #3B82F6 | Primary-100 |
| Weekly digest | Chart (📊) | Primary-500 | #3B82F6 | Primary-100 |
| Profile view | Eye (👁) | Primary-500 | #3B82F6 | Primary-100 |

### Item States

| State | Visual |
|-------|--------|
| Default (read) | Surface-1 bg, weight 400 title, no dot |
| Unread | Primary-50 bg, weight 600 title, Primary-500 dot |
| Hover | Surface-2 bg (#F3F4F6), Primary-200 border |
| Focus | 2px Primary-400 ring offset 2px |
| Pressed | Scale 0.99, bg slightly darker |
| Swipe (mobile) | Reveals actions: [View] [Dismiss] [Snooze] with 180px total width |
| Dismissing | Slide out right + opacity 0, 250ms ease |
| Entering | Slide in from top + opacity 0→1, 300ms ease |

---

## Empty State

| Element | Spec |
|---------|------|
| Layout | Centered in content, padding Space-14 (128px) |
| Illustration | Bell with checkmark, 140px × 140px |
| Title | "All caught up!" — Heading-3 (22px), Text-Primary |
| Description | "You have no unread notifications" (unread filter) or "Notifications will appear here" (all) — Body 15px, Text-Secondary |
| Spacing | Illustration→Title: Space-5, Title→Desc: Space-3 |
| No CTA | Automatic state, no action needed |

### Empty Variants Per Tab

| Tab | Title | Description |
|-----|-------|-------------|
| All | "No notifications yet" | "Notifications from your activity will appear here" |
| Unread | "All caught up!" | "You have no unread notifications" |
| Applications | "No application notifications" | "Status changes and updates will appear here" |
| System | "No system notifications" | "Platform updates and alerts will appear here" |
| Archived | "No archived notifications" | "Archived notifications will appear here" |

---

## Loading State

| Element | Skeleton | Duration |
|---------|----------|----------|
| Filter tabs | 5 pill skeletons, 60px wide | <400ms |
| Item (×5) | 64px height, full-width skeleton | stagger 60ms |
| Dot | 8px circle skeleton left | — |
| Icon | 20px circle skeleton | — |
| Title line | 50% width bar | — |
| Description line | 70% width bar | — |
| Action links | 3 small bars, 30px each | — |
| Time group headers | "Today" bar 60px | <200ms |

**Skeleton spec:** Surface-2 bg (#F3F4F6), radius-sm, shimmer 1.5s infinite, gradient #F3F4F6 → #E5E7EB → #F3F4F6.

---

## Error State

| Scenario | Visual | Action |
|----------|--------|--------|
| Load fail | Error banner top: "Could not load notifications" + [Retry] | Retry refetches |
| Dismiss fail | Toast: "Could not dismiss" + undo | Undo available 5s |
| Snooze fail | Toast: "Could not snooze" + retry | Retry snooze |
| Mark read fail | Toast: "Could not mark as read" | Auto-retry |
| Connection error | Cached list with "Offline — last updated [time]" | Banner retry |

---

## Offline State

| Element | Behavior |
|---------|----------|
| Banner | "Offline — notifications from [time]" — Warning-500 bg (#FEF3C7) |
| List | Cached notifications shown with grey left border |
| Dismiss | Queued, syncs when online |
| Snooze | Disabled, tooltip "Unavailable offline" |
| New notifications | Polling disabled, "Pull to refresh" text |
| View action | Works if target screen is cached |

---

## Motion & Animation

### Item Entry (New Notification)
| Property | Value |
|----------|-------|
| Initial | translateY(-20px), opacity 0, max-height 0 |
| Active | translateY(0), opacity 1, max-height 80px |
| Duration | 400ms |
| Easing | cubic-bezier(0.16, 1, 0.3, 1) |

### Item Exit (Dismiss)
| Property | Value |
|----------|-------|
| Transform | translateX(100%) |
| Opacity | 0 |
| Duration | 250ms |
| Easing | ease-in |

### Batch Dismiss
| Property | Value |
|----------|-------|
| Stagger | 50ms between items |
| Total | Max 300ms for batch of 6 |
| Collapse | Remaining items slide up 64px, 300ms ease |

### Group Collapse/Expand
| Property | Value |
|----------|-------|
| Collapse | Max-height 0, 300ms ease |
| Expand | Max-height auto, 350ms ease |

### New Notification Toast (top)
| Property | Value |
|----------|-------|
| Slide in | translateY(-100%) → 0, 300ms ease-out |
| Auto-dismiss | 5s delay then slide out |
| Stack | Max 3 stacked, overlapping 4px |

### Snooze Animation
| Property | Value |
|----------|-------|
| Icon | Clock spin 200ms |
| Item | Drop opacity to 0.5, slide down 20px, 300ms |
| Return | After snooze duration, slide back + highlight flash |

---

## Responsive Behavior

| Element | Mobile (<768px) | Tablet (768–1023px) | Desktop (1280px+) |
|---------|-----------------|---------------------|-------------------|
| Layout | Full width, bottom nav | Full width, sidebar rail | Sidebar + full content |
| Filter tabs | Horizontal scroll, no count badges | Horizontal scroll, with badges | Full visible with badges |
| Notification items | Compact (56px min, 12px padding) | Standard (64px) | Standard |
| Unread dot | 6px (smaller) | 8px | 8px |
| Action buttons | Swipe to reveal (no inline) | Inline text links | Inline text links |
| Time groups | "Today", "Yesterday", "Older" | All 4 groups | All 4 groups |
| Earlier collapse | Always collapsed by default | Collapsed >10 items | Collapsed >15 items |
| View action | Arrow right icon | [View] text | [View] text |
| Dismiss | Swipe | × icon | × icon |
| Snooze | Long press | 🔔 icon | 🔔 icon |
| Content padding | Space-5 (16px) | Space-7 (24px) | Space-8 (32px) |
| Batch actions | Hidden | "Mark Read" top bar | "Mark All Read" top bar |
| Pull to refresh | Available | Available | — |

---

## Visual Hierarchy

1. **Primary Focus:** Unread notifications — Primary-50 bg highlight + bold text + dot (strongest visual signal)
2. **Secondary Focus:** Filter tabs — determine visible category, active tab is Primary-600
3. **Tertiary Focus:** Time group headers — scanning by recency
4. **Supporting:** Action links (View/Dismiss/Snooze), type icons

### Eye Movement
```
Filter Tabs → [select category]
    ↓
Unread Items (highlighted) → [scan first]
    ↓
Time Groups → Today → Yesterday → This Week → Earlier
    ↓
Per item: Dot → Icon → Title (bold = unread) → Description → Timestamp → Actions
```

---

## Accessibility

| Element | Role | ARIA |
|---------|------|------|
| Notification list | `role="list"` | `aria-label="Notifications"` |
| Notification item | `role="listitem"` | `aria-label="[type] notification: [title]"` |
| Filter tabs | `role="tablist"`, children `role="tab"` | `aria-selected`, `aria-controls`, `aria-label="Show [tab] notifications"` |
| Tab panel | `role="tabpanel"` | `aria-labelledby` |
| Unread indicator | — | `aria-label="Unread notification"` |
| Unread dot | — | `aria-hidden="true"` (decorative) |
| Type icon | `role="img"` | `aria-label="[type] icon"` |
| [View] action | `role="link"` | `aria-label="View [type] details"` |
| [Dismiss] | `role="button"` | `aria-label="Dismiss notification"` |
| [Snooze] | `role="button"` | `aria-label="Snooze notification"`, `aria-haspopup="true"` |
| Live region | — | `aria-live="polite"` on notification container for new items |
| Time group | `role="heading"` | `aria-level="2"` |
| Empty state | `role="status"` | `aria-label="All caught up"` |
| Error state | `role="alert"` | `aria-live="assertive"` |
| Mark all read | `role="button"` | `aria-label="Mark all notifications as read"` |

### Keyboard Navigation Table

| Key | Context | Action |
|-----|---------|--------|
| Tab | Global | Cycle: Tabs → Notification items → Actions → Topbar → Sidebar |
| Shift+Tab | Global | Reverse focus |
| Left/Right | Filter tabs | Switch between filters |
| Up/Down | Notification list | Navigate between items |
| Space | Item focused | Activate item (navigate to source) |
| Enter | Item focused | Activate item |
| V | Item focused | View action |
| D | Item focused | Dismiss notification |
| S | Item focused | Snooze (opens snooze picker) |
| Escape | Snooze picker | Close picker |
| Escape | Global | Close notification center (if overlay) |
| M | Tabs focused | Mark all as read |
| Ctrl/Cmd+K | Global | Command palette |
| / | Global | Filter search (future) |

---

## AI Integration

| Feature | Location | Behavior | Trigger |
|---------|----------|----------|---------|
| Smart batching | Notification list | AI groups related notifications (e.g., "3 application updates from Acme Corp") | On list load |
| Weekly digest | Top of list (on Monday) | AI summary: "3 apps active, 2 interviews, score +5 pts" | Weekly generation |
| Priority sorting | Notification list | AI reorders by urgency: interview reminders > application updates > system | On list load |
| Snooze suggestions | On snooze | AI recommends optimal time: "Resume in 3 hours after your interview" | On snooze trigger |
| Action predictions | [View] link | AI predicts which notification user will open, highlights with subtle glow | On list render |
| Sentiment analysis | Item badge | AI tags urgent: ⚡ "High priority — response needed" | On message/application types |
| Smart dismiss suggestions | Batch actions | AI suggests "Dismiss all CV analysis notifications?" | When 3+ similar read |
| Notification opt-out | System tab | "You get 12+ system notifications. AI recommends muting 3 types." | On system tab visit |
| Response reminders | Application type | "You haven't responded to Beta Inc's offer — reminder set?" | After 48h on offer |
| Digest timing | Digest header | AI personalizes digest day/time based on user engagement patterns | Weekly |

### AI Behavior States

| State | Visual |
|-------|--------|
| Processing | Sparkle icon pulsing on AI-specific items |
| Complete | Sparkle solid, insight available |
| Suggestion | Dotted border around suggested batch action |
| Offline | AI features hidden, "AI unavailable" |
| Error | "AI couldn't process" caption on affected items |

---

## Future Expansion

| Feature | Phase |
|---------|-------|
| Push notification configuration (device-level) | Phase 2 |
| Custom notification rules (user-defined filters) | Phase 4 |
| Email digest preferences | Phase 2 |
| Quiet hours / do not disturb scheduling | Phase 3 |
| Cross-device read state sync | Phase 3 |
| Notification analytics (engagement, patterns) | Phase 5 |
| In-app notification center floating widget | Phase 4 |
| Rich notifications (inline preview, quick reply) | Phase 4 |
| Notification categories customization | Phase 2 |
| Priority notification bypass (urgent always through) | Phase 3 |
| Shared notification channels (workspace alerts) | Phase 6 |

---

*Cross-references: DP-7:Notifications, DP-6:Screen (Notifications), DP-6:Nav (Notification Flow), DP-1:All, DP-8:All*
