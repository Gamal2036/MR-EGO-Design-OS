# Page Hierarchy

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-6 ([Information-Architecture.md](../06-UX-Architecture/Information-Architecture.md)), DP-6 ([Screen-Inventory.md](../06-UX-Architecture/Screen-Inventory.md))

---

## Purpose

Defines the complete page tree, page types, page lifecycle, and page composition model. Every page in MR:EGO is defined here.

---

## Page Tree

```
Application
├── Public Zone
│   ├── LandingPage
│   ├── WelcomePage
│   ├── LoginPage
│   ├── RegisterPage
│   ├── PasswordResetPage
│   ├── PasswordResetConfirmPage
│   ├── HelpCenterPage
│   └── HelpArticlePage
│
├── Core Zone
│   ├── DashboardPage
│   │   ├── OverviewContext
│   │   ├── TasksContext
│   │   └── ProgressContext
│   │
│   ├── OnboardingPage
│   │   ├── GoalSelectionStep
│   │   ├── ExperienceStep
│   │   ├── SkillsStep
│   │   └── InterestsStep
│   │
│   └── SettingsPage
│       ├── GeneralSection
│       ├── ProfileSection
│       ├── NotificationsSection
│       ├── PrivacySection
│       ├── AppearanceSection
│       ├── SecuritySection
│       └── AdvancedSection
│
├── Career Zone
│   ├── JobSearchPage
│   │   ├── SearchResultsList
│   │   ├── FilterPanel
│   │   └── SavedSearchesList
│   ├── JobDetailPage
│   │   ├── JobInfoCard
│   │   ├── MatchScoreCard
│   │   ├── AIFitAnalysisCard
│   │   ├── CompanyInfoCard
│   │   ├── SimilarJobsList
│   │   └── SkillsGapCard
│   ├── ApplicationFormPage
│   │   ├── ContactInfoSection
│   │   ├── CVSelectorSection
│   │   ├── CoverLetterSection
│   │   └── AttachmentSection
│   ├── ApplicationListPage
│   │   ├── ActiveTab
│   │   ├── InterviewingTab
│   │   ├── OffersTab
│   │   └── RejectedTab
│   ├── ApplicationDetailPage
│   │   ├── StatusCard
│   │   ├── TimelineSection
│   │   ├── AIInsightsSection
│   │   └── ActionsSection
│   └── CareerProgressPage
│       ├── TimelineSection
│       ├── SkillMapSection
│       ├── GoalsSection
│       └── AnalyticsSection
│
├── Documents Zone
│   ├── CVManagerPage
│   │   ├── UploadZone
│   │   ├── CVListSection
│   │   └── AIOptimizationCard
│   ├── CVAnalysisPage
│   │   ├── ScoreSection
│   │   ├── SectionAnalysis[]
│   │   └── ImprovementList
│   ├── CVOptimizationPage
│   │   ├── EditorPanel
│   │   ├── SuggestionPanel
│   │   └── PreviewPanel
│   ├── DocumentListPage
│   │   ├── FileListSection
│   │   └── PreviewSection
│   └── DocumentDetailPage
│       ├── DocumentViewer
│       ├── MetadataPanel
│       └── ActionsPanel
│
├── AI Zone
│   ├── AIWorkspacePage
│   │   ├── ConversationPanel
│   │   ├── SuggestionPanel
│   │   ├── ReasoningPanel
│   │   └── MemoryPanel
│   └── AIConversationPage
│       ├── MessageList
│       ├── InputArea
│       └── ContextBadge
│
├── Social Zone
│   ├── ProfilePage
│   │   ├── HeroSection
│   │   ├── AboutSection
│   │   ├── ExperienceSection
│   │   ├── SkillsSection
│   │   ├── DocumentsSection
│   │   └── ActivitySection
│   ├── NotificationCenterPage
│   │   ├── NotificationList
│   │   ├── FilterTabs
│   │   └── DigestSection
│   └── MessagingPage (future)
│       ├── ConversationList
│       ├── ChatPanel
│       └── ThreadPanel
│
└── System Zone
    ├── NotFoundPage
    ├── ServerErrorPage
    ├── OfflinePage
    ├── MaintenancePage
    └── UnauthorizedPage
```

