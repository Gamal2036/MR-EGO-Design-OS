# Profile — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Screen:** User Profile — Tabs, Sections, Edit
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
├──────────┬───────────────────────────────────────────────────────┤
│          │                                                       │
│ SIDEBAR  │              CONTENT AREA (scrollable)               │
│ (240px)  │                                                       │
│          │  ┌─ PROFILE HEADER ─────────────────────────────────┐ │
│ Surface-2│  │ [Avatar 80px] Name H2(28px/700) + pronouns      │ │
│          │  │ Title Body-Large(16px/450)                       │ │
│ Nav items│  │ Location · Open-to-work badge                    │ │
│ (14px    │  │ Member since · [Edit Photo][Share][Edit Profile] │ │
│  400/    │  └──────────────────────────────────────────────────┘ │
│  600)    │                                                       │
│          │  ┌─ TABS (44px height) ────────────────────────────┐ │
│ Active   │  │ About │ Experience │ Skills │ Documents │Activity │
│ indicator│  │ Primary-600 active + 2px bottom border           │ │
│ ───────  │  └──────────────────────────────────────────────────┘ │
│          │                                                       │
│          │  ┌─ TAB CONTENT ───────────────────────────────────┐ │
│          │  │  (varies by tab selection)                       │ │
│          │  │                                                   │ │
│          │  │  ABOUT TAB:                                       │ │
│          │  │  ┌─ Bio ───────────────────────────────────────┐ │ │
│          │  │  │ Heading-4 "Bio" [Edit]                      │ │ │
│          │  │  │ Body-Small text or textarea (120px)         │ │ │
│          │  │  │ [Save] [Cancel] — inline edit mode          │ │ │
│          │  │  └─────────────────────────────────────────────┘ │ │
│          │  │                                                   │ │
│          │  │  ┌─ Contact ──────────────────────────────────┐  │ │
│          │  │  │ Heading-4 "Contact" [Edit]                 │  │ │
│          │  │  │ Email · Phone · LinkedIn · GitHub          │  │ │
│          │  │  │ Body-Small, inline edit per field          │  │ │
│          │  │  └─────────────────────────────────────────────┘ │ │
│          │  │                                                   │ │
│          │  │  ┌─ Location ─────────────────────────────────┐  │ │
│          │  │  │ Heading-4 "Location" [Edit]                │  │ │
│          │  │  │ Body-Small text + timezone                 │  │ │
│          │  │  └─────────────────────────────────────────────┘ │ │
│          │  │                                                   │ │
│          │  │  EXPERIENCE TAB: Timeline list                   │ │
│          │  │  SKILLS TAB: Chip grid + AI suggestions          │ │
│          │  │  DOCUMENTS TAB: Document list                    │ │
│          │  │  ACTIVITY TAB: Activity feed                     │ │
│          │  └──────────────────────────────────────────────────┘ │
│          │                                                       │
├──────────┴───────────────────────────────────────────────────────┤
│                       FOOTER (optional)                          │
└──────────────────────────────────────────────────────────────────┘
```

### 1.1 Layout Tokens

| Element | Token | Value |
|---------|-------|-------|
| Sidebar width | — | 240px |
| Sidebar background | Surface-2 | Neutral-100 |
| Topbar height | — | 56px |
| Topbar background | Glass-Navigation | rgba(255,255,255,0.72), blur 12px |
| Topbar border-bottom | Border-Default | Neutral-300 |
| Content max width | — | 960px (centered) |
| Content padding | Space-8 | 32px horizontal |
| Content gap vertical | Space-10 | 48px between sections |
| Tab bar height | — | 44px |
| Profile card padding | Space-7 | 24px |
| Profile card margin-bottom | Space-5 | 16px |

### 1.2 Elevation Map

| Layer | Element | Shadow Token |
|-------|---------|-------------|
| 0 | Page content area | Shadow-0 |
| 0 | Sidebar | Shadow-0 |
| 1 | Topbar (glass) | Shadow-1 |
| 1 | Profile header card | Shadow-1 |
| 1 | Tab content cards | Shadow-1 |
| 2 | Tab content cards (hover) | Shadow-2 |
| 2 | Dropdown menus | Shadow-2 |
| 3 | Edit modals | Shadow-3 |
| 5 | Full-screen overlays | Shadow-5 |

---

## 2. Section Walkthrough

### 2.1 Profile Header

```
┌──────────────────────────────────────────────────────────────────┐
│  Surface-1 card, radius-md, padding Space-7, margin-bottom S-5  │
│                                                                  │
│  ┌──────────┐                                                    │
│  │          │  Heading-2: "Alex Chen" (28px/700)    [he/him]     │
│  │  Avatar  │  Body-Large: "Senior Frontend Engineer" (16px/450) │
│  │  80px    │  Body-Small: "San Francisco, CA" · Text-Secondary  │
│  │  radius  │                                                    │
│  │  -full   │  [Open to work]  ·  Member since Jan 2024          │
│  │          │                                                    │
│  └──────────┘  [Edit Photo]  [Share Profile]  [Edit Profile]    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Element Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Card background | Surface-1 | #FFFFFF |
| Card radius | Radius-Md | 8px |
| Card padding | Space-7 | 24px |
| Card shadow | Shadow-1 | Layer 1 |
| Card margin-bottom | Space-5 | 16px |
| Avatar size | — | 80px × 80px |
| Avatar radius | Radius-Full | 9999px |
| Avatar border | — | 3px solid Surface-1 (overlap with card) |
| Name | Heading-2 | 28px, weight 700, line-height 1.2, Text-Primary |
| Pronouns | Caption | 13px, weight 400, Text-Secondary, italic |
| Title | Body-Large | 16px, weight 450, line-height 1.5, Text-Body |
| Location | Body-Small | 14px, weight 400, line-height 1.5, Text-Secondary |
| Open-to-work badge | Success-500 bg | #10B981 bg, white text, 13px Caption, radius-sm (4px), padding Space-3 |
| Member since | Caption | 13px, weight 400, Text-Secondary |
| Actions | Button-Small | 14px, 32px height, radius-md, ghost or outline style |

