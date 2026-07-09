# Routing Implementation

## Architecture

Per DP-10 Routing-System.md, the routing implementation follows a nested route architecture with typed route definitions and guard composition.

## Route Structure

### Public Routes (no authentication required)

```
/                          -> Landing (DP-16)
/welcome                   -> Welcome/Onboarding (DP-17)
/login                     -> Login (DP-15)
/register                  -> Register (DP-15)
/password-reset            -> Password Reset (DP-15)
/help                      -> Help Center (DP-26)
```

### Authenticated Routes (auth guard required)

```
/dashboard                 -> Dashboard (DP-17)
/ai/workspace              -> AI Workspace (DP-18)
/ai/conversation/:id       -> AI Conversation Detail (DP-18)
/cv                        -> CV Manager (DP-19)
/cv/new                    -> CV Builder Wizard (DP-19)
/cv/:id                    -> CV Detail (DP-19)
/cv/:id/analysis           -> CV Analysis (DP-20)
/jobs                      -> Job Search (DP-21)
/jobs/:id                  -> Job Detail (DP-22)
/jobs/:id/apply            -> Application Wizard (DP-23)
/applications              -> Application Tracker (DP-24)
/applications/:id          -> Application Detail (DP-24)
/messages                  -> Messaging (DP-25)
/messages/:id              -> Message Thread (DP-25)
/notifications             -> Notification Center (DP-26)
/documents                 -> Documents (DP-27)
/documents/:id             -> Document Detail (DP-27)
/profile                   -> Profile View (DP-28)
/profile/edit              -> Profile Editor (DP-28)
/settings                  -> Settings (DP-29)
/settings/account          -> Account Settings (DP-29)
/settings/notifications    -> Notification Prefs (DP-29)
/settings/appearance       -> Theme/Layout Settings (DP-29)
/settings/privacy          -> Privacy Settings (DP-29)
/settings/shortcuts        -> Keyboard Shortcuts (DP-29)
/settings/data             -> Data Export/Download (DP-29)
/analytics                 -> Analytics Dashboard (DP-30)
/career/progress           -> Career Progress (DP-30)
```

### System Routes

```
/404                       -> Not Found
/500                       -> Server Error
/offline                   -> Offline Page
/maintenance               -> Maintenance Page
/unauthorized              -> Unauthorized Access
```

## Implementation Sequence

| Step | Phase | Deliverable |
|------|-------|-------------|
| 1 | DP-14 | Define route configuration schema with TypeScript types |
| 2 | DP-14 | Implement `createRouter` with nested route support |
| 3 | DP-14 | Build route guards (AuthGuard, GuestGuard) |
| 4 | DP-14 | Implement lazy loading wrapper for module routes |
| 5 | DP-14 | Add permission guard and feature flag guard |
| 6 | DP-14 | Build onboarding guard for new users |
| 7 | DP-15 | Implement auth redirect logic (login -> intended page) |
| 8 | Per module | Each module registers its routes during module bootstrap |
| 9 | DP-31 | Add route transition animations |
| 10 | DP-32 | Configure server-side route handling (SPA fallback) |

## Guard Chain

```
Request -> AuthGuard -> PermissionGuard -> FeatureFlagGuard -> OnboardingGuard -> Route
```

Each guard in the chain can redirect to the appropriate system route:
- AuthGuard -> redirect /login
- PermissionGuard -> redirect /unauthorized
- FeatureFlagGuard -> redirect /404 (feature not available)
- OnboardingGuard -> redirect /welcome

## Route Configuration Pattern

Routes are defined as typed configuration objects:

- `path`: URL pattern with optional parameters
- `component`: Lazy-loaded page component
- `guards`: Array of guard functions
- `meta`: Route metadata (title, icon, permissions, feature flag)
- `children`: Nested route definitions
- `errorElement`: Per-route error boundary

## Code Splitting Strategy

- Each page is a separate lazy-loaded chunk
- Modules are chunked independently (one chunk per module by default)
- Shell and core shared libraries are in the initial bundle
- Dashboard chunk prefetched after shell loads
- Route-based splitting via dynamic `import()`

## SEO Considerations (DP-32)

- Public routes get server-side rendered metadata (title, description, OG tags)
- Authenticated routes use client-side meta tags
- Generate sitemap.xml for public pages
- Implement canonical URLs
- Add structured data (JSON-LD) for job listings on public detail pages
