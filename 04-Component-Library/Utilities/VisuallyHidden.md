# VisuallyHidden

## Purpose
Renders content that is visually hidden but remains accessible to screen readers and assistive technology.

## Responsibilities
- Hide content visually while keeping it in the accessibility tree
- Preserve content for screen reader announcements
- Ensure hidden content still takes up no visual space
- Support `focusable` mode for skip-link-style patterns

## Composition
```
VisuallyHidden
└── (content — labels, descriptions, screen-reader-only text)
```

## Hierarchy
- VisuallyHidden wraps text or inline elements.
- It is used inside Button, Icon, FormField, and other components for accessible labeling.

## Props Contract (TypeScript)
```typescript
interface VisuallyHiddenProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;      // default 'span'
  focusable?: boolean;                   // show on focus (for skip links), default false
  showOnFocus?: boolean;                 // alias for focusable
  className?: string;
}
```

## Variants
| Variant | Description |
|---------|-------------|
| Default | Always visually hidden, always in accessibility tree. |
| Focusable | Hidden until focused (used by SkipLink). Visible when focused. |
| Focusable visible | Shown on hover as well (future). |

## States
| State | Description |
|-------|-------------|
| Hidden | Not visible on screen. |
| Focused (focusable only) | Becomes visible when focused via keyboard. |

## Accessibility
- This component IS the accessibility utility — it should be used to provide labels, descriptions, and instructions that are not visually rendered.
- Uses the standard `.visually-hidden` CSS pattern: `position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;`.
- Do NOT use `display: none` or `visibility: hidden` — those hide from screen readers too.
- Do NOT use `aria-hidden="true"` — that defeats the purpose.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| All | Consistent behavior across all breakpoints. |

## Animation Rules
- Focusable variant: fade-in 200ms on focus, fade-out 200ms on blur.

## Future Expansion
- Visually hidden icon labels (auto-generated aria-label from visible text).
- Rich text support for screen reader descriptions (e.g., emphasis, lists).
- Announcement component built on VisuallyHidden (for `aria-live` regions).

## Dependencies
- None — pure CSS utility.

## Related Components
- **SkipLink** — built on VisuallyHidden with `focusable`.
- **Icon** — uses VisuallyHidden for accessible labels when `ariaLabel` is provided.
- **Button** — uses VisuallyHidden for text labels when icon-only.

## Anti-patterns
- ❌ Do not use VisuallyHidden for content that is not meant for screen readers — use `aria-hidden`.
- ❌ Do not use VisuallyHidden to hide interactive elements — keyboard users will find them.
- ❌ Do not wrap large blocks of text in VisuallyHidden — keep it concise.
- ❌ Do not use VisuallyHidden as a replacement for proper semantic HTML.
- ❌ Do not nest VisuallyHidden inside VisuallyHidden.

## Performance Notes
- Single `<span>` element — zero performance impact.
- CSS clip pattern does not trigger layout or paint when toggled.
- No JavaScript execution required for the default variant.
