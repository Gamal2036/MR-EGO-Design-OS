# Prototype Guidelines — Visual Specification

**Phase:** DP-9 (Visual Prototype System)
**Version:** 1.0
**Status:** COMPLETE
**Design Authority:** DP-0 through DP-8
**Inherits:** DP-1 Design Language (Grid, Spacing, Elevation, Glass), DP-2 Design System, DP-3 Component Library, DP-4 Application Shell

---

## 1. Layout Principles

### Principle 1: Grid Alignment

All content aligns to the 12/8/4 column grid per breakpoint. No content starts outside the grid.

| Device | Columns | Gutter | Margin |
|--------|---------|--------|--------|
| Phone | 4 | 16px | 16px |
| Tablet | 8 | 24px | 24px |
| Laptop | 12 | 24px | 32px |
| Desktop | 12 | 24px | 32px |
| Ultra Wide | 12 | 24px | 48px |

### Principle 2: Consistent Spacing Hierarchy

All spacing uses 8px base increments (Space-3 = 8px, Space-5 = 16px, Space-7 = 24px, Space-8 = 32px, Space-10 = 48px, Space-12 = 64px, Space-14 = 128px).

### Principle 3: Maximum 3 Elevation Layers Visible

No more than three elevation layers are visible simultaneously to maintain visual depth without confusion. The page background (Layer 0), a card surface (Layer 1), and one floating element (Layer 3 or 5) is the maximum.

| Allowed Combination | Example |
|---------------------|---------|
| 0 + 1 + 3 | Background + Cards + Modal |
| 0 + 1 + 4 | Background + Cards + Tooltip |
| 0 + 1 + 5 | Background + Cards + Overlay |
| 0 + 2 + 5 | Background + Dropdown + Overlay |
| NOT allowed | 1 + 2 + 3 + 4 (too many layers) |

### Principle 4: Content Max-Width Constraints

| Container Type | Max Width | Usage |
|----------------|-----------|-------|
| Narrow | 720px | Reading content, AI messages, forms |
| Standard | 1140px | Most page content, dashboard |
| Wide | 1440px | Data-heavy pages, full-width layouts |

### Principle 5: Default Layout Templates

**Authenticated Layout:**
```
┌──────────────────────────────────────┐
│  TOPBAR (56px)                       │
├──────────┬───────────────────────────┤
│ SIDEBAR  │  CONTENT                  │
│ (240px)  │  (centered within grid)   │
└──────────┴───────────────────────────┘
```

**Unauthenticated Layout:**
```
┌──────────────────────────────────────┐
│  NAV BAR (56px)                      │
├──────────────────────────────────────┤
│                                      │
│  ┌─────────────────────────────┐     │
│  │   CENTERED CARD             │     │
│  │   max 440px width           │     │
│  └─────────────────────────────┘     │
│                                      │
└──────────────────────────────────────┘
```

---

## 2. Composition Rules

### Rule 1: Page Header Pattern

Every content page begins with a page header:

```
┌──────────────────────────────────────────────┐
│ Page Title (Heading-1 or Heading-2)          │
│ Optional description (Body, Text-Secondary)  │
│ [Action 1] [Action 2]           [View All →] │
│ ──────────────────────────────────────────── │
│                                              │
```

| Element | Spec |
|---------|------|
| Title | Heading-1 (36px) or Heading-2 (28px) based on page hierarchy |
| Description | Body (15px), Text-Secondary, 300px–540px max width |
| Actions | Primary + Secondary buttons, right-aligned |
| Bottom border | Optional 1px Neutral-300 divider |
| Padding below | Space-7 (24px) |

### Rule 2: Section Purpose & Priority

Every section serves exactly one purpose. Sections with higher priority appear first in the reading order.

| Priority | Section Type | Position |
|----------|-------------|----------|
| P0 | User's primary goal (dashboard stats, message thread, CV editor) | Top of content |
| P1 | AI recommendations, suggestions, insights | Second, or side panel |
| P2 | Related content, history, activity feed | Below P0/P1 |
| P3 | Settings, preferences, meta actions | Bottom or menu |
| P4 | Help, tips, onboarding hints | Hidden or minimized |

### Rule 3: Content Density

Three density modes switchable by user preference:

| Density | Card Padding | Section Gap | Line Height | Font Size |
|---------|-------------|-------------|-------------|-----------|
| Comfortable (default) | 24px | 32px | 1.6 | 15px |
| Compact | 16px | 20px | 1.4 | 14px |
| Dense | 12px | 16px | 1.3 | 13px |

