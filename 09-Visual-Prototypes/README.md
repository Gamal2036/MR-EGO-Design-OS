# Visual Prototype System

**Phase:** DP-9 (Visual Prototype System)
**Version:** 1.0
**Status:** COMPLETE
**Design Authority:** DP-0 through DP-8
**Inherits:** All Design OS phases

---

## Purpose

Complete production-ready visual prototype specifications for every screen in MR:EGO. Every prototype is detailed enough that a frontend engineer can implement it with almost no design decisions remaining.

---

## Design Philosophy

The product must feel:
- Premium, Elegant, Minimal
- Enterprise, Modern, Human
- Calm, Intelligent, Future-ready
- Never overloaded, childish, gaming, or flashy

Inspired by: Apple, Linear, Notion, Raycast, Arc Browser, Stripe, GitHub, Vercel, OpenAI

---

## Prototype Index

| # | Document | Pages Covered | Status |
|---|----------|--------------|--------|
| 1 | Landing.md | Landing Page, Welcome Screen | Complete |
| 2 | Authentication.md | Login, Register, Forgot Password, Password Reset | Complete |
| 3 | Onboarding.md | 4-Step Onboarding Wizard, Completion | Complete |
| 4 | Dashboard.md | Main Dashboard, Daily Command Center | Complete |
| 5 | AI-Workspace.md | AI Conversation Workspace, Chat Interface | Complete |
| 6 | CV-Builder.md | CV Manager, Upload, Editor, Optimization | Complete |
| 7 | CV-Analysis.md | CV Analysis Report, Scoring, Suggestions | Complete |
| 8 | Job-Search.md | Job Search, Filters, Results, Saved Searches | Complete |
| 9 | Job-Details.md | Job Detail View, Match Analysis | Complete |
| 10 | Application-Wizard.md | 5-Step Application Form, Cover Letter | Complete |
| 11 | Application-Tracker.md | Application List, Detail, Timeline | Complete |
| 12 | Documents.md | Document Manager, Preview, Organization | Complete |
| 13 | Messaging.md | In-App Messaging, Threads, AI Replies | Complete |
| 14 | Notifications.md | Notification Center, Filtering, Groups | Complete |
| 15 | Career-Progress.md | Career Timeline, Goals, Skill Map | Complete |
| 16 | Profile.md | User Profile, Tabs, Sections | Complete |
| 17 | Settings.md | Settings Panels, Preferences, Danger Zone | Complete |
| 18 | Help-Center.md | Help Articles, FAQ, AI Search | Complete |
| 19 | Search.md | Global Search Overlay, Results, Filters | Complete |
| 20 | Command-Palette.md | Command Palette, Quick Actions | Complete |
| 21 | Global-Navigation.md | Topbar, Sidebar, Navigation System | Complete |
| 22 | Empty-States.md | All Empty States Reference | Complete |
| 23 | Loading-States.md | All Loading States Reference | Complete |
| 24 | Offline-Error-Success.md | Offline, Error, Success, Maintenance Pages | Complete |
| 25 | Responsive-Prototypes.md | Phone, Tablet, Laptop, Desktop, Ultra Wide, Foldables | Complete |
| 26 | AI-Visual-System.md | AI Components, States, Indicators, Confidence | Complete |
| 27 | Prototype-Guidelines.md | Reusable Patterns, Layout Rules, Composition | Complete |
| 28 | Prototype-Validation.md | Quality Validation Checklist | Complete |
| 29 | Future-Expansion.md | Future Visual Prototype Expansion | Complete |
| 30 | Visual-Prototypes-DP9-Report.md | Phase Completion Report | Complete |

---

## Design Inheritance Chain

```
DP-0 Constitution (Principles, Brand, UX)
  └── DP-1 Design Language (Color, Type, Space, Grid, Elevation, Glass, Motion)
       └── DP-2 Design System (Component Specs, Tokens)
            └── DP-3 Component Library (Implementation Contracts)
                 └── DP-4 Application Shell (Workspace, Navigation, Layouts)
                      └── DP-5 Visual Foundation (Identity, Glass, Depth, Lighting, AI Language)
                           └── DP-6 UX Architecture (Flows, Journeys, Screens, IA)
                                └── DP-7 High-Fidelity Wireframes (Screen Specs)
                                     └── DP-8 Interaction & Motion System (Motion, Transitions)
                                          └── DP-9 Visual Prototypes (THIS — Production Specs)
```

All prototype specifications inherit from and comply with every previous phase.

---

## Key Design Tokens Reference

### Color
| Token | Value Light | Value Dark |
|-------|-------------|------------|
| Primary-500 | #3B82F6 | #60A5FA |
| Primary-600 | #2563EB | #93C5FD |
| Surface-0 | Neutral-50 | Neutral-50(dark) |
| Surface-1 | #FFFFFF | Neutral-100 |
| Surface-2 | Neutral-100 | Neutral-200 |
| Text-Primary | Neutral-900 | Neutral-900(dark) |
| Text-Body | Neutral-800 | Neutral-700 |
| Text-Secondary | Neutral-600 | Neutral-500 |

### Typography
| Token | Size | Weight | Line Height |
|-------|------|--------|-------------|
| Display | 48px | 700 | 1.1 |
| Heading-1 | 36px | 700 | 1.15 |
| Heading-2 | 28px | 650 | 1.2 |
| Heading-3 | 22px | 600 | 1.25 |
| Heading-4 | 18px | 600 | 1.3 |
| Body | 15px | 400 | 1.6 |
| Body-Small | 14px | 400 | 1.5 |
| Caption | 13px | 400 | 1.4 |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| Space-3 | 8px | Base unit |
| Space-5 | 16px | Card padding |
| Space-7 | 24px | Section padding |
| Space-8 | 32px | Page margins |
| Space-10 | 48px | Section gap |
| Space-14 | 128px | Hero padding |

### Elevation
| Layer | Usage | Shadow |
|-------|-------|--------|
| 0 | Page background | None |
| 1 | Cards, surfaces | Shadow-1 |
| 2 | Hovered, dropdowns | Shadow-2 |
| 3 | Modals, sheets | Shadow-3 |
| 4 | Tooltips, popovers | Shadow-4 |
| 5 | Overlays | Shadow-5 |

### Glass
| Type | Opacity | Blur | Usage |
|------|---------|------|-------|
| Navigation | 0.85 | 12px | Sticky nav |
| Backdrop | 0.60 | 8px | Modal behind |
| Ambient | 0.50 | 4px | Subtle context |

---

## Cross-Reference Index

All specifications cross-reference:
- DP-1: Color, Typography, Spacing, Grid, Elevation, Glass, Motion
- DP-2: Component specifications via tokens
- DP-3: Component Library implementation patterns
- DP-4: Shell architecture, layouts, responsive
- DP-5: Visual foundation elements
- DP-6: UX flows, screen definitions, AI experience
- DP-7: Wireframe structure and content
- DP-8: Motion specifications, transitions

---

*This README is the entry point for DP-9 Visual Prototype System. All documents in this directory inherit from DP-0 through DP-8.*