**Purpose:** Identity and key profile info. **Priority:** Highest — first visual anchor. **Weight:** Heavy — avatar + name + badge create strong focal point.

**States:**

| State | Behavior |
|-------|----------|
| Default | All info displayed. Actions as ghost buttons. |
| Hover (avatar) | Overlay with 60% black + "Change Photo" caption on hover. 200ms ease-out. |
| Hover (action btn) | Ghost button → Surface-2 bg. |
| Open-to-work OFF | Badge hidden. No visual gap — layout maintains. |
| Incomplete profile | "Complete your profile" banner above card: Primary-50 bg, Body-Small, [Complete Now] link. |
| Avatar loading | Skeleton circle (80px), pulse 1500ms. |
| Avatar error | Fallback to initial letters "AC" in Primary-500 circle, white text Heading-3. |

### 2.2 Profile Tabs

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌──────────┬──────────────┬─────────┬───────────┬──────────┐   │
│  │  About   │  Experience  │  Skills │ Documents │ Activity │   │
│  │  44px    │  44px        │  44px   │  44px     │  44px    │   │
│  │ Primary  │  Neutral-600 │  Neutr. │  Neutr.   │  Neutr.  │   │
│  │ -600 txt │  text        │  -600   │  -600     │  -600    │   │
│  │ Primary  │  no border   │         │           │          │   │
│  │ -200 btm │              │         │           │          │   │
│  │ border 2px│             │         │           │          │   │
│  └──────────┴──────────────┴─────────┴───────────┴──────────┘   │
│  Border-bottom: 1px Neutral-300 across full tab bar               │
└──────────────────────────────────────────────────────────────────┘
```

**Element Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Tab bar height | — | 44px |
| Tab item padding | Space-5 | 16px horizontal |
| Tab text | Body | 15px, weight 500, line-height 1.6 |
| Tab text default | — | Neutral-600 |
| Tab text active | — | Primary-600 |
| Tab text hover | — | Primary-500 |
| Active indicator | — | 2px height, Primary-200, bottom: 0 |
| Tab bar border-bottom | Border-Default | 1px Neutral-300 |
| Hover background | — | Primary-50, radius-sm top corners |
| Tab gap | Space-3 | 8px between tabs |

**Purpose:** Section navigation within profile. **Priority:** High — primary navigation. **Weight:** Moderate — horizontal bar, not competing with content.

**States:**

| State | Behavior |
|-------|----------|
| Default (inactive) | Neutral-600 text, no border |
| Active | Primary-600 text, Primary-200 bottom border 2px |
| Hover | Primary-500 text, Primary-50 bg |
| Focus | 2px Primary-500 ring offset 2px |
| Disabled tab | 40% opacity, not clickable |
| Tab with count | "Activity (3)" — count in Caption, Text-Secondary, right of label |

### 2.3 About Tab

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌─ BIO ───────────────────────────────────────────────────────┐ │
│  │  Heading-4 "Bio"                            [Edit]          │ │
│  │  ─────────────────────────────────────────────              │ │
│  │  "Experienced frontend engineer with 8+ years building      │ │
│  │  performant web applications. Passionate about design        │ │
│  │  systems and developer experience."                          │ │
│  │                                                              │ │
│  │  EDIT MODE:                                                  │ │
│  │  ┌────────────────────────────────────────────────────────┐  │ │
│  │  │ Textarea, 120px height, Body (15px), Surface-0 bg    │  │ │
│  │  │ radius-md, border Neutral-300, focus Primary-500     │  │ │
│  │  └────────────────────────────────────────────────────────┘  │ │
│  │  [Save] [Cancel] — Button-Primary + Button-Ghost            │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌─ CONTACT ──────────────────────────────────────────────────┐  │
│  │  Heading-4 "Contact"                         [Edit]        │  │
│  │  ─────────────────────────────────────────────              │  │
│  │  Email:    alex@example.com              [copy icon]        │  │
│  │  Phone:    +1 (555) 123-4567                                │  │
│  │  LinkedIn: linkedin.com/in/alexchen      [link icon]        │  │
│  │  GitHub:   github.com/alexchen           [link icon]        │  │
│  │  Body-Small (14px), Text-Body                               │  │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌─ LOCATION ────────────────────────────────────────────────┐  │
│  │  Heading-4 "Location"                        [Edit]        │  │
│  │  ─────────────────────────────────────────────              │  │
│  │  City: San Francisco, CA                                   │  │
│  │  Timezone: PT (UTC-8)                                       │  │
│  │  Remote: Yes — Worldwide                                    │  │
│  │  Body-Small (14px), Text-Body                               │  │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  [⚡ AI Suggestion Bar] "Your bio could highlight AI experience" │
│  Primary-50 bg, Body-Small, dismissible                          │
└──────────────────────────────────────────────────────────────────┘
```

