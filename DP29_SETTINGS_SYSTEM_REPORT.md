# DP-29 — Settings System

**Status:** COMPLETE  
**Build:** SUCCESS  
**Date:** 2026-07-09

---

## Architecture

The Settings System follows the same architecture as existing features (Profile, Analytics):

```
page.tsx → SettingsLayout → SettingsSidebar + Category Cards
                               ↓
                    useSettingsStore (Zustand + persist)
                               ↓
                    defaultSettingsData (mock data)
```

### Route

- **`/dashboard/settings`** — Protected route within the `(dashboard)` layout group
- Middleware updated to include `/dashboard/settings` in protected paths
- Sidebar navigation updated with a **Settings** entry in the Management group
- User menu **Settings** button now navigates to `/dashboard/settings`

### Store (`stores/settings-store.ts`)

- Zustand store with `persist` middleware (localStorage key: `mr-ego-settings`)
- Partial persistence: `data` and `activeCategory`
- View state management: `loading → ready | error | empty`
- Individual update actions for each settings category
- `reset` action to reinitialize with defaults

### Data Flow

1. Page mounts → store sets `viewState = "loading"`
2. After 400ms timeout → store loads `defaultSettingsData` → `viewState = "ready"`
3. User interacts with setting → update action dispatched → store updates subset of data
4. No backend, no API, no authentication — pure local state

---

## Components

### Base Components (`components/settings/`)

| Component | File | Description |
|---|---|---|
| **SettingsLayout** | `settings-layout.tsx` | Orchestrates sidebar + content area with view state routing |
| **SettingsSidebar** | `settings-sidebar.tsx` | Vertical tab navigation with 10 categories, cyan active state |
| **SettingsCard** | `settings-card.tsx` | Collapsible card wrapper with title/description/action slot |
| **SettingsSection** | `settings-section.tsx` | Section wrapper with heading for grouping cards |
| **ToggleSetting** | `toggle-setting.tsx` | Labeled switch toggle with description |
| **SelectSetting** | `select-setting.tsx` | Labeled dropdown select with description |
| **SliderSetting** | `slider-setting.tsx` | Custom range slider with label, description, cyan track |

### Category Cards

| Card | File | Description |
|---|---|---|
| GeneralSettingsCard | `general-settings.tsx` | Language, timezone, date format, sidebar behavior |
| AppearanceCard | `appearance-card.tsx` | Dark/Light/System mode, compact mode, UI density |
| NotificationCard | `notification-card.tsx` | Email, push, in-app, job alerts, AI recs, weekly summary |
| PrivacyCard | `privacy-card.tsx` | Profile visibility, recruiter visibility, analytics sharing, data export |
| AIPreferenceCard | `ai-preference-card.tsx` | Provider, model, creativity, response length, suggestions |
| CareerPreferenceCard | `career-preference-card.tsx` | Roles (add/remove chips), salary range, work type, industries |
| SecurityCard | `security-card.tsx` | Password, sessions, devices, MFA toggle, login history |
| IntegrationCard | `integration-card.tsx` | LinkedIn, GitHub, Google, Calendar, Drive toggles |
| StorageCard | `storage-card.tsx` | Visual storage bars for documents, profile, uploads |
| DangerZoneCard | `danger-zone-card.tsx` | Reset data, clear cache, logout placeholder |

### State Components

| Component | File | Description |
|---|---|---|
| SettingsLoadingState | `settings-loading-state.tsx` | Centered spinner with cyan accent |
| SettingsErrorState | `settings-error-state.tsx` | Error icon + retry button |
| SettingsEmptyState | `settings-empty-state.tsx` | Empty state with initialize action |

---

## Navigation Integration

### Sidebar

**`config/navigation.ts`** — Added to Management group:

```
Management
├── Profile      → /dashboard/profile
├── Settings     → /dashboard/settings   ← NEW
├── Documents    → /dashboard/documents
└── Admin        → /admin
```

### User Menu

**`components/shell/user-menu.tsx`** — Settings menu item now navigates to `/dashboard/settings`.

### Breadcrumbs

Settings page renders breadcrumb: `Dashboard > Settings`.

### Middleware

**`middleware.ts`** — `/dashboard/settings` added to protected paths array.

---

## Responsive Design

| Breakpoint | Layout |
|---|---|
| **Desktop (≥1024px)** | Two-column: sticky sidebar (w-56) + scrollable content area |
| **Tablet (768-1023px)** | Two-column with narrower sidebar |
| **Mobile (<768px)** | Single column: sidebar hidden, only active section shown |

On desktop, clicking a sidebar category scrolls smoothly to the corresponding section. All sections remain visible for at-a-glance browsing.

On mobile, only the active category's content is rendered. The sidebar acts as a tab switcher.

---

## Accessibility

