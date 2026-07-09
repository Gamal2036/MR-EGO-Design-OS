# Topbar

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Accessibility.md](../../02-Design-Language/Accessibility.md), [Responsive-System.md](../../02-Design-Language/Responsive-System.md), [Motion-System.md](../../02-Design-Language/Motion-System.md))

---

## Purpose

Global header bar fixed to the top of the application shell. Provides context (breadcrumb/page title), global search access (desktop), and user/settings actions. Fixed height of 56px with glass-morphism background.

---

## Responsibilities

- Display current location via breadcrumb or page title (left section)
- Provide global search trigger/input (center, desktop only)
- Render notification bell with unread indicator
- Display settings gear icon
- Host avatar/user menu dropdown (right section)
- Maintain fixed position at top of viewport
- Apply glass background effect (backdrop-blur + semi-transparent background)

---

## Composition

```
Topbar
├── LeftSection
│   ├── MenuToggle (hamburger, mobile/tablet)
│   ├── Breadcrumb OR PageTitle
├── CenterSection
│   └── SearchInput (desktop only)
├── RightSection
│   ├── IconButton (notifications)
│   │   └── Badge (unread count)
│   ├── IconButton (settings)
│   └── AvatarMenu
│       ├── Avatar
│       └── Dropdown (user menu)
```

---

## Hierarchy

| Component | Parent | Children |
|-----------|--------|----------|
| Topbar | Layout | Breadcrumb, SearchInput, IconButton, AvatarMenu, Badge |

Topbar is a sibling of Sidebar/NavigationRail and sits at the layout shell level.

---

## Props Contract (TypeScript)

