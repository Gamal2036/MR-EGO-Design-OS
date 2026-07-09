# Future Expansion — Visual Prototype System

**Phase:** DP-9 (Visual Prototype System)
**Status:** Complete
**Inherits:** DP-0:Future-Expansion, DP-1:Future-Color-Expansion, DP-3:Patterns/*, DP-4:Workspace/*, DP-5:Future-Visual-Expansion, DP-6:Future-Expansion, DP-7:Future-Expansion, DP-8:Future-Expansion

---

## Expansion Philosophy

The MR:EGO Visual Prototype System is designed for phased expansion. Every prototype specification includes Future Expansion sections that anticipate new features, screens, and interactions. This document consolidates all future visual prototype expansions across every aspect of the product.

---

## Phase 2: Enhanced Core

### Dashboard Customization

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Drag-reorder widgets | Widget grid becomes sortable with drag handle (6 dots icon, left edge of widget header). Visual feedback: ghost element at original position, elevated shadow during drag, snap animation on drop. | DragHandle, DragOverlay, DropIndicator |
| Widget resizing | Widget edges gain resize handle (bottom-right corner, 8px grip area). Width options: 1/3, 2/3, full column span. Height auto-adjusts. | ResizeHandle, SizePresetMenu |
| Widget add panel | "+" button in widget grid opens panel (320px overlay) showing available widgets with preview thumbnails and descriptions. | WidgetPicker, WidgetPreview |
| Widget presets | "Dashboard Presets" dropdown in header: Default, Analytics-focused, Jobs-focused, Minimal | PresetCard, PresetSelector |
| Layout persistence | Visual indicator that layout is saved (green checkmark + "Saved" caption appearing 2s after last change) | SaveIndicator |

### Enhanced Search

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Search filters panel | Expandable filter bar below search input with chip-based active filters. Category: Jobs/People/Documents/CVs toggle row. | FilterBar, FilterChip, CategoryToggle |
| Search history | "Recent Searches" section in search results with clock icon, timestamp, and delete button per item. Max 10 items. | HistoryItem, ClearHistoryButton |
| Saved searches | Bookmark icon on search results page, "Save Search" dialog with name input and notification toggle. | SaveSearchDialog, SavedSearchCard |
| Natural language hints | Below search input, contextual hint chips rotate: "Try: remote frontend jobs", "Try: companies hiring in SF" | HintChip, HintRotation |

### Notification Refinements

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Notification scheduling | "Quiet hours" UI in Settings: time range selector with AM/PM toggle, day-of-week toggles. Calendar icon shows active quiet hours. | TimeRangePicker, DayToggle |
| Push notification config | Per-category push toggle in Settings: Application updates, AI insights, Messages, Marketing. Each with preview showing how push appears. | PushToggle, PushPreview |
| Email digest preferences | Digest frequency selector: Daily/Weekly/Monthly with time preference. Preview panel showing digest format. | DigestSelector, DigestPreview |
| Custom notification rules | "If/Then" rule builder: Condition dropdown + action dropdown + save. Max 5 custom rules. | RuleBuilder, RuleCard, RuleCondition |

---

## Phase 3: Content & Calendar

### Calendar Integration

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Calendar widget | Monthly calendar grid widget on Dashboard (min 280px, expandable to full width). Shows interview dates with colored dots. Click opens day detail. | CalendarWidget, CalendarDay, CalendarEvent |
| Interview scheduling | Side panel with date/time picker, timezone selector, duration dropdown, video meeting link field. "Add to Calendar" button with Google/Apple/Outlook options. | SchedulePanel, TimezoneSelect, CalendarConnect |
| Event detail | Modal showing interview details: company, role, time, location/link, preparation notes, attached CV. Action buttons: [Join Meeting] [Prepare] [Reschedule] [Cancel] | EventDetailModal, JoinButton, PrepPanel |
| Week view | Alternative timeline view showing current week with interview slots highlighted. Horizontal scroll for hours. | WeekTimeline, TimeSlot, EventBlock |

### Cover Letter Enhancement

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Cover letter templates | Grid view of cover letter templates (4-column, 160px x 200px cards showing letter preview). Category filter tabs. | TemplateCard, TemplatePreview, CategoryFilter |
| Paired generation | Side-by-side view: job description (left) + generated cover letter (right). AI highlights matched keywords. "Regenerate for different tone" dropdown. | PairedView, KeywordHighlight, ToneSelector |
| Cover letter library | Category-based grid of saved cover letters with version history per letter. Search within library. | LetterCard, LetterVersion, LibrarySearch |

### Skill Assessment

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Skill assessment quiz | Full-screen assessment mode with progress stepper, question card, timer indicator (warning color at <2min). Multiple choice with highlighted correct/incorrect on completion. | AssessmentCard, QuestionCard, TimerBar, ProgressStepper |
| Skill verification badges | Badge component showing verified (checkmark + "Verified"), in-progress (clock + "In Progress"), or unverified status per skill. | SkillBadge, VerificationStatus |
| Assessment results | Score radial (120px) with per-category breakdown. Comparison to target role requirements. Weak areas highlighted for improvement. | ResultRadial, CategoryScore, GapAnalysis |

---

## Phase 4: Analytics & Insights

### Advanced Analytics Dashboard

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Application analytics | Chart section with application metrics: application volume (line chart, 6 months), response rate (donut), interview conversion (funnel). Date range selector. | AnalyticsChart, ApplicationFunnel, DateRangeSelector |
| Market insights | Market data overlay: salary trends (line chart), hiring demand (bar chart), top skills (horizontal bar). Source citation caption. | MarketChart, DemandBar, SourceCitation |
| Career trajectory prediction | Timeline projection (2-5 years) showing potential career paths based on current profile. "If you learn X, then Y" branching visualization. | TrajectoryTimeline, BranchNode, PathPrediction |
| Offer comparison tool | Side-by-side offer comparison: salary, equity, benefits, location, growth score. Weighted scoring with visual bars. | OfferCard, ComparisonTable, WeightScore_Bar |

### Salary Insights

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Salary explorer | Full-page salary data view: search by role/location, interactive chart showing percentile distribution (10th-90th). Filters for experience level, company size, industry. | SalaryChart, PercentileMarker, SalaryFilters |
| Compensation breakdown | Pie chart or stacked bar showing base salary, bonus, equity, benefits. Comparison to market average with delta indicator. | CompPieChart, CompComparison, DeltaIndicator |
| Salary negotiation guide | Step-by-step negotiation guide card with AI-generated talking points, market data citation, and script suggestions. | NegotiationCard, TalkingPoint, ScriptPreview |

### Company Research

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Company profile panel | Side panel (480px) showing company overview, recent news(3 items), culture indicators, employee count, funding stage, similar companies. | CompanyPanel, NewsItem, CultureIndicator |
| Culture insights | Visual culture scorecard: 5 dimensions (Work-life Balance, Growth, Compensation, Mission, Culture) shown as bars with comparison to industry average. | CultureScorecard, DimensionBar |
| Alumni network | "People you know" section showing 1st/2nd degree connections at company. Avatar + name + role + "Ask for referral" button. | AlumniCard, ReferralButton |

---

## Phase 5: Automation & Portfolio

### One-Click Apply

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Quick apply profile | Dedicated profile section collecting all data needed for one-click apply: default CV, cover letter template, contact info, answers to common questions. Progress indicator showing completeness. | QuickApplyProfile, CompletenessIndicator, DefaultSelector |
| One-click apply button | Prominent "Quick Apply" button (Primary-600, sparkle icon) on job cards and detail view. Different from standard "Apply Now" (has lightning bolt icon). | QuickApplyButton, ApplySuccess |
| Apply confirmation summary | Compact card showing what was submitted: role, company, CV used, cover letter. "Undo" option for 10 seconds. | ApplySummary, UndoButton |

### Portfolio Builder

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Portfolio section in Profile | New "Portfolio" tab in Profile with grid layout. Cards show project title, description, link, technologies used, media (image/video). | PortfolioCard, ProjectMedia, TechTag |
| Portfolio item editor | Modal form: title, description, URL, technologies (multi-select), media upload, date. Preview panel shows how it appears. | PortfolioEditor, MediaUploader, PortfolioPreview |
| Portfolio sharing | Public portfolio link with shareable URL. Toggle for public/private. QR code for sharing at events. | ShareLink, QRCode, PrivacyToggle |

### Interview Preparation

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Interview prep hub | Dedicated interview preparation page with: upcoming interviews list, practice question cards, company-specific prep notes, mock interview scheduler. | PrepHub, QuestionCard, PrepNote |
| Practice questions | Question card with AI-generated questions based on role/company. "Show Answer" reveal. Rating buttons for difficulty. | PracticeQuestion, AnswerReveal, DifficultyRating |
| Mock interview mode | Full-screen interview simulation: AI asks questions verbally, user responds via text/voice, AI gives feedback on response quality. Timer per question. | MockInterview, QuestionTimer, FeedbackCard |
| Preparation checklist | Check-list of common prep items: research company, practice questions, prepare questions for them, tech setup, outfit, arrive early. Auto-populated by AI. | PrepChecklist, ChecklistItem, AutoSuggest |

---

## Phase 6: Collaboration & Enterprise

### Team Collaboration

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Shared workspace | "Team" section with shared dashboard showing team member applications, shared notes, collaborative CV feedback. | TeamDashboard, MemberCard, SharedNote |
| Role-based access | Visual indicators showing user role: Admin, Manager, Member, Viewer. Badge with icon + label in user menu and team view. | RoleBadge, PermissionIndicator |
| Collaborative CV editing | Real-time multi-user editing with cursor indicators per user. Comment threads on sections. Version history with user attribution. | CursorOverlay, CommentThread, UserAttribution |
| Mentor matching | Mentor profile cards: avatar, role, company, expertise areas (tags), availability indicator, "Request Mentorship" button. | MentorCard, ExpertiseTag, AvailabilityDot |

### Enterprise Features

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| SSO/SAML login | Additional login button on Authentication page: "SSO Login" with enterprise icon. Redirects to identity provider. | SSOButton, EnterpriseLogin |
| Multi-factor authentication | MFA setup wizard: QR code display, backup codes list (downloadable), authenticator app options. TOTP input with 6-digit boxes. | MFAQRCode, BackupCodeList, TOTPInput |
| Audit log | Searchable, filterable table of account activity: timestamp, action, IP address, device, location. Date range filter. | AuditTable, AuditFilter, ActivityRow |
| Admin panel | User management table (searchable, sortable), role assignment dropdown, account status toggles (active/suspended/deleted). | UserTable, RoleDropdown, StatusToggle |

### Passkeys & Biometrics

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Passkey registration | Passkey setup dialog with device selection (Face ID, Touch ID, Windows Hello). Success/failure state with animation. | PasskeySetup, BiometricIcon, PasskeyStatus |
| Passkey login | "Sign in with Face ID / Touch ID" button on login screen. Fingerprint/face icon. Click triggers browser passkey API. | BiometricButton, PasskeyPrompt |
| Device management | "Trusted Devices" section in Security Settings: device name, type icon, last used date, "Remove" button. | DeviceCard, DeviceIcon, DeviceRemove |

---

## Phase 7: Video & Multimedia

### Video CV

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Video upload in CV | Video section in CV Builder: upload zone for MP4 (max 100MB). Thumbnail preview, title, description. | VideoUpload, VideoThumbnail, VideoPlayer |
| Video CV player | Inline video player (max 720px width) with custom controls: play/pause, progress bar, volume, fullscreen. Chapters if tagged. | CVVideoPlayer, ChapterMarker, PlaybackControl |
| Video CV gallery | Grid view of video CVs in Profile Documents tab. 2-column on desktop, 1-column mobile. Duration badge. | VideoCard, DurationBadge, VideoGrid |

### Interview Practice with Video

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Video response recording | Interview simulation mode: camera preview (self-view), question display, recording indicator (red dot + timer), response playback. | CameraPreview, RecordingIndicator, ResponsePlayback |
| Video feedback analysis | AI analysis of recorded response: speaking pace (speedometer), filler word count, eye contact estimate, confidence score. | FeedbackMeter, FillerWordCounter, ConfidenceGauge |
| Body language tips | Overlay tips during practice: "Try sitting up straighter", "Good eye contact", "Slow down your speaking pace" | TipOverlay, PostureGuide, PaceIndicator |

### Companion Device Features

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| QR code login | QR code displayed on login page (expiring 30s). "Scan with mobile app" instruction. Shows spinning refresh on expiry. | QRCode, QRRefresh, ScanInstruction |
| Mobile notifications | Native push notification concept: compact notification card with app icon, title, body, timestamp, swipe actions. | PushCard, SwipeAction, CompactNotification |
| Multi-device sync | Device status indicators in Settings: current device (green dot), other devices (gray dot with last sync time). | DeviceStatus, SyncIndicator, LastSync |

---

## Phase 8+: Advanced AI & OS Integration

### Screen Context Awareness

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| AI detects current action | AI panel header updates context dynamically. Shows "Helping with: [current screen context]". Example: on CV Analysis, shows "Analyzing CV for Senior Frontend roles". | ContextDetector, DynamicHeader, ActiveTask |
| Proactive AI suggestions | AI surfaces suggestions without user prompt. Small animated indicator (subtle glow) on AI button. Non-blocking floating chip "AI has a suggestion" that fades in gently. | ProactiveIndicator, SuggestionChip, GentleGlow |
| Cross-page AI memory | AI references user activity across pages. "I noticed you were looking at Senior Frontend roles. Here's how to optimize your CV for those." | CrossPageMemory, ContextReference |

### Collaborative AI Sessions

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Shared AI conversation | "Share conversation" button in AI Workspace. Generates shareable link with view/comment/edit permissions. | ShareConversation, ShareLink, PermissionSelect |
| AI session history | Sidebar in AI Workspace showing conversation history organized by date with search. Each entry shows preview and date. | SessionHistory, SessionCard, SessionSearch |
| AI session export | Export dropdown: PDF, Markdown, Text. Format selector before export dialog. | ExportDropdown, FormatSelector, ExportDialog |

### Custom AI Models

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Model selector | Dropdown in AI Workspace header: "MR:EGO Default", "Fast (GPT-4o Mini)", "Advanced (GPT-4)", "Enterprise Custom". Shows speed/capability indicators. | ModelDropdown, ModelBadge, SpeedIndicator |
| AI settings | Dedicated AI Settings section: model selection, temperature slider (0-1), max tokens, response length preference, custom instructions text area. | ModelSelect, TemperatureSlider, CustomInstructions |
| Model comparison | Side-by-side comparison of model outputs for same prompt. Show which model produced each response with confidence scores. | ModelComparison, OutputCard, ScoreComparison |

### AI Workflow Automation

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Workflow builder | Visual workflow builder with drag-and-drop nodes: Trigger + Action + Condition. Node palette on left, canvas center. | WorkflowCanvas, NodePalette, ConnectionLine |
| Workflow templates | Gallery of pre-built workflow templates: "Auto-apply to matching jobs", "Weekly application report", "CV auto-optimize for each application" | WorkflowTemplate, TemplateCard, OneClickSetup |
| Workflow execution log | Run history table: timestamp, trigger, actions taken, success/error status. Click to expand details. | ExecutionLog, RunRow, RunDetail |

### OS-Level Integration

| Feature | Visual Change | New Components |
|---------|--------------|----------------|
| Desktop widget | OS widget showing daily summary: application count, next interview, CV score. Compact (2x2) and medium (4x2) sizes. | DesktopWidget, WidgetSize, DailySummary |
| Menubar app | Menu bar dropdown: quick access to search, upcoming events, notification count. Opens main app on click. | MenubarDropdown, QuickAccess, EventCount |
| Calendar sync | Visual sync status in Settings: connected services (Google Calendar, Outlook, Apple Calendar) with on/off toggles, last sync timestamp. | CalendarSync, ServiceCard, SyncStatus |
| Browser extension | Extension popup: save job from any site to MR:EGO. Shows simplified form: URL, title, company, "Save" button. | SaveJobPopup, JobPreview, BrowserAction |
| Drag-and-drop import | System: drag PDF/DOCX/URL onto app icon to auto-import. Visual feedback: app icon highlights, progress overlay. | DropOverlay, ImportProgress, FileHighlight |

---

## Responsive & Device Expansion

### AR/VR

| Feature | Visual Change |
|---------|--------------|
| Spatial dashboard | 3D layout with information panels floating in space. Depth layers for priority. Gesture-based interaction. |
| Spatial AI workspace | AI conversation as 3D object, contextual data floating beside conversation. Spatial audio for notifications. |
| Interview simulator | VR mock interview with AI avatar interviewer. Spatial room environment options. |

### Wearables

| Feature | Visual Change |
|---------|--------------|
| Smartwatch notifications | Compact notification: app icon + title + 2 lines. Swipe for actions: View, Dismiss, Reply (preset). |
| Smartwatch quick stats | Watch face complication showing application count or next interview countdown. |
| Smart glasses overlay | Minimal HUD: notification indicator (top right), quick status glance. Voice-activated commands. |

### Voice-First

| Feature | Visual Change |
|---------|--------------|
| Voice search mode | Full-screen voice interface with waveform visualization. Results displayed as cards with spoken summary. |
| Voice commands | Command list accessible via "Hey MR:EGO" trigger. Overlay showing available commands categorized. |
| Voice AI conversation | Entirely voice-driven AI interaction. Text transcription shown alongside AI spoken response. |

---

## Visual System Evolution

### Theme Expansion

| Theme | Visual Change |
|-------|--------------|
| High Contrast | Increased border widths (2px), higher color contrast ratios (7:1+), thicker focus indicators (3px), bolder semantic colors. Reduced blur effects. |
| OLED | Pure black (#000000) backgrounds for power savings. Reduced white surface area. Deeper neutrals. |
| Custom themes | Color override system with preview panel. Theme file import/export. Community theme gallery. |
| Seasonal themes | Subtle accent color shifts for holidays/professional events. User opt-in. |

---

## Expansion Impact Summary

| Phase | New Pages | New Components | Visual System Changes |
|-------|-----------|----------------|----------------------|
| Phase 2 | 0 | 12 | Widget customization |
| Phase 3 | 2 (Calendar, Assessments) | 18 | Calendar grid, assessment mode |
| Phase 4 | 2 (Analytics, Salary) | 22 | Chart system expansion, data overlays |
| Phase 5 | 2 (Portfolio, Interview Prep) | 16 | Portfolio grid, simulation mode |
| Phase 6 | 3 (Team, Admin, MFA) | 20 | Enterprise chrome, collaboration UI |
| Phase 7 | 2 (Video CV, Mock Interview) | 14 | Video player, camera UI |
| Phase 8+ | 4 (Workflow, Models, Desktop, Extension) | 28 | Workflow canvas, 3D spatial |
| Total | 15 | 130 | Continuous evolution |

---

## Design Constraints for Expansion

1. **Backward compatibility:** All new features must work within existing grid, spacing, and layout systems
2. **Progressive enhancement:** New features layer on top of existing screens without breaking current flows
3. **Consistent token usage:** All new components use existing design tokens; token expansion only when necessary
4. **Performance first:** New visual features must not degrade page load or interaction performance
5. **Accessibility maintained:** Every new feature meets WCAG AA at minimum
6. **Responsive by default:** All new features designed for mobile-first then enhanced for larger screens
7. **Motion consistency:** New animations follow DP-8 timing and easing standards
8. **AI transparency maintained:** All new AI features include confidence indicators, reasoning access, and graceful error handling

---

*Cross-references: DP-0:Future-Expansion, DP-1:Future-Color-Expansion, DP-5:Future-Visual-Expansion, DP-6:Future-Expansion, DP-7:Future-Expansion, DP-8:Future-Expansion*
