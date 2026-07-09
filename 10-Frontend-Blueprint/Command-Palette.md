# Command Palette

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-4 ([Command-Palette.md](../05-Application-Shell/Architecture/Command-Palette.md)), DP-4 ([Navigation/Command-Navigation.md](../05-Application-Shell/Navigation/Command-Navigation.md))

---

## Purpose

Defines the command palette architecture — command registry, fuzzy search engine, result ranking, keyboard navigation, module integration, and responsive adaptation.

---

## Command Palette Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   COMMAND PALETTE                        │
├─────────────────────────────────────────────────────────┤
│  Command Registry                                        │
│  Core commands, module commands, plugin commands         │
├─────────────────────────────────────────────────────────┤
│  Search Engine                                           │
│  Fuzzy matching, keyword index, category grouping        │
├─────────────────────────────────────────────────────────┤
│  Ranking Layer                                           │
│  Relevance, recency, frequency, pinned boost             │
├─────────────────────────────────────────────────────────┤
│  UI Layer                                                │
│  Input, results list, category headers, active item      │
├─────────────────────────────────────────────────────────┤
│  Module Integration                                      │
│  Registration on mount, deregistration on unmount        │
└─────────────────────────────────────────────────────────┘
```

---

## Command Registry

```typescript
// Pseudocode
interface CommandRegistry {
  commands: CommandDefinition[];
  register(def: CommandDefinition): void;
  unregister(id: string): void;
  search(query: string): SearchResult[];
  getByCategory(category: string): CommandDefinition[];
}

interface CommandDefinition {
  id: string;
  name: string;
  description: string;
  category: CommandCategory;
  keywords: string[];
  icon: string;
  shortcut?: string;
  handler: () => void;
  moduleId: string;
  enabled: boolean;
  permissions: string[];
}

enum CommandCategory {
  Navigation,      // Go to pages
  Action,          // Perform actions
  AI,              // AI commands
  Settings,        // Settings pages
  Module,          // Module-specific
  Plugin,          // Plugin-specific
}
```

### Core Commands

| Command | Category | Shortcut |
|---------|----------|----------|
| Go to Dashboard | Navigation | g + d |
| Go to Jobs | Navigation | g + j |
| Go to AI Workspace | Navigation | g + a |
| Go to Documents | Navigation | g + c |
| Go to Profile | Navigation | g + p |
| Go to Settings | Navigation | g + s |
| Go to Notifications | Navigation | g + n |
| New Job Search | Action | n + j |
| Upload CV | Action | n + c |
| New Application | Action | n + a |
| New Document | Action | n + d |
| Ask AI | AI | Ctrl+I |
| Summarise Page | AI | — |
| Dark Mode | Settings | — |
| Language | Settings | — |

---

## Search Engine

### Fuzzy Matching Algorithm

```typescript
// Pseudocode
interface FuzzyMatch {
  command: CommandDefinition;
  score: number;            // 0-100
  matches: MatchRange[];    // Highlight ranges
}

function fuzzySearch(query: string, command: CommandDefinition): FuzzyMatch | null {
  // 1. Exact match (score: 100)
  // 2. Prefix match (score: 90)
  // 3. Word match (score: 70-80)
  // 4. Substring match (score: 50-60)
  // 5. Fuzzy match with typos (score: 30-40)
  // 6. Keyword match (score: 20-30)
  // No match → return null
}
```

### Result Ranking

```typescript
// Pseudocode
function rankResults(query: string, candidates: FuzzyMatch[]): SearchResult[] {
  return candidates
    .map(c => ({
      ...c,
      finalScore: c.score
        + (c.command.shortcut ? 10 : 0)          // Shortcut boost
        + (isRecent(c.command.id) ? 15 : 0)      // Recency boost
        + (getFrequency(c.command.id) * 5)        // Frequency boost
        + (isPinned(c.command.id) ? 20 : 0),     // Pinned boost
    }))
    .sort((a, b) => b.finalScore - a.finalScore)
    .slice(0, 20);                                // Max 20 results
}
```

---

## UI Specifications

### Desktop Layout

```
┌──────────────────────────────────────────────────┐
│  [Search icon]  Commands (Ctrl+K to close)       │
│  ┌──────────────────────────────────────────────┐ │
│  │  Search commands and actions...              │ │
│  └──────────────────────────────────────────────┘ │
│                                                   │
│  Navigation                                       │
│  ┌──────────────────────────────────────────────┐ │
│  │  [icon]  Go to Dashboard              Ctrl+1 │ │
│  │  [icon]  Go to Jobs                   Ctrl+2 │ │
│  │  [icon]  Go to AI Workspace           Ctrl+3 │ │
│  └──────────────────────────────────────────────┘ │
│                                                   │
│  Actions                                          │
│  ┌──────────────────────────────────────────────┐ │
│  │  [icon]  New Job Search               n + j │ │
│  │  [icon]  Upload CV                    n + c │ │
│  └──────────────────────────────────────────────┘ │
│                                                   │
│  [↑↓] Navigate  [Enter] Select  [Esc] Close      │
└──────────────────────────────────────────────────┘
```

### Dimensions

| Breakpoint | Width | Height | Position |
|-----------|-------|--------|----------|
| Desktop | 640px | 480px max | Center |
| Tablet | 90vw | 70vh max | Center |
| Mobile | 100vw | 100vh | Full screen |

---

## Module Integration

```typescript
// Pseudocode
// In module's onMount lifecycle
ModuleJobs.onMount = (registry: CommandRegistry) => {
  registry.register({
    id: 'jobs-search',
    name: 'Search Jobs',
    description: 'Search for job opportunities',
    category: CommandCategory.Module,
    keywords: ['position', 'role', 'career', 'opportunity'],
    icon: 'search',
    handler: () => navigate('/jobs'),
    moduleId: 'jobs',
  });
};

ModuleJobs.onUnmount = (registry: CommandRegistry) => {
  registry.unregister('jobs-search');
};
```

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Navigation-Architecture.md](Navigation-Architecture.md) | Navigation system integration |
| [Search-Architecture.md](Search-Architecture.md) | Search engine patterns |
| [DP-4 Command Palette](../05-Application-Shell/Architecture/Command-Palette.md) | Source command palette specification |

---

## Validation Notes

1. All navigation destinations are available through the command palette.
2. Module commands are automatically registered and deregistered.
3. Fuzzy search handles typos and partial matches.
4. Ranking balances relevance, recency, frequency, and user preference.
5. Responsive adaptation ensures full functionality on all devices.
