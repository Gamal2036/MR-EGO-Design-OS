# RecommendationCard

## Purpose
Present an AI-driven suggestion or recommendation to the user — distinguished from raw data by a prominent "Suggestion" badge and primary-tinted background with left accent border.

## Responsibilities
- Render a header badge with label "Suggestion" (or configured label)
- Render a recommendation title
- Render a body with supporting rationale (2-4 lines)
- Render a confidence badge (e.g. "High confidence", "Needs review")
- Render action buttons: Apply (primary), Dismiss (tertiary), Modify (outline)
- Display primary-tinted background (10 % opacity of primary colour)
- Display left accent border (3 px, primary colour)
- Maintain minimum height 100 px

## Composition
```
RecommendationCard
├── Card (shell)
│   └── LeftAccentBorder          ← 3 px left border, primary colour
├── Header
│   ├── Badge                     ← "Suggestion" label, filled pill, primary
│   └── [DismissButton]           ← "×" icon, top-right corner
├── Body
│   ├── Title                     ← bold, 2-line max
│   └── Description               ← 2-4 lines, text-secondary
├── ConfidenceBadge               ← text + icon, e.g. "High confidence"
└── ActionRow
    ├── ApplyButton               ← primary variant
    ├── [ModifyButton]            ← outline variant
    └── DismissButton             ← tertiary/ghost variant
```

## Hierarchy
- **Container:** Card
- **Parent:** RecommendationFeed or Dashboard grid
- **Children:** Buttons (Apply, Dismiss, Modify)

## Props Contract (TypeScript)

```typescript
interface RecommendationCardProps {
  /** Unique identifier for the recommendation */
  id: string;
  /** Title of the recommendation */
  title: string;
  /** Supporting rationale body text */
  description: string;
  /** Confidence level */
  confidence: 'high' | 'medium' | 'low' | 'needs-review';
  /** Badge label override (default "Suggestion") */
  badgeLabel?: string;
  /** Source of the recommendation for attribution */
  source?: string;
  /** Optional icon name for the header */
  icon?: string;
  /** Callback when Apply is clicked */
  onApply?: () => void;
  /** Callback when Modify is clicked */
  onModify?: () => void;
  /** Callback when Dismiss is clicked */
  onDismiss?: () => void;
  /** Whether actions are disabled (loading state) */
  actionsDisabled?: boolean;
}
```

## Variants

| Variant       | Modifiers                                                  |
|---------------|------------------------------------------------------------|
| Default       | Badge "Suggestion", three actions visible                  |
| HighConfidence | Confidence badge green, primary background slightly stronger |
| NeedsReview   | Confidence badge warning yellow, dotted border overlay     |
| Dismissed     | Collapsed state with undo option, reduced opacity          |
| Applied       | Badge changes to "Applied", actions hidden, success colour |
| Standalone    | Full width, no neighbouring recommendations                |

## States

| State      | Visual                                                      |
|------------|-------------------------------------------------------------|
| Idle       | Default tinted background, left accent border               |
| Hover      | Slight background intensification (primary at 15 %), shadow |
| Focus      | 2 px ring on the card                                       |
| Applying   | Apply button shows spinner, other actions disabled          |
| Applied    | Card desaturates slightly, badge updates to "Applied"       |
| Dismissed  | Fade out + slide left, 300 ms, then card removed            |
| Loading    | Skeleton card with tint bar, badge, and button placeholders |
| Error      | "Failed to apply" message, inline retry link                |

## Accessibility
- Card has `role="region"` and `aria-label="Recommendation: [title]"`
- Badge uses `<span>` with `aria-label` "Suggestion" for screen readers
- Confidence badge includes `aria-label` (e.g. "High confidence recommendation")
- Left accent border is purely decorative (`aria-hidden="true"`)
- Action buttons have clear accessible labels (not just icons)
- Dismiss (×) button has `aria-label="Dismiss recommendation"`
- Applied/Dismissed state changes announced via `aria-live="polite"`
- Background tint does not affect text contrast (separate layer)

## Responsive Rules

| Breakpoint | Behaviour                                                    |
|------------|--------------------------------------------------------------|
| ≥ 1024 px  | Full layout, action row horizontal                           |
| 640–1023   | Action row wraps (Apply full width, Modify/Dismiss inline)   |
| < 640 px   | Actions stack vertically, left border reduced to 2 px        |
| In feed    | Max-width 480 px, consistent with RecommendationFeed column  |

## Animation Rules
- **Mount:** Slide in from right + fade, 250 ms ease-out
- **Apply → Applied:** Card background transitions to success tint, badge cross-fades, 300 ms
- **Dismiss:** Slide out to left + opacity fade, 300 ms, followed by DOM removal
- **Confidence badge:** Colour transitions 200 ms when confidence changes
- **Action button loading:** Spinner rotation 600 ms linear infinite
- **Reduced motion:** Respect `prefers-reduced-motion` — instant transitions, no slide

## Future Expansion
- Thumbs up/down feedback for reinforcement learning
- "Why this?" expandable section showing reasoning chain
- Scheduled apply (defer action to a later time)
- Batch apply multiple related recommendations
- A/B comparison view (current vs recommended)

## Dependencies
- `Card` shell
- `@mr-ego/theme` (primary colour tokens, spacing)
- `@mr-ego/icons` (dismiss ×, confidence icons)
- `@mr-ego/components/Button` (Apply, Modify, Dismiss button variants)
- `@mr-ego/components/Badge`

## Related Components
- **InsightCard** — non-actionable data insight (read-only, no actions)
- **QuickActionCard** — user-triggered shortcut (not AI-suggested)
- **ActivityCard** — historical record, not forward-looking

## Anti-patterns
- ❌ Do not show more than one primary action (Apply is primary; Modify/Dismiss are secondary)
- ❌ Do not hide the "Suggestion" label — it is the key differentiator from InsightCard
- ❌ Do not use generic card background — the primary tint is essential for visual distinction
- ❌ Do not include external links in body text (keeps focus on the action buttons)
- ❌ Do not stack more than 5 RecommendationCards without pagination or virtualisation

## Performance Notes
- Card background tint achieved via CSS `background-color` with `rgba()` — no image overlay
- Action buttons are separate components with their own loading state
- Idle recommendations are static markup; no polling unless specified
- Dismiss animation triggers a `onDismiss` callback, parent removes card from DOM after animation
- Avoid re-rendering all cards when one is applied — use stable keys
