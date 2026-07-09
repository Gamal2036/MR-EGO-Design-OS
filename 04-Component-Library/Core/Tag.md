# Tag

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md))

---

## Purpose

Tag is a read-only metadata label used to categorize, label, or provide status information about content. Tags are non-interactive — they display information only and cannot be clicked, selected, or dismissed. Use Chip for interactive counterparts.

---

## Responsibilities

- Display a compact, read-only metadata label
- Render with semantic colors to communicate category or status
- Support three visual treatments: default (filled), outlined, subtle
- Remain non-interactive — no hover, focus, active, selected, or dismiss states
- Provide consistent sizing for inline placement with text and other elements

---

## Composition

```
Tag
├── Icon (optional, leading)
└── Label (required)
```

Tag does not use any sub-components. It renders inline content based on props.

---

## Hierarchy

**Level:** 1 (Core Primitive)

**Parent:** None (consumed by Card, List, DataGrid, Filters, and standalone)

**Children:** None

**Siblings:** `Badge`, `Chip`, `Avatar`, `Tooltip`, `Surface`, `Divider`, `Container`

---

## Props Contract

```typescript
/**
 * Tag visual variant.
 * - default: Filled background with semantic color
 * - outlined: Transparent background with semantic border
 * - subtle: Very light background, semantic text color
 */
type TagVariant = 'default' | 'outlined' | 'subtle';

/**
 * Tag semantic color matching Badge color system.
 * - info: Blue (Primary). Informational.
 * - success: Green. Positive.
 * - warning: Amber. Caution.
 * - danger: Red. Error, critical.
 * - neutral: Gray. Default, no semantic meaning.
 */
type TagColor = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

/**
 * Tag size.
 * - sm: 20px height — compact, inline
 * - md: 24px height — default
 */
type TagSize = 'sm' | 'md';

interface TagProps {
  /** Visual variant. @default 'default' */
  variant?: TagVariant;
  /** Semantic color. @default 'neutral' */
  color?: TagColor;
  /** Size. @default 'md' */
  size?: TagSize;
  /** Tag label text. Required. */
  children: React.ReactNode;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
  /** Data test ID for automated testing. */
  dataTestId?: string;
  /** Ref forwarded to the root element. */
  ref?: React.Ref<HTMLSpanElement>;
}
```

---

## Variants

### Default
Filled background with full semantic color emphasis.

| Property | Info | Success | Warning | Danger | Neutral |
|----------|------|---------|---------|--------|---------|
| Background (light) | Primary-50 | Success-BG | Warning-BG | Danger-BG | Neutral-100 |
| Background (dark) | Primary-900 | #064E3B | #78350F | #7F1D1D | Neutral-300 |
| Text (light) | Primary-700 | Success-600 | Warning-600 | Danger-600 | Neutral-700 |
| Text (dark) | Primary-300 | Success-400 | Warning-400 | Danger-400 | Neutral-600 |
| Border | None | None | None | None | None |

### Outlined
Transparent background with colored border. Lighter emphasis.

| Property | Value |
|----------|-------|
| Background | Transparent |
| Border | 1px solid in the semantic color (e.g., Danger-500 for danger) |
| Text | Semantic text color (e.g., Danger-600 for danger) |

### Subtle
Minimal visual weight for dense contexts.

| Property | Value |
|----------|-------|
| Background | Transparent or minimal tint |
| Text | Semantic text color with slightly reduced opacity |
| Border | None |

---

## Sizes

| Size | Height | Padding H | Font Size | Icon Size | Border Radius |
|------|--------|-----------|-----------|-----------|---------------|
| SM | 20px | 6px (Space-2) | 11px | 12px | Radius-Sm (4px) |
| MD | 24px | 8px (Space-3) | 12px (Overline) | 14px | Radius-Sm (4px) |

---

## States

Tag has no interaction states. It is a read-only display element.

| State | Behavior |
|-------|----------|
| Default | Renders with specified variant, color, and label |
| Any interaction | No change — Tag does not respond to hover, focus, click, or touch |

Tags must never have pointer cursor, hover effects, or focus indicators.

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Element | `<span>` element |
| Role | None (or `role="text"` in unusual cases) |
| ARIA | No ARIA attributes needed — Tag is decorative/descriptive text |
| Color not sole indicator | Tag always includes text label. Color is supplemental. |
| Icon | Leading icon has `aria-hidden="true"` |
| Screen reader | Tag content is read as regular text in document flow |

Tags are transparent to accessibility — their text content is read naturally as part of the surrounding content.

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | SM size for inline with text in dense views. Tags wrap naturally. |
| Tablet (768-1023px) | MD size default. Tags wrap in grid layouts. |
| Desktop (1024px+) | MD size default. |
| Wide (1280px+) | MD size default. |
| Ultra-wide (1600px+) | MD size default. |

---

## Animation Rules

Tag has no animations. It is a static display element.

---

## Future Expansion

- **Tag group** — Collection of Tags with consistent spacing and wrapping
- **Tag with tooltip** — Truncated tag text with full label in tooltip
- **Colored dot tag** — Small dot preceding text for visual scanning
- **Clickable Tag** — Future interactive variant if needed (use Chip instead)

---

## Dependencies

| Dependency | Type | Usage |
|------------|------|-------|
| Design Tokens | External (DP-1) | Colors, typography, spacing, border radius |

Tag has zero internal component dependencies.

---

## Related Components

- [Badge.md](Badge.md) — Notification/status indicator (same color system)
- [Chip.md](Chip.md) — Interactive version of Tag with selection and dismiss
- [Card.md](Card.md) — Tags used within Card for metadata
- [Filters.md](../Data/Filters.md) — Active filter display using Tags

---

## Anti-patterns

1. **Interactive Tag** — Tags are read-only. Do not attach click handlers. Use Chip for interaction.
2. **Tag with dismiss** — Tags are not dismissible. Use Chip with `isDismissible` for removable labels.
3. **Custom colors** — Use only the five defined semantic colors. Custom colors break the system.
4. **Multiple semantic meanings** — A Tag represents one category. Do not combine meanings.
5. **Tag without text** — Tags must always have text content. Icon-only is not a valid Tag.
6. **Large Tags** — Tags are compact (max 24px height). For larger labels, use Badge label variant.
7. **Tag for count display** — Use Badge with number variant for counts and notifications.

---

## Performance Notes

- Single `<span>` DOM element — absolute minimal footprint
- No event listeners, state, or effects — zero runtime overhead
- No conditional rendering logic beyond optional icon
- Tag is an ideal candidate for `React.memo` — props rarely change
- All styling via CSS classes — no inline style objects
- No animation, transition, or interaction CSS properties
- Tag can be used in loops with hundreds of instances without performance concerns
