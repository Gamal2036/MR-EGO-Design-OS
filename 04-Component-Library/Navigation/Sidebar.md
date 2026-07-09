# Sidebar

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Accessibility.md](../../02-Design-Language/Accessibility.md), [Responsive-System.md](../../02-Design-Language/Responsive-System.md), [Motion-System.md](../../02-Design-Language/Motion-System.md))

---

## Purpose

Primary navigation rail providing persistent access to all major application modules. Adapts across form factors: expanded sidebar on desktop (240px), collapsed icon rail on tablet (64px), and bottom tab bar on mobile.

---

## Responsibilities

- Display application logo and branding at the top
- Render top-level navigation items (SidebarGroup, SidebarItem)
- Provide section labels for grouping navigation items
- Host settings, help, and user-related actions at the bottom
- Manage collapse/expand state via toggle button
- Transition between expanded, collapsed, and bottom-bar layouts responsively

---

## Composition

```
Sidebar
├── Logo / Branding slot
├── NavigationSection
│   ├── SectionLabel
│   ├── SidebarGroup
│   │   ├── SidebarItem
│   │   └── SidebarItem
│   └── SidebarItem
├── Divider
└── BottomSection
    ├── SidebarItem (settings)
    └── SidebarItem (help / logout)
```

---

## Hierarchy

| Component | Parent | Children |
|-----------|--------|----------|
| Sidebar | Layout | SidebarGroup, SidebarItem, Divider, Logo, SectionLabel |
| SidebarGroup | Sidebar | SidebarItem |
| SidebarItem | Sidebar, SidebarGroup | — (leaf node) |

Sidebar is a sibling of Topbar and sits at the application layout level, not nested within page content.

---

## Props Contract (TypeScript)

```typescript
export interface SidebarProps {
  /** Logo or branding element rendered at top */
  logo?: React.ReactNode;
  /** Primary navigation content (SidebarItem, SidebarGroup, SectionLabel, Divider) */
  children: React.ReactNode;
  /** Content rendered in the bottom section (settings, help, user menu) */
  bottomContent?: React.ReactNode;

  /** Controlled expanded state */
  isExpanded?: boolean;
  /** Default expanded state (uncontrolled) */
  defaultExpanded?: boolean;
  /** Collapse toggle callback */
  onToggle?: (expanded: boolean) => void;

  /** Active module or route identifier */
  activeId?: string;

  /** Variant */
  variant?: 'default' | 'compact';

  /** Responsive breakpoint override for mobile bottom-bar mode */
  mobileBreakpoint?: number;
  /** Responsive breakpoint override for tablet collapsed mode */
  tabletBreakpoint?: number;

  /** Accessibility */
  ariaLabel?: string;

  /** Styling */
  className?: string;
  style?: React.CSSProperties;

  /** Testing */
  dataTestId?: string;
}
```

---

## Variants

| Variant | Description |
|---------|-------------|
| `default` | Standard sidebar with full-width items. Desktop: 240px. Tablet: collapses to 64px rail. Mobile: becomes bottom tab bar. |
| `compact` | Narrower expanded width (180px). Minimal padding. For data-dense workspaces. |

---

## States

| State | Description |
|-------|-------------|
| Expanded | Full sidebar (240px). All labels visible. Icons + text. |
| Collapsed | Icon-only rail (64px). Labels hidden, tooltip on hover/focus. |
| Bottom bar | Full-width fixed tab bar at bottom of viewport. 5-7 visible items with labels. |
| Collapsing | Smooth transition between expanded and collapsed (width animates). |
| Hidden | Off-screen via hamburger toggle on tablet. Overlay mode. |

---

## Accessibility

### Landmarks
- `role="navigation"` or `<nav>` with `aria-label="Primary"`

### ARIA
| Attribute | Target | Condition |
|-----------|--------|-----------|
| `aria-label` | `<nav>` | Always — `"Primary navigation"` |
| `aria-expanded` | Collapse toggle | When sidebar is collapsible |
| `aria-controls` | Collapse toggle | References sidebar content |
| `aria-current="page"` | Active SidebarItem | Current page indicator |
| `aria-hidden="true"` | Label text | When sidebar is collapsed |

