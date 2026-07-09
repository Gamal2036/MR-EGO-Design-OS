# Keyboard Navigation

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 7), DP-1 ([Accessibility.md](../../02-Design-Language/Accessibility.md))

---

## Purpose

Defines the complete keyboard navigation model for the application shell — how users navigate and operate every part of the workspace using only a keyboard.

---

## Global Shortcuts

| Shortcut | Action | Scope |
|----------|--------|-------|
| Ctrl+K / Cmd+K | Open command palette | Global |
| Ctrl+, | Navigate to Settings | Global |
| Ctrl+1-9 | Navigate to primary navigation items (ordered) | Global |
| Ctrl+Shift+[ | Navigate back in history | Global |
| Ctrl+Shift+] | Navigate forward in history | Global |
| Ctrl+I | Toggle AI panel | Global |
| Ctrl+B | Toggle sidebar | Global |
| Ctrl+Shift+F | Focus global search | Global |
| Escape | Close modal/dropdown/panel or exit focus mode | Contextual |
| Ctrl+Shift+E | Export current view | Global |
| / | Quick search in current context | Contextual |
| ? | Show keyboard shortcuts help (overlay) | Global |

---

## Navigation Shortcuts

| Shortcut | Action |
|----------|--------|
| Tab | Move focus to next interactive element |
| Shift+Tab | Move focus to previous interactive element |
| Arrow keys | Navigate within groups (tabs, lists, menu items) |
| Enter | Activate focused element |
| Space | Toggle focused element (checkbox, switch) |
| Home | Go to first element in a group |
| End | Go to last element in a group |
| Page Up/Down | Scroll one page in the active scroll container |

---

## Panel Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+Shift+] | Move focus to next panel |
| Ctrl+Shift+[ | Move focus to previous panel |
| Ctrl+Shift+\ | Toggle current panel's collapsible state |
| Alt+Arrow | Navigate between docked panel tabs |

---

## Focus Management

| Behavior | Description |
|----------|-------------|
| Visible focus | All interactive elements show a 2px focus ring |
| Tab order | Tab follows visual order: header → sidebar → content → footer |
| Skip link | First tab press shows "Skip to content" link |
| Focus trap | Modals, drawers, and command palette trap focus |
| Focus restoration | When a modal closes, focus returns to the triggering element |
| Focus scrolling | Focused elements scroll into view automatically |
| No keyboard traps | Focus never gets stuck in any component |

---

## Keyboard Navigation Rules

| Rule | Description |
|------|-------------|
| Full operability | Every interactive element is reachable and operable via keyboard |
| Standard patterns | Arrow keys for selection, Enter to activate, Escape to dismiss |
| Visible focus | Focus indicator is always visible (minimum 2px ring) |
| Predictable order | Tab order matches visual layout (left-to-right, top-to-bottom) |
| No traps | Focus never gets stuck in a component or region |
| Skip navigation | Skip-to-content link is the first focusable element |
| Shortcut discoverability | Ctrl+/ or ? opens the keyboard shortcuts overlay |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Command-Navigation.md](Command-Navigation.md) | Command palette keyboard navigation |
| [Accessibility/Keyboard-Navigation.md](../Accessibility/Keyboard-Navigation.md) | Accessibility keyboard requirements |
| [Accessibility/Focus-Order.md](../Accessibility/Focus-Order.md) | Detailed focus order specification |

---

*Keyboard navigation is a first-class interaction model. Every workspace feature is fully operable via keyboard, implementing UX Constitution Rule 7.*
