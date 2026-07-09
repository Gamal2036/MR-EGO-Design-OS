# MR:EGO Design Language — DP-1

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([01-Constitution/](../01-Constitution/))

---

## Overview

The Design Language is the concrete visual vocabulary of MR:EGO. It translates the permanent principles of DP-0 (Project, Brand, Product, UX Constitutions, and Design Principles) into specific, actionable design specifications.

Every color, typeface, spacing value, animation duration, and shadow in MR:EGO is defined here. These specifications are the single source of truth for all visual design decisions across the platform.

---

## Document Structure

```
02-Design-Language/
├── README.md                     # This file
│
├── Foundation/
│   ├── Color-System.md           # Color palette, semantics, themes, accessibility
│   ├── Typography.md             # Typefaces, scale, weights, readability
│   └── Spacing-System.md         # Spacing scale, density, responsive spacing
│
├── Structure/
│   ├── Grid-System.md            # Breakpoints, columns, containers
│   ├── Elevation-System.md       # Layer system, z-index
│   ├── Border-Radius.md          # Radius scale, usage
│   ├── Shadow-System.md          # Shadow values, themes
│   └── Glass-System.md           # Glass specification, do/don't
│
├── Motion/
│   ├── Motion-System.md          # Duration, easing, context timing
│   └── Animation-Principles.md   # 6 animation principles
│
├── Layout/
│   ├── Layout-Principles.md      # Navigation, content, panels, cards
│   ├── Responsive-System.md      # Breakpoint behavior, adaptation
│   └── Interaction-Language.md   # Click, hover, focus, drag, swipe
│
├── States/
│   ├── Feedback-System.md        # Toasts, banners, confirmations
│   ├── Loading-System.md         # Skeletons, spinners, progress
│   ├── Empty-State-System.md     # Empty state patterns
│   └── Error-State-System.md     # Error types, recovery
│
├── Assets/
│   ├── Iconography.md            # Icon style, sizes, rules
│   └── Illustration-Guidelines.md # Illustration style, usage
│
└── Governance/
    ├── Accessibility.md          # Contrast, keyboard, screen reader
    ├── Design-Tokens.md          # Token philosophy, naming, architecture
    └── Architecture.md           # Document relationships, dependency map
```

---

## How to Use These Documents

### For Designers

Start with the Foundation documents (Color, Typography, Spacing). Then read Structure and Layout for composition rules. Use State documents for interaction patterns. Reference Governance documents for constraints.

### For Engineers

Start with Design-Tokens.md for the token architecture. Reference individual specification documents as needed during implementation. Always use the defined tokens — never hardcode values.

### For Product Managers

Read the Design Language Architecture document and README for overview. Reference specific documents during feature definition to understand design constraints.

---

## Key Principles

1. **Every value has a reason.** No arbitrary colors, sizes, or durations.
2. **Consistency is enforced through tokens.** No hardcoded values.
3. **Accessibility is built in.** WCAG AA minimum, AAA target.
4. **Scalability by design.** The language accommodates future modules without modification.
5. **Dark and light are equal.** Both themes are fully specified from day one.

---

## Relationship to DP-2

The Design System (DP-2) implements these specifications as concrete components, tokens, and patterns. Every component in DP-2 derives its visual properties from this Design Language. No component introduces new colors, sizes, or durations.

*See [Architecture.md](Architecture.md) for the complete dependency map between DP-1 documents and DP-2 deliverables.*
