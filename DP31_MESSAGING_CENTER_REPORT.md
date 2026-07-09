# DP-31 — Messaging Center

## Status: GREEN ✅

## Architecture

### Route Structure
```
/messages                           → Messaging page (3-column layout)
/dashboard/messages                 → Redirects to /messages
```

### Layout
- **Desktop**: 3-column (Conversation List | Conversation | Details Panel)
- **Tablet**: 2-column (List + Conversation), details as overlay
- **Mobile**: Single-column messenger view with back navigation

### Data Flow
```
Page Component (app/(dashboard)/messages/page.tsx)
  ↓ loads demo data (400ms simulated delay)
MessagesStore (zustand + persist)
  ↓ provides state & actions
MessagesLayout (3-column orchestrator)
  ├── ConversationList (left: 320px)
  │   ├── ConversationSearch
  │   ├── ConversationFilters
  │   └── ConversationItem[]
  ├── Conversation Area (center: flex-1)
  │   ├── ConversationHeader
  │   ├── MessageList
  │   │   ├── MessageGroup[]
  │   │   │   ├── MessageItem[]
  │   │   │   └── TypingIndicator
  │   │   └── MessageComposer
  └── ConversationDetails (right: 288px)
      ├── Members
      ├── ConversationFiles
      ├── ConversationLinks
      ├── Related Items
      └── Metadata
```

## Components

18 components created under `components/messages/`:

| Component | Purpose |
|-----------|---------|
| `messages-layout.tsx` | 3-column layout orchestrator with responsive behavior |
| `conversation-list.tsx` | Scrollable list with search and filters |
| `conversation-item.tsx` | Individual conversation row with inline actions |
| `conversation-header.tsx` | Active conversation header with avatar, status, context menu |
| `message-list.tsx` | Scrollable message area with date grouping, auto-scroll |
| `message-item.tsx` | Rich message bubble with markdown, code blocks, status |
| `message-avatar.tsx` | Role-aware avatar with online indicator |
| `message-group.tsx` | Date-grouped message wrapper |
| `message-composer.tsx` | Auto-grow textarea with attachment/emoji/voice placeholders |
| `typing-indicator.tsx` | Animated typing dots |
| `conversation-search.tsx` | Search input with clear button |
| `conversation-filters.tsx` | Filter bar (All, Pinned, Unread, etc.) |
| `conversation-details.tsx` | Right panel showing members, files, links, metadata |
| `conversation-files.tsx` | Shared files display |
| `conversation-links.tsx` | Shared links display |
| `empty-state.tsx` | Empty state placeholder |
| `loading-state.tsx` | Loading spinner |
| `error-state.tsx` | Error state with retry |

## Store (`stores/messages-store.ts`)

Built with Zustand + persist middleware.

### State
- `conversations: Conversation[]`
- `activeConversationId: string | null`
- `viewState: "loading" | "ready" | "error" | "empty"`
- `searchQuery: string`
- `conversationFilter: ConversationFilter`
- `showRightPanel: boolean`
- `isTyping: boolean`

### Actions
- `togglePinned`, `toggleFavorite`, `toggleArchived`, `toggleMuted`
- `markAsRead`, `deleteConversation`
- `sendMessage`, `deleteMessage`
- `getFilteredConversations`, `getActiveConversation`, `getUnreadCount`

## Types (`types/messages.ts`)

### Message Types
`incoming`, `outgoing`, `system`, `ai`, `recruiter`, `career_coach`, `warning`, `success`, `information`

### Conversation Groups
`pinned`, `unread`, `ai_assistant`, `career_coach`, `applications`, `recruiters`, `support`, `archived`, `recent`

### Key Interfaces
- `Message`, `Conversation`, `MessageSender`
- `ConversationParticipant`, `MessageAttachment`
- `MessagingState`, `MessagingStore`

## Demo Data (`data/messages.ts`)

