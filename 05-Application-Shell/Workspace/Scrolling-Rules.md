# Scrolling Rules

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([ContentArea.md](../../04-Component-Library/Layout/ContentArea.md)), DP-1 ([Layout-Principles.md](../../02-Design-Language/Layout-Principles.md))

---

## Purpose

Defines scroll behavior across the workspace — which regions scroll, how nested scroll works, scroll position memory, and scroll performance rules.

---

## Scroll Containers

### Primary Content Scroll
The main scroll container for page content.

- ContentArea is the primary scroll container
- Only the ContentArea scrolls vertically on the page
- Header is fixed (does not scroll)
- Sidebar scrolls independently (overflow items)
- Context panel and AI panel scroll independently

### Region-Level Scroll
Each region manages its own overflow.

| Region | Scroll Behavior |
|--------|----------------|
| Primary Region | Vertical scroll. Horizontal overflow hidden. |
| Secondary Region | Vertical scroll. Independent of primary. |
| Context Region | Vertical scroll. Independent of primary. |
| AI Region | Vertical scroll. Message history scrolls to bottom on new messages. |
| Inspector Region | Vertical scroll. Follows selection. |
| Sidebar | Vertical scroll when items exceed height. No horizontal scroll. |

### Nested Scroll
Scroll containers inside scroll containers.

- Avoid nested scroll containers wherever possible
- When nested scroll is unavoidable, the inner container scrolls first, then the outer
- Data tables inside ContentArea scroll horizontally within their container
- Code blocks and long text fields scroll horizontally within their section

---

## Scrolling Rules

| Rule | Description |
|------|-------------|
| One main scroll | Only one primary vertical scroll container per layout |
| Independent panes | Each pane in a split layout scrolls independently |
| Scroll position memory | Scroll position is remembered when navigating away and back |
| Scroll restoration | Scroll position should restore to the previous position on route back |
| Smooth scrolling | `scroll-behavior: smooth` for in-page anchor navigation |
| Overscroll behavior | `overscroll-behavior: contain` on scrollable regions to prevent body scroll |
| Scrollbar styling | Custom scrollbars match the theme (thin, subtle) |
| Scroll on focus | When an element receives focus, it scrolls into view if needed |

---

## Scroll Position Memory

| Context | Behavior |
|---------|----------|
| Within session | Scroll position is remembered when navigating between pages |
| Cross-session | Scroll position is remembered for list views (pagination state) |
| Browser back | Browser back restores scroll position via `history.scrollRestoration` |
| List views | Scroll position in long lists is preserved when returning from detail view |

---

## Performance Rules

| Rule | Description |
|------|-------------|
| No scroll listeners | Avoid JavaScript scroll listeners for layout changes. Use CSS sticky, IntersectionObserver |
| Virtual scrolling | Lists over 100 items use virtual scrolling (windowing) |
| Content visibility | Use `content-visibility: auto` for long scroll pages |
| Containment | Use `contain: layout style paint` on scrollable containers |
| Will-change restraint | Apply `will-change: scroll-position` sparingly |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Content-Zones.md](Content-Zones.md) | Which zones scroll independently |
| [Split-Workspace.md](Split-Workspace.md) | Scroll behavior in split panes |
| [Architecture/Performance.md](../Architecture/Performance.md) | Virtual scrolling and scroll performance |

---

*Scrolling rules ensure the workspace scrolls predictably and performantly. Users never fight scroll behavior or lose their place.*
