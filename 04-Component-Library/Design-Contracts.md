# Design Contracts

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md), [Design-Principles.md](../01-Constitution/Design-Principles.md)), DP-1 ([Accessibility.md](../02-Design-Language/Accessibility.md), [Responsive-System.md](../02-Design-Language/Responsive-System.md), [Motion-System.md](../02-Design-Language/Motion-System.md))

---

## Purpose

Design Contracts define the universal, non-negotiable contracts that every component must satisfy. These contracts govern the public API, private implementation, composition, accessibility, responsive behavior, animation, and expansion of every component.

---

## Public API Contract

Every component defines its public API through props. The public API is the contract between the component and its consumers.

### Required Elements

| Element | Description | Example |
|---------|-------------|---------|
| ComponentName | PascalCase export name | `Button` |
| Props interface | TypeScript interface for all props | `ButtonProps` |
| Default export | Default export of the component | `export default Button` |
| Named export | Named export for tree-shaking | `export { Button }` |

### Prop Categories

| Category | Description | Pattern |
|----------|-------------|---------|
| Display | Visual properties | `variant`, `size`, `fullWidth` |
| State | Component state | `isDisabled`, `isLoading`, `hasError` |
| Content | Child content | `children`, `label`, `icon` |
| Events | User interaction | `onClick`, `onChange`, `onFocus` |
| Accessibility | Screen reader and keyboard | `ariaLabel`, `ariaDescribedBy` |
| Styling | Visual overrides | `className`, `style` |
| Testing | Test identifiers | `dataTestId` |

### Public API Rules

1. All public props must be documented with JSDoc.
2. Boolean props default to `false` unless documented otherwise.
3. Event handler props are optional unless the component is useless without them.
4. Props must have stable names across versions (no breaking changes without major version).
5. Deprecated props must emit a console warning in development mode.
6. The public API must not expose internal implementation details.

---

## Private API Contract

The private API includes internal state, refs, and methods that are not exposed to consumers.

### Private Elements

| Element | Visibility | Example |
|---------|------------|---------|
| Internal state | Private | `const [isOpen, setIsOpen] = useState(false)` |
| Internal refs | Private | `const inputRef = useRef(null)` |
| Helper functions | Private | `function formatDate(date: Date)` |
| Sub-components | Internal | `Button.Icon`, `Button.Loading` |
| CSS classes | Scoped | `mr-button--primary` |

### Private API Rules

1. Private API must be prefixed with underscore convention or separate internal file.
2. Private refs must use `useImperativeHandle` only when absolutely necessary.
3. Forwarded refs are part of the public API.
4. Internal state must not be exposed to consumers.
5. Private sub-components must not be imported directly by consumers.
6. Internal CSS classes must not be targeted by consumer styles.

---

## Composition Contract

Defines how components compose with other components.

### Allowed Children

Each component defines its allowed children in its Props Contract section.

| Component | Allowed Children |
|-----------|-----------------|
| Card.Title | Text, Heading |
| Card.Body | Any component |
| Card.Footer | Button, IconButton, Link |
| Sidebar | SidebarGroup, SidebarItem, Divider |
| Dialog.Footer | Button, IconButton |
| FormGroup | Form controls, Validation |

### Composition Rules

1. Components expose named sub-components for slot-based composition.
2. Sub-components follow the pattern `Component.SubComponent`.
3. Components accept `children` as the primary content mechanism.
4. Components may accept `renderProps` for dynamic content.
5. Composition must not create circular dependencies.
6. Composed components must maintain stable references.

---

## Forbidden Usage

Actions that must never be performed with each component.

### Universal Forbidden Patterns

1. **Modifying component internals** — Do not access or modify internal state or DOM structure.
2. **Bypassing props interface** — Do not pass undocumented props to override internal behavior.
3. **Duplicating component logic** — Do not reimplement behavior that the component provides.
4. **Styling internal elements directly** — Do not target internal CSS classes or elements.
5. **Creating new state where component provides it** — Do not duplicate state management.
6. **Removing accessibility** — Do not remove ARIA attributes, keyboard handlers, or focus management.

### Component-Specific Forbidden Usage

Each component document defines its own forbidden usage patterns in the Anti-patterns section.

---

## Accessibility Contract

Universal accessibility requirements for every component.

