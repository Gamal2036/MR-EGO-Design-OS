# Card Lighting

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Shadow-System.md](../../02-Design-Language/Shadow-System.md), [Elevation-System.md](../../02-Design-Language/Elevation-System.md))

---

## Definition

Card lighting defines how cards — MR:EGO's primary content containers — interact with the light model. Cards are the most common surface in the platform, and their lighting treatment sets the visual baseline.

---

## Card Light States

### Default Resting State

| Property | Light Mode | Dark Mode |
|----------|-----------|-----------|
| Illumination | 95% ambient catch | 85% ambient catch |
| Shadow | Shadow-1 (0.05 opacity) | Shadow-1 dark (0.15 opacity) |
| Background | Surface-1 (pure white light, #1E293B dark) | Surface-1 |
| Edge | No edge light | No edge light |
| Material | Solid matte | Solid matte |

The card sits at elevation 1 — slightly raised from the page but firmly grounded. It catches most ambient light and casts a gentle shadow down-right.

### Hover State

| Property | Light Mode | Dark Mode |
|----------|-----------|-----------|
| Illumination | 90% ambient catch (slightly shadowed as it rises) | 80% ambient catch |
| Shadow | Shadow-2 (0.07 opacity) | Shadow-2 dark (0.20 opacity) |
| Background | Surface-1 + primary tint (2% saturation) | Surface-1 + primary tint (2% saturation) |
| Transition | 200ms ease-out | 200ms ease-out |

On hover, the card rises to elevation 2. It moves slightly away from the light source, so it catches marginally less ambient light. The shadow spreads and softens. A subtle primary tint suggests interactivity.

### Active / Selected State

| Property | Light Mode | Dark Mode |
|----------|-----------|-----------|
| Illumination | 92% ambient catch | 82% ambient catch |
| Shadow | Shadow-1 (same as default — card returns to rest) | Shadow-1 dark |
| Background | Surface-1 + primary tint (5% saturation) | Surface-1 + primary tint (5% saturation) |
| Border | Primary-500 (2px) | Primary-400 (2px) |

Selected cards return to elevation 1 but gain a primary border or background tint to indicate their active state without relying solely on elevation.

### Disabled State

| Property | Light Mode | Dark Mode |
|----------|-----------|-----------|
| Illumination | 95% (same as default) | 85% |
| Shadow | Shadow-1 at 40% opacity | Shadow-1 dark at 40% opacity |
| Background | Surface-1 at 40% opacity | Surface-1 at 40% opacity |
| Content | Text at 40% opacity | Text at 40% opacity |

Disabled cards maintain the same elevation but at reduced opacity. The card still exists in the light model but is visibly diminished.

---

## Card Lighting Rules

1. **Cards occupy exactly one elevation layer** at any time (Layer 1 default, Layer 2 on hover).
2. **Card shadows always fall to the bottom-right** following the primary light source.
3. **Cards never use inset shadows** (reserved for pressed interactive states).
4. **Card hover shadow transitions are smooth** — 200ms ease-out on shadow properties.
5. **Card background never contains a gradient** (flat color only).
6. **Cards in a group use identical lighting** — no variation within the same group.
7. **Dashboard cards may have slightly higher default elevation** (Layer 1.5) to distinguish from content cards.

---

## Card Lighting by Type

| Card Type | Default Elevation | Hover Elevation | Special Treatment |
|-----------|------------------|-----------------|-------------------|
| Content Card | Layer 1 | Layer 2 | Standard shadow |
| Dashboard Metric Card | Layer 1 | Layer 2 | Slightly larger shadow |
| AI Insight Card | Layer 1 | Layer 2 | Subtle AI glow underlay |
| Stat Card | Layer 1 | Layer 2 | No hover elevation change (read-only) |
| File Card | Layer 1 | Layer 2 | Thumbnail preview retains flat lighting |
| Interactive Card | Layer 1 | Layer 2 | Primary tint on hover |

---

*This Card Lighting specification is permanent. All card components derive their lighting behavior from this specification. Refer to [Surface-Lighting.md](Surface-Lighting.md) for general surface lighting, [Hover-Lighting.md](Hover-Lighting.md) for hover light behavior, and [Shadow-System.md](../../02-Design-Language/Shadow-System.md) for exact shadow values.*
