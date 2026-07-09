# Popover

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md), [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md), [Motion-System.md](../../02-Design-Language/Motion-System.md))

---

## Purpose

Popover is a rich content overlay that appears when a user clicks or activates a trigger element. Unlike Tooltip, Popover supports arbitrary content (text, images, forms, lists, actions) and interactive elements. It is used for contextual menus, inline help, detail previews, configuration panels, and quick actions.

---

## Responsibilities

- Display rich content in a floating overlay near the trigger element
- Open on click (not hover) to distinguish from Tooltip
- Close on outside click, Escape key, or programmatic dismiss
- Position relative to the trigger with automatic viewport-aware flipping
- Render an optional arrow indicator pointing toward the trigger
- Trap focus within the popover when open
- Return focus to the trigger element when closed
- Support arbitrary React content (text, interactive elements, complex layouts)

---

## Composition

```
Popover
├── Trigger (wrapped child element)
└── Popover Content (rendered via Portal)
    ├── Arrow (optional, pointing toward trigger)
    └── Content (arbitrary children)
        ├── Text
        ├── Form elements
        ├── Lists
        ├── Actions (buttons, links)
        └── Other components
```

Popover uses:
- `Portal` — renders content outside parent DOM hierarchy
- `ClickOutside` — detects outside clicks to dismiss
- `FocusTrap` — traps focus within popover for accessibility

---

## Hierarchy

**Level:** 2 (Core Composite)

**Parent:** None (wraps any element as trigger; consumed by Dropdown, DatePicker, Select, CommandPalette, ContextMenu)

**Children:**
- `Portal` (Level 0) — teleport content to body
- `ClickOutside` (Level 0) — outside click detection
- `FocusTrap` (Level 0) — focus within popover

**Siblings:** `Tooltip`, `Card`, `Panel`

---

## Props Contract

```typescript
/**
 * Popover position relative to the trigger element.
 */
type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Popover open trigger.
 */
type PopoverTrigger = 'click' | 'manual';

/**
 * Popover placement alignment relative to the trigger.
 * - start: Aligned to the start edge of the trigger
 * - center: Centered on the trigger
 * - end: Aligned to the end edge of the trigger
 */
type PopoverAlign = 'start' | 'center' | 'end';

interface PopoverProps {
  /** Popover content. Can be any React node including interactive elements. */
  children: React.ReactNode;
  /** The element that triggers the popover. */
  trigger: React.ReactElement;
  /** Position relative to trigger. @default 'bottom' */
  position?: PopoverPosition;
  /** Alignment along the position axis. @default 'center' */
  align?: PopoverAlign;
  /** Whether the popover is open. Use for controlled state. */
  isOpen?: boolean;
  /** Whether the popover opens by default (uncontrolled). @default false */
  defaultOpen?: boolean;
  /** Open trigger method. @default 'click' */
  triggerMethod?: PopoverTrigger;
  /** Whether clicking outside closes the popover. @default true */
  closeOnOutsideClick?: boolean;
  /** Whether pressing Escape closes the popover. @default true */
  closeOnEscape?: boolean;
  /** Whether to show the arrow indicator. @default true */
  showArrow?: boolean;
  /** Whether to trap focus within the popover. @default true */
  trapFocus?: boolean;
  /** Whether to return focus to trigger on close. @default true */
  returnFocus?: boolean;
  /** Gap between trigger and popover in pixels. @default 8 */
  gap?: number;
  /** Maximum width of the popover in pixels. @default 320 */
  maxWidth?: number;
  /** Maximum height of the popover in pixels (scrollable). */
  maxHeight?: number;
  /** Z-index for the popover. @default 1000 */
  zIndex?: number;
  /** Whether the popover is disabled. @default false */
  isDisabled?: boolean;
  /** Callback when popover opens. */
  onOpen?: () => void;
  /** Callback when popover closes. */
  onClose?: () => void;
  /** ARIA label for the popover content region. */
  ariaLabel?: string;
  /** Additional class names for the popover content. */
  className?: string;
  /** Additional class names for the trigger wrapper. */
  triggerClassName?: string;
  /** Data test ID for automated testing. */
  dataTestId?: string;
}
```

---

## Variants

Popover has a single visual variant. Customization is achieved through content composition rather than component variants.

### Default Popover

| Property | Value |
|----------|-------|
| Background | Surface-1 (White / Neutral-100) |
| Border | Border-Default (1px solid) |
| Border Radius | Radius-Md (8px) |
| Shadow | Layer 3 (highest functional elevation) |
| Padding | 16px (Space-5) |
| Min Width | 160px |
| Max Width | 320px (configurable) |
| Arrow Size | 8px |
| Arrow Color | Matches surface background |

---

## Positions

Same positioning model as Tooltip with additional alignment options.

### Position: Bottom × Align: Center (Default)
```
   [trigger]
  ┌────△─────┐
  │  Content │
  └──────────┘
```

### Position: Bottom × Align: Start
```
   [trigger]
  ┌──△──────────┐
  │  Content    │
  └─────────────┘
```

### Position: Bottom × Align: End
```
   [trigger]
  ──────△──┐
  │  Content│
  └────────┘
```

All four positions (top, bottom, left, right) support all three alignments (start, center, end).

---

## States

