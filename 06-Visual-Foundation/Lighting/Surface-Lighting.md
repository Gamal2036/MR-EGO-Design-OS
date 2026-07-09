# Surface Lighting

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Shadow-System.md](../../02-Design-Language/Shadow-System.md), [Color-System.md](../../02-Design-Language/Color-System.md))

---

## Definition

Surface lighting defines how each material type in MR:EGO responds to the ambient light model. Different surfaces catch light differently, and this response communicates their material nature.

---

## Surface Types and Light Response

### Solid Surfaces (Cards, Panels, Sidebars)

| Property | Light Response |
|----------|---------------|
| Base | Flat, even illumination from top-left source |
| Edge | No edge highlight — solid surfaces are matte |
| Shadow | Drops to bottom-right, opacity based on elevation layer |
| Hover | Surface catches more light (elevation increase), shadow grows |

Solid surfaces are matte. They absorb most light and reflect diffusely. This creates a professional, non-reflective appearance suitable for content-heavy surfaces.

### Glass Surfaces (Nav Bars, Modals, Sheets)

| Property | Light Response |
|----------|---------------|
| Base | Semi-transparent with backdrop blur |
| Edge | Subtle border gleam (1px semi-transparent white) |
| Reflection | Internal light scatter through blur — no specular highlight |
| Shadow | Glass surfaces cast no shadow (glass is its own depth effect) |

Glass surfaces simulate a frosted material — light passes through and scatters internally, creating a soft glow rather than a reflective shine.

### Elevated Surfaces (Dropdowns, Tooltips, Modals)

| Property | Light Response |
|----------|---------------|
| Base | Same as solid surface, higher elevation |
| Edge | No edge highlight |
| Shadow | Longer, more diffuse shadow with higher opacity |
| Hover | No hover state (elevated surfaces are temporary) |

Elevated surfaces are solid materials floating above the page. They catch light like any solid surface, but their increased distance from the page creates longer shadows.

### Interactive Surfaces (Buttons, Inputs, Controls)

| Property | Light Response |
|----------|---------------|
| Default | Slightly raised from background (elevation 1) |
| Hover | Raise further (elevation 2) — catches more light |
| Active/Pressed | Sink into page (inset shadow) — catches less light |
| Focus | Glow ring — light blooms around the element |

Interactive surfaces respond dynamically to user action. Pressing a button pushes it away from the light source, creating an inset shadow.

---

## Surface Lighting Values

| Surface | Light Level | Shadow Opacity | Edge Treatment |
|---------|-------------|----------------|----------------|
| Page background | 100% | None | None |
| Card (default) | 95% | 0.05 | None |
| Card (hover) | 90% | 0.07 | None |
| Sidebar | 85% | None | Right-edge 1px border |
| Dropdown | 90% | 0.10 | None |
| Modal | 90% | 0.14 | None |
| Tooltip | 90% | 0.14 | None |
| Glass | 72% opacity | None | 1px semi-transparent border |
| Button (default) | 95% | 0.03 | Focus ring offset |
| Input (default) | 100% | Inset 0.03 | 1px border |

---

## Surface Lighting Rules

1. **Matte finish for all solid surfaces.** No gloss, no shine, no specular reflection.
2. **Glass surfaces never cast shadows.** The blur effect provides sufficient depth.
3. **Edge highlights are reserved for glass only.** Solid surfaces use borders, not highlights.
4. **Light response changes with elevation.** Higher surfaces catch less ambient light and cast longer shadows.
5. **Surface lighting is consistent across themes** — only shadow opacity and base colors change.
6. **No surface should appear self-illuminated** except dedicated AI components.

---

*This Surface Lighting specification is permanent. Every surface type in MR:EGO follows these lighting rules. Refer to [Light-Sources.md](Light-Sources.md) for the ambient light model, [Shadow-System.md](../../02-Design-Language/Shadow-System.md) for shadow values, and [Card-Lighting.md](Card-Lighting.md) for card-specific lighting.*
