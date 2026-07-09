# Glass Do / Don't

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Glass-System.md](../../02-Design-Language/Glass-System.md))

---

## DO Use Glass For

| Element | Why |
|---------|-----|
| Sticky navigation bar | Content scrolls beneath; user maintains spatial orientation |
| Modal backdrop | Viewer sees page context beneath the modal layer |
| Sheet/drawer backdrop | Partial transparency shows workspace is still there |
| Command palette background | Blurred workspace context keeps user grounded |
| Context menu backdrop | Subtle depth cue for menu layer separation |

## DO NOT Use Glass For

| Element | Why |
|---------|-----|
| Cards | Readability requires solid backgrounds; glass creates contrast issues |
| Buttons | Solid, high-contrast backgrounds needed for accessibility |
| Form inputs | Clear boundaries and focus states require solid backgrounds |
| Text containers | WCAG contrast compliance requires solid text backgrounds |
| Data tables | Row scanability requires solid alternating backgrounds |
| Page backgrounds | Nothing behind to blur — glass is meaningless |
| Hero sections | Glass as hero background is a trend, not functional |
| Modal content area | Content readability requires solid background |
| Charts / graphs | Data accuracy perception requires solid background |
| Lists | Item scanning requires consistent, solid backgrounds |

---

## DO Follow These Rules

- Glass surfaces always have a subtle border defining their edge
- Glass uses consistent 12px blur across all instances
- Glass surfaces have no shadow (blur is their depth effect)
- Text on glass has a solid sub-container or sufficient contrast
- Glass respects prefers-reduced-transparency by switching to solid

## DO NOT Break These Rules

- Do not stack glass on glass
- Do not use glass for content-heavy surfaces
- Do not vary blur radius per instance
- Do not animate glass properties (opacity, blur)
- Do not use glass behind text without contrast verification

---

## Correct Glass Examples

```
Navigation bar (sticky):
┌─────────────────────────────────────────────┐
│ Glass (85% opacity, 12px blur)              │
│   Solid text with sufficient contrast       │
│   Subtle bottom border                      │
└─────────────────────────────────────────────┘
      ↓ Content scrolls beneath ↓

Modal backdrop:
┌─────────────────────────────────────────────┐
│   (Page content visible through blur)        │
│                                              │
│   ┌───────────────────────────────────┐      │
│   │ Modal (solid, Shadow-3)           │      │
│   │ Content has solid background      │      │
│   └───────────────────────────────────┘      │
└─────────────────────────────────────────────┘
```

---

*This Do/Don't reference is permanent. All glass decisions are validated against this guide. Refer to [Glass-Usage.md](Glass-Usage.md) for usage patterns, [Blur-Rules.md](Blur-Rules.md) for blur specifications, and [Accessibility.md](../Accessibility/Accessibility.md) for transparency accessibility.*
