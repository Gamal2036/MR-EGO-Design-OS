# Wizard Layout

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Wizard-Pattern.md](../../04-Component-Library/Patterns/Wizard-Pattern.md), [Stepper.md](../../04-Component-Library/Forms/Stepper.md))

---

## Purpose

The Wizard Layout provides a focused, step-by-step flow for multi-stage processes — onboarding, setup workflows, and guided task completion.

---

## Layout Blueprint

```
Workspace (variant: full — no sidebar)
├── Header (minimal variant — no search, no sidebar toggle)
│   ├── Breadcrumb or Step indicator
│   └── Close / Exit button
├── PrimaryRegion (max-width: md — 768px, centered)
│   ├── WizardContainer
│   │   ├── Stepper (horizontal, steps with labels)
│   │   ├── StepContent
│   │   │   ├── StepTitle
│   │   │   ├── StepDescription
│   │   │   └── FormGroup[] (step-specific form controls)
│   │   └── WizardActions
│   │       ├── Back button (previous step)
│   │       ├── Next button / Submit button
│   │       └── Skip button (optional)
│   └── ProgressBar (optional — below stepper for long steps)
└── ModalRegion (for confirmations — exit confirmation)
```

---

## Layout Rules

| Rule | Description |
|------|-------------|
| Focus mode | Sidebar is hidden. Minimal header. |
| Centered content | Content is centered for focused attention |
| Step indicator | Stepper shows progress through the flow |
| Back/Next navigation | Linear progression through steps |
| Save progress | Progress is saved on each step completion |
| Exit confirmation | Exiting mid-wizard prompts save confirmation |

---

## Responsive Adaptation

| Device | Layout |
|--------|--------|
| Desktop (1280px+) | Horizontal stepper. Centered content. |
| Laptop (1024-1279px) | Horizontal stepper. Centered content. |
| Tablet (768-1023px) | Horizontal stepper (compact). Full-width content. |
| Mobile (<768px) | Vertical stepper. Full-width content. Bottom-fixed actions. |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Workspace/Focus-Zones.md](../Workspace/Focus-Zones.md) | Focus mode behavior for wizards |

---

*The Wizard Layout guides users through complex processes one step at a time. It eliminates overwhelm by focusing on the current step only.*
