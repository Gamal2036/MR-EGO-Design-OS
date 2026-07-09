# AI Interactions

**Phase:** DP-8 (Interaction & Motion System)
**Design Authority:** DP-0 ([Product-Constitution.md](../01-Constitution/Product-Constitution.md) — AI Integration Rules), DP-6 ([AI-Experience.md](../06-UX-Architecture/AI-Experience.md))
**Inherits:** AI philosophy, surfaces, suggestion behavior, and states from DP-6

---

## AI Interaction Philosophy

AI in MR:EGO is deferential, transparent, and contextual. It never interrupts. It surfaces when useful. Every AI interaction follows three principles:

1. **AI never interrupts** — AI surfaces when useful, never when distracting
2. **AI is transparent** — Confidence, sources, and reasoning always visible
3. **AI defers to the user** — Every suggestion can be accepted, modified, or dismissed

---

## AI Motion Personality

AI motion is distinct from UI motion. It communicates **thought, processing, and confidence** rather than mechanic state change.

| Trait | Visual Expression | Duration |
|-------|-------------------|----------|
| Thinking | Gentle pulsing indicator | 2000ms loop |
| Analyzing | Subtle data flow animation | Variable |
| Generating | Progressive content reveal | Variable |
| Matching | Score animation | 800ms |
| Learning | Subtle model update icon | 1000ms |
| Explaining | Reasoning panel expand | 300ms |
| Suggesting | Card slide in | 300ms |
| Warning | Gentle color shift | 200ms |
| Confidence | Badge opacity transition | 200ms |

---

## AI Surface Motion

### AI Thinking Indicator

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Idle | Static AI icon | — | — |
| Analyzing start | Icon activates, gentle pulse begins | 300ms | Ease-Out |
| Active thinking | Pulse: scale 1.0→1.05→1.0 + opacity 1→0.6→1 | 2000ms loop | Ease-In-Out |
| Processing complete | Pulse stops, result starts appearing | 300ms | Ease-Out |
| Error | Pulse fades out, error icon appears | 200ms | Ease-In |

### AI Suggestion Card

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Context detected | Subtle glow on trigger element | 200ms | Ease-Out |
| Suggestion appear | Card slides in from below content | 300ms | Ease-Out |
| Confidence badge | Badge fades in | 200ms | Ease-Out |
| User hover | Background tint | 100ms | Ease-Out |
| User hovers CTA | Button activates | 100ms | Ease-Out |
| Accept | Card compresses, element updates | 200ms | Ease-Spring |
| Modify | Card transitions to inline editor | 200ms | Ease-Out |
| Dismiss | Card slides out to right + fades | 200ms | Ease-In |
| Explain | Reasoning panel expands | 300ms | Ease-Out |

### AI Streaming Message

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Start | AI avatar activates | 200ms | Ease-Out |
| Streaming | Words appear character by character | Variable | — |
| Interrupted | Streaming stops, cursor blinks | — | — |
| Complete | Final word, optional sources appear | 300ms | Ease-Out |
| Error | Streaming stops, error indicator | 150ms | — |
| Regenerate | Content fades out, new content streams in | 300ms + stream | — |

### AI Reasoning Panel

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Expand | Panel slides down + content fades in | 300ms | Ease-Out |
| Collapse | Content fades out + panel slides up | 200ms | Ease-In |
| Score bars | Bars fill from 0 to percentage | 600ms | Ease-Out |
| Source list | Items stagger in | 50ms per item | Ease-Out |
| Collapse all | All sections collapse with stagger | 100ms per section | Ease-In |

### AI Match Score

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Load | Score ring/counter fills from 0 | 800ms | Ease-Out |
| Update | Score transitions to new value | 400ms | Ease-Smooth |
| Hover | Breakdown tooltip appears | 200ms | Ease-Out |
| Breakdown expand | Detail sections slide down | 300ms | Ease-Out |
| Category score | Individual bars fill | 100ms stagger | Ease-Out |

