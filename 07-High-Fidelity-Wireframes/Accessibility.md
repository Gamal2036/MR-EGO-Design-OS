# Accessibility — High-Fidelity Wireframe Specifications

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:Accessibility, DP-1:Accessibility, DP-5:Accessibility, DP-3:Accessibility

---

## Purpose

Consolidate all accessibility requirements from prior phases into screen-specific wireframe guidance. Every screen specification in DP-7 already includes per-screen accessibility details; this document provides the unified reference.

---

## Touch Target Map

| Element | Minimum Size | Context |
|---------|-------------|---------|
| Primary buttons | 44x44px mobile, 40x40px desktop | All screens |
| Icon buttons | 44x44px mobile, 36x36px desktop | Topbar, cards, actions |
| Links (inline) | 44x44px hit area via padding | Body text links |
| Form inputs | 44px height mobile, 40px desktop | All forms |
| Checkboxes / Radios | 20x20px (44x44px hit area) | All forms |
| Chips / Tags | 32px height (44px hit area) | Skills, filters |
| Toggle switches | 44x24px (44x44px hit area) | Settings |
| Slider handles | 20px diameter (44x44px hit area) | Filters, settings |
| Cards (interactive) | Content height, 44px min | Dashboard widgets, job cards |
| Pagination | 36x36px (44x44px hit area) | Search results |
| Bottom tab items | 48x48px min | Mobile navigation |

---

## Focus Order Per Screen

| Screen | Default Focus | Tab Sequence |
|--------|--------------|--------------|
| Landing | Skip link → Hero CTA | Skip → Nav → CTA → Features → Showcase → Testimonials → Footer |
| Login | Email input | Email → Password → Remember → Sign In → Social → Footer |
| Register | Name input | Name → Email → Password → Confirm → Terms → Create → Social |
| Onboarding | Step title | Step content fields → Back → Continue |
| Dashboard | Skip link → First widget | AI Card → Stat cards → Widget grid → Sidebar → Topbar |
| AI Workspace | Input field | Messages → Input → Context panel → Suggestions |
| CV Builder | Upload zone | Upload → CV list → Cards → Actions |
| CV Analysis | Score card | Score → Strengths → Sections → Priorities |
| Job Search | Search input | Search → Filters → Results → Pagination |
| Job Detail | Job title | Header → Match → Description → Similar → Side panel |
| Application Wizard | First form field | Stepper → Fields → Back → Continue |
| Application Tracker | First tab | Tabs → Cards → AI insights |
| Profile | Name heading | Header → Tabs → Tab content |
| Settings | First section link | Section nav → Section content → Controls |
| Notifications | First item | Filter tabs → Items → Actions |

---

## Skip Links

Every page has the following skip links as the first focusable elements:

1. "Skip to content" — jumps to `<main>` content
2. "Skip to navigation" — jumps to primary `<nav>`
3. "Skip to search" — jumps to search input (on pages with search)

### Specification:
| Property | Value |
|----------|-------|
| Position | Fixed top, 0px, z-index 9999 |
| Visual | Visible only on focus (focus: offset 8px from top) |
| Background | Surface-1 |
| Border | 2px Primary-500 |
| Padding | Space-3 (8px) Space-5 (16px) |
| Radius | 0 0 radius-sm radius-sm |

---

## ARIA Landmark Strategy

| Landmark | Role | When |
|----------|------|------|
| Site header | `banner` | Every page |
| Primary nav | `navigation` with `aria-label="Main navigation"` | Authenticated pages |
| Secondary nav | `navigation` with `aria-label="Section navigation"` | Profile tabs, settings |
| Main content | `main` | Every page |
| Complementary | `complementary` with `aria-label` | AI side panel, context panel |
| Content info | `contentinfo` | Footer |
| Search | `search` with `aria-label` | Job search, help center |
| Form | `form` with `aria-label` | All forms |
| Widget area | `region` with `aria-label` | Dashboard widget grid |
| Modal | `dialog` with `aria-modal="true"` | All dialogs |
| Alert | `alert` | Error states, critical notifications |
| Status | `status` | Success messages, progress updates |

---

## Color & Contrast Verification

All screens must verify these contrast pairs (from DP-1:Color):

