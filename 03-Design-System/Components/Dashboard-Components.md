# Dashboard Components

**Phase:** DP-2 (Design System)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md), [Brand-Constitution.md](../../01-Constitution/Brand-Constitution.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md), [Elevation-System.md](../../02-Design-Language/Elevation-System.md), [Grid-System.md](../../02-Design-Language/Grid-System.md), [Motion-System.md](../../02-Design-Language/Motion-System.md), [Layout-Principles.md](../../02-Design-Language/Layout-Principles.md))

---

## Purpose

Dashboard components compose the primary landing experience in MR:EGO. They provide at-a-glance insight into key metrics, recent activity, and actionable next steps. Every dashboard element communicates useful information — no decoration.

---

## When to Use

- Workspace home/dashboard screen
- Module landing pages with summary views
- Analytics overview panels
- Personal career dashboard
- AI insight feed

## When NOT to Use

- Detail views or data exploration — use full pages with tables/charts
- Settings or configuration — use form layouts
- Single-purpose pages — one primary action per screen
- Content that changes infrequently — use static page layout

---

## Variants

### Stat Card

Single metric with optional trend and comparison.

| Element | Specification |
|---------|---------------|
| Label | Overline (12px/600), uppercase, Text-Secondary |
| Value | Heading-2 (28px/700) or Heading-3 |
| Unit | Body, Text-Secondary, beside value |
| Trend | Up/down icon + percentage change |
| Trend color | Up = Success-500, Down = Danger-500 |
| Period | "vs last month" (Caption, Text-Secondary) |
| Icon (optional) | 24px, top-right, semantic color |
| Sparkline (optional) | 60px inline mini chart |
| Min height | 100px |
| Padding | 20px |
| Background | Surface-1 |
| Border radius | Radius-Md (8px) |

| State | Visual |
|-------|--------|
| Default | Standard card appearance |
| Hover (interactive) | Shadow-2, slight lift (clickable for detail) |
| Loading | Skeleton card with label and value lines |

### Quick Action

One-click access to common tasks.

| Property | Value |
|----------|-------|
| Size | 64x64px (icon), full-width label |
| Layout | Grid of actions (3-6 items) |
| Icon | 24px, color-text-secondary |
| Label | Body-Small (14px), centered below icon |
| Hover | Background Surface-2, icon becomes Primary-500 |
| Focus | 2px focus ring on icon square |
| Animation | Hover scale 1.05, 100ms Ease-Out |

| Actions | Examples |
|---------|----------|
| Create | "New Document", "Add Experience", "Create Project" |
| Navigate | "Browse Jobs", "View Calendar", "Open AI Workspace" |
| Import | "Import Resume", "Connect Calendar" |

### Recent Activity

Timeline of recent platform activity.

| Property | Value |
|----------|-------|
| Max items | 10 (desktop), 5 (mobile) |
| Item height | 48-56px |
| Icon | Activity type icon, 20px, semantic color |
| Title | Body (15px), weight 500, truncated |
| Description | Caption (13px), Text-Secondary, 1 line |
| Timestamp | Relative ("2 hours ago"), Caption, Text-Secondary |
| Hover | Background tint (Neutral-50) |
| Cursor | pointer (click navigates to item) |
| Separator | 1px Border-Default between items |
| View all | "View all activity" link at bottom |

### Timeline

Visual chronological representation of events.

| Property | Vertical | Horizontal |
|----------|----------|------------|
| Line | 2px solid, Primary-200 | 2px solid, Primary-200 |
| Nodes | Circle 12px, Primary-500 fill | Circle 10px, Primary-500 |
| Card offset | Alternating left/right | Below timeline |
| Max events | 20 (with "View more") | 8 per row |
| Scrolling | Vertical | Horizontal |
| Usage | Career timeline, project phases | Milestone view, roadmap |

| Element | Specification |
|---------|---------------|
| Node icon | Optional icon inside node for special events |
| Date | Caption, Text-Secondary, above/beside card |
| Title | Body-Small, weight 600 |
| Description | Body-Small, Text-Secondary |
| Action | Optional link or button |
| Future events | Dashed line, muted colors |

### Widget

Configurable dashboard module for displaying data or content.

| Property | Value |
|----------|-------|
| Title | Heading-4 (18px/600) |
| Header action | Icon button (more menu, refresh, expand) |
| Min height | 160px |
| Max height | 480px (scrollable) |
| Content | Chart, list, stat collection, or custom component |
| Loading | Widget-specific skeleton |
| Empty | Widget empty state |
| Error | Widget-level error with retry |
| Refresh | Auto-refresh interval configurable per widget type |

