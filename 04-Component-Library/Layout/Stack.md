# Stack

## Purpose
Arranges child elements in a single vertical or horizontal axis with consistent spacing and alignment.

## Responsibilities
- Lay out children vertically (VStack) or horizontally (HStack)
- Apply uniform spacing between items
- Align items along the cross-axis (start, center, end, stretch)
- Optionally render dividers between items
- Stretch children to fill available space

## Composition
```
Stack
├── Stack.Item (×N, implicit children)
│   └── (child content)
└── Stack.Divider (×N−1, optional)
```

## Hierarchy
- Stack wraps a flat list of children.
- Stack.Divider is automatically inserted between items.
- Stacks are commonly nested for complex layouts.

## Props Contract (TypeScript)
```typescript
type StackOrientation = 'vertical' | 'horizontal';
type StackAlignment = 'start' | 'center' | 'end' | 'stretch';
type StackSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface StackProps {
  orientation?: StackOrientation;        // default 'vertical'
  spacing?: StackSpacing;                // default 'md'
  align?: StackAlignment;                // default 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;                        // default false, wrap items on overflow
  divider?: boolean;                     // default false, render a divider
  dividerProps?: Partial<DividerProps>;
  as?: keyof JSX.IntrinsicElements;      // default 'div'
  children: React.ReactNode;
}
```

## Variants
| Variant | Orientation | Use Case |
|---------|-------------|----------|
| VStack | `vertical` | Form fields, card content, list items |
| HStack | `horizontal` | Toolbar buttons, tag groups, inline actions |

## States
Stack is stateless.

## Accessibility
- When orientation is `horizontal` and `wrap` is true, set `role="list"` and `aria-label` to describe the relationship.
- Use `aria-orientation` implicitly via the DOM — no explicit ARIA needed for simple stacks.
- Dividers should have `role="separator"` when rendered between navigation items.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| ≥1024px | HStack stays horizontal |
| <768px | HStack should be manually swapped to VStack via responsive props or replaced with a responsive Stack variant |
| All | Spacing scales down on small viewports (`xl` → `lg`, `lg` → `md`) |

Future: Responsive `orientation` prop — e.g., `orientation={{ base: 'vertical', md: 'horizontal' }}`.

## Animation Rules
- Stack spacing changes animate smoothly over 200ms ease-in-out if controlled by state.

## Future Expansion
- Responsive orientation (stacking on mobile).
- Dividers with configurable variant (full, inset, center).
- Collapsible stack sections.

## Dependencies
- `Divider` component (for `divider={true}` usage).

## Related Components
- **Grid** — 2D layout (use Grid when you need multiple columns, Stack for single-axis).
- **Section** — Section header uses HStack internally for title + action layout.
- **ContentArea** — ContentArea uses VStack to compose sections.

## Anti-patterns
- ❌ Do not nest HStack inside HStack or VStack inside VStack at the same axis without a parent wrapper with different orientation.
- ❌ Do not use Stack when children need different spacing — apply margin to children directly instead.
- ❌ Do not use Stack for 2D grid layouts.

## Performance Notes
- Stack uses flexbox; it is performant by default.
- Avoid deeply nested stacks (depth > 5) — extract into composed sub-components.
- `justify` and `align` changes do not trigger layout thrashing on modern browsers.