### ARIA Requirements

| Requirement | Specification |
|-------------|---------------|
| Role assignment | Every interactive component has an explicit ARIA role |
| State indication | `aria-expanded`, `aria-selected`, `aria-current` as appropriate |
| Labeling | `aria-label` or `aria-labelledby` for all interactive elements |
| Description | `aria-describedby` for additional context |
| Live regions | `aria-live="polite"` for dynamic content updates |
| Error association | `aria-invalid`, `aria-describedby` linking to error messages |
| Controls | `aria-controls` for elements that control other elements |
| Has popup | `aria-haspopup` for elements that trigger overlays |

### Keyboard Requirements

1. All interactive elements must be reachable via Tab key.
2. Tab order follows visual order (left-to-right, top-to-bottom).
3. Enter/Space activates buttons, links, and interactive controls.
4. Escape dismisses modals, popovers, dropdowns, and menus.
5. Arrow keys navigate within grouped elements (radio groups, tab lists, menus).
6. Home/End navigate to first/last item in a list.
7. Focus must be visible at all times (2px outline or ring).
8. No keyboard traps — focus must be able to move away from any element.
9. Skip links must be provided for navigation-heavy pages.

### Focus Management Requirements

1. Focus must move predictably in Tab order.
2. Modal dialogs must trap focus within the dialog.
3. Focus must return to the trigger element when a popover/dialog closes.
4. Programmatic focus changes must not cause unexpected scroll jumps.
5. Focus indicators must meet 3:1 contrast ratio against background.
6. Custom focus indicators must not rely on color alone.
7. Focus must be managed within tab panels when tabs are used.

### Screen Reader Requirements

1. All images must have `alt` text or be marked `aria-hidden`.
2. Loading states must be announced via `aria-live` regions.
3. Dynamic content changes must be announced.
4. Error messages must be associated with their inputs.
5. Status messages must use `role="status"` or `role="alert"`.
6. Icons must have `aria-hidden="true"` when decorative.
7. Complex components must have clear screen reader instructions.

### Touch Requirements

1. Touch targets minimum 44x44px.
2. Adequate spacing between touch targets (minimum 8px).
3. Swipe gestures must have alternative button controls.
4. Touch feedback must be immediate (within 50ms).
5. Long-press must not interfere with scroll.

### Color and Contrast Requirements

1. All text must meet WCAG AA 4.5:1 contrast ratio.
2. Large text (18px+ bold or 24px+ regular) must meet 3:1 contrast.
3. Interactive element borders/states must meet 3:1 contrast.
4. Color must never be the sole indicator of state or meaning.
5. Focus indicators must meet 3:1 contrast against surrounding elements.
6. Disabled elements must maintain minimum 3:1 contrast.

### Motion Sensitivity

1. All animations must respect `prefers-reduced-motion`.
2. When reduced motion is preferred, animations must be instant or disabled.
3. Parallax, continuous scrolling, and auto-playing animations are forbidden.
4. Pulsing or blinking elements must stop after 5 seconds.

---

## Responsive Contract

Universal responsive behavior requirements for every component.

### Breakpoint Definitions

| Name | Min Width | Max Width | Target |
|------|-----------|-----------|--------|
| Mobile | 320px | 767px | Phones |
| Tablet | 768px | 1023px | Tablets |
| Desktop | 1024px | 1279px | Laptops |
| Wide | 1280px | 1599px | Desktops |
| Ultra-wide | 1600px+ | — | Large screens |

### Responsive Behavior Rules

1. Every component must define behavior at every breakpoint.
2. Mobile-first — default styles are for mobile, enhanced for larger screens.
3. Components must not overflow their container at any breakpoint.
4. Horizontal scrolling must only occur in designated scrollable containers.
5. Touch targets must remain minimum 44x44px at all breakpoints.
6. Text must not be truncated or overflow at any breakpoint.
7. Components must reflow to fit narrower viewports without horizontal scroll.
8. Multi-column layouts must collapse to single column on mobile.
9. Navigation patterns must adapt (sidebar → bottom bar, tabs → scrollable).
10. Components must respect container width, not viewport width.

### Responsive Layout Rules