**Element Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Section heading | Heading-4 | 18px, weight 600, line-height 1.3, Text-Primary |
| Section padding | Space-5 | 16px |
| Section border-bottom | Border-Default | 1px Neutral-300 |
| Section margin-bottom | Space-5 | 16px |
| Bio text | Body | 15px, weight 400, line-height 1.6, Text-Body |
| Textarea height (edit) | — | 120px |
| Textarea bg (edit) | Surface-0 | Neutral-50 |
| Textarea radius | Radius-Md | 8px |
| Textarea border | Border-Default | 1px Neutral-300 |
| Textarea focus | Border-Focus | 2px Primary-500 |
| Contact field label | Body-Small | 14px, weight 500, Text-Secondary |
| Contact field value | Body-Small | 14px, weight 400, Text-Body |
| Copy icon | — | 16px × 16px, Neutral-400, hover Primary-500 |
| Save button | Button-Primary | 14px, 32px height, Primary-600 |
| Cancel button | Button-Ghost | 14px, 32px height, Neutral-600 |
| AI suggestion bg | Primary-50 | #EFF6FF |
| AI suggestion text | Body-Small | 14px, weight 400, line-height 1.5 |

**Purpose:** User's personal and contact information. **Priority:** High — primary content of About tab. **Weight:** High — multiple sections with edit capability.

**States:**

| State | Behavior |
|-------|----------|
| View mode | All fields display as text. Edit button per section. |
| Edit mode (per section) | Textarea/input replaces text display. Save/Cancel visible. Other sections remain in view mode. |
| Saving | Save button shows spinner (14px). Fields disabled. |
| Saved | Brief "Saved!" confirmation (Success-500) below section, fades out 3s. |
| Cancel edit | Fields revert to saved values. Edit mode exits. |
| Empty bio | "No bio yet" in Text-Tertiary, italic. Edit button prominent. |
| Empty contact field | "Not provided" in Text-Tertiary, italic. |
| AI suggestion | Bar slides in from top of section. Dismissible. "Apply" button to insert suggested text. |

