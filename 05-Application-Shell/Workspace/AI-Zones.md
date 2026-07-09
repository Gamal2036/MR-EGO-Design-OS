# AI Zones

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Product-Constitution.md](../../01-Constitution/Product-Constitution.md) — AI Integration Rules), DP-3 ([AI-Workspace-Pattern.md](../../04-Component-Library/Patterns/AI-Workspace-Pattern.md), [Conversation.md](../../04-Component-Library/AI/Conversation.md))

---

## Purpose

Defines the dedicated surfaces for AI interaction within the workspace. AI zones are embedded, contextual, and deferential — never interrupting active workflows unless critical.

---

## AI Zone Types

### AI Chat Panel
Dedicated conversation surface for natural language interaction with the AI.

- Occupies the AI Region (right-side panel by default)
- Contains Conversation component with message history
- Supports text input, file attachment, and slash commands
- Resizable and collapsible
- Persists conversation history within a session

### AI Suggestion Bar
Contextual suggestion strip appearing above or below content.

- Appears inline within Primary or Secondary regions
- Contains RecommendationCard or InsightCard components
- Displayed based on content context (document, data, job listing)
- Dismissible — once dismissed, does not reappear for the same context
- Max 3 suggestions visible at once

### AI Reasoning Panel
Detailed explanation surface for AI decisions and recommendations.

- Occupies the Context Region or Inspector Region
- Contains ReasoningPanel and ConfidenceBadge components
- Appears when user clicks "Explain" on an AI suggestion
- Collapsible — collapses to a summary badge by default
- Shows factors, sources, confidence level, and alternative options

### AI Quick Action
Floating trigger for rapid AI access from any workspace state.

- FloatingButton positioned at bottom-right of the workspace
- Triggers AI Chat Panel or contextual AI action
- Visible across all layouts except full-screen modes
- Can be temporarily hidden during focus mode

### AI Status Indicator
Subtle indicator of AI availability and activity.

- Occupies the Status Area (bottom-left of the workspace)
- Shows connection status, processing state, and context load
- Minimal — dot icon when idle, subtle animation when processing

---

## AI Zone Rules

| Rule | Description |
|------|-------------|
| Contextual appearance | AI zones appear only when relevant to the current task |
| Deferential positioning | AI zones never overlap primary content by default |
| Dismissibility | Every AI zone can be dismissed, collapsed, or hidden |
| Resizable | AI panels are resizable with min/max constraints |
| Persistence | AI zone state (open/closed, size) persists per layout |
| Transparency | AI content is visually distinct from user content |
| Graceful degradation | All AI zones vanish when AI services are unavailable |

---

## AI Zone Responsive Behavior

| Breakpoint | AI Chat Panel | Suggestion Bar | Reasoning Panel | Quick Action |
|------------|---------------|----------------|-----------------|--------------|
| Desktop (1280px+) | Right panel, 360-480px | Inline | Context panel | FloatingButton |
| Laptop (1024-1279px) | Right panel, 320px | Inline (compact) | Bottom sheet | FloatingButton |
| Tablet (768-1023px) | Bottom sheet | Inline (single) | Bottom sheet | FloatingButton |
| Mobile (<768px) | Full screen modal | Banner (dismissible) | Full screen modal | Hidden (menu access) |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Content-Zones.md](Content-Zones.md) | How AI zones relate to content zones |
| [Focus-Zones.md](Focus-Zones.md) | AI zone behavior during focus mode |
| [AI-Region.md](../Regions/AI-Region.md) | Region specification for AI panel |
| [Regions/Region-Architecture.md](../Regions/Region-Architecture.md) | Region system hosting AI zones |

---

*AI zones embed artificial intelligence into the workspace without disrupting the user's flow. They follow the Guardian-Provider-Executioner model defined in the Project Constitution.*
