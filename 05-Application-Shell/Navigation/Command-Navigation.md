# Command Navigation

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([CommandPalette.md](../../04-Component-Library/Navigation/CommandPalette.md)), DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md) — Rule 16)

---

## Purpose

Defines command-based navigation — the Ctrl+K / Cmd+K command palette that provides keyboard-driven access to every page, action, and setting.

---

## Command Categories

### Navigation Commands
Navigate to any page or section.

- All registered routes are available as commands
- Fuzzy matching on page title and keywords
- Most recently visited pages appear first
- Categories: Pages, Modules, Settings

### Action Commands
Execute any application action.

- Create new: document, job application, note, project
- Export: current view, selection, report
- AI actions: summarize, explain, translate
- System: toggle theme, toggle sidebar, focus mode

### AI Commands
AI-specific actions accessible from the command palette.

- "Ask AI to summarize this page"
- "Explain this data"
- "Generate a report from current view"
- "Find similar opportunities"
- Custom AI commands defined per module

### Settings Commands
Jump directly to any settings page.

- All settings sections are indexed
- Search includes setting descriptions
- Can toggle common settings directly (theme, language, notifications)

### Recent Commands
Previously executed commands for quick re-execution.

- Last 10 executed commands are stored
- Most frequent commands are promoted
- User can pin favorite commands
- Recent commands are cleared on explicit action

---

## Command Palette Rules

| Rule | Description |
|------|-------------|
| Universal shortcut | Ctrl+K / Cmd+K opens from anywhere in the application |
| Fuzzy search | Search matches partial terms, typos, and abbreviations |
| Category display | Results are grouped by category with visible labels |
| Keyboard first | Navigate results with arrow keys, execute with Enter |
| Mouse support | Results are clickable |
| Auto-focus | Search input is auto-focused on open |
| Escape to dismiss | Escape closes the palette without action |
| 200ms debounce | Search input debounced at 200ms for performance |
| Persistent history | Recent commands persist across sessions |

---

## Command Registry

Modules register their commands with the central command registry:

```typescript
interface RegisteredCommand {
  id: string;
  label: string;
  keywords: string[];
  category: 'navigation' | 'action' | 'ai' | 'settings';
  icon?: string;
  shortcut?: string;
  onExecute: () => void;
}
```

- Core commands are registered at application boot
- Module commands are registered when the module is enabled
- Plugin commands are registered via plugin API
- Commands can be disabled without unregistration

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Keyboard-Navigation.md](Keyboard-Navigation.md) | Keyboard model including command palette |
| [Architecture/Command-Palette.md](../Architecture/Command-Palette.md) | Full command palette architecture |
| [Primary-Navigation.md](Primary-Navigation.md) | Pages available via command navigation |

---

*Command navigation provides power users with rapid, keyboard-driven access to every part of the application. It is the fastest way to navigate for experienced users.*
