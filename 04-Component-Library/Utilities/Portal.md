# Portal

## Purpose
Teleports children to a different DOM location (typically `document.body`) to escape parent overflow, z-index, or stacking context constraints.

## Responsibilities
- Render children into a portal container at the document body level
- Manage z-index for stacked portals (modals, tooltips, dropdowns)
- Clean up portal container on unmount
- Support custom target element

## Composition
```
// Renders children to body, not in parent DOM tree
Portal
└── (children rendered at document.body or custom target)
```

## Hierarchy
- Portal is transparent in the React tree — children maintain context and event propagation.
- Portal is used inside Modal, Tooltip, Dropdown, and FocusTrap components.

## Props Contract (TypeScript)
```typescript
interface PortalProps {
  children: React.ReactNode;
  target?: HTMLElement | string;         // element or selector, default document.body
  containerId?: string;                  // optional ID for the container element
  zIndex?: number;                       // stack order, default via --z-portal token
  disabled?: boolean;                    // render in-place without portal, default false
  onMount?: () => void;                  // callback after portal is mounted
  onUnmount?: () => void;                // callback before portal unmounts
}
```

## Variants
Portal has no visual variants — it is a behavioral utility.

## States
Portal is stateless.

## Accessibility
- Portal preserves focus management — no ARIA needed on the portal itself.
- `containerId` helps identify portal containers for testing and debugging.
- Do not render interactive content in a portal without managing focus (use FocusTrap).
- Multiple portals stack correctly via z-index management.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| All | Portal behavior is consistent across breakpoints. |

## Animation Rules
- Portal does not provide animations — wrap children in a transition group if needed.
- Mount/unmount transitions are handled by the parent component (e.g., Modal, Tooltip).

## Future Expansion
- Portal stacking context with automatic z-index increment.
- Named portal outlets (e.g., `<Portal outlet="modal">`).
- Animated portal entry/exit via framer-motion integration.

## Dependencies
- `ReactDOM.createPortal` — React's built-in portal API.

## Related Components
- **FocusTrap** — often used together with Portal for modals/dialogs.
- **ClickOutside** — used with Portal for dropdowns/tooltips.
- **Modal** — uses Portal to render above all content.
- **Tooltip** — uses Portal to avoid overflow clipping.

## Anti-patterns
- ❌ Do not use Portal when the element can stay in the DOM tree (e.g., simple tooltips in overflow:visible containers).
- ❌ Do not render multiple portals with the same `containerId` — they will collide.
- ❌ Do not rely on Portal to fix all z-index issues — proper stacking context design is preferred.
- ❌ Do not use Portal for non-UI teleportation (e.g., moving form state) — use context.
- ❌ Do not forget to clean up portal containers on unmount.

## Performance Notes
- Portal uses `ReactDOM.createPortal` — no extra DOM traversal overhead.
- Use `disabled` prop to conditionally portal only when needed (e.g., only portal mobile drawers on small screens).
- Portal containers are reused when `containerId` matches — avoids creating/destroying DOM nodes.
- Event propagation through portals follows React tree, not DOM tree — no performance penalty.
