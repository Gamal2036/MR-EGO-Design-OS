# CommandPalette

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Accessibility.md](../../02-Design-Language/Accessibility.md), [Responsive-System.md](../../02-Design-Language/Responsive-System.md), [Motion-System.md](../../02-Design-Language/Motion-System.md))

---

## Purpose

Keyboard-launched command palette (Ctrl+K / Cmd+K) that provides rapid access to all application actions, pages, and settings. Modal overlay with fuzzy search input and categorized results. Inspired by VS Code's command palette pattern.

---

## Responsibilities

- Listen for Ctrl+K / Cmd+K global keyboard shortcut to open
- Render modal overlay with backdrop
- Provide search input with auto-focus on open
- Perform fuzzy search across registered commands and pages
- Display categorized results (pages, actions, settings)
- Support keyboard navigation (arrows, enter, escape)
- Track and display recent commands
- Execute command on selection (navigate or invoke action)
- Dismiss on Escape or backdrop click
- Return focus to trigger element on close

---

## Composition

```
CommandPalette (Portal)
└── Overlay (backdrop)
    └── Modal
        ├── SearchInput
        ├── ResultsList
        │   ├── CategorySection
        │   │   ├── CategoryLabel
        │   │   ├── CommandItem
        │   │   ├── CommandItem
        │   │   └── ...
        │   └── CategorySection
        │       ├── CategoryLabel
        │       ├── CommandItem
        │       └── ...
        └── Footer (keyboard hints)
```

---

## Hierarchy

| Component | Parent | Children |
|-----------|--------|----------|
| CommandPalette | App root (via Portal) | CommandItem, CategorySection |

CommandPalette renders at the document root level via React Portal.

---

## Props Contract (TypeScript)

```typescript
export interface CommandPaletteProps {
  /** Array of all commands */
  commands: CommandItem[];
  /** Controlled open state */
  isOpen?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Open/close callback */
  onOpenChange?: (open: boolean) => void;

  /** Custom filter function (default: fuzzy search) */
  filterFn?: (query: string, command: CommandItem) => boolean;
  /** Custom sort function for results */
  sortFn?: (a: CommandItem, b: CommandItem, query: string) => number;

  /** Maximum recent commands to show */
  maxRecent?: number;
  /** Maximum results per category */
  maxResultsPerCategory?: number;

  /** Keyboard shortcut to open */
  shortcut?: { key: string; ctrl?: boolean; meta?: boolean; shift?: boolean };
  /** Disable default shortcut registration */
  disableShortcut?: boolean;

  /** Placeholder text */
  placeholder?: string;
  /** Empty state message */
  emptyMessage?: string;

  /** Loading state */
  isLoading?: boolean;

  /** Callback when command is executed */
  onExecute?: (command: CommandItem) => void;

  /** Accessibility */
  ariaLabel?: string;

  /** Styling */
  className?: string;
  style?: React.CSSProperties;

  /** Testing */
  dataTestId?: string;
}

export interface CommandItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Search keywords */
  keywords?: string[];
  /** Category for grouping */
  category?: string;
  /** Icon */
  icon?: React.ReactNode;
  /** Keyboard shortcut display */
  shortcutHint?: string;
  /** Execute callback */
  onExecute: () => void;
  /** Whether command is destructive (red styling) */
  isDanger?: boolean;
  /** Whether command is disabled */
  isDisabled?: boolean;
  /** Parent command ID (for sub-commands) */
  parentId?: string;
}
```

---

## Variants

| Variant | Description |
|---------|-------------|
| `default` | Full command palette with search + categorized results + recent commands |
| `compact` | Smaller palette, fewer results, minimal styling |
| `inline` | Embedded search-style palette (not modal) for use in pages |

---

## States

| State | Description |
|-------|-------------|
| Closed | Not rendered (or hidden). Keyboard shortcut registered. |
| Opening | Overlay + palette animate in. Search input auto-focused. |
| Open — empty | No query entered. Recent commands shown (if available) or empty state. |
| Open — typing | Results update in real-time with fuzzy matching. |
| Open — results | Categorized results displayed. Active item highlighted. |
| Open — no results | "No matching commands" empty state shown. |
| Loading | Skeleton or spinner while commands load asynchronously. |
| Selecting | Item activated via keyboard or click. Palette closes. |
| Closing | Overlay + palette animate out. Focus returns to trigger. |

---

## Accessibility

### Landmarks
- `role="dialog"` with `aria-modal="true"`

