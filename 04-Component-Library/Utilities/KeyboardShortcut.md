# KeyboardShortcut

## Purpose
Binds keyboard combinations to application actions, providing a declarative API for keyboard shortcut registration, conflict detection, and discoverability.

## Responsibilities
- Register keyboard shortcut handlers for key combinations
- Support global and component-scoped shortcuts
- Display shortcut descriptions (for preferences UI)
- Detect and warn on shortcut conflicts
- Clean up event listeners on unmount

## Composition
```
KeyboardShortcut (non-visual — registers global or scoped listener)
└── (no children, or children = scoped context)
```

## Hierarchy
- KeyboardShortcut is used at any level of the component tree.
- Global shortcuts are registered at the app root.
- Scoped shortcuts are registered within specific views.
- KeyboardShortcut does not render any visual elements.

## Props Contract (TypeScript)
```typescript
type KeyModifier = 'ctrl' | 'cmd' | 'alt' | 'shift' | 'meta';
type KeyCombo = {
  key: string;                           // KeyboardEvent.key value (e.g., 's', 'Escape', 'ArrowUp')
  modifiers?: KeyModifier[];
  ctrlOrMeta?: boolean;                  // 'ctrl' on Windows/Linux, 'cmd' on Mac
};

interface KeyboardShortcutProps {
  combo: KeyCombo;
  handler: (event: KeyboardEvent) => void;
  description?: string;                  // human-readable description for preferences UI
  scope?: 'global' | 'component';        // default 'component'
  enabled?: boolean;                     // enable/disable shortcut, default true
  preventDefault?: boolean;              // call event.preventDefault(), default false
  stopPropagation?: boolean;             // call event.stopPropagation(), default false
  group?: string;                        // grouping label for preferences display
  priority?: number;                     // higher = wins on conflict, default 0
}
```

## Variants
| Variant | Scope | Use Case |
|---------|-------|----------|
| Global | `global` | App-wide shortcuts (Cmd+S, Cmd+K, Escape) |
| Component | `component` | View-specific shortcuts (inside a specific page) |

## States
| State | Description |
|-------|-------------|
| Active | Listener is registered. |
| Inactive | Listener is not registered (`enabled={false}`). |
| Conflicting | Same key combo registered with higher priority. Warning logged. |

## Accessibility
- All interactive functionality must be accessible without keyboard shortcuts — shortcuts are an enhancement.
- Shortcut descriptions should be visible in a preferences/help panel.
- Display shortcut hints in tooltips for buttons (e.g., "Save (Ctrl+S)").
- Avoid single-letter shortcuts without modifiers — they conflict with typing.

## Responsive Rules
| Breakpoint | Behavior |
|-----------|----------|
| All | Shortcuts are consistent across breakpoints. |
| Touch | Shortcuts that rely on keyboard modifiers are not discoverable on mobile — ensure alternative access. |

## Animation Rules
- KeyboardShortcut has no visual output — no animations.

## Future Expansion
- Shortcut cheatsheet panel (auto-generated from registered shortcuts).
- Custom shortcut remapping.
- Record shortcut UI (user presses keys to define custom shortcut).
- Shortcut context (only active when a specific element is focused).

## Dependencies
- None — uses native `keydown` event listeners.

## Related Components
- **Tooltip** — displays shortcut hints on buttons.
- **Menu** — menu items show shortcut labels.
- **Button** — pairing with shortcut hint via Tooltip.

## Anti-patterns
- ❌ Do not override browser-native shortcuts (e.g., Cmd+N for new window, Cmd+T for new tab).
- ❌ Do not register the same shortcut twice in the same scope without conflict resolution.
- ❌ Do not use shortcuts without modifiers for navigation — users may trigger them accidentally while typing.
- ❌ Do not make shortcuts the only way to access a feature — always provide a visible UI control.
- ❌ Do not use `preventDefault` on shortcuts that could interfere with text input (e.g., single letters).

## Performance Notes
- Global shortcuts use a single document-level `keydown` listener with a dispatch map.
- Shortcut handler is wrapped in `useCallback` to prevent unnecessary re-registration.
- Event listener is cleaned up on unmount or when `enabled` changes to false.
- Priority system prevents duplicate listeners — only the highest priority handler fires.
- Use `useRef` for handler to avoid re-registration on handler changes.
