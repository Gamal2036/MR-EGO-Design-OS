# Loading System

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md))

---

## Philosophy

Loading states communicate that work is happening. They keep the user informed and assured that the system is responsive. MR:EGO uses **skeleton screens** as the primary loading pattern — they show the content structure before content arrives, reducing perceived wait time.

---

## Loading Patterns

### Skeleton Screens (Preferred)

Skeleton screens mirror the final layout using neutral, animated placeholders.

| Property | Specification |
|----------|---------------|
| Shape | Rounded rectangles matching final content shape |
| Color | Neutral-200 (light), Neutral-300 (dark) |
| Animation | Pulse opacity (1.0 → 0.5 → 1.0) |
| Duration | 1500ms loop |
| Easing | Ease-In-Out |
| Layout | Matches final content layout exactly |

**Skeleton Types:**

| Content Type | Skeleton Description |
|-------------|---------------------|
| Card | Title line (60% width), body lines (3 x 100%, 80%, 60%) |
| Table row | Cells matching column widths |
| Avatar | Circle (40px) + name line (120px) |
| Chart | Rectangle outline with axis placeholders |
| Text paragraph | 4–5 lines of decreasing width |
| Image | Rectangle with icon overlay |

### Spinner

Used for inline operations where skeleton screens are not practical.

| Property | Specification |
|----------|---------------|
| Style | Circular arc rotation |
| Size | 20px (inline), 32px (section), 48px (full page) |
| Color | Primary-500 |
| Duration | 1000ms per rotation |
| Animation | Continuous (linear) |

### Progress Bar

Used for determinate operations with known duration.

| Property | Specification |
|----------|---------------|
| Height | 4px |
| Width | 100% of container |
| Background | Neutral-200 |
| Fill | Primary-500 |
| Animation | Width transition (Ease-Out, 200ms) |
| Label | Optional percentage or "Processing..." |

### Content Reveal

Used when content arrives in groups (staggered).

| Property | Specification |
|----------|---------------|
| Pattern | Items fade in with staggered delay |
| Delay between items | 50ms |
| Max items staggered | 8 |
| Duration | 300ms per item |
| Easing | Ease-Out |

---

## When to Use Each Pattern

| Pattern | Use Case | Example |
|---------|----------|---------|
| Skeleton screen | Page or section initial load | Dashboard loading |
| Spinner | Inline action, button loading | Save button, search |
| Progress bar | Known progress, file operations | Upload, export |
| Content reveal | List load, search results | Search results appearing |
| Shimmer | Image loading | Avatar, chart loading |

---

## Loading Timing

| Duration | Pattern | User Perception |
|----------|---------|-----------------|
| <100ms | No loading state | Instant — no indicator needed |
| 100ms–1s | Skeleton screen | Fast — user sees structure immediately |
| 1s–5s | Skeleton + progress indication | Moderate — user sees progress |
| 5s+ | Progress bar + cancel option | Slow — user needs control |

---

## Loading Accessibility

1. **Loading states are announced** to screen readers via `aria-live="polite"` region.
2. **Skeleton screens use `aria-hidden="true"`** to hide from screen readers (only the final content is announced).
3. **Spinners include `role="status"`** and `aria-label="Loading"`.
4. **Progress bars include `role="progressbar"`** with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
5. **Loading never traps focus.** Users can navigate away from loading content.

---

## Loading Rules

1. **Always show loading state within 100ms** of action initiation.
2. **Never show blank pages during load.** Always skeleton or spinner.
3. **Skeleton screens match final layout pixel-for-pixel.** Surprises on load completion are jarring.
4. **One loading indicator per page region.** Avoid competing indicators.
5. **Loading states for background operations** are subtle (icon badge or small spinner, not full skeleton).
6. **Cancel loading** where possible for operations exceeding 3 seconds.
7. **Skeleton screens have no borders or shadows.** They are pure background shapes.

---

*This Loading System is permanent. All components in DP-2 implement these loading patterns. Refer to [Feedback-System.md](Feedback-System.md) for feedback states, [Motion-System.md](Motion-System.md) for animation specifications, and [Accessibility.md](Accessibility.md) for screen reader requirements.*
