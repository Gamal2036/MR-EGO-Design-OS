# Routing System

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-4 ([Navigation/Primary-Navigation.md](../05-Application-Shell/Navigation/Primary-Navigation.md)), DP-6 ([Navigation-Flow.md](../06-UX-Architecture/Navigation-Flow.md))

---

## Purpose

Defines the routing architecture — route definitions, navigation guards, lazy loading, history management, and route-level state resolution.

---

## Route Architecture

```
┌─────────────────────────────────────────────┐
│              ROUTER PROVIDER                  │
│   Route matching, navigation, guards, hooks  │
├─────────────────────────────────────────────┤
│                   ROUTE TREE                  │
│  Public routes → Auth routes → Module routes │
├─────────────────────────────────────────────┤
│              ROUTE RESOLVERS                  │
│  Data preloading, permission checks, state   │
├─────────────────────────────────────────────┤
│              NAVIGATION GUARDS                │
│  Auth guard, permission guard, feature flag  │
├─────────────────────────────────────────────┤
│             HISTORY MANAGER                   │
│  Browser history, scroll restoration, state  │
└─────────────────────────────────────────────┘
```

---

## Route Tree

### Public Routes

| Path | Page | Layout | Guard |
|------|------|--------|-------|
| `/` | Landing | AuthenticationLayout | Redirect if authenticated |
| `/welcome` | Welcome | AuthenticationLayout | Redirect if authenticated |
| `/login` | Login | AuthenticationLayout | Redirect if authenticated |
| `/register` | Register | AuthenticationLayout | Redirect if authenticated |
| `/reset-password` | ResetPassword | AuthenticationLayout | Redirect if authenticated |
| `/reset-password/:token` | ResetPasswordConfirm | AuthenticationLayout | Redirect if authenticated |
| `/help` | HelpCenter | AuthenticationLayout | None |
| `/help/:articleId` | HelpArticle | AuthenticationLayout | None |

### Authenticated Routes

| Path | Page | Layout | Module |
|------|------|--------|--------|
| `/dashboard` | Dashboard | DashboardLayout | Core |
| `/profile` | Profile | ProfileLayout | Profile |
| `/profile/:section` | ProfileSection | ProfileLayout | Profile |
| `/cv` | CVManager | DocumentsLayout | CV |
| `/cv/:id/analysis` | CVAnalysis | DocumentsLayout | CV |
| `/cv/:id/optimize` | CVOptimization | DocumentsLayout | CV |
| `/jobs` | JobSearch | JobsLayout | Jobs |
| `/jobs/:id` | JobDetail | JobsLayout | Jobs |
| `/jobs/:id/apply` | ApplicationForm | JobsLayout | Jobs |
| `/applications` | ApplicationList | JobsLayout | Applications |
| `/applications/:id` | ApplicationDetail | JobsLayout | Applications |
| `/documents` | DocumentList | DocumentsLayout | Documents |
| `/documents/:id` | DocumentDetail | DocumentsLayout | Documents |
| `/ai` | AIWorkspace | WorkspaceLayout | AI |
| `/ai/conversation/:id` | AIConversation | WorkspaceLayout | AI |
| `/notifications` | NotificationCenter | SettingsLayout | Notifications |
| `/settings` | Settings | SettingsLayout | Settings |
| `/settings/:section` | SettingsSection | SettingsLayout | Settings |
| `/career` | CareerProgress | ProfileLayout | Career |
| `/onboarding` | Onboarding | WizardLayout | Core |
| `/onboarding/:step` | OnboardingStep | WizardLayout | Core |

### System Routes

| Path | Page | Layout |
|------|------|--------|
| `/404` | NotFound | MinimalLayout |
| `/500` | ServerError | MinimalLayout |
| `/offline` | Offline | MinimalLayout |
| `/maintenance` | Maintenance | MinimalLayout |
| `/unauthorized` | Unauthorized | MinimalLayout |

---

## Route Guards

### AuthGuard

Redirects unauthenticated users to `/login` with return URL preserved.

```typescript
// Pseudocode
AuthGuard:
  if not authenticated → redirect /login?return={currentPath}
  if session expired  → redirect /login with expiry message
  if valid           → proceed
```

### GuestGuard

Redirects authenticated users to `/dashboard`.

```typescript
GuestGuard:
  if authenticated → redirect /dashboard
  if not           → proceed
```

### PermissionGuard

Checks user permissions for the target route.

```typescript
PermissionGuard:
  if user has permission → proceed
  if not                 → redirect /unauthorized
  if module disabled     → redirect /404 (module not found)
```

