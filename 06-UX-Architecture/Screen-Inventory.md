# Screen Inventory

**Phase:** DP-6 (UX Architecture)
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md) — Rules 1-5), DP-4 ([Layouts/](../05-Application-Shell/Layouts/))

---

## Public Screens

### Landing

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Introduce MR:EGO value proposition, convert visitors |
| **Target User** | First-time visitor, unauthenticated |
| **Primary CTA** | "Start Your Journey" — navigates to Register |
| **Secondary CTAs** | "Learn More" (scroll), "Sign In" (existing users) |
| **Navigation** | Minimal: Logo, Sign In, Help |
| **Widgets** | Value prop hero, feature highlights, trust signals, testimonials |
| **Info Hierarchy** | 1. Hero (value prop) → 2. Features (3-4 key capabilities) → 3. Testimonials → 4. Final CTA |
| **Emotion** | Intrigued, curious, trusting |
| **Accessibility** | Skip link, heading hierarchy, alt text on illustrations, high contrast on CTAs |
| **Responsive** | Mobile: stacked sections, full-bleed hero. Desktop: multi-column features, side-by-side hero |
| **AI Interaction** | None — AI introduced post-authentication |
| **Future Expansion** | Personalized landing based on referral source, A/B test variants |

### Authentication (Login)

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Authenticate existing users |
| **Target User** | Returning user |
| **Primary CTA** | "Sign In" |
| **Secondary CTA** | "Forgot Password?", "Create Account" |
| **Navigation** | Logo (→ Landing), Help link |
| **Widgets** | Email input, Password input, Remember Me checkbox, Social login buttons |
| **Info Hierarchy** | Brand + Title → Form → Social options → Footer link |
| **Emotion** | Familiar, efficient |
| **Accessibility** | `aria-label="Sign in form"`, autocomplete attributes, focus management, error announcements |
| **Responsive** | Mobile: full-bleed form, no decoration. Desktop: centered card, 440px max width |
| **AI Interaction** | None on login |

### Authentication (Register)

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Create new account |
| **Target User** | New visitor |
| **Primary CTA** | "Create Account" |
| **Secondary CTA** | "Already have an account? Sign in" |
| **Navigation** | Logo, Help link |
| **Widgets** | Name, Email, Password (with strength), Confirm Password, Terms checkbox, Social login |
| **Info Hierarchy** | Brand + Title → Form → Social → Footer |
| **Emotion** | Hopeful, committed |
| **Accessibility** | Password strength `aria-live`, inline validation, proper autocomplete values |
| **Responsive** | Mobile: single-column stack. Desktop: 2-column name/email row |
| **AI Interaction** | None |

### Password Reset

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Allow user to reset forgotten password |
| **Target User** | User who cannot log in |
| **Primary CTA** | "Send Reset Link" / "Reset Password" |
| **Secondary CTA** | "Back to Sign In" |
| **Navigation** | Logo, Help link |
| **Widgets** | Email input (request), Password inputs (reset) |
| **Info Hierarchy** | Brand + Title → Form → Status message → Footer |
| **Emotion** | Relieved (process works), frustrated → resolved |
| **Accessibility** | Token validation announced, success/error `role="status"` |
| **Responsive** | Mobile: full-bleed, Desktop: centered 440px card |
| **AI Interaction** | None |

### Welcome

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Welcome new registrations, set expectation for onboarding |
| **Target User** | Newly registered user |
| **Primary CTA** | "Begin Setup" |
| **Secondary CTA** | "Skip to Dashboard" (visible but subdued) |
| **Navigation** | No sidebar — clean focus on welcome message |
| **Widgets** | Welcome message, brief value preview (3 cards with icons: Profile, CV, Jobs) |
| **Info Hierarchy** | Welcome heading → Value preview → Begin CTA |
| **Emotion** | Welcomed, valued, motivated |
| **Accessibility** | `aria-live="polite"` announces welcome, focus moves to heading |
| **Responsive** | Mobile: full-bleed single column. Desktop: centered content with illustration |
| **AI Interaction** | Welcome message is branded, not AI-generated |

