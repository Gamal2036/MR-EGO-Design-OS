# Settings — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Screen:** Settings — Section Navigation, Preferences, Danger Zone
**Version:** 1.0
**Status:** COMPLETE
**Design Authority:** DP-0 through DP-8
**Inherits:** Constitution, Design Language, Design System, Component Library, Application Shell, Visual Foundation, UX Architecture, High-Fidelity Wireframes, Interaction & Motion

---

## 1. Layout Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        TOPBAR (56px)                             │
│  Glass layer (0.85 opacity, 12px blur)                          │
│  [Logo 24px] [Search] [Breadcrumb] [Icons] [Avatar 32px]        │
├──────────┬──────────────────┬────────────────────────────────────┤
│          │                  │                                    │
│ SIDEBAR  │  SETTINGS NAV    │      CONTENT AREA (scrollable)     │
│ (240px)  │  (240px)         │      (720px max-width)             │
│          │  ┌──────────────┐│                                    │
│ Surface-2│  │ Account      ││  ┌─ SECTION ────────────────────┐ │
│          │  │ ☑ Active     ││  │ Heading-3 "Section Title"    │ │
│ Nav items│  ├──────────────┤│  │ Body-Small description       │ │
│ (14px    │  │ Notifications││  │                              │ │
│  400/    │  │ Privacy      ││  │ ┌─ Setting Row ────────────┐ │ │
│  600)    │  │ Appearance   ││  │ │ Label Body/600    [tog]  │ │ │
│          │  │ AI Prefs     ││  │ │ Description Body-Small   │ │ │
│ Active   │  │ Security     ││  │ └──────────────────────────┘ │ │
│ indicator│  │ Data/Storage ││  │                              │ │
│ ───────  │  │ Danger Zone  ││  │ ┌─ Setting Row ────────────┐ │ │
│          │  └──────────────┘│  │ │ Label Body/600    [sel]  │ │ │
│          │                  │  │ │ Description Body-Small   │ │ │
│          │  Items: 40px     │  │ └──────────────────────────┘ │ │
│          │  height, p-3/5   │  └──────────────────────────────┘ │
│          │                  │                                    │
│          │  Active:        │                                    │
│          │  Primary-50 bg  │                                    │
│          │  Primary-600 txt│                                    │
│          │  Primary left   │                                    │
│          │  border 3px     │                                    │
│          │                  │                                    │
├──────────┴──────────────────┴────────────────────────────────────┤
│                       FOOTER (optional)                          │
└──────────────────────────────────────────────────────────────────┘
```

### 1.1 Layout Tokens

| Element | Token | Value |
|---------|-------|-------|
| Sidebar width | — | 240px |
| Sidebar background | Surface-2 | Neutral-100 |
| Settings nav width | — | 240px |
| Settings nav background | Surface-1 | #FFFFFF |
| Settings nav border-right | Border-Default | Neutral-300 |
| Content area max-width | — | 720px |
| Content padding | Space-7 | 24px |
| Topbar height | — | 56px |
| Topbar background | Glass-Navigation | rgba(255,255,255,0.72), blur 12px |
| Topbar border-bottom | Border-Default | Neutral-300 |
| Content gap vertical | Space-10 | 48px between sections |

### 1.2 Elevation Map

| Layer | Element | Shadow Token |
|-------|---------|-------------|
| 0 | Page background | Shadow-0 |
| 0 | Sidebar | Shadow-0 |
| 0 | Settings nav | Shadow-0 (border-right only) |
| 1 | Topbar (glass) | Shadow-1 |
| 1 | Content cards | Shadow-1 |
| 2 | Hovered nav items | Shadow-0 (bg shift only) |
| 3 | Modals (confirmation) | Shadow-3 |
| 5 | Overlays | Shadow-5 |

---

## 2. Section Walkthrough

### 2.1 Settings Navigation

```
┌──────────────────────────────────────────────────────────────────┐
│  Surface-1, width 240px, border-right Border-Default             │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  [Active] Account                                          │  │
│  │  Primary-50 bg, Primary-600 text                           │  │
│  │  Primary-500 left border 3px                               │  │
│  │  40px height, padding Space-3(8px) v / Space-5(16px) h    │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │  Notifications                                             │  │
│  │  Surface-1 bg, Text-Body                                   │  │
│  │  40px height, padding Space-3(8px) v / Space-5(16px) h    │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │  Privacy                                                   │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │  Appearance                                                │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │  AI Preferences                                            │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │  Security                                                  │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │  Data & Storage                                            │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │  Danger Zone                                               │  │
│  │  Text-Danger                                                │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

