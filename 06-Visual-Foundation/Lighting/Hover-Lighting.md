# Hover Lighting

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Interaction-Language.md](../../02-Design-Language/Interaction-Language.md), [Shadow-System.md](../../02-Design-Language/Shadow-System.md))

---

## Definition

Hover lighting defines how elements respond when the user's pointer is over them. This is the most frequent interactive lighting change in MR:EGO and must feel consistent and intentional across all surfaces.

---

## Hover Light Response by Element

### Cards

| Property | Change | Duration | Easing |
|----------|--------|----------|--------|
| Elevation | Layer 1 → Layer 2 | 200ms | Ease-Out |
| Shadow | Shadow-1 → Shadow-2 | 200ms | Ease-Out |
| Background | Surface → Surface + Primary tint (2%) | 200ms | Ease-Out |
| Scale | None (cards do not scale on hover) | — | — |

Cards lift slightly toward the light source, casting a broader shadow.

### Buttons

| Property | Change | Duration | Easing |
|----------|--------|----------|--------|
| Background | Shift one step in value scale | 100ms | Ease-Out |
| Shadow | Shadow-1 → Shadow-2 | 100ms | Ease-Out |
| Scale | None (buttons do not scale on hover, only on press) | — | — |
| Cursor | default → pointer | Instant | — |

Buttons darken slightly (light mode) or lighten slightly (dark mode) as they rise.

### Links

| Property | Change | Duration | Easing |
|----------|--------|----------|--------|
| Color | Neutral → Primary | 100ms | Ease-Out |
| Underline | None → Present | 100ms | Ease-Out |
| Background | None | — | — |

Links change color and gain an underline. No background change — links are inline and should not have hit-area background shifts.

### Icon Buttons

| Property | Change | Duration | Easing |
|----------|--------|----------|--------|
| Background | Transparent → Neutral-200 (light) / Neutral-300 (dark) | 100ms | Ease-Out |
| Icon color | Neutral → Primary | 100ms | Ease-Out |
| Scale | None | — | — |

Icon buttons reveal a subtle circular background behind the icon.

### Table Rows

| Property | Change | Duration | Easing |
|----------|--------|----------|--------|
| Background | Transparent → Neutral-100 (light) / Neutral-200 (dark) | 100ms | Ease-Out |
| Shadow | None | — | — |
| Scale | None | — | — |

Table rows get a subtle background tint. No elevation change — rows are part of a grid, not individual surfaces.

### List Items

| Property | Change | Duration | Easing |
|----------|--------|----------|--------|
| Background | Transparent → Neutral-100 (light) / Neutral-200 (dark) | 100ms | Ease-Out |
| Left border | Transparent → Primary-500 (light) / Primary-400 (dark) | 100ms | Ease-Out |

Selected list items gain a left-border accent to indicate their active state.

---

## Hover Lighting Rules

1. **Every interactive element has a defined hover state.** No exceptions.
2. **Hover changes are subtle.** The user should perceive the change without it demanding attention.
3. **Hover never reveals hidden controls** that are not also accessible via focus or click.
4. **Touch devices never show hover states.** Hover is pointer-only.
5. **Hover transitions respect reduced-motion preferences** — 50ms instant when reduced motion is enabled.
6. **Hover does not block interaction.** Users can click during hover animation.
7. **Groups of interactive elements use identical hover patterns** for consistency.

---

## Hover Light Intensity Scale

| Intensity | Brightness Change | Elements |
|-----------|------------------|----------|
| None | 0% | Non-interactive text, static content |
| Subtle | 2-3% shift | Table rows, list items, input backgrounds |
| Medium | 5-8% shift | Cards, dropdown items, icon buttons |
| Noticeable | 10-15% shift | Primary buttons, confirmation actions |
| Highlight | Primary color applied | Links, selected items, active filters |

---

*This Hover Lighting specification is permanent. Every interactive element in MR:EGO must implement appropriate hover lighting. Refer to [Surface-Lighting.md](Surface-Lighting.md) for surface light response, [Focus-Lighting.md](Focus-Lighting.md) for focus state lighting, and [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md) for interaction response patterns.*
