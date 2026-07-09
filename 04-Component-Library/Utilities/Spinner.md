# Spinner

## Purpose
Communicates loading or processing state to the user through animated visual indicators.

## Responsibilities
- Render an animated loading indicator
- Support multiple visual variants (circle, dots, pulse, progress-ring)
- Support predefined sizes (sm 16px, md 24px, lg 32px, xl 48px)
- Accept a descriptive label for screen readers

## Composition
```
Spinner
└── Animated indicator
    └── (CSS/svg animation elements)
```

## Hierarchy
- Spinner is used inline inside buttons, cards, loading overlays, and AnalyticsContainer.
- Spinner does not contain children.

## Props Contract (TypeScript)
```typescript
type SpinnerVariant = 'circle' | 'dots' | 'pulse' | 'progress-ring';
type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

interface SpinnerProps {
  variant?: SpinnerVariant;              // default 'circle'
  size?: SpinnerSize;                    // default 'md'
  color?: string;                        // CSS color, inherits by default
  thickness?: number;                    // circle/progress-ring stroke width, default 3
  label?: string;                        // screen reader label, default 'Loading...'
  showLabel?: boolean;                   // show label visually below spinner, default false
  speed?: 'normal' | 'fast' | 'slow';   // animation speed, default 'normal'
  asOverlay?: boolean;                   // renders as a full-area overlay, default false
  className?: string;
}
```

## Size Map
| Size | Circle | Dots | Pulse | Progress-Ring |
|------|--------|------|-------|--------------|
| sm | 16px | 16px | 16px | 16px |
| md | 24px | 24px | 24px | 24px |
| lg | 32px | 40px | 40px | 32px |
| xl | 48px | 56px | 64px | 48px |

## Variants
| Variant | Visual | Use Case |
|---------|--------|----------|
| circle | Rotating arc | General loading, button loading state |
| dots | Bouncing dots | Page-level loading, content loading |
| pulse | Pulsing ring | Overlay loading, section loading |
| progress-ring | Circular progress with % | Upload, video processing, determinate states |

## States
| State | Description |
|-------|-------------|
| Indeterminate | Infinite animation (default for circle, dots, pulse). |
| Determinate | Progress value displayed (progress-ring only, via `value` prop). |

Future prop for determinate:
```typescript
interface SpinnerProgressProps {
  variant: 'progress-ring';
  value?: number;                        // 0–100
  showValue?: boolean;                   // show percentage in center
}
```

## Accessibility
- `role="status"` with `aria-live="polite"` and `aria-label` (default "Loading...").
- When `showLabel` is true, label text is visible below the spinner.
- When used as an overlay, `aria-busy="true"` is set on the parent region.
- Spinner should not be focusable.
- Progress-ring variant uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| All | Spinner size is fixed and does not scale with viewport. |
| <480px | Prefer `sm` size for inline usage to conserve space. |

## Animation Rules
| Variant | Animation | Speed (normal) |
|---------|-----------|----------------|
| circle | 360° rotation | 800ms linear infinite |
| dots | Bounce up and down | 600ms ease infinite per dot, staggered |
| pulse | Scale in/out + opacity | 1.5s ease infinite |
| progress-ring | Arc grows | 300ms on value change, determined; spinning for indeterminate |

## Future Expansion
- Spinner with skeleton text lines.
- Determinate variants for all spinner types.
- Custom speed overrides at component level.
- Reusable animation tokens for custom spinners.

## Dependencies
- None — pure CSS/SVG animations.

## Related Components
- **Icon** — use Icon for static decorative elements, Spinner for loading.
- **Button** — Button has a built-in `loading` state that uses Spinner.
- **AnalyticsContainer** — uses Spinner in its loading state.

## Anti-patterns
- ❌ Do not use multiple Spinners on the same page — prefer a single page-level spinner.
- ❌ Do not use Spinner for content that loads in <200ms — show content immediately.
- ❌ Do not pause animation when the tab is inactive — use `prefers-reduced-motion` instead.
- ❌ Do not use Spinner inside another Spinner.
- ❌ Do not use `progress-ring` for indeterminate states — use circle variant.

## Performance Notes
- CSS animations are GPU-accelerated (uses `transform: rotate()` and `opacity`).
- Animations pause via `animation-play-state: paused` when `prefers-reduced-motion` is set.
- SVG circle elements used for ring variants — minimal DOM overhead.
- No JavaScript animation loops — all animation is CSS-driven.
