# Interaction System

**Phase:** DP-8 (Interaction & Motion System)
**Design Authority:** DP-1 ([Interaction-Language.md](../02-Design-Language/Interaction-Language.md)), DP-6 ([Interaction-Patterns.md](../06-UX-Architecture/Interaction-Patterns.md))
**Inherits:** All interaction patterns, cursor rules, and state transitions from DP-1 and DP-6

---

## Interaction Philosophy

Every interaction communicates intent from user to system and feedback from system to user. Interactions are natural, predictable, and responsive. The user never wonders if their action was registered.

---

## Core Interaction Rules

1. **Visual feedback within 50ms** — Every user action produces a visible response within 50ms
2. **No dead clicks** — Every clickable element provides feedback, including disabled elements
3. **One interaction mode per element** — Clickable, draggable, or swipeable, never multiple
4. **Touch targets are minimum 44x44px** on all touch devices
5. **No hover-only interactions** — Any action on hover must also be accessible via click/focus
6. **Gestures are optional** — Every swipe action has a button alternative
7. **Disabled states explain why** — Tooltip or adjacent text explains disabled state
8. **Interaction feedback is proportional to action importance**
9. **Same action type uses the same control everywhere**
10. **Same gesture performs the same action everywhere**

---

## Interaction Categories

### 1. Click / Tap

| Element | Visual Response | Duration | Haptic |
|---------|----------------|----------|--------|
| Primary Button | Background darken + scale 0.97 | 50ms | Light tap |
| Secondary Button | Background tint + scale 0.97 | 50ms | Light tap |
| Ghost Button | Background appear + scale 0.97 | 50ms | Light tap |
| Icon Button | Background tint 20% opacity | 50ms | Light tap |
| Card / Row | Background tint | 100ms | None |
| Link | Color change | 100ms | None |
| List item | Background tint | 100ms | None |
| Table row | Row background tint | 100ms | None |
| Chip / Tag | Background darken | 50ms | None |
| Menu item | Background tint + text weight | 100ms | None |

### 2. Touch (Mobile)

| Touch | Response | Duration | Additional |
|-------|----------|----------|------------|
| Tap | Same as click | 50ms | 300ms tap delay eliminated |
| Double-tap | Zoom or action | 300ms | Reserved for content zoom |
| Long press | Context menu | 500ms hold | Haptic on trigger |
| Force touch | Peek preview | 200ms | Device-dependent |

### 3. Hover

| Element | Response | Duration | Notes |
|---------|----------|----------|-------|
| Primary Button | Background shade +1 step | 100ms | Elevation unchanged |
| Secondary Button | Background shade +1 step | 100ms | Elevation unchanged |
| Ghost Button | Background tint | 100ms | No elevation |
| Card | Elevation Layer 1→2, shadow spread | 200ms | Smooth lift |
| Link | Color shift + underline | 100ms | Underline appears |
| Icon Button | Background tint circle | 100ms | Matches icon bounds |
| Table row | Background tint | 100ms | No cursor change |
| List item | Background tint | 100ms | No cursor change |
| Sidebar item | Background tint | 100ms | No elevation change |
| Tooltip trigger | Tooltip appears | 300ms delay | Prevents flicker |
| Dropdown trigger | Arrow rotation | 200ms | Content follows |

### 4. Focus

| Element | Response | Duration | Notes |
|---------|----------|----------|-------|
| Input | Border color + 2px ring | 100ms | Focus ring offset 2px |
| Button | 2px focus ring | 100ms | Matches border-radius + 2px |
| Link | 2px focus ring | 100ms | Outline style |
| Card | 2px focus ring | 100ms | On interactive cards only |
| Tab | 2px focus ring | 100ms | Within tab bounds |
| Select | Border color + 2px ring | 100ms | Matches input style |
| Checkbox / Radio | 2px focus ring | 100ms | Around control |
| Switch | 2px focus ring | 100ms | Around track |
| Any interactive | Visible focus indicator | 100ms | Never `outline: none` without replacement |

### 5. Keyboard

| Key | Response | Duration | Context |
|-----|----------|----------|---------|
| Tab | Focus moves next | 100ms ring | Global |
| Enter | Activate focused | 50ms feedback | All interactive |
| Space | Toggle / Activate | 50ms feedback | Forms, buttons |
| Escape | Dismiss / Close | 150ms | Modals, panels, dropdowns |
| Arrow keys | Navigate options | 100ms | Lists, menus, selects |
| Ctrl+K | Command palette | 300ms open | Global |

### 6. Gesture

| Gesture | Response | Duration | Platform |
|---------|----------|----------|----------|
| Swipe left | Reveal action behind | 200ms | Touch |
| Swipe right | Navigate back / action | 200ms | Touch |
| Pinch | Zoom content | 200ms | Touch |
| Pull to refresh | Progress indicator + reload | 300ms | Touch |
| Drag | Element follows pointer | 100ms | All |
| Drop | Element settles | 200ms spring | All |

