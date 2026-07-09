# User Journey

**Phase:** DP-6 (UX Architecture)
**Design Authority:** DP-0 ([Product-Constitution.md](../01-Constitution/Product-Constitution.md) — User Journey Philosophy), DP-5 ([Emotional-Goals.md](../06-Visual-Foundation/Identity/Emotional-Goals.md))

---

## Journey 1: First Visit

```
First Visit → Landing → Welcome → Sign Up → Verification → Profile Start
```

### Purpose
Convert a first-time visitor into an activated user who has started their profile.

### Emotional Arc
Curious → Intrigued → Welcomed → Committed → Validated → Motivated

### Steps

| Step | Screen | User Goal | Entry | Exit | Primary CTA | Emotion |
|------|--------|-----------|-------|------|-------------|---------|
| First Visit | Landing | Understand MR:EGO value | External link, ad, referral | Scroll or CTA click | "Start Your Journey" | Intrigued, curious |
| Landing → Welcome | Welcome | Feel guided, not sold | Landing CTA click | Continue button | "Begin Setup" | Welcomed, valued |
| Sign Up | Authentication | Create account quickly | Welcome "Begin" | Submit form | "Create Account" | Committed |
| Verification | Authentication | Confirm identity | Sign up success | Verified redirect | "Verify Email" | Validated |
| Profile Start | Onboarding | Begin personal setup | Verification complete | First field filled | "Set Up Profile" | Motivated |

### Accessibility
- Landing headings use proper `<h1>` hierarchy
- All CTAs have `aria-label` matching visible text
- Skip link available before navigation
- Form validation announced via `aria-live`

### Responsive
- Mobile: Full-bleed auth card, bottom-anchored CTA
- Tablet: Centered card, 400px max width
- Desktop: Card with ambient background, brand illustration adjacent
- Ultra-wide: Content constrained to 480px card, decorative background

### AI Interaction
- None during first visit — AI appears only after account creation
- Welcome screen may show animated brand element, not AI

### Future Expansion
- SSO/SAML enterprise login option
- Biometric authentication
- QR code login from companion device

---

## Journey 2: Onboarding

```
Goal Selection → Experience → Skills → Career Interests → Finish
```

### Purpose
Capture essential user data to personalize the experience and provide immediate value.

### Emotional Arc
Guided → Understood → Confident → Excited → Ready

### Steps

| Step | Screen | User Goal | Entry | Exit | Primary CTA | Emotion |
|------|--------|-----------|-------|------|-------------|---------|
| Goal Selection | Onboarding Step 1 | Tell MR:EGO what they want | Profile start | Next | "Continue" | Guided |
| Experience | Onboarding Step 2 | Import or enter work history | Goal complete | Next | "Continue" | Understood |
| Skills | Onboarding Step 3 | List professional skills | Experience complete | Next | "Continue" | Confident |
| Career Interests | Onboarding Step 4 | Define career direction | Skills complete | Finish | "Complete Setup" | Excited |
| Finish | Dashboard | See personalized workspace | Onboarding done | Explore dashboard | "Go to Dashboard" | Ready |

### Accessibility
- Stepper has `role="navigation"` with `aria-label="Setup progress"`
- Step changes move focus to next section heading
- All form fields have explicit labels and `aria-describedby` for help text
- Progress announced to screen readers on step change

### Responsive
- Mobile: Vertical stepper, single-column forms, sticky bottom controls
- Tablet: Horizontal stepper (if 4- steps), single-column content
- Desktop: Horizontal stepper with descriptions, 2-column form layouts
- Ultra-wide: Content constrained to 960px centered

### AI Interaction
- Step 3 (Skills): AI suggests skills based on experience entered
- Step 4 (Interests): AI recommends career paths based on skills + experience
- All AI suggestions are optional — user can accept, modify, or dismiss
- AI confidence indicator shown beside each suggestion

### Future Expansion
- LinkedIn/Google profile import
- Skill assessment integration
- Learning path recommendation from interests
- Mentor matching after onboarding

---

## Journey 3: CV Journey

```
Upload → Analysis → AI Suggestions → Optimization → Approval
```

### Purpose
Transform a raw CV into an optimized, AI-enhanced professional document.

### Emotional Arc
Hopeful → Curious → Enlightened → Empowered → Confident