**Element Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Nav background | Surface-1 | #FFFFFF |
| Nav width | — | 240px |
| Nav border-right | Border-Default | 1px Neutral-300 |
| Nav item height | — | 40px |
| Nav item padding | Space-3 Space-5 | 8px vertical, 16px horizontal |
| Nav item text | Body | 15px, weight 400, line-height 1.6 |
| Nav item default bg | Surface-1 | #FFFFFF |
| Nav item hover bg | Surface-2 | Neutral-100 |
| Nav item active bg | Primary-50 | #EFF6FF |
| Nav item active text | Primary-600 | #2563EB |
| Nav item active border-left | Primary-500 | 3px solid #3B82F6 |
| Danger Zone text | Danger-500 | #EF4444 |
| Danger Zone active bg | Danger-50 | #FEF2F2 |

**Purpose:** Section navigation for settings. **Priority:** High — primary navigation. **Weight:** Moderate — consistent list, active item draws attention via color.

**States:**

| State | Behavior |
|-------|----------|
| Default (inactive) | Surface-1 bg, Text-Body color |
| Hover | Surface-2 bg, smooth transition 100ms |
| Active | Primary-50 bg, Primary-600 text, Primary-500 left border |
| Focus | 2px Primary-500 ring (inset) |
| Danger Zone default | Surface-1 bg, Danger-500 text |
| Danger Zone hover | Danger-50 bg |
| Danger Zone active | Danger-50 bg, Danger-600 text, Danger-500 left border |

### 2.2 Content Area — Setting Groups

