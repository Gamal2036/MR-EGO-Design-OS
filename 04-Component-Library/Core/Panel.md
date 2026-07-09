# Panel

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md))

---

## Purpose

Panel is a grouped content section with a distinct header, body, and footer area. It provides structural organization for related content within a page or within a Card. Panels can optionally display a border accent color to indicate semantic context or section type.

---

## Responsibilities

- Group related content into a visually distinct section with header, body, and footer slots
- Render an optional border accent (left, top, or full) with semantic or module color
- Display a header with title, optional icon, and optional actions
- Display a body with the primary content
- Display an optional footer with supplementary content or actions
- Provide consistent padding and spacing across slots

---

## Composition

```
Panel
├── Panel.Header (optional)
│   ├── Icon (optional, left of title)
│   ├── Title (required within header)
│   ├── Subtitle (optional, below title)
│   ├── Description (optional, small text below subtitle)
│   └── Actions (optional, right side — IconButton, Badge, Dropdown)
├── Panel.Body (required)
│   └── Content (text, form fields, charts, tables)
└── Panel.Footer (optional)
    ├── Divider (optional, between body and footer)
    ├── Button(s)
    ├── Metadata
    └── Link(s)
```

Panel uses:
- `Surface` — base layer styling
- `Divider` — separator between header/body and body/footer

---

## Hierarchy

**Level:** 2 (Core Composite)

**Parent:** None (consumed directly by pages, card bodies, dialog bodies)

**Children:**
- `Surface` (Level 1) — base visual surface
- `Divider` (Level 1) — slot separators
- `Icon` (Level 0, optional) — header icon
- `Button` (Level 2, optional) — footer actions
- `IconButton` (Level 2, optional) — header actions
- `Badge` (Level 1, optional) — header status indicator
- `Tag` (Level 1, optional) — header/footer metadata

**Sub-components (named slots):** `Panel.Header`, `Panel.Body`, `Panel.Footer`

---

## Props Contract

```typescript
/**
 * Border accent position for semantic or module highlighting.
 * - none: No accent border
 * - left: 3px solid accent on left edge
 * - top: 3px solid accent on top edge
 * - full: Accent border on all edges (1px)
 */
type PanelAccent = 'none' | 'left' | 'top' | 'full';

interface PanelProps {
  /** Border accent position. @default 'none' */
  accent?: PanelAccent;
  /** Accent color token. Uses semantic or module colors. @default 'primary' */
  accentColor?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | string;
  /** Whether the panel is elevated with shadow. @default false */
  isElevated?: boolean;
  /** Whether the panel takes full width. @default true */
  fullWidth?: boolean;
  /** Whether the panel body has no padding (for custom layouts). @default false */
  noPadding?: boolean;
  /** Additional class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
  /** Data test ID for automated testing. */
  dataTestId?: string;
  /** Ref forwarded to the root element. */
  ref?: React.Ref<HTMLDivElement>;
}

interface PanelHeaderProps {
  /** Header title text or element. */
  children?: React.ReactNode;
  /** Icon before the title. */
  icon?: React.ReactNode;
  /** Subtitle text below title. */
  subtitle?: string;
  /** Description text below subtitle (caption size). */
  description?: string;
  /** Actions rendered on the right side of the header. */
  actions?: React.ReactNode;
  /** Whether to show a divider below the header. @default false */
  hasDivider?: boolean;
  /** Additional class names. */
  className?: string;
}

interface PanelBodyProps {
  /** Body content. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
}

interface PanelFooterProps {
  /** Footer content. */
  children: React.ReactNode;
  /** Whether to show a divider above the footer. @default true */
  hasDivider?: boolean;
  /** Footer alignment. @default 'left' */
  align?: 'left' | 'center' | 'right' | 'space-between';
  /** Additional class names. */
  className?: string;
}
```

---

## Variants

Panel has no visual variants (unlike Card). All styling is determined by accent and elevation props.

### Accent: None
Standard panel with no accent decoration.

| Property | Value |
|----------|-------|
| Background | Surface-1 |
| Border | Border-Default (1px solid) |
| Border Radius | Radius-Md (8px) |
| Shadow | None (or Layer 1 if elevated) |

### Accent: Left
3px solid accent stripe on the left edge.

| Property | Value |
|----------|-------|
| Accent | 3px solid, left edge, `accentColor` value |
| Container | Standard panel (same as none) |
| Usage | Section status indication, module differentiation |

### Accent: Top
3px solid accent stripe on the top edge.

