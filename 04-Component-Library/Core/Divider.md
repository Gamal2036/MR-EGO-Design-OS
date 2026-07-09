# Divider

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md))

---

## Purpose

Divider is a visual separator that creates clear visual distinction between content sections. It can be rendered horizontally (between stacked elements) or vertically (between inline elements), with optional label text centered in the divider.

---

## Responsibilities

- Render a thin horizontal or vertical line to visually separate content groups
- Provide three line strengths/colors: light, default, strong
- Support optional centered label text within the divider
- Maintain proper spacing around the divider based on spacing tokens
- Remain non-interactive and purely presentational

---

## Composition

```
Divider (horizontal with label)
├── Line (left segment)
├── Label (optional, centered)
└── Line (right segment)

Divider (horizontal without label)
└── Line (full width)

Divider (vertical)
└── Line (full height)
```

Divider does not use any sub-components. It is a single or multi-element inline rendering.

---

## Hierarchy

**Level:** 1 (Core Primitive)

**Parent:** None (consumed by Panel, Card, Section, Stack, FormGroup, and page layouts)

**Children:** None

**Siblings:** `Surface`, `Container`, `Avatar`, `Badge`, `Chip`, `Tag`, `Tooltip`

---

## Props Contract

```typescript
/**
 * Divider orientation.
 */
type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Divider visual strength variant.
 * - light: Subtle separation (Neutral-200/Neutral-400). For closely related content.
 * - default: Standard separation (Neutral-300/Neutral-500). Standard sections.
 * - strong: Emphasized separation (Neutral-400/Neutral-600). Major section breaks.
 */
type DividerVariant = 'light' | 'default' | 'strong';

interface DividerProps {
  /** Orientation. @default 'horizontal' */
  orientation?: DividerOrientation;
  /** Visual strength variant. @default 'default' */
  variant?: DividerVariant;
  /** Label text displayed in the center of a horizontal divider. */
  children?: React.ReactNode;
  /** Label position. @default 'center' */
  labelPosition?: 'left' | 'center' | 'right';
  /** Whether the divider spans full width/height of container. @default true */
  fullWidth?: boolean;
  /** Spacing above and below the divider. @default 'md' */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /** Additional class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
  /** Data test ID for automated testing. */
  dataTestId?: string;
  /** Ref forwarded to the root element. */
  ref?: React.Ref<HTMLHRElement | HTMLDivElement>;
}
```

---

## Variants

### Light
Subtle visual separation for closely related content.

| Property | Light Theme | Dark Theme |
|----------|-------------|------------|
| Line Color | Neutral-200 (#E2E8F0) | Neutral-400 (#64748B) |
| Line Thickness | 1px | 1px |
| Label Color | Text-Tertiary | Text-Tertiary |
| Label Size | Caption (13px) | Caption (13px) |

### Default
Standard separation for distinct content sections.

| Property | Light Theme | Dark Theme |
|----------|-------------|------------|
| Line Color | Neutral-300 (#CBD5E1) | Neutral-500 (#94A3B8) |
| Line Thickness | 1px | 1px |
| Label Color | Text-Secondary | Text-Secondary |
| Label Size | Caption (13px) | Caption (13px) |

### Strong
Emphasized separation for major section breaks.

| Property | Light Theme | Dark Theme |
|----------|-------------|------------|
| Line Color | Neutral-400 (#94A3B8) | Neutral-600 (#CBD5E1) |
| Line Thickness | 1px | 1px |
| Label Color | Text-Secondary | Text-Secondary |
| Label Weight | Semibold | Semibold |

---

## Spacing

| Spacing | Vertical Margin | Horizontal Margin |
|---------|----------------|-------------------|
| None | 0 | 0 |
| SM | 8px (Space-3) | 8px (Space-3) |
| MD (default) | 16px (Space-5) | 16px (Space-5) |
| LG | 24px (Space-7) | 24px (Space-7) |

---

## States

Divider has no states. It is a non-interactive, purely presentational element.

| State | Behavior |
|-------|----------|
| Default | Always renders at the specified variant and orientation |
| Any interaction | No change |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Element | `<hr>` for horizontal, `<div role="separator">` for vertical |
| Role | `separator` |
| ARIA orientation | Implicit for `<hr>`, explicit `aria-orientation` for vertical |
| Label | When children (label text) present, `aria-label` or `aria-labelledby` not needed — label text is visible |
| Decorative | When no label, `aria-hidden="true"` can be applied for screen reader brevity |

Vertical dividers use `role="separator"` with `aria-orientation="vertical"` to ensure proper accessibility support across browsers.

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Full width horizontal. Vertical dividers hidden in stacked layouts. |
| Tablet (768-1023px) | Full width or natural size. Vertical dividers visible in inline layouts. |
| Desktop (1024px+) | Standard sizing. |
| Wide (1280px+) | Standard sizing. |
| Ultra-wide (1600px+) | Standard sizing. |

Vertical dividers should be hidden on mobile where layout elements stack vertically (no inline context).

---

## Animation Rules

Divider has no animations. It is a static visual element.

---

## Future Expansion

- **Dashed divider** — Dashed border style for draft or temporary sections
- **Icon divider** — Icon in place of label text (e.g., star, arrow)
- **Interactive divider** — Resizable divider for split panes (use ResizablePanel instead)

---

## Dependencies

| Dependency | Type | Usage |
|------------|------|-------|
| Design Tokens | External (DP-1) | Border colors, spacing tokens, typography |

Divider has zero internal component dependencies.

---

## Related Components

- [Panel.md](Panel.md) — Uses Divider between header/body/footer
- [Card.md](Card.md) — Uses Divider in footer
- [FormGroup.md](../Forms/FormGroup.md) — Uses Divider for section separation
- [Section.md](../Layout/Section.md) — Uses Divider between sections
- [Stack.md](../Layout/Stack.md) — Uses Divider between stacked items

---

## Anti-patterns

1. **Using Divider for decoration** — Dividers separate content. Do not use them as decorative lines.
2. **Multiple adjacent dividers** — Never stack two dividers. Use the `strong` variant if more emphasis is needed.
3. **Label on vertical divider** — Labels are only supported on horizontal dividers. Vertical dividers must not have labels.
4. **Interactive content inside Divider** — Divider labels are for static text only. Do not put buttons, links, or inputs in the label.
5. **Divider as a layout tool** — Use CSS `gap` or `border` for element spacing. Divider is for visual separation, not layout.
6. **Changing line thickness** — Always use 1px. Thicker lines should use Panel accent or Card border.

---

## Performance Notes

- Single `<hr>` or `<div>` DOM element — minimal footprint
- No event listeners, state, or effects — zero runtime overhead
- Horizontal with label renders three elements (left line, label, right line) using flexbox
- Label text is rendered only when `children` is provided — conditional rendering avoids empty wrappers
- Vertical divider uses CSS `align-self: stretch` for height matching
- All styling via CSS classes — no inline style generation
