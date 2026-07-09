# Page Transitions

**Phase:** DP-8 (Interaction & Motion System)
**Design Authority:** DP-6 ([Navigation-Flow.md](../06-UX-Architecture/Navigation-Flow.md)), DP-7 (All wireframe documents)
**Inherits:** Navigation flow and screen relationships from DP-6

---

## Page Transition Philosophy

Page transitions communicate spatial relationships between screens. The transition direction, speed, and style tell the user where they are navigating and what type of content follows. Every transition is intentional — never default browser navigation.

---

## Global Transition Standard

| Property | Value |
|----------|-------|
| Default transition | Cross-fade with content slide |
| Duration | 300ms |
| Easing | Ease-In-Out |
| Direction | Horizontal (forward/back) |
| Performance | transform + opacity only |
| Reduced motion | Cross-fade only, 50ms |

---

## Page Transition Map

```
Landing ──→ Welcome ──→ Login ──→ Dashboard
                  ↘         ↗
                 Register ←┘
                    │
                    ▼
               Onboarding
                    │
                    ▼
               Dashboard ──→ Jobs ──→ Job Detail ──→ Application
                    │                                        │
                    ├──→ CV                                   │
                    │       │                                 │
                    │       ▼                                 │
                    │   CV Analysis                           │
                    │       │                                 │
                    │       ▼                                 │
                    │   CV Builder                            │
                    │                                         │
                    ├──→ Profile                             │
                    │       │                                 │
                    │       ├──→ Edit Section                 │
                    │       └──→ Settings                     │
                    │                │                        │
                    │                ├──→ Account             │
                    │                ├──→ Notifications       │
                    │                ├──→ Privacy             │
                    │                └──→ Appearance          │
                    │                                         │
                    ├──→ AI Workspace                        │
                    │       │                                 │
                    │       ├──→ Conversation                 │
                    │       ├──→ Analysis                     │
                    │       └──→ Tools                        │
                    │                                         │
                    └──→ Help Center                          │
                                                              │
               Application ←── Job Detail ←── Jobs ←────────┘
```

---

## Transition Specifications

### Landing → Welcome

| Property | Value |
|----------|-------|
| Type | Full page cross-fade |
| Duration | 400ms |
| Easing | Ease-Out |
| Direction | Fade through |
| Back transition | Reverse |
| Notes | Brand moment — slightly slower for impact |

### Welcome → Login

| Property | Value |
|----------|-------|
| Type | Slide left (content) |
| Duration | 300ms |
| Easing | Ease-In-Out |
| Direction | Right → Center (login appears from right) |
| Back transition | Slide right |

### Welcome → Register

| Property | Value |
|----------|-------|
| Type | Slide left (content) |
| Duration | 300ms |
| Easing | Ease-In-Out |
| Direction | Right → Center |
| Back transition | Slide right |

### Login → Dashboard

| Property | Value |
|----------|-------|
| Type | Content reveal + shell appear |
| Duration | 400ms |
| Easing | Ease-Out |
| Direction | Center → Expand (shell grows from center) |
| Back transition | N/A (authenticated) |
| Notes | Shell appears first (sidebar, topbar), then dashboard content staggers in |

### Register → Onboarding

| Property | Value |
|----------|-------|
| Type | Slide left |
| Duration | 300ms |
| Easing | Ease-In-Out |
| Direction | Right → Center |
| Back transition | Slide right |

### Onboarding → Dashboard

| Property | Value |
|----------|-------|
| Type | Content reveal with celebration |
| Duration | 500ms |
| Easing | Ease-Out |
| Direction | Center → Expand |
| Notes | Brief success animation, then dashboard appears |

### Dashboard → Jobs

| Property | Value |
|----------|-------|
| Type | Slide left |
| Duration | 300ms |
| Easing | Ease-In-Out |
| Direction | Center → Left (jobs slides in from right) |
| Back transition | Slide right |

### Jobs → Job Detail

| Property | Value |
|----------|-------|
| Type | Shared element (job card) + slide |
| Duration | 350ms |
| Easing | Ease-In-Out |
| Direction | Card expands to full page |
| Back transition | Card collapses back to list position |
| Shared element | Job card image/layout transitions between views |

### Job Detail → Application

| Property | Value |
|----------|-------|
| Type | Slide up (modal-like) |
| Duration | 300ms |
| Easing | Ease-Out |
| Direction | Bottom → Center |
| Back transition | Slide down |
| Notes | Application form appears as elevated content area |

