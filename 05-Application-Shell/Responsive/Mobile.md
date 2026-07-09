# Mobile

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent

---

## Viewport Range

320px to 767px

---

## Shell State

| Element | State |
|---------|-------|
| Header | Compact — hamburger + page title + action icons (max 3) |
| Sidebar | Hidden. Replaced by bottom tab bar (5-7 items). Hamburger opens drawer. |
| Content | Full width. Minimal padding (16px). Single column. |
| Context panel | Full-screen overlay or bottom sheet |
| AI panel | Full-screen modal |
| Footer | Hidden (or minimal) |
| Floating panels | Not available |

---

## Layout Rules

| Rule | Value |
|------|-------|
| Grid columns | 1 |
| Typography | Reduced scale. Body min 16px. |
| Spacing | Minimal padding (16px) |
| Touch targets | Minimum 44x44px (48px preferred) |
| Animations | Reduced motion preferred |
| Bottom sheet | Primary interaction surface for secondary content |
| Swipe gestures | Support swipe-back navigation, swipe to dismiss panels |

---

## Bottom Tab Bar

| Tab | Icon | Label |
|-----|------|-------|
| Dashboard | home | Home |
| Jobs | briefcase | Jobs |
| AI | sparkles | AI |
| Documents | file | Docs |
| More | dots | More (overflow menu) |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Responsive-Architecture.md](Responsive-Architecture.md) | Parent responsive architecture |

---

*Mobile provides a touch-optimized experience. All core functionality is available, adapted for small screens and touch interaction.*
