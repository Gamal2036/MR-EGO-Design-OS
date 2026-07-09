# Desktop

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent

---

## Viewport Range

1280px to 1919px

---

## Shell State

| Element | State |
|---------|-------|
| Header | Full variant — left, center, right sections all visible |
| Sidebar | Expanded (240px default). User can collapse to 64px. |
| Content | Max-width constrained (varied by layout, typically 1280px) |
| Context panel | Visible (320-480px), resizable |
| AI panel | Visible (400px), resizable, collapsible |
| Footer | Visible |
| Floating panels | Allowed (max 3) |

---

## Layout Rules

| Rule | Value |
|------|-------|
| Grid columns | 4 (dashboard), 2-3 (content), 2 (charts) |
| Typography | Full scale (h1-h6, body, small) |
| Spacing | Full padding (32-48px) |
| Touch targets | Minimum 44x44px (hybrid touch devices) |
| Animations | Full motion enabled |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Responsive-Architecture.md](Responsive-Architecture.md) | Parent responsive architecture |

---

*Desktop provides the full workspace experience with all regions visible and resizable.*
