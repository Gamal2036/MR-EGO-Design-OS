# Workspace Layout

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([AI-Workspace-Pattern.md](../../04-Component-Library/Patterns/AI-Workspace-Pattern.md), [Workspace.md](../../04-Component-Library/Layout/Workspace.md))

---

## Purpose

The Workspace Layout provides a multi-pane environment for AI-assisted work — combining content, AI chat, and reasoning surfaces in a single cohesive view.

---

## Layout Blueprint

```
Workspace (variant: with-context-panel)
├── Header (full variant)
├── Sidebar (expanded or collapsed — user preference)
├── PrimaryRegion (max-width: full)
│   ├── PageHeader
│   │   ├── PageTitle (context-dependent)
│   │   └── PageActions: [New, Save, Export, AI Actions]
│   ├── ToolbarSection
│   │   └── (context-specific toolbar)
│   └── ContentSection
│       └── (primary work surface — document editor, code editor, form, etc.)
├── ContextRegion (optional — right panel, 320px)
│   └── (selection-dependent details)
├── AIRegion (right panel, 400px, collapsible)
│   ├── AIChat (Conversation)
│   ├── AIReasoning (ReasoningPanel)
│   └── AISuggestions (RecommendationCard[])
└── FloatingRegion (optional)
    └── (detached panels)
```

---

## Layout Rules

| Rule | Description |
|------|-------------|
| Content-first | Primary content takes the majority of horizontal space |
| AI always available | AI panel can be toggled with Ctrl+I |
| Context-dependent | Context region appears based on selection |
| Focus mode | Supports full-screen focus mode (chrome hidden) |

---

## Responsive Adaptation

| Device | Region Configuration |
|--------|---------------------|
| Desktop (1280px+) | Primary + AI + optional Context |
| Laptop (1024-1279px) | Primary + AI (Context collapses) |
| Tablet (768-1023px) | Primary only. AI accessible via bottom sheet. |
| Mobile (<768px) | Primary full width. AI as full-screen modal. |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Workspace/AI-Zones.md](../Workspace/AI-Zones.md) | AI zone integration |
| [Regions/AI-Region.md](../Regions/AI-Region.md) | AI region specification |
| [Workspace/Split-Workspace.md](../Workspace/Split-Workspace.md) | Split pane configurations |

---

*The Workspace Layout is the primary environment for AI-assisted professional work. It embeds AI directly into the workflow.*
