# Onboarding Flow

**Phase:** DP-6 (UX Architecture)
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md) — Rule 20), DP-4 ([Wizard-Layout.md](../05-Application-Shell/Layouts/Wizard-Layout.md)), DP-3 ([Wizard-Pattern.md](../04-Component-Library/Patterns/Wizard-Pattern.md))

---

## Purpose

Guide new users from account creation to a personalized, value-delivering workspace in under 5 minutes.

---

## User Goal

"Set up my profile quickly so MR:EGO can help me with my career."

---

## Flow Architecture

```
                    ┌────────────────────────────────────────────────────┐
                    │              ONBOARDING WIZARD (4 STEPS)           │
                    └────────────────────────────────────────────────────┘
                                                                         
  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
  │  WELCOME     │───▶│ GOAL         │───▶│ EXPERIENCE   │───▶│ SKILLS       │───▶│  FINISH      │
  │  (Pre-step)  │    │  (Step 1/4)  │    │  (Step 2/4)  │    │  (Step 3/4)  │    │  → DASHBOARD │
  └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

---

## Step Specifications

### Welcome (Pre-step)

| Aspect | Value |
|--------|-------|
| **Purpose** | Set positive tone, explain value of completing setup |
| **User Goal** | Feel motivated to complete onboarding |
| **Entry** | Account verification complete |
| **Exit** | Click "Begin Setup" |
| **Primary CTA** | "Begin Setup" |
| **Secondary CTA** | "Skip to Dashboard" (bottom, subdued) |
| **Content** | Warm welcome heading → 3 brief value cards (Personalized jobs, CV analysis, Career tracking) → Begin button |
| **Emotion** | Welcomed, valued, motivated |
| **Accessibility** | Heading as `<h1>`, value cards as `<section>` with headings |
| **AI Interaction** | None — this is human-first brand welcome |

### Step 1: Goal Selection

| Aspect | Value |
|--------|-------|
| **Purpose** | Understand user's primary career objective |
| **User Goal** | Tell MR:EGO what they want to achieve |
| **Primary CTA** | "Continue" |
| **Secondary CTA** | "Skip" |
| **Options** | "Find a new job", "Advance in my current role", "Change careers", "Build skills", "Explore opportunities" |
| **Selection** | Single select (radio card style) |
| **Validation** | Required for personalization |
| **Emotion** | Guided, heard |
| **AI Interaction** | AI may suggest default based on signals |

### Step 2: Experience

| Aspect | Value |
|--------|-------|
| **Purpose** | Capture professional work history |
| **User Goal** | Import or enter work experience efficiently |
| **Primary CTA** | "Continue" |
| **Secondary CTA** | "Skip", "Import from LinkedIn" |
| **Inputs** | Company, Title, Start date, End date (or "Current"), Description, Employment type |
| **Repeats** | Add multiple positions |
| **Validation** | Soft — only required if user chooses to add experience |
| **Emotion** | Productive, reflective |
| **AI Interaction** | AI suggests experience entries if CV or profile data available, AI auto-fills based on import |

### Step 3: Skills

| Aspect | Value |
|--------|-------|
| **Purpose** | Capture professional skills for matching |
| **User Goal** | List skills without spending time on taxonomy |
| **Primary CTA** | "Continue" |
| **Secondary CTA** | "Skip" |
| **Inputs** | Skill search (autocomplete from taxonomy), skill tags |
| **AI Suggestions** | AI recommends skills based on experience entries (with confidence) |
| **Validation** | None — all optional |
| **Emotion** | Confident, recognized |
| **AI Interaction** | AI analyzes experience and suggests relevant skills with confidence indicators; user accepts, modifies, or dismisses each |

### Step 4: Career Interests

| Aspect | Value |
|--------|-------|
| **Purpose** | Define career preferences for personalized recommendations |
| **User Goal** | Set direction for job matching |
| **Primary CTA** | "Complete Setup" |
| **Inputs** | Target industries (multi-select), preferred roles, location, remote preference, salary range, work authorization |
| **Validation** | Soft — only target industries recommended |
| **Emotion** | Excited, ready |
| **AI Interaction** | AI recommends career paths, target roles, and salary ranges based on experience + skills |

### Finish → Dashboard

| Aspect | Value |
|--------|-------|
| **Purpose** | Celebrate completion, reveal personalized dashboard |
| **User Goal** | See the value of completed setup |
| **Primary CTA** | "Go to Dashboard" |
| **Content** | Success animation → Personalized dashboard preview → "Your workspace is ready" |
| **Emotion** | Ready, accomplished, curious to explore |
| **AI Interaction** | Dashboard loads with personalized AI summary and recommendations based on onboarding data |

---

## Skip Strategy

Each step can be skipped individually. Skipped data is inferred or requested later in context:

| Skipped Step | Impact | Recovery |
|--------------|--------|----------|
| Goal | Generic recommendations | AI infers from behavior |
| Experience | No experience-based matching | Prompted at CV upload |
| Skills | Limited skill matching | AI extracts from CV later |
| Interests | Generic job recommendations | Refined as user interacts |

---

## Progress Persistence

- Onboarding progress auto-saves after each step
- User can close browser and resume from last completed step
- "Resume onboarding" prompt shows on next login until complete

---

## Entry Points

| Source | Trigger |
|--------|---------|
| Registration | Auto-redirect after email verification |
| Welcome page | "Begin Setup" click |
| Resume prompt | "Setup later" → prompts on dashboard until completed |
| Profile empty state | "Complete Profile" links to skipped steps |

---

## Accessibility Requirements

| Requirement | Specification |
|-------------|---------------|
| Stepper | `role="navigation"` with `aria-label="Onboarding progress"` |
| Current step | `aria-current="step"` |
| Step content | `role="region"` with `aria-labelledby` |
| Form fields | All labeled, `aria-describedby` for help text |
| Validation | `aria-live="assertive"` on errors |
| Skip button | `aria-label="Skip this step"` |
| Progress | `aria-valuenow` on hidden progress bar |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Vertical stepper, single-column forms, sticky bottom buttons, full-screen modal feel |
| Tablet (768-1023px) | Horizontal stepper (compact), single-column content, centered 600px max |
| Desktop (1024-1279px) | Horizontal stepper with labels, 2-column form layout, 720px max content |
| Ultra-wide (1600px+) | Content constrained to 960px centered, generous whitespace |

---

## AI Interaction Summary

| Step | AI Feature | Behavior |
|------|-----------|----------|
| Welcome | None | Brand-led experience |
| Goal | Goal inference | Subtle suggestion based on available signals |
| Experience | Auto-fill from import | "Import from LinkedIn" triggers AI parsing |
| Skills | Skill recommendations | AI analyzes experience → suggests skills (accept/dismiss) |
| Interests | Career path suggestions | AI recommends roles based on experience + skills |
| Dashboard | Personalized summary | AI generates welcome message + recommendations |

---

## State Matrix

| State | Step 1: Goal | Step 2: Experience | Step 3: Skills | Step 4: Interests |
|-------|-------------|-------------------|----------------|-------------------|
| Active | Options highlighted | Add form visible | Input + suggestions | Preference inputs |
| Complete | Goal selected | ≥1 experience | ≥1 skill | ≥1 industry |
| Skipped | No selection | No experience | No skills | No preferences |
| Error | Validation message | Date parse error | Taxonomy load error | Geographic data error |
| AI Loading | — | Import processing | Suggestion generation | Path calculation |
| AI Ready | — | Import preview | Suggestion cards | Path options |

---

*Onboarding is the user's first experience of MR:EGO's value. It must feel guided, not rushed; personalized, not generic; and respectful of the user's time. Every step dismissed today becomes a context-aware prompt tomorrow. Refer to [User-Journey.md](User-Journey.md) for the journey flow and [Screen-Inventory.md](Screen-Inventory.md) for screen specifications.*