### 2.4 Experience Tab

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌─ EXPERIENCE ───────────────────────────────────────────────┐  │
│  │  Heading-4 "Experience"                    [+ Add Entry]   │  │
│  │  ─────────────────────────────────────────────              │  │
│  │                                                              │  │
│  │  ┌──────────────────────────────────────────────────────┐   │  │
│  │  │ [Icon 24px]  Heading-4 "Senior Frontend Engineer"   │   │  │
│  │  │             Body-Small "Cruise · Mar 2023 — Present"│   │  │
│  │  │             Body: "Led frontend platform team..."   │   │  │
│  │  │             [Edit] [Delete] — ghost buttons          │   │  │
│  │  └──────────────────────────────────────────────────────┘   │  │
│  │                                                              │  │
│  │  ┌──────────────────────────────────────────────────────┐   │  │
│  │  │ [Icon 24px]  Heading-4 "Frontend Engineer"          │   │  │
│  │  │             Body-Small "Google · Jun 2020 — Feb 2023"│   │  │
│  │  │             Body: "Built core UI components..."      │   │  │
│  │  │             [Edit] [Delete]                           │   │  │
│  │  └──────────────────────────────────────────────────────┘   │  │
│  │                                                              │  │
│  │  Experience items: Surface-1 card, radius-sm, padding S-5    │  │
│  │  Gap Space-5 (16px) between items                            │  │
│  │  Border-left: 3px Primary-500 per item                      │  │
│  └──────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

**Element Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Card background | Surface-1 | #FFFFFF |
| Card radius | Radius-Sm | 4px |
| Card padding | Space-5 | 16px |
| Card border-left | Primary-500 | 3px solid #3B82F6 |
| Card shadow | Shadow-1 | Layer 1 |
| Card gap | Space-5 | 16px |
| Company icon | — | 24px × 24px, radius-sm |
| Role title | Heading-4 | 18px, weight 600, line-height 1.3, Text-Primary |
| Company + dates | Body-Small | 14px, weight 400, line-height 1.5, Text-Secondary |
| Description | Body | 15px, weight 400, line-height 1.6, Text-Body |
| Edit button | Ghost | 14px, Primary-600 text |
| Delete button | Ghost | 14px, Danger-500 text |
| Add Entry button | Button-Outline | 14px, 36px height, Primary-600 text + border |

**States:**

| State | Behavior |
|-------|----------|
| Default | Experience cards with role, company, dates, description |
| Hover (card) | Shadow-2, -1px translateY, 200ms |
| Hover (edit) | Primary-100 bg |
| Hover (delete) | Danger-50 bg |
| Empty | See Section 3 |
| Edit mode | Card transforms to inline form with inputs for each field. Save/Cancel. |
| Delete confirmation | Modal: "Delete this experience?" with [Confirm] [Cancel]. |
| Delete in progress | Card fades out (200ms), then removed from DOM. |
| Loading | Skeleton: 3 cards, 100px height each, pulse |

### 2.5 Skills Tab

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌─ SKILLS ────────────────────────────────────────────────────┐ │
│  │  Heading-4 "Skills"                           [+ Add Skill] │ │
│  │  ─────────────────────────────────────────────              │ │
│  │                                                              │ │
│  │  ┌──────────────────────────────────────────────────────┐   │ │
│  │  │  [React]  [TypeScript]  [CSS/SASS]  [Next.js]      │   │ │
│  │  │  [Node.js]  [GraphQL]  [Jest]  [Design Systems]    │   │ │
│  │  │  [Python]  [Docker]  [Kubernetes]  [AWS]            │   │ │
│  │  │                                                      │   │ │
│  │  │  Chip: 13px Caption, Surface-2 bg, Neutral-600 text │   │ │
│  │  │  radius-sm (4px), padding Space-3(8px) h + 4px v   │   │ │
│  │  │  X icon on right to remove. Gap Space-3.            │   │ │
│  │  └──────────────────────────────────────────────────────┘   │ │
│  │                                                              │ │
│  │  ┌─ AI SUGGESTED ────────────────────────────────────────┐  │ │
│  │  │  Heading-4 "AI Suggested"        Body-Small "Based on │  │ │
│  │  │                                       job market"    │  │ │
│  │  │                                                      │  │ │
│  │  │  [System Design] 92% match [+ Add]                  │  │ │
│  │  │  [ML/AI] 87% match [+ Add]                          │  │ │
│  │  │  [Rust] 76% match [+ Add]                           │  │ │
│  │  │                                                      │  │ │
│  │  │  AI chips: Primary-50 bg, Primary-600 text            │  │ │
│  │  │  Confidence %: Caption, Primary-400                   │  │ │
│  │  │  [+ Add]: 14px ghost button, Primary-600              │  │ │
│  │  │  Gap Space-3 (8px) between chips                      │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └──────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

**Element Specs:**

