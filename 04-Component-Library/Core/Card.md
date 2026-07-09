# Card

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md), [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md), [Motion-System.md](../../02-Design-Language/Motion-System.md))

---

## Purpose

Card is a flexible content container that groups related information and actions into a visually distinct surface. It is the most common content container in MR:EGO, used across dashboards, analytics, documents, profiles, AI conversations, and feature sections.

---

## Responsibilities

- Provide a visually bounded container for grouped content
- Offer variant-specific styling for different content types
- Support slot-based composition via Card.Header, Card.Body, Card.Footer sub-components
- Manage consistent padding and spacing per variant
- Support interactive states (hover elevation, click) for selectable cards
- Render optional accent decorations (borders, backgrounds, icons)

---

## Composition

```
Card
├── Card.Header (optional)
│   ├── Icon/Avatar (optional)
│   ├── Title (required within header)
│   ├── Subtitle (optional)
│   └── Actions (optional, IconButton or Badge)
├── Card.Body (required)
│   └── Arbitrary content (text, charts, tables, forms, lists)
└── Card.Footer (optional)
    ├── Button(s)
    ├── Tag(s)
    ├── Metadata
    └── Link(s)
```

Card uses:
- `Surface` — base layer styling
- `Badge`, `Avatar`, `Tag`, `Chip` — optional sub-component slots
- `Button`, `IconButton`, `Link` — footer actions

---

## Hierarchy

**Level:** 2 (Core Composite)

**Parent:** None (consumed directly by pages, grids, dashboards, dialog bodies)

**Children:**
- `Surface` (Level 1) — base visual surface
- `Badge` (Level 1, optional) — notification/status overlay
- `Avatar` (Level 1, optional) — entity image
- `Tag` (Level 1, optional) — metadata labels
- `Chip` (Level 1, optional) — interactive elements
- `Button` (Level 2, optional) — footer actions
- `IconButton` (Level 2, optional) — compact actions

**Sub-components (named slots):** `Card.Header`, `Card.Body`, `Card.Footer`

---

## Props Contract

```typescript
/**
 * Card visual variant determining styling and intended content type.
 * - dashboard: Standard dashboard card, neutral styling
 * - analytics: Emphasized data display with optional chart area
 * - job: Job posting card with specific metadata layout
 * - document: Document/file summary card
 * - profile: User/profile card with avatar emphasis
 * - insight: Data-derived insight with accent
 * - ai: AI message or AI-generated content
 * - feature: Feature highlight with promotional styling
 * - expandable: Card that expands to reveal more content
 * - interactive: Card with hover/click interaction (selectable)
 */
type CardVariant = 'dashboard' | 'analytics' | 'job' | 'document' | 'profile' | 'insight' | 'ai' | 'feature' | 'expandable' | 'interactive';

/**
 * Card padding density.
 * - standard: 24px padding (Space-7)
 * - compact: 16px padding (Space-5)
 * - dense: 12px padding (Space-4)
 */
type CardDensity = 'standard' | 'compact' | 'dense';

interface CardProps {
  /** Visual variant. @default 'dashboard' */
  variant?: CardVariant;
  /** Padding density. @default 'standard' */
  density?: CardDensity;
  /** Whether the card has no padding (for custom layouts). @default false */
  noPadding?: boolean;
  /** Whether the card is interactive (clickable). @default false */
  isInteractive?: boolean;
  /** Whether the card is selected (interactive cards). @default false */
  isSelected?: boolean;
  /** Whether the card is disabled (interactive cards). @default false */
  isDisabled?: boolean;
  /** Whether the card is expanded (expandable variant). @default false */
  isExpanded?: boolean;
  /** Click handler for interactive cards. */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** ARIA label for interactive cards. */
  ariaLabel?: string;
  /** Additional class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
  /** Data test ID for automated testing. */
  dataTestId?: string;
  /** Ref forwarded to the root card element. */
  ref?: React.Ref<HTMLDivElement>;
}

interface CardHeaderProps {
  /** Header title text. */
  children?: React.ReactNode;
  /** Icon before the title. */
  icon?: React.ReactNode;
  /** Subtitle text below the title. */
  subtitle?: string;
  /** Actions rendered on the right side of the header. */
  actions?: React.ReactNode;
  /** Additional class names. */
  className?: string;
}

interface CardBodyProps {
  /** Body content. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
}

interface CardFooterProps {
  /** Footer content. */
  children: React.ReactNode;
  /** Whether the footer has a top border separator. @default true */
  hasDivider?: boolean;
  /** Additional class names. */
  className?: string;
}
```

---

## Variants

### Dashboard
Standard card for metrics, summaries, and overview content.

