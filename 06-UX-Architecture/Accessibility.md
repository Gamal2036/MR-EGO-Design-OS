# Accessibility — UX Architecture

**Phase:** DP-6 (UX Architecture)
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md) — Rule 6), DP-1 ([Accessibility.md](../02-Design-Language/Accessibility.md)), DP-4 ([Accessibility/](../05-Application-Shell/Accessibility/)), DP-5 ([Accessibility.md](../06-Visual-Foundation/Accessibility/Accessibility.md))

---

## UX-Level Accessibility Requirements

This document defines accessibility requirements at the UX architecture level. Component-level accessibility is defined in DP-3. Visual accessibility is defined in DP-5.

---

## Keyboard Navigation

| Requirement | Specification |
|-------------|---------------|
| Tab order | Follows visual reading order (top-to-bottom, left-to-right) for every screen |
| Focus indicators | 2px solid ring, Primary color, 2px offset (from DP-5) |
| Skip links | Present at top of every page: "Skip to content", "Skip to navigation", "Skip to search" |
| No keyboard traps | Focus never gets stuck in any component or region |
| Shortcut keys | Documented, discoverable, customizable |
| Focus management | Predictable on page load, navigation, modal open/close, error states |

### Focus Order Per Screen Type

| Screen Type | Default Focus | Tab Order |
|-------------|--------------|-----------|
| Authentication | Email input | Fields → Submit → Social → Footer links |
| Dashboard | First widget heading | AI Card → StatCards → Widgets → Sidebar → Topbar |
| Job Search | Search input | Input → Filters → Results → Pagination |
| Job Detail | Job title heading | Header → Description → Match Score → Actions → Related |
| Application Form | First form field | Fields → CV → Cover Letter → Submit |
| Settings | First section link | Sidebar → Section content → Controls → Save |
| AI Workspace | Prompt input | Messages → Input → Context panel → Suggestions |
| Profile | Name heading | Header → Tabs → Tab content |
| Onboarding | Step title | Form fields → Back → Continue |
| Modal | First focusable element | Trap within modal → Close |

---

## ARIA Strategy

| Pattern | ARIA Implementation |
|---------|---------------------|
| Navigation regions | `role="navigation"` with `aria-label` per nav (primary, secondary, breadcrumb) |
| Page structure | `<header>`, `<main>`, `<footer>` landmarks, `role="region"` for widget areas |
| Tab panels | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-labelledby` |
| Accordions | `role="button"` on trigger, `aria-expanded`, `aria-controls`, `role="region"` on panel |
| Modals | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (title), focus trap |
| Alerts and toasts | `role="alert"`, `aria-live="assertive"` for critical, `polite` for non-critical |
| Progress | `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| Forms | `<form>` with `aria-label` or `aria-labelledby`, inputs with `<label>`, error `aria-describedby` |
| AI content | `aria-label="AI-generated content"`, results region `aria-live="polite"` |
| Live regions | Dashboard metrics `aria-live="polite"`, search results `role="region"` |
| Status messages | `role="status"` for success, `role="alert"` for errors |
| Command palette | `role="combobox"`, `aria-expanded`, `aria-autocomplete="list"` |

---

## Screen Reader Behavior

| Screen Type | Announcements |
|-------------|---------------|
| Page load | Page title, skip link availability |
| Navigation | Section change, current location |
| Content update | New results, status changes, AI response ready |
| Error | Error message, field with error |
| Progress | Loading percentage, step indicator |
| Modal open | Modal title, focus confirmation |
| Modal close | Return to trigger location |
| Form submit | Success or failure confirmation |
| Search | Result count, search duration |
| AI interaction | Thinking state, response ready, confidence level |

---

## Contrast Requirements (from DP-5, DP-1)

| Element Type | Minimum Ratio | Target |
|-------------|---------------|--------|
| Body text | 4.5:1 (AA) | 10.2:1 (AAA) |
| Large text (18px+/bold 14px+) | 3:1 (AA) | 4.5:1 |
| UI components (borders, icons) | 3:1 | 4.5:1 |
| Focus indicators | 3:1 against adjacent | Visible against any background |
| Placeholder text | 4.5:1 | 7:1 |
| Disabled elements | 3:1 | 3:1 |

---

## Reduced Motion

| Requirement | Specification |
|-------------|---------------|
| System preference | `prefers-reduced-motion` honored globally |
| In-app toggle | "Reduce motion" in Appearance settings |
| Effects | All animations reduce to ≤50ms |
| Exceptions | Essential transforms only (collapsing, scroll position) |
| AI streaming | Text reveal can be disabled |
| Page transitions | Fade only (no slide) when reduced motion active |

---

## Large Text Mode

| Requirement | Specification |
|-------------|---------------|
| Font scaling | Layout remains intact at 200% zoom |
| Text truncation | Never truncate without ellipsis + tooltip |
| Line length | Max 70 chars for body text |
| Line height | 1.5x body, 1.2x headings |
| Button text | Always visible (never truncated) |

---

## Touch Targets

| Requirement | Specification |
|-------------|---------------|
| Minimum size | 44x44px (WCAG 2.1) |
| Spacing | 8px minimum between touch targets |
| Interactive elements | All buttons, links, controls, chips, tags |
| Mobile | Primary actions at bottom (thumb zone) |
| Focus mode | Touch targets remain minimum size |

---

## Screen-Specific Requirements

| Screen | Key Accessibility Considerations |
|--------|-------------------------------|
| Dashboard | Widget landmarks, metric announcements, AI summary `aria-live` |
| Job Search | Results `role="region"`, card keyboard navigation, filter accessibility |
| Job Detail | Match score as text + percentage, salary text-based |
| Application Form | Proper autocomplete, section headings, confirmation announcement |
| CV Manager | Upload zone keyboard accessible, document preview zoom |
| AI Workspace | `role="log"` on conversation, streaming accessible, input labeled |
| Settings | Section navigation `aria-label`, control states announced |
| Profile | Tab accessibility, section landmarks, edit mode focus |
| Onboarding | Step progress announced, field validation live regions |
| Notifications | Toast `role="alert"`, center `role="region"`, badge `aria-label` |
| Error | `role="alert"`, focus to error, recovery announced |

---

## Validation Checklist

- [ ] All pages have skip links
- [ ] All pages have proper heading hierarchy (h1-h6)
- [ ] All interactive elements are keyboard accessible
- [ ] All forms have explicit labels
- [ ] All images have alt text or marked decorative
- [ ] All color conveys information with text/icon alternative
- [ ] All notifications are announced to screen readers
- [ ] All touch targets ≥ 44x44px
- [ ] All animations respect `prefers-reduced-motion`
- [ ] All focus indicators are visible
- [ ] All error messages are clear and solution-oriented
- [ ] All modals trap focus and return focus on close

---

*This Accessibility document ensures every user, regardless of ability, can fully use MR:EGO. These requirements apply to every screen, component, and interaction. Refer to [Screen-Inventory.md](Screen-Inventory.md) for screen-specific details and [Interaction-Patterns.md](Interaction-Patterns.md) for interaction patterns.*
