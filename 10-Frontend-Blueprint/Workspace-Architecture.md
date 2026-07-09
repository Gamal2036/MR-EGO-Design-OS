# Workspace Architecture

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-4 ([Workspace/](../05-Application-Shell/Workspace/)), DP-5 ([Depth/](../06-Visual-Foundation/Depth/))

---

## Purpose

Defines the workspace engine — shell composition, region orchestration, panel management, layout resolution, and workspace state persistence.

---

## Workspace Composition

```
WorkspaceShell
├── WorkspaceProvider             (provides workspace context)
├── Header
│   ├── Logo
│   ├── GlobalSearch
│   ├── QuickActions
│   ├── WorkspaceSwitcher
│   ├── AIShortcut
│   ├── ThemeSwitch
│   ├── LanguageSwitch
│   ├── NotificationBell
│   └── UserMenu
├── Sidebar
│   ├── SidebarHeader (logo + collapse toggle)
│   ├── NavigationGroup[] (Core, Modules, Favorites, Recent)
│   └── SidebarFooter (utilities)
├── RegionSystem
│   ├── PrimaryRegion              (always present)
│   ├── SecondaryRegion            (optional, right or below)
│   ├── ContextRegion              (optional, selection-driven)
│   ├── AIRegion                   (optional, Ctrl+I)
│   ├── InspectorRegion            (optional, selection-driven)
│   ├── PreviewRegion              (optional, hover/click)
│   ├── FloatingRegion             (portal, max 3)
│   └── ModalRegion                (portal, focus trap)
├── Footer                         (optional)
└── GlobalLayers
    ├── CommandPalette
    └── ToastContainer
```

---

## Region Engine

### Region Definition

```typescript
// Pseudocode
interface Region {
  id: string;
  type: RegionType;
  layout: RegionLayout;
  content: ComponentType;
  state: RegionState;
  options: RegionOptions;
}

enum RegionType {
  Primary, Secondary, Context, AI,
  Inspector, Preview, Floating, Modal
}

interface RegionLayout {
  position: 'left' | 'right' | 'bottom' | 'center' | 'floating';
  defaultWidth: number;
  minWidth: number;
  maxWidth: number;
  resizable: boolean;
  collapsible: boolean;
  defaultCollapsed: boolean;
}

interface RegionState {
  isVisible: boolean;
  isCollapsed: boolean;
  width: number;
  height: number;
  position: { x: number; y: number };
  zIndex: number;
}
```

### Region Activation Rules

| Region Type | Activation Trigger | Deactivation Trigger |
|-------------|-------------------|---------------------|
| Primary | Always active | Never |
| Secondary | Layout template definition | User close |
| Context | User selection | Deselection or user close |
| AI | Ctrl+I or floating button | Close button, 30s idle |
| Inspector | Selection in data-dense view | Deselection |
| Preview | Hover link or click preview | Click away or close |
| Floating | User action | User close (max 3) |
| Modal | User action (one at a time, max 3 stacked) | Complete or cancel |

---

## Layout Resolution

The workspace resolves its layout based on the active route's layout template.

```
Route activates
     ↓
Layout resolver selects template (from route meta)
     ↓
Template defines which regions are active
     ↓
Regions are activated with default dimensions
     ↓
User customisations override defaults
     ↓
Workspace renders
```

### Layout Templates

| Template | Primary | Secondary | Context | AI | Inspector | Preview |
|----------|---------|-----------|---------|-----|-----------|---------|
| Dashboard | Full width | No | No | Optional | No | No |
| Workspace | 65% | No | 320px | 400px | No | No |
| Documents | 60% | No | No | Optional | No | 40% |
| Jobs | 70% | 30% | No | Optional | No | No |
| Analytics | 70% | No | No | No | 30% | No |
| Settings | 768px center | No | No | No | No | No |
| Profile | 70% | No | No | Optional | No | No |
| Wizard | Center 768px | No | No | No | No | No |
| Authentication | Center 480px | No | No | No | No | No |

---

## Panel Management

### Panel Registry

All panels are registered in a central panel registry.

```typescript
// Pseudocode
interface PanelRegistry {
  panels: PanelDefinition[];
}

interface PanelDefinition {
  id: string;
  title: string;
  icon: string;
  regionType: RegionType;
  defaultPosition: PanelPosition;
  moduleId: string;
  component: ComponentType;
  options: PanelOptions;
}

interface PanelOptions {
  resizable: boolean;
  detachable: boolean;
  pinnable: boolean;
  closeable: boolean;
  minWidth: number;
  maxWidth: number;
  defaultWidth: number;
}
```

### Panel State Persistence

| State | Persisted To | Scope |
|-------|-------------|-------|
| Panel width | localStorage | Per layout |
| Panel visibility | localStorage | Per layout |
| Panel position | localStorage | Session |
| Panel arrangement | localStorage | Global |
| Collapsed regions | localStorage | Per layout |

---

## Region State Machine

```
                 ┌──────────┐
        ┌───────▶│  HIDDEN  │◄────────┐
        │        └──────────┘         │
        │             │               │
        │        ┌────▼──────┐        │
        │        │  VISIBLE  │────────┘
        │        └────┬──────┘
        │             │
   ┌────┴────┐  ┌─────▼──────┐
   │LOADING  │  │ COLLAPSED  │
   └─────────┘  └────────────┘
        │
   ┌────▼────┐
   │  ERROR  │
   └─────────┘
```

---

## Workspace State

```typescript
// Pseudocode
interface WorkspaceState {
  activeLayout: string;
  regions: Record<string, RegionState>;
  sidebarExpanded: boolean;
  headerCompact: boolean;
  focusMode: boolean;
  regionOrder: string[];
}

// Actions
WorkspaceActions:
  setLayout(layoutId): void
  toggleRegion(regionId): void
  resizeRegion(regionId, width): void
  reorderRegions(order): void
  toggleSidebar(): void
  toggleFocusMode(): void
```

---

## Focus Mode

Focus mode hides all non-essential chrome for distraction-free work.

### Hidden in Focus Mode

- Sidebar (collapsed to rail)
- Secondary, Context, AI, Inspector regions
- Footer
- Non-essential header items
- Floating panels

### Remains in Focus Mode

- Primary region (full width)
- Header (compact, essential only)
- Command palette trigger
- Modal layer

### Enter/Exit

| Trigger | Action |
|---------|--------|
| Ctrl+Shift+F | Toggle focus mode |
| Document reading | Auto-enter |
| Application form | Auto-enter |
| AI conversation | Auto-enter |
| Escape | Exit focus mode |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Dashboard-Architecture.md](Dashboard-Architecture.md) | Dashboard layout in workspace |
| [Page-Hierarchy.md](Page-Hierarchy.md) | Pages that render within regions |
| [DP-4 Region Architecture](../05-Application-Shell/Regions/Region-Architecture.md) | Source of region definitions |

---

## Validation Notes

1. Region engine supports any layout template without modification.
2. Panel registry allows modules to register their own panels.
3. Layout resolution is fully data-driven — no hardcoded layout switches.
4. Focus mode is consistent across all layouts.
5. Workspace state persists all user customisations.
