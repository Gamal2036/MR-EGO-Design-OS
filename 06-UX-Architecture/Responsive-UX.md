# Responsive UX

**Phase:** DP-6 (UX Architecture)
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md) — Rule 8), DP-1 ([Responsive-System.md](../02-Design-Language/Responsive-System.md)), DP-4 ([Responsive/](../05-Application-Shell/Responsive/))

---

## Breakpoint System

| Class | Width | Typical Device | Layout Columns | Grid Behavior |
|-------|-------|----------------|----------------|---------------|
| Mobile | 320–767px | Phone | 4 columns | Single column stack |
| Tablet | 768–1023px | Tablet, large phone | 8 columns | 2-column layouts |
| Laptop | 1024–1279px | Small laptop | 12 columns | 3-column layouts |
| Desktop | 1280–1599px | Desktop, large laptop | 12 columns | Multi-column |
| Ultra-wide | 1600–1920px+ | Large desktop | 12 columns (+ margins) | Expanded |
| Foldable | Dynamic | Foldable / dual-screen | Adapted per posture | CSS-span aware |

---

## Per-Device UX Specifications

### Mobile (320–767px)

| Feature | Behavior |
|---------|----------|
| **Navigation** | Bottom tab bar (5 max icons), hamburger drawer for overflow |
| **Layout** | Single column, full-bleed content |
| **Search** | Full-screen overlay on focus |
| **Filters** | Bottom sheet (slide up) |
| **Modals** | Full-screen sheets |
| **AI Panel** | Full-screen modal or bottom sheet |
| **Dashboard** | 4 essential widgets stacked |
| **Forms** | Full-width inputs, sticky CTA at bottom |
| **Tables** | Card view (row as card) |
| **CTAs** | Bottom-anchored, thumb zone |
| **Gestures** | Swipe back, swipe to dismiss, pull to refresh |
| **Keyboard** | Content adjusts when keyboard opens |

### Tablet (768–1023px)

| Feature | Behavior |
|---------|----------|
| **Navigation** | Collapsed sidebar (icon rail, 64px), tap to expand overlay |
| **Layout** | 2-column grid, side panels as drawers |
| **Search** | Inline 400px max |
| **Filters** | Side drawer (push from left/right) |
| **Modals** | Centered dialog (80% width) |
| **AI Panel** | Right drawer with overlay |
| **Dashboard** | 2-column grid |
| **Forms** | 2-column layout for related fields |
| **Tables** | Responsive with horizontal scroll |
| **Split View** | Primary + secondary regions visible |

### Laptop (1024–1279px)

| Feature | Behavior |
|---------|----------|
| **Navigation** | Expanded sidebar (240px) user configurable to collapsed |
| **Layout** | 3-column with sidebar + content + optional side panel |
| **Search** | Inline 600px max |
| **Filters** | Persistent sidebar on search pages |
| **Modals** | Centered dialog (640px max) |
| **AI Panel** | Right panel (360px width), resizable |
| **Dashboard** | 3-column grid |
| **Forms** | 2-column with right help panel |
| **Tables** | Full table with col resize |
| **Split View** | Primary + secondary + optional context |

### Desktop (1280–1599px)

| Feature | Behavior |
|---------|----------|
| **Navigation** | Expanded sidebar (240px) with labels |
| **Layout** | Multi-column, full workspace |
| **Search** | Inline 720px max |
| **Filters** | Persistent sidebar |
| **Modals** | Centered dialog (720px max) |
| **AI Panel** | Right panel (400px), resizable, tabbed |
| **Dashboard** | 4-column configurable grid |
| **Forms** | Multi-column with hints |
| **Tables** | Full with inline filters |
| **Split View** | Full tri-panel capability |

### Ultra-wide (1600px+)

| Feature | Behavior |
|---------|----------|
| **Navigation** | Expanded sidebar |
| **Layout** | Content constrained to 1600px, centered with margins |
| **Search** | 800px max left-aligned |
| **Filters** | Left sidebar + right AI panel |
| **Modals** | Centered dialog (800px max) |
| **AI Panel** | Expanded right panel with full AI workspace capability |
| **Dashboard** | 4-6 column grid with AI companion rail |
| **Forms** | Multi-column with preview panel |
| **Tables** | Full width with all columns visible |
| **Split View** | Extended multi-panel, floating panels |

