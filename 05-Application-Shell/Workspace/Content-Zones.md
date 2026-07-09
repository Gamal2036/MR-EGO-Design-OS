# Content Zones

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([ContentArea.md](../../04-Component-Library/Layout/ContentArea.md), [Section.md](../../04-Component-Library/Layout/Section.md)), DP-1 ([Layout-Principles.md](../../02-Design-Language/Layout-Principles.md))

---

## Purpose

Defines where content lives within the workspace — the zones that content occupies and the rules that govern content placement.

---

## Content Zone Types

### Primary Content Zone
The main content area where the user's primary task takes place.

- Occupies the ContentArea component
- Always present in every layout
- Contains page-specific content
- Adjusts width based on layout variant (narrow, standard, wide, full)
- Scrolls independently of other zones

### Secondary Content Zone
Supporting content visible alongside primary content.

- Occupies a secondary panel in the Region System
- Present only when the layout requires it
- Contains related information, lists, or navigation
- Can be collapsed or hidden by the user
- Width is adjustable via drag handle

### Tertiary Content Zone
Supplementary content that is context-dependent.

- Occupies a context panel
- Appears and disappears based on selection state
- Contains details, metadata, or actions for the selected item
- Slides in from the right on desktop, bottom sheet on mobile

### Toolbar Zone
Action controls above or beside content.

- Occupies the top of a section or region
- Contains actions relevant to the content below
- Adapts: desktop shows full toolbar, mobile collapses to overflow menu

### Footer Zone
Supplementary metadata and actions below content.

- Occupies the bottom of a section or region
- Contains timestamps, pagination, secondary actions
- Hidden when not needed (no content = no footer)

---

## Content Zone Rules

| Rule | Description |
|------|-------------|
| One primary zone | Every layout has exactly one primary content zone |
| Zone stacking | Secondary and tertiary zones stack vertically on mobile |
| Zone independence | Each zone scrolls independently |
| Zone identity | Every zone has a unique aria-label for screen reader navigation |
| Zone density | Zones can switch between comfortable and compact density |
| Zone isolation | Focus is contained within the active zone during modal interactions |

---

## Content Placement Rules

| Content Type | Zone | Rationale |
|-------------|------|-----------|
| Page title | Primary — top section | Immediate comprehension (UX Rule 1) |
| Main task data | Primary — center section | Primary action focus (UX Rule 2) |
| Related items | Secondary | Supporting but not primary |
| Item details | Tertiary / Context | Context-dependent |
| Toolbar actions | Primary — toolbar section | Immediate access |
| Metadata | Primary — footer section | Supplementary |
| AI suggestions | Context / AI region | Available but not intrusive |
| System status | Footer or Status area | Informational, not actionable |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [AI-Zones.md](AI-Zones.md) | AI content placement within zones |
| [Information-Zones.md](Information-Zones.md) | Information display zones |
| [Region-Architecture.md](../Regions/Region-Architecture.md) | Region definitions that host these zones |
| [Scrolling-Rules.md](Scrolling-Rules.md) | Scroll behavior per zone |

---

*Content zones define where content lives. Every layout template in Layouts/ places content into these zones.*
