# Risk Assessment

## Risk Register

| ID | Risk | Probability | Impact | Score | Mitigation |
|----|------|-------------|--------|-------|------------|
| R1 | Design token changes late in development | Low | High | Medium | DP-13 freezes tokens; token package versioned; changes go through deprecation cycle |
| R2 | Shell API/contract changes after module development begins | Low | High | Medium | Shell stabilized before module phases; interface contracts documented; semantic versioning |
| R3 | AI service latency or unavailability | Medium | High | High | Graceful degradation; caching of AI responses; offline fallback UI; loading states always implemented |
| R4 | Browser compatibility issues | Low | Medium | Low | Supported browser list defined in DP-12; automated cross-browser testing; progressive enhancement |
| R5 | Performance regression from uncontrolled component growth | Medium | High | High | Performance budgets in CI; bundle size monitoring; code review gates for large additions |
| R6 | Accessibility violations discovered late | Medium | High | High | a11y built-in from DP-14; automated a11y testing per commit; phased a11y audits |
| R7 | Third-party dependency vulnerability | Medium | Medium | Medium | npm audit in CI; Dependabot configured; minimal dependency policy; lockfile verification |
| R8 | Developer onboarding time | Medium | Low | Low | DP-10 documentation comprehensive; package structure defined; component contracts documented |
| R9 | Scope creep during implementation | High | Medium | High | Each DP phase has strict entry/exit criteria; changes deferred to Future-Releases.md |
| R10 | API backend not ready when frontend module is built | Medium | High | High | MSW mock API layer built in DP-14; frontend developers work against mocks; integration buffer |
| R11 | Theme switching performance issues | Low | Medium | Low | GPU-accelerated transitions only; tested with low-end devices in DP-31 |
| R12 | Mobile responsiveness gaps | Medium | Medium | Medium | Mobile-first approach in DP-14; all screens designed for all breakpoints; real device testing in DP-31 |
| R13 | Internationalization added late | Medium | Low | Low | i18n framework configured in DP-12; translations skeleton in DP-14; full implementation in DP-29 |
| R14 | Streaming message rendering performance | Medium | High | High | Virtualized message list; paginated conversation history; streaming optimized for 60fps |
| R15 | Security review bypassed | Low | High | Medium | Security checklist in Security-Checklist.md; mandatory security review gates at DP-15 and DP-32 |

## Risk Matrix

```
High    │ R3  R5  R6  R9  R14 │ R15
        │                      │
Medium  │        R7  R10 R12  │ R1  R2
        │        R13          │
Low     │ R4  R8              │ R11
        │                      │
        └──────────────────────┴──
          Low    Medium    High
                  Probability
```

## Top 5 Risks — Detailed Mitigation

### R3: AI Service Latency/Unavailability

**Impact:** Core feature (AI Workspace, CV Analysis) becomes unusable or slow

**Mitigation:**
- AI layer abstraction: if AI service is down, UI shows degraded state with cached suggestions
- Conversation history cached locally for read access
- Streaming messages designed to handle interruptions gracefully (reconnect, resume)
- AI API timeouts: user sees "AI service busy" state instead of hanging UI
- Retry with exponential backoff (3 attempts)

### R5: Performance Regression

**Impact:** Bundle grows beyond budget, page load slows, user experience degrades

**Mitigation:**
- CI enforces bundle size budgets per package
- `size-limit` configuration in DP-12
- Code review process includes performance consideration
- Monthly performance audit
- Lazy loading for all module routes
- Tree-shaking verification in build pipeline

### R6: Accessibility Violations Discovered Late

**Impact:** Costly remediation, delayed release, legal/compliance risk

**Mitigation:**
- a11y testing in CI (axe-core per component)
- Accessibility checklist as part of component definition of done
- Screen reader testing per phase
- Focus management verified every phase
- Color contrast tested per theme every phase

### R9: Scope Creep

**Impact:** Timeline slips, unfinished features, quality degradation

**Mitigation:**
- Each DP phase has documented entry/exit criteria
- New features require DP phase number and acceptance
- Feature requests outside current DP deferred to Future-Releases.md
- Stakeholder demos every 3 phases to manage expectations
- Prioritization matrix: P0 (must have), P1 (should have), P2 (nice to have)

### R14: Streaming Message Rendering Performance

**Impact:** UI jank during AI streaming, high CPU usage, bad UX

**Mitigation:**
- Virtualized conversation list (only render visible messages)
- Batch DOM updates during streaming (10ms frame budget)
- Streaming message render capped at 60fps via requestAnimationFrame
- Large conversations paginated (load older messages on scroll)
- Web Worker for token processing if needed

## Contingency Budgets

| Buffer | Allocation | Use Case |
|--------|-----------|----------|
| Time buffer | 2 weeks (of 24 total) | Scope adjustments, unforeseen delays |
| Performance budget | 20% headroom | Allow for growth without breaking budgets |
| Bundle budget | 20% headroom | New features without immediate optimization |
| Accessibility | Continuous | Prevent major late-stage remediation |
