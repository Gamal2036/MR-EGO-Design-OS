# SkipLink

## Purpose
Provides a keyboard-accessible shortcut for users to skip repetitive navigation and jump directly to the main content area.

## Responsibilities
- Render a visually hidden link that becomes visible on keyboard focus
- Link to the main content target (`#main-content`)
- Be the first focusable element on the page
- Move focus to the main content area on activation

## Composition
```
SkipLink
└── <a href="#main-content">Skip to main content</a>
```

## Hierarchy
- SkipLink renders as the very first element inside Workspace, before Topbar.
- SkipLink is a standalone component; it does not wrap children.

## Props Contract (TypeScript)
```typescript
interface SkipLinkProps {
  targetId?: string;                     // default 'main-content'
  label?: string;                        // default 'Skip to main content'
  offset?: number;                       // px offset from top when focused, default 8
  className?: string;
}
```

## Variants
| Variant | Use Case |
|---------|----------|
| Default | Standard skip-to-main-content. |
| Translated | Localized `label` for i18n. |
| Section | Skip to a specific page section (e.g., "Skip to search results"). |

## States
| State | Description |
|-------|-------------|
| Hidden | Off-screen / visually hidden. Visible to screen readers. |
| Focused | Slides/teleports into view at the top of the page. |

## Accessibility
- This is a critical accessibility component for keyboard users — every page MUST include SkipLink.
- Uses `.visually-hidden` styles when not focused; `.skip-link-visible` styles on `:focus`.
- Focus moves to `targetId` on click; `tabindex="-1"` is set on the target to receive programmatic focus.
- Link text is descriptive: "Skip to main content" — not just "Skip".
- Ensure the skip target has `tabindex="-1"` to receive focus from the skip link.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| All | Appears at the very top of the page, above all content. |

## Animation Rules
- Slide down from top on focus: 200ms ease-out.
- Slide up on blur: 200ms ease-in.

## Future Expansion
- Multiple skip links (e.g., "Skip to navigation", "Skip to search").
- Announce on focus via `aria-live` region.
- Persistent skip link for touch devices (optional, opt-in).

## Dependencies
- `ContentArea` — the default target (`#main-content`) is set by ContentArea.

## Related Components
- **ContentArea** — SkipLink targets `#main-content` on ContentArea.
- **Workspace** — Workspace renders SkipLink as its first child.
- **FocusTrap** — unrelated but complementary for keyboard accessibility.

## Anti-patterns
- ❌ Do not render SkipLink after navigation — it must be the first focusable element.
- ❌ Do not hide SkipLink from all users — it must be discoverable via Tab.
- ❌ Do not use SkipLink to skip to non-landmark content — always target `<main>`.
- ❌ Do not prevent default anchor behavior — let the browser handle `#target` scrolling.
- ❌ Do not use `pointer-events: none` on SkipLink — it prevents mouse clicks.

## Performance Notes
- SkipLink adds a single `<a>` element — negligible DOM impact.
- No JavaScript required for basic functionality (native anchor + `:focus` CSS).
- Focus management on the target element uses `element.focus()` which triggers no layout thrashing.