| Property | Light | Dark |
|----------|-------|------|
| Background | Surface-1 | Surface-1 |
| Border | Border-Default (1px solid) | Border-Default (1px solid) |
| Border Radius | Radius-Md (8px) | Radius-Md (8px) |
| Shadow | None (Layer 1) | None (Layer 1) |
| Hover (interactive) | Layer 2 shadow | Layer 2 shadow |

### Analytics
Card with data visualization emphasis. Slightly elevated.

| Property | Light | Dark |
|----------|-------|------|
| Background | Surface-1 | Surface-1 |
| Border | Border-Default (1px solid) | Border-Default (1px solid) |
| Border Radius | Radius-Md (8px) | Radius-Md (8px) |
| Shadow | Layer 1 | Layer 1 |
| Chart Area | Full-width, no horizontal padding | Full-width, no horizontal padding |

### Job
Job posting card with specific layout: logo, title, company, metadata, tags.

| Property | Light | Dark |
|----------|-------|------|
| Background | Surface-1 | Surface-1 |
| Border | Border-Default (1px solid) | Border-Default (1px solid) |
| Border Radius | Radius-Md (8px) | Radius-Md (8px) |
| Slot Order | Header (logo+title) → Body (metadata) → Footer (tags+action) | Same |

### Document
Document/file summary card with preview area.

| Property | Light | Dark |
|----------|-------|------|
| Background | Surface-1 | Surface-1 |
| Border | Border-Default (1px solid) | Border-Default (1px solid) |
| Border Radius | Radius-Md (8px) | Radius-Md (8px) |
| File Preview | Icon or thumbnail in header area | Same |

### Profile
User/entity profile card with avatar emphasis.

| Property | Light | Dark |
|----------|-------|------|
| Background | Surface-1 | Surface-1 |
| Border | Border-Default (1px solid) | Border-Default (1px solid) |
| Border Radius | Radius-Md (8px) | Radius-Md (8px) |
| Avatar Size | 64px or 96px centered | Same |

### Insight
Data-derived insight with accent border and icon.

| Property | Light | Dark |
|----------|-------|------|
| Background | Surface-1 | Surface-1 |
| Border | Border-Default (1px solid) | Border-Default (1px solid) |
| Left Accent Border | Primary-500 (3px) | Primary-400 (3px) |
| Insight Icon | Primary-500 color | Primary-400 color |

### AI
AI message or AI-generated content container.

| Property | Light | Dark |
|----------|-------|------|
| Background | Primary-50 | Primary-900 |
| Border | Primary-200 (1px solid) | Primary-700 (1px solid) |
| Border Radius | Radius-Md (8px) | Radius-Md (8px) |
| AI Icon | Sparkle icon in header | Sparkle icon in header |

### Feature
Promotional or feature-highlight card with enhanced styling.

| Property | Light | Dark |
|----------|-------|------|
| Background | Surface-1 | Surface-1 |
| Border | Primary-200 (1px solid) | Primary-700 (1px solid) |
| Border Radius | Radius-Md (8px) | Radius-Md (8px) |
| Shadow | Layer 1 | Layer 1 |
| Accent | Optional gradient top border (4px) | Same |

### Expandable
Card with expand/collapse toggle for progressive disclosure.

| Property | Light | Dark |
|----------|-------|------|
| Background | Surface-1 | Surface-1 |
| Border | Border-Default (1px solid) | Border-Default (1px solid) |
| Border Radius | Radius-Md (8px) | Radius-Md (8px) |
| Expand Control | IconButton (chevron-down) in header | Same |
| Expanded Body | Full body visible with slide animation | Same |

### Interactive
Selectable card with hover and active states.

| Property | Light | Dark |
|----------|-------|------|
| Background | Surface-1 | Surface-1 |
| Border | Border-Default (1px solid) | Border-Default (1px solid) |
| Border Radius | Radius-Md (8px) | Radius-Md (8px) |
| Hover | Layer 2 shadow, cursor `pointer` | Same |
| Selected | Primary-600 border (2px), Primary-50 background | Primary-400 border, Primary-900 background |

---

## States

