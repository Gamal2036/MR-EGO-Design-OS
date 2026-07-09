# Project Structure

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-3 ([Folder-Structure.md](../04-Component-Library/Architecture/Folder-Structure.md)), DP-0 ([Product-Constitution.md](../01-Constitution/Product-Constitution.md))

---

## Purpose

Defines the complete folder and module structure for the frontend codebase. Every file has a defined location. Every directory has a defined purpose.

---

## Repository Structure

```
mr-ego-frontend/
├── package.json                    # Workspace root — monorepo
├── tsconfig.json                   # Base TypeScript configuration
├── .eslintrc.cjs                   # Shared lint rules
├── .prettierrc                     # Shared formatting rules
├── vitest.config.ts                # Test configuration
├── README.md                       # Developer onboarding
├── CHANGELOG.md                    # Version history
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                  # Continuous integration
│   │   ├── cd.yml                  # Continuous deployment
│   │   ├── lint.yml                # Lint and format check
│   │   └── accessibility.yml       # Accessibility regression
│   └── CODEOWNERS                  # Ownership per directory
│
├── packages/
│   ├── shell/                      # Application shell (monolith entry)
│   ├── core/                       # Shared core library
│   ├── components/                 # Component library package
│   ├── tokens/                     # Design token package
│   ├── icons/                      # Icon library package
│   ├── hooks/                      # Shared React hooks package
│   ├── utils/                      # Shared utilities package
│   │
│   ├── module-dashboard/           # Dashboard module
│   ├── module-jobs/                # Jobs module
│   ├── module-documents/           # Documents module
│   ├── module-cv/                  # CV manager module
│   ├── module-profile/             # Profile module
│   ├── module-settings/            # Settings module
│   ├── module-ai/                  # AI workspace module
│   ├── module-applications/        # Application tracker module
│   ├── module-notifications/       # Notification centre module
│   ├── module-analytics/           # Analytics module
│   │
│   └── plugin-marketplace/         # (Future) Marketplace plugin
│   └── plugin-recruiter/           # (Future) Recruiter portal
│   └── plugin-enterprise/          # (Future) Enterprise admin
│
├── apps/
│   ├── web/                        # Web application (SPA)
│   │   ├── public/                 # Static assets
│   │   ├── src/
│   │   │   ├── main.tsx            # Application entry
│   │   │   ├── App.tsx             # Root component
│   │   │   ├── router.tsx          # Route definitions
│   │   │   ├── modules.ts          # Module registration
│   │   │   └── index.html          # HTML shell
│   │   └── vite.config.ts          # Vite configuration
│   │
│   ├── mobile/                     # (Future) React Native app
│   └── desktop/                    # (Future) Electron/Tauri app
│
├── e2e/                            # End-to-end tests
│   ├── fixtures/                   # Test data fixtures
│   ├── specs/                      # E2E test specifications
│   └── support/                    # Test utilities
│
├── scripts/                        # Build and automation scripts
│   ├── generate-component.ts       # Component scaffolding
│   ├── generate-module.ts          # Module scaffolding
│   ├── validate-tokens.ts          # Token consistency check
│   └── a11y-audit.ts              # Accessibility audit
│
└── docs/
    ├── CONTRIBUTING.md             # Contribution guidelines
    └── ARCHITECTURE.md             # Architecture decision records
```

---

## Package Architecture

### `packages/shell/`

The application shell package. Owns the top-level composition, providers, and module loading.

```
packages/shell/src/
├── index.ts                        # Public API
├── app/
│   ├── App.tsx                     # Root component
│   ├── App.providers.tsx           # Provider composition
│   └── App.bootstrap.ts           # Bootstrap logic
├── providers/
│   ├── ThemeProvider/
│   ├── LocaleProvider/
│   ├── AuthProvider/
│   ├── StoreProvider/
│   └── FeatureFlagProvider/
├── layers/
│   ├── CommandPalette/
│   ├── ToastContainer/
│   ├── ModalLayer/
│   └── AIFloatingPanel/
├── workspace/
│   ├── WorkspaceShell.tsx          # DP-4 workspace composition
│   ├── Header/
│   ├── Sidebar/
│   ├── regions/
│   │   ├── PrimaryRegion/
│   │   ├── SecondaryRegion/
│   │   ├── ContextRegion/
│   │   ├── AIRegion/
│   │   ├── InspectorRegion/
│   │   ├── PreviewRegion/
│   │   ├── FloatingRegion/
│   │   └── ModalRegion/
│   └── layouts/
│       ├── DashboardLayout/
│       ├── WorkspaceLayout/
│       ├── DocumentsLayout/
│       ├── JobsLayout/
│       ├── AnalyticsLayout/
│       ├── SettingsLayout/
│       ├── ProfileLayout/
│       ├── WizardLayout/
│       └── AuthenticationLayout/
├── module-system/
│   ├── ModuleRegistry.ts
│   ├── ModuleLoader.ts
│   └── ModuleLifecycle.ts
├── services/
│   ├── AuthService/
│   ├── NavigationService/
│   ├── CommandRegistry/
│   └── FeatureFlagService/
└── types/
    ├── module.ts
    ├── route.ts
    ├── command.ts
    └── navigation.ts
```

