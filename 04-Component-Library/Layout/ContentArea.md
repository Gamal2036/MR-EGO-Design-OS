# ContentArea

## Purpose
Serves as the main content wrapper for page-level content, providing max-width constraint, padding, and scroll overflow management.

## Responsibilities
- Constrain content width with a configurable max-width
- Apply consistent padding
- Handle overflow (scroll or hidden)
- Serve as the primary scroll container for the page
- Provide a skip-link target (`id="main-content"`)

## Composition
```
ContentArea
└── (page content — Grid, Sections, HeroContainer, etc.)
```

## Hierarchy
- ContentArea is the last child of Workspace (after Topbar and Sidebar).
- All page-level components are children of ContentArea.
- ContentArea is always a single child — do not render multiple ContentAreas.

## Props Contract (TypeScript)
```typescript
interface ContentAreaProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'; // default 'xl'
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // default 'lg'
  paddingY?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  paddingX?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  overflow?: 'visible' | 'hidden' | 'auto' | 'scroll'; // default 'auto'
  as?: 'main' | 'section' | 'div';       // default 'main'
  id?: string;                            // default 'main-content'
  children: React.ReactNode;
  className?: string;
}
```

## Variants
| Variant | Max Width | Use Case |
|---------|-----------|----------|
| `sm` | 640px | Narrow content (reading, forms) |
| `md` | 768px | Medium content |
| `lg` | 1024px | Standard pages |
| `xl` | 1280px | Dashboard, data-heavy pages |
| `full` | 100% | Full-bleed layouts |

## States
ContentArea is stateless.

## Accessibility
- Renders as `<main>` by default with `id="main-content"` — the skip-link target.
- `tabindex="-1"` on the main element to allow programmatic focus via skip link.
- When `overflow="auto"` or `"scroll"`, ensure focusable content is fully reachable via keyboard.

## Responsive Rules
| Breakpoint | Padding Behavior |
|-----------|-----------------|
| ≥1280px | Max padding (xl = 48px) |
| 1024–1279px | Standard padding (lg = 32px) |
| 768–1023px | Reduced padding (md = 24px) |
| <768px | Minimal padding (sm = 16px) |
| All | If sidebar is collapsed, ContentArea expands to fill space |

## Animation Rules
- ContentArea margin-left transitions when sidebar expands/collapses: 250ms ease-in-out.

## Future Expansion
- Sticky header within ContentArea (page-level sticky).
- Section-based auto-scrollspy.
- Scroll position preservation on route change.
- Nested scroll containers management (e.g., two-column scroll sync).

## Dependencies
- `Workspace` (parent component — communicates sidebar state for margin calculation).

## Related Components
- **Workspace** — Workspace contains ContentArea.
- **Section** — Sections are placed inside ContentArea.
- **Grid** — Grids are children of ContentArea.
- **HeroContainer** — sits inside ContentArea.
- **SkipLink** — targets `#main-content`.

## Anti-patterns
- ❌ Do not render ContentArea outside of Workspace.
- ❌ Do not nest ContentArea inside ContentArea.
- ❌ Do not place padding on both ContentArea and its child Section — double-padding causes inconsistent spacing.
- ❌ Do not set `overflow="hidden"` on ContentArea unless absolutely necessary — it prevents scroll and affects layout.
- ❌ Do not place content directly in Workspace children — always use ContentArea.

## Performance Notes
- ContentArea uses CSS `max-width` with `margin: 0 auto` for centering — no JS.
- No JavaScript is required for ContentArea to function.
- Overflow management is pure CSS — no scroll event listeners.
- Avoid `overflow: scroll` on both ContentArea and body simultaneously.
