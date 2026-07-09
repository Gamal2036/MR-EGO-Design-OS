# Container

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md)), DP-1 ([Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Responsive-System.md](../../02-Design-Language/Responsive-System.md))

---

## Purpose

Container constrains the maximum width of its content to maintain readable line lengths and consistent layout proportions across breakpoints. It is the fundamental layout width constraint for every page-level content structure in MR:EGO.

---

## Responsibilities

- Constrain maximum content width to a defined breakpoint size
- Center content horizontally with auto margins
- Apply responsive horizontal padding
- Provide no visual surface, borders, shadows, or backgrounds
- Pass through all children without modification

---

## Composition

```
Container (single DOM element)
├── children (arbitrary content)
└── (no sub-components)
```

Container does not use any sub-components. It is a single-element width constraint wrapper.

---

## Hierarchy

**Level:** 1 (Core Primitive)

**Parent:** None (consumed directly by pages, sections, and layout components)

**Children:** None (Container wraps arbitrary content without rendering sub-components)

**Siblings:** `Surface`, `Divider`, `Avatar`, `Badge`, `Chip`, `Tag`, `Tooltip`

---

## Props Contract

```typescript
/**
 * Container max-width variant.
 * - sm:  640px — Narrow content (reading, single column forms)
 * - md:  768px — Default content (standard pages)
 * - lg: 1024px — Wide content (dashboard sections, tables)
 * - xl: 1280px — Extra wide (data-heavy pages, analytics)
 * - full: 100% — No max-width constraint (edge-to-edge)
 */
type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ContainerProps {
  /** Max-width variant. @default 'lg' */
  size?: ContainerSize;
  /** Whether to center the container horizontally. @default true */
  centered?: boolean;
  /** Whether to apply horizontal page padding. @default true */
  withPadding?: boolean;
  /** Horizontal padding override. Uses responsive page padding by default. */
  padding?: string | number;
  /** Content children. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
  /** Data test ID for automated testing. */
  dataTestId?: string;
  /** Ref forwarded to the root element. */
  ref?: React.Ref<HTMLDivElement>;
}
```

---

## Variants

### SM (640px)
For narrow content that benefits from short line lengths.

| Property | Value |
|----------|-------|
| Max Width | 640px |
| Use Case | Reading content, single-column forms, authentication pages |

### MD (768px)
Default content container for standard pages.

| Property | Value |
|----------|-------|
| Max Width | 768px |
| Use Case | Standard content pages, settings, profile pages |

### LG (1024px)
Wide content container for dashboards and data display.

| Property | Value |
|----------|-------|
| Max Width | 1024px |
| Use Case | Dashboard sections, table-based pages, document editors |

### XL (1280px)
Extra-wide container for data-heavy pages.

| Property | Value |
|----------|-------|
| Max Width | 1280px |
| Use Case | Analytics dashboards, data grids, workspace layouts |

### Full (100%)
No maximum width constraint. Edge-to-edge content.

| Property | Value |
|----------|-------|
| Max Width | 100% |
| Use Case | Hero sections, full-width banners, navigation bars |

---

## States

Container has no states. It is a static width constraint wrapper with no interaction, animation, or conditional rendering.

| State | Behavior |
|-------|----------|
| Default | Always renders at the specified max-width with padding |
| Any interaction | No change |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Element | `<div>` — non-semantic container |
| Role | No role (presentational) |
| ARIA | None — Container does not convey meaning |
| Reading | Container width must not exceed 80ch (optimal line length) at `sm` size for readability |

Container is transparent to accessibility tools. It provides width constraint only.

---

## Responsive Rules

| Breakpoint | Container Padding | Notes |
|------------|------------------|-------|
| Mobile (<768px) | 16px (Space-5) left + right | All sizes behave the same — max-width is ignored if smaller than viewport |
| Tablet (768-1023px) | 24px (Space-7) left + right | SM and MD containers at full width; LG/XL constrained |
| Desktop (1024-1279px) | 32px (Space-8) left + right | All containers constrain to their max-width |
| Wide (1280-1599px) | 32px (Space-8) left + right | All containers constrain to their max-width |
| Ultra-wide (1600px+) | 32px (Space-8) left + right | All containers constrain to their max-width |

On mobile, all container sizes expand to fill the viewport (minus padding). The `size` prop only takes effect when the viewport exceeds the container's max-width.

---

## Animation Rules

Container has no animations. It is a static layout constraint.

---

## Future Expansion

- **Container with background** — Optional background color for page sections (use Section instead)
- **Nested containers** — Inner container with smaller max-width within a larger one
- **Container query support** — CSS container queries for child component responsiveness

---

## Dependencies

| Dependency | Type | Usage |
|------------|------|-------|
| Design Tokens | External (DP-1) | Width values, spacing tokens |

Container has zero internal component dependencies.

---

## Related Components

- [Section.md](../Layout/Section.md) — Page section that may contain Container
- [ContentArea.md](../Layout/ContentArea.md) — Main content region using Container
- [Grid.md](../Layout/Grid.md) — Column layout within Container
- [HeroContainer.md](../Layout/HeroContainer.md) — Full-width hero with Container inside

---

## Anti-patterns

1. **Using Container as a visual surface** — Container has no background, border, or shadow. Use Surface or Panel for visual containers.
2. **Nesting Containers** — A Container should not be placed inside another Container. Use one Container per page content area.
3. **Overriding max-width with CSS** — Use the `size` prop. Do not override via className or style.
4. **Removing padding on mobile** — Padding ensures content does not touch viewport edges. Removing it is forbidden.
5. **Using `full` for page content** — Full width is for edge-to-edge sections (hero, nav). Page content must use a constrained size.
6. **Container inside Container** — This creates unnecessary DOM nesting. Use a single Container at the page layout level.

---

## Performance Notes

- Single `<div>` DOM node — absolute minimum footprint
- No event listeners, state, or effects — zero runtime overhead
- Max-width, margin, and padding use CSS properties — no JavaScript calculations
- `withPadding` prop maps to predefined padding classes — no inline style generation
- Ideal candidate for `React.memo` — no props changes expected after mount
- Container width is purely CSS-driven — no resize observer or media query listeners in JS
