# DP-35 Learning Center Report

## Architecture

The Learning Center follows the established MR:EGO feature pattern:

- **Route**: `app/(dashboard)/dashboard/learning/page.tsx` + `app/(dashboard)/dashboard/learning/course/[id]/page.tsx`
- **Types**: `types/learning.ts` — Domain models, state interface, and store interface
- **Store**: `stores/learning-store.ts` — Zustand store with local mock data
- **Data**: `data/learning.ts` — 880+ lines of comprehensive demo data
- **Components**: `components/learning/` — 18 components
- **Navigation**: `config/navigation.ts` — "Learning" entry under Workspace group
- **Middleware**: `middleware.ts` — Protected route for `/dashboard/learning`

### Routes
| Route | Description |
|---|---|
| `/dashboard/learning` | Learning Center main page with 10 view modes |
| `/dashboard/learning/course/[id]` | Course detail page with modules/lessons |

## Components (18 total)

| Component | Purpose |
|---|---|
| `learning-layout.tsx` | Three-column layout (sidebar, main, insights) |
| `learning-dashboard.tsx` | Dashboard overview with stats, continue learning, recommendations |
| `course-sidebar.tsx` | Left navigation sidebar with section links and counts |
| `course-grid.tsx` | Responsive grid container for course cards |
| `course-card.tsx` | Course card with progress, bookmark, favorite, and navigation |
| `course-details.tsx` | Full course detail view with header, modules, skills, resources |
| `course-progress.tsx` | Progress bar component with size variants |
| `lesson-list.tsx` | Expandable accordion list of modules and lessons |
| `lesson-card.tsx` | Individual lesson row with type icon and completion state |
| `roadmap-card.tsx` | Roadmap card with step list and progress |
| `roadmap-grid.tsx` | Responsive grid container for roadmap cards |
| `learning-insights.tsx` | Right panel with daily goal, streak, progress, AI suggestions |
| `learning-stats.tsx` | Stats grid showing in-progress, completed, hours, streak, etc. |
| `daily-goal.tsx` | Daily goals list with check/uncheck toggle |
| `learning-streak.tsx` | Weekly activity heatmap with streak counter |
| `empty-state.tsx` | Empty state with icon, message, and optional action |
| `loading-state.tsx` | Loading animation with bounce dots |
| `error-state.tsx` | Error state with retry button |

## Stores

**`stores/learning-store.ts`** — Zustand store (no persist)

State:
- `courses`, `roadmaps`, `dailyGoals`, `learningNotes`, `certificates`, `practiceLabs`, `aiRecommendations`
- `viewMode` (dashboard/courses/roadmaps/bookmarks/completed/certificates/labs/notes/ai-recommendations)
- `viewState` (loading/ready/error/empty)
- `filters` (category, difficulty, status, search, bookmarked)
- `stats`, `summary`, `searchQuery`

Actions:
- CRUD: addNote, updateNote, deleteNote
- Toggle: toggleBookmark, toggleFavorite, toggleGoalCompleted, toggleRoadmapBookmark, toggleLabBookmark, toggleLabCompleted
- Filter: setFilter, resetFilters, setSearchQuery
- Data: setCourses, setRoadmaps, setDailyGoals, etc.
- Selectors: getFilteredCourses, getCourseById, getRoadmapById, getBookmarkedCourses, getCompletedCourses, getInProgressCourses, getRecommendedCourses

## Types

**`types/learning.ts`** — 28 exported types covering all domain models.

Re-exported from `types/index.ts` with `RoadmapStep` aliased as `LearningRoadmapStep` to avoid collision with `career-progress.ts`.

## Routing

- Navigation entry added in `config/navigation.ts` under "Workspace" with `GraduationCap` icon
- Protected in `middleware.ts` at `/dashboard/learning`
- Course detail uses dynamic `[id]` param with fallback to redirect
- No 404 routes — all paths resolve correctly

## Accessibility

- ARIA roles: `main`, `navigation`, `list`, `listitem`, `progressbar`, `alert`, `status`
- ARIA labels on all interactive elements
- `aria-current` for active sidebar items
- `aria-pressed` for view mode toggle buttons
- `aria-expanded` for collapsible modules
- Keyboard navigation: `Enter`/`Space` on interactive cards
- `focus-visible` ring styles on all focusable elements
- `aria-valuenow`/`aria-valuemin`/`aria-valuemax` on progress bars
- `role="progressbar"` on all progress indicators
- `aria-label` with descriptive context on course cards

## Responsive

- **Desktop**: Three-column layout (sidebar + main + insights panel)
- **Tablet**: Two-column (no insights panel, shown at `lg:` breakpoint)
- **Mobile**: Single column (sidebar hidden by default, shown at `xl:` breakpoint)
- Course grid: 1 column mobile → 2 columns tablet → 3 columns desktop
- Stats grid: 2 columns mobile → 3 columns tablet → 6 columns desktop
- View mode tabs collapse labels on small screens (`hidden sm:inline`)

## Learning Modules (10 view modes)

1. **Dashboard** — Overview with stats, continue learning, recommendations, daily goals, streak
2. **My Courses** — All courses with search, category/difficulty/status filters
3. **Recommended** — AI-recommended courses
4. **Roadmaps** — Career roadmaps with step tracking
5. **Bookmarks** — Bookmarked courses only
6. **Completed** — Completed courses
7. **Certificates** — Earned certificates with skill badges
8. **Practice Labs** — Hands-on labs with complete/bookmark actions
9. **Notes** — Learning notes with tags and dates
10. **AI Recommendations** — AI-powered course/path suggestions with confidence scores

## Right Insights Panel

- Daily Goal tracking with progress bar
- Learning Streak with current/longest counters and weekly activity heatmap
- Weekly Progress with completion bar and hours
- Monthly Progress with completion bar, hours, and courses completed
- AI Suggestion card
- Next Lesson quick link
- Recommended Roadmap link

## Future Backend Integration

All data flows through `useLearningStore` which currently loads demo data from `data/learning.ts`. Backend integration requires:

1. Replace `demoCourses`, `demoRoadmaps`, etc. in `stores/learning-store.ts` with API calls
2. Add async `loadData()` methods using TanStack Query or similar
3. The store's `viewState` (`loading/ready/error/empty`) is designed for this transition
4. `AIRecommendation` type has `confidence` and `reason` fields ready for AI model output
5. `LearningSummary` type has `nextLesson` and `recommendedRoadmap` fields for AI routing
6. No UI changes needed — the store abstraction keeps data fetching separate from presentation

## Known Limitations

- AI Coach and Learning Calendar are placeholders marked as "Coming Soon"
- Quiz functionality within lessons is not interactive (shows count only)
- Practice Labs are not actually runnable (mark-complete only)
- No server-side persistence (Zustand store with no persist middleware)
- Certificates are display-only (no generation/download)
- Learning Notes are read-only in the current view (create/edit/delete store methods exist but no UI for them)
- No real-time collaboration or multiplayer features
- No file upload for course resources (links only)

## Next Phase Recommendations

1. **DP-36 Skill Assessment Engine** — Connect learning progress to skill gap analysis
2. **AI Course Recommendations** — Wire `aiRecommendations` to a real ML model
3. **Learning Calendar** — Schedule courses and track deadlines
4. **Interactive Quizzes** — Add quiz-taking within lessons
5. **Certificate Generation** — PDF/credential generation for completed courses
6. **Note Taking UI** — Add note create/edit/delete UI to the Notes section
7. **Backend Sync** — Replace mock data with API integration (TanStack Query)