| Element | Token | Value |
|---------|-------|-------|
| Skill chip bg | Surface-2 | Neutral-100 |
| Skill chip text | Caption | 13px, weight 400, Text-Body |
| Skill chip radius | Radius-Sm | 4px |
| Skill chip padding | — | Space-3 (8px) horizontal, 4px vertical |
| Skill chip remove icon | — | 12px × 12px, Neutral-400, hover Danger-500 |
| Skill chip gap | Space-3 | 8px |
| AI chip bg | Primary-50 | #EFF6FF |
| AI chip text | Caption | 13px, weight 500, Primary-600 |
| AI chip confidence | Caption | 13px, weight 400, Primary-400 |
| Add button | Ghost | 14px, Primary-600 |
| Section gap | Space-7 | 24px between skill groups |

**Purpose:** Skills inventory with AI-powered suggestions. **Priority:** Medium. **Weight:** Moderate — chip grid is compact but visually busy.

**States:**

| State | Behavior |
|-------|----------|
| Default | User's skills shown as chip grid. AI suggestions below. |
| Hover (user chip) | Surface-2 → Surface-3 bg. Remove X becomes visible. |
| Hover (AI chip) | Primary-50 → Primary-100 bg. |
| Click (+ Add) | Chip slides from AI section to user section with animation (200ms). Confidence badge removed. |
| Click (remove X) | Chip fades out (150ms), removed from grid. |
| Empty (no skills) | "No skills added yet" in Text-Tertiary. AI suggested section shows full suggestions. |
| AI loading | Skeleton chips: 3 chips, 80px × 28px each, pulse |
| AI error | AI section shows "Unable to load suggestions" in Body-Small, Text-Tertiary. [Retry] link. |

---

## 3. Empty State (New User — No Profile Data)

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                                                             │  │
│  │           👤 (User icon, 80px, Neutral-200, 60% opacity)   │  │
│  │                                                             │  │
│  │  Heading-2: "Set up your profile"                           │  │
│  │  Body: "Complete your profile to help employers and AI      │  │
│  │  better understand your background and preferences."         │  │
│  │                                                             │  │
│  │  Profile completeness: 0% — ░░░░░░░░░░ (progress bar)      │  │
│  │                                                             │  │
│  │  [Add Photo]  [Add Bio]  [Add Experience]  [Add Skills]    │  │
│  │  Quick action buttons in a row, each 150px × 48px           │  │
│  │                                                             │  │
│  │  [Complete Profile] — Primary button                       │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  AI prompt: "Complete your profile to get personalized career    │
│  recommendations. We'll guide you step by step."                 │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 4. Loading State

```
┌──────────────────────────────────────────────────────────────────┐
│  PROFILE HEADER SKELETON:                                       │
│  ┌──────────┐                                                    │
│  │ ▓▓▓▓▓▓  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (200px × 24px)        │
│  │ ▓▓ 80px │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (180px × 16px)      │
│  │ ▓▓      │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (120px × 14px)              │
│  └──────────┘  ▓▓▓▓▓▓▓▓▓▓ (80px × 14px)                         │
│                                                                  │
│  TABS: 5 skeleton tab labels (80px × 20px each)                 │
│                                                                  │
│  TAB CONTENT:                                                    │
│  ┌─ SECTION SKELETON ─────────────────────────────────────────┐ │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (160px × 24px)                     │ │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                  │ │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                  │ │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (120px × 14px)                       │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Skeleton spec: Surface-2 bg, radius-sm, opacity 0.5 base,       │
│  0.8 peak, pulse 1500ms                                         │
│                                                                  │
│  Sequence: Avatar (0ms) → Name (50ms) → Details (100ms) →       │
│  Tabs (150ms) → Tab content (200ms)                              │
└──────────────────────────────────────────────────────────────────┘
```

---