---

## Onboarding Screens

### Onboarding: Goal Selection (Step 1)

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Understand user's primary career goal |
| **Target User** | New user |
| **Primary CTA** | "Continue" |
| **Secondary CTA** | "Skip" (bottom, subdued) |
| **Navigation** | Stepper (Step 1 of 4), no sidebar |
| **Widgets** | Goal selection cards (Find Job, Career Change, Skill Growth, Explore), custom option |
| **Info Hierarchy** | Question heading → Goal options → Continue |
| **Emotion** | Guided, understood |
| **Accessibility** | Radio group with styled cards, arrow key navigation, `aria-label` on each option |
| **Responsive** | Mobile: stacked cards, full-width. Desktop: 2x2 grid of cards |
| **AI Interaction** | AI may suggest goals based on implicit signals (time of day, referral source, device) |

### Onboarding: Experience (Step 2)

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Capture work history |
| **Target User** | New user |
| **Primary CTA** | "Continue" |
| **Secondary CTA** | "Skip" |
| **Navigation** | Stepper (Step 2 of 4) |
| **Widgets** | Add experience form (company, title, dates, description), import option (LinkedIn) |
| **Info Hierarchy** | Question heading → Experience form(s) → Add more → Continue |
| **Emotion** | Productive, reflective |
| **Accessibility** | Date pickers accessible, add/remove buttons labeled, form groups with legends |
| **Responsive** | Mobile: single experience card. Desktop: side-by-side date fields |
| **AI Interaction** | AI suggests experience entries based on CV upload or LinkedIn import |

### Onboarding: Skills (Step 3)

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Capture professional skills |
| **Target User** | New user |
| **Primary CTA** | "Continue" |
| **Secondary CTA** | "Skip" |
| **Navigation** | Stepper (Step 3 of 4) |
| **Widgets** | Skill input (autocomplete from taxonomy), AI-suggested skills based on experience |
| **Info Hierarchy** | Question heading → Suggested skills → Manual skill input → Continue |
| **Emotion** | Confident, recognized |
| **Accessibility** | Autocomplete accessible with `aria-combobox`, skill tags removable with `aria-label` |
| **Responsive** | Mobile: input above, suggestions below. Desktop: side panel with taxonomy browser |
| **AI Interaction** | AI analyzes experience and suggests relevant skills with confidence indicators |

### Onboarding: Career Interests (Step 4)

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Define career direction and preferences |
| **Target User** | New user |
| **Primary CTA** | "Complete Setup" |
| **Secondary CTA** | — |
| **Navigation** | Stepper (Step 4 of 4) |
| **Widgets** | Industry selector, role type preferences, location preferences, salary range, willingness to relocate |
| **Info Hierarchy** | Question heading → Preference inputs → Complete CTA |
| **Emotion** | Excited, ready |
| **Accessibility** | All selects labeled, salary slider accessible with `aria-valuenow` |
| **Responsive** | Mobile: stacked. Desktop: 2-column layout |
| **AI Interaction** | AI recommends career paths and roles based on experience + skills |

---

## Dashboard Screens

### Dashboard: Overview

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Daily summary of activity, recommendations, and quick actions |
| **Target User** | Authenticated user (home page) |
| **Primary CTA** | Varies by context (most important pending action) |
| **Secondary CTA** | "View All" for each widget section |
| **Navigation** | Full sidebar, topbar, command palette |
| **Widgets** | Application status summary, recommended jobs (2-4), CV strength score, upcoming events, recent activity (5 items), AI insight card, quick actions |
| **Info Hierarchy** | Greeting + date → AI summary → Priority cards → Widget grid → Status bar |
| **Emotion** | Informed, productive, supported |
| **Accessibility** | Landmark regions, widget `aria-label`, live region for AI updates, keyboard-navigable grid |
| **Responsive** | Mobile: single column, 3-4 essential widgets. Tablet: 2 columns. Desktop: 3-4 column configurable grid |
| **AI Interaction** | AI summary card at top ("Good morning, here's today's priority"), AI-recommended jobs, AI insights based on activity |
| **Future Expansion** | Predictive analytics, weekly AI review summary, calendar integration widget |

