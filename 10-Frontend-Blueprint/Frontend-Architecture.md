# Frontend Architecture

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-0 ([Architecture-Overview.md](../01-Constitution/Architecture-Overview.md)), DP-4 ([Architecture.md](../05-Application-Shell/Architecture/Architecture.md))

---

## Purpose

Defines the overall frontend application architecture — framework principles, application shell, module system, build pipeline, and deployment model.

---

## Architecture Principles

| Principle | Description |
|-----------|-------------|
| **Framework agnostic core** | Core architecture does not depend on any specific framework. Framework adapters implement the architecture. |
| **Module isolation** | Every module is independently developed, tested, and deployed. Modules communicate through defined contracts. |
| **State locality** | State lives as close to where it is used as possible. Global state is for cross-cutting concerns only. |
| **Declarative side effects** | All side effects (data fetching, persistence, analytics) are declared and managed by the system. |
| **Progressive enhancement** | Every feature works without JavaScript where feasible. JavaScript enhances the experience. |
| **Accessibility by default** | Every component and page is accessible from inception. No retrofitting. |
| **Performance budget** | Every addition must fit within the performance budget. No exceptions. |

---

## Application Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION SHELL                         │
│  Initialization, providers, command palette, global UI      │
├─────────────────────────────────────────────────────────────┤
│                      MODULE SYSTEM                           │
│  Module registry, lifecycle, routing, lazy loading           │
├───────────────────┬───────────────────┬─────────────────────┤
│     CORE APPS     │   AI SYSTEMS      │   FUTURE MODULES     │
│  ┌─────────────┐  │  ┌─────────────┐  │  ┌───────────────┐  │
│  │ Dashboard   │  │  │ AI Chat     │  │  │ Marketplace   │  │
│  │ Jobs        │  │  │ CV Analysis  │  │  │ Recruiter     │  │
│  │ Documents   │  │  │ Suggestions  │  │  │ Enterprise    │  │
│  │ Profile     │  │  │ Reasoning   │  │  │ Learning      │  │
│  │ Settings    │  │  │ Memory      │  │  │ Projects      │  │
│  └─────────────┘  │  └─────────────┘  │  └───────────────┘  │
├───────────────────┴───────────────────┴─────────────────────┤
│                    SHARED LAYER                              │
│  Components, hooks, utilities, tokens                       │
├─────────────────────────────────────────────────────────────┤
│                    INFRASTRUCTURE                            │
│  State management, data fetching, routing, authentication   │
├─────────────────────────────────────────────────────────────┤
│                    PLATFORM ADAPTERS                         │
│  Web, mobile, desktop, tablet — device-specific adapters    │
└─────────────────────────────────────────────────────────────┘
```

---

## Application Shell

The shell is the outermost container. It initialises the application and provides global services.

### Shell Composition

```
ApplicationShell
├── ErrorBoundary                    (fatal error recovery)
├── Providers                        (theme, locale, auth, state)
│   ├── ThemeProvider
│   ├── LocaleProvider
│   ├── AuthProvider
│   └── StoreProvider
├── GlobalLayers                     (portal-rendered overlays)
│   ├── CommandPalette               (Ctrl+K)
│   ├── ToastContainer
│   ├── ModalLayer
│   └── AIFloatingPanel
└── ModuleLoader                     (resolves current module)
    └── WorkspaceShell               (DP-4 workspace)
        ├── Header
        ├── Sidebar
        ├── RegionSystem
        │   ├── PrimaryRegion
        │   ├── SecondaryRegion (optional)
        │   ├── ContextRegion   (optional)
        │   ├── AIRegion        (optional)
        │   ├── InspectorRegion (optional)
        │   └── PreviewRegion   (optional)
        └── Footer (optional)
```

### Shell Lifecycle

| Phase | Action | Responsibility |
|-------|--------|---------------|
| Boot | Load configuration, detect device, check auth | Shell |
| Init | Mount providers, restore session, initialise modules | Shell |
| Render | Resolve route, render workspace shell | Module Loader |
| Active | Handle navigation, module switching, global commands | Shell |
| Idle | Preload adjacent modules, background sync | Shell |
| Error | Catch fatal errors, show recovery screen | ErrorBoundary |
| Unload | Persist state, cleanup subscriptions, logout | Shell |

---

## Module System

### Module Definition

Every module is a self-contained unit with the following contract:

| Property | Description |
|----------|-------------|
| `id` | Unique module identifier |
| `name` | Display name for navigation |
| `routes` | Route definitions registered by this module |
| `commands` | Command palette entries registered by this module |
| `navigation` | Navigation items registered by this module |
| `settings` | Settings sections contributed by this module |
| `onInit` | Called when module is first loaded |
| `onMount` | Called when module becomes active |
| `onUnmount` | Called when module is deactivated |
| `onDisable` | Called when module is disabled |

### Module Lifecycle

```
ModuleRegistry.register(moduleDef)
        ↓
    onInit()   →  Lazy-load module bundle
        ↓
 User navigates to module route
        ↓
    onMount()  →  Register commands, navigation, settings
        ↓
 Module is active
        ↓
 User navigates away
        ↓
    onUnmount() →  Deregister commands, cleanup state
        ↓
 Module is disabled
        ↓
    onDisable() →  Release resources, persist state
```

### Module Isolation Rules

1. Modules must not import directly from other module internals.
2. Modules communicate through the shared store and defined event channels.
3. Each module has its own data domain — no shared entities without a shared service.
4. Modules are independently testable with mock dependencies.
5. A module can be enabled, disabled, or removed without affecting other modules.

---

## Build Pipeline Architecture

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Source   │───▶│  Build   │───▶│  Bundle  │───▶│  Deploy  │
│  Code     │    │  System  │    │  Output  │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
     TypeScript   Styles     Assets
     Compiler    Processor   Pipeline
```

### Build Constraints

| Constraint | Target |
|------------|--------|
| Initial bundle | < 150 KB gzipped |
| Module bundles | < 50 KB gzipped each |
| Total JS budget | < 400 KB gzipped |
| CSS budget | < 50 KB gzipped |
| Image loading | Lazy with blur placeholder |

---

## Deployment Model

| Environment | Purpose | Update Cadence |
|-------------|---------|----------------|
| Development | Local development, hot reload | Instant |
| Staging | Integration testing, QA | Per commit |
| Production | Live user-facing application | Per release |
| Canary | Percentage-based rollout | Per release phase |

### Deployment Strategy

1. Static assets deployed to CDN with immutable hashes.
2. Application shell loaded from CDN, cached by service worker.
3. Module bundles loaded on demand with prefetch hints.
4. API routes served from edge functions where possible.
5. Feature flags control module visibility without redeployment.

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Project-Structure.md](Project-Structure.md) | Concrete folder layout for this architecture |
| [Module System](../05-Application-Shell/Architecture/Architecture.md) | DP-4 shell architecture |
| [Workspace-Architecture.md](Workspace-Architecture.md) | Workspace composition within the shell |
| [Future-Expansion.md](Future-Expansion.md) | Plugin and enterprise expansion |

---

## Validation Notes

1. Architecture supports any framework through adapter pattern.
2. Module isolation ensures zero coupling between business domains.
3. Lazy loading ensures minimum initial payload.
4. All providers (theme, locale, auth) are swappable without shell changes.
5. Deployment model supports CDN, edge, and server-side rendering.

*The Frontend Architecture is the top-level engineering blueprint. Every other DP-10 document derives from and refines this architecture.*
