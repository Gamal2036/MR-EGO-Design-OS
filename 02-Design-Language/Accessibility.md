# Accessibility

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md), [Brand-Constitution.md](../01-Constitution/Brand-Constitution.md))

---

## Philosophy

Accessibility is not a checklist or a compliance exercise. It is a fundamental design requirement equal to functionality, performance, and aesthetics. An interface that cannot be used by everyone is incomplete.

MR:EGO targets **WCAG 2.1 AA as the minimum standard** and **WCAG 2.1 AAA wherever possible**.

---

## Keyboard Navigation

Every interactive element in MR:EGO is reachable and operable via keyboard alone.

| Feature | Requirement |
|---------|-------------|
| Tab order | Follows visual order (top-to-bottom, left-to-right) |
| Focus indicator | Visible 2px ring, high contrast (Focus ring color) |
| Skip to content | First focusable element on every page |
| Keyboard traps | None — all modals close with Esc |
| Custom components | Standard keyboard patterns (Enter, Esc, Arrow keys) |
| Shortcuts | Cmd+K for command palette, documented shortcuts |

### Focus Indicator Specification

| Property | Light | Dark |
|----------|-------|------|
| Color | Primary-500 | Primary-400 |
| Width | 2px | 2px |
| Offset | 2px | 2px |
| Style | Solid, with 4px border-radius | Solid, with 4px border-radius |
| Fallback | Outline when ring not supported | Same |

Focus indicators are visible on all interactive elements at all times during keyboard navigation.

---

## Screen Readers

| Requirement | Specification |
|-------------|---------------|
| Alt text | All informative images have meaningful alt text |
| Decorative images | Marked `aria-hidden="true"` or empty alt text |
| ARIA landmarks | Every page region has a landmark role |
| Dynamic content | Announce changes with `aria-live` regions |
| Form errors | Errors are announced and associated with inputs |
| Status messages | Loading, success, and error states announced |
| Icon-only buttons | `aria-label` describes the action |
| Skip links | Visible on focus for keyboard users |

---

## Contrast

All color combinations in MR:EGO meet or exceed WCAG AA contrast requirements.

| Component | Required Ratio | Target Ratio | Standard |
|-----------|---------------|--------------|----------|
| Body text | 4.5:1 | 7:1 (AAA) | AA minimum, AAA target |
| Large text (18px+ / 14px bold+) | 3:1 | 4.5:1 | AA minimum |
| UI components (borders, icons) | 3:1 | 4.5:1 | AA minimum |
| Disabled text | 3:1 | 3:1 | AA minimum |
| Placeholder text | 3:1 | 4.5:1 | AA minimum |
| Link text | 4.5:1 (against background) | 7:1 | AA minimum |

*See [Color-System.md](Color-System.md) for specific contrast ratios of all color pairings.*

---

## Focus Management

| Pattern | Behavior |
|---------|----------|
| Modals open | Focus moves to first focusable element inside modal |
| Modals close | Focus returns to element that triggered modal |
| Tab panels | Focus stays within tab panel content; Tab moves to next section |
| Dropdown menus | Focus moves to first menu item; Arrow keys navigate |
| Dialogs | Focus trapped within dialog; Esc closes |
| Toast notifications | Toast is announced but does not steal focus |
| Page navigation | Focus moves to `<h1>` or main content area |

---

## Touch Targets

| Requirement | Specification |
|-------------|---------------|
| Minimum size | 44x44px (WCAG 2.1) |
| Icon-only buttons | Minimum 44x44px hit area |
| Inline links | Minimum 44x44px hit area (padding extends reach) |
| Form controls | Minimum 44px height |
| Mobile bottom nav | Minimum 48x48px for comfort |
| Spacing between targets | Minimum 8px to prevent mis-taps |

---

## Reduced Motion

MR:EGO respects `prefers-reduced-motion` at the system level and provides an additional in-app setting.

| Setting | Effect |
|---------|--------|
| `prefers-reduced-motion: reduce` | All animations → instant (50ms max) |
| Opacity transitions | Remain (fade in/out is essential for understanding) |
| Transform transitions (slide, scale) | Disabled |
| Loading animations | Continue (indicate progress) |
| Micro-interactions (hover) | Remain at 50ms (essential feedback) |
| In-app "Reduce motion" toggle | Same as system preference |
| In-app "Disable all animation" | All motion disabled, including loading |

*See [Motion-System.md](Motion-System.md) for detailed motion specifications.*
*See [Animation-Principles.md](Animation-Principles.md) for animation philosophy.*

---

## Text Scaling

MR:EGO supports browser text scaling up to **200%** without breaking layout.

| Requirement | Specification |
|-------------|---------------|
| Font units | `rem` for all font sizes (not `px`) |
| Container scaling | Containers use relative units, not fixed heights |
| Text overflow | Text never overflows or clips at 200% zoom |
| Button text | Buttons accommodate text growth |
| Navigation | Navigation items wrap or enter overflow menu at large sizes |
| Reflow | No horizontal scroll at 200% zoom on standard content |

---

## Color and Meaning

Color is never the sole indicator of meaning:

| Element | Additional Indicator |
|---------|---------------------|
| Error state | Icon + text label + border color |
| Success state | Icon + text label + border color |
| Status badge | Icon + text label |
| Chart data | Pattern + label + color |
| Link | Underline + color (underline on hover minimum) |
| Active state | Bold + icon + color |

---

## Automated Testing

Every component in DP-2 must pass:

1. **Automated aXe audit** — zero critical/serious violations
2. **Color contrast check** — all pairings meet AA minimum
3. **Keyboard navigation test** — all elements reachable and operable
4. **Screen reader test** — all content announced correctly
5. **Zoom test** — layout intact at 200% zoom

---

*This Accessibility specification is permanent. All components in DP-2, pages in DP-5, and modules in DP-6+ must comply. Refer to [Color-System.md](Color-System.md) for contrast specifications, [Motion-System.md](Motion-System.md) for motion accessibility, and [UX-Constitution.md](../01-Constitution/UX-Constitution.md) for accessibility-first UX rules.*
