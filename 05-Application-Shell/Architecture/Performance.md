# Architecture — Performance

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Motion-System.md](../../02-Design-Language/Motion-System.md)), DP-2 ([Loading.md](../../03-Design-System/Components/Loading.md))

---

## Purpose

Defines performance budgets and strategies for the application shell — ensuring the workspace loads fast, responds instantly, and stays smooth.

---

## Performance Budgets

| Metric | Budget | Measurement |
|--------|--------|-------------|
| Initial load (TTI) | <2s | Time to interactive on 3G |
| First contentful paint | <1s | First meaningful content |
| Largest contentful paint | <1.5s | Primary content visible |
| Interaction response | <100ms | Response to user input |
| Page transition | <300ms | Time between routes |
| Animation frame | <16ms | 60fps animations |
| First input delay | <50ms | Input responsiveness |
| Time to next paint | <50ms | Visual feedback on action |

---

## Lazy Loading Strategy

| Element | Strategy | Trigger |
|---------|----------|---------|
| Sidebar items | Eager (always visible) | App mount |
| Header controls | Eager | App mount |
| Primary content | Route-based code splitting | Route change |
| Secondary region | Lazy component | When region becomes visible |
| Context region | Lazy component | When item is selected |
| AI region | Lazy component + preconnect | On first interaction or hover |
| Inspector region | Lazy component | When item is selected |
| Floating panels | Lazy component | On panel open |
| Modal dialogs | Lazy component | On modal trigger |
| Charts | Dynamic import | When chart section scrolls into view |
| Data tables | Virtual scrolling | When data exceeds 100 rows |

---

## Region Rendering Strategy

| Region | Render Strategy |
|--------|----------------|
| Header | Eager, persistent (never unmounts) |
| Sidebar | Eager, persistent |
| Primary | Route-based, eager for current route |
| Secondary | Mounted when visible, lazy |
| Context | Mounted when triggered, cached |
| AI | Mounted on first open, then persistent |
| Inspector | Mounted on first open, preserved in background |
| Floating | Mounted on open, unmounted on close |
| Modal | Mounted on open, unmounted on close |

---

## Virtualization Strategy

| Component | Virtualization |
|-----------|---------------|
| Lists | Virtual scroll for 100+ items |
| DataGrid | Virtual rows + columns |
| Chat messages | Virtual scroll for 100+ messages |
| Activity feed | Virtual scroll for 50+ items |
| Search results | Virtual scroll for 50+ results |

---

## Animation Budget

| Category | Budget | Notes |
|----------|--------|-------|
| CSS transitions | Unlimited | GPU-accelerated |
| CSS animations | 3 concurrent max | Skeleton, spinner, progress |
| JS animations | 1 concurrent | User-initiated only |
| Page transitions | 1 concurrent | Route change |
| Web Animations API | Use sparingly | For complex keyframes |

---

## Memory Budget

| Context | Budget | Notes |
|---------|--------|-------|
| DOM nodes | <3000 | Total in viewport at any time |
| JS heap | <50MB | Active workspace |
| Cache storage | <50MB | Service worker cache |
| localStorage | <5MB | User preferences |
| IndexedDB | <500MB | Offline data (per module) |

---

## Performance Rules

| Rule | Description |
|------|-------------|
| Code splitting | Each route loads only its own code |
| Tree shaking | Dead code is removed at build time |
| Image optimization | Images are lazy-loaded, resized, and compressed |
| CSS containment | Apply `contain: layout style paint` to offscreen regions |
| Debounced resize | Resize handlers are debounced at 200ms |
| RAF for animations | Use `requestAnimationFrame` for JS animations |
| Passive event listeners | All scroll/touch event listeners are passive |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Workspace/Scrolling-Rules.md](../Workspace/Scrolling-Rules.md) | Scroll performance |
| [States/Loading.md](../States/Loading.md) | Loading state performance |

---

*Performance budgets ensure the workspace is fast for every user, on every device, under every condition.*
