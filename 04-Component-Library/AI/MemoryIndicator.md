# MemoryIndicator

> AI recall indicator showing what MR:EGO remembers about the user for personalized responses.

---

## Purpose

Communicates to the user that MR:EGO has contextual memory about them, including their role, preferences, and relevant history. Provides transparency into what data the AI is using to personalize the conversation and gives users control over their stored memory.

## Responsibilities

- Display an icon + label indicating MR:EGO remembers user context (e.g., "MR:EGO remembers you're a supply chain manager")
- Show a "Manage memory" link/button that opens memory settings
- Provide a hover tooltip listing specific memory items the AI is aware of
- Display a privacy note about how memory data is used
- Support compact and expanded layouts for different contexts

## Composition

```
┌──────────────────────────────────────┐
│ Default (inline):                     │
│ 🧠 MR:EGO remembers you're a         │
│    supply chain manager              │
│               [Manage memory ▸]      │
│                                       │
│ Tooltip (hover):                      │
│ ┌──────────────────────────────────┐ │
│ │ 🧠 MR:EGO remembers:            │ │
│ │ • Role: Supply Chain Manager     │ │
│ │ • Company: Acme Corp             │ │
│ │ • Preference: JIT methodology    │ │
│ │ • Recent: Inventory report Q2    │ │
│ │ ─────────────────────────────────│ │
│ │ 🔒 Only visible to you          │ │
│ └──────────────────────────────────┘ │
│                                       │
│ Compact:                              │
│ 🧠 [Manage memory ▸]                 │
└──────────────────────────────────────┘
```

## Hierarchy

- **Parent:** `div.memory-indicator`
- **Optional parent:** Conversation (footer), header bar
- **Children:** MemoryIcon, MemoryLabel, MemoryItems (tooltip), ManageMemoryLink, PrivacyNote

## Props Contract (TypeScript)

```typescript
interface MemoryIndicatorProps {
  /** Whether memory is active */
  active: boolean;
  /** User's remembered role / context summary */
  summary?: string;
  /** Array of specific memory items */
  memoryItems?: MemoryItem[];
  /** Visual variant */
  variant?: "default" | "compact" | "inline";
  /** Callback when "Manage memory" is clicked */
  onManageMemory?: () => void;
  /** Custom label override */
  label?: string;
  /** Additional class names */
  className?: string;
}

interface MemoryItem {
  id: string;
  category: string;
  value: string;
  source?: string;        // where this memory was derived from
  lastUpdated?: string;   // ISO 8601
}
```

## Variants

| Variant    | Description                                                      |
|------------|------------------------------------------------------------------|
| `default`  | Full label with summary, manage link, tooltip on hover           |
| `compact`  | Icon-only with tooltip, "Manage" link visible on hover/focus     |
| `inline`   | Short text inline with surrounding content, no tooltip by default |

## States

| State      | Visual                                                           |
|------------|------------------------------------------------------------------|
| Active     | Icon + summary visible, tooltip available, manage link shown     |
| Inactive   | Grayed icon "Memory not active", no summary, manage link hidden  |
| Empty      | No memory items stored — "No stored memories" in tooltip         |
| Loading    | Skeleton text while memory is being fetched                      |
| Updating   | Subtle pulse icon while memory is being saved                    |
| Error      | "Could not load memory" with retry option                        |

## Accessibility

- Memory toggle/button: `aria-label="Manage MR:EGO memory"`
- Tooltip: `role="tooltip"`, triggered by both hover and focus
- Memory items: `<ul>` with `<li>` per item for screen reader navigation
- Privacy note: `role="note"`
- Inactive state: `aria-disabled="true"` on interactive elements
- Focus order: icon → summary → manage link — logical tab flow
- Tooltip must be dismissible (Escape key closes it)

## Responsive Rules

| Breakpoint | Behavior                                                        |
|------------|-----------------------------------------------------------------|
| ≥ 768px    | Default variant, full tooltip, inline manage link               |
| < 768px    | Compact variant, tooltip click-to-open, manage link in tooltip  |

## Animation Rules

| Element           | Trigger              | Duration | Easing     |
|-------------------|----------------------|----------|------------|
| Tooltip fade      | Hover/focus          | 150ms    | ease-out   |
| Icon pulse        | Memory update        | 400ms    | ease-in-out |
| Summary change    | Memory content change| 300ms    | ease-out   |

## Future Expansion

- Memory editing inline (edit a memory item directly from the tooltip)
- "Turn off memory for this conversation" toggle
- Memory usage count (how many memories were referenced in the last response)
- Memory staleness indicator (memories older than X months highlighted)
- Per-category memory management (clear specific categories)
- Cross-session memory sync indicator

## Dependencies

- Tooltip primitive or component
- Icon set for memory/ brain icon

## Related Components

- [Conversation](./Conversation.md) — parent that hosts MemoryIndicator
- [ContextBadge](./ContextBadge.md) — shows broader context scope (what data sources the AI is using beyond memory)

## Anti-patterns

- Do NOT expose raw user data without privacy context — always include the privacy note
- Do NOT make memory items editable directly from the tooltip (use "Manage memory" redirect)
- Do NOT show memory indicator for anonymous or logged-out users — it should be inactive/empty
- Do NOT overload the label with too many details — summary is "you're a [role]", details are in the tooltip
- Do NOT fetch memory items on every render — cache them with reasonable TTL

## Performance Notes

- Memory items should be fetched once per conversation session, not per message
- Tooltip content is static after initial load — no need to re-fetch on hover
- Memory indicator should be lightweight (icon + short text string)
- Use `React.memo` to avoid re-rendering when conversation messages update but memory hasn't changed
- Manage memory link should use `navigate()` or callback — avoid full page reload
