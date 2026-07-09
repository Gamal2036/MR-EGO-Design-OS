# Glass Accessibility

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Accessibility.md](../../02-Design-Language/Accessibility.md), [Glass-System.md](../../02-Design-Language/Glass-System.md))

---

## Accessibility Requirements

Glass surfaces must not reduce accessibility. Every glass treatment must be validated against these requirements:

### Contrast

| Requirement | Specification |
|-------------|---------------|
| Text on glass | WCAG AA 4.5:1 minimum against the glass background color (not the blurred content) |
| Icons on glass | WCAG AA 3:1 minimum |
| Glass borders | 3:1 minimum against the surface beneath |

Since glass background is semi-transparent, the effective color changes depending on what is behind it. The safe approach is that text on glass uses the glass color at full opacity, not the blended result.

### Transparency Preference

| Setting | Effect |
|---------|--------|
| `prefers-reduced-transparency: reduce` | Glass surfaces switch to solid background equivalents |
| In-app "Reduce transparency" toggle | Same as system preference |
| Glass → Solid mapping (Light) | White (#FFFFFF) at equivalent surface level |
| Glass → Solid mapping (Dark) | Neutral-100 (#1E293B) at equivalent surface level |

### Keyboard Navigation

| Requirement | Specification |
|-------------|---------------|
| Glass does not trap focus | All glass surfaces pass keyboard focus through to underlying content |
| Glass backdrop is not focusable | Backdrop is `aria-hidden="true"` and not in tab order |
| Glass navigation items | All nav items in glass surfaces are keyboard accessible |

### Screen Readers

| Requirement | Specification |
|-------------|---------------|
| Glass surfaces | No special screen reader announcement needed |
| Glass backdrop | Marked as `aria-hidden="true"` — decorative only |
| Glass nav | Standard landmark role, no glass-specific treatment |

---

## Accessibility Testing

Every glass surface must pass:

1. **Contrast verification** — text on glass meets 4.5:1 against solid glass color
2. **Transparency reduction test** — surface is usable with solid background
3. **Keyboard navigation test** — no focus traps, all elements reachable
4. **Screen reader test** — no glass-specific confusion or missing information
5. **Zoom test** — glass surface maintains readability at 200% zoom

---

*This Glass Accessibility specification is permanent. All glass implementations must pass these requirements. Refer to [Accessibility.md](../../02-Design-Language/Accessibility.md) for general accessibility requirements, [Glass-Usage.md](Glass-Usage.md) for glass patterns, and [Blur-Rules.md](Blur-Rules.md) for blur specifications.*
