# Onboarding — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Status:** Complete Production Specification
**Inherits:** DP-7:Onboarding, DP-8:All (Motion, Interaction, Transitions, Loading), DP-6:Screen (Onboarding), DP-1:All
**Engineer Handoff:** Ready — no design decisions remaining

---

## 1. Purpose

Capture essential user data to personalize the MR:EGO experience. Four-step wizard with horizontal stepper. Clean, focused layout with no sidebar, minimal chrome, clear progress indicator, and AI-assisted suggestions at every step.

---

## 2. Visual Composition — Full Layout (All Steps)

```
┌──────────────────────────────────────────────────────────────────────┐
│  TOP BAR (56px)                                                       │
│  [Logo 80x24]              Step 2 of 4                    [Skip ▸]   │
├──────────────────────────────────────────────────────────────────────┤
│  STEPPER (72px h, max 720px centered)                                │
│  ┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐                      │
│  │  ●   │═══▶│  ○   │═══▶│  ○   │═══▶│  ○   │                       │
│  │ GOAL │    │ EXP  │    │SKILLS│    │INTERS│                       │
│  └──────┘    └──────┘    └──────┘    └──────┘                       │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│         ┌────────────────────────────────────────────┐              │
│         │  CONTENT AREA (720px max, centered)         │             │
│         │                                            │             │
│         │  [Step-specific content — see sections     │             │
│         │   below for each step's composition]       │             │
│         │                                            │             │
│         └────────────────────────────────────────────┘              │
│                                                                      │
│  BOTTOM BAR (64px, fixed glass)                                      │
│  [← Back]                              [Continue ▸ / Complete ✦]   │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 3. Shared Components

### Top Bar

| Property | Value |
|----------|-------|
| Height | 56px |
| Background | Surface-1 (#FFFFFF) |
| Border bottom | 1px solid Neutral-100 |
| Padding | 0 Space-8 (32px) |
| z-index | Elevation-2 |

| Group | Element | Size | Spacing |
|-------|---------|------|---------|
| Left | Logo (simplified) | 80px x 24px | Space-3 from edge |
| Center | Step indicator "Step 2 of 4" | Body-Small (14px), Text-Secondary, center | — |
| Right | "Skip" text link | Body-Small, Text-Link, 600 weight | — |

### Horizontal Stepper

| Property | Value |
|----------|-------|
| Position | Below top bar |
| Height | 72px |
| Max width | 720px (centered) |
| Padding | Space-5 (16px) vertical, 0 horizontal |
| Background | Surface-1 |
| Border bottom | 1px solid Neutral-100 |

**Step circle anatomy:**

```
     Step Label (Caption, 13px, center)
          |
       ┌────┐
       │ 36 │  (diameter 36px)
       │ px │
       └────┘
          |
     Connector line (2px h, 64px w)