```typescript
export interface TopbarProps {
  /** Left section content (Breadcrumb, PageTitle, or custom) */
  leftContent?: React.ReactNode;
  /** Center section content (SearchInput or custom) */
  centerContent?: React.ReactNode;
  /** Right section content (notifications, settings, avatar) */
  rightContent?: React.ReactNode;

  /** Page title (replaces breadcrumb on mobile or when breadcrumb is hidden) */
  pageTitle?: string;
  /** Breadcrumb component instance */
  breadcrumb?: React.ReactNode;

  /** Search props */
  searchProps?: {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    onSearch?: (value: string) => void;
    onOpenCommandPalette?: () => void;
  };

  /** Notification props */
  notificationProps?: {
    unreadCount?: number;
    onClick: () => void;
    hasAlert?: boolean;
  };

  /** User menu props */
  userMenuProps?: {
    avatarUrl?: string;
    userName: string;
    userEmail?: string;
    onLogout: () => void;
    menuItems: Array<{
      label: string;
      onClick: () => void;
      icon?: React.ReactNode;
      isDanger?: boolean;
    }>;
  };

  /** Glass background enabled */
  isGlass?: boolean;
  /** Fixed positioning */
  isFixed?: boolean;
  /** Transparent on scroll (becomes glass on scroll) */
  transparentUntilScroll?: boolean;

  /** Show hamburger menu toggle (mobile/tablet) */
  showMenuToggle?: boolean;
  onMenuToggle?: () => void;

  /** Height override */
  height?: number;

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
| `default` | Full topbar with left/center/right sections. Fixed. Glass background. |
| `minimal` | Only left section (breadcrumb) and right section (no center search). |
| `transparent` | Transparent background until user scrolls past threshold. |
| `with-breadcrumb` | Shows breadcrumb in left section. |

---

## States

| State | Description |
|-------|-------------|
| Default | Glass background, all sections rendered |
| Scrolled | Opaque or more opaque background after scroll threshold |
| Mobile | Center section (search) hidden. Menu toggle visible. |
| Search focused | Search input expanded, overlay or results dropdown visible |
| Notification alert | Unread dot/badge on notification icon |
| Dropdown open | User menu dropdown visible |

---

## Accessibility

### Landmarks
- `role="banner"` or `<header>` with `aria-label="Top bar"`

### ARIA
| Attribute | Target | Condition |
|-----------|--------|-----------|
| `aria-label` | Topbar element | Always — `"Top bar"` |
| `aria-expanded` | Menu toggle | When sidebar overlay is open |
| `aria-controls` | Menu toggle | References sidebar ID |
| `aria-haspopup` | Avatar button | True — opens user menu |
| `aria-expanded` | Avatar button | When user menu is open |
| `aria-label` | Search input | `"Global search"` |
| `aria-keyshortcuts` | Search input | `"Ctrl+K"` or `"Cmd+K"` |

### Keyboard
| Key | Action |
|-----|--------|
| Tab | Navigate through topbar controls: menu → breadcrumb → search → notifications → settings → avatar |
| Enter/Space | Activate button or open menu |
| Escape | Close open dropdown or search |
| Ctrl+K / Cmd+K | Focus search input or open command palette |

### Focus
- Focus ring (2px) on all interactive elements
- Tab order follows visual order: left → center → right
- Focus must not trap in topbar (continues to page content)
- Dropdown menu focuses first item on open
- Focus returns to trigger on dropdown close

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024px+) | Left (breadcrumb) + Center (search) + Right (notifications, settings, avatar). Full height 56px. |
| Tablet (768-1023px) | Left (menu + breadcrumb) + Right (notifications, avatar). Search collapsed to icon or hidden. |
| Mobile (320-767px) | Left (menu + page title) + Right (notifications, avatar). Breadcrumb collapses to page title. Search hidden or icon-only. |

### Responsive Implementation Notes
- Center section (search) is hidden on mobile, shown on desktop
- Breadcrumb collapses to page title on mobile
- Menu toggle only visible on mobile/tablet
- Height stays 56px across all breakpoints
- Glass effect must work on mobile (shorter backdrop-blur may cause jank)

---

## Animation Rules

| Transition | Duration | Easing | Notes |
|------------|----------|--------|-------|
| Background opacity (scroll) | 100ms | linear | Blur intensity + bg opacity |
| Search expand | 200ms | ease-out | Width or padding transition |
| Dropdown open | 150ms | ease-out | Opacity + translateY |
| Notification badge appear | 100ms | ease-out | Scale animation |

- Respect `prefers-reduced-motion`: disable background opacity animation, instant dropdown
- Glass effect `backdrop-blur` should not animate — static property

---

## Future Expansion

| Extension | Description | Priority |
|-----------|-------------|----------|
| Breadcrumb dropdown | Click segment to navigate sibling pages | Medium |
| Multi-profile avatar | Switch between user profiles | Low |
| Topbar tabs | Tab navigation within topbar for sub-sections | Low |
| Announcement bar | Dismissible announcement banner below topbar | Medium |
| Offline indicator | Connectivity status badge | Low |

---

## Dependencies

| Dependency | Type | Reason |
|------------|------|--------|
| Breadcrumb | Component | Location indicator |
| SearchInput | Component | Global search |
| IconButton | Component | Icon-based controls |
| Badge | Component | Unread notification count |
| Avatar | Component | User avatar |
| Dropdown | Component | User menu |
| useScrollPosition | Hook | Scroll detection for transparent variant |

---

## Related Components

| Component | Relation |
|-----------|----------|
| Sidebar | Sibling — Topbar + Sidebar form shell layout |
| NavigationRail | Sibling — alternative when NavigationRail replaces Sidebar |
| Breadcrumb | Child — hierarchical location indicator |
| Dropdown | Child — user menu dropdown |
| CommandPalette | Companion — Ctrl+K opens command palette from search input |

---

## Anti-patterns

| Anti-pattern | Why |
|--------------|-----|
| Putting page-level actions in Topbar | Use page header or toolbar |
| Overcrowding right section | Max 4-5 controls (menu, notifications, settings, avatar). More = confusion |
| Missing mobile menu toggle | Users cannot access navigation on mobile |
| Glass effect without fallback | `backdrop-filter` not supported in all browsers — provide solid bg fallback |
| Search in topbar on mobile | Use command palette or dedicated search page instead |
| Scrolling content behind glass topbar | Topbar content must stay readable — add subtle bottom border or shadow |

---

## Performance Notes

- `backdrop-blur` is GPU-intensive — apply `will-change: backdrop-filter` and limit blur radius
- Use `position: sticky` instead of `position: fixed` when possible for better performance
- Lazy-render dropdown menus (only mount when opened)
- `React.memo` on Topbar to avoid re-renders on page content changes
- Search input should debounce onChange (300ms)