## 5. Error State

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  PROFILE HEADER ERROR                                       │  │
│  │  ⚠ "Unable to load profile data"                           │  │
│  │  [Retry] [Dismiss]                                          │  │
│  │  Warning-50 bg, Warning-500 left border 3px, radius-md     │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  TAB SECTION ERROR (per-tab granularity):                   │  │
│  │  ⚠ "Unable to load experience data"                        │  │
│  │  [Retry]                                                    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Save error: inline below section:                              │
│  ⚠ "Failed to save. Please try again." + [Retry]               │
│  Body-Small, Danger-500 text                                    │
│                                                                  │
│  Avatar upload error: inline below avatar:                      │
│  ⚠ "Upload failed. Max size 5MB." in Caption, Danger-500       │
└──────────────────────────────────────────────────────────────────┘
```

---

## 6. Offline State

```
┌──────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  OFFLINE BANNER (below topbar, above content):             │  │
│  │  📡 "You're offline. Profile data is from [time]."        │  │
│  │  Surface-2 bg, Warning-500 left border (3px)               │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Section behavior:                                               │
│  - Profile header: cached data, "(cached)" tag                  │
│  - Tabs: fully functional content from cache                     │
│  - Edit/Save: disabled with tooltip "Available when online"     │
│  - AI suggestions: hidden                                        │
│  - Upload photo: disabled                                        │
│  - Offline indicator in topbar (icon only, 20px)                │
└──────────────────────────────────────────────────────────────────┘
```

---

## 7. Visual Hierarchy

```
Priority 1 (Highest) ─────────────────────────────────────► Profile Header
                           (avatar + name = strongest focal point)

Priority 2 ──────────────────────────────────────────────► Tab Bar
                           (primary navigation, color-coded active)

Priority 3 ──────────────────────────────────────────────► Tab Content
                           (bio, experience, skills — information dense)

Priority 4 ──────────────────────────────────────────────► AI Suggestions
                           (subtle tint, supplementary)

Priority 5 ──────────────────────────────────────────────► Topbar + Sidebar
                           (navigation infrastructure)