### Steps

| Step | Screen | User Goal | Entry | Exit | Primary CTA | Emotion |
|------|--------|-----------|-------|------|-------------|---------|
| Upload | CV Manager | Upload their CV | Dashboard "Upload CV" | File selected | "Upload CV" | Hopeful |
| Analysis | CV Analysis | See what MR:EGO finds | Upload complete | View results | "View Analysis" | Curious |
| AI Suggestions | CV Optimization | Get improvement ideas | Analysis complete | Accept/dismiss | "Apply Suggestions" | Enlightened |
| Optimization | CV Editor | Make changes | Suggestion review | Save | "Save Changes" | Empowered |
| Approval | CV Preview | Confirm final version | Optimization done | Approve | "Approve CV" | Confident |

### Accessibility
- Upload zone: `role="button"`, keyboard accessible, `aria-label`
- Analysis results: `aria-live="polite"` for progressive loading
- CV editor: proper focus management between sections
- Approval: confirmation requires `aria-label` on approve button

### Responsive
- Mobile: Upload zone full-width, analysis as scrollable cards
- Tablet: Side-by-side original/optimized comparison
- Desktop: Split view — original left, optimized right, AI panel right
- Ultra-wide: Full tri-panel layout with preview, editor, AI suggestions

### AI Interaction
- Deep — this is an AI-first journey
- AI parses CV structure, identifies gaps, suggests improvements
- AI highlights weak action verbs and recommends stronger alternatives
- AI checks ATS compatibility and scores the CV
- AI suggests role-specific optimizations based on target jobs
- Every suggestion shows confidence and rationale

### Future Expansion
- Multi-language CV generation
- Cover letter generation
- Portfolio document creation
- Video CV integration

---

## Journey 4: Job Journey

```
Search → Filter → Open Job → Match Score → Apply → Tracking
```

### Purpose
Find, evaluate, and apply to relevant job opportunities with AI guidance.

### Emotional Arc
Curious → Focused → Interested → Confident → Hopeful → Anticipating

### Steps

| Step | Screen | User Goal | Entry | Exit | Primary CTA | Emotion |
|------|--------|-----------|-------|------|-------------|---------|
| Search | Job Search | Find relevant jobs | Dashboard "Find Jobs" | Select result | Search | Curious |
| Filter | Job Search | Narrow results | Search results | Apply filters | "Filter Results" | Focused |
| Open Job | Job Details | Evaluate opportunity | Click result | Apply or back | "View Details" | Interested |
| Match Score | Job Details | See fit assessment | Job loaded | Apply decision | "See My Match" | Confident |
| Apply | Application Form | Submit application | Click "Apply" | Submit | "Submit Application" | Hopeful |
| Tracking | Applications | Monitor status | Application sent | View dashboard | "Track Status" | Anticipating |

### Accessibility
- Job cards: `role="article"` with `aria-label` containing title and company
- Salary and match score: conveyed through text, not color alone
- Filter controls: all form inputs have explicit labels
- Application form: proper autocomplete attributes, validation announced

### Responsive
- Mobile: Single-column job cards, filter as bottom sheet
- Tablet: 2-column job grid, filter as side drawer
- Desktop: 3-column layout (filters | list | detail)
- Ultra-wide: Full layout with comparison mode for multiple jobs

### AI Interaction
- Match score shows AI analysis of fit (skills, experience, culture)
- AI suggests tailored cover letter based on job + profile
- AI recommends skill gap improvements for target roles
- AI alerts about similar opportunities
- AI provides salary range estimates based on market data

### Future Expansion
- One-click apply (saved profile)
- Video application
- Company research panel
- Interview scheduling integration

---

## Journey 5: Application Journey

```
Preparing → Sending → Waiting → Interview → Accepted → Rejected → Improvement
```

### Purpose
Guide the user through the complete application lifecycle with transparency and support.

### Emotional Arc
Nervous → Hopeful → Anxious → Anticipating → Elated / Disappointed → Determined

### Steps

