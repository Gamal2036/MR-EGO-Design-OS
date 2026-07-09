# Ultra-wide

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent

---

## Viewport Range

1920px and above

---

## Shell State

| Element | State |
|---------|-------|
| Header | Full variant |
| Sidebar | Expanded (240px or 280px lg variant) |
| Content | Max-width limited per layout (xl=1280px centered, or full-bleed for data layouts) |
| Context panel | Extended width (480px), resizable |
| AI panel | Extended width (480px), resizable |
| Footer | Visible |
| Floating panels | Allowed (max 4) |

---

## Layout Rules

| Rule | Value |
|------|-------|
| Grid columns | 4-6 (dashboard), 3-4 (charts) |
| Content width | Max 1600px for readability. Full-bleed for data-intensive layouts. |
| Spacing | Maximum padding (48px sides, 32px vertical) |
| Multi-column | Support for 3-column split views (list + detail + inspector) |

---

## Ultra-wide Rules

| Rule | Description |
|------|-------------|
| Max line length | Body text never exceeds 70 characters per line |
| Content centering | Content is centered with max-width constraint |
| Full-bleed option | Data layouts (Analytics, Documents) can use full width |
| Multi-column | Support additional columns for data-dense workflows |
| Side-by-side | Two full pages side by side (e.g., comparison view) |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Responsive-Architecture.md](Responsive-Architecture.md) | Parent responsive architecture |

---

*Ultra-wide takes advantage of large displays for data-dense workflows while maintaining readability constraints for text content.*
