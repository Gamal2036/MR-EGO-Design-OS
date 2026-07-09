# Dialogs

**Phase:** DP-2 (Design System)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md), [Elevation-System.md](../../02-Design-Language/Elevation-System.md), [Shadow-System.md](../../02-Design-Language/Shadow-System.md), [Glass-System.md](../../02-Design-Language/Glass-System.md), [Motion-System.md](../../02-Design-Language/Motion-System.md), [Interaction-Language.md](../../02-Design-Language/Interaction-Language.md), [Layout-Principles.md](../../02-Design-Language/Layout-Principles.md))

---

## Purpose

Dialogs interrupt the current context to present information, request confirmation, or capture input that requires user attention before continuing.

---

## When to Use

- Confirming destructive or irreversible actions
- Forms and tasks that benefit from focused input without page navigation
- Warnings about data loss, permission changes, or critical state transitions
- AI-generated insights or suggestions requiring user review
- Presenting additional context or details without navigating away

## When NOT to Use

- Non-critical information — use toast or banner
- Complex multi-step workflows — use dedicated page or wizard
- Content that users reference while completing another task — use side panel
- Marketing or promotional content — never in dialogs

---

## Variants

### Modal

Standard dialog for focused tasks and forms.

| Property | Value |
|----------|-------|
| Max width | 480px (sm), 640px (md), 800px (lg) |
| Padding | 32px |
| Border radius | Radius-Lg (12px) |
| Background | Surface-1 |
| Shadow | Shadow-3 |
| Animation open | Scale (0.95→1.0) + fade, 200ms Ease-Out |
| Animation close | Scale (1.0→0.95) + fade, 150ms Ease-In |
| Backdrop | Glass (rgba overlay, 12px blur) |

| Element | Specification |
|---------|---------------|
| Header | Title (Heading-4) + close X button |
| Body | Content, form, or message |
| Footer | Action buttons (Primary + Secondary) |
| Close | X button, Esc key, click outside |

### Drawer

Slide-over panel for contextual content and secondary tasks.

| Property | Value |
|----------|-------|
| Position | Right edge (default), bottom (mobile) |
| Width | 400px (default), 480px (wide), 100% mobile |
| Height | 100vh |
| Background | Surface-1 |
| Shadow | Shadow-3 |
| Animation | Slide from right 300ms Ease-Out (desktop), slide up (mobile) |

| Element | Specification |
|---------|---------------|
| Header | Title + close button, 16px padding |
| Body | Scrollable content, 16px padding |
| Footer | Optional action buttons |
| Close | Esc key, X button, swipe to close (mobile) |

### Confirmation

Dialog requiring explicit acknowledgment before proceeding.

| Property | Value |
|----------|-------|
| Title | Question or statement of what will happen |
| Body | Explanation of consequences and context |
| Primary button | Action label ("Delete", "Confirm", "Save") |
| Secondary button | "Cancel" |
| Caution variant | Primary button uses Danger color for destructive actions |
| Dismiss | Esc or Cancel — never click outside to prevent accidental dismiss |

### Warning

Alert about potential consequences before they occur.

| Property | Value |
|----------|-------|
| Icon | Warning triangle (24px, Warning-500) |
| Title | "Warning" or specific warning headline |
| Body | What might happen and why |
| Action | Acknowledge or change approach |
| Dismiss | Cannot be ignored — requires explicit action |

### Delete

Specific confirmation for data deletion with extra safety measures.

| Property | Value |
|----------|-------|
| Icon | Trash/exclamation icon (24px, Danger-500) |
| Title | "Delete [item name]?" |
| Body | "This action is permanent. [Item name] will be deleted and cannot be recovered." |
| Confirmation | User types the item name or "DELETE" to confirm |
| Primary button | "Delete" (Danger variant), disabled until confirmation text matches |
| Secondary button | "Cancel" |
| Animation | Slight shake on failed confirmation attempt |

### AI Dialog

Dialog for AI interaction requiring user review and decision.

