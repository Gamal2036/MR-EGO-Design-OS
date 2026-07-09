# Feedback System

**Phase:** DP-8 (Interaction & Motion System)
**Design Authority:** DP-1 ([Feedback-System.md](../02-Design-Language/Feedback-System.md)), DP-2 ([Components/Feedback.md](../03-Design-System/Components/Feedback.md))
**Inherits:** All feedback types, timing, and rules from DP-1 and DP-2

---

## Feedback Philosophy

Feedback communicates the result of every user action. Every action produces feedback — success, failure, or progress. Silent failures are unacceptable. Feedback is immediate, clear, and actionable.

---

## Feedback Animation Matrix

| Type | Appear | Dismiss | Duration Active | Notes |
|------|--------|---------|-----------------|-------|
| Toast | Slide + fade 300ms | Fade 200ms | 4-6s auto | Undo available |
| Inline Error | Fade 200ms | Instant | Until fixed | Below input |
| Inline Success | Fade 200ms | Fade 200ms | 2-4s | Optional |
| Banner | Slide down 300ms | Slide up 200ms | Until dismissed | Below header |
| Dialog | Scale + fade 200ms | Scale + fade 150ms | Until actioned | Requires interaction |
| Alert | Scale + fade 200ms | Scale + fade 150ms | Until acknowledged | System-level |
| Tooltip | Fade 200ms (300ms delay) | Fade 150ms | On hover/focus | No action needed |
| Notification | Slide 300ms | Fade 200ms | Configurable | Notification center |

---

## Toast System

### Toast Types

| Type | Icon | Color | Duration | Action |
|------|------|-------|----------|--------|
| Success | Checkmark circle | Success-500 | 4s | Optional undo |
| Error | X circle | Danger-500 | 6s | Optional retry |
| Warning | Warning triangle | Warning-500 | 5s | Optional dismiss |
| Info | Info circle | Primary-500 | 4s | Optional dismiss |

### Toast Animation

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Appear | Slide from right + fade in | 300ms | Ease-Out |
| Dismiss | Fade out + slight slide right | 200ms | Ease-In |
| Stack adjust | Smooth vertical reposition | 200ms | Ease-Out |
| Progress timer | Internal countdown (not visible) | Per type | — |
| Action taken (undo) | Brief compression + checkmark | 200ms | Ease-Spring |

### Toast Stacking Rules

| Rule | Specification |
|------|---------------|
| Maximum visible | 3 toasts |
| Stack position | Vertical, 8px gap |
| Dismiss oldest | New toast causes oldest to dismiss |
| Auto-dismiss order | Oldest first |
| Manual dismiss | Close button or swipe dismiss |
| Hover pauses timer | Auto-dismiss timer pauses on hover |

---

## Inline Feedback

### Form Field Error

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Input border change | Border shifts to Danger-500 | 200ms | Ease-Out |
| Error message appear | Slide down 4px + fade in | 200ms | Ease-Out |
| Error message dismiss | Slide up 4px + fade out | 150ms | Ease-In |
| Input border return | Border shifts to default | 200ms | Ease-Out |

### Form Field Success

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Input border change | Border shifts to Success-500 | 200ms | Ease-Out |
| Checkmark appear | Checkmark scales in | 200ms | Ease-Spring |
| Success indicator dismiss | Checkmark fades out | 200ms | Ease-In |
| Input border return | Border shifts to default | 200ms | Ease-Out |

### Inline Validation

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| User stops typing | Debounce 300ms | — | — |
| Validation starts | Spinner appears (if async) | 200ms | — |
| Validation passes | Checkmark + green border | 200ms | Ease-Spring |
| Validation fails | Error + red border | 200ms | Ease-Out |
| Multiple errors | Staggered appearance (50ms per field) | — | — |

---

## Banner Feedback

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Appear | Slide down from top of content area | 300ms | Ease-Out |
| Content change | Cross-fade | 200ms | Ease-Out |
| Dismiss | Slide up + fade | 200ms | Ease-In |
| Stack (multiple) | Vertical stack, sequential appear | 100ms stagger | — |

---

## Dialog System

