# Section

## Purpose
Groups related content into a visually distinct region with optional header, footer, dividers, and padding control.

## Responsibilities
- Wrap content in a block-level region
- Render an optional header with title and action slot
- Render an optional footer
- Apply dividers above and/or below the section
- Control internal padding

## Composition
```
Section
├── Section.Divider (optional, top)
├── Section.Header (optional)
│   ├── Section.Title
│   └── Section.Action (e.g., button, link)
├── Section.Body
│   └── (content — Grid, Stack, tables, etc.)
├── Section.Divider (optional, bottom)
└── Section.Footer (optional)
    └── (footer content)
```

## Hierarchy
- Section sits inside ContentArea, Grid, or Stack.
- Section.Body contains all page-specific content.
- Sections are often stacked vertically in a page.

## Props Contract (TypeScript)
```typescript
interface SectionProps {
  title?: string;
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; // default 'h2'
  action?: React.ReactNode;              // rendered in header right
  footer?: React.ReactNode;
  dividerTop?: boolean;                  // default false
  dividerBottom?: boolean;               // default false
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // default 'md'
  paddingY?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  paddingX?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'card' | 'bordered'; // default 'default'
  id?: string;                           // for anchor links
  children: React.ReactNode;
  className?: string;
}
```

## Variants
| Variant | Visual | Use Case |
|---------|--------|----------|
| `default` | No border, minimal padding | Stacked content blocks |
| `card` | Elevated (shadow), rounded corners, padding | Dashboard cards |
| `bordered` | Border around section, no shadow | Settings panels, form groups |

## States
Section is stateless.

## Accessibility
- Section renders as `<section>` by default with `aria-labelledby` pointing to the title element when header is present.
- Use `titleAs` to ensure heading hierarchy matches the document outline.
- When no title is provided, use `aria-label` on the section to describe its purpose.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| ≥1024px | Standard padding (xl = 32px, lg = 24px, md = 16px) |
| 768–1023px | Padding scales down one step |
| <768px | Padding reduces to `sm` (8px) minimum |
| All | Title font size scales down on mobile |

## Animation Rules
- No animations on Section itself. Child components may animate independently.

## Future Expansion
- Collapsible section (accordion behavior).
- Section with tabs (section-level tab navigation).
- Configurable header sticky on scroll.
- Richer header with subtitle, badge, or breadcrumbs.

## Dependencies
- `Divider` component (for `dividerTop`/`dividerBottom`).

## Related Components
- **Stack** — Section.Body often uses Stack for vertical content arrangement.
- **Grid** — Section.Body may use Grid for multi-column content.
- **HeroContainer** — alternative to Section for prominent page-top content.
- **ContentArea** — ContentArea contains Sections.

## Anti-patterns
- ❌ Do not nest Sections more than 2 levels deep.
- ❌ Do not use Section when a plain `<div>` suffices (e.g., purely stylistic grouping).
- ❌ Do not put interactive header actions in the footer — use `action` for primary CTAs.
- ❌ Do not mix `variant="card"` sections directly adjacent without spacing.

## Performance Notes
- Section adds minimal DOM overhead.
- `variant="card"` applies `box-shadow` — prefer `border` for performance-critical lists.
- Avoid frequent dynamic changes to `padding` prop — trigger layout only when necessary.
