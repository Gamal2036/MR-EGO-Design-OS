# Safe Areas

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Responsive-System.md](../../02-Design-Language/Responsive-System.md))

---

## Purpose

Defines how the workspace handles device-specific safe areas — notches, status bars, system navigation bars, rounded corners, and other display cutouts.

---

## Safe Area Types

### Notch (Top)
The display cutout area at the top of modern phones and some laptops.

- Header respects the notch area
- Content padding accounts for the notch
- Header background extends into the notch area
- Content text and interactive elements stay clear of the notch

### Status Bar (Top)
The system status bar area on mobile devices.

- Workspace does not render content in the status bar area
- Header begins below the status bar
- Status bar color matches header background (light/dark appropriate)

### System Navigation Bar (Bottom)
The system-level navigation bar on Android and some mobile platforms.

- Bottom-anchored elements (status bar, bottom tabs) account for the nav bar
- Content scrolls behind the nav bar area with appropriate padding
- Interactive elements are placed above the safe area

### Rounded Corners
Device display corners on modern phones.

- Content respects the corner radius
- Full-screen elements extend behind the corner radius with padding
- Interactive elements are not placed in corner regions

### Fold Hinge
The hinge area on foldable devices.

- Content avoids the hinge area (hinge is treated as a safe area)
- On dual-screen mode, content is not placed across the hinge
- On unfolded (tablet) mode, the hinge is treated as a narrow gap

---

## Safe Area Rules

| Rule | Description |
|------|-------------|
| Safe area constants | Safe area values are defined as environment constants, not hardcoded |
| CSS env() | Use CSS `env(safe-area-inset-*)` for standard safe areas |
| Feature detection | Detect foldable/dual-screen via CSS `device-posture` and JavaScript API |
| Responsive safe areas | Safe area values change with device orientation |
| Full-screen mode | In full-screen mode, additional safe area padding is applied |
| Desktop safe areas | Desktop has minimal safe areas (standard padding only) |

---

## Safe Area Values by Device Class

| Device Class | Top Safe Area | Bottom Safe Area | Side Safe Areas |
|-------------|---------------|------------------|-----------------|
| Desktop | 0px | 0px | 0px |
| Laptop | 0px | 0px | 0px |
| Tablet | 24-48px (status bar) | 16-32px (nav bar) | 0px |
| Mobile (notch) | 44-56px | 16-34px (home indicator) | 0px |
| Mobile (no notch) | 24px (status bar) | 16px (home indicator) | 0px |
| Foldable (folded) | 44-56px | 16-34px | Hinge gap |
| Foldable (unfolded) | 24-48px | 16-32px | 0px |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Responsive-Architecture.md](../Responsive/Responsive-Architecture.md) | Responsive behavior across device classes |
| [Mobile.md](../Responsive/Mobile.md) | Mobile-specific workspace behavior |
| [Foldables.md](../Responsive/Foldables.md) | Foldable device handling |

---

*Safe areas ensure the workspace is usable and visually correct across all device types, including those with notches, cutouts, and hinges.*
