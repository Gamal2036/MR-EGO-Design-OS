# Empty States — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Version:** 1.0
**Status:** Production Specification
**Inherits:** DP-0 through DP-8, DP-2:EmptyState Component, DP-3:EmptyState Component Contract, DP-6:Screen Definitions, DP-7:Wireframe States

---

## Purpose

Centralized reference for every empty state across all MR:EGO screens. Each empty state is crafted to guide users toward their next action with clear visual hierarchy, appropriate branding, and context-sensitive CTAs. No dead ends.

---

## General Empty State Pattern

```
┌──────────────────────────────────────────────────────────────────┐
│                    CENTERED LAYOUT                               │
│                    Surface-0 background                          │
│                    Full height of content area                   │
│                                                                  │
│                         ┌──────┐                                │
│                         │      │                                │
│                         │ ILLU │                                │
│                         │      │                                │
│                         │120-  │                                │
│                         │160px │                                │
│                         └──────┘                                │
│                                                                  │
│                      Heading-2/3                                │
│                   Description Body/Text-Secondary               │
│                                                                  │
│              [Primary Button]  [Secondary Button]               │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Shared Tokens

| Property | Token | Value |
|----------|-------|-------|
| Background | Surface-0 | Neutral-50 |
| Alignment | — | Centered horizontal + vertical |
| Padding | Space-10 | 48px (minimum) |
| Gap (icon→heading) | Space-7 | 24px |
| Gap (heading→desc) | Space-3 | 8px |
| Gap (desc→CTA) | Space-7 | 24px |
| CTA button | Primary | Primary-500 bg, white text, 40px height |
| Secondary CTA | Outline | Transparent bg, Primary-500 border, 40px height |
| Illustration opacity | — | 0.6–0.8, not distracting |
| Illustration style | — | Line art, rounded caps, Primary-500 strokes |

---

## 1. Dashboard — Welcome

**Priority:** P0 (first visit)
**Visual weight:** High — hero-level

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│              ┌────────────────────────────┐                      │
│              │    Welcome illustration    │                      │
│              │        160px × 160px       │                      │
│              └────────────────────────────┘                      │
│                                                                  │
│              Welcome to MR:EGO                                  │
│              Your AI-powered career command center.             │
│              Upload your first CV and let's find your           │
│              next opportunity.                                  │
│                                                                  │
│        [Upload CV]              [Explore Jobs]                  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-2 | 28px/650, Text-Primary |
| Description | Body | 15px/400, Text-Secondary, max 420px |
| Illustration | — | 160×160px, line art, welcome theme |
| Primary CTA | — | "Upload CV", Primary filled |
| Secondary CTA | — | "Explore Jobs", Primary outline |
| Animation | — | Illustration floats gently (4s loop, 8px translateY) |

---

## 2. CV Manager — No CVs

**Priority:** P0 (core feature gate)
**Visual weight:** High

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-2 | "No CVs yet" |
| Description | Body | "Upload your first CV to get started with AI-powered analysis and job matching." |
| Illustration | — | 160×160px, document with plus icon |
| Primary CTA | — | "Upload Your CV", Primary filled |
| Secondary | — | "Learn More" link, Text-Secondary |

---

## 3. CV Analysis — No CV Selected

**Priority:** P1
**Visual weight:** Medium — informational redirect

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-3 | "Select a CV to analyze" |
| Description | Body-Small | "Go to CV Manager to upload or select a CV for analysis." |
| Illustration | — | 120×120px, chart/document illustration |
| CTA | — | "Go to CV Manager →", Primary filled, navigates to cv-manager |
| Note | — | This is a redirect/tombstone state, not a dead end |

---

## 4. Job Search — No Results

**Priority:** P0 (search experience)
**Visual weight:** High — actionable

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│              ┌────────────────────────────┐                      │
│              │     Search illustration    │                      │
│              │        120px × 120px       │                      │
│              └────────────────────────────┘                      │
│                                                                  │
│              No jobs found                                       │
│              Try adjusting your filters or search terms          │
│              to discover more opportunities.                    │
│                                                                  │
│        [Clear All Filters]     [Browse All Jobs]                │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-3 | "No jobs found" |
| Description | Body-Small | "Try adjusting your filters or search terms." |
| Illustration | — | 120×120px, search/magnifier with X |
| Primary CTA | — | "Clear All Filters", Primary filled |
| Secondary CTA | — | "Browse All Jobs", Primary outline |
| State persistence | — | Remembers filter state; clearing returns to all jobs |

---

## 5. Saved Jobs — Empty

**Priority:** P1
**Visual weight:** Medium

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-3 | "No saved jobs" |
| Description | Body-Small | "Save jobs while browsing to build your shortlist." |
| Illustration | — | 120×120px, bookmark outline |
| CTA | — | "Browse Jobs", Primary filled |

---

## 6. Application Tracker — Empty

**Priority:** P1
**Visual weight:** Medium

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-3 | "No applications yet" |
| Description | Body-Small | "Start applying to jobs to track your progress here." |
| Illustration | — | 120×120px, briefcase/send icon |
| CTA | — | "Browse Jobs", Primary filled |

---

## 7. Documents (Per Category)

### 7.1 Cover Letters

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-3 | "No cover letters yet" |
| Description | Body-Small | "Generate AI-powered cover letters tailored to each application." |
| Illustration | — | 120×120px, envelope/doc with heart |
| CTA | — | "Generate Cover Letter", Primary filled |

### 7.2 Portfolio Items

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-3 | "No portfolio items" |
| Description | Body-Small | "Upload work samples to showcase your skills to employers." |
| CTA | — | "Upload Portfolio Item", Primary filled |

### 7.3 Uploads

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-3 | "No uploads yet" |
| Description | Body-Small | "Upload your documents here for AI analysis and storage." |
| CTA | — | "Upload Document", Primary filled |

### 7.4 Archived Documents

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-3 | "No archived documents" |
| Description | Body-Small | "Archived documents will appear here." |
| Illustration | — | 120×120px, archive box |
| CTA | — | None (informational only) |

---

## 8. Messaging

### 8.1 Inbox — No Messages

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-3 | "No messages yet" |
| Description | Body-Small | "When recruiters or team members message you, conversations will appear here." |
| Illustration | — | 120×120px, speech bubble |
| CTA | — | None (passive state) |

### 8.2 Split View — No Selection

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-3 | "Select a conversation" |
| Description | Body-Small | "Choose a conversation from the left to view messages." |
| Illustration | — | 120×120px, arrow pointing left |
| CTA | — | None (instructional state) |

---

## 9. Notifications

### 9.1 Unread Tab — All Caught Up

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-3 | "All caught up!" |
| Description | Body-Small | "No unread notifications. You're up to date." |
| Illustration | — | 120×120px, checkmark shield |
| CTA | — | [View All] link, switches to All tab |

### 9.2 All Tab — No Notifications

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-3 | "No notifications yet" |
| Description | Body-Small | "You'll receive notifications about applications, messages, and AI insights here." |
| Illustration | — | 120×120px, bell muted |
| CTA | — | None (passive state) |

---

## 10. Career Progress

### 10.1 No Career Goals

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-3 | "Set your first career goal" |
| Description | Body-Small | "Define your career aspirations and let MR:EGO help you build a plan to achieve them." |
| Illustration | — | 120×120px, target/flag |
| CTA | — | "Set Career Goal", Primary filled |

### 10.2 No Past Experience

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-3 | "Add past experience" |
| Description | Body-Small | "Add your work history to enable career path analysis and skill gap detection." |
| CTA | — | "Add Experience", Primary filled |

### 10.3 No Skills

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-3 | "Add skills" |
| Description | Body-Small | "List your skills to get personalized job recommendations and identify growth areas." |
| CTA | — | "Add Skills", Primary filled |

---

## 11. Profile — Documents Tab

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-3 | "No documents uploaded" |
| Description | Body-Small | "Documents you upload or generate will appear in this tab." |
| Illustration | — | 120×120px, folder empty |
| CTA | — | "Upload Document", Primary filled |

---

## 12. Search Overlay — Empty

| Property | Token | Value |
|----------|-------|-------|
| Heading | Body | "Start typing to search..." |
| Description | — | None |
| Icon | — | 48px 🔍, Neutral-300 |
| CTA | — | None (instructional state) |
| Animation | — | Subtle pulse on icon every 4s |

---

## 13. Command Palette — No Results

| Property | Token | Value |
|----------|-------|-------|
| Heading | Body (15px/500) | "No commands found for [query]" |
| Description | Body-Small | "Try asking AI instead" |
| Suggestion | — | "Ask MR:EGO →" link, Primary-500 |
| Illustration | — | None (text only) |
| CTA | — | [Ask AI] navigates to AI workspace |

---

## 14. AI Workspace — New Session

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│              ┌────────────────────────────┐                      │
│              │      Sparkle illustration   │                      │
│              │        160px × 160px       │                      │
│              └────────────────────────────┘                      │
│                                                                  │
│              How can I help you today?                          │
│              Your AI career assistant is ready.                  │
│                                                                  │
│    ┌─────────────────┐  ┌─────────────────┐                    │
│    │  Improve My CV   │  │  Find Jobs      │                    │
│    │  Analyze and     │  │  Matching my    │                    │
│    │  optimize        │  │  profile        │                    │
│    └─────────────────┘  └─────────────────┘                    │
│    ┌─────────────────┐  ┌─────────────────┐                    │
│    │  Write Cover     │  │  Career Advice   │                    │
│    │  Letter          │  │  Guidance and    │                    │
│    │                  │  │  planning        │                    │
│    └─────────────────┘  └─────────────────┘                    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Prompt Cards Spec

| Property | Token | Value |
|----------|-------|-------|
| Layout | — | 2×2 grid, centered |
| Card width | — | 200px |
| Card height | — | 100px |
| Card bg | Surface-1 | #FFFFFF / Neutral-100 |
| Card border | — | 1px solid Neutral-200 |
| Card radius | radius-lg | 12px |
| Card title | Body (14px/600) | Text-Primary |
| Card description | Caption (12px/400) | Text-Secondary |
| Card hover | — | Surface-2 bg, border Primary-200, Shadow-2 |
| Card icon | 20×20px | Primary-500, top left |

| Property | Token | Value |
|----------|-------|-------|
| Heading | Heading-2 | "How can I help you today?" |
| Description | Body | "Your AI career assistant is ready." |
| Illustration | — | 160×160px, sparkle/AI theme |
| Cards | — | 4 prompt cards (see table below) |

### Prompt Card Items

| Card | Title | Description | Action |
|------|-------|-------------|--------|
| 1 | Improve My CV | Analyze and optimize | Opens CV improvement flow |
| 2 | Find Jobs | Matching my profile | Opens AI job matching |
| 3 | Write Cover Letter | AI-generated draft | Opens cover letter wizard |
| 4 | Career Advice | Guidance and planning | Opens career advice chat |

---

## Accessibility

| Requirement | Implementation |
|-------------|---------------|
| Role | `role="status"` for empty state regions |
| Illustration alt | `alt=""` (decorative) or `alt="Decorative illustration for [state]"` |
| Headings | Proper h2/h3 hierarchy, not skipped |
| CTA focus | Focus moved to CTA button on state mount |
| Live region | `aria-live="polite"` if state appears dynamically |
| Color contrast | All text meets WCAG AA (4.5:1), illustrations are decorative |

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Navigate to CTA buttons |
| Enter / Space | Activate focused CTA |
| Escape | Return to previous view (if applicable) |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Desktop | Full centered layout, illustration at 160px |
| Tablet | Scaled illustration 120px, reduced padding |
| Mobile | Illustration 100px, full-width CTAs stacked vertically, reduced gap |

---

## Motion

| Element | Animation | Timing | Easing |
|---------|-----------|--------|--------|
| Illustration fade in | opacity 0→1 | 400ms | ease-out |
| Heading fade in | opacity 0→1, delayed 100ms | 300ms | ease-out |
| Description fade in | opacity 0→1, delayed 150ms | 300ms | ease-out |
| CTA buttons slide in | translateY(12px)→0, delayed 200ms | 300ms | ease-out |
| Prompt cards (AI) | stagger 50ms each, fade + slide | 300ms | ease-out |
| Reduces motion | Respects prefers-reduced-motion | — | Disable all |

---

## AI Features

| Feature | Behavior |
|---------|----------|
| AI workspace empty | 4 prompt cards, AI-generated suggestions |
| Smart suggestions | Empty state CTAs adapt to user stage (new vs returning) |
| Contextual AI offer | Search/command no-results states offer AI fallback |
| Personalized messaging | "Welcome back, [name]" for returning users on Dashboard |

---

## Future Expansion

| Feature | Notes |
|---------|-------|
| Illustrations by preference | Light/dark variant illustrations |
| Animated illustrations | Subtle Lottie/SVG animations on empty states |
| A/B test CTAs | Test CTA copy for conversion optimization |
| User-generated content | "Recommended for you" in empty states for returning users |
| Gamified empty states | Progress dots: "3 of 5 profile sections complete" |
