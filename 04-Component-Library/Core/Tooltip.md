# Tooltip

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md), [Motion-System.md](../../02-Design-Language/Motion-System.md))

---

## Purpose

Tooltip provides supplementary information when a user hovers over, focuses on, or touches an element. It reveals a short, contextual description of the target element's function or meaning. Tooltips are always text-only and appear after a 500ms delay, disappearing 100ms after the cursor leaves.

---

## Responsibilities

- Display a short text label near the target element on hover, focus, or touch
- Position relative to the target element (top, bottom, left, right)
- Appear after a 500ms delay (show delay) to avoid flickering during cursor movement
- Disappear 100ms after the cursor leaves the target (hide delay)
- Reposition automatically to stay within the viewport
- Render a small arrow indicator pointing toward the target element
- Support rich content (text only — no interactive elements)
- Respect `prefers-reduced-motion`

---

## Composition

```
Tooltip
├── Trigger (wrapped child element)
└── Tooltip Content (rendered via Portal)
    ├── Arrow (positioned toward trigger)
    └── Label (text content)

Renders via Portal to document.body to avoid overflow clipping.
```

Tooltip uses:
- `Portal` — renders tooltip content outside the parent DOM hierarchy to prevent overflow clipping

---

## Hierarchy

**Level:** 1 (Core Primitive)

**Parent:** None (wraps any interactive element; consumed by IconButton, Button, floatingButton, and any component needing explanation)

**Children:**
- `Portal` (Level 0, optional) — teleport to body for overflow-safe positioning

**Siblings:** `Surface`, `Container`, `Divider`, `Avatar`, `Badge`, `Chip`, `Tag`

---

## Props Contract

```typescript
/**
 * Tooltip position relative to the target element.
 */
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Tooltip show/hide delay strategy.
 * - default: 500ms show, 100ms hide
 * - fast: 200ms show, 50ms hide (for frequently used tools)
 */
type TooltipDelayStrategy = 'default' | 'fast';

interface TooltipProps {
  /** Tooltip content text. Required for accessibility. */
  label: string;
  /** Position relative to children. @default 'top' */
  position?: TooltipPosition;
  /** Delay strategy. @default 'default' */
  delayStrategy?: TooltipDelayStrategy;
  /** Custom show delay in ms. Overrides delay strategy. */
  showDelay?: number;
  /** Custom hide delay in ms. Overrides delay strategy. */
  hideDelay?: number;
  /** Maximum width of the tooltip in pixels. @default 280 */
  maxWidth?: number;
  /** Whether the tooltip is disabled. @default false */
  isDisabled?: boolean;
  /** Whether the tooltip is always visible (for demo/debug). @default false */
  forceVisible?: boolean;
  /** Whether to show the arrow indicator. @default true */
  showArrow?: boolean;
  /** The element that triggers the tooltip. */
  children: React.ReactElement;
  /** Additional class names for the tooltip content. */
  className?: string;
  /** Additional class names for the trigger wrapper. */
  triggerClassName?: string;
  /** Data test ID for automated testing. */
  dataTestId?: string;
}
```

---

## Variants

Tooltip has a single visual variant. Only position and delay strategy vary.

### Default Tooltip

| Property | Value |
|----------|-------|
| Background | Neutral-800 (light), Neutral-700 (dark) |
| Text Color | White (light), White (dark) |
| Font Size | 13px (Caption) |
| Font Weight | 400 (Regular) |
| Padding | 6px 10px (Space-2 Space-3) |
| Border Radius | Radius-Sm (4px) |
| Max Width | 280px |
| Text Align | Center |
| Arrow Size | 6px (equilateral triangle) |
| Arrow Color | Matches background |
| Shadow | Layer 2 elevation |

---

## Positions

### Top (Default)
Tooltip appears above the target, centered horizontally.

```
  ┌──────────┐
  │  Label   │
  └────▽─────┘
    [target]
```

### Bottom
Tooltip appears below the target, centered horizontally.

```
    [target]
  ┌────△─────┐
  │  Label   │
  └──────────┘
```

### Left
Tooltip appears to the left of the target, centered vertically.

```
┌──────────┐
│  Label   │◄── [target]
└──────────┘
```

### Right
Tooltip appears to the right of the target, centered vertically.

```
[target] ──► ┌──────────┐
             │  Label   │
             └──────────┘
```

---

## Delays

| Strategy | Show Delay | Hide Delay | Use Case |
|----------|------------|------------|----------|
| Default | 500ms | 100ms | Standard tooltips |
| Fast | 200ms | 50ms | Frequently used tools (toolbar, formatting) |

**Delay Rules:**
1. Show delay starts on mouseenter/focusin. Timer resets if mouse leaves before delay completes.
2. Hide delay starts on mouseleave/focusout. Tooltip disappears immediately on blur if another element gains focus.
3. No delay on touch (mobile) — tooltip appears immediately on long-press (500ms hold).
4. Moving cursor from trigger to tooltip content does not dismiss (hover intent).