### Dashboard: Tasks

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Display and manage today's action items |
| **Target User** | Authenticated user |
| **Primary CTA** | Complete first task |
| **Secondary CTA** | "View All Tasks" |
| **Navigation** | Dashboard tab or section |
| **Widgets** | Task list (prioritized by AI), completion progress, task categories |
| **Info Hierarchy** | Section title → Task list (sorted: overdue → today → upcoming) |
| **Emotion** | Organized, accomplished |
| **Accessibility** | Checkbox list with `aria-label`, progress `role="progressbar"` |
| **Responsive** | Mobile: full-width stack. Desktop: side panel or full section |
| **AI Interaction** | AI generates task list based on profile gaps, application statuses, and goals |

### Dashboard: Progress

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Show career goal progress and key metrics |
| **Target User** | Authenticated user |
| **Primary CTA** | "Update Goals" |
| **Secondary CTA** | "View Career Timeline" |
| **Navigation** | Dashboard tab or section |
| **Widgets** | Goal progress bars, skill map completion, application stats (sent, interviewing, offers), timeline milestones |
| **Info Hierarchy** | Section title → Goal progress → Statistics → Timeline preview |
| **Emotion** | Accomplished, motivated |
| **Accessibility** | Chart data table fallback, progress values in text |
| **Responsive** | Mobile: stacked metrics. Desktop: grid with charts |
| **AI Interaction** | AI assesses progress toward career goals and suggests next milestones |

---

## Job Screens

### Job Search

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Find relevant job opportunities |
| **Target User** | Job-seeking authenticated user |
| **Primary CTA** | Search (triggered by input or filter change) |
| **Secondary CTA** | "Save Search", "Clear Filters" |
| **Navigation** | Sidebar (Jobs active), topbar search |
| **Widgets** | Search input, filter panel, job result list, sort controls, saved searches |
| **Info Hierarchy** | Search bar → Active filters → Result count → Job cards → Pagination |
| **Emotion** | Curious → focused → hopeful |
| **Accessibility** | Results list `aria-label="Job search results"`, each job card `role="article"`, filter controls labeled |
| **Responsive** | Mobile: filter as bottom sheet, single-column results. Tablet: collapsible filters, 2-column results. Desktop: persistent filter sidebar + list |
| **AI Interaction** | AI suggests search refinements, AI recommends jobs based on profile, AI highlights best matches with badge |
| **Future Expansion** | Company research panel, salary insights overlay, job alert scheduling |

### Job Detail

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Evaluate a specific job opportunity |
| **Target User** | Active job seeker |
| **Primary CTA** | "Apply Now" |
| **Secondary CTAs** | "Save Job", "Share", "See Similar" |
| **Navigation** | Breadcrumb: Jobs > [Job Title], sidebar preserved |
| **Widgets** | Job info card, match score card, AI fit analysis, company info, similar jobs, skills gap |
| **Info Hierarchy** | Job title + company → Match score → Job details → Description → Similar jobs |
| **Emotion** | Interested → confident (if match high) → motivated to apply |
| **Accessibility** | Match score conveyed in text, not color, job details heading hierarchy, salary text-based |
| **Responsive** | Mobile: scrollable detail, match score as card. Desktop: split view with detail + AI analysis side panel |
| **AI Interaction** | Match score with breakdown (skills, experience, culture), AI suggests tailored cover letter, AI identifies skill gaps, AI recommends preparation steps |
| **Future Expansion** | Company culture insights, salary negotiation data, interview questions preview |

