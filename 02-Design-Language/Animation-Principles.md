# Animation Principles

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Brand-Constitution.md](../01-Constitution/Brand-Constitution.md), [UX-Constitution.md](../01-Constitution/UX-Constitution.md))

---

## Principles

### 1. Purposeful

Every animation answers: "What does this communicate?"

- **Hierarchy:** What is happening and in what order?
- **State change:** What changed and how?
- **Spatial relationship:** Where did it come from and where is it going?
- **Feedback:** Did the action succeed or fail?

If an animation cannot answer one of these questions, it does not exist.

### 2. Performant

Animation must never degrade the user experience.

- Animations run at 60fps minimum. Use `transform` and `opacity` only (they are GPU-accelerated).
- Never animate `width`, `height`, `top`, `left`, `margin`, or `padding` — these trigger layout recalculations.
- Use `will-change` sparingly and only for actively animating elements.
- Animations are off by default until activated. No startup animations.
- Heavy animations (page transitions) yield to user input immediately.

### 3. Predictable

Users should be able to anticipate how elements move.

- Elements move in consistent directions (panels slide from right, menus drop from top).
- Enter and exit animations are the reverse of each other.
- Repeated interactions produce identical animations.
- No surprise animations. Users should never wonder "why did that move?"

### 4. Continuous

Motion feels connected, not discrete.

- State transitions animate smoothly between values rather than jumping.
- Elements that change position animate their movement (FLIP technique).
- Shared elements between views transition seamlessly (shared layout animations).
- Staggered animations create a wave-like feeling, not a list of items popping in.

### 5. Deferential

Animation serves content, not the other way around.

- Motion does not delay user interaction. Users can interact during animations.
- Content is readable during and after animation. Text does not blur during motion.
- Animation does not distract from the primary task.
- Speed wins over spectacle. A 100ms meaningful animation beats a 500ms impressive one.

### 6. Respectful

Animation respects user preferences and accessibility needs.

- `prefers-reduced-motion` is always honored.
- No vestibular triggers (parallax, perspective shifts, rapid scale changes).
- Users can disable all non-essential motion in settings.
- Animations do not interfere with screen readers or keyboard navigation.

---

## Animation Categories

| Category | Duration | Purpose | Example |
|----------|----------|---------|---------|
| **Micro** | 50–100ms | Feedback, confirmation | Button press, hover |
| **Transition** | 200–300ms | State change, navigation | Tab switch, modal open |
| **Reveal** | 300–500ms | Content introduction | Staggered list, card appear |
| **Loading** | 800–1500ms | Progress indication | Skeleton pulse, spinner |
| **Narrative** | 500–800ms | Brand moments, celebration | Success animation, welcome |

---

## Implementation Rules

1. **`transform` and `opacity` only.** Never animate layout properties.
2. **Hardware-accelerated properties** — use `translate3d` or `translateZ(0)` for transform animations.
3. **`will-change`** is added before animation starts and removed after animation completes.
4. **`animation-fill-mode: forwards`** for enter animations, `backwards` for exit.
5. **No `setTimeout` for animation sequencing.** Use CSS animation-delay or JS Web Animation API.
6. **Animation timing is centralized** — no magic numbers in component code.

---

*These Animation Principles are permanent. All motion in DP-2 components and DP-5+ pages follows these principles. Refer to [Motion-System.md](Motion-System.md) for duration and easing specifications, [Accessibility.md](Accessibility.md) for reduced motion requirements, and [Interaction-Language.md](Interaction-Language.md) for interaction patterns.*
