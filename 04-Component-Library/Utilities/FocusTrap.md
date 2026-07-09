# FocusTrap

## Purpose
Traps keyboard focus within a container element, ensuring Tab cycling stays within the trap while also returning focus to the previously active element on unmount.

## Responsibilities
- Trap Tab and Shift+Tab focus cycling within the container
- Return focus to the element that was active before trap activation
- Handle first and last focusable element wrapping
- Identify all focusable elements within the container

## Composition
```
FocusTrap
└── (children — typically a Modal, Drawer, or Dialog)
```

## Hierarchy
- FocusTrap wraps the content that should trap focus.
- FocusTrap lives inside Portal (for modals/dialogs) or inline (for sidebars/drawers).
- FocusTrap contains no visual elements — it is a behavioral wrapper.

## Props Contract (TypeScript)
```typescript
interface FocusTrapProps {
  children: React.ReactNode;
  active?: boolean;                      // enable/disable trap, default true
  initialFocus?: 'auto' | 'first' | 'container' | React.RefObject<HTMLElement>;
  // 'auto' = first focusable input, 'first' = first focusable element, 'container' = container itself
  restoreFocus?: boolean;                // return focus on unmount, default true
  restoreFocusRef?: React.RefObject<HTMLElement>; // specific element to restore focus to
  returnFocusOnDeactivate?: boolean;     // return focus when active becomes false, default true
  allowOutsideClick?: boolean;           // allow clicks outside trap, default false
  onEscape?: () => void;                 // Escape key handler
  onActivation?: () => void;             // callback when trap activates
  onDeactivation?: () => void;           // callback when trap deactivates
  className?: string;
}
```

## Variants
FocusTrap has no visual variants — it is a behavioral utility.

## States
| State | Description |
|-------|-------------|
| Active | Focus is trapped inside the container. |
| Inactive | Focus flows normally through the container. |
| Activating | Focus is being moved to the first element. |

## Accessibility
- This is a critical accessibility component — all modals, drawers, and dialogs MUST use FocusTrap.
- Focusable elements identified: `<a>`, `<button>`, `<input>`, `<textarea>`, `<select>`, `[tabindex]` (not -1), `[contenteditable]`.
- First focusable element receives focus on activation.
- Tab wraps from last element back to first; Shift+Tab wraps from first to last.
- Escape handler should close the parent modal/dialog.
- No ARIA attribute is set by FocusTrap — the parent component is responsible for `aria-modal`, `role="dialog"`, etc.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| All | Focus behavior is consistent across breakpoints. |

## Animation Rules
- FocusTrap does not provide animations.
- Parent components should delay trap activation until mount animation completes.

## Future Expansion
- Nested focus traps (trap inside trap — e.g., modal with a nested confirm dialog).
- Focus lock with arrow-key navigation for list-like content.
- Configurable focusable element selector.
- Auto-focus restoration for single-page app navigation.

## Dependencies
- None — uses native DOM focus management.

## Related Components
- **Portal** — FocusTrap is typically used inside Portal for modals.
- **Modal** — uses FocusTrap.
- **Drawer** — uses FocusTrap on mobile.
- **Workspace** — mobile sidebar uses FocusTrap.

## Anti-patterns
- ❌ Do not use FocusTrap without a visible focus indicator on the first element.
- ❌ Do not trap focus when the container is not visible — deactivate the trap.
- ❌ Do not nest more than 2 FocusTraps — nested trapping is confusing; handle with a single trap.
- ❌ Do not set `initialFocus="container"` without `tabindex="-1"` on the container.
- ❌ Do not forget to handle Escape inside the trap — users expect it to close the dialog.

## Performance Notes
- Focusable element query (`querySelectorAll(focusableSelector)`) runs once on activation.
- MutationObserver can be used to detect dynamically added focusable elements, but this is opt-in for performance.
- No event listeners are attached when `active={false}`.
- Focus trap uses event capture phase for Tab trapping — no impact on other event handlers.