Density switch lives in Settings > Appearance. Defaults to Comfortable for all new users and for Phone devices.

### Rule 4: Empty States

Every content area that can be empty follows this pattern:

```
┌──────────────────────────────────────┐
│                                      │
│       [Illustration / Icon]         │
│                                      │
│      No items yet (Heading-4)       │
│                                      │
│   Description of what to do next.   │
│   (Body, Text-Secondary, centered)  │
│                                      │
│   [Primary CTA button]              │
│                                      │
└──────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| Icon/Illustration | 64–120px, Neutral-300, centered |
| Heading | Heading-4 (18px), Text-Primary, centered |
| Description | Body (15px), Text-Secondary, max 360px, centered |
| CTA | Primary button or Text-Link |
| Top padding | Space-14 (128px) |
| Bottom padding | Space-14 (128px) |

### Rule 5: Loading States

Content areas use skeleton patterns during loading:

```
┌──────────────────────────────────────┐
│ ┌────────────────────────────┐       │
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░  │       │  ← skeleton bar
│ │ ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░  │       │     (shimmer animation)
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░  │       │
│ └────────────────────────────┘       │
└──────────────────────────────────────┘
```

| Property | Spec |
|----------|------|
| Skeleton base | Neutral-200 bg |
| Shimmer | Linear gradient overlay, 120deg, Neutral-100 to Neutral-200 |
| Animation | Shimmer sweep 1500ms, infinite |
| Height | Matches content height it replaces |
| Border radius | 4px for bars, 8px for card outlines |
| Text lines | 3–5 bars, last bar 60% width |

### Rule 6: Error States

| Error Type | Pattern | Retry |
|------------|---------|-------|
| Widget error | Inline card within widget: "Could not load data" + [Retry] | Inline button |
| Section error | Section replaced with error card: "Unable to load [section name]" + [Retry] | Inline button |
| Full page error | Centered error page: icon + heading + description + [Go Back] + [Try Again] | Both options |
| API failure | Toast notification at top: "Connection error" + [Retry] | Toast action |
| Offline | Banner at top: "You're offline. Some features may be unavailable." | Dismiss |

---

## 3. Component Placement Rules

### 3.1 Button Hierarchy

| Priority | Style | Usage | Contrast |
|----------|-------|-------|----------|
| Primary | Filled Primary-600 bg, white text | Main action per page | High |
| Secondary | Outline, Primary-600 border + text | Alternative action | Medium |
| Tertiary | Ghost/text, Primary-600 text | Subtle action | Low |
| Destructive | Filled Red-600 bg, white text | Delete/remove | High |
| AI Action | Primary-50 bg, Primary-700 text | Accept AI suggestion | Medium |

### 3.2 AI Components

| Element | Placement | Visual Signature |
|---------|-----------|-----------------|
| AI Suggestion Card | Below relevant content or in side panel | Primary-50 bg, Primary-200 dashed border, 3px left accent bar |
| AI Badge | Top-left or top-right of AI component | Primary-100 bg, Primary-700 text |
| Confidence Indicator | Below or beside AI content | Primary-500/300 bar + label |
| Reasoning Panel | Below AI suggestion, expandable | Chevron toggle, sourced list |
| AI Match Score | On recommendation cards | 56px radial gauge or bars |

### 3.3 Floating Elements

| Element | Position | Elevation | Size |
|---------|----------|-----------|------|
| Floating AI button | Bottom-right, 24px from edge | Layer 3 | 56px (48px phone) |
| Command Palette | Centered overlay | Layer 5 | 560px width, max 80vh |
| Global Search | Centered overlay or full screen (phone) | Layer 5 | 640px width (desktop) |
| AI panel (floating) | Right side, slide-over | Layer 3 | 320px width |

### 3.4 Drawers & Panels

| Element | Position | Width | Elevation | Animation |
|---------|----------|-------|-----------|-----------|
| Sidebar drawer (mobile) | Left slide-in | 280px | Layer 3 | 250ms ease-out |
| AI panel (tablet) | Right slide-over | 320px | Layer 3 | 250ms ease-out |
| Filter drawer | Left or right slide-in | 280px | Layer 3 | 250ms ease-out |
| Bottom sheet (mobile) | Bottom slide-up | 100% (60–85% height) | Layer 3 | 300ms ease-out |
| Backdrop | Full screen behind drawer | 100% | Layer 2 | 200ms fade |

### 3.5 Modals

| Property | Spec |
|----------|------|
| Max width | 640px (standard), 480px (confirmation), 800px (large) |
| Background | Glass: rgba(255,255,255,0.72), blur 8px |
| Elevation | Layer 3 |
| Position | Center of viewport (horizontal + vertical) |
| Radius | 12px (Radius-Lg) |
| Close | X button top-right + Escape + backdrop tap |
| Animation | Scale 0.95→1 + fade 0→1, 200ms ease-out |
| Padding | 32px (Space-8) |
| Mobile adaptation | Full-screen sheet, no backdrop |

### 3.6 Dialogs (Confirmation)

| Property | Spec |
|----------|------|
| Max width | 480px |
| Pattern | Icon + Title + Description + [Cancel] [Confirm] |
| Confirm | Primary-600 for non-destructive, Red-600 for destructive |
| Cancel | Secondary outline button |
| Elevation | Layer 3 |
| Backdrop | Glass: rgba(255,255,255,0.72), blur 8px |
| Accessibility | Focus trap, Escape to close, aria-modal |

### 3.7 Tooltips & Popovers

| Element | Elevation | Padding | Radius |
|---------|-----------|---------|--------|
| Tooltip | Layer 4 | 6px 10px | 4px |
| Popover | Layer 4 | 16px | 8px |
| Dropdown | Layer 3 | 8px 0 | 8px |

---

## 4. Progressive Disclosure

### 4.1 Content Hierarchy

| Level | Visibility | Content Type |
|-------|------------|-------------|
| Always visible | Primary content, page header, main actions | P0 |
| One click | Accordion panels, tab content, expandable sections | P1–P2 |
| Two clicks | Settings panels, advanced options, history | P3 |
| Hidden / search | Help, tips, keyboard shortcuts, meta info | P4 |

### 4.2 AI Disclosure Pattern

| Level | Visibility | Element |
|-------|------------|---------|
| Always visible | AI suggestion summary, confidence indicator | Main suggestion |
| One click | Reasoning panel, source citations | Expandable panel |
| Two clicks | Full AI settings, model info, feedback | Settings > AI |

### 4.3 Destructive Action Confirmation

Every destructive action follows this pattern:

| Step | UI |
|------|----|
| 1. Initiate | User clicks Delete/Remove |
| 2. Confirm | Dialog: "Are you sure?" + description of what will happen |
| 3. Verify | Optional: type "DELETE" to confirm (highly destructive only) |
| 4. Execute | Primary action becomes destructive style |
| 5. Undo | Toast with undo option, 5s window |

---

## 5. Touch Target Specification

### 5.1 Minimum Sizes

| Element | Desktop | Mobile (Phone/Tablet) |
|---------|---------|----------------------|
| Button | 36px height | 44px height |
| Icon button | 36px × 36px | 44px × 44px |
| List item | 36px height | 44px height |
| Input field | 36px height | 44px height |
| Link (inline) | No minimum | 44px tap area (padding) |
| Tab (bottom nav) | — | 56px height |
| Switch/Toggle | 20px × 20px | 28px × 28px |
| Chip/Tag | 28px height | 36px height |
| Radio / Checkbox | 16px × 16px | 20px × 20px |

### 5.2 Touch Target Gaps

| Context | Minimum Gap |
|---------|-------------|
| Between buttons in a row | 8px |
| Between icon buttons | 8px |
| Between list items | 4px visual, 8px touch |
| Between tabs | 0px (tab bar), separate touch regions |
| Between cards | 16px |
| Bottom tab items | 0px (flush), 44px+ each |

### 5.3 Hit Area Expansion

When a visual element is smaller than the minimum touch target, expand its hit area with invisible padding:

| Visual Size | Required Hit Area | Invisible Padding |
|-------------|-------------------|-------------------|
| 28px chip | 44px | 8px each side |
| 20px icon | 44px | 12px each side |
| 16px checkbox | 44px | 14px each side |
| Inline link | 44px | 14px top/bottom, 4px sides |

---

## 6. Glass Usage Rules

### 6.1 Allowed Glass Applications

| Element | Glass Type | Opacity | Blur | Elevation |
|---------|-----------|---------|------|-----------|
| Topbar (authenticated) | Navigation | 0.85 | 12px | Layer 1 |
| Nav bar (landing) | Navigation | 0.85 | 12px | Layer 1 |
| Modal backdrop | Backdrop | 0.60 | 8px | Layer 2 |
| Command palette bg | Backdrop | 0.60 | 8px | Layer 4 |
| Search overlay bg | Backdrop | 0.50 | 8px | Layer 4 |
| Bottom tab bar (phone) | Navigation | 0.85 | 12px | Layer 1 |

### 6.2 Prohibited Glass Applications

| Element | Reason |
|---------|--------|
| Cards | Reduces readability, creates visual noise |
| Buttons | Obscures affordance, accessibility issue |
| Input fields | Reduces contrast, difficult to focus |
| Text containers | Readability failure |
| AI suggestion cards | Must have solid background for contrast |
| Sidebar | Must be solid for navigation stability |
| Modals (container) | Must be solid, only backdrop is glass |
| Alert banners | Must be solid for attention |

### 6.3 Glass Implementation

```css
/* Navigation glass */
background: rgba(255, 255, 255, 0.85);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border-bottom: 1px solid rgba(0, 0, 0, 0.08);

