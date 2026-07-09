# Component Composition

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-3 ([Composition-Rules.md](../04-Component-Library/Architecture/Composition-Rules.md)), DP-3 ([Inheritance-Rules.md](../04-Component-Library/Architecture/Inheritance-Rules.md))

---

## Purpose

Defines the composition patterns, container/presenter split, dependency injection model, and composition validation rules for the frontend.

---

## Composition Model

```
Page
└── Container Layer (state, data fetching, layout logic)
    └── Presenter Layer (pure rendering, no logic)
        └── Primitive Components (Button, Input, Card)
```

### Container/Presenter Split

| Layer | Responsibility | Rules |
|-------|---------------|-------|
| Container | Data fetching, state management, event handlers, layout logic | No direct DOM manipulation, no styling decisions |
| Presenter | Render UI from props, handle visual states, emit events | No data fetching, no state mutation, no side effects |

```
// Pseudocode
// Container
function JobSearchContainer() {
  const { jobs, isLoading, error } = useJobSearch(filters);
  const [filters, setFilters] = useState<Filters>({});
  
  return (
    <JobSearchPresenter
      jobs={jobs}
      filters={filters}
      isLoading={isLoading}
      error={error}
      onFilterChange={setFilters}
      onApply={handleApply}
    />
  );
}

// Presenter
function JobSearchPresenter({ jobs, filters, ...events }) {
  return (
    <Page>
      <SearchInput onSearch={events.onFilterChange} />
      <FilterPanel filters={filters} />
      <JobList jobs={jobs} onApply={events.onApply} />
    </Page>
  );
}
```

### Composition Depth Rules

| Composition | Recommended Max Depth | Warning At |
|-------------|----------------------|------------|
| Page → section → component | 5 levels | 6 levels |
| Component → subcomponent → primitive | 4 levels | 5 levels |
| Provider nesting | 3 levels | 4 levels |
| Conditional rendering | 2 levels of ternary | 3+ levels |

---

## Composition Patterns

### Pattern 1: Slot-Based Composition

Used for structural components (Card, Panel, Section).

```typescript
// Pseudocode
function Card({ children }) {
  return <Surface>{children}</Surface>
}

Card.Header = ({ children }) => <div class="card-header">{children}</div>
Card.Body = ({ children }) => <div class="card-body">{children}</div>
Card.Footer = ({ children }) => <div class="card-footer">{children}</div>

// Usage
<Card>
  <Card.Header>
    <Card.Title>Profile</Card.Title>
  </Card.Header>
  <Card.Body>
    <UserContent />
  </Card.Body>
  <Card.Footer>
    <Button>Save</Button>
  </Card.Footer>
</Card>
```

### Pattern 2: Compound Component

Used for related component groups (Tabs, Accordion, Select).

```typescript
// Pseudocode
function Tabs({ defaultTab, children }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  // Provides context to children
}

Tabs.Tab = ({ id, label, children }) => { /* uses context */ }
Tabs.Panel = ({ id, children }) => { /* shows when active */ }

// Usage
<Tabs defaultTab="overview">
  <Tabs.Tab id="overview">Overview</Tabs.Tab>
  <Tabs.Tab id="details">Details</Tabs.Tab>
  <Tabs.Panel id="overview">Content</Tabs.Panel>
  <Tabs.Panel id="details">Details content</Tabs.Panel>
</Tabs>
```

### Pattern 3: Render Props / Data Callback

Used for data-driven components (DataGrid, List, Charts).

```typescript
// Pseudocode
function DataGrid({ data, columns, renderRow }) {
  return (
    <table>
      {data.map(item => renderRow(item))}
    </table>
  );
}

// Usage
<DataGrid data={jobs} columns={columns} renderRow={(job) => (
  <JobRow job={job} onSelect={handleSelect} />
)} />
```

### Pattern 4: Provider Pattern

Used for cross-cutting concerns (Theme, Locale, Auth).

```typescript
// Pseudocode
<Providers>
  <ThemeProvider>
    <LocaleProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </LocaleProvider>
  </ThemeProvider>
</Providers>
```

---

## Dependency Injection

### Service Injection

Services are injected into components through context, not direct imports.

```typescript
// Pseudocode
const AuthContext = createContext<AuthService>();
const JobContext = createContext<JobService>();

// Provider
<AuthContext.Provider value={new AuthService()}>
  <App />
</AuthContext.Provider>

// Consumer
function useAuth(): AuthService {
  return useContext(AuthContext);
}

function useJobService(): JobService {
  return useContext(JobContext);
}
```

### Service Registry

```typescript
// Pseudocode
interface ServiceRegistry {
  auth: AuthService;
  api: ApiClient;
  analytics: AnalyticsService;
  navigation: NavigationService;
  notification: NotificationService;
  storage: StorageService;
  ai: AIService;
}

// Module services are scoped to their module
interface ModuleServiceRegistry {
  jobs?: JobService;
  cv?: CVService;
  applications?: ApplicationService;
  documents?: DocumentService;
}
```

---

## Composition Validation

```typescript
// Pseudocode
// Validator runs in development mode and CI
function validateComposition(component: ComponentType): ValidationResult {
  return {
    maxDepth: checkDepth(component),
    circularDeps: checkCircularDeps(component),
    forbiddenPatterns: checkForbiddenPatterns(component),
    slotCorrectness: checkSlots(component),
    providerDepth: checkProviderDepth(component),
    levelViolations: checkLevelViolations(component),
    // Returns pass/fail for each check
  };
}
```

### Forbidden Composition Patterns

1. Nested scrollable containers
2. Button-inside-button
3. Modal-inside-modal (max 3 stacked)
4. Form-inside-toast
5. Portal-inside-portal
6. Nested context menus
7. Circular composition
8. Provider depth > 3
9. Prop drilling beyond 2 levels

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Component-Hierarchy.md](Component-Hierarchy.md) | Component levels for composition |
| [State-Management.md](State-Management.md) | Container state management |
| [Data-Flow.md](Data-Flow.md) | Data fetching in containers |

---

## Validation Notes

1. Every page follows container/presenter split — enforced by lint rule.
2. Slot-based composition is preferred over configuration objects.
3. Services are injected through context, not direct instantiation.
4. Composition validator runs in CI to catch violations automatically.
5. All patterns follow DP-3 Composition Rules without modification.
