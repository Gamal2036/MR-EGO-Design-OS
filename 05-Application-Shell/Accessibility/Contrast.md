# Accessibility — Contrast

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Accessibility.md](../../02-Design-Language/Accessibility.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 6)

---

## Purpose

Defines contrast requirements specific to the application shell elements — ensuring all shell surfaces meet WCAG AA minimum (AAA preferred).

---

## Shell Contrast Requirements

| Element | Minimum Ratio | Target Ratio |
|---------|--------------|--------------|
| Body text | 4.5:1 | 7:1 |
| Large text (18px+ / 14px bold+) | 3:1 | 4.5:1 |
| UI component borders | 3:1 | 4.5:1 |
| Icon (informative) | 3:1 | 4.5:1 |
| Placeholder text | 4.5:1 | 7:1 |
| Focus indicator | 3:1 against background | 4.5:1 |
| Disabled text | 3:1 | 4.5:1 |
| Error text | 4.5:1 | 7:1 |
| Link text | 4.5:1 | 7:1 |
| Header background/text | 4.5:1 | 7:1 |
| Sidebar background/text | 4.5:1 | 7:1 |

---

## Contrast Rules

| Rule | Description |
|------|-------------|
| Both themes | Contrast requirements apply equally to light and dark themes |
| Non-text contrast | UI components and graphical objects meet 3:1 minimum |
| Focus visibility | Focus indicator has 3:1 contrast against adjacent background |
| Adjacent colors | Adjacent color combinations are checked for sufficient contrast |
| Glass effects | Glass surfaces ensure text remains readable (background+blur combination) |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Header/Header-Architecture.md](../Header/Header-Architecture.md) | Header contrast requirements |
| [Sidebar/Sidebar-Architecture.md](../Sidebar/Sidebar-Architecture.md) | Sidebar contrast requirements |

---

*Contrast requirements ensure the shell is readable by all users. They implement WCAG AA as minimum and AAA as target.*