/* Modal backdrop */
background: rgba(255, 255, 255, 0.60);
backdrop-filter: blur(8px);
-webkit-backdrop-filter: blur(8px);
```

### 6.4 Dark Mode Glass Adjustments

| Mode | Glass Color | Opacity | Blur |
|------|-------------|---------|------|
| Light | rgba(255,255,255,x) | Per type | Per type |
| Dark | rgba(30,30,35,x) | Navigation: 0.80, Backdrop: 0.70 | Same |

---

## 7. Typography Guidelines

### 7.1 Heading Hierarchy

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Display | 48px | 700 | 1.1 | Hero, landing pages |
| Heading-1 | 36px | 700 | 1.15 | Page titles |
| Heading-2 | 28px | 650 | 1.2 | Section headers |
| Heading-3 | 22px | 600 | 1.25 | Card headers |
| Heading-4 | 18px | 600 | 1.3 | Subsection headers |
| Body | 15px | 400 | 1.6 | Primary reading text |
| Body-Small | 14px | 400 | 1.5 | Secondary reading |
| Caption | 13px | 400 | 1.4 | Labels, metadata |
| Overline | 12px | 600 | 1.3 | Section labels (uppercase) |
| Button | 14px | 500 | 1.0 | Button labels |

### 7.2 Line Length

| Context | Max Characters Per Line | Max Width |
|---------|------------------------|-----------|
| Reading content (body) | 70 | ~600px |
| AI messages | 80 | ~640px |
| Form labels + inputs | 60 | ~480px |
| Sidebar nav | 25 | 240px |
| Cards | 50 | ~400px |

### 7.3 Font Stack

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
             Roboto, 'Helvetica Neue', Arial, sans-serif;
```

