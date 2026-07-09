# Loading States — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Version:** 1.0
**Status:** Production Specification
**Inherits:** DP-0 through DP-8, DP-2:Skeleton Component, DP-3:Skeleton Contract, DP-6:Loading Flow, DP-7:Loading Wireframes, DP-8:Skeleton Motion

---

## Purpose

Centralized reference for every loading state across all MR:EGO screens. Defines skeleton patterns, shimmer animation, page loading sequences, AI-specific loading, button loading, and transition loading. Every state is purely visual — no functional code or placeholders.

---

## 1. Skeleton Patterns

### 1.1 Universal Shimmer Animation

| Property | Value |
|----------|-------|
| Animation type | Linear gradient sweep |
| Direction | Left to right (120°) |
| Sweep duration | 1500ms |
| Loop | Infinite |
| Base color | Neutral-200 (light) / Neutral-700 (dark) |
| Shimmer color | Neutral-300 (light) / Neutral-600 (dark) |
| Gradient | `linear-gradient(120deg, Neutral-200 30%, Neutral-300 50%, Neutral-200 70%)` |
| Border radius | Matches target component's radius-sm/md/lg |
| Timing function | ease-in-out |

### 1.2 Card Skeleton

```
┌─────────────────────────────────────────┐
│ ┌─────────────────────────────────────┐ │
│ │ ███████████████████████████████████ │ │  rect: 100% × 120px
│ │ ███████████████████████████████████ │ │  radius-md (8px)
│ └─────────────────────────────────────┘ │
│                                         │
│ ████████████████                         │  line 1: 60% width, 14px height
│ ████████████████████████                 │  line 2: 75% width, 14px height
│ ████████████████████                     │  line 3: 50% width, 14px height
│                                         │
│ ┌──────────────────────┐                │
│ │ ████████████████████ │                │  CTA skeleton: 160px × 36px
│ └──────────────────────┘                │
└─────────────────────────────────────────┘
```

| Element | Type | Dimensions | Radius | Color |
|---------|------|------------|--------|-------|
| Image/header rect | Rect | 100% × 120px | radius-md (8px) | Neutral-200 |
| Text line 1 | Line | 60% × 14px | radius-sm (4px) | Neutral-200 |
| Text line 2 | Line | 75% × 14px | radius-sm (4px) | Neutral-200 |
| Text line 3 | Line | 50% × 14px | radius-sm (4px) | Neutral-200 |
| CTA button | Rect | 160px × 36px | radius-md (8px) | Neutral-200 |

### 1.3 List Skeleton

```
┌─────────────────────────────────────────┐
│ ┌────┐ ████████████████████████         │  item 1
│ │ 40 │ ████████████████████████         │  avatar 40px + 2 lines
│ └────┘ ██████                           │
│                                         │
│ ┌────┐ ████████████████████████         │  item 2 (stagger shimmer)
│ │ 40 │ ████████████████████████         │
│ └────┘ ██████                           │
│                                         │
│ ┌────┐ ████████████████████████         │  item 3
│ │ 40 │ ████████████████████████         │
│ └────┘ ██████                           │
│                                         │
│ ┌────┐ ████████████████████████         │  item 4
│ │ 40 │ ████████████████████████         │
│ └────┘ ██████                           │
└─────────────────────────────────────────┘
```

| Element | Type | Dimensions | Radius | Gap |
|---------|------|------------|--------|-----|
| Avatar circle | Circle | 40×40px | radius-full | — |
| Title line | Line | 65% × 14px | radius-sm | 8px from avatar |
| Subtitle line | Line | 40% × 12px | radius-sm | 4px below title |
| Item spacing | — | — | — | Space-5 (16px) vertical |
| Total items | — | 4 | — | — |

### 1.4 Chart Skeleton

