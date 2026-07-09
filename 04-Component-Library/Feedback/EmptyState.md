# EmptyState

## Purpose
A placeholder displayed when a list, search, or content area has no data to show. Communicates the absence of content in a helpful, non-error way and provides the user with a clear action to remedy the situation.

## Responsibilities
- Display an illustration or icon representing the empty context
- Show a concise title explaining what is missing
- Show an optional description with more context or guidance
- Provide an optional action button (e.g., "Create document", "New message", "Clear filters")
- Support multiple contextual variants: no-data, no-results, no-messages, no-notifications, no-documents
- Remain visually consistent with the brand illustration style

## Composition
```
EmptyState
├── Illustration / Icon (variant-specific)
├── Title
├── Description (optional)
└── ActionButton (optional)
```

## Hierarchy
```
Pages → Lists / Search / Content Regions → EmptyState
```

## Props Contract

```typescript
interface EmptyStateProps {
  /** Predefined variant (provides default icon + title + description) */
  variant?: 'no-data' | 'no-results' | 'no-messages' | 'no-notifications' | 'no-documents' | 'custom';
  /** Custom icon/illustration (overrides variant default) */
  icon?: React.ReactNode;
  /** Title text (overrides variant default) */
  title?: string;
  /** Description text (overrides variant default) */
  description?: string;
  /** Action button config */
  action?: EmptyStateAction;
  /** Visual style */
  layout?: 'vertical' | 'horizontal';
  /** Reduce spacing — for embedding in small containers */
  compact?: boolean;
  className?: string;
}

interface EmptyStateAction {
  label: string;
  onClick: () => void;
  /** Optional link href */
  href?: string;
  /** Button variant (default: 'primary') */
  variant?: 'primary' | 'secondary' | 'ghost';
}
```

## Variant Defaults
| Variant | Icon / Illustration | Default Title | Default Description |
|---|---|---|---|
| no-data | Database / file icon | "No data yet" | "Data will appear here once available." |
| no-results | Search icon with X | "No results found" | "Try adjusting your search or filters." |
| no-messages | Chat bubble icon | "No messages" | "Start a conversation to see messages here." |
| no-notifications | Bell icon | "All caught up" | "No notifications right now." |
| no-documents | Document icon with star | "No documents" | "Create your first document to get started." |
| custom | User-provided | User-provided | User-provided |

## States
| State | Visual |
|---|---|
| Default | Icon + title + optional description + optional action |
| With action | Action button visible below description |
| Compact | Reduced padding, smaller icon, no description |
| Horizontal layout | Icon on left, text content on right, action below text |

## Accessibility
- `role="region"` with `aria-label` indicating the empty area (e.g., "Document list is empty")
- Illustration/icon: `aria-hidden="true"` (decorative)
- Title: semantic heading level (`<h2>` or `<h3>`) appropriate to the page hierarchy
- Action button: descriptive label (e.g., "Create new document" rather than "Create")
- When search returns no results, the empty state should be announced: use `aria-live="polite"` on the container
- `role="status"` for the empty state container so screen readers announce it
- Focus management: when empty state replaces a list, focus should remain on the search input or move to the empty state heading (with `tabindex="-1"`)

## Responsive Rules
| Breakpoint | Behavior |
|---|---|
| ≥ 768px | Centered layout with 280px max-width for content, larger illustration |
| < 768px | Full-width, compact spacing (16px padding vs 24px), smaller illustration (64px vs 96px), stacked vertically |
| All | Illustration scales down proportionally on small screens |

## Animation Rules
- Entrance: fade-in + translateY(10px → 0), 300ms ease-out
- Illustration: no animation (static) or subtle float (slow Y oscillation 3s period, 4px amplitude) on specific variants
- Action button: standard button hover/active states
- Variant transition (if changing variant live): cross-fade 200ms
- `prefers-reduced-motion`: disable float animation, keep entrance fade

## Future Expansion
- Rich illustrations (inline SVG illustrations with brand characters)
- Suggested actions list (multiple actions instead of one)
- Contextual tips or help links below the action button
- Loading → Empty → Content sequence with smooth transitions
- Empty state with media (short GIF/video walkthrough)
- Analytics event tracking on empty state action click
- Custom illustration slot for per-product branding

## Dependencies
- `Icon` (variant icons, or custom illustration component)
- `Button` (action button)
- `Heading` / `Text` (title, description)

## Related Components
- `ErrorState` — shown when an error occurs vs. simply no data
- `LoadingState` — shown before data loads, transitions to EmptyState or content
- `Skeleton` — loading placeholder that transitions to EmptyState when data returns empty

## Anti-patterns
- ❌ Showing EmptyState while data is still loading — use LoadingState or Skeleton first
- ❌ Using generic "Nothing here" for all variants — each variant should have specific messaging
- ❌ Hiding the empty state without a transition — fade out smoothly on content arrival
- ❌ Including an action button that navigates to a broken or permission-denied page
- ❌ Using EmptyState for error scenarios — use ErrorState instead (they have different tone)
- ❌ Placing EmptyState inside a scrollable container that makes it look like content overflow

## Performance Notes
- Extremely lightweight — single render, no subscriptions
- Illustration should be an inline SVG (not an external image request) for performance and theming
- If using animated SVG illustrations, use CSS animation on SVG elements (no JS animation libraries)
- No state management — purely props-driven
- For tabbed or filtered views, avoid unmounting/mounting EmptyState on every filter change — show/hide via CSS
