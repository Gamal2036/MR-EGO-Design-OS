# Application Wizard — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:Screen (Application Form), DP-6:Nav (Application Flow), DP-6:Pattern (Auto-Save), DP-1:All

---

## Purpose

Multi-step form for submitting a job application. Pre-fills from profile, offers CV selection, AI-powered cover letter generation, and smart completeness checking.

---

## Layout Overview

```
┌──────────┬────────────────────────────────────────────────────┐
│          │  TOPBAR (56px)                                     │
│          │  ← Senior Frontend Developer @ Acme Corp           │
│ SIDEBAR  ├────────────────────────────────────────────────────┤
│ (240px)  │  CONTENT (centered, 720px max)                     │
│          │                                                    │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  STEPPER: Contact ▸ CV ▸ Cover Letter ▸ Review ▸ Done  │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                    │
│  STEP CONTENT (centered 640px)                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  [Step-specific form content below]                   │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                    │
│  BOTTOM BAR (sticky, 64px)                                   │
│  [Back]                                    [Continue ▸]     │
└──────────────────────────────────────────────────────────────┘
```

---

## Stepper

| Property | Value |
|----------|-------|
| Height | 64px |
| Max width | 640px |
| Padding vertical | Space-4 (12px) |

### Step items:
| # | Label | Icon |
|---|-------|------|
| 1 | Contact | User |
| 2 | CV | Document |
| 3 | Cover Letter | Edit |
| 4 | Review | Check |
| 5 | Done | Checkmark |

Active step: Primary-600 circle. Completed: Primary-100 bg, Primary-600 check. Upcoming: Neutral-200 circle.

---

## Step 1: Contact Info

| Property | Value |
|----------|-------|
| Max width | 640px |

### Fields (2-column grid):
| Field | Type | Pre-filled? |
|-------|------|-------------|
| Full Name | Text input | Yes — from profile |
| Email | Text input | Yes — from account |
| Phone | Text input | Yes — from profile |
| Location | Text input | Yes — from profile |
| LinkedIn URL | Text input (optional) | Yes — from profile |
| Portfolio URL | Text input (optional) | Yes — from profile |

---

## Step 2: CV Selection

| Property | Value |
|----------|-------|
| Max width | 640px |

### Elements:
| Element | Details |
|---------|---------|
| Heading | "Select a CV to submit" — Heading-3 |
| Sub | "Choose from your uploaded CVs or upload a new one" |

### CV options (radio cards):
| Property | Value |
|----------|-------|
| Card padding | Space-5 (16px) |
| Card radius | radius-md (8px) |
| Card selected | Primary-500 border, Primary-50 bg |
| Radio | Custom radio circle, 20px |

### Each card:
| Element | Details |
|---------|---------|
| Title | "Senior Frontend Developer — v2.3" |
| Score | "86/100" + AI score badge |
| Date | "Updated 2 days ago" |
| Match | "92% match to this job" (if applicable) |

### Upload option:
| Element | Details |
|---------|---------|
| Below radio cards | "Or upload a new CV" + file input |
| CTA | Button-Secondary: "Upload New CV" |

---

## Step 3: Cover Letter

| Property | Value |
|----------|-------|
| Max width | 640px |

### Elements:
| Element | Details |
|---------|---------|
| Heading | "Cover Letter (Optional)" |
| Sub | "AI can generate a tailored cover letter based on your profile" |

### AI Generate button:
| Element | Details |
|---------|---------|
| Text | "Generate with AI" — Button-Secondary |
| Icon | Sparkle |
| Below | "Based on your profile and the job description" — Caption |

### Text editor:
| Property | Value |
|----------|-------|
| Min height | 300px |
| Border | Border-Default, radius-md |
| Padding | Space-5 (16px) |
| Placeholder | "Write your cover letter or generate with AI..." |

### AI generation states:
| State | Behavior |
|-------|----------|
| Idle | Generate button available |
| Generating | Button shows spinner, "Crafting your letter..." |
| Complete | Content appears with streaming text effect |
| Error | "Could not generate. Try again." + manual fallback |

### Toolbar (above editor):
| Element | Details |
|---------|---------|
| Bold, Italic, List | Formatting buttons |
| "Regenerate" | Button-small (after first generation) |
| "Use as is" | Button-small-primary (accept draft) |

---

## Step 4: Review & Submit

| Property | Value |
|----------|-------|
| Max width | 640px |

### Review sections (read-only, accordion):
| Section | Content preview |
|---------|----------------|
| Contact Info | Name, Email, Phone |
| CV | "Senior Frontend v2.3 — 86/100" |
| Cover Letter | First 3 lines + "Read more" |

### AI Completeness Check:
| Property | Value |
|----------|-------|
| Position | Right side (or below on mobile) |
| Title | "Application Completeness" |
| Items | 3 check items with icons (green check / warning) |
| Checks: | Contact complete ✓, CV selected ✓, Cover letter optional ⚠ |

### Submit button:
| Property | Value |
|----------|-------|
| Type | Button-Primary |
| Width | 100% |
| Height | 44px |
| Text | "Submit Application" |
| Disabled until | All required fields complete |

---

## Step 5: Confirmation (Done)

| Property | Value |
|----------|-------|
| Max width | 640px |
| Alignment | Center |

### Elements:
| Element | Details |
|---------|---------|
| Icon | Checkmark circle, 64px, Success-500 |
| Title | "Application Submitted!" — Heading-2 |
| Company/role | "Senior Frontend Developer at Acme Corp" — Body |
| Confirmation ID | "APP-2024-3842" — Caption, Text-Secondary |
| Actions | [View Application] [Back to Jobs] [Go to Dashboard] |
| AI suggestion | "While you wait, here's how to prepare for the interview process..." |

---

## 6. Responsive Behavior

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Form width | Full (Space-5 margins) | 600px | 640px |
| Stepper | Compact (numbers only) | Icon + label | Full |
| Contact fields | Single column | 2-column | 2-column |
| CV cards | Stacked | Side-by-side | Side-by-side |
| Cover letter | Full editor | Full editor | Full editor |
| Review | Vertical stack | Vertical stack | Content + AI check side-by-side |

---

## 7. AI Integration

| Feature | Step | Behavior |
|---------|------|----------|
| CV match suggestion | Step 2 | AI suggests best CV version for this job |
| Cover letter generation | Step 3 | Full AI generation with tailoring to job + profile |
| Completeness check | Step 4 | AI verifies all required elements |
| Interview prep suggestion | Step 5 | AI suggests next steps post-submission |
| Auto-fill | Step 1 | AI requests missing profile info if detected |

---

## 8. Accessibility

| Element | Requirement |
|---------|-------------|
| Stepper | `role="navigation"`, `aria-label="Application progress"`, `aria-current="step"` |
| Form | `<form>` with `aria-label="Job application form"` |
| Each step | `<fieldset>` with `<legend>` |
| Auto-fill | `autocomplete` attributes on all fields |
| Errors | `aria-describedby` linking to error messages |
| Submit confirmation | `aria-live="polite"` on confirmation |
| CV selector | `role="radiogroup"`, each card `role="radio"` |

---

## 9. Future Expansion

| Feature | Phase |
|---------|-------|
| One-click apply (saved preferences) | Phase 5 |
| Video introduction upload | Phase 7 |
| Portfolio attachment | Phase 4 |
| Multi-CV comparison | Phase 3 |
| Salary requirements input | Phase 2 |
| Cover letter templates library | Phase 4 |

---

*Cross-references: DP-6:Screen (Application Form), DP-6:Nav, DP-6:Pattern (Auto-Save, Progressive Disclosure), DP-1:All*
