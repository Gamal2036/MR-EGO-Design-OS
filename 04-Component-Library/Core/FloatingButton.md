# FloatingButton

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Elevation.md](../../02-Design-Language/Elevation.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md), [Motion-System.md](../../02-Design-Language/Motion-System.md)), DP-2 ([Buttons.md](../../03-Design-System/Components/Buttons.md))

---

## Purpose

FloatingButton provides a persistent, single primary action fixed to the bottom-right of the viewport. It is the mobile primary action mechanism — always accessible regardless of scroll position. There is exactly one FloatingButton per screen.

---

## Responsibilities

- Render a 56px circular button fixed to the bottom-right of the viewport
- Display a single icon representing the primary screen action
- Remain visible and accessible regardless of scroll position
- Elevate above all other content (Layer 3 shadow)
- Animate entrance/exit with slide and scale
- Provide tooltip on desktop hover for action description
- Suppress on mobile keyboard open to avoid overlap

---

## Composition

```
FloatingButton
├── Icon (required, 24px, centered)
└── Tooltip (desktop only, appears on hover with action label)
```

FloatingButton uses:
- `Icon` — the primary action icon
- `Tooltip` — action description on hover (desktop only)

---

## Hierarchy

**Level:** 2 (Core Composite)

**Parent:** None (renders via Portal to `document.body` or rendered inline within layout)

**Children:**
- `Icon` (Level 0) — action icon
- `Tooltip` (Level 1, optional) — label on hover (desktop only)

**Siblings:** `Button`, `IconButton`, `SplitButton`

---

## Props Contract

```typescript
interface FloatingButtonProps {
  /** Icon component or element representing the primary action. Required. */
  icon: React.ReactNode;
  /** Accessible label for the action. Required. */
  ariaLabel: string;
  /** Tooltip text for desktop hover. Falls back to ariaLabel if not provided. */
  tooltip?: string;
  /** Click handler for the primary action. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Whether the button is disabled. @default false */
  isDisabled?: boolean;
  /** Whether the button is in loading state. @default false */
  isLoading?: boolean;
  /** Whether the button is visible. @default true */
  isVisible?: boolean;
  /** Initial visibility animation. @default true */
  animateOnMount?: boolean;
  /** Offset from bottom of viewport. Useful when bottom navigation is present. @default 16 */
  bottomOffset?: number;
  /** Offset from right of viewport. @default 16 */
  rightOffset?: number;
  /** Additional class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
  /** Data test ID for automated testing. */
  dataTestId?: string;
  /** Ref forwarded to the underlying button element. */
  ref?: React.Ref<HTMLButtonElement>;
}
```

---

## Variants

FloatingButton has a single variant — Primary. It is always the primary action and must not use secondary, ghost, or danger variants.

### Primary (Default)

| Property | Value |
|----------|-------|
| Shape | Circle (56x56px) |
| Background | Primary-600 (light), Primary-500 (dark) |
| Icon Color | White |
| Shadow | Layer 3 (Elevation shadow) |
| Hover Background | Primary-700 (light), Primary-600 (dark) |
| Active Background | Primary-800 (light), Primary-700 (dark) |
| Focus Ring | Primary-500, 2px solid, 2px offset |
| Border | None |
| Border Radius | Radius-Full (circle) |

---

## States