---

## 8. Spacing & Alignment Rules

### 8.1 Vertical Rhythm

| Context | Gap |
|---------|-----|
| Between sections (same page) | Space-10 (48px) |
| Between cards in a grid | Space-5 (16px) |
| Between related elements | Space-3 (8px) |
| Between heading and body | Space-3 (8px) |
| Between label and input | Space-3 (8px) |
| Between button and next element | Space-5 (16px) |
| Page header to first section | Space-7 (24px) |

### 8.2 Horizontal Alignment

| Context | Alignment |
|---------|-----------|
| All text | Left-aligned (LTR) |
| Labels | Left of their inputs |
| Action buttons | Right-aligned in page headers |
| Card content | Left-aligned |
| Number/stat | Right-aligned |
| Icons with text | Centered vertically |
| Page content | Start of grid column |

### 8.3 Centering Rules

| Context | Method |
|---------|--------|
| Page content (standard width) | margin: 0 auto, max-width: 1140px |
| Modals | Fixed position, transform: translate(-50%, -50%) |
| Empty states | Flexbox, center both axes |
| Hero sections | Flexbox, center content |
| Single-input forms | max-width: 400px, margin: 0 auto |

---

## 9. Dark Mode Specifications

### 9.1 Surface Colors

| Token | Light | Dark |
|-------|-------|------|
| Surface-0 | Neutral-50 (#F8FAFC) | Neutral-950 (#0A0A0B) |
| Surface-1 | #FFFFFF | Neutral-900 (#17171A) |
| Surface-2 | Neutral-100 (#F1F5F9) | Neutral-800 (#27272A) |
| Surface-3 | Neutral-200 (#E2E8F0) | Neutral-700 (#3F3F46) |

### 9.2 Text Colors

| Token | Light | Dark |
|-------|-------|------|
| Text-Primary | Neutral-900 (#0F172A) | Neutral-100 (#F1F5F9) |
| Text-Body | Neutral-800 (#1E293B) | Neutral-200 (#E2E8F0) |
| Text-Secondary | Neutral-600 (#64748B) | Neutral-400 (#A1A1AA) |
| Text-Tertiary | Neutral-400 (#94A3B8) | Neutral-500 (#71717A) |
| Text-Inverse | #FFFFFF | #0F172A |

### 9.3 AI Colors (Dark Mode)

| Token | Light | Dark |
|-------|-------|------|
| Primary-50 | #EFF6FF | #1E3A5F (adjusted for dark) |
| Primary-100 | #DBEAFE | #1E40AF |
| Primary-200 | #BFDBFE | #1D4ED8 |
| Primary-300 | #93C5FD | #60A5FA |
| Primary-400 | #60A5FA | #93C5FD |
| Primary-500 | #3B82F6 | #60A5FA |
| Primary-600 | #2563EB | #93C5FD |
| Primary-700 | #1D4ED8 | #BFDBFE |

### 9.4 Shadow Adjustments (Dark Mode)

| Layer | Light | Dark |
|-------|-------|------|
| 0 | None | None |
| 1 | 0 1px 3px rgba(0,0,0,0.08) | 0 1px 3px rgba(0,0,0,0.4) |
| 2 | 0 4px 12px rgba(0,0,0,0.08) | 0 4px 12px rgba(0,0,0,0.5) |
| 3 | 0 8px 24px rgba(0,0,0,0.12) | 0 8px 24px rgba(0,0,0,0.6) |
| 4 | 0 12px 32px rgba(0,0,0,0.12) | 0 12px 32px rgba(0,0,0,0.7) |
| 5 | 0 24px 48px rgba(0,0,0,0.16) | 0 24px 48px rgba(0,0,0,0.8) |

---

## 10. Accessibility Guidelines

### 10.1 Color Contrast

| Combination | Minimum Ratio |
|-------------|---------------|
| Text on background | 4.5:1 (body), 3:1 (large text ≥24px) |
| UI components | 3:1 |
| Focus indicators | 3:1 against adjacent colors |
| Placeholder text | 4.5:1 (minimum) |

### 10.2 Focus Indicators

| Element | Indicator |
|---------|-----------|
| All interactive | 2px solid Primary-500 outline, 2px offset |
| Buttons | Primary-500 ring |
| Input fields | Primary-500 border + ring |
| Links | Underline + Primary-500 color change |
| Cards (tappable) | Primary-500 border + slight scale 1.01 |

### 10.3 Reduced Motion

When `prefers-reduced-motion: reduce` is set:
- Disable all animations (shimmer, pulse, rotate)
- Set transition duration to 0ms
- Keep opacity changes (instant)
- Keep color changes (instant)
- Transform animations become instant

### 10.4 Screen Reader Support

| Requirement | Implementation |
|-------------|---------------|
| All images have alt text | alt="Description of image" |
| Icon buttons have aria-label | aria-label="Search" |
| Form inputs have labels | `<label>` or aria-label |
| Status updates use role="status" | Status announcements |
| Navigation landmarks | `<nav aria-label="Main">` |
| Skip to content link | First focusable element |

---

## 11. Implementation Handoff Checklist

Every page spec in this directory must satisfy:

| Requirement | Standard |
|-------------|----------|
| No design decisions remaining | Engineer can implement without asking designer |
| All states documented | Default, hover, active, focus, disabled, loading, empty, error |
| All breakpoints covered | Phone, Tablet, Laptop, Desktop, Ultra Wide |
| Spacing values explicit | Not relative — exact px values |
| Color tokens referenced | DP-1 token names, not hex (except where new) |
| Typography tokens referenced | DP-1 token names |
| Elevation layer specified | Layer 0–5 per element |
| Glass application ruled | Yes/no per surface |
| AI components styled | Per AI-Visual-System.md |
| Touch targets sized | Per this document section 5 |
| Accessibility applied | ARIA, contrast, keyboard |
| Cross-references valid | No orphan specs |

---

*End of Prototype Guidelines. All prototype specifications in this directory comply with these guidelines. This document is the single source of truth for layout, composition, and component placement across all DP-9 prototypes.*
