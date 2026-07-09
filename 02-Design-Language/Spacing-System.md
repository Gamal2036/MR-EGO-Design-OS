# Spacing System

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Brand-Constitution.md](../01-Constitution/Brand-Constitution.md), [Design-Principles.md](../01-Constitution/Design-Principles.md))

---

## Philosophy

Spacing in MR:EGO is not random — it is a system. Every margin, padding, and gap is drawn from a fixed set of values. This creates visual rhythm, consistency across all surfaces, and predictable layouts that users can intuitively understand.

The 8px base unit creates a comfortable, spacious feel that communicates premium quality without being wasteful.

---

## The Spacing Scale

All spacing values are derived from a base unit of **8px (0.5rem)**. A 4px micro-unit is available for dense content. Values beyond the defined scale should not be used.

| Token | Value | rem | Usage |
|-------|-------|-----|-------|
| Space-0 | 0px | 0 | Reset, no spacing |
| Space-1 | 2px | 0.125rem | Micro adjust, icon inset |
| Space-2 | 4px | 0.25rem | Tight padding, icon margins |
| Space-3 | 8px | 0.5rem | Base unit — tight gaps, inline spacing |
| Space-4 | 12px | 0.75rem | Compact padding, form field inset |
| Space-5 | 16px | 1rem | Standard padding, card content inset |
| Space-6 | 20px | 1.25rem | Comfortable padding, button padding |
| Space-7 | 24px | 1.5rem | Section padding, card spacing |
| Space-8 | 32px | 2rem | Component group spacing |
| Space-9 | 40px | 2.5rem | Section spacing |
| Space-10 | 48px | 3rem | Page section gaps |
| Space-11 | 64px | 4rem | Major section spacing |
| Space-12 | 80px | 5rem | Page margins, large break spacing |
| Space-13 | 96px | 6rem | Maximum spacing between page sections |
| Space-14 | 128px | 8rem | Hero/landing section padding |

### Scale Rationale

The scale follows a **linear progression with geometric steps**:
- 0 → 2 → 4 → 8 → 12 → 16 (linear for fine control)
- 16 → 24 → 32 → 48 → 64 → 80 → 96 → 128 (geometric for structure)

This dual approach provides precise control at small values and clear structural separation at large values.

---

## Spacing Categories

### Margins

| Context | Value | Token |
|---------|-------|-------|
| Page margin (desktop) | 32px | Space-8 |
| Page margin (tablet) | 24px | Space-7 |
| Page margin (mobile) | 16px | Space-5 |
| Card margin from page edge | 16px | Space-5 |
| Section bottom margin | 48px | Space-10 |

### Padding

| Context | Value | Token |
|---------|-------|-------|
| Card padding (standard) | 24px | Space-7 |
| Card padding (compact) | 16px | Space-5 |
| Card padding (dense) | 12px | Space-4 |
| Button padding (horizontal) | 16px | Space-5 |
| Button padding (vertical) | 8px | Space-3 |
| Form field inset | 12px | Space-4 |
| Modal padding | 32px | Space-8 |
| List item padding | 12px 16px | Space-4 Space-5 |

### Gap System

| Context | Value | Token |
|---------|-------|-------|
| Stack gap (tight) | 4px | Space-2 |
| Stack gap (default) | 8px | Space-3 |
| Stack gap (loose) | 16px | Space-5 |
| Grid gap (default) | 24px | Space-7 |
| Grid gap (compact) | 16px | Space-5 |
| Grid gap (loose) | 32px | Space-8 |
| Inline gap (tight) | 4px | Space-2 |
| Inline gap (default) | 8px | Space-3 |
| Inline gap (loose) | 16px | Space-5 |

### Section Spacing

| Context | Value | Token |
|---------|-------|-------|
| Between sections | 48px | Space-10 |
| Between sub-sections | 32px | Space-8 |
| Between related groups | 24px | Space-7 |
| Between page header and content | 32px | Space-8 |
| Between form fields | 24px | Space-7 |

### Card Spacing

| Context | Value | Token |
|---------|-------|-------|
| Between cards in a grid | 24px | Space-7 |
| Between card header and body | 16px | Space-5 |
| Between card body and footer | 16px | Space-5 |
| Card icon margin from edge | 4px | Space-2 |

### Container Spacing

| Context | Value | Token |
|---------|-------|-------|
| Max content width | 1200px | — |
| Narrow content width (reading) | 720px | — |
| Wide content width | 1440px | — |
| Container padding | 32px | Space-8 |

---

## Responsive Spacing

Spacing scales down on smaller viewports to preserve content density without overcrowding.

| Device | Base Unit | Page Margin | Card Padding | Section Gap |
|--------|-----------|-------------|--------------|-------------|
| Ultra-wide (1920px+) | 8px | 48px | 32px | 64px |
| Desktop (1280–1919px) | 8px | 32px | 24px | 48px |
| Tablet (768–1279px) | 8px | 24px | 20px | 40px |
| Mobile (360–767px) | 4px* | 16px | 16px | 32px |
| Small mobile (<360px) | 4px* | 12px | 12px | 24px |

*On mobile, the micro-unit (4px) becomes the effective base for tight spacing. The defined scale values remain the same but the minimum increments are 4px.

*See [Responsive-System.md](Responsive-System.md) for complete responsive behavior.*

---

## Whitespace Philosophy

Whitespace is a deliberate design element, not empty space.

1. **Whitespace creates hierarchy.** More space around an element makes it more important.
2. **Whitespace improves readability.** Proper spacing reduces visual fatigue.
3. **Whitespace communicates premium quality.** Generous spacing is a hallmark of premium products.
4. **Whitespace is not wasted space.** Every pixel of whitespace serves a purpose.

---

## Density Modes

MR:EGO supports three density modes that adjust spacing for user preference:

| Mode | Card Padding | Stack Gap | Description |
|------|-------------|-----------|-------------|
| Comfortable (default) | 24px | 16px | Maximum readability, premium feel |
| Compact | 16px | 8px | Higher information density |
| Dense | 12px | 4px | Maximum content per viewport |

Density modes scale all spacing proportionally. They do not change font sizes, only the space between elements.

---

## Spacing Rules

1. **Always use defined scale values.** Never use arbitrary pixel values.
2. **Prefer padding over margin** for component internal spacing. Components own their internal space.
3. **Prefer gap over margin** for flex/grid layouts. Gap is cleaner and handles wrapping correctly.
4. **Never stack margins** in the same direction — use gap instead.
5. **8px is the default minimum** for most spacing contexts. 4px is reserved for dense content only.
6. **Section spacing is always double** the component spacing within that section.
7. **Consistent horizontal alignment** — all content left-aligned to the same grid line.

---

*This Spacing System is permanent. All components in DP-2, layouts in DP-5, and modules in DP-6+ derive their spacing from this system. Refer to [Grid-System.md](Grid-System.md) for layout grid specifications, [Design-Tokens.md](Design-Tokens.md) for token naming, and [Responsive-System.md](Responsive-System.md) for responsive behavior.*
