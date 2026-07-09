# Illustration Guidelines

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Brand-Constitution.md](../01-Constitution/Brand-Constitution.md), [Design-Principles.md](../01-Constitution/Design-Principles.md))

---

## Philosophy

Illustrations in MR:EGO are used sparingly and purposefully. They exist to **communicate concepts, not to decorate.** Every illustration has a job: explain an empty state, welcome a new user, or visualize a concept that text alone cannot convey.

The illustration style is **simple, geometric, and restrained** — consistent with the overall design language. Complex illustrations compete with content. MR:EGO illustrations support content.

---

## When to Use Illustrations

| Use Case | Example |
|----------|---------|
| Empty states | "No documents yet. Create your first document." |
| Onboarding | Welcome screen, feature introduction |
| Feature hero | Module landing pages |
| Success states | "Profile complete!" celebration |
| Error states (friendly) | "Page not found" (404) |

## When NOT to Use Illustrations

| Use Case | Reason |
|----------|--------|
| Page backgrounds | Creates visual noise, harms readability |
| Dashboard decoration | Distracts from data |
| Navigation | Icons are faster to recognize |
| Data visualization | Charts and graphs serve this purpose |
| Marketing banners | Product screenshots communicate better |
| Loading states | Skeleton screens are more useful |

---

## Illustration Style

| Property | Specification | Rationale |
|----------|---------------|-----------|
| Style | Geometric / Flat | Timeless, consistent with design language |
| Color | Primary palette + Neutral palette | No extraneous colors. Fits any surface. |
| Gradients | None | Flat colors only. Gradients date quickly. |
| Shadows | None | Illustrations are flat by design. |
| Line art | 1.5px stroke (matching icons) | Visual consistency with iconography |
| Human figures | Abstract / Simplified | No realistic human rendering. Avoids representation issues. |
| Backgrounds | Transparent (no background shape) | Illustrations sit on the page background. |

---

## Color Usage in Illustrations

| Color | Usage |
|-------|-------|
| Primary-500 / Primary-600 | Primary shape, accent element |
| Neutral-200 / Neutral-300 | Secondary shapes, supporting elements |
| Neutral-400 / Neutral-500 | Details, fine lines |
| Primary-100 / Primary-50 | Background fills when needed (rare) |
| Semantic colors | Only for state-related illustrations (success, warning, error) |

---

## Composition Rules

1. **Single focal point per illustration.** One main shape, one or two supporting shapes.
2. **Centered composition.** Illustrations are centered within their container.
3. **Maximum 3 colors per illustration.** Exceeding 3 colors creates visual noise.
4. **Maximum size:** 240px width for inline illustrations, 400px for full-page illustrations.
5. **Text never overlaps illustration.** Text and illustration are separate layout elements.
6. **Illustrations scale down on mobile** — reduce to 120px width for small screens.

---

## Human Representation

When illustrations include human figures (abstract only):

1. **Fully abstract / geometric shapes.** No facial features, no skin colors, no hair styles.
2. **Silhouette-style shapes** with one or two defining features (posture, object held).
3. **Gender-neutral by default.** Avoid gender-coded clothing or accessories.
4. **Neutral color** (Neutral-400 or Primary-200) — no skin tone representation.
5. **Single figure per illustration.** Multiple figures create complexity without benefit.

---

## Illustration File Requirements

- **SVG format** for all illustrations. Responsive by nature, small file size.
- **Vector paths only.** No embedded raster images.
- **Responsive viewBox** (0 0 100 100 scale for consistency).
- **Accessible alt text** describing the illustration concept, not the visual appearance.
- **`<title>` and `<desc>` tags** inside the SVG for screen reader support.

---

## What Illustration Does Not Include

- **No photography.** Photos create inconsistency and date quickly.
- **No 3D renders.** 3D does not match the flat design language.
- **No isometric illustrations.** Perspective creates cognitive load.
- **No branded mascots.** MR:EGO is a professional tool, not a consumer brand.
- **No animated illustrations.** Motion in illustrations is never necessary.
- **No data-driven illustrations.** Charts and graphs use the data visualization system.

---

*These Illustration Guidelines are permanent. All illustrations in DP-5+ pages follow these rules. Refer to [Color-System.md](Color-System.md) for color palette, [Iconography.md](Iconography.md) for icon consistency, and [Accessibility.md](Accessibility.md) for SVG accessibility requirements.*