### AI Memory Indicator

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Default | Memory icon static | — | — |
| Update | Icon pulses briefly | 600ms | Ease-In-Out |
| Active | Indicator subtly lit | — | — |
| Hover | Tooltip with memory summary | 200ms | Ease-Out |

### AI Confidence Badge

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Appear | Badge fades in | 200ms | Ease-Out |
| Update (increase) | Badge transitions up | 300ms | Ease-Out |
| Update (decrease) | Badge transitions down | 300ms | Ease-Out |
| Hover | Explanation tooltip | 200ms | Ease-Out |

---

## AI Suggestion Lifecycle

```
1. Context detected — Subtle AI icon pulse (background, no disruption)
   ↓
2. Suggestion displayed — Card appears inline beside content (300ms)
   ↓
3. User evaluates — No forced interaction, card is non-blocking
   ↓
4. User action:
   ├── Accept → Card compresses, change applied (200ms, Ease-Spring)
   ├── Modify → Card becomes editable (200ms, Ease-Out)
   └── Dismiss → Card fades and slides right (200ms, Ease-In)
```

---

## AI Deference Motion Rules

| Scenario | Motion Behavior |
|----------|----------------|
| User is actively typing | AI delays suggestion until typing pause (1s) |
| User dismisses suggestion | Suggestion exits with fade, AI records preference |
| User ignores suggestion | Suggestion remains, no repetitive animation |
| User repeatedly dismisses | AI stops suggesting that type, no motion at all |
| User focuses on primary task | AI surfaces reduce opacity, no active animations |
| AI confidence is low | Card is more subdued, badge shows uncertainty |
| AI confidence is high | Card has full opacity, badge shows checkmark |

---

## AI Error Motion

| Error Type | Animation | Duration | Easing |
|-----------|-----------|----------|--------|
| AI unavailable | AI icon fades to "offline" state | 200ms | Ease-Out |
| AI timeout | Thinking pulse stops, message appears | 200ms | Ease-In |
| AI low confidence | Suggestion card dims | 200ms | Ease-Out |
| AI processing error | Error indicator appears in card | 200ms | Ease-Out |
| Safety filter | Message fades in explaining limitation | 200ms | Ease-Out |

---

## AI Workspace Motion

### Conversation

| Event | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Message send (user) | Message slides from bottom | 200ms | Ease-Out |
| AI response start | AI thinking indicator | 200ms | — |
| AI streaming | Words appear progressively | Variable | — |
| New conversation | Previous messages slide up and fade | 300ms | Ease-Out |
| Scroll to bottom | Smooth auto-scroll | 200ms | Ease-Out |
| Resize panel | Content reflows | During drag | — |

### Command Input

| Event | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Focus | Border + ring transition | 100ms | Ease-Out |
| Placeholder change | Cross-fade | 100ms | — |
| Auto-resize | Height adjusts smoothly | 100ms | — |
| Clear | Content fades out | 100ms | Ease-In |

---

## AI Interaction Rules

1. AI suggestions appear maximum 1 per context area at a time
2. AI thinking animation lasts maximum 10 seconds before timeout
3. AI streaming shows content as it arrives — no buffering for display
4. AI confidence below 40% is not displayed
5. AI error states are graceful, never technical
6. Accepting an AI suggestion triggers a confirmation animation
7. Dismissing a suggestion is immediate with a brief exit animation
8. AI never triggers page-level transitions — only inline content changes
9. AI motion is slower and gentler than UI motion to feel thoughtful
10. All AI motion has reduced-motion alternatives

---

*This AI Interactions document defines all AI-specific motion and interaction. Refer to [Micro-Interactions.md](Micro-Interactions.md) for AI component micro-interactions, [Loading-System.md](Loading-System.md) for AI loading patterns, and [Accessibility-Motion.md](Accessibility-Motion.md) for reduced motion.*