### Keyboard
| Key | Action |
|-----|--------|
| Tab | Navigate through sidebar items in DOM order |
| Enter/Space | Activate navigation item or toggle |
| Escape | Close overlay sidebar on mobile/tablet |

### Focus
- Collapse toggle receives focus after Tab from logo
- First nav item receives focus on sidebar open (mobile)
- Focus must be visible with 2px ring on all interactive elements
- Focus moves into bottom section when tabbing past last nav item
- Collapsed sidebar items must show tooltip on focus (not just hover)

---

## Responsive Rules

| Breakpoint | Behavior | Width |
|------------|----------|-------|
| Desktop (1024px+) | Expanded sidebar, sticky left | 240px / 180px (compact) |
| Tablet (768-1023px) | Collapsed icon rail, toggle to expand overlay | 64px collapsed / 240px overlay |
| Mobile (320-767px) | Hidden sidebar, bottom tab bar replaces | 0px (bottom bar 100%) |

### Responsive Implementation Notes
- Sidebar transitions use CSS `width` animation (not `transform`) for layout safety
- Bottom bar mode hides sidebar DOM and renders a separate BottomBar component
- Use CSS `clamp()` and container queries where possible for fluid behavior
- Overlay sidebar on tablet uses `position: fixed` with backdrop

---

## Animation Rules

| Transition | Duration | Easing | Notes |
|------------|----------|--------|-------|
| Expand/Collapse | 200-300ms | ease-out | Animate width property |
| Overlay open | 200ms | ease-out | Slide in from left |
| Overlay close | 150ms | ease-in | Slide out to left |
| Bottom bar appear | 200ms | ease-out | Slide up from bottom |
| Item hover | 50ms | linear | Background color change |

- Respect `prefers-reduced-motion`: instant transitions, no slide
- Only animate width (not transform) to avoid layout thrashing
- Stagger menu items on open overlay (50ms delay per item)

---

## Future Expansion

| Extension | Description | Priority |
|-----------|-------------|----------|
| `mini` variant | Even smaller (48px) rail for ultra-dense UIs | Low |
| Collapsible groups | Nested SidebarGroup auto-collapse behavior | Medium |
| Drag reorder | Users reorder sidebar items | Low |
| Pin sub-menus | Flyout menus that stay open on click | Medium |
| Custom bottom slot variants | Multiple bottom sections | Low |
| Resizable sidebar | Drag handle to resize width | Low |

---

## Dependencies

| Dependency | Type | Reason |
|------------|------|--------|
| SidebarGroup | Child | Collapsible groups within sidebar |
| SidebarItem | Child | Individual navigation items |
| SidebarContext | Internal | Shared expanded/collapsed state |
| Theme tokens | Theme | Width, spacing, color tokens |
| useMediaQuery | Hook | Breakpoint detection |
| useKeyboard | Hook | Escape handler for overlay |

---

## Related Components

| Component | Relation |
|-----------|----------|
| Topbar | Sibling in layout — Topbar + Sidebar form app shell |
| NavigationRail | Alternative — icon-only rail for focused workspaces |
| BottomTabBar | Mobile adaptation — replaces Sidebar on small screens |
| SidebarGroup | Child — collapsible section within sidebar |
| SidebarItem | Child — single navigation entry |

---

## Anti-patterns

| Anti-pattern | Why |
|--------------|-----|
| Putting page content inside Sidebar | Sidebar is layout, not content container |
| Nesting Sidebars | Only one primary navigation per page |
| Hiding on desktop without toggle | Desktop users expect persistent navigation |
| Changing sidebar width without transition | Jarring layout shift |
| Using sidebar for secondary navigation | Use Tabs or sub-navigation instead |
| Bottom bar with >7 items | Cluttered, touch targets too small |
| Disabling collapse on tablet | Users expect collapsed rail on smaller screens |

---

## Performance Notes

- Sidebar renders once on mount — items should be statically defined, not dynamically generated on every render
- Use `React.memo` on SidebarItem to prevent re-renders on route changes
- Collapse/expand transitions use CSS transforms/width — GPU accelerated
- Lazy-load bottom section content (settings panels, help)
- Avoid inline functions in SidebarItem props — memoize callbacks
- Bottom bar replaces sidebar DOM on mobile — avoid mounting both
