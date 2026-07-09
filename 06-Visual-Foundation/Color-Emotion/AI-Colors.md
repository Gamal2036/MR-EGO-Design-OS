# AI Colors

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Product-Constitution.md](../../01-Constitution/Product-Constitution.md) — AI Integration Rules)

---

## Definition

AI Colors define the emotional color language for artificial intelligence elements. AI in MR:EGO uses the Primary blue palette — not a separate color. This communicates that AI is an integrated capability, not a separate product.

---

## AI Color Palette

| Role | Color | Token | Emotion |
|------|-------|-------|---------|
| AI primary identity | Primary-500 / Primary-400 | Primary accent | Intelligence, capability |
| AI glow (light) | Primary-400 | AI-Glow-Light | Curiosity, processing |
| AI glow (dark) | Primary-300 | AI-Glow-Dark | Luminous intelligence |
| AI confidence high | Primary-500 | Primary solid | Assurance, reliability |
| AI confidence medium | Primary-300 at 60% | Primary muted | Thoughtful consideration |
| AI confidence low | Primary-300 at 30% | Primary dimmed | Honest uncertainty |
| AI thinking pulse | Primary-400 gradient | AI-Pulse | Active processing |
| AI background tint | Primary-50 (light) / Primary-900 (dark) | AI-Surface | Subtle AI association |

---

## AI Color Emotional Rules

1. **AI uses Primary blue exclusively.** No custom colors, no gradients, no rainbows.
2. **AI confidence is communicated through color opacity and fill percentage.** High = full fill. Low = dimmed.
3. **AI glow is always Primary-based.** Glow is additive (screen blend mode), not a separate color.
4. **AI surfaces use a subtle Primary tint** to distinguish from standard surfaces without color change.
5. **AI text is standard Neutral color** — AI color is for badges, glows, and accents, not body text.

---

## AI Color Anti-Patterns

| Anti-Pattern | Why |
|-------------|-----|
| Green AI | Suggests AI is "alive" — misleading |
| Purple AI | Associates AI with creativity, not analytical capability |
| Red AI warning color for AI | Red is for danger, not AI processing |
| Rainbow/colorful AI | Inconsistent with restrained palette |
| Different AI colors per feature | Confusing — all AI should look like AI |

---

## AI Color Accessibility

| Requirement | Specification |
|-------------|---------------|
| AI glow contrast | AI glow is decorative — no text on glow |
| AI badge text contrast | Standard WCAG AA 4.5:1 against badge background |
| AI confidence indicator | Color + icon + text label (never color alone) |
| AI thinking indicator | Color + motion (pulse) — visible without relying on color |
| AI surface tint | Tint is ≤5% opacity — does not affect contrast |

---

*These AI Colors are permanent. All AI components use this color language. Refer to [Color-Emotion.md](Color-Emotion.md) for the complete emotion system, [AI-Lighting.md](../Lighting/AI-Lighting.md) for AI glow specifications, and [AI-Language](../../06-Visual-Foundation/AI-Language/) for the complete AI visual language.*
