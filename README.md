# MR:EGO Design Operating System

**Version:** 1.0
**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Status:** FOUNDATION — Permanent

---

## Purpose

The MR:EGO Design Operating System (Design OS) is the complete set of governing documents, principles, rules, and architectural guidelines for the MR:EGO platform. It ensures every interface, workflow, feature, and module is designed to the same uncompromising standard of quality, consistency, and user experience.

The Design OS is not a one-time artifact — it is the permanent design authority for the lifetime of the product.

## Philosophy

The Design OS is built on four foundational beliefs:

1. **Design is a system, not a collection of pages.** Every interface is an expression of the same rules, principles, and patterns.
2. **Quality is not optional.** Every interaction, every pixel, every micro-animation must meet the same high standard.
3. **Consistency is freedom.** When the platform is predictable, users can focus on their work, not on learning new interfaces.
4. **The foundation never changes.** The constitutional documents in DP-0 are permanent. Only their application evolves.

## Folder Structure

```
MR-EGO-Design-OS/
├── README.md                        # This file
├── DESIGN_OS_DP0_REPORT.md          # DP-0 completion report
├── DESIGN_LANGUAGE_REPORT.md        # Links to DP-1 report
├── COMPONENT_LIBRARY_DP3_REPORT.md  # DP-3 completion report
├── APPLICATION_SHELL_DP4_REPORT.md  # DP-4 completion report
│
├── 01-Constitution/                 # DP-0: Foundation — Permanent governing documents
│   ├── Project-Constitution.md      # Vision, mission, philosophy, core values
│   ├── Brand-Constitution.md        # Brand personality, voice, visual identity
│   ├── Product-Constitution.md      # Product principles, feature philosophy, AI rules
│   ├── UX-Constitution.md           # 20 permanent, non-negotiable UX rules
│   ├── Design-Principles.md         # 10 permanent visual design principles
│   ├── Future-Expansion.md          # Expansion roadmap and architecture for growth
│   ├── Glossary.md                  # Definitive terminology reference
│   └── Architecture-Overview.md     # Phase structure, dependencies, document relationships
│
├── 02-Design-Language/              # DP-1: Design Language — Permanent visual vocabulary
│   ├── README.md                    # Design Language index
│   ├── Architecture.md              # DP-1 document relationships
│   ├── Color-System.md              # Color palette, semantics, themes
│   ├── Typography.md                # Typefaces, scale, weights
│   ├── Spacing-System.md            # Spacing scale, density
│   ├── Grid-System.md               # Breakpoints, columns, containers
│   ├── Elevation-System.md          # Layer system, z-index
│   ├── Border-Radius.md             # Radius scale
│   ├── Shadow-System.md             # Shadow values
│   ├── Glass-System.md              # Glass specification
│   ├── Motion-System.md             # Duration, easing
│   ├── Animation-Principles.md      # Animation rules
│   ├── Layout-Principles.md         # Layout patterns
│   ├── Responsive-System.md         # Responsive behavior
│   ├── Interaction-Language.md      # Interaction patterns
│   ├── Feedback-System.md           # Feedback states
│   ├── Loading-System.md            # Loading patterns
│   ├── Empty-State-System.md        # Empty states
│   ├── Error-State-System.md        # Error states
│   ├── Iconography.md               # Icon style, sizes
│   ├── Illustration-Guidelines.md   # Illustration style
│   ├── Accessibility.md             # Accessibility specs
│   ├── Design-Tokens.md             # Token architecture
│   └── DESIGN_LANGUAGE_REPORT.md    # DP-1 completion report
│
├── 03-Design-System/                # DP-2: Design System — Component specs & tokens
│   ├── README.md                    # Design System index
│   ├── Architecture.md              # DP-2 document relationships
│   ├── Components/
│   │   ├── Buttons.md               # All button variants
│   │   ├── Cards.md                 # All card types
│   │   ├── Forms.md                 # Form controls
│   │   ├── Search.md                # Search patterns
│   │   ├── Navigation.md            # Navigation patterns
│   │   ├── Tables.md                # Data tables
│   │   ├── Dialogs.md               # Modals, drawers
│   │   ├── Feedback.md              # Toasts, banners
│   │   ├── Loading.md               # Skeletons, spinners
│   │   ├── EmptyStates.md           # Empty state patterns
│   │   ├── Charts.md                # Chart type rules
│   │   ├── Uploads.md               # Upload zones
│   │   ├── AI-Components.md         # AI-specific components
│   │   └── Dashboard-Components.md  # Dashboard components
│   └── Tokens/
│       └── README.md                # Component token extensions
│
└── 04-Component-Library/            # DP-3: Component Library — Implementation contracts
    ├── README.md                    # Component Library index
    ├── Design-Contracts.md          # Universal design contracts
    ├── Architecture/                # Component hierarchy, dependency graph, rules
    │   ├── Component-Hierarchy.md
    │   ├── Dependency-Graph.md
    │   ├── Inheritance-Rules.md
    │   ├── Naming-Convention.md
    │   ├── Folder-Structure.md
    │   ├── Composition-Rules.md
    │   └── Reusable-Pattern-Rules.md
    ├── Core/                        # Foundational building blocks (15 components)
    ├── Forms/                       # Data input and capture (16 components)
    ├── Navigation/                  # Application navigation (10 components)
    ├── Dashboard/                   # Overview and analytics surfaces (9 components)
    ├── AI/                          # AI interaction components (10 components)
    ├── Documents/                   # File and document handling (6 components)
    ├── Feedback/                    # User feedback and system state (10 components)
    ├── Data/                        # Data display and manipulation (9 components)
    ├── Layout/                      # Page and screen structure (8 components)
    ├── Charts/                      # Data visualization contracts (7 components)
    ├── Utilities/                   # Shared infrastructure (9 components)
    └── Patterns/                    # Reusable interaction blueprints (11 patterns)
│
└── 05-Application-Shell/            # DP-4: Application Shell & Workspace Architecture
    ├── Architecture/                 # Performance, security, command palette
    ├── Workspace/                    # Philosophy, hierarchy, zones, areas, rules
    ├── Navigation/                   # Primary, secondary, context, breadcrumb, command
    ├── Header/                       # Search, actions, notifications, switcher, AI, theme, language, user
    ├── Sidebar/                      # Collapse, groups, pinned, recent, favorites
    ├── Panels/                       # Panel types, rules, behavior
    ├── Regions/                      # Primary, secondary, context, AI, inspector, preview, floating, modal
    ├── Layouts/                      # 9 page layout blueprints
    ├── Responsive/                   # Device-class specific behavior
    ├── Accessibility/                # Keyboard, screen reader, focus, contrast, motion, touch
    └── States/                       # Loading, offline, error, maintenance, unauthorized, read-only, empty, success
```

