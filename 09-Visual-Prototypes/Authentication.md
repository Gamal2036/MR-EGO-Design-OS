# Authentication — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Status:** Complete Production Specification
**Inherits:** DP-7:Authentication, DP-8:All (Motion, Interaction, Loading), DP-6:Screen (Authentication), DP-1:All
**Engineer Handoff:** Ready — no design decisions remaining

---

## 1. Purpose

Authenticate existing users (Login), register new users (Register), and handle password recovery (Forgot Password 2-step + Password Reset). Clean, focused, single-task screens with minimal chrome, centered card layout, and decorative background illustration. No sidebar. No authenticated navigation.

---

## 2. Shared Visual Composition

```
┌──────────────────────────────────────────────────────────────────────┐
│  TOP BAR (56px glass)                                                │
│  [Logo 140x32]                                    [Help ▸]          │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                     ┌──────────────────────────────────┐             │
│                     │  CARD (440px max, centered)      │             │
│                     │  ┌────────────────────────────┐  │             │
│                     │  │  [Icon] (optional per page) │  │             │
│                     │  │  Heading (Heading-2/3)     │  │             │
│                     │  │  Subtitle (Body-Small)     │  │             │
│                     │  ├────────────────────────────┤  │             │
│                     │  │  Form fields (stacked)     │  │             │
│                     │  │  [Field 1 — 40px h]        │  │             │
│                     │  │  [Field 2 — 40px h]        │  │             │
│                     │  │  [Options row]             │  │             │
│                     │  │  [Primary CTA — full width] │  │             │
│                     │  │  [Divider]                 │  │             │
│                     │  │  [Social buttons row]      │  │             │
│                     │  │  [Footer link]             │  │             │
│                     │  └────────────────────────────┘  │             │
│                     └──────────────────────────────────┘             │
│                                                                      │
│  Background: Decorative illustration/pattern (behind card, subtle)    │
└──────────────────────────────────────────────────────────────────────┘
```

### Shared Card Specification (All Auth Screens)

