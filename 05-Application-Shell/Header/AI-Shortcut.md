# AI Shortcut

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Product-Constitution.md](../../01-Constitution/Product-Constitution.md) — AI Integration Rules), DP-3 ([FloatingButton.md](../../04-Component-Library/Core/FloatingButton.md))

---

## Purpose

Defines the AI shortcut — the always-available trigger for AI interaction from anywhere in the workspace.

---

## AI Shortcut Types

### Header AI Button
An icon button in the header's right section.

- Icon: sparkles or magic wand
- Click toggles the AI chat panel
- Tooltip: "AI Assistant (Ctrl+I)"
- Active state (highlighted) when AI panel is open

### Floating AI Button
A floating action button for AI access.

- Positioned at bottom-right of the viewport (z-index: floating layer)
- Only visible when AI panel is closed
- Click opens the AI chat panel
- Animated entrance (scale + fade) when becoming visible
- Hidden during focus mode, full-screen mode, and on mobile

### Keyboard Shortcut
- Ctrl+I toggles AI panel from anywhere
- Works even when the AI panel is hidden/collapsed
- Announced by screen readers on activation

---

## AI Shortcut Behavior

| Action | Result |
|--------|--------|
| Click header button | Toggle AI panel |
| Click floating button | Open AI panel |
| Ctrl+I (panel closed) | Open AI panel, focus input |
| Ctrl+I (panel open) | Focus AI input if unfocused, close if already focused |
| Escape (panel open) | Close AI panel |
| Right-click floating button | Quick AI actions menu |

---

## AI Shortcut Rules

| Rule | Description |
|------|-------------|
| Always available | AI shortcut is always visible (except focus/fullscreen mode) |
| Single toggle | Same action both opens and closes |
| Context preserved | AI conversation state is preserved when toggling |
| Graceful offline | Button is dimmed when AI services are unavailable, tooltip shows "AI unavailable" |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Header-Architecture.md](Header-Architecture.md) | Header placement for AI button |
| [Workspace/AI-Zones.md](../Workspace/AI-Zones.md) | AI panel that the shortcut opens |
| [Regions/AI-Region.md](../Regions/AI-Region.md) | AI region specification |

---

*The AI shortcut provides instant access to AI assistance from any workspace state. It makes AI feel native and always available.*