### Confirmation Dialog

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Backdrop appear | Opacity 0→1 | 200ms | Ease-Out |
| Content appear | Scale 1.05→1 + opacity 0→1 | 200ms | Ease-Out |
| Content dismiss | Scale 1→0.95 + opacity 1→0 | 150ms | Ease-In |
| Backdrop dismiss | Opacity 1→0 | 150ms | Ease-In |
| Button press (confirm) | Scale 0.97 | 50ms | Ease-Out |

### Alert Dialog

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Backdrop appear | Opacity 0→1 | 200ms | Ease-Out |
| Content appear | Scale 1.05→1 + opacity 0→1 | 200ms | Ease-Out |
| Dismiss | Scale 1→0.95 + fade out | 150ms | Ease-In |

### Warning Dialog

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Backdrop appear | Opacity 0→1 | 200ms | Ease-Out |
| Warning icon appear | Icon pulse in | 300ms | Ease-Out |
| Content appear | Scale 1.05→1 | 200ms | Ease-Out |
| Dismiss | Content + backdrop fade | 150ms | Ease-In |

---

## Notification System

### In-App Notification

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Icon badge update | Badge count scales in | 200ms | Ease-Spring |
| Dropdown open | Notifications slide down | 300ms | Ease-Out |
| New notification appear | Slide into list | 200ms | Ease-Out |
| Notification read | Background tint changes | 200ms | Ease-Out |
| Notification dismiss | Slide out + fade | 200ms | Ease-In |
| Mark all read | All notifications transition | 300ms stagger | — |

### Push Notification

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Banner appear | Slide down from top | 300ms | Ease-Out |
| Auto-dismiss | Slide up + fade | 200ms | Ease-In |
| Action taken | Banner compresses | 200ms | — |

---

## Tooltip System

| Phase | Animation | Duration | Easing |
|-------|-----------|----------|--------|
| Appear delay | 300ms delay before showing | — | — |
| Appear | Fade in + slide 4px | 200ms | Ease-Out |
| Dismiss | Fade out | 150ms | Ease-In |
| Reposition | Smooth position update | 100ms | — |

### Tooltip Rules

1. Tooltips appear with 300ms delay to prevent flicker on accidental hover
2. Tooltips disappear immediately when hover/focus leaves trigger
3. Tooltips positioned relative to trigger (top, bottom, left, right)
4. Tooltips never overflow viewport — auto-reposition
5. Tooltips on touch devices appear on press, not hover

---

## Success Animation

| Type | Animation | Duration | Easing |
|------|-----------|----------|--------|
| Inline checkmark | Circle scale in → checkmark draw | 300ms | Ease-Spring |
| Full success | Icon pulse + message reveal | 500ms | Ease-Out |
| Action complete | Trigger element flash + state change | 300ms | Ease-Out |
| Batch complete | Summary message + stats reveal | 400ms | Stagger |

### Success Animation Rules

1. Success animations are proportional to action importance
2. Saving a field gets a brief checkmark; completing onboarding gets a full celebration
3. Success animations never delay user from next action
4. Success feedback is dismissible before auto-dismiss

---

## Error Animation

| Type | Animation | Duration | Easing |
|------|-----------|----------|--------|
| Inline error | Border color + message appear | 200ms | Ease-Out |
| Toast error | Slide in + icon appear | 300ms | Ease-Out |
| Full error page | Illustration + message | 200ms | Ease-Out |
| Connection error | Subtle indicator, no page change | 200ms | Ease-Out |

### Error Animation Rules

1. Error animations are never celebratory — no spring or bounce
2. Error states appear immediately (no delay)
3. Error messages explain cause and solution
4. Dismissing error returns to previous usable state
5. Error animations respect reduced motion — instant state change only

---

## Feedback State Machine

```
User Action
    │
    ├── Feedback expected < 50ms
    │       │
    │       ├── Success → Action completes → Success feedback (200-500ms)
    │       │
    │       ├── Loading → 100ms-1s skeleton → 1s-5s progress → 5s+ cancel
    │       │
    │       └── Error → Immediate error state → User can retry/dismiss
    │
    ├── No feedback needed
    │       └── Background task → Silent → Toast on completion
    │
    └── Requires confirmation
            └── Dialog → User confirms/cancels → Action or dismiss
```

---

*This Feedback System defines all feedback animations. Refer to [Micro-Interactions.md](Micro-Interactions.md) for component-level feedback, [Loading-System.md](Loading-System.md) for loading states, and [Accessibility-Motion.md](Accessibility-Motion.md) for reduced motion alternatives.*