```
┌──────────────────────────────────────────────────────────────────┐
│  padding: Space-7, max-width: 720px                             │
│                                                                  │
│  Heading-3 (22px/600) "Account"                                 │
│  Body-Small: "Manage your account settings and preferences"     │
│                                                                  │
│  ┌─ SETTING GROUP ──────────────────────────────────────────┐  │
│  │  ┌─ Setting Row ──────────────────────────────────────┐  │  │
│  │  │  Email Address                          alex@ex... │  │  │
│  │  │  Body/600 (15px/600)                     Body-Small │  │  │
│  │  │  Body-Small: "Used for login and notifications"    │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │  ── border-bottom Border-Default ──                     │  │
│  │  ┌─ Setting Row ──────────────────────────────────────┐  │  │
│  │  │  Display Name                           Alex Chen  │  │  │
│  │  │  Body-Small: "How your name appears"       [Edit]  │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │  ── border-bottom Border-Default ──                     │  │
│  │  ┌─ Setting Row ──────────────────────────────────────┐  │  │
│  │  │  Timezone                              PT (UTC-8) │  │  │
│  │  │  Body-Small: "Schedule and deadlines"   [Select]  │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─ SETTING GROUP ──────────────────────────────────────────┐  │
│  │  Heading-4: "Password & Security"                        │  │
│  │  ┌─ Setting Row ──────────────────────────────────────┐  │  │
│  │  │  Current Password                        [Change]  │  │  │
│  │  │  Body-Small: "Last changed 3 months ago"           │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │  ┌─ Setting Row ──────────────────────────────────────┐  │  │
│  │  │  Two-Factor Auth                             [On]  │  │  │
│  │  │  Body-Small: "Add an extra layer of security"  [tog]│  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

**Element Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Section heading | Heading-3 | 22px, weight 600, line-height 1.25, Text-Primary |
| Section description | Body-Small | 14px, weight 400, line-height 1.5, Text-Secondary |
| Section margin-bottom | Space-7 | 24px |
| Group heading | Heading-4 | 18px, weight 600, line-height 1.3, Text-Primary |
| Group padding | Space-5 | 16px top |
| Setting row padding | Space-5 | 16px vertical |
| Setting row layout | — | Flex, space-between, align-items center |
| Setting label | Body | 15px, weight 600, line-height 1.6, Text-Primary |
| Setting value | Body-Small | 14px, weight 400, Text-Body |
| Setting description | Body-Small | 14px, weight 400, Text-Secondary |
| Row border-bottom | Border-Default | 1px Neutral-300 |
| Edit button | Ghost | 14px, 32px height, Primary-600 |
| Select control | — | 32px height, radius-sm, border Neutral-300 |

**Toggle Switch Specs:**

| Property | Token | Value |
|----------|-------|-------|
| Toggle width | — | 44px |
| Toggle height | — | 24px |
| Toggle radius | — | 12px (pill) |
| Toggle track OFF | Neutral-300 | #D1D5DB |
| Toggle track ON | Primary-500 | #3B82F6 |
| Toggle knob | — | 20px × 20px circle, white, shadow |
| Toggle knob ON offset | — | 20px right |
| Transition | — | 150ms ease-out, knob + track |

**States:**

| State | Behavior |
|-------|----------|
| Default | Row with label + value/control |
| Hover (row) | Surface-1 → subtle Surface-2 bg, 100ms |
| Edit mode | Inline input replaces display value. Save/Cancel appear. |
| Toggle OFF | Track Neutral-300, knob left |
| Toggle ON | Track Primary-500, knob right |
| Toggle hover | Track opacity 80% when OFF, Primary-400 when ON |
| Toggle focus | 2px Primary-500 ring on knob |
| Saving | Control disabled, spinner overlay |
| Saved | Brief "Saved" check icon (Success-500, 14px) |

### 2.3 Appearance Section — Theme Cards

```
┌──────────────────────────────────────────────────────────────────┐
│  Heading-3 "Appearance"                                          │
│  Body-Small: "Customize how MR:EGO looks and feels"             │
│                                                                  │
│  ┌─ SETTING GROUP ──────────────────────────────────────────┐  │
│  │  Heading-4 "Theme"                                        │  │
│  │                                                           │  │
│  │  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐ │  │
│  │  │  ☑ Light       │  │  ○ Dark        │  │  ○ System    │ │  │
│  │  │  ┌──────────┐  │  │  ┌──────────┐  │  │  ┌──────────┐│ │  │
│  │  │  │ ▓▓▓▓▓▓▓ │  │  │  │ ▓▓▓▓▓▓▓ │  │  │  │ ▓▓▓▓▓▓▓ ││ │  │
│  │  │  │ ▓▓▓▓▓▓▓ │  │  │  │ ▓▓▓▓▓▓▓ │  │  │  │ ▓▓▓▓▓▓▓ ││ │  │
│  │  │  └──────────┘  │  │  └──────────┘  │  │  └──────────┘│ │  │
│  │  │  Preview 100x80 │  │  Preview 100x80│  │  Preview 100│ │  │
│  │  │  Primary border │  │  Neutral border│  │  Neutral bdr│ │  │
│  │  └────────────────┘  └────────────────┘  └──────────────┘ │  │
│  │  Radio cards: 100px × 80px, radius-md, gap Space-5        │  │
│  │  Selected: Primary-500 border 2px                          │  │
│  │  Default: Border-Default 1px                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─ SETTING GROUP ──────────────────────────────────────────┐  │
│  │  Heading-4 "Density"                                      │  │
│  │                                                           │  │
│  │  ○ Comfortable  ☑ Compact  ○ Dense                       │  │
│  │  Radio group: Body (15px), 32px height, gap Space-5      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─ SETTING GROUP ──────────────────────────────────────────┐  │
│  │  Heading-4 "Font Size"                                    │  │
│  │                                                           │  │
│  │  A─ ────●──── ─A+                                        │  │
│  │  [==========|======] Slider 14px-18px                    │  │
│  │  Caption: "Current: 15px" (Body default)                 │  │
│  │  240px width slider, Primary-500 fill, round knob 20px   │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

**Theme Card Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Card size | — | 100px × 80px |
| Card radius | Radius-Md | 8px |
| Card border selected | Primary-500 | 2px solid #3B82F6 |
| Card border default | Border-Default | 1px Neutral-300 |
| Card shadow selected | Shadow-1 | Layer 1 |
| Preview content bg | — | Simplified: 4 lines (header + body) |
| Card gap | Space-5 | 16px |
| Radio indicator | — | 16px circle, Primary-500 fill when selected |
| Card cursor | — | Pointer |
| Transition | — | Border-color 150ms ease-out |

### 2.4 AI Preferences Section

