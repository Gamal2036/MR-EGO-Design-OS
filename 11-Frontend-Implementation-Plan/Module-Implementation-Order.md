# Module Implementation Order

## Foundation Packages

Implement first — all modules depend on these:

| Order | Package | Phase | Key Deliverables |
|-------|---------|-------|------------------|
| 1 | `packages/tokens` | DP-13 | Design token definitions, CSS variables, theme engine |
| 2 | `packages/icons` | DP-13 | SVG icon library, Icon component |
| 3 | `packages/utils` | DP-12 | Shared utilities, type guards, formatters |
| 4 | `packages/hooks` | DP-14 | Shared React hooks (useDebounce, useMediaQuery, etc.) |
| 5 | `packages/core` | DP-14 | State store, API client, router, auth, i18n, analytics |
| 6 | `packages/components` | DP-14+ | Component library — built incrementally across phases |
| 7 | `packages/shell` | DP-14 | Application shell, providers, layouts, regions |

## Component Implementation Order (within `packages/components`)

Per DP-2 and DP-3 specifications, components are built in dependency order:

### Level 0 — Utilities (DP-12/DP-13)
```
Icon -> Spinner -> Portal -> FocusTrap -> SkipLink
-> VisuallyHidden -> ClickOutside -> ResizeObserver -> KeyboardShortcut
```

### Level 1 — Core Primitives (DP-14)
```
Divider -> Avatar -> Badge -> Chip -> Tag -> Tooltip
-> Container -> Surface
```

### Level 2 — Core Composites (DP-14)
```
Button -> IconButton -> FloatingButton -> SplitButton
-> Card -> Panel -> Popover
```

### Level 3 — Forms (DP-15)
```
Input -> Password -> Textarea -> Checkbox -> Radio -> Select
-> MultiSelect -> DatePicker -> Switch -> Slider -> FileInput
-> SearchInput -> CommandInput -> Stepper -> FormGroup -> Validation
```

### Level 4 — Navigation (DP-14/DP-15)
```
Sidebar -> SidebarGroup -> SidebarItem -> Topbar -> Breadcrumb
-> Tabs -> CommandPalette -> ContextMenu -> Dropdown -> NavigationRail
```

### Level 5 — Domain Components (DP-17 onwards)
```
Dashboard: MetricCard, StatCard, ProgressCard, InsightCard,
           RecommendationCard, QuickActionCard, ActivityCard,
           SummaryCard, TimelineCard

Data: Accordion, DataGrid, Table, List, Timeline, TreeView,
      Filters, Pagination, Sorting

AI: AIMessage, Conversation, StreamingMessage, ThinkingCard,
    ConfidenceBadge, ContextBadge, MemoryIndicator,
    RecommendationPanel, ReasoningPanel, PromptCard

Documents: FileCard, AttachmentCard, DocumentPreview,
           ImagePreview, UploadZone, VersionHistory

Feedback: Alert, Dialog, ConfirmationDialog, WarningDialog,
          Toast, Skeleton, ProgressBar, EmptyState,
          ErrorState, LoadingState
```

### Level 6 — Layout/Charts (DP-30)
```
Grid -> Stack -> Workspace -> ResizablePanel -> SplitView
-> Section -> HeroContainer -> ContentArea
-> LineChart -> AreaChart -> BarChart -> PieChart
-> TimelineChart -> HeatMap
```

## Module Implementation Order

| Order | Package | Phase | Depends On |
|-------|---------|-------|------------|
| 1 | `packages/module-dashboard` | DP-17 | shell, core, components |
| 2 | `packages/module-ai` | DP-18 | shell, core, components |
| 3 | `packages/module-cv` | DP-19 | shell, core, components, module-ai |
| 4 | `packages/module-jobs` | DP-21 | shell, core, components, module-cv |
| 5 | `packages/module-applications` | DP-23/24 | shell, core, components, module-jobs |
| 6 | `packages/module-messaging` | DP-25 | shell, core, components |
| 7 | `packages/module-notifications` | DP-26 | shell, core, components |
| 8 | `packages/module-documents` | DP-27 | shell, core, components |
| 9 | `packages/module-profile` | DP-28 | shell, core, components, module-cv |
| 10 | `packages/module-settings` | DP-29 | shell, core, components |
| 11 | `packages/module-analytics` | DP-30 | shell, core, components, module-cv, module-applications |

## Page-to-Module Mapping

| Page | Module | Phase |
|------|--------|-------|
| Landing | apps/web (pages) | DP-16 |
| Welcome/Onboarding | apps/web (pages) | DP-17 |
| Login, Register, Password Reset | module-auth (part of core) | DP-15 |
| Dashboard | module-dashboard | DP-17 |
| AI Workspace | module-ai | DP-18 |
| CV Manager, CV Builder | module-cv | DP-19 |
| CV Analysis | module-cv | DP-20 |
| Job Search | module-jobs | DP-21 |
| Job Details | module-jobs | DP-22 |
| Application Form (Wizard) | module-applications | DP-23 |
| Application Tracker | module-applications | DP-24 |
| Messages | module-messaging | DP-25 |
| Notifications | module-notifications | DP-26 |
| Documents | module-documents | DP-27 |
| Profile | module-profile | DP-28 |
| Settings | module-settings | DP-29 |
| Analytics | module-analytics | DP-30 |
| 404, 500, Offline, Maintenance | shell | DP-14 |
