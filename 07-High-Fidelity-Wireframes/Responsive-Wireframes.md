# Responsive Wireframes — High-Fidelity Specifications

**Phase:** DP-7 (High-Fidelity Wireframes)
**Status:** Design Specification
**Inherits:** DP-6:Resp (Responsive UX), DP-1:Grid, DP-1:Space, DP-1:Responsive

---

## Purpose

Define exact layout transformations for every screen across all breakpoints. This document consolidates screen-specific responsive specs into a unified reference.

---

## Breakpoint Reference

| Class | Width | Columns | Gutter | Margin | Container |
|-------|-------|---------|--------|--------|-----------|
| Mobile | 375px | 4 | 16px | 16px | 100% - 32px |
| Tablet | 834px | 8 | 20px | 24px | 720px |
| Laptop | 1280px | 12 | 24px | 32px | 1140px |
| Desktop | 1440px | 12 | 24px | 32px | 1240px |
| Ultra-wide | 1920px | 12 | 24px | 48px | 1440px |

---

## Layout Transformation by Screen

### Landing Page

| Breakpoint | Nav | Hero | Features | Showcase | Testimonials | CTA | Footer |
|------------|-----|------|----------|----------|-------------|-----|--------|
| Mobile | Hamburger + logo | Stacked, 32px heading | 1-col | Stacked (mockup above text) | 1-col | Full width | 2-col |
| Tablet | Links + CTA | Centered, 40px heading | 2x2 | Side-by-side | 2-col | Centered | 3-col |
| Desktop | Full | Centered 48px | 4-col | Side-by-side | 3-col | Centered | 5-col |
| Ultra-wide | Full + extras | 720px max | 4-col wider | Side-by-side wider | 3-col wider | 720px max | 5-col |

### Authentication (Login/Register)

| Breakpoint | Card Width | Card Position | Decor |
|------------|-----------|---------------|-------|
| Mobile | 100% (343px) | Top aligned (Space-11 gap) | Hidden |
| Tablet | 440px | Vertically centered | Subtle |
| Desktop | 440px | Vertically centered | Full decorative |
| Ultra-wide | 440px | Center + ambient | Expanded decorative |

### Onboarding (All Steps)

| Breakpoint | Stepper | Content Width | Form Layout | AI Panel |
|------------|---------|---------------|-------------|----------|
| Mobile | Vertical compact | Full | Single column | Bottom sheet |
| Tablet | Horizontal icons | 600px | 2-column fields | Right drawer |
| Desktop | Full with labels | 720px | 2-column | Side card |
| Ultra-wide | Full | 960px | 2-column + hints | Expanded |

### Dashboard

| Breakpoint | Sidebar | Stat Row | Widget Grid | AI Panel |
|------------|---------|----------|-------------|----------|
| Mobile | Bottom tab bar | 2x2 grid | 1-column | Full-screen modal |
| Tablet | Icon rail (64px) | 4 horizontal | 2-column | Right overlay |
| Laptop | Sidebar 240px | 4 horizontal | 3-column | Right panel 360px |
| Desktop | Sidebar 240px | 4 horizontal | 3-column | Right panel 400px |
| Ultra-wide | Sidebar 240px | 4 horizontal | 4-column | Right panel 440px |

### AI Workspace

| Breakpoint | Conversation | Context Panel | Input |
|------------|-------------|---------------|-------|
| Mobile | Full screen | Hidden (bottom sheet toggle) | Bottom fixed |
| Tablet | 70% width | Right overlay 320px | Bottom fixed |
| Desktop | 1fr | Fixed 320px | Bottom fixed |
| Ultra-wide | 1fr | Fixed 360px | Bottom fixed |

### CV Builder

| Breakpoint | Upload Zone | CV List | Editor View |
|------------|-------------|---------|-------------|
| Mobile | Full width, 160px | Full cards | Stacked (orig → opt) |
| Tablet | 400px centered | Full cards | Side-by-side |
| Desktop | 480px centered | Full cards | Side-by-side + AI panel |
| Ultra-wide | 480px centered | Full cards | Side-by-side + AI panel |

### CV Analysis

| Breakpoint | Score Card | Strengths | Accordion | AI Sidebar |
|------------|-----------|-----------|-----------|------------|
| Mobile | Stacked | 1-col stack | Full | Hidden |
| Tablet | Side-by-side | 2-col | Full | Overlay 320px |
| Desktop | Side-by-side | 3-col | Full | Fixed 360px |

### Job Search

| Breakpoint | Filters | Results | Job Cards | AI Panel |
|------------|---------|---------|-----------|----------|
| Mobile | Bottom sheet | Full width | Compact | Hidden |
| Tablet | Side drawer | 1fr | Full | Overlay |
| Desktop | Fixed 280px | 1fr | Full | Optional |
| Ultra-wide | Fixed 280px | 1fr | Full | Fixed 320px |

### Job Details

| Breakpoint | Header | Description | Side Panel | Similar Jobs |
|------------|--------|-------------|------------|--------------|
| Mobile | Stacked | Full | Bottom sheet | 1 card + arrows |
| Tablet | Side-by-side | Full | Right overlay | 2 cards |
| Desktop | Side-by-side | Full | Fixed 360px | 3 cards |
| Ultra-wide | Side-by-side | Full + extras | Fixed 400px | 4 cards |

### Application Tracker