```
┌──────────────────────────────────────────────────────────────────┐
│  Heading-3 "AI Preferences"                                      │
│  Body-Small: "Control how AI assists you across MR:EGO"         │
│                                                                  │
│  ┌─ SETTING GROUP ──────────────────────────────────────────┐  │
│  │  ┌─ Setting Row ──────────────────────────────────────┐  │  │
│  │  │  AI Assistant                       [On] ••••••   │  │  │
│  │  │  Body-Small: "Enable AI features across the app" │  │  │
│  │  │  Primary-500 toggle when ON                         │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │  ┌─ Setting Row ──────────────────────────────────────┐  │  │
│  │  │  Inline Suggestions                    [On] ••••   │  │  │
│  │  │  Body-Small: "Show AI suggestions in CV builder,  │  │  │
│  │  │  job search, and other tools"                      │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │  ┌─ Setting Row ──────────────────────────────────────┐  │  │
│  │  │  Smart Notifications                  [On] ••••   │  │  │
│  │  │  Body-Small: "AI prioritizes your notifications   │  │  │
│  │  │  based on urgency and relevance"                   │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │  ┌─ Setting Row ──────────────────────────────────────┐  │  │
│  │  │  Memory                          [On] •••••••••   │  │  │
│  │  │  Body-Small: "AI remembers your preferences and   │  │  │
│  │  │  context across sessions"                          │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │  ┌─ Setting Row ──────────────────────────────────────┐  │  │
│  │  │  Data for Training                     [Off] •••  │  │  │
│  │  │  Body-Small: "Allow anonymized data to improve    │  │  │
│  │  │  AI models. Privacy-first, no personal data."      │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─ SETTING GROUP ──────────────────────────────────────────┐  │
│  │  Heading-4 "AI Confidence Threshold"                      │  │
│  │  Body-Small: "Minimum confidence level for AI to show    │  │
│  │  proactive suggestions. Higher = fewer, more relevant."   │  │
│  │                                                           │  │
│  │  40% ──●────────────────────── 90%                       │  │
│  │  [=========|=============]  Current: 65%                  │  │
│  │                                                           │  │
│  │  Slider: 320px width, Primary-500 fill                   │  │
│  │  Range: 40-90%, step 5%                                  │  │
│  │  Labels below: "Conservative" ← 65% → "Aggressive"      │  │
│  │  Tooltip on hover shows current value                    │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

**Element Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Setting row | — | Flex space-between, align-center, padding Space-5 vertical |
| Label | Body | 15px, weight 600, Text-Primary |
| Description | Body-Small | 14px, weight 400, Text-Secondary |
| Toggle | — | 44px × 24px, radius-12px |
| Slider width | — | 320px |
| Slider height | — | 6px |
| Slider radius | — | 3px (pill) |
| Slider track | Neutral-200 | #E2E8F0 |
| Slider fill | Primary-500 | #3B82F6 |
| Slider knob | — | 20px × 20px circle, white, Shadow-2 |
| Slider labels | Caption | 13px, weight 400, Text-Secondary |

**States:**

| State | Behavior |
|-------|----------|
| Default | Toggles show current ON/OFF state. Slider shows 65% default. |
| Toggle hover | Track opacity shift 90% |
| Slider drag | Knob scale 1.15, Primary-500 ring |
| Slider change | Value label updates live |
| AI Assistant OFF | All subordinate toggles disabled + "Enable AI Assistant to configure" Caption below |

### 2.5 Danger Zone

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  DANGER ZONE                                                │  │
│  │  border: 1px Danger-500, bg: Danger-50                     │  │
│  │  radius-md, padding Space-7                                │  │
│  │                                                             │  │
│  │  Heading-4 "Danger Zone" (Danger-600)                      │  │
│  │  Body-Small: "Irreversible actions. Proceed with caution." │  │
│  │                                                             │  │
│  │  ┌─ Action Row ──────────────────────────────────────────┐ │  │
│  │  │  Delete Account                    [Delete Account]   │ │  │
│  │  │  Body-Small: "Permanently delete your account and     │ │  │
│  │  │  all associated data. This cannot be undone."          │ │  │
│  │  │                                        Button-Danger   │ │  │
│  │  │                                        14px, 36px h   │ │  │
│  │  │                                        Danger-600 bg   │ │  │
│  │  │                                        white text      │ │  │
│  │  └────────────────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  DELETE CONFIRMATION MODAL:                                      │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │  MODAL (Elevation-3, Shadow-3, 480px max-width)     │  │  │
│  │  │                                                      │  │  │
│  │  │  ⚠ (Warning icon 24px, Danger-500)                  │  │  │
│  │  │  Heading-3: "Delete Account?"                        │  │  │
│  │  │  Body: "This will permanently delete your account    │  │  │
│  │  │  and all CVs, documents, messages, and settings."    │  │  │
│  │  │                                                      │  │  │
│  │  │  "Type DELETE to confirm"                            │  │  │
│  │  │  ┌──────────────────────────────────────┐           │  │  │
│  │  │  │  [________________________]          │           │  │  │
│  │  │  └──────────────────────────────────────┘           │  │  │
│  │  │  Input: 100% width, 40px height                     │  │  │
│  │  │                                                      │  │  │
│  │  │  "Enter your password to continue"                  │  │  │
│  │  │  ┌──────────────────────────────────────┐           │  │  │
│  │  │  │  [________________________]          │           │  │  │
│  │  │  └──────────────────────────────────────┘           │  │  │
│  │  │  Input: password type, 100% width, 40px height      │  │  │
│  │  │                                                      │  │  │
│  │  │  [Cancel]  [Delete Account] (disabled until both    │  │  │
│  │  │              fields completed)                      │  │  │
│  │  │                                                      │  │  │
│  │  │  Button-Danger (Danger-600 bg) enabled only when    │  │  │
│  │  │  "DELETE" typed + password provided                  │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

**Danger Zone Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Section border | Danger-500 | 1px solid #EF4444 |
| Section background | Danger-50 | #FEF2F2 |
| Section radius | Radius-Md | 8px |
| Section padding | Space-7 | 24px |
| Heading | Heading-4 | 18px, weight 600, Danger-600 |
| Description | Body-Small | 14px, weight 400, Text-Secondary |
| Button | Button-Danger | 14px, 36px height, radius-md, Danger-600 bg, white text |
| Button hover | — | Danger-700 bg |
| Modal max-width | — | 480px |
| Modal bg | Surface-1 | #FFFFFF |
| Modal radius | Radius-Lg | 12px |
| Modal shadow | Shadow-3 | Layer 3 |
| Modal padding | Space-7 | 24px |
| Confirmation input | — | 40px height, radius-md, Center text |

**States:**

| State | Behavior |
|-------|----------|
| Default | Danger Zone card with warning styling, delete button visible |
| Hover (delete btn) | Danger-700 bg |
| Modal open | Backdrop 60% black, modal centered, body scroll locked |
| Modal — input empty | Delete button disabled, 40% opacity |
| Modal — DELETE typed | First checkmark. Password field enabled. |
| Modal — both valid | Delete button enabled, Danger-600 bg |
| Modal — wrong password | Inline error: "Incorrect password" in Danger-500, Body-Small |
| Modal — submitting | Delete button shows spinner. Both inputs disabled. |
| Success | Account deleted, redirect to landing page with fade-out 500ms |

---

## 3. Empty State (No Settings Loaded)

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                                                             │  │
│  │           ⚙️ (Gear icon, 80px, Neutral-200, 60% opacity)   │  │
│  │                                                             │  │
│  │  Heading-2: "Settings unavailable"                          │  │
│  │  Body: "We couldn't load your settings. This may be a       │  │
│  │  connection issue or your session may have expired."        │  │
│  │                                                             │  │
│  │  [Reload] [Sign Out]                                        │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 4. Loading State

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  SETTINGS NAV SKELETON:                                     │  │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (160px × 16px) — 8 items, 40px spacing    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  CONTENT SKELETON:                                          │  │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (200px × 22px) — heading               │  │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (160px × 14px) — description             │  │
│  │                                                             │  │
│  │  ── 3 setting row skeletons:                               │  │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (180px)     ▓▓▓▓ (40px)           │  │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (200px)                      │  │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (180px)     ▓▓▓▓ (40px)           │  │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (200px)                      │  │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (180px)     ▓▓▓▓ (40px)           │  │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (200px)                      │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Skeleton spec: Surface-2 bg, radius-sm, pulse 1500ms            │
│  Sequence: Nav (0ms) → Heading (100ms) → Rows (150ms stagger)   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. Error State

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  SECTION ERROR (per-setting-group granularity):             │  │
│  │                                                             │  │
│  │  ⚠ "Unable to load notification settings"                  │  │
│  │  [Retry]                                                    │  │
│  │  Warning-50 bg, Warning-500 left border 3px, radius-sm     │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  SAVE ERROR (inline per setting):                           │  │
│  │                                                             │  │
│  │  ⚠ "Failed to save. Please try again." [Retry]             │  │
│  │  Body-Small, Danger-500 text, below the setting row         │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  NAV ERROR:                                                  │  │
│  │  Nav items remain visible (static). Content section shows   │  │
│  │  error state instead of loading content.                    │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 6. Offline State

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  OFFLINE BANNER (below topbar):                             │  │
│  │  📡 "You're offline. Settings changes won't be saved."     │  │
│  │  Surface-2 bg, Warning-500 left border 3px                 │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Behavior:                                                       │
│  - All settings display current values (cached if dirty)         │
│  - All toggles/inputs/sliders disabled with tooltip: "Available  │
│    when online"                                                  │
│  - Danger Zone button disabled                                   │
│  - AI Preferences section shows "AI features unavailable offline"│
│  - Settings nav fully navigable (static)                         │
│  - Offline indicator in topbar (icon only, 20px)                │
└──────────────────────────────────────────────────────────────────┘
```