```
┌─────────────────────────────────────────┐
│                                         │
│     ████████████████████████████████    │  circle skeleton (chart area)
│     ██                               ██ │
│   ██     ████████████████████████     ██│
│   ██     ██                         ██  │
│  ██      ██                         ██  │
│  ██      ██                         ██  │
│ ██       ██                         ██  │
│ ████████████████████████████████████████ │
│                                         │
│  ██████████████████████████████████████  │  x-axis skeleton
│                                         │
│  ██   ██   ██   ██   ██   ██   ██   ██ │  y-axis markers
└─────────────────────────────────────────┘
```

| Element | Type | Dimensions | Radius | Notes |
|---------|------|------------|--------|-------|
| Chart circle | Circle | 200×200px | radius-full | Faded, centered |
| Axes lines | Line | horizontal + vertical | — | 2px height/width |
| Data point placeholders | Circle | 8×8px | radius-full | 6–8 points along curve |
| Legend items | Rect | 80×12px | radius-sm | 3 items horizontal |

### 1.5 Table Skeleton

```
┌─────────────────────────────────────────┐
│ ████████ ██████████ ██████████ ████████  │  header row (5 cols)
│ ████████ ██████████ ██████████ ████████  │  16px height each
│─────────────────────────────────────────│  divider
│ ████████ ██████████ ██████████ ████████  │  row 1
│ ████████ ██████████ ██████████ ████████  │  14px height
│─────────────────────────────────────────│
│ ████████ ██████████ ██████████ ████████  │  row 2
│ ████████ ██████████ ██████████ ████████  │
│─────────────────────────────────────────│
│ ████████ ██████████ ██████████ ████████  │  row 3
│ ████████ ██████████ ██████████ ████████  │
│─────────────────────────────────────────│
│ ████████ ██████████ ██████████ ████████  │  row 4
│ ████████ ██████████ ██████████ ████████  │
│─────────────────────────────────────────│
│ ████████ ██████████ ██████████ ████████  │  row 5
│ ████████ ██████████ ██████████ ████████  │
└─────────────────────────────────────────┘
```

| Element | Type | Dimensions | Count |
|---------|------|------------|-------|
| Header cells | Rect | Varies by column | 5 |
| Body rows | Rect | Varies by column | 5 |
| Row height | — | 14px | — |
| Row gap | — | Space-3 (8px) | — |
| Divider | Line | 1px height, Neutral-150 | Between each row |

---

## 2. Page Loading Sequences

### 2.1 Dashboard

| Phase | Element | Skeleton type | Timing | Notes |
|-------|---------|---------------|--------|-------|
| 1 | Topbar | Static (no skeleton) | 0ms | Glass background immediately |
| 2 | Sidebar | Static | 0ms | Navigation renders instantly |
| 3 | Greeting | Text skeleton | 0–400ms | 2 lines |
| 4 | AI Summary | Card skeleton | 100–500ms | 1 card, full width |
| 5 | Stats row | Card skeleton (4) | 200–600ms | 4 cards, each 200px |
| 6 | Content grid | Card skeleton (6) | 300–900ms | Mixed sizes |

**Total loading target:** 1.2s

### 2.2 CV Manager

| Phase | Element | Skeleton type | Timing |
|-------|---------|---------------|--------|
| 1 | Header | Text skeleton | 0–300ms |
| 2 | CV list | List skeleton (4 items) | 0–600ms |
| 3 | Action buttons | Rect skeleton (2) | 200–500ms |
| 4 | Upload zone | Card skeleton | 300–700ms |

**Total loading target:** 1.0s

### 2.3 Job Search

| Phase | Element | Skeleton type | Timing |
|-------|---------|---------------|--------|
| 1 | Search bar | Input skeleton | 0–300ms |
| 2 | Filter panel | List skeleton (6 items) | 0–500ms |
| 3 | Results | Card skeleton (4) | 100–700ms |
| 4 | Pagination | Line skeleton (3) | 400–600ms |

**Total loading target:** 1.0s

### 2.4 Messages

| Phase | Element | Skeleton type | Timing |
|-------|---------|---------------|--------|
| 1 | Conversation list | List skeleton (6) | 0–600ms |
| 2 | Message area | Chat bubbles (4) | 100–700ms |
| 3 | Input bar | Input skeleton | 200–500ms |

