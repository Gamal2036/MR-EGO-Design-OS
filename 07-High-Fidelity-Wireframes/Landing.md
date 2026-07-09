# Landing Page — High-Fidelity Wireframe

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:Screen (Landing), DP-4:Layout (Authentication Layout), DP-1:All

---

## Purpose

Introduce MR:EGO's value proposition and convert first-time visitors into registered users. Single-scroll marketing page with no sidebar, no authenticated chrome.

---

## Layout Overview

```
┌──────────────────────────────────────────────────────────────┐
│  NAV BAR (56px fixed glass)                                   │
│  Logo(140x32)                 Sign In  |  Get Started ▸      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  HERO SECTION (min 520px, centered, 12-col)                  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Heading: "Your AI Career Operating System"            │  │
│  │  Subheading (2 lines, max 600px centered)              │  │
│  │  [Start Your Journey ▸]  [Learn More ▼]               │  │
│  │  Trust bar: "Trusted by 10,000+ professionals"        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  FEATURES SECTION (Space-14 vertical padding)                │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐              │
│  │Smart CV│ │AI Job  │ │Career  │ │App     │              │
│  │Builder │ │Search  │ │Track   │ │Tracker │              │
│  │icon    │ │icon    │ │ icon   │ │ icon   │              │
│  └────────┘ └────────┘ └────────┘ └────────┘              │
│                                                              │
│  AI SHOWCASE SECTION (Space-14 padding)                      │
│  Visual mockup of AI Workspace + description                 │
│                                                              │
│  TESTIMONIALS (Space-14 padding)                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                   │
│  │ Testimonial cards, 3-column grid                         │
│  └──────────┘ └──────────┘ └──────────┘                   │
│                                                              │
│  FINAL CTA SECTION (Space-14 padding)                        │
│  "Ready to transform your career?"                          │
│  [Start Your Journey ▸]                                     │
│                                                              │
│  FOOTER (Space-10 padding)                                   │
│  Logo  |  Product  |  Resources  |  Legal                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 1. Navigation Bar

| Property | Value |
|----------|-------|
| Type | Fixed glass navigation |
| Height | 56px |
| Background | Glass-BG (rgba(255,255,255,0.72)) + backdrop-blur 12px |
| Border | Glass-Border bottom (1px) |
| z-index | Elevation-1 |
| Padding | 0 Space-8 (32px horizontal) |

### Elements

**Left group:**
| Element | Size | Position |
|---------|------|----------|
| Logo | 140px x 32px | Left, Space-3 from edge |

**Right group:**
| Element | Size | Spacing | Token |
|---------|------|---------|-------|
| "Sign In" link | Auto | Space-5 right of button | Text-Link, Body-Small |
| "Get Started" button | Auto (min 120px x 40px) | Right edge | Button-Primary, Body (Button) |

---

## 2. Hero Section

| Property | Value |
|----------|-------|
| Height | Min 520px (flexible, fills viewport - nav) |
| Content max width | 720px (narrow) centered |
| Padding top | Space-11 (64px) |
| Padding bottom | Space-10 (48px) |
| Background | Surface-0 |
| Grid span | 12/12 centered |

### Elements (top to bottom):

**Eyebrow label:**
| Property | Value |
|----------|-------|
| Text | "AI-Powered Career Platform" |
| Style | Overline token (12px, 600 weight, 0.04em tracking) |
| Color | Primary-600 |
| Spacing bottom | Space-3 (8px) |
| Alignment | Center |

**Main heading:**
| Property | Value |
|----------|-------|
| Type | Display (48px, 700 weight, line-height 1.1) |
| Color | Text-Primary |
| Max width | 720px |
| Alignment | Center |
| Spacing bottom | Space-5 (16px) |

**Subheading:**
| Property | Value |
|----------|-------|
| Type | Body-Large (16px, 450 weight, line-height 1.6) |
| Color | Text-Secondary |
| Max width | 540px |
| Alignment | Center |
| Spacing bottom | Space-8 (32px) |

**Primary CTA button:**
| Property | Value |
|----------|-------|
| Type | Button-Primary |
| Size | 180px x 48px |
| Text | "Start Your Journey" |
| Icon | Arrow right (16px) |
| Radius | radius-md (8px) |
| Shadow | Shadow-1 |

**Secondary CTA:**
| Property | Value |
|----------|-------|
| Type | Button-Secondary (outline) |
| Size | 140px x 48px |
| Text | "Learn More" (anchor to features) |
| Spacing left | Space-4 (12px) |

**Trust bar:**
| Property | Value |
|----------|-------|
| Type | Caption (13px) |
| Text | "Trusted by 10,000+ professionals at leading companies" |
| Color | Text-Tertiary |
| Spacing top | Space-9 (40px) |
| Accompaniment | 3-4 company logo marks (24px height each, Space-4 gap) |

### Visual Hierarchy (Hero):
1. **Primary Focus:** Main heading — largest type, highest contrast
2. **Secondary Focus:** Subheading — guides understanding
3. **Tertiary Focus:** Primary CTA button — blue accent draws eye
4. **Supporting:** Trust bar — social proof reinforcement

---

## 3. Features Section

| Property | Value |
|----------|-------|
| Padding | Space-14 top and bottom (128px) |
| Background | Surface-1 (slight elevation from hero) |
| Max width | 1140px (standard) centered |
| Grid | 4-column feature card grid |

### Section Header:
| Property | Value |
|----------|-------|
| Type | Heading-2 (28px, 650 weight) |
| Alignment | Center |
| Spacing bottom | Space-10 (48px) |

### Feature Cards (4-column grid):
| Property | Value |
|----------|-------|
| Layout | 3/12 each (4 cards) on desktop |
| Gap | Space-7 (24px) grid gap |
| Min card width | 260px |

**Each feature card:**
| Property | Value |
|----------|-------|
| Padding | Space-7 (24px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | Border-Default (1px) |
| Shadow | Shadow-1 |
| Icon | 48px x 48px (rounded 12px container, Primary-50 bg) |
| Title | Heading-4 (18px, 600 weight) |
| Description | Body-Small (14px, 400 weight, Text-Secondary) |
| Spacing icon→title | Space-3 (8px) |
| Spacing title→desc | Space-3 (8px) |

### Card Content Specification:
| Card | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | CV icon | Smart CV Builder | AI-powered CV optimization with real-time ATS scoring |
| 2 | Search icon | AI Job Search | Intelligent matching that finds roles tailored to you |
| 3 | Chart icon | Career Tracking | Visual progress toward your professional goals |
| 4 | Bell icon | Application Tracker | Never lose track of an application again |

### Visual Hierarchy (Features):
1. **Primary Focus:** Section heading
2. **Secondary Focus:** Feature card icons + titles
3. **Tertiary Focus:** Card descriptions

---

## 4. AI Showcase Section

| Property | Value |
|----------|-------|
| Padding | Space-14 top and bottom (128px) |
| Background | Surface-0 |
| Max width | 1140px |

### Layout (2-column split):
| Column | Width | Content |
|--------|-------|---------|
| Left | 6/12 (528px) | Mockup/screenshot of AI Workspace |
| Right | 6/12 (528px) | Feature description |

### Left — Mockup area:
| Property | Value |
|----------|-------|
| Height | 400px |
| Background | Surface-2 |
| Radius | radius-md (8px) |
| Content | Stylized AI conversation interface (decorative, not interactive) |

### Right — Description:
| Property | Value |
|----------|-------|
| Padding left | Space-10 (48px) |

**Elements:**
| Element | Type | Spacing |
|---------|------|---------|
| "AI-Powered" badge | Overline, Primary-600 | Bottom Space-3 |
| "Your Personal Career Assistant" heading | Heading-2 (28px) | Bottom Space-5 |
| Description paragraph | Body (15px) | Bottom Space-7 |
| Feature list (3 items with check icons) | Body, space-8 gap | Bottom Space-8 |
| "See it in action" link | Text-Link | — |

---

## 5. Testimonials Section

| Property | Value |
|----------|-------|
| Padding | Space-14 top and bottom (128px) |
| Background | Surface-1 |
| Max width | 1140px |
| Grid | 3-column (4/12 each) |
| Gap | Space-7 (24px) |

### Each testimonial card:
| Property | Value |
|----------|-------|
| Padding | Space-7 (24px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | Border-Default |
| Avatar | 44px x 44px, radius-full |
| Name | Body-Small, 600 weight |
| Title | Caption, Text-Secondary |
| Quote | Body, italic (optional), Text-Body |
| Stars | 5-star rating (optional) |

---

## 6. Final CTA Section

| Property | Value |
|----------|-------|
| Padding | Space-14 top and bottom (128px) |
| Background | Surface-0 |
| Max width | 720px centered |

### Elements:
| Element | Type | Spacing |
|---------|------|---------|
| "Ready to transform your career?" | Heading-1 (36px) | Bottom Space-7 |
| "Join thousands of professionals using MR:EGO" | Body-Large | Bottom Space-8 |
| [Start Your Journey ▸] | Button-Primary, 200x52px | — |
| "No credit card required" | Caption, Text-Tertiary | Top Space-5 |

---

## 7. Footer

| Property | Value |
|----------|-------|
| Padding | Space-10 (48px) top/bottom |
| Background | Surface-2 |
| Border top | Border-Default |
| Max width | 1140px centered |

### Layout (5-column):
| Column | Width | Content |
|--------|-------|---------|
| Brand | 3/12 | Logo + "Your AI Career OS" (Caption) |
| Product | 2/12 | Features, Pricing, Changelog |
| Resources | 2/12 | Blog, Guides, API |
| Company | 2/12 | About, Careers, Contact |
| Legal | 2/12 | Privacy, Terms, Cookies |

### Copyright bar:
| Property | Value |
|----------|-------|
| Border top | Border-Default |
| Padding vertical | Space-4 (12px) |
| Text | Caption, Text-Tertiary |

---

## 8. Loading State

**Skeleton sequence:**
1. Nav bar loads first (no skeleton — chrome)
2. Hero section: Title skeleton (60% width, 48px height), subtitle skeleton (80% x 16px), CTA placeholder
3. Features: 4 card skeletons appear with staggered animation (50ms delay)
4. Below-fold sections load on scroll

---

## 9. Empty/Error States

Landing has no empty state. Error states:
| Error | Behavior |
|-------|----------|
| CTA click fails | Toast: "Something went wrong. Please try again." |
| Content fails to load | Skeleton remains, retry on scroll |
| Offline | Toast: "No internet connection" at top of page |
| CTA loading | Button shows spinner, disabled state |

---

## 10. Responsive Behavior

| Element | Mobile (<768px) | Tablet (768-1023px) | Desktop (1024px+) |
|---------|-----------------|---------------------|-------------------|
| Nav bar | Compact: hamburger + logo | Full links + CTA | Full |
| Hero heading | Display at 32px | Display at 40px | Display at 48px |
| Features | 1-column stack | 2x2 grid | 4-column grid |
| AI showcase | Single column, mockup top | Side-by-side | Side-by-side |
| Testimonials | 1-column | 2-column | 3-column |
| Padding | Page margin Space-5 | Page margin Space-7 | Page margin Space-8 |
| Section vertical | Space-10 (48px) | Space-12 (80px) | Space-14 (128px) |
| Footer | 2-column then stack | 3-column | 5-column |

---

## 11. Accessibility

| Element | Requirement |
|---------|-------------|
| Skip link | "Skip to content" at very top |
| Nav | `role="navigation" aria-label="Primary"` |
| Headings | Single h1 in hero, h2 for sections, h3 for cards |
| CTAs | `aria-label` matching visible text |
| Images/illustrations | `alt` text for meaningful, `aria-hidden="true"` decorative |
| Feature cards | `role="article"` on each card |
| Focus management | Skip link target, CTA focus visible |
| Color contrast | All text on Surface-1 meets WCAG AA minimum |

---

## 12. AI Integration

| Feature | Placement | Behavior |
|---------|-----------|----------|
| None | — | AI is introduced only after authentication |
| Animated brand element | Hero section | Subtle motion graphic, not AI |

---

## 13. Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Nav links → Hero CTA → Feature cards → Showcase → Testimonials → Final CTA → Footer |
| Enter/Space | Activate links and buttons |
| Arrow Down | Scroll to next section |

---

## 14. Future Expansion

| Feature | Phase |
|---------|-------|
| Personalized landing based on referral source | Phase 2 |
| A/B test hero variants | Phase 3 |
| Video hero background | Phase 4 |
| Animated product demo | Phase 5 |
| Multi-language landing pages | Phase 6 |

---

*Cross-references: DP-6:Screen (Landing), DP-4:Layout (Authentication Layout), DP-1:Color, DP-1:Type, DP-1:Space, DP-1:Grid, DP-1:Elev, DP-1:Glass*