### Application Form

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Submit a job application |
| **Target User** | User who decided to apply |
| **Primary CTA** | "Submit Application" |
| **Secondary CTA** | "Save as Draft", "Cancel" |
| **Navigation** | Breadcrumb: Jobs > [Job] > Apply, no sidebar distraction |
| **Widgets** | Contact info (pre-filled from profile), CV selector, cover letter editor/additional questions, attachments |
| **Info Hierarchy** | Job title reference → Pre-filled info → CV selection → Cover letter → Submit |
| **Emotion** | Hopeful, thorough, committed |
| **Accessibility** | All form inputs labeled, CV selector accessible, character count on cover letter, submit confirmation |
| **Responsive** | Mobile: single-column form. Desktop: form + preview side panel |
| **AI Interaction** | AI suggests CV version based on job match, AI generates cover letter draft (user edits before submit), AI checks application completeness |
| **Future Expansion** | One-click apply (saved preferences), video introduction upload, portfolio attachment |

---

## Application Tracking Screens

### Applications List

| Aspect | Specification |
|--------|---------------|
| **Purpose** | View and manage all job applications |
| **Target User** | Authenticated user with active applications |
| **Primary CTA** | "View Details" on application card |
| **Secondary CTA** | "Filter by Status", "Withdraw" |
| **Navigation** | Sidebar (Applications active), tabs for status groups |
| **Widgets** | Status tabs (Active, Interviewing, Offers, Rejected), application cards, status filter |
| **Info Hierarchy** | Page title → Status tabs → Application cards (sorted by date, grouped by status) |
| **Emotion** | Anticipating, organized |
| **Accessibility** | Tab panel `aria-label`, each application card `role="article"` with status, status color + text label |
| **Responsive** | Mobile: stacked cards with status badges. Desktop: kanban-style columns or list with filters |
| **AI Interaction** | AI estimates next status change date, AI recommends follow-up actions, AI suggests application improvements based on unsuccessful ones |

### Application Detail

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Track a single application's lifecycle |
| **Target User** | User tracking a specific application |
| **Primary CTA** | Varies by status (Prepare for Interview, View Offer, etc.) |
| **Secondary CTA** | "Withdraw Application" |
| **Navigation** | Breadcrumb: Applications > [Job Title] |
| **Widgets** | Application timeline, status card, company info AI insights, actions panel |
| **Info Hierarchy** | Job title + company → Status → Timeline → AI insights → Actions |
| **Emotion** | Anxious → informed → prepared |
| **Accessibility** | Timeline with list semantics, status updates announced `aria-live="polite"` |
| **Responsive** | Mobile: vertical timeline. Desktop: timeline + actions + AI insights panels |
| **AI Interaction** | AI analyzes application status and suggests next actions, AI estimates timeline, AI prepares interview materials |
| **Future Expansion** | Company response tracking, follow-up reminder scheduling |

---

## CV Screens

### CV Manager

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Upload, manage, and optimize CVs |
| **Target User** | User managing professional documents |
| **Primary CTA** | "Upload New CV" |
| **Secondary CTA** | "View Analysis", "Create Version" |
| **Navigation** | Sidebar (Documents), sub-tabs for CV section |
| **Widgets** | Upload zone, CV list (existing versions), strength score card, AI suggestions trigger |
| **Info Hierarchy** | Page title → Upload zone → CV list (sorted by date, current version marked) → AI optimization card |
| **Emotion** | Hopeful, organized, empowered |
| **Accessibility** | Upload zone keyboard accessible, file list with `aria-label`, version comparison accessible |
| **Responsive** | Mobile: upload full-width, list stacked. Desktop: upload panel + list + AI suggestions side panel |
| **AI Interaction** | AI scores CV strength, AI suggests improvements, AI recommends versions per job type |
| **Future Expansion** | Multi-language CVs, portfolio builder, CV sharing link |

