# Gesture System

**Phase:** DP-8 (Interaction & Motion System)
**Design Authority:** DP-1 ([Interaction-Language.md](../02-Design-Language/Interaction-Language.md)), DP-6 ([Interaction-Patterns.md](../06-UX-Architecture/Interaction-Patterns.md) — Pattern 12)
**Inherits:** Gesture patterns from DP-1 and DP-6

---

## Gesture Philosophy

Gestures complement button-based interactions. Every gesture has a button alternative. Gestures feel physical and natural — they follow real-world expectations for momentum, friction, and snap.

---

## Supported Gestures

| Gesture | Platform | Action |
|---------|----------|--------|
| Tap | All | Primary action, selection |
| Double tap | All | Zoom, expand, like |
| Long press | Touch | Context menu, multi-select |
| Swipe left | Touch | Reveal actions, dismiss |
| Swipe right | Touch | Back navigation, reveal |
| Swipe up | Touch | Open sheet, show more |
| Swipe down | Touch | Close sheet, pull to refresh |
| Pinch in | Touch | Zoom out, collapse |
| Pinch out | Touch | Zoom in, expand |
| Drag | All | Move, reorder, resize |
| Pull to refresh | Touch | Reload content |
| Force press | iOS | Peek, quick action |
| Rotate | Touch | Rotate content |
| Pan | Touch | Scroll, move canvas |

---

## Gesture Specifics

### Tap

| Property | Value |
|----------|-------|
| Touch down | Visual press response (50ms) |
| Touch up | Action fires, visual release |
| Cancel | Touch moves outside element |
| Double-tap interval | 300ms max between taps |
| Haptic | Light (optional) |

### Long Press

| Property | Value |
|----------|-------|
| Trigger delay | 500ms hold |
| Visual feedback | Element background darkens after 300ms |
| Cancel | Move finger before 500ms |
| Result | Context menu or multi-select mode |
| Haptic | Medium impact on trigger |

### Swipe

| Direction | Action | Threshold | Visual |
|-----------|--------|-----------|--------|
| Left | Dismiss / Reveal action | 30% of item width | Item follows finger |
| Right | Back / Reveal action | 30% of item width | Item follows finger |
| Up | Open sheet / Show more | 50px | Content peeks |
| Down | Close sheet / Refresh | 50px (sheet) / 80px (refresh) | Sheet follows finger |

### Swipe Properties

| Property | Value |
|----------|-------|
| Tracking | Item follows finger position exactly |
| Resistance | Increases at edge of swipe area |
| Threshold | 30% of container for action trigger |
| Velocity snap | Fast swipe past threshold = complete action |
| Spring back | Below threshold = return to origin |
| During animation | 200ms snap, Ease-Out |

### Pinch

| Property | Value |
|----------|-------|
| Content | Images, charts, canvases |
| Min scale | 1x (no zoom out below default) |
| Max scale | 3x (images), 2x (charts) |
| Animation | Smooth scaling during pinch |
| Snap | Returns to 1x if below 1.25x |
| Double-tap zoom | Toggle between 1x and 2x (300ms) |

### Drag

| Property | Value |
|----------|-------|
| Element | Draggable items, panels, widgets |
| Start | 100ms hold before drag activates |
| Visual | Scale 1.02 + shadow increase (100ms) |
| Tracking | Element follows pointer/finger |
| Placeholder | Vacated position shows insert indicator |
| Drop | Snap to position (200ms, Ease-Spring) |
| Cancel | Return to origin (200ms, Ease-Out) |

### Pull to Refresh

| Property | Value |
|----------|-------|
| Trigger | Pull down at scroll position 0 |
| Threshold | 80px pull distance |
| Visual | Top content reveals refresh indicator |
| During pull | Content follows finger with resistance |
| At threshold | Indicator activates, spinner appears |
| On release | Content springs back, refresh starts |
| Refresh animation | Spinner (1000ms loop) |
| Complete | Content updates, indicator fades |
| Duration | 300ms spring back |

---

## Gesture-Enabled Elements

| Element | Gestures | Alternative |
|---------|----------|-------------|
| List item | Swipe left (reveal), Swipe right (action) | Long press menu |
| Card | Drag (reorder), Tap (navigate) | Keyboard reorder buttons |
| Image | Pinch (zoom), Double-tap (zoom toggle) | Zoom buttons |
| Sheet | Swipe down (dismiss), Drag handle | Close button |
| Dashboard widget | Drag (reorder) | Widget menu → reorder |
| Slider | Pan (adjust value) | Keyboard arrows |
| Carousel | Swipe (navigate), Tap indicator dots | Arrow buttons |
| Map | Pan (scroll), Pinch (zoom) | Zoom +/- buttons |
| Canvas | Pan (move view), Pinch (zoom) | Toolbar buttons |
| Page | Swipe right (back navigation) | Back button |

---

## Gesture Feedback

| Gesture Phase | Visual | Haptic | Timing |
|---------------|--------|--------|--------|
| Touch start | Element response | Light tap | ≤50ms |
| Gesture progress | Element follows input | Continuous (optional) | Real-time |
| Threshold reached | Indicator activates | Medium impact | At threshold |
| Action triggered | Completion animation | Light tap | ≤100ms |
| Action cancelled | Return to origin | None | 200ms |
| Gesture ends | Snap/Spring | Light tap | 200ms |

---

## Gesture Accessibility

| Requirement | Specification |
|-------------|---------------|
| Button alternative | Every gesture has a button equivalent |
| No gesture-only actions | Actions are never gesture-exclusive |
| Gesture discovery | Tooltip hint for gesture availability |
| Large thresholds | Gesture thresholds accommodate motor impairments |
| Adjustable thresholds | User can reduce gesture sensitivity |
| Gesture cancellation | User can cancel gesture before threshold |
| Screen reader | Gesture actions announced via ARIA |

---

## Gesture Rules

1. Every gesture has a button or keyboard alternative
2. Gestures are disabled when assistive technology is active (optional)
3. Gesture thresholds are generous (30%+) to prevent accidental triggers
4. Gestures never conflict with system gestures (e.g., iOS back swipe)
5. Swipe-to-dismiss includes undo option via toast
6. Long press timing is adjustable in accessibility settings
7. Drag targets snap to valid positions only
8. Multi-touch gestures are secondary to single-touch interactions
9. Gesture feedback is immediate — visual and (optional) haptic
10. No gesture requires simultaneous multi-finger input for primary actions

---

*This Gesture System defines all touch gesture specifications. Refer to [Interaction-System.md](Interaction-System.md) for core interaction rules, [Keyboard-Interactions.md](Keyboard-Interactions.md) for keyboard alternatives, and [Accessibility-Motion.md](Accessibility-Motion.md) for accessibility requirements.*
