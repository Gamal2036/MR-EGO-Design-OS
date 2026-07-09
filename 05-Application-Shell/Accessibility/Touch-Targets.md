# Accessibility — Touch Targets

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Accessibility.md](../../02-Design-Language/Accessibility.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 6)

---

## Purpose

Defines touch target size and placement requirements for the application shell — ensuring all interactive elements are usable on touch devices.

---

## Touch Target Sizes

| Element Class | Minimum Size | Preferred Size |
|--------------|--------------|----------------|
| Navigation items | 44x44px | 48x48px |
| Icon buttons | 44x44px | 48x48px |
| Buttons (text) | 44px height | 48px height |
| Form controls | 44px height | 48px height |
| Tabs | 44px height | 48px height |
| Bottom tab bar items | 44x44px | 56x56px |
| Floating buttons | 44x44px | 56x56px |
| Links (inline) | 44px touch area | 48px touch area |
| Slider handles | 44x44px | 48x48px |
| Drag handles | 44px (hit area) | 48px (hit area) |

---

## Touch Target Rules

| Rule | Description |
|------|-------------|
| Minimum 44x44 | All interactive elements have minimum 44x44px touch target |
| Spacing | 8px minimum gap between adjacent touch targets |
| Extended hit area | Small elements extend hit area with invisible padding |
| Thumb zones | Primary actions placed in thumb-friendly zones (bottom and bottom-right) |
| No hover dependency | No functionality depends on hover on touch devices |
| Swipe support | Swipe gestures have visual affordances |

---

## Thumb Zones

| Zone | Accessibility | Action Placement |
|------|---------------|-----------------|
| Bottom (easy) | Easy reach for thumb | Primary actions, bottom tabs, FAB |
| Center (moderate) | Moderate stretch | Content actions, secondary controls |
| Top (hard) | Difficult reach, device grip shift | Header controls (accessible via reach) |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Responsive/Mobile.md](../Responsive/Mobile.md) | Mobile touch target requirements |

---

*Touch target requirements ensure the workspace is usable on all touch devices. Every interactive element meets minimum touch target size.*
