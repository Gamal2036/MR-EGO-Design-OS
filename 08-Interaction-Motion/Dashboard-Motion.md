# Dashboard Motion

**Phase:** DP-8 (Interaction & Motion System)
**Design Authority:** DP-2 ([Components/Dashboard-Components.md](../03-Design-System/Components/Dashboard-Components.md)), DP-6 ([Dashboard-Flow.md](../06-UX-Architecture/Dashboard-Flow.md))
**Inherits:** Dashboard component specifications and flow from DP-2 and DP-6

---

## Dashboard Motion Philosophy

Dashboard motion is calm, informative, and non-distracting. Data appears progressively — critical metrics first, visualizations second, AI insights last. The dashboard never animates purely for effect; every animation communicates a data relationship or state change.

---

## Dashboard Content Load Sequence

```
1. Shell (sidebar, topbar) — Static, no animation
2. Welcome header — Fade in (200ms)
3. Stat cards — Staggered fade in (50ms delay per card, max 4 cards)
4. Quick actions — Fade in (100ms after stats)
5. Widgets — Staggered appear (100ms per widget)
6. Chart data — Animate in (400ms per chart)
7. AI recommendations — Progressive reveal (300ms per card)
```

---

## Stat Card Motion

| Event | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Initial appear | Fade in + slide up 8px | 200ms | Ease-Out |
| Value update (increase) | Counter animates from old to new | 500ms | Ease-Out |
| Value update (decrease) | Counter animates from old to new | 500ms | Ease-Out |
| Hover | Elevation + shadow | 200ms | Ease-Out |
| Trend indicator change | Icon/color transition | 200ms | Ease-Out |
| Skeleton → content | Cross-fade | 200ms | Ease-Out |

### Stat Card Value Counter

| Property | Value |
|----------|-------|
| Trigger | Value changes from backend |
| Behavior | Numbers count up/down from previous to new value |
| Duration | 500ms (scales with value difference) |
| Easing | Ease-Out |
| Formatting | Commas, decimals appear as number transitions |
| Non-numeric | Fade transition for text values |

---

## Widget Motion

| Event | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Widget appear | Fade in + slide up 4px | 300ms | Ease-Out |
| Widget refresh | Content cross-fade (skeleton not needed for refresh) | 200ms | Ease-Out |
| Widget resize (drag) | Content reflows smoothly | During drag | — |
| Widget reorder | Widget slides to new position | 300ms | Ease-Out |
| Widget remove | Fade out + collapse | 200ms | Ease-In |
| Widget add | Appear from bottom | 300ms | Ease-Out |
| Widget expand (full-screen) | Scale up + fade | 300ms | Ease-Out |
| Widget collapse | Scale down + fade | 200ms | Ease-In |

### Widget Content Animation

| Content Type | Appear Animation | Update Animation |
|-------------|-----------------|------------------|
| List | Staggered fade (50ms per item) | Cross-fade |
| Chart | Draw/animate in (400ms) | Smooth transition |
| Stat grid | Staggered appear (50ms per stat) | Value counter |
| Activity feed | Item slide in from bottom | New items push down |
| AI feed | Card fade in | Card appear + stagger |
| Calendar | Grid cells appear | Month transition slide |

---

## Chart Motion

| Event | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Initial draw | Animate from origin to data points | 600ms | Ease-Smooth |
| Data update (new point) | Point appends with slide | 300ms | Ease-Smooth |
| Data update (change) | Points smoothly transition | 400ms | Ease-Smooth |
| Filter apply | Chart transitions to new data | 300ms | Ease-Smooth |
| Hover (data point) | Point highlight + tooltip | 100ms | Ease-Out |
| Focus (data point) | Point highlight + tooltip | 100ms | Ease-Out |
| Legend toggle | Series fades in/out | 200ms | Ease-Out |

### Chart Animation by Type

| Chart Type | Animation Pattern | Duration |
|------------|------------------|----------|
| Line chart | Line draw from left to right | 600ms |
| Area chart | Area fill from bottom to top | 600ms |
| Bar chart | Bars grow from baseline | 400ms (50ms stagger) |
| Pie chart | Segment rotate in from 0° | 400ms |
| Heat map | Cells fill with color | 300ms (stagger) |
| Timeline | Events animate in along timeline | 50ms per event |

### Chart Animation Rules

1. Charts animate on initial load only — subsequent updates use smooth transitions
2. Chart animations are cancellable — user interaction stops animation
3. Tooltip appears with 100ms on hover, disappears with 50ms on leave
4. Chart transitions respect reduced motion — instant data rendering only
5. Multiple data series animate sequentially, not simultaneously

---

## Quick Action Motion

| Event | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Appear | Fade in | 100ms | Ease-Out |
| Hover | Scale 1.05 + background tint | 100ms | Ease-Out |
| Active/Press | Scale 0.95 | 50ms | Ease-Out |
| Focus | 2px ring | 100ms | Ease-Out |

---

## Activity Feed Motion

| Event | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Initial appear | Staggered fade (50ms per item) | 500ms total | Ease-Out |
| New activity | Item slides in from top | 200ms | Ease-Out |
| Activity update | Badge/text update | 200ms | Ease-Out |
| Item hover | Background tint | 100ms | Ease-Out |
| Load more | Items append with fade | 200ms stagger | Ease-Out |

---

## AI Recommendation Card Motion

| Event | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Appear | Fade in + slide up 8px | 300ms | Ease-Out |
| Dismiss | Fade out + slide right | 200ms | Ease-In |
| Accept | Compress + element update | 200ms | Ease-Spring |
| Confidence badge update | Badge transition | 200ms | Ease-Out |
| Hover | Shadow lift | 200ms | Ease-Out |

---

## Dashboard Widget Reordering

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Drag start | Widget scales 1.02, shadow deepens | 100ms | Ease-Out |
| During drag | Widget follows cursor | Variable | — |
| Target area highlight | Drop zone border pulses | 500ms loop | Ease-In-Out |
| Other widgets reflow | Adjacent widgets move to new positions | 300ms | Ease-Out |
| Drop | Widget snaps to position | 200ms | Ease-Spring |
| Drag cancel | Widget returns to original position | 200ms | Ease-Out |

---

## Dashboard Refresh Motion

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Manual refresh trigger | Refresh icon rotates | 1000ms loop | Linear |
| Data reloading | Widget content overlay shimmer | 1500ms | Ease-In-Out |
| Data updated | Content cross-fade | 200ms | Ease-Out |
| Refresh complete | Checkmark briefly appears | 300ms | Ease-Spring |

---

## Dashboard Motion Rules

1. Dashboard content loads in priority order — most important content appears first
2. Stat cards load before charts, charts before AI
3. No more than 3 simultaneous dashboard animations
4. Dashboard auto-refresh uses content cross-fade, never full skeleton reload
5. Dashboard resize/reflow is smooth at 60fps
6. Dashboard animations respect system reduced motion preference
7. Dashboard never auto-plays animations or carousels
8. Widget reorder uses smooth FLIP animation between all affected widgets
9. Dashboard initial load completes in under 2 seconds for critical data
10. AI recommendations are lowest priority — they load progressively after core data

---

*This Dashboard Motion document defines all dashboard-specific motion. Refer to [Loading-System.md](Loading-System.md) for loading patterns, [Feedback-System.md](Feedback-System.md) for feedback animations, and [AI-Interactions.md](AI-Interactions.md) for AI-specific dashboard motion.*
