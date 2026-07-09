# Emotional Goals

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Brand-Constitution.md](../../01-Constitution/Brand-Constitution.md))

---

## Definition

Emotional Goals define how the user should feel at each stage of their journey. These are not feature goals or business metrics — they are human emotional outcomes that the visual design must produce.

---

## Journey Stage Emotional Goals

### First Contact (0–5 seconds)

| Goal | Visual Strategy |
|------|----------------|
| **Intrigued** | Clean first impression. Generous whitespace signals quality. |
| **Trusting** | Professional color palette. No flashing, no popups, no urgency. |
| **Curious** | Clear value proposition. Inviting empty states. Welcoming onboarding. |
| **Respected** | No dark patterns. No aggressive CTAs. No fake scarcity. |

### Exploration (30 seconds – 5 minutes)

| Goal | Visual Strategy |
|------|----------------|
| **Competent** | User finds controls where expected. Patterns are familiar. |
| **In control** | Clear navigation, visible undo, obvious exits. |
| **Encouraged** | Empty states guide without pressure. Progress visible. |
| **Safe** | Data is clearly owned by user. Privacy controls visible. |

### Daily Use (1 week – 1 month)

| Goal | Visual Strategy |
|------|----------------|
| **Efficient** | Muscle memory develops. Keyboard shortcuts. Predictable layouts. |
| **Calm** | No surprises. Consistent behavior. Reassuring visual rhythm. |
| **Confident** | AI suggestions are accurate. Data is fresh. System is fast. |
| **Accomplished** | Progress indicators celebrate milestones. Growth is visible. |

### Long-term (1 month+)

| Goal | Visual Strategy |
|------|----------------|
| **Indispensable** | Platform fades into background. User focuses on work, not tool. |
| **Trusted** | Every interaction has built trust. No trust has been broken. |
| **Proud** | User recommends MR:EGO. The visual quality reflects on them. |
| **Growing** | Career progress is visually documented. Platform grew with user. |

---

## Emotional Goal Map

```
┌─────────────────────────────────────────────────────────────────┐
│                     EMOTIONAL GOAL MAP                           │
├────────────┬──────────────┬──────────────┬──────────────────────┤
│ First      │ Exploration   │ Daily Use    │ Long-term            │
│ Contact    │              │              │                      │
├────────────┼──────────────┼──────────────┼──────────────────────┤
│ Intrigued  │ Competent    │ Efficient    │ Indispensable        │
│ Trusting   │ In control   │ Calm         │ Trusted              │
│ Curious    │ Encouraged   │ Confident    │ Proud                │
│ Respected  │ Safe         │ Accomplished │ Growing              │
└────────────┴──────────────┴──────────────┴──────────────────────┘
```

---

## Emotional Goal Rules

1. **Every screen must satisfy at least 2 emotional goals** for its journey stage.
2. **No screen may produce negative emotions** (confusion, anxiety, frustration, boredom).
3. **Error states must still satisfy 1 emotional goal** (usually "Safe" or "Respected").
4. **Loading states must satisfy "Confident"** — the user trusts it will complete.
5. **Emotional goals are tested** through user research, not assumed.
6. **When emotional goals conflict**, the goal that produces longer-term trust wins.

---

*These Emotional Goals are permanent. Every visual design decision in all future phases must be validated against these goals. Refer to [Brand-Feeling.md](Brand-Feeling.md) for cumulative brand feeling, [Visual-Emotion.md](Visual-Emotion.md) for emotional palette, and [UX-Constitution.md](../../01-Constitution/UX-Constitution.md) for UX rules that support these goals.*
