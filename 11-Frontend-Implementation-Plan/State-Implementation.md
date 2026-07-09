# State Implementation

## Architecture

Per DP-10 State-Management.md, state is managed in a hierarchical architecture with three tiers: global state, module state, and UI state.

## State Tiers

### Tier 1: Global State (cross-cutting)

Scope: Application-wide concerns shared across modules

| Slice | Data | Implementation Phase |
|-------|------|---------------------|
| `auth` | User, session, permissions, tokens | DP-15 |
| `ui` | Theme, sidebar collapsed, active modal, command palette | DP-14 |
| `preferences` | Locale, notifications enabled, reduced motion | DP-14 (skeleton), DP-29 (full) |
| `notifications` | Unread count, active toasts | DP-26 |

**Implementation:**
- React Context with `useReducer` for each slice
- Selector pattern: components never access context directly
- Persistence: `auth` via localStorage, `preferences` via localStorage + server

### Tier 2: Module State (isolated per module)

Scope: Module-specific data managed within each module package

| Module | State | Phase |
|--------|-------|-------|
| Dashboard | Metrics overview, recent activity, recommendations | DP-17 |
| AI | Conversations, current message, streaming state, memory | DP-18 |
| CV | CV list, active CV, section data, analysis results | DP-19 |
| Jobs | Search query, results, filters, pagination | DP-21 |
| Applications | Application list, active application, status | DP-24 |
| Messaging | Conversation list, active thread, message draft | DP-25 |
| Documents | Document list, active document, upload progress | DP-27 |
| Profile | Profile data, edit state, photo upload progress | DP-28 |
| Analytics | Date range, filters, chart data | DP-30 |

**Implementation:**
- Module uses its own Context provider
- Module state never accessed outside module boundary
- Cross-module communication via core events/actions
- Module store is destroyed when module unmounts

### Tier 3: UI State (component-local)

Scope: Ephemeral state that belongs to a single component

| Type | Examples |
|------|----------|
| Form state | Input values, validation errors, dirty flags |
| Selection state | Active tab, highlighted row, selected items |
| Scroll state | Scroll position, virtual scroll offset |
| Pagination | Current page, page size, sort column |
| Animation state | Open/closed, expanded/collapsed, transition phase |

**Implementation:**
- Component-local `useState` or `useReducer`
- Form state via controlled components with validation
- No UI state in global store
- Scroll position persisted to sessionStorage for back navigation

## State Access Rules

```
Component -> Selector (read) -> Context/Store -> State
Component -> Dispatch (write) -> Reducer/Action -> State
```

- Components use selectors only — no direct store access
- Selectors are pure functions: `(state) => derivedValue`
- Selectors can compose: `createSelector(authSelectors.user, (user) => user.name)`
- Memoized selectors prevent unnecessary re-renders

## Data Fetching Strategy

### Cache Layers

| Layer | Duration | Storage | Use Case |
|-------|----------|---------|----------|
| Entity cache | Session | In-memory Map | User, CV, Job details |
| List cache | 5 minutes | In-memory Map | Search results, lists |
| Search cache | Never cached | - | Search queries |
| Auth cache | Token expiry | localStorage | Auth tokens |
| Preferences cache | Permanent | localStorage + server | User settings |

### Fetch Flow

```
Component -> useQuery(hook) -> Cache check -> API client -> Response -> Cache update -> Render
Mutations -> useMutation(hook) -> Optimistic update -> API call -> Rollback on error -> Invalidate cache
```

### Offline Strategy

- Offline mutation queue stored in IndexedDB
- Queue processed when connection restored
- Critical reads from entity cache in offline mode
- Offline indicator displayed via shell status bar

## Implementation Sequence

| Step | Phase | Deliverable |
|------|-------|-------------|
| 1 | DP-14 | Implement global state contexts (auth, ui, preferences) |
| 2 | DP-14 | Build selector infrastructure and helper hooks |
| 3 | DP-14 | Implement API client with interceptor pipeline |
| 4 | DP-14 | Build caching layer (entity, list, search) |
| 5 | DP-15 | Implement auth state slice |
| 6 | Per module | Each module implements its own state layer |
| 7 | DP-31 | Optimize selector memoization, reduce re-renders |
