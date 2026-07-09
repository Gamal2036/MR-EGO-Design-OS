# Authentication Layout

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Authentication-Pattern.md](../../04-Component-Library/Patterns/Authentication-Pattern.md))

---

## Purpose

The Authentication Layout provides focused, distraction-free screens for login, registration, password reset, and other authentication flows.

---

## Layout Blueprint

```
Workspace (variant: full — no header, no sidebar)
├── AuthContainer (centered, max-width: sm — 480px)
│   ├── AuthHeader
│   │   ├── Logo (full branding)
│   │   └── Tagline (optional)
│   ├── AuthForm
│   │   ├── FormTitle (e.g., "Sign in to MR:EGO")
│   │   ├── FormDescription (optional)
│   │   ├── FormGroup[]
│   │   │   ├── Input (email, password, etc.)
│   │   │   └── Validation (inline)
│   │   ├── SubmitButton ("Sign In", "Create Account", etc.)
│   │   ├── AuthLinks (forgot password, sign up, sign in)
│   │   └── SocialAuth (optional — Google, LinkedIn, Microsoft)
│   └── AuthFooter
│       ├── Help link
│       └── Privacy & Terms links
└── Background (branded gradient or illustration)
```

---

## Layout Rules

| Rule | Description |
|------|-------------|
| No chrome | No sidebar, no header, no workspace chrome |
| Centered form | Auth form is centered vertically and horizontally |
| Minimal | Only essential elements — logo, form, links |
| Accessible | Full keyboard support, screen reader compatible |
| Responsive | Adapts to all screen sizes without losing focus |

---

## Responsive Adaptation

| Device | Layout |
|--------|--------|
| Desktop (1280px+) | Centered card, 480px max-width. Branded background. |
| Laptop (1024-1279px) | Centered card, 480px max-width. |
| Tablet (768-1023px) | Centered card, full-width with max-width constraint. |
| Mobile (<768px) | Full-width card with padding. Logo compact. |

---

## States

| State | Behavior |
|-------|----------|
| Loading | Submit button shows spinner, form inputs disabled |
| Error | Inline error on field, banner error for general errors |
| Success | Redirect to workspace (login) or show success message (password reset) |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [States/Error.md](../States/Error.md) | Authentication error states |
| [States/Success.md](../States/Success.md) | Authentication success states |

---

*The Authentication Layout provides a clean, secure entry point to the workspace. It minimizes friction while maintaining security best practices.*