| Pair | Ratio Required | Passed By |
|------|---------------|-----------|
| Text-Body on Surface-1 | 4.5:1 (AA) | 10.2:1 ✓ |
| Text-Primary on Surface-1 | 4.5:1 (AA) | 15.4:1 ✓ |
| Text-Secondary on Surface-0 | 4.5:1 (AA) | 6.7:1 ✓ |
| Placeholder on Surface-1 | 4.5:1 (AA) | 4.8:1 ✓ |
| Primary-600 on Surface-1 | 3:1 (AA large text) | 5.8:1 ✓ |
| Success/Warning/Danger text | 4.5:1 (AA) | ✓ per DP-1 |
| Focus ring (Primary-500) | 3:1 against adjacent | ✓ |

---

## Reduced Motion

| Element | Reduced Motion Behavior |
|---------|------------------------|
| Page transitions | Instant (no slide/fade) |
| Skeleton pulse | Static placeholder (no animation) |
| Content reveal | Instant appearance |
| AI streaming | Complete response appears at once |
| Hover effects | Instant (no 100ms transition) |
| Modal open | Instant scale (no animation) |
| Floating AI button | No pulse animation |
| All transitions | ≤50ms or instant |

### Controls:
| Method | Behavior |
|--------|----------|
| `prefers-reduced-motion` media query | Auto-detected, applied globally |
| Settings toggle | "Reduce motion" in Appearance settings |
| Override | User can re-enable in settings |

---

## Screen Reader Announcements

| Event | Announcement | Priority |
|-------|-------------|----------|
| Page navigation | "Page title. [Page name]" | Immediate |
| Content loading | "Loading" | Polite |
| Content loaded | "[Section name] loaded" | Polite |
| AI response | "AI response ready" | Polite |
| Error | "[Error message]" | Assertive |
| Success | "[Success message]" | Polite |
| Status change | "[New status]" | Assertive |
| Modal opened | "Dialog: [title]" | Immediate |
| Modal closed | "Returned to [trigger element]" | Polite |
| Notification | "[Notification text]" | Polite |
| Progress update | "[Step] of [total]" | Polite |

---

## Keyboard Shortcuts by Screen

| Shortcut | Landing | Auth | Dashboard | Jobs | AI Workspace | Settings |
|----------|---------|------|-----------|------|-------------|----------|
| Tab | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Enter | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Escape | — | ✓ | — | ✓ | ✓ | ✓ |
| Ctrl+K | — | — | ✓ | ✓ | ✓ | ✓ |
| Ctrl+I | — | — | ✓ | ✓ | ✓ | — |
| / | — | — | ✓ | ✓ | — | — |
| Arrow keys | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Ctrl+S | — | — | — | — | — | ✓ |
| 1-4 | — | — | ✓ | — | — | — |
| F6 | — | — | ✓ | ✓ | ✓ | — |

---

## Form Accessibility Checklist

All forms across every screen must verify:

- [ ] Every input has an associated `<label>`
- [ ] Required fields marked with `aria-required="true"` or `required`
- [ ] Error messages linked via `aria-describedby`
- [ ] Success messages use `role="status"`
- [ ] Autocomplete attributes on name, email, password, address fields
- [ ] Focus moves to first error on validation
- [ ] Form can be submitted with Enter key from any field
- [ ] Password toggle has `aria-label="Show password"` / "Hide password"
- [ ] Character count announced for limited fields

---

## Screen-Specific Requirements Quick Reference

| Screen | Key Requirement |
|--------|-----------------|
| Dashboard | Widget landmarks, metric text alternatives, AI `aria-live` |
| Job Search | Results `role="region"`, card keyboard nav, filter accessibility |
| Job Detail | Match score as text + %, salary readable |
| Application Wizard | Autocomplete attributes, section headings, submit confirmation |
| CV Builder | Upload zone keyboard accessible, file list labeled |
| AI Workspace | `role="log"` conversation, streaming accessible, input labeled |
| Settings | Section nav labeled, control states announced |
| Profile | Tab accessibility, section landmarks, edit mode focus management |
| Onboarding | Step progress announced, field validation live regions |
| Notifications | Toast `role="alert"`, center `role="region"` |

---

*Cross-references: DP-6:Accessibility, DP-1:Accessibility, DP-5:Accessibility, WCAG 2.1 AA*
