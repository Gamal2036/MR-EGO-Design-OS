# Authentication — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:Screen (Authentication), DP-4:Layout (Authentication Layout), DP-1:All

---

## Purpose

Authenticate existing users (Login), register new users (Register), and handle password recovery (Forgot Password). No sidebar. Minimal navigation. Focused single-task screens.

---

## Page Group: Login

### Layout Overview

```
┌──────────────────────────────────────────────────────────────┐
│  TOP BAR (56px, glass)                                       │
│  Logo(140x32)                           Help ▸              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│         ┌──────────────────────────────────┐                 │
│         │  CARD (440px max width, centered) │                │
│         │                                  │                │
│         │  Welcome back                    │                │
│         │  Sign in to your account         │                │
│         │                                  │                │
│         │  ┌────────────────────────────┐  │                │
│         │  │ Email input (40px h, 12px  │  │                │
│         │  │ padding, full-width)       │  │                │
│         │  └────────────────────────────┘  │                │
│         │  ┌────────────────────────────┐  │                │
│         │  │ Password input w/ toggle   │  │                │
│         │  └────────────────────────────┘  │                │
│         │                                  │                │
│         │  ☐ Remember me         Forgot?  │                │
│         │                                  │                │
│         │  [Sign In — full-width button]   │                │
│         │                                  │                │
│         │  ──────── or continue with ────  │                │
│         │  [G] [A] [M]                     │                │
│         │                                  │                │
│         │  Don't have an account? Sign up  │                │
│         └──────────────────────────────────┘                │
│                                                              │
│  Background: decorative illustration/pattern (right/behind)  │
└──────────────────────────────────────────────────────────────┘
```

### Card Specification

