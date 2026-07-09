# Icon

## Purpose
Renders SVG icons consistently across the application, providing predefined sizes and color inheritance.

## Responsibilities
- Render SVG icons from an icon set
- Support multiple sizes (12, 14, 16, 18, 20, 24, 32px)
- Inherit color from parent text color or accept explicit color
- Set `aria-hidden="true"` by default for accessibility
- Support custom SVG icon definitions

## Composition
```
Icon
└── <svg> element with predefined viewBox and paths
```

## Hierarchy
- Icon is an inline element used inside buttons, menu items, links, alerts, etc.
- Icon should not be used as a standalone focusable element.

## Props Contract (TypeScript)
```typescript
type IconSize = 12 | 14 | 16 | 18 | 20 | 24 | 32;

type IconName = string;                  // from the icon registry

interface IconProps {
  name: IconName;
  size?: IconSize;                       // default 16
  color?: string;                        // CSS color, inherits by default
  weight?: 'regular' | 'bold' | 'outline'; // default 'regular', icon style variant
  ariaLabel?: string;                    // if icon conveys meaning (overrides aria-hidden)
  ariaHidden?: boolean;                  // default true
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
```

## Variants
| Variant | Size | Use Case |
|---------|------|----------|
| xs | 12px | Inline with small text, density-critical UIs |
| sm | 14px | Table cells, compact layouts |
| md | 16px | Default — buttons, menu items, form labels |
| md-lg | 18px | Navigation items, tabs |
| lg | 20px | Section headers, empty states |
| xl | 24px | Alerts, dialog titles, hero sections |
| 2xl | 32px | Feature illustrations, page icons |

## States
Icon is stateless.

## Accessibility
- `aria-hidden="true"` by default — decorative icons are hidden from screen readers.
- When `ariaLabel` is provided, `aria-hidden` is set to `false` and `aria-label` is applied to the SVG.
- Icons with `onClick` handlers must have an accessible name (visible text or `ariaLabel`).
- Focusable icons must have `role="button"` and keyboard event handlers.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| All | Icons do not scale with viewport changes — absolute pixel sizes. |
| <768px | Use size `16` as default instead of `20` to conserve space. |

## Animation Rules
- Icon rotation: `animate-spin` class for loading states (400ms per rotation, linear).
- Icon transition: color changes animate 150ms ease.

## Future Expansion
- Animated icons (morphing, stroke drawing).
- Icon sprite system for performance.
- Custom icon registration API.
- Icon search / gallery for documentation.

## Dependencies
- SVG icon definitions registry (keyed by `IconName` and `weight`).

## Related Components
- **Spinner** — use Spinner for loading indicators instead of rotating an icon.
- **Button** — Button uses Icon for leading/trailing icons.
- **SkipLink** — uses Icon for visual indicator on focus.

## Anti-patterns
- ❌ Do not use Icon as a button without accessible labeling.
- ❌ Do not override `viewBox` on the SVG element.
- ❌ Do not use icons without visible labels in critical navigation — always pair with text.
- ❌ Do not resize icons via CSS `width`/`height` — use the `size` prop.
- ❌ Do not inline raw `<svg>` elements — always use the Icon component.

## Performance Notes
- SVG icons are tree-shakable — only registered icons are bundled.
- Icons are cached as React components; no runtime fetch.
- Use `React.memo` on Icon to prevent re-renders when parent updates.
- SVGs should be optimized (removed `width`/`height`, consistent `viewBox`="0 0 24 24").
