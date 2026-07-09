# State Management

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-4 ([Workspace/Panel-Rules.md](../05-Application-Shell/Workspace/Panel-Rules.md)), DP-4 ([States/](../05-Application-Shell/States/))

---

## Purpose

Defines the complete state management architecture — global state, page state, entity caching, reactivity model, persistence strategy, and module isolation.

---

## State Architecture

```
┌────────────────────────────────────────────────────────────┐
│                     STATE LAYER                             │
├────────────────────────────────────────────────────────────┤
│  GLOBAL STATE                  │  PERSISTED                │
│  ┌──────────────────────┐      │  Auth tokens, prefs,      │
│  │ AuthSlice            │      │  theme, layout            │
│  │ UISlice              │      │  localStorage + server    │
│  │ PreferencesSlice     │      │                           │
│  │ NotificationsSlice   │      │  EPHEMERAL                │
│  └──────────────────────┘      │  Current route, modals    │
│                                │  Memory only              │
│  MODULE STATE                  │                           │
│  ┌──────────────────────┐      │  CACHED                   │
│  │ JobsState            │      │  Entities, lists          │
│  │ CVState              │      │  In-memory + partial      │
│  │ DocumentsState       │      │  persistence              │
│  │ ApplicationsState    │      │                           │
│  │ AIState              │      │  SERVER STATE             │
│  └──────────────────────┘      │  Always fetched           │
│                                │  Never cached locally     │
│  UI STATE                      │                           │
│  ┌──────────────────────┐      └───────────────────────────┘
│  │ ComponentState       │
│  │ FormState            │
│  │ ScrollState          │
│  │ SelectionState       │
│  └──────────────────────┘
└────────────────────────────────────────────────────────────┘
```

---

## State Categories

### Global State (Cross-cutting)

| Slice | Data | Persistence | Scope |
|-------|------|-------------|-------|
| Auth | User, session, permissions | localStorage (token) | Application |
| UI | Theme, sidebar, focus mode | localStorage | Application |
| Preferences | Language, notifications, density | localStorage + server | Application |
| Notifications | Toast queue, centre items | In-memory + server | Application |

### Module State (Domain-specific)

| Slice | Data | Persistence | Scope |
|-------|------|-------------|-------|
| Jobs | Search results, filters, saved jobs | In-memory + session | Module |
| CV | CV list, current analysis, versions | In-memory | Module |
| Documents | File list, current preview | In-memory + session | Module |
| Applications | Application list, current detail | In-memory + session | Module |
| AI | Conversation history, context, memory | In-memory + server | Module |

### UI State (Component-level)

| State | Data | Persistence | Scope |
|-------|------|-------------|-------|
| Form state | Current values, validation, dirty | In-memory | Component |
| Selection | Selected items, active item | In-memory | Component |
| Scroll | Scroll position per page | sessionStorage | Page |
| Pagination | Current page, page size | In-memory | Component |

---

## State Management Model

```typescript
// Pseudocode
// Global store
interface RootState {
  auth: AuthState;
  ui: UIState;
  preferences: PreferencesState;
  notifications: NotificationsState;
}

// Module store (scoped, isolated)
interface ModuleState<ModuleName> {
  data: EntityState<Entity>;
  ui: ModuleUIState;
  cache: CacheState;
}

// Entity state (normalised cache)
interface EntityState<Entity> {
  ids: string[];
  entities: Record<string, Entity>;
  loading: boolean;
  error: Error | null;
  lastFetched: number | null;
}
```

### State Access Patterns

| Pattern | Use Case | Example |
|---------|----------|---------|
| Selector | Read derived state | `selectFilteredJobs(state)` |
| Thunk | Async state update | `fetchJobById(id)` |
| Reducer | Sync state update | `setActiveFilter(filter)` |
| Event | Cross-module communication | `jobApplied(jobId)` |
| Query | Server state fetch/cache | `useJobQuery(id)` |

---

## State Isolation Rules

1. Modules must not directly read or write other module state slices.
2. Cross-module communication uses a shared event bus.
3. Global state is the only shared state between modules.
4. Each module owns its state slice entirely.
5. Module state is destroyed when the module is unmounted (unless persisted).
6. UI state is scoped to the component tree — not stored in global state.

---

## Caching Strategy

| Cache Type | Duration | Storage | Invalidation |
|-----------|----------|---------|-------------|
| Entity | Session | In-memory | Manual, stale-after-mutation |
| List | 5 minutes | In-memory | Stale-after-route-change |
| Search | None | None | Always fetch fresh |
| Static config | Session | sessionStorage | On app version change |
| User preferences | Permanent | localStorage | On user save |
| Auth token | Token lifetime | localStorage | On expiry |
| AI conversation | Session | In-memory | On conversation close |

### Cache Invalidation Rules

```
Mutation occurs
     ↓
Optimistic update applied to cache
     ↓
Server responds
     ↓
If success → confirm cache
If failure → rollback cache, show error
     ↓
Related caches invalidated (via event)
```

---

## Persistence Strategy

```typescript
// Pseudocode
interface PersistenceConfig {
  key: string;                // Storage key
  storage: 'local' | 'session' | 'memory' | 'server';
  version: number;            // For migration
  serialize: (state) => string;
  deserialize: (raw) => state;
  migrate: (oldState, oldVersion) => state;
}

const persistenceMap = [
  { slice: 'auth', storage: 'local', version: 1 },
  { slice: 'ui', storage: 'local', version: 2 },
  { slice: 'preferences', storage: 'server', version: 1 },
  { slice: 'jobs.filters', storage: 'session', version: 1 },
];
```

---

## Reactive Model

```
State change
     ↓
Selector recalculates
     ↓
If derived value changed → notify subscribers
     ↓
React components re-render (if subscribed)
     ↓
Async effects triggered (data fetching, persistence)
     ↓
Completion events dispatched
```

### Subscription Model

| Subscriber | Trigger | Cleanup |
|-----------|---------|---------|
| React component | State slice change | Component unmount |
| Side effect | Specific action | Effect cancelled |
| Persistence middleware | State change | App unload |
| Analytics middleware | Specific action | App unload |
| Cross-module listener | Event dispatch | Module unmount |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Data-Flow.md](Data-Flow.md) | Data fetching and mutation flow |
| [Component-Composition.md](Component-Composition.md) | Container state management |
| [Frontend-Architecture.md](Frontend-Architecture.md) | Overall architecture context |

---

## Validation Notes

1. Global state is minimal — only cross-cutting concerns.
2. Module state is fully isolated — no cross-module state leaks.
3. Cache invalidation follows mutation patterns automatically.
4. Persistence strategy handles migration between versions.
5. State access requires selectors — no direct store access from components.
