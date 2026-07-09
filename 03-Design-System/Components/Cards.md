# Cards

**Phase:** DP-2 (Design System)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md), [Elevation-System.md](../../02-Design-Language/Elevation-System.md), [Shadow-System.md](../../02-Design-Language/Shadow-System.md), [Layout-Principles.md](../../02-Design-Language/Layout-Principles.md))

---

## Purpose

Cards are self-contained content containers that group related information, actions, and media into a single perceivable unit. They present a focused preview of content with an optional path to more detail.

---

## When to Use

- Grouping related information into a digestible unit
- Dashboard widgets and data summaries
- Content collections (jobs, documents, projects, profiles)
- Navigation hubs for key sections
- Feature showcases and onboarding steps

## When NOT to Use

- Continuous, scannable lists — use table or list components
- Detailed data entry — use form layouts
- Full-page content — use page layout patterns
- One or two items that do not benefit from visual grouping — use inline content

---

## Variants

### Dashboard Card

Summarizes a single metric or key performance indicator.

| Element | Specification |
|---------|---------------|
| Header | Label + optional icon |
| Body | Primary metric value (Heading-2) |
| Footer (optional) | Trend indicator, comparison text |
| Padding | 24px (Space-7) |
| Min height | 120px |
| Max width | Container column |

### Analytics Card

Presents a data point with a micro-chart visualization.

| Element | Specification |
|---------|---------------|
| Header | Label + time period + action menu |
| Body | Metric + inline sparkline or mini chart |
| Footer | Contextual note or change indicator |
| Padding | 24px (Space-7) |
| Chart area | 80px height minimum |

### Job Card

Preview of a job listing within career feed, search results, or saved list.

| Element | Specification |
|---------|---------------|
| Header | Company logo (40px) + title + company name |
| Body | Key details: location, salary, type, posted date |
| Footer | Action buttons (Save, Apply, Dismiss) |
| Padding | 20px (Space-6) |
| Max width | 480px |
| Hover | Elevation Layer 1 to Layer 2 |

### Document Card

Preview tile for a document in lists or grids.

| Element | Specification |
|---------|---------------|
| Thumbnail | Document type icon or preview (80x100px) |
| Title | Document name (1-2 lines, truncated) |
| Metadata | Type, date modified, size |
| Action | More menu (icon button) |
| Padding | 16px (Space-5) |
| Aspect ratio | 3:4 (portrait) or 4:3 (landscape) |

### Profile Card

User or contact summary card.

| Element | Specification |
|---------|---------------|
| Avatar | 48px (or 64px for prominent) |
| Name | Heading-4 |
| Role/Title | Body-Small, secondary color |
| Metadata | Location, mutual connections, skills |
| Action | Connect, Message, or Follow |
| Padding | 20px (Space-6) |

### Insight Card

AI-generated or data-derived insight presented to the user.

| Element | Specification |
|---------|---------------|
| Badge | "AI Insight" label with sparkle icon |
| Title | The insight headline |
| Body | Supporting explanation (2-3 lines) |
| Confidence | Badge or indicator (High, Medium, Low) |
| Action | "Learn more" or "Apply" |
| Background | Subtle primary tint (Primary-50) |

### AI Card

Container for AI-generated content or interaction.

| Element | Specification |
|---------|---------------|
| Header | AI avatar/icon + "MR:EGO AI" label |
| Body | AI-generated text, suggestions, or options |
| Footer | Feedback thumbs + source link |
| Background | Surface-1 with Primary-50 left border (3px) |
| Padding | 20px (Space-6) |

### Feature Card

Showcases a feature or capability, typically in onboarding or marketing context.

| Element | Specification |
|---------|---------------|
| Icon | 32px feature icon (Primary-500) |
| Title | Heading-4 |
| Description | Body-Small, 2-3 lines |
| Action | Optional link or button |
| Layout | Centered or horizontal icon+text |

### Expandable Card

Card that reveals additional content on expansion.

| Property | Value |
|----------|-------|
| Collapsed | Summary view (title, preview, expand icon) |
| Expanded | Full content, optional actions |
| Animation | Height transition, 200ms Ease-Out |
| Trigger | Click anywhere on header or expand icon |
| Icon | Chevron down (rotates on expand) |
| Accessibility | `aria-expanded` on trigger, `aria-controls` on content |

### Interactive Card

