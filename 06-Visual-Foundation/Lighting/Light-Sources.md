# Light Sources

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Shadow-System.md](../../02-Design-Language/Shadow-System.md), [Elevation-System.md](../../02-Design-Language/Elevation-System.md))

---

## Philosophy

MR:EGO uses a simulated lighting model. Every surface, shadow, and glow assumes light originates from a consistent source. This creates a coherent visual world where depth, elevation, and material behavior feel natural and predictable.

---

## Light Source Model

### Primary Light: Top-Left Ambient

The dominant light source originates from the top-left, casting shadows down and to the right.

```
     ☀️
     ↙
     Light source at −45°
     │
     ▼
   ┌──────────┐
   │ Surface  │──→ Shadow casts right and down
   └──────────┘
```

This matches the reading direction (left-to-right, top-to-bottom) and creates a natural, comfortable lighting environment.

### Secondary Light: Top Ambient Fill

A softer, diffuse light from directly above fills in harsh shadows and prevents surfaces from appearing too dark on their right and bottom edges.

### Tertiary Light: AI-Localized Glow (Contextual)

AI components emit their own subtle glow — a soft luminescence from within. This light does not cast external shadows. It only illuminates the AI element itself.

---

## Light Properties

| Property | Primary Source | Secondary Fill | AI Glow |
|----------|---------------|----------------|---------|
| Direction | −45° (top-left) | 0° (directly above) | Emitted from center |
| Intensity | 100% (baseline) | 30% (fill) | 15-40% (variable) |
| Falloff | Linear | Soft | Radial |
| Color | Pure white | Pure white | Primary-400 (light mode) / Primary-300 (dark mode) |
| Spread | Infinite | Infinite | Contained within element bounds |

---

## Light Behavior by Theme

### Light Theme

- Ambient light is bright and clean
- Shadows are subtle (low opacity: 0.03–0.20)
- Surfaces are light and reflective
- AI glow is barely perceptible — a 15% luminescence

### Dark Theme

- Ambient light is dimmer but consistent direction
- Shadows use higher opacity (0.10–0.40) to maintain depth perception
- Surfaces are dark and absorbent
- AI glow is more visible — a 30-40% luminescence that provides accent

---

## Light Source Rules

1. **Never change light direction.** All shadows fall to the bottom-right consistently.
2. **Never use multiple conflicting light sources.** Multiple light directions create visual confusion.
3. **AI glow is additive to ambient light,** not a replacement.
4. **Glass surfaces reflect ambient light** through their blur — no additional light treatment needed.
5. **Hover and focus states use the same light model** — elevation increases shadows, not light direction.
6. **Future themes must preserve the same light source** — only intensity and color temperature may change.

---

*This Light Sources specification is permanent. All shadow, glow, and illumination decisions derive from this model. Refer to [Shadow-System.md](../../02-Design-Language/Shadow-System.md) for shadow implementation, [Elevation-System.md](../../02-Design-Language/Elevation-System.md) for layer depth, and [Surface-Lighting.md](Surface-Lighting.md) for surface-specific lighting rules.*
