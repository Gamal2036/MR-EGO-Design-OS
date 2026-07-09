# ConfidenceBadge

> Visual indicator of the AI's certainty level for a given statement, recommendation, or prediction.

---

## Purpose

Communicates how confident the AI model is in a particular piece of output. Allows users to quickly gauge reliability at a glance, using a combination of color, iconography, and text label — never relying on color alone.

## Responsibilities

- Display confidence level as a compact badge with icon, label, and optional tooltip
- Map confidence scores to three levels: high (success/green), medium (warning/amber), low (danger/red)
- Show a human-readable label (e.g., "High Confidence", "Medium Confidence", "Low Confidence")
- Provide a tooltip on hover with the exact confidence percentage or textual explanation
- Maintain accessible non-color indicators for each level
- Support standalone use (inline) or within parent components (factor lists, messages)

## Composition

```
┌───────────────────────┐
│ High Confidence        │  ← success color (green), checkmark icon
│ ✅ High Confidence     │
│ ┌───────────────────┐ │
│ │ AI is highly      │ │  ← tooltip on hover
│ │ confident in this │ │
│ │ result (92%)      │ │
│ └───────────────────┘ │
└───────────────────────┘

┌───────────────────────┐
│ Medium Confidence      │  ← warning color (amber), warning icon
│ ⚠ Medium Confidence  │
│ ┌───────────────────┐ │
│ │ AI has moderate   │ │
│ │ confidence (65%)  │ │
│ └───────────────────┘ │
└───────────────────────┘

┌───────────────────────┐
│ Low Confidence         │  ← danger color (red), X icon
│ ✕ Low Confidence     │
│ ┌───────────────────┐ │
│ │ AI has low        │ │
│ │ confidence (34%)  │ │
│ └───────────────────┘ │
└───────────────────────┘
```

## Hierarchy

- **Parent:** `span.confidence-badge` (inline) or `div.confidence-badge` (block)
- **Children:** Icon, Label, Tooltip (on hover/focus)

## Props Contract (TypeScript)

```typescript
type ConfidenceLevel = "high" | "medium" | "low";

interface ConfidenceBadgeProps {
  /** Confidence level */
  level: ConfidenceLevel;
  /** Optional exact percentage (0–100) shown in tooltip */
  score?: number;
  /** Optional custom label text (defaults to "High/Medium/Low Confidence") */
  label?: string;
  /** Optional tooltip description */
  tooltip?: string;
  /** Visual style */
  variant?: "default" | "outline" | "ghost";
  /** Size */
  size?: "sm" | "md" | "lg";
  /** Whether to show icon only (no label) */
  iconOnly?: boolean;
  /** Callback when badge is clicked */
  onClick?: (level: ConfidenceLevel) => void;
  /** Additional class names */
  className?: string;
}

interface ConfidenceLevelConfig {
  level: ConfidenceLevel;
  icon: string;          // icon identifier
  color: "success" | "warning" | "danger";
  defaultLabel: string;
  ariaLabel: string;
}
```

## Variants

| Variant   | Description                                                  |
|-----------|--------------------------------------------------------------|
| `default` | Filled background, icon + label, full contrast               |
| `outline` | Border-only, transparent background, subtle appearance       |
| `ghost`   | No border or background, icon + label only                   |

## States

| State    | Visual                                                        |
|----------|---------------------------------------------------------------|
| Default  | Badge rendered with level-appropriate color, icon, and label  |
| Hover    | Tooltip appears with additional detail (score/description)    |
| Focus    | Outline ring for keyboard focus, tooltip visible              |
| Active   | Slight scale-down on click (if onClick is provided)           |
| Disabled | Reduced opacity, no hover effects, no tooltip                 |

## Accessibility

- **Never use color alone** — always pair with icon and text label
- `role="status"` or `role="img"` with `aria-label` describing confidence level
- Tooltip: `role="tooltip"`, linked via `aria-describedby` on the badge
- Focusable when interactive (`tabindex="0"`)
- High contrast mode: ensure icon and text remain visible on any background
- Color combinations must meet WCAG AA contrast ratios (4.5:1 for text)

## Responsive Rules

| Breakpoint | Behavior                                               |
|------------|--------------------------------------------------------|
| ≥ 480px    | Icon + label shown                                     |
| < 480px    | `iconOnly` forced if space constrained; tooltip still shows label |

## Animation Rules

| Element        | Trigger         | Duration | Easing     |
|----------------|-----------------|----------|------------|
| Badge fade in  | Mount           | 150ms    | ease-out   |
| Tooltip        | Hover/focus     | 100ms    | ease       |
| Click feedback | Active state    | 100ms    | ease       |

## Future Expansion

- Animated confidence meter (transitions between levels as new data arrives)
- Click-to-expand detail panel showing per-factor confidence breakdown
- Confidence history (show how confidence changed over time/revisions)
- Custom threshold configuration (user-defined high/medium/low boundaries)
- Multi-model confidence comparison

## Dependencies

- Icon set (e.g., Lucide, Heroicons, or custom SVG icons)
- Tooltip primitive (shared tooltip component or library)

## Related Components

- [ReasoningPanel](./ReasoningPanel.md) — uses ConfidenceBadge per factor
- [AIMessage](./AIMessage.md) — can include ConfidenceBadge on specific claims
- [RecommendationPanel](./RecommendationPanel.md) — badges on each recommendation

## Anti-patterns

- Do NOT display confidence without context — a bare percentage is meaningless to most users
- Do NOT use ConfidenceBadge for system status or error states — it is specific to AI certainty
- Do NOT show score values for `high` level unless the exact percentage adds value (often "High" is sufficient)
- Do NOT animate the badge continuously — it should be a stable indicator

## Performance Notes

- Badge is a lightweight inline component — no expensive computations
- Tooltip content should be pre-computed, not generated on hover
- Use CSS for color/icon transitions rather than JS
- Avoid re-rendering the badge on parent state changes unless `level` or `score` changes (use `React.memo`)
