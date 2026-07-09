# MR:EGO Application Shell — DP-4

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([01-Constitution/](../01-Constitution/)), DP-1 ([02-Design-Language/](../02-Design-Language/)), DP-2 ([03-Design-System/](../03-Design-System/)), DP-3 ([04-Component-Library/](../04-Component-Library/))

---

## Overview

The Application Shell defines the complete workspace architecture for MR:EGO. This is the structural foundation that every screen, page, and module occupies. It composes DP-3 Layout components (Workspace, Sidebar, Topbar, ContentArea, ResizablePanel, SplitView, Grid, Stack, Section) into a coherent, modular, responsive application framework.

This phase produces **architecture and specifications only** — no React, CSS, Tailwind, HTML, or visual implementation.

---

## Architecture Layers

```
Application Shell (DP-4)
├── Workspace Architecture      — Philosophy, hierarchy, zones, areas, rules
├── Navigation Model            — Primary, secondary, context, breadcrumb, command, keyboard
├── Header Architecture         — Search, actions, notifications, switcher, AI, theme, language, user
├── Sidebar Architecture        — Collapse, groups, pinned, recent, favorites, adaptive
├── Panel System                — Panel types, rules, behavior
├── Region System               — Primary, secondary, context, AI, inspector, preview, floating, modal
├── Layout Templates            — Dashboard, workspace, documents, jobs, analytics, settings, profile, wizard, auth
├── Responsive System           — Breakpoint-specific behavior for all device classes
├── Accessibility               — Keyboard, screen reader, focus, contrast, motion, touch
├── State System                — Loading, offline, error, maintenance, unauthorized, read-only, empty, success
└── Architecture                — Performance, security, command palette
```

---

## Document Structure

```
05-Application-Shell/
├── README.md                         # This file — DP-4 index
├── Architecture/
│   ├── Architecture.md               # DP-4 document relationships, inheritance map
│   ├── Performance.md                # Lazy loading, region rendering, virtualization, budgets
│   ├── Security.md                   # Workspace isolation, permission zones, protected regions
│   └── Command-Palette.md            # Global search, actions, AI commands, navigation, history
│
├── Workspace/
│   ├── Workspace-Philosophy.md       # Core workspace beliefs and design approach
│   ├── Workspace-Hierarchy.md        # Workspace levels and nesting rules
│   ├── Content-Zones.md              # Primary, secondary, tertiary content placement
│   ├── AI-Zones.md                   # AI interaction surfaces and rules
│   ├── Information-Zones.md          # Data display and info surfaces
│   ├── Focus-Zones.md                # Attention management and focus isolation
│   ├── Resizable-Areas.md            # User-adjustable region sizing
│   ├── Split-Workspace.md            # Multi-pane workspace configurations
│   ├── Dock-Areas.md                 # Docking and undocking behavior
│   ├── Panel-Rules.md                # Panel placement, stacking, behavior
│   ├── Safe-Areas.md                 # Notch, status bar, device safe zones
│   └── Scrolling-Rules.md            # Scroll containers, nested scroll, position memory
│
├── Navigation/
│   ├── Primary-Navigation.md         # Main module navigation
│   ├── Secondary-Navigation.md       # Sub-module and section navigation
│   ├── Context-Navigation.md         # Context-aware in-page navigation
│   ├── Breadcrumb-Strategy.md        # Hierarchical location indicators
│   ├── Command-Navigation.md         # Command-based navigation (Ctrl+K)
│   └── Keyboard-Navigation.md        # Full keyboard operation model
│
├── Header/
│   ├── Header-Architecture.md        # Overall header system design
│   ├── Global-Search.md              # Universal search across modules
│   ├── Quick-Actions.md              # One-click action triggers
│   ├── Notifications.md              # Notification center and alerts
│   ├── Workspace-Switcher.md         # Module and workspace switching
│   ├── AI-Shortcut.md                # Quick AI access from anywhere
│   ├── Theme-Switch.md               # Light/dark/system theme toggle
│   ├── Language-Switch.md            # Locale and language selection
│   └── User-Menu.md                  # Profile, settings, logout
│
├── Sidebar/
│   └── Sidebar-Architecture.md       # Complete sidebar system
│
├── Panels/
│   └── Panel-Architecture.md         # Complete panel system
│
├── Regions/
│   ├── Region-Architecture.md        # Region system overview
│   ├── Primary-Region.md             # Main content region
│   ├── Secondary-Region.md           # Supporting content region
│   ├── Context-Region.md             # Context-dependent info region
│   ├── AI-Region.md                  # AI interaction surfaces
│   ├── Inspector-Region.md           # Detail inspection region
│   ├── Preview-Region.md             # Preview and sandbox region
│   ├── Floating-Region.md            # Floating windows and overlays
│   └── Modal-Region.md               # Modal dialog surface
│
├── Layouts/
│   ├── Dashboard-Layout.md           # Home dashboard blueprint
│   ├── Workspace-Layout.md           # Multi-pane workspace blueprint
│   ├── Documents-Layout.md           # Document browsing and editing blueprint
│   ├── Jobs-Layout.md                # Job discovery and tracking blueprint
│   ├── Analytics-Layout.md           # Data analysis and charts blueprint
│   ├── Settings-Layout.md            # Configuration pages blueprint
│   ├── Profile-Layout.md             # User profile blueprint
│   ├── Wizard-Layout.md              # Multi-step flow blueprint
│   └── Authentication-Layout.md      # Login, register, reset blueprint
│
├── Responsive/
│   ├── Responsive-Architecture.md    # Overview of responsive behavior across devices
│   ├── Desktop.md                    # 1280px+ behavior
│   ├── Laptop.md                     # 1024-1279px behavior
│   ├── Tablet.md                     # 768-1023px behavior
│   ├── Mobile.md                     # 320-767px behavior
│   ├── Ultra-wide.md                 # 1920px+ behavior
│   ├── Foldables.md                  # Foldable and dual-screen behavior
│   └── Future-Devices.md             # Emerging device class adaptation
│
├── Accessibility/
│   ├── Keyboard-Navigation.md        # Keyboard model for the shell
│   ├── Screen-Readers.md             # Screen reader announcements and landmarks
│   ├── Focus-Order.md                # Logical focus movement
│   ├── Contrast.md                   # Shell-specific contrast rules
│   ├── Reduced-Motion.md             # Motion preferences for shell
│   └── Touch-Targets.md              # Touch target size and placement
│
└── States/
    ├── Loading.md                    # Shell-level loading states
    ├── Offline.md                    # Offline behavior and UI
    ├── Error.md                      # Shell-level error states
    ├── Maintenance.md                # System maintenance mode
    ├── Unauthorized.md               # Access denied state
    ├── Read-Only.md                  # Read-only mode UI
    ├── Empty.md                      # Shell-level empty states
    └── Success.md                    # Success confirmation states
```