## How to Use These Documents

### For Product Managers

Start with [Project-Constitution.md](01-Constitution/Project-Constitution.md) to understand the vision, mission, and values. Then read [Product-Constitution.md](01-Constitution/Product-Constitution.md) for feature qualification criteria and decision rules. Use [Future-Expansion.md](01-Constitution/Future-Expansion.md) when planning new capabilities. Reference the [Design System](03-Design-System/README.md) for component capabilities and the [Component Library](04-Component-Library/README.md) for implementation contracts.

### For Designers

Start with [Design-Principles.md](01-Constitution/Design-Principles.md) to understand the visual philosophy. Then read [Brand-Constitution.md](01-Constitution/Brand-Constitution.md) for brand expression and [UX-Constitution.md](01-Constitution/UX-Constitution.md) for experience rules. Study [Design Language](02-Design-Language/README.md) for visual vocabulary and [Design System](03-Design-System/README.md) for component specifications. Reference the [Component Library](04-Component-Library/README.md) for implementation contracts and composition rules.

### For Engineers

Start with [Architecture-Overview.md](01-Constitution/Architecture-Overview.md) to understand phase dependencies. Reference [Product-Constitution.md](01-Constitution/Product-Constitution.md) for modularity rules. Use the [Design Language](02-Design-Language/README.md) for token architecture, the [Design System](03-Design-System/README.md) for component specifications, and the [Component Library](04-Component-Library/README.md) for implementation contracts and prop definitions.

## How to Use These Documents

### For Product Managers

Start with [Project-Constitution.md](01-Constitution/Project-Constitution.md) to understand the vision, mission, and values. Then read [Product-Constitution.md](01-Constitution/Product-Constitution.md) for feature qualification criteria and decision rules. Use [Future-Expansion.md](01-Constitution/Future-Expansion.md) when planning new capabilities. Reference the [Design System](03-Design-System/README.md) for component capabilities.

### For Designers

Start with [Design-Principles.md](01-Constitution/Design-Principles.md) to understand the visual philosophy. Then read [Brand-Constitution.md](01-Constitution/Brand-Constitution.md) for brand expression and [UX-Constitution.md](01-Constitution/UX-Constitution.md) for experience rules. Study [Design Language](02-Design-Language/README.md) for visual vocabulary and [Design System](03-Design-System/README.md) for component specifications.

### For Engineers

Start with [Architecture-Overview.md](01-Constitution/Architecture-Overview.md) to understand phase dependencies. Reference [Product-Constitution.md](01-Constitution/Product-Constitution.md) for modularity rules. Use the [Design Language](02-Design-Language/README.md) for token architecture and the [Design System](03-Design-System/README.md) for component specifications.

### For Everyone

Read [Project-Constitution.md](01-Constitution/Project-Constitution.md) in full. It is the source document from which all others derive. Every decision in MR:EGO must align with its principles. The Design OS is built in phases — start with the Constitution, then Design Language, then Design System.

## Design Authority Hierarchy

When documents conflict, authority flows in this order:

1. Project Constitution (highest)
2. Brand Constitution
3. Product Constitution
4. UX Constitution
5. Design Principles
6. Future Expansion — Glossary — Architecture Overview (supporting)

## Future Phases

| Phase | Name | Description | Status |
|-------|------|-------------|--------|
| DP-0 | Foundation | Constitutional documents | ✓ COMPLETE |
| DP-1 | Design Language | Color, typography, spacing, motion, iconography | ✓ COMPLETE |
| DP-2 | Design System | Component specifications, tokens, patterns | ✓ COMPLETE |
| DP-3 | Component Library | Component implementation contracts, API definitions, composition rules | ✓ COMPLETE |
| DP-4 | Application Shell | Workspace architecture, navigation, regions, layouts, responsive system | ✓ COMPLETE |
| DP-5 | Data Model | Entities, relations, storage, APIs | PENDING |
| DP-6 | AI Framework | Guardian-Provider-Executioner infrastructure | PENDING |
| DP-7 | Core Workspace | Dashboard, profile, navigation, onboarding | PENDING |
| DP-8+ | Modules | Career, Learning, Projects, and beyond | PENDING |

Each phase inherits all rules from DP-0. No phase contradicts the constitution.

---

*The Design OS is a living system. Documents are versioned and evolve through controlled amendments. The constitutional principles, however, are permanent. They are the foundation upon which MR:EGO is built and will continue to be built for years to come.*
