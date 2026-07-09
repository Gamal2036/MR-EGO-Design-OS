# Future Color Expansion

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Future-Expansion.md](../../01-Constitution/Future-Expansion.md))

---

## Definition

Future Color Expansion defines how the color emotion system can grow as new modules and features are added.

---

## What Cannot Change

1. **Primary color:** Always Blue (#2563EB / #3B82F6). Permanent.
2. **Semantic colors:** Always Green, Amber, Red. Permanent.
3. **Neutral palette structure:** Always 10-value scale (50–900). Permanent.
4. **Color authority:** DP-1 Color System is the authoritative color specification. DP-5 Color Emotion describes its emotional effect.
5. **Primary color coverage limit:** Never exceeds 15% of any screen.

---

## What Can Expand

| Area | Expansion Possibility | Constraint |
|------|----------------------|------------|
| Module accent colors | Each module can have a secondary accent color | Must still use Primary for primary actions |
| Chart palette | Additional data visualization colors | Must maintain accessibility contrast |
| Theme colors | Additional themes (OLED, High Contrast) | Must maintain color emotion intent |
| Brand colors | Marketing-specific color variations | Not used in product UI |

---

## Module Accent Colors

Future modules may define an accent color for module-specific branding:

| Module | Accent | Usage |
|--------|--------|-------|
| Career | Green tint | Growth, progress |
| Learning | Teal tint | Knowledge, discovery |
| Projects | Indigo tint | Structure, planning |
| CRM | Violet tint | Relationships, connection |
| Documents | Slate tint | Neutral, focus |

Accent colors are used for:
- Module icon backgrounds
- Module-specific badges
- Module header accents
- Module empty state illustrations

Accent colors are NOT used for:
- Primary actions (always Primary blue)
- Interactive elements (always Primary blue)
- Navigation indicators (always Primary blue)

---

## Expansion Rules

1. **New accent colors must pass contrast testing** against both light and dark backgrounds.
2. **Accent colors are muted** — saturation ≤ 70% of pure hue.
3. **Accent colors are never used for semantic meaning.** Green accent in a module does not mean "success."
4. **Accent colors are additive** — existing themes are not modified.
5. **Theme colors (light, dark) remain the primary themes** — accent colors are module-level only.

---

*These Future Color Expansion guidelines are permanent. The color emotion system supports unlimited expansion within these constraints. Refer to [Color-Emotion.md](Color-Emotion.md) for the color emotion foundation, [Future-Expansion.md](../../01-Constitution/Future-Expansion.md) for expansion governance, and [Color-System.md](../../02-Design-Language/Color-System.md) for color values.*