---

## States

| State | Trigger | Visual Change | Duration |
|-------|---------|--------------|----------|
| Hidden | — | Not rendered | — |
| Show pending | Mouse enter / focus | Timer starts (500ms) | 500ms |
| Visible | Timer completes | Tooltip appears with fade+slide | 150ms |
| Hide pending | Mouse leave / blur | Timer starts (100ms) | 100ms |
| Hidden (touch) | Touch ends | Tooltip disappears | 150ms |
| Disabled | `isDisabled` prop | Tooltip never appears | — |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Trigger role | Tooltip wraps the trigger element, does not modify its role |
| Tooltip content | `role="tooltip"` on the content element |
| Trigger association | `aria-describedby` pointing to tooltip content `id` |
| Keyboard | Tooltip appears on focus (Tab key) and disappears on blur |
| Touch | Tooltip appears on long-press (500ms) — no hover on mobile |
| Screen reader | Tooltip content is announced when trigger receives focus |
| Dismiss | Escape key dismisses tooltip (returns focus to trigger) |
| Interactive content | Tooltip must not contain interactive elements (buttons, links, inputs) |

The tooltip trigger receives `aria-describedby` pointing to the tooltip element's `id`. This ensures screen readers announce the tooltip content when the element receives focus.

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Tooltip suppressed (no hover). Content description must be available through `aria-label` on the element itself. |
| Tablet (768-1023px) | Tooltip visible on hover. Position may flip to bottom if top would overflow. |
| Desktop (1024px+) | Standard behavior. Position flips to stay within viewport. |
| Wide (1280px+) | Standard behavior. |
| Ultra-wide (1600px+) | Standard behavior. |

On mobile and touch devices, tooltips are suppressed because there is no hover state. Any information that would be shown in a tooltip must be visible or accessible through the element's `aria-label` or visible label text.

---

## Animation Rules

| Action | Duration | Easing | Property |
|--------|----------|--------|----------|
| Show | 150ms | Ease-Out | opacity, transform (translateY: 4px → 0) |
| Hide | 100ms | Ease-In | opacity, transform (translateY: 0 → 4px) |

- On `prefers-reduced-motion`: show/hide use opacity only (no transform)
- Only Y-axis translation for top/bottom; X-axis for left/right
- Show direction: tooltip slides away from trigger (top tooltip slides down 4px on show, bottom slides up 4px on show)

---

## Future Expansion

- **Rich tooltip** — Tooltip with formatted text, icons, or small data visualizations
- **Tooltip group** — Shared tooltip manager to prevent multiple simultaneous tooltips
- **Interactive tooltip** — Tooltip with hoverable content (for rich previews — use Popover instead)
- **Click-to-dismiss** — Click anywhere outside to dismiss tooltip

---

## Dependencies

| Dependency | Type | Usage |
|------------|------|-------|
| Portal | Internal (Level 0, optional) | Render tooltip outside parent for overflow-safe positioning |
| Design Tokens | External (DP-1) | Colors, typography, spacing, border radius |

---

## Related Components

- [Popover.md](Popover.md) — Rich content overlay (use Popover for interactive content, links, or complex layouts)
- [IconButton.md](IconButton.md) — Primary consumer of Tooltip
- [Button.md](Button.md) — Uses Tooltip for icon-only variants
- [FloatingButton.md](FloatingButton.md) — Uses Tooltip for desktop label

---

## Anti-patterns

1. **Tooltip on disabled element** — Disabled elements do not fire hover/focus events. Wrap the disabled element in a `<span>` and apply tooltip to the span.
2. **Interactive content in Tooltip** — Tooltip must be text-only. Use Popover for interactive content.
3. **Repeating visible label** — If the element already has a visible text label, a tooltip is redundant.
4. **Tooltip for essential information** — Essential information must be visible at all times, not hidden in a tooltip.
5. **Tooltip on mobile** — Tooltips do not work on touch. Ensure all tooltip content is available through `aria-label`.
6. **Long tooltip text** — Keep text under 50 characters. Longer content should use Popover.
7. **No delay** — Removing the show delay causes tooltip flicker during cursor movement across multiple elements.

---

## Performance Notes

- Tooltip content is rendered lazily (on first hover/focus), not pre-rendered
- Uses `Portal` to render outside DOM hierarchy — avoids z-index and overflow issues
- Position calculation runs on show (not continuously) — no ResizeObserver or scroll listeners
- Tooltip uses a single floating DOM node that is reused (not created/destroyed on each show)
- Show/hide delays use `setTimeout` — clean up timers on unmount to prevent memory leaks
- Position flips viewport check is a one-time calculation on show — no continuous polling
- `forceVisible` prop for demo/debug renders tooltip always — use only in development
- Avoid wrapping tooltip trigger in unnecessary `<div>` — use `React.cloneElement` to attach event handlers directly
