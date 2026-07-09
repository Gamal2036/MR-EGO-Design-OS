# Architecture (Visual Foundation)

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Architecture-Overview.md](../../01-Constitution/Architecture-Overview.md))

---

## Visual Foundation Architecture

DP-5 Visual Foundation sits between DP-1 (Design Language — concrete specifications) and future phases (DP-6 UX Flow & Wireframes, DP-7 Core Workspace). It provides the emotional and experiential layer that governs how visual specifications are applied.

---

## Layer Position

```
┌──────────────────────────────────────────────┐
│  DP-6 UX Flow & Wireframes (Future)          │
│  Page-level user experience design           │
├──────────────────────────────────────────────┤
│  DP-4 Application Shell (Complete)           │
│  Layout architecture, regions, navigation     │
├──────────────────────────────────────────────┤
│  DP-3 Component Library (Complete)            │
│  Component contracts, props, composition      │
├──────────────────────────────────────────────┤
│  DP-2 Design System (Complete)                │
│  Component specs, tokens, patterns            │
├──────────────────────────────────────────────┤
│  DP-5 VISUAL FOUNDATION (THIS PHASE)          │
│  Visual personality, emotion, experience lang │
├──────────────────────────────────────────────┤
│  DP-1 Design Language (Complete)              │
│  Color, type, space, motion, icon specs       │
├──────────────────────────────────────────────┤
│  DP-0 Constitution (Complete)                 │
│  Permanent governing principles               │
└──────────────────────────────────────────────┘
```

---

## Architecture Principles

### 1. Emotional Over Technical

DP-5 defines the *feel* of the visual language. Technical specifications (DP-1, DP-2) define the *implementation*. DP-5 does not duplicate DP-1 — it describes the emotional intent behind the technical values.

### 2. Experience Over Specification

DP-5 describes how visual elements make users feel, not what values they use. This is the experiential layer — the "why" behind the "what."

### 3. Permanent but Extensible

DP-5 establishes permanent visual identity (personality, emotion, light model, depth system) while defining clear extension points for future growth.

### 4. Integrated, Not Isolated

DP-5 connects to DP-0 (constitutional authority), DP-1 (concrete specifications), DP-3 (component implementation), and DP-4 (layout architecture). It is not a standalone phase.

---

## Document Relationships

| DP-5 Document | Inherits From | Extends | Feeds Into |
|--------------|---------------|---------|------------|
| Visual-Personality.md | Brand-Constitution.md, Design-Principles.md | — | All DP-5 documents |
| Visual-Emotion.md | Brand-Constitution.md | — | Brand-Emotion.md |
| Light-Sources.md | Shadow-System.md, Elevation-System.md | — | All Lighting documents |
| Depth-System.md | Elevation-System.md, Shadow-System.md | — | All Depth documents |
| Glass-Usage.md | Glass-System.md | — | All Glass documents |
| Color-Emotion.md | Color-System.md | — | All Color-Emotion documents |
| Motion-System.md | Motion-System.md, Animation-Principles.md | — | MicroInteractions.md |
| AI-Visual-Language.md | Product-Constitution.md, AI-Components.md | — | DP-6 AI Framework |
| Iconography.md | Iconography.md | — | DP-3 Icon component |
| Illustrations.md | Illustration-Guidelines.md | — | DP-6 illustrations |
| Brand-Emotion.md | Brand-Constitution.md | — | DP-6 UX Flow |
| Accessibility.md | Accessibility.md, UX-Constitution.md | — | All future phases |
| Future-Visual-Expansion.md | Future-Expansion.md | — | DP-8+ modules |

---

## Phase Authority Flow

```
DP-0 Constitution (Highest)
    │
    ▼
DP-1 Design Language (Concrete specs)
    │
    ▼
DP-5 VISUAL FOUNDATION (Emotional layer)
    │
    ├───► DP-6 UX Flow & Wireframes
    ├───► DP-7 Core Workspace
    └───► DP-8+ Modules
```

DP-5 does not override DP-1. It provides the emotional rationale for DP-1's specifications and guides how they are applied in future phases.

---

*This Architecture document is permanent. It defines DP-5's position in the Design OS hierarchy. Refer to [Architecture-Overview.md](../../01-Constitution/Architecture-Overview.md) for the complete phase architecture, [README.md](README.md) for the directory structure, and [Cross-References.md](Cross-References.md) for cross-document relationships.*