### FeatureFlagGuard

Checks if the route is behind a feature flag.

```typescript
FeatureFlagGuard:
  if flag enabled  → proceed
  if flag disabled → redirect /404
```

### OnboardingGuard

Checks if onboarding is complete.

```typescript
OnboardingGuard:
  if onboarding complete → proceed
  if not                 → redirect /onboarding
  if onboarding skipped  → proceed
```

---

## Route Resolution

### Route Resolver Pattern

```typescript
// Pseudocode
interface RouteResolver {
  resolve(params: RouteParams): Promise<ResolvedData>;
  shouldResolve(previous: RouteParams, next: RouteParams): boolean;
}

// Example: JobDetailResolver
JobDetailResolver:
  fetch job by id
  fetch match score
  fetch similar jobs
  → return { job, matchScore, similarJobs }
```

### Resolver Types

| Resolver | Purpose | Cache Duration |
|----------|---------|----------------|
| Page data resolver | Fetch page-specific data | Session |
| List resolver | Fetch paginated list | 5 minutes |
| Detail resolver | Fetch single entity | Until navigation |
| Search resolver | Fetch search results | None |
| Preferences resolver | Fetch user preferences | Session |

---

## Lazy Loading

### Level 1: Route-level lazy loading

Every top-level route loads its module bundle.

```typescript
// Pseudocode
const JobsModule = () => import('module-jobs');
const CVModule = () => import('module-cv');

Route:
  path: '/jobs'
  component: lazy(JobsModule)
  preload: onHover | onIdle | immediately
```

### Level 2: Component-level lazy loading

Heavy components within a page load lazily.

```typescript
// Pseudocode
const HeavyChart = () => import('components/HeavyChart');
const AIPanel = () => import('ai/AIPanel');
```

### Preloading Strategy

| Trigger | Action |
|---------|--------|
| On hover (navigation items) | Preload module bundle |
| On idle (requestIdleCallback) | Preload adjacent routes |
| On mount (current module) | Preload sibling modules |
| On network idle | Preload all remaining modules |

---

## History Management

```typescript
// Pseudocode
HistoryManager:
  entries: HistoryEntry[]        // Max 50 entries
  index: number                  // Current position

  push(entry): void              // Navigate forward
  back(): void                   // Navigate backward
  forward(): void                // Navigate forward in history
  go(delta: number): void        // Jump in history
  replace(entry): void           // Replace current entry
  clear(): void                  // Clear history (on logout)

// HistoryEntry
HistoryEntry:
  path: string
  title: string
  scrollPosition: { x, y }
  state: Record<string, unknown>
  timestamp: number
  moduleId: string
```

### Scroll Restoration

| Navigation Type | Scroll Behavior |
|----------------|-----------------|
| Forward (new page) | Scroll to top |
| Back | Restore previous scroll position |
| Same page (tab switch) | Maintain scroll position |
| Same page (search) | Scroll to top |
| Programmatic | Configurable |

---

## Route Metadata

```typescript
// Pseudocode
interface RouteMeta {
  title: string;                    // Page title (document.title)
  breadcrumb: string;               // Breadcrumb label
  icon: string;                     // Navigation icon
  layout: LayoutType;               // Layout template
  module: string;                   // Owning module ID
  permissions: string[];            // Required permissions
  featureFlag?: string;             // Feature flag key
  auth: boolean;                    // Requires authentication
  onboarding?: boolean;             // Requires completed onboarding
  analytics: RouteAnalytics;        // Analytics tracking config
  seo: RouteSEO;                    // SEO metadata (public routes only)
}

interface RouteAnalytics {
  pageView: boolean;
  pageViewName: string;
  trackExposure: boolean;
}

interface RouteSEO {
  title: string;
  description: string;
  ogImage?: string;
  noIndex?: boolean;
}
```

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Navigation-Architecture.md](Navigation-Architecture.md) | Navigation model that uses the router |
| [Page-Hierarchy.md](Page-Hierarchy.md) | Page tree that routes define |
| [Authentication-Flow.md](Authentication-Flow.md) | AuthGuard implementation |

---

## Validation Notes

1. Every route has a defined guard chain — no unprotected authenticated routes.
2. Lazy loading ensures zero unnecessary bundle loading.
3. Route resolvers prevent flash-of-empty-content.
4. Scroll restoration preserves user context across navigation.
5. Route metadata is source of truth for navigation, breadcrumbs, analytics.
