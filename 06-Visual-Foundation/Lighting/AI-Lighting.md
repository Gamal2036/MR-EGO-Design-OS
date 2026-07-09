# AI Lighting

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Product-Constitution.md](../../01-Constitution/Product-Constitution.md) — AI Integration Rules)

---

## Definition

AI Lighting defines the unique visual treatment for artificial intelligence components. AI elements in MR:EGO are visually distinct from standard UI — they glow with a subtle, intelligent luminescence that communicates their special nature without demanding attention.

---

## AI Glow Model

AI components emit a soft, contained glow from within. This is the only case of self-illumination in the MR:EGO visual language.

```
    ✦  ✦  ✦
   ┌──────────┐
   │  AI       │  ← Internal glow radiates outward, fading at edges
   │  Element  │
   └──────────┘
    ✦  ✦  ✦
```

---

## AI Glow Specification

| Property | Light Mode | Dark Mode |
|----------|-----------|-----------|
| Color | Primary-400 (60A5FA) | Primary-300 (93C5FD) |
| Spread | 0px (contained within element) | 0px |
| Intensity | 15% opacity | 30% opacity |
| Shape | Follows element border-radius | Same |
| Animation | None (static glow) | None (static glow) |
| Blend mode | Screen | Screen |

---

## AI Lighting by Component

### AI Thinking Indicator

| Property | Value |
|----------|-------|
| Glow | Pulsing radial gradient (center-out) |
| Pulse duration | 2000ms loop |
| Pulse intensity | 15% → 25% → 15% (light) / 30% → 45% → 30% (dark) |
| Shape | Circular dot or pill |
| Size | 8-12px diameter |

The thinking indicator pulses gently like a quiet heartbeat — present but not urgent.

### AI Streaming Message

| Property | Value |
|----------|-------|
| Glow | Subtle left-edge accent glow |
| Intensity | 10% (light) / 20% (dark) |
| Animation | None (accent is static) |
| Duration of stream | Client-controlled word-by-word appearance |
| Background | Surface-1 + primary tint (2%) |

Streaming messages grow word by word with a subtle left-edge accent indicating AI origin.

### AI Confidence Badge

| Property | High Confidence | Medium Confidence | Low Confidence |
|----------|----------------|-------------------|----------------|
| Glow color | Primary-400 | Primary-400 | Primary-400 |
| Glow intensity | 20% | 10% | 5% |
| Badge fill | Solid primary | Solid primary at 60% | Solid primary at 30% |
| Icon | Checkmark | Dash | Question mark |

Confidence badges use glow intensity and fill opacity to communicate certainty without requiring the user to read a number.

### AI Suggestion Card

| Property | Value |
|----------|-------|
| Left accent | 3px Primary-400 bar |
| Glow underlay | 10% opacity primary radial gradient |
| Background | Surface-1 |
| Border | Standard card border (Neutral-300) |
| Distinctive marker | Small AI badge in top-right |

AI suggestion cards look like standard cards with a distinctive left accent and badge — visually integrated but clearly marked.

### AI Region Background (Chat / Reasoning Panel)

| Property | Value |
|----------|-------|
| Base | Surface-1 (same as all panels) |
| Ambient glow | 5% primary wash at top of panel (gradient fade to 0%) |
| Header | Glass treatment with primary tint |
| Distinction | Panel borders are standard — no special treatment |

The AI region does not look radically different from other panels. The distinction comes from content and a subtle ambient glow at the top, not from aggressive visual theming.

---

## AI Lighting Rules

1. **AI glow is always subtle.** Never more than 30% opacity in any theme.
2. **AI glow never animates continuously** except for the Thinking indicator (which uses a gentle pulse).
3. **AI glow is contained within the element's bounds.** No external light bleed.
4. **AI elements must always be visibly distinct from standard UI** even without glow (use badges, labels, or accent bars).
5. **AI glow respects reduced-motion** — static only, no pulsing.
6. **AI lighting never obscures content.** Text and controls remain fully readable.
7. **AI glow does not create contrast issues.** All AI elements meet WCAG AA contrast requirements.
8. **AI glow color is always Primary.** Never use custom colors per AI feature.

---

## AI Lighting Anti-Patterns

| Anti-Pattern | Why |
|-------------|-----|
| Bright neon glow | Looks gimmicky, undermines professional tone |
| Rainbow/multicolor AI | Inconsistent with restrained palette |
| Pulsing or flashing any non-thinking element | Distracting, anxiety-inducing |
| Full-screen AI backgrounds | Overwhelming, reduces content legibility |
| AI glow on hover only | Users need to identify AI before interacting |
| Different glow colors per AI type | Confusing — all AI uses Primary |

---

*This AI Lighting specification is permanent. All AI components in MR:EGO use this lighting model. Refer to [Light-Sources.md](Light-Sources.md) for the ambient light model, [AI-Language](../../06-Visual-Foundation/AI-Language/) for AI-specific visual language, and [Interactive-Lighting.md](Interactive-Lighting.md) for interactive state lighting.*
