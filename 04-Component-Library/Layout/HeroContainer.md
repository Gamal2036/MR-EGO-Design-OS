# HeroContainer

## Purpose
Provides a prominent header area at the top of a page or section to capture attention with a title, subtitle, and optional actions.

## Responsibilities
- Render a visually prominent background (color, gradient, or image)
- Display title and subtitle text
- Render action buttons
- Center text on mobile viewports
- Overlay a dark gradient over background images for readability

## Composition
```
HeroContainer
├── Background (color, gradient, or image)
├── Content
│   ├── HeroContainer.Title
│   ├── HeroContainer.Subtitle (optional)
│   └── HeroContainer.Actions (optional)
│       ├── Button (primary CTA)
│       └── Button (secondary CTA)
└── Overlay (optional, for image backgrounds)
```

## Hierarchy
- HeroContainer is used at the top of a page, outside any Section or Card.
- It sits directly inside ContentArea or Workspace.
- It precedes all other page content.

## Props Contract (TypeScript)
```typescript
type HeroBackground = 
  | { type: 'color'; value: string }
  | { type: 'gradient'; value: string }     // CSS gradient value
  | { type: 'image'; src: string; position?: string; overlay?: boolean };

interface HeroContainerProps {
  title: string;
  titleAs?: 'h1' | 'h2' | 'h3';          // default 'h1'
  subtitle?: string;
  subtitleAs?: 'p' | 'span';              // default 'p'
  primaryAction?: React.ReactNode;          // primary CTA button
  secondaryAction?: React.ReactNode;        // secondary CTA button
  background?: HeroBackground;
  minHeight?: 'sm' | 'md' | 'lg';          // default 'md' (300px)
  align?: 'left' | 'center';               // default 'left', 'center' on mobile
  textColor?: 'light' | 'dark';            // default 'light' for image/gradient, 'dark' for light colors
  children?: never;                         // use props instead
  className?: string;
}
```

## Variants
| Variant | Description |
|---------|-------------|
| Color background | Solid background color from theme palette. |
| Gradient background | CSS linear-gradient or radial-gradient. |
| Image background | Full-bleed background image with optional overlay. |

## States
| State | Description |
|-------|-------------|
| Default | Hero rendered at full size. |
| Loading | If `background.type === 'image'` is loading, show a skeleton placeholder. |
| Error | Image fails to load — fall back to gradient. |

## Accessibility
- HeroContainer is a `<section>` with `aria-label="Hero"`.
- Background images have `role="presentation"` and `aria-hidden="true"`.
- Title is an `<h1>` for page-level heroes; adjust via `titleAs`.
- Text contrast must meet WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text) against all background types.
- Action buttons should have descriptive labels.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| ≥1024px | Left-aligned title + subtitle. Actions inline. |
| 768–1023px | Padding reduced; font-size scales by 0.875×. |
| <768px | Text centered. Actions stacked vertically. `minHeight` reduced by 40%. Padding reduced. |
| All | `minHeight`: `sm`=200px, `md`=300px, `lg`=400px |

## Animation Rules
- Background image fade-in: 500ms ease-in on load.
- Overlay opacity transition: 300ms.
- No animations on text or actions.

## Future Expansion
- Video backgrounds.
- Parallax scroll effect.
- Animated gradient backgrounds.
- Breadcrumbs inclusion in hero.
- Search bar integration in hero.

## Dependencies
- `Image` component (for background images with lazy loading).
- `Button` component (for actions).

## Related Components
- **Section** — use Section instead of HeroContainer for non-prominent content grouping.
- **ContentArea** — HeroContainer sits inside ContentArea.
- **Workspace** — HeroContainer can be the first child of Workspace's ContentArea.

## Anti-patterns
- ❌ Do not render HeroContainer inside a Section — it should be a standalone top-level element.
- ❌ Do not use HeroContainer for inline banners or cards.
- ❌ Do not place more than one HeroContainer per page.
- ❌ Do not put dense or scrolling content inside HeroContainer.
- ❌ Do not use text colors that fail contrast checks on the chosen background.

## Performance Notes
- Background images should be preloaded (via `<link rel="preload">`) for hero images above the fold.
- Use CSS `background-size: cover` for image backgrounds — no JS-based sizing.
- Gradients are GPU-accelerated; prefer gradients over image backgrounds where possible.
- Overlay is a single CSS pseudo-element — no extra DOM nodes.
