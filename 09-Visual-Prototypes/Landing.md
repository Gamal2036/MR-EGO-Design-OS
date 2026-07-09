# Landing Page — Visual Prototype Specification

**Phase:** DP-9 (Visual Prototype System)
**Status:** Complete Production Specification
**Inherits:** DP-7:Landing, DP-8:All (Motion, Interaction, Transitions), DP-6:Screen (Landing), DP-1:All
**Engineer Handoff:** Ready — no design decisions remaining

---

## 1. Purpose

Convert first-time visitors into registered users. Single-scroll marketing page communicating MR:EGO's premium AI career OS value proposition. No sidebar, no authenticated chrome. Every visual element serves hierarchy, conversion, or trust.

---

## 2. Visual Composition — Full Page Map

```
┌──────────────────────────────────────────────────────────────────────┐
│  NAV BAR (56px fixed glass, rgba(255,255,255,0.72) + blur 12px)     │
│  [Logo 140x32]                    [Sign In]  [Get Started ▸]        │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─ HERO ───────────────────────────────────────── min 520px ────┐  │
│  │  ┌──────────────────── max 720px centered ──────────────────┐ │  │
│  │  │  [AI-Powered Career Platform]  (overline, Primary-600)    │ │  │
│  │  │  Your AI Career Operating System  (Display 48px/700)     │ │  │
│  │  │  The intelligent platform that manages your career        │ │  │
│  │  │  journey — from CV optimization to job matching, all     │ │  │
│  │  │  powered by AI. (Body-Large, max 540px, Text-Secondary)  │ │  │
│  │  │                                                          │ │  │
│  │  │  [Start Your Journey ▸]  [Learn More ▼]                 │ │  │
│  │  │                                                          │ │  │
│  │  │  Trusted by 10,000+ professionals                       │ │  │
│  │  │  [Logo1][Logo2][Logo3][Logo4]  (24px height each)       │ │  │
│  │  └──────────────────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─ FEATURES ───────────────────────────── Space-14 pad V ────────┐  │
│  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  (4-col grid)          │  │
│  │  │Smart │  │AI Job│  │Career│  │App   │                         │  │
│  │  │CV    │  │Search│  │Track │  │Track │                         │  │
│  │  │Bldr  │  │      │  │      │  │      │                         │  │
│  │  └──────┘  └──────┘  └──────┘  └──────┘                         │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─ AI SHOWCASE ────────────────────────── Space-14 pad V ────────┐  │
│  │  ┌─────────────────┐  ┌─────────────────┐  (2-col split)        │  │
│  │  │  AI Workspace   │  │  Your Personal  │                       │  │
│  │  │  Mockup Display │  │  Career Asst.   │                       │  │
│  │  │  600px x 400px  │  │  Description    │                       │  │
│  │  └─────────────────┘  └─────────────────┘                       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─ TESTIMONIALS ────────────────────────── Space-14 pad V ────────┐  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  (3-col grid)         │  │
│  │  │ Card 1   │  │ Card 2   │  │ Card 3   │                       │  │
│  │  └──────────┘  └──────────┘  └──────────┘                       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─ FINAL CTA ──────────────────────────── Space-14 pad V ────────┐  │
│  │  "Ready to transform your career?"                              │  │
│  │  [Start Your Journey ▸]                                         │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─ FOOTER ────────────────────────────── Space-10 pad V ─────────┐  │
│  │  Brand(3)  Product(2)  Resources(2)  Company(2)  Legal(2)      │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 3. Navigation Bar

| Property | Value |
|----------|-------|
| Type | Fixed glass navigation |
| Height | 56px |
| Background | `rgba(255,255,255,0.72)` + `backdrop-filter: blur(12px)` |
| Bottom border | 1px solid `rgba(0,0,0,0.06)` |
| z-index | Elevation-4 (top of page stack) |
| Padding | 0 Space-8 (32px horizontal) |
| Max width | 100% (full bleed) |
| Transition | Background opacity 300ms on scroll (transparent → glass) |

### Elements

| Group | Element | Size | Spacing | Token |
|-------|---------|------|---------|-------|
| Left | Logo | 140px x 32px | Space-3 from left edge | — |
| Right | "Sign In" text link | Auto | Space-5 right of CTA | Body-Small, Text-Link |
| Right | "Get Started" button | min 120px x 40px | Right edge | Button-Primary, radius-md |

### States

| State | Behavior |
|-------|----------|
| Default (top) | Background `transparent`, no border |
| Scrolled > 50px | Glass background + border appears (300ms) |
| Hover (Sign In) | Text-Link underline, opacity 0.8 |
| Hover (CTA) | Shadow-2, scale 1.02 (150ms) |
| Active (CTA) | Scale 0.98 (100ms) |
| Mobile | Logo visible, hamburger icon (24x24px) replaces right links |

### Motion Entry

| Element | Delay | Duration | Easing |
|---------|-------|----------|--------|
| Logo fade in | 0ms | 300ms | ease-out |
| Right group fade in | 100ms | 300ms | ease-out |
| Glass appearance on scroll | 50ms after scroll | 300ms | ease-out |

---

## 4. Hero Section

| Property | Value |
|----------|-------|
| Min height | 520px (flexible, fills 100vh - nav height) |
| Content max width | 720px (narrow) centered |
| Padding top | Space-11 (64px) |
| Padding bottom | Space-10 (48px) |
| Background | Surface-0 |
| Grid placement | 12/12 columns centered |
| Alignment | Flex column, center, center |

### Elements (top to bottom, exact stacking)

| Layer | Element | Token | Size | Color | Bottom Space |
|-------|---------|-------|------|-------|--------------|
| 1 | Eyebrow "AI-Powered Career Platform" | Overline | 12px/600/0.04em | Primary-600 | Space-3 (8px) |
| 2 | Main heading "Your AI Career Operating System" | Display | 48px/700/1.1 | Text-Primary (Neutral-900) | Space-5 (16px) |
| 3 | Subheading (2 lines max) | Body-Large | 16px/450/1.6 | Text-Secondary (Neutral-600) | Space-8 (32px) |
| 4a | Primary CTA "Start Your Journey" | Button-Primary | 180px x 48px | — | 0 (inline with 4b) |
| 4b | Secondary CTA "Learn More" | Button-Outline | 140px x 48px | — | Space-9 (40px) below row |
| 5 | Trust bar with logos | Caption | 13px/400 | Text-Tertiary | 0 |

### Subheading Text

```
The intelligent platform that manages your career journey — from CV
optimization to job matching, all powered by AI.
```

### CTA Button Specifications

| Property | Primary (Start Your Journey) | Secondary (Learn More) |
|----------|------------------------------|------------------------|
| Background | Primary-600 (#2563EB) | Transparent |
| Text color | White | Text-Primary |
| Border | None | 1.5px solid Neutral-300 |
| Radius | radius-md (8px) | radius-md (8px) |
| Shadow | Shadow-1 | None |
| Hover bg | Primary-700 (#1D4ED8) | Neutral-100 |
| Hover shadow | Shadow-2 | None |
| Active transform | Scale 0.98 | Scale 0.98 |
| Focus ring | 3px Primary-200 | 3px Primary-200 |
| Icon | Arrow right (16px, right) | Chevron down (16px, right) |
| Font | 14px/600/Button | 14px/600/Button |

### Trust Bar

| Property | Value |
|----------|-------|
| Text | "Trusted by 10,000+ professionals at leading companies" |
| Logo marks | 4 company logos (24px height each, Neutral-400 tint) |
| Logo gap | Space-4 (12px) |
| Max width | 540px centered |

### Visual Hierarchy — Hero

| Level | Element | Rationale |
|-------|---------|-----------|
| 1 | Main heading (Display 48px) | Largest type, highest contrast — immediate attention |
| 2 | Subheading (Body-Large) | Explains value prop — read second |
| 3 | CTA buttons (Primary blue) | Blue accent draws eye — action target |
| 4 | Trust bar (Caption) | Social proof reinforcement — supporting only |

### Motion Entry — Hero

| Element | Delay | Duration | Easing | Initial state |
|---------|-------|----------|--------|---------------|
| Eyebrow | 0ms | 400ms | ease-out | translateY(12px), opacity 0 |
| Heading | 200ms | 500ms | ease-out | translateY(16px), opacity 0 |
| Subheading | 300ms | 500ms | ease-out | translateY(16px), opacity 0 |
| CTAs | 400ms | 400ms | ease-out | translateY(20px), opacity 0 |
| Trust bar | 500ms | 400ms | ease-out | translateY(12px), opacity 0 |

---

## 5. Features Section

| Property | Value |
|----------|-------|
| Section padding | Space-14 top and bottom (128px each) |
| Background | Surface-1 (#FFFFFF) |
| Max width | 1140px (standard content) centered |
| Grid columns | 4-column feature card grid |

### Section Header

| Property | Value |
|----------|-------|
| Heading | "Everything you need to advance your career" |
| Token | Heading-2 (28px/650/1.2) |
| Color | Text-Primary |
| Alignment | Center |
| Bottom spacing | Space-10 (48px) |

### Feature Cards (4-column grid)

| Property | Value |
|----------|-------|
| Card width | calc(25% - 18px) |
| Gap | Space-7 (24px) |
| Min card width | 260px |
| Grid template | `repeat(4, 1fr)` |

**Each feature card:**

| Property | Value |
|----------|-------|
| Padding | Space-7 (24px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | 1px solid Neutral-100 |
| Shadow | Shadow-1 |
| Hover state | Shadow-2, border Neutral-200, translateY(-2px) — 200ms |
| Active state | translateY(0), scale 0.99 |

**Card internal spacing:**

```
┌──────────────────────────┐
│                          │
│  [48px icon container]   │  ← Space-3 below
│  Title (Heading-4)       │  ← Space-3 below
│  Description (Body-Small)│
│                          │
└──────────────────────────┘
```

| Element | Token | Value |
|---------|-------|-------|
| Icon container | — | 48px x 48px, radius 12px, Primary-50 bg, Primary-600 icon |
| Title | Heading-4 | 18px/600/1.3, Text-Primary |
| Description | Body-Small | 14px/400/1.5, Text-Secondary |

**Feature cards content:**

| Card | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | File-text | Smart CV Builder | AI-powered CV optimization with real-time ATS scoring and suggestions |
| 2 | Search | AI Job Search | Intelligent matching that finds roles perfectly tailored to your profile |
| 3 | Trending-up | Career Tracking | Visual progress tracking toward your professional goals and milestones |
| 4 | Bell | Application Tracker | Never lose track of an application with automated status updates |

### Visual Hierarchy — Features

| Level | Element |
|-------|---------|
| 1 | Section heading (Heading-2) |
| 2 | Feature card icon + title |
| 3 | Card description |

### Motion Entry — Features (on scroll into view)

| Element | Delay | Duration | Easing | Initial |
|---------|-------|----------|--------|---------|
| Section heading | 0ms | 400ms | ease-out | translateY(20px), opacity 0 |
| Card 1 | 100ms | 400ms | ease-out | translateY(30px), opacity 0 |
| Card 2 | 200ms | 400ms | ease-out | translateY(30px), opacity 0 |
| Card 3 | 300ms | 400ms | ease-out | translateY(30px), opacity 0 |
| Card 4 | 400ms | 400ms | ease-out | translateY(30px), opacity 0 |

---

## 6. AI Showcase Section

| Property | Value |
|----------|-------|
| Section padding | Space-14 top and bottom (128px each) |
| Background | Surface-0 |
| Max width | 1140px centered |

### Layout (2-column split)

| Column | Width | Content |
|--------|-------|---------|
| Left | 6/12 (528px) | Mockup display of AI Workspace |
| Right | 6/12 (528px) | Feature description and copy |

### Left Column — Mockup Area

| Property | Value |
|----------|-------|
| Width | 100% (528px within grid) |
| Height | 400px |
| Background | Neutral-100 (Surface-2) with subtle gradient overlay |
| Radius | radius-md (8px) |
| Shadow | Shadow-2 |
| Content | Stylized AI conversation interface mockup (decorative illustration, not interactive) |
| Elements | Chat bubble shapes (3), input bar placeholder, MR:EGO avatar |

### Right Column — Description

| Property | Value |
|----------|-------|
| Padding | Space-10 (48px) left |
| Display | Flex column, vertical center |

| Element | Token | Value | Bottom spacing |
|---------|-------|-------|----------------|
| Eyebrow "AI-POWERED" | Overline | 12px/600/0.04em, Primary-600 | Space-3 (8px) |
| Heading "Your Personal Career Assistant" | Heading-2 | 28px/650/1.2, Text-Primary | Space-5 (16px) |
| Description paragraph (2 lines) | Body | 15px/400/1.6, Text-Body | Space-7 (24px) |
| Feature list (3 items with check icons) | Body | 15px/400, Text-Body, Space-3 gap | Space-8 (32px) |
| "See it in action" link | Text-Link | Body-Small/600/1.5, Primary-600 | — |

**Feature list items:**
1. ✓ AI analyzes your CV against thousands of job descriptions
2. ✓ Personalized recommendations updated in real-time
3. ✓ Natural conversation interface — no complex menus

### Motion Entry — Showcase (on scroll)

| Element | Delay | Duration | Easing | Initial |
|---------|-------|----------|--------|---------|
| Left mockup | 0ms | 500ms | ease-out | translateX(-30px), opacity 0 |
| Right content | 100ms | 500ms | ease-out | translateX(20px), opacity 0 |
| List items | 300ms stagger (100ms each) | 300ms | ease-out | translateY(10px), opacity 0 |

---

## 7. Testimonials Section

| Property | Value |
|----------|-------|
| Section padding | Space-14 top and bottom (128px each) |
| Background | Surface-1 |
| Max width | 1140px centered |
| Grid | 3-column, `repeat(3, 1fr)` |
| Gap | Space-7 (24px) |

### Section Header

| Property | Value |
|----------|-------|
| Heading | "Loved by career-driven professionals" |
| Token | Heading-2 (28px/650/1.2), Text-Primary |
| Alignment | Center |
| Bottom spacing | Space-10 (48px) |

### Each Testimonial Card

| Property | Value |
|----------|-------|
| Padding | Space-7 (24px) |
| Radius | radius-md (8px) |
| Background | Surface-1 |
| Border | 1px solid Neutral-100 |
| Shadow | Shadow-1 |

**Card internal layout:**

```
┌──────────────────────────────┐
│                              │
│  ★★★★★                       │
│                              │
│  "Quote text here that is    │
│   meaningful and authentic   │
│   to the user experience."   │
│                              │
│  ─────────────────────────── │
│                              │
│  [Avatar 44x44]  Name        │
│                   Title      │
│                              │
└──────────────────────────────┘
```

| Element | Token | Value |
|---------|-------|-------|
| Star rating | — | 5 stars (16px each), Warning-500 color |
| Quote | Body (15px/400/1.6) | Text-Body, italic optional |
| Divider | — | 1px solid Neutral-100 |
| Avatar | — | 44px x 44px, radius-full |
| Name | Body-Small | 14px/600/1.5, Text-Primary |
| Title | Caption | 13px/400/1.4, Text-Secondary |
| Spacing stars→quote | Space-4 (12px) | — |
| Spacing quote→divider | Space-5 (16px) | — |
| Spacing divider→profile | Space-5 (16px) | — |

**Testimonial data:**

| # | Name | Title | Quote |
|---|------|-------|-------|
| 1 | Sarah Chen | Senior Engineer at Stripe | "MR:EGO completely transformed how I approach my career. The AI matched me with a role I would have never found on my own." |
| 2 | Marcus Johnson | Product Lead at Vercel | "The CV optimization alone paid for itself ten times over. I went from a 40% to 92% ATS match rate." |
| 3 | Priya Patel | Design Director at Linear | "Finally, a career tool that treats your professional growth with the seriousness it deserves. The insights are uncanny." |

### Motion Entry — Testimonials (on scroll)

| Element | Delay | Duration | Easing | Initial |
|---------|-------|----------|--------|---------|
| Section heading | 0ms | 400ms | ease-out | translateY(20px), opacity 0 |
| Card 1 | 100ms | 400ms | ease-out | translateY(30px), opacity 0 |
| Card 2 | 200ms | 400ms | ease-out | translateY(30px), opacity 0 |
| Card 3 | 300ms | 400ms | ease-out | translateY(30px), opacity 0 |

---

## 8. Final CTA Section

| Property | Value |
|----------|-------|
| Section padding | Space-14 top and bottom (128px each) |
| Background | Surface-0 |
| Max width | 720px centered |
| Alignment | Text center |

| Element | Token | Value | Bottom spacing |
|---------|-------|-------|----------------|
| Heading "Ready to transform your career?" | Heading-1 | 36px/700/1.15, Text-Primary | Space-7 (24px) |
| Subtitle "Join thousands of professionals using MR:EGO to accelerate their growth." | Body-Large | 16px/450/1.6, Text-Secondary | Space-8 (32px) |
| Primary CTA button | Button-Primary | 200px x 52px, Primary-600 | — |
| "No credit card required" | Caption | 13px/400, Text-Tertiary | Top Space-5 (16px) |

**CTA button specs:** Same as hero primary CTA, but larger (200x52px).

### Motion Entry — Final CTA

| Element | Delay | Duration | Easing | Initial |
|---------|-------|----------|--------|---------|
| Heading | 0ms | 400ms | ease-out | translateY(20px), opacity 0 |
| Subtitle | 100ms | 400ms | ease-out | translateY(20px), opacity 0 |
| Button | 200ms | 400ms | ease-out | translateY(20px), opacity 0 |
| Caption | 300ms | 300ms | ease-out | opacity 0 |

---

## 9. Footer

| Property | Value |
|----------|-------|
| Padding | Space-10 (48px) top and bottom |
| Background | Neutral-100 (Surface-2) |
| Border top | 1px solid Neutral-100 |
| Max width | 1140px centered |

### Layout (5-column grid)

| Column | Grid width | Content |
|--------|------------|---------|
| Brand | 3/12 | Logo (140x32px) + "Your AI Career OS" (Caption, Text-Tertiary) + social icons (4, 20x20px, Space-3 gap) |
| Product | 2/12 | heading "Product" (Caption/600) → Features, Pricing, Changelog, API |
| Resources | 2/12 | heading "Resources" → Blog, Guides, Help Center, Community |
| Company | 2/12 | heading "Company" → About, Careers, Press, Contact |
| Legal | 2/12 | heading "Legal" → Privacy, Terms, Cookies, GDPR |

**Link style:** Body-Small (14px/400), Text-Secondary, hover → Text-Primary, 150ms.

### Copyright Bar

| Property | Value |
|----------|-------|
| Border top | 1px solid Neutral-100 |
| Padding | Space-4 (12px) vertical, Space-8 horizontal |
| Text | "© 2026 MR:EGO. All rights reserved." — Caption, Text-Tertiary |
| Max width | 1140px centered |

---

## 10. Loading States

| State | Behavior | Visual |
|-------|----------|--------|
| Initial page load | Skeleton sequence | See below |
| Image load (hero) | Low-quality placeholder → crossfade (300ms) | Blur(10px) → sharp |
| CTA click → loading | Button text → spinner (16px, white) | Disabled state, "Please wait..." |
| Lazy section load | Section skeleton appears on scroll | Pulse animation (1000ms) |

### Skeleton Sequence

| Order | Element | Skeleton Shape | Animation |
|-------|---------|----------------|-----------|
| 1 | Nav bar | No skeleton (chrome loads immediately) | — |
| 2 | Eyebrow | 120px x 12px bar, centered | Shimmer (800ms) |
| 3 | Heading | 60% width x 48px height, centered | Shimmer |
| 4 | Subheading | 80% width x 16px height, centered | Shimmer |
| 5 | CTAs | Two rectangles (180x48, 140x48), centered | Shimmer |
| 6 | Trust bar | 300px x 24px logos row, centered | Shimmer (delayed) |
| 7 | Features (below fold) | 4 card skeletons, each 260px x 180px | Staggered shimmer (50ms delay each) |

**Skeleton token values:**
| Property | Value |
|----------|-------|
| Background base | Neutral-100 |
| Shimmer highlight | Neutral-200 |
| Radius | radius-sm (6px) |
| Animation | `shimmer` 1.5s ease-in-out infinite |
| Pulse | opacity 0.3 → 0.6 → 0.3, 1000ms |

---

## 11. Error States

| Error | Trigger | Display | Recovery |
|-------|---------|---------|----------|
| CTA failure | Network error on sign-up click | Toast: "Something went wrong. Please try again." (bottom center, 3000ms auto-dismiss) | Retry click |
| Content load failure | Section fails to render | Skeleton remains visible, subtle "Could not load" caption | Scroll triggers retry |
| Offline | Network disconnected | Banner at top: "No internet connection" (Warning-500 strip, 36px h) | Auto-dismiss on reconnect |
| Image load failure | Hero/asset image broken | Fallback gradient placeholder (neutral-100) | — |
| Rate limit | Too many CTA clicks | Toast: "Please wait a moment before trying again" (with countdown) | Timer expiry |

### Toast Specification

| Property | Value |
|----------|-------|
| Position | Fixed bottom center, 24px from bottom |
| Padding | Space-4 (12px) horizontal, Space-3 (8px) vertical |
| Background | Neutral-900 |
| Text | White, Body-Small (14px/500) |
| Radius | radius-md (8px) |
| Shadow | Shadow-4 |
| z-index | Elevation-5 |
| Animation | translateY(20px) → 0, 300ms ease-out |
| Auto-dismiss | 3000ms |

---

## 12. Empty States

Landing has no empty states as a marketing page. The following edge cases apply:

| Scenario | Behavior |
|----------|----------|
| Testimonials empty (no content) | Section is hidden entirely |
| Feature content missing | Single card skeleton remains, other cards show normally |
| Trust bar logos missing | Text-only trust bar (logos hidden) |

---

## 13. Accessibility

| Element | Requirement | ARIA |
|---------|-------------|------|
| Skip link | First focusable element, "Skip to content" | `href="#main-content"` |
| Navigation | `role="navigation"` | `aria-label="Primary"` |
| Main heading | Single `h1` per page | — |
| Section headings | `h2` for each section | — |
| Feature cards | `h3` for each title | `role="article"` |
| CTAs | Descriptive text | `aria-label="Start Your Journey — Create account"` |
| Testimonial quotes | — | `aria-label="Testimonial from [Name]"` |
| Images/illustrations | Decorative: `aria-hidden="true"`, `alt=""` | — |
| Social logos | Brand logos | `aria-label="[Company] logo"`, `role="presentation"` |
| Focus management | Visible focus ring (3px Primary-200) | `:focus-visible` |
| Color contrast | All text meets WCAG AA minimum (4.5:1 body, 3:1 large) | — |
| Motion | Respect `prefers-reduced-motion` | Disable all entrance animations, scroll animations |
| Keyboard trap | No trap in any section | — |

---

## 14. Keyboard Navigation

| Key | Action | Order |
|-----|--------|-------|
| Tab | Forward through interactive elements | Skip link → Sign In → Get Started → Hero CTAs → Feature cards (links) → Showcase link → Testimonials → Final CTA → Footer links |
| Shift+Tab | Reverse through elements | — |
| Enter/Space | Activate focused link/button | — |
| Arrow Down | Scroll to next major section | Smooth scroll, 400ms |
| Arrow Up | Scroll to previous section | Smooth scroll, 400ms |
| Escape | Close mobile menu (if open) | — |

**Focus order map:**

```
Skip Link → Nav Sign In → Nav Get Started → Hero Primary CTA → Hero
Secondary CTA → Feature Card 1 → Card 2 → Card 3 → Card 4 → Showcase
Link → Testimonial 1 → 2 → 3 → Final CTA → Footer links (left to right,
top to bottom)
```

---

## 15. Responsive Behavior

| Element | Mobile (<768px) | Tablet (768–1023px) | Desktop (1024px+) |
|---------|-----------------|---------------------|-------------------|
| Nav bar | Logo + hamburger icon | Logo + Sign In + CTA | Full |
| Hamburger menu | Slide-in drawer (300px, 300ms) | — | — |
| Hero heading | 32px (Heading-1 scale) | 40px | 48px (Display) |
| Hero subheading | 15px (Body) | 16px (Body-Large) | 16px (Body-Large) |
| Hero CTA buttons | Stacked vertically, full-width | Side-by-side | Side-by-side |
| Hero padding top | Space-9 (40px) | Space-11 (64px) | Space-11 (64px) |
| Features grid | 1-column stack | 2x2 grid | 4-column |
| Feature cards | full-width | 1fr 1fr | 1fr 1fr 1fr 1fr |
| AI showcase | Single column (mockup top) | Side-by-side | Side-by-side |
| Showcase mockup | 300px height | 350px height | 400px height |
| Testimonials | 1-column | 2-column | 3-column |
| Final CTA heading | 28px (Heading-2) | 32px | 36px (Heading-1) |
| Section vertical padding | Space-10 (48px) | Space-12 (80px) | Space-14 (128px) |
| Page horizontal margin | Space-5 (16px) | Space-7 (24px) | Space-8 (32px) |
| Footer | 2-column then stack | 3-column | 5-column |

### Mobile Menu (Hamburger)

| Property | Value |
|----------|-------|
| Drawer width | 300px |
| Background | Surface-1 |
| Shadow | Shadow-4 (left) |
| Animation | Slide from right, 300ms ease-out |
| Items | Sign In, Get Started (full-width button) |
| Overlay | rgba(0,0,0,0.3), backdrop-blur(4px) |
| Close | X icon (24x24px) top right + click outside + Escape |

---

## 16. Section Transitions

| Transition | Duration | Easing | Effect |
|------------|----------|--------|--------|
| Section fade in (on scroll) | 400ms | ease-out | translateY(30px) → 0, opacity 0 → 1 |
| Section fade out (scrolling past) | 200ms | ease-out | opacity 1 → 0.6 |
| Nav glass appearance | 300ms | ease-out | opacity 0 → 1 |
| CTA hover | 150ms | ease-out | shadow + translateY(-1px) |
| CTA active | 100ms | ease-in | translateY(0), scale 0.98 |

### Intersection Observer Settings

| Property | Value |
|----------|-------|
| Threshold | 0.15 (element is 15% visible) |
| Root margin | 0px 0px -10% 0px |
| Trigger | Once per element (no re-trigger) |

---

## 17. Future Expansion

| Feature | Phase | Notes |
|---------|-------|-------|
| Personalized landing based on referral source | Phase 2 | Dynamic hero content, UTM parameter parsing |
| A/B testing hero variants | Phase 3 | 3 variant layouts, analytics integration |
| Video/animated hero background | Phase 4 | 15s loop, mute by default, 4MB max |
| Animated product demo | Phase 5 | Interactive walkthrough overlay |
| Multi-language landing | Phase 6 | i18n with dynamic content switching |
| Live visitor counter social proof | Phase 6 | "X people viewing this page" toast |

---

## 18. Design Token Inheritance Reference

| Category | Token Source | Applied To |
|----------|--------------|------------|
| Color | DP-1:Color | All backgrounds, text, borders, accents |
| Typography | DP-1:Type | All headings, body, captions, overline |
| Spacing | DP-1:Space | All padding, margins, gaps |
| Grid | DP-1:Grid | 12-column layout system |
| Elevation | DP-1:Elev | Shadows on cards, nav, footer |
| Glass | DP-1:Glass | Navigation bar |
| Motion | DP-8:All | Entrances, transitions, scroll animations |
| Components | DP-3:All | Buttons, links, cards, nav elements |

---

*Cross-references: DP-7:Landing, DP-8:Page-Transitions, DP-8:Navigation-Motion, DP-8:Loading-System, DP-6:Screen (Landing), DP-4:Layout (Marketing), DP-1:All*
