# Data Flow

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-0 ([Product-Constitution.md](../01-Constitution/Product-Constitution.md) — Data Sovereignty), DP-6 ([Interaction-Patterns.md](../06-UX-Architecture/Interaction-Patterns.md))

---

## Purpose

Defines the complete data flow architecture — API client, data fetching, optimistic updates, offline queue, error handling, and real-time subscriptions.

---

## Data Flow Architecture

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  VIEW     │───▶│  HOOK    │───▶│  QUERY   │───▶│  API     │
│  (Page)   │    │  useData │    │  Manager │    │  Client  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
     ▲               │               │               │
     │               ▼               ▼               ▼
     │          ┌──────────┐    ┌──────────┐    ┌──────────┐
     └──────────│  CACHE   │◄───│  STORE   │◄───│  SERVER  │
                │  Layer   │    │  Layer   │    │  API     │
                └──────────┘    └──────────┘    └──────────┘
```

---

## API Client Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    API CLIENT                             │
├─────────────────────────────────────────────────────────┤
│  Request Pipeline                                        │
│  ┌────────┐ ┌──────────┐ ┌────────┐ ┌────────┐          │
│  │ Auth   │→│ Retry    │→│ Cache  │→│ Request│          │
│  │ Interc │ │ Interc   │ │ Interc │ │ Sender │          │
│  └────────┘ └──────────┘ └────────┘ └────────┘          │
│                                        │                  │
│  Response Pipeline                      ▼                  │
│  ┌────────┐ ┌──────────┐ ┌────────┐ ┌────────┐          │
│  │ Parse  │←│ Error    │←│ Cache  │←│ Response│          │
│  │        │ │ Handler  │ │ Update │ │        │          │
│  └────────┘ └──────────┘ └────────┘ └────────┘          │
└─────────────────────────────────────────────────────────┘
```

### API Client Configuration

```typescript
// Pseudocode
interface ApiClientConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  cache: CacheConfig;
  auth: AuthConfig;
  headers: Record<string, string>;
}

interface CacheConfig {
  enabled: boolean;
  ttl: number;
  maxEntries: number;
  storage: 'memory' | 'session' | 'persist';
}
```

### Endpoint Definition

```typescript
// Pseudocode
interface EndpointDefinition {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  params?: Record<string, ParamDefinition>;
  body?: Record<string, BodyDefinition>;
  response: ResponseDefinition;
  cache?: CachePolicy;
  retry?: RetryPolicy;
}

// Example
const endpoints = {
  getJob: {
    method: 'GET',
    path: '/api/jobs/:id',
    cache: { ttl: 60000 },
    retry: { count: 3, backoff: 'exponential' },
  },
  searchJobs: {
    method: 'GET',
    path: '/api/jobs',
    cache: { ttl: 0 }, // Never cache search
  },
  submitApplication: {
    method: 'POST',
    path: '/api/applications',
    cache: { ttl: 0 },
    retry: { count: 1, condition: (error) => error.status >= 500 },
  },
};
```

---

## Data Fetching Patterns

### Pattern 1: Standard Fetch (GET)

```typescript
// Pseudocode
function useJobDetail(id: string) {
  return useQuery({
    queryKey: ['jobs', id],
    queryFn: () => api.get(`/jobs/${id}`),
    staleTime: 60000,          // 1 minute
    cacheTime: 300000,         // 5 minutes
    retry: 3,
  });
  // Returns { data, isLoading, isError, error, refetch }
}
```

### Pattern 2: Paginated List

```typescript
// Pseudocode
function useJobSearch(filters: Filters, page: number) {
  return useInfiniteQuery({
    queryKey: ['jobs', 'search', filters],
    queryFn: ({ pageParam }) => api.get('/jobs', { ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
}
```

### Pattern 3: Mutation

```typescript
// Pseudocode
function useSubmitApplication() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ApplicationData) => api.post('/applications', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => {
      // Show error toast
    },
  });
}
```

---

## Optimistic Updates

```
User action (e.g., save job)
     ↓
Immediately update UI (optimistic)
     ↓
Send API request
     ↓
┌──────────────┐      ┌───────────────┐
│ SUCCESS      │      │ FAILURE        │
│ Confirm UI   │      │ Rollback UI    │
│ Invalidate   │      │ Show error     │
│ related      │      │ Allow retry    │
│ caches       │      │                │
└──────────────┘      └───────────────┘
```

### Optimistic Rules

1. Only apply optimistically for user-initiated mutations.
2. Must have a rollback mechanism for every optimistic update.
3. Must show loading indicator alongside optimistic result.
4. Retry on failure is always available.
5. Concurrent mutations on the same entity are queued.

---

## Offline Queue

```typescript
// Pseudocode
interface OfflineQueue {
  queue: QueuedMutation[];
  process(): Promise<void>;     // Process queue when online
  add(mutation: QueuedMutation): void;
  remove(id: string): void;
  clear(): void;
}

interface QueuedMutation {
  id: string;
  endpoint: string;
  method: string;
  body: unknown;
  timestamp: number;
  retryCount: number;
  maxRetries: number;
}
```

### Offline Behaviour

| State | Read | Write | UI |
|-------|------|-------|----|
| Online | Fetch from server | Send immediately | Normal |
| Offline | Return cached data | Queue mutation | Offline banner |
| Reconnecting | Return cached data | Queue mutation | Reconnecting indicator |
| Online restored | Refresh stale data | Process queue | Offline cleared |

---

## Real-Time Subscriptions

```typescript
// Pseudocode
interface Subscription {
  channel: string;
  event: string;
  handler: (data: unknown) => void;
  priority: 'high' | 'normal' | 'low';
}

// Connection management
WebSocketManager:
  connect(): void
  disconnect(): void
  reconnect(): void
  subscribe(channel, event, handler): Subscription
  unsubscribe(subscription): void
  
// State: connected | disconnected | reconnecting | error
```

### Subscription Channels

| Channel | Events | Priority |
|---------|--------|----------|
| `applications` | statusChange, newMessage | High |
| `notifications` | new | High |
| `ai` | response, progress | Normal |
| `jobs` | newMatch | Low |
| `system` | maintenance, versionUpdate | Normal |

---

## Error Handling Pipeline

```
API error received
     ↓
Error interceptor categorises
     ↓
┌──────────┐  ┌──────────┐  ┌──────────┐
│ Auth     │  │ Server   │  │ Network  │
│ (401/403)│  │ (500+)   │  │ (offline)│
└──────────┘  └──────────┘  └──────────┘
     │             │             │
     ▼             ▼             ▼
Redirect   Retry + show    Queue +
 login     error banner    reconnect
```

---

## Related Documents

| Document | Connection |
|----------|------------|
| [State-Management.md](State-Management.md) | State layer that stores fetched data |
| [Component-Composition.md](Component-Composition.md) | Container component data fetching |
| [AI-Integration-Layer.md](AI-Integration-Layer.md) | AI-specific data flow |

---

## Validation Notes

1. All data fetching goes through the API client — no direct fetch calls.
2. Cache layer prevents redundant requests for the same data.
3. Offline queue ensures data integrity when network is unavailable.
4. Optimistic updates provide instant feedback with safe rollback.
5. Real-time subscriptions are managed through a central connection manager.
