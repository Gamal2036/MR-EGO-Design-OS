# AI Visual Language

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Product-Constitution.md](../../01-Constitution/Product-Constitution.md), [UX-Constitution.md](../../01-Constitution/UX-Constitution.md))

---

## Philosophy

AI in MR:EGO is visually distinct but not visually dominant. The AI visual language communicates intelligence, deference, and transparency — the AI is present, helpful, and clearly identifiable, but never commands attention away from the user's work.

---

## Core AI Visual Principles

1. **AI is identifiable at a glance.** Users should immediately recognize AI-generated content, suggestions, and components.
2. **AI never mimics human content.** AI outputs are visually distinct from user-generated content.
3. **AI is deferential in visual weight.** Suggestions appear beside content, not over it.
4. **AI is transparent in its operation.** Thinking indicators, confidence levels, and processing states are always visible.
5. **AI uses consistent visual language.** All AI features use the same patterns.

---

## AI Components Visual Specification

### Thinking State

| Property | Value |
|----------|-------|
| Visual | Three dots or single pulse dot |
| Pulse | Opacity 15% → 25% → 15% (light) / 30% → 45% → 30% (dark) |
| Duration | 2000ms loop |
| Dot size | 6-8px diameter |
| Gap between dots | 4px |
| Color | Primary-400 (light) / Primary-300 (dark) |
| Label | "Thinking..." (screen reader), optional visible label |
| Placement | Inline beside AI content, or in AI component header |

### Streaming State

| Property | Value |
|----------|-------|
| Visual | Text appears word by word |
| Max reveal rate | 30 words per second |
| Cursor | Blinking vertical bar at insertion point (primary color) |
| Duration | Controlled by AI response speed |
| Background | Standard surface with left accent bar (3px Primary-400) |
| Completion | Cursor disappears, accent bar remains |

### Reasoning Display

| Property | Value |
|----------|-------|
| Trigger | User requests explanation or AI shows reasoning |
| Visual | Expandable section below AI response |
| Header | "Why MR:EGO suggests this" with expand chevron |
| Content | Bulleted reasoning steps, sources cited |
| Animation | Expand/collapse (200ms ease-out) |
| Default state | Collapsed (users can expand if interested) |
| Badge | "AI" badge in reasoning header |

### Confidence Indicator

| Property | High | Medium | Low |
|----------|------|--------|-----|
| Visual | Solid primary fill | Dimmed primary fill | Outline only |
| Opacity | 100% | 60% | 30% |
| Icon | Checkmark | Dash | Question mark |
| Label | "High confidence" | "Medium confidence" | "Low confidence" |
| Color | Primary-500 | Primary-300 | Primary-300 |
| Placement | Beside AI suggestion or recommendation |
| Interactive | Hover for explanation |

### Suggestion Card

| Property | Value |
|----------|-------|
| Visual | Standard card + left accent bar (3px Primary-400) |
| Badge | Small "AI Suggestion" badge top-right |
| Background | Surface-1 + 2% primary tint |
| Content | Suggestion text, action button, dismiss option |
| Shadow | Standard card shadow (Layer 1) |
| Hover | Standard card hover (Layer 2) |

### Recommendation List

| Property | Value |
|----------|-------|
| Visual | Numbered list with AI accent |
| Each item | Confidence dot + recommendation text + action |
| Confidence dot | Color fill indicates AI certainty |
| Action | "Apply", "Learn more", "Dismiss" |
| Source citation | Small text below each item ("Based on your profile") |

### Agent State Indicator

| State | Visual | Description |
|-------|--------|-------------|
| Idle | No indicator, or subtle AI icon | AI is available but not active |
| Listening | Subtle glow (5% opacity) | AI is processing context |
| Thinking | Pulse animation (15-25%) | AI is generating response |
| Responding | Active glow (15% light / 30% dark) | AI is displaying output |
| Error | Dimmed indicator + error text | AI encountered an issue |
| Offline | Gray badge "AI Offline" | AI services unavailable |

### Memory Indicator

| Property | Value |
|----------|-------|
| Trigger | AI references user data or history |
| Visual | Small "Memory" chip with subtle icon |
| Content | "Based on your recent activity in Career" |
| Placement | Above or beside AI suggestion |
| Hover | Full detail in tooltip |
| Click | Opens memory management |

### AI Badge

| Property | Value |
|----------|-------|
| Size | 16-20px height |
| Text | "AI" or "AI Suggestion" |
| Background | Primary-100 (light) / Primary-800 (dark) |
| Text color | Primary-700 (light) / Primary-200 (dark) |
| Border | Primary-200 (light) / Primary-700 (dark) |
| Border-radius | 4px |
| Icon | Optional small sparkle icon before text |
| Placement | Top-right or top-left of AI component |

---

## AI Visual Language Rules

1. **All AI components include an AI badge** — users must always know when they are interacting with AI.
2. **AI components use Primary color accents** (left bar, badge, glow) — consistent recognition.
3. **AI content is distinguishable from user content** without relying on color alone (accent bar, icon, badge, label).
4. **AI suggestions are always dismissible** — close button or swipe-to-dismiss.
5. **AI thinking states communicate progress** — users should never wonder if the AI is working.
6. **AI confidence is always shown for recommendations** — never present AI suggestions as certain when they are not.
7. **AI errors are graceful** — "I could not process this request" not "Error 503."
8. **AI never appears to be human** — no human avatars, no human-like names, no anthropomorphism.

---

## AI Visual Anti-Patterns

| Anti-Pattern | Why |
|-------------|-----|
| Human avatar for AI | Misleading, anthropomorphism |
| Green/teal AI accent | Alternative to Primary — inconsistent |
| AI-only dark theme | AI works in both themes |
| Unlabeled AI content | Breaks transparency principle |
| Permanent AI panel | AI is contextual, not constant |
| AI content that looks like user content | Confusing, erodes trust |
| Over-animated AI indicators | Distracting, reduces calm |

---

*This AI Visual Language is permanent. All AI components and interactions follow these specifications. Refer to [AI-Lighting.md](../Lighting/AI-Lighting.md) for AI lighting, [AI-Colors.md](../Color-Emotion/AI-Colors.md) for AI color emotion, and [Product-Constitution.md](../../01-Constitution/Product-Constitution.md) for AI integration rules.*