```

**Hierarchy mechanisms:**
- Avatar (80px) is largest single element on page — draws immediate attention
- Name uses Heading-2 700 weight (heaviest typography on page)
- Open-to-work badge uses Success-500 green — high contrast, immediate recognition
- Active tab uses Primary-600 + bottom border — clear current location
- AI suggestions use Primary-50 tint — visible but not competing with primary content
- Edit buttons are ghost style — present but visually recessive

---

## 8. Motion Specifications

| Element | Trigger | Animation | Duration | Easing | Delay |
|---------|---------|-----------|----------|--------|-------|
| Profile header | Page load | Fade in + slide down 8px | 400ms | Ease-Out | 0ms |
| Avatar | Page load | Scale 0.9 → 1 + fade | 400ms | Ease-Spring | 50ms |
| Name + details | Page load | Staggered fade in | 300ms | Ease-Out | 100ms (50ms stagger) |
| Tab bar | Page load | Slide down 4px + fade | 300ms | Ease-Out | 200ms |
| Tab content | Page load | Fade in | 200ms | Ease-Out | 300ms |
| Tab switch | Click | Cross-fade old → new content | 200ms | Ease-Out | 0ms |
| Inline edit enter | Click | Section height transition + content swap | 200ms | Ease-Out | 0ms |
| Save success | Click | Check icon + "Saved!" fade | 200ms | Ease-Out | 0ms |
| Card hover | Mouse enter | Shadow-1 → Shadow-2, -1px Y | 200ms | Ease-Out | 0ms |
| Avatar hover | Mouse enter | Dark overlay fade in (0 → 60%) | 200ms | Ease-Out | 0ms |
| Chip remove | Click | Scale 1 → 0, fade out | 150ms | Ease-In | 0ms |
| AI chip → user chip | Add click | Slide from AI section to user section | 300ms | Ease-Out | 0ms |
| Empty → data | First edit | Section cross-fade | 300ms | Ease-Out | 0ms |
| AI suggestion appear | Load | Slide down 8px + fade | 300ms | Ease-Out | 400ms |
| AI suggestion dismiss | Click | Slide up + fade | 200ms | Ease-In | 0ms |
| Experience delete | Confirm | Card slide up + fade | 200ms | Ease-In | 0ms |
| Skeleton pulse | Loading | Opacity 0.5 → 0.8 → 0.5 | 1500ms loop | Ease-In-Out | Staggered |

**Stagger table (page load):**

| Element | Delay |
|---------|-------|
| Profile header | 0ms |
| Avatar | 50ms |
| Name | 100ms |
| Title + details | 150ms |
| Actions row | 200ms |
| Tab bar | 250ms |
| Tab content | 300ms |
| AI suggestions | 400ms |

---

## 9. Accessibility

| Requirement | Implementation |
|-------------|---------------|
| Profile header landmark | `role="region"` with `aria-label="Profile header"` |
| Avatar | `aria-label="Profile photo of [name]"`, role `img` |
| Name | `role="heading"`, `aria-level="1"` |
| Open-to-work badge | `aria-label="Open to work"` |
| Tab list | `role="tablist"` with `aria-label="Profile sections"` |
| Tab items | `role="tab"`, `aria-selected="true/false"`, `aria-controls` pointing to panel |
| Tab panels | `role="tabpanel"`, `aria-labelledby` pointing to tab |
| Edit buttons | `aria-label="Edit [section name]"` |
| Inline edit | Inputs have `aria-label` describing field. Save/Cancel have `aria-label`. |
| Skill chips | `role="list"`, each chip `role="listitem"`. Remove button has `aria-label="Remove [skill]"` |
| AI chips | Add button has `aria-label="Add [skill] to your skills"` |
| Save success | `aria-live="polite"` for confirmation messages |
| Error messages | `role="alert"`, `aria-live="assertive"` |
| Reduced motion | All animations reduced to 50ms or disabled |
| Focus order | Header → Tabs → Tab content (top-to-bottom) |
| Focus indicator | 2px Primary-500 ring, 2px offset, radius-md |
| Keyboard navigation | Tab through tabs, Enter to select, Tab into panel content |
| Skip link | "Skip to content" as first focusable element |

---

## 10. Keyboard Navigation

| Key | Context | Action |
|-----|---------|--------|
| Tab | Tab bar | Navigate through tab items |
| Enter/Space | Tab item | Activate/select tab |
| Arrow Left/Right | Tab bar | Move between tabs (when focus in tablist) |
| Tab | Tab panel | Navigate through panel content → next section → next tab |
| Enter | Edit button | Enter edit mode for section |
| Tab (edit mode) | Edit form | Field → Field → Save → Cancel |
| Enter (edit) | Save button | Save changes |
| Escape | Edit mode | Cancel edit, return to view mode |
| Tab (skills) | Chip grid | Tab through chips, Enter to interact |
| Escape (skills) | Chip remove confirmation | Cancel removal |
| Delete | Chip focused | Remove chip (with confirmation for non-empty skill) |
| / | Global | Focus global search |
| ? | Any | Show keyboard shortcuts modal |

**Focus Order:**
1. Topbar (Skip link → Logo → Search → Icons → Avatar)
2. Sidebar (Nav items top-to-bottom)
3. Profile Header (Avatar → Name → Badge → Actions)
4. Tab Bar (About → Experience → Skills → Documents → Activity)
5. Tab Content (Section headings → Edit buttons → Content → Save/Cancel if editing)
6. AI Suggestions (Suggestion text → Apply → Dismiss)

---

## 11. Responsive Behavior

### Mobile (<768px) — Single Column

| Element | Adaptation |
|---------|-----------|
| Sidebar | Hidden. Replaced by bottom tab bar (5 items, 56px height) |
| Topbar | Reduced: hamburger menu + title + notification bell |
| Profile header | Stacked: avatar centered above text. Actions in 2×2 grid below. |
| Tab bar | Horizontal scroll of tabs (overflow-x: auto, snap scroll) |
| Tab content | Full width, padding Space-5 |
| Skill chips | Full width wrap. AI chips full width. |
| AI suggestions | Full width, at bottom of each applicable tab |

### Tablet (768px–1023px) — Compact

| Element | Adaptation |
|---------|-----------|
| Sidebar | Icon rail (64px collapsed) |
| Topbar | Full (search visible, icon-only nav) |
| Profile header | Side-by-side layout maintained. Actions row wraps. |
| Tab bar | Full width, 5 tabs visible |
| Tab content | Standard padding Space-7 |

### Desktop (1024px+) — Full Layout

Full layout as specified above.

### Responsive Breakpoint Reference

| Property | Mobile | Tablet | Desktop | Ultra-Wide |
|----------|--------|--------|---------|------------|
| Sidebar | Bottom tabs | Icon rail (64px) | Full (240px) | Full (240px) |
| Avatar size | 64px | 72px | 80px | 88px |
| Header layout | Centered stack | Side-by-side | Side-by-side | Side-by-side |
| Tab scroll | Horizontal scroll | Full visible | Full visible | Full visible |
| Page padding | Space-5 | Space-7 | Space-8 | Space-10 |
| Skill columns | 2-col chips | 3-col chips | 4-col chips | 5-col chips |
| Typography scale | Mobile | Mobile | Desktop | Desktop |

---

## 12. AI Integration Features

| Feature | Behavior |
|---------|----------|
| Bio improvement suggestion | AI analyzes current bio against job market. Suggests specific improvements. Shown as banner below bio with [Apply] [Dismiss]. Suggestion text in Body-Small, italicized. |
| Skill recommendations | AI compares user skills against target job descriptions. Suggests missing skills with market demand confidence (%). Shown as chips in "AI Suggested" section. |
| Profile completeness score | AI calculates completeness (0-100%) based on filled fields. Shown as progress bar in empty state header. Also shown as small indicator below name: "Profile: 75% complete" in Caption, Primary-500. |
| Experience gap analysis | AI flags gaps > 6 months in experience timeline. Shows suggestion: "Consider adding a short course or freelance work for this period." |
| Profile strength meter | AI evaluates overall profile strength for recruiter visibility. Shown as subtle badge: "Strong Profile" (Success-500) or "Needs Improvement" (Warning-500). |
| Photo optimization tip | AI checks photo (if uploaded) for professionalism. Suggests improvements if needed: "Consider a professional headshot with neutral background." |

---

## 13. Future Expansion Items

| Item | Priority | Notes |
|------|----------|-------|
| Portfolio showcase | Medium | Embed projects, GitHub repos, live demos in profile |
| Endorsements | Low | Peer endorsements for skills (similar to LinkedIn) |
| Profile QR code | Low | Printable QR linking to public profile |
| Public vs. private mode | High | Toggle for public profile visibility with preview |
| Multiple pronouns support | Low | Custom pronoun field with dropdown presets |
| Cover photo | Medium | 1200px × 200px banner behind avatar |
| Profile themes | Low | Subtle color theme options for profile page |
| Availability calendar | Medium | Public calendar showing interview availability |
| Video introduction | Future | 30-second video intro for recruiters |
| Resume download | Medium | One-click PDF export of profile as resume |
| Social links | Low | Twitter, YouTube, personal website, blog |
| Language proficiency | Low | Multi-language support for international candidates |
| Work authorization | Medium | Visa status, work eligibility for global roles |
| Salary expectations | Low | Public salary range display (optional) |
| Reference contacts | Future | Professional references with verification |

---

## 14. Token Reference Summary

### Color Tokens Used

| Token | Value (Light) | Elements |
|-------|---------------|----------|
| Surface-0 | Neutral-50 | Page area, textarea bg |
| Surface-1 | #FFFFFF | Profile header, experience cards, tab content cards |
| Surface-2 | Neutral-100 | Sidebar, skill chips |
| Primary-50 | #EFF6FF | AI suggestions, tab hover bg |
| Primary-200 | #BFDBFE | Active tab border |
| Primary-500 | #3B82F6 | Experience card left border, focus ring, completeness indicator |
| Primary-600 | #2563EB | Active tab text, edit buttons, add buttons |
| Text-Primary | Neutral-900 | Name, section headings |
| Text-Body | Neutral-800 | Bio, descriptions, contact values |
| Text-Secondary | Neutral-600 | Pronouns, location, labels, dates |
| Text-Tertiary | Neutral-500 | Placeholders, empty state hints |
| Border-Default | Neutral-300 | Card borders, dividers, tab bar border |
| Success-500 | #10B981 | Open-to-work badge, save confirmation |
| Warning-500 | #F59E0B | Warning states, offline |
| Danger-500 | #EF4444 | Delete buttons, error text |

### Typography Tokens Used

| Token | Size | Weight | Line Height | Elements |
|-------|------|--------|-------------|----------|
| Heading-2 | 28px | 700 | 1.2 | Name, empty state heading |
| Heading-4 | 18px | 600 | 1.3 | Section headings, role titles |
| Body-Large | 16px | 450 | 1.5 | Professional title |
| Body | 15px | 400 | 1.6 | Bio, descriptions, tab labels |
| Body-Small | 14px | 400 | 1.5 | Location, contact, company, dates |
| Caption | 13px | 400 | 1.4 | Pronouns, member since, skill chips |

### Spacing Tokens Used

| Token | Value | Usage |
|-------|-------|-------|
| Space-3 | 8px | Chip padding, gap between elements |
| Space-4 | 12px | Nested padding, inline spacing |
| Space-5 | 16px | Card padding, section gaps |
| Space-7 | 24px | Profile header padding, section vertical spacing |
| Space-8 | 32px | Page margins |
| Space-10 | 48px | Large section gaps |

### Elevation Tokens Used

| Token | Usage |
|-------|-------|
| Layer 0 | Page, sidebar |
| Layer 1 | Profile header, experience cards, tab content, topbar glass |
| Layer 2 | Card hover, dropdown menus |
| Layer 3 | Edit modals |
| Layer 5 | Full-screen overlays |

---

*End of Profile.md — Visual Prototype Specification for MR:EGO Design OS DP-9.*
