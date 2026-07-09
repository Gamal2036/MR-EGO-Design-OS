# ReasoningPanel

> Expandable panel showing the AI's logic breakdown, factors considered, data sources, and confidence assessment.

---

## Purpose

Provides transparency into the AI's decision-making process. Allows users to inspect how a conclusion was reached, what factors were weighted, which data sources were consulted, and how confident the AI is in each factor and the overall result.

## Responsibilities

- Display a collapsed summary line (e.g., "Based on 3 factors with high confidence")
- Expand to show full reasoning breakdown
- List decision factors with individual confidence levels
- Show data sources referenced for each factor
- Display the logic chain as sequential reasoning nodes
- Include a disclaimer about AI-generated recommendations
- Show overall confidence score with visual indicator

## Composition

```
┌─────────────────────────────────────────┐
│ Collapsed:                               │
│ 🔍 Based on 3 factors — high confidence ▸│
│                                          │
│ Expanded:                                │
│ 🔍 Reasoning Breakdown              [✕] │
│ ┌─────────────────────────────────────┐ │
│ │ Overall Confidence: ████████░░ 82%   │ │
│ │                                      │ │
│ │ Factors:                             │ │
│ │ 1. Market Trend Analysis    ████ 72% │ │
│ │    Sources: Q2 Report, Gartner      │ │
│ │ 2. User Preference Data     █████ 91%│ │
│ │    Sources: Profile, History        │ │
│ │ 3. Resource Availability   ███ 58%   │ │
│ │    Sources: Inventory DB            │ │
│ │                                      │ │
│ │ Logic Chain:                         │ │
│ │ ① Identified need → ② Searched     │ │
│ │    sources → ③ Cross-referenced      │ │
│ │    → ④ Produced recommendation      │ │
│ │                                      │ │
│ │ ⚠ AI-generated — verify results     │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Hierarchy

- **Parent:** `div.reasoning-panel`
- **Children:** SummaryLine, ExpandToggle, ConfidenceBar, FactorList (FactorItem), LogicChain, Disclaimer

## Props Contract (TypeScript)

```typescript
interface ReasoningPanelProps {
  /** Unique identifier */
  id: string;
  /** Whether the panel is expanded */
  expanded?: boolean;
  /** Overall confidence score 0–100 */
  overallConfidence: number;
  /** Decision factors considered */
  factors: Factor[];
  /** Logic chain steps */
  logicChain: LogicStep[];
  /** Summary text for collapsed state */
  summary?: string;
  /** Callback when expand/collapse toggles */
  onToggle?: (id: string, expanded: boolean) => void;
  /** Custom class name */
  className?: string;
}

interface Factor {
  id: string;
  label: string;
  confidence: number; // 0–100
  sources: Source[];
  weight?: "high" | "medium" | "low";
}

interface LogicStep {
  order: number;
  label: string;
  description?: string;
}

interface Source {
  id: string;
  title: string;
  type: "document" | "dataset" | "web" | "note";
  url?: string;
}
```

## Variants

| Variant     | Description                                            |
|-------------|--------------------------------------------------------|
| `default`   | Full panel with all factors, sources, logic chain      |
| `simple`    | Collapsed summary only, single-click expand            |
| `minimal`   | Overall confidence bar only, no factor breakdown       |
| `debug`     | Includes raw model output, token weights, timing data  |

## States

| State       | Visual                                                  |
|-------------|---------------------------------------------------------|
| Collapsed   | Single line with summary text and expand chevron        |
| Expanded    | Full layout with factors, logic chain, disclaimer       |
| Loading     | Skeleton placeholders for factors (pulsing bars)        |
| Empty       | "No reasoning data available" message in place of factors|
| Error       | "Failed to load reasoning" with retry button            |

## Accessibility

- Expand toggle: `aria-expanded`, `aria-controls` on panel content
- Confidence bars: `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- Factor list: rendered as `<ul>` with semantic `<li>` items
- Logic chain: rendered as `<ol>` for sequential steps
- Disclaimer: `role="note"` with `aria-label="Disclaimer"`
- Color is never the sole indicator for confidence levels — always include text label ("High", "Medium", "Low")
- Expand/collapse: keyboard navigable with Enter/Space

## Responsive Rules

| Breakpoint | Behavior                                                  |
|------------|-----------------------------------------------------------|
| ≥ 1024px   | Two-column layout: factors on left, logic chain on right  |
| 640–1023px | Single column, factors stacked, logic chain below          |
| < 640px    | Hide individual source links behind "View sources" button |

## Animation Rules

| Element              | Trigger           | Duration | Easing     |
|----------------------|-------------------|----------|------------|
| Panel expand/collapse| Toggle            | 300ms    | ease-in-out |
| Confidence bar fill  | On mount/expand   | 600ms    | ease-out    |
| Factor fade in       | Sequential reveal | 150ms    | ease-out    |
| Chevron rotate       | Toggle            | 200ms    | ease       |

## Future Expansion

- Factor comparison mode (before/after user edits)
- Confidence threshold warnings (factors below 50% highlighted)
- Export reasoning as a structured report
- User override: adjust factor weights and re-run logic
- Token attribution per factor (how many tokens were spent on each)
- Cite exact paragraph numbers within source documents

## Dependencies

- Confidence bar sub-component (reusable progress/rating indicator)
- Source link component (shared with AIMessage)
- Optional: animation library for sequential factor reveal

## Related Components

- [ConfidenceBadge](./ConfidenceBadge.md) — simplified single-value confidence indicator
- [ThinkingCard](./ThinkingCard.md) — lightweight runtime thinking state (precursor to ReasoningPanel)
- [ContextBadge](./ContextBadge.md) — shows what data context the AI is using
- [AIMessage](./AIMessage.md) — the message that the reasoning panel explains

## Anti-patterns

- Do NOT show the reasoning panel by default for simple queries — collapsed by default
- Do NOT expose raw model internals (logits, token probabilities) in non-debug variant
- Do NOT make the panel so large it obscures the actual recommendation — use a side sheet or bottom panel on mobile
- Do NOT hide the disclaimer — users must always be reminded this is AI-generated
- Do NOT use confidence bars without numeric or textual labels (accessibility)

## Performance Notes

- Lazy-load factor details when the panel is expanded (fetch from API on demand)
- Confidence bars should use CSS transitions, not JS-driven animation
- Memoize factor list rendering since it may contain many items
- Logic chain rendering should be flat (avoid deep nesting that hurts layout performance)
- Animate only opacity and transform on expand/collapse (use `max-height` trick or `grid-template-rows` transition)
