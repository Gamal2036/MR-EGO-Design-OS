# AI Region

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Conversation.md](../../04-Component-Library/AI/Conversation.md), [AI-Workspace-Pattern.md](../../04-Component-Library/Patterns/AI-Workspace-Pattern.md)), DP-0 ([Product-Constitution.md](../../01-Constitution/Product-Constitution.md) — AI Integration Rules)

---

## Purpose

The AI Region provides dedicated surfaces for AI interaction — natural language conversation, reasoning explanations, suggestions, and AI status.

---

## Composition

```
AIRegion
├── AIHeader
│   ├── AITitle ("AI Assistant")
│   ├── AIStatus (connected/processing/offline)
│   └── AIRegionActions (minimize, close)
├── AIBody (tabbed)
│   ├── AIChat (default)
│   │   ├── Conversation (message history)
│   │   └── PromptInput
│   ├── AIReasoning (optional tab)
│   │   ├── ReasoningPanel
│   │   └── ConfidenceBadge
│   └── AISuggestions (optional tab)
│       ├── RecommendationCard[]
│       └── InsightCard[]
└── AIFooter
    ├── ContextBadge (what AI can see)
    └── MemoryIndicator
```

---

## Behavior

| Behavior | Description |
|----------|-------------|
| Position | Right panel, rightmost position |
| Default size | 400px width |
| Min size | 320px |
| Toggle | Ctrl+I toggles visibility |
| Collapse | Collapses to thin tab (16px) on right edge |
| Resizable | Width adjustable via left-edge drag handle |
| Tabbed | Chat, Reasoning, Suggestions as tabs |
| Auto-collapse | Collapses after 30 seconds of inactivity (configurable) |

---

## AI Region Rules

| Rule | Description |
|------|-------------|
| Contextual | AI sees the current page context |
| Transparent | "What AI can see" is always indicated |
| Deferential | AI never interrupts active workflows |
| Dismissible | AI region can always be dismissed |
| Conversation persists | Chat history persists within a session |
| Graceful degradation | Region shows "AI unavailable" state when offline |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Workspace/AI-Zones.md](../Workspace/AI-Zones.md) | AI zone definitions |
| [Header/AI-Shortcut.md](../Header/AI-Shortcut.md) | AI shortcut that opens this region |
| [Context-Region.md](Context-Region.md) | Neighboring region |

---

*The AI Region is the primary surface for AI interaction. It follows the Guardian-Provider-Executioner model — advisory, transparent, and deferential.*