### `packages/core/`

Shared infrastructure used by every module.

```
packages/core/src/
├── index.ts
├── state/
│   ├── createStore.ts
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── uiSlice.ts
│   │   ├── preferencesSlice.ts
│   │   └── notificationsSlice.ts
│   └── middleware/
│       ├── logger.ts
│       ├── persistence.ts
│       └── analytics.ts
├── api/
│   ├── createApiClient.ts
│   ├── interceptors/
│   ├── cache/
│   └── websocket/
├── router/
│   ├── createRouter.ts
│   ├── guards/
│   └── resolvers/
├── i18n/
│   ├── createI18n.ts
│   ├── locales/
│   └── formatters/
├── auth/
│   ├── AuthProvider.ts
│   ├── useAuth.ts
│   └── guards/
├── analytics/
│   ├── AnalyticsProvider.ts
│   ├── track.ts
│   └── reporters/
├── error/
│   ├── ErrorBoundary.tsx
│   ├── errorHandler.ts
│   └── errorTypes.ts
└── utils/
    ├── cn.ts                       # Class name utility
    ├── date.ts                     # Date formatting
    ├── number.ts                   # Number formatting
    ├── storage.ts                  # Local/session storage
    └── debounce.ts
```

### `packages/components/`

The DP-3 Component Library. Each component in its own folder.

```
packages/components/src/
├── index.ts                        # Barrel exports
├── types/
│   ├── index.ts
│   ├── components.ts
│   └── tokens.ts
├── tokens/                         # Design token values as JS
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── elevation.ts
│   ├── motion.ts
│   ├── radius.ts
│   ├── shadows.ts
│   ├── glass.ts
│   └── themes/
│       ├── light.ts
│       └── dark.ts
├── utilities/                      # Level 0
├── core/                           # Level 1-2
├── forms/                          # Level 3
├── navigation/                     # Level 4
├── dashboard/                      # Level 5
├── ai/                             # Level 5
├── documents/                      # Level 5
├── feedback/                       # Level 5
├── data/                           # Level 5
├── layout/                         # Level 6
├── charts/                         # Level 6
├── providers/                      # Context providers
├── hooks/                          # Shared hooks
├── styles/                         # Global styles, CSS custom properties
└── __tests__/                      # Test setup
```

### Module Package Structure

Every module follows this structure:

```
packages/module-<name>/src/
├── index.ts                        # Module registration
├── Module.tsx                      # Module definition (onInit, onMount, etc.)
├── routes.tsx                      # Route definitions
├── commands.ts                     # Command palette entries
├── navigation.ts                   # Navigation items
├── settings.ts                     # Settings contributions (optional)
├── types/
│   ├── index.ts
│   └── api.ts
├── pages/                          # Page-level components
│   ├── ListPage/
│   ├── DetailPage/
│   └── FormPage/
├── components/                     # Module-specific components
│   ├── ModuleCard/
│   └── ModuleTable/
├── hooks/                          # Module-specific hooks
│   ├── useModuleData.ts
│   └── useModuleFilter.ts
├── store/                          # Module-specific state
│   ├── slice.ts
│   ├── thunks.ts
│   └── selectors.ts
├── api/                            # Module-specific API calls
│   ├── api.ts
│   └── types.ts
├── i18n/                           # Module-specific translations
│   └── en.ts
├── styles/                         # Module-specific styles
└── __tests__/                      # Module tests
```

---

## Naming Conventions

| Artifact | Convention | Example |
|----------|------------|---------|
| Package name | `module-<name>` | `module-jobs` |
| Module ID | PascalCase | `JobsModule` |
| Page component | `<Name>Page` | `JobSearchPage` |
| Module component | `<Module><Name>` | `JobCard` |
| API service | `<Name>Service` | `JobService` |
| State slice | `<name>Slice` | `jobSlice` |
| Custom hook | `use<Name>` | `useJobSearch` |
| Type file | `<name>.types.ts` | `job.types.ts` |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Frontend-Architecture.md](Frontend-Architecture.md) | Architecture this structure implements |
| [Component-Hierarchy.md](Component-Hierarchy.md) | Component folder structure |
| [DP-3 Folder Structure](../04-Component-Library/Architecture/Folder-Structure.md) | Source of component structure rules |

---

## Validation Notes

1. Monorepo ensures shared tooling and consistent dependency versions.
2. Module packages have zero internal dependencies on each other.
3. The `core` package is the only shared dependency for all modules.
4. Each module can be independently versioned and deployed.
5. Future mobile and desktop apps reuse `core`, `components`, and module packages.
