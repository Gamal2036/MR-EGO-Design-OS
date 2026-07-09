# Tablet

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent

---

## Viewport Range

768px to 1023px

---

## Shell State

| Element | State |
|---------|-------|
| Header | Standard — center section (search) hidden. Menu toggle visible. |
| Sidebar | Collapsed (64px rail) by default. Toggle opens overlay drawer. |
| Content | Full width. Reduced padding (16px). |
| Context panel | Slide-over from right (overlay, 320px) or bottom sheet |
| AI panel | Bottom sheet or full-screen overlay |
| Footer | Visible (compact) |
| Floating panels | Not recommended (limited space) |

---

## Layout Rules

| Rule | Value |
|------|-------|
| Grid columns | 2 (dashboard, content) |
| Typography | Reduced scale (h3 max) |
| Spacing | Reduced padding (16px) |
| Touch targets | Minimum 44x44px |
| Animations | Reduced motion encouraged |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Responsive-Architecture.md](Responsive-Architecture.md) | Parent responsive architecture |

---

*Tablet adapts the workspace to medium screens by collapsing sidebar, hiding search, and using overlay panels.*