| Widget types | Content |
|--------------|---------|
| Activity widget | Recent activity list |
| Stats widget | 2-4 stat cards in grid |
| Chart widget | Line, bar, or area chart |
| Jobs widget | Recent job matches |
| Documents widget | Recent documents |
| AI widget | AI recommendations feed |

### Recommendation Card

AI-driven suggestion displayed on the dashboard.

| Property | Value |
|----------|-------|
| Layout | Horizontal card with icon, text, action |
| Icon | 24px, context-appropriate |
| Title | Body (15px), weight 600 |
| Body | Body-Small, Text-Secondary, 1-2 lines |
| Action | "View recommendations" or "Apply" |
| Confidence | Subtle badge |
| Dismiss | X button to remove from dashboard |
| Background | Primary-50 (light), Primary-900 (dark) |
| Border | 3px left border, Primary-400 |

---

## Dashboard Layout

```
┌──────────────────────────────────────────────────┐
│  Dashboard                                        │
│  Welcome back, [Name]  [Customize] [Add widget]  │
├──────────────────────────────────────────────────┤
│                                                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ Stat 1   │ │ Stat 2   │ │ Stat 3   │           │
│  │ 247      │ │ 89%      │ │ 12 new   │           │
│  └──────────┘ └──────────┘ └──────────┘           │
│                                                    │
│  ┌────────────────────┐ ┌────────────────────┐    │
│  │ Quick Actions       │ │ Widget: Activity    │    │
│  │ [New] [Browse] [AI] │ │ [Item 1]           │    │
│  └────────────────────┘ │ [Item 2]           │    │
│                         │ [Item 3]           │    │
│  ┌────────────────────┐ └────────────────────┘    │
│  │ Widget: Chart       │                          │
│  │ [Chart content]    │ ┌────────────────────┐    │
│  └────────────────────┘ │ AI Recommendation  │    │
│                         │ "Update your..."   │    │
│                         └────────────────────┘    │
└──────────────────────────────────────────────────┘
```

---

## Spacing

| Context | Value | Token |
|---------|-------|-------|
| Dashboard page padding | 32px | Space-8 |
| Dashboard title to content | 32px | Space-8 |
| Between stat cards | 24px | Space-7 |
| Between widget rows | 24px | Space-7 |
| Widget padding | 20px 24px | Space-6 Space-7 |
| Quick action grid gap | 16px | Space-5 |
| Activity item padding | 12px 16px | Space-4 Space-5 |
| Timeline node to card | 16px | Space-5 |
| Recommend card padding | 16px 20px | Space-5 Space-6 |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Widget headings | `h2` for widget titles, `h3` for stat card labels |
| Stat value | Proper heading level, announce as text |
| Quick actions | `aria-label` on icon-only quick actions |
| Activity items | Keyboard navigable, role `link` for navigation |
| Timeline | `aria-label="Career timeline"`, role `list` |
| Widget configuration | `aria-label` on customize and add widget buttons |
| Live regions | Auto-refreshing widgets use `aria-live="polite"` |
| Focus order | Dashboard content follows visual order |
| Skip to content | Available before dashboard widgets |

---

## Responsive Behavior

| Breakpoint | Change |
|------------|--------|
| Mobile (<768px) | Single column layout. Stat cards full-width. Quick actions as bottom bar. Timeline compact. |
| Tablet (768-1023px) | 2-column layout. 2 stat cards per row. Reduced widget count. |
| Desktop (1024-1279px) | 3-column stat row. 2-column widget grid. |
| Wide (1280-1599px) | 3-4 stat cards. 2-3 column widget grid. |
| Ultra-wide (1600px+) | 4 stat cards. 3-column widget grid. Optional side panels. |

---

## Future Expansion

- **Custom dashboard** — User-configurable widget layout with drag-and-drop
- **Dashboard presets** — Role-based dashboard templates (manager, IC, executive)
- **Cross-module dashboard** — Widgets from any enabled module
- **Focus mode** — Single-widget full-screen for detailed analysis
- **Dashboard sharing** — Share dashboard view with team members
- **Scheduled snapshots** — Email or notification of dashboard state at intervals
- **Goal tracking** — Widget showing progress toward user-defined career goals
- **AI dashboard** — AI-curated dashboard layout based on user behavior

---

## Related Components

- [Cards.md](Cards.md) — Stat cards, insight cards extend Card patterns
- [Charts.md](Charts.md) — Widget chart content
- [AI-Components.md](AI-Components.md) — AI recommendation card, suggestion card
- [Navigation.md](Navigation.md) — Dashboard navigation, top bar
- [Feedback.md](Feedback.md) — Widget loading/error states
- [Loading.md](Loading.md) — Dashboard skeleton loading
- [EmptyStates.md](EmptyStates.md) — Empty widget states
- [Tables.md](Tables.md) — Dashboard table widget