---

## 7. Visual Hierarchy

```
Priority 1 (Highest) ─────────────────────────────────────► Settings Nav
                           (active item highlighted — primary interaction)

Priority 2 ──────────────────────────────────────────────► Section Headings
                           (Heading-3 + group Heading-4 create clear structure)

Priority 3 ──────────────────────────────────────────────► Setting Rows
                           (label + description + control — content)

Priority 4 ──────────────────────────────────────────────► Danger Zone
                           (red border draws attention to destructive actions)

Priority 5 ──────────────────────────────────────────────► Topbar + Sidebar
                           (navigation infrastructure)
```

**Hierarchy mechanisms:**
- Active nav item uses Primary-50 + Primary-600 + 3px left border — strongest visual indicator in nav
- Section headings (Heading-3) create clear content breaks
- Setting labels use Body/600 (bold weight) for scannability
- Toggle controls are the primary interactive element — sized for easy targeting
- Danger Zone uses red border + red background (Danger-50) — highest urgency visual weight

---

## 8. Motion Specifications

| Element | Trigger | Animation | Duration | Easing | Delay |
|---------|---------|-----------|----------|--------|-------|
| Settings nav | Page load | Fade in + slide right 4px | 300ms | Ease-Out | 0ms |
| Nav items | Page load | Staggered fade in | 200ms | Ease-Out | 50ms (30ms stagger) |
| Content heading | Page load | Slide down 4px + fade | 300ms | Ease-Out | 100ms |
| Setting rows | Page load | Staggered slide up 4px + fade | 300ms | Ease-Out | 150ms (40ms stagger) |
| Section switch | Nav click | Cross-fade content (opacity 1→0→1) | 200ms | Ease-Out | 0ms |
| Toggle switch | Click | Knob slide 20px, track color shift | 150ms | Ease-Out | 0ms |
| Toggle hover | Mouse enter | Track opacity shift | 100ms | Ease-Out | 0ms |
| Slider drag | Mouse down | Knob scale 1 → 1.15 | 100ms | Ease-Spring | 0ms |
| Slider release | Mouse up | Knob scale 1.15 → 1 | 100ms | Ease-Spring | 0ms |
| Nav item hover | Mouse enter | Background shift Surface-1 → Surface-2 | 100ms | Ease-Out | 0ms |
| Nav item active | Click | Left border slide in (0 → 3px) | 150ms | Ease-Out | 0ms |
| Save success | Save click | Check icon pulse | 200ms | Ease-Spring | 0ms |
| Save error | Save fail | Shake input (3px, 3 cycles) | 300ms | Ease-In-Out | 0ms |
| Modal open | Trigger | Backdrop fade in (0 → 60%, 200ms), modal scale 0.95 → 1 + fade | 300ms | Ease-Out | 0ms |
| Modal close | Cancel | Scale 1 → 0.95 + fade, backdrop fade out | 200ms | Ease-In | 0ms |
| Danger button hover | Mouse enter | Danger-600 → Danger-700 | 100ms | Ease-Out | 0ms |
| Offline banner | Connection lost | Slide down from top | 300ms | Ease-Out | 100ms |
| Offline banner dismiss | Reconnect | Slide up + fade | 300ms | Ease-In | 0ms |
| Theme card select | Click | Border color shift Neutral → Primary-500 | 150ms | Ease-Out | 0ms |

