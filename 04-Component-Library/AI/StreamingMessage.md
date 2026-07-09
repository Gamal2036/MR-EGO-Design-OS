# StreamingMessage

> Real-time AI output component with progressive word-by-word character reveal.

---

## Purpose

Provides a live streaming text experience for AI-generated responses. Mimics natural language generation by revealing content progressively, giving users immediate feedback that the AI is actively generating a response. Includes controls to interrupt generation and displays final state transitions.

## Responsibilities

- Render AI-generated text with progressive word-by-word reveal at ~30 characters/second
- Display a blinking cursor at the end of the current streaming text
- Provide an interrupt button to stop generation mid-stream
- Handle state transitions: generating → complete, generating → edited, generating → error
- Calculate and display typing speed indicator when requested
- Maintain scroll position within parent during streaming
- Preserve full generated text on completion for downstream use

## Composition

```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │ Generating response...          │ │
│ │ The recommended approach for    │ │
│ │ optimizing the supply chain is  │ │
│ │ to implement a just-in-time▎    │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 30 chars/s     [■ Stop]        │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Hierarchy

- **Parent:** `div.streaming-message`
- **Optional container:** Conversation (replaces AIMessage during generation)
- **Children:** StreamContent, TypingIndicator, InterruptButton, StatusFooter

## Props Contract (TypeScript)

```typescript
type StreamState = "generating" | "complete" | "edited" | "error";

interface StreamingMessageProps {
  /** Unique identifier */
  id: string;
  /** The full text being streamed (updated by parent) */
  content: string;
  /** Current stream state */
  state: StreamState;
  /** Characters per second reveal rate (default: 30) */
  speed?: number;
  /** Whether to show typing speed indicator */
  showSpeed?: boolean;
  /** Whether the blinking cursor is visible */
  showCursor?: boolean;
  /** Callback when interrupt/stop is triggered */
  onInterrupt?: (messageId: string) => void;
  /** Callback when streaming completes naturally */
  onComplete?: (messageId: string) => void;
  /** Callback when an error occurs */
  onError?: (messageId: string, error: Error) => void;
  /** Custom class name */
  className?: string;
}

interface StreamSegment {
  text: string;
  revealed: boolean;
  timestamp: number;
}
```

## Variants

| Variant     | Description                                                      |
|-------------|------------------------------------------------------------------|
| `default`   | Standard word-by-word reveal, full footer with interrupt button  |
| `quiet`     | No typing speed indicator, minimal footer, smaller cursor        |
| `headless`  | Text-only streaming, no controls or footer (for embedded use)    |

## States

| State        | Visual                                                                 |
|--------------|------------------------------------------------------------------------|
| `generating` | Text progressively appears, blinking cursor, interrupt button active, speed indicator visible |
| `complete`   | Full text rendered, cursor removed, interrupt hidden, transitions to AIMessage appearance |
| `edited`     | "(edited)" tag shown, final stable text displayed, no cursor           |
| `error`      | Partial text preserved, error banner appended, retry button, "Response incomplete" label |

## Accessibility

- Blinking cursor: must respect `prefers-reduced-motion` (replace with static "|" character)
- Interrupt button: `aria-label="Stop generating"`, `aria-live="polite"` on status text
- Screen readers: use `aria-live="polite"` region around the streaming content so updates are announced
- State changes: announce via `role="status"` when transitioning to complete/error
- Speed indicator: `aria-hidden="true"` since it is decorative informational text

## Responsive Rules

| Breakpoint | Behavior                                         |
|------------|--------------------------------------------------|
| ≥ 768px    | Full layout, speed and interrupt side-by-side    |
| < 768px    | Interrupt button full-width below text, speed hidden |

## Animation Rules

| Element         | Trigger            | Duration | Easing     |
|-----------------|--------------------|----------|------------|
| Word appearance | Tick (reveal)      | 30ms     | step-start |
| Cursor blink    | Continuous         | 530ms    | step-start |
| Footer fade in  | State → generating | 200ms    | ease-out   |
| Error banner    | On error           | 300ms    | ease-in-out |

The cursor blink animation:
```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.cursor {
  animation: blink 530ms step-start infinite;
}
```

## Future Expansion

- Configurable reveal unit (character vs. word vs. sentence)
- Streaming markdown rendering (progressively parse headings, lists, code blocks)
- Pause/resume generation controls
- Token-by-token metadata (confidence per token, alternative suggestions)
- Speed adjustment slider for accessibility

## Dependencies

- Timer/scheduling utility (e.g., `requestAnimationFrame` or `setInterval`-based reveal scheduler)
- Parent state management for accumulating streamed content

## Related Components

- [AIMessage](./AIMessage.md) — the stable, non-streaming version; StreamingMessage transitions to AIMessage on completion
- [Conversation](./Conversation.md) — manages stream lifecycle and content accumulation

## Anti-patterns

- Do NOT block user input during streaming — the user should be able to send a follow-up or interrupt at any time
- Do NOT accumulate content client-side without bounds — implement a max character limit (e.g., 100k chars)
- Do NOT animate a fixed placeholder string — always stream real content from the AI backend
- Do NOT re-reveal already revealed content on state change — track which segments have been shown

## Performance Notes

- Use a virtual text buffer and reveal scheduler; avoid re-rendering the entire output on each tick
- Batch DOM updates; reveal multiple words per frame if content arrives faster than 30 chars/s
- For long responses (>10k chars), consider virtualized rendering of already-revealed content
- Cancel the reveal timer on unmount to prevent memory leaks
- Use `requestAnimationFrame`-based scheduling for smooth 60fps cursor blink and reveal
