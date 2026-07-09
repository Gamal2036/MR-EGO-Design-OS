# Onboarding — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:Screen (Onboarding), DP-6:Nav (Onboarding Flow), DP-1:All

---

## Purpose

Capture essential user data to personalize the MR:EGO experience. Four-step wizard with horizontal stepper. No sidebar. Clean, focused layout with progress indicator.

---

## Layout Overview (All Steps)

```
┌──────────────────────────────────────────────────────────────┐
│  TOP BAR (56px)                                               │
│  Logo            Step 2 of 4            Skip ▸               │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  STEPPER (desktop: horizontal, mobile: vertical)             │
│  ┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐             │
│  │ GOAL │═══▶│ EXP  │═══▶│SKILLS│═══▶│INTERES│             │
│  │ ●●●● │    │ ○○○○ │    │ ○○○○ │    │ ○○○○ │             │
│  └──────┘    └──────┘    └──────┘    └──────┘             │
│                                                              │
│         ┌──────────────────────────────────────┐            │
│         │  CONTENT AREA (960px max, centered)   │           │
│         │                                      │           │
│         │  [Step-specific content below]       │           │
│         │                                      │           │
│         └──────────────────────────────────────┘            │
│                                                              │
│  BOTTOM BAR (64px, fixed, glass)                             │
│  [Back]                              [Continue ▸]           │
└──────────────────────────────────────────────────────────────┘
```

---

## Stepper Component

| Property | Value |
|----------|-------|
| Position | Below top bar, fixed |
| Height | 72px |
| Max width | 720px (centered) |
| Padding | Space-5 (16px) vertical |
| Background | Surface-1, border-bottom Border-Default |

### Step Indicator:
| Property | Value |
|----------|-------|
| Step circle | 36px diameter |
| Active | Primary-600 filled, white checkmark or number |
| Completed | Primary-100 bg, Primary-600 dot, Primary line |
| Upcoming | Neutral-200 bg, Neutral-400 dot, Neutral-200 line |
| Connector line | 2px height, 48px width between circles |
| Label below | Caption (13px), Text-Secondary |

### Steps:
| # | Label | Icon |
|---|-------|------|
| 1 | Goal | Target |
| 2 | Experience | Briefcase |
| 3 | Skills | Star |
| 4 | Interests | Compass |

---

## Step 1: Goal Selection

| Property | Value |
|----------|-------|
| Max width | 720px centered |
| Padding top | Space-9 (40px) |
| Padding bottom | Space-11 (64px) + bottom bar height |

### Elements (top to bottom):

**Question heading:**
| Property | Value |
|----------|-------|
| Text | "What brings you to MR:EGO?" |
| Type | Heading-2 (28px) |
| Color | Text-Primary |
| Spacing bottom | Space-2 (4px) |

**Sub-question:**
| Property | Value |
|----------|-------|
| Text | "Choose your primary goal. You can always change this later." |
| Type | Body (15px) |
| Color | Text-Secondary |
| Spacing bottom | Space-8 (32px) |

**Goal cards (2x2 grid):**
| Property | Value |
|----------|-------|
| Grid | 2-column |
| Gap | Space-5 (16px) |
| Card width | 344px each (at 720px container) |