### CV Analysis

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Show AI analysis of uploaded CV |
| **Target User** | User who just uploaded a CV |
| **Primary CTA** | "Apply AI Suggestions" |
| **Secondary CTA** | "View Full Analysis" |
| **Navigation** | Breadcrumb: CV Manager > Analysis |
| **Widgets** | Analysis score, section breakdown (summary, experience, skills, education), improvement opportunities, ATS compatibility score |
| **Info Hierarchy** | Overall score → Section-by-section analysis → Improvement list → ATS score |
| **Emotion** | Curious → informed → empowered to improve |
| **Accessibility** | Scores in text + visual, analysis sections as headings, improvement list `aria-label` |
| **Responsive** | Mobile: stacked analysis cards. Desktop: analysis + original CV side-by-side |
| **AI Interaction** | Deep — AI parses entire CV structure, evaluates each section, suggests specific improvements with confidence |
| **Future Expansion** | Peer CV comparison, industry-specific analysis |

### CV Optimization

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Apply AI suggestions to improve CV |
| **Target User** | User ready to improve their CV |
| **Primary CTA** | "Save Changes" |
| **Secondary CTA** | "Preview", "Reject All Suggestions" |
| **Navigation** | Breadcrumb: CV Manager > Optimization |
| **Widgets** | Side-by-side editor (original | optimized), suggestion list, accept/reject per suggestion, reanalysis trigger |
| **Info Hierarchy** | Preview → Suggestion panel → Editor |
| **Emotion** | Empowered, in control |
| **Accessibility** | Editor accessible, suggestions navigable by keyboard, accept/reject buttons labeled |
| **Responsive** | Mobile: suggestion list with editor view. Desktop: full split-view editor + AI suggestions |
| **AI Interaction** | AI generates optimized alternatives for each section, user accepts/modifies/rejects each suggestion |
| **Future Expansion** | Version history comparison, role-specific CV optimization |

---

## AI Workspace

### AI Conversation

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Natural language interaction with MR:EGO AI |
| **Target User** | Any authenticated user |
| **Primary CTA** | Send message (in input area) |
| **Secondary CTA** | Suggested prompts, file attachment |
| **Navigation** | Sidebar (AI Workspace), or floating panel from any page |
| **Widgets** | Message list, input area, context badge, memory indicator, suggestion panel |
| **Info Hierarchy** | Conversation header → Message history → Input area → Memory status |
| **Emotion** | Supported, guided, in control |
| **Accessibility** | `role="log"` on message list, `aria-label` on input, thinking state announced, streaming text accessible |
| **Responsive** | Mobile: full-screen conversation. Desktop: conversation + context + recommendations panels |
| **AI Interaction** | Full conversational AI with memory, context awareness, suggestions, reasoning transparency |
| **Future Expansion** | Voice input, multi-modal responses (charts, images), collaborative AI sessions |

---

## Settings Screens

### Settings

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Manage all user preferences and configurations |
| **Target User** | Authenticated user |
| **Primary CTA** | Varies by section (Save, Toggle, Update) |
| **Secondary CTA** | "Reset Section" |
| **Navigation** | Sidebar (Settings active), left sidebar for sections |
| **Widgets** | Section navigation, per-section forms, toggles, selects, danger zone |
| **Info Hierarchy** | Section nav → Section title → Setting groups → Controls |
| **Emotion** | In control, organized |
| **Accessibility** | Section nav `role="navigation"`, all controls labeled, change tracking announced |
| **Responsive** | Mobile: top tabs instead of sidebar. Desktop: sidebar + content |
| **AI Interaction** | AI may suggest optimal settings based on usage patterns |
| **Future Expansion** | Module-specific settings, enterprise admin settings |

---

## System Screens

### Loading

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Indicate content is being prepared |
| **Target User** | All users |
| **Primary CTA** | None (loading in progress) |
| **Navigation** | Preserved sidebar, non-interactive content area |
| **Widgets** | Skeleton screens matching final layout, shimmer animation |
| **Emotion** | Patient, informed |
| **Accessibility** | `aria-busy="true"`, loading announced to screen readers, skeleton elements properly labeled |
| **AI Interaction** | AI status indicator shows processing state if AI involved |

