# UX Constitution

**Phase:** DP-0 (Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Authority:** Permanent, non-negotiable user experience rules for MR:EGO.

---

## Preamble

These rules are permanent. No feature, module, or redesign may violate them. They derive from the [Project-Constitution.md](Project-Constitution.md) and [Product-Constitution.md](Product-Constitution.md) and form the foundation of every user interaction.

---

## Rule 1: Immediate Comprehension

The user understands every page within 30 seconds of first viewing it.

- The page purpose is clear from the heading and primary content.
- Navigation options are distinct and self-explanatory.
- No secondary content distracts from the primary purpose.
- Users should never need to read documentation to understand a page.
- If a page requires explanation, the design has failed.

## Rule 2: One Primary Action Per Screen

Every screen has exactly one primary action — the single most important thing the user can do on that screen.

- Primary actions are visually prominent and consistently positioned.
- Secondary actions are visually subdued and placed below or beside the primary action.
- Tertiary actions are in menus, dropdowns, or overflow patterns.
- Screens with zero clear primary actions are incomplete. Screens with multiple primary actions are broken.

## Rule 3: No Unnecessary Complexity

If a feature can be removed without losing core value, remove it.

- Every visible element must justify its presence.
- Every click, tap, or keystroke must move the user toward a goal.
- Default states are clean. Optional complexity is hidden until needed.
- "Power user" features exist only when the 80% use case is already solved simply.

## Rule 4: No Dashboard Clutter

Dashboards display information, not decoration.

- Every card, chart, and statistic has a defined purpose.
- Empty states are informative, not blank.
- Data visualizations show trends and comparisons, not raw numbers.
- Personalization allows users to hide or reorder dashboard elements.
- The default dashboard is the most useful version for a new user.

## Rule 5: Progressive Disclosure

Reveal complexity only when the user needs it.

- Simple tasks require no configuration.
- Advanced settings are one click away, never zero clicks.
- Wizards and step-by-step flows are used for multi-step tasks.
- Collapsible sections, accordions, and tabs organize related content.
- Search and discovery features help users find capabilities they have not used.

## Rule 6: Accessibility First

Accessibility is not a checklist; it is a design requirement equal to functionality.

- All interactions are usable by keyboard alone.
- All content meets WCAG AA contrast ratios (AAA preferred for body text).
- All images have meaningful alt text or are marked decorative.
- All form inputs have explicit labels.
- All notifications are announced to screen readers.
- Touch targets are minimum 44x44px.
- Focus indicators are visible and intentional.
- Color is never the sole indicator of state or meaning.
- Motion and animation respect `prefers-reduced-motion`.
- All interactive elements are reachable and operable via assistive technology.

*Refer to [Design-Principles.md](Design-Principles.md) for accessibility in visual design.*

## Rule 7: Keyboard Navigation

Every interactive element is reachable and operable via keyboard.

- Tab order follows visual order (left-to-right, top-to-bottom).
- Focus is always visible and moves predictably.
- Custom components implement standard keyboard patterns (Enter to activate, Escape to dismiss, Arrow keys for selection).
- No keyboard traps — focus never gets stuck.
- Skip-to-content links are available at the top of every page.

## Rule 8: Responsive-First

Every interface works on every screen size, from mobile to ultra-wide.

- Content is designed mobile-first and enhanced for larger screens.
- Navigation adapts to viewport size (hamburger menu on mobile, sidebar on desktop).
- Touch interactions are optimized for mobile (swipe, tap, long-press).
- Data tables scroll horizontally on small screens or collapse to cards.
- Font sizes, spacing, and touch targets scale appropriately for each device class.
- Print stylesheets are provided for content that users may want to print.

## Rule 9: Error Prevention

Prevent errors before they happen.

- Form validation occurs inline and in real time.
- Destructive actions require confirmation with the action name typed out.
- Irreversible actions require two-step verification.
- Auto-save prevents data loss on accidental navigation.
- Undo is preferred over "Are you sure?" dialogs.
- Error messages are clear, specific, and solution-oriented.

## Rule 10: Clear Navigation

The user always knows where they are, where they can go, and how to return.

- Breadcrumbs for pages more than two levels deep.
- The current location is visually indicated in the navigation.
- Back navigation is predictable (back button returns to the previous logical location).
- The home/workspace is always one click away.
- Navigation labels match page titles exactly.
- External links are indicated and open in a new context.

## Rule 11: Fast Interaction

Every interaction feels instantaneous.

- Visual feedback appears within 50ms of user action.
- Page transitions complete within 300ms.
- Data loading shows skeleton screens, not spinners.
- Background operations do not block the interface.
- Optimistic updates are used where appropriate (UI updates before server confirms).
- Infinite scroll and pagination are implemented with performance in mind.
- Search results appear as the user types (with debounce).

## Rule 12: Context-Aware AI

AI assistance is contextual, unobtrusive, and deferential.

- AI suggestions appear in context, not in separate panels or popups.
- AI inputs are visually distinct from user-generated content.
- The user can dismiss, accept, or modify any AI suggestion.
- AI does not interrupt active workflows unless a critical condition is detected.
- AI assistance is discoverable but not intrusive.
- The user can disable AI assistance entirely or per-module.

Refer to [Product-Constitution.md](Product-Constitution.md) for AI philosophy and rules.

## Rule 13: Data Integrity and Transparency

Users trust MR:EGO with their data. Every interface must honor that trust.

- Data sources are labeled (user-provided, AI-derived, imported, inferred).
- Data freshness is indicated (last updated, synced, imported).
- Data deletion is thorough, reversible within a grace period, and confirmed.
- Data export is available in open formats (JSON, CSV, Markdown).
- Privacy settings are accessible from any screen via a consistent control.
- Third-party data access is listed, explained, and revocable.

## Rule 14: Consistent Interaction Patterns

Once learned, patterns apply everywhere.

- Same action type uses the same control everywhere (e.g., always a button, never a link that looks like a button).
- Same data type displays the same way everywhere (e.g., dates always in same format).
- Same gesture performs the same action everywhere.
- Same terminology is used for the same concept everywhere.
- Keyboard shortcuts are documented, discoverable, and consistent across modules.

## Rule 15: Loading, Empty, and Error States

Every view accounts for every state, not just the happy path.

- **Loading state:** Skeleton screens matching the final layout. Never blank pages.
- **Empty state:** Helpful message plus a suggested action. Never "No results" without context.
- **Error state:** Clear explanation plus recovery action. Never raw error codes.
- **Partial state:** When data is incomplete, show what is available and indicate what is pending.
- **Offline state:** Graceful degradation with cached data and reconnection status.

## Rule 16: Search and Discoverability

Users can find what they need without knowing where it is.

- Global search is available from every screen.
- Search supports fuzzy matching, typo tolerance, and natural language.
- Search results are categorized and filterable.
- Command palette (Ctrl+K / Cmd+K) provides keyboard-based navigation and actions.
- Feature discovery is integrated into workflows, not separate tours or tutorials.

## Rule 17: Personalization Without Configuration

The platform adapts to the user without requiring setup.

- Frequently used features are prioritized in navigation.
- Recently accessed items are surfaced for quick return.
- Dashboard layout adapts based on usage patterns.
- AI suggestions improve with use.
- Users can override any automated personalization.
- Personalization data is local and privacy-respecting.

## Rule 18: Feedback and Closure

Every action provides closure.

- Success states are shown after completed actions.
- Transitions indicate completion (e.g., item animates into list, checkmark appears).
- Batch operations show progress and summary upon completion.
- Undo is available for reversible actions within a reasonable window.
- Confirmation receipts are provided for critical actions.

## Rule 19: Mobile as First-Class Citizen

Mobile is not a secondary experience — it is a core experience.

- Core workflows are fully functional on mobile devices.
- Touch interactions are optimized with proper gesture support.
- Notifications are actionable from the notification center.
- File attachments, camera access, and location are handled gracefully.
- Mobile navigation is thumb-friendly with primary actions at the bottom.

## Rule 20: Onboarding Without Overwhelm

First-time users become productive within minutes, not hours.

- Onboarding is contextual and interactive, not a slideshow.
- Only essential setup steps are required before first value.
- Optional setup is deferred and offered later in context.
- Sample data demonstrates features without requiring real data entry.
- Progress is saved and can be resumed if onboarding is interrupted.

---

*This UX Constitution is permanent and non-negotiable. Every interface, workflow, and interaction in MR:EGO must conform to these rules. Refer to [Design-Principles.md](Design-Principles.md) for visual design rules, [Product-Constitution.md](Product-Constitution.md) for feature-level UX implications, and [Brand-Constitution.md](Brand-Constitution.md) for tone and voice in UX copy.*
