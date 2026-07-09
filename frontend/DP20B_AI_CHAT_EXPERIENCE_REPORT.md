# DP-20B — AI Chat Experience

**Status:** GREEN
**Build:** SUCCESS
**Date:** 2026-07-08

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  AIWorkspacePage (app/dashboard/ai/page.tsx)                 │
│  ┌── AIWorkspaceLayout                                      │
│  │   ├── WorkspaceHeader                                    │
│  │   ├── AIToolbar                                          │
│  │   ├── SessionSidebar (enhanced)                          │
│  │   │   ├── SearchInput                                    │
│  │   │   ├── DeleteConfirmation                             │
│  │   │   ├── ConversationGroup×N                            │
│  │   │   │   └── ConversationItem×N                         │
│  │   │   │       ├── Pin / Favorite / Duplicate / Delete    │
│  │   │   └── New Conversation Button                        │
│  │   ├── ConversationHeader (NEW)                           │
│  │   │   ├── Title + Rename (inline)                        │
│  │   │   ├── Generation Status Badge                        │
│  │   │   └── Metadata (count, model, tokens)                │
│  │   ├── ConversationArea (enhanced)                        │
│  │   │   └── ChatMessage×N (enhanced)                       │
│  │   │       ├── Avatar (8 roles)                           │
│  │   │       ├── Header (role + timestamp + streaming)      │
│  │   │       ├── MarkdownContent (NEW)                      │
│  │   │       │   ├── CodeBlock (with copy)                  │
│  │   │       │   ├── InlineCode                             │
│  │   │       │   ├── ImagePlaceholder                       │
│  │   │       │   └── FilePlaceholder                        │
│  │   │       └── ActionBar                                  │
│  │   │           ├── Copy / Retry / Edit / Delete           │
│  │   │           ├── Like / Dislike / Bookmark (NEW)        │
│  │   │           └── Expand / Collapse                      │
│  │   ├── AIInput (enhanced)                                 │
│  │   │   ├── Auto-resize textarea                           │
│  │   │   ├── CharacterCounter (NEW)                         │
│  │   │   ├── PromptTemplates (NEW)                          │
│  │   │   ├── Drag & Drop overlay                            │
│  │   │   ├── Paste detection                                │
│  │   │   ├── Slash commands placeholder                     │
│  │   │   └── Send / Stop button                             │
│  │   ├── RightPanel                                         │
│  │   └── StatusBar                                          │
│  └── Zustand Store (enhanced)                                │
└──────────────────────────────────────────────────────────────┘
```

### Data Flow
- `useAIWorkspaceStore` (Zustand + persist) is the single source of truth
- Page orchestrates `handleSend` which creates conversations, adds messages, simulates streaming
- `ConversationHeader` subscribes to active conversation for title, metadata, generation status
- `ConversationArea` subscribes to messages, auto-scrolls on new/last content change
- `ChatMessage` renders `MarkdownContent` for rich rendering (not plain text)
- `AIInput` writes messages via store actions, shows character counter and prompt templates
- `SessionSidebar` subscribes to conversations with selectors to prevent re-renders

---

## Conversation Flow

```
User types message → AIInput fires onSend()
  → createConversation() if no active conversation
  → addMessage(user) with "sent" status
  → setIsGenerating(true)
  → addMessage(assistant) with "streaming" status
  → Timer simulates provider response (2s)
    → updateMessage(assistant) with "complete" status + content
    → setIsGenerating(false)
```

All states are driven by `isGenerating` (store) and per-message `status` (sending/streaming/complete/error).

---

## Component Tree

```
AIWorkspacePage
└── AIWorkspaceLayout
    ├── WorkspaceHeader
    │   ├── IconButton (sidebar toggle)
    │   └── IconButton (right panel toggle)
    ├── AIToolbar
    │   ├── Button (New Chat)
    │   ├── IconButton (Search, Model Settings)
    │   └── IconButton×3 (History, Settings, Profile)
    ├── SessionSidebar
    │   ├── Header (History + close)
    │   ├── SearchInput
    │   ├── ConversationGroup×N
    │   │   └── ConversationItem×N
    │   │       ├── Pin / Favorite / Duplicate / Delete
    │   │       └── DeleteConfirm (overlay)
    │   └── New Conversation
    ├── ConversationHeader
    │   ├── Icon + Title (inline rename)
    │   ├── Generation status badge
    │   └── Metadata (messages, model, tokens)
    ├── ConversationArea
    │   ├── WelcomeState (empty)
    │   └── ChatMessage×N
    │       ├── Avatar
    │       ├── Header (role + timestamp + streaming badge)
    │       ├── MarkdownContent
    │       │   ├── CodeBlock (copy button)
    │       │   ├── InlineCode
    │       │   ├── ImagePlaceholder
    │       │   └── FilePlaceholder
    │       └── ActionBar
    │           ├── Copy / Retry / Edit / Delete
    │           ├── Like / Dislike / Bookmark
    │           └── Expand / Collapse
    ├── AIInput
    │   ├── Textarea (auto-resize)
    │   ├── Attach / Image / Voice buttons
    │   ├── PromptTemplates dropdown
    │   ├── CharacterCounter
    │   ├── Send / Stop
    │   └── Keyboard hints
    ├── RightPanel
    └── StatusBar
