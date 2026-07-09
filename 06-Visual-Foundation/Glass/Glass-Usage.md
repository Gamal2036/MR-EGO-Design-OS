# Glass Usage

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Glass-System.md](../../02-Design-Language/Glass-System.md), [Color-System.md](../../02-Design-Language/Color-System.md))

---

## Philosophy

Glass is a functional surface treatment, not a decorative style. It maintains visual context by blurring the content behind an element. Every glass surface in MR:EGO has a clear reason: the user benefits from seeing what is behind this element while interacting with what is on it.

---

## Where Glass Is Used

| Element | Purpose | Glass Specification |
|---------|---------|-------------------|
| Sticky navigation bar | Content scrolls beneath, user maintains spatial awareness | Full-width, full-height glass |
| Modal backdrop | Distinguishes modal as top layer | Glass overlay, not solid |
| Sheet/drawer backdrop | Same as modal — partial context visible | Glass overlay |
| Command palette background | Focus on search while seeing workspace context | Glass behind command UI |
| Context menu backdrop | Subtle depth cue for menu layer | Minimal glass behind menu |

---

## Glass Types

### Type 1: Navigation Glass

| Property | Value |
|----------|-------|
| Opacity (Light) | 0.85 (higher than standard — nav needs readability) |
| Opacity (Dark) | 0.85 |
| Blur | 12px |
| Border | Bottom 1px semi-transparent |
| Height | 56px (standard nav height) |
| Coverage | Full width |

### Type 2: Backdrop Glass

| Property | Value |
|----------|-------|
| Opacity (Light) | 0.60 |
| Opacity (Dark) | 0.60 |
| Blur | 8px (less blur — just enough to distinguish layer) |
| Border | None |
| Coverage | Full viewport behind modal/sheet |

### Type 3: Ambient Glass

| Property | Value |
|----------|-------|
| Opacity (Light) | 0.50 |
| Opacity (Dark) | 0.50 |
| Blur | 4px (minimal — just softens background) |
| Border | None |
| Coverage | Localized to element area |

---

## Glass Usage Rules

1. **Glass always has a functional purpose.** If showing context behind is not beneficial, use a solid surface.
2. **Text never sits directly on glass.** Text elements on glass (like navigation links) either use sufficient contrast or have their own solid sub-container.
3. **Glass surfaces always include a subtle border** to define the edge against any background.
4. **Glass is consistent across themes** — only background color and border opacity change.
5. **Glass never overlaps glass.** Two glass surfaces must not stack.
6. **Glass surfaces do not cast shadows** — the blur effect provides depth.

---

## Glass Anti-Patterns

| Anti-Pattern | Reason |
|-------------|--------|
| Glass cards | Content readability suffers, contrast issues |
| Glass buttons | Unclear affordance, accessibility concern |
| Glass form inputs | Blur interferes with text readability |
| Glass data tables | Row scanability is compromised |
| Glass text containers | WCAG contrast failure risk |
| Glass on glass | Blur artifact, visual confusion |

---

*This Glass Usage specification is permanent. All glass surfaces follow these patterns. Refer to [Transparency.md](Transparency.md) for glass transparency values, [Blur-Rules.md](Blur-Rules.md) for blur specifications, and [Glass-System.md](../../02-Design-Language/Glass-System.md) for the foundational glass specification.*
