# Wizard-Pattern

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-2 ([Form-Specifications.md](../../03-Design-System/Forms/Form-Specifications.md)), DP-3 ([Composition-Rules.md](../Architecture/Composition-Rules.md))

---

## Purpose

Defines the multi-step guided workflow pattern for sequential data entry, configuration, and setup processes. Provides clear progress indication, per-step validation, navigation controls, and a review step before final submission.

---

## Composition

```
WizardPage (Container)
├── Wizard (Stepper + Content + Controls)
│   ├── Stepper (horizontal top)
│   │   ├── Step (multiple)
│   │   │   ├── StepIndicator (number/icon + checkmark when complete)
│   │   │   ├── StepConnector (line to next step)
│   │   │   ├── StepLabel
│   │   │   └── StepDescription (optional)
│   │   └── StepStatusBadge (error on validation-failed step)
│   ├── StepContent (current step panel)
│   │   ├── StepTitle
│   │   ├── StepDescription
│   │   ├── FormGroup (multiple, per-step fields)
│   │   │   ├── Input / Select / DatePicker / Switch / etc.
│   │   │   └── Validation
│   │   └── StepHelpText (contextual guidance)
│   ├── WizardControls (bottom navigation)
│   │   ├── BackButton (ghost variant, disabled on first step)
│   │   ├── NextButton (primary variant, validates current step)
│   │   ├── SubmitButton (primary variant, visible on final step)
│   │   └── CancelButton (ghost variant, left-aligned)
│   └── SaveProgressIndicator (optional)
│       ├── LastSavedTimestamp
│       └── AutoSaveBadge
├── ReviewStep (penultimate or final step)
│   ├── ReviewSection (grouped by step)
│   │   ├── ReviewSectionTitle
│   │   ├── ReviewField (label + value pairs)
│   │   └── EditLink (navigates back to corresponding step)
│   └── TermsCheckbox (if applicable)
│       └── Checkbox + TermsLink
└── CompletionStep (after submission)
    ├── SuccessIcon (checkmark animation)
    ├── SuccessMessage
    ├── NextActionButton ("Go to Dashboard")
    └── SummaryLink
```

---

## When to Use

- Multi-step forms with logical grouping (e.g., job posting, profile setup, onboarding)
- Configuration wizards with interdependent steps
- Checkout or enrollment flows requiring sequential data collection
- Any process where progress indication improves user confidence

## When NOT to Use

- Single-page forms (use FormGroup directly)
- Simple data entry with fewer than 3 fields
- Non-linear workflows where steps can be completed in any order
- Processes requiring parallel or simultaneous data entry

---

## Variants

### Linear Wizard
| Aspect | Specification |
|--------|---------------|
| Navigation | Sequential only — must complete step N to access step N+1 |
| Step access | Completed steps clickable for review; upcoming steps locked |
| Validation | Each step validates on "Next"; errors prevent advancing |
| Use case | Onboarding, setup flows, regulatory compliance |

### Non-Linear Wizard
| Aspect | Specification |
|--------|---------------|
| Navigation | Any completed step accessible; optional steps skippable |
| Step access | All steps visible; optional steps marked with "Optional" badge |
| Validation | Only required fields validated on final submission |
| Use case | Profile creation, document upload flows |

### Review-First Wizard
| Aspect | Specification |
|--------|---------------|
| Navigation | All steps shown upfront; user fills in any order |
| Step access | All steps accessible as editable sections on review page |
| Validation | Inline validation per field; full validation on submit |
| Use case | Settings configuration, preference setup |

### Modal Wizard
| Aspect | Specification |
|--------|---------------|
| Container | Full-screen Dialog instead of page |
| Stepper | Compact stepper at top of modal |
| Controls | Modal footer with Back/Next/Submit/Cancel |
| Use case | Quick creation flows, inline setup within existing page |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Loading** | Skeleton step content; stepper shows current step as loading | Steps not navigable |
| **Step active** | Current step indicator highlighted (brand color, filled); content panel visible | Form fields interactive |
| **Step complete** | Step indicator shows checkmark; connector line filled | Clickable to revisit |
| **Step upcoming** | Step indicator hollow/gray; connector line unfilled | Not clickable (linear); clickable with warning (non-linear) |
| **Step error** | Step indicator shows error icon; error badge on step label | Validation failed; user cannot proceed |
| **Step optional** | "Optional" badge on step label; dashed connector line | Can be skipped |
| **Step saving** | AutoSaveBadge shows "Saving..." | Background save in progress |
| **Reviewing** | Review step displays all entered data grouped by step | Edit links navigate to corresponding step |
| **Submitting** | SubmitButton shows spinner; all navigation disabled | Cannot navigate away during submission |
| **Complete** | Success animation; NextActionButton visible | Flow complete; user chooses next action |
| **Error on submit** | ErrorState in content area; error message with retry | Submission failed; retry or cancel |
| **Incomplete** | Warning when attempting to navigate away; discard confirmation | Unsaved changes prompt |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Stepper role | `role="navigation"`, `aria-label="Progress"` |
| Step list | `role="list"` on step container |
| Current step | `aria-current="step"` on active step indicator |
| Step state | `aria-label` on indicator: "Step 2: Billing Information (Complete)" |
| Progress value | `aria-valuenow`, `aria-valuemin`, `aria-valuemax` on hidden progress bar |
| Step content | `role="region"`, `aria-label="Step {N} content"`, `aria-labelledby` linked to step label |
| Back button | `aria-label="Go back to step {N-1}"` |
| Next button | `aria-label="Go to step {N+1}"` |
| Submit button | `aria-label="Submit form"` |
| Cancel button | `aria-label="Cancel and discard progress"` |
| Review edit links | `aria-label="Edit {section name}"` |
| Save indicator | `aria-live="polite"` for auto-save status |
| Validation errors | `aria-live="assertive"` on error summary; `aria-invalid` + `aria-describedby` per field |
| Focus management | On step change, focus moves to step title or first form field; on error, focus moves to first invalid field |
| Keyboard | Tab through form fields and controls; Enter to activate Next/Submit; no keyboard traps |
| Discard confirmation | `role="alertdialog"` when navigating away with unsaved changes |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Stepper forced to vertical orientation. Full-screen modal wizard. Step content single column. Back/Next fixed at bottom (sticky). Compact step indicators. Review step card-based layout. |
| Tablet (768-1023px) | Stepper horizontal if 4 steps or fewer; vertical if 5+. Step content single column. Modal wizard: centered dialog. |
| Desktop (1024-1279px) | Stepper horizontal. Step content up to 2-column form layout. Review step side-by-side sections. Modal wizard: md-sized dialog. |
| Wide (1280-1599px) | Stepper horizontal with descriptions visible. Step content 2-3 column form layout. Review step full-width sections. |
| Ultra-wide (1600px+) | Step content constrained to 960px max width, centered. Review step with inline editing. |

