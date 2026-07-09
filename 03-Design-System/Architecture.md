# Architecture — Design System

**Phase:** DP-2 (Design System)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Architecture-Overview.md](../01-Constitution/Architecture-Overview.md)), DP-1 ([Architecture.md](../02-Design-Language/Architecture.md))

---

## Purpose

This document defines the structure, dependencies, and relationships within the Design System (DP-2). It maps how component specifications inherit from DP-0 Constitution and DP-1 Design Language, and how they will be consumed by DP-3 Component Library.

---

## Document Dependency Map

```
DP-0 CONSTITUTION (Permanent authority)
    |
    v
DP-1 DESIGN LANGUAGE (Color, Type, Space, Motion, Tokens)
    |
    v
DP-2 DESIGN SYSTEM (Component specifications)
    |
    ├── Buttons.md
    ├── Cards.md
    ├── Forms.md
    ├── Search.md
    ├── Navigation.md
    ├── Tables.md
    ├── Dialogs.md
    ├── Feedback.md
    ├── Loading.md
    ├── EmptyStates.md
    ├── Charts.md
    ├── Uploads.md
    ├── AI-Components.md
    └── Dashboard-Components.md
    |
    v
DP-3 COMPONENT LIBRARY (React/TSX implementation)
    |
    v
DP-4+ CORE WORKSPACE AND MODULES
```

---

## Component Categories

### Actions

Components that enable user interaction and task execution.

| Component | Primary Document | Key Variants |
|-----------|-----------------|--------------|
| Button | [Buttons.md](Components/Buttons.md) | Primary, Secondary, Ghost, Danger, Outline, Success, AI Action, Icon, Split, Floating |
| Icon Button | [Buttons.md](Components/Buttons.md) | Standard, Toolbar, Close |
| Split Button | [Buttons.md](Components/Buttons.md) | Single action + dropdown |
| Floating Button | [Buttons.md](Components/Buttons.md) | Mobile primary action |

### Containers

Components that group and organize content.

| Component | Primary Document | Key Variants |
|-----------|-----------------|--------------|
| Card | [Cards.md](Components/Cards.md) | Dashboard, Analytics, Job, Document, Profile, Insight, AI, Feature, Expandable, Interactive |
| Drawer | [Dialogs.md](Components/Dialogs.md) | Side panel, slide-over |
| Modal | [Dialogs.md](Components/Dialogs.md) | Standard, Confirmation, Warning, Delete, AI |

### Inputs

Components that capture user data and selections.

| Component | Primary Document | Key Variants |
|-----------|-----------------|--------------|
| Text Input | [Forms.md](Components/Forms.md) | Standard, with icon, with button |
| Textarea | [Forms.md](Components/Forms.md) | Standard, auto-resize |
| Select | [Forms.md](Components/Forms.md) | Single, multi, searchable |
| Checkbox | [Forms.md](Components/Forms.md) | Standard, indeterminate |
| Radio | [Forms.md](Components/Forms.md) | Standard, card-style |
| Switch | [Forms.md](Components/Forms.md) | Standard, with label |
| Date Picker | [Forms.md](Components/Forms.md) | Single, range, with time |
| Password Input | [Forms.md](Components/Forms.md) | With toggle visibility |

### Navigation

Components that enable movement through the application.

| Component | Primary Document | Key Variants |
|-----------|-----------------|--------------|
| Sidebar | [Navigation.md](Components/Navigation.md) | Expanded, collapsed, mobile bottom |
| Top Bar | [Navigation.md](Components/Navigation.md) | Standard, with search |
| Breadcrumb | [Navigation.md](Components/Navigation.md) | Standard, collapsed |
| Tabs | [Navigation.md](Components/Navigation.md) | Primary, secondary, underline, pill |
| Segmented Control | [Navigation.md](Components/Navigation.md) | 2-option, 3+ option |
| Dropdown | [Navigation.md](Components/Navigation.md) | Menu, select, action |
| Pagination | [Navigation.md](Components/Navigation.md) | Standard, compact, load-more |

### Data Display

Components that present structured information.

| Component | Primary Document | Key Variants |
|-----------|-----------------|--------------|
| Data Table | [Tables.md](Components/Tables.md) | Standard, compact, sortable, filterable, selectable |
| Chart | [Charts.md](Components/Charts.md) | Line, Bar, Pie, Area, Timeline, Heatmap |

### Feedback

Components that communicate system state and action results.

| Component | Primary Document | Key Variants |
|-----------|-----------------|--------------|
| Toast | [Feedback.md](Components/Feedback.md) | Success, Error, Warning, Info |
| Snackbar | [Feedback.md](Components/Feedback.md) | With action, persistent |
| Banner | [Feedback.md](Components/Feedback.md) | Page-level, section-level |
| Notification | [Feedback.md](Components/Feedback.md) | In-app, digest |
| Progress | [Feedback.md](Components/Feedback.md) | Determinate, indeterminate |

### Loading

Components that indicate content is being prepared.

| Component | Primary Document | Key Variants |
|-----------|-----------------|--------------|
| Skeleton | [Loading.md](Components/Loading.md) | Card, table row, text, avatar, chart |
| Spinner | [Loading.md](Components/Loading.md) | Inline, section, full page |
| Progress Bar | [Loading.md](Components/Loading.md) | Determinate, indeterminate |
| Streaming State | [Loading.md](Components/Loading.md) | AI response streaming |

### Search

Components that enable content discovery.

