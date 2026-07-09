# AIMessage

> AI-generated message component representing a single response from the MR:EGO assistant.

---

## Purpose

Displays an AI-generated message within any conversation or AI-output surface. Provides visual distinction from user messages via a left border indicator, avatar, metadata, content rendering, and interactive affordances for feedback and follow-up actions.

## Responsibilities

- Render the MR:EGO AI avatar (icon) and a "MR:EGO" sender label
- Display a timestamp (relative or absolute, configurable)
- Render message body as Markdown (support for headings, lists, code blocks, links, inline formatting)
- Show collapsible sources section (cited documents, data references)
- Provide thumbs up / thumbs down feedback buttons
- Render action CTAs (e.g., "Apply", "Copy", "Export", "Insert into document")
- Visually distinguish AI messages from user messages with a 3px left border in the primary color

## Composition

```
┌─────────────────────────────────┐
│ 3px primary border              │
│ ┌─────┬────────────────────────┐│
│ │Avatar│ MR:EGO · 2:30 PM      ││
│ │ icon │                        ││
│ └─────┴────────────────────────┘│
│ ┌──────────────────────────────┐│
│ │ Markdown Content             ││
│ │ • Item 1                     ││
│ │ • Item 2                     ││
│ │ `code block`                 ││
│ └──────────────────────────────┘│
│ ┌── Sources (3) ──────────────┐│
│ │ ▸ doc-1.pdf                 ││
│ │ ▸ data-set.xlsx             ││
│ └──────────────────────────────┘│
│ [👍] [👎]  [Apply] [Copy]      │
└─────────────────────────────────┘
```

## Hierarchy

- **Optional container:** Conversation, RecommendationPanel
- **Parent:** `div.ai-message`
- **Children:** Avatar, SenderLabel, Timestamp, MarkdownRenderer, SourcesCollapsible, FeedbackActions, ActionCTA

## Props Contract (TypeScript)

```typescript
interface AIMessageProps {
  /** Unique message identifier */
  id: string;
  /** Markdown string to render as message body */
  content: string;
  /** ISO 8601 timestamp string */
  timestamp: string;
  /** Whether to show relative or absolute time */
  timestampFormat?: "relative" | "absolute";
  /** Optional list of sources cited by the AI */
  sources?: Source[];
  /** Current feedback state */
  feedback?: "none" | "thumbs-up" | "thumbs-down";
  /** Callback when feedback is submitted */
  onFeedback?: (messageId: string, type: "up" | "down") => void;
  /** Optional action buttons to display in the footer */
  actions?: ActionCTA[];
  /** Callback when an action is triggered */
  onAction?: (messageId: string, actionId: string) => void;
  /** Visual variant */
  variant?: "default" | "compact" | "expanded";
  /** Whether sources section starts expanded */
  sourcesExpanded?: boolean;
  /** Additional class names */
  className?: string;
}

interface Source {
  id: string;
  title: string;
  type: "document" | "dataset" | "web" | "note";
  url?: string;
}

interface ActionCTA {
  id: string;
  label: string;
  icon?: string;
  primary?: boolean;
  disabled?: boolean;
}
```

## Variants

| Variant   | Description                                     |
|-----------|-------------------------------------------------|
| `default` | Full layout with avatar, metadata, body, footer |
| `compact` | Minimal layout — no avatar, collapsed sources   |
| `expanded`| Sources and metadata always visible, full width |

## States

| State     | Visual                                                        |
|-----------|---------------------------------------------------------------|
| Default   | Full message rendered, interactive elements idle              |
| Loading   | Skeleton placeholder while content streams (see StreamingMessage) |
| Feedback  | Thumb icon toggles to filled state; optional toast "Feedback recorded" |
| Error     | Message body replaced with error banner, retry CTA            |
| Edited    | Shows "(edited)" label next to timestamp                      |

## Accessibility

- Left border must have sufficient contrast against background (ratio ≥ 3:1)
- Feedback buttons: `aria-label="Thumbs up"` / `aria-label="Thumbs down"`
- Action CTAs: `role="button"`, `tabindex="0"`, keyboard activatable
- Sources collapsible: `aria-expanded` toggle, `aria-controls` on the panel
- Markdown rendered as semantic HTML (headings use `h1`-`h6`, lists use `ul`/`ol`)
- Timestamp: use `<time>` element with `datetime` attribute

## Responsive Rules

| Breakpoint | Behavior                                         |
|------------|--------------------------------------------------|
| ≥ 1024px   | Full layout, sources side-by-side                |
| 640–1023px | Stack layout, sources inline, CTAs in row        |
| < 640px    | Compact variant forced, CTAs collapsed into "..." menu, sources behind toggle |

## Animation Rules

| Element      | Trigger        | Duration | Easing     |
|--------------|----------------|----------|------------|
| Message fade | Mount          | 200ms    | ease-out   |
| Sources open | Expand toggle  | 250ms    | ease-in-out|
| Feedback     | Hover/click    | 150ms    | ease       |

## Future Expansion

- Streaming progressive reveal (delegated to StreamingMessage)
- Rich media embeds (charts, images, tables rendered inline)
- Multi-step message status (generating → complete → user-edited)
- Message threading (reply-to references)

## Dependencies

- Markdown renderer (e.g., `react-markdown` or similar)
- Date/time formatting utility (e.g., `date-fns`, `dayjs`)

## Related Components

- [StreamingMessage](./StreamingMessage.md) — animated variant for real-time output
- [Conversation](./Conversation.md) — parent container for message lists
- [PromptCard](./PromptCard.md) — user-side counterpart

## Anti-patterns

- Do NOT render raw HTML without sanitization — always render via a Markdown parser with XSS protection
- Do NOT hide the AI sender label — users must always know the origin of the message
- Do NOT rely solely on color or left border to distinguish AI messages; also use avatar and label for accessibility
- Do NOT auto-scroll to a new AI message if the user has scrolled up to read earlier content (respect scroll position)

## Performance Notes

- Markdown rendering should be memoized; avoid re-parsing on every render
- Source list items should be lazily loaded when expanded if they come from an API
- Feedback and action callbacks should be debounced where appropriate
- Use `React.memo` on the component to prevent re-renders of unchanged messages