### Dashboard → CV

| Property | Value |
|----------|-------|
| Type | Slide left |
| Duration | 300ms |
| Easing | Ease-In-Out |
| Direction | Center → Left |
| Back transition | Slide right |

### CV → CV Analysis

| Property | Value |
|----------|-------|
| Type | Slide left |
| Duration | 300ms |
| Easing | Ease-In-Out |
| Direction | Right → Center |
| Back transition | Slide right |

### CV Analysis → CV Builder

| Property | Value |
|----------|-------|
| Type | Slide left |
| Duration | 300ms |
| Easing | Ease-In-Out |
| Direction | Right → Center |
| Back transition | Slide right |

### Dashboard → Profile

| Property | Value |
|----------|-------|
| Type | Slide left |
| Duration | 300ms |
| Easing | Ease-In-Out |
| Direction | Center → Left |
| Back transition | Slide right |

### Profile → Settings

| Property | Value |
|----------|-------|
| Type | Slide left (nested) |
| Duration | 300ms |
| Easing | Ease-In-Out |
| Direction | Right → Center |
| Back transition | Slide right |
| Notes | Settings is nested under Profile in navigation hierarchy |

### Settings → Account/Notifications/Privacy/Appearance

| Property | Value |
|----------|-------|
| Type | Tab content slide (within settings shell) |
| Duration | 200ms |
| Easing | Ease-In-Out |
| Direction | Horizontal matching tab order |
| Notes | Settings shell (sidebar) remains static, only content panel changes |

### Dashboard → AI Workspace

| Property | Value |
|----------|-------|
| Type | Slide left with shell adaptation |
| Duration | 350ms |
| Easing | Ease-In-Out |
| Direction | Center → Left |
| Back transition | Slide right |
| Notes | AI workspace has distinct shell — sidebar adapts |

### AI Workspace → Conversation/Analysis/Tools

| Property | Value |
|----------|-------|
| Type | Content cross-fade |
| Duration | 200ms |
| Easing | Ease-In-Out |
| Notes | Shell remains, only AI content panel transitions |

### Dashboard → Help Center

| Property | Value |
|----------|-------|
| Type | Slide left |
| Duration | 300ms |
| Easing | Ease-In-Out |
| Direction | Center → Left |
| Back transition | Slide right |

### Application → Dashboard (deep return)

| Property | Value |
|----------|-------|
| Type | Slide right (reverse of forward) |
| Duration | 300ms |
| Easing | Ease-In-Out |
| Direction | Center → Right (content exits to right) |
| Notes | Full reverse chain of forward transitions |

---

## Page Transition Rules

1. **Forward navigation slides content left** — New content enters from right
2. **Back navigation slides content right** — Previous content enters from left
3. **Nested pages within a section** use content cross-fade (shell remains)
4. **Authentication transitions** are distinct from in-app transitions
5. **Shared element transitions** apply when a card/item expands to a detail page
6. **Page transitions never stack** — A transition in progress prevents another navigation
7. **Page transition duration is consistent at 300ms** across all navigation
8. **Shell elements (sidebar, topbar) remain static** during page-level transitions
9. **Deep navigation (4+ levels)** uses breadcrumb-visible transitions with same direction rules
10. **All page transitions have reduced-motion alternatives** — instant cross-fade at 50ms

---

## Shell Transition Rules

| Shell Element | During Page Transition |
|---------------|----------------------|
| Sidebar | Static — no animation |
| Top bar | Static — no animation |
| Breadcrumb | Updates after transition completes |
| Command palette | Opens over transition — page content beneath is static |
| AI panel | Static page transition — panel content updates independently |

---

## Loading Between Pages

| Phase | Duration | Visual |
|-------|----------|--------|
| Navigation triggered | 50ms | User action feedback on trigger |
| Page transition start | 300ms | Cross-fade animation |
| Skeleton appear | <100ms | Skeleton appears as page content |
| Critical data loaded | <2s | Data replaces skeleton |
| AI enhancements | 3-10s | AI content streams in progressively |

---

*This Page Transitions document defines all page-to-page motion. Refer to [Navigation-Motion.md](Navigation-Motion.md) for navigation component motion, [Loading-System.md](Loading-System.md) for between-page loading, and [Accessibility-Motion.md](Accessibility-Motion.md) for reduced motion alternatives.*
