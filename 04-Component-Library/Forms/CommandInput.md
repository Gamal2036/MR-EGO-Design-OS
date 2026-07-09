# CommandInput

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** DRAFT
**Design Authority:** DP-2 ([Form-Specifications](../../03-Design-System/Forms/Form-Specifications.md)), DP-1 ([Accessibility](../../02-Design-Language/Accessibility.md), [Motion-System](../../02-Design-Language/Motion-System.md))

---

## Purpose

Keyboard command entry component that accepts slash-commands and displays available shortcuts. Provides a command suggestions dropdown for discoverable command execution.

---

## Responsibilities

- Render a text input that detects slash-command prefixes (`/`)
- Display a command suggestions dropdown when `/` is typed
- Show keyboard shortcut hints for available commands
- Execute commands on selection or Enter
- Support command argument/tail text after command name
- Display active command with visual indicator
- Filter commands as user types after `/`

---

## Composition

```
CommandInput
├── CommandPrefixIndicator (active "/" or command icon)
├── <input type="text">
├── ClearButton (optional)
├── CommandDropdown (Portal)
│   ├── CommandGroup (optional category)
│   │   ├── CommandGroupLabel
│   │   └── CommandItem
│   │       ├── CommandIcon
│   │       ├── CommandName
│   │       ├── CommandDescription
│   │       └── CommandShortcut (keyboard hint)
│   ├── CommandItem (ungrouped)
│   └── NoCommandsFound
└── ActiveCommandBadge (inline, when command active)
```

---

## Hierarchy

| Relation | Component | Description |
|----------|-----------|-------------|
| Parent | FormGroup | Optional wrapper |
| Extends | Input | Inherits Input structure |
| Child | CommandDropdown | Command suggestions |
| Child | CommandItem | Individual command |
| Child | ActiveCommandBadge | Active command indicator |
| Related | CommandPalette | Global command palette |

---

## Props Contract

```typescript
/** A registered command. */
export interface Command {
  /** Unique command id. */
  id: string;
  /** Command name (without slash). */
  name: string;
  /** Display label. */
  label: string;
  /** Description of what the command does. */
  description?: string;
  /** Category for grouping. */
  category?: string;
  /** Icon to display. */
  icon?: React.ReactNode;
  /** Keyboard shortcut string. */
  shortcut?: string;
  /** Whether args are required after the command. @default false */
  requiresArgs?: boolean;
  /** Example usage text. */
  example?: string;
}

/**
 * Props for the CommandInput component.
 */
export interface CommandInputProps {
  // Display
  /** Size variant. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the input spans full width. @default true */
  fullWidth?: boolean;
  /** Placeholder text. @default "Type / for commands..." */
  placeholder?: string;
  /** Command prefix character. @default "/" */
  commandPrefix?: string;

  // State
  /** Current input value. */
  value?: string;
  /** Default value (uncontrolled). */
  defaultValue?: string;
  /** Whether the input is disabled. @default false */
  isDisabled?: boolean;
  /** Whether the input is loading. @default false */
  isLoading?: boolean;
  /** Whether the input has an error. @default false */
  hasError?: boolean;
  /** Whether the dropdown is open (controlled). */
  isOpen?: boolean;

  // Content
  /** Label text. */
  label?: string;
  /** Helper text. */
  helperText?: string;
  /** Error message. */
  errorMessage?: string;
  /** Name attribute. */
  name?: string;
  /** Array of available commands. */
  commands: Command[];

  // Events
  /** Called when a command is selected or executed. */
  onCommand?: (command: Command, args: string) => void;
  /** Called when the input value changes. */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Called on blur. */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  // Accessibility
  /** ARIA label. */
  ariaLabel?: string;
  /** Custom ID. */
  id?: string;

  // Styling
  /** Additional CSS class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;

  // Testing
  /** Test identifier. */
  dataTestId?: string;
}
```

---

## Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `standard` | Text input with slash-command detection | Chat, notes, task input |
| `inline` | Compact variant for toolbar/header | Quick commands in toolbars |
| `full` | Full command input with rich suggestions | Command palette-like input |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Default** | Input with "/ for commands" placeholder | Ready for input |
| **Typing text** | Normal text entry | Standard input behavior |
| **Slash typed** | Dropdown opens with all commands | Discover commands |
| **Filtering** | Dropdown filtered by typed text | Commands narrowed |
| **Command selected** | Active command badge shown, args tail visible | Command + arguments |
| **Executing** | Brief loading state | Command executed |
| **No results** | "No commands found" in dropdown | Unmatched filter |
| **Disabled** | 40% opacity | Cannot interact |
| **Focused** | Focus ring | Keyboard ready |

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **Role** | `combobox` with `aria-expanded`, `listbox` on dropdown. |
| **Autocomplete** | `aria-autocomplete="list"`. |
| **Active descendant** | `aria-activedescendant` on input pointing to focused command. |
| **Label** | `aria-label` or visible label. |
| **Command shortcuts** | Visible in dropdown, but not focusable. |
| **Error** | `aria-invalid`, `aria-describedby`. |
| **Disabled** | `aria-disabled="true"`. |
| **Focus** | Focus ring on input. Focus stays in input while navigating commands. |
| **Keyboard** | `/` opens dropdown. Arrow keys navigate. Enter selects command. Escape closes dropdown. Tab accepts current input. |
| **Screen reader** | Announce command count, active command, command description. |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | Full width. Full variant opens as bottom sheet. |
| Tablet (768-1023px) | Full width or fixed. Standard dropdown. |
| Desktop (1024-1279px) | Fixed width up to 400px. Dropdown positioned below. |
| Wide (1280-1599px) | Fixed width up to 480px. |
| Ultra-wide (1600px+) | Max width 560px. |

---

## Animation Rules

| Element | Trigger | Duration | Easing |
|---------|---------|----------|--------|
| Dropdown appear | `/` typed | 200ms | Ease-Out |
| Dropdown disappear | Escape/select | 150ms | Ease-In |
| Command badge appear | Selected | 150ms | Ease-Out |
| Command highlight | Hover/keyboard | 50ms | Instant |
| Focus ring | Focus | 150ms | Ease-Out |

All animations respect `prefers-reduced-motion`.

---

## Future Expansion

| Extension Point | Description |
|-----------------|-------------|
| `commands` async loading | Load commands on demand |
| `customPrefix` | Multi-character prefix support (`//`, `!`) |
| `nestedCommands` | Sub-commands (`/project create`) |
| `history` prop | Command history with up/down arrow |
| `snippet` prop | Command template/snippet insertion |
| `variables` prop | Dynamic variable replacement in commands |
| `argumentHint` prop | Show argument autocomplete after command |

---

## Dependencies

| Dependency | Type | Description |
|------------|------|-------------|
| Input | Internal | Base input component |
| Icon (Slash, Command) | Internal | Command indicators |
| Portal | Internal | Dropdown overlay |
| ClickOutside | Internal | Close on outside click |
| Chip | Internal | Active command badge |
| FormGroup | Internal | Optional parent wrapper |

---

## Related Components

| Component | Relationship |
|-----------|-------------|
| Input.md | Base component |
| SearchInput.md | Sibling for search pattern |
| CommandPalette.md | Global command palette (uses CommandInput) |

---

## Anti-patterns

1. **Using CommandInput for search** — Use SearchInput for search behavior.
2. **Too many commands** — Keep command list under 20 items. Group if more.
3. **No keyboard shortcut hints** — Always show shortcut keys for power users.
4. **Commands with no description** — Every command must have a description.
5. **Executing command on `/` alone** — Wait for command name before execution.
6. **Not filtering by typed text** — Commands must be filtered as user types after `/`.

---

## Performance Notes

- Command filtering runs on every keystroke after `/` — use `useMemo` for filtered results.
- Commands array should be stable (defined outside component or memoized).
- Command dropdown renders via Portal to avoid overflow clipping.
- Debounce not needed — filtering is synchronous and fast (< 50 commands).
- Use `useCallback` for command handlers to prevent re-renders.
- Command list virtualization not needed (max 20 items).
