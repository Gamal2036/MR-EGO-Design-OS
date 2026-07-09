# Glass Performance

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Glass-System.md](../../02-Design-Language/Glass-System.md))

---

## Performance Limits

Glass surfaces use `backdrop-filter: blur()`, which is a GPU-intensive operation. Performance must be monitored and optimized.

---

## Performance Budget

| Metric | Budget | Notes |
|--------|--------|-------|
| Max glass surfaces per viewport | 2 | Navigation + one backdrop maximum |
| Blur area per surface | Navigation: 100% × 56px | Full width navigation, 56px height |
| Maximum blurred area | < 100,000px² per surface | Avoid full-viewport blur at >12px |
| Frame rate maintained | 60fps | Must not drop below 60fps with glass enabled |
| Paint time per glass surface | < 5ms | Measured in Chrome DevTools |
| Memory impact | < 2MB additional GPU memory | Per glass surface |
| Initial load impact | < 50ms added to first paint | Glass initialization should not delay first paint |

---

## Performance Optimization Rules

1. **Limit blur radius to 12px maximum.** Higher blur values increase GPU cost exponentially.
2. **Limit blur area.** Full-viewport glass (modal backdrop at 8px) is acceptable. Larger areas at higher blur are not.
3. **Use `will-change: transform` on glass containers** to promote to GPU layer.
4. **Avoid animating glass properties.** Never animate `backdrop-filter`. Never animate opacity of glass surfaces.
5. **Avoid stacking glass.** Two glass surfaces cause double blur processing.
6. **Fall back to solid on low-end devices.** Detect GPU capability or use `@supports (backdrop-filter: blur())` with solid fallback.
7. **Test on target devices.** Glass performance varies significantly across hardware.

---

## Fallback Behavior

| Condition | Fallback |
|-----------|----------|
| `backdrop-filter` not supported | Solid background matching glass color |
| Low GPU memory detected | Reduce blur to 4px or use solid |
| `prefers-reduced-transparency` enabled | Solid background |
| Battery saver mode detected | Solid background |
| Viewport is small (<768px) | Solid background (reduced complexity) |

---

## Glass Performance Testing Checklist

- [ ] Frame rate maintained at 60fps with 2 glass surfaces
- [ ] No paint jank on scroll with fixed glass navigation
- [ ] Memory stays within 2MB GPU budget per surface
- [ ] Fallback activates correctly on unsupported browsers
- [ ] Transparency preference respected
- [ ] Battery impact measured (glass should not significantly affect battery life)

---

*These Glass Performance specifications are permanent. All glass implementations must meet these budgets. Refer to [Blur-Rules.md](Blur-Rules.md) for blur specifications, [Glass-Accessibility.md](Glass-Accessibility.md) for accessibility requirements, and [Glass-Usage.md](Glass-Usage.md) for glass usage patterns.*