### Empty State

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Inform user when no data exists |
| **Target User** | User viewing an empty section |
| **Primary CTA** | Suggested first action (Add, Create, Upload) |
| **Secondary CTA** | "Learn More" |
| **Navigation** | Full sidebar available |
| **Widgets** | Illustration, message, action button(s) |
| **Info Hierarchy** | Illustration → Message → Suggested action |
| **Emotion** | Guided, encouraged (not frustrated) |
| **Accessibility** | Illustration decorative or with alt text, action button clearly labeled |
| **AI Interaction** | AI may suggest what to do in this empty section |

### Error State

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Communicate and recover from errors |
| **Target User** | User experiencing an error |
| **Primary CTA** | "Try Again" |
| **Secondary CTA** | "Go Back", "Contact Support" |
| **Navigation** | Full sidebar available (nav unaffected by content errors) |
| **Widgets** | Error icon, clear message, suggestion, retry button |
| **Info Hierarchy** | Icon → What happened → Why → How to fix → Action |
| **Emotion** | Frustrated → reassured (clear error + solution) |
| **Accessibility** | `role="alert"`, error announced, focus moved to error message |
| **AI Interaction** | AI may explain the error in simpler terms and suggest alternative actions |

### Offline State

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Maintain functionality when connection is lost |
| **Target User** | User with no internet connection |
| **Primary CTA** | "Try Again" (reconnect) |
| **Secondary CTA** | "Go to Cached Content" |
| **Navigation** | Reduced sidebar (only available cached sections) |
| **Widgets** | Offline banner, cached content indicator, available features |
| **Emotion** | Slightly frustrated → accommodated (still can work) |
| **Accessibility** | Offline status `aria-live="polite"`, banner focusable |
| **AI Interaction** | AI shows cached state — "Working offline, I can help with cached data" |

### Maintenance Mode

| Aspect | Specification |
|--------|---------------|
| **Purpose** | Inform user of planned maintenance |
| **Target User** | User during system maintenance |
| **Primary CTA** | None (wait) |
| **Secondary CTA** | "Check Status" (external status page) |
| **Navigation** | Minimal — logo only |
| **Widgets** | Brand message, estimated completion time, status link |
| **Emotion** | Patient, informed |
| **Accessibility** | `aria-live="polite"` with maintenance message |
| **AI Interaction** | None |

---

## Screen State Matrix

| Screen | Loading | Empty | Error | Offline | Success |
|--------|---------|-------|-------|---------|---------|
| Dashboard | Dashboard skeleton | Welcome state + onboarding prompt | ErrorState with retry | Cached dashboard + offline banner | Default loaded |
| Job Search | Skeleton result cards | "No jobs found" + suggestions | ErrorState with retry | Cached results + offline banner | Results loaded |
| Job Detail | Skeleton header + body | N/A (specific job) | ErrorState with retry | Cached job detail + offline banner | Full job detail |
| Application List | Skeleton cards per tab | "No applications yet" + find jobs CTA | ErrorState with retry | Cached list + offline banner | Applications loaded |
| Application Detail | Skeleton timeline | N/A (specific app) | ErrorState with retry | Cached detail + offline banner | Full detail |
| CV Manager | Skeleton file list | "Upload your first CV" + upload zone | ErrorState with retry | Cached CV list + offline banner | CV list loaded |
| CV Analysis | Analysis skeleton | N/A (specific analysis) | AnalysisErrorState | Cached analysis + offline banner | Full analysis |
| Settings | Skeleton sections | N/A (settings always available) | ErrorState with retry | Read-only + offline banner | Settings loaded |
| Profile | Skeleton header + sections | EmptyState per section | ErrorState with retry | Cached profile + offline banner | Profile loaded |
| AI Workspace | Skeleton messages | Welcome message + suggested prompts | ErrorState with retry | "Offline mode" message | Conversation ready |
| Notifications | Skeleton list | "No notifications" | ErrorState with retry | Cached list + offline banner | List loaded |

---

*This Screen Inventory specifies every screen in MR:EGO. Each screen has defined purpose, target user, actions, emotion, accessibility, and future expansion. Refer to [Navigation-Flow.md](Navigation-Flow.md) for navigation between screens and [User-Journey.md](User-Journey.md) for journey context.*
