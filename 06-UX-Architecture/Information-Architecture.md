# Information Architecture

**Phase:** DP-6 (UX Architecture)
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md) — Rules 10, 16), DP-4 ([Primary-Navigation.md](../05-Application-Shell/Navigation/Primary-Navigation.md))

---

## Site Structure

```
MR:EGO Platform
├── Public (unauthenticated)
│   ├── Landing
│   ├── Welcome
│   ├── Authentication
│   │   ├── Login
│   │   ├── Register
│   │   ├── Password Reset Request
│   │   └── Password Reset Confirm
│   └── Help Center (public articles)
│
├── Authenticated Workspace
│   ├── Dashboard (home)
│   │   ├── Overview
│   │   ├── Recommendations
│   │   ├── Tasks
│   │   ├── Progress
│   │   └── AI Summary
│   │
│   ├── Profile
│   │   ├── About
│   │   ├── Experience
│   │   ├── Skills
│   │   ├── Documents
│   │   └── Activity
│   │
│   ├── CV Manager
│   │   ├── Upload
│   │   ├── Analysis
│   │   ├── Optimization
│   │   ├── Preview
│   │   └── Versions
│   │
│   ├── Jobs
│   │   ├── Search
│   │   ├── Filters
│   │   ├── Job Detail
│   │   ├── Match Analysis
│   │   ├── Saved Jobs
│   │   └── Application Form
│   │
│   ├── Applications
│   │   ├── Active
│   │   ├── Interviewing
│   │   ├── Offers
│   │   ├── Rejected
│   │   └── Application Detail
│   │
│   ├── AI Workspace
│   │   ├── Conversation
│   │   ├── Suggestions
│   │   ├── Reasoning
│   │   └── Memory
│   │
│   ├── Documents
│   │   ├── All Documents
│   │   ├── Cover Letters
│   │   ├── Portfolios
│   │   └── Uploads
│   │
│   ├── Career Progress
│   │   ├── Timeline
│   │   ├── Skill Map
│   │   ├── Goals
│   │   └── Analytics
│   │
│   ├── Notifications
│   │   ├── In-App
│   │   ├── Digest
│   │   └── Archive
│   │
│   ├── Settings
│   │   ├── Profile Settings
│   │   ├── Notifications
│   │   ├── Privacy
│   │   ├── Appearance
│   │   ├── Security
│   │   └── Preferences
│   │
│   └── Help Center
│       ├── Guides
│       ├── FAQ
│       ├── Contact
│       └── Feedback
│
└── System (always available)
    ├── Offline
    ├── Maintenance
    ├── Error
    └── Unauthorized
```

---

## Page Relationships

### Opening Relationships

| Source Page | Opens | Trigger | Behavior |
|-------------|-------|---------|----------|
| Landing | Authentication | "Get Started" | Route navigation |
| Authentication | Onboarding | Registration success | Auto-redirect |
| Onboarding | Dashboard | Onboarding complete | Auto-redirect |
| Dashboard | Job Search | "Find Jobs" card | Route navigation |
| Dashboard | CV Manager | "Upload CV" card | Route navigation |
| Dashboard | Applications | "My Applications" card | Route navigation |
| Dashboard | AI Workspace | AI quick action | Panel opens |
| Job Search | Job Detail | Click job card | Route navigation |
| Job Detail | Application Form | "Apply" | Route navigation |
| Application Form | Application Detail | Application submitted | Route navigation |
| Application Detail | Interview Prep | Status = interview | Section within page |
| CV Manager | CV Analysis | File uploaded | Route (analysis loading) |
| CV Analysis | CV Optimization | Analysis complete | Route navigation |
| Profile | Profile Edit | "Edit" | Inline edit mode |
| Notifications | Relevant page | Click notification | Route navigation |
| Settings | Various | Section selection | Same page, section switch |

### Return Paths

| Page | Back Navigates To | Behavior |
|------|-------------------|----------|
| All pages | Previous logical page | Browser back or app back button |
| Authentication | Landing | If direct visit |
| Job Detail | Job Search | With preserved filters and scroll position |
| Application Detail | Applications list | With preserved filter state |
| CV Analysis | CV Manager | Back to file list |
| Settings sections | Settings main | Section sidebar navigation |
| Help article | Help Center | Back to article list |

