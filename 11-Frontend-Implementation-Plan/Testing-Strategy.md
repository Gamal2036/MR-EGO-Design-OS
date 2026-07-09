# Testing Strategy

## Testing Pyramid

```
E2E Tests (10%)        ┌─────────────┐
                       │    E2E      │  Playwright
                       │   (10%)     │  Critical user journeys
                       └──────┬──────┘
                              │
Integration Tests (30%) ┌──────┴──────┐
                        │ Integration │  Vitest + Testing Library
                        │   (30%)     │  Module interactions, API mocking
                        └──────┬──────┘
                               │
Unit Tests (60%)       ┌───────┴───────┐
                       │     Unit      │  Vitest
                       │    (60%)      │  Functions, hooks, utilities, selectors
                       └───────────────┘
```

## Unit Testing

**Framework:** Vitest (configured in DP-12)

**Scope:**
- Utility functions (formatters, validators, type guards)
- Custom hooks (useDebounce, useMediaQuery, useKeyboardShortcut)
- State selectors and reducers
- Token resolution engine
- API client interceptors
- Route guard functions

**Coverage Target:** 90%+ for utility code, 80%+ for hooks and selectors

**Pattern:**
```
packages/utils/src/__tests__/
packages/hooks/src/__tests__/
packages/core/src/__tests__/
```

## Integration Testing

**Framework:** Vitest + Testing Library (React Testing Library)

**Scope:**
- Component rendering and interaction
- Form validation and submission
- Component composition (parent-child data flow)
- State context providers and consumers
- API client + caching integration
- Route guard chains
- Theme switching
- Responsive behavior (via jsdom viewport resize)

**Coverage Target:** 80%+ for component interactions

**Pattern:**
- One test file per component: `ComponentName.test.tsx`
- Tests render components with required providers
- User-centric queries (`getByRole`, `findByText`) preferred
- Avoid testing implementation details (no `state` checks, no class name assertions)

**Key integration tests per module:**
- DP-14: Shell rendering, navigation, region activation
- DP-15: Login form submission, auth state, guard redirects
- DP-17: Dashboard card rendering with mock data
- DP-19: CV form multi-step validation
- DP-23: Wizard step progression

## End-to-End Testing

**Framework:** Playwright

**Scope:**
- Critical user journeys (full flows)
- Cross-page navigation
- Authentication flows
- AI workspace interactions
- CV creation and export
- Job search, apply, and track
- Theme switching persistence
- Responsive breakpoint behavior (mobile, tablet, desktop)

**Journeys to cover:**
```
1. User Registration -> Login -> Dashboard
2. Dashboard navigation -> AI Workspace -> Conversation
3. CV Builder -> Fill sections -> Preview -> Export
4. Job Search -> Filter -> View Details -> Apply
5. Application Tracker -> View Status -> Update
6. Profile -> Edit -> Save -> View
7. Settings -> Change Theme -> Notification Prefs -> Save
8. Mobile: Bottom nav -> All sections -> Portrait/Landscape
```

**Environment:**
- Headless in CI, headed for local development
- Against staging environment with seeded test data
- Recorded video on failure for debugging

## Visual Regression Testing

**Tool:** Storybook + Chromatic or Playwright Visual Comparisons

**Scope:**
- All components at all states (default, hover, active, focus, disabled, error)
- All themes (Light, Dark, HC Light, HC Dark, OLED)
- All breakpoints (mobile, tablet, desktop)
- All component variants

**Threshold:** 0.1% pixel difference tolerance

## Accessibility Testing

**Tool:** axe-core (via Vitest + Testing Library + Storybook test runner)

**Scope:**
- Every component tested for WCAG 2.2 AA violations
- Every page/route tested for landmark and heading structure
- Color contrast verified per theme
- Keyboard navigation verified (programmatic tab order check)

**Frequency:** Every commit (automated), every phase (manual screen reader)

## Performance Testing

**Tool:** Lighthouse CI, custom Performance Observer API

**Scope:**
- Bundle size budget checking (CI gate)
- Lighthouse scores (Performance, Accessibility, SEO, Best Practices)
- Core Web Vitals (LCP, FID/INP, CLS)
- Runtime performance (frame rate, memory usage)
- Network waterfall analysis

**Frequency:** Every PR (bundle size, Lighthouse), per phase (detailed profiling)

## Test Data Strategy

- Factories for generating mock data (CV, jobs, applications, users)
- MSW (Mock Service Worker) for API mocking in tests
- Seeded test data in staging environment for E2E
- No production data used in tests

## CI Integration

| Gate | Test Type | Action |
|------|-----------|--------|
| Pre-commit | Unit (changed files) | `lint-staged` with Vitest |
| PR | Unit + Integration + Build | CI pipeline |
| PR | Bundle size check | `size-limit` |
| PR | Lighthouse desktop + mobile | Lighthouse CI |
| Merge to staging | All E2E | Playwright full suite |
| Release | Visual regression | Chromatic or Playwright visual |
| Release | Full a11y audit | axe-core full scan |

## Quality Gates

| Gate | Phase | Criteria |
|------|-------|----------|
| QG1 | Every phase | All unit + integration tests pass (0 failures) |
| QG2 | Every phase | No new a11y violations |
| QG3 | Every phase | Bundle size within budget |
| QG4 | DP-31 | Lighthouse >=90 all categories |
| QG5 | DP-31 | E2E suite 100% pass rate |
| QG6 | DP-32 | Visual regression 0 differences |
| QG7 | DP-32 | Manual a11y audit passes |
