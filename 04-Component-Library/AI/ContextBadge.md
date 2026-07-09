# ContextBadge

> AI context scope indicator showing what data the AI is considering for the current response.

---

## Purpose

Provides transparency into the data sources and context the AI is referencing to generate its response. Helps users understand whether the AI is drawing from their profile, market data, uploaded documents, or a combination of sources.

## Responsibilities

- Display the scope of data the AI is currently considering
- Render as a compact badge with icon + label
- Support multiple variants: single source, multiple sources, full context
- Show a tooltip on hover with detailed breakdown of each source
- Indicate when the AI has access to all available context ("Full context")
- Adapt color and icon based on context breadth

## Composition

```
┌───────────────────────────────────┐
│ Single source:                     │
│ 📄 Using: Q2 Market Report        │
│ ┌───────────────────────────────┐ │
│ │ Source: Q2 Market Report.pdf  │ │
│ │ Pages: 12-45                  │ │
│ └───────────────────────────────┘ │
│                                    │
│ Multiple sources:                  │
│ 📚 Using: 3 sources                │
│ ┌───────────────────────────────┐ │
│ │ • Q2 Market Report.pdf       │ │
│ │ • User Profile                │ │
│ │ • Inventory Database          │ │
│ └───────────────────────────────┘ │
│                                    │
│ Full context:                      │
│ 🌐 Full context                    │
│ ┌───────────────────────────────┐ │
│ │ AI is using all available     │ │
│ │ data: profile, documents,     │ │
│ │ market data, company data     │ │
│ └───────────────────────────────┘ │
└───────────────────────────────────┘
```

## Hierarchy

- **Parent:** `span.context-badge` or `div.context-badge`
- **Optional parent:** Conversation header, AIMessage header, ReasoningPanel
- **Children:** ContextIcon, ContextLabel, SourceTooltip (on hover)

## Props Contract (TypeScript)

```typescript
type ContextScope = "single" | "multiple" | "full";

interface ContextBadgeProps {
  /** The context scope */
  scope: ContextScope;
  /** For single source: the source info */
  source?: ContextSource;
  /** For multiple sources: list of sources */
  sources?: ContextSource[];
  /** Summary label override */
  label?: string;
  /** Whether to show the tooltip on hover */
  showTooltip?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Custom class name */
  className?: string;
}

interface ContextSource {
  id: string;
  name: string;
  type: "profile" | "document" | "dataset" | "market" | "company" | "web";
  detail?: string;   // additional info shown in tooltip
  icon?: string;      // override default icon per type
}
```

## Variants

| Variant   | Description                                                       |
|-----------|-------------------------------------------------------------------|
| `single`  | Shows one source with icon + name. Icon + color per source type.  |
| `multiple`| Shows count ("3 sources") with stacked/multi icon. Tooltip lists all.  |
| `full`    | Shows "Full context" with globe icon. Indicates all available data is being used. |

Source type icons:

| Type       | Icon | Color     |
|------------|------|-----------|
| `profile`  | 👤   | blue      |
| `document` | 📄   | purple    |
| `dataset`  | 📊   | teal      |
| `market`   | 📈   | green     |
| `company`  | 🏢   | orange    |
| `web`      | 🌐   | gray      |

## States

| State     | Visual                                                           |
|-----------|------------------------------------------------------------------|
| Default   | Badge rendered with scope-appropriate icon, label, and color     |
| Hover     | Tooltip with source details if `showTooltip` is enabled          |
| Focus     | Outline ring, tooltip visible for keyboard users                 |
| Updating  | Subtle pulse while context is being loaded/refreshed             |
| Empty     | No context — "No data sources" label, gray icon                  |

## Accessibility

- Badge: `role="status"`, `aria-label` describing the context scope
- Tooltip: `role="tooltip"`, `aria-describedby` on the badge
- Source types: differentiate with icon and text (not color alone)
- Color + icon + text label required for each scope variant
- Focusable and dismissible tooltip
- Source list in tooltip: rendered as `<ul>` with `<li>` items

## Responsive Rules

| Breakpoint | Behavior                                                     |
|------------|--------------------------------------------------------------|
| ≥ 640px    | Full label with icon and text                                 |
| < 640px    | Compact: icon-only on badge, tooltip shows full label + list  |

## Animation Rules

| Element        | Trigger           | Duration | Easing     |
|----------------|-------------------|----------|------------|
| Badge fade in  | Mount             | 150ms    | ease-out   |
| Tooltip        | Hover/focus       | 150ms    | ease       |
| Scope change   | Context updated   | 300ms    | ease-in-out |

## Future Expansion

- Clickable badge opens context detail panel (linked to ReasoningPanel)
- Source confidence per source (how much weight each source has)
- Real-time context updates (shows when new sources are added mid-conversation)
- Context missing indicator (flags when expected sources are unavailable)
- Source preview (inline preview of source document snippet)

## Dependencies

- Tooltip primitive
- Icon mapping utility (source type → icon)

## Related Components

- [ReasoningPanel](./ReasoningPanel.md) — detailed breakdown of how each source was used
- [MemoryIndicator](./MemoryIndicator.md) — specific user-memory context (subset of full context)
- [AIMessage](./AIMessage.md) — can show ContextBadge in its header
- [Conversation](./Conversation.md) — shows ContextBadge in conversation header

## Anti-patterns

- Do NOT show generic sources — every listed source should be a real, identifiable data input
- Do NOT show "Full context" if user has restricted data access — be honest about scope
- Do NOT use ContextBadge as a loading spinner — use it only when context has been determined
- Do NOT change the badge scope mid-stream without a smooth transition (avoid jarring swaps)
- Do NOT put sensitive source details in the tooltip if the user does not have access to that source

## Performance Notes

- Source list should be stable and not re-computed on every render
- Tooltip content is static after initial context is established
- Badge is a lightweight inline component with minimal DOM footprint
- If sources come from an API, fetch them once per context change, not per keystroke
- Use CSS transitions for scope changes (background color, icon rotation if applicable)