| Component | Primary Document | Key Variants |
|-----------|-----------------|--------------|
| Global Search | [Search.md](Components/Search.md) | Command palette, top bar |
| Local Search | [Search.md](Components/Search.md) | In-page, inline list |
| AI Search | [Search.md](Components/Search.md) | Natural language, conversational |

### Upload

Components that handle file intake.

| Component | Primary Document | Key Variants |
|-----------|-----------------|--------------|
| Upload Zone | [Uploads.md](Components/Uploads.md) | Click, drag-drop |
| Document Preview | [Uploads.md](Components/Uploads.md) | PDF, DOCX, image |
| Upload Progress | [Uploads.md](Components/Uploads.md) | Single, batch |

### AI

Components specific to AI interactions.

| Component | Primary Document | Key Variants |
|-----------|-----------------|--------------|
| AI Message | [AI-Components.md](Components/AI-Components.md) | Text, with sources, with actions |
| Thinking Card | [AI-Components.md](Components/AI-Components.md) | Inline, expanded |
| Suggestion Card | [AI-Components.md](Components/AI-Components.md) | Accept, dismiss, modify |
| Reasoning Panel | [AI-Components.md](Components/AI-Components.md) | Collapsed, expanded |
| Confidence Badge | [AI-Components.md](Components/AI-Components.md) | High, medium, low |
| Action Recommendation | [AI-Components.md](Components/AI-Components.md) | Single, ranked list |
| Streaming Output | [AI-Components.md](Components/AI-Components.md) | Typing indicator, progressive reveal |
| Memory Indicator | [AI-Components.md](Components/AI-Components.md) | What AI remembers |

### Dashboard

Components specific to dashboard layouts.

| Component | Primary Document | Key Variants |
|-----------|-----------------|--------------|
| Stat Card | [Dashboard-Components.md](Components/Dashboard-Components.md) | Single metric, with trend, with chart |
| Quick Action | [Dashboard-Components.md](Components/Dashboard-Components.md) | Icon grid, list |
| Recent Activity | [Dashboard-Components.md](Components/Dashboard-Components.md) | Timeline, list |
| Timeline | [Dashboard-Components.md](Components/Dashboard-Components.md) | Vertical, horizontal |
| Widget | [Dashboard-Components.md](Components/Dashboard-Components.md) | Configurable chart/data widget |
| Recommendation Card | [Dashboard-Components.md](Components/Dashboard-Components.md) | AI-driven, context-aware |

---

## Inheritance Map

### From DP-0 Constitution

| DP-0 Document | DP-2 Constraint |
|---------------|-----------------|
| Project-Constitution.md | One primary action per screen => one primary button per view |
| Brand-Constitution.md | Premium experience => every state designed, no default states |
| Product-Constitution.md | Compose don't build => reuse components, avoid duplication |
| UX-Constitution.md | Keyboard navigation => all components keyboard accessible |
| Design-Principles.md | Minimal => no decorative elements in any component |

### From DP-1 Design Language

| DP-1 Token Category | DP-2 Component Usage |
|---------------------|----------------------|
| Color tokens | Backgrounds, borders, text, icons, semantic states |
| Typography tokens | All component text — headings, body, labels, captions |
| Spacing tokens | Padding, margin, gap within and between components |
| Radius tokens | Corner rounding for all container components |
| Shadow tokens | Elevation for cards, dialogs, dropdowns |
| Motion tokens | Transition durations for all interactive states |
| Grid tokens | Card grids, table layouts, dashboard widgets |

---

## Design Authority Within DP-2

| Document | Authority | Description |
|----------|-----------|-------------|
| Buttons.md | Self-contained | Button patterns do not depend on other DP-2 docs |
| Cards.md | Self-contained | Card patterns stand alone |
| Forms.md | References Buttons.md | Form actions use button components |
| Search.md | References Forms.md, Navigation.md | Search input is a form control; command palette is navigation |
| Navigation.md | Self-contained | Navigation patterns stand alone |
| Tables.md | References Forms.md, Navigation.md | Table filters use form controls; pagination is navigation |
| Dialogs.md | References Buttons.md, Forms.md | Dialog actions use buttons; forms appear in dialogs |
| Feedback.md | Self-contained | Feedback patterns stand alone |
| Loading.md | References Cards.md | Skeleton screens mirror card layouts |
| EmptyStates.md | References Buttons.md | Empty state actions use buttons |
| Charts.md | Self-contained | Chart specifications stand alone (rules only) |
| Uploads.md | References Forms.md, Loading.md | Upload triggers are form controls; progress is loading |
| AI-Components.md | References Cards.md, Buttons.md | AI cards extend card patterns; AI actions use buttons |
| Dashboard-Components.md | References Cards.md, Charts.md, AI-Components.md | Dashboard widgets compose multiple component types |

---

## Scalability

The Design System accommodates future expansion through:

1. **Component token extension** — New components create new component tokens without modifying existing tokens.
2. **Module-specific variants** — Modules can define component variants within their namespace (e.g., `career-card-job-listing`).
3. **Composition over creation** — New interfaces compose existing components rather than creating new ones.
4. **Pattern registration** — New component types are added to this architecture document and cross-referenced from existing documents.
5. **Deprecation path** — Component variants that are superseded are marked deprecated for one major version before removal.

---

*This Architecture document is permanent. All component definitions in DP-2 follow the structure and relationships defined here. Refer to [README.md](README.md) for the Design System overview, and [Architecture-Overview.md](../01-Constitution/Architecture-Overview.md) for the full Design OS architecture.*
