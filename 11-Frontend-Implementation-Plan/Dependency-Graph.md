# Dependency Graph

## Phase Dependencies

```
DP-12 (Bootstrap)
  └── DP-13 (Tokens) ──────────────────────────────────────────────┐
        └── DP-14 (Shell) ─────────────────────────────────────────┤
              ├── DP-15 (Auth) ────────────────────────────────────┤
              │     └── DP-16 (Landing)                            │
              ├── DP-17 (Dashboard) ───────────────────────────────┤
              │     ├── DP-19 (CV Builder)                         │
              │     │     └── DP-27 (Documents)                    │
              │     ├── DP-21 (Job Search)                         │
              │     │     └── DP-22 (Job Details)                  │
              │     │           └── DP-23 (Application Wizard)     │
              │     │                 └── DP-24 (App Tracker)      │
              │     └── DP-30 (Analytics) ← DP-24, DP-20          │
              ├── DP-18 (AI Workspace)                             │
              │     └── DP-20 (CV Analysis) ← DP-19, DP-18        │
              ├── DP-25 (Messaging) ← DP-24                        │
              ├── DP-26 (Notifications)                            │
              ├── DP-28 (Profile) ← DP-19, DP-26                   │
              │     └── DP-29 (Settings) ← DP-28                   │
              └── DP-31 (Optimization) ← ALL                       │
                    └── DP-32 (Production) ← DP-31                 │
```

## Module Package Dependencies

```
packages/tokens/
  Dependencies: none (root dependency)
  Used by: ALL packages

packages/core/
  Dependencies: tokens
  Provides: API client, state store, router, i18n, auth
  Used by: shell, ALL modules

packages/components/
  Dependencies: tokens, icons, hooks, utils
  Provides: All UI components
  Used by: shell, ALL modules

packages/shell/
  Dependencies: core, components, tokens, icons, hooks, utils
  Provides: ApplicationShell, providers, layouts, regions
  Used by: ALL modules (composition)

packages/module-dashboard/
  Dependencies: shell, core, components, tokens
  Used by: app entry point

packages/module-ai/
  Dependencies: shell, core, components, tokens
  Used by: app entry point

packages/module-cv/
  Dependencies: shell, core, components, tokens, module-ai
  Used by: app entry point

packages/module-jobs/
  Dependencies: shell, core, components, tokens, module-cv
  Used by: app entry point

packages/module-applications/
  Dependencies: shell, core, components, tokens, module-jobs
  Used by: app entry point

packages/module-notifications/
  Dependencies: shell, core, components, tokens
  Used by: shell, app entry point

packages/module-documents/
  Dependencies: shell, core, components, tokens
  Used by: app entry point

packages/module-profile/
  Dependencies: shell, core, components, tokens, module-cv
  Used by: app entry point

packages/module-settings/
  Dependencies: shell, core, components, tokens
  Used by: app entry point

packages/module-analytics/
  Dependencies: shell, core, components, tokens, module-cv, module-applications
  Used by: app entry point
```

## Critical Path

The critical path determines the minimum project duration:

```
DP-12 -> DP-13 -> DP-14 -> DP-17 -> DP-19 -> DP-27
                                        \
                                         -> DP-20 (depends on DP-18)
                              DP-21 -> DP-22 -> DP-23 -> DP-24 -> DP-25
                                                              \
                                                               -> DP-30
```

**Critical path sequence:** DP-12 -> DP-13 -> DP-14 -> DP-17 -> DP-19 -> DP-20 -> DP-30 -> DP-31 -> DP-32

**Parallelizable work:**
- DP-15 (Auth) and DP-16 (Landing) can run alongside DP-17+
- DP-18 (AI Workspace) and DP-21 (Job Search) can run in parallel with DP-19
- DP-26 (Notifications) can run any time after DP-14
- DP-28 (Profile) and DP-29 (Settings) can run late independently

## Shared Resource Dependencies

| Resource | Provided By | Consumed By |
|----------|-------------|-------------|
| Design tokens | DP-13 | All subsequent phases |
| Provider stack | DP-14 | All subsequent phases |
| API client | DP-14 core package | All module phases |
| Auth state | DP-15 | All authenticated phases |
| Auth guards | DP-15 | DP-16, DP-17+ |
| Route definitions | DP-14 | Every module adds routes |
| Region system | DP-14 | DP-18 (AI zones requires regions) |
| Component library | Continuous (DP-12 onwards) | All phases |
| AI conversation | DP-18 | DP-20 (CV Analysis) |
| CV data model | DP-19 | DP-20, DP-28, DP-30 |
| Job data model | DP-21 | DP-22, DP-23, DP-24, DP-30 |
| Application data | DP-23/24 | DP-25, DP-30 |