**Stagger table (page load):**

| Element | Delay |
|---------|-------|
| Settings nav | 0ms |
| Nav item 1 | 50ms |
| Nav item 2 | 80ms |
| Nav item 3 | 110ms |
| Nav item 4 | 140ms |
| Nav item 5 | 170ms |
| Nav item 6 | 200ms |
| Nav item 7 | 230ms |
| Nav item 8 | 260ms |
| Content heading | 100ms |
| Setting row 1 | 150ms |
| Setting row 2 | 190ms |
| Setting row 3 | 230ms |
| Setting row 4 | 270ms |
| Setting row 5 | 310ms |

---

## 9. Accessibility

| Requirement | Implementation |
|-------------|---------------|
| Settings nav landmark | `role="navigation"` with `aria-label="Settings"` |
| Nav items | `role="link"` or `role="tab"` pattern, `aria-current="page"` on active |
| Content regions | `role="region"` per setting group, `aria-labelledby` pointing to heading |
| Toggle switches | `role="switch"`, `aria-checked="true/false"`, `aria-label` describing the setting |
| Sliders | `role="slider"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label` |
| Theme cards | `role="radio"` with `aria-checked`, grouped in `role="radiogroup"` |
| Danger Zone | `role="region"` with `aria-label="Danger zone: irreversible actions"` |
| Delete account button | `aria-label="Delete account — irreversible action"` |
| Modal | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to modal heading |
| Modal backdrop | `aria-hidden="true"` on background content when modal open |
| Focus trap | Focus trapped within modal when open. Tab cycles through modal elements. |
| Escape | Closes modal |
| Save confirmations | `aria-live="polite"` for "Saved" messages |
| Error messages | `role="alert"`, `aria-live="assertive"` |
| Offline banner | `role="status"`, `aria-live="polite"` |
| Reduced motion | All animations reduced to 50ms or disabled |
| Focus indicator | 2px Primary-500 ring, 2px offset |
| Skip link | "Skip to content" as first focusable element |

