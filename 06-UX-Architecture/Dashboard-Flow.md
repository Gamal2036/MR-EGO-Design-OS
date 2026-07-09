# Dashboard Flow

**Phase:** DP-6 (UX Architecture)
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md) — Rules 4, 17), DP-4 ([Dashboard-Layout.md](../05-Application-Shell/Layouts/Dashboard-Layout.md)), DP-3 ([Dashboard-Pattern.md](../04-Component-Library/Patterns/Dashboard-Pattern.md))

---

## Purpose

The Dashboard is the primary landing page for authenticated users. It provides a daily summary of career activity, AI recommendations, pending tasks, and quick access to all modules.

---

## User Goal

"At a glance, I want to know what I should do today to advance my career."

---

## Entry Points

| Source | Trigger |
|--------|---------|
| Login / Authentication | Auto-redirect after login |
| Logo click | Topbar logo from any page |
| Command palette | Ctrl+K → "Dashboard" or Ctrl+1 |
| Navigation sidebar | Dashboard icon click |

## Exit Points

| Target | Trigger |
|--------|---------|
| Job Search | "Find Jobs" widget click |
| Applications | Application status click |
| CV Manager | CV score card click |
| AI Workspace | AI insight expand or quick action |
| Profile | Avatar/name click in topbar |
| Settings | Gear icon click |
| Any module | Sidebar navigation click |

---

## Widget Specification

### AI Summary Card

| Aspect | Value |
|--------|-------|
| Position | Top of dashboard (hero position) |
| Content | Personalized greeting + 1-2 priority items + AI tip |
| Data Source | AI analysis of all modules |
| States | Loading (skeleton), Loaded, Error (hide gracefully), Empty (generic greeting) |
| Actions | "View Details" links to relevant section |
| Accessibility | `aria-live="polite"`, clear heading level |
| Responsive | Full-width on all devices |

### Application Status Summary

| Aspect | Value |
|--------|-------|
| Position | Widget grid, left column |
| Content | Count per status (Active, Interviewing, Offers) + total |
| Data Source | Applications module |
| States | Loading (skeleton card), Loaded, Empty ("No applications yet"), Error (retry) |
| Actions | Click → Applications list filtered by status |
| Accessibility | Status as text + badge, not color alone |

### Recommended Jobs

| Aspect | Value |
|--------|-------|
| Position | Widget grid, center column |
| Content | 2-4 job cards with match score, company, title |
| Data Source | AI + Job Search |
| States | Loading (skeleton cards), Loaded, Empty ("No matches yet — complete your profile"), Error (hide) |
| Actions | Click → Job Detail, "View All" → Job Search |
| Accessibility | `aria-label` per job card with title + company, match score as text |

### CV Strength Score

| Aspect | Value |
|--------|-------|
| Position | Widget grid, right column |
| Content | Score (0-100) + trend + top improvement suggestion |
| Data Source | CV Analysis |
| States | Loading (skeleton ring), Loaded, Empty (no CV uploaded — prompt), Error (hide) |
| Actions | Click → CV Analysis, "Upload CV" → CV Manager |
| Accessibility | Score as percentage text, not color alone |

### Upcoming Events

| Aspect | Value |
|--------|-------|
| Position | Widget grid, below summary |
| Content | Upcoming interviews, application deadlines |
| Data Source | Applications module |
| States | Loading (skeleton), Loaded, Empty ("No upcoming events"), Error (hide) |
| Actions | Click → Application Detail |
| Accessibility | Date as text, event names clear |

### Recent Activity

| Aspect | Value |
|--------|-------|
| Position | Lower widget area |
| Content | Last 5-10 actions (applied, uploaded, updated profile) |
| Data Source | All modules |
| States | Loading (skeleton list), Loaded, Empty ("No recent activity"), Error (hide) |
| Actions | Click → relevant page |
| Accessibility | List `role="list"`, each item has timestamp and description |

### Quick Actions

| Aspect | Value |
|--------|-------|
| Position | Floating or bottom row |
| Content | Upload CV, Find Jobs, Update Profile, Open AI |
| Data Source | Static (context-aware ordering) |
| States | Always visible |
| Actions | Direct to module pages |
| Accessibility | Icon + text label, `aria-label` on each |

---

## Flow Diagram

```
                     ┌─────────────┐
                     │  DASHBOARD  │
                     │   LOADED    │
                     └──────┬──────┘
                            │
              ┌─────────────┼──────────────────┐
              │             │                  │
         ┌────▼───┐   ┌────▼────┐       ┌─────▼────┐
         │  SCAN  │   │ ACT ON  │       │  EXPLORE │
         │WIDGETS │   │  TASK   │       │  MODULES │
         └────────┘   └─────────┘       └──────────┘
              │             │                  │
         ┌────▼───┐   ┌────▼────┐       ┌─────▼────┐
         │INFORMED│   │ NAV TO  │       │ NAV TO   │
         │  DECIDE│   │ SECTION │       │ MODULE   │
         └────────┘   └─────────┘       └──────────┘
```

---

## Information Hierarchy

1. **AI Summary** (personalized, top)
2. **Priority Cards** (applications, recommendations — left/center)
3. **Status Metrics** (CV score, events — right)
4. **Activity Feed** (lower)
5. **Quick Actions** (accessible but not prominent)

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| First Visit | Welcome card + step-by-step guide | Guiding user to set up profile |
| Daily Visit | Full dashboard with all widgets | Information at a glance |
| Loading | Skeleton grid matching widget layout | Data fetching |
| Empty (no profile) | Welcome card + prompt "Complete your profile" | Profile setup CTA |
| Error (partial) | Individual widget shows error, others function | Retry per widget |
| Error (full) | Full-page ErrorState | Retry dashboard |
| Offline | Cached dashboard + offline banner | Limited functionality |
| Customizing | Widget drag handles + edit panel | User reordering layout |

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (<768px) | Single column, 4 essential widgets, no sparklines, compact cards, floating quick action |
| Tablet (768-1023px) | 2 columns, widgets with trends, collapsible sections |
| Desktop (1024-1279px) | 3 columns, full widgets, sidebar visible, quick actions in header |
| Wide (1280-1599px) | 4 columns, multi-row widget areas, AI summary prominent |
| Ultra-wide (1600px+) | 4-6 column grid, max content 1600px centered, optional AI companion panel |

---

## AI Interaction

| Surface | Behavior |
|---------|----------|
| AI Summary Card | Personalized greeting + priority items from AI analysis |
| Job Recommendations | AI-selected jobs based on profile, skills, and activity |
| CV Score | AI-evaluated CV strength with improvement prompt |
| Task Prioritization | AI reorders tasks based on deadlines and importance |
| Insight Cards | AI-generated insights based on usage patterns |
| Quick Action: AI | Opens AI conversation panel |

AI is deferential — insights are suggestions, not commands. Dismissing an insight teaches the AI user preferences.

---

## Future Expansion

| Feature | Phase |
|---------|-------|
| Weekly AI career review card | Phase 2 |
| Calendar integration widget | Phase 8 |
| Team activity in enterprise mode | Phase 11 |
| Voice-activated dashboard | Phase 14 |
| Predictive career milestones | Phase 2 |
| Custom widget marketplace | Phase 12 |

---

*The Dashboard is the user's mission control for MR:EGO. Every widget has a purpose, every card drives action, and AI guides without overwhelming. Refer to [Onboarding-Flow.md](Onboarding-Flow.md) for first-time dashboard experience and [AI-Experience.md](AI-Experience.md) for AI interaction patterns.*