---

## Page Definition

Every page in the hierarchy has the following definition:

```typescript
// Pseudocode
interface PageDefinition {
  id: string;
  moduleId: string;
  route: string;
  layout: LayoutType;
  component: ComponentType;
  type: PageType;
  states: PageStateConfig;
  sections: SectionDefinition[];
  actions: PageAction[];
  resolvers: ResolverDefinition[];
  meta: PageMeta;
}

enum PageType {
  List,           // Data listing (search, browse)
  Detail,         // Single entity view
  Form,           // Data entry (create, edit)
  Dashboard,      // Aggregated overview
  Wizard,         // Multi-step flow
  Settings,       // User configuration
  System,         // Error, loading, system pages
  Onboarding,     // New user setup
  Conversation    // AI chat interface
}
```

---

## Page Lifecycle

```
Route resolved
     ↓
Page component initialises
     ↓
Resolvers execute (parallel data fetching)
     ↓
Loading state → skeleton rendered
     ↓
Data arrives → full render
     ↓
User interacts (navigation, edit, search, etc.)
     ↓
User navigates away
     ↓
onDeactivate → cleanup subscriptions, persist state
     ↓
Page unmounts
```

### Lifecycle Hooks

```typescript
// Pseudocode
interface PageLifecycle {
  onInit(params: RouteParams): void;
  onActivate(): void;                    // Page becomes visible
  onDeactivate(): void;                  // Page is no longer visible
  onResize(breakpoint: Breakpoint): void;
  onParamsChange(params: RouteParams): void;  // Route param change
  onReFocus(): void;                     // Tab focus returned
  onOnline(): void;                      // Network restored
  onOffline(): void;                     // Network lost
  onDestroy(): void;                     // Page unmounting
}
```

---

## Section Composition

Pages compose sections. Sections are reusable content blocks.

```typescript
// Pseudocode
interface SectionDefinition {
  id: string;
  type: SectionType;
  title: string;
  component: ComponentType;
  dataSource: DataSource;
  isCollapsible: boolean;
  isOptional: boolean;
  order: number;
  visibility: SectionVisibility;
}

enum SectionType {
  Header,       // Page title + actions
  Info,         // Information display
  Form,         // Data entry
  List,         // Data listing
  Grid,         // Widget grid
  Timeline,     // Chronological events
  Chart,        // Data visualisation
  Summary,      // Aggregated data
  AI,           // AI-generated content
  Empty,        // Empty state
  Error,        // Error state
  Actions       // Action buttons
}

interface SectionVisibility {
  desktop: boolean;
  tablet: boolean;
  mobile: boolean;
  auth: boolean;
  condition?: (state: AppState) => boolean;
}
```

---

## Page States

Every page implements the standard state machine:

```
                 ┌──────────┐
        ┌───────▶│  LOADING │◄───────┐
        │        └──────────┘        │
        │             │              │
   ┌────┴────┐  ┌─────▼──────┐      │
   │  ERROR  │  │  CONTENT   │───────┘
   └─────────┘  └─────┬──────┘
                      │
                 ┌────▼──────┐
                 │   EMPTY   │
                 └───────────┘
```

### State Transitions

| From | To | Trigger |
|------|-----|---------|
| Loading | Content | Data resolved successfully |
| Loading | Error | Data resolution failed |
| Content | Error | Background refresh failed |
| Error | Loading | Retry action |
| Content | Empty | Filter removed all results |
| Empty | Content | Data added |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Component-Hierarchy.md](Component-Hierarchy.md) | Components that compose pages |
| [Routing-System.md](Routing-System.md) | Routes that map to pages |
| [Navigation-Architecture.md](Navigation-Architecture.md) | Navigation items that point to pages |

---

## Validation Notes

1. Every page has a defined type, layout, and section composition.
2. Pages are module-scoped — no orphan pages outside a module.
3. Every page implements the full state machine (loading, content, empty, error).
4. Section visibility can differ by device class.
5. Page lifecycle hooks cover all scenarios (focus, online, param changes).
