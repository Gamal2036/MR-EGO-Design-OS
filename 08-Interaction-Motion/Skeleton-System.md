# Skeleton System

**Phase:** DP-8 (Interaction & Motion System)
**Design Authority:** DP-1 ([Loading-System.md](../02-Design-Language/Loading-System.md)), DP-2 ([Components/Loading.md](../03-Design-System/Components/Loading.md))
**Inherits:** Skeleton specifications from DP-1 and DP-2

---

## Skeleton Philosophy

Skeletons mirror the final layout exactly using neutral, animated placeholders. They reduce perceived wait time by showing content structure before content arrives. The user's eye previews where content will be, making the actual load feel faster.

---

## Skeleton Technical Specifications

| Property | Specification |
|----------|---------------|
| Shape | Rounded rectangles matching final content |
| Border radius | 4px (matches component border-radius) |
| Color (light) | Neutral-200 |
| Color (dark) | Neutral-300 |
| Animation | Pulse opacity 1.0 → 0.5 → 1.0 |
| Loop duration | 1500ms |
| Easing | Ease-In-Out |
| Z-index | Same as content (no elevation) |
| Shadows | None — skeletons are pure background shapes |
| Borders | None — skeletons have no borders |
| Gap | Same as final component spacing |

---

## Skeleton Types by Component

### Card Skeleton

```
┌──────────────────────────────┐
│  ┌────┐                      │
│  │    │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  ← Avatar (circle 40px) + title line (60%)
│  │    │                      │
│  └────┘  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  ← Body line 1 (100%)
│           ▓▓▓▓▓▓▓▓▓▓▓▓      │  ← Body line 2 (80%)
│           ▓▓▓▓▓▓▓▓          │  ← Body line 3 (60%)
└──────────────────────────────┘
| Height: matches final card height
```

### Stat Card Skeleton

```
┌────────────────────┐
│  ▓▓▓▓▓▓            │  ← Label line (30%)
│                    │
│  ▓▓▓▓▓▓▓▓▓▓▓      │  ← Value line (50%)
│                    │
│  ▓▓▓▓              │  ← Trend line (20%)
└────────────────────┘
| Height: 100px minimum
```

### Table Skeleton

```
┌─────────────────────────────────────┐
│  ▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓  ▓▓▓▓▓ │  ← Header row (100%)
├─────────────────────────────────────┤
│  ▓▓▓▓▓    ▓▓▓▓▓▓▓▓▓▓  ▓▓▓    ▓▓▓▓▓ │  ← Data row 1
│  ▓▓▓      ▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓  ▓▓▓   │  ← Data row 2
│  ▓▓▓▓▓▓   ▓▓▓▓▓       ▓▓▓    ▓▓▓▓▓ │  ← Data row 3
│  ▓▓▓      ▓▓▓▓▓▓▓▓    ▓▓▓▓▓  ▓▓▓   │  ← Data row 4
└─────────────────────────────────────┘
| Row height: 48px
| Column widths: match final table column widths
```

### List Skeleton

```
┌────────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  ← Item 1 (90%)
├────────────────────────────────────┤
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓         │  ← Item 2 (70%)
├────────────────────────────────────┤
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  ← Item 3 (90%)
├────────────────────────────────────┤
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓           │  ← Item 4 (65%)
└────────────────────────────────────┘
| Item height: 48px
| Separator: 1px spacer
```

### Form Skeleton

```
┌────────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓                   │  ← Label (40%)
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  ← Input (95%)
│                                    │
│  ▓▓▓▓▓▓▓▓                          │  ← Label (25%)
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  ← Input (95%)
│                                    │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓           │  ← Hint text (65%)
│                                    │
│  ┌──────────────────────────────┐  │
│  │                            ▓▓│  │  ← Button (skeleton button)
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
| Input height: 44px
| Button height: 44px
```

### Chart Skeleton

```
┌────────────────────────────────────┐
│                                    │
│   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    │  ← Chart area (rectangular)
│   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    │
│   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    │
│   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    │
│                                    │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓             │  ← X-axis label
└────────────────────────────────────┘
| Chart area height: 200px
| Grid lines: represented by subtle separator lines
```

### Text Skeleton

```
┌────────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  ← Heading (90%)
│                                    │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  ← Paragraph line 1 (100%)
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  ← Paragraph line 2 (100%)
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓         │  ← Paragraph line 3 (70%)
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  ← Paragraph line 4 (100%)
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     │  ← Paragraph line 5 (80%)
└────────────────────────────────────┘
```