| State | Trigger | Visual Change | Duration |
|-------|---------|--------------|----------|
| Default | — | Resting card appearance per variant | — |
| Hover (interactive) | Mouse enter | Shadow elevation to Layer 2, cursor `pointer` | 200ms |
| Active (interactive) | Mouse down | Scale 0.99, background tint | 50ms |
| Focus (interactive) | Tab key | 2px Primary-500 focus ring (2px offset) | 100ms |
| Selected (interactive) | Click/select prop | Primary border, tinted background | 200ms |
| Disabled (interactive) | `isDisabled` prop | Opacity 0.5, no hover/click | Instant |
| Expanded (expandable) | Toggle click | Body slides open/closed | 300ms |
| Loading | Skeleton mode | Skeleton placeholders replace content | — |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Non-interactive card | `<div>` with no special role |
| Interactive card | `role="button"` or `role="option"`, `tabIndex={0}` |
| Selected card | `aria-selected` or `aria-current` as appropriate |
| Disabled card | `aria-disabled="true"` |
| Keyboard (interactive) | Enter or Space to activate |
| Card header | `aria-label` on interactive cards describing the card |
| Card Footer | Semantic separation from body content |
| Screen reader | Card content is read in DOM order (Header → Body → Footer) |
| Focus management | Tab navigates between interactive cards, not within them |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | One card per row (full-width). Compact density recommended. |
| Tablet (768-1023px) | 2-column grid. Standard density. |
| Desktop (1024-1279px) | 3-column grid for dashboard, 2-column for detail cards. |
| Wide (1280-1599px) | 4-column grid for dashboard, 3-column for detail cards. |
| Ultra-wide (1600px+) | 4-6 column grid. Standard density. |

Card grid layout is managed by the parent `Grid` component. Card itself does not manage columns.

---

## Animation Rules

| Action | Duration | Easing | Property |
|--------|----------|--------|----------|
| Hover shadow (interactive) | 200ms | Ease-Out | box-shadow, transform |
| Active press | 50ms | Ease-Out | transform: scale(0.99) |
| Focus ring | 100ms | Ease-Out | box-shadow |
| Selected border | 200ms | Ease-Out | border-color, background-color |
| Expand body | 300ms | Ease-Out | max-height, opacity |
| Collapse body | 200ms | Ease-In | max-height, opacity |

- All animations respect `prefers-reduced-motion`
- On reduced motion: disable transform, only use opacity for expand/collapse
- Expand/collapse uses max-height animation for smooth open/close
- No scale animation on non-interactive cards

---

## Future Expansion

- **Card grid** — Built-in responsive grid layout for card collections
- **Dismissible card** — Close button to dismiss card from view
- **Draggable card** — Drag-and-drop reordering in grid/kanban layouts
- **Card group** — Visually grouped related cards with shared header
- **Card with media** — Image/video hero area at top of card
- **Card actions overlay** — Action buttons that appear on hover

---

## Dependencies

| Dependency | Type | Usage |
|------------|------|-------|
| Surface | Internal (Level 1) | Base visual surface layer |
| Badge | Internal (Level 1, optional) | Notification overlay |
| Avatar | Internal (Level 1, optional) | Entity image |
| Tag | Internal (Level 1, optional) | Metadata labels |
| Chip | Internal (Level 1, optional) | Interactive elements |
| Design Tokens | External (DP-1) | All visual properties |

---

## Related Components

- [Surface.md](Surface.md) — Base visual surface used by Card
- [Panel.md](Panel.md) — Grouped content section with header/footer
- [Container.md](Container.md) — Layout width constraint
- [Divider.md](Divider.md) — Card.Footer border separator
- [Badge.md](Badge.md) — Overlay notification on card
- [Avatar.md](Avatar.md) — User/entity image in header
- [Tag.md](Tag.md) — Metadata labels in card body
- [Button.md](Button.md) — Footer action buttons
- [Grid.md](../Layout/Grid.md) — Card grid layout

---

## Anti-patterns

1. **Card in Card** — Do not nest Card components. Use Panel inside Card if grouping needed.
2. **Infinite scrolling inside Card** — Cards should not contain scrollable content. Use Panel or dedicated scroll containers.
3. **Forms inside Cards** — Use Panel for form sections. Card is for display content.
4. **Multiple interactive cards without selection state** — Interactive cards must manage selected state or use radio/checkbox pattern.
5. **Inconsistent padding** — All Cards of the same density must use identical padding.
6. **Empty Card** — Cards must contain content. Use EmptyState component for no-data scenarios.
7. **Overriding Card sub-components** — Do not use custom header/body/footer layouts instead of the named slots.

---

## Performance Notes

- Card renders as a single `<div>` with sub-components as named slot elements
- Shadow transitions use `box-shadow` with `will-change: box-shadow` hint for GPU acceleration
- Expand/collapse uses CSS `max-height` animation (set `max-height` to computed `scrollHeight` via JS)
- Interactive cards use `role="button"` — avoid `<button>` wrapper which adds DOM depth
- Variant styles use static class maps — prefer compiled CSS modules
- Card.Header actions slot renders only when actions prop is provided (conditional render)
- Avoid unnecessary re-renders by keeping Card state at the container level, not individual card level