---

## 10. Keyboard Navigation

| Key | Context | Action |
|-----|---------|--------|
| Tab | Settings nav | Navigate through nav items |
| Enter/Space | Nav item | Select section, load content |
| Arrow Up/Down | Settings nav | Move between nav items (when focus in nav) |
| Tab | Content | Navigate through setting rows → controls → next section |
| Enter/Space | Toggle | Toggle on/off |
| Arrow Left/Right | Slider | Decrease/increase slider value by step |
| Enter | Edit button | Enter inline edit mode |
| Escape | Edit mode | Cancel edit, return to display |
| Tab | Modal | Cycle through: Cancel → Input 1 → Input 2 → Delete button |
| Enter | Modal Delete button | Submit deletion (when enabled) |
| Escape | Modal | Close modal (cancel) |
| / | Global | Focus global search |
| ? | Any | Show keyboard shortcuts modal |

**Focus Order:**
1. Topbar (Skip link → Logo → Search → Icons → Avatar)
2. Sidebar (Nav items top-to-bottom)
3. Settings Nav (Account → Notifications → Privacy → Appearance → AI Prefs → Security → Data & Storage → Danger Zone)
4. Content (Section heading → Setting rows top-to-bottom, left-to-right per row)
5. Danger Zone (Card → Button)

---

## 11. Responsive Behavior

### Mobile (<768px) — Single Column

| Element | Adaptation |
|---------|-----------|
| Sidebar | Hidden. Replaced by bottom tab bar (5 items) |
| Settings nav | Becomes dropdown select at top of content (full width, 44px height). Selected value displayed. |
| Content | Full width, padding Space-5, max-width 100% |
| Theme cards | Single row, horizontal scroll (snap) |
| Toggle rows | Stacked (label above, control right-aligned) |
| Danger Zone | Full width card |
| Modal | Full screen (padding Space-5, no max-width) |

### Tablet (768px–1023px) — Condensed Two-Panel

| Element | Adaptation |
|---------|-----------|
| Sidebar | Icon rail (64px collapsed) |
| Settings nav | 200px (slimmer), items same height |
| Content | 1fr, max-width 600px |
| Theme cards | 3 cards in row, slightly smaller (90px × 72px) |
| Toggle rows | Standard layout |

### Desktop (1024px+) — Full Layout

Full layout as specified above.

### Responsive Breakpoint Reference

| Property | Mobile | Tablet | Desktop | Ultra-Wide |
|----------|--------|--------|---------|------------|
| Sidebar | Bottom tabs | Icon rail (64px) | Full (240px) | Full (240px) |
| Settings nav | Dropdown | 200px | 240px | 240px |
| Content max-width | 100% | 600px | 720px | 800px |
| Page padding | Space-5 | Space-7 | Space-7 | Space-10 |
| Theme card size | 90px × 72px | 90px × 72px | 100px × 80px | 110px × 88px |
| Modal width | Full screen | 90% | 480px | 480px |
| Typography scale | Mobile | Mobile | Desktop | Desktop |

---

## 12. AI Integration Features