### Image Skeleton

```
┌────────────────────────────────────┐
│                                    │
│            ┌──────────┐            │
│            │  ▓▓▓▓▓▓  │            │  ← Image icon (centered)
│            │  ▓▓▓▓▓▓  │            │
│            └──────────┘            │
│                                    │
└────────────────────────────────────┘
| Aspect ratio: 16:9 or 4:3 matching final image
| Icon: Image placeholder icon in center
```

### Avatar Skeleton

```
┌────────────────────────────────────┐
│                                    │
│           ▓▓▓▓▓▓▓▓▓▓▓▓            │  ← Circle (40px, 48px, or 64px)
│           ▓▓▓▓▓▓▓▓▓▓▓▓            │
│           ▓▓▓▓▓▓▓▓▓▓▓▓            │
│                                    │
└────────────────────────────────────┘
| Shape: Circle
| Sizes: 40px (default), 48px (large), 64px (x-large)
```

### Sidebar Item Skeleton

```
┌────────────────────────────────────┐
│  ┌────┐  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     │  ← Icon (24px) + label (70%)
├────────────────────────────────────┤
│  ┌────┐  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  ← Icon + label (80%)
├────────────────────────────────────┤
│  ┌────┐  ▓▓▓▓▓▓▓▓▓▓▓▓▓          │  ← Icon + label (50%)
└────────────────────────────────────┘
| Item height: 44px
```

---

## Skeleton by Context

| Context | Skeleton Type | Number of Lines |
|---------|--------------|-----------------|
| Dashboard | Card + Stat + Chart | 3 cards, 1 chart |
| Job Search | Card (list) | 10 items |
| Job Detail | Text + Section | 4 sections |
| Application Form | Form | 6 fields |
| CV Analysis | Card + Chart | 4 cards, 2 charts |
| Profile | Text + Avatar | Avatar + 3 sections |
| Settings | Form | 4 sections |
| AI Workspace | Text + AI | 1 thinking + 2 responses |
| Notifications | List | 5 items |
| Documents | List + Grid | 8 items |
| Messaging | List | 7 messages |
| Help Center | Text + Card | 6 cards |
| Table | Table rows | 8 rows |

---

## Skeleton Animation

| Animation | Specification |
|-----------|---------------|
| Type | Opacity pulse (shimmer sweep preferred) |
| Pulse range | Opacity 1.0 → 0.5 → 1.0 |
| Shimmer sweep | Linear gradient sweep left→right |
| Duration | 1500ms (full loop) |
| Easing | Ease-In-Out |
| Stagger delay | Skeletons within same group stagger by 100ms |

### Shimmer Effect

The shimmer is a subtle linear gradient that sweeps across skeleton elements:

| Property | Value |
|----------|-------|
| Gradient | Neutral-200 → Neutral-100 → Neutral-200 (light theme) |
| Gradient | Neutral-300 → Neutral-200 → Neutral-300 (dark theme) |
| Direction | Top-left to bottom-right diagonal |
| Sweep duration | 1500ms |
| Coverage | Rectangle covering skeleton element |

---

## Skeleton Exit Animation

| Phase | Duration | Easing |
|-------|----------|--------|
| Content start appearing | 200ms after data available | — |
| Skeleton → content transition | Cross-fade | 200ms | 
| Ease-Out | | |
| Stagger reveal | 50ms between items | — |

---

## Skeleton Rules

1. Skeleton screens match final layout **pixel-for-pixel** — no surprises on load
2. Skeletons are **purely background shapes** — no borders, shadows, or elevation
3. Skeletons use `aria-hidden="true"` — only final content is announced
4. Multiple skeletons in a group **stagger their appearance** by 100ms
5. Skeleton height **matches final component height** exactly
6. Skeleton width varies per line — mimics text length variation
7. Skeletons **never appear for content expected in <100ms**
8. Skeletons **transition to content with a brief cross-fade** (200ms)
9. Skeleton color **contrasts sufficiently from background** but is never prominent

---

*This Skeleton System provides component-level skeleton specifications. Refer to [Loading-System.md](Loading-System.md) for loading patterns and timing, [Feedback-System.md](Feedback-System.md) for feedback after loading, and [Accessibility-Motion.md](Accessibility-Motion.md) for reduced motion alternatives.*
