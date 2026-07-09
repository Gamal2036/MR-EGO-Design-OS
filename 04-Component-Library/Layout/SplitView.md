# SplitView

## Purpose
Divides available space into two panels (primary and secondary) for side-by-side or stacked comparison of content.

## Responsibilities
- Render primary and secondary panels in a split layout
- Support configurable size ratios (50/50, 60/40, 70/30)
- Switch between side-by-side and stacked orientations
- Responsively stack on mobile

## Composition
```
SplitView
├── SplitView.Primary
│   └── (content)
└── SplitView.Secondary
    └── (content)
```

## Hierarchy
- SplitView is a direct child of ContentArea or Section.
- Primary is always rendered first; Secondary second.
- Children are plain wrappers — no drag handle (see ResizablePanel for adjustable split).

## Props Contract (TypeScript)
```typescript
type SplitRatio = '50/50' | '60/40' | '70/30';
type SplitVariant = 'side-by-side' | 'stacked';

interface SplitViewProps {
  variant?: SplitVariant;                // default 'side-by-side'
  ratio?: SplitRatio;                    // default '50/50', applies when side-by-side
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  stackAtBreakpoint?: 'sm' | 'md' | 'lg'; // default 'sm'
  gap?: 'none' | 'sm' | 'md' | 'lg';    // default 'md'
  reverseOnStack?: boolean;              // default false — secondary appears first on mobile
  children?: never;                      // use primary/secondary props instead
  className?: string;
}

interface SplitViewPanelProps {
  children: React.ReactNode;
  className?: string;
}
```

## Variants
| Variant | Orientation | Ratio Applied | Use Case |
|---------|-------------|---------------|----------|
| side-by-side 50/50 | Horizontal | 1fr 1fr | Equal comparison |
| side-by-side 60/40 | Horizontal | 3fr 2fr | Content + sidebar |
| side-by-side 70/30 | Horizontal | 7fr 3fr | Main content + aside |
| stacked | Vertical | 1fr 1fr | Mobile, small viewports |

## States
SplitView is stateless.

## Accessibility
- Both panel regions should contain landmark content (e.g., `<section>`, `<aside>`).
- Use `aria-label` on panels when the purpose is not clear from context.
- Panel order in source must match visual order for keyboard users.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| ≥768px (default) | Side-by-side with configured ratio |
| <768px | Stacks vertically (full width each). `reverseOnStack` swaps order. |
| Configurable | `stackAtBreakpoint` allows overriding the stack threshold |

## Animation Rules
- No animations on split layout changes. Mode switches (side-by-side → stacked) happen at breakpoint boundaries without transition.

## Future Expansion
- Three-panel split view.
- Resizable split (see ResizablePanel).
- Collapsible secondary panel with toggle.
- Save panel state.

## Dependencies
- None — uses CSS Grid (`grid-template-columns`) or Flexbox.

## Related Components
- **ResizablePanel** — interactive version of SplitView with drag handle.
- **Workspace** — SplitView can be used inside ContentArea for split-page layouts.
- **Section** — Sections can be placed inside each panel.
- **Grid** — for more complex multi-column splits, prefer Grid over SplitView.

## Anti-patterns
- ❌ Do not nest SplitView inside SplitView — use Grid for complex multi-panel layouts.
- ❌ Do not use SplitView for 3+ regions — use Grid instead.
- ❌ Do not use SplitView when panels need resizing — use ResizablePanel.
- ❌ Do not use `primary`/`secondary` and `children` simultaneously.

## Performance Notes
- Layout is CSS-based; no JavaScript calculations required for ratio distribution.
- Ratio changes do not trigger re-renders of children — only the parent's grid template changes.
- Stacking at breakpoints uses CSS media queries, not JS resize listeners.