| State | Trigger | Visual Change | Duration |
|-------|---------|--------------|----------|
| Closed | — | Not rendered | — |
| Open | Click trigger | Popover renders with fade+scale animation | 200ms |
| Closing | Outside click / Escape | Popover fades out | 150ms |
| Disabled | `isDisabled` prop | Popover never opens | — |
| Focus trap | Popover open | Focus moves to first focusable element inside | Instant |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Trigger role | Trigger element retains its role. Popover adds `aria-expanded` and `aria-haspopup="dialog"`. |
| Content role | `role="dialog"` or `role="region"` depending on content |
| ARIA label | `aria-label` or `aria-labelledby` on the content region |
| ARIA describedby | `aria-describedby` for additional description |
| Focus management | Focus trapped inside popover when open. Tab cycles through focusable elements. |
| Focus return | Focus returns to trigger element on close |
| Keyboard open | Enter or Space on trigger opens popover |
| Keyboard close | Escape closes popover |
| Outside click | Click outside closes popover (configurable) |
| Screen reader | `aria-live="polite"` for dynamic content changes |
| Dismiss button | Provide close button in content for mouse users |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Popover renders as bottom sheet (full-width, anchored to bottom of viewport). No arrow. Close on backdrop click and swipe down. |
| Tablet (768-1023px) | Standard popover behavior. May render as bottom sheet for dense content. |
| Desktop (1024-1279px) | Standard floating popover. Auto-flip to stay in viewport. |
| Wide (1280px+) | Standard floating popover. |
| Ultra-wide (1600px+) | Standard floating popover. |

On mobile, the popover transforms into a bottom sheet for better thumb reachability:
- Width: 100% of viewport
- Position: Fixed to bottom
- Border radius: Radius-Lg top corners, 0 bottom corners
- Backdrop: Semi-transparent overlay
- Swipe down to dismiss
- Sheet handle indicator at top center

---

## Animation Rules

| Action | Duration | Easing | Property |
|--------|----------|--------|----------|
| Open | 200ms | Ease-Out | opacity, transform (scale 0.95 → 1, translateY 8px → 0) |
| Close | 150ms | Ease-In | opacity, transform (scale 1 → 0.95, translateY 0 → 8px) |
| Position flip | 200ms | Ease-Out | transform (reposition) |

- On `prefers-reduced-motion`: open/close use opacity only (no scale/translate)
- Mobile bottom sheet: slide up (300ms Ease-Out) on open, slide down (200ms Ease-In) on close
- Backdrop fades in/out (200ms Ease-Out / 150ms Ease-In)

---

## Future Expansion

- **Hover popover** — Popover that opens on hover with intent detection (for previews)
- **Nested popover** — Popover within popover for multi-level menus
- **Contextual popover** — Right-click context menu behavior
- **Draggable popover** — User can reposition the popover by dragging
- **Resizable popover** — User can resize the popover for content visibility
- **Popover stack** — Multiple popovers stacked with backdrop dimming for focus

---

## Dependencies

| Dependency | Type | Usage |
|------------|------|-------|
| Portal | Internal (Level 0) | Render outside parent DOM |
| ClickOutside | Internal (Level 0) | Detects outside clicks |
| FocusTrap | Internal (Level 0) | Focus management |
| Design Tokens | External (DP-1) | Colors, typography, spacing, border radius, shadow |

---

## Related Components

- [Tooltip.md](Tooltip.md) — Text-only hover/focus reveal (simpler, non-interactive)
- [Dropdown.md](../Navigation/Dropdown.md) — Specialized popover for menu lists
- [Dialog.md](../Feedback/Dialog.md) — Modal dialog for critical interactions
- [Select.md](../Forms/Select.md) — Uses Popover for option list
- [DatePicker.md](../Forms/DatePicker.md) — Uses Popover for calendar overlay
- [ContextMenu.md](../Navigation/ContextMenu.md) — Right-click popover

---

## Anti-patterns

1. **Using Popover for hover content** — Use Tooltip for hover/focus text-only content. Popover is click-activated.
2. **Interactive content in Tooltip** — Use Popover for any content with buttons, links, forms, or interactive elements.
3. **Multiple open popovers** — Only one popover should be open at a time. Close existing before opening new.
4. **Popover on disabled trigger** — Disabled elements do not fire click events. Wrap in `<span>` for proper behavior.
5. **No dismiss mechanism** — Always provide at least one dismiss method (outside click, Escape, or close button).
6. **Popover covering trigger** — Popover must never cover the trigger element entirely. Use position and gap to keep trigger visible.
7. **Overflowing viewport** — Popover must automatically reposition to stay within viewport bounds.
8. **Focus trap without escape** — If `trapFocus` is true, Escape must always dismiss the popover.
9. **Nested interactive popovers** — Do not open a popover from within another popover (use nested menus or dialogs instead).

---

## Performance Notes

- Popover content is lazily rendered (on first open) — no DOM overhead when closed
- Uses `Portal` to render outside parent DOM — avoids z-index stacking context issues
- Position calculation runs on open and viewport resize/scroll — debounced scroll listener
- ClickOutside uses a single document-level listener (not per-instance) for performance
- FocusTrap only activates when popover is open — no runtime cost when closed
- Mobile bottom sheet variant renders same content but with different positioning classes
- Avoid heavy content inside popover — content is rendered on open, not pre-rendered
- Close animations use CSS transitions — no JavaScript animation libraries
- Clean up all event listeners (scroll, resize, outside click) on unmount via useEffect return
- Use `React.memo` on static popover content to prevent re-renders when parent updates