### Foldable / Dual-Screen

| Feature | Behavior |
|---------|----------|
| **Fold posture** | Content avoids hinge (safe areas) |
| **Span mode** | Layout uses both screens as one canvas |
| **Dual-screen** | Content on left, context on right |
| **Navigation** | Bottom tabs on single screen, sidebar on spanned |
| **AI Panel** | Right screen when spanned |
| **Dashboard** | Reflow across screens |
| **Resume** | State restored when folded/unfolded |

### Future Large Touch

| Feature | Behavior |
|---------|----------|
| **Device type** | Interactive whiteboards, large touch tables |
| **Interaction** | Touch + pen input support |
| **Layout** | Workspace mode with floating panels |
| **Navigation** | Dock-style sidebar |
| **AI** | Voice + touch interaction |
| **Multi-user** | Collaborative mode (future) |

---

## Layout Adaptation Rules

| Component | Mobile | Tablet | Desktop | Wide |
|-----------|--------|--------|---------|------|
| Sidebar | Drawer overlay | Icon rail | Expanded | Expanded |
| Topbar | Compact (actions in overflow) | Full | Full | Full with extras |
| Content padding | 16px | 24px | 32px | 32-48px |
| Card columns | 1 | 2 | 3 | 4 |
| Font size base | 16px | 16px | 16px | 16px (+ optional) |
| AI Panel | Full-screen modal | Drawer | Side panel | Side panel expanded |
| Filters | Bottom sheet | Drawer | Sidebar | Sidebar |
| Tables | Card view | Responsive | Full | Full |
| Modal | Full-screen | Centered 80% | Centered 640px | Centered 720px |
| Touch targets | 44x44px min | 44x44px min | 40x40px | 40x40px |

---

## Navigation Adaptation

| Navigation Element | Mobile | Tablet | Desktop | Ultra-wide |
|-------------------|--------|--------|---------|------------|
| Primary Nav | Bottom tab bar | Icon rail | Sidebar 240px | Sidebar 240px |
| Secondary Nav | Top tabs | Tabs | Tabs / Sub-nav | Tabs / Sub-nav |
| Breadcrumbs | Hidden (back btn) | Collapsed | Full | Full |
| Command palette | Full overlay | Overlay | Overlay | Overlay |
| Search | Full-screen | Inline 400px | Inline 600px | Inline 800px |
| Notifications | Full-screen | Drawer | Dropdown | Dropdown |

---

## Content Density

| Mode | Mobile | Tablet | Desktop | When |
|------|--------|--------|---------|------|
| Comfortable | Default | Default | Default | Normal browsing |
| Compact | — | Optional | Optional | Power users, data-heavy screens |
| Focus | Minimal chrome | Minimal chrome | Minimal chrome | Reading, deep work |

---

## Touch Gesture Map

| Gesture | Action | Device |
|---------|--------|--------|
| Swipe left | Dismiss notification, card | Mobile, Tablet (touch) |
| Swipe right | Go back | Mobile |
| Pull down | Refresh content | Mobile, Tablet |
| Pinch | Zoom document preview | All touch |
| Long press | Context menu | All touch |
| Double tap | Like/favorite | Mobile, Tablet |
| Drag up/down | Reorder list | Mobile, Tablet |
| Edge swipe | Open drawer | Mobile |

---

## Responsive UX Rules

1. **Content parity** — Core workflows work on all devices. Mobile is not a subset of desktop.
2. **Progressive enhancement** — Start mobile, add complexity for larger screens.
3. **Touch-first** — All interactive elements designed for touch first, mouse second.
4. **No horizontal scroll** — Content wraps or transforms at every breakpoint.
5. **Keyboard aware** — Mobile forms adjust when keyboard opens.
6. **Orientation support** — Portrait and landscape both supported on mobile/tablet.
7. **Print styles** — Profile, CV, and Job Detail pages have print stylesheets.

---

*Responsive UX is not an afterthought — it is the foundation. Every screen, component, and interaction is designed to work optimally across all device classes. Refer to [Screen-Inventory.md](Screen-Inventory.md) for screen-specific responsive behavior and [Interaction-Patterns.md](Interaction-Patterns.md) for interaction patterns.*