| Pattern | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Sidebar | Hidden (hamburger) | Collapsible (icon only) | Full width |
| Cards grid | 1 column | 2 columns | 3-4 columns |
| Tables | Card list | Horizontal scroll | Full table |
| Forms | Single column | Single column | Multi-column |
| Modals | Full screen | Centered | Centered |
| Button groups | Stacked vertical | Horizontal | Horizontal |

---

## Animation Contract

Universal animation behavior requirements for every component.

### Duration Tiers

| Tier | Duration | Use Case |
|------|----------|----------|
| Instant | 0ms | State changes that should not animate |
| Micro | 50-100ms | Hover, focus, active states |
| Fast | 100-200ms | Element appear/disappear, expand/collapse |
| Normal | 200-300ms | Page transitions, panel slides, modal |
| Slow | 300-500ms | Background transitions, onboarding |

### Easing Curves

| Curve | Use Case |
|-------|----------|
| Ease-Out (cubic-bezier(0.16, 1, 0.3, 1)) | Elements entering, expanding, appearing |
| Ease-In (cubic-bezier(0.4, 0, 0.68, 0.06)) | Elements exiting, collapsing, disappearing |
| Ease-In-Out (cubic-bezier(0.65, 0, 0.35, 1)) | Cross-fades, value transitions |
| Linear | Color transitions, opacity changes |

### Animation Rules

1. Every animation must have a purpose (communicate hierarchy, state change, or spatial relationship).
2. Animations must not block user interaction.
3. Animations must be interruptible.
4. Animations must not exceed 500ms for functional transitions.
5. Only one animation axis per element (avoid moving and scaling simultaneously).
6. Animations must respect `prefers-reduced-motion`.
7. Staggered animations must use consistent delays (50-100ms between items).
8. Page transitions must complete within 300ms.
9. Hover animations must complete within 100ms.
10. Loading animations must communicate progress or indeterminate state.

### Forbidden Animations

1. Parallax scrolling.
2. Auto-playing carousels or marquees.
3. Continuous rotation or pulsing (except loading spinners).
4. Bounce, jello, or rubber-band effects.
5. Scale changes on interactive elements except press (0.97-1.0 only).
6. Animations that trigger motion sickness (large parallax, rapid movement).
7. Decorative animations with no functional purpose.

---

## Expansion Contract

Rules for how components can be extended without breaking existing contracts.

### Extension Points

Every component defines its extension points:

| Extension Point | Description | Example |
|----------------|-------------|---------|
| Variant extension | New visual or behavioral variants | Adding `success` variant to Button |
| Slot extension | New content slots | Adding `footer` slot to Card |
| Token override | Component token customization | Customizing `button-border-radius` for a module |
| Prop extension | New optional props | Adding `tooltip` prop to IconButton |

### Extension Rules

1. Extensions must not break existing functionality.
2. Extensions must not change the component's public API (only add new props).
3. Extensions must maintain backward compatibility.
4. Extensions must follow the component's design contracts.
5. Extensions must be registered in the component's Future Expansion section.
6. Deprecated extensions must be announced one major version before removal.
7. Module-specific extensions must use namespace prefixing.

### Versioning Contract

| Version | Backward Compatible | Breaking Changes |
|---------|-------------------|------------------|
| Major | No | Public API changes, removed props, behavior changes |
| Minor | Yes | New props, new variants, new features |
| Patch | Yes | Bug fixes, performance improvements, accessibility fixes |

---

## Contract Enforcement

### Automated Checks

| Check | Tool/Source |
|-------|-------------|
| ARIA compliance | aXe, WAVE |
| Keyboard navigation | Manual + Cypress tests |
| Focus management | Manual + Jest tests |
| Color contrast | aXe, Color Contrast Checker |
| Responsive behavior | Storybook + Chromatic |
| Animation timing | Jest + React Testing Library |
| Prop types | TypeScript strict mode |
| Accessibility | jest-axe |

### Manual Review Checklist

- [ ] Public API matches documented contract
- [ ] All states are handled (default, hover, focus, active, disabled, loading, error, empty)
- [ ] Keyboard navigation works end-to-end
- [ ] Focus management is correct
- [ ] Screen reader announces all content
- [ ] Responsive behavior works at all breakpoints
- [ ] Animations respect reduced motion
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets are minimum 44x44px
- [ ] No forbidden usage patterns
- [ ] All extension points are documented
- [ ] Tests cover all states and edge cases
