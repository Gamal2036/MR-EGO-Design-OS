# Architecture — Design Language

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Architecture-Overview.md](../01-Constitution/Architecture-Overview.md))

---

## Purpose

This document explains how the Design Language (DP-1) is structured, how its documents relate to each other, and how DP-2 (Design System) inherits from DP-1.

---

## Document Dependency Map

```
                    DP-0 CONSTITUTION
                    (Authority source)
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   Color-System.md   Typography.md    Spacing-System.md
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ Design-Tokens│
                    │ (Token names)│
                    └──────┬───────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼
   Grid-System.md   Elevation-System.md  Border-Radius.md
   Shadow-System.md  Glass-System.md
         │                 │                 │
         └─────────────────┼─────────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │Layout-Prin-  │
                    │ciples.md     │
                    └──────┬───────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼
   Responsive-       Motion-System.md   Animation-
   System.md         (Duration/Easing)  Principles.md
                           │
                           ▼
                    ┌──────────────┐
                    │Interaction-  │
                    │Language.md   │
                    └──────┬───────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼
   Feedback-         Loading-           Empty-State-
   System.md         System.md          System.md
   Error-State-
   System.md
                           │
                           ▼
                    ┌──────────────┐
                    │Iconography.md│
                    │Illustration- │
                    │Guidelines.md │
                    └──────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │Accessibility. │
                    │md             │
                    └──────────────┘
                           │
                           ▼
                    DP-2 DESIGN SYSTEM
                    (Component implementation)
```

---

## Document Categories

### Foundation Documents (Core Specs)

These documents define the raw values of the design language. They are the source of truth for all other DP-1 documents and for DP-2.

| Document | Defines |
|----------|---------|
| [Color-System.md](Color-System.md) | Color palette, semantics, themes, contrast |
| [Typography.md](Typography.md) | Typefaces, scale, weights, readability |
| [Spacing-System.md](Spacing-System.md) | Spacing scale, density modes, responsive spacing |

### Structure Documents

These documents define spatial organization and depth.

| Document | Defines |
|----------|---------|
| [Grid-System.md](Grid-System.md) | Breakpoints, columns, containers, dashboard grids |
| [Elevation-System.md](Elevation-System.md) | Layer system, z-index, elevation rules |
| [Border-Radius.md](Border-Radius.md) | Radius scale, usage rules |
| [Shadow-System.md](Shadow-System.md) | Shadow values, theme-specific shadows |
| [Glass-System.md](Glass-System.md) | Glass specification, usage rules |

### Motion Documents

These documents define time and movement.

| Document | Defines |
|----------|---------|
| [Motion-System.md](Motion-System.md) | Duration scale, easing curves, context-based timing |
| [Animation-Principles.md](Animation-Principles.md) | 6 animation principles, implementation rules |

### Layout Documents

These documents define composition and behavior.

| Document | Defines |
|---------|---------|
| [Layout-Principles.md](Layout-Principles.md) | Navigation, content areas, panels, cards, forms |
| [Responsive-System.md](Responsive-System.md) | Breakpoint behavior, layout adaptation |
| [Interaction-Language.md](Interaction-Language.md) | Click, hover, focus, drag, swipe patterns |

### State Documents

These documents define interface states.

| Document | Defines |
|----------|---------|
| [Feedback-System.md](Feedback-System.md) | Toasts, banners, confirmations, feedback timing |
| [Loading-System.md](Loading-System.md) | Skeletons, spinners, progress bars |
| [Empty-State-System.md](Empty-State-System.md) | Empty state patterns, illustration, copy |
| [Error-State-System.md](Error-State-System.md) | Error types, recovery, message writing |

### Visual Asset Documents

These documents define non-text visual elements.

| Document | Defines |
|----------|---------|
| [Iconography.md](Iconography.md) | Icon style, sizes, consistency rules |
| [Illustration-Guidelines.md](Illustration-Guidelines.md) | Illustration style, usage, composition |

### Governance Documents

These documents define accessibility and token structure.

| Document | Defines |
|----------|---------|
| [Accessibility.md](Accessibility.md) | Contrast, keyboard, screen reader, focus |
| [Design-Tokens.md](Design-Tokens.md) | Token philosophy, naming, architecture |

---

## Inheritance to DP-2

The Design System (DP-2) inherits all specifications from DP-1:

| DP-1 Document | DP-2 Deliverable |
|---------------|-------------------|
| Color-System.md | Color tokens, theme files |
| Typography.md | Type ramp tokens, font family tokens |
| Spacing-System.md | Spacing tokens |
| Grid-System.md | Layout component patterns |
| Elevation-System.md | Z-index tokens, elevation mixins |
| Border-Radius.md | Radius tokens |
| Shadow-System.md | Shadow tokens |
| Glass-System.md | Glass component pattern |
| Motion-System.md | Animation tokens |
| Animation-Principles.md | Animation utility classes |
| Layout-Principles.md | Page layout components |
| Responsive-System.md | Responsive utility classes |
| Interaction-Language.md | Interaction mixins |
| Feedback-System.md | Toast, banner, dialog components |
| Loading-System.md | Skeleton, spinner components |
| Empty-State-System.md | Empty state component |
| Error-State-System.md | Error boundary component |
| Iconography.md | Icon component |
| Illustration-Guidelines.md | Illustration component |
| Accessibility.md | Accessibility mixins, test patterns |
| Design-Tokens.md | Token file structure |

No DP-2 component specification may contradict any DP-1 document.

---

## Design Authority

| Document Type | Authority Level | Change Process |
|---------------|-----------------|----------------|
| Foundation documents | Highest | Requires constitutional review |
| Structure documents | High | Team review required |
| Motion documents | High | Team review required |
| Layout documents | Medium | Design lead approval |
| State documents | Medium | Design lead approval |
| Visual asset documents | Medium | Design lead approval |
| Governance documents | High | Team review required |

---

*This Architecture document is permanent. All future DP-1 revisions and all DP-2 work reference this structure. Refer to [Architecture-Overview.md](../01-Constitution/Architecture-Overview.md) for the full design OS architecture, and [Design-Tokens.md](Design-Tokens.md) for token structure.*
