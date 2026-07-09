# Theme Switch

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md)), DP-3 ([Switch.md](../../04-Component-Library/Forms/Switch.md))

---

## Purpose

Defines the theme switching mechanism — how users switch between light and dark themes from the header.

---

## Theme Options

| Option | Description |
|--------|-------------|
| Light | Light backgrounds, dark text. Default for new users. |
| Dark | Dark backgrounds, light text. Default based on system preference. |
| System | Follows the OS-level theme preference. Default for most users. |

---

## Theme Switch Behavior

### Header Control
- Icon button in the header's right section
- Sun icon in dark mode, moon icon in light mode
- System mode shows auto icon (sun/moon hybrid)
- Click cycles: Light → Dark → System → Light
- Tooltip shows current theme: "Theme: Light (click to change)"

### Theming Effects
- Theme change is instant on all surfaces
- Smooth transition (300ms) on background and text colors
- Theme preference is persisted in localStorage
- Theme is applied before page renders (no flash)

---

## Theme Switch Rules

| Rule | Description |
|------|-------------|
| Both themes equal | Light and dark themes are both fully designed — neither is an afterthought |
| System default | Default to system preference when available |
| Per-session override | User can override system preference for the current session |
| Persistence | Theme preference is remembered across sessions |
| No flash | Theme is applied synchronously before the first render |
| Smooth transition | Color transitions are animated (300ms, ease-out) |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Color-System.md](../../02-Design-Language/Color-System.md) | Theme color values |
| [Header-Architecture.md](Header-Architecture.md) | Theme switch placement in header |

---

*The theme switch gives users control over their visual environment. Both themes are equally accessible and fully designed.*
