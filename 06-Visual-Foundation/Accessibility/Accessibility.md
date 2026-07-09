# Accessibility (Visual Foundation)

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md)), DP-1 ([Accessibility.md](../../02-Design-Language/Accessibility.md))

---

## Definition

The Visual Foundation Accessibility document defines how visual design decisions impact accessibility. It extends the technical specifications in DP-1 with emotional and experiential accessibility goals.

---

## Visual Accessibility Principles

1. **Accessibility is not a constraint — it is a design requirement.** Every visual decision is evaluated for accessibility impact.
2. **Beauty and accessibility are not in conflict.** The most accessible design is often the most beautiful.
3. **One inaccessible moment erodes trust built over 100 accessible moments.**
4. **Accessibility benefits everyone.** High contrast helps in sunlight. Large targets help on bumpy buses. Clear language helps non-native speakers.

---

## Contrast in Visual Design

| Element | AA Requirement | AAA Target | MR:EGO Standard |
|---------|---------------|------------|-----------------|
| Body text | 4.5:1 | 7:1 | 10.2:1 (exceeds AAA) |
| Large text (18px+ / 14px bold+) | 3:1 | 4.5:1 | 6.7:1 (exceeds AA) |
| UI component borders | 3:1 | — | 3:1 minimum |
| Focus indicators | 3:1 against background | — | Primary-500 on light, Primary-400 on dark |
| Disabled text | 3:1 | — | 3:1 minimum |
| Placeholder text | 3:1 | — | 4.8:1 (exceeds AA) |
| Link text | 4.5:1 against background | 7:1 | Primary-600 on Surface-1 (5.8:1) |

---

## Motion Reduction in Visual Design

| Visual Element | Reduced Motion Behavior |
|----------------|------------------------|
| Hover effects | 50ms instant (no animation) |
| Focus indicators | Instant appearance (0ms) |
| Page transitions | Instant cross-fade (50ms) |
| Element reveals | Opacity only (50ms) |
| AI thinking pulse | Static glow (no pulsing) |
| Loading shimmer | Static or disabled |
| Card hover elevation | Instant shadow change (50ms) |
| Expand/collapse | Instant (no smooth animation) |
| Drag and drop | Instant position change |
| Animations | All disabled except loading indicators |

---

## Focus in Visual Design

| Requirement | Specification |
|-------------|---------------|
| Focus visibility | Always visible during keyboard navigation |
| Focus ring style | 2px solid ring, Primary-500/400 |
| Focus ring offset | 2px from element |
| Focus ring radius | Element border-radius + 2px |
| Focusable elements | All interactive elements |
| Focus order | Visual order (left-to-right, top-to-bottom) |
| Focus trap | Modals trap focus, Esc releases |
| Skip link | First focusable element on page |
| Focus return | Returns to trigger after modal closes |

---

## Touch in Visual Design

| Requirement | Specification |
|-------------|---------------|
| Minimum target size | 44×44px (WCAG 2.1) |
| Icon-only buttons | 44×44px hit area minimum |
| Inline links | 44×44px hit area (via padding) |
| Form controls | 44px height minimum |
| Mobile navigation | 48×48px minimum |
| Spacing between targets | 8px minimum |
| Touch feedback | 50ms visual + optional haptic |

---

## Reading Comfort in Visual Design

| Requirement | Specification |
|-------------|---------------|
| Body text size | 16px minimum (1rem) |
| Line height | 1.5× body, 1.2× headings |
| Line length | 70 characters maximum |
| Font units | rem only (not px) |
| Text scaling | Layout intact at 200% zoom |
| Text contrast | 7:1 minimum for body (AAA target) |
| Letter spacing | 0.01em body, normal headings |
| Paragraph spacing | 8px (0.5rem) minimum between paragraphs |

---

## Color and Meaning

| Visual Element | Additional Indicator | Implementation |
|----------------|---------------------|----------------|
| Error state | Icon + text + border color | X icon + "Error description" + Danger border |
| Success state | Icon + text + border color | Checkmark + "Saved" + Success border |
| Warning state | Icon + text + border color | Triangle + "Review this" + Amber border |
| Status badge | Icon + text label | Badge with icon and text |
| Chart data | Pattern + label + color | Pattern fill + legend label + color |
| Links | Underline + color | Underline (always or on hover) + Primary color |
| Active state | Bold + icon + color | Bold text + filled icon + Primary |

---

## Visual Accessibility Rules

1. **Color is never the sole indicator of meaning, state, or action.**
2. **Focus indicators are visible on all interactive elements** during keyboard navigation.
3. **All animations are ≤50ms when reduced motion is preferred.**
4. **All touch targets meet or exceed 44×44px.**
5. **All text meets WCAG AA contrast minimum; body text targets AAA.**
6. **Text scales to 200% without layout breakage.**
7. **Interactive elements have visible labels** (no icon-only without aria-label).
8. **Glass surfaces have solid background equivalents** for reduced transparency preference.

---

*This Accessibility (Visual Foundation) specification is permanent. All visual design decisions are validated against these accessibility requirements. Refer to [Accessibility.md](../../02-Design-Language/Accessibility.md) for technical accessibility specifications, [UX-Constitution.md](../../01-Constitution/UX-Constitution.md) Rule 6 for accessibility-first UX rules, and [Color-System.md](../../02-Design-Language/Color-System.md) for contrast specifications.*
