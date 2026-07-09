# PromptCard

> User prompt container representing a single message sent by the user in a conversation.

---

## Purpose

Displays the user's message within the conversation interface. Provides visual distinction from AI messages, shows delivery status, supports editing of the last user message, and renders attached files.

## Responsibilities

- Display the user's avatar or default user icon
- Show sender label ("You") and timestamp
- Render prompt text (plain text or lightweight markdown)
- Display optional file attachments with name, type icon, and size
- Provide an edit button for the most recent user message (inline editing)
- Show message delivery state: sent, sending (pending), failed
- Right-align within the conversation layout to distinguish from left-aligned AI messages

## Composition

```
┌────────────────────────────────┐
│                   User Message │
│ ┌──────────────────────────┬──┐│
│ │ 2:30 PM            You   │◎ ││
│ │                          │  ││
│ │ What's the optimal       │  ││
│ │ inventory level for      │  ││
│ │ seasonal products?       │  ││
│ │                          │  ││
│ │ 📎 Q2_Report.pdf (2.4MB) │  ││
│ │                          │  ││
│ │ [Edit]                   │  ││
│ └──────────────────────────┴──┘│
└────────────────────────────────┘
```

## Hierarchy

- **Parent:** `div.prompt-card`
- **Optional parent:** Conversation (message list)
- **Children:** UserAvatar, SenderLabel, Timestamp, PromptText, AttachmentsList, EditButton, StatusIndicator

## Props Contract (TypeScript)

```typescript
type MessageState = "sent" | "sending" | "failed";

interface PromptCardProps {
  /** Unique message identifier */
  id: string;
  /** Prompt text content */
  content: string;
  /** ISO 8601 timestamp */
  timestamp: string;
  /** Current message state */
  state?: MessageState;
  /** Optional file attachments */
  attachments?: Attachment[];
  /** Whether the edit button is shown (typically true for last user message) */
  allowEdit?: boolean;
  /** Whether currently in edit mode */
  isEditing?: boolean;
  /** Callback when edit is initiated */
  onEdit?: (messageId: string) => void;
  /** Callback when edit is saved */
  onSaveEdit?: (messageId: string, newContent: string) => void;
  /** Callback when edit is cancelled */
  onCancelEdit?: (messageId: string) => void;
  /** Callback when a failed message is retried */
  onRetry?: (messageId: string) => void;
  /** Custom class name */
  className?: string;
}

interface Attachment {
  id: string;
  name: string;
  type: "image" | "document" | "file" | "code";
  url: string;
  size?: number;          // bytes
  mimeType?: string;
}
```

## Variants

| Variant   | Description                                                       |
|-----------|-------------------------------------------------------------------|
| `default` | Full card with avatar, metadata, content, attachments             |
| `editing` | Text content becomes an editable textarea, save/cancel buttons    |
| `compact` | Minimal: no avatar, timestamp relative, no attachments preview    |

## States

| State     | Visual                                                           |
|-----------|------------------------------------------------------------------|
| `sent`    | Fully rendered, all interactive elements idle                    |
| `sending` | Reduced opacity (0.7), pulsing send indicator, edit disabled     |
| `failed`  | Red error border/background, "Failed to send" label, retry button visible |

## Accessibility

- Card orientation: `aria-role="article"`, `aria-label="Your message"`
- Avatar: `aria-hidden="true"` (decorative)
- Timestamp: `<time>` element with `datetime` attribute
- Edit button: `aria-label="Edit message"`, `aria-expanded` when editing
- Edit textarea: `aria-label="Edit your message"`, auto-focus on enter
- Attachments list: `aria-label="Attachments"`, each item has `aria-label` with file name and size
- Failed state: `role="alert"` on the error message
- Retry button: `aria-label="Resend message"`
- Ensure edit mode is cancellable via Escape key

## Responsive Rules

| Breakpoint | Behavior                                                         |
|------------|------------------------------------------------------------------|
| ≥ 640px    | Full layout with avatar, metadata row, edit inline               |
| < 640px    | Avatar hidden, metadata stacked, edit mode opens in bottom sheet |

## Animation Rules

| Element           | Trigger            | Duration | Easing     |
|-------------------|--------------------|----------|------------|
| Card slide in     | Mount              | 200ms    | ease-out   |
| Sending pulse     | Continuous         | 1.5s     | ease-in-out|
| Edit mode expand  | Edit clicked       | 200ms    | ease-out   |
| Failed appear     | State → failed     | 200ms    | ease-in    |

Sending animation:
```css
@keyframes sending-pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}
.prompt-card--sending {
  animation: sending-pulse 1.5s ease-in-out infinite;
}
```

## Future Expansion

- Multi-part prompts (separate text and instruction fields)
- Prompt templates (select from saved prompt templates)
- Prompt version history (undo/redo edits)
- Character count and token estimate
- Rich text input (formatting toolbar during edit)
- Drag-and-drop attachments directly onto the card

## Dependencies

- Avatar component or default user icon
- File size formatting utility
- Timestamp formatting utility
- Textarea with auto-resize for edit mode

## Related Components

- [AIMessage](./AIMessage.md) — the AI counterpart displayed on the opposite side
- [Conversation](./Conversation.md) — parent that manages message list and prompt submission

## Anti-patterns

- Do NOT allow editing of messages that have already been responded to by the AI — editing a past prompt alters conversation context
- Do NOT show the edit button on messages other than the most recent user message
- Do NOT auto-retry failed messages without user confirmation (show retry button)
- Do NOT send attachments without validation — check file type, size, and scan for malware
- Do NOT display the full file path of attachments — show only the file name

## Performance Notes

- Use `React.memo` on PromptCard to prevent re-renders when other messages in the list update
- Attachments should show a preview only for supported image types; for documents show icon + name + size
- Edit mode should use a controlled textarea with a maximum character limit (e.g., 4000)
- File size formatting should be computed once (memoize `formatFileSize`)
- Sending animation should use CSS `opacity` transitions only (GPU-composited)