| Property | Value |
|----------|-------|
| Max width | 440px |
| Position | Vertically centered, horizontally centered |
| Padding | Space-8 (32px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Shadow | Shadow-2 (elevated above background) |
| Margin top | Space-13 (96px) from top bar |

### Elements (top to bottom):

**Logo section:**
| Property | Value |
|----------|-------|
| Logo | 140px x 32px, centered |
| Spacing bottom | Space-3 (8px) |

**Title:**
| Property | Value |
|----------|-------|
| Text | "Welcome back" |
| Type | Heading-2 (28px, 650 weight) |
| Alignment | Center |
| Color | Text-Primary |
| Spacing bottom | Space-2 (4px) |

**Subtitle:**
| Property | Value |
|----------|-------|
| Text | "Sign in to your account" |
| Type | Body-Small (14px) |
| Color | Text-Secondary |
| Alignment | Center |
| Spacing bottom | Space-8 (32px) |

**Email input:**
| Property | Value |
|----------|-------|
| Height | 40px |
| Padding | Space-4 (12px) horizontal |
| Radius | radius-sm (6px) |
| Border | Border-Default (1px) |
| Focus | Border-Focus + 2px ring Primary-200 |
| Label | "Email" (Label token, 14px, 500 weight) |
| Label spacing below | Space-2 (4px) |
| Placeholder | "name@company.com" |
| Spacing bottom | Space-6 (20px) |

**Password input:**
| Property | Value |
|----------|-------|
| Height | 40px |
| Padding | Space-4 (12px) horizontal |
| Radius | radius-sm (6px) |
| Border | Border-Default |
| Label | "Password" |
| Right icon | Eye toggle (20x20px) showing/hiding password |
| Spacing bottom | Space-4 (12px) |

**Options row:**
| Property | Value |
|----------|-------|
| Display | Flex, space-between |
| Checkbox | "Remember me", 16px x 16px checkbox + Label (14px) |
| Forgot link | "Forgot password?" — Text-Link, Body-Small |
| Spacing bottom | Space-7 (24px) |

**Primary CTA:**
| Property | Value |
|----------|-------|
| Type | Button-Primary |
| Width | 100% (full card width - 2x padding) |
| Height | 44px |
| Text | "Sign In" — Button token (14px, 600 weight) |
| Radius | radius-md (8px) |
| Spacing bottom | Space-7 (24px) |

**Divider:**
| Property | Value |
|----------|-------|
| Type | "or continue with" text divider |
| Line | Border-Default (1px) |
| Text | Body-Small (14px), Text-Secondary |
| Spacing bottom | Space-5 (16px) |

**Social buttons:**
| Property | Value |
|----------|-------|
| Layout | 3 buttons, Space-3 gap |
| Size | 40px x 40px (icon-only) |
| Radius | radius-sm (6px) |
| Border | Border-Default |
| Icons | Google, Apple, Microsoft |
| Spacing bottom | Space-7 (24px) |

**Footer link:**
| Property | Value |
|----------|-------|
| Text | "Don't have an account?" + "Sign up" (link) |
| Type | Body-Small |
| Alignment | Center |

### Visual Hierarchy (Login):
1. **Primary Focus:** Form fields (Email + Password)
2. **Secondary Focus:** "Sign In" button — blue accent
3. **Tertiary:** Social options, footer link

### States:
| State | Behavior |
|-------|----------|
| Default | Empty inputs, outline borders, button enabled only when form valid |
| Focus | Input border Primary, 2px ring Primary-200 |
| Typing | No special state (instant feedback) |
| Error inline | Border-Danger, error message below input (Caption, Text-Danger) |
| Submitting | Button shows spinner, inputs disabled, "Signing in..." |
| Success | Redirect to Dashboard (no success state on this screen) |
| Error general | Toast "Could not sign in. Check your credentials." |

---

## Page: Register

### Layout Overview

Identical card layout to Login with different form fields.

### Card Elements:

| Element | Specification |
|---------|---------------|
| Title | "Create your account" — Heading-2 |
| Subtitle | "Start your career transformation" — Body-Small, Text-Secondary |
| Full Name input | 40px h, Space-4 padding, radius-sm |
| Email input | Same as name |
| Password input | Same as Login + strength indicator bar (4px x 100%) |
| Confirm Password | Same as Password |
| Terms checkbox | "I agree to the Terms of Service and Privacy Policy" |
| CTA | "Create Account" — full-width Primary |
| Divider | "or continue with" |
| Social | Same 3 social buttons |
| Footer | "Already have an account? Sign in" |

### Password Strength Indicator:
| Property | Value |
|----------|-------|
| Position | Below password input |
| Height | 4px |
| Radius | radius-xs (2px) |
| Bar colors | Weak: Danger-500, Medium: Warning-500, Strong: Success-500 |
| Background | Neutral-200 (4px track) |
| Label | Body-Small, 8px above bar, aligned right |

### States:
| State | Behavior |
|-------|----------|
| Default | Empty, all fields outlined |
| Field error | Inline message per field |
| Password mismatch | "Passwords do not match" — inline error |
| Submitting | Button loading spinner, fields disabled |
| Success | Redirect to Email Verification or Welcome |
| Error | Toast: "Could not create account. Email may already be in use." |

---

## Page: Forgot Password

### Layout Overview

Two-step flow within same card layout.

### Step 1: Request Reset

| Element | Specification |
|---------|---------------|
| Icon | 48px key/lock icon (Primary-50 bg, 12px radius container) |
| Title | "Forgot password?" — Heading-3 |
| Description | "Enter your email and we'll send you a reset link" |
| Email input | Same as Login |
| CTA | "Send Reset Link" — full-width Primary |
| Footer | "Back to Sign In" |

### Step 2: Check Email (Confirmation)

| Element | Specification |
|---------|---------------|
| Icon | 64px mail/sent illustration |
| Title | "Check your email" — Heading-3 |
| Description | "We sent a reset link to [email]. It expires in 1 hour." |
| Action | "Open email app" (link) |
| Secondary | "Didn't receive it? Send again" (link, 30s cooldown) |
| Footer | "Back to Sign In" |

### Password Reset (via link, separate page):

| Element | Specification |
|---------|---------------|
| Title | "Set new password" — Heading-3 |
| Description | "Must be at least 8 characters" |
| New Password input | With strength meter |
| Confirm Password | — |
| CTA | "Reset Password" |
| Success | Toast + redirect to Login |

---

## Shared Specifications

### Input Field Anatomy:
```
┌──────────────────────────────────────┐
│  Label (14px, 500 weight)            │
│  ┌──────────────────────────────────┐│
│  │ 12px padding      icon (optional)││
│  │ [placeholder text]              ││
│  │ 40px height                     ││
│  └──────────────────────────────────┘│
│  Helper/Error text (13px)           │
└──────────────────────────────────────┘
```

### Button Anatomy (Primary):
```
┌──────────────────────────────────────┐
│                                      │
│   14px/600 weight                    │
│   44px height                        │
│   Full-width or auto                 │
│   Background: Primary-600            │
│   Text: White                        │
│   Radius: 8px                        │
│                                      │
└──────────────────────────────────────┘
```

---

## Responsive Behavior

| Element | Mobile (<768px) | Tablet (768-1023px) | Desktop (1024px+) |
|---------|-----------------|---------------------|-------------------|
| Card width | 100% (full with padding) | 440px centered | 440px centered |
| Card padding | Space-5 (16px) | Space-7 (24px) | Space-8 (32px) |
| Background decoration | Hidden | Subtle | Full decorative |
| Top bar | Logo only | Logo + Help | Logo + Help |
| Form | Full-width all | Full-width all | Full-width all |
| Social buttons | 3 equal width | 3 equal width | 3 equal width |
| Vertical centering | Top aligned (Space-11 gap) | Centered | Centered |

---

## Loading States

| State | Behavior |
|-------|----------|
| Page load | Card skeleton: title bar (60%), 2 input skeleton bars, button skeleton |
| Button submit | Button text → spinner icon + "Processing..." |
| Password check | Inline loading on strength check (200ms) |

---

## Error States

| Error | Display | Recovery |
|-------|---------|----------|
| Invalid email | Inline "Please enter a valid email" | User corrects |
| Wrong password | Inline "Incorrect password" + "Forgot?" link | User re-enters or resets |
| Account locked | Card error: "Too many attempts. Try again in 15 minutes." | Timer countdown |
| Network error | Toast "No internet connection" | Retry automatically |
| Server error | Toast "Something went wrong" | Retry button |
| Session expired | Redirect to login with message | Fresh login |

---

## Empty States

Authentication pages have no empty states — they are entry points.

---

## AI Integration

| Feature | Placement | Behavior |
|---------|-----------|----------|
| None on login/register | — | AI appears post-authentication |
| Optional: Smart help | Help link | AI-powered FAQ suggestions (post-auth only) |

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Fields in order: Email → Password → Remember → Sign In → Social → Footer |
| Enter | Submit form (from any field) |
| Escape | Clear field focus |
| Tab (error) | Focus moves to first error field |
| Shift+Tab | Reverse through form |

---

## Accessibility

| Element | Requirement |
|---------|-------------|
| Form | `<form>` with `aria-label="Sign in form"` or `aria-label="Registration form"` |
| Inputs | `<label>` for every input, proper `autocomplete` attributes |
| Errors | `aria-describedby` linking input to error message |
| Password toggle | `aria-label="Show password"` / "Hide password" |
| Social buttons | `aria-label="Sign in with Google"` etc. |
| Submit | `aria-label` matching button text |
| Focus | Auto-focus first input on page load |
| Validation | `aria-live="polite"` for inline validation messages |

---

## Future Expansion

| Feature | Phase |
|---------|-------|
| SSO/SAML enterprise login | Phase 6 |
| Biometric authentication (fingerprint, Face ID) | Phase 6 |
| QR code login from companion device | Phase 7 |
| Passkeys / WebAuthn | Phase 6 |
| Magic link email login | Phase 3 |
| Multi-factor authentication (TOTP) | Phase 5 |
| Device management (trusted devices) | Phase 6 |

---

*Cross-references: DP-6:Screen (Authentication), DP-4:Layout, DP-1:Color, DP-1:Type, DP-1:Space, DP-1:Radius, DP-1:Shadow, DP-1:Feedback, DP-1:Error, DP-6:Nav*
