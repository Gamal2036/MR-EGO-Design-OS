# Surface

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md))

---

## Purpose

Surface is the base visual layer primitive. It provides the background, border, shadow, and corner radius for every container component in MR:EGO. Surface has no interaction states — it is a pure presentation layer. Components like Card, Panel, Dialog, and Dropdown compose Surface internally.

---

## Responsibilities

- Render a background-colored container using surface tokens (Surface-1, Surface-2, Surface-3)
- Apply optional border, border radius, and shadow tokens
- Provide no interaction states (no hover, focus, active, or disabled)
- Remain purely presentational — no event handlers, no ARIA attributes
- Serve as the base building block for all composite containers

---

## Composition

```
Surface (single DOM element)
├── children (arbitrary content)
└── (no sub-components)
```

Surface does not use any sub-components. It is a single-element wrapper.

---

## Hierarchy

**Level:** 1 (Core Primitive)

**Parent:** None (consumed by Card, Panel, Dialog, Dropdown, Sidebar, Topbar, etc.)

**Children:** None (Surface does not render sub-components — it wraps children)

**Siblings:** `Divider`, `Avatar`, `Badge`, `Chip`, `Tag`, `Tooltip`, `Container`

---

## Props Contract

```typescript
/**
 * Surface layer variant determining background elevation.
 * - surface-1: Base surface (white in light, Neutral-100 in dark). Default card surface.
 * - surface-2: Secondary surface (Neutral-100 in light, Neutral-200 in dark). Sidebar, secondary containers.
 * - surface-3: Tertiary surface (Neutral-200 in light, Neutral-300 in dark). Raised elements, dropdowns.
 */
type SurfaceVariant = 'surface-1' | 'surface-2' | 'surface-3';

interface SurfaceProps {
  /** Surface layer variant. @default 'surface-1' */
  variant?: SurfaceVariant;
  /** Whether to render a border around the surface. @default true */
  hasBorder?: boolean;
  /** Border radius token. @default 'md' */
  radius?: 'none' | 'sm' | 'md' | 'lg';
  /** Shadow layer token. @default 'none' */
  shadow?: 'none' | 'layer-1' | 'layer-2' | 'layer-3';
  /** Padding override. If not set, Surface has no padding (padding comes from parent component). */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Background color override. Uses surface variant by default. Only for exceptional cases. */
  backgroundColor?: string;
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

### Surface-1 (Base)
Default card/sheet surface. Most common variant.

| Property | Light | Dark |
|----------|-------|------|
| Background | White (#FFFFFF) | Neutral-100 (#1E293B) |
| Border | Border-Default (Neutral-300, #CBD5E1) | Border-Default (Neutral-300, #475569) |
| Border Radius | Radius-Md (8px) | Radius-Md (8px) |
| Shadow (default) | None | None |

### Surface-2 (Secondary)
Elevated surface for secondary containers like sidebar panels.

| Property | Light | Dark |
|----------|-------|------|
| Background | Neutral-100 (#F1F5F9) | Neutral-200 (#334155) |
| Border | Border-Default (Neutral-300) | Border-Default (Neutral-300) |
| Border Radius | Radius-Md (8px) | Radius-Md (8px) |
| Shadow (default) | None | None |

### Surface-3 (Tertiary)
Highest base surface layer for raised elements like dropdowns.

| Property | Light | Dark |
|----------|-------|------|
| Background | Neutral-200 (#E2E8F0) | Neutral-300 (#475569) |
| Border | Border-Default (Neutral-300) | Border-Default (Neutral-300) |
| Border Radius | Radius-Md (8px) | Radius-Md (8px) |
| Shadow (default) | Layer 1 | Layer 1 |

---

## States

Surface has no interaction states. It is a pure presentational layer.

| State | Behavior |
|-------|----------|
| Default | Renders per variant configuration |
| Any interaction | No change — Surface does not respond to hover, focus, or active |

Surface passes through all DOM events to the parent container. Parent components (Card, Panel) are responsible for interaction states.

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Element | `<div>` — non-semantic container |
| Role | No role (presentational) |
| ARIA | None — Surface does not convey meaning |
| Background | Must maintain contrast with content by using correct surface variant |

Surface is transparent to accessibility tools. It provides the visual layer only. All ARIA attributes, roles, and semantics come from the parent component (Card, Panel, Dialog).

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Full width by default. Padding set to compact (Space-5) if padding prop is used. |
| Tablet (768-1023px) | Standard sizing. Padding Space-7 if padding prop is used. |
| Desktop (1024px+) | Standard sizing. |
| Wide (1280px+) | Standard sizing. |
| Ultra-wide (1600px+) | Standard sizing. |

Surface itself has no responsive rules — it fills its parent container. Responsive behavior is managed by the consuming component.

---

## Animation Rules

Surface has no animations. It is a static layer. All animations on composite components (Card hover shadow, Panel slide) are managed by those components, not by Surface.

---

## Future Expansion

- **Interactive Surface** — Future hover/click surface for base-level interactivity (currently handled by parent components)
- **Glass surface variant** — Backdrop blur surface for overlays (see DP-1 Glass-System)
- **Gradient surface** — Subtle gradient background for hero or brand sections (use with caution)

---

## Dependencies

| Dependency | Type | Usage |
|------------|------|-------|
| Design Tokens | External (DP-1) | All visual properties (background, border, shadow, radius) |

Surface has zero internal component dependencies. It is a pure HTML element with CSS tokens.

---

## Related Components

- [Card.md](Card.md) — Content container that composes Surface
- [Panel.md](Panel.md) — Grouped section that composes Surface
- [Dialog.md](../Feedback/Dialog.md) — Modal dialog that composes Surface
- [Dropdown.md](../Navigation/Dropdown.md) — Menu that uses Surface-3
- [Sidebar.md](../Navigation/Sidebar.md) — Navigation sidebar using Surface-2
- [Topbar.md](../Navigation/Topbar.md) — Header bar using Surface-1

---

## Anti-patterns

1. **Adding event handlers to Surface** — Surface is presentational. Add interaction to the parent component.
2. **Using Surface as a layout container directly** — Use Container, Panel, or Card for content grouping.
3. **Stacking more than 3 Surface layers** — Surface-3 is the maximum. Beyond that creates visual noise.
4. **Changing surface background per theme** — Surface tokens are theme-aware. Use variants, not custom colors.
5. **Applying ARIA attributes to Surface** — Semantics belong on the composite container.
6. **Animating Surface properties** — Do not animate background-color, shadow, or border on Surface.
7. **Using Surface for page background** — Page background uses Surface-0 (Neutral-50), not Surface-1/2/3.

---

## Performance Notes

- Single `<div>` DOM node — minimal footprint
- No event listeners, no state, no effects — zero runtime cost beyond rendering
- Style computation uses CSS custom properties — efficient re-rendering
- No animation or transition properties declared
- Ideal candidate for `React.memo` since it has no state and rarely changes
- Background, border, shadow, and radius are set via CSS class — no inline styles
- Padding prop maps to predefined CSS classes — avoids inline style objects
