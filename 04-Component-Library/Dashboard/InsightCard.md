# InsightCard

## Purpose
Surface a data-derived observation or pattern to the user — more analytical than a raw stat and read-only (no action buttons). Helps users discover trends, anomalies, or correlations without being prescriptive.

## Responsibilities
- Render a contextual icon representing the insight category
- Render a concise headline (bold, 1-2 lines)
- Render supporting text explaining the insight (2-3 lines)
- Render a confidence indicator (bar or dot-based)
- Render optional "Learn more" action link
- Maintain minimum height 100 px

## Composition
```
InsightCard
├── Card (shell)
├── IconArea
│   └── InsightIcon               ← 32×32 icon, accented background circle
├── ContentArea
│   ├── Headline                  ← bold, 2-line max, text-primary
│   ├── SupportingText            ← 2-3 lines, text-secondary
│   └── [LearnMoreLink]           ← "Learn more →", accent colour
└── ConfidenceRow
    └── ConfidenceIndicator       ← 3-dot or segmented bar, coloured
```

## Hierarchy
- **Container:** Card
- **Parent:** InsightsGrid or Dashboard panel
- **Children:** Text nodes, icon, link (read-only — no action buttons)

## Props Contract (TypeScript)

```typescript
interface InsightCardProps {
  /** Unique insight identifier */
  id: string;
  /** Headline text (bold, max 2 lines) */
  headline: string;
  /** Supporting description (2-3 lines) */
  description: string;
  /** Icon name from @mr-ego/icons */
  icon: string;
  /** Confidence level (0-100) */
  confidence: number;
  /** Category for colour-coding the icon background */
  category?: 'trend' | 'anomaly' | 'correlation' | 'forecast' | 'summary';
  /** URL for "Learn more" link */
  learnMoreHref?: string;
  /** Label override for the learn-more link */
  learnMoreLabel?: string;
  onClick?: () => void;
}
```

## Variants

| Variant    | Modifiers                                                    |
|------------|--------------------------------------------------------------|
| Default    | Solid icon background, confidence bar                        |
| Trend      | Arrow-up icon, blue accent                                   |
| Anomaly    | Alert icon, warning accent                                   |
| Correlation | Scatter icon, purple accent                                 |
| Forecast   | Chart-line icon, green accent                                |
| Compact    | Smaller padding, no description, used in SummaryCard         |

## States

| State      | Visual                                                      |
|------------|-------------------------------------------------------------|
| Idle       | Default appearance                                          |
| Hover      | Card elevation increases, icon background slightly brighter |
| Focus      | 2 px ring using `--color-focus`                             |
| Active     | Scale 0.98, 100 ms                                          |
| Loading    | Skeleton card — circle, 2 line blocks, confidence bar       |
| Error      | "Insight unavailable" message, retry icon                   |
| Dismissed  | Fade out, removed from view                                 |

## Accessibility
- Card has `role="article"` and `aria-label="Insight: [headline]"`
- Icon is `aria-hidden="true"` — its meaning is conveyed by the category and headline
- Headline is rendered as `<h3>` or `<h4>` for semantic heading hierarchy
- Supporting text linked to headline via `aria-describedby`
- Confidence indicator uses `role="meter"` or `aria-label` (e.g. "Confidence: 85 percent")
- "Learn more" is a standard `<a>` or `<button>` with visible text
- Colour is not the sole differentiator for category — icon shape and category label also used
- Dismiss action announced via `aria-live="polite"`

## Responsive Rules

| Breakpoint | Behaviour                                                    |
|------------|--------------------------------------------------------------|
| ≥ 1024 px  | Side-by-side icon + content, confidence bar below text       |
| 640–1023   | Icon above headline, stacked layout                          |
| < 640 px   | Compact variant, icon 24 px, no confidence indicator         |
| In grid    | Fixed column width (min 280 px, max 1 fr)                   |

## Animation Rules
- **Mount:** Fade in + translateY(10 px), 250 ms, stagger 100 ms per sibling
- **Confidence bar fill:** Width animates from 0 to target % over 400 ms
- **Hover:** Box-shadow transition 150 ms, icon background tint shift
- **Dismiss:** Fade out over 200 ms
- **Reduced motion:** Respect `prefers-reduced-motion` — instant confidence bar, no stagger

## Future Expansion
- Expandable detail panel revealing the raw data behind the insight
- "Why now?" explanation showing trigger conditions
- Share insight via link or export as image
- Time-series sparkline to visualise the trend mentioned
- User feedback (Was this helpful?) for model improvement

## Dependencies
- `Card` shell
- `@mr-ego/theme` (colour tokens per category)
- `@mr-ego/icons` (insight category icons)
- `@mr-ego/components/Meter` (confidence bar)
- `@mr-ego/utils/math` (clamp confidence to 0-100)

## Related Components
- **RecommendationCard** — actionable AI suggestion (has Apply/Dismiss buttons)
- **StatCard** — raw number, no narrative
- **ActivityCard** — timestamped event, not analytical
- **SummaryCard** — aggregates multiple insights at meta level

## Anti-patterns
- ❌ Do not include action buttons on InsightCard (use RecommendationCard instead)
- ❌ Do not exceed 3 lines for supporting text — keep scannable
- ❌ Do not use InsightCard for non-data narratives (use a generic Callout instead)
- ❌ Do not show the confidence indicator when confidence is < 20 % (hide card entirely or flag as unconfident)
- ❌ Do not use more than one "Learn more" link per card

## Performance Notes
- Confidence indicator rendered as a CSS bar with `width: N%` — no JS charting
- Icon is a single SVG component — no image loading overhead
- Skeleton uses CSS-only shimmer
- Headline clamp uses pure CSS (`-webkit-line-clamp: 2`)
- Cards can be virtualised when rendered in a grid > 20 items
