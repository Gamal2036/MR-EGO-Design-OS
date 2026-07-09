# Error State System

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md))

---

## Philosophy

Errors in MR:EGO are treated as **communication moments, not failures.** Every error message explains what happened, why it happened, and what the user can do next. Technical jargon, blame, and raw error codes are never shown to users.

---

## Error State Anatomy

```
┌──────────────────────────────────────┐
│                                      │
│        [Error Illustration]          │
│                                      │
│           Error Title                │
│                                      │
│    What happened + why + what to do  │
│                                      │
│       [Recovery Action Button]       │
│                                      │
│       Secondary action (link)        │
│                                      │
└──────────────────────────────────────┘
```

### Elements

| Element | Specification |
|---------|---------------|
| Icon | Semantic icon (warning/exclamation for errors) |
| Title | "Something went wrong" or specific problem |
| Description | Cause + solution in plain language |
| Action | Recovery action or retry |
| Secondary | "Contact support" or "Go back" |

---

## Error Types

### Page Error (500, server unavailable)

| Property | Specification |
|----------|---------------|
| Title | "Something went wrong" |
| Description | "We encountered an error loading this page. Please try again." |
| Action | "Try again" |
| Secondary | "Go to home" |

### Not Found (404, content missing)

| Property | Specification |
|----------|---------------|
| Title | "Page not found" |
| Description | "This page doesn't exist or has been moved." |
| Action | "Go to home" |
| Secondary | "Search" |

### Network Error (connection lost)

| Property | Specification |
|----------|---------------|
| Title | "No internet connection" |
| Description | "Check your connection and try again." |
| Action | "Try again" |
| Secondary | "View offline content" |

### Permission Error (403, unauthorized)

| Property | Specification |
|----------|---------------|
| Title | "You don't have access" |
| Description | "You don't have permission to view this content." |
| Action | "Request access" |
| Secondary | "Go back" |

### Validation Error (form input)

| Property | Specification |
|----------|---------------|
| Title | (None — inline per field) |
| Description | Specific validation message (e.g., "Email address is not valid") |
| Action | User fixes input |
| Secondary | None |

### Timeout Error

| Property | Specification |
|----------|---------------|
| Title | "Request timed out" |
| Description | "The server took too long to respond. Please try again." |
| Action | "Try again" |
| Secondary | "Go to home" |

---

## Error Message Writing Guide

| Do | Don't |
|----|-------|
| "Could not save. Your document exceeds the 10MB limit." | "Error 0x7F: File too large" |
| "No internet connection. Working offline." | "Network error" |
| "You don't have permission to delete this workspace." | "Access denied" |
| "Email address is not valid. Example: name@company.com" | "Invalid email" |
| "This page doesn't exist. It may have been moved or deleted." | "404 Not Found" |

---

## Error Recovery

| Error Type | Recovery Action | Automatic Retry |
|------------|----------------|-----------------|
| Network error | Retry button | 3 retries (exponential backoff) |
| Server error | Retry button | 3 retries (exponential backoff) |
| Validation error | User corrects input | No retry |
| Permission error | Request access | No retry |
| Timeout | Retry button | 2 retries |

---

## Error Accessibility

1. **Errors are announced to screen readers** via `aria-live="assertive"` region.
2. **Form errors are programmatically associated** with their input via `aria-describedby`.
3. **Error icons include `role="img"`** with appropriate alt text.
4. **Error colors are never the sole indicator.** Icon + text + color communicate the error.
5. **Focus moves to the error summary** on form submission errors.

---

## Error Rules

1. **Never show error codes to users.** Error codes are logged internally, never displayed.
2. **Errors offer a recovery path.** Every error has at least one action the user can take.
3. **Errors are specific.** "Could not save" is better than "Operation failed."
4. **Errors are honest.** If it is the user's fault, explain why. If it is the system's fault, apologize.
5. **Errors do not blame the user.** No "You entered invalid data." Instead: "This value is not valid."
6. **Transient errors auto-retry.** Network and server errors retry silently before showing an error state.
7. **Full-page errors maintain navigation.** The sidebar and top nav remain accessible during error states.

---

*This Error State System is permanent. All components in DP-2 implement these error patterns. Refer to [Feedback-System.md](Feedback-System.md) for toast and inline error patterns, [Color-System.md](Color-System.md) for semantic error colors, and [Accessibility.md](Accessibility.md) for error accessibility requirements.*