| State | Trigger | Visual Change | Duration |
|-------|---------|--------------|----------|
| Default | — | 56px circle, Primary-500 fill, white icon, Layer 3 shadow | — |
| Hover | Mouse enter | Background darkens, shadow deepens slightly, cursor `pointer` | 100ms |
| Focus | Tab key | 2px Primary-500 focus ring | 100ms |
| Active | Mouse down | Scale to 0.95, darker background | 50ms |
| Disabled | `isDisabled` prop | Opacity 0.4, cursor `not-allowed`, shadow reduced | Instant |
| Loading | `isLoading` prop | Spinner replaces icon | 100ms |
| Enter | Mount / `isVisible` becomes true | Scale from 0.8 + fade in, slide up 16px | 300ms Ease-Out |
| Exit | Unmount / `isVisible` becomes false | Scale to 0.8 + fade out, slide down 16px | 200ms Ease-In |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Element | `<button>` element |
| Role | Implicit `role="button"` |
| ARIA label | Required `ariaLabel` prop |
| Tooltip | Desktop tooltip for sighted users describing action |
| Focus indicator | 2px solid ring, Primary-500, 2px offset |
| Keyboard | Enter or Space to activate |
| Disabled | `aria-disabled="true"`, `tabIndex={-1}` |
| Screen reader | `aria-label` describes the action |
| Touch target | 56x56px (exceeds 44x44px minimum) |
| Keyboard open | On mobile keyboard open, FloatingButton should hide to avoid overlap |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Visible. Bottom offset increases to 80px if bottom navigation bar present. Tooltip hidden. Hide on keyboard open. |
| Tablet (768-1023px) | Visible. Tooltip shown on hover. |
| Desktop (1024-1279px) | Visible. Tooltip shown on hover. |
| Wide (1280px+) | Visible. Tooltip shown on hover. |
| Ultra-wide (1600px+) | Visible. Tooltip shown on hover. |

**Position:** Fixed to viewport.
- `bottom: 16px` (or `bottomOffset` prop value)
- `right: 16px` (or `rightOffset` prop value)
- `z-index` appropriate for Layer 3 (above modals, below toasts if any)

---

## Animation Rules

| Action | Duration | Easing | Property |
|--------|----------|--------|----------|
| Hover background | 100ms | Ease-Out | background-color |
| Focus ring | 100ms | Ease-Out | box-shadow |
| Active press | 50ms | Ease-Out | transform: scale(0.95) |
| Active release | 100ms | Ease-Out | transform: scale(1) |
| Mount enter | 300ms | Ease-Out | opacity, transform (scale + translate) |
| Unmount exit | 200ms | Ease-In | opacity, transform (scale + translate) |

- All animations respect `prefers-reduced-motion`
- On reduced motion: mount/unmount use opacity-only transitions (no scale/translate)
- Scale transform only between 0.95 and 1.0

---

## Future Expansion

- **Speed Dial** — FloatingButton expands to reveal 3-5 secondary action options on click
- **Progress indicator** — Circular progress ring around the button for upload/submit actions
- **Multiple floating buttons** — Stacked floating actions for complex screens (limited to 2 max)
- **Gesture activation** — Swipe up from floating button reveals speed dial on mobile

---

## Dependencies

| Dependency | Type | Usage |
|------------|------|-------|
| Icon | Internal (Level 0) | Action icon |
| Tooltip | Internal (Level 1, optional) | Desktop hover label |
| Portal (optional) | Internal (Level 0) | Render to body if needed |
| Design Tokens | External (DP-1) | All visual properties |

---

## Related Components

- [Button.md](Button.md) — Standard action button
- [IconButton.md](IconButton.md) — Icon-only button for toolbars
- [SpeedDial.md](../Patterns/SpeedDial.md) — Future expansion pattern
- [Tooltip.md](Tooltip.md) — Desktop hover label

---

## Anti-patterns

1. **More than one FloatingButton per screen** — Only one primary action per view.
2. **Using FloatingButton on desktop-only interfaces** — Reserved for mobile/touch interfaces. On desktop, use standard Button placement.
3. **Overlaying bottom navigation** — FloatingButton must offset above bottom navigation bars (use `bottomOffset`).
4. **Hiding by default** — FloatingButton must be visible on mount unless explicitly suppressed for onboarding.
5. **Using as a toggle** — FloatingButton is an action trigger, not a state toggle.
6. **Text inside FloatingButton** — Icon only. Text belongs in tooltip or a standard Button.
7. **Changing size** — 56px is fixed. Do not override dimensions.

---

## Performance Notes

- Single `<button>` DOM node — minimal footprint
- Renders inline by default; optionally via Portal for fixed-position rendering
- Mount/unmount animations use CSS transitions, not JS animation libraries
- Hidden state removes from layout flow via `display: none` or conditional render
- Tooltip is lazy-mounted on first hover — no pre-render cost
- Shadow uses CSS `box-shadow` — no image assets or pseudo-element overhead
- Position calculations (bottomOffset, rightOffset) are handled via CSS custom properties
