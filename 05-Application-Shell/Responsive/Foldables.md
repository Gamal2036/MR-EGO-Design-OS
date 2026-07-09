# Foldables

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent

---

## Purpose

Defines workspace behavior on foldable and dual-screen devices — handling the transition between folded (phone) and unfolded (tablet) states, and the hinge area.

---

## State Transitions

### Folded → Unfolded
- Workspace transitions from Mobile layout to Tablet layout
- Sidebar switches from bottom tab bar to collapsed rail
- Content expands from single column to multi-column
- Context panels become available as side panels
- Transition is smooth (no reload)

### Unfolded → Folded
- Workspace transitions from Tablet layout to Mobile layout
- Sidebar switches from rail to bottom tab bar
- Content collapses to single column
- Open panels dismiss or minimize
- User's position is preserved

---

## Hinge Handling

| Behavior | Description |
|----------|-------------|
| Content avoidance | Content does not cross the hinge |
| Hinge gap | 0-48px gap treated as safe area |
| Dual-screen mode | Content can span across screens if hinge is minimal |
| Single-screen mode | Content confined to one screen (user preference) |

---

## Layout Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Single pane | Content on one screen only | Reading, forms |
| Dual pane | Two independent panes | List + detail, reference |
| Span | Content spans across both screens | Dashboard, timeline |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Responsive-Architecture.md](Responsive-Architecture.md) | Parent responsive architecture |
| [Workspace/Safe-Areas.md](../Workspace/Safe-Areas.md) | Hinge safe area handling |

---

*Foldable support ensures the workspace adapts seamlessly to the emerging form factor of foldable and dual-screen devices.*