| Feature | Behavior |
|---------|----------|
| AI Assistant master toggle | Global on/off for all AI features. When OFF, subordinate settings disabled with helper text. |
| Inline Suggestions toggle | Controls AI suggestions in CV Builder, Job Search, Profile editing. |
| Smart Notifications toggle | AI prioritizes notification order based on urgency/relevance analysis. |
| Memory toggle | When ON, AI remembers user preferences, recent activity, and context across sessions. Shows memory size below: "Memory: 2.4MB used". |
| Data for Training toggle | Privacy control for anonymized training data. Shows "Your data is anonymized and aggregated" helper text when toggled ON. |
| Confidence Threshold slider | Controls how confident AI must be before showing proactive suggestions. Range 40-90%, step 5%. Below 60%: "More suggestions, less precision". Above 75%: "Fewer suggestions, higher relevance". |
| AI setup wizard | On first visit to AI Preferences: "Run AI Setup" button that starts 3-step wizard (preferences → data permissions → test). |

---

## 13. Future Expansion Items

| Item | Priority | Notes |
|------|----------|-------|
| API access settings | Medium | Personal API key generation, rate limits, usage stats |
| Team/Org settings | High | For enterprise: SSO, team roles, shared resources |
| Notification schedule | Medium | Quiet hours, daily digest, per-channel schedules |
| Accessibility settings | Medium | Font, contrast, motion, screen reader optimizations |
| Import/Export data | High | Full data export (JSON/CSV), import from other platforms |
| Connected accounts | Medium | LinkedIn, Google, GitHub, Indeed integrations |
| Billing & subscription | High | Plan management, invoice history, payment methods |
| Keyboard shortcut config | Low | Custom keybindings for all actions |
| Theme builder | Future | Custom color palettes, saved themes |
| Session management | Medium | View active sessions, remote logout |
| Audit log | Medium | View recent account changes and login history |
| Email preferences | Medium | Per-category email toggle (digest, weekly, transactional) |
| Beta features | Low | Opt-in to experimental features with feedback prompts |
| Data retention policy | Medium | Auto-delete old data after X months |
| Language & region | Low | Interface language, date/number formatting |

---

## 14. Token Reference Summary

### Color Tokens Used

| Token | Value (Light) | Elements |
|-------|---------------|----------|
| Surface-0 | Neutral-50 | Page area |
| Surface-1 | #FFFFFF | Settings nav, content area cards |
| Surface-2 | Neutral-100 | Sidebar, hover states |
| Primary-50 | #EFF6FF | Active nav item, AI settings bg |
| Primary-200 | #BFDBFE | Active nav hover border |
| Primary-500 | #3B82F6 | Toggle ON track, slider fill, nav active left border, selected theme border |
| Primary-600 | #2563EB | Active nav text, edit links |
| Danger-50 | #FEF2F2 | Danger Zone bg |
| Danger-500 | #EF4444 | Danger Zone border, nav text |
| Danger-600 | #DC2626 | Delete button bg |
| Danger-700 | #B91C1C | Delete button hover |
| Text-Primary | Neutral-900 | Headings, setting labels |
| Text-Body | Neutral-800 | Setting values, nav items |
| Text-Secondary | Neutral-600 | Descriptions |
| Border-Default | Neutral-300 | Nav border-right, dividers, default theme card border |
| Success-500 | #10B981 | Saved confirmation |
| Warning-50 | #FFFBEB | Error section bg |
| Warning-500 | #F59E0B | Error/warning indicators |

### Typography Tokens Used

| Token | Size | Weight | Line Height | Elements |
|-------|------|--------|-------------|----------|
| Heading-3 | 22px | 600 | 1.25 | Section titles |
| Heading-4 | 18px | 600 | 1.3 | Group headings, theme card labels |
| Body | 15px | 600 | 1.6 | Setting labels (600 weight) |
| Body | 15px | 400 | 1.6 | Nav items, setting values |
| Body-Small | 14px | 400 | 1.5 | Descriptions |
| Caption | 13px | 400 | 1.4 | Slider end labels, helper text |

### Spacing Tokens Used

| Token | Value | Usage |
|-------|-------|-------|
| Space-3 | 8px | Nav item vertical padding |
| Space-4 | 12px | Nested padding |
| Space-5 | 16px | Nav item horizontal padding, row vertical padding, theme card gap |
| Space-7 | 24px | Content padding, section margin, Danger Zone padding |
| Space-8 | 32px | Page margins |
| Space-10 | 48px | Section vertical gaps |

### Elevation Tokens Used

| Token | Usage |
|-------|-------|
| Layer 0 | Page, sidebar, settings nav |
| Layer 1 | Topbar glass, content area |
| Layer 2 | Nav hover (bg shift), slider knob |
| Layer 3 | Confirmation modal |
| Layer 5 | Overlays |

---

*End of Settings.md — Visual Prototype Specification for MR:EGO Design OS DP-9.*