### Modal Usage

| Modal | Triggered From | Purpose |
|-------|---------------|---------|
| Confirmation Dialog | Destructive actions | Confirm delete, discard, irreversible actions |
| AI Reasoning Modal | AI suggestion "Explain" | Detailed reasoning breakdown |
| Quick Apply Modal | Job search | Rapid application without full form |
| Image Preview | Document viewer | Full-size document preview |
| Session Expiry | Any page (timed) | Re-authentication prompt |
| Offer Review | Application detail | Full offer details in context |

### Drawer Usage

| Drawer | Triggered From | Content |
|--------|---------------|---------|
| Filter Drawer | Job search (mobile) | All filter controls |
| AI Context Panel | AI workspace | Current AI context and memory |
| Notification Panel | Topbar bell icon | Recent notifications |
| User Menu | Topbar avatar | Profile, settings, logout |
| Module Switcher | Topbar workspace icon | Module list |

### Floating Panels

| Panel | Position | Content |
|-------|----------|---------|
| AI Assistant | Bottom-right | Quick AI access |
| CV Optimizer | Right side (CV page) | AI suggestions |
| Match Score | Right side (job detail) | Fit analysis |
| Task Quick View | Bottom-center | Today's tasks |

### Command Palette Access

| Command | Result |
|---------|--------|
| Ctrl+K / Cmd+K | Open command palette |
| / | Quick search (any page) |
| ? | Show keyboard shortcuts |
| g + d | Go to Dashboard |
| g + j | Go to Jobs |
| g + p | Go to Profile |
| g + c | Go to CV Manager |
| g + a | Go to Applications |
| g + s | Go to Settings |
| g + n | Go to Notifications |
| g + h | Go to Help Center |
| n + j | New job search |
| n + c | New CV upload |
| n + a | New application |
| n + d | New document |
| a + i | Open AI assistant |

---

## Page Depth Levels

| Depth | Pages | Navigation |
|-------|-------|------------|
| Level 0 (Root) | Dashboard | Primary nav, home |
| Level 1 (Sections) | Jobs, Profile, CV Manager, Applications, AI Workspace, Documents, Career Progress, Settings | Primary nav items |
| Level 2 (Subsections) | Job Detail, Application Detail, Analysis, Optimization | Secondary nav, breadcrumbs |
| Level 3 (Actions) | Application Form, Interview Prep, CV Editor | Breadcrumbs only |

Breadcrumbs appear at Depth 2+.

---

## Widget Relationships

| Dashboard Widget | Data Source | Click Action |
|-----------------|-------------|--------------|
| Application Status Summary | Applications module | Navigate to Applications |
| Recommended Jobs | AI + Job Search | Navigate to Job Detail |
| CV Strength Score | CV Analysis | Navigate to CV Manager |
| Upcoming Interviews | Applications module | Navigate to Application Detail |
| Recent Activity | All modules | Navigate to relevant page |
| Career Progress | Career Progress module | Navigate to Career Progress |
| AI Insight | AI Workspace | Open AI panel |
| Quick Actions | Defined per user role | Various |

---

## Page Grouping

| Group | Pages | Layout Template |
|-------|-------|-----------------|
| Public | Landing, Welcome, Authentication | Authentication Layout |
| Workspace | Dashboard | Dashboard Layout |
| Career | Jobs, Job Detail, Applications | Jobs Layout |
| Documents | CV Manager, Documents | Documents Layout |
| AI | AI Workspace | Workspace Layout |
| Profile | Profile, Career Progress | Profile Layout |
| Settings | Settings | Settings Layout |
| Multi-step | Onboarding | Wizard Layout |

---

*This Information Architecture defines the complete page structure of MR:EGO. Every page belongs to a group, has defined relationships, and follows the layout templates from DP-4. Refer to [Navigation-Flow.md](Navigation-Flow.md) for navigation architecture and [Screen-Inventory.md](Screen-Inventory.md) for screen specifications.*
