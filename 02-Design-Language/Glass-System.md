# Glass System

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Brand-Constitution.md](../01-Constitution/Brand-Constitution.md), [Design-Principles.md](../01-Constitution/Design-Principles.md))

---

## Philosophy

Glass is a surface treatment that creates depth by blurring the content behind an element. It is used sparingly in MR:EGO — only where showing underlying context improves the user experience.

Glass is not a decorative effect. It is a functional tool for maintaining context during temporary or floating interactions.

---

## Glass Specification

| Property | Light Theme | Dark Theme |
|----------|-------------|------------|
| Background | `rgba(255, 255, 255, 0.72)` | `rgba(15, 23, 42, 0.72)` |
| Border | `rgba(255, 255, 255, 0.20)` | `rgba(255, 255, 255, 0.08)` |
| Backdrop blur | 12px | 12px |
| Saturation | 100% (no change) | 100% (no change) |

---

## Where Glass SHOULD Be Used

| Element | Rationale |
|---------|-----------|
| Navigation bar (sticky) | Shows content is scrolling beneath the nav, maintaining spatial context |
| Modal backdrop | Glass backdrop (not full opacity) shows the modal is a layer above the page |
| Sheet / Drawer backdrop | Same as modal — maintains page visibility |
| Context menu backdrop | Subtle glass backdrop helps distinguish the menu layer |
| Command palette background | Glass background helps focus on command search while showing context |

## Where Glass MUST NOT Be Used

| Element | Rationale |
|---------|-----------|
| Cards | Cards need solid backgrounds for readability. Glass cards create contrast issues and visual noise. |
| Buttons | Buttons must have solid, high-contrast backgrounds for accessibility |
| Form inputs | Inputs need clear, solid backgrounds for focus indication and readability |
| Text containers | Any element containing body text must have a solid background for WCAG contrast compliance |
| Data tables | Table rows need solid backgrounds for scanability |
| Page backgrounds | The page itself cannot be glass — there is nothing behind it to blur |
| Hero sections | Glass as a hero background is a trend, not a functional choice |
| Modal content area | Modal body content must be solid for readability |

---

## Glass Layer Rules

1. **Glass surfaces must have a solid text container** for any text content. Text never sits directly on glass.
2. **Glass backdrop is always at Layer 5** (overlay level) in the elevation system.
3. **Glass navigation bars use Layer 1** elevation with glass treatment.
4. **Blur intensity is consistent** — 12px for all glass surfaces. Do not vary.
5. **Glass never overlaps glass.** Two glass surfaces must not stack.
6. **Glass surfaces always include a subtle border** to define the edge against any background.

---

## Glass Accessibility

Glass must not reduce content readability:

1. **No text on glass.** Text elements on glass surfaces (like navigation links) have their own solid background or sufficient contrast.
2. **Backdrop blur cannot be relied upon** for contrast — underlying content is unpredictable.
3. **Glass opacity (0.72) is tested** to ensure underlying content is visible enough for context but not distracting.
4. **`prefers-reduced-transparency`** is respected. When enabled, glass surfaces switch to solid backgrounds with matching color.

*See [Accessibility.md](Accessibility.md) for reduced motion and transparency preferences.*

---

## Visual Design of Glass Elements

Glass surfaces have:
- **No shadow** (glass is its own depth effect). If shadow is needed, use a solid surface instead.
- **Very subtle border** (1px semi-transparent white) to define the glass edge.
- **No additional effects** — no reflection, no shine, no gradient overlay.
- **Consistent across themes** — only the background color changes.

---

*This Glass System is permanent. All components in DP-2 use these glass specifications. Refer to [Elevation-System.md](Elevation-System.md) for glass elevation placement, [Color-System.md](Color-System.md) for glass color tokens, and [Accessibility.md](Accessibility.md) for reduced transparency support.*
