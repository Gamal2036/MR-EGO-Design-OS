# Navigation Flow

**Phase:** DP-6 (UX Architecture)
**Design Authority:** DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md) — Rules 7, 10, 16), DP-4 ([Navigation/](../05-Application-Shell/Navigation/))

---

## User Navigation Architecture

```
                         ┌─────────────────────────────────────────────────────────────┐
                         │                     COMMAND PALETTE (Ctrl+K)                 │
                         │         Search any page, action, setting, or entity          │
                         └─────────────────────────────────────────────────────────────┘
                                                   │
                          ┌────────────────────────┼────────────────────────┐
                          │                        │                        │
                          ▼                        ▼                        ▼
              ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
              │   PRIMARY NAV       │  │  SECONDARY NAV      │  │  CONTEXT NAV        │
              │   (Sidebar)         │  │  (Tabs / Sub-nav)   │  │  (Breadcrumbs)      │
              │   Modules & sections│  │  Within a section   │  │  Current location   │
              └─────────────────────┘  └─────────────────────┘  └─────────────────────┘
                          │                        │                        │
                          └────────────────────────┼────────────────────────┘
                                                   │
                                                   ▼
                                    ┌─────────────────────────────┐
                                    │      CONTENT REGION          │
                                    │      (Active page)           │
                                    │                              │
                                    │  ┌───────────────────────┐  │
                                    │  │   IN-PAGE NAV         │  │
                                    │  │   (Tabs, accordions,  │  │
                                    │  │    scroll sections)   │  │
                                    │  └───────────────────────┘  │
                                    └─────────────────────────────┘
```

---

## Authentication Flow

```
                    ┌──────────┐
                    │  LANDING │
                    └────┬─────┘
                         │
                    ┌────▼─────┐         ┌───────────────────┐
                    │  LOGIN   │◄────────│   PASSWORD RESET  │
                    │          │─────────►│                   │
                    └────┬─────┘         └───────────────────┘
                         │
                    ┌────▼─────┐
                    │ REGISTER │
                    └────┬─────┘
                         │
                    ┌────▼─────┐
                    │  VERIFY  │
                    └────┬─────┘
                         │
                    ┌────▼─────┐
                    │ONBOARDING│
                    │ (if new) │
                    └────┬─────┘
                         │
                    ┌────▼─────┐
                    │DASHBOARD │
                    └──────────┘
```

**Key behaviors:**
- Authenticated users skip landing and go directly to Dashboard
- Session expiry redirects to Login with return URL preserved
- Password reset sends email with link (no in-app reset)
- Onboarding only for new registrations (returning users skip)
- Social login bypasses register form but still may require onboarding

---

## Onboarding Flow

```
                    ┌──────────────┐
                    │  GOAL SETUP  │
                    │  (Step 1/4)  │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │  EXPERIENCE  │
                    │  (Step 2/4)  │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │   SKILLS     │
                    │  (Step 3/4)  │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │   INTERESTS  │
                    │  (Step 4/4)  │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │   FINISH     │
                    │ → DASHBOARD  │
                    └──────────────┘
```

**Key behaviors:**
- Each step validates before advancing
- Back navigation preserves entered data
- Progress auto-saved — user can close and resume
- Steps are skippable (marked optional)
- AI pre-fills suggestions based on partial data

---

## Application Flow

```
                    ┌──────────────┐
                    │  JOB SEARCH  │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │  JOB DETAIL  │
                    │  + Match %   │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │   APPLY      │
                    │  (Form)      │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │ APPLICATIONS │
                    │  (Tracking)  │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
         ┌────▼───┐  ┌────▼───┐  ┌────▼───┐
         │WAITING │  │INTERVIEW│  │OFFER   │
         │        │  │        │  │        │
         └────────┘  └────────┘  └───┬────┘
                                     │
                              ┌──────▼──────┐
                              │ ACCEPT/DECLINE│
                              └──────────────┘
```

**Key behaviors:**
- Status updates trigger notifications
- Rejected applications show improvement suggestions
- Interview status opens interview prep section
- Offer status shows comparison tools (if multiple offers)
- User can withdraw application at any status

---

## AI Assistance Flow