Card that acts as a single click target for navigation or selection.

| Property | Value |
|----------|-------|
| Cursor | pointer |
| Hover | Elevation Layer 1 to Layer 2, subtle border highlight |
| Focus | 2px focus ring on card perimeter |
| Active | Scale 0.99, background darken |
| Selection | Primary-50 background, Primary-500 left border |
| Content | Entire card is clickable (no separate link) |

---

## Card Anatomy

```
┌──────────────────────────────────────────┐
│  ┌────────────────────────────────────┐  │
│  │  Header (optional)                  │  │
│  │  [Icon/Avatar] Title         [Menu] │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Body                               │  │
│  │  Primary content, metrics,          │  │
│  │  description, or preview            │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Footer (optional)                  │  │
│  │  Metadata                [Actions]  │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

---

## Sizing

| Variant | Min Width | Max Width | Min Height |
|---------|-----------|-----------|------------|
| Dashboard Card | 200px | Container column | 120px |
| Analytics Card | 240px | Container column | 160px |
| Job Card | 300px | 480px | Content-determined |
| Document Card | 160px | 240px | 200px |
| Profile Card | 260px | 360px | Content-determined |
| Insight Card | 280px | Container column | Content-determined |
| AI Card | 300px | Container column | Content-determined |
| Feature Card | 200px | 400px | Content-determined |
| Expandable Card | 280px | Container column | Content-determined |
| Interactive Card | 200px | Container column | Content-determined |

---

## Spacing

| Context | Value | Token |
|---------|-------|-------|
| Card padding (comfortable) | 24px | Space-7 |
| Card padding (compact) | 20px | Space-6 |
| Card padding (dense) | 16px | Space-5 |
| Between header and body | 16px | Space-5 |
| Between body and footer | 16px | Space-5 |
| Between cards in grid | 24px | Space-7 |
| Between cards (compact grid) | 16px | Space-5 |
| Icon to title in header | 12px | Space-4 |
| Metadata items | 8px | Space-3 |

---

## States

| State | Visual Change | Duration |
|-------|--------------|----------|
| Default | Surface-1, Shadow-1, Border-Default | — |
| Hover (interactive) | Shadow-2, subtle lift | 200ms |
| Hover (non-interactive) | No change | — |
| Focus (interactive) | 2px focus ring (Primary-500) | 100ms |
| Active (interactive) | Scale 0.99, background tint | 50ms |
| Selected | Primary-50 background, Primary-500 left border | 200ms |
| Disabled | 0.4 opacity | Instant |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Card role | `article` for standalone cards, `group` for card collections |
| Heading | Card title uses `h2`-`h4` depending on hierarchy |
| Interactive cards | `tabindex="0"`, role `button`, keyboard activation |
| Expandable cards | `aria-expanded`, `aria-controls` on trigger |
| Selected state | `aria-selected="true"` for selectable cards |
| Focus indicator | Perimeter focus ring for interactive cards |
| Skip links | Cards as navigation targets should have skip-to |

---

## Responsive Behavior

| Breakpoint | Change |
|------------|--------|
| Mobile (<768px) | Single column grid. Card padding reduces to 16px. |
| Tablet (768-1023px) | 2-column grid. Standard padding. |
| Desktop (1024-1279px) | 3-column grid. Standard padding. |
| Wide (1280-1599px) | 3-4 column grid. Comfortable padding. |
| Ultra-wide (1600px+) | 4-column grid. Comfortable padding. |

---

## Future Expansion

- **Comparison card** — Side-by-side data for offer evaluation
- **Timeline card** — Event with date marker and vertical connector
- **Kanban card** — Compact card for board views with drag handles
- **Metric card collection** — Grouped stat cards with shared header
- **Pinned card** — Persistent card that stays at top of scrollable collection

---

## Related Components

- [Dashboard-Components.md](Dashboard-Components.md) — Dashboard/Stat cards extend Card patterns
- [AI-Components.md](AI-Components.md) — AI Card, Suggestion Card, Thinking Card extend Card patterns
- [Dialogs.md](Dialogs.md) — Cards expand into dialog content
- [Forms.md](Forms.md) — Forms embedded in card body
- [Charts.md](Charts.md) — Charts as card content (Analytics Card)
- [Loading.md](Loading.md) — Skeleton card loading pattern
- [EmptyStates.md](EmptyStates.md) — Empty state cards
