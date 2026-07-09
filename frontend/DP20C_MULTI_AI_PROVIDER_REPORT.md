# DP-20C — Multi AI Provider System

**Status:** GREEN
**Build:** SUCCESS
**Date:** 2026-07-08

---

## Architecture

```
┌────────────────────────────────────────────────────────────────────┐
│  ProvidersPage (app/dashboard/providers/page.tsx)                 │
│  ┌─── Provider List (left) ─────────────────────┐                 │
│  │   ProviderCard×N                              │                 │
│  │   ├── Logo + Name + StatusBadge               │                 │
│  │   ├── Description + Metadata (model, latency, │                 │
│  │   │   tokens, health)                         │                 │
│  │   ├── Action buttons (Test, Settings, Edit,   │                 │
│  │   │   Delete)                                 │                 │
│  │   ├── Warning banners (missing API key,       │                 │
│  │   │   error)                                  │                 │
│  │   └── Model chips + overflow                  │                 │
│  └───────────────────────────────────────────────┘                 │
│  ┌─── Side Panel (right, conditional) ──────────┐                 │
│  │   RouterPanel                                 │                 │
│  │   ├── Routing Mode (auto/manual/smart)        │                 │
│  │   ├── Default Provider                        │                 │
│  │   ├── Fallback Provider                       │                 │
│  │   └── Priority List (reorderable)              │                 │
│  │                                                │                 │
│  │   SettingsPanel                                │                 │
│  │   ├── API Configuration (key, URL, org)       │                 │
│  │   ├── Model Settings (default, temperature,   │                 │
│  │   │   topP, maxTokens, streaming)              │                 │
│  │   └── Advanced (timeout, retry)               │                 │
│  │                                                │                 │
│  │   ModelBrowser                                 │                 │
│  │   ├── Search + Filter (all/favorites/recent/  │                 │
│  │   │   recommended) + Sort (name/context/speed) │                 │
│  │   └── ModelRow×N (star, name, speed badge,    │                 │
│  │       context length, cost)                   │                 │
│  │                                                │                 │
│  │   TestingPanel                                 │                 │
│  │   ├── 5 test rows (connection, latency,        │                 │
│  │   │   streaming, models, health)               │                 │
│  │   ├── Run All Tests button                    │                 │
│  │   └── Metric cards (health, latency, tokens,  │                 │
│  │       models)                                  │                 │
│  └───────────────────────────────────────────────┘                 │
│  ┌─── Dialogs ───────────────────────────────────┐                 │
│  │   RemoveProviderDialog                         │                 │
│  │   ResetProviderDialog                          │                 │
│  │   AddProviderDialog                            │                 │
│  │   ConfirmationDialog (generic)                 │                 │
│  └───────────────────────────────────────────────┘                 │
│  ┌─── Zustand Store ─────────────────────────────┐                 │
│  │   useAIProviderStore (persisted)               │                 │
│  │   ├── providers[]                              │                 │
│  │   ├── router (default, fallback, priority,     │                 │
│  │   │   mode)                                    │                 │
│  │   ├── expandedProvider                         │                 │
│  │   └── selectedProviderForEdit                  │                 │
│  └───────────────────────────────────────────────┘                 │
└────────────────────────────────────────────────────────────────────┘
```

### Data Flow
- `useAIProviderStore` (Zustand + persist) is the single source of truth
- Page orchestrates panel toggling via `activePanel` state (settings/models/testing/router)
- `ProviderCard` renders all provider data with status-aware styling via CVA
- `ProviderSettingsPanel` uses local state, only writes to store on Save
- `ModelBrowser` filters/sorts in-memory, writes model selection to store
- `ProviderRouterPanel` reads/writes router config to store
- `ProviderTestingPanel` uses local test state, calls `onRunTest` which triggers simulated test flow
- Dialogs for remove/reset operate directly on store actions

---

## Component Tree

```
ProvidersPage
├── Header (title, connected count, router button, add button)
├── ProviderCard×8
│   ├── Logo (Unicode symbols)
│   ├── ProviderStatusBadge
│   ├── Metadata (model, latency, token usage, health)
│   ├── Action bar (Test, Settings, Edit, Delete)
│   ├── Warning banner (missing API key or error)
│   └── Model chips
├── Side Panel (conditional)
│   ├── ProviderRouterPanel
│   │   ├── Routing mode select
│   │   ├── Default provider select
│   │   ├── Fallback provider select
│   │   └── Priority list (reorderable items)
│   ├── ProviderSettingsPanel
│   │   ├── API key (password reveal)
│   │   ├── Base URL
│   │   ├── Organization ID
│   │   ├── Default model select
│   │   ├── Temperature / Top P / Max Tokens selects
│   │   ├── Streaming toggle
│   │   ├── Timeout / Retry count selects
│   │   └── Save / Cancel buttons
│   ├── ModelBrowser
│   │   ├── Search input
│   │   ├── Filter buttons (All/Favorites/Recent/Recommended)
│   │   ├── Sort dropdown
│   │   ├── ModelRow×N
│   │   └── Result count
│   └── ProviderTestingPanel
│       ├── Run All Tests button
│       ├── Test row×5 (Connection/Latency/Streaming/Models/Health)
│       └── Metric cards×4
├── AddProviderDialog (dynamic import)
├── RemoveProviderDialog
└── ResetProviderDialog
```

---

## Provider Structure

### Provider Types (`types/ai-providers.ts`)

