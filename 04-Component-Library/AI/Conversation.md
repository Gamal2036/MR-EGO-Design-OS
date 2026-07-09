# Conversation

> Multi-turn AI dialogue container that orchestrates user prompts and AI responses in a unified chat interface.

---

## Purpose

Provides a complete conversation interface between the user and MR:EGO AI. Manages the message list (user prompts and AI responses), input composition, send mechanics, contextual memory indicators, and conversation-level controls.

## Responsibilities

- Render a scrollable message list containing PromptCards (user) and AIMessages / StreamingMessages (AI)
- Provide a text input area with send button and optional attachment support
- Coordinate the lifecycle: user sends prompt → ThinkingCard appears → StreamingMessage streams → transitions to AIMessage
- Display MemoryIndicator to show what the AI recalls about the user
- Handle conversation-level states (loading history, error, empty)
- Auto-scroll to the latest message with intelligent scroll-lock (pause if user scrolled up)
- Support keyboard shortcuts (Enter to send, Shift+Enter for newline)

## Composition

```
┌──────────────────────────────────────┐
│ Conversation Header                   │
│ MR:EGO Assistant             [✕]     │
│ [MemoryIndicator badge]              │
├──────────────────────────────────────┤
│ ┌─ Message List (scrollable) ──────┐ │
│ │ PromptCard: "What's the best     │ │
│ │   approach for inventory?"       │ │
│ │ AIMessage: "Based on your data, │ │
│ │   the recommended approach..."   │ │
│ │ PromptCard: "Show me the data"   │ │
│ │ ThinkingCard: ✨ Thinking...     │ │
│ │ StreamingMessage: "The data      │ │
│ │   indicates that..."▎           │ │
│ └──────────────────────────────────┘ │
├──────────────────────────────────────┤
│ ┌─ Input Area ─────────────────────┐ │
│ │ [Attach] [____________________] ↵│ │
│ │ Memory: MR:EGO remembers you're  │ │
│ │         a supply chain manager   │ │
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

## Hierarchy

- **Parent:** `div.conversation`
- **Children:** ConversationHeader, MessageList (PromptCard, AIMessage, StreamingMessage, ThinkingCard), InputArea, SendButton, MemoryIndicator

## Props Contract (TypeScript)

```typescript
interface ConversationProps {
  /** Unique conversation identifier */
  id: string;
  /** Array of conversation messages */
  messages: ConversationMessage[];
  /** Current state of the AI interaction */
  aiState: "idle" | "thinking" | "streaming" | "error";
  /** Whether the conversation history is loading */
  loading?: boolean;
  /** Placeholder text for the input field */
  inputPlaceholder?: string;
  /** Whether attachments are allowed */
  allowAttachments?: boolean;
  /** Whether memory indicator is shown */
  showMemory?: boolean;
  /** Callback when a message is sent */
  onSend: (text: string, attachments?: Attachment[]) => void;
  /** Callback when interrupt/stop is requested */
  onInterrupt?: () => void;
  /** Callback when conversation is closed */
  onClose?: () => void;
  /** Callback when a message action is triggered */
  onMessageAction?: (messageId: string, actionId: string) => void;
  /** Callback when feedback is given on an AI message */
  onFeedback?: (messageId: string, type: "up" | "down") => void;
  /** Custom class name */
  className?: string;
}

type ConversationMessage = AIMessage | StreamingMessage | PromptCard | ThinkingCard;

interface Attachment {
  id: string;
  name: string;
  type: "image" | "document" | "file";
  url: string;
  size?: number;
}

interface AIMessage {
  type: "ai";
  id: string;
  content: string;
  timestamp: string;
  sources?: Source[];
  feedback?: "none" | "thumbs-up" | "thumbs-down";
  actions?: ActionCTA[];
}

interface StreamingMessage {
  type: "streaming";
  id: string;
  content: string;
  state: "generating" | "complete" | "edited" | "error";
}

interface PromptCard {
  type: "prompt";
  id: string;
  content: string;
  timestamp: string;
  attachments?: Attachment[];
  state: "sent" | "sending" | "failed";
}

