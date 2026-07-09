# Iconography (Visual Foundation)

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Iconography.md](../../02-Design-Language/Iconography.md))

---

## Definition

The Visual Foundation Iconography document defines the visual emotion and personality of icons — beyond the technical specifications in DP-1. Icons in MR:EGO are precise, consistent, and purposeful.

---

## Icon Personality

MR:EGO icons are:

**Simple.** One concept per icon. No unnecessary details.

**Clear.** Instantly recognizable at 16px. No ambiguity.

**Consistent.** Same stroke, same weight, same style, same corner radius.

**Restrained.** Outline style only. Filled only for active states.

**Professional.** No whimsical or playful icon shapes.

---

## Emotional Quality by Category

### Navigation Icons

| Quality | Description |
|---------|-------------|
| Grounding | Help users orient themselves |
| Consistency | Same icon = same concept everywhere |
| Clarity | No ambiguous navigation symbols |

### Action Icons

| Quality | Description |
|---------|-------------|
| Clarity | Icon clearly communicates the action |
| Urgency | Delete (red) vs Edit (neutral) vs Add (primary) |
| Feedback | Action icons change to success state on completion |

### Status Icons

| Quality | Description |
|---------|-------------|
| Certainty | Checkmark (clear completion) |
| Caution | Warning triangle (attention needed) |
| Error | Circle with X (stop) |
| Information | Circle with i (help available) |

### Object Icons

| Quality | Description |
|---------|-------------|
| Recognition | Icon matches real-world object metaphor |
| Simplicity | Minimal detail — just enough to identify |
| Consistency | All objects drawn with same level of detail |

---

## Icon Emotional Effect by Stroke

| Stroke Width | Emotional Effect | Usage |
|-------------|-----------------|-------|
| 1.5px | Clean, modern, professional | Default — all interface icons |
| 2px | Bold, confident | Active state icons, filled variants |
| 1px | Delicate, subtle | Decorative icons (rare, avoid) |

---

## Icon Color and Emotion

| Color | Emotional Effect | Usage |
|-------|-----------------|-------|
| CurrentColor (Neutral) | Standard, professional | Default — inherits from text |
| Primary-500 | Active, interactive | Selected state, active navigation |
| Semantic colors | Status communication | Success (green), Warning (amber), Error (red) |
| White | On dark/primary backgrounds | Inverse icons |

---

## Icon Size and Emotional Impact

| Size | Emotional Effect | Best For |
|------|-----------------|----------|
| 16px | Subtle, supporting | Inline with body text, table cells |
| 20px | Default, balanced | Menu items, list items (default) |
| 24px | Confident, noticeable | Primary navigation, empty states |
| 32px | Important, featured | Page headers, feature representation |

---

## Icon Animation

| Type | Allowed? | Specification |
|------|----------|---------------|
| Loading spinner | Yes | Continuous rotation, 1000ms, linear |
| Chevron expand | Yes | 180° rotation, 200ms ease-out |
| Checkmark draw | Yes | Path draw, 300ms ease-out |
| Hover color shift | Yes | 100ms ease-out |
| Pulse/beat | No | Distracting, unprofessional |
| Morph/transform | No | Confusing, unpredictable |
| Bounce | No | Consumer app behavior |
| Fade in/out | Yes | 200ms ease-out |

---

## Icon Consistency Rules

1. **Every icon in the set uses the same grid** (16×16, 20×20, 24×24, 32×32).
2. **Every icon uses 1.5px stroke** (standard) or 2px (active state only).
3. **Every icon uses 2px corner radius** at line ends and intersections.
4. **Every icon has 1px minimum internal padding** from its bounding box.
5. **Every icon is drawn at the target size** — never scaled from a different size.
6. **Every icon includes proper aria labels** or is marked decorative.

---

## Icon Anti-Patterns

| Anti-Pattern | Why |
|-------------|-----|
| Filled icons for non-active states | Too much visual weight |
| Multicolor icons | Inconsistent, unprofessional |
| Custom icons per module | Breaks platform consistency |
| Overly detailed icons | Unrecognizable at 16px |
| Animated icons (non-loading) | Distracting |
| Duotone icons | Trendy, dates quickly |
| Emoji as icons | Platform-inconsistent rendering |

---

*This Iconography (Visual Foundation) specification is permanent. All icons in MR:EGO follow these emotional and visual guidelines. Refer to [Iconography.md](../../02-Design-Language/Iconography.md) for technical specifications, [Color-System.md](../../02-Design-Language/Color-System.md) for icon colors, and [MicroInteractions](../MicroInteractions/MicroInteractions.md) for icon interaction states.*