```

| State | Circle bg | Icon/Text | Connector line | Label |
|-------|-----------|-----------|----------------|-------|
| Active | Primary-600 (#2563EB) | White number (14px/700) | — | Text-Primary, 600 weight |
| Completed | Primary-100 (#DBEAFE) | Primary-600 checkmark (16px) | Primary-300 (active line) | Text-Primary, 400 weight |
| Upcoming | Neutral-200 (#E5E7EB) | Neutral-400 number (14px) | Neutral-200 | Text-Secondary, 400 weight |

**Step data:**

| Step | Label | Circle number |
|------|-------|---------------|
| 1 | Goal | 1 |
| 2 | Experience | 2 |
| 3 | Skills | 3 |
| 4 | Interests | 4 |

### Bottom Sticky Bar

| Property | Value |
|----------|-------|
| Height | 64px |
| Background | rgba(255,255,255,0.85) + backdrop-filter blur(8px) |
| Border top | 1px solid rgba(0,0,0,0.06) |
| Position | Fixed bottom |
| Padding | 0 Space-8 (32px) |
| z-index | Elevation-2 |

| Group | Element | Size | Behavior |
|-------|---------|------|----------|
| Left | "← Back" button | Button-ghost, min 80px x 40px | Disabled on Step 1, navigates to previous step |
| Right | "Continue ▸" or "Complete ✦" | Button-Primary, min 140px x 44px | Disabled until required fields complete |

**Button states:**

| State | Back | Continue |
|-------|------|----------|
| Default | Text-Primary, bg transparent | Primary-600, white text, Shadow-1 |
| Disabled | Opacity 0.4, pointer-events none | Neutral-200 bg, Neutral-400 text |
| Hover | Neutral-100 bg | Primary-700, Shadow-2 |
| Active | Scale 0.98 | Scale 0.98 |
| Loading | — | Spinner (16px white) + "Saving..." |

### Content Area

| Property | Value |
|----------|-------|
| Max width | 720px (centered) |
| Padding top | Space-9 (40px) |
| Padding bottom | Space-11 (64px) + bottom bar height (64px) = 128px total |

### Step Transition

| Property | Value |
|----------|-------|
| Outgoing content | Fade out + translateY(-10px), 150ms |
| Incoming content | Fade in + translateY(10px) → 0, 200ms |
| Stepper update | Step circle fills (200ms), connector line animates (300ms) |
| Delay between out/in | 50ms gap |

---

## 4. Step 1: Goal Selection

### Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│         What brings you to MR:EGO?                                  │
│         Choose your primary goal. You can always change this later.  │
│                                                                      │
│         ┌────────────────────┐  ┌────────────────────┐              │
│         │ 🎯 Find a Job      │  │ 🔄 Career Change   │              │
│         │ Discover           │  │ Transition into a  │              │
│         │ opportunities      │  │ new field or role  │              │
│         └────────────────────┘  └────────────────────┘              │
│                                                                      │
│         ┌────────────────────┐  ┌────────────────────┐              │
│         │ 📈 Skill Growth    │  │ ✨ Explore          │              │
│         │ Develop skills     │  │ See what MR:EGO   │              │
│         │ for advancement    │  │ offers for my career             │              │
│         └────────────────────┘  └────────────────────┘              │
│                                                                      │
│         [Skip for now]                                               │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Elements

| Layer | Element | Token | Bottom space |
|-------|---------|-------|--------------|
| 1 | "What brings you to MR:EGO?" | Heading-2 (28px/650), Text-Primary | Space-2 (4px) |
| 2 | "Choose your primary goal..." | Body (15px/400), Text-Secondary | Space-8 (32px) |
| 3 | Goal cards (2x2 grid) | 344px each, 16px gap | Space-5 (16px) |
| 4 | "Skip for now" link | Body-Small, Text-Secondary (400 weight) | 0 |

### Goal Card Specification

| Property | Value |
|----------|-------|
| Card size | 344px wide x 140px min height |
| Grid | 2-column, 16px gap |
| Padding | Space-7 (24px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border default | 1px solid Neutral-100 |
| Border selected | 2px solid Primary-500 |
| Background selected | Primary-50 (#EFF6FF) |
| Shadow default | Shadow-1 |
| Shadow hover | Shadow-2 |
| Shadow selected | Shadow-1 (no lift) |
| Transition | border 150ms, shadow 200ms |
| Cursor | pointer |

**Card internal layout:**

```
┌──────────────────────────┐
│                          │
│  [Icon 40x40, r10]      │  ← center-top
│  Title (Heading-4, 18px) │  ← Space-3 (8px) below icon
│  Description (Body-Small)│  ← Space-2 (4px) below title
│  14px, Text-Secondary    │
│  2 lines max             │
│                          │
└──────────────────────────┘
```

**Card content:**

| Card | Icon | Icon bg | Title | Description |
|------|------|---------|-------|-------------|
| 1 | Search (20px) | Primary-50 bg, Primary-600 icon | Find a Job | Discover opportunities that match my skills and experience |
| 2 | Swap (20px) | Primary-50 bg, Primary-600 icon | Career Change | Transition into a new field or role I'm passionate about |
| 3 | Chart (20px) | Primary-50 bg, Primary-600 icon | Skill Growth | Develop skills for career advancement and promotion |
| 4 | Spark (20px) | Primary-50 bg, Primary-600 icon | Explore | See what MR:EGO offers for my career journey |

**Radio behavior:**

| Property | Value |
|----------|-------|
| Input type | Hidden radio input per card |
| Selection | Single select (radio group) |
| Keyboard | Arrow keys navigate between cards |
| Focus | Card outline: 2px Primary-300 ring |

### States — Step 1

| State | Visual | Behavior |
|-------|--------|----------|
| Default | All cards outlined Neutral-100, Shadow-1 | No selection |
| Hover | Border Neutral-300, Shadow-2 | — |
| Focus (keyboard) | 2px Primary-300 ring | — |
| Selected | 2px Primary-500 border, Primary-50 bg | Continue button enabled |
| Disabled (selection made) | Unselected cards dim to opacity 0.6 | Cannot change while animating out |

### Bottom Bar — Step 1

| Element | State |
|---------|-------|
| Back | Disabled (first step) |
| Continue | Disabled (gray) until card selected → Primary-600 |

---

## 5. Step 2: Experience

### Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│         Tell us about your experience                               │
│         Add your work history. You can import from LinkedIn         │
│         or upload your CV for faster setup.                         │
│                                                                      │
│         [Import from LinkedIn ▸]  [Upload CV ▸]                     │
│                                                                      │
│         ┌────────────────────────────────────────────┐              │
│         │  Senior Engineer • Stripe                   │              │
│         │  Jan 2022 — Present  ·  3 yrs              │              │
│         │  Building scalable infrastructure...       │  [✎] [✕] [≡]│
│         └────────────────────────────────────────────┘              │
│                                                                      │
│         ┌────────────────────────────────────────────┐              │
│         │  Engineer • Vercel                          │              │
│         │  Mar 2020 — Dec 2021  ·  1 yr 9mo          │              │
│         │  Developed frontend...                     │  [✎] [✕] [≡]│
│         └────────────────────────────────────────────┘              │
│                                                                      │
│         [+ Add Experience]                                          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Elements

| Layer | Element | Token | Bottom space |
|-------|---------|-------|--------------|
| 1 | "Tell us about your experience" | Heading-2 | Space-2 (4px) |
| 2 | "Add your work history..." | Body, Text-Secondary | Space-7 (24px) |
| 3 | Import buttons row | 2 buttons, Space-4 gap | Space-8 (32px) |
| 4 | Experience list (cards) | Stacked, Space-5 gap | Space-5 (16px) |
| 5 | "Add Experience" button | Button-Secondary, outline | — |

### Import Buttons

| Property | LinkedIn Import | Upload CV |
|----------|-----------------|-----------|
| Type | Button-Secondary with icon | Button-Secondary with icon |
| Size | Auto (min 180px x 40px) | Auto (min 140px x 40px) |
| Icon | LinkedIn logo (18px) | Upload icon (18px) |
| Text | "Import from LinkedIn" | "Upload CV" |
| Hover | Neutral-100 bg | Neutral-100 bg |
| Behavior | OAuth popup (400px x 600px) | File input (`accept=".pdf,.doc,.docx"` max 10MB) |
| AI integration | AI recommends import: subtle pulsing glow on first visit | — |

### Experience Card (Existing)

| Property | Value |
|----------|-------|
| Padding | Space-5 (16px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | 1px solid Neutral-100 |
| Shadow | Shadow-1 |
| Layout | Flex row, content left, actions right |

**Card internal layout:**

```
┌──────────────────────────────────────────────────────┐
│ [icon 24x24]  Company · Title           [≡][✎][✕]  │
│               Jan 2022 — Present · 3 yrs            │
│               Description (Body, 2 lines truncated)  │
└──────────────────────────────────────────────────────┘
```

| Element | Token | Color |
|---------|-------|-------|
| Company · Title | Body (15px/600) | Text-Primary |
| Dates | Body-Small (14px) | Text-Secondary |
| Description | Body (15px) | Text-Body |
| Drag handle [≡] | 20x20px icon | Neutral-300 |
| Edit [✎] | 20x20px icon | Neutral-400, hover Primary-600 |
| Delete [✕] | 20x20px icon | Neutral-400, hover Danger-500 |

### Add Experience Form (Expandable)

| Property | Value |
|----------|-------|
| Default state | Collapsed, "+ Add Experience" button visible |
| Expanded state | Form card below list |
| Padding | Space-7 (24px) |
| Background | Surface-1 |
| Border | 1px dashed Neutral-300 |
| Radius | radius-md (8px) |

**Form fields (2-column layout on desktop):**

| Row | Left | Right |
|-----|------|-------|
| 1 | Company (input, 40px h) | Job Title (input, 40px h) |
| 2 | Start Date (date picker) | End Date (date picker) |
| 3 | ☐ I currently work here (full width) | — |
| 4 | Description (textarea, 80px h, full width) | — |
| 5 | [Cancel] [Add] | — |

| Field | Type | Required |
|-------|------|----------|
| Company | Text input | Yes |
| Job Title | Text input | Yes |
| Start Date | Date picker (month/year) | Yes |
| End Date | Date picker (month/year) | No (hidden if "Current" checked) |
| Current | Checkbox | No |
| Description | Textarea (80px h, 3 rows) | No |

### States — Step 2

| State | Visual | Behavior |
|-------|--------|----------|
| No experience | Empty state card with illustration + "Add your first work experience" | "Add Experience" button prominently shown |
| Has experience | Cards listed with drag, edit, delete | Continue enabled |
| LinkedIn importing | Button spinner + "Importing...", overlay | Popup open, polling |
| CV uploading | Progress bar (4px, Primary-500) + filename | File parsing |
| CV parsing | Skeleton card appearing | AI extracts experience |
| Form expanded | Dashed border card, fields | Cancel collapses |
| Form submitting | "Add" button spinner | Card appears in list |
| Delete | Icon → confirmation tooltip "Remove?" | Card fades out (200ms) |

### Bottom Bar — Step 2

| Element | State |
|---------|-------|
| Back | Enabled, navigates to Step 1 |
| Continue | Always enabled (skippable step) |

---

## 6. Step 3: Skills

### Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│         What are your professional skills?                          │
│         Add skills or let AI suggest them from your experience.     │
│                                                                      │
│       AI SUGGESTED                                                    │
│       ┌─────┐ ┌─────┐ ┌───────┐ ┌──────┐  ┌─────┐                 │
│       │JavaScript│ │React│ │TypeScript│ │Node│ │Python│             │
│       │ 98% match│ │95% │ │  92%   │ │88%│ │85% │                 │
│       └─────┘ └─────┘ └───────┘ └──────┘  └─────┘                 │
│                                                                      │
│       ┌────────────────────────────────────────────┐                │
│       │ [Type a skill...]                           │               │
│       └────────────────────────────────────────────┘                │
│       ┌───────┐ ┌───────┐ ┌─────────┐                              │
│       │ React │×│ Python│×│TypeScript│×                             │
│       └───────┘ └───────┘ └─────────┘                              │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Elements

| Layer | Element | Token | Bottom space |
|-------|---------|-------|--------------|
| 1 | "What are your professional skills?" | Heading-2 | Space-2 (4px) |
| 2 | "Add skills or let AI suggest them from your experience." | Body, Text-Secondary | Space-8 (32px) |

### AI Suggestions Section

| Property | Value |
|----------|-------|
| Visibility | Only shown if Step 2 has experience entries |
| Header | "Suggested for you" — Body-Small (14px/600), Text-Secondary |
| Header bottom space | Space-4 (12px) |
| Layout | Flex wrap, Space-2 (4px) gap |

**Suggestion chip:**

```
┌─────────────────────────┐
│  JavaScript   98%  [+]  │
└─────────────────────────┘
```

| Property | Value |
|----------|-------|
| Chip height | 32px |
| Padding | 0 Space-4 (12px) horizontal |
| Radius | radius-full (16px) |
| Background | Neutral-100 |
| Border | 1px solid Neutral-200 |
| Hover bg | Neutral-200 |
| Text | Body-Small (14px/500), Text-Primary |
| Confidence badge | Caption (12px), Primary-600, bg Primary-50, radius-sm |
| Add button [+] | 16x16px icon, Primary-500, hover Primary-600 |
| Spacing text→badge | Space-2 (4px) |

**AI confidence badge colors:**

| Confidence | Color | Badge bg |
|------------|-------|----------|
| 90-100% | Primary-600 | Primary-50 |
| 70-89% | Warning-600 | Warning-50 |
| < 70% | Neutral-500 | Neutral-100 |

### Manual Skill Input

| Property | Value |
|----------|-------|
| Type | Autocomplete text input |
| Height | 40px |
| Padding | Space-4 (12px) horizontal |
| Radius | radius-sm (6px) |
| Border | 1px solid Neutral-300 |
| Focus | Primary-500 border + 2px Primary-200 ring |
| Placeholder | "Type a skill..." |
| Width | 100% |

**Autocomplete dropdown:**

| Property | Value |
|----------|-------|
| Max height | 200px (scrollable) |
| Width | Matches input width |
| Background | Surface-1 |
| Border | 1px solid Neutral-200 |
| Shadow | Shadow-3 |
| Items | 4-6 suggestions, 40px h each |
| Highlighted item | Primary-50 bg |
| z-index | Elevation-4 |

**Added skill chip:**

```
┌──────────────┐
│  React    ✕  │
└──────────────┘
```

| Property | Value |
|----------|-------|
| Chip height | 28px |
| Padding | 0 Space-3 (8px) left, 0 Space-2 (4px) right |
| Radius | radius-full (14px) |
| Background | Primary-50 |
| Border | 1px solid Primary-200 |
| Text | Body-Small (13px/500), Primary-700 |
| Remove icon [✕] | 14x14px, Primary-400, hover Primary-600 |
| Transition | Scale in 150ms, fade out 150ms on remove |

### States — Step 3

| State | Visual | Behavior |
|-------|--------|----------|
| No experience entered | AI suggestions hidden | Manual input only |
| AI suggestions loading | 4 skeleton chips (80px x 32px each), shimmer | Pulse animation |
| AI suggestions loaded | Chips appear with confidence badges | Stagger in (50ms each) |
| Add skill from AI | Chip scales in (200ms) from suggestion list | Confidence badge hidden, chip style changes to "added" |
| Add skill manual | Chip appears below input (150ms) | Input clears |
| Remove skill | Chip fades out (150ms) | — |
| Duplicate skill | Input shake (200ms) + toast: "Skill already added" | Not added |
| Input focus | Primary ring | Dropdown opens if matching |
| No matches | Dropdown: "No matches found. Press Enter to add custom." | Free-text allowed |

### Bottom Bar — Step 3

| Element | State |
|---------|-------|
| Back | Enabled |
| Continue | Always enabled (skippable) |

---

## 7. Step 4: Career Interests

### Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│         Define your career direction                                │
│         Help us personalize your experience with your preferences.  │
│                                                                      │
│         ┌──────────────────────┐  ┌──────────────────────┐          │
│         │ Target Industry     │  │ Role Type            │          │
│         │ [Select ▼]          │  │ [Select ▼]           │          │
│         └──────────────────────┘  └──────────────────────┘          │
│                                                                      │
│         ┌──────────────────────┐  ┌──────────────────────┐          │
│         │ Preferred Location  │  │ Remote Preference    │          │
│         │ [Text input]        │  │ [On-site] [Hybrid]   │          │
│         │                     │  │ [Remote]             │          │
│         └──────────────────────┘  └──────────────────────┘          │
│                                                                      │
│         ┌──────────────────────┐  ┌──────────────────────┐          │
│         │ Salary Range        │  │ Willing to Relocate  │          │
│         │ [$80K] ──○── [$150K]│  │ [Yes]  [No]         │          │
│         └──────────────────────┘  └──────────────────────┘          │
│                                                                      │
│         ┌──────────────────────────────────────────────────┐        │
│         │  ✨ AI Career Path Suggestions                     │       │
│         │                                                  │        │
│         │  Based on your profile, consider:                │        │
│         │                                                  │        │
│         │  • Senior Frontend Engineer  ━━●━━━━━ 95% match │        │
│         │  • Engineering Manager       ━━●━━━━ 82% match  │        │
│         │  • Staff Engineer            ━━●━━━━ 78% match  │        │
│         └──────────────────────────────────────────────────┘        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Elements

| Layer | Element | Token | Bottom space |
|-------|---------|-------|--------------|
| 1 | "Define your career direction" | Heading-2 | Space-2 (4px) |
| 2 | "Help us personalize your experience with your preferences." | Body, Text-Secondary | Space-8 (32px) |

### Preference Fields (2-column grid)

| Grid | 2 columns, 16px gap |
|------|---------------------|

| Field | Type | Component | Required |
|-------|------|-----------|----------|
| Target Industry | Select dropdown | 40px h, chevron icon, options list (Shadow-3) | No |
| Role Type | Select dropdown | Same as Industry | No |
| Preferred Location | Text input + suggestion chips | 40px h, autocomplete city suggestions | No |
| Remote Preference | Toggle group | 3 segmented buttons (40px h each) | No |
| Salary Range | Dual range slider | Min/Max labels, track 4px, thumb 20px | No |
| Willing to Relocate | Toggle buttons | 2 buttons (Yes/No), 40px h each | No |

**Select dropdown spec:**

| Property | Value |
|----------|-------|
| Height | 40px |
| Padding | Space-4 (12px) |
| Radius | radius-sm (6px) |
| Border | 1px solid Neutral-300 |
| Background | Surface-1 |
| Chevron | 16px icon right, Text-Secondary |
| Focus | Primary-500 border + 2px ring |
| Options panel | Shadow-3, bg Surface-1, max-h 200px |

**Toggle group spec:**

| Property | Value |
|----------|-------|
| Height | 40px |
| Radius | radius-sm (6px) |
| Border | 1px solid Neutral-300 |
| Unselected bg | Transparent |
| Selected bg | Primary-600 |
| Selected text | White |
| Unselected text | Text-Secondary |
| Gap | 0 (contiguous buttons) |

**Salary slider spec:**

| Property | Value |
|----------|-------|
| Track height | 4px |
| Track bg | Neutral-200 |
| Track active | Primary-500 |
| Thumb size | 20px diameter |
| Thumb bg | White |
| Thumb border | 2px Primary-500 |
| Shadow | Shadow-1 |
| Labels | Caption (13px), Text-Secondary, below track |

### AI Career Path Suggestions Card

| Property | Value |
|----------|-------|
| Grid span | Full width (below preference fields) |
| Padding | Space-7 (24px) |
| Radius | radius-md (8px) |
| Background | Primary-50 (#EFF6FF) |
| Border | 1px solid Primary-200 |
| Shadow | Shadow-1 |
| Margin top | Space-8 (32px) |

**Card layout:**

```
┌──────────────────────────────────────────────────┐
│  ✨  AI Career Path Suggestions                   │
│                                                   │
│  Based on your profile, experience, and skills:   │
│                                                   │
│  • Senior Frontend Engineer         95% match     │
│    ████████████████████████████░░░░░              │
│                                                   │
│  • Engineering Manager              82% match     │
│    ████████████████████████░░░░░░░░░              │
│                                                   │
│  • Staff Engineer                    78% match    │
│    ████████████████████████░░░░░░░░░░             │
│                                                   │
│  Recommendations update as you add more data.     │
└──────────────────────────────────────────────────┘
```

| Element | Token | Value |
|---------|-------|-------|
| Header | Heading-4 (18px/600) | Text-Primary |
| Badge icon | ✨ | — |
| Subheader | Body-Small | Text-Secondary, italic |
| Role name | Body (15px/600) | Text-Primary |
| Match percentage | Body-Small (14px/600) | Primary-600 |
| Progress bar | 4px h, radius-xs | Primary-500 fill, Neutral-200 track |
| Update note | Caption (13px) | Text-Tertiary |

**Progress bar width per match:**

| Match % | Bar width |
|---------|-----------|
| 95% | 95% |
| 82% | 82% |
| 78% | 78% |

### States — Step 4

| State | Visual | Behavior |
|-------|--------|----------|
| Default | All fields empty/blank | Continue enabled |
| Field focus | Primary ring | Standard input behavior |
| Select open | Chevron rotates 180°, options panel | Click outside closes |
| Toggle selected | Primary-600 bg, white text | Only one active |
| Salary drag | Thumb scales to 24px (active state) | Track fills |
| AI recommendations loading | Skeleton card: 3 lines of skeleton bars (60%, 80%, 70% width) | Shimmer animation |
| AI recommendations loaded | Fade in card with stagger (100ms per role) | Progress bars animate width (400ms) |
| No AI data (Step 2+3 empty) | Card shows: "Add experience and skills to get AI career suggestions" | Subdued, no progress bars |
| Field filled | Value displays normally | — |

### Bottom Bar — Step 4

| Element | State |
|---------|-------|
| Back | Enabled |
| Continue | Text: "Complete ✦" (instead of "Continue") — Button-Primary, always enabled |

---

## 8. Completion State

### Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                    ┌──────────────────────┐                         │
│                    │       ✓ (64px)       │                         │
│                    │   Checkmark circle   │                         │
│                    └──────────────────────┘                         │
│                                                                      │
│                     You're all set!                                 │
│              Your personalized career dashboard                      │
│                    is ready for you.                                 │
│                                                                      │
│              [ Go to Dashboard ▸ ]                                  │
│                                                                      │
│             Auto-redirecting in 3... 2... 1...                      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Elements

| Layer | Element | Token | Bottom space |
|-------|---------|-------|--------------|
| 1 | Checkmark circle animation | 64px, Success-500 bg, white check | Space-7 (24px) |
| 2 | "You're all set!" | Heading-2 (28px/650) | Space-2 (4px) |
| 3 | "Your personalized career dashboard is ready for you." | Body, Text-Secondary | Space-8 (32px) |
| 4 | "Go to Dashboard ▸" button | Button-Primary (200px x 48px) | Space-5 (16px) |
| 5 | "Auto-redirecting in 3..." countdown | Caption (13px), Text-Tertiary | 0 |

### Checkmark Animation Sequence

| Step | Time | Element | Animation |
|------|------|---------|-----------|
| 1 | 0ms | Circle background | Scale 0 → 1 (300ms, ease-out) |
| 2 | 200ms | Circle fill | bg white → Success-500 (300ms) |
| 3 | 300ms | Checkmark | Draw path (400ms, stroke-dashoffset) |
| 4 | 400ms | Heading | translateY(15px) → 0, opacity 0 → 1 (300ms) |
| 5 | 500ms | Subtitle | Same as heading, 100ms delay |
| 6 | 600ms | Button | Fade in + translateY(10px) (300ms) |
| 7 | 1000ms | Countdown | Appears, starts counting 3...2...1 |
| 8 | 4000ms | Auto-redirect | Navigate to /dashboard |

---

## 9. Loading States

| State | Trigger | Visual | Duration |
|-------|---------|--------|----------|
| Step transition | Continue/Back click | Content crossfade (150ms out, 200ms in) | 350ms total |
| Skill suggestions (Step 3) | Step 2 complete → Step 3 | 4 skeleton chips (80px x 32px), shimmer, 50ms stagger | Until AI responds |
| AI recommendations (Step 4) | Step 4 mount | Skeleton card: title bar (60% x 20px), 3 skeleton lines (80%, 60%, 70% width x 16px) | Until AI responds |
| Add experience (Step 2) | Form submit | Card skeleton appears in list (200ms) | Until save confirms |
| CV upload | File selected | Progress bar (4px, Primary-500, indeterminate) + filename | Until parse complete |
| LinkedIn import | Button click | Popup + button spinner | Until OAuth completes |
| Completion animation | All steps complete | 1s animated sequence | 1000ms |

### Skeleton Specifications

| Component | Shape | Animation |
|-----------|-------|-----------|
| Skill chip | 80px x 32px, radius-full | shimmer 1.5s |
| Recommendation card | 100% width x 140px, radius-md, inner skeleton lines | shimmer 1.5s |
| Experience card | 100% width x 80px, radius-md | shimmer 1.5s |

---

## 10. Error States

| Error | Trigger | Display | Recovery |
|-------|---------|---------|----------|
| Field validation | Invalid/blur | Inline error below field (Caption, Danger-500) | User corrects |
| Save progress failure | API error | Toast: "Could not save progress. Your data is safe." (Warning-500) | Auto-retry (3 attempts) |
| Network loss | Offline | Banner at top: "No internet — changes saved locally" (Warning-500 strip, 36px h) | Auto-dismiss on reconnect |
| Skill taxonomy fail | API error on autocomplete | Free-text input allowed as fallback | — |
| CV upload fail | File too large / corrupt | Toast: "Could not read file. Try a different format." | Re-select file |
| LinkedIn import fail | OAuth error | Toast: "Could not connect to LinkedIn. Try again." | Retry button |
| Duplicate skill | Add existing skill | Input shake (200ms) + toast: "Skill already added" | Not added |
| Session expiry | Token invalid mid-flow | Redirect to Login, progress saved | Re-authenticate + return |

---

## 11. Empty States

| Section | State | Visual |
|---------|-------|--------|
| Experience list (Step 2) | No entries | Empty state card: 80px illustration + "Add your first work experience" heading + Body-Small description + "Add Experience" CTA |
| AI suggestions (Step 3) | No experience data | Hidden entirely |
| AI suggestions (Step 3) | Experience exists but no skills extracted | "AI couldn't extract skills. Add them manually below." — neutral message |
| Added skills (Step 3) | No entries | "No skills added yet. Use AI suggestions or type above." |
| Skills (Step 3) | Both empty + no experience | Manual input only, no messaging needed |
| AI recommendations (Step 4) | No experience/skills | Subdued card: "Add experience and skills to get AI career path suggestions" with icon |
| AI recommendations (Step 4) | Data exists but no match | Card: "We're analyzing your profile. Check back later for suggestions." |

---

## 12. Accessibility

| Element | Requirement | ARIA |
|---------|-------------|------|
| Stepper | `role="navigation"` | `aria-label="Setup progress"` |
| Active step | — | `aria-current="step"` |
| Step labels | Each step has visible label + screen reader text | `aria-label="Step 1: Goal, active"` |
| Step changes | Focus moves to section heading on transition | `tabindex="-1"` on `h2`, `.focus()` |
| Goal cards | Radio group | `role="radiogroup"`, each card `role="radio"`, `aria-checked` |
| Experience list | List of items | `role="list"`, each card `role="listitem"` |
| Form fields | Explicit `<label>` | `autocomplete` attributes per field |
| Error messages | Linked to field | `aria-describedby="[field]-error"` |
| Error container | Live region | `aria-live="polite"` |
| Skill chips | Removable tags | `role="listitem"`, remove button `aria-label="Remove [skill]"` |
| AI suggestions | Confidence announced | `aria-label="AI suggested skill: [skill]. Confidence: [percent] percent"` |
| Progress indication | "Step 2 of 4: Experience" | Live region `aria-live="polite"`, announces on change |
| Bottom bar buttons | Descriptive | `aria-label="Continue to next step"`, `aria-label="Go back to previous step"` |
| Skip link | Top of page | "Skip to main content" |
| Focus management | No focus trap | Tab moves through form → bottom bar → back to form |
| Completion animation | Respect `prefers-reduced-motion` | Skip animation, show static checkmark |

---

## 13. Keyboard Navigation

| Key | Step 1 | Step 2 | Step 3 | Step 4 |
|-----|--------|--------|--------|--------|
| Tab | Cards → Skip → Back → Continue | Import → List → Add btn → Back → Continue | Suggestions → Input → Chips → Back → Continue | Fields → AI card → Back → Continue |
| Enter | Select focused card + continue | Submit add form / continue | Add skill / continue | Continue to complete |
| Escape | Deselect card | Close form / close dropdown | Close dropdown, deselect | Close dropdown |
| Arrow keys | Navigate cards (up/down/left/right) | Navigate list items | Navigate suggestion chips | Navigate toggle groups |
| Space | Select focused card | Toggle current checkbox | Add highlighted suggestion | Toggle Yes/No |
| Tab (Shift) | Reverse order | Reverse order | Reverse order | Reverse order |
| Ctrl+Z | — | — | Undo last skill addition | — |

---

## 14. Responsive Behavior

| Element | Mobile (<768px) | Tablet (768–1023px) | Desktop (1024px+) |
|---------|-----------------|---------------------|-------------------|
| Stepper | Vertical compact list (label + dot, 40px per step) | Horizontal, 4 circles + labels | Horizontal, full |
| Content width | 100% (margin Space-5) | 624px (center) | 720px (center) |
| Goal cards | 1-column stack | 2x2 grid | 2x2 grid |
| Goal card width | 100% | 344px | 344px |
| Experience form | Single column | 2-column fields | 2-column fields |
| Skill suggestions | Scrollable horizontal row | Flex wrap | Flex wrap |
| Skill input | Full width | 100% | 100% |
| Interests fields | Single column, stacked | 2-column grid | 2-column grid |
| AI recommendations | Below fields (full width) | Right panel (optional) | Full width below |
| Padding top (content) | Space-7 (24px) | Space-9 (40px) | Space-9 (40px) |
| Bottom bar | Fixed, full width | Fixed, max 720px | Fixed, max 720px |

### Mobile Stepper (Vertical Compact)

```
Step 1: Goal          ●  (active)
Step 2: Experience    ○
Step 3: Skills        ○
Step 4: Interests     ○
```

| Property | Value |
|----------|-------|
| Padding | Space-4 vertical per step |
| Dot size | 12px |
| Active dot | Primary-600 filled |
| Completed dot | Primary-500 with check |
| Upcoming dot | Neutral-300 |
| Label | Body-Small (14px), left of dot |

---

## 15. AI Integration — Per Step

| Step | Feature | Trigger | Visual Behavior | Loading |
|------|---------|---------|-----------------|---------|
| Step 2 | LinkedIn/CV import suggestion | First visit to Step 2 | Subtle pulsing glow on Import button (Primary-200, 2s cycle) | — |
| Step 3 | Skill extraction from experience | Step 3 mount with experience data | AI chips appear with confidence badges, staggered entrance | 4 skeleton chips (shimmer) |
| Step 3 | Skill deduplication | Manual entry of existing skill | Input shake (200ms) + toast notification | — |
| Step 4 | Career path recommendation | Step 4 mount | AI card with 2-3 role suggestions + progress bars | Skeleton card |
| Step 4 | Real-time re-evaluation | Field change (industry/role) | Card content refreshes with crossfade (200ms) | Soft shimmer on card |
| All | Progress persistence | Every field change | Silent auto-save (no visual) | — |

### AI Confidence Visual Language

| Confidence | Visual | Color |
|------------|--------|-------|
| 90-100% | Strong bar + Primary badge | Primary-500 |
| 70-89% | Medium bar + Warning badge | Warning-500 |
| < 70% | Shorter bar + subdued badge | Neutral-500 |

---

## 16. Future Expansion

| Feature | Phase | Notes |
|---------|-------|-------|
| LinkedIn/Google profile import | Phase 2 | Pre-fill all steps from OAuth data |
| Skill assessment integration | Phase 4 | In-line quizzes, proficiency levels |
| Learning path recommendation from interests | Phase 5 | Course suggestions post-onboarding |
| Mentor matching after onboarding | Phase 6 | Suggest mentors based on goals + industry |
| Video introduction setup | Phase 7 | Record/upload 30s intro during onboarding |
| Company preferences (size, culture) | Phase 3 | Additional Step 4 fields |
| Resume upload → full auto-fill | Phase 2 | Parse entire CV → fill Steps 2-4 |
| Multi-language onboarding | Phase 6 | i18n for all content + AI suggestions |

---

## 17. Design Token Inheritance Reference

| Category | Token Source | Applied To |
|----------|--------------|------------|
| Color | DP-1:Color | All backgrounds, borders, text, rings, badges |
| Typography | DP-1:Type | Headings, body, captions, labels |
| Spacing | DP-1:Space | Card padding, field gaps, stepper spacing |
| Radius | DP-1:Radius | Cards (md), fields (sm), chips (full) |
| Elevation | DP-1:Elev | Bottom bar (2), dropdown (3), cards (1) |
| Glass | DP-1:Glass | Bottom bar background |
| Motion | DP-8:All | Step transitions, chip entry, completion animation, skeleton |
| Components | DP-3:All | Input fields, buttons, select, toggle, checkbox, chips |
| AI visual language | DP-5:AI | Confidence badges, suggestion styling, AI card |

---

*Cross-references: DP-7:Onboarding, DP-8:Page-Transitions, DP-8:Loading-System, DP-8:Micro-Interactions, DP-8:AI-Interactions, DP-6:Screen (Onboarding), DP-5:AI (Confidence, Suggestions), DP-1:All*
