# Responsive Implementation

## Architecture

Per DP-4 Responsive-Architecture.md, DP-1 Responsive-System.md, and DP-6 Responsive-UX.md, the responsive implementation uses a mobile-first approach with defined breakpoints and adaptive layout strategies.

## Breakpoint System

| Name | Min Width | Target Devices | Layout Behavior |
|------|-----------|----------------|-----------------|
| Mobile | 0 | Phones (portrait) | Single column, bottom navigation |
| Mobile Landscape | 480px | Phones (landscape) | Single column, condensed headers |
| Tablet | 768px | Tablets (portrait) | Two columns, sidebar visible |
| Tablet Landscape | 1024px | Tablets (landscape), small laptops | Two columns, full sidebar |
| Laptop | 1280px | Standard laptops | Multi-column, full shell |
| Desktop | 1440px | Large monitors | Full layout, max content width |
| Ultra-wide | 1920px | Ultra-wide monitors | Expanded content, optional panels |

## Mobile-First Implementation

All components are built mobile-first:
- Base styles target mobile (single column, minimal chrome)
- Media queries add complexity at larger breakpoints
- No desktop-first overrides — progressive enhancement

## Layout Adaptation

### Shell Responsive Behavior

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Sidebar | Hidden (slide overlay) | Collapsed (icons only) | Expanded |
| Topbar | Compact (menu icon, title) | Full | Full with actions |
| Content | Single column | 2-column | Multi-region |
| Navigation | Bottom tab bar | Sidebar | Sidebar |
| Panels | Full screen modals | Slide-in overlays | Side-by-side |
| Floating | Hidden | Condensed | Full |

### Region Adaptation

| Region | Mobile | Tablet | Desktop |
|--------|--------|--------|---------|
| Primary | Full width | 2/3 width | Flexible |
| Secondary | Hidden (below fold) | 1/3 width | Fixed width |
| Context | Modal | Slide-in panel | Side panel |
| AI | Full screen | Overlay | Side panel |
| Inspector | Modal | Slide-in | Side panel |

## Responsive Components

All components defined in DP-3 specify responsive behavior in their design contracts:
- Cards: Single column on mobile, grid on tablet/desktop
- Tables: Horizontal scroll on mobile, full on desktop
- Forms: Stacked on mobile, inline on desktop
- Navigation: Bottom tabs on mobile, sidebar on desktop
- Charts: Simplified on mobile, full on desktop

## Touch Targets

- Minimum touch target size: 44x44px (WCAG 2.2)
- All interactive elements meet touch target requirement at mobile breakpoint
- Sufficient spacing between touch targets: 8px minimum

## Responsive Images

- Use `srcset` and `sizes` for responsive image loading
- WebP format with JPEG fallback
- Lazy loading below the fold
- Art direction via `<picture>` element for critical images

## Implementation Sequence

| Step | Phase | Deliverable |
|------|-------|-------------|
| 1 | DP-13 | Define breakpoint tokens in theme |
| 2 | DP-13 | Create responsive utility classes/mixins |
| 3 | DP-14 | Implement responsive shell (all breakpoints) |
| 4 | DP-14 | Build responsive navigation (mobile bottom nav) |
| 5 | DP-14 | Implement region responsive adaptation |
| 6 | DP-16 | Verify public pages responsive |
| 7 | DP-17 | Verify dashboard responsive |
| 8 | Per module | Each module implements responsive layout |
| 9 | DP-31 | Full responsive audit across all breakpoints |
| 10 | DP-31 | Device testing (real devices, emulators) |

## Responsive Testing Checkpoints

- Each module phase includes responsive verification
- Full responsive audit at DP-31 uses real device testing
- Visual regression testing at all 7 breakpoints
- Interaction testing at mobile breakpoints (touch vs hover)
- Content overflow testing at minimum width (320px)
