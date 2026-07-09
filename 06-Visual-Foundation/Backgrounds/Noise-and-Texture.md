# Noise and Texture

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Design-Principles.md](../../01-Constitution/Design-Principles.md))

---

## Philosophy

MR:EGO does not use noise or texture on backgrounds or surfaces. The design language is intentionally flat. Texture adds visual weight, creates inconsistency across themes, and introduces performance overhead.

---

## What MR:EGO Uses Instead of Texture

| Purpose | Instead of Texture | MR:EGO Approach |
|---------|-------------------|-----------------|
| Visual interest | Background noise | Typography, spacing, hierarchy |
| Surface distinction | Paper texture | Elevation, shadow, color |
| Depth | Grain texture | Shadow layering, elevation |
| Warmth | Fabric/wood texture | Glass, soft shadows, rounded corners |
| Premium feel | Embossing/stamping | Precise alignment, generous spacing |

---

## Absolute Prohibitions

| Element | Reason |
|---------|--------|
| Background noise/grain | Adds visual weight without purpose |
| Paper texture | Fights with theme adaptation |
| Fabric texture | Dates quickly, hard to maintain |
| Grid patterns on backgrounds | Distracts from content |
| Subtle patterns/logos | Adds visual noise without benefit |
| Noise overlays on images | Reduces readability |

---

## Exceptions

The only acceptable use of texture-like effects:

| Exception | Form | Context |
|-----------|------|---------|
| AI thinking | Gradient pulse | AI-specific, temporary |
| Loading skeleton | Animated shimmer | Loading state, temporary |
| Data visualization | Chart fills, area colors | Charts only |
| Illustration fills | Solid color fills | Illustrations only |

---

## Performance Impact

Textures add:
- Increased paint time (10-50ms per textured surface)
- Larger bundle size (CSS noise patterns, SVG textures)
- Theme inconsistency (texture looks different in dark mode)
- Maintenance burden (trends change)

MR:EGO's flat approach avoids all these costs while maintaining a premium appearance through typography, spacing, and hierarchy.

---

*This Noise and Texture specification is permanent. MR:EGO surfaces are intentionally flat. Refer to [Background-System.md](Background-System.md) for background specifications, [Gradient-Rules.md](Gradient-Rules.md) for gradient usage, and [Design-Principles.md](../../01-Constitution/Design-Principles.md) for the flat design philosophy.*
