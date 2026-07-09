# Responsive Architecture

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Responsive-System.md](../../02-Design-Language/Responsive-System.md), [Grid-System.md](../../02-Design-Language/Grid-System.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 8)

---

## Purpose

Defines the responsive behavior of the entire application shell across all device classes. Each layout template inherits and may extend these rules.

---

## Breakpoint System

| Class | Min Width | Max Width | Typical Devices |
|-------|-----------|-----------|-----------------|
| Mobile | 320px | 767px | Phones, small phablets |
| Tablet | 768px | 1023px | iPads, Android tablets |
| Laptop | 1024px | 1279px | Small laptops, landscape tablets |
| Desktop | 1280px | 1919px | Standard desktops, large laptops |
| Ultra-wide | 1920px | + | Large monitors, ultra-wide displays |

---

## Responsive Strategy

### Shell Elements

| Element | Mobile (320-767) | Tablet (768-1023) | Laptop (1024-1279) | Desktop (1280+) | Ultra-wide (1920+) |
|---------|-----------------|-------------------|--------------------|-----------------|-------------------|
| Header | Compact (breadcrumb + actions) | Standard | Full | Full | Full |
| Sidebar | Hidden (bottom tab bar) | Collapsed (64px rail) | Expanded/Collapsed | Expanded (240px) | Expanded (240px) |
| Primary content | Full width, single column | Full width, 2 cols max | Constrained width | Constrained width | Max-width limited |
| Context panel | Bottom sheet | Slide-over panel | Side panel (320px) | Side panel (320-480px) | Side panel (480px) |
| AI panel | Full-screen modal | Bottom sheet | Side panel (320px) | Side panel (400px) | Side panel (480px) |
| Footer | Hidden | Visible | Visible | Visible | Visible |

### Content Adaptation

| Content Type | Mobile | Tablet | Desktop |
|-------------|--------|--------|---------|
| Grids | 1 column | 2 columns | 3-4 columns |
| Tables | Card view | Horizontal scroll | Full table |
| Charts | Single, stacked | 2 per row | 2-3 per row |
| Lists | Full width | Full width | Side panel |
| Forms | Full width | Full width | Constrained width |

---

## Responsive Rules

| Rule | Description |
|------|-------------|
| Mobile-first | Base styles are mobile-first, enhanced for larger screens |
| Content parity | All content is accessible on all devices (layout differs, content doesn't) |
| Touch targets | Minimum 44x44px on touch devices |
| No horizontal scroll | Content never requires horizontal scrolling on any device |
| Print styles | Print stylesheets for content pages |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Desktop.md](Desktop.md) | Desktop-specific behavior |
| [Laptop.md](Laptop.md) | Laptop-specific behavior |
| [Tablet.md](Tablet.md) | Tablet-specific behavior |
| [Mobile.md](Mobile.md) | Mobile-specific behavior |
| [Ultra-wide.md](Ultra-wide.md) | Ultra-wide-specific behavior |
| [Foldables.md](Foldables.md) | Foldable device behavior |
| [Future-Devices.md](Future-Devices.md) | Future device adaptation |

---

*The Responsive Architecture ensures every workspace feature works on every device. It implements UX Constitution Rule 8 — Responsive First.*
