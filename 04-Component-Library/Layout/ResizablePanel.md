# ResizablePanel

## Purpose
Creates a user-adjustable split pane with a draggable handle, allowing users to resize panel sections to their preferred dimensions.

## Responsibilities
- Render a drag handle between two panel regions
- Enforce minimum and maximum size constraints
- Support collapse/expand toggle
- Persist the user's size preference across sessions
- Call resize callback on drag

## Composition
```
ResizablePanel
├── Panel (primary, left/top)
├── DragHandle
│   └── Visual grip indicator + hit area
└── Panel (secondary, right/bottom)
```

## Hierarchy
- ResizablePanel contains exactly two child panel elements.
- DragHandle separates them.
- ResizablePanel lives inside a Section, ContentArea, or Workspace context panel.

## Props Contract (TypeScript)
```typescript
type ResizableDirection = 'horizontal' | 'vertical';

interface ResizablePanelProps {
  direction?: ResizableDirection;        // default 'horizontal'
  defaultSize?: number;                  // initial size in px, default 300
  minSize?: number;                      // minimum size in px, default 150
  maxSize?: number;                      // maximum size in px, default 800
  collapsed?: boolean;                   // controlled collapsed state
  defaultCollapsed?: boolean;            // default false
  onCollapseToggle?: (collapsed: boolean) => void;
  onResize?: (size: number) => void;
  persistKey?: string;                   // localStorage key for size persistence
  panelAriaLabel?: string;               // aria-label for adjustable panel
  children: [React.ReactNode, React.ReactNode]; // exactly two children
  className?: string;
}
```

## Variants
| Variant | Direction | Use Case |
|---------|-----------|----------|
| Horizontal | `horizontal` | Side-by-side panels (code editor + preview) |
| Vertical | `vertical` | Stacked panels (log viewer + results) |

## States
| State | Description |
|-------|-------------|
| Idle | Default position. |
| Dragging | User is actively resizing. Drag handle highlighted. Cursor changes to `col-resize` or `row-resize`. |
| Collapsed | Panel is hidden; drag handle still visible to restore. |
| Min-bound | Panel at minimum size; cannot shrink further. |
| Max-bound | Panel at maximum size; cannot grow further. |

## Accessibility
- Drag handle has `role="separator"` and `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- Handle is keyboard accessible via Arrow keys (ArrowLeft/ArrowRight for horizontal, ArrowUp/ArrowDown for vertical).
- Panel region has `aria-label` describing its purpose.
- Collapse toggle button has `aria-expanded` and `aria-controls`.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| ≥768px | Drag handle is interactive; panels resize freely |
| <768px | Panels stack vertically regardless of `direction` prop; drag handle hidden; sizes reset to fill available space |

## Animation Rules
- Collapse/expand transition: 250ms ease-in-out on width or height.
- Drag resize updates are instant (no animation during drag).
- Handle hover: background-color transition 150ms.

## Future Expansion
- Multiple panel resizing (3+ panels).
- Double-click handle to auto-fit content.
- Snap-to-content-width behavior.
- Persist via server/API in addition to localStorage.

## Dependencies
- No external dependencies. Uses pointer events (`onPointerDown`/`onPointerMove`/`onPointerUp`) for drag handling.

## Related Components
- **SplitView** — ResizablePanel is an implementation of SplitView with drag-resize.
- **Workspace** — context panel uses ResizablePanel internally.
- **Section** — Sections inside panels use ResizablePanel for layout.

## Anti-patterns
- ❌ Do not place ResizablePanel inside a scrollable container — the panels themselves should scroll.
- ❌ Do not use more than one ResizablePanel nested unless explicitly designed (max 2 levels).
- ❌ Do not remove the drag handle — users need visual + interactive affordance.
- ❌ Do not resize panels on `window.resize` automatically — respect the user's preference.

## Performance Notes
- Drag handler uses pointer events for low-latency interaction.
- Resize values are throttled to 60fps via `requestAnimationFrame`.
- Persist writes are debounced (500ms) to avoid excessive localStorage writes.
- Avoid heavy layout recalculations in `onResize` — prefer CSS containment.
