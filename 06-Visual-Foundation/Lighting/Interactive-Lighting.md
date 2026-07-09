# Interactive Lighting

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Interaction-Language.md](../../02-Design-Language/Interaction-Language.md), [Shadow-System.md](../../02-Design-Language/Shadow-System.md))

---

## Definition

Interactive Lighting defines how controls communicate their state through light. Every interactive element has four distinct lighting states: default, hover, active/pressed, and disabled.

---

## Control Light States

### Buttons

| State | Light Response | Shadow | Background |
|-------|---------------|--------|------------|
| Default | Surface at rest elevation | Shadow-1 (elevation 1) | Token color |
| Hover | Surface rises | Shadow-2 (elevation 2) | 1 step lighter/darker |
| Active/Pressed | Surface sinks | Shadow inset | 2 steps darker |
| Disabled | Surface diminished | None | 40% opacity |
| Focus | Ring glow | Current elevation ring | Current background |

### Input Fields

| State | Light Response | Border | Background |
|-------|---------------|--------|------------|
| Default | Surface flat | Neutral-300 | Surface-1 |
| Hover | Subtle surface brighten | Neutral-400 | Surface-1 |
| Focus | Ring glow | Primary-500 | Surface-1 |
| Active/typing | Same as focus | Primary-500 | Surface-1 |
| Error | Red glow | Danger-500 | Danger-BG |
| Disabled | Diminished | Neutral-200 | Neutral-100 |
| Read-only | Flat, no interaction | Neutral-200 | Neutral-50 |

### Toggle / Switch

| State | Light Response | Track | Thumb |
|-------|---------------|-------|-------|
| Off | Dim track, rest thumb | Neutral-300 | White |
| On | Lit track, slide thumb | Primary-500 | White |
| Hover | Slight brighten | +5% brightness | Slight shadow |
| Focus | Ring around toggle | Current state | Current state |
| Disabled | Dimmed | 40% opacity | 40% opacity |

### Dropdown / Select

| State | Light Response | Border | Background |
|-------|---------------|--------|------------|
| Default | Flat surface | Neutral-300 | Surface-1 |
| Hover | Surface brighten | Neutral-400 | Surface-1 |
| Focus | Ring glow | Primary-500 | Surface-1 |
| Open | Elevated menu | Primary-500 | Surface-1 |
| Disabled | Diminished | Neutral-200 | Neutral-100 |

---

## State Transition Lighting

| Transition | Light Change | Duration |
|-----------|-------------|----------|
| Default → Hover | Surface brighten 2-5% | 100ms easy-out |
| Hover → Active | Sink (inset shadow) | 50ms instant |
| Active → Default | Rise to rest | 100ms ease-out |
| Default → Disabled | Opacity reduction | 100ms ease-out |
| Disabled → Default | Opacity restoration | 100ms ease-out |
| Default → Focus | Ring appears | 100ms ease-out |
| Focus → Default | Ring disappears | 100ms ease-out |

---

## Interactive Lighting Rules

1. **Every interactive element has all 5 states designed.** No missing states.
2. **Active/pressed state always uses inset shadow** to simulate the element sinking into the page.
3. **Disabled state uses 40% opacity** across all interactive elements (consistent with Color System).
4. **Focus ring appears on keyboard focus only**, not on click/tap.
5. **Hover and focus can coexist** — ring + surface light change both visible.
6. **Touch devices show active state on tap** (momentary), never hover.
7. **Disabled state explains why** — tooltip or adjacent label indicates reason for disabled.

---

## Non-Interactive Elements

Non-interactive elements (static text, decorative icons, labels) have no lighting states — they remain in their default appearance at all times. This visual silence helps users distinguish interactive from non-interactive content.

---

*This Interactive Lighting specification is permanent. Every control component implements these lighting states. Refer to [Hover-Lighting.md](Hover-Lighting.md) for hover behavior, [Focus-Lighting.md](Focus-Lighting.md) for focus behavior, and [Shadow-System.md](../../02-Design-Language/Shadow-System.md) for shadow values.*