| Type | Purpose |
|------|---------|
| `ProviderId` | Union of 8 provider identifiers |
| `ProviderStatus` | 8-state status enum |
| `ProviderSettings` | 10 settings fields (key, URL, temperature, etc.) |
| `ProviderModel` | Model with category, context, speed, cost, favorites |
| `HealthCheck` | Health tracking with latency and status |
| `ProviderConfig` | Full provider configuration |
| `ProviderRouterConfig` | Default, fallback, priority, mode |
| `ProviderState` | Full store state interface with 18 actions |

### 8 Supported Providers

| Provider | Default Models | Notes |
|----------|---------------|-------|
| OpenAI | GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-4, GPT-3.5 Turbo | 5 default models |
| OpenRouter | Auto (Best Match) | Unified API entry point |
| Anthropic | Claude Sonnet 4, Opus 4, Haiku 3.5, Sonnet 3.5 | 4 Claude models |
| Google Gemini | Gemini 2.0 Flash, 2.0 Pro, 1.5 Pro, 1.5 Flash | 4 Gemini models |
| Groq | Llama 3.3 70B, Mixtral 8x7B, Gemma 2 9B | 3 fast inference models |
| Ollama | Llama 3.2, Mistral, CodeLlama, Mixtral | 4 local models, no API key needed |
| Azure OpenAI | GPT-4o, GPT-4, GPT-3.5 Turbo | Microsoft Azure service |
| Custom Provider | Default Model | Bring your own |

### Store Actions

- `addProvider`, `removeProvider`, `updateProvider`, `resetProvider`
- `setProviderStatus`, `setExpandedProvider`, `setSelectedProviderForEdit`
- `updateProviderSettings`, `updateProviderHealth`
- `setCurrentModel`, `toggleModelFavorite`, `markModelUsed`
- `setDefaultProvider`, `setFallbackProvider`, `setPriorityList`, `setRoutingMode`

---

## Accessibility

| Criterion | Implementation |
|-----------|---------------|
| **ARIA roles** | `role="main"`, `role="region"`, `role="complementary"`, `role="list"`, `role="listitem"`, `role="listbox"`, `role="option"`, `role="status"`, `role="group"` |
| **ARIA labels** | All interactive elements have `aria-label` |
| **ARIA pressed** | Filter buttons use `aria-pressed` |
| **ARIA selected** | Model rows use `aria-selected` |
| **ARIA expanded** | Provider card uses `aria-label` for region |
| **ARIA hidden** | All decorative icons use `aria-hidden="true"` |
| **ARIA disabled** | Disabled buttons/items use `aria-disabled` |
| **Keyboard navigation** | Tab through all controls, Enter/Space on model rows, Escape on dialogs |
| **Focus visible** | `focus-visible:ring-2 focus-visible:ring-ring` on all interactive elements |
| **Screen reader** | `sr-only` for loading states, `role="status"` for live regions, `aria-label` on all controls |
| **Reduced motion** | Inherits from design system `prefers-reduced-motion` |
| **Password fields** | Show/hide API key toggle with proper `aria-label` |
| **WCAG AA** | All color contrast via design token system |

---

## Performance

| Concern | Implementation |
|---------|---------------|
| **Dynamic imports** | `AddProviderDialog` loaded via `next/dynamic` with `ssr: false` |
| **Memo ready** | `useMemo` for filtered/sorted models, connected counts; `useCallback` for all event handlers |
| **Store selectors** | Individual selectors per store field prevent unnecessary re-renders |
| **Code splitting** | Route-based splitting via Next.js App Router |
| **Bundle impact** | `/dashboard/providers` at 15.3 kB (162 kB First Load JS with shared 102 kB) |
| **Animation budget** | All transitions use `duration-normal` (200ms) with reduced-motion fallback |
| **Lazy state** | Only one side panel active at a time; panels are not mounted when closed |

---

## Future Backend Integration Points

| Component | Integration Point |
|-----------|-------------------|
| `ProviderSettingsPanel.handleSave` | Validate API key with provider endpoint, encrypt before storing |
| `ProviderTestingPanel.runSingleTest` | Actual HTTP/WebSocket calls to provider API endpoints |
| `ProviderTestingPanel.runAllTests` | Sequential health check, latency measurement, streaming validation |
| `ProviderRouterPanel` (smart mode) | Real-time provider health polling, cost-based routing, latency-based routing |
| `ModelBrowser` | Fetch available models from provider API, sync model metadata |
| `ProviderCard` latency | Periodic ping to provider base URL |
| `ProviderCard` token usage | Track via actual API response metadata |
| `removeProvider` | Clean up any persisted auth tokens/sessions |
| `updateProviderHealth` | Cron-based health check polling |

---

## Extension Points

| Feature | Status | Implementation |
|---------|--------|----------------|
| Provider search in header | Ready | Uses existing `searchQuery` if needed |
| Provider comparison view | Pending | Select multiple cards, show comparison panel |
| Provider groups/teams | Pending | Add `group` field to `ProviderConfig` |
| Usage analytics | Pending | Wire token usage to chart components |
| Provider templates | Pending | Pre-fill common provider configs |
| Multi-provider chat routing | DP-20D | Route conversation messages based on `ProviderRouterConfig` |
| Model pricing display | Pending | Real `cost` field instead of `costPlaceholder` |
| API key validation UX | Pending | Validate key format per provider pattern |

---

## Validation Results

| Check | Status |
|-------|--------|
| `pnpm typecheck` | ✅ PASS — 0 errors |
| `pnpm lint` | ✅ PASS — 0 warnings, 0 errors |
| `pnpm build` | ✅ PASS — 36 static pages, `/dashboard/providers` at 15.3 kB |

---

## Final Status

```
GOOD WORK

DP-20C COMPLETED

STATUS: GREEN

BUILD: SUCCESS

READY FOR DP-21 CV BUILDER
```
