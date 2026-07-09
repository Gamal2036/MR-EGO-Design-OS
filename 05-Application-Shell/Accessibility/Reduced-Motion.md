# Accessibility — Reduced Motion

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Motion-System.md](../../02-Design-Language/Motion-System.md), [Animation-Principles.md](../../02-Design-Language/Animation-Principles.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 6)

---

## Purpose

Defines reduced motion behavior for the application shell — respecting the `prefers-reduced-motion` OS setting and providing motion-free alternatives for all animations.

---

## Shell Animations and Reduced Motion Alternatives

| Animation | Normal | Reduced Motion |
|-----------|--------|----------------|
| Sidebar expand/collapse | 250ms width transition | Instant (0ms) |
| Mobile drawer open | 300ms slide in | Opacity fade (100ms) |
| Panel resize | Instant during drag | Instant |
| Modal open | 200ms scale + fade | Opacity fade (100ms) |
| Dropdown open | 150ms opacity + translateY | Instant |
| Toast appear | 300ms slide in | Instant |
| Focus ring | 50ms | Instant |
| Page transitions | 300ms | Instant (no transition) |
| Skeleton shimmer | 1.5s animation loop | Static loading state |

---

## Reduced Motion Rules

| Rule | Description |
|------|-------------|
| prefers-reduced-motion | All animations check `prefers-reduced-motion: reduce` |
| No motion-only information | Information is never conveyed through motion alone |
| Animation off switch | Users can disable animations in settings (overrides OS) |
| Essential motion | Loading spinners and progress bars are exempt (but slowed) |
| No parallax | Parallax effects are never used |
| No auto-play | Content never auto-plays or animates without user action |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Workspace/Focus-Zones.md](../Workspace/Focus-Zones.md) | Focus mode disables non-essential animations |
| [States/Error.md](../States/Error.md) | Error states without motion |

---

*Reduced motion support ensures the workspace is comfortable for users with vestibular disorders and motion sensitivity.*