---

## Implementation Example

```typescript
<WizardPage>
  <Wizard
    steps={wizardSteps}
    activeStep={currentStep}
    orientation={{ mobile: 'vertical', desktop: 'horizontal' }}
    onStepChange={handleStepChange}
    onSubmit={handleSubmit}
    submitting={isSubmitting}
  >
    <Stepper>
      <Step status={step1Complete ? 'complete' : 'current'} label="Job Details" description="Basic job information" />
      <Step status={step2Status} label="Requirements" description="Skills and qualifications" optional />
      <Step status={step3Status} label="Description" description="Full job description" />
      <Step status={step4Status} label="Review" description="Review and publish" />
    </Stepper>
    <StepContent>
      {currentStep === 0 && (
        <FormGroup>
          <Input name="title" label="Job Title" required />
          <Select name="type" label="Employment Type" options={employmentTypes} required />
          <Input name="location" label="Location" />
          <DatePicker name="startDate" label="Start Date" />
        </FormGroup>
      )}
      {currentStep === 3 && (
        <ReviewStep>
          <ReviewSection title="Job Details" onEdit={() => goToStep(0)}>
            <ReviewField label="Title" value={formData.title} />
            <ReviewField label="Type" value={formData.type} />
          </ReviewSection>
          <TermsCheckbox checked={agreed} onChange={setAgreed}>
            I confirm the information is accurate
          </TermsCheckbox>
        </ReviewStep>
      )}
    </StepContent>
    <WizardControls>
      <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
      <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0}>Back</Button>
      {currentStep < steps.length - 1 ? (
        <Button variant="primary" onClick={handleNext}>Next</Button>
      ) : (
        <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>Publish Job</Button>
      )}
    </WizardControls>
  </Wizard>
</WizardPage>
```

---

## Related Patterns

| Pattern | Relationship |
|---------|-------------|
| [CRUD-Pattern.md](CRUD-Pattern.md) | Create/Edit forms can use Wizard for complex multi-entity creation |
| [Upload-Pattern.md](Upload-Pattern.md) | File upload step integrated within wizard flows |
| [Profile-Pattern.md](Profile-Pattern.md) | Profile setup and editing often uses multi-step wizard |
| [Settings-Pattern.md](Settings-Pattern.md) | Settings configuration wizards follow this pattern |

## Dependencies

| Component | Usage |
|-----------|-------|
| [Stepper](../Forms/Stepper.md) | Step progress indicators |
| [FormGroup](../Forms/FormGroup.md) | Step form fields |
| [Input](../Forms/Input.md) | Text inputs |
| [Select](../Forms/Select.md) | Dropdown selections |
| [DatePicker](../Forms/DatePicker.md) | Date fields |
| [Switch](../Forms/Switch.md) | Toggle fields |
| [Checkbox](../Forms/Checkbox.md) | Terms acceptance |
| [Button](../Core/Button.md) | Navigation controls |
| [Dialog](../Feedback/Dialog.md) | Modal wizard container |
| [Validation](../Forms/Validation.md) | Field-level validation |
| [Toast](../Feedback/Toast.md) | Save progress feedback |
| [Skeleton](../Feedback/Skeleton.md) | Loading state |
| [ErrorState](../Feedback/ErrorState.md) | Submit error |

## Anti-patterns

1. **More than 7 steps** — Break into sub-wizards or group steps. Wizard maxes at 7.
2. **Skipping validation to go back** — Back navigation must not require validation.
3. **No progress persistence** — Auto-save draft every 30s or on step change.
4. **Overloaded review step** — Review step must be scannable, not a wall of text.
5. **No cancel confirmation** — Always prompt before discarding wizard progress.
6. **Hiding steps from user** — All steps must be visible in stepper (upcoming steps may be dimmed but not hidden).
7. **Multiple primary actions per step** — Only one primary button per step (Next or Submit).
8. **No keyboard shortcut** — Enter should advance to next step (if no validation errors).
9. **Step content outside panel** — Each step's content must be contained in StepContent panel.
10. **Loading state without skeleton** — Use skeleton placeholders, not blank panels.
