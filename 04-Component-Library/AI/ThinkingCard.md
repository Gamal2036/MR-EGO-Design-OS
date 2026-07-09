# ThinkingCard

> AI processing state component showing that the assistant is actively reasoning.

---

## Purpose

Communicates to the user that the AI is currently processing or reasoning before generating a response. Provides a lightweight collapsed state with minimal visual footprint, and an expandable view that reveals step-by-step reasoning for transparency.

## Responsibilities

- Display a collapsed state with a sparkle icon, "Thinking..." label, and animated loading dots
- Show elapsed time counter since reasoning began
- Provide expand/collapse toggle to reveal reasoning steps
- Render reasoning chain as sequential, numbered steps when expanded
- Include a cancel button to abort the current reasoning/processing
- Transition smoothly to AIMessage or StreamingMessage when reasoning completes

## Composition

```
┌─────────────────────────────────────┐
│ Collapsed:                          │
│ ✨ Thinking... ● ● ●   12.4s  [✕]  │
│                                     │
│ Expanded:                           │
│ ✨ Thinking...   12.4s  [✕]         │
│ ┌─────────────────────────────────┐ │
│ │ 1. Analyzing user request...    │ │
│ │ 2. Retrieving relevant data...  │ │
│ │ 3. Cross-referencing sources... │ │
│ │ 4. Formulating response...      │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Hierarchy

- **Parent:** `div.thinking-card`
- **Optional container:** Conversation (shown before AIMessage or StreamingMessage)
- **Children:** SparkleIcon, ThinkingLabel, AnimatedDots, ElapsedTime, CancelButton, ReasoningSteps

## Props Contract (TypeScript)

```typescript
interface ThinkingCardProps {
  /** Unique identifier */
  id: string;
  /** Whether the reasoning panel is expanded */
  expanded?: boolean;
  /** Whether reasoning is cancellable */
  cancellable?: boolean;
  /** Callback when cancel is triggered */
  onCancel?: (id: string) => void;
  /** Callback when expand/collapse toggles */
  onToggle?: (id: string, expanded: boolean) => void;
  /** Array of reasoning steps (populated as they become available) */
  reasoningSteps?: ReasoningStep[];
  /** Custom label override (default: "Thinking...") */
  label?: string;
  /** Elapsed time in seconds (managed externally or internally) */
  elapsedSeconds?: number;
  /** Additional class names */
  className?: string;
}

interface ReasoningStep {
  /** Step order (1-indexed) */
  order: number;
  /** Step description or title */
  label: string;
  /** Current status of this step */
  status: "pending" | "in-progress" | "complete" | "skipped";
  /** Optional detail shown on hover or alongside step */
  detail?: string;
}
```

## Variants

| Variant     | Description                                       |
|-------------|---------------------------------------------------|
| `default`   | Collapsed by default, expandable with steps       |
| `minimal`   | Sparkle icon + dots only, no time or cancel button|
| `expanded`  | Expanded on mount, always shows reasoning steps   |

## States

| State       | Visual                                                                 |
|-------------|------------------------------------------------------------------------|
| Reasoning   | Collapsed with animated dots, elapsed time ticking, cancel available   |
| Step-update | New step appears with fade-in, previous step transitions to "complete" |
| Cancelling  | Cancel button shows spinner, then card collapses and disappears       |
| Complete    | Transitions out; slides up as AIMessage or StreamingMessage appears   |
| Timeout     | Warning banner "Taking longer than expected..." with extended label    |

## Accessibility

- Animated dots: `aria-label="Thinking"`, `role="status"`, `aria-live="polite"`
- Elapsed time: `aria-label="Elapsed time: 12.4 seconds"`, `role="timer"`
- Cancel button: `aria-label="Cancel reasoning"`, `tabindex="0"`
- Expand toggle: `aria-expanded` state, `aria-controls` on the steps panel
- Reasoning steps: rendered as `<ol>` with `<li>` elements for semantic structure
- Respect `prefers-reduced-motion`: replace animated dots with static "..." |

## Responsive Rules

| Breakpoint | Behavior                                                 |
|------------|----------------------------------------------------------|
| ≥ 640px    | Full layout with time and cancel on same row             |
| < 640px    | Cancel button moves below, time hidden, compact dots     |

## Animation Rules

| Element        | Trigger          | Duration | Easing     |
|----------------|------------------|----------|------------|
| Dots bounce    | Continuous       | 1.4s     | ease-in-out|
| Steps fade in  | Step added       | 200ms    | ease-out   |
| Card collapse  | Complete/cancel  | 250ms    | ease-in-out |
| Sparkle pulse  | Continuous       | 2s       | ease-in-out |

Dot animation:
```css
@keyframes dot-bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-4px); }
}
.dot { animation: dot-bounce 1.4s infinite; }
.dot:nth-child(2) { animation-delay: 0.16s; }
.dot:nth-child(3) { animation-delay: 0.32s; }
```

## Future Expansion

- Streaming reasoning steps (real-time updates from backend)
- Token usage estimate during thinking phase
- Thumbnail preview of generated response while thinking
- Comparison mode (AI explores multiple approaches before picking one)
- Time estimates: "About 5 seconds remaining"

## Dependencies

- Timer utility for elapsed time (use `performance.now()` for precision)
- Parent state management to coordinate transition to output component

## Related Components

- [StreamingMessage](./StreamingMessage.md) — successor component after thinking completes
- [AIMessage](./AIMessage.md) — final rendered output after thinking
- [ReasoningPanel](./ReasoningPanel.md) — detailed logic breakdown (more complex than step list)

## Anti-patterns

- Do NOT keep ThinkingCard visible after content has started streaming — transition immediately
- Do NOT show detailed technical debug info in reasoning steps unless user has enabled developer mode
- Do NOT allow the cancel button to be pressed if the operation is non-interruptible (disable gracefully)
- Do NOT use indeterminate progress bars for the thinking state — dots are sufficient

## Performance Notes

- Elapsed time should use `performance.now()` diff, not `Date.now()`, for sub-second accuracy
- Animate the CSS properties (opacity, transform) only — avoid layout-triggering properties
- Reasoning steps array should be referentially stable to avoid unnecessary re-renders
- Use `will-change: transform` on the dots element for smoother animation