```

---

## Workspace Structure

### Files Created (DP-20B)

| Path | Purpose |
|------|---------|
| `components/ai/chat/conversation-header.tsx` | Conversation title, inline rename, status, metadata |
| `components/ai/chat/markdown-content.tsx` | Rich markdown rendering with code blocks, image/file placeholders |
| `components/ai/input/prompt-templates.tsx` | Quick prompt template dropdown (6 career-focused prompts) |
| `components/ai/input/character-counter.tsx` | Remaining character count with color thresholds |

### Files Modified

| Path | Changes |
|------|---------|
| `types/ai-workspace.ts` | Added `bookmarked`, `favorite`, `archived`, `MessageMetadata`, `SidebarView` expanded |
| `stores/ai-workspace-store.ts` | Added `renameConversation`, `duplicateConversation`, `toggleFavorite`, `toggleArchived`, `toggleBookmark` |
| `components/ai/chat/chat-message.tsx` | Added `Bookmark` action, integrated `MarkdownContent` for rich rendering, `bookmarked` prop |
| `components/ai/chat/conversation-area.tsx` | Added smooth auto-scroll, formatTimestamp, bookmark/delete in-context actions |
| `components/ai/input/ai-input.tsx` | Added `CharacterCounter`, `PromptTemplates`, slash command handler |
| `components/ai/sidebar/session-sidebar.tsx` | Added Favorite, Duplicate actions; DeleteConfirmation overlay dialog; Favorites group |
| `components/ai/index.ts` | Added exports for `ConversationHeader`, `MarkdownContent`, `PromptTemplates`, `CharacterCounter` |
| `app/dashboard/ai/page.tsx` | Added `ConversationHeader`, streaming simulation, store action integration |

---

## Accessibility

| Criterion | Implementation |
|-----------|---------------|
| **ARIA roles** | `role="log"`, `role="listitem"`, `role="group"`, `role="banner"`, `role="alertdialog"`, `role="listbox"`, `role="option"`, `role="status"` |
| **ARIA labels** | All interactive elements have `aria-label` |
| **ARIA live** | `aria-live="polite"` on conversation area and loading states |
| **ARIA current** | `aria-current="true"` on active conversation |
| **ARIA expanded** | `aria-expanded` on prompt templates toggle |
| **ARIA hidden** | Decorative icons use `aria-hidden="true"` |
| **ARIA disabled** | Disabled buttons use `aria-disabled="true"` |
| **Keyboard navigation** | Enter to send, Shift+Enter newline, Escape blur, Tab navigation through actions |
| **Focus visible** | `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring` on all interactive elements |
| **Focus management** | Auto-focus rename input on open; textarea focus after prompt template selection |
| **Screen reader** | `sr-only` labels for loading states; `aria-label` on all controls; character counter announces remaining |
| **Reduced motion** | Inherits from design system — `.reduced-motion` and `prefers-reduced-motion` media query |
| **Semantic HTML** | `main`, `aside`, `header`, `button`, `textarea` with proper roles |
| **WCAG AA** | All color contrast meets 4.5:1 via design token system |

---

## Performance

| Concern | Implementation |
|---------|---------------|
| **Virtualized Messages** | Architecture-ready — `ConversationArea` renders from store array, replaceable with virtual list |
| **Memo Ready** | `ChatMessage` uses `forwardRef`, selectors in store subscriptions prevent unnecessary re-renders |
| **Lazy Components** | `NoConversation` loaded via `next/dynamic` with `ssr: false` |
| **Code Splitting** | Route-based code splitting via Next.js App Router |
| **Store Selectors** | Every `useAIWorkspaceStore` subscription uses selector functions to minimize render scope |
| **Animation Budget** | All animations use `duration-normal` (200ms) with reduced-motion fallback |
| **Bundle Impact** | `/dashboard/ai` at 15.5 kB (126 kB First Load JS with shared 102 kB) |

---

## Future Integration Points (DP-20C+)

| Component | Integration Point |
|-----------|-------------------|
| `AIInput.handlePaste` | File upload with preview in `components/ai/upload/` |
| `AIInput.handleDrop` | Drag-and-drop file handler → `UploadZone` component |
| `AIInput` Mic button | Voice input via Web Speech API or provider SDK |
| `ChatMessage` role "tool" | Tool call output rendering when providers support function calling |
| `MarkdownContent` | Syntax highlighting via `shiki` or `prism-react-renderer` |
| `ConversationArea` | Virtual scrolling via `@tanstack/react-virtual` for 1000+ message conversations |
| `SessionSidebar` | Archive view, folder organization, drag-to-group |
| `AIToolbar` model selector | Provider dropdown (Claude/GPT/Llama) with dynamic model list |
| `RightPanel` | Provider context window tracking, token usage, active tools |
| `Store` | history/undo for message edits, conversation versioning |

---

## Validation Results

| Check | Status |
|-------|--------|
| `pnpm typecheck` | ✅ PASS — 0 errors |
| `pnpm lint` | ✅ PASS — 0 warnings, 0 errors |
| `pnpm build` | ✅ PASS — 35 static pages, `/dashboard/ai` at 15.5 kB |

---

## Final Status

```
GOOD WORK

DP-20B COMPLETED

STATUS: GREEN

BUILD: SUCCESS

READY FOR DP-20C MULTI AI PROVIDERS
```