interface ThinkingCard {
  type: "thinking";
  id: string;
  reasoningSteps?: ReasoningStep[];
}
```

## Variants

| Variant      | Description                                                    |
|--------------|----------------------------------------------------------------|
| `default`    | Full conversation UI with header, message list, input           |
| `minimal`    | No header, compact input, for embedded/inline use              |
| `modal`      | Full-screen overlay conversation, dark overlay backdrop        |
| `sidebar`    | Narrow width, compact messages, icon-only actions              |

## States

| State         | Visual                                                          |
|---------------|-----------------------------------------------------------------|
| Empty         | Welcome message / placeholder: "Ask MR:EGO anything..."         |
| Active        | Message list with user prompts and AI responses                 |
| Thinking      | ThinkingCard visible, input disabled, interrupt available       |
| Streaming     | StreamingMessage active, progressive text reveal               |
| Error         | Error banner in message list, retry prompt for failed messages  |
| Loading       | Skeleton messages (both sides) while loading history            |

## Accessibility

- Message list: `role="log"`, `aria-live="polite"`, `aria-label="Conversation with MR:EGO"`
- Input: `<textarea>` with `aria-label="Message input"`, accessible via keyboard
- Send button: `aria-label="Send message"`
- Attach button: `aria-label="Attach file"`
- Messages: `role="article"` per message block
- Stream region: `aria-live="polite"` region wrapping StreamingMessage
- Keyboard: Enter to send, Shift+Enter for newline, Escape to close/clear input
- Focus management: auto-focus input on mount, return focus after message sent
- Scroll announcements: `aria-setsize` and `aria-posinset` for message positions

## Responsive Rules

| Breakpoint | Behavior                                                         |
|------------|------------------------------------------------------------------|
| ≥ 1024px   | Full-width message list, inline MemoryIndicator                  |
| 640–1023px | Reduced padding, header collapses to icon-only close             |
| < 640px    | Modal variant, input fixed at bottom, messages take full height  |

## Animation Rules

| Element               | Trigger            | Duration | Easing     |
|-----------------------|--------------------|----------|------------|
| Message slide in      | New message        | 200ms    | ease-out   |
| Auto-scroll           | New content        | 300ms    | ease       |
| Input focus ring      | Focus              | 150ms    | ease       |
| Thinking → Streaming  | Transition         | 300ms    | ease-in-out |

## Future Expansion

- Multi-model conversations (switch AI provider mid-conversation)
- Thread branching (fork a conversation at any message)
- Conversation search within the message list
- Message bookmarks and sharing (share a specific exchange)
- Save conversation as document
- Scheduled / delayed AI responses
- Voice input support

## Dependencies

- [PromptCard](./PromptCard.md) — user message component
- [AIMessage](./AIMessage.md) — AI response component
- [StreamingMessage](./StreamingMessage.md) — real-time streaming component
- [ThinkingCard](./ThinkingCard.md) — processing indicator
- [MemoryIndicator](./MemoryIndicator.md) — recall indicator
- Auto-scroll hook (scroll-into-view with intersection observer)
- Keyboard event handler (Enter/Shift+Enter detection)

## Related Components

- [MemoryIndicator](./MemoryIndicator.md) — integrated in the conversation footer
- [RecommendationPanel](./RecommendationPanel.md) — can appear inline within an AIMessage
- [ContextBadge](./ContextBadge.md) — can show in the header to indicate context scope

## Anti-patterns

- Do NOT allow sending empty messages — disable send button until text or attachment present
- Do NOT auto-scroll if user has manually scrolled up through history — respect scroll-lock
- Do NOT send attachments without size limits and type validation
- Do NOT clear the input field before the message has been confirmed as sent
- Do NOT show both ThinkingCard and StreamingMessage simultaneously
- Do NOT allow multiple concurrent streams — disable input until current stream completes or is interrupted

## Performance Notes

- Virtualize the message list if > 50 messages (use windowing like `react-virtuoso`)
- Memoize individual message components to prevent re-rendering the entire list on each update
- Streaming content should be updated via refs, not state, to avoid re-render of all messages on each tick
- Use IntersectionObserver for auto-scroll detection
- Lazy-load conversation history (paginate older messages)
- Input should be a controlled component with a character limit (e.g., 4000 chars)
- Debounce `onSend` to prevent duplicate submissions
