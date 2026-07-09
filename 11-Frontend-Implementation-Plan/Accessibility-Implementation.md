# Accessibility Implementation

## Strategy

Accessibility is built in from DP-14 onward — not retrofitted. Per DP-4 Accessibility/ documents and DP-10 Accessibility-Architecture.md, every component and page meets WCAG 2.2 AA as a baseline, with AAA for specific areas.

## WCAG 2.2 Coverage Targets

| Principle | Target Level | Priority |
|-----------|-------------|----------|
| Perceivable (1.x) | AA (AAA for text contrast) | Critical |
| Operable (2.x) | AA | Critical |
| Understandable (3.x) | AA | Critical |
| Robust (4.x) | AA | Critical |

## Implementation Areas

### 1. Semantic HTML

- All components use semantic HTML elements (`<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<header>`, `<footer>`, `<form>`, `<table>`)
- Heading hierarchy preserved (h1 -> h6, no skipping)
- Landmarks defined for all page regions
- List elements used for lists (`<ul>`, `<ol>`, `<dl>`)

### 2. ARIA Implementation

- ARIA roles used only when native semantics insufficient
- `role="alert"` for dynamic status messages
- `role="dialog"` and `aria-modal="true"` for modals
- `role="tablist"`, `role="tab"`, `role="tabpanel"` for tabs
- `aria-expanded`, `aria-controls`, `aria-label` on interactive elements
- `aria-live="polite"` for live regions (notifications, streaming)
- `aria-atomic`, `aria-relevant` for complex live regions
- `aria-describedby` for error messages
- `aria-current="page"` for active navigation

### 3. Keyboard Navigation

- All interactive elements reachable via Tab
- Logical tab order matching visual order
- Visible focus indicators (3px outline, minimum 2:1 contrast)
- Custom keyboard handlers for complex widgets (combobox, tree, grid)
- Arrow key navigation for lists, tabs, tables, menus
- Escape key closes modals, menus, popovers
- Enter/Space activates buttons and links
- Command palette accessible via `Ctrl+K` / `Cmd+K`
- Skip link at top of every page

### 4. Focus Management

- Focus trapped in modals and dialogs
- Focus returned to trigger element on close
- Focus set to first focusable element on page navigation
- Focus set to new content when it appears dynamically
- `:focus-visible` for keyboard-only focus indicators
- No focus loss during async operations

### 5. Color and Contrast

- Text contrast: minimum 4.5:1 (AA), 7:1 target (AAA)
- Large text contrast: minimum 3:1 (AA)
- Non-text contrast: minimum 3:1 (UI components, icons)
- High contrast themes provide guaranteed 7:1 across all text
- Information never conveyed through color alone
- Color-blind safe palette (tested for protanopia, deuteranopia, tritanopia)

### 6. Screen Reader Support

- Descriptive alt text on all images and icons
- Decorative icons marked `aria-hidden="true"`
- Status and error messages announced via `aria-live`
- Dynamic content changes announced
- Loading states announced
- Table headers properly associated via `<th>` with `scope`
- Form inputs have associated `<label>` elements
- Error messages linked to inputs via `aria-describedby`

### 7. Reduced Motion

- `prefers-reduced-motion: reduce` respected globally
- All animations reduced to cross-fade or instant transitions
- Parallax and ambient animations disabled
- Auto-playing animations respect motion preference
- Animation toggle available in settings for fine-grained control

### 8. Touch and Interaction

- Minimum touch target 44x44px (WCAG 2.2)
- Sufficient spacing between interactive elements
- Gesture alternatives: all swipe actions have button alternatives
- Drag operations have click/select alternatives
- Pinch zoom alternative via +/- buttons

## Testing Strategy

| Test Type | Tool/Method | Frequency |
|-----------|-------------|-----------|
| Automated | axe-core (via Vitest + Storybook) | Every commit |
| Automated | Lighthouse a11y audit | Every PR |
| Automated | WAVE evaluation | Every release |
| Keyboard | Manual tab-through testing | Per phase |
| Screen reader | VoiceOver (macOS) + NVDA (Windows) | Per component, per phase |
| Color contrast | Contrast ratio measurement | Every theme, per phase |
| Motion | prefers-reduced-motion verification | Per phase |
| User testing | Assistive technology users | DP-31 |

## Implementation Sequence

| Step | Phase | Deliverable |
|------|-------|-------------|
| 1 | DP-14 | Implement SkipLink, FocusTrap, VisuallyHidden utilities |
| 2 | DP-14 | Build keyboard navigation foundation |
| 3 | DP-14 | Implement focus management system |
| 4 | DP-14 | Add landmark regions to shell |
| 5 | DP-14 | Implement reduced motion support |
| 6 | DP-15 | Ensure auth forms a11y (labels, errors, focus) |
| 7 | Per component | Each component built with a11y from start |
| 8 | DP-29 | Add accessibility settings panel |
| 9 | DP-31 | Full accessibility audit and remediation |
| 10 | DP-32 | Final a11y validation before production |
