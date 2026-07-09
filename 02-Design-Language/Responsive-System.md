# Responsive System

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md))

---

## Philosophy

MR:EGO is **responsive-first** — every interface works on every screen size, from a 320px mobile device to a 3840px ultra-wide monitor. Mobile is not an afterthought; it is a core experience that scales up to desktop.

The responsive system is built on the grid, spacing, and layout systems defined elsewhere in DP-1. It defines how those systems adapt across breakpoints.

---

## Breakpoints

| Name | Min Width | Max Width | Device Context |
|------|-----------|-----------|----------------|
| Small (sm) | 0 | 767px | Mobile phones |
| Medium (md) | 768px | 1023px | Tablets |
| Large (lg) | 1024px | 1279px | Small desktops, laptops |
| Extra Large (xl) | 1280px | 1599px | Standard desktops |
| Ultra Wide (xxl) | 1600px | — | Large monitors, ultra-wide |

### Breakpoint Strategy

MR:EGO uses **min-width (mobile-first)** breakpoints. Base styles target small screens; media queries add complexity as viewport grows.

```
/* Base styles = mobile (0px+) */
.element { ... }

/* Tablet+ */
@media (min-width: 768px) { ... }

/* Desktop+ */
@media (min-width: 1024px) { ... }

/* Wide desktop+ */
@media (min-width: 1280px) { ... }

/* Ultra-wide */
@media (min-width: 1600px) { ... }
```

---

## Layout Adaptation

### Navigation

| Element | Mobile (<768px) | Tablet (768–1023px) | Desktop (1024px+) |
|---------|----------------|---------------------|-------------------|
| Sidebar | Bottom tab bar (5 items) | Collapsed icon sidebar (expandable) | Full sidebar (240px) |
| Top nav | Reduced (back + title) | Full | Full |
| Content | Single column | 2-column grid possible | Multi-column |

### Cards

| Property | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| Columns | 1 | 2 | 3 |
| Padding | 16px | 20px | 24px |
| Gap | 16px | 20px | 24px |

### Data Tables

| Property | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| Display | Card list (rows → cards) | Responsive table with horizontal scroll | Full table |
| Key columns | 2–3 most important | 4–5 columns | All columns |

### Forms

| Property | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| Layout | Single column | Single column (wider inputs) | Multi-column possible |
| Field width | 100% | 100% | 50% for related fields |
| Actions | Full-width button | Inline buttons | Inline buttons |

### Modals

| Property | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| Width | 100% (with 16px margin) | 480px | 640px |
| Position | Bottom sheet (slide up) | Centered | Centered |
| Border radius | 12px top corners | 12px all | 12px all |

---

## Typography Adaptation

Font sizes scale down slightly on smaller viewports to maintain comfortable line lengths.

| Token | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| Display | 32px / 2rem | 40px / 2.5rem | 48px / 3rem |
| Heading-1 | 28px / 1.75rem | 32px / 2rem | 36px / 2.25rem |
| Heading-2 | 24px / 1.5rem | 26px / 1.625rem | 28px / 1.75rem |
| Heading-3 | 20px / 1.25rem | 20px / 1.25rem | 22px / 1.375rem |
| Heading-4 | 18px / 1.125rem | 18px / 1.125rem | 18px / 1.125rem |
| Body | 15px / 0.9375rem | 15px / 0.9375rem | 15px / 0.9375rem |

---

## Spacing Adaptation

| Token | Mobile | Tablet | Desktop | Ultra-Wide |
|-------|--------|--------|---------|------------|
| Page margin | 16px | 24px | 32px | 48px |
| Section gap | 32px | 40px | 48px | 64px |
| Card padding | 16px | 20px | 24px | 32px |
| Container max | 100% | 720px | 1140px | 1440px |

---

## Ultra-Wide (1600px+)

On ultra-wide screens, MR:EGO does not stretch content across the full width. Instead:

1. **Content is center-constrained** to a maximum width (1140px standard, 1440px wide).
2. **Multi-column layouts expand** — dashboards can show 4 columns instead of 3.
3. **Sidebar remains fixed width** (240px), not proportional.
4. **Whitespace increases** but content density does not decrease.
5. **Data tables can show more columns** without horizontal scroll.

---

## Foldable Devices

MR:EGO supports foldable and dual-screen devices:

| Property | Behavior |
|----------|----------|
| Screen span | Layout spans both screens when unfolded (tablet/desktop layout) |
| Fold hinge | Content avoids hinge area (center column gap) |
| Single screen | Default mobile layout when folded |
| Orientation | Portrait and landscape supported |

---

## Future Devices

The responsive system is designed for future device categories:

1. **Wearables:** Minimal interface with critical notifications only. Navigation via voice or simplified controls.
2. **Large touch screens** (kiosks, interactive displays): Desktop layout with touch-optimized targets (minimum 48px).
3. **AR/VR interfaces:** Spatial layout within the responsive framework. Content panels behave like cards in 3D space.
4. **Projection / AirPlay:** Full desktop layout optimized for viewing distance and remote interaction.

---

## Responsive Rules

1. **Content determines breakpoint.** If content looks good at 850px, do not force a layout change at 768px.
2. **Touch targets adapt.** 44px minimum on touch devices, 36px minimum on pointer-only devices.
3. **No horizontal scroll** except for data tables with many columns.
4. **Images are responsive** — `max-width: 100%` with `height: auto`.
5. **Fonts scale with viewport** using `rem` units, not `vw` or viewport-based units.
6. **Test at every breakpoint.** Every layout is validated at 320px, 768px, 1024px, 1280px, and 1600px.

---

*This Responsive System is permanent. All components in DP-2 and layouts in DP-5 follow these responsive rules. Refer to [Grid-System.md](Grid-System.md) for grid breakpoints, [Spacing-System.md](Spacing-System.md) for adaptive spacing, and [Typography.md](Typography.md) for font size adaptation.*
