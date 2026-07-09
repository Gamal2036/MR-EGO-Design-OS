# Future Devices

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent

---

## Purpose

Defines the adaptation strategy for emerging and future device classes. The workspace architecture is designed to accommodate devices that do not yet exist.

---

## Adaptation Principles

| Principle | Description |
|-----------|-------------|
| Container queries | Use container queries instead of (or alongside) media queries |
| Fluid typography | Use `clamp()` for fluid type scaling across unknown viewports |
| Flexible grid | Grid uses flexible columns (`auto-fill`, `minmax`) not fixed counts |
| Feature detection | Detect device capabilities, not device names |
| Progressive enhancement | Base experience works on any device. Enhanced for capable devices. |
| Graceful degradation | Complex layouts degrade to single-column on unrecognized viewports |

---

## Future Device Strategies

| Device Type | Strategy |
|-------------|----------|
| AR/VR headsets | Audio-first navigation. Spatial layout. Minimal chrome. |
| Wearables | Notification-only. Voice interaction. Companion mode. |
| Smart displays | Focus on glanceable content. Voice + touch input. |
| E-ink devices | High contrast mode. No animations. Simplified layout. |
| Automotive | Voice-first. Large touch targets. Distraction-minimized mode. |
| Projection | Gesture input. Large format layout. Minimal text input. |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Responsive-Architecture.md](Responsive-Architecture.md) | Parent responsive architecture |

---

*The workspace is designed to adapt to unknown future devices. Container queries, fluid typography, and progressive enhancement ensure forward compatibility.*