8 realistic conversations:
1. AI Assistant — career advice with job recommendations
2. Career Coach — session scheduling and progress
3. Application — TechCorp interview process
4. Recruiter — StartupXYZ outreach
5. Support — CV builder issue resolution
6. System Notifications — profile and analysis alerts
7. Application — StartupXYZ full-stack role
8. Archived — Monthly review (archived)

## Routing

- `/messages` — Main messaging page (AppShell wrapped via `(dashboard)/layout.tsx`)
- `/dashboard/messages` — Redirect to `/messages` (for sidebar compatibility)
- Sidebar navigation (`config/navigation.ts`) already points to `/messages`
- All existing routes preserved, no 404s

## Accessibility

- ARIA roles: `role="list"`, `role="listitem"`, `role="button"`, `role="group"`, `role="menu"`, `role="menuitem"`, `role="separator"`, `role="log"`, `role="complementary"`, `role="status"`, `role="alert"`, `role="banner"`
- `aria-label` on all interactive elements
- `aria-current="page"` on active conversation
- `aria-pressed` on filter buttons
- `aria-live="polite"` on message log
- `aria-multiline="true"` on composer textarea
- Keyboard navigation: Enter/Space to select conversations, Escape to close menus
- Reduced motion support via `.reduced-motion` classes in design tokens
- Screen reader labels on all icons and status indicators

## Responsive

| Breakpoint | Layout | Behavior |
|-----------|--------|----------|
| Desktop (lg+) | 3 columns | List (320px) + Conversation (flex) + Details (288px) |
| Tablet (md-lg) | 2 columns | List (320px) + Conversation (flex), details as absolute overlay |
| Mobile (<md) | 1 column | Single messenger; back button to return to list |

## Validation

### Commands
```bash
pnpm lint       → Passed (1 warning: <img> element, same pattern as Avatar component)
pnpm typecheck  → Passed (0 errors)
pnpm build      → Passed (production build successful)
```

### Build Output
- `/messages` — 16.3 kB page size
- `/dashboard/messages` — 138 B (redirect)
- All existing routes intact
- No broken imports, no duplicate code, no TODOs, no FIXMEs

## Design Compliance

- Uses only design tokens (CSS variables): `bg-background`, `bg-surface-*`, `text-primary/secondary/tertiary`, `border-border`
- Dark futuristic workspace aesthetic: graphite, black, gray, soft cyan
- Glass effects: `bg-background/80`, `backdrop-blur-sm`, `backdrop-blur-md`
- Foundation components reused: `Avatar`, `Badge`, `Button`, `IconButton`
- Follows existing patterns from AI Workspace and Notifications
- No random colors or hardcoded values

## Future Backend Integration

The right panel includes a "Backend Hooks" section documenting integration points. The store's `persist` middleware currently saves to localStorage. Future migration should:

1. Replace `demoConversations` with API calls
2. Add real-time WebSocket connection for live messages
3. Implement message persistence to database
4. Add file upload endpoints for attachments
5. Integrate push notifications for new messages

## Known Limitations

- Attachments: Placeholder UI only, no actual file handling
- Reactions: Placeholder in types, not rendered in UI yet
- Reply/Forward/Edit: Button UI exists, no wire-up
- Voice messages: Button disabled with `aria-disabled="true"`
- Emoji picker: Placeholder button only
- No real-time messaging (WebSocket)
- Demo data loads with simulated delay (400ms)
- No unread count sync across tabs (persisted but no broadcast)

## Next Phase Recommendation (DP-32 AI Assistant Hub)

The Messaging Center provides the communication foundation. DP-32 should focus on:

1. Enhancing the AI Assistant conversation with inline tool calls
2. Adding conversation branching for AI threads
3. Integrating AI provider selection into messaging context
4. Adding message templates for common AI interactions
5. Building shared context between AI Workspace and Messages
6. Adding cross-conversation search with AI-powered results
