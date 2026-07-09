# Application Tracker

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-6 ([Application-Flow.md](../06-UX-Architecture/Application-Flow.md)), DP-7 ([Application-Tracker.md](../07-High-Fidelity-Wireframes/Application-Tracker.md))

---

## Purpose

Defines the application tracking system — status engine, timeline, kanban/list views, AI insights, interview preparation, and offer management.

---

## Application Tracker Architecture

```
┌─────────────────────────────────────────────────────────┐
│                 APPLICATION TRACKER                      │
├─────────────────────────────────────────────────────────┤
│  Status Engine                                           │
│  Status machine, transitions, automation rules           │
├─────────────────────────────────────────────────────────┤
│  Timeline Engine                                         │
│  Event log, chronological view, status history           │
├─────────────────────────────────────────────────────────┤
│  AI Insights Layer                                       │
│  Next steps, timeline estimates, follow-up suggestions   │
├─────────────────────────────────────────────────────────┤
│  View Engine                                             │
│  Kanban columns, list view, status tabs, calendar        │
└─────────────────────────────────────────────────────────┘
```

---

## Application Data Model

```typescript
// Pseudocode
interface Application {
  id: string;
  jobId: string;
  job: Job;
  userId: string;
  status: ApplicationStatus;
  appliedAt: Date;
  updatedAt: Date;
  cvId: string;
  coverLetter: string;
  documents: string[];
  notes: string;
  timeline: ApplicationEvent[];
  interviews: Interview[];
  offers: Offer[];
  aiInsights: ApplicationAIInsights;
}

enum ApplicationStatus {
  Draft,              // Saved but not submitted
  Submitted,          // Application sent
  UnderReview,        // Being reviewed
  Interviewing,       // Interview stage
  Offer,              // Offer received
  Accepted,           // Offer accepted
  Declined,           // Offer declined
  Rejected,           // Not progressed
  Withdrawn,          // User withdrew
  Archived,           // Archived by user
}
```

---

## Status Engine

### Status Flow

```
                    ┌──────────┐
                    │  DRAFT   │
                    └────┬─────┘
                         │ submit
                    ┌────▼─────┐
                    │ SUBMITTED│
                    └────┬─────┘
                         │ review
                    ┌────▼─────┐
                    │UNDER     │
                    │REVIEW    │
                    └────┬─────┘
                         │
               ┌─────────┼────────────┐
               │         │            │
          ┌────▼───┐    │       ┌────▼────┐
          │INTER-  │    │       │REJECTED │
          │VIEWING │    │       │         │
          └────┬───┘    │       └─────────┘
               │        │
          ┌────▼───┐    │
          │ OFFER  │    │
          └────┬───┘    │
               │        │
     ┌─────────┼────────┘
     │         │
┌────▼───┐  ┌──▼────┐
│ACCEPTED│  │DECLINED│
└────────┘  └───────┘
```

### Status Transitions

| From | To | Trigger | Notification |
|------|----|---------|--------------|
| Draft | Submitted | User action | Confirmation |
| Submitted | Under Review | Employer action | "Under review" |
| Under Review | Interviewing | Employer action | Interview invite |
| Interviewing | Offer | Employer action | Offer received |
| Interviewing | Rejected | Employer action | Rejection notification |
| Offer | Accepted | User action | Confirmation |
| Offer | Declined | User action | Confirmation |
| Any | Withdrawn | User action | Confirmation |
| Any | Archived | User action | None |
| Rejected | Archived | User action | None |

---

## Timeline

```typescript
// Pseudocode
interface ApplicationEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  timestamp: Date;
  metadata: EventMetadata;
  isUserAction: boolean;
  aiGenerated: boolean;
}

enum EventType {
  Submitted,
  StatusChange,
  InterviewScheduled,
  InterviewCompleted,
  OfferReceived,
  OfferAccepted,
  OfferDeclined,
  Rejected,
  Withdrawn,
  NoteAdded,
  DocumentAdded,
  FollowUp,
  AIInsight,
}
```

---

## AI Insights

```typescript
// Pseudocode
interface ApplicationAIInsights {
  nextSteps: AISuggestion[];
  timelineEstimate: TimelineEstimate;
  followUpDate: Date;
  preparationTips: string[];
  suggestions: AISuggestion[];
}

interface TimelineEstimate {
  currentStage: string;
  estimatedDuration: string;          // e.g. "5-10 days"
  confidence: number;
  basedOn: string;                    // "Similar applications in your industry"
}

interface AISuggestion {
  type: 'action' | 'preparation' | 'follow-up' | 'improvement';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action?: SuggestionAction;
}
```

---

## View Options

| View | Layout | Use Case |
|------|--------|----------|
| Kanban | Columns by status | Visual pipeline management |
| List | Rows with details | Dense data overview |
| Calendar | Date-based events | Interview scheduling view |
| Detail | Single application | Deep dive into one |

---

## Interview Management

```typescript
// Pseudocode
interface Interview {
  id: string;
  applicationId: string;
  type: 'phone' | 'video' | 'onsite' | 'technical' | 'behavioral';
  scheduledAt: Date;
  duration: number;              // minutes
  location: string;
  contactName: string;
  contactEmail: string;
  notes: string;
  preparation: InterviewPrep;
  completed: boolean;
  feedback?: InterviewFeedback;
}

interface InterviewPrep {
  companyResearch: string;
  commonQuestions: string[];
  tailoredQuestions: string[];
  tips: string[];
  aiGenerated: boolean;
}
```

---

## Offer Management

```typescript
// Pseudocode
interface Offer {
  id: string;
  applicationId: string;
  salary: SalaryRange;
  benefits: string[];
  startDate: Date;
  deadline: Date;
  status: 'pending' | 'accepted' | 'declined' | 'negotiating';
  notes: string;
  comparison?: OfferComparison;
}
```

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Job-System.md](Job-System.md) | Job linked to application |
| [CV-System.md](CV-System.md) | CV used in application |
| [Notification-System.md](Notification-System.md) | Status change notifications |

---

## Validation Notes

1. Status engine enforces valid transitions — no invalid status jumps.
2. Timeline preserves complete event history for every application.
3. AI insights provide actionable next steps based on application context.
4. Multiple view options (kanban, list, calendar, detail) accommodate different workflows.
5. Interview and offer management are integrated within the application detail.
