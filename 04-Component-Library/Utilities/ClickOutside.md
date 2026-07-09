# ClickOutside

## Purpose
Detects clicks or pointer events outside of a wrapped element and invokes a callback, used for closing dropdowns, modals, and tooltips.

## Responsibilities
- Detect pointer-down events outside the wrapped element
- Support configurable ignore elements (e.g., exclude the trigger button)
- Clean up event listeners on unmount
- Handle nested portal scenarios

## Composition
```
ClickOutside
└── (children — the element to watch for outside clicks)
```

## Hierarchy
- ClickOutside wraps a single child element.
- It is used inside Dropdown, Menu, Modal (backdrop click), Tooltip, and Popover.

## Props Contract (TypeScript)
```typescript
interface ClickOutsideProps {
  children: React.ReactNode;
  handler: (event: MouseEvent | TouchEvent) => void;
  active?: boolean;                      // enable/disable detection, default true
  events?: ('mousedown' | 'mouseup' | 'click' | 'touchstart' | 'touchend')[];
  // default ['mousedown', 'touchstart']
  ignore?: (HTMLElement | null)[];       // refs to elements that should not trigger handler
  ignoreClass?: string;                  // class name to ignore clicks on (e.g., 'ignore-outside')
  ignoreSelector?: string;               // CSS selector for elements to ignore
  excludeScrollbars?: boolean;           // ignore clicks on scrollbars, default true
  defer?: boolean;                       // defer first event to avoid immediate close, default true
  portalTarget?: HTMLElement | null;     // if children are portaled, the portal container
}
```

## Variants
ClickOutside has no visual variants — it is a behavioral utility.

## States
| State | Description |
|-------|-------------|
| Listening | Event listeners are attached to the document. |
| Idle | Event listeners are detached (`active={false}`). |

## Accessibility
- ClickOutside must not prevent keyboard dismissal of the parent component (Escape key).
- The parent component (Dropdown, Menu, etc.) must still support keyboard navigation.
- ClickOutside only handles pointer events — keyboard focus management is handled separately.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| All | Consistent behavior across breakpoints. |
| Touch | `touchstart` event is included by default for mobile support. |

## Animation Rules
- ClickOutside does not provide animations.

## Future Expansion
- Right-click / context menu detection.
- ClickOutside with nested ignore (ignore children of ignored elements).
- Scroll-outside detection (user scrolls away from open dropdown).

## Dependencies
- None — uses native DOM event listeners.

## Related Components
- **Dropdown** — uses ClickOutside to close on outside click.
- **Menu** — uses ClickOutside to close on outside click.
- **Tooltip** — uses ClickOutside to dismiss tooltip.
- **Popover** — uses ClickOutside to close.
- **Modal** — uses ClickOutside (on backdrop) to close.

## Anti-patterns
- ❌ Do not use ClickOutside on modal dialogs with `aria-modal="true"` — use Escape + FocusTrap instead.
- ❌ Do not forget `defer={true}` — without it, the click that opened the component may also close it.
- ❌ Do not attach ClickOutside to the trigger button — wrap the dropdown/menu content instead.
- ❌ Do not use ClickOutside for components that should only close via explicit close button.
- ❌ Do not rely solely on ClickOutside for mobile — touch events must be handled.

## Performance Notes
- Event listeners use capture phase (`addEventListener(type, handler, true)`) for reliable detection.
- Listeners are added/removed based on `active` prop — no listeners when not needed.
- The `ignore` array uses `Node.contains()` for comparison — O(1) for single elements.
- Use `ignoreClass` instead of building an `ignore` array when many elements should be excluded.