| Property | Value |
|----------|-------|
| Header | AI avatar + "MR:EGO AI" label |
| Body | AI suggestion, recommendation, or generated content |
| Confidence | Badge showing AI confidence level |
| Sources | Expandable source references |
| Actions | "Accept", "Modify", "Dismiss", "Give feedback" |
| Feedback | Thumbs up/down on AI suggestion quality |
| Explanation | "Why this?" link opens explanation panel |

---

## Dialog Anatomy

```
┌──────────────────────────────────────────┐
│  [Icon] Title                     [✕]    │  ← Header
├──────────────────────────────────────────┤
│                                          │
│  Body content — message, form, detail    │  ← Body
│                                          │
│                                          │
├──────────────────────────────────────────┤
│  [Secondary]              [Primary]      │  ← Footer
└──────────────────────────────────────────┘
```

---

## Sizing

| Variant | Width (sm) | Width (md) | Width (lg) | Mobile |
|---------|-----------|-----------|-----------|--------|
| Modal | 400px | 480px | 640px | Full (16px margin) |
| Drawer | 400px | 480px | 640px | Full width |
| Confirmation | 400px | — | — | Full |
| Warning | 400px | — | — | Full |
| Delete | 400px | — | — | Full |
| AI Dialog | 480px | 640px | 800px | Full |

---

## Spacing

| Context | Value | Token |
|---------|-------|-------|
| Modal padding | 32px | Space-8 |
| Modal header to body | 20px | Space-6 |
| Modal body to footer | 24px | Space-7 |
| Footer button gap | 8px | Space-3 |
| Drawer padding | 16px | Space-5 |
| Icon to title | 12px | Space-4 |
| Error message below input | 4px | Space-2 |

---

## Backdrop

| Element | Light | Dark |
|---------|-------|------|
| Modal backdrop | rgba(0,0,0,0.32) | rgba(0,0,0,0.48) |
| Drawer backdrop | rgba(0,0,0,0.16) | rgba(0,0,0,0.24) |
| Glass effect | 12px blur (optional) | 12px blur (optional) |
| Click to dismiss | Modal: yes, Drawer: yes | Same |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Focus trap | Tab cycling stays within dialog |
| Initial focus | First focusable element on open |
| Return focus | Returns to trigger element on close |
| Close | Esc always closes (not for delete without confirmation) |
| Role | `dialog` for modals, `alertdialog` for confirmations |
| ARIA label | `aria-labelledby` pointing to dialog title |
| ARIA description | `aria-describedby` pointing to body content |
| Backdrop click | Dismisses only if explicitly safe (not for delete/confirm) |
| Body scroll | Locked while dialog is open |
| Reduced motion | Instant open/close when `prefers-reduced-motion` |

---

## Responsive Behavior

| Breakpoint | Modal | Drawer |
|------------|-------|--------|
| Mobile (<768px) | Full-width (16px margin). Bottom sheet style (12px top radius, slide up). | 100% width, slide up from bottom. |
| Tablet (768-1023px) | Centered, md width. | 400px right panel. |
| Desktop (1024px+) | Centered, configurable width. | Right panel. |
| Confirm/Delete | Full-width mobile. | — |

---

## Future Expansion

- **Multi-step dialog** — Sequential steps within a single dialog
- **Resizable drawer** — User-adjustable drawer width
- **Dialog stack** — Multiple dialogs stacked with backdrop depth
- **Minimizable dialog** — Dialog minimizes to a floating icon
- **AI comparison dialog** — Side-by-side AI option comparison
- **Full-screen dialog** — Dialog that expands to full viewport for complex tasks

---

## Related Components

- [Buttons.md](Buttons.md) — Dialog action buttons
- [Forms.md](Forms.md) — Forms within dialogs
- [Cards.md](Cards.md) — Card content within dialogs
- [Navigation.md](Navigation.md) — Drawer for secondary navigation
- [AI-Components.md](AI-Components.md) — AI dialog patterns
- [Feedback.md](Feedback.md) — Toast feedback after dialog action