**Each goal card:**
| Property | Value |
|----------|-------|
| Padding | Space-7 (24px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | Border-Default (2px on selected: Primary-500) |
| Min height | 140px |
| Hover | Shadow-2, border-hover |
| Selected | Primary-500 border, Primary-50 bg |
| Input | Hidden radio, visually styled on card |
| Icon | 40px container, center, radius 10px |
| Title | Heading-4 (18px) |
| Description | Body-Small (14px), Text-Secondary, 2 lines max |

### Goal Options:
| Card | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | Search | Find a Job | Discover opportunities that match my skills |
| 2 | Swap | Career Change | Transition into a new field or role |
| 3 | Chart | Skill Growth | Develop skills for career advancement |
| 4 | Spark | Explore | See what MR:EGO offers for my career |

### Skip option:
"Skip for now" link at bottom left, subdued.

### Bottom bar (Continue):
| Property | Value |
|----------|-------|
| Height | 64px |
| Background | Glass-BG, border-top |
| Position | Fixed bottom |
| Padding | 0 Space-8 |
| Back | Button-ghost, disabled on step 1 |
| Continue | Button-Primary, disabled until selection made |

---

## Step 2: Experience

| Property | Value |
|----------|-------|
| Max width | 720px centered |

### Elements:

**Heading:** "Tell us about your experience"
**Sub:** "Add your work history. You can import from LinkedIn or upload your CV."

**Import options (optional):**
| Button | Text | Icon |
|--------|------|------|
| Import from LinkedIn | LinkedIn logo | 40px x 40px |
| Upload CV | Upload icon | Button-Secondary |
| Spacing below | Space-8 |

**Experience list (if any added):**
| Property | Value |
|----------|-------|
| Layout | Stacked cards |
| Gap | Space-5 (16px) |

**Experience card (existing):**
| Property | Value |
|----------|-------|
| Padding | Space-5 (16px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | Border-Default |
| Company + Title | Heading-4, Text-Primary |
| Dates | Body-Small, Text-Secondary |
| Description | Body, 2 lines truncated |
| Edit/Delete | Icon buttons right |
| Drag handle | Left edge (for reorder) |

**Add experience form (card below list, default collapsed):**
| Property | Value |
|----------|-------|
| Title | "Add experience" |
| Fields | Company, Title, Start date, End date, Current checkbox, Description |
| Field layout | 2-column (Company + Title), 2-column (dates) |
| Description | Textarea, 80px height |
| CTA | "Add" — Button-Secondary |

**Bottom bar:** Back enabled, Continue enabled (skippable step).

---

## Step 3: Skills

| Property | Value |
|----------|-------|
| Max width | 720px centered |

### Elements:

**Heading:** "What are your professional skills?"

**AI Suggestions section (if experience entered):**
| Property | Value |
|----------|-------|
| Title | "Suggested based on your experience" |
| Type | Body-Small, 600 weight, Text-Secondary |
| Suggestion chips | Neutral-200 bg, radius-full, removable |
| Confidence | Small AI badge per suggestion |
| Gap | Space-2 (4px) between chips |

**Manual skill input:**
| Property | Value |
|----------|-------|
| Type | Autocomplete input |
| Height | 40px |
| Placeholder | "Type a skill..." |
| Behavior | Matches against 500+ skill taxonomy |
| Dropdown | 4-6 suggestions, click to add |
| Tag display | Chips below input |

**Added skills (chip grid):**
| Property | Value |
|----------|-------|
| Layout | Flex wrap |
| Chip | 14px text, 8px h padding, 28px h, radius-full, Neutral-200 bg, close icon |

**Bottom bar:** Back enabled, Continue enabled (skippable).

---

## Step 4: Career Interests

| Property | Value |
|----------|-------|
| Max width | 720px centered |

### Elements:

**Heading:** "Define your career direction"

**Preference fields (2-column layout):**
| Field | Type | Options |
|-------|------|---------|
| Target industry | Select dropdown | Tech, Healthcare, Finance, etc. |
| Role type | Select | Individual Contributor, Manager, Director, etc. |
| Preferred location | Text input + suggestions | — |
| Remote preference | Toggle group | On-site, Hybrid, Remote |
| Salary range | Dual slider | Min—Max with labels |
| Willing to relocate | Toggle | Yes/No |

**AI Recommendations card (optional):**
| Property | Value |
|----------|-------|
| Position | Right of main form (desktop) or below (mobile) |
| Title | "AI Career Path Suggestions" |
| Content | 2-3 recommended roles based on experience + skills |
| Badges | AI confidence indicator per suggestion |

**Bottom bar:** "Complete Setup" — Button-Primary (instead of "Continue").

---

## Completion State

| Element | Specification |
|---------|---------------|
| Animation | Checkmark circle with 300ms scale-in |
| Title | "You're all set!" — Heading-2 |
| Subtitle | "Your personalized career dashboard is ready." |
| CTA | "Go to Dashboard" — Button-Primary, 200x48px |
| Redirect | 3 second auto-redirect with countdown |

---

## Responsive Behavior

| Element | Mobile (<768px) | Tablet (768-1023px) | Desktop (1024px+) |
|---------|-----------------|---------------------|-------------------|
| Stepper | Vertical list (compact) | Horizontal | Horizontal with labels |
| Goal cards | 1-column stack | 2x2 grid | 2x2 grid |
| Experience form | Single column | 2-column fields | 2-column fields |
| Skills | Stacked | Side-by-side AI/manual | Side-by-side |
| Interests | Single column | 2-column | 2-column + AI panel |
| Bottom bar | Sticky fixed | Fixed | Fixed |
| Content width | Full (Space-5 margins) | 600px | 720px |

---

## Loading States

| State | Behavior |
|-------|----------|
| Step transition | Content fades out (150ms), new step fades in (200ms) |
| Skill suggestions | Skeleton chips (3 x 80px x 28px), pulse animation |
| AI recommendations | Skeleton card: title bar + 3 lines |
| Save progress | Static indicator "Progress saved" — no loading needed |

---

## Error States

| Error | Behavior |
|-------|----------|
| Field validation | Inline error below specific field |
| Save failure | Toast: "Could not save progress. Your data is safe." |
| Network loss | Banner at top: "No internet — changes saved locally" |
| Skill taxonomy fail | Fallback: free-text input allowed |

---

## Empty States

| Section | State |
|---------|-------|
| Experience list (no entries) | "Add your first work experience" with CTA |
| Skills (no entries) | "Type a skill above or let AI suggest some" |
| AI suggestions (no data) | Hidden — not shown until experience exists |

---

## AI Integration

| Step | Feature | Behavior |
|------|---------|----------|
| Step 2 | LinkedIn/CV import suggestion | AI recommends import for faster setup |
| Step 3 | Skill suggestions from experience | AI analyzes experience text, extracts skills, shows confidence per suggestion |
| Step 4 | Career path recommendations | AI matches skills+experience to roles, shows best 2-3 matches with confidence |
| All | Progress persistence | AI saves partial progress silently |

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Form fields → Back → Continue |
| Enter | Continue (from any field on last valid field) |
| Escape | Close dropdown, deselect |
| Arrow keys | Navigate skill suggestions, goal cards |
| Ctrl+Z | Undo skill addition (within session) |

---

## Accessibility

| Element | Requirement |
|---------|-------------|
| Stepper | `role="navigation" aria-label="Setup progress"`, `aria-current="step"` on active |
| Step changes | Focus moves to section heading |
| Goal cards | Radio group `role="radiogroup"`, each card `role="radio"` |
| Form fields | Explicit `<label>`, `aria-describedby` for help text |
| Skill chips | `role="listitem"`, dismiss button `aria-label="Remove [skill]"` |
| AI suggestions | `aria-label="AI suggested skill: [skill]. Confidence: [%]"` |
| Progress | Step number announced: "Step 2 of 4: Experience" |
| Bottom bar | `aria-label="Continue to next step"` |

---

## Future Expansion

| Feature | Phase |
|---------|-------|
| LinkedIn/Google profile import | Phase 2 |
| Skill assessment integration | Phase 4 |
| Learning path recommendation from interests | Phase 5 |
| Mentor matching after onboarding | Phase 6 |
| Video introduction setup | Phase 7 |
| Company preferences (size, culture) | Phase 3 |

---

*Cross-references: DP-6:Screen (Onboarding), DP-6:Nav (Onboarding Flow), DP-6:Pattern (Stepper, Auto-Save), DP-1:All*
