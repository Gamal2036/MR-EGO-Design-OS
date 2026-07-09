# Border Radius

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Design-Principles.md](../01-Constitution/Design-Principles.md))

---

## Philosophy

Border radius in MR:EGO is **gentle, consistent, and purposeful.** Corners are rounded enough to feel approachable but not so much that they sacrifice information density or professional appearance.

The radius scale is intentionally limited to three values plus a circle. Using more creates visual inconsistency.

---

## Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| Radius-Sm | 4px | Input fields, small components, badges, tags |
| Radius-Md | 8px | Cards, panels, buttons, dialogs, sheets |
| Radius-Lg | 12px | Modals, large containers, cards on elevated surfaces |
| Radius-Full | 9999px | Pills, avatars, circular buttons, toggle handles |

---

## Usage Rules

| Element | Radius | Rationale |
|---------|--------|-----------|
| Text input | 4px | Sharp enough for professional density, soft enough to feel modern |
| Button | 8px | Matches card radius for visual harmony |
| Card | 8px | Standard surface radius |
| Modal / Dialog | 12px | Larger radius indicates floating surface |
| Dropdown menu | 8px | Matches card radius |
| Tooltip | 4px | Small element, subtle radius |
| Badge / Tag | 4px | Dense element, minimal radius |
| Avatar | Full | Circular by convention |
| Pill / Toggle | Full | One continuous shape |
| Notification toast | 8px | Card-like radius |
| Sheet / Drawer | 12px top corners | Floating surface, elevated radius |
| Data table cell | 0px | Maximum density, professional grid |

---

## Radius Rules

1. **Never mix radii within a component.** A card uses Radius-Md for all four corners.
2. **Radius scales with elevation.** Higher elevation surfaces use larger radii (Radius-Lg for modals).
3. **Interactive elements round more on hover.** Buttons maintain Radius-Md at rest and hover — never increase radius on interaction.
4. **Consistent across themes.** Border radius does not change between light and dark themes.
5. **No radius on data-heavy elements.** Data tables, list items, and form fields use 0px or Radius-Sm to maximize density.

---

## What Border Radius Does Not Include

- **No circular buttons** except for icon-only buttons and avatars.
- **No asymmetric radius.** Each corner of an element has the same radius unless it is a sheet/drawer.
- **No radius animation.** Radius changes on state transition are instant, not animated.
- **No overlapping radii.** Elements nested inside radius containers maintain their own radius as needed.

---

*This Border Radius specification is permanent. All components in DP-2 use these radius values. Refer to [Design-Principles.md](../01-Constitution/Design-Principles.md) for the "gentle corners (4–8px)" rule foundation.*