- **Semantic HTML**: `nav`, `section`, `aside`, `header`, `main`, `role="tablist"`, `role="tabpanel"`
- **ARIA attributes**: `aria-selected`, `aria-controls`, `aria-labelledby`, `aria-current="page"`, `aria-label`, `aria-pressed`, `aria-expanded`, `aria-hidden`
- **Focus management**: Visible focus rings (`focus-visible:ring-2`), keyboard-operable controls
- **Reduced motion**: Uses `transition-all duration-fast` tokens from the design system; `scrollIntoView` uses `smooth` behavior
- **Color contrast**: Text uses design system color tokens (`text-primary`, `text-secondary`, `text-tertiary`)
- **Screen reader support**: `sr-only` text for loading states, `role="alert"` for errors, `role="status"` with `aria-live="polite"`

---

## Validation

```
✔ ESLint: No warnings or errors
✔ TypeScript: tsc --noEmit passes with zero errors
✔ Next.js Build: Compiles successfully, generates all 44 static pages
  - /dashboard/settings: 15.9 kB bundle, 160 kB first load
```

---

## Known Limitations

1. **No persistence validation** — Settings store persists to localStorage but there's no migration strategy for schema changes
2. **No backend integration** — All settings are mock/local; no API-driven persistence
3. **Theme mode not wired** — Appearance settings (`mode`, `compactMode`) modify local state but don't trigger actual theme changes; that requires integration with `ThemeProvider`
4. **Light mode disabled** — Light mode option shows "Coming Soon" badge per requirements
5. **Danger zone actions** — Reset/Clear/Logout buttons are visual only; no destructive actions implemented
6. **Data export** — Export button is disabled placeholder
7. **Security placeholders** — Password, sessions, devices, MFA, login history sections are informational/placeholder
8. **No form validation** — Settings are applied immediately without validation
9. **Accessibility scroll** — Smooth scroll to section on category change may not behave well with `prefers-reduced-motion: reduce`
10. **No keyboard shortcuts** — Unlike the main app (⌘K), settings has no keyboard navigation shortcuts

---

## Backend Integration Points

When backend is available, the following integration points are ready:

1. **`stores/settings-store.ts`** — Replace `setTimeout` mock with API fetch in `useEffect`
2. **`data/settings.ts`** — Replace with API response type; schema maps 1:1 to backend model
3. **`update*` actions** — Already structured to accept partial updates; add optimistic updates + error rollback
4. **Storage card** — Replace hardcoded `used/total` values with real quota API data
5. **Integration toggles** — Wire `onCheckedChange` to OAuth flow or API key management
6. **Danger zone** — Implement destructive operations with confirmation dialogs and error handling

---

## Future Improvements

1. Wire appearance settings to actual theme engine (ThemeProvider + next-themes)
2. Add search/filter across settings categories
3. Implement keyboard shortcuts for quick navigation
4. Add settings export/import (JSON backup)
5. Add confirmation dialogs for destructive actions
6. Add form-level validation with error messages
7. Add undo/redo for setting changes
8. Implement progressive enhancement — load critical settings first, background-sync rest
9. Add beta feature flags section
10. Notification preference categories could be dynamically generated from server config

---

## Files Created

```
frontend/
├── app/(dashboard)/dashboard/settings/page.tsx
├── components/settings/
│   ├── index.ts
│   ├── ai-preference-card.tsx
│   ├── appearance-card.tsx
│   ├── career-preference-card.tsx
│   ├── danger-zone-card.tsx
│   ├── general-settings.tsx
│   ├── integration-card.tsx
│   ├── notification-card.tsx
│   ├── privacy-card.tsx
│   ├── security-card.tsx
│   ├── select-setting.tsx
│   ├── settings-card.tsx
│   ├── settings-empty-state.tsx
│   ├── settings-error-state.tsx
│   ├── settings-layout.tsx
│   ├── settings-loading-state.tsx
│   ├── settings-section.tsx
│   ├── settings-sidebar.tsx
│   ├── slider-setting.tsx
│   ├── storage-card.tsx
│   └── toggle-setting.tsx
├── data/settings.ts
├── stores/settings-store.ts
└── types/settings.ts
```

## Files Modified

```
frontend/
├── config/navigation.ts            # Added Settings nav item
├── components/shell/user-menu.tsx  # Wired up Settings button
├── middleware.ts                   # Added /dashboard/settings to protected paths
├── stores/index.ts                # Added useSettingsStore export
└── types/index.ts                 # Added Settings* type exports
```

---

## Design Tokens Used

- `--color-cyan-500` — Primary accent for active states, toggles, sliders
- `--color-surface-1`, `--color-surface-2` — Background layers
- `--color-primary`, `--color-secondary`, `--color-tertiary` — Text hierarchy
- `--color-border`, `--color-hover` — Border states
- `--color-danger` — Danger zone accents
- `--shadow-soft`, `--shadow-hover` — Card shadows
- `--glass-bg`, `--glass-border` — Glass variant on SettingsCard
- `border-radius`, spacing, typography tokens — Consistent with DP13
