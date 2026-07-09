# Application Flow

**Phase:** DP-6 (UX Architecture)
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md) — Rules 9, 15, 18), DP-4 ([Jobs-Layout.md](../05-Application-Shell/Layouts/Jobs-Layout.md))

---

## Purpose

Guide the user through the complete application lifecycle from preparation through post-decision reflection.

---

## User Goal

"Apply to jobs that fit me, track every application, and make the best decision for my career."

---

## Flow States

```
                    ┌─────────────────────────────────────────────────┐
                    │              APPLICATION LIFECYCLE              │
                    └─────────────────────────────────────────────────┘
                                                                      
  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
  │ PREPARING│──▶│ SENDING  │──▶│ WAITING  │──▶│INTERVIEW │──▶│ DECIDING │
  │          │   │          │   │          │   │          │   │          │
  └──────────┘   └──────────┘   └──────────┘   └──────────┘   └────┬─────┘
                                                                    │
                                                          ┌─────────┴──────────┐
                                                          │                    │
                                                    ┌─────▼────┐        ┌─────▼────┐
                                                    │ ACCEPTED │        │ REJECTED │
                                                    │ (Offer)  │        │ (Closed) │
                                                    └────┬─────┘        └─────┬─────┘
                                                         │                   │
                                                    ┌────▼────┐        ┌─────▼────┐
                                                    │DECISION │        │IMPROVEMENT│
                                                    │  MADE   │        │  PLAN    │
                                                    └─────────┘        └──────────┘
```

---

## Phase Specifications

### 1. Preparing

| Aspect | Value |
|--------|-------|
| **Purpose** | Gather materials needed for application |
| **Entry** | User clicks "Apply" on Job Detail |
| **Exit** | User proceeds to application form |
| **Primary CTA** | "Continue to Application" |
| **Accessibility** | Checklist items properly labeled, progress indicated |
| **AI Interaction** | AI suggests optimal CV version, generates cover letter draft, checks skill match |

### 2. Sending

| Aspect | Value |
|--------|-------|
| **Purpose** | Submit the completed application |
| **Entry** | User fills application form |
| **Exit** | Application submitted successfully |
| **Primary CTA** | "Submit Application" |
| **Accessibility** | Form validation announced, submit confirmation `role="status"` |
| **AI Interaction** | AI checks completeness, suggests improvements, validates file formats |

### 3. Waiting

| Aspect | Value |
|--------|-------|
| **Purpose** | Monitor application status |
| **Entry** | Application submitted |
| **Exit** | Status changes to Interview, Offer, or Rejected |
| **Primary CTA** | "Check Status" (returns to same state) |
| **Widgets** | Status indicator, estimated response time, application timeline |
| **AI Interaction** | AI estimates timeline, suggests follow-up timing, recommends other opportunities |

### 4. Interview

| Aspect | Value |
|--------|-------|
| **Purpose** | Prepare for and track interview process |
| **Entry** | Status updated to "Interview" by employer |
| **Exit** | Interview completed (status moves to Waiting again) |
| **Primary CTA** | "Prepare for Interview" |
| **Widgets** | Interview details, preparation checklist, company research, AI-generated practice questions |
| **AI Interaction** | AI generates interview questions based on job + profile, provides company insights, suggests talking points |

### 5. Deciding (Offer)

| Aspect | Value |
|--------|-------|
| **Purpose** | Evaluate and decide on job offer |
| **Entry** | Status updated to "Offer" |
| **Exit** | Accept or decline |
| **Primary CTA** | "View Offer Details" |
| **Widgets** | Offer summary, comparison with other offers (if any), negotiation guidance |
| **AI Interaction** | AI analyzes offer competitiveness, suggests negotiation points, compares with market data |

### 6. Accepted

| Aspect | Value |
|--------|-------|
| **Purpose** | Celebrate and plan next steps |
| **Entry** | User accepts offer |
| **Exit** | Return to dashboard or update profile |
| **Primary CTA** | "Update Profile with New Role" |
| **Emotion** | Elated, accomplished, forward-looking |
| **AI Interaction** | AI suggests profile update, recommends next career goals, offers onboarding checklist |

### 7. Rejected

| Aspect | Value |
|--------|-------|
| **Purpose** | Learn and improve from rejection |
| **Entry** | Status updated to "Rejected" |
| **Exit** | View improvement suggestions or search for new jobs |
| **Primary CTA** | "See Feedback & Improve" |
| **Emotion** | Disappointed → determined |
| **AI Interaction** | AI analyzes possible reasons, suggests CV improvements, recommends skill development, finds similar opportunities |

### 8. Improvement Plan

| Aspect | Value |
|--------|-------|
| **Purpose** | Turn rejection into growth |
| **Entry** | User clicks "Improve" after rejection |
| **Exit** | Start learning or return to job search |
| **Primary CTA** | "Start Improvement Plan" |
| **Widgets** | Skill gap analysis, recommended courses, CV optimization suggestions |
| **AI Interaction** | AI creates personalized improvement plan based on rejection context |

---

## Entry Points

| Source | Trigger | Navigates To |
|--------|---------|--------------|
| Job Detail | "Apply Now" button | Application Form |
| Dashboard | Application status card | Applications List |
| Notifications | Status change notification | Application Detail |
| Command palette | Ctrl+K → "My Applications" | Applications List |

## Exit Points

| Source | Destination | Trigger |
|--------|-------------|---------|
| Application Form | Job Detail | "Cancel" |
| Application Detail | Jobs Search | "Find Similar" |
| Application Detail | Dashboard | Sidebar "Dashboard" click |
| All states | Any module | Sidebar navigation |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Status changes | `aria-live="polite"` announcement |
| Timeline | `role="list"` with `aria-label="Application timeline"` |
| Status colors | Always paired with text label |
| Form submission | Loading spinner, confirmed with success message |
| Offer review | Clear heading hierarchy for terms |
| Rejection feedback | Supportive language, action-oriented |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Timeline as compact list, status as prominent badge, interview prep as collapsible sections |
| Tablet (768-1023px) | Timeline with side details, prep content as tabs |
| Desktop (1024-1279px) | Full timeline + detail + AI suggestions sidebar, interview prep as workspace |
| Ultra-wide (1600px+) | Multi-application comparison view, side-by-side offer comparison |

---

## AI Interaction Map

| State | AI Role | Visibility |
|-------|---------|------------|
| Preparing | CV selector, cover letter generator | Prominent (user expects AI help here) |
| Sending | Completeness check | Subtle (validation badge) |
| Waiting | Timeline estimation | Background (shown in status card) |
| Interview | Question generator, company research | Prominent (preparation section) |
| Offer | Market comparison, negotiation | Contextual (offer details panel) |
| Accepted | Profile update suggestions | Subtle (optional suggestion) |
| Rejected | Improvement plan | Encouraging (growth-focused) |
| Improvement | Skill gap analysis, course recommendations | Full (learning workspace) |

---

## Future Expansion

| Feature | Phase |
|---------|-------|
| Auto-apply with saved preferences | Phase 2 |
| Video interview recording | Phase 2 |
| Offer comparison dashboard | Phase 2 |
| Company research integration | Phase 2 |
| Application analytics (success rate, response time) | Phase 2 |
| Team-based application tracking (enterprise) | Phase 11 |

---

*The Application Flow guides users through one of the most emotionally significant professional journeys. Every state provides appropriate support, transparency, and AI assistance. Refer to [Job-Flow.md](Job-Flow.md) for the discovery phase and [CV-Flow.md](CV-Flow.md) for preparation.*