| Property | Value |
|----------|-------|
| Max width | 440px |
| Positioning | Vertically + horizontally centered |
| Margin top | Space-13 (96px) from top bar |
| Padding | Space-8 (32px) all sides |
| Radius | radius-md (8px) |
| Background | Surface-1 (#FFFFFF) |
| Shadow | Shadow-2 (0 4px 24px rgba(0,0,0,0.08)) |
| z-index | Elevation-2 |

### Shared Top Bar

| Property | Value |
|----------|-------|
| Type | Fixed glass bar |
| Height | 56px |
| Background | rgba(255,255,255,0.72) + backdrop-filter blur(12px) |
| Border | 1px solid rgba(0,0,0,0.06) |
| z-index | Elevation-4 |

**Top bar elements:**

| Side | Element | Size | Spacing |
|------|---------|------|---------|
| Left | Logo | 140px x 32px | Space-3 from left |
| Right | "Help?" text link | Auto | Space-8 from right |

### Shared Background

| Property | Value |
|----------|-------|
| Type | Decorative illustration (abstract geometric/network pattern) |
| Opacity | 0.15 |
| Position | Right side / behind card |
| Color | Primary-500 tinted |
| Responsive | Hidden on mobile, subtle on tablet, full on desktop |

### Input Field Anatomy (Shared — All Screens)

```
┌──────────────────────────────────────┐
│  Label (Body-Small, 14px, 500w)     │  ← Space-2 (4px) above field
│  ┌──────────────────────────────────┐│
│  │  12px pad        [icon 20x20]   ││
│  │  [placeholder / value]          ││
│  │  40px height / radius-sm        ││
│  └──────────────────────────────────┘│
│  Error text (Caption, Danger-500)    │  ← Space-2 (4px) below field
└──────────────────────────────────────┘
```

| Element | Default | Focus | Error | Disabled |
|---------|---------|-------|-------|----------|
| Border | 1px solid Neutral-300 | 1px solid Primary-500 | 1px solid Danger-500 | 1px solid Neutral-200 |
| Background | Surface-1 | Surface-1 | Surface-1 | Neutral-50 |
| Ring | none | 2px solid Primary-200 (offset 0) | 2px solid Danger-200 | none |
| Text | Text-Primary | Text-Primary | Text-Primary | Text-Disabled (Neutral-400) |
| Icon | Text-Secondary | Primary-500 | Danger-500 | Neutral-300 |
| Transition | — | border 150ms, ring 150ms | border 150ms | — |

### Primary Button Anatomy (Shared)

```
┌──────────────────────────────────────┐
│                                      │
│   14px/600 weight / 44px height     │
│   Width: 100% (card - 2x padding)   │
│   Background: Primary-600           │
│   Text: White                       │
│   Radius: radius-md (8px)           │
│   Shadow: Shadow-1                  │
│                                      │
└──────────────────────────────────────┘
```

| State | Background | Text | Shadow |
|-------|------------|------|--------|
| Default | Primary-600 | White | Shadow-1 |
| Hover | Primary-700 (#1D4ED8) | White | Shadow-2 |
| Active | Primary-800 (#1E40AF) | White | Shadow-1 |
| Disabled | Neutral-200 | Neutral-400 | None |
| Loading | Primary-600 | White | Shadow-1 |

---

## 3. Screen: Login

### Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  LOGO TOP BAR                                                        │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│         ┌──────────────────────────────────────────────┐             │
│         │                                              │             │
│         │         [Logo 140x32]                        │             │
│         │                                              │             │
│         │         Welcome back                         │             │
│         │         Sign in to your account              │             │
│         │                                              │             │
│         │  ┌────────────────────────────────────────┐  │             │
│         │  │ Email                                  │  │             │
│         │  │ [name@company.com]                     │  │             │
│         │  └────────────────────────────────────────┘  │             │
│         │                                              │             │
│         │  ┌────────────────────────────────────────┐  │             │
│         │  │ Password                    [👁]       │  │             │
│         │  │ [·············]                        │  │             │
│         │  └────────────────────────────────────────┘  │             │
│         │                                              │             │
│         │  ☐ Remember me          Forgot password?    │             │
│         │                                              │             │
│         │  [══════ Sign In ═══════════════════════]    │             │
│         │                                              │             │
│         │  ──────── or continue with ────────         │             │
│         │    [G]   [A]   [M]                          │             │
│         │                                              │             │
│         │  Don't have an account?  Sign up            │             │
│         └──────────────────────────────────────────────┘             │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Elements (exact stacking)

| Layer | Element | Token | Size/Color | Bottom space |
|-------|---------|-------|------------|--------------|
| 1 | Centered logo | — | 140px x 32px | Space-7 (24px) |
| 2 | "Welcome back" | Heading-2 | 28px/650/1.2, Text-Primary | Space-2 (4px) |
| 3 | "Sign in to your account" | Body-Small | 14px/400/1.5, Text-Secondary | Space-8 (32px) |
| 4 | Email input | — | 40px h, full width | Space-6 (20px) |
| 5 | Password input | — | 40px h, full width | Space-4 (12px) |
| 6 | Options row (Remember + Forgot) | — | Flex, space-between | Space-7 (24px) |
| 7 | "Sign In" primary button | Button-Primary | 44px h, full width | Space-7 (24px) |
| 8 | Divider "or continue with" | — | — | Space-5 (16px) |
| 9 | Social buttons row | — | 3 x 40x40px | Space-7 (24px) |
| 10 | Footer "Don't have an account? Sign up" | Body-Small | 14px/400, center | 0 |

### Options Row Details

| Element | Left | Right |
|---------|------|-------|
| Text | "Remember me" | "Forgot password?" |
| Type | Checkbox (16x16px) + Label (14px/400) | Text-Link (14px/600) |
| Color | Text-Secondary | Primary-600 |
| Behavior | Persists session | Navigates to Forgot Password |

### Social Buttons Details

| Button | Icon | aria-label |
|--------|------|------------|
| Google | Google logo (20x20px) | "Sign in with Google" |
| Apple | Apple logo (20x20px) | "Sign in with Apple" |
| Microsoft | Microsoft logo (20x20px) | "Sign in with Microsoft" |

| Property | Value |
|----------|-------|
| Button size | 40px x 40px |
| Radius | radius-sm (6px) |
| Border | 1px solid Neutral-300 |
| Background | Surface-1 |
| Hover bg | Neutral-100 |
| Active bg | Neutral-200 |
| Gap | Space-3 (8px) |
| Layout | Flex row, center, Space-3 gap |

### States — Login

| State | Visual | Behavior |
|-------|--------|----------|
| Default | Empty form, outlined fields, button disabled (gray) | Button enabled only when email valid + password >= 1 char |
| Focus (email) | Primary-500 border, Primary-200 ring (2px) | — |
| Typing | Live validation on blur | Instant field-level feedback |
| Error (email) | Danger-500 border, Danger-200 ring, "Please enter a valid email" below | Inline error message |
| Error (password) | Danger-500 border, "Incorrect password. Try again." + "Forgot?" link | Inline error |
| Submitting | Button → spinner (16px, white) + "Signing in...", inputs disabled | All fields set `disabled`, button pointer-events none |
| Success | — | Redirect to Dashboard (no success state on this screen) |
| Server error | Toast: "Could not sign in. Check your credentials." (bottom center, 4000ms) | Retry |
| Network error | Toast: "No internet connection" (3000ms) | Auto-retry on reconnect |
| Rate limit | Card error: "Too many attempts. Try again in [N] seconds." (countdown) | Timer on card |

### Validation Rules — Login

| Field | Rule | Error message |
|-------|------|---------------|
| Email | Required, valid email regex | "Please enter a valid email" |
| Password | Required, min 1 char | "Please enter your password" |
| Form | All fields valid | Button enabled |

---

## 4. Screen: Register

### Layout

Identical card layout to Login. Different form fields.

```
┌──────────────────────────────────────────────────────────────────────┐
│         ┌──────────────────────────────────────────────┐             │
│         │                                              │             │
│         │         [Logo 140x32]                        │             │
│         │                                              │             │
│         │         Create your account                  │             │
│         │         Start your career transformation     │             │
│         │                                              │             │
│         │  ┌────────────────────────────────────────┐  │             │
│         │  │ Full Name                              │  │             │
│         │  │ [Jane Doe]                             │  │             │
│         │  └────────────────────────────────────────┘  │             │
│         │                                              │             │
│         │  ┌────────────────────────────────────────┐  │             │
│         │  │ Email                                  │  │             │
│         │  │ [jane@company.com]                     │  │             │
│         │  └────────────────────────────────────────┘  │             │
│         │                                              │             │
│         │  ┌────────────────────────────────────────┐  │             │
│         │  │ Password                    [👁]       │  │             │
│         │  │ [·············]                        │  │             │
│         │  │ [██░░░░░░░░]  Weak                     │  │             │
│         │  └────────────────────────────────────────┘  │             │
│         │                                              │             │
│         │  ┌────────────────────────────────────────┐  │             │
│         │  │ Confirm Password            [👁]       │  │             │
│         │  │ [·············]                        │  │             │
│         │  └────────────────────────────────────────┘  │             │
│         │                                              │             │
│         │  ☐ I agree to the Terms of Service          │             │
│         │                                              │             │
│         │  [════ Create Account ═══════════════]       │             │
│         │                                              │             │
│         │  ──────── or continue with ────────         │             │
│         │    [G]   [A]   [M]                          │             │
│         │                                              │             │
│         │  Already have an account?  Sign in          │             │
│         └──────────────────────────────────────────────┘             │
└──────────────────────────────────────────────────────────────────────┘
```

### Elements (stacking)

| Layer | Element | Token | Bottom space |
|-------|---------|-------|--------------|
| 1 | Logo | — | Space-7 (24px) |
| 2 | "Create your account" | Heading-2 | Space-2 (4px) |
| 3 | "Start your career transformation" | Body-Small, Text-Secondary | Space-8 (32px) |
| 4 | Full Name input | 40px h | Space-6 (20px) |
| 5 | Email input | 40px h | Space-6 (20px) |
| 6 | Password input + strength indicator | 40px h | Space-6 (20px) |
| 7 | Confirm Password input | 40px h | Space-5 (16px) |
| 8 | Terms checkbox | 16px checkbox + Label (14px) | Space-7 (24px) |
| 9 | "Create Account" button | Button-Primary | Space-7 (24px) |
| 10 | Divider | — | Space-5 (16px) |
| 11 | Social buttons row | 3 x 40x40px | Space-7 (24px) |
| 12 | Footer "Already have an account? Sign in" | Body-Small | 0 |

### Password Strength Indicator

| Property | Value |
|----------|-------|
| Position | Below password input, top Space-2 (4px) |
| Height | 4px |
| Width | 100% of input |
| Radius | radius-xs (2px) |
| Track bg | Neutral-200 |
| Label | Body-Small (13px), right-aligned, above bar |

| Strength | Color | Label | Bar width |
|----------|-------|-------|-----------|
| Empty (no input) | Neutral-200 | "" | 0 |
| Weak (< 6 chars) | Danger-500 (#EF4444) | "Weak" | 25% |
| Medium (6-9 chars, mixed) | Warning-500 (#F59E0B) | "Medium" | 60% |
| Strong (10+ chars, mixed + special) | Success-500 (#10B981) | "Strong" | 100% |

### States — Register

| State | Visual | Behavior |
|-------|--------|----------|
| Default | Empty form, all fields outlined | Button disabled |
| Focus | Primary ring on active field | — |
| Typing | Live strength indicator updates (200ms debounce) | — |
| Field error | Inline message per field | See validation rules |
| Password mismatch | "Passwords do not match" inline error on Confirm field | — |
| Submitting | Button spinner + "Creating account...", all fields disabled | — |
| Success | — | Redirect to Email Verification or Dashboard |
| Email taken | Card error: "An account with this email already exists." + "Sign in instead?" link | — |
| Server error | Toast: "Could not create account. Please try again." | Retry |
| Terms unchecked | Checkbox error: "You must agree to the terms" | Inline |

### Validation Rules — Register

| Field | Rule | Error message |
|-------|------|---------------|
| Full Name | Required, min 2 chars, max 100 | "Please enter your full name" |
| Email | Required, valid email format | "Please enter a valid email" |
| Password | Required, min 8 chars | "Password must be at least 8 characters" |
| Confirm Password | Required, must match Password | "Passwords do not match" |
| Terms | Must be checked | "You must agree to the Terms of Service" |

---

## 5. Screen: Forgot Password — Step 1 (Request Reset)

### Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│         ┌──────────────────────────────────────────────┐             │
│         │                                              │             │
│         │       [48px key/lock icon container]         │             │
│         │         (Primary-50 bg, radius 12px)         │             │
│         │                                              │             │
│         │         Forgot password?                     │             │
│         │         Enter your email and we'll send      │             │
│         │         you a reset link.                    │             │
│         │                                              │             │
│         │  ┌────────────────────────────────────────┐  │             │
│         │  │ Email                                  │  │             │
│         │  │ [name@company.com]                     │  │             │
│         │  └────────────────────────────────────────┘  │             │
│         │                                              │             │
│         │  [════ Send Reset Link ════════════════]     │             │
│         │                                              │             │
│         │         ← Back to Sign In                    │             │
│         └──────────────────────────────────────────────┘             │
└──────────────────────────────────────────────────────────────────────┘
```

### Elements

| Layer | Element | Token | Bottom space |
|-------|---------|-------|--------------|
| 1 | Icon container (48px, radius 12px, Primary-50 bg, Primary-600 icon) | — | Space-5 (16px) |
| 2 | "Forgot password?" | Heading-3 (22px/600) | Space-2 (4px) |
| 3 | "Enter your email and we'll send you a reset link" | Body-Small, Text-Secondary | Space-8 (32px) |
| 4 | Email input | 40px h | Space-7 (24px) |
| 5 | "Send Reset Link" button | Button-Primary, full width | Space-5 (16px) |
| 6 | "← Back to Sign In" | Text-Link, Body-Small, centered | 0 |

### States — Forgot Step 1

| State | Behavior |
|-------|----------|
| Default | Empty email field, button disabled |
| Valid email | Button enabled |
| Submitting | Button spinner + "Sending...", email disabled |
| Email not found | Inline: "No account found with this email. Sign up instead?" + link |
| Success | Transition to Step 2 (crossfade 300ms) |
| Server error | Toast: "Could not send reset email. Try again." |
| Network error | Toast: "No internet connection" |

---

## 6. Screen: Forgot Password — Step 2 (Check Email)

### Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│         ┌──────────────────────────────────────────────┐             │
│         │                                              │             │
│         │       [64px mail illustration]               │             │
│         │                                              │             │
│         │         Check your email                     │             │
│         │         We sent a reset link to              │             │
│         │         jane@company.com                     │             │
│         │         It expires in 1 hour.                │             │
│         │                                              │             │
│         │         [ Open Email App ▸  ]                │             │
│         │                                              │             │
│         │         Didn't receive it?  Send again       │             │
│         │                                              │             │
│         │         ← Back to Sign In                    │             │
│         └──────────────────────────────────────────────┘             │
└──────────────────────────────────────────────────────────────────────┘
```

### Elements

| Layer | Element | Token | Bottom space |
|-------|---------|-------|--------------|
| 1 | Mail illustration | 64px, decorative, Primary-500 tint | Space-5 (16px) |
| 2 | "Check your email" | Heading-3 (22px/600) | Space-2 (4px) |
| 3 | "We sent a reset link to [email]. It expires in 1 hour." | Body-Small, Text-Secondary | Space-8 (32px) |
| 4 | "Open Email App" button | Button-Primary with mail icon, auto-width | Space-5 (16px) |
| 5 | "Didn't receive it? Send again" | Body-Small, link "Send again" + cooldown | Space-5 (16px) |
| 6 | "← Back to Sign In" | Text-Link, Body-Small | 0 |

### States — Forgot Step 2

| State | Behavior |
|-------|----------|
| Default | Display email, "Send again" link active |
| Open Email App click | Opens default mail client (mailto:) |
| Send again click | 30s cooldown, shows countdown "Resend in 28s", re-sends after countdown |
| Resend success | Toast: "Reset link sent!" |
| Resend error | Toast: "Could not resend. Try again." |
| Email expired | Link expired error if > 1h since request |

---

## 7. Screen: Password Reset

### Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│         ┌──────────────────────────────────────────────┐             │
│         │                                              │             │
│         │         Set new password                     │             │
│         │         Must be at least 8 characters        │             │
│         │                                              │             │
│         │  ┌────────────────────────────────────────┐  │             │
│         │  │ New Password                 [👁]     │  │             │
│         │  │ [·············]                        │  │             │
│         │  │ [████░░░░░░]  Medium                  │  │             │
│         │  └────────────────────────────────────────┘  │             │
│         │                                              │             │
│         │  ┌────────────────────────────────────────┐  │             │
│         │  │ Confirm New Password          [👁]     │  │             │
│         │  │ [·············]                        │  │             │
│         │  └────────────────────────────────────────┘  │             │
│         │                                              │             │
│         │  [═════ Reset Password ════════════════]     │             │
│         │                                              │             │
│         │         ← Back to Sign In                    │             │
│         └──────────────────────────────────────────────┘             │
└──────────────────────────────────────────────────────────────────────┘
```

### Elements

| Layer | Element | Token | Bottom space |
|-------|---------|-------|--------------|
| 1 | "Set new password" | Heading-3 | Space-2 (4px) |
| 2 | "Must be at least 8 characters" | Body-Small, Text-Secondary | Space-8 (32px) |
| 3 | New Password input + strength bar | 40px h | Space-6 (20px) |
| 4 | Confirm Password input | 40px h | Space-7 (24px) |
| 5 | "Reset Password" button | Button-Primary, full width | Space-5 (16px) |
| 6 | "← Back to Sign In" | Text-Link, Body-Small | 0 |

### States — Password Reset

| State | Behavior |
|-------|----------|
| Default | Both empty, button disabled |
| Valid | Both match + strength >= Medium, button enabled |
| Submitting | Button spinner + "Resetting...", fields disabled |
| Success | Toast + redirect to Login after 1500ms |
| Invalid/expired link | Card error: "This reset link has expired. Request a new one." + link |
| Password mismatch | Inline error on Confirm field |
| Weak password | Inline: "Password is too weak. Add more characters or variety." |
| Server error | Toast: "Could not reset password. Try again." |

---

## 8. Shared Transition Specifications

| Transition | Trigger | Duration | Easing |
|------------|---------|----------|--------|
| Card entrance (page load) | Initial render | 400ms | ease-out |
| Step 1 → Step 2 (Forgot) | Submit success | 300ms crossfade | ease-in-out |
| Redirect to Login (reset) | Success + 1500ms delay | 300ms fade out | ease-in |
| Error appearance | Validation/server error | 200ms | ease-out |
| Toast | Show/hide | 300ms slide up, 300ms fade | ease-out |
| Focus ring | Focus event | 150ms | ease-out |
| Strength bar update | Keystroke (200ms debounce) | 200ms width transition | ease-out |

### Card Entrance Animation

| Element | Delay | Duration | Initial state |
|---------|-------|----------|---------------|
| Card container | 50ms | 400ms | translateY(20px), opacity 0 |
| Logo | 150ms | 300ms | opacity 0 |
| Heading | 200ms | 300ms | translateY(10px), opacity 0 |
| Subtitle | 250ms | 300ms | translateY(10px), opacity 0 |
| Form fields | 300ms (stagger 50ms each) | 300ms | translateY(10px), opacity 0 |
| Button | 400ms | 300ms | translateY(10px), opacity 0 |
| Footer | 450ms | 300ms | opacity 0 |

---

## 9. Loading States

| State | Visual | Duration |
|-------|--------|----------|
| Page load | Skeleton card: title bar (60% x 28px), 2 input skeletons (100% x 40px), button skeleton (100% x 44px) | Until render |
| Button submit | Inline spinner (16px, white, 400ms rotation cycle) + label change | Until response |
| Password strength check | Loading indicator on strength bar (pulse) | 200ms debounce |
| Social auth redirect | Social button shows spinner, all inputs disabled | Until OAuth redirect |
| Page transition | Crossfade between auth screens | 300ms |

### Skeleton Specifications

| Property | Value |
|----------|-------|
| Title skeleton | 60% width, 28px height, centered, radius-sm |
| Input skeleton | 100% width, 40px height, radius-sm |
| Button skeleton | 100% width, 44px height, radius-md |
| Background base | Neutral-100 |
| Shimmer | Neutral-200 gradient sweep |
| Animation | shimmer 1.5s ease-in-out infinite |

---

## 10. Error States

| Error | Trigger | Display | Recovery |
|-------|---------|---------|----------|
| Invalid email | Blur on email with bad format | Inline: "Please enter a valid email" (Danger-500, Caption) | User corrects |
| Wrong password | Submit with bad credentials | Inline: "Incorrect password" + "Forgot?" link | Retry or reset |
| Account locked | > 5 failed attempts | Card error: "Too many attempts. Try again in [N] minutes." | Timer countdown |
| Network offline | Fetch fails | Toast: "No internet connection" (Warning-500 strip) | Auto-retry |
| Server 5xx | API error | Toast: "Something went wrong. Try again." | Manual retry |
| Rate limited | > 10 requests/min | Card error: "Please wait before trying again" | Timer countdown |
| Session expired | Expired token | Redirect to Login with toast: "Your session expired" | Fresh login |
| Email not found | Forgot password | Inline: "No account found" + "Sign up?" link | User corrects |
| Reset link expired | Expired token | Card error: "Link expired. Request a new one." + link | Re-request |

### Inline Error Placement

```
┌──────────────────────────────────────┐
│  Label (14px, 500w)                  │
│  ┌──────────────────────────────────┐│
│  │ [input]        [icon-danger]    ││
│  └──────────────────────────────────┘│
│  ⚠ Please enter a valid email      ││ ← Caption (13px), Danger-500, Space-2 above
└──────────────────────────────────────┘
```

---

## 11. Empty States

Authentication screens have no traditional empty states — they are entry points. Edge cases:

| Scenario | Behavior |
|----------|----------|
| No email prefilled | Empty input, placeholder visible |
| No social providers | All 3 buttons always shown |
| Forgot password — no email to display | "your email" generic text |

---

## 12. Accessibility

| Element | Requirement | ARIA |
|---------|-------------|------|
| Form | `<form>` per auth screen | `aria-label="[Screen] form"` |
| Email input | Explicit `<label>` | `autocomplete="email"` |
| Password input | Explicit `<label>` | `autocomplete="current-password"` / `new-password` |
| Name input (register) | Explicit `<label>` | `autocomplete="name"` |
| Error messages | Linked to field | `aria-describedby="[field]-error"` |
| Error container | Live region | `aria-live="polite"` |
| Password toggle | Descriptive label | `aria-label="Show password"` / "Hide password" |
| Social buttons | Descriptive label | `aria-label="Sign in with Google"` etc. |
| Submit button | — | `aria-label="Sign in to your account"` (matches CTA) |
| Focus management | Auto-focus first input on page load | `autofocus` |
| Step transition | Focus moves to step heading | `tabindex="-1"` on heading, `.focus()` |
| Checkbox (Register) | — | `aria-label="I agree to the Terms of Service"` |
| Back link | — | `aria-label="Back to sign in"` |
| Skip link | At top of page | "Skip to main content" |
| Color contrast | All fields WCAG AA | 4.5:1 minimum |

### Autocomplete Attributes

| Screen | Field | autocomplete value |
|--------|-------|--------------------|
| Login | Email | `email` |
| Login | Password | `current-password` |
| Register | Full Name | `name` |
| Register | Email | `email` |
| Register | Password | `new-password` |
| Register | Confirm Password | `new-password` |
| Forgot Password | Email | `email` |
| Password Reset | New Password | `new-password` |
| Password Reset | Confirm Password | `new-password` |

---

## 13. Keyboard Navigation

| Key | Login | Register | Forgot Step 1 | Forgot Step 2 | Reset |
|-----|-------|----------|---------------|---------------|-------|
| Tab | Email → Password → Remember → Forgot → Sign In → Social → Footer | Name → Email → Password → Confirm → Terms → Create → Social → Footer | Email → Send → Back | Open App → Send Again → Back | New Pass → Confirm Pass → Reset → Back |
| Enter | Submit from any field | Submit from any field | Submit | — | Submit |
| Escape | Clear field focus | Clear field focus | Clear field focus | — | Clear field focus |
| Shift+Tab | Reverse order | Reverse order | Reverse order | Reverse order | Reverse order |
| Space | Toggle Remember | Toggle Terms | — | — | — |

---

## 14. Responsive Behavior

| Element | Mobile (<768px) | Tablet (768–1023px) | Desktop (1024px+) |
|---------|-----------------|---------------------|-------------------|
| Card width | 100% (page margin Space-5) | 440px centered | 440px centered |
| Card padding | Space-5 (16px) | Space-7 (24px) | Space-8 (32px) |
| Card margin top | Space-9 (40px) | Space-11 (64px) | Space-13 (96px) |
| Background decoration | Hidden | Subtle (opacity 0.08) | Full (opacity 0.15) |
| Top bar | Logo only | Logo + Help | Logo + Help |
| Form fields | Full width | Full width | Full width |
| Social buttons | 3 equal-width flex | 3 equal-width flex | 3 equal-width flex |
| Vertical centering | Top-aligned | Centered | Centered |
| Password strength | Below input (inline) | Below input (inline) | Below input (inline) |
| Forgot Step 2 illustration | 48px | 56px | 64px |

---

## 15. AI Integration

| Feature | Screen | Behavior |
|---------|--------|----------|
| Smart help | All auth screens | "Help?" link → context-sensitive FAQ overlay or tooltip |
| Social sign-in preference | Login/Register | Order social buttons based on OS/browser detection (macOS → Apple first) |
| None post-auth | — | AI appears only after authentication complete |

---

## 16. Future Expansion

| Feature | Phase | Notes |
|---------|-------|-------|
| SSO/SAML enterprise login | Phase 6 | Additional button, config provider |
| Biometric (fingerprint, Face ID) | Phase 6 | `webauthn` support, device detection |
| QR code login from companion device | Phase 7 | QR render, polling endpoint |
| Passkeys / WebAuthn | Phase 6 | Conditional UI, platform auth |
| Magic link email login | Phase 3 | "Email me a magic link" alternative CTA |
| Multi-factor authentication (TOTP) | Phase 5 | Additional step, code input |
| Device management (trusted devices) | Phase 6 | Settings panel cross-ref |
| Social provider linking | Phase 4 | Merge accounts flow |

---

## 17. Design Token Inheritance Reference

| Category | Token Source | Applied To |
|----------|--------------|------------|
| Color | DP-1:Color | Card bg, borders, text, icons, strength bar |
| Typography | DP-1:Type | All headings, body, caption, labels |
| Spacing | DP-1:Space | Card padding, field gaps, margins |
| Radius | DP-1:Radius | Card, fields, buttons, icons |
| Elevation | DP-1:Elev | Card shadow, top bar z-index |
| Glass | DP-1:Glass | Top bar |
| Motion | DP-8:All | Entrance, transitions, loading, feedback |
| Components | DP-3:All | Input fields, buttons, links, checkbox |
| Forms | DP-3:Forms | Validation, error display, labels |

---

*Cross-references: DP-7:Authentication, DP-8:Page-Transitions, DP-8:Feedback-System, DP-8:Loading-System, DP-6:Screen (Authentication), DP-4:Layout (Auth), DP-1:All*
