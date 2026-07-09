# Theme Implementation

## Architecture

Per DP-10 Theme-Engine.md and DP-1 Color-System.md, themes are implemented via CSS Custom Properties with a theme resolution engine.

## Theme Set (5 Built-in Themes)

| Theme | ID | Base Background | Base Text | Primary Use Case |
|-------|----|-----------------|-----------|------------------|
| Light | `light` | White (#FFFFFF) | Gray-950 | Default, standard lighting |
| Dark | `dark` | Gray-950 | White | Low-light environments |
| High Contrast Light | `hc-light` | White | Black | Accessibility (WCAG AAA) |
| High Contrast Dark | `hc-dark` | Black | White | Accessibility (WCAG AAA) |
| OLED Dark | `oled-dark` | #000000 | White | OLED screens, battery saving |

## Token Resolution Pipeline

```
Token ID (e.g., --mr-color-primary-500)
  -> Theme lookup (select active theme)
  -> Theme token map (theme-defined value)
  -> Computed value (resolve references, apply transformations)
  -> CSS variable assignment (document.documentElement.style.setProperty)
```

### Implementation Layers

```
Layer 1: Token Definition
  tokens/ package exports JSON token maps per theme

Layer 2: CSS Variable Generation
  build step generates stylesheet per theme:
  [data-theme="dark"] { --mr-color-primary-500: #3B82F6; ... }

Layer 3: Theme Resolution Engine
  Runtime JavaScript resolves token IDs to values
  Handles fallback chains, computed values, references

Layer 4: Theme Context Provider
  React context provides current theme, toggle function
  Handles system preference detection (prefers-color-scheme)
  Persists user preference to localStorage
```

## Theme Switching

- Theme toggle triggers `data-theme` attribute change on `<html>`
- CSS transitions on affected properties (300ms, GPU-accelerated)
- Transition-property restricted to `transform` and `opacity` for performance
- Non-GPU properties change instantly after transition delay
- Reduced motion preference disables theme transitions

## Token Categories

| Category | Token Pattern | Example Values |
|----------|---------------|----------------|
| Color | `--mr-color-{role}-{shade}` | `--mr-color-primary-500: #3B82F6` |
| Typography | `--mr-font-{family\|size\|weight\|lineHeight}-{name}` | `--mr-font-size-body: 1rem` |
| Spacing | `--mr-space-{size}` | `--mr-space-md: 16px` |
| Elevation | `--mr-elevation-{level}` | `--mr-elevation-2: 0 4px 12px rgba(0,0,0,0.1)` |
| Radius | `--mr-radius-{name}` | `--mr-radius-md: 8px` |
| Animation | `--mr-animation-{type}-{name}` | `--mr-animation-duration-fast: 150ms` |
| Glass | `--mr-glass-{property}` | `--mr-glass-background: rgba(255,255,255,0.1)` |

## Implementation Sequence

| Step | Phase | Deliverable |
|------|-------|-------------|
| 1 | DP-13 | Define token data model and TypeScript types |
| 2 | DP-13 | Create Light theme token map (baseline) |
| 3 | DP-13 | Generate CSS variables build script |
| 4 | DP-13 | Create Dark theme token map |
| 5 | DP-13 | Create High Contrast themes |
| 6 | DP-13 | Create OLED Dark theme |
| 7 | DP-13 | Build theme resolution engine (runtime) |
| 8 | DP-14 | Implement ThemeContext provider |
| 9 | DP-14 | Wire theme toggle to shell header |
| 10 | DP-14 | Add system preference detection |
| 11 | DP-14 | Persist user theme preference |
| 12 | DP-29 | Add theme customization in Settings |
| 13 | DP-31 | Optimize theme transition performance |

## Theme Extension (Future)

- Custom theme creation in user settings (DP-29)
- Theme sharing via import/export
- Seasonal/event themes via overlay
- Branded themes for enterprise tenants (Future)
