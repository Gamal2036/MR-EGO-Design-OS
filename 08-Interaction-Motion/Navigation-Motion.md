# Navigation Motion

**Phase:** DP-8 (Interaction & Motion System)
**Design Authority:** DP-4 ([Navigation/](../05-Application-Shell/Navigation/)), DP-6 ([Navigation-Flow.md](../06-UX-Architecture/Navigation-Flow.md))
**Inherits:** Navigation architecture from DP-4 and DP-6

---

## Navigation Motion Philosophy

Navigation motion communicates spatial relationships between pages and sections. Users should feel where they are, where they came from, and where they can go. Motion reinforces the information architecture.

---

## Desktop Navigation Motion

### Sidebar

| Action | Animation | Duration | Easing |
|--------|-----------|----------|--------|
| Expand (collapsed→full) | Width 64px→240px, icons shift, labels fade in | 200ms | Ease-Out |
| Collapse (full→collapsed) | Width 240px→64px, labels fade out | 200ms | Ease-Out |
| Item hover | Background tint | 100ms | Ease-Out |
| Item active | Left border appear + background | 200ms | Ease-Out |
| Section toggle (collapsible) | Content reveal with stagger | 200ms | Ease-Out |
| App logo | Static | — | — |

### Top Bar

| Action | Animation | Duration | Easing |
|--------|-----------|----------|--------|
| Page title update | Cross-fade title | 200ms | Ease-Out |
| Breadcrumb update | Fade out old, fade in new | 200ms | Ease-Out |
| Notification badge update | Scale badge count | 200ms | Ease-Spring |
| User menu open | Dropdown fade + slide | 200ms | Ease-Out |

### Tabs (Primary)

| Action | Animation | Duration | Easing |
|--------|-----------|----------|--------|
| Tab hover | Background tint | 100ms | Ease-Out |
| Tab active | Bottom indicator slides to active tab | 200ms | Ease-Out |
| Tab content change | Content cross-fade | 200ms | Ease-In-Out |
| Tab scroll (overflow) | Chevron scroll buttons | 200ms | — |

### Breadcrumb

| Action | Animation | Duration | Easing |
|--------|-----------|----------|--------|
| Hover (link) | Text color transition | 100ms | Ease-Out |
| Active page update | Current page fades to previous, new fades in | 200ms | Ease-Out |
| Collapse (deep path) | Ellipsis appears smoothly | 200ms | Ease-Out |

### Secondary Navigation

| Action | Animation | Duration | Easing |
|--------|-----------|----------|--------|
| Segmented control active | Active segment slides | 200ms | Ease-Out |
| Context menu open | Fade + scale from cursor | 150ms | Ease-Out |
| Context menu close | Fade + scale to cursor | 100ms | Ease-In |
| Dropdown menu open | Fade + slide down 8px | 200ms | Ease-Out |
| Dropdown menu close | Fade + slide up 8px | 150ms | Ease-In |

---

## Mobile Navigation Motion

### Bottom Tab Bar

| Action | Animation | Duration | Easing |
|--------|-----------|----------|--------|
| Tab switch | Icon+badge transition | 200ms | Ease-Out |
| Tab press | Scale 0.95 | 50ms | Ease-Out |
| Badge update | Scale animation | 200ms | Ease-Spring |
| Tab bar appear | Slide up from bottom | 300ms | Ease-Out |
| Tab bar hide | Slide down | 200ms | Ease-In |

### Mobile Hamburger Menu

| Action | Animation | Duration | Easing |
|--------|-----------|----------|--------|
| Open | Menu slides in from left | 300ms | Ease-Out |
| Close | Menu slides out to left | 200ms | Ease-In |
| Item appear | Staggered fade in (50ms per item) | 300ms total | Ease-Out |
| Item tap | Background tint | 50ms | Ease-Out |
| Backdrop appear | Opacity 0→1 | 300ms | Ease-Out |
| Backdrop disappear | Opacity 1→0 | 200ms | Ease-In |

### Mobile Drawer (Bottom Sheet)