### 7. Drag & Drop

| Phase | Response | Duration | Visual |
|-------|----------|----------|--------|
| Drag start | Scale 1.02 + shadow increase | 100ms | Ease-Out |
| During drag | Element follows cursor/pointer | Variable | Original position shows placeholder |
| Over valid target | Target highlight border | 100ms | Border or background tint |
| Over invalid target | No visual change | 0ms | Cursor changes |
| Drop on valid target | Element settles + snap | 200ms | Ease-Spring |
| Drop on invalid target | Element returns | 200ms | Ease-Out |
| Drag cancel | Element returns | 200ms | Ease-Out |

### 8. Upload / File

| Phase | Response | Duration |
|-------|----------|----------|
| File selected | File appears in queue | 100ms |
| Upload start | Progress bar begins | 200ms |
| Progress | Bar updates smoothly | 200ms per segment |
| Complete | Checkmark + highlight | 300ms |
| Error | Red border + message | 100ms |
| Drag over zone | Border highlights (dashed→solid) | 100ms |
| Drag leave | Border returns | 100ms |

---

## State Transition Table

| From | To | Animation | Duration | Easing |
|------|----|-----------|----------|--------|
| Default | Hover | Background tint / elevate | 100ms | Ease-Out |
| Hover | Default | Reverse | 100ms | Ease-Out |
| Default | Focus | Focus ring appear | 100ms | Ease-Out |
| Focus | Blur | Focus ring disappear | 100ms | Ease-Out |
| Default | Active | Scale down + darken | 50ms | Ease-Out |
| Active | Default | Scale up + lighten | 100ms | Ease-Out |
| Enabled | Disabled | Opacity 1→0.4 | 100ms | Ease-Out |
| Disabled | Enabled | Opacity 0.4→1 | 100ms | Ease-Out |
| Visible | Hidden | Opacity 1→0 | 150ms | Ease-In |
| Hidden | Visible | Opacity 0→1 | 200ms | Ease-Out |
| Loading | Loaded | Content cross-fade | 200ms | Ease-Out |
| Error | Normal | Instant | 0ms | — |
| Default | Selected | Background/tint | 200ms | Ease-Out |
| Selected | Default | Reverse | 200ms | Ease-Out |
| Unsaved | Saved | Brief indicator | 300ms | Ease-Spring |

---

## Interaction Mode Matrix

| Input Method | Supported | Primary Feedback | Secondary Feedback |
|-------------|-----------|-----------------|-------------------|
| Mouse | Yes | Visual | Cursor change |
| Touch | Yes | Visual + Haptic | Sound (optional) |
| Keyboard | Yes | Focus ring | ARIA live |
| Screen Reader | Yes | ARIA announcement | Focus management |
| Voice | Yes | Visual + ARIA | Confirmation tone |
| Stylus | Yes | Visual | Haptic |
| Gamepad | Future | Visual | — |

---

## Cursor Map

| Context | Cursor | Notes |
|---------|--------|-------|
| Default (non-interactive) | `default` | Most page content |
| Button | `pointer` | All button variants |
| Link | `pointer` | All links |
| Interactive element | `pointer` | Cards, rows, items |
| Text input | `text` | Inputs, textareas |
| Disabled | `not-allowed` | All disabled elements |
| Loading | `wait` | On loading trigger |
| Draggable | `grab` / `grabbing` | During drag |
| Resizable | `ns-resize` / `ew-resize` | Per direction |
| Movable | `move` | Draggable panels |
| Crosshair | `crosshair` | Data point selection |
| Help | `help` | Tooltip triggers |

---

## Interaction Timing Guarantees

| Event | Feedback Target | Action |
|-------|----------------|--------|
| User clicks/taps | ≤50ms | Visual press response |
| User hovers | ≤100ms | Visual hover response |
| User focuses via keyboard | ≤100ms | Focus ring appears |
| Action completes | ≤200ms | Success/error indication |
| Action takes >1s | ≤1000ms | Loading indicator appears |
| Action takes >5s | ≤5000ms | Progress + cancel option |

---

## Optimistic Update Rules

| Condition | Behavior |
|-----------|----------|
| Toggle state | Update immediately, revert on error |
| Item deletion | Remove from list, show undo |
| Item creation | Add to list with loading state |
| Data submission | Show as pending, update on response |
| Sort/Filter | Apply immediately, revert on error |

---

*This Interaction System defines all user interaction patterns. Refer to [Motion-System.md](Motion-System.md) for timing and easing, [Micro-Interactions.md](Micro-Interactions.md) for component-level details, [Gesture-System.md](Gesture-System.md) for touch gestures, and [Keyboard-Interactions.md](Keyboard-Interactions.md) for keyboard interaction.*
