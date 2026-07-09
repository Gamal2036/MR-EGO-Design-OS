# Offline, Error & Success — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Version:** 1.0
**Status:** Production Specification
**Inherits:** DP-0 through DP-8, DP-2:Alert/Toast Components, DP-3:Alert/Toast Contracts, DP-6:Error Flow, DP-7:Alert Wireframes, DP-8:Alert Motion

---

## Purpose

Complete specification for offline mode, error pages, error states, success pages, and the maintenance page. Every state includes visual design, layout, tokens, accessibility, keyboard navigation, motion, and AI behavior. No functional code or placeholders.

---

## Part 1: Offline State

### 1.1 Offline Banner

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ ⚠  Working offline — showing cached data from 10:32 AM   │  │
│  │                                           [Dismiss] [✕]  │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  (Page content renders below with cached + unavailable widgets)  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

| Property | Token | Value |
|----------|-------|-------|
| Position | Fixed top | Below topbar, z-index 90 |
| Height | — | 44px |
| Background | Warning-50 | rgba(245,158,11,0.08) |
| Border bottom | — | 1px solid Warning-300 (#FCD34D) |
| Text | Body-Small (14px/500) | Warning-700 (#B45309) |
| Icon | ⚠ 16px | Warning-500 (#F59E0B) |
| Dismiss button | Caption (13px/400) | Warning-600, hover underline |
| Close icon | 16×16px | Warning-500 |

### Offline Banner States

| State | Visual |
|-------|--------|
| Visible | Slide down from top, 250ms ease-out |
| Dismissed | Slide up, 200ms ease-in |
| Reconnect | Slide up, fade out 300ms, then content refreshes |

### 1.2 Offline Content Behavior

| State | Behavior |
|-------|----------|
| Cached data available | Widget renders with cached timestamp label |
| No cached data | Widget shows offline icon (cloud-off, 20px Neutral-400) |
| Read-only mode | All interactive inputs disabled, cursor not-allowed |
| Save attempt | Error toast: "Cannot save while offline" |
| Navigation | Cached pages only; new pages show offline state |

### 1.3 Offline AI Behavior

| Element | Behavior |
|---------|----------|
| AI Floating button | Shows badge "AI Unavailable" in amber |
| AI Workspace | Previous responses cached and readable |
| AI input | Disabled with message "AI is unavailable offline" |
| AI chat history | Read-only, cached messages displayed |
| Reconnect | AI re-enables automatically, ongoing requests resume |

### 1.4 Offline Widget States

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌─ CACHED WIDGET ─────────────────────────────────────────────┐ │
│  │ 📊 Job Matches (Cached — 2h old)                            │ │
│  │ Senior Frontend — 92% match                                 │ │
│  │ Staff Engineer — 78% match                                  │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌─ OFFLINE WIDGET ────────────────────────────────────────────┐ │
│  │ ⊘  Applications Widget                                       │ │
│  │ Unavailable offline                                          │ │
│  │ [Retry]                                                      │ │
│  └──────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

| Widget Type | Visual | Interaction |
|-------------|--------|-------------|
| Cached | Normal render + "Cached — [time]" tag | Read-only, no mutations |
| Unavailable | Cloud-off icon + "Unavailable offline" | Retry button (polls connectivity) |
| Partially cached | Partial data + "Some data may be outdated" | Limited interaction |

---

## Part 2: Error Pages

### 2.1 404 — Not Found

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│              ┌────────────────────────────┐                      │
│              │                             │                      │
│              │      404 illustration       │                      │
│              │       160px × 160px         │                      │
│              │                             │                      │
│              └────────────────────────────┘                      │
│                                                                  │
│              Page not found                                     │
│              Heading-2 (28px/650)                               │
│                                                                  │
│              The page you're looking for doesn't exist.         │
│              Body (15px/400), Text-Secondary                    │
│                                                                  │
│                    [Go to Dashboard]                            │
│                    Primary filled, 40px height                  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-2 | 28px/650, Text-Primary |
| Description | Body | 15px/400, Text-Secondary |
| Illustration | — | 160×160px, "lost in space" theme, Primary-500/Neutral-300 |
| CTA | — | "Go to Dashboard", Primary filled |
| Layout | — | Full page centered, min-height 100vh minus topbar |
| Background | Surface-0 | Neutral-50 |

### 2.2 500 — Server Error

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-2 | "Something went wrong" |
| Description | Body | "Our team has been notified. Please try again shortly." |
| Illustration | — | 160×160px, "gear with warning" theme |
| CTA primary | — | "Try Again", Primary filled |
| CTA secondary | — | "Go to Dashboard", Primary outline |
| Auto-refresh | — | Optional countdown: "Retrying in 15s..." |

### 2.3 403 — Access Denied

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-2 | "Access denied" |
| Description | Body | "You don't have permission to view this page." |
| Illustration | — | 160×160px, "locked door" theme |
| CTA | — | "Contact Support", Primary filled |
| Secondary | — | "Go to Dashboard", Primary outline |

### 2.4 Generic Error

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-2 | "Something went wrong" |
| Description | Body | "[Error context from API]" |
| Illustration | — | 120×120px, generic warning |
| CTA | — | "Retry", Primary filled |
| Error ID | — | "Reference: ERR-XXXXX" Caption, Text-Secondary, below description |

---

## Part 3: Inline Error States

### 3.1 Widget Error

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  ⚠  Could not load job recommendations                    │  │
│  │  [Retry]                                           [✕]    │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

| Property | Token | Value |
|----------|-------|-------|
| Background | Surface-1 | #FFFFFF / Neutral-100 |
| Border | — | 1px solid Danger-200 |
| Border radius | radius-md | 8px |
| Padding | Space-5 | 16px |
| Icon | ⚠ 16px | Danger-500 |
| Text | Body-Small (14px/400) | Text-Primary |
| Retry link | Body-Small (14px/500) | Primary-500, hover underline |
| Close | 16×16px | Neutral-400 |

### 3.2 Form Field Error

```
┌──────────────────────────────────────┐
│  ┌────────────────────────────────┐  │
│  │  Input field               │  │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────┐      │
│  │ ⚠ This field is required  │      │
│  └────────────────────────────┘      │
└──────────────────────────────────────┘
```

| Property | Token | Value |
|----------|-------|-------|
| Field border | — | 1.5px solid Danger-500 (#EF4444) |
| Error text | Caption (13px/400) | Danger-600 (#DC2626) |
| Error icon | 14×14px | Danger-500 |
| Spacing (field→error) | Space-2 | 4px |
| Animation | — | Shake 300ms on validation fail |
| Background | — | Danger-50 tint on field |

### 3.3 Toast Error

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────┐     │
│  │ ✕  Failed to save document. [Retry]           5s      │     │
│  │                                    ──── progress bar  │     │
│  └────────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────┘
```

| Property | Token | Value |
|----------|-------|-------|
| Position | Fixed top-right | 24px from top, 24px from right |
| Width | — | 400px (max) |
| Background | Surface-1 | #FFFFFF / Neutral-100 |
| Border left | — | 4px solid Danger-600 (#DC2626) |
| Elevation | Layer 4 | Shadow-4, z-index 6000 |
| Border radius | radius-md | 8px |
| Padding | Space-5 | 16px |
| Icon | ✕ 20px | Danger-500 |
| Message | Body-Small (14px/500) | Text-Primary |
| Action | Body-Small (14px/600) | Primary-500, "Retry" |
| Dismiss | — | Auto-dismiss after 5s, or manual ✕ |
| Progress bar | — | 3px height, Danger-500, animates width 100%→0 over 5s |
| Stack | — | Multiple toasts stack with 8px gap |

### 3.4 API Error Toast

| Property | Token | Value |
|----------|-------|-------|
| Same as Toast Error | — | — |
| Retry action | — | Re-triggers the failed API call |
| Error context | — | Shows field name or operation that failed |
| Duration | — | 8s (longer for API errors) |

---

## Part 4: Success Pages

### 4.1 Registration Success

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│              ┌────────────────────────────┐                      │
│              │          ✓                 │                      │
│              │      64px circle           │                      │
│              │      Success-500 fill      │                      │
│              │      White checkmark       │                      │
│              └────────────────────────────┘                      │
│                                                                  │
│              Account created!                                   │
│              Heading-2 (28px/650)                               │
│                                                                  │
│              Welcome to MR:EGO. Your AI-powered career          │
│              command center is ready.                           │
│                                                                  │
│                    [Go to Dashboard]                            │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

| Property | Token | Value |
|----------|-------|-------|
| Checkmark circle | — | 64×64px, Success-500 (#10B981) |
| Checkmark icon | — | White, 32px |
| Heading | Heading-2 | "Account created!" |
| Description | Body | 15px/400, Text-Secondary |
| CTA | — | "Go to Dashboard", Primary filled |

### 4.2 Application Submitted

| Property | Token | Value |
|----------|-------|-------|
| Checkmark circle | — | 64×64px, Success-500 |
| Heading | Heading-2 | "Application Submitted!" |
| Application ID | Body-Small | "APP-2026-0715-003" Caption, Text-Secondary |
| Next steps | Body | "The employer will review your application. You'll be notified of any updates." |
| CTA primary | — | "View Application Status", Primary filled |
| CTA secondary | — | "Browse More Jobs", Primary outline |
| Confetti | — | Subtle particle animation, 2s, Success-500 dots |

### 4.3 Password Reset Success

| Property | Token | Value |
|----------|-------|-------|
| Checkmark circle | — | 64×64px, Success-500 |
| Heading | Heading-2 | "Password updated!" |
| Description | Body | "Your password has been changed successfully." |
| CTA | — | "Sign In", Primary filled |

### 4.4 CV Upload Success

| Property | Token | Value |
|----------|-------|-------|
| Checkmark circle | — | 64×64px, Success-500 |
| Heading | Heading-3 | "CV uploaded!" |
| Score preview | — | "CV Score: 86/100" with small bar showing score |
| Description | Body-Small | "AI is analyzing your CV for optimization suggestions." |
| CTA primary | — | "View Analysis", Primary filled |
| CTA secondary | — | "Upload Another", Primary outline |

---

## Part 5: Maintenance Page

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│                         MR:EGO                                   │
│                       [Logo 140×32]                              │
│                                                                  │
│              ┌────────────────────────────┐                      │
│              │    Maintenance illustration │                      │
│              │        160px × 160px       │                      │
│              └────────────────────────────┘                      │
│                                                                  │
│              Under Maintenance                                  │
│              Heading-2 (28px/650)                               │
│                                                                  │
│              We'll be back shortly.                             │
│              Our team is working on improvements.               │
│                                                                  │
│              Estimated completion: 2:30 PM UTC                  │
│              Caption (13px/500), Text-Secondary                 │
│                                                                  │
│                    [Check Status →]                             │
│                    Caption (13px/500), Primary-500              │
│                                                                  │
│              © 2026 MR:EGO. All rights reserved.                │
│              Caption (12px/400), Neutral-400                    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

| Property | Token | Value |
|----------|-------|-------|
| Background | Surface-0 | Neutral-50, calm minimal |
| Layout | — | Full viewport centered |
| Logo | — | 140×32px, centered |
| Illustration | — | 160×160px, "under construction / gear", warm tones |
| Heading | Heading-2 | "Under Maintenance" |
| Description | Body | "We'll be back shortly." |
| ETA | Caption | "Estimated completion: [time]" |
| Status link | — | "Check Status →", Primary-500, opens status page |
| Footer | Caption | "© 2026 MR:EGO", Neutral-400 |
| Animation | — | Subtle gear rotation, 10s loop, 15°, pause at ends |

---

## Part 6: Accessibility

| Requirement | Implementation |
|-------------|---------------|
| Offline banner | `role="alert"`, `aria-live="assertive"` |
| Error pages | `<main>` with proper heading hierarchy |
| Error icon | `aria-hidden="true"` (decorative) |
| Toast errors | `role="alert"`, `aria-live="assertive"` |
| Form errors | `aria-describedby` linking input to error message |
| Success pages | `role="status"`, `aria-live="polite"` |
| Focus management | Focus moves to error/success heading on render |
| Skip link | Skip to main content on error pages |
| Color | Error states use both icon + text (not color alone) |
| Maintenance | Status link opens in new tab with `rel="noopener"` |
| Keyboard | All CTAs focusable and activatable via Enter/Space |

---

## Part 7: Keyboard Navigation

| State | Key | Action |
|-------|-----|--------|
| Error page | Tab | Navigate to CTA buttons |
| Error page | Enter/Space | Activate focused CTA |
| Offline banner | Tab | Focus dismiss button |
| Offline banner | Enter/Space | Dismiss banner |
| Toast | — | Auto-dismissed (no focus needed) |
| Form error | Tab | Continues to next field |
| Form error | Shift+Tab | Returns to errored field |
| Success page | Tab | Navigate to CTA |
| Maintenance | Tab | Focus status link |

---

## Part 8: Motion Specification

| Element | Animation | Timing | Easing |
|---------|-----------|--------|--------|
| Offline banner slide in | translateY(-44px)→0 | 250ms | ease-out |
| Offline banner slide out | translateY(0)→(-44px) | 200ms | ease-in |
| Reconnect transition | opacity fade | 300ms | ease |
| Error page illustration | fade in | 400ms | ease-out |
| Error page content | fade in, stagger 50ms | 300ms | ease-out |
| Form error shake | translateX(-4px→4px→0) | 300ms | ease |
| Toast slide in | translateX(100%)→0 | 300ms | cubic-bezier(0.16,1,0.3,1) |
| Toast slide out | translateX(0)→100% | 250ms | ease-in |
| Toast progress bar | width 100%→0 | 5000ms | linear |
| Success checkmark | scale 0→1 with bounce | 400ms | cubic-bezier(0.34,1.56,0.64,1) |
| Success confetti | opacity 0→1→0, scatter | 2000ms | ease-out |
| Maintenance gear | rotate 0→15→0 | 10s | ease-in-out, loop |
| Reduces motion | Respects prefers-reduced-motion | — | All disabled |

---

## Part 9: AI Features in Offline/Error

| Feature | Behavior |
|---------|----------|
| Offline AI | Cached responses readable; new inputs blocked with amber notice |
| Error AI fallback | On 500, AI suggests "Try asking MR:EGO what happened" |
| Error context | AI can explain technical errors in plain language |
| Reconnect AI | AI re-enables automatically, suggests "Resume where you left off?" |
| AI status indicator | Small dot on AI button (green=online, amber=offline, red=error) |

---

## Future Expansion

| Feature | Category | Notes |
|---------|----------|-------|
| Offline mode toggle | Offline | Manual "Work offline" toggle in settings |
| Offline queue | Offline | Queue mutations for sync when online |
| Error reporting dashboard | Error | User-facing error log with timestamps |
| Success share | Success | "Share your success" social integrations |
| Scheduled maintenance countdown | Maintenance | In-app countdown banner before downtime |
| Error recovery suggestions | AI | "We noticed you hit an error — try this workaround" |
| Offline AI model | AI | Slim on-device model for basic offline queries |
| Partial offline mode | Offline | Per-feature offline availability indicator |