| Breakpoint | Tabs | Cards | Detail View |
|------------|------|-------|-------------|
| Mobile | Horizontal scroll | Full, compact | Single column, AI as bottom sheet |
| Tablet | Full visible | Full | Content + overlay |
| Desktop | Full visible | Full | Content + 360px AI panel |
| Ultra-wide | Full visible | Full | Content + 400px AI panel |

### Profile

| Breakpoint | Header | Tabs | Content |
|------------|--------|------|---------|
| Mobile | Stacked, avatar centered | Horizontal scroll | Single column |
| Tablet | Side-by-side | Full visible | Single column |
| Desktop | Side-by-side | Full visible | Single column, 720px max |

---

## Navigation Adaptation

| Nav Element | Mobile | Tablet | Laptop | Desktop | Ultra-wide |
|-------------|--------|--------|--------|---------|------------|
| Sidebar | Bottom tab bar (5 icons) | Icon rail (64px) | Expanded 240px | Expanded 240px | Expanded 240px |
| Top bar | Compact (actions in overflow) | Full | Full | Full | Full + extras |
| Breadcrumbs | Back button only | Collapsed | Full | Full | Full |
| Search | Full-screen overlay | Inline 400px | Inline 600px | Inline 720px | Inline 800px |
| Command palette | Full overlay | Full overlay | Overlay | Overlay | Overlay |
| Notifications | Full-screen modal | Drawer | Dropdown | Dropdown | Dropdown |
| User menu | Bottom sheet | Dropdown | Dropdown | Dropdown | Dropdown |
| AI Assistant | Full-screen modal | Right drawer | Right panel | Right panel | Right panel expanded |

---

## Content Density Modes

| Mode | Card Padding | Stack Gap | Grid Gap | When |
|------|-------------|-----------|----------|------|
| Comfortable (default) | Space-7 (24px) | Space-5 (16px) | Space-7 (24px) | Default, all breakpoints |
| Compact | Space-5 (16px) | Space-3 (8px) | Space-5 (16px) | Power users, data-heavy screens |
| Dense | Space-4 (12px) | Space-2 (4px) | Space-4 (12px) | Maximum content per viewport |

---

## Touch Target Adaptation

| Interaction | Mobile | Tablet | Desktop |
|-------------|--------|--------|---------|
| Minimum target | 44x44px | 44x44px | 40x40px |
| Button height min | 44px | 44px | 40px |
| Input height min | 44px | 44px | 40px |
| Chip height | 32px | 32px | 28px |
| Icon button | 44x44px | 44x44px | 36x36px |
| Spacing between targets | 12px | 8px | 8px |
| Primary action zone | Bottom (thumb) | Bottom/Right | Top/Right |

---

## Typography Scaling

| Token | Mobile | Tablet | Desktop | Ultra-wide |
|-------|--------|--------|---------|------------|
| Display | 32px / 1.1 | 40px / 1.1 | 48px / 1.1 | 48px / 1.1 |
| Heading-1 | 28px / 1.15 | 32px / 1.15 | 36px / 1.15 | 36px / 1.15 |
| Heading-2 | 24px / 1.2 | 26px / 1.2 | 28px / 1.2 | 28px / 1.2 |
| Heading-3 | 20px / 1.25 | 20px / 1.25 | 22px / 1.25 | 22px / 1.25 |
| Heading-4 | 16px / 1.3 | 18px / 1.3 | 18px / 1.3 | 18px / 1.3 |
| Body | 16px / 1.5 | 16px / 1.5 | 15px / 1.6 | 15px / 1.6 |
| Body-Small | 14px / 1.4 | 14px / 1.4 | 14px / 1.5 | 14px / 1.5 |

---

## Foldable / Dual-Screen

| Posture | Layout | Navigation | Content |
|---------|--------|------------|---------|
| Unfolded single | Standard mobile | Bottom tabs | Single column |
| Spanned (folded open) | Dual-screen canvas | Sidebar on left screen | Content flows across hinge |
| Dual-screen separate | Content on left, context on right | Bottom tabs both | Left: primary, Right: secondary |
| Resume | State restored when folded/unfolded | — | — |

### Safe Areas:
| Element | Specification |
|---------|---------------|
| Hinge zone | 48px center gap — no interactive elements |
| Content padding | Space-5 minimum from hinge |
| Navigation | Avoids hinge area |

---

## Future Large Touch (Whiteboards, Touch Tables)

| Property | Specification |
|----------|---------------|
| Min target size | 64x64px |
| Panel approach | Floating, draggable panels |
| Navigation | Dock-style sidebar (left), auto-hide |
| AI interaction | Voice + touch combined |
| Gestures | Pinch zoom, two-finger scroll, long-press context |

---

## Responsive Rules Verification

| Rule | Status | Notes |
|------|--------|-------|
| Content parity across devices | ✓ | All core workflows work on all breakpoints |
| No horizontal scroll | ✓ | Tables transform to cards on mobile |
| Touch-first design | ✓ | All interactive elements 44px+ on touch devices |
| Keyboard aware | ✓ | Forms scroll into view when keyboard opens |
| Orientation support | ✓ | Portrait and landscape supported |
| Print styles | ✓ | Profile, CV, Job Detail have print styles |
| Progressive enhancement | ✓ | Mobile base, complexity added for larger screens |

---

*Cross-references: DP-6:Resp, DP-1:Grid, DP-1:Space, DP-1:Responsive, DP-1:Type*
