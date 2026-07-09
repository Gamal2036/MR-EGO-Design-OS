# Loading

**Phase:** DP-2 (Design System)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md), [Loading-System.md](../../02-Design-Language/Loading-System.md), [Motion-System.md](../../02-Design-Language/Motion-System.md))

---

## Purpose

Loading components communicate that work is happening. They keep users informed and assured that the system is responsive. Skeleton screens are the primary loading pattern — they preview content structure before content arrives, reducing perceived wait time.

---

## When to Use

- Page or section initial data loading
- Inline action processing (save, submit, generate)
- Known-duration operations (uploads, exports)
- Content appearing progressively (search results, lists)
- AI response generation (streaming content)

## When NOT to Use

- Instant operations (<100ms) — no loading state needed
- Background sync that does not affect visible content
- Static content already in view — content is already there
- Error states — use error patterns instead

---

## Variants

### Skeleton

Content-shaped placeholders that mirror final layout.

| Property | Value |
|----------|-------|
| Shape | Rounded rectangles matching content shape |
| Color | Neutral-200 (light), Neutral-300 (dark) |
| Border radius | Radius-Sm (4px) for text lines, Radius-Md for cards |
| Animation | Pulse opacity (1.0 → 0.5 → 1.0) |
| Duration | 1500ms loop |
| Easing | Ease-In-Out |

| Type | Layout |
|------|--------|
| Card skeleton | Title line (60% width), body lines (3 lines: 100%, 80%, 60% width), 4px gap between lines |
| Table skeleton | Header row (4-5 short lines) + 5 data rows with variable width lines |
| Text skeleton | 4-5 lines of decreasing width (100%, 90%, 85%, 80%, 60%) |
| Avatar skeleton | Circle (40px or 48px) + 2 text lines beside it |
| Chart skeleton | Rectangle outline (full card width, 160px height) with subtle grid lines |
| Image skeleton | Rectangle with landscape icon overlay, 3:2 aspect ratio |

### Spinner

Rotating indicator for inline or section-level loading.

| Size | Diameter | Use Case |
|------|----------|----------|
| Inline (sm) | 16px | Button loading, inline operations |
| Default (md) | 24px | Section loading, panel loading |
| Large (lg) | 40px | Page-level loading, initial load |
| Extra large (xl) | 56px | Full-page loading (rare) |

| Property | Value |
|----------|-------|
| Style | Circular arc rotation |
| Color | Primary-500 |
| Speed | 1000ms per rotation |
| Animation | Continuous (linear) |

### Progress Bar

Determinate progress for operations with known duration.

| Property | Standard | Indeterminate |
|----------|----------|---------------|
| Height | 4px | 4px |
| Background | Neutral-200 | Neutral-200 |
| Fill | Primary-500 | Primary-500 |
| Fill transition | Width 200ms Ease-Out | Animated stripe sliding |
| Label | Optional percentage | "Processing..." text |
| Container | Full width of parent | Full width of parent |

| State | Visual |
|-------|--------|
| Active | Fill bar animating |
| Complete | Fill at 100%, then fades out (500ms delay) |
| Error | Fill turns Danger-500, error icon appears |
| Paused | Fill stops at current position, paused icon |

### AI Thinking

Loading state specific to AI processing.

| Property | Value |
|----------|-------|
| Trigger | AI action initiated (analyze, generate, suggest) |
| Duration | Variable (500ms to several seconds) |
| Visual | Pulsing dots (3 dots, staggered opacity animation) |
| Placement | Inline where AI output will appear |
| Label | "Thinking..." or "Analyzing..." |
| Animation | Dots scale opacity: 1→0.3→1, staggered 300ms each |
| Accessibility | `aria-label="AI is thinking"` with `aria-live="polite"` |

### Streaming State

Content that appears progressively as it is generated.

| Property | Value |
|----------|-------|
| Content | Text appearing word by word or chunk by chunk |
| Cursor | Blinking cursor at end of streaming text |
| Speed | Natural reading pace (matching generation) |
| Completion | Full content revealed, cursor removed, transitions to static |
| Animation | Opacity transition on new content appearing (50ms per token) |

---

## Loading Anatomy

```
Skeleton Card:
┌──────────────────────────────────────────┐
│  ┌──────────────────────────────────┐    │
│  │ ██████████████░░░░░░░░░░░░░░░░░  │    │  ← 60% width pulse
│  │ ████████████████████████████████  │    │  ← 100% width pulse
│  │ ██████████████████████████░░░░░░  │    │  ← 80% width pulse
│  │ ████████████████░░░░░░░░░░░░░░░░  │    │  ← 60% width pulse
│  └──────────────────────────────────┘    │
└──────────────────────────────────────────┘

AI Thinking:
  MR:EGO is thinking ● ● ●
```

---

## Spacing

| Context | Value | Token |
|---------|-------|-------|
| Skeleton card padding | 24px | Space-7 |
| Skeleton line height | 14px | Space-4 |
| Skeleton line gap | 8px | Space-3 |
| Spinner to text (label) | 8px | Space-3 |
| Progress bar to label | 8px | Space-3 |
| Progress bar height | 4px | Space-1 |
| AI thinking dots gap | 6px | Space-3 |
| Streaming cursor blink | 1000ms | — |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Skeleton | `aria-hidden="true"` — screen readers skip skeletons |
| Spinner | `role="status"`, `aria-label="Loading"` |
| Progress bar | `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"` |
| AI thinking | `aria-live="polite"` region |
| Streaming output | `aria-live="polite"` — announces content as it appears |
| Loading never traps focus | Users can navigate away from loading regions |

---

## Timing

| Duration | Pattern | User Perception |
|----------|---------|-----------------|
| <100ms | No loading state | Instant |
| 100ms-1s | Skeleton immediately | Fast |
| 1s-5s | Skeleton + optional progress | Moderate |
| 5s+ | Progress bar + cancel | Slow — offer cancel |
| AI (variable) | AI Thinking + streaming | Engaging |

---

## Responsive Behavior

| Breakpoint | Change |
|------------|--------|
| Mobile (<768px) | Smaller card skeletons. Reduced skeleton items (3 instead of 8). |
| Tablet (768-1023px) | Standard skeletons, 2-column grid for card skeletons. |
| Desktop (1024px+) | Standard. Full skeleton matching final layout. |

---

## Future Expansion

- **Shimmer wave** — Sweeping gradient animation for premium loading feel
- **Progress with estimated time** — "About 30 seconds remaining"
- **Skeleton with brand color** — Primary tinted skeletons for brand moments
- **Cancellable loading** — Cancel button for long operations
- **Background task indicator** — Subtle badge for background processing
- **Optimistic UI placeholder** — Pending state for optimistic updates before server confirms

---

## Related Components

- [Buttons.md](Buttons.md) — Button loading state
- [Cards.md](Cards.md) — Card skeleton pattern
- [Tables.md](Tables.md) — Table skeleton pattern
- [Forms.md](Forms.md) — Form field loading state
- [Feedback.md](Feedback.md) — Progress bar, progress steps
- [AI-Components.md](AI-Components.md) — AI Thinking, Streaming State
- [Charts.md](Charts.md) — Chart skeleton pattern
