# Component Hierarchy

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-3 ([Component-Hierarchy.md](../04-Component-Library/Architecture/Component-Hierarchy.md)), DP-3 ([Composition-Rules.md](../04-Component-Library/Architecture/Composition-Rules.md))

---

## Purpose

Defines the frontend component tree — component levels, slot system, base classes, category structure, and dependency rules that govern implementation.

---

## Component Levels

```
Level 0  Utilities              Icon, Spinner, Portal, FocusTrap, SkipLink,
                                 VisuallyHidden, ClickOutside, ResizeObserver

Level 1  Core Primitives        Divider, Avatar, Badge, Chip, Tag,
                                 Tooltip, Container, Surface

Level 2  Core Composites        Button, IconButton, FloatingButton, SplitButton,
                                 Card, Panel, Popover

Level 3  Forms                  Input, Password, Textarea, Checkbox, Radio,
                                 Select, MultiSelect, DatePicker, Switch,
                                 Slider, FileInput, SearchInput, CommandInput,
                                 Stepper, FormGroup, Validation

Level 4  Navigation             Sidebar, SidebarGroup, SidebarItem, Topbar,
                                 Breadcrumb, Tabs, CommandPalette,
                                 ContextMenu, Dropdown, NavigationRail

Level 5  Domain Components      Dashboard components, Data components,
                                 AI components, Document components,
                                 Feedback components

Level 6  Layout                 Grid, Stack, Workspace, ResizablePanel,
                                 SplitView, Section, HeroContainer, ContentArea
       Charts                  LineChart, AreaChart, BarChart, PieChart,
                                 TimelineChart, HeatMap, AnalyticsContainer
```

---

## Component Base Contract

Every component exposes the following base contract:

```typescript
// Pseudocode
interface BaseComponentProps {
  className?: string;
  style?: Record<string, string>;
  dataTestId?: string;
  aria?: AriaAttributes;
  children?: ReactNode;
}

interface BaseComponentState {
  isDisabled: boolean;
  isLoading: boolean;
  isSelected: boolean;
  isFocused: boolean;
  isHovered: boolean;
  isError: boolean;
}
```

---

## Slot System

Components expose named slots for content injection.

| Component | Slots |
|-----------|-------|
| Card | Card.Header, Card.Body, Card.Footer, Card.Title, Card.Description |
| Panel | Panel.Header, Panel.Body, Panel.Footer |
| Sidebar | Sidebar.Header, Sidebar.Body (SidebarGroup), Sidebar.Footer |
| Section | Section.Header (title + actions), Section.Body (content), Section.Footer |
| Dialog | Dialog.Header (title + close), Dialog.Body (content), Dialog.Footer (actions) |
| Table | Table.Header, Table.Body, Table.Footer, Table.Row, Table.Cell |
| List | List.Header, List.Body (ListItem), List.Footer |
| FormGroup | FormGroup.Label, FormGroup.Input, FormGroup.Help, FormGroup.Error |

---

## Component Category Structure

### Core

| Component | Dependencies | Slot Children |
|-----------|-------------|---------------|
| Button | Icon, Spinner, Tooltip | children |
| Card | Surface, Badge, Avatar, Tag, Chip | Card.Header, Card.Body, Card.Footer |
| Panel | Surface, Divider | Panel.Header, Panel.Body, Panel.Footer |
| Popover | Portal, ClickOutside, FocusTrap | children |
| Tooltip | Portal | children |

### Forms

| Component | Dependencies | Slots |
|-----------|-------------|-------|
| Input | Icon, Tooltip | — |
| Select | Icon, Popover, ClickOutside | Option |
| DatePicker | Input, Icon, Popover, ClickOutside | — |
| FormGroup | Divider, Tooltip | Label, Input, Help, Error |
| SearchInput | Input, Icon, Popover | — |

### Navigation

| Component | Dependencies | Slots |
|-----------|-------------|-------|
| Sidebar | Surface, SidebarGroup, SidebarItem, Divider, Avatar | Header, Body, Footer |
| Topbar | Surface, IconButton, Avatar, Badge, Breadcrumb, SearchInput | Left, Center, Right |
| Tabs | Badge | TabPanel |
| CommandPalette | Input, Icon, Portal, FocusTrap, ClickOutside | — |
| Breadcrumb | Icon, Tooltip | Breadcrumb.Item |

---

## Dependency Rules

1. Level N components may only depend on components at level N-1 or below.
2. Level 0 utilities have zero internal dependencies.
3. Level 1 primitives depend only on Level 0 utilities.
4. No circular dependencies — verified by dependency graph.
5. No component depends on a component at a higher level.
6. Higher levels compose lower levels — they never reimplement them.
7. All components derive visual properties from design tokens only.
8. No component depends on another component's variant implementation.

---

## Component State Pattern

Every interactive component implements these standard states:

```typescript
// Pseudocode
interface InteractiveState {
  default: ComponentStyle;
  hover: ComponentStyle;
  focus: ComponentStyle;
  active: ComponentStyle;
  disabled: ComponentStyle;
  loading: ComponentStyle;
  error: ComponentStyle;
  selected: ComponentStyle;
}
```

---

## Component Rendering Strategy

| Component Type | Rendering | Notes |
|---------------|-----------|-------|
| Static | Server-side render | No interactivity, cached |
| Interactive | Client-side render | Hydrated on client |
| Data-dependent | Client-side render | Fetch on mount |
| Streaming | Client-side render | AI streaming output |
| Heavy (chart) | Client-side, lazy | Loaded when visible |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Component-Composition.md](Component-Composition.md) | Composition rules for components |
| [State-Management.md](State-Management.md) | Component state management |
| [DP-3 Component Hierarchy](../04-Component-Library/Architecture/Component-Hierarchy.md) | Source hierarchy |

---

## Validation Notes

1. Every component has a defined level — guaranteed by dependency checker.
2. Slot system ensures flexible composition without prop drilling.
3. All interactive components implement the full state pattern.
4. Rendering strategy is defined per component type — not one-size-fits-all.
5. Design tokens are the single source of visual truth for all components.