| Step | Screen | User Goal | Entry | Exit | Primary CTA | Emotion |
|------|--------|-----------|-------|------|-------------|---------|
| Preparing | Application Prep | Get ready to apply | Job "Apply" | Start application | "Prepare Application" | Nervous |
| Sending | Application Submit | Send application | Prep complete | Submit | "Send Application" | Hopeful |
| Waiting | Application Detail | Track status | Application sent | Check updates | "Check Status" | Anxious |
| Interview | Interview Prep | Prepare for interview | Status update "Interview" | Complete prep | "Prepare for Interview" | Anticipating |
| Accepted | Offer | Celebrate and decide | Status "Accepted" | Accept/reject | "View Offer" | Elated |
| Rejected | Application Detail | Learn and move forward | Status "Rejected" | Review feedback | "See Feedback" | Disappointed → Determined |
| Improvement | Skill Gap | Grow from experience | Rejection feedback | Start learning | "Improve Skills" | Determined |

### Accessibility
- Status updates: `aria-live="polite"` announcements
- Timeline: proper list semantics with dates
- Offer details: clear heading hierarchy
- Rejection feedback: supportive language, not technical

### Responsive
- Mobile: Timeline as vertical list, status card compact
- Tablet: Timeline with side details panel
- Desktop: Full timeline + detail + AI insights side panel
- Ultra-wide: Application workspace with multiple open positions

### AI Interaction
- AI estimates application response time
- AI prepares interview questions based on job + profile
- AI provides salary negotiation guidance on accept
- AI delivers constructive feedback on rejection
- AI creates improvement plan based on rejection reasons

### Future Expansion
- Mock interview with AI
- Offer comparison tool
- Acceptance/decline letter generation
- Counter-offer guidance

---

## Journey 6: Daily Dashboard Journey

```
Login → Overview → Recommendations → Tasks → Progress → AI Suggestions
```

### Purpose
Deliver daily value in under 30 seconds, guiding the user to their most important actions.

### Emotional Arc
Routine → Informed → Guided → Productive → Accomplished → Supported

### Steps

| Step | Screen | User Goal | Entry | Exit | Primary CTA | Emotion |
|------|--------|-----------|-------|------|-------------|---------|
| Login | Authentication | Access workspace | Bookmark/app | Dashboard loads | (auto-redirect) | Routine |
| Overview | Dashboard | See daily summary | Login complete | Scan widgets | (absorb information) | Informed |
| Recommendations | Dashboard | Review AI picks | Overview scanned | Act or dismiss | "View Recommendation" | Guided |
| Tasks | Dashboard | Complete action items | Recommendations done | Complete task | "Complete Task" | Productive |
| Progress | Dashboard | Track goals | Tasks done | View metrics | "View Progress" | Accomplished |
| AI Suggestions | AI Panel | Get personalized help | Progress viewed | Engage or dismiss | "Ask MR:EGO" | Supported |

### Accessibility
- Dashboard: landmark regions with `aria-label`
- Widgets: `aria-label` describing purpose
- Task list: proper list semantics, checkboxes labeled
- Metrics: text + icon, never color alone
- AI panel: `aria-live="polite"` for suggestions

### Responsive
- Mobile: Single-column stack, essential widgets only
- Tablet: 2-column grid, collapsible widget groups
- Desktop: Configurable multi-column grid
- Ultra-wide: Extended grid with AI companion panel

### AI Interaction
- AI summarizes daily priority items
- AI recommends jobs based on profile activity
- AI highlights profile gaps or expiring data
- AI suggests actions based on application statuses
- AI learns what the user ignores and adjusts

### Future Expansion
- Voice-activated dashboard
- Predictive career timeline
- Weekly AI career review report
- Integration with calendar for daily planning

---

## Journey Cross-References

| Journey | Connects To | Via |
|---------|-------------|-----|
| First Visit | Onboarding | Account creation |
| Onboarding | CV Journey | Profile completion prompt |
| Onboarding | Daily Dashboard | First dashboard load |
| CV Journey | Job Journey | Optimized CV enables job applications |
| Job Journey | Application Journey | Apply action |
| Application Journey | Daily Dashboard | Status updates visible |
| Application Journey | CV Journey | Rejection triggers CV improvement |
| Daily Dashboard | All Journeys | Central navigation hub |

---

*Every user journey follows the progressive disclosure principle. Complexity appears only when the user needs it. AI assists but never overwhelms. Refer to [Screen-Inventory.md](Screen-Inventory.md) for screen specifications and [Navigation-Flow.md](Navigation-Flow.md) for navigation architecture.*