---

## Design Authority Chain

```
DP-0 Constitution (permanent)
    ↓
DP-1 Design Language (color, type, space, motion, accessibility)
    ↓
DP-2 Design System (component specs, tokens, patterns)
    ↓
DP-3 Component Library (component contracts, composition, hierarchy)
    ↓
DP-4 Application Shell (workspace architecture, layouts, navigation — this phase)
    ↓
DP-5 Data Model (entities, relations, storage — next phase)
```

Every architectural decision in DP-4 derives from DP-0 through DP-3. No decision contradicts the Constitution, Design Language, Design System, or Component Library.

---

## Inheritance from DP-3

| DP-3 Document | Used By DP-4 |
|---------------|--------------|
| Layout/Workspace.md | All layout templates — shell composition |
| Layout/ContentArea.md | Region sizing and scroll management |
| Layout/SplitView.md | Split workspace configurations |
| Layout/ResizablePanel.md | Resizable area specifications |
| Layout/Grid.md | Dashboard layout grid |
| Layout/Stack.md | Region stacking rules |
| Layout/Section.md | Region divisions |
| Navigation/Sidebar.md | Sidebar architecture |
| Navigation/Topbar.md | Header architecture |
| Navigation/Breadcrumb.md | Breadcrumb strategy |
| Navigation/CommandPalette.md | Command palette and navigation |
| Navigation/NavigationRail.md | Compact navigation variant |
| Feedback/Toast.md | Notification system |
| Feedback/Dialog.md | Modal region |
| Feedback/EmptyState.md | Empty state patterns |
| Feedback/ErrorState.md | Error state patterns |
| Feedback/LoadingState.md | Loading state patterns |
| Feedback/Skeleton.md | Shell skeleton screens |
| Patterns/Dashboard-Pattern.md | Dashboard layout |
| Patterns/AI-Workspace-Pattern.md | AI zone layout |
| Patterns/Settings-Pattern.md | Settings layout |
| Patterns/Profile-Pattern.md | Profile layout |
| Patterns/Authentication-Pattern.md | Auth layout |
| Patterns/Wizard-Pattern.md | Wizard layout |

---

## Key Rules

1. **No implementation in this phase.** Architecture and specifications only.
2. **All layouts compose DP-3 components.** No new component contracts are created — only new configurations.
3. **Every layout accounts for every state.** Loading, empty, error, offline are defined for every template.
4. **Responsive behavior is specified per layout.** Each layout defines how it adapts across all breakpoints.
5. **Accessibility is built into every layout.** Keyboard, screen reader, and focus rules are part of every layout definition.
6. **Expansion is built in.** Layouts are designed to accommodate future modules without structural changes.
7. **No duplicate layouts.** Each layout type has a single definition. Modules configure, not duplicate.

---

*This Application Shell is the permanent structural foundation for MR:EGO. All pages, modules, and workflows occupy this architecture. Refer to [Architecture/Architecture.md](Architecture/Architecture.md) for the complete dependency map.*