### ARIA
| Attribute | Target | Condition |
|-----------|--------|-----------|
| `role="dialog"` | Modal container | Always |
| `aria-modal="true"` | Dialog | Always |
| `aria-label` | Dialog | `"Command palette"` |
| `role="listbox"` | Results container | Always |
| `role="option"` | Each result item | Always |
| `aria-selected` | Result item | On the active/highlighted item |
| `aria-activedescendant` | Search input | References the highlighted option |
| `aria-keyshortcuts` | Document or trigger | `"Ctrl+K"` or `"Cmd+K"` |
| `aria-busy` | Results list | When loading |

### Keyboard

| Key | Action |
|-----|--------|
| Ctrl+K / Cmd+K | Open palette |
| Escape | Close palette |
| Tab | Move focus within palette (input → results → footer) |
| Shift+Tab | Reverse focus |
| Down Arrow | Move to next result |
| Up Arrow | Move to previous result |
| Enter | Execute highlighted command |
| Page Down | Jump to next category |
| Page Up | Jump to previous category |
| Home | Jump to first result |
| End | Jump to last result |
| Backspace (on empty input) | Close palette |
| Ctrl+Backspace | Clear input |

### Focus
- Search input receives auto-focus on open
- Focus is trapped within the modal while open
- Tab cycles through: input → results list → footer (if any)
- Arrow keys navigate within results (roving index)
- Focus returns to trigger element on close
- Scroll follows the highlighted item

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1024px+) | Centered modal. Width: 640px. Max height: 480px. |
| Tablet (768-1023px) | Centered modal. Width: 90vw. Max height: 70vh. |
| Mobile (320-767px) | Full-screen overlay. No rounded corners. Input at top. Results fill viewport. |

### Responsive Implementation Notes
- On mobile, palette covers full viewport (no backdrop visible)
- Search input stays fixed at top, results scroll below
- Footer with keyboard hints hidden on mobile (no physical keyboard)
- Touch targets minimum 44x44px for result items on mobile

---

## Animation Rules

| Transition | Duration | Easing | Notes |
|------------|----------|--------|-------|
| Overlay fade in | 150ms | ease-out | Backdrop opacity 0→1 |
| Modal scale in | 200ms | ease-out | Scale 0.95→1 + opacity |
| Overlay fade out | 100ms | ease-in | Backdrop opacity 1→0 |
| Modal scale out | 100ms | ease-in | Scale 1→0.95 + opacity |
| Results appear | 80ms | ease-out | Staggered per item (30ms) |
| Highlight move | 50ms | linear | Background color switch |

- Respect `prefers-reduced-motion`: instant open/close, no stagger
- Only animate opacity and transform — no layout-triggering properties

---

## Future Expansion

| Extension | Description | Priority |
|-----------|-------------|----------|
| Plugin commands | Third-party extensions register commands | Medium |
| Command history | Persistent recent commands across sessions | High |
| Natural language search | "navigate to settings" → opens settings | Low |
| Multi-word commands | Chained commands (e.g., "copy → paste") | Low |
| Search in page content | Include page text in search scope | Medium |
| Theme-aware icons | Dynamic icon set per command category | Low |

---

## Dependencies

| Dependency | Type | Reason |
|------------|------|--------|
| Portal | Utility | Render at document root |
| useGlobalShortcut | Hook | Register Ctrl+K / Cmd+K |
| useTrapFocus | Hook | Trap focus in modal |
| fuzzySearch | Utility | Fuzzy string matching |
| Overlay | Component | Backdrop |
| useScrollIntoView | Hook | Scroll to highlighted item |

---

## Related Components

| Component | Relation |
|-----------|----------|
| Dropdown | Alternative — CommandPalette is a specialized keyboard-first dropdown |
| Topbar SearchInput | Companion — Topbar search can open CommandPalette |
| ContextMenu | Alternative — right-click vs keyboard-launched action menu |
| Modal | Structural — CommandPalette extends the Modal pattern |

---

## Anti-patterns

| Anti-pattern | Why |
|--------------|-----|
| Excluding mouse users | Palette must be fully clickable, not just keyboard |
| No empty state | Users need feedback when no commands match |
| Over 50 commands without categories | Unscannable — always categorize |
| Absent recent commands section | Recent commands improve efficiency dramatically |
| Palette in iframe | Keyboard shortcuts don't bubble through iframes reliably |
| Slow fuzzy search on large command set (>500) | Debounce input (150ms) and limit results per category |
| Opening palette without auto-focus | Forces extra click/tab — defeats speed purpose |

---

## Performance Notes

- Commands array should be stable (memoized or static) — re-creating on each render causes re-filter
- Debounce search input at 150ms for large command sets (>200 items)
- Virtualize results list when commands exceed 100 visible items
- Lazy-register keyboard shortcut (only when component mounts)
- Fuzzy search library should be tree-shakeable and <5KB
- Pre-compute search index for static command sets
- Close/unmount palette completely when hidden — don't keep mounted but invisible
