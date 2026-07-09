# Application Wizard — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Status:** Design Specification
**Inherits:** DP-0 through DP-8
**Pages Covered:** Application Wizard 5-Step Flow, Contact, CV Selection, Cover Letter, Review, Confirmation

---

## Purpose

Guided multi-step application submission flow. Pre-fills from user profile, offers CV selection with AI match scoring, generates tailored cover letters, performs completeness checks, and delivers confirmation with next steps.

---

## Layout Overview

```
┌──────────┬──────────────────────────────────────────────────────────────┐
│          │  TOPBAR (56px)                                               │
│          │  ← Senior Frontend Engineer @ Acme Corp                      │
│ SIDEBAR  ├──────────────────────────────────────────────────────────────┤
│ (240px)  │  CONTENT (centered, 720px max)                               │
│          │                                                              │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │  STEPPER (64px)                                                │    │
│  │  ┌──────┐  ─── ┌──────┐  ─── ┌──────┐  ─── ┌──────┐  ─── ┌────┐│    │
│  │  │  1   │      │  2   │      │  3   │      │  4   │      │  5 ││    │
│  │  │Contact│      │  CV  │      │Cover │      │Review│      │Done││    │
│  │  └──────┘      └──────┘      │Letter│      └──────┘      └────┘│    │
│  │                               └──────┘                           │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │  STEP CONTENT (centered 640px)                                │    │
│  │                                                              │    │
│  │  · Step 1: Contact Info (2-column fields)                    │    │
│  │  · Step 2: CV Selection (radio cards + upload)               │    │
│  │  · Step 3: Cover Letter (AI generate + editor)               │    │
│  │  · Step 4: Review (read-only accordion + submit)             │    │
│  │  · Step 5: Confirmation (checkmark + next steps)             │    │
│  │                                                              │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                              │
│  BOTTOM BAR (sticky, 64px, glass)                                     │
│  [← Back]                                            [Continue ▸]     │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Section 1: Stepper (64px)

| Property | Value |
|----------|-------|
| Purpose | Show current progress through 5-step flow |
| Priority | P0 |
| Height | 64px |
| Max width | 640px (centered) |
| Padding top | Space-4 (12px) |
| Spacing below | Space-8 (32px) |
| Background | Surface-0 |

### Step Items

| # | Label | Icon |
|---|-------|------|
| 1 | Contact | User icon (20px) |
| 2 | CV | Document icon (20px) |
| 3 | Cover Letter | Edit icon (20px) |
| 4 | Review | Check icon (20px) |
| 5 | Done | Checkmark icon (20px) |

### Visual Spec

| State | Circle | Connector Line | Label |
|-------|--------|----------------|-------|
| Completed | 32×32px, Primary-100 bg, Primary-600 icon, radius-full | 32px height, 2px solid Primary-300 | Body-Small (14px/500), Primary-600 |
| Active | 32×32px, Primary-600 bg, Neutral-0 icon, radius-full | 32px height, 2px solid Primary-300 (from left) | Body-Small (14px/600), Primary-600 |
| Upcoming | 32×32px, Neutral-200 bg, Neutral-400 icon, radius-full | 32px height, 2px solid Neutral-200 | Body-Small (14px/400), Neutral-400 |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | navigation |
| aria-label | "Application progress" |
| role="list" | Step list |
| aria-current="step" | On active step |
| aria-label | "Step 1: Contact Info, active" on active |
| aria-label | "Step 2: CV, completed" on completed |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Focus stepper (overview) |
| Enter | Navigate to completed step (clickable only for completed steps) |

---

## Section 2: Step 1 — Contact Info

| Property | Value |
|----------|-------|
| Purpose | Collect or confirm personal and contact information |
| Priority | P0 |
| Max width | 640px |
| Layout | 2-column grid on desktop, single column on mobile |
| Gap between columns | Space-5 (16px) |
| Gap between rows | Space-5 (16px) |

### Fields

| Field | Type | Pre-filled | Required |
|-------|------|------------|----------|
| Full Name | Text input | Yes — from profile | Yes |
| Email | Text input (email) | Yes — from account | Yes |
| Phone | Text input (tel) | Yes — from profile | Yes |
| Location | Text input | Yes — from profile | Yes |
| LinkedIn URL | Text input (url) | Yes — from profile | No |
| Portfolio URL | Text input (url) | Yes — from profile | No |
| Additional Notes | Textarea (4 rows) | No | No |

### Input Spec

| Property | Value |
|----------|-------|
| Height | 40px (textarea: 96px) |
| Border | 1px solid Neutral-300 |
| Border radius | radius-md (8px) |
| Padding | Space-3 (8px) Space-5 (16px) |
| Background | Surface-1 |
| Label | Body-Small (14px/500), Text-Primary, margin-bottom Space-3 |
| Placeholder | Body (15px/400), Neutral-400 |
| Required indicator | "*" — Error-500, after label |

### States

| State | Visual |
|-------|--------|
| Default | Neutral-300 border, Surface-1 bg |
| Hover | Neutral-400 border |
| Focus | Primary-500 border, 2px Primary-400/30 ring |
| Filled | Normal, with value |
| Error | Error-500 border, Error-50 bg, error message below (Caption/400, Error-600) |
| Disabled | Opacity 0.5, Neutral-200 bg, cursor not-allowed |
| Pre-filled | Primary-50 left border 3px (subtle indicator of auto-filled fields) |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | form |
| aria-label | "Contact information" |
| aria-required="true" | On required fields |
| aria-invalid | On error fields |
| aria-describedby | Error message elements |
| autoComplete | "name", "email", "tel", etc. |

---

## Section 3: Step 2 — CV Selection

| Property | Value |
|----------|-------|
| Purpose | Select which CV to attach or upload a new one |
| Priority | P0 |
| Max width | 640px |
| Layout | Radio card list + upload option |

### CV Option Cards (Radio)

| Property | Value |
|----------|-------|
| Height | 80px |
| Padding | Space-5 (16px) |
| Background | Surface-1 |
| Border | 2px solid Neutral-200 |
| Border radius | radius-md (8px) |
| Margin bottom | Space-3 (8px) |
| Cursor | pointer |

### Elements per Card

| Element | Spec |
|---------|------|
| Radio circle | 20×20px, outer ring Neutral-300, inner fill Primary-500 when selected |
| File icon | 32×32px, Primary-500 |
| Title | Body (15px/600), Text-Primary |
| Version | Caption (13px/400), Text-Secondary |
| Match badge | "92% Match" — Caption (12px/600), Primary-600 text, Primary-50 bg, radius-sm |
| Date | Caption (13px/400), Text-Secondary, right-aligned |
| Active badge | "Active" — Caption (12px/600), Success-600 text, Success-50 bg, radius-sm |

### Upload Option

| Property | Value |
|----------|-------|
| Height | 80px |
| Border | 2px dashed Neutral-300 |
| Border radius | radius-md |
| Hover border | 2px dashed Primary-400 |
| Icon | 24×24px, Neutral-400 |
| Text | Body-Small (14px/400), Text-Secondary |

### States

| State | Radio Card | Upload Option |
|-------|------------|---------------|
| Default | Neutral-200 border | Dashed Neutral-300 |
| Hover | Neutral-300 border | Dashed Primary-400 |
| Selected | Primary-500 border, Primary-50 bg | N/A |
| Focus | 2px Primary-400 ring | 2px Primary-400 ring |
| Disabled | Opacity 0.5 | Opacity 0.5 |
| Loading | Skeleton 80px bars | N/A |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | radiogroup |
| aria-label | "Select a CV" |
| role="radio" | Per card |
| aria-checked | true/false on selected card |

---

## Section 4: Step 3 — Cover Letter

| Property | Value |
|----------|-------|
| Purpose | Generate or write a cover letter for the application |
| Priority | P0 |
| Max width | 640px |

### AI Generate Button

| Property | Value |
|----------|-------|
| Width | 100% |
| Height | 40px |
| Background | Primary-500 |
| Text | Body-Small (14px/600), Neutral-0, "✨ Generate with AI" |
| Border radius | radius-md |
| Margin bottom | Space-5 (16px) |

### States

| State | Visual |
|-------|--------|
| Default | Primary-500 bg |
| Hover | Primary-600 bg |
| Generating | Spinner replaces icon, text "Generating..." , button disabled |
| Complete | Button changes to "Regenerate" — outline style |
| Error | Error-500 border, "Generation failed. Try again." |

### Text Editor

| Property | Value |
|----------|-------|
| Min height | 300px |
| Background | Surface-1 |
| Border | 1px solid Neutral-300 |
| Border radius | radius-md (8px) |
| Padding | Space-5 (16px) |
| Font | Body (15px/400), Text-Primary, line-height 1.6 |
| Placeholder | "Write your cover letter here..." — Neutral-400 |

### Formatting Toolbar

| Property | Value |
|----------|-------|
| Height | 40px |
| Background | Neutral-50 |
| Border bottom | 1px solid Neutral-200 |
| Padding | Space-3 (8px) |
| Border radius top | radius-md (inherited) |

| Tool | Icon | Action |
|------|------|--------|
| Bold | **B** | Toggle bold |
| Italic | *I* | Toggle italic |
| Bullet list | • | Insert bullet list |
| Numbered list | 1. | Insert numbered list |
| Link | 🔗 | Insert/edit link |
| Separator | `|` | 1px solid Neutral-300 |
| AI Tone | ✨ | Dropdown: Professional, Friendly, Enthusiastic |
| Word count | "347 words" — Caption, right-aligned | |

### States

| State | Editor |
|-------|--------|
| Default | Empty with placeholder |
| Filled | Content visible |
| Focus | Primary-500 border, no ring (editor handles its own) |
| AI generated | Content slides in, highlight new text in Primary-50 for 2s |
| Loading | Skeleton block 300px height |
| Disabled | Opacity 0.6, no editing |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | textbox (contenteditable) |
| aria-label | "Cover letter editor" |
| aria-multiline | true |
| role="toolbar" | For formatting bar |
| aria-label | "Formatting toolbar" |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move between toolbar and editor |
| Ctrl+B | Bold |
| Ctrl+I | Italic |
| Ctrl+Shift+7 | Bullet list |
| Tab in editor | Insert 2-space indent |

---

## Section 5: Step 4 — Review

| Property | Value |
|----------|-------|
| Purpose | Final review of all application data before submission |
| Priority | P0 |
| Max width | 640px |

### Read-Only Accordion

| Property | Value |
|----------|-------|
| Layout | Stacked sections with expand/collapse |
| Each item height (collapsed) | 48px |
| Background | Surface-1 |
| Border | 1px solid Neutral-200 |
| Border radius | radius-md (8px) |
| Margin bottom | Space-3 (8px) |

### Sections

| Section | Content |
|---------|---------|
| Contact Info | Full name, email, phone, location, links |
| CV | Selected CV title, version, match score |
| Cover Letter | Preview (first 150 chars) + "Read full" link |
| Additional Notes | Notes text or "None provided" |

### AI Completeness Check

| Property | Value |
|----------|-------|
| Position | Above accordion |
| Background | Primary-50 |
| Border | 1px solid Primary-200 |
| Border radius | radius-md |
| Padding | Space-5 (16px) |
| Margin bottom | Space-5 (16px) |

| State | Visual |
|-------|--------|
| Checking | Spinner + "Checking your application..." |
| Complete (all good) | ✅ "Your application looks complete!" — Primary-600, check icon |
| Issues found | ⚠️ "We found 2 areas to review" — Warning-500, warning icon + list |
| Complete | 0 issues → changes to success state |

### Submit Button

| Property | Value |
|----------|-------|
| Width | 100% |
| Height | 48px |
| Background | Primary-500 |
| Text | Body (15px/600), Neutral-0, "Submit Application" |
| Border radius | radius-md |
| Margin top | Space-7 (24px) |

### States

| State | Visual |
|-------|--------|
| Default | Primary-500 bg |
| Hover | Primary-600 bg |
| Submitting | Spinner + "Submitting...", button disabled |
| Complete | Success state — transitions to Step 5 |
| Error | Error-500 border, "Submission failed. Try again." |
| Disabled | Opacity 0.5, cursor not-allowed (issues remain) |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | region |
| aria-label | "Review your application" |
| aria-live="polite" | Completeness check results |

---

## Section 6: Step 5 — Confirmation

| Property | Value |
|----------|-------|
| Purpose | Confirm submission and show next steps |
| Priority | P0 |
| Layout | Centered column, 480px max-width |
| Padding top | Space-10 (48px) |
| Text alignment | Center |

### Elements

| Element | Spec |
|---------|------|
| Checkmark icon | 64×64px, Success-500 bg, Neutral-0 checkmark, radius-full |
| Title | Heading-2 (28px/650), Text-Primary, margin-top Space-7 |
| Confirmation ID | Body (15px/500), Primary-600, "APP-2024-08-15-0042", margin-top Space-3 |
| Description | Body (15px/400), Text-Secondary, margin-top Space-5, "Your application for Senior Frontend Engineer at Acme Corp has been submitted." |
| Next steps box | Surface-1, border Neutral-200, radius-md, padding Space-5, margin-top Space-8 |
| Next step items | Caption (13px/400), Text-Primary, check items with 16px icon |
| Action buttons | Space-7 top margin, centered row |

### Next Steps

| Item | Description |
|------|-------------|
| 📅 | Interview prep suggestion — "Research the company and practice common questions" |
| 📊 | Track this application in Application Tracker |
| 🔄 | Continue searching for similar roles |
| ✨ | AI suggested: "Prepare for a technical interview" |

### Action Buttons

| Button | Spec | Behavior |
|--------|------|----------|
| View Application | Primary-500, 40px height, radius-md | Navigate to Application Tracker |
| Back to Search | Secondary, 40px height, radius-md | Navigate to Job Search |
| Share Confirmation | Icon-only, 40px, Neutral-100 bg | Copy link or share |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | region |
| aria-label | "Application submitted successfully" |
| aria-live="assertive" | To announce success |

---

## Section 7: Bottom Bar (Sticky, 64px, Glass)

| Property | Value |
|----------|-------|
| Purpose | Persistent navigation controls for wizard flow |
| Priority | P0 |
| Height | 64px |
| Background | Glass Navigation (0.85 opacity, backdrop-filter blur 12px) |
| Border top | 1px solid Neutral-200/50 |
| Padding | Space-5 (16px) |
| Elevation | Layer 5 |
| z-index | 100 |

### Elements

| Element | Spec | Position |
|---------|------|----------|
| Back button | Secondary, 40px, radius-md, Body-Small/500, "← Back" | Left |
| Continue button | Primary-500, 40px, radius-md, Body-Small/600, "Continue →" | Right |
| Submit button | Primary-500, 40px, radius-md, Body-Small/600, "Submit →" | Right (Step 4 only) |

### Button States per Step

| Step | Back | Continue | Notes |
|------|------|----------|-------|
| 1 Contact | Disabled (no previous step) | "Continue →" | Validate fields first |
| 2 CV | "← Back" enabled | "Continue →" | Require CV selection |
| 3 Cover Letter | "← Back" enabled | "Continue →" | Optional content |
| 4 Review | "← Back" enabled | "Submit →" | Completeness check must pass |
| 5 Done | Hidden | Hidden | Step 5 has its own actions |

### States

| State | Visual |
|-------|--------|
| Default | Glass bg, full controls |
| Disabled back | Opacity 0.4 cursor not-allowed |
| Disabled continue | Opacity 0.4 cursor not-allowed (validation fails) |
| Submitting | Continue shows spinner |
| Offline | "You are offline. Submission will resume when connected." |

### Accessibility

| Attribute | Value |
|-----------|-------|
| Role | region |
| aria-label | "Wizard navigation" |

---

## Section 8: AI Integration

| Feature | Description | Priority |
|---------|-------------|----------|
| CV match suggestion | Recommends best CV based on job match | P0 |
| Cover letter generation | Tailored cover letter from CV + job description | P0 |
| Completeness check | Scans all fields for missing data | P0 |
| Interview prep suggestion | Generates likely questions after submit | P1 |
| Salary expectation | Pre-fill based on market data from job | P1 |
| Auto-fill optimization | Order fields for fastest completion | P2 |

### AI States per Step

| Step | AI State | Visual |
|------|----------|--------|
| 2 CV | Suggesting | "Best match: Senior Frontend v2.3 (92%)" highlight on best card |
| 3 Cover Letter | Generating | Spinner + shimmer preview |
| 3 Cover Letter | Generated | Content appears with highlight animation |
| 4 Review | Checking | Completeness spinner |
| 4 Review | Complete | Success message or issue list |
| 5 Done | Suggested | Interview prep suggestion card |

---

## States Matrix

| State | Stepper | Contact | CV | Cover Letter | Review | Confirmation |
|-------|---------|---------|----|-------------|--------|-------------|
| Default | Step 1 active | Pre-filled | Cards visible | Editor empty | Accordion collapsed | Hidden |
| Hover | Hover on completed step | Field border | Card border | Toolbar button | Accordion header | Button |
| Focus | Step circle | Input ring | Radio ring | Editor focus | Section focus | Button ring |
| Active | Current step marked | — | Selected card | — | Expanded section | — |
| Loading | — | — | Skeleton cards | Skeleton editor | Completeness spin | — |
| Error | — | Field errors | — | Gen error | Submit error | — |
| Disabled | Non-clickable steps | Pre-filled locked | Upload disabled | — | Submit disabled | — |
| Offline | — | — | Cached CVs only | Cached only | Cached check | — |

---

## Responsive Behavior

| Breakpoint | Layout | Changes |
|------------|--------|---------|
| >1200px | Full with sidebar | Centered 720px content, 2-column form |
| 900-1200px | Full with sidebar | Same, content at 640px |
| 600-900px | No sidebar | Stepper compact, single-column form, drawer nav |
| <600px | Full screen | Stepper horizontal scrollable, full-width form, bottom bar full-width |

### Tablet (<900px)

| Element | Change |
|---------|--------|
| Sidebar | Collapsed |
| Stepper | Labels hidden on mobile, icons only |
| Contact fields | Single column |
| CV cards | Full width |
| Cover letter toolbar | Collapsible, inline formatting only |
| Bottom bar | Full width glass bar |

### Mobile (<600px)

| Element | Change |
|---------|--------|
| Stepper | Horizontal scroll (overflow-x), 28px circles, no labels |
| Content padding | Space-3 (8px) |
| Contact | Single column, full-width fields |
| CV cards | Compact: 64px height, smaller icons |
| Cover letter | 250px min-height, toolbar in overflow menu |
| Review | Full-width accordion, no side padding |
| Confirmation | Full-width, smaller checkmark (48px) |
| Bottom bar | Sticky, full width, Back + Continue icons only |

---

## Color Tokens Reference

| Element | Light Token | Dark Token |
|---------|-------------|------------|
| Step completed circle | Primary-100 bg | Primary-900 |
| Step completed icon | Primary-600 | Primary-400 |
| Step active circle | Primary-600 bg | Primary-500 |
| Step active icon | Neutral-0 | Neutral-0 |
| Step upcoming circle | Neutral-200 bg | Neutral-700 |
| Step upcoming icon | Neutral-400 | Neutral-500 |
| Stepper connector completed | Primary-300 | Primary-700 |
| Stepper connector upcoming | Neutral-200 | Neutral-700 |
| Selected CV card border | Primary-500 | Primary-400 |
| Selected CV card bg | Primary-50 | Primary-950 |
| Input focus ring | Primary-400/30 | Primary-400/30 |
| Input error border | Error-500 | Error-400 |
| Input error bg | Error-50 | Error-950 |
| Pre-filled indicator | Primary-50 left border | Primary-950 left border |
| Completeness box bg | Primary-50 | Primary-950 |
| Completeness box border | Primary-200 | Primary-800 |
| Submit button | Primary-500 | Primary-600 |
| Success checkmark bg | Success-500 | Success-400 |
| Bottom bar bg | Glass Nav 0.85 | Glass Nav Dark |

---

## Typography Reference

| Element | Token | Size | Weight |
|---------|-------|------|--------|
| Step label | Body-Small | 14px | 400/500/600 |
| Field label | Body-Small | 14px | 500 |
| Input text | Body | 15px | 400 |
| CV card title | Body | 15px | 600 |
| CV card version | Caption | 13px | 400 |
| Cover letter content | Body | 15px | 400 |
| Review section title | Body | 15px | 500 |
| Review section content | Body | 15px | 400 |
| Button text | Body-Small | 14px | 500/600 |
| Confirmation title | Heading-2 | 28px | 650 |
| Confirmation description | Body | 15px | 400 |
| Confirmation ID | Body | 15px | 500 |

---

## Spacing Reference

| Usage | Token | Value |
|-------|-------|-------|
| Stepper bottom | Space-8 | 32px |
| Between form fields | Space-5 | 16px |
| Card margin bottom | Space-3 | 8px |
| Content max width | — | 640px |
| Bottom bar height | — | 64px |
| Bottom bar padding | Space-5 | 16px |
| Confirm top padding | Space-10 | 48px |
| Submit button top | Space-7 | 24px |
| Label to input | Space-3 | 8px |
| Icon to text | Space-3 | 8px |

---

## Future Expansion Items

| Item | Description | Priority |
|------|-------------|----------|
| Save as draft | Auto-save per step with resume capability | P1 |
| Multi-application | Submit same package to multiple jobs | P2 |
| Portfolio attachment | Upload / select portfolio items per application | P2 |
| Reference contacts | Optional reference information step | P2 |
| Skills assessment | Inline quiz/assessment before submit | P3 |
| Salary negotiation | Pre-filled expected salary with market data | P2 |
| Cover letter templates | 5 templates (concise, story, bullet, etc.) | P1 |
| Application history | Complete audit of all submitted applications | P1 |
| Referral request | "Ask your network for a referral" step | P2 |
| Follow-up reminder | Auto-schedule follow-up email after submit | P2 |
| Integrated calendar | Pick interview availability in flow | P3 |
