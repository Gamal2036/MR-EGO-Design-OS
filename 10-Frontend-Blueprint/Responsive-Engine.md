# Responsive Engine

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-1 ([Responsive-System.md](../02-Design-Language/Responsive-System.md)), DP-4 ([Responsive/](../05-Application-Shell/Responsive/))

---

## Purpose

Defines the responsive engine — breakpoint system, adaptive layouts, device detection, container queries, responsive hooks, and content adaptation strategy.

---

## Responsive Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   RESPONSIVE ENGINE                       │
├─────────────────────────────────────────────────────────┤
│  Breakpoint System                                       │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌───────┐ │
│  │ Mobile │ │ Tablet │ │ Laptop │ │Desktop │ │Ultra- │ │
│  │ 320-767│ │768-1023│ │1024-   │ │1280-   │ │wide   │ │
│  │        │ │        │ │1279    │ │1919    │ │1920+  │ │
│  └────────┘ └────────┘ └────────┘ └────────┘ └───────┘ │
│                                                          │
│  Device Detection Layer                                  │
│  Media queries → Breakpoint context → Component adapt    │
│                                                          │
│  Container Query Layer                                   │
│  Container queries → Element-level adaptation            │
│                                                          │
│  Content Adaptation Rules                                │
│  Per-breakpoint per-component layout and visibility      │
└─────────────────────────────────────────────────────────┘
```

---

## Breakpoint System

### Primary Breakpoints

| Name | Min Width | Max Width | Target Devices |
|------|-----------|-----------|----------------|
| Mobile | 320px | 767px | Phones, small tablets |
| Tablet | 768px | 1023px | Large tablets, small laptops |
| Laptop | 1024px | 1279px | Standard laptops |
| Desktop | 1280px | 1919px | Desktop monitors |
| Ultra-wide | 1920px | — | Large monitors, TVs |

### Secondary Breakpoints

| Name | Width | Use Case |
|------|-------|----------|
| Mobile Small | 320px | Minimum supported width |
| Mobile Large | 480px | Content adaptation boundary |
| Tablet Portrait | 768px | Portrait tablet layout |
| Tablet Landscape | 1024px | Landscape tablet layout |
| Desktop HD | 1440px | Content width maximum |
| Desktop QHD | 2560px | Ultra-wide layout |

---

## Responsive Context

```typescript
// Pseudocode
interface ResponsiveContext {
  breakpoint: Breakpoint;
  orientation: 'portrait' | 'landscape';
  deviceType: 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'ultrawide';
  isTouchDevice: boolean;
  isHoverDevice: boolean;
  isReducedMotion: boolean;
  isHighContrast: boolean;
  safeArea: SafeAreaInsets;
  foldHinge: FoldHinge | null;
  devicePixelRatio: number;
}

interface SafeAreaInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface FoldHinge {
  position: 'horizontal' | 'vertical';
  width: number;
  gap: number;
}
```

---

## Responsive Hooks

```typescript
// Pseudocode
// Primary hook — provides current breakpoint context
function useResponsive(): ResponsiveContext

// Specific breakpoint matcher
function useBreakpoint(breakpoint: Breakpoint): boolean

// Media query matcher
function useMediaQuery(query: string): boolean

// Container query matcher
function useContainerQuery(containerId: string, query: string): boolean

// Orientation matcher
function useOrientation(): 'portrait' | 'landscape'

// Touch device check
function useIsTouchDevice(): boolean

// Hover capability check
function useIsHoverDevice(): boolean

// Reduced motion preference
function useReducedMotion(): boolean
```

---

## Device Detection Strategy

| Capability | Detection Method | Fallback |
|------------|-----------------|----------|
| Touch | `'ontouchstart' in window` | Assume mouse-only |
| Hover | `matchMedia('(hover: hover)')` | Assume hover-capable |
| Pointer | `matchMedia('(pointer: fine)')` | Assume fine pointer |
| Reduced motion | `matchMedia('(prefers-reduced-motion: reduce)')` | Assume no preference |
| High contrast | `matchMedia('(prefers-contrast: more)')` | Assume normal contrast |
| Safe areas | CSS `env(safe-area-inset-*)` | Assume 0 |
| Fold hinge | CSS `env(fold-*)` / `spanning` media query | Assume single screen |
| DPR | `window.devicePixelRatio` | Assume 1x |

---

## Layout Adaptation

### Grid Adaptation

| Breakpoint | Columns | Gutter | Container Max Width |
|-----------|---------|--------|---------------------|
| Mobile | 4 | 16px | 100% |
| Tablet | 8 | 24px | 100% |
| Laptop | 12 | 32px | 1200px |
| Desktop | 12 | 32px | 1400px |
| Ultra-wide | 16 | 40px | 1920px |

### Component Visibility by Breakpoint

| Component | Mobile | Tablet | Laptop | Desktop | Ultra-wide |
|-----------|--------|--------|--------|---------|------------|
| Expanded sidebar | Hidden | Hidden | Toggle | Visible | Visible |
| Collapsed sidebar | Drawer | Overlay | Toggle | Toggle | Visible |
| Bottom tab bar | Visible | Visible | Hidden | Hidden | Hidden |
| Breadcrumb | 2 items | 3 items | 4 items | 5 items | 5 items |
| Secondary region | Bottom sheet | Right panel | Right panel | Right panel | Right panel |
| AI panel | Full screen | 400px overlay | 400px side | 400px side | 480px side |
| Dashboard grid | 1 col | 2 cols | 3 cols | 4 cols | 4 cols |

---

## Content Adaptation Rules

### Layout → Single Column (Mobile)

| Desktop Pattern | Mobile Adaptation |
|-----------------|-------------------|
| Side-by-side panels | Stack vertically |
| Table | Card list |
| Multi-column grid | Single column |
| Sidebar + content | Content only (drawer) |
| Tab bar | Horizontal scrollable tabs |
| Split view | Tab switcher |

### Navigation → Simplified (Mobile)

| Desktop | Mobile |
|---------|--------|
| Sidebar navigation | Bottom tab bar (5 items) |
| Sub-navigation | Side drawer or nested page |
| Context menu | Bottom sheet |
| Dropdown | Select or bottom sheet |
| Tooltip | Persistent info icon |
| Hover actions | Tap to reveal |
| Drag and drop | Long press + move |

---

## Container Queries (Future)

```typescript
// Pseudocode
// Container query usage
function ResponsiveWidget() {
  return (
    <div class="container">
      <style>
        {`
          @container (min-width: 400px) {
            .widget { flex-direction: row; }
          }
          @container (max-width: 399px) {
            .widget { flex-direction: column; }
          }
        `}
      </style>
      <div class="widget">
        <Icon />
        <Content />
      </div>
    </div>
  );
}
```

Container rules:
1. Dashboard widgets use container queries for internal layout.
2. Cards should be container-query aware for embedded content.
3. Container queries supplement, not replace, media queries.
4. Fallback behaviour is defined for browsers without container query support.

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Theme-Engine.md](Theme-Engine.md) | Theme-aware responsive adjustments |
| [Accessibility-Architecture.md](Accessibility-Architecture.md) | Responsive accessibility requirements |
| [DP-4 Responsive](../05-Application-Shell/Responsive/Responsive-Architecture.md) | Source responsive architecture |

---

## Validation Notes

1. Every component defines its responsive behaviour — not just at page level.
2. Mobile is the minimum supported viewport (320px). No horizontal scroll.
3. Touch targets are minimum 44x44px on touch devices at all breakpoints.
4. Content parity across all breakpoints — no features hidden on mobile.
5. Container queries enable widget-level responsiveness without page-level changes.