**Total loading target:** 800ms

### 2.5 AI Workspace

| Phase | Element | Skeleton type | Timing |
|-------|---------|---------------|--------|
| 1 | Header | Text skeleton | 0–300ms |
| 2 | Chat history | AI skeleton (tinted) | 0–600ms |
| 3 | Input area | Input skeleton | 100–400ms |
| 4 | Suggestion chips | Rect skeleton (4) | 200–500ms |

**Total loading target:** 900ms

### 2.6 Notifications

| Phase | Element | Skeleton type | Timing |
|-------|---------|---------------|--------|
| 1 | Tabs | Line skeleton (5) | 0–300ms |
| 2 | Notification list | List skeleton (6) | 0–700ms |
| 3 | Empty state check | — | 300ms (or show empty) |

**Total loading target:** 800ms

### 2.7 Settings

| Phase | Element | Skeleton type | Timing |
|-------|---------|---------------|--------|
| 1 | Side nav | List skeleton (8) | 0–500ms |
| 2 | Content panel | Card skeleton (3) | 100–600ms |

**Total loading target:** 700ms

---

## 3. Skeleton Specs Reference

| Property | Value |
|----------|-------|
| Shimmer base | Neutral-200 (#E5E7EB) light / Neutral-700 (#374151) dark |
| Shimmer highlight | Neutral-300 (#D1D5DB) light / Neutral-600 (#4B5563) dark |
| Border radius match | Same as content component: card=8px, avatar=full, button=8px, line=4px |
| Height mimic | Skeleton height equals content height |
| Width mimic | Skeleton width equals or approximates content width |
| Animation | `shimmer` 1500ms ease-in-out infinite |
| Reduced motion | `prefers-reduced-motion: reduce` → no animation, static colors |

### Dark Mode Adjustments

| Element | Light | Dark |
|---------|-------|------|
| Base fill | Neutral-200 (#E5E7EB) | Neutral-700 (#374151) |
| Shimmer sweep | Neutral-300 (#D1D5DB) | Neutral-600 (#4B5563) |
| AI tint overlay | rgba(59,130,246,0.04) | rgba(96,165,250,0.06) |

---

## 4. AI Loading States

### 4.1 Thinking Dots

```
┌─────────────────────────────────────────┐
│                                         │
│  MR:EGO is thinking                      │
│                                         │
│  ●  ●  ●                                │
│  (pulsing dots, 2s loop)                │
│                                         │
└─────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Layout | Three dots, 8px apart, horizontally centered |
| Dot size | 6–8px circle |
| Dot color | Primary-500 (#3B82F6) |
| Animation | Opacity pulse: 15% → 100% → 15% |
| Stagger | Dot 1: 0ms, Dot 2: 300ms, Dot 3: 600ms |
| Loop duration | 2000ms total |
| Timing | ease-in-out |
| Container height | 48px |
| Label | "MR:EGO is thinking..." Caption Text-Secondary |

### 4.2 Streaming Text

| Property | Value |
|----------|-------|
| Speed | 30 words per second (wps) |
| Animation | Characters appear one by one |
| Cursor | Blinking vertical bar, 2px, Primary-500, 500ms blink |
| Container | Min height 40px, grows with content |
| Word highlight | Key terms (skills, job titles) fade in at 1.2× speed |

### 4.3 AI Content Skeleton

| Property | Token | Value |
|----------|-------|-------|
| Base color | AI tint | Primary-50 (light) / Primary-900 (dark) |
| Shimmer | — | Lighter shade of tint |
| Border radius | radius-lg | 12px (matches AI content card) |
| Height | — | Varies by content type (analysis = 200px, suggestion = 80px) |
| Width | — | 100% |

---

## 5. Button Loading

```
┌─────────────────────────────────────┐
│  ⟳  Processing...                   │
│  spinner 16px    label Body/500     │
│  disabled state, no pointer events  │
└─────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Spinner | 16×16px, rotating, Primary-500 (or white on primary bg) |
| Spinner animation | rotate 0→360deg, 600ms linear, infinite |
| Label | "Processing..." Body (14px/500) |
| State | Button disabled, cursor not-allowed |
| Text color | Matches button idle state text |
| Timing | On click → immediate, persists until response |
| Width | Fixed (button does not shrink/grow) |
| Transition | 150ms ease from idle to loading |

---

## 6. Input Loading

| Property | Value |
|----------|-------|
| Skeleton type | Single line rect |
| Height | 48px (matches input height) |
| Width | 100% |
| Border radius | radius-md (8px) |
| Color | Neutral-200 |
| Animation | Shimmer sweep 1500ms |

---

## 7. Image Loading

| Property | Value |
|----------|-------|
| Placeholder | Neutral-100 background, Neutral-400 image icon 24px centered |
| Pulse animation | opacity 0.6→1, 1000ms loop, ease-in-out |
| Transition | opacity 0→1, 300ms ease when image loads |
| Border radius | Matches image border radius (varies) |
| Aspect ratio | Preserved via aspect-ratio CSS property |

---

## 8. Transition Loading (Page Navigation)

| Property | Value |
|----------|-------|
| Type | Cross-fade between pages |
| Duration | 300ms |
| Timing | ease-in-out |
| Old page | opacity 1→0, 150ms |
| New page | opacity 0→1, 150ms (starts at 150ms) |
| Skeleton | New page skeleton renders during cross-fade |
| Route change | Triggered immediately on navigation action |
| Animation | Respects prefers-reduced-motion: reduce → instant swap |

---

## 9. Loading States Per Screen (Quick Reference)

| Screen | Primary Skeleton | Secondary Skeleton | Priority |
|--------|------------------|--------------------|----------|
| Dashboard | Card + stats | Text lines | P0 |
| Landing | Hero skeleton | Feature cards | P0 |
| CV Manager | List (4 items) | Upload zone card | P0 |
| Job Search | Card (4 items) | Filter list | P0 |
| Job Details | Card (2 items) | Text lines | P1 |
| Application Tracker | Table (5 rows) | Stat cards | P1 |
| Messages | List (6 items) | Chat bubbles | P0 |
| Notifications | List (6 items) | Tab skeletons | P1 |
| Documents | Card grid (6) | Breadcrumb | P1 |
| Career Progress | Chart | List items | P2 |
| Settings | List (8 items) | Card panels | P2 |
| Profile | Card + avatar | Text lines | P2 |
| Help Center | List (8 items) | Search bar | P2 |
| AI Workspace | Chat history | Input + chips | P0 |

---

## Accessibility

| Requirement | Implementation |
|-------------|---------------|
| Role | `role="status"` or `aria-busy="true"` on container |
| Live region | `aria-live="polite"` on skeleton containers |
| Label | `aria-label="Loading content"` |
| Hidden from AT | `aria-hidden="true"` on skeleton elements (not container) |
| Reduced motion | `prefers-reduced-motion: reduce` → shimmer stops, instant transitions |
| Focus management | Focus maintained on page-level container during loading |
| Screen reader | Announce "Loading complete" when skeletons replaced with content |
| Timer | If loading > 5s, announce "Still loading" via polite live region |

---

## Keyboard Navigation During Loading

| Key | Action |
|-----|--------|
| Tab | Not blocked (but interactive elements are disabled) |
| Escape | Cancel loading (if applicable) — returns to previous state |

---

## Future Expansion

| Feature | Notes |
|---------|-------|
| Progress bar loading | Determinate progress for file uploads |
| Loading states per widget | Individual skeleton vs page skeleton toggle |
| Skeleton variants | Minimal (lines only) vs detailed (full card) |
| AI load time estimates | "Analysis will take ~30 seconds" in AI loading states |
| Custom skeleton patterns | Per-role skeletons (recruiter vs candidate) |
| Skeleton density toggle | Reduced vs full skeleton detail for low-end devices |