| Property | Value |
|----------|-------|
| Accent | 3px solid, top edge, `accentColor` value |
| Container | Standard panel (same as none) |
| Usage | Page section headers, wizard steps |

### Accent: Full
Colored border on all edges.

| Property | Value |
|----------|-------|
| Accent | 1px solid on all edges, `accentColor` value |
| Container | Standard panel |
| Usage | Highlighted sections, active state |

---

## Sizes

| Slot | Padding | Spacing |
|------|---------|---------|
| Header | 16px 24px (top/sides), 12px bottom if divider, 16px bottom if no divider | Space-5 horizontal, Space-4 vertical |
| Body | 24px (all sides) | Space-7 |
| Footer | 16px 24px (bottom/sides), 12px top | Space-5 horizontal, Space-4 vertical |
| Between slots | 1px Divider | Border width |

---

## States

Panel has no interaction states. It is a static structural container.

| State | Behavior |
|-------|----------|
| Default | Renders per configuration |
| Any interaction | No change — Panel does not respond to interaction |

Interactive behavior (expand/collapse, switching tabs within panel) is managed by parent components or embedded interactive children.

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Element | `<section>` or `<div>` with `role="region"` |
| ARIA label | `aria-labelledby` linking to Panel.Header title |
| Header | `<header>` or `div` with heading role |
| Body | No semantic role required |
| Footer | `<footer>` or `div` with no special role |
| Accent colors | Color alone must not convey meaning — supplement with text/icon |

Panel uses `role="region"` with `aria-labelledby` pointing to the header title element for screen reader navigation.

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Full width. Compact padding (header: 12px 16px, body: 16px). Footer actions stack vertically. |
| Tablet (768-1023px) | Full width within grid. Standard padding. Footer actions inline. |
| Desktop (1024px+) | Standard sizing. May be constrained by grid column. |
| Wide (1280px+) | Standard sizing. |
| Ultra-wide (1600px+) | Standard sizing. |

---

## Animation Rules

Panel has no animations on itself. Footer divider appears/disappears with `hasDivider` prop — no transition needed.

If Panel is used in an expandable context, expand/collapse animation follows:
- Expand: 300ms, Ease-Out, max-height + opacity
- Collapse: 200ms, Ease-In, max-height + opacity

---

## Future Expansion

- **Collapsible Panel** — Built-in expand/collapse toggle on header
- **Tabbed Panel** — Panel.Header includes tab navigation switching Panel.Body content
- **Step Panel** — Panel with step indicator for wizard workflows
- **Scrollable Panel Body** — `maxHeight` prop with scroll for long content
- **Panel stack** — Multiple panels stacked with parallel accent colors for multi-section pages

---

## Dependencies

| Dependency | Type | Usage |
|------------|------|-------|
| Surface | Internal (Level 1) | Base visual surface layer |
| Divider | Internal (Level 1) | Slot separators |
| Design Tokens | External (DP-1) | All visual properties |

---

## Related Components

- [Card.md](Card.md) — Alternative content container with more variants
- [Surface.md](Surface.md) — Base surface layer used by Panel
- [Divider.md](Divider.md) — Separator between slots
- [Section.md](../Layout/Section.md) — Page-level content grouping
- [Container.md](Container.md) — Width constraint wrapper

---

## Anti-patterns

1. **Nesting Panels without need** — Prefer a single Panel with clear internal hierarchy.
2. **Using Panel for non-grouped content** — Panel is for grouped, related content. Use Surface or Container for simple wrappers.
3. **More than one accent color per panel** — Single accent per panel. For multiple statuses, use Badge or Tag.
4. **Empty Panel** — Panel must have content (at least Panel.Body). Use EmptyState for no-data scenarios.
5. **Forms spanning multiple Panels without connection** — Related form fields belong in one Panel; use Section grouping for separation.
6. **Panel inside Panel** — Use Panel for sections within a page. Do not nest Panel inside Panel. Use Card for inner grouping if needed.

---

## Performance Notes

- Panel renders as a `<section>` with three optional slot children
- No state, effects, or event listeners in the base component
- Accent color is applied via CSS custom property for efficient theme switching
- Divider is a single `<hr>` or `div` element — minimal DOM impact
- Slot components (Header, Body, Footer) are conditionally rendered — no empty wrapper elements
- Panel is a good candidate for `React.memo` when content does not change
- Accent rendering uses a pseudo-element (::before) to avoid extra DOM nodes
