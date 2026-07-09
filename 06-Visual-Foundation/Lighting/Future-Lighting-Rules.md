# Future Lighting Rules

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Future-Expansion.md](../../01-Constitution/Future-Expansion.md))

---

## Definition

Future Lighting Rules define how the lighting model can evolve without breaking the existing visual language. MR:EGO's lighting model is permanent in its physics but extensible in its application.

---

## What Cannot Change

1. **Primary light source direction:** Always top-left at −45°. This is the permanent lighting physics.
2. **Two-part shadow model:** Ambient + direct light. Always.
3. **Lighting color:** Always pure white (no colored ambient light).
4. **Matte surface treatment:** All solid surfaces are matte. No gloss or specular.
5. **AI glow color:** Always Primary. Never custom.
6. **Focus ring specification:** Always 2px primary with 2px offset.
7. **Glass no-shadow rule:** Glass surfaces never cast shadows.
8. **Lighting behavior per elevation layer:** Defined layers have defined light responses.

---

## What Can Evolve

| Property | Current | Future Possibility | Constraint |
|----------|---------|-------------------|------------|
| AI glow intensity | 15-30% | Up to 50% | Must remain subtle, not aggressive |
| Shadow opacity | 0.03–0.40 | Adjustable per theme | Must maintain depth perception |
| Glass background opacity | 0.72 | 0.60–0.85 range | Must maintain readability |
| Glass blur | 12px | 8–20px range | Performance budget must be met |
| Theme count | 2 (light, dark) | Unlimited | Each theme defines its own lighting parameters |
| AI glow animation | Static + pulse | Subtle wave, shift | Must respect reduced motion |

---

## Lighting Extension Points

### Custom Themes

Future themes (High Contrast, OLED, custom brand) can define:
- Shadow opacity scale (within 0–0.50 range)
- Surface light levels (lighter/darker page, surface progression)
- AI glow intensity (within 0–50% range)
- Glass opacity (within 0.60–0.85 range)
- Glass blur radius (within 8–20px range)

### New Surface Types

Future materials can extend the lighting model provided they:
- Define their light response using the existing primary/fill/glow model
- Maintain the three-tier lighting (ambient, fill, specialized)
- Do not introduce specular/glossy behavior
- Pass the same shadow and contrast rules

### New AI Visual States

Future AI visual expressions can:
- Add new glow patterns (wave, ripple, scan)
- Use secondary color accents at AI glow levels (15% max)
- Animate transitions between AI states
- Introduce AI canvas/workspace ambient glow

---

## Expansion Rules

1. **Every lighting extension must be documented** with before/after comparison.
2. **No extension may reduce readability** or accessibility compliance.
3. **Lighting changes must be theme-optional** — existing themes remain unchanged.
4. **Performance budget:** Lighting effects must not drop below 60fps.
5. **Backward compatibility:** New lighting features degrade gracefully in older themes.
6. **User control:** Users can disable new lighting effects (themes control all lighting).

---

*These Future Lighting Rules are permanent. The lighting model supports unlimited visual expansion while maintaining its core physics and constraints. Refer to [Light-Sources.md](Light-Sources.md) for the light model foundation, [Architecture-Overview.md](../../01-Constitution/Architecture-Overview.md) for phase relationships, and [Future-Expansion.md](../../01-Constitution/Future-Expansion.md) for expansion governance.*