| Action | Animation | Duration | Easing |
|--------|-----------|----------|--------|
| Open | Slides up from bottom | 300ms | Ease-Out |
| Close | Slides down | 200ms | Ease-In |
| Drag to dismiss | Follows finger, snap threshold 30% | Variable | — |
| Snap expand | Continues to full height | 200ms | Ease-Out |
| Handle grab | Handle scales up | 50ms | — |

---

## Panel Navigation Motion

### Side Panel (Context / AI)

| Action | Animation | Duration | Easing |
|--------|-----------|----------|--------|
| Open (from right) | Slide in from right edge | 300ms | Ease-Out |
| Close (to right) | Slide out to right edge | 200ms | Ease-In |
| Resize (drag edge) | Smooth width change | Active: instant | — |
| Content change | Cross-fade | 200ms | Ease-Out |
| Panel tab switch | Content slide (horizontal) | 200ms | Ease-In-Out |

### Inspector Panel

| Action | Animation | Duration | Easing |
|--------|-----------|----------|--------|
| Open | Slide in from right (narrower) | 250ms | Ease-Out |
| Close | Slide out to right | 200ms | Ease-In |
| Content update | Cross-fade | 150ms | Ease-Out |

### Preview Panel

| Action | Animation | Duration | Easing |
|--------|-----------|----------|--------|
| Open | Scale from 0.95 + fade | 250ms | Ease-Out |
| Close | Scale to 0.95 + fade | 200ms | Ease-In |
| Content change | Cross-fade | 200ms | Ease-Out |

---

## Command Palette

| Action | Animation | Duration | Easing |
|--------|-----------|----------|--------|
| Open (Ctrl+K) | Scale from 0.95 + fade in | 200ms | Ease-Out |
| Close (Escape) | Scale to 0.95 + fade out | 150ms | Ease-In |
| Search input focus | Cursor appears, placeholder transitions | 100ms | — |
| Results appear | Staggered fade (50ms per item) | 300ms total | Ease-Out |
| Results filter | Cross-fade existing results | 100ms | Ease-Out |
| Selection hover | Background tint | 50ms | — |
| Command execute | Palette closes, page navigates | 150ms + transition | — |

---

## Search Navigation

| Action | Animation | Duration | Easing |
|--------|-----------|----------|--------|
| Search icon click | Search expands from icon to full bar | 300ms | Ease-Out |
| Focus | Border color transition | 100ms | Ease-Out |
| Typing | Debounced results update (300ms) | — | — |
| Results appear | Staggered fade in (50ms per item) | 300ms total | Ease-Out |
| Results update | Cross-fade | 200ms | Ease-Out |
| Clear | Fade out results | 150ms | Ease-In |
| Close (Escape) | Collapse search bar, restore | 200ms | Ease-Out |
| Navigate to result | Search closes, page transitions | 300ms | Ease-In-Out |

---

## Navigation Transition Rules

1. **Navigation animation direction matches information hierarchy** — Deeper pages slide in from right, parent pages slide in from left
2. **Tab switches use horizontal slide** — Content slides in direction matching tab order
3. **Sidebar navigation uses icon/color change** — No page-in-page transition within sidebar
4. **Panel open/close never triggers full page transition**
5. **Command palette overlays everything** — Content beneath remains static during palette use
6. **Search expands from its trigger point** — Visual connection between trigger and expanded state
7. **Navigation animation never exceeds 300ms** — Users perceive navigation as connected but not slow
8. **Back navigation uses reverse animation** — Going back reverses the forward animation

---

## Cross-References

- [Page-Transitions.md](Page-Transitions.md) — Full page-to-page transition specifications
- [Interaction-System.md](Interaction-System.md) — Core interaction rules
- [Gesture-System.md](Gesture-System.md) — Touch gesture navigation
- [Keyboard-Interactions.md](Keyboard-Interactions.md) — Keyboard navigation
- [Responsive-Motion.md](Responsive-Motion.md) — Mobile vs desktop differences
