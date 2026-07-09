# Navigation Architecture

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-4 ([Navigation/](../05-Application-Shell/Navigation/)), DP-6 ([Navigation-Flow.md](../06-UX-Architecture/Navigation-Flow.md))

---

## Purpose

Defines the complete navigation system — navigation components, registry model, responsive adaptation, keyboard navigation, and state persistence.

---

## Navigation Model

MR:EGO supports four navigation surfaces that coexist and adapt to device and context.

```
                    ┌────────────────────────────────────────┐
                    │           NAVIGATION SYSTEM              │
                    │     Registry-driven, composable          │
                    └────────────────────────────────────────┘
                                   │
         ┌─────────────────────────┼──────────────────────────┐
         │                         │                          │
         ▼                         ▼                          ▼
┌─────────────────┐    ┌────────────────────┐    ┌─────────────────────┐
│  SIDEBAR         │    │  TOPBAR            │    │  COMMAND PALETTE    │
│  Primary nav     │    │  Secondary/context │    │  Global search/act  │
│  Desktop first   │    │  All devices       │    │  Keyboard driven    │
└─────────────────┘    └────────────────────┘    └─────────────────────┘
         │                                                    │
         └────────────────────────┬───────────────────────────┘
                                  ▼
                     ┌──────────────────────┐
                     │  BOTTOM TAB BAR       │
                     │  Mobile primary nav   │
                     └──────────────────────┘
```

---

## Navigation Registry

All navigation items are registered through a central registry.

### Registry Schema

```typescript
// Pseudocode
interface NavigationRegistry {
  items: NavigationItem[];
  groups: NavigationGroup[];
  order: string[];
}

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  moduleId: string;
  groupId: string;
  permissions: string[];
  shortcut: string;
  badge?: number;
  isActive: boolean;
  isPinned: boolean;
  isRecent: boolean;
  children: NavigationItem[];
  meta: Record<string, unknown>;
}

interface NavigationGroup {
  id: string;
  label: string;
  priority: number;
  collapsible: boolean;
}
```

### Registration Sources

| Source | Registers | Timing |
|--------|-----------|--------|
| Core shell | Dashboard, Jobs, AI, Documents, CRM, Analytics, Settings | Application boot |
| Module | Module-specific items | Module onMount |
| User | Pinned items, recent items, reorder | On user action |
| Plugin (future) | Plugin items through sandboxed API | Plugin activation |

---

## Navigation State

```typescript
// Pseudocode
interface NavigationState {
  activeItemId: string;
  activeGroupId: string;
  sidebarExpanded: boolean;
  sidebarCollapsed: boolean;
  mobileDrawerOpen: boolean;
  pinnedItems: string[];            // Max 10
  recentItems: string[];            // Max 5
  customOrder: string[];
  collapsedGroups: string[];
}

// Persistence
NavigationState is persisted to localStorage under key `mr-ego-nav-state`.
Restored on application boot.
```

---

## Navigation Adaptation by Device

| Device | Primary | Secondary | Context | Mobile |
|--------|---------|-----------|---------|--------|
| Ultra-wide (1920+) | Expanded sidebar (240px) | Topbar tabs | Right panel | No |
| Desktop (1280-1919) | Expanded sidebar (240px) | Topbar tabs | Right panel | No |
| Laptop (1024-1279) | Collapsible sidebar (64/240px) | Topbar tabs (overflow menu) | Right panel | No |
| Tablet (768-1023) | Collapsed sidebar (64px, overlay) | Topbar condensed | Bottom sheet | No |
| Mobile (320-767) | Bottom tab bar (5 items) | Topbar icons | Bottom sheet | Yes |

---

## Keyboard Navigation

### Global Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+K | Command palette |
| Ctrl+1-6 | Navigate to primary sections (Dashboard=1, Jobs=2, AI=3, Documents=4, CRM=5, Analytics=6) |
| Ctrl+, | Open settings |
| Ctrl+I | Toggle AI panel |
| Ctrl+B | Toggle sidebar |
| Ctrl+F | Find in page |
| Ctrl+S | Save current form |
| / | Quick search |
| ? | Show keyboard shortcuts |
| Escape | Close panel / dismiss overlay |
| F6 | Cycle through regions |

### Navigation Shortcuts

| Shortcut | Action |
|----------|--------|
| g + d | Go to Dashboard |
| g + j | Go to Jobs |
| g + p | Go to Profile |
| g + c | Go to CV Manager |
| g + a | Go to Applications |
| g + s | Go to Settings |
| g + n | Go to Notifications |
| n + j | New job search |
| n + c | New CV upload |
| n + a | New application |
| n + d | New document |

---

## Breadcrumb Architecture

| Depth | Breadcrumb Style | Max Items |
|-------|-----------------|-----------|
| Level 0 (Root) | No breadcrumb | — |
| Level 1 (Module) | Module name only | 1 |
| Level 2 (Section) | Module > Section | 2 |
| Level 3 (Sub-section) | Module > Section > Sub | 3 |
| Level 4+ (Detail) | Module > ... > Item | 3 + overflow |

Overflow: Items beyond max are collapsed into a single "..." dropdown.

---

## Context Navigation

| Trigger | Menu Type | Max Items |
|---------|-----------|-----------|
| Right-click | Context menu | 8 |
| Selection | Toolbar | 5 |
| Drag | Drop target actions | 3 |
| Long-press (mobile) | Bottom sheet | 8 |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Routing-System.md](Routing-System.md) | Routes that navigation items point to |
| [Command-Palette.md](Command-Palette.md) | Keyboard-driven navigation |
| [Page-Hierarchy.md](Page-Hierarchy.md) | Page structure navigation references |

---

## Validation Notes

1. All navigation items are registry-driven — no hardcoded navigation menus.
2. Module registration ensures zero coupling between shell and modules.
3. Navigation state persists across sessions.
4. Each device class has a defined navigation adaptation — no device is an afterthought.
5. Keyboard shortcuts cover every primary navigation action.
