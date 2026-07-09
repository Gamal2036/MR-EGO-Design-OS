# Blur Rules

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Glass-System.md](../../02-Design-Language/Glass-System.md))

---

## Definition

Blur is the visual effect that defines glass surfaces. It scatters light passing through the surface, creating a soft, frosted appearance. MR:EGO uses blur sparingly — only where it serves the functional purpose of maintaining context.

---

## Blur Values

| Type | Radius | Usage | Performance Impact |
|------|--------|-------|-------------------|
| Navigation | 12px | Sticky navigation bar | Moderate |
| Standard glass | 12px | Standard glass surfaces | Moderate |
| Backdrop | 8px | Modal/drawer backdrops | Moderate |
| Ambient | 4px | Subtle context separation | Low |
| None | 0px | All solid surfaces | None |

---

## Blur Rules

1. **Blur radius is consistent per type.** Navigation glass always uses 12px. Backdrop glass always uses 8px.
2. **Blur radius never varies within the same type.** All navigation bars use 12px.
3. **Blur is applied only to `backdrop-filter`.** Never to the element itself (element content stays sharp).
4. **Blur performance is tested.** If backdrop-filter causes frame drops, fall back to solid surface.
5. **Blur is disabled when `prefers-reduced-transparency` is enabled.** Surfaces switch to solid backgrounds.
6. **Blur is hardware-accelerated** — GPU compositing must be used for glass layers.

---

## Blur Performance Budget

| Metric | Target |
|--------|--------|
| Max glass surfaces per viewport | 2 (nav + one backdrop) |
| Blur area per surface | Navigation: 100% width × 56px. Backdrop: full viewport. |
| Frame rate with glass | 60fps minimum |
| Paint time per glass surface | < 5ms |
| Memory impact | Glass uses < 2MB additional GPU memory |

---

## Blur Anti-Patterns

| Anti-Pattern | Why |
|-------------|-----|
| Variable blur per surface | Inconsistent, confusing visual language |
| Blur behind text | Text becomes unreadable |
| Heavy blur (>20px) | High performance cost, minimal visual gain |
| Blur on background images | Performance-heavy, provides no context benefit |
| Animated blur | Extreme performance cost, motion sensitivity risk |

---

*These Blur Rules are permanent. All glass implementations in MR:EGO must comply. Refer to [Glass-Usage.md](Glass-Usage.md) for glass usage patterns, [Transparency.md](Transparency.md) for opacity values, and [Accessibility.md](Accessibility.md) for reduced-transparency support.*
