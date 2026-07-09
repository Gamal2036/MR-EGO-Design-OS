# Color Workspace

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md))

---

## Definition

Color Workspace defines how color is applied across different workspace contexts. Each workspace type has a specific color profile that supports its purpose.

---

## Workspace Color Profiles

### Dashboard

| Color | Usage | Coverage |
|-------|-------|----------|
| Neutrals | Backgrounds, cards, text | ~85% |
| Primary | Accents, interactive elements, active states | ~10% |
| Semantic | Status indicators, metric trends | ~5% |

Emotion: Calm, productive, overview

### Career

| Color | Usage | Coverage |
|-------|-------|----------|
| Neutrals | Backgrounds, content | ~80% |
| Primary | Action buttons, progress indicators | ~12% |
| Green | Milestones, achievements, progress | ~5% |
| Amber | Opportunities requiring attention | ~3% |

Emotion: Forward-looking, growth-oriented

### Documents

| Color | Usage | Coverage |
|-------|-------|----------|
| Neutrals | Document content, backgrounds | ~90% |
| Primary | Editing controls, AI suggestions | ~8% |
| Semantic | Document status (draft, review, complete) | ~2% |

Emotion: Focused, editorial, clean

### Analytics

| Color | Usage | Coverage |
|-------|-------|----------|
| Neutrals | Axes, labels, backgrounds | ~75% |
| Primary | Primary data series | ~10% |
| Semantic | Trend indicators, thresholds | ~10% |
| Chart palette | Data visualization colors | ~5% |

Emotion: Analytical, data-driven, precise

### Settings

| Color | Usage | Coverage |
|-------|-------|----------|
| Neutrals | Backgrounds, form controls | ~90% |
| Primary | Interactive controls, toggles | ~8% |
| Semantic | Status indicators | ~2% |

Emotion: Organized, transparent, controllable

---

## Workspace Color Rules

1. **Each workspace type has a defined color profile.** No arbitrary color distribution.
2. **Primary coverage varies by workspace type** but never exceeds 15%.
3. **Semantic colors are workspace-specific** — Analytics uses more semantic colors than Documents.
4. **Workspace color profiles are guidelines, not rigid rules.** Content may shift distribution slightly.
5. **Module-specific workspaces define their own color profiles** following these patterns.

---

## Future Workspace Colors

Future modules define their color profile following this template:

| Module | Primary Coverage | Semantic Usage | Emotional Goal |
|--------|-----------------|---------------|----------------|
| Learning | 8-10% | Green for progress, amber for gaps | Growth, curiosity |
| CRM | 10-12% | Green for connections, amber for follow-ups | Relationship, opportunity |
| Projects | 8-10% | Green for milestones, red for blockers | Progress, momentum |
| Marketplace | 10-12% | Green for transactions, amber for reviews | Trust, exchange |

---

*This Color Workspace specification is permanent. All workspace types follow these color profiles. Refer to [Color-Emotion.md](Color-Emotion.md) for color emotion system, [AI-Colors.md](AI-Colors.md) for AI color specifications, and [Color-System.md](../../02-Design-Language/Color-System.md) for color values.*