```
             ┌─────────────────────────────────────┐
             │     USER INTERACTS WITH CONTENT      │
             └────────────────┬────────────────────┘
                              │
             ┌────────────────▼────────────────────┐
             │     AI DETECTS OPPORTUNITY TO HELP    │
             │  (Suggestion appears contextually)    │
             └────────────────┬────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
         ┌────▼────┐    ┌────▼────┐    ┌────▼────┐
         │ ACCEPT  │    │ DISMISS │    │ EXPLAIN │
         │(Applies)│    │(Hides)  │    │(Shows   │
         │         │    │         │    │reasoning)│
         └─────────┘    └─────────┘    └────┬────┘
                                            │
                                     ┌──────▼──────┐
                                     │ REASONING    │
                                     │ PANEL        │
                                     └─────────────┘
```

**Key behaviors:**
- AI never interrupts active workflows
- Suggestions appear inline, not as popups
- Dismissed suggestions tracked — AI learns preferences
- Explanation reveals confidence, sources, alternatives
- User can disable AI assistance per module
- AI state persists across sessions

---

## Notifications Flow

```
             ┌─────────────────────────────────────┐
             │     TRIGGER EVENT OCCURS              │
             └────────────────┬────────────────────┘
                              │
             ┌────────────────▼────────────────────┐
             │     NOTIFICATION CREATED              │
             │  (Type: info, success, warning, error)│
             └────────────────┬────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
         ┌────▼────┐    ┌────▼────┐    ┌────▼────┐
         │ IN-APP  │    │  PUSH   │    │  DIGEST  │
         │(Toast)  │    │(Device) │    │(Summary) │
         └────┬────┘    └─────────┘    └──────────┘
              │
         ┌────▼────┐
         │ CENTER  │
         │(History)│
         └─────────┘
```

**Key behaviors:**
- User configures notification channels in Settings
- Critical notifications bypass quiet hours
- In-app toasts auto-dismiss after 5 seconds
- Notification center persists 30-day history
- Actionable notifications allow direct response

---

## Profile Flow

```
                    ┌──────────────┐
                    │ PROFILE VIEW │
                    │  (Default)   │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
         ┌────▼───┐  ┌────▼───┐  ┌────▼───┐
         │  EDIT  │  │ EXPERI-│  │ SKILLS │
         │ PROFILE│  │ ENCE   │  │        │
         └────────┘  └────────┘  └────────┘
              │            │            │
         ┌────▼───┐  ┌────▼───┐  ┌────▼───┐
         │ SAVE   │  │ ADD/   │  │ ADD/   │
         │ CANCEL │  │ EDIT   │  │ REMOVE │
         └────────┘  └────────┘  └────────┘
```

**Key behaviors:**
- View mode is the default — edit is an explicit action
- Each section (About, Experience, Skills, Documents) saves independently
- No global edit/save — section-level granularity
- Public/private toggle per data field
- Changes visible immediately after save

---

## Keyboard Navigation Map

| Key | Action | Context |
|-----|--------|---------|
| Tab | Move focus forward | Global |
| Shift + Tab | Move focus backward | Global |
| Enter | Activate focused element | Global |
| Space | Toggle / Activate | Forms, buttons |
| Escape | Close modal / dismiss | Dialogs, panels, dropdowns |
| Arrow keys | Navigate list / options | Selects, menus, tabs |
| Ctrl+K / Cmd+K | Command palette | Global |
| Ctrl+1–6 | Navigate primary sections | Global |
| Ctrl+, | Open settings | Global |
| Ctrl+I | Toggle AI panel | Global |
| Ctrl+F | Find in page | Documents, lists |
| Ctrl+S | Save current form | Forms |
| / | Quick search | Global |
| ? | Show keyboard shortcuts | Global |
| Alt+Left | Back navigation | Global |
| Alt+Right | Forward navigation | Global |

---

*This Navigation Flow defines how users move through MR:EGO. Every journey has clear entry and exit points. AI assistance is embedded contextually and never interrupts. Refer to [Information-Architecture.md](Information-Architecture.md) for page relationships and [Screen-Inventory.md](Screen-Inventory.md) for screen specifications.*
