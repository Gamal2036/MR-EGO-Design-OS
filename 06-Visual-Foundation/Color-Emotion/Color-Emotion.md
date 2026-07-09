# Color Emotion

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md))

---

## Definition

Color Emotion defines the emotional response each color in the MR:EGO palette should evoke. Color is functional first, but every color choice also produces an emotional effect. Understanding these effects ensures colors are used appropriately.

---

## Primary Color Emotion

### Blue (#2563EB / #3B82F6)

| Emotional Effect | Description |
|-----------------|-------------|
| Trust | The primary emotion. Blue is universally associated with reliability. |
| Stability | A steady, grounded presence. Blue does not feel volatile. |
| Intelligence | Blue suggests analytical thinking and data-driven decisions. |
| Calm authority | Confident without aggression. Blue leads rather than demands. |
| Professionalism | The default color for enterprise and professional tools. |

Blue is used sparingly (≤10% of any screen) to preserve its emotional impact. Overuse dilutes trust into ubiquity.

### Primary Color Emotion by Shade

| Shade | Emotion | Best For |
|-------|---------|----------|
| Primary-50 | Fresh, airy optimism | Background tints, spacious areas |
| Primary-100 | Gentle awakening | Hover backgrounds, subtle fills |
| Primary-300 | Comfortable confidence | Accents, muted active states |
| Primary-500 (light) / Primary-600 (dark) | Decisive action | Primary buttons, key links |
| Primary-700 | Solid commitment | Active states, pressed feedback |
| Primary-900 | Deep conviction | Text on dark backgrounds |

---

## Secondary Color Emotion

### Green — Success (#10B981 / #34D399)

| Emotional Effect | Description |
|-----------------|-------------|
| Achievement | Task completion, goal reached |
| Safety | Data saved, action confirmed |
| Growth | Progress, forward momentum |
| Reassurance | Everything is working correctly |

Green is reserved for success states only. Using green for decoration dilutes its achievement signal.

### Amber — Warning (#F59E0B / #FBBF24)

| Emotional Effect | Description |
|-----------------|-------------|
| Caution | Pay attention, proceed carefully |
| Opportunity | A chance to prevent an issue |
| Readiness | System is alert but not alarmed |

Amber signals attention without urgency. It is warm, not panicked.

### Red — Danger (#EF4444 / #F87171)

| Emotional Effect | Description |
|-----------------|-------------|
| Urgency | Immediate attention required |
| Finality | Irreversible or destructive action |
| Alert | Something went wrong |
| Stop | Do not proceed without review |

Red is the most emotionally intense color in the palette. It is used rarely and only for destructive actions or errors.

---

## Neutral Color Emotion

| Neutral | Emotion | Best For |
|---------|---------|----------|
| Neutral-50 | Clean slate, openness | Page backgrounds |
| Neutral-100 | Prepared surface | Cards, panels |
| Neutral-200 | Slightly raised | Elevated surfaces |
| Neutral-300 | Gentle boundary | Borders, dividers |
| Neutral-400 | Quiet whisper | Disabled text, subtle hints |
| Neutral-500 | Gentle guidance | Placeholder text |
| Neutral-600 | Supporting voice | Secondary text |
| Neutral-700 | Confident statement | Body text |
| Neutral-800 | Bold declaration | Headings |
| Neutral-900 | Maximum authority | Primary headings, titles |

Neutrals dominate MR:EGO (~80% of any screen). Their emotional effect is primarily about hierarchy and readability — not about injecting feeling. A well-structured neutral palette is emotionally calming because it reduces cognitive load.

---

## AI Color Emotion

AI elements use the Primary color palette with additional glow treatment. The emotional effect of AI-colored elements:

| AI State | Emotion | Color Treatment |
|----------|---------|----------------|
| Thinking | Curiosity, processing | Primary glow, gentle pulse |
| Responding | Clarity, helpfulness | Primary accent, solid |
| Suggesting | Deference, optionality | Diminished primary, subtle |
| Confident | Assurance, reliability | Full primary, solid badge |
| Uncertain | Honesty, transparency | Reduced opacity primary |

---

## Emotional Color Rules

1. **Primary blue is the only "active" emotional color.** Users associate blue with action and trust.
2. **Semantic colors (green, amber, red) are reserved for their states.** Never use them decoratively.
3. **Neutrals carry no positive or negative emotion.** They provide structure and calm.
4. **Emotional intensity increases with saturation.** Desaturated colors are calmer.
5. **Dark mode reduces emotional intensity** — all colors appear more subdued.
6. **Color emotion must be validated with actual users.** What blue means in one culture may differ in another.

---

*This Color Emotion specification is permanent. Every color decision considers the emotional effect before the visual one. Refer to [Color-System.md](../../02-Design-Language/Color-System.md) for color values, [Primary-Emotion.md](Primary-Emotion.md) for primary color emotion, and [Trust-Colors.md](Trust-Colors.md) for trust-specific color usage.*
