# High-Fidelity Wireframes — DP-7

**Phase:** DP-7 (High-Fidelity Wireframes)
**Version:** 1.0
**Status:** DESIGN SPECIFICATION — Ready for DP-8
**Design Authority:** DP-0 (Constitution), DP-1 (Design Language), DP-2 (Design System), DP-3 (Component Library), DP-4 (Application Shell), DP-5 (Visual Foundation), DP-6 (UX Architecture)

---

## Purpose

This phase defines every screen of MR:EGO at pixel-level fidelity — exact dimensions, spacing, grid placement, visual hierarchy, component positioning, and interaction zones. These wireframes are the authoritative specification for frontend implementation.

Every specification inherits from DP-0 through DP-6. No new colors, type sizes, spacing values, or component patterns are introduced. All values reference the established design token system.

---

## Document Structure

```
07-High-Fidelity-Wireframes/
├── README.md                        # This file
├── Landing.md                       # Landing page wireframe
├── Authentication.md                # Login, Register, Forgot Password
├── Onboarding.md                    # 4-step onboarding wizard
├── Dashboard.md                     # Main dashboard overview
├── AI-Workspace.md                  # AI conversation and workspace
├── CV-Builder.md                    # CV upload and editor
├── CV-Analysis.md                   # CV analysis and scoring
├── Job-Search.md                    # Job search and filtering
├── Job-Details.md                   # Job detail and match score
├── Application-Wizard.md            # Multi-step application form
├── Application-Tracker.md           # Application tracking and timeline
├── Documents.md                     # Document management
├── Messaging.md                     # Messaging and communication
├── Notifications.md                 # Notification center
├── Career-Progress.md               # Career timeline and analytics
├── Profile.md                       # User profile view and edit
├── Settings.md                      # Settings and preferences
├── Help-Center.md                   # Help, FAQ, and support
├── Responsive-Wireframes.md         # All breakpoint specifications
├── Navigation-Maps.md               # Complete navigation architecture
├── Accessibility.md                 # Accessibility specifications
├── Future-Expansion.md              # Future screen expansion planning
└── High-Fidelity-Wireframes-DP7-Report.md  # Validation report
```

---

## Inherited System Values

Every wireframe references these constants from prior phases:

| System | Value | Source |
|--------|-------|--------|
| Base spacing unit | 8px (0.5rem) | DP-1 Spacing-System |
| Micro spacing unit | 4px (0.25rem) | DP-1 Spacing-System |
| Primary color | #2563EB | DP-1 Color-System |
| Primary typeface | Inter | DP-1 Typography |
| Monospace typeface | JetBrains Mono | DP-1 Typography |
| Body font size | 15px | DP-1 Typography |
| Modular scale | 1.25 (major third) | DP-1 Typography |
| Desktop columns | 12 | DP-1 Grid-System |
| Tablet columns | 8 | DP-1 Grid-System |
| Mobile columns | 4 | DP-1 Grid-System |
| Desktop gutter | 24px | DP-1 Grid-System |
| Tablet gutter | 20px | DP-1 Grid-System |
| Mobile gutter | 16px | DP-1 Grid-System |
| Card radius | 8px | DP-1 Border-Radius |
| Modal radius | 12px | DP-1 Border-Radius |
| Sidebar width (expanded) | 240px | DP-1 Layout-Principles |
| Sidebar width (collapsed) | 64px | DP-1 Layout-Principles |
| Top bar height | 56px | DP-1 Layout-Principles |
| Content max width | 1140px (standard), 1440px (wide) | DP-1 Grid-System |
| Card padding | 24px (standard), 16px (compact) | DP-1 Layout-Principles |
| Elevation layers | 0–5 | DP-1 Elevation-System |
| Density modes | Comfortable, Compact, Dense | DP-1 Spacing-System |

---

## Wireframe Convention

Each wireframe uses this specification format:

```
┌─────────────────────────────────────────────────┐
│  SECTION NAME                                    │
│  ┌─────────────────────────────────────────────┐ │
│  │ Element description with exact dimensions   │ │
│  │ Position: [placement relative to parent]    │ │
│  │ Size: [width x height in px]               │ │
│  │ Spacing: [margin/padding with token ref]   │ │
│  │ Token: [design token used]                  │ │
│  └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

Width references in the wireframes assume the 1140px standard content area on desktop (1280px viewport with 240px sidebar + 32px page margins). Mobile references assume a 375px viewport.

---

## Design Principles Applied

1. **Primary color limited to ~10% of any screen** — Color-System.md Rule 1
2. **Neutral colors dominate ~80% of any screen** — Color-System.md Rule 2
3. **One primary layout per page** — Layout-Principles.md Rule 1
4. **Content determines height** — Layout-Principles.md Rule 2
5. **Every action has feedback** — Feedback-System.md Rule 1
6. **Skeleton screens match final layout** — Loading-System.md Rule 3
7. **Empty states suggest clear next action** — Empty-State-System.md Rule 2
8. **Three elevation layers maximum per viewport** — Elevation-System.md Rule 6
9. **Semantic colors only for named purpose** — Color-System.md Rule 3
10. **AI never interrupts** — AI-Experience.md Rule 1

---

## Cross-Reference Legend

| Reference | Meaning |
|-----------|---------|
| → DP-1:Color | Color token specification |
| → DP-1:Type | Typography token specification |
| → DP-1:Space | Spacing token specification |
| → DP-1:Grid | Grid column system |
| → DP-1:Elev | Elevation layer |
| → DP-1:Shadow | Shadow token |
| → DP-1:Radius | Border radius token |
| → DP-1:Loading | Loading state pattern |
| → DP-1:Empty | Empty state pattern |
| → DP-1:Error | Error state pattern |
| → DP-1:Glass | Glass surface spec |
| → DP-2:Comp | Component library reference |
| → DP-4:Layout | Application shell layout |
| → DP-5:Visual | Visual foundation reference |
| → DP-6:IA | Information architecture |
| → DP-6:Nav | Navigation flow |
| → DP-6:AI | AI experience specification |
| → DP-6:Screen | Screen inventory |
| → DP-6:Resp | Responsive UX specification |
| → DP-6:Pattern | Interaction pattern |

---

*All wireframes in this phase are design specifications only. No frontend implementation code exists in this phase. Refer to the individual wireframe documents for complete screen specifications.*
