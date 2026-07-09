# DP-32 — AI Assistant Hub Report

## Architecture

The AI Assistant Hub follows the same three-panel layout as the existing AI Workspace:

- **Left Sidebar** (`AssistantSidebar`) — assistant list with search, filter, category, favorites, pinned
- **Center Workspace** (`AssistantWorkspace`) — main interaction area with header, capabilities, history, prompts, memory, input
- **Right Panel** (`AssistantDetails`) — assistant metadata, provider, model, capabilities, tools, stats, backend hooks

All components live under `components/ai-assistants/` with a barrel export.

## Components Created (16)

| Component | File | Purpose |
|---|---|---|
| `AssistantCard` | `assistant-card.tsx` | Clickable card showing avatar, status, name, provider, category |
| `AssistantGrid` | `assistant-grid.tsx` | Grid layout of assistant cards |
| `AssistantSidebar` | `assistant-sidebar.tsx` | Left panel with search, filters, category pills, assistant list |
| `AssistantHeader` | `assistant-header.tsx` | Center panel header showing active assistant info + actions |
| `AssistantWorkspace` | `assistant-workspace.tsx` | Main workspace with capabilities, history, prompts, memory, input |
| `AssistantDetails` | `assistant-details.tsx` | Right panel with provider, model, capabilities, tools, stats |
| `AssistantCapabilities` | `assistant-capabilities.tsx` | Capabilities card with icon mapping |
| `AssistantTools` | `assistant-tools.tsx` | Tools list with enable/disable indicators |
| `AssistantMemory` | `assistant-memory.tsx` | AI memory context items |
| `AssistantHistory` | `assistant-history.tsx` | Recent conversation history |
| `AssistantStats` | `assistant-stats.tsx` | Statistics grid (queries, tokens, satisfaction, etc.) |
| `AssistantActions` | `assistant-actions.tsx` | Quick action buttons per assistant type |
| `AssistantProvider` | `assistant-provider.tsx` | Provider/model/status display |
| `AssistantEmpty` | `assistant-empty.tsx` | Empty state |
| `AssistantLoading` | `assistant-loading.tsx` | Loading state |
| `AssistantError` | `assistant-error.tsx` | Error state with retry |

## Store

**File:** `stores/assistant-store.ts`
**Pattern:** Zustand + persist middleware (matches all other stores)

**State:**
- `assistants[]` — 11 mock assistants (Career Coach, CV Expert, Job Hunter, Interview Coach, Learning Mentor, Skill Advisor, Salary Advisor, Recruiter Assistant, Document Assistant, Writing Assistant, General AI)
- `activeAssistantId` — currently selected assistant
- `searchQuery`, `categoryFilter`, `showFavoritesOnly`, `showPinnedOnly` — filter state
- `sidebarOpen`, `rightPanelOpen` — panel visibility
- `isLoading`, `error` — status flags

**Computed selectors:**
- `filteredAssistants()` — applies search, category, favorites, pinned filters
- `activeAssistant()` — returns the full active assistant object

**Actions:** `setActiveAssistant`, `toggleFavorite`, `togglePinned`, `toggleSidebar`, `toggleRightPanel`, `addPrompt`, `addHistoryItem`, filter setters

**Persisted:** activeAssistantId, sidebarOpen, rightPanelOpen

## Types

**File:** `types/assistant.ts`
**Exports:** `Assistant`, `AssistantCapability`, `AssistantTool`, `AssistantMemory`, `AssistantPrompt`, `AssistantHistoryItem`, `AssistantWorkflow`, `AssistantStats`, `AssistantStoreState`, plus alias types for `AssistantId`, `AssistantStatus`, `AssistantCategory`, `AssistantProvider`

## Routing

- **Route:** `/dashboard/ai-assistants`
- **Page:** `app/(dashboard)/dashboard/ai-assistants/page.tsx`
- **Navigation:** Added as child "Assistants" under "AI Workspace" in `config/navigation.ts`
- **Layout:** Uses `(dashboard)` route group → `AppShell` wrapper (consistent with all dashboard pages)

## Accessibility

- All interactive elements are keyboard accessible (Enter/Space handlers on cards)
- ARIA labels on sidebar, workspace, details panel (`role="main"`, `aria-label`, `aria-current`)
- Status indicators have `aria-label` for screen readers
- Buttons and controls have descriptive `aria-label`
- Focus management via `tabIndex={0}` on interactive cards
- `role="list"` / `role="listitem"` on AssistantGrid
- SkipLink integrated via AppShell

## Responsive Design

- **Desktop (lg+):** Three-panel layout — sidebar (w-72) | workspace (flex-1) | details (w-80)
- **Tablet (md):** Two-panel — collapsible sidebar + full-width workspace; category pills scroll horizontally
- **Mobile (<lg):** Sidebar is a fixed overlay triggered by a floating action button (bottom-left); sidebar includes close button; header shows hamburger menu; details panel hidden (header toggle)
- Sidebar collapse/expand via `sidebarOpen` state (ChevronLeft button)
- Right panel collapse/expand via `rightPanelOpen` state
- Card layout uses responsive grid: 1 col → 2 cols (sm) → 3 cols (xl)

## Future Backend Integration

All assistants include ready-to-connect backend hooks:
- `assistant.backendHook` — e.g. `/api/assistants/career-coach`
- `assistant.provider` / `assistant.model` — provider metadata
- `assistant.tokenUsage` — token consumption tracking placeholders
- `assistant.latency` / `assistant.cost` — performance placeholders
- `backendHook` property on each assistant
- All actions (`addHistoryItem`, `addPrompt`) are wired and ready for real API calls

## Known Limitations

- All data is mock — no real backend connection
- Quick actions simulate responses (no real AI generation)
- Token usage/latency/cost are static placeholder values
- No authentication-specific assistant permissions
- No real-time presence (status is static in mock data)
- Workflow execution is not implemented (UI only)

## Next Phase Recommendations (DP-33)

1. **Tasks & Calendar** — Add a scheduling/calendar system for assistant sessions and follow-up tasks
2. **Connect to AI Provider Store** — Use actual providers from `ai-provider-store` instead of hardcoded values
3. **Conversation History** — Link with `ai-workspace-store` for persistent chat history per assistant
4. **Real-time Status** — WebSocket-based online/offline/busy status for assistants
5. **Backend API Routes** — Implement `/api/assistants/*` endpoints
6. **Assistant Configuration** — Allow users to customize assistant name, provider, model per assistant
